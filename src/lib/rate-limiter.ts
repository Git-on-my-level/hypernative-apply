import pLimit from 'p-limit';
import { log } from './logger.js';

/**
 * Token bucket rate limiter implementation
 */
export class TokenBucket {
  private tokens: number;
  private lastRefillTime: number;

  constructor(
    private maxTokens: number,
    private refillRate: number, // tokens per second
  ) {
    this.tokens = maxTokens;
    this.lastRefillTime = Date.now();
  }

  /**
   * Attempt to consume tokens from the bucket
   * @param tokensNeeded Number of tokens to consume (default: 1)
   * @returns True if tokens were consumed, false if insufficient tokens
   */
  consume(tokensNeeded: number = 1): boolean {
    this.refill();
    
    if (this.tokens >= tokensNeeded) {
      this.tokens -= tokensNeeded;
      return true;
    }
    
    return false;
  }

  /**
   * Get time (in milliseconds) to wait until tokens are available
   * @param tokensNeeded Number of tokens needed
   * @returns Milliseconds to wait, or 0 if tokens are available now
   */
  timeUntilAvailable(tokensNeeded: number = 1): number {
    this.refill();
    
    if (this.tokens >= tokensNeeded) {
      return 0;
    }
    
    const tokensShort = tokensNeeded - this.tokens;
    const timeToRefill = (tokensShort / this.refillRate) * 1000;
    
    return Math.ceil(timeToRefill);
  }

  /**
   * Get current token count
   */
  getTokenCount(): number {
    this.refill();
    return this.tokens;
  }

  /**
   * Refill the bucket based on time elapsed
   */
  private refill(): void {
    const now = Date.now();
    const timePassed = now - this.lastRefillTime;
    const tokensToAdd = (timePassed / 1000) * this.refillRate;
    
    this.tokens = Math.min(this.maxTokens, this.tokens + tokensToAdd);
    this.lastRefillTime = now;
  }
}

/**
 * Configuration for rate limiting
 */
export interface RateLimitConfig {
  /** Maximum requests per minute */
  requestsPerMinute: number;
  /** Maximum concurrent requests */
  maxConcurrent: number;
  /** Burst allowance (optional, defaults to requestsPerMinute) */
  burstSize?: number;
}

/**
 * Rate limiter that combines token bucket algorithm with concurrency control
 */
export class RateLimiter {
  private tokenBucket: TokenBucket;
  private concurrencyLimit: ReturnType<typeof pLimit>;
  private resetTime: number | null = null;

  constructor(private config: RateLimitConfig) {
    const burstSize = config.burstSize || config.requestsPerMinute;
    const refillRate = config.requestsPerMinute / 60; // tokens per second
    
    this.tokenBucket = new TokenBucket(burstSize, refillRate);
    this.concurrencyLimit = pLimit(config.maxConcurrent);
    
    log.debug('Rate limiter initialized', {
      requestsPerMinute: config.requestsPerMinute,
      maxConcurrent: config.maxConcurrent,
      burstSize,
      refillRate: `${refillRate.toFixed(2)}/sec`,
    });
  }

  /**
   * Execute a function with rate limiting
   * @param fn Function to execute
   * @returns Promise that resolves with the function result
   */
  async execute<T>(fn: () => Promise<T>): Promise<T> {
    return this.concurrencyLimit(async () => {
      await this.waitForTokens();
      
      try {
        const result = await fn();
        log.debug('Rate-limited request completed successfully', {
          remainingTokens: this.tokenBucket.getTokenCount(),
        });
        return result;
      } catch (error) {
        log.debug('Rate-limited request failed', {
          error: error instanceof Error ? error.message : String(error),
          remainingTokens: this.tokenBucket.getTokenCount(),
        });
        throw error;
      }
    });
  }

  /**
   * Wait for tokens to be available or until rate limit reset
   */
  private async waitForTokens(): Promise<void> {
    // If we have a reset time from a 429 response and it's in the future, wait until then
    if (this.resetTime && Date.now() < this.resetTime) {
      const waitTime = this.resetTime - Date.now();
      log.debug('Waiting for rate limit reset', { 
        waitTimeMs: waitTime,
        resetTime: new Date(this.resetTime).toISOString(),
      });
      
      await new Promise(resolve => setTimeout(resolve, waitTime));
      this.resetTime = null; // Clear the reset time after waiting
      return;
    }

    // Try to consume a token
    if (this.tokenBucket.consume()) {
      return; // Token consumed successfully
    }

    // No tokens available, wait for refill
    const waitTime = this.tokenBucket.timeUntilAvailable();
    
    if (waitTime > 0) {
      log.debug('Rate limit reached, waiting for token refill', { 
        waitTimeMs: waitTime,
        currentTokens: this.tokenBucket.getTokenCount(),
      });
      
      await new Promise(resolve => setTimeout(resolve, waitTime));
      
      // Consume token after waiting
      if (!this.tokenBucket.consume()) {
        throw new Error('Failed to consume token after waiting');
      }
    }
  }

  /**
   * Update rate limit based on response headers
   * @param remaining Remaining requests from X-RateLimit-Remaining
   * @param resetTime Reset timestamp from X-RateLimit-Reset
   */
  updateFromHeaders(remaining: number, resetTime: number): void {
    log.debug('Updating rate limit from headers', {
      remaining,
      resetTime: new Date(resetTime * 1000).toISOString(),
    });
    
    // If remaining is 0 or very low, set the reset time
    if (remaining <= 5) { // Leave some buffer
      this.resetTime = resetTime * 1000; // Convert to milliseconds
      log.debug('Rate limit approaching, will wait until reset', {
        resetTime: new Date(this.resetTime).toISOString(),
      });
    }
  }

  /**
   * Handle a 429 response by setting the reset time
   * @param resetTime Reset timestamp from X-RateLimit-Reset header
   */
  handle429(resetTime?: number): void {
    if (resetTime) {
      this.resetTime = resetTime * 1000; // Convert to milliseconds
      log.warn('Received 429 response, will wait until rate limit reset', {
        resetTime: new Date(this.resetTime).toISOString(),
      });
    } else {
      // If no reset time provided, wait for a reasonable backoff period
      this.resetTime = Date.now() + 60000; // Wait 1 minute
      log.warn('Received 429 response without reset time, waiting 1 minute');
    }
  }

  /**
   * Get current status of the rate limiter
   */
  getStatus(): {
    tokens: number;
    maxTokens: number;
    resetTime: number | null;
    waitTime: number;
  } {
    return {
      tokens: this.tokenBucket.getTokenCount(),
      maxTokens: this.config.burstSize || this.config.requestsPerMinute,
      resetTime: this.resetTime,
      waitTime: this.resetTime ? Math.max(0, this.resetTime - Date.now()) : 0,
    };
  }
}

/**
 * Default rate limit configuration based on documentation
 * Standard tier: 1,000 req/hour = ~16.67 req/minute
 */
export const DEFAULT_RATE_LIMIT_CONFIG: RateLimitConfig = {
  requestsPerMinute: 100, // Conservative limit
  maxConcurrent: 10,
  burstSize: 50, // Allow some burst capacity
};

/**
 * Create a rate limiter with default or custom configuration
 */
export function createRateLimiter(config?: Partial<RateLimitConfig>): RateLimiter {
  const fullConfig = { ...DEFAULT_RATE_LIMIT_CONFIG, ...config };
  return new RateLimiter(fullConfig);
}