import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: [
      'node_modules/**',
      'dist/**',
      'bin/**',
      '**/*.d.ts',
      '**/*.config.*',
      '**/e2e/**'
    ],
    testTimeout: 10000,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'json', 'html'],
      exclude: [
        'node_modules/**',
        'dist/**',
        'bin/**',
        '**/*.d.ts',
        '**/*.config.*',
        '**/tests/**',
        '**/e2e/**',
        'src/index.ts', // CLI entry point
        'src/commands/**', // CLI command handlers
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
        // Higher coverage for critical components
        'src/lib/planner.ts': {
          branches: 90,
          functions: 90,
          lines: 90,
          statements: 90,
        },
        'src/providers/**': {
          branches: 85,
          functions: 85,
          lines: 85,
          statements: 85,
        },
      },
    },
  },
});

// Separate config for E2E tests
export const e2eConfig = defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['**/e2e/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    testTimeout: 30000, // Longer timeout for E2E
    setupFiles: ['./tests/e2e/setup.ts'],
  },
});