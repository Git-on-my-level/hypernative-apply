import axios, { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { ResolvedConfig } from './config.js';
import { log } from './logger.js';
import { RateLimiter, createRateLimiter, RateLimitConfig } from './rate-limiter.js';
import { ApiResponse, ApiError, RateLimitHeaders } from '../types/api.js';

/**
 * Configuration for the API client
 */
export interface ApiClientConfig {
  /** Base URL for the API */
  baseUrl: string;
  /** Client ID for authentication */
  clientId: string;
  /** Client secret for authentication */
  clientSecret: string;
  /** Rate limiting configuration */
  rateLimitConfig?: Partial<RateLimitConfig>;
  /** Request timeout in milliseconds */
  timeout?: number;
  /** Maximum number of retry attempts */
  maxRetries?: number;
  /** Initial retry delay in milliseconds */
  retryDelayBase?: number;
  /** Maximum retry delay in milliseconds */
  maxRetryDelay?: number;
}

/**
 * Exponential backoff configuration
 */
interface BackoffConfig {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
  jitterPercent: number;
}

/**
 * Hypernative API Client with authentication, rate limiting, and resilient retries
 */
export class ApiClient {
  private axiosInstance: AxiosInstance;
  private rateLimiter: RateLimiter;
  private backoffConfig: BackoffConfig;

  constructor(config: ApiClientConfig) {
    this.rateLimiter = createRateLimiter(config.rateLimitConfig);
    
    this.backoffConfig = {
      maxRetries: config.maxRetries || 5,
      baseDelay: config.retryDelayBase || 1000,
      maxDelay: config.maxRetryDelay || 60000,
      jitterPercent: 25,
    };

    // Create axios instance with base configuration
    this.axiosInstance = axios.create({
      baseURL: config.baseUrl,
      timeout: config.timeout || 30000,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Hypernative-CLI/0.1.0',
        'x-client-id': config.clientId,
        'x-client-secret': config.clientSecret,
      },
    });

    // Setup request interceptor for logging
    this.axiosInstance.interceptors.request.use(
      (request) => {
        log.debug('Making API request', {
          method: request.method?.toUpperCase(),
          url: request.url,
          params: request.params,
          // Don't log sensitive data in request body
          hasData: !!request.data,
        });
        return request;
      },
      (error) => {
        log.error('Request interceptor error', { error: error.message });
        return Promise.reject(error);
      }
    );

    // Setup response interceptor for logging and rate limit tracking
    this.axiosInstance.interceptors.response.use(
      (response) => {
        // Extract rate limit headers
        const rateLimit = this.extractRateLimitHeaders(response);
        if (rateLimit) {
          this.rateLimiter.updateFromHeaders(rateLimit.remaining, rateLimit.reset);
        }

        log.debug('API response received', {
          status: response.status,
          url: response.config.url,
          rateLimit,
          hasData: !!response.data,
          requestId: (response.data as any)?.request_id,
        });

        return response;
      },
      (error: AxiosError) => {
        // Handle rate limit headers in error responses too
        if (error.response) {
          const rateLimit = this.extractRateLimitHeaders(error.response);
          if (rateLimit) {
            this.rateLimiter.updateFromHeaders(rateLimit.remaining, rateLimit.reset);
          }

          // Handle 429 specifically
          if (error.response.status === 429) {
            this.rateLimiter.handle429(rateLimit?.reset);
          }
        }

        log.debug('API response error', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          url: error.config?.url,
          message: error.message,
          requestId: (error.response?.data as any)?.request_id,
        });

        return Promise.reject(error);
      }
    );

    log.debug('API client initialized', {
      baseUrl: config.baseUrl,
      clientId: `${config.clientId.slice(0, 4)}****`,
      timeout: config.timeout || 30000,
      maxRetries: this.backoffConfig.maxRetries,
    });
  }

  /**
   * Create API client from resolved configuration
   */
  static fromConfig(config: ResolvedConfig, options?: Partial<ApiClientConfig>): ApiClient {
    return new ApiClient({
      baseUrl: config.baseUrl,
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      ...options,
    });
  }

  /**
   * Make a GET request with retry logic
   */
  async get<T = any>(url: string, params?: Record<string, any>): Promise<T> {
    return this.makeRequest<T>('GET', url, { params });
  }

  /**
   * Make a POST request with retry logic
   */
  async post<T = any>(url: string, data?: any, params?: Record<string, any>): Promise<T> {
    return this.makeRequest<T>('POST', url, { data, params });
  }

  /**
   * Make a PUT request with retry logic
   */
  async put<T = any>(url: string, data?: any, params?: Record<string, any>): Promise<T> {
    return this.makeRequest<T>('PUT', url, { data, params });
  }

  /**
   * Make a PATCH request with retry logic
   */
  async patch<T = any>(url: string, data?: any, params?: Record<string, any>): Promise<T> {
    return this.makeRequest<T>('PATCH', url, { data, params });
  }

  /**
   * Make a DELETE request with retry logic
   */
  async delete<T = any>(url: string, params?: Record<string, any>): Promise<T> {
    return this.makeRequest<T>('DELETE', url, { params });
  }

  /**
   * Make an HTTP request with rate limiting and retry logic
   */
  private async makeRequest<T>(
    method: string,
    url: string,
    options: AxiosRequestConfig = {}
  ): Promise<T> {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= this.backoffConfig.maxRetries; attempt++) {
      try {
        // Apply rate limiting
        return await this.rateLimiter.execute(async () => {
          const response: AxiosResponse<T> = await this.axiosInstance.request({
            method,
            url,
            ...options,
          });

          return response.data;
        });
      } catch (error) {
        const axiosError = error as AxiosError;
        const apiError = this.createApiError(axiosError);
        
        lastError = apiError;

        // Don't retry on final attempt
        if (attempt === this.backoffConfig.maxRetries) {
          break;
        }

        // Check if error is retryable
        if (!this.isRetryableError(axiosError)) {
          log.debug('Error is not retryable, failing immediately', {
            status: axiosError.response?.status,
            code: axiosError.code,
            requestId: (axiosError.response?.data as any)?.request_id,
          });
          break;
        }

        // Calculate backoff delay with jitter
        const delay = this.calculateBackoffDelay(attempt);
        
        log.debug('Request failed, retrying with backoff', {
          attempt: attempt + 1,
          maxRetries: this.backoffConfig.maxRetries,
          delayMs: delay,
          status: axiosError.response?.status,
          message: axiosError.message,
          requestId: (axiosError.response?.data as any)?.request_id,
        });

        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw lastError;
  }

  /**
   * Extract rate limit headers from response
   */
  private extractRateLimitHeaders(response: AxiosResponse): RateLimitHeaders | null {
    const limitHeader = response.headers['x-ratelimit-limit'];
    const remainingHeader = response.headers['x-ratelimit-remaining'];
    const resetHeader = response.headers['x-ratelimit-reset'];

    if (!limitHeader || !remainingHeader || !resetHeader) {
      return null;
    }

    return {
      limit: parseInt(limitHeader, 10),
      remaining: parseInt(remainingHeader, 10),
      reset: parseInt(resetHeader, 10),
    };
  }

  /**
   * Create a standardized API error from axios error
   */
  private createApiError(axiosError: AxiosError): Error {
    const response = axiosError.response;
    const requestId = (response?.data as any)?.request_id;
    
    if ((response?.data as any)?.error && response) {
      // API returned structured error
      const apiError = (response.data as any).error as ApiError;
      const message = `${apiError.message}${requestId ? ` (request_id: ${requestId})` : ''}`;
      
      const error = new Error(message);
      (error as any).code = apiError.code;
      (error as any).status = response.status;
      (error as any).requestId = requestId;
      (error as any).details = apiError.details;
      
      return error;
    }

    // Handle axios/network errors
    let message: string;
    let code: string;
    
    if (response) {
      // HTTP error response
      code = `HTTP_${response.status}`;
      message = `HTTP ${response.status}: ${response.statusText}`;
    } else if (axiosError.code === 'ECONNABORTED') {
      code = 'TIMEOUT';
      message = 'Request timeout';
    } else if (axiosError.code === 'ECONNREFUSED') {
      code = 'CONNECTION_REFUSED';
      message = 'Connection refused';
    } else if (axiosError.code === 'ENOTFOUND') {
      code = 'DNS_ERROR';
      message = 'DNS resolution failed';
    } else {
      code = 'NETWORK_ERROR';
      message = `Network error: ${axiosError.message}`;
    }

    if (requestId) {
      message += ` (request_id: ${requestId})`;
    }

    const error = new Error(message);
    (error as any).code = code;
    (error as any).status = response?.status;
    (error as any).requestId = requestId;
    (error as any).originalError = axiosError;

    return error;
  }

  /**
   * Check if an error is retryable
   */
  private isRetryableError(error: AxiosError): boolean {
    // Network errors are retryable
    if (!error.response) {
      return ['ECONNABORTED', 'ECONNREFUSED', 'ENOTFOUND', 'ECONNRESET'].includes(error.code || '');
    }

    const status = error.response.status;
    
    // Retry on these HTTP status codes
    const retryableStatuses = [
      429, // Rate limited
      500, // Internal server error
      502, // Bad gateway
      503, // Service unavailable
      504, // Gateway timeout
    ];

    return retryableStatuses.includes(status);
  }

  /**
   * Calculate backoff delay with exponential backoff and jitter
   */
  private calculateBackoffDelay(attempt: number): number {
    // Exponential backoff: baseDelay * 2^attempt
    const exponentialDelay = this.backoffConfig.baseDelay * Math.pow(2, attempt);
    
    // Cap at maximum delay
    const cappedDelay = Math.min(exponentialDelay, this.backoffConfig.maxDelay);
    
    // Add jitter to prevent thundering herd
    const jitter = cappedDelay * (this.backoffConfig.jitterPercent / 100);
    const jitterOffset = (Math.random() * 2 - 1) * jitter; // ±jitter
    
    return Math.max(0, cappedDelay + jitterOffset);
  }

  /**
   * Get rate limiter status for debugging
   */
  getRateLimitStatus(): ReturnType<RateLimiter['getStatus']> {
    return this.rateLimiter.getStatus();
  }

  /**
   * Get the underlying axios instance for advanced usage
   */
  getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}