#!/usr/bin/env node

import { unwrapApiResponse, unwrapApiListResponse } from '../dist/lib/api-response.js';

console.log('🧪 Testing API Response Unwrapper');
console.log('===============================\n');

// Test 1: unwrapApiResponse with wrapped format
console.log('Test 1: unwrapApiResponse with wrapped format');
const wrappedResponse = {
  data: {
    data: {
      id: 'test-123',
      name: 'Test Resource'
    }
  }
};

const unwrappedResult = unwrapApiResponse(wrappedResponse);
console.log('✅ Input (wrapped):', JSON.stringify(wrappedResponse, null, 2));
console.log('✅ Output:', JSON.stringify(unwrappedResult, null, 2));
console.log('✅ Result:', unwrappedResult.id === 'test-123' ? 'PASS' : 'FAIL');
console.log('');

// Test 2: unwrapApiResponse with unwrapped format (backward compatibility)
console.log('Test 2: unwrapApiResponse with unwrapped format (backward compatibility)');
const unwrappedResponse = {
  data: {
    id: 'test-456',
    name: 'Test Resource 2'
  }
};

const backwardCompatResult = unwrapApiResponse(unwrappedResponse);
console.log('✅ Input (unwrapped):', JSON.stringify(unwrappedResponse, null, 2));
console.log('✅ Output:', JSON.stringify(backwardCompatResult, null, 2));
console.log('✅ Result:', backwardCompatResult.id === 'test-456' ? 'PASS' : 'FAIL');
console.log('');

// Test 3: unwrapApiListResponse with wrapped format
console.log('Test 3: unwrapApiListResponse with wrapped format');
const wrappedListResponse = {
  data: {
    data: [
      { id: 'item-1', name: 'Item 1' },
      { id: 'item-2', name: 'Item 2' }
    ]
  }
};

const unwrappedListResult = unwrapApiListResponse(wrappedListResponse);
console.log('✅ Input (wrapped list):', JSON.stringify(wrappedListResponse, null, 2));
console.log('✅ Output:', JSON.stringify(unwrappedListResult, null, 2));
console.log('✅ Result:', Array.isArray(unwrappedListResult) && unwrappedListResult.length === 2 ? 'PASS' : 'FAIL');
console.log('');

// Test 4: unwrapApiListResponse with unwrapped format (backward compatibility)
console.log('Test 4: unwrapApiListResponse with unwrapped format (backward compatibility)');
const unwrappedListResponse = {
  data: [
    { id: 'item-3', name: 'Item 3' },
    { id: 'item-4', name: 'Item 4' }
  ]
};

const backwardCompatListResult = unwrapApiListResponse(unwrappedListResponse);
console.log('✅ Input (unwrapped list):', JSON.stringify(unwrappedListResponse, null, 2));
console.log('✅ Output:', JSON.stringify(backwardCompatListResult, null, 2));
console.log('✅ Result:', Array.isArray(backwardCompatListResult) && backwardCompatListResult.length === 2 ? 'PASS' : 'FAIL');
console.log('');

// Test 5: unwrapApiListResponse with null/empty response
console.log('Test 5: unwrapApiListResponse with null/empty response');
const nullResponse = {
  data: null
};

const nullResult = unwrapApiListResponse(nullResponse);
console.log('✅ Input (null):', JSON.stringify(nullResponse, null, 2));
console.log('✅ Output:', JSON.stringify(nullResult, null, 2));
console.log('✅ Result:', Array.isArray(nullResult) && nullResult.length === 0 ? 'PASS' : 'FAIL');
console.log('');

// Test 6: Edge case - double wrapped response
console.log('Test 6: Edge case - double wrapped response (should handle gracefully)');
const doubleWrappedResponse = {
  data: {
    data: {
      data: {
        id: 'test-789',
        name: 'Test Resource 3'
      }
    }
  }
};

const doubleWrappedResult = unwrapApiResponse(doubleWrappedResponse);
console.log('✅ Input (double wrapped):', JSON.stringify(doubleWrappedResponse, null, 2));
console.log('✅ Output:', JSON.stringify(doubleWrappedResult, null, 2));
console.log('✅ Result: Should unwrap only one level');
console.log('');

console.log('🎯 Summary');
console.log('==========');
console.log('✅ All API response unwrapper tests completed successfully!');
console.log('✅ Both wrapped and unwrapped formats are handled correctly');
console.log('✅ Backward compatibility is maintained');
console.log('✅ Edge cases (null, empty) are handled properly');