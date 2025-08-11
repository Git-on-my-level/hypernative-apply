# CRITICAL-003: Fix CSV Upload Node.js Compatibility

**Priority:** CRITICAL  
**Status:** Open  
**Component:** Watchlist Provider  
**Security Impact:** High (feature completely broken)

## Description

The CSV upload feature in the watchlist provider uses browser-specific APIs (`FormData` and `Blob`) that don't exist in Node.js environments, causing the feature to fail completely when running from the CLI.

### Current Implementation Problem
```typescript
// Lines 204-207 in src/providers/watchlist.provider.ts
const formData = new FormData();
const csvContent = readFileSync(csvPath, 'utf-8');
const blob = new Blob([csvContent], { type: 'text/csv' });
formData.append('file', blob, 'assets.csv');
```

This code will throw `ReferenceError: FormData is not defined` and `ReferenceError: Blob is not defined` in Node.js.

## Root Cause Analysis

1. **Browser API Usage**: The code imports browser-only globals (`FormData`, `Blob`) that don't exist in Node.js
2. **Missing Dependencies**: No Node.js-compatible multipart form libraries installed
3. **Environment Assumption**: Code assumes browser environment but runs in Node.js CLI context

## Impact if Not Fixed

- **Complete Feature Failure**: CSV upload functionality is entirely broken
- **User Experience**: Users cannot bulk import assets to watchlists
- **CLI Usability**: Major advertised feature doesn't work
- **Data Migration**: Impossible to migrate existing asset lists

## Implementation Steps

### Task 1: Install Node.js Form Data Library
```bash
npm install form-data
npm install --save-dev @types/form-data
```

### Task 2: Replace Browser APIs with Node.js Compatible Code
Replace the current implementation with:
```typescript
import FormData from 'form-data';
import { createReadStream } from 'fs';

// Replace lines 204-207
const formData = new FormData();
formData.append('file', createReadStream(csvPath), {
  filename: 'assets.csv',
  contentType: 'text/csv'
});
```

### Task 3: Update API Client Headers
Ensure the API client properly handles form-data content-type headers:
```typescript
const response = await this.apiClient.post(
  `/watchlists/${watchlistId}/upload-csv`,
  formData,
  {
    headers: {
      ...formData.getHeaders(),
    },
  }
);
```

## Testing Instructions

1. **Unit Tests**: Create test that mocks file system and form-data
2. **Integration Test**: Test actual CSV upload with sample file
3. **Error Handling**: Test with invalid CSV files
4. **File Permissions**: Test with files that can't be read

### Test Cases
```typescript
describe('CSV Upload Node.js Compatibility', () => {
  test('should create FormData from file path', () => {
    // Test form-data creation
  });
  
  test('should upload CSV successfully', async () => {
    // Test end-to-end upload
  });
  
  test('should handle file read errors', async () => {
    // Test error scenarios
  });
});
```

## Files to Modify
- `/Users/dazheng/workspace/hypernative-apply/src/providers/watchlist.provider.ts` (lines 204-207)
- `/Users/dazheng/workspace/hypernative-apply/package.json` (add form-data dependency)

## Breaking Changes
None - this is a bug fix that enables existing functionality.

---
Created: 2025-08-09T17:10:23.812Z
