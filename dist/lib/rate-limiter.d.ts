/**
 * Token bucket rate limiter implementation
 */
export declare class TokenBucket {
    private maxTokens;
    private refillRate;
    private tokens;
    private lastRefillTime;
    constructor(maxTokens: number, refillRate: number);
    /**
     * Attempt to consume tokens from the bucket
     * @param tokensNeeded Number of tokens to consume (default: 1)
     * @returns True if tokens were consumed, false if insufficient tokens
     */
    consume(tokensNeeded?: number): boolean;
    /**
     * Get time (in milliseconds) to wait until tokens are available
     * @param tokensNeeded Number of tokens needed
     * @returns Milliseconds to wait, or 0 if tokens are available now
     */
    timeUntilAvailable(tokensNeeded?: number): number;
    /**
     * Get current token count
     */
    getTokenCount(): number;
    /**
     * Refill the bucket based on time elapsed
     */
    private refill;
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
export declare class RateLimiter {
    private config;
    private tokenBucket;
    private concurrencyLimit;
    private resetTime;
    constructor(config: RateLimitConfig);
    /**
     * Execute a function with rate limiting
     * @param fn Function to execute
     * @returns Promise that resolves with the function result
     */
    execute<T>(fn: () => Promise<T>): Promise<T>;
    /**
     * Wait for tokens to be available or until rate limit reset
     */
    private waitForTokens;
    /**
     * Update rate limit based on response headers
     * @param remaining Remaining requests from X-RateLimit-Remaining
     * @param resetTime Reset timestamp from X-RateLimit-Reset
     */
    updateFromHeaders(remaining: number, resetTime: number): void;
    /**
     * Handle a 429 response by setting the reset time
     * @param resetTime Reset timestamp from X-RateLimit-Reset header
     */
    handle429(resetTime?: number): void;
    /**
     * Get current status of the rate limiter
     */
    getStatus(): {
        tokens: number;
        maxTokens: number;
        resetTime: number | null;
        waitTime: number;
    };
}
/**
 * Default rate limit configuration based on documentation
 * Standard tier: 1,000 req/hour = ~16.67 req/minute
 */
export declare const DEFAULT_RATE_LIMIT_CONFIG: RateLimitConfig;
/**
 * Create a rate limiter with default or custom configuration
 */
export declare function createRateLimiter(config?: Partial<RateLimitConfig>): RateLimiter;
//# sourceMappingURL=rate-limiter.d.ts.map