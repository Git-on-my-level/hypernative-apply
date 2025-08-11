import { AxiosInstance } from 'axios';
import { ResolvedConfig } from './config.js';
import { RateLimiter, RateLimitConfig } from './rate-limiter.js';
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
 * Hypernative API Client with authentication, rate limiting, and resilient retries
 */
export declare class ApiClient {
    private axiosInstance;
    private rateLimiter;
    private backoffConfig;
    constructor(config: ApiClientConfig);
    /**
     * Validates baseUrl for HTTPS enforcement
     */
    private validateBaseUrl;
    /**
     * Create API client from resolved configuration
     */
    static fromConfig(config: ResolvedConfig, options?: Partial<ApiClientConfig>): ApiClient;
    /**
     * Make a GET request with retry logic
     */
    get<T = any>(url: string, params?: Record<string, any>): Promise<T>;
    /**
     * Make a POST request with retry logic
     */
    post<T = any>(url: string, data?: any, params?: Record<string, any>): Promise<T>;
    /**
     * Make a PUT request with retry logic
     */
    put<T = any>(url: string, data?: any, params?: Record<string, any>): Promise<T>;
    /**
     * Make a PATCH request with retry logic
     */
    patch<T = any>(url: string, data?: any, params?: Record<string, any>): Promise<T>;
    /**
     * Make a DELETE request with retry logic
     */
    delete<T = any>(url: string, params?: Record<string, any>): Promise<T>;
    /**
     * Make an HTTP request with rate limiting and retry logic
     */
    private makeRequest;
    /**
     * Extract rate limit headers from response
     */
    private extractRateLimitHeaders;
    /**
     * Create a standardized API error from axios error
     */
    private createApiError;
    /**
     * Check if an error is retryable
     */
    private isRetryableError;
    /**
     * Calculate backoff delay with exponential backoff and jitter
     */
    private calculateBackoffDelay;
    /**
     * Get rate limiter status for debugging
     */
    getRateLimitStatus(): ReturnType<RateLimiter['getStatus']>;
    /**
     * Get the underlying axios instance for advanced usage
     */
    getAxiosInstance(): AxiosInstance;
}
//# sourceMappingURL=api-client.d.ts.map