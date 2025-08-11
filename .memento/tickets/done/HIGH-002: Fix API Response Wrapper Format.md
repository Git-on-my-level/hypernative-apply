# HIGH-002: Fix API Response Wrapper Format

**Priority:** HIGH  
**Status:** Open  
**Component:** API Client / Providers  
**User Impact:** High (data access failures)

## Description

According to the API documentation, all API responses are wrapped in a `{"data": [...]}` format, but the current provider implementations directly access `response.data`, assuming the actual data is at the top level. This mismatch causes data access failures and empty results.

### Current Implementation Problem

**Expected API Response Format** (per documentation):
```json
{
  "data": [
    { "id": "1", "name": "watchlist1" },
    { "id": "2", "name": "watchlist2" }
  ]
}
```

**Current Code Assumption**:
```typescript
// Providers expect response.data to be the array directly
return response.data || [];  // Expecting array, getting wrapper object
```

**Actual Result**: `response.data` is `{"data": [...]}`, not the array itself.

## Root Cause Analysis

1. **API Documentation Mismatch**: Code doesn't match documented API response format
2. **Wrapper Assumption**: Providers assume unwrapped data structure
3. **Inconsistent Handling**: Some endpoints may wrap, others may not
4. **Missing Response Processing**: No standardized response unwrapping

## Impact if Not Fixed

- **Empty Results**: All list operations return empty arrays
- **Data Loss**: Users see no resources even when they exist
- **Broken Functionality**: Cannot view existing watchlists, agents, or channels
- **API Integration Issues**: Inconsistent behavior across different endpoints

## Affected Locations

### Watchlist Provider (`src/providers/watchlist.provider.ts`)
- **Line 61**: `return response.data || [];` in `list()` method
- **Line 76**: `return response.data;` in `getById()` method
- **Line 100**: `response.data.name` in `create()` method
- **Line 141**: `response.data.name` in `update()` method
- **Line 224**: `response.data.imported` in `uploadCsv()` method

### Custom Agent Provider (`src/providers/custom-agent.provider.ts`)
- **Line 65**: `return response.data || [];` in `list()` method
- **Line 80**: `return response.data;` in `getById()` method
- **Line 126**: `response.data.name` in `create()` method
- **Line 157**: `response.data.name` in `update()` method

### Notification Channel Provider (`src/providers/notification-channel.provider.ts`)
- **Line 79**: `return response.data || [];` in `list()` method
- **Line 94**: `return response.data;` in `getById()` method
- **Line 175**: `const createdChannel = response.data;` in `create()` method
- **Line 225**: `const updatedChannel = response.data;` in `update()` method

## Implementation Steps

### Task 1: Create Response Unwrapper Utility
Create a utility to handle API response unwrapping:
```typescript
// In src/lib/api-response.ts
export function unwrapApiResponse<T>(response: { data: any }): T {
  // Handle both wrapped and unwrapped responses
  if (response.data && typeof response.data === 'object' && 'data' in response.data) {
    return response.data.data;
  }
  return response.data;
}

export function unwrapApiListResponse<T>(response: { data: any }): T[] {
  const unwrapped = unwrapApiResponse<T[] | { data: T[] }>(response);
  return Array.isArray(unwrapped) ? unwrapped : (unwrapped as any)?.data || [];
}
```

### Task 2: Update All Provider List Methods
Replace direct `response.data` access with unwrapper:

**Watchlist Provider**:
```typescript
import { unwrapApiListResponse } from '../lib/api-response.js';

async list(limit = 50, offset = 0): Promise<Watchlist[]> {
  try {
    const response = await this.apiClient.get('/watchlists', {
      params: { limit, offset },
    });

    return unwrapApiListResponse<Watchlist>(response);
  } catch (error) {
    log.error('Failed to list watchlists:', error);
    throw new Error(`Failed to list watchlists: ${error}`);
  }
}
```

### Task 3: Update All Provider Single Object Methods
Update methods that return single objects:

```typescript
import { unwrapApiResponse } from '../lib/api-response.js';

async getById(id: string): Promise<Watchlist | null> {
  try {
    const response = await this.apiClient.get(`/watchlists/${id}`);
    return unwrapApiResponse<Watchlist>(response);
  } catch (error: any) {
    if (error.status === 404) {
      return null;
    }
    log.error(`Failed to get watchlist ${id}:`, error);
    throw new Error(`Failed to get watchlist: ${error}`);
  }
}
```

### Task 4: Update Create/Update Methods
Fix methods that access nested response properties:

```typescript
async create(config: WatchlistConfig): Promise<Watchlist> {
  try {
    const payload = this.buildWatchlistPayload(config);
    const response = await this.apiClient.post('/watchlists', payload);
    const created = unwrapApiResponse<Watchlist>(response);
    
    log.info(`Created watchlist: ${created.name} (${created.id})`);
    return created;
  } catch (error) {
    log.error('Failed to create watchlist:', error);
    throw new Error(`Failed to create watchlist: ${error}`);
  }
}
```

### Task 5: Update CSV Upload Response Handling
Fix CSV upload response parsing:

```typescript
async uploadCsv(watchlistId: string, csvPath: string, replaceAssets = false): Promise<CsvUploadResult> {
  try {
    // ... form data creation ...
    
    const response = await this.apiClient.post(
      `/watchlists/${watchlistId}/upload-csv`,
      formData,
      { headers: formData.getHeaders() }
    );

    const result = unwrapApiResponse<CsvUploadResult>(response);
    
    log.info(
      `CSV uploaded to watchlist ${watchlistId}: ${result.imported} imported, ${result.failed} failed`
    );
    return result;
  } catch (error) {
    log.error(`Failed to upload CSV to watchlist ${watchlistId}:`, error);
    throw new Error(`Failed to upload CSV: ${error}`);
  }
}
```

## Testing Instructions

### API Response Tests
1. **Wrapper Format Test**:
```typescript
describe('API Response Wrapper Handling', () => {
  test('should handle wrapped API responses', async () => {
    const mockWrappedResponse = {
      data: {
        data: [{ id: '1', name: 'test' }]
      }
    };
    
    mockApiClient.get.mockResolvedValue(mockWrappedResponse);
    const result = await provider.list();
    expect(result).toEqual([{ id: '1', name: 'test' }]);
  });
  
  test('should handle unwrapped API responses', async () => {
    const mockUnwrappedResponse = {
      data: [{ id: '1', name: 'test' }]
    };
    
    mockApiClient.get.mockResolvedValue(mockUnwrappedResponse);
    const result = await provider.list();
    expect(result).toEqual([{ id: '1', name: 'test' }]);
  });
});
```

2. **Response Unwrapper Tests**:
```typescript
describe('API Response Unwrapper', () => {
  test('should unwrap nested data responses', () => {
    const wrapped = { data: { data: ['item1', 'item2'] } };
    expect(unwrapApiListResponse(wrapped)).toEqual(['item1', 'item2']);
  });
  
  test('should handle direct data responses', () => {
    const direct = { data: ['item1', 'item2'] };
    expect(unwrapApiListResponse(direct)).toEqual(['item1', 'item2']);
  });
  
  test('should handle null/undefined responses', () => {
    const nullResponse = { data: null };
    expect(unwrapApiListResponse(nullResponse)).toEqual([]);
  });
});
```

### Integration Tests
1. Test all provider list operations with real API responses
2. Test create/update operations with actual API calls
3. Verify CSV upload works with corrected response handling

## Files to Modify
- Create: `/Users/dazheng/workspace/hypernative-apply/src/lib/api-response.ts`
- Modify: `/Users/dazheng/workspace/hypernative-apply/src/providers/watchlist.provider.ts` (lines 61, 76, 100, 141, 224)
- Modify: `/Users/dazheng/workspace/hypernative-apply/src/providers/custom-agent.provider.ts` (lines 65, 80, 126, 157)
- Modify: `/Users/dazheng/workspace/hypernative-apply/src/providers/notification-channel.provider.ts` (lines 79, 94, 175, 225)

## Backward Compatibility
- Response unwrapper handles both wrapped and unwrapped responses
- No breaking changes to provider interfaces
- Graceful degradation for different API response formats

## API Documentation Verification
- Verify actual API response format matches documentation
- Test with real API endpoints to confirm wrapper format
- Update documentation if response format differs from implementation

---
Created: 2025-08-09T17:10:26.512Z
