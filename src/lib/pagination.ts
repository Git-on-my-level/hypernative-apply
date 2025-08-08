import { ApiClient } from './api-client.js';
import { PaginatedResponse, PaginationMeta, ListQueryParams } from '../types/api.js';
import { log } from './logger.js';

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
export class PaginationHelper {
  constructor(private apiClient: ApiClient) {}

  /**
   * Fetch all items from a paginated endpoint
   * @param endpoint API endpoint path
   * @param params Query parameters
   * @param options Pagination options
   * @returns All items from all pages
   */
  async fetchAll<T>(
    endpoint: string,
    params: ListQueryParams = {},
    options: PaginationOptions = {}
  ): Promise<PaginationResult<T>> {
    const {
      maxItems = 0, // 0 means no limit
      pageSize = 100,
      maxConcurrency = 3,
      shouldStop,
    } = options;

    log.debug('Starting paginated fetch', {
      endpoint,
      pageSize,
      maxItems,
      maxConcurrency,
    });

    const allItems: T[] = [];
    let pagesFetched = 0;
    let totalItems = 0;
    let offset = params.offset || 0;
    let hasMore = true;
    let truncated = false;

    // Fetch first page to get total count and determine pagination strategy
    const firstPageParams = { ...params, limit: pageSize, offset };
    const firstPage = await this.fetchPage<T>(endpoint, firstPageParams);
    
    allItems.push(...firstPage.items);
    pagesFetched++;
    totalItems = firstPage.pagination.total;
    hasMore = firstPage.pagination.has_more;
    offset += firstPage.items.length;

    log.debug('First page fetched', {
      itemsOnPage: firstPage.items.length,
      totalItems,
      hasMore,
      pagesFetched,
    });

    // Check early stopping conditions
    if (shouldStop && shouldStop(allItems, allItems.length)) {
      log.debug('Early stop triggered by callback after first page');
      return {
        items: allItems,
        totalItems,
        pagesFetched,
        complete: !hasMore,
        truncated: true,
      };
    }

    if (maxItems > 0 && allItems.length >= maxItems) {
      log.debug('Max items reached after first page', { 
        fetched: allItems.length, 
        maxItems 
      });
      return {
        items: allItems.slice(0, maxItems),
        totalItems,
        pagesFetched,
        complete: !hasMore,
        truncated: allItems.length > maxItems,
      };
    }

    // Continue fetching remaining pages
    if (hasMore) {
      const remainingPages = await this.fetchRemainingPages<T>(
        endpoint,
        params,
        {
          currentOffset: offset,
          pageSize,
          maxItems,
          maxConcurrency,
          shouldStop,
          currentItems: allItems,
        }
      );

      allItems.push(...remainingPages.items);
      pagesFetched += remainingPages.pagesFetched;
      hasMore = remainingPages.hasMore;
      truncated = remainingPages.truncated;
    }

    const complete = !hasMore && !truncated;

    log.debug('Paginated fetch completed', {
      totalItemsFetched: allItems.length,
      totalItems,
      pagesFetched,
      complete,
      truncated,
    });

    return {
      items: allItems,
      totalItems,
      pagesFetched,
      complete,
      truncated,
    };
  }

  /**
   * Fetch a specific page from a paginated endpoint
   */
  async fetchPage<T>(
    endpoint: string,
    params: ListQueryParams
  ): Promise<PaginatedResponse<T>> {
    try {
      const response = await this.apiClient.get<PaginatedResponse<T>>(endpoint, params);
      
      // Validate response structure
      if (!response || !Array.isArray(response.items) || !response.pagination) {
        throw new Error('Invalid paginated response format');
      }

      return response;
    } catch (error) {
      log.error('Failed to fetch page', {
        endpoint,
        params,
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  }

  /**
   * Fetch remaining pages after the first page
   */
  private async fetchRemainingPages<T>(
    endpoint: string,
    baseParams: ListQueryParams,
    options: {
      currentOffset: number;
      pageSize: number;
      maxItems: number;
      maxConcurrency: number;
      shouldStop?: (items: any[], totalFetched: number) => boolean;
      currentItems: T[];
    }
  ): Promise<{
    items: T[];
    pagesFetched: number;
    hasMore: boolean;
    truncated: boolean;
  }> {
    const allItems: T[] = [];
    let pagesFetched = 0;
    let offset = options.currentOffset;
    let hasMore = true;
    let truncated = false;

    const activeFetches = new Map<number, Promise<{ items: T[]; pagination: PaginationMeta; pageOffset: number }>>();

    while (hasMore && !truncated) {
      // Wait for available slot if at max concurrency
      if (activeFetches.size >= options.maxConcurrency) {
        const completedPromises = Array.from(activeFetches.values());
        await Promise.race(completedPromises);
      }

      // Check stopping conditions before starting new fetch
      const currentTotal = options.currentItems.length + allItems.length;
      
      if (options.maxItems > 0 && currentTotal >= options.maxItems) {
        truncated = true;
        break;
      }

      if (options.shouldStop && options.shouldStop([...options.currentItems, ...allItems], currentTotal)) {
        truncated = true;
        break;
      }

      // Start fetch for next page
      const pageParams = { ...baseParams, limit: options.pageSize, offset };
      const currentOffset = offset;
      const fetchPromise = this.fetchPageAsync<T>(endpoint, pageParams, currentOffset);
      
      activeFetches.set(currentOffset, fetchPromise);

      // Process completed fetch
      fetchPromise.then(({ items, pagination, pageOffset }) => {
        // Insert items in correct position based on offset
        const insertIndex = (pageOffset - options.currentOffset) / options.pageSize;
        const startIndex = insertIndex * options.pageSize;
        
        // Ensure array is large enough
        while (allItems.length < startIndex + items.length) {
          allItems.push({} as T); // Placeholder
        }
        
        // Insert items at correct position
        for (let i = 0; i < items.length; i++) {
          allItems[startIndex + i] = items[i];
        }

        hasMore = pagination.has_more;
        pagesFetched++;

        log.debug('Page fetched', {
          pageOffset,
          itemsOnPage: items.length,
          totalItemsSoFar: allItems.filter(item => item !== null && item !== undefined && (typeof item !== 'object' || Object.keys(item as object).length > 0)).length,
          hasMore,
          pagesFetched,
        });

        activeFetches.delete(pageOffset);
      }).catch((error) => {
        log.error('Page fetch failed', {
          offset: currentOffset,
          error: error instanceof Error ? error.message : String(error),
        });
        activeFetches.delete(currentOffset);
        throw error;
      });

      offset += options.pageSize;
    }

    // Wait for all active fetches to complete
    await Promise.all(Array.from(activeFetches.values()));

    // Filter out any placeholder objects
    const validItems = allItems.filter(item => {
      return item !== null && item !== undefined && (typeof item !== 'object' || Object.keys(item as object).length > 0);
    });

    return {
      items: validItems,
      pagesFetched,
      hasMore,
      truncated,
    };
  }

  /**
   * Fetch a page asynchronously with offset tracking
   */
  private async fetchPageAsync<T>(
    endpoint: string,
    params: ListQueryParams,
    pageOffset: number
  ): Promise<{ items: T[]; pagination: PaginationMeta; pageOffset: number }> {
    const response = await this.fetchPage<T>(endpoint, params);
    return {
      items: response.items,
      pagination: response.pagination,
      pageOffset,
    };
  }
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
export async function fetchAllPages<T>(
  apiClient: ApiClient,
  endpoint: string,
  params: ListQueryParams = {},
  options: PaginationOptions = {}
): Promise<T[]> {
  const helper = new PaginationHelper(apiClient);
  const result = await helper.fetchAll<T>(endpoint, params, options);
  return result.items;
}

/**
 * Fetch items with automatic batching and progress callback
 * @param apiClient API client instance
 * @param endpoint API endpoint path
 * @param params Query parameters
 * @param onProgress Progress callback
 * @param options Pagination options
 * @returns Array of all items
 */
export async function fetchAllPagesWithProgress<T>(
  apiClient: ApiClient,
  endpoint: string,
  params: ListQueryParams = {},
  onProgress?: (fetched: number, total: number, pagesFetched: number) => void,
  options: PaginationOptions = {}
): Promise<T[]> {
  const helper = new PaginationHelper(apiClient);
  
  // Wrap the shouldStop callback to include progress reporting
  const originalShouldStop = options.shouldStop;
  const enhancedOptions: PaginationOptions = {
    ...options,
    shouldStop: (items, totalFetched) => {
      // Report progress
      if (onProgress) {
        // We don't know total yet, so estimate based on first page
        const estimatedTotal = items.length > 0 ? totalFetched : 0;
        onProgress(totalFetched, estimatedTotal, Math.ceil(totalFetched / (options.pageSize || 100)));
      }
      
      // Call original callback if provided
      return originalShouldStop ? originalShouldStop(items, totalFetched) : false;
    },
  };
  
  const result = await helper.fetchAll<T>(endpoint, params, enhancedOptions);
  
  // Final progress report
  if (onProgress) {
    onProgress(result.items.length, result.totalItems, result.pagesFetched);
  }
  
  return result.items;
}

/**
 * Create a paginated iterator for streaming large datasets
 * @param apiClient API client instance
 * @param endpoint API endpoint path
 * @param params Query parameters
 * @param pageSize Page size (default: 100)
 * @returns Async iterator yielding items one by one
 */
export async function* iterateAllPages<T>(
  apiClient: ApiClient,
  endpoint: string,
  params: ListQueryParams = {},
  pageSize: number = 100
): AsyncIterableIterator<T> {
  const helper = new PaginationHelper(apiClient);
  let offset = params.offset || 0;
  let hasMore = true;

  while (hasMore) {
    const pageParams = { ...params, limit: pageSize, offset };
    const page = await helper.fetchPage<T>(endpoint, pageParams);
    
    for (const item of page.items) {
      yield item;
    }
    
    hasMore = page.pagination.has_more;
    offset += page.items.length;
  }
}