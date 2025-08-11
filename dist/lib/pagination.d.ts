import { ApiClient } from './api-client.js';
import { PaginatedResponse, ListQueryParams } from '../types/api.js';
/**
 * Options for pagination behavior
 */
export interface PaginationOptions {
    /** Maximum number of items to fetch (0 = unlimited) */
    maxItems?: number;
    /** Page size for each request */
    pageSize?: number;
    /** Maximum number of parallel requests */
    maxConcurrency?: number;
    /** Stop pagination early if this callback returns true */
    shouldStop?: (items: any[], totalFetched: number) => boolean;
}
/**
 * Result of paginated fetching
 */
export interface PaginationResult<T> {
    /** All fetched items */
    items: T[];
    /** Total items across all pages */
    totalItems: number;
    /** Number of pages fetched */
    pagesFetched: number;
    /** True if all pages were fetched */
    complete: boolean;
    /** True if stopped early due to maxItems or shouldStop callback */
    truncated: boolean;
}
/**
 * Generic paginated list fetcher that automatically retrieves all pages
 */
export declare class PaginationHelper {
    private apiClient;
    constructor(apiClient: ApiClient);
    /**
     * Fetch all items from a paginated endpoint
     * @param endpoint API endpoint path
     * @param params Query parameters
     * @param options Pagination options
     * @returns All items from all pages
     */
    fetchAll<T>(endpoint: string, params?: ListQueryParams, options?: PaginationOptions): Promise<PaginationResult<T>>;
    /**
     * Fetch a specific page from a paginated endpoint
     */
    fetchPage<T>(endpoint: string, params: ListQueryParams): Promise<PaginatedResponse<T>>;
    /**
     * Fetch remaining pages after the first page
     */
    private fetchRemainingPages;
    /**
     * Fetch a page asynchronously with offset tracking
     */
    private fetchPageAsync;
}
/**
 * Convenience functions for common pagination patterns
 */
/**
 * Fetch all items from a paginated endpoint (simplified interface)
 * @param apiClient API client instance
 * @param endpoint API endpoint path
 * @param params Query parameters
 * @param options Pagination options
 * @returns Array of all items
 */
export declare function fetchAllPages<T>(apiClient: ApiClient, endpoint: string, params?: ListQueryParams, options?: PaginationOptions): Promise<T[]>;
/**
 * Fetch items with automatic batching and progress callback
 * @param apiClient API client instance
 * @param endpoint API endpoint path
 * @param params Query parameters
 * @param onProgress Progress callback
 * @param options Pagination options
 * @returns Array of all items
 */
export declare function fetchAllPagesWithProgress<T>(apiClient: ApiClient, endpoint: string, params?: ListQueryParams, onProgress?: (fetched: number, total: number, pagesFetched: number) => void, options?: PaginationOptions): Promise<T[]>;
/**
 * Create a paginated iterator for streaming large datasets
 * @param apiClient API client instance
 * @param endpoint API endpoint path
 * @param params Query parameters
 * @param pageSize Page size (default: 100)
 * @returns Async iterator yielding items one by one
 */
export declare function iterateAllPages<T>(apiClient: ApiClient, endpoint: string, params?: ListQueryParams, pageSize?: number): AsyncIterableIterator<T>;
//# sourceMappingURL=pagination.d.ts.map