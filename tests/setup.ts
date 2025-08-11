/**
 * Vitest setup file for unit tests
 */

import { beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import nock from 'nock';

// Setup nock for HTTP mocking
beforeAll(() => {
  // Don't allow real HTTP requests during tests
  nock.disableNetConnect();

  // Allow local connections for the CLI itself
  nock.enableNetConnect('127.0.0.1');
});

beforeEach(() => {
  // Clear any existing mocks before each test
  nock.cleanAll();
});

afterEach(() => {
  // Ensure all nocks were used
  if (!nock.isDone()) {
    console.warn('Not all nock mocks were used:', nock.pendingMocks());
    nock.cleanAll();
  }
});

afterAll(() => {
  // Restore original HTTP behavior
  nock.enableNetConnect();
  nock.restore();
});

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.LOG_LEVEL = 'error'; // Reduce log noise in tests
