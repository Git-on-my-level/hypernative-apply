/**
 * Example usage of the Hypernative API Client
 * This file demonstrates how to use the API client, rate limiter, and pagination helpers
 */

import { ApiClient } from './api-client.js';
import { fetchAllPages, PaginationHelper } from './pagination.js';
import { loadConfig } from './config.js';
import { Alert, Watchlist, CustomAgent } from '../types/api.js';

/**
 * Example: Basic API client setup and usage
 */
async function basicApiClientExample() {
  try {
    // Load configuration (will use environment variables or config file)
    const config = await loadConfig();
    
    // Create API client from configuration
    const apiClient = ApiClient.fromConfig(config);
    
    // Make a simple GET request to fetch alerts
    const alerts = await apiClient.get<{ items: Alert[]; pagination: any }>('/api/v2/alerts', {
      limit: 10,
      severity: 'high'
    });
    
    console.log('Fetched alerts:', alerts.items.length);
    
    // Make a POST request to create a watchlist
    const newWatchlist = await apiClient.post<Watchlist>('/api/v2/watchlists', {
      name: 'Test Watchlist',
      description: 'Created via API client',
      addresses: ['0x123...', '0x456...'],
      enabled: true
    });
    
    console.log('Created watchlist:', newWatchlist.id);
    
  } catch (error) {
    console.error('API request failed:', error);
    
    // The error will include request_id if available (acceptance criteria met)
    if ((error as any).requestId) {
      console.log('Request ID for debugging:', (error as any).requestId);
    }
  }
}

/**
 * Example: Using pagination to fetch all watchlists
 */
async function paginationExample() {
  try {
    const config = await loadConfig();
    const apiClient = ApiClient.fromConfig(config);
    
    // Method 1: Simple pagination - fetch all watchlists
    const allWatchlists = await fetchAllPages<Watchlist>(
      apiClient,
      '/api/v2/watchlists',
      {}, // No query parameters
      { pageSize: 50 } // Options
    );
    
    console.log(`Fetched all ${allWatchlists.length} watchlists`);
    
    // Method 2: Advanced pagination with progress tracking
    const paginationHelper = new PaginationHelper(apiClient);
    
    const result = await paginationHelper.fetchAll<CustomAgent>(
      '/api/v2/custom-agents',
      {}, // Base query parameters
      {
        pageSize: 100,
        maxItems: 500, // Stop after 500 items
        shouldStop: (items) => {
          // Stop if we find a specific agent
          return items.some(agent => agent.name === 'Critical Monitor');
        }
      }
    );
    
    console.log('Pagination result:', {
      itemsCount: result.items.length,
      totalItems: result.totalItems,
      pagesFetched: result.pagesFetched,
      complete: result.complete,
      truncated: result.truncated
    });
    
  } catch (error) {
    console.error('Pagination failed:', error);
  }
}

/**
 * Example: Rate limiting behavior demonstration
 */
async function rateLimitingExample() {
  try {
    const config = await loadConfig();
    
    // Create API client with custom rate limiting
    const apiClient = new ApiClient({
      baseUrl: config.baseUrl,
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      rateLimitConfig: {
        requestsPerMinute: 60, // More conservative limit
        maxConcurrent: 5,
        burstSize: 20
      }
    });
    
    console.log('Rate limit status before requests:', apiClient.getRateLimitStatus());
    
    // Make multiple concurrent requests - rate limiter will handle them
    const requests = Array.from({ length: 10 }, (_, i) =>
      apiClient.get('/api/v2/alerts', { limit: 10, offset: i * 10 })
    );
    
    const results = await Promise.all(requests);
    console.log(`Successfully made ${results.length} requests`);
    
    console.log('Rate limit status after requests:', apiClient.getRateLimitStatus());
    
  } catch (error) {
    console.error('Rate limiting example failed:', error);
    
    // Check if it's a rate limit error (429)
    if ((error as any).status === 429) {
      console.log('Rate limit exceeded - client will automatically handle backoff');
    }
  }
}

/**
 * Example: Error handling with request_id extraction
 */
async function errorHandlingExample() {
  try {
    const config = await loadConfig();
    const apiClient = ApiClient.fromConfig(config);
    
    // This request should fail (invalid watchlist ID)
    await apiClient.get('/api/v2/watchlists/invalid-id-12345');
    
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.log('Caught expected error:', errorMsg);
    
    // Verify that request_id is included in error (acceptance criteria)
    const typedError = error as any;
    if (typedError.requestId) {
      console.log('✓ request_id included in error:', typedError.requestId);
    }
    
    if (typedError.code) {
      console.log('✓ Error code:', typedError.code);
    }
    
    if (typedError.status) {
      console.log('✓ HTTP status:', typedError.status);
    }
  }
}

/**
 * Run all examples (uncomment to test)
 */
export async function runAllExamples() {
  console.log('=== Hypernative API Client Examples ===\n');
  
  try {
    console.log('1. Basic API Client Example:');
    await basicApiClientExample();
    
    console.log('\n2. Pagination Example:');
    await paginationExample();
    
    console.log('\n3. Rate Limiting Example:');
    await rateLimitingExample();
    
    console.log('\n4. Error Handling Example:');
    await errorHandlingExample();
    
  } catch (error) {
    console.error('Example execution failed:', error);
  }
}

// Uncomment to run examples:
// runAllExamples().catch(console.error);