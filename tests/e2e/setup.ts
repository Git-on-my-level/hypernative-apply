/**
 * E2E test setup - only runs when E2E=1 environment variable is set
 */

import { beforeAll, beforeEach } from 'vitest';
import { existsSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';

// Check if E2E tests should run
const isE2E = process.env.E2E === '1';

if (!isE2E) {
  throw new Error('E2E tests require E2E=1 environment variable');
}

// Ensure required environment variables are set for E2E tests
const requiredEnvVars = [
  'HYPERNATIVE_API_URL',
  'HYPERNATIVE_API_KEY',
];

beforeAll(() => {
  console.log('Setting up E2E test environment...');
  
  // Check required environment variables
  const missing = requiredEnvVars.filter(env => !process.env[env]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables for E2E tests: ${missing.join(', ')}`);
  }
  
  console.log('E2E environment variables verified');
});

beforeEach(() => {
  // Clean up any test artifacts from previous runs
  const testDirs = [
    '.hypernative-test',
    'test-output',
  ];
  
  testDirs.forEach(dir => {
    if (existsSync(dir)) {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});

// Export helper for creating test workspace
export function createTestWorkspace(name: string): string {
  const testDir = join(process.cwd(), `test-workspace-${name}-${Date.now()}`);
  mkdirSync(testDir, { recursive: true });
  return testDir;
}

// Export helper for cleanup
export function cleanupTestWorkspace(testDir: string): void {
  if (existsSync(testDir)) {
    rmSync(testDir, { recursive: true, force: true });
  }
}