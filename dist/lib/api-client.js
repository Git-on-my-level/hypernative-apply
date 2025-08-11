import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { log } from './logger.js';
import { createRateLimiter } from './rate-limiter.js';
import { LogRedactor } from './log-redaction.js';
/**
 * Hypernative API Client with authentication, rate limiting, and resilient retries
 */
export class ApiClient {
    axiosInstance;
    rateLimiter;
    backoffConfig;
    constructor(config) {
        // Validate HTTPS enforcement
        this.validateBaseUrl(config.baseUrl);
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
        // Setup request interceptor for logging and timing
        this.axiosInstance.interceptors.request.use((request) => {
            // Add request timing metadata
            request.__requestId = uuidv4();
            request.__startTime = Date.now();
            log.debug('Making API request', LogRedactor.safeLog({
                method: request.method?.toUpperCase(),
                url: request.url,
                params: request.params,
                requestId: request.__requestId,
                // Don't log sensitive data in request body, just indicate presence
                hasData: !!request.data,
            }));
            return request;
        }, (error) => {
            log.error('Request interceptor error', { error: error.message });
            return Promise.reject(error);
        });
        // Setup response interceptor for logging and rate limit tracking
        this.axiosInstance.interceptors.response.use((response) => {
            // Calculate request timing
            const startTime = response.config.__startTime;
            const requestId = response.config.__requestId;
            const duration = startTime ? Date.now() - startTime : undefined;
            // Extract rate limit headers
            const rateLimit = this.extractRateLimitHeaders(response);
            if (rateLimit) {
                this.rateLimiter.updateFromHeaders(rateLimit.remaining, rateLimit.reset);
                // Log rate limit info using the new method
                log.rateLimit(rateLimit.limit, rateLimit.remaining, new Date(rateLimit.reset * 1000), requestId);
            }
            // Log HTTP request timing using the new method
            if (duration !== undefined && response.config.method && response.config.url) {
                log.httpRequest(response.config.method.toUpperCase(), response.config.url, duration, response.status, requestId);
            }
            // Legacy debug log for additional context
            log.debug('API response received', LogRedactor.safeLog({
                status: response.status,
                url: response.config.url,
                hasData: !!response.data,
                requestId: requestId || response.data?.request_id,
            }));
            return response;
        }, (error) => {
            // Calculate request timing for errors too
            const startTime = error.config?.__startTime;
            const requestId = error.config?.__requestId;
            const duration = startTime ? Date.now() - startTime : undefined;
            // Handle rate limit headers in error responses too
            if (error.response) {
                const rateLimit = this.extractRateLimitHeaders(error.response);
                if (rateLimit) {
                    this.rateLimiter.updateFromHeaders(rateLimit.remaining, rateLimit.reset);
                    // Log rate limit info using the new method
                    log.rateLimit(rateLimit.limit, rateLimit.remaining, new Date(rateLimit.reset * 1000), requestId);
                }
                // Handle 429 specifically
                if (error.response.status === 429) {
                    this.rateLimiter.handle429(rateLimit?.reset);
                }
                // Log HTTP request timing for errors using the new method
                if (duration !== undefined && error.config?.method && error.config?.url) {
                    log.httpRequest(error.config.method.toUpperCase(), error.config.url, duration, error.response.status, requestId);
                }
            }
            // Legacy debug log for additional context
            log.debug('API response error', LogRedactor.safeLog({
                status: error.response?.status,
                statusText: error.response?.statusText,
                url: error.config?.url,
                message: error.message,
                requestId: requestId || error.response?.data?.request_id,
            }));
            return Promise.reject(error);
        });
        log.debug('API client initialized', LogRedactor.safeLog({
            baseUrl: config.baseUrl,
            clientId: config.clientId,
            clientSecret: config.clientSecret,
            timeout: config.timeout || 30000,
            maxRetries: this.backoffConfig.maxRetries,
        }));
    }
    /**
     * Validates baseUrl for HTTPS enforcement
     */
    validateBaseUrl(baseUrl) {
        // Allow http://localhost for testing/development
        if (baseUrl.startsWith('http://localhost')) {
            return;
        }
        // Enforce HTTPS for all other URLs
        if (!baseUrl.startsWith('https://')) {
            throw new Error(`Base URL must use HTTPS: ${baseUrl}. ` +
                'Only http://localhost is allowed for local development.');
        }
    }
    /**
     * Create API client from resolved configuration
     */
    static fromConfig(config, options) {
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
    async get(url, params) {
        return this.makeRequest('GET', url, { params });
    }
    /**
     * Make a POST request with retry logic
     */
    async post(url, data, params) {
        return this.makeRequest('POST', url, { data, params });
    }
    /**
     * Make a PUT request with retry logic
     */
    async put(url, data, params) {
        return this.makeRequest('PUT', url, { data, params });
    }
    /**
     * Make a PATCH request with retry logic
     */
    async patch(url, data, params) {
        return this.makeRequest('PATCH', url, { data, params });
    }
    /**
     * Make a DELETE request with retry logic
     */
    async delete(url, params) {
        return this.makeRequest('DELETE', url, { params });
    }
    /**
     * Make an HTTP request with rate limiting and retry logic
     */
    async makeRequest(method, url, options = {}) {
        let lastError = null;
        for (let attempt = 0; attempt <= this.backoffConfig.maxRetries; attempt++) {
            try {
                // Apply rate limiting
                return await this.rateLimiter.execute(async () => {
                    const response = await this.axiosInstance.request({
                        method,
                        url,
                        ...options,
                    });
                    return response.data;
                });
            }
            catch (error) {
                const axiosError = error;
                const apiError = this.createApiError(axiosError);
                lastError = apiError;
                // Don't retry on final attempt
                if (attempt === this.backoffConfig.maxRetries) {
                    break;
                }
                // Check if error is retryable
                if (!this.isRetryableError(axiosError)) {
                    log.debug('Error is not retryable, failing immediately', LogRedactor.safeLog({
                        status: axiosError.response?.status,
                        code: axiosError.code,
                        requestId: axiosError.response?.data?.request_id,
                    }));
                    break;
                }
                // Calculate backoff delay with jitter
                const delay = this.calculateBackoffDelay(attempt);
                log.debug('Request failed, retrying with backoff', LogRedactor.safeLog({
                    attempt: attempt + 1,
                    maxRetries: this.backoffConfig.maxRetries,
                    delayMs: delay,
                    status: axiosError.response?.status,
                    message: axiosError.message,
                    requestId: axiosError.response?.data?.request_id,
                }));
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }
        throw lastError;
    }
    /**
     * Extract rate limit headers from response
     */
    extractRateLimitHeaders(response) {
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
    createApiError(axiosError) {
        const response = axiosError.response;
        const requestId = response?.data?.request_id;
        if (response?.data?.error && response) {
            // API returned structured error
            const apiError = response.data.error;
            const message = `${apiError.message}${requestId ? ` (request_id: ${requestId})` : ''}`;
            const error = new Error(message);
            error.code = apiError.code;
            error.status = response.status;
            error.requestId = requestId;
            error.details = apiError.details;
            return error;
        }
        // Handle axios/network errors
        let message;
        let code;
        if (response) {
            // HTTP error response
            code = `HTTP_${response.status}`;
            message = `HTTP ${response.status}: ${response.statusText}`;
        }
        else if (axiosError.code === 'ECONNABORTED') {
            code = 'TIMEOUT';
            message = 'Request timeout';
        }
        else if (axiosError.code === 'ECONNREFUSED') {
            code = 'CONNECTION_REFUSED';
            message = 'Connection refused';
        }
        else if (axiosError.code === 'ENOTFOUND') {
            code = 'DNS_ERROR';
            message = 'DNS resolution failed';
        }
        else {
            code = 'NETWORK_ERROR';
            message = `Network error: ${axiosError.message}`;
        }
        if (requestId) {
            message += ` (request_id: ${requestId})`;
        }
        const error = new Error(message);
        error.code = code;
        error.status = response?.status;
        error.requestId = requestId;
        error.originalError = axiosError;
        return error;
    }
    /**
     * Check if an error is retryable
     */
    isRetryableError(error) {
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
    calculateBackoffDelay(attempt) {
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
    getRateLimitStatus() {
        return this.rateLimiter.getStatus();
    }
    /**
     * Get the underlying axios instance for advanced usage
     */
    getAxiosInstance() {
        return this.axiosInstance;
    }
}
//# sourceMappingURL=api-client.js.map