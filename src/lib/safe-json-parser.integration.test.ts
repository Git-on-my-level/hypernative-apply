/**
 * Integration tests for SafeJsonParser usage in critical locations
 * Tests the actual usage in state-store.ts and apply.ts
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { join } from 'path';
import { rmSync, existsSync, writeFileSync, mkdirSync } from 'fs';
import { StateStore } from './state-store.js';
import { TestFixture } from '../../tests/utils/test-helpers.js';

describe('SafeJsonParser Integration Tests', () => {
  let stateStore: StateStore;
  let testDir: string;

  beforeEach(() => {
    testDir = TestFixture.createTempDir('safe-json-integration');
    stateStore = new StateStore(testDir);
  });

  afterEach(() => {
    if (existsSync(testDir)) {
      rmSync(testDir, { recursive: true, force: true });
    }
  });

  describe('State Store Security Integration', () => {
    it('should safely filter out prototype pollution in state file loading', async () => {
      const stateDir = join(testDir, '.hypernative');
      const stateFile = join(stateDir, 'state.json');
      mkdirSync(stateDir, { recursive: true });

      // Create malicious state file with prototype pollution
      const maliciousState = {
        version: '1.0.0',
        resources: {},
        metadata: {
          created_at: '2024-01-01T00:00:00Z',
          created_by_version: '0.1.0',
          total_resources: 0,
          resource_counts: {
            watchlists: 0,
            custom_agents: 0,
            notification_channels: 0,
          },
        },
        __proto__: {
          admin: true,
        },
      };

      writeFileSync(stateFile, JSON.stringify(maliciousState));

      // Should load successfully but with dangerous properties filtered out
      const loadedState = await stateStore.loadState();
      expect(loadedState.version).toBe('1.0.0');
      expect(loadedState.hasOwnProperty('__proto__')).toBe(false);
      expect((loadedState as any).__proto__).not.toHaveProperty('admin');
    });

    it('should detect and reject constructor pollution in state file loading', async () => {
      const stateDir = join(testDir, '.hypernative');
      const stateFile = join(stateDir, 'state.json');
      mkdirSync(stateDir, { recursive: true });

      const maliciousState = {
        version: '1.0.0',
        resources: {},
        metadata: {},
        constructor: {
          prototype: {
            admin: true,
          },
        },
      };

      writeFileSync(stateFile, JSON.stringify(maliciousState));

      // Should detect the constructor pollution and throw an error
      await expect(stateStore.loadState()).rejects.toThrow(
        'JSON contains potential prototype pollution'
      );
    });

    it('should detect prototype pollution in nested resource data', async () => {
      const stateDir = join(testDir, '.hypernative');
      const stateFile = join(stateDir, 'state.json');
      mkdirSync(stateDir, { recursive: true });

      // Create JSON string directly to ensure __proto__ key is preserved
      const maliciousStateJson = `{
        "version": "1.0.0",
        "resources": {
          "malicious-resource": {
            "kind": "watchlist",
            "name": "malicious-resource",
            "remote_id": "wl_123",
            "last_applied_hash": "hash",
            "last_seen_remote_hash": "hash",
            "metadata": {
              "created_at": "2024-01-01T00:00:00Z",
              "updated_at": "2024-01-01T00:00:00Z",
              "created_by": "test",
              "cli_version": "0.1.0",
              "__proto__": {
                "admin": true
              }
            }
          }
        },
        "metadata": {
          "created_at": "2024-01-01T00:00:00Z",
          "created_by_version": "0.1.0",
          "total_resources": 1,
          "resource_counts": {
            "watchlists": 1,
            "custom_agents": 0,
            "notification_channels": 0
          }
        }
      }`;

      writeFileSync(stateFile, maliciousStateJson);

      // This should be detected because it contains __proto__ key in nested data
      await expect(stateStore.loadState()).rejects.toThrow(
        'JSON contains potential prototype pollution'
      );
    });

    it('should handle malformed JSON in state file securely', async () => {
      const stateDir = join(testDir, '.hypernative');
      const stateFile = join(stateDir, 'state.json');
      mkdirSync(stateDir, { recursive: true });

      writeFileSync(stateFile, 'invalid json{');

      await expect(stateStore.loadState()).rejects.toThrow(
        'State file is corrupted (invalid JSON)'
      );
    });

    it('should prevent DoS attacks via large state files', async () => {
      const stateDir = join(testDir, '.hypernative');
      const stateFile = join(stateDir, 'state.json');
      mkdirSync(stateDir, { recursive: true });

      // Create a very large state file (>10MB)
      const largeData = 'x'.repeat(11 * 1024 * 1024);
      const largeState = {
        version: '1.0.0',
        resources: {},
        metadata: { large_field: largeData },
      };

      writeFileSync(stateFile, JSON.stringify(largeState));

      await expect(stateStore.loadState()).rejects.toThrow('JSON payload too large');
    });

    it('should load legitimate state files without issues', async () => {
      const legitimateState = TestFixture.createMockState();

      const stateDir = join(testDir, '.hypernative');
      const stateFile = join(stateDir, 'state.json');
      mkdirSync(stateDir, { recursive: true });
      writeFileSync(stateFile, JSON.stringify(legitimateState));

      const loadedState = await stateStore.loadState();
      expect(loadedState.version).toBe('1.0.0');
      expect(loadedState.resources).toBeDefined();
    });
  });

  describe('Lock File Security Integration', () => {
    it('should safely filter out prototype pollution in lock file loading', async () => {
      const stateDir = join(testDir, '.hypernative');
      const lockFile = join(stateDir, '.lock');
      mkdirSync(stateDir, { recursive: true });

      const maliciousLock = {
        pid: process.pid,
        created_at: new Date().toISOString(),
        operation: 'apply',
        version: '0.1.0',
        cwd: process.cwd(),
        __proto__: {
          admin: true,
        },
      };

      writeFileSync(lockFile, JSON.stringify(maliciousLock));

      const lockCheck = await stateStore.isLocked();
      // Should be considered locked but with dangerous properties filtered out
      expect(lockCheck.locked).toBe(true);
      expect(lockCheck.lockInfo?.pid).toBe(process.pid);
      expect(lockCheck.lockInfo?.hasOwnProperty('__proto__')).toBe(false);
    });

    it('should handle malformed lock files gracefully', async () => {
      const stateDir = join(testDir, '.hypernative');
      const lockFile = join(stateDir, '.lock');
      mkdirSync(stateDir, { recursive: true });

      writeFileSync(lockFile, 'invalid json{');

      const lockCheck = await stateStore.isLocked();
      // Should treat malformed lock file as no lock
      expect(lockCheck.locked).toBe(false);
    });
  });

  describe('Backward Compatibility', () => {
    it('should handle old state file format gracefully', async () => {
      const oldFormatState = {
        version: '1.0.0',
        resources: {},
        metadata: {
          created_at: '2024-01-01T00:00:00Z',
          created_by_version: '0.0.1', // old version
          total_resources: 0,
          resource_counts: {
            watchlists: 0,
            custom_agents: 0,
            notification_channels: 0,
          },
        },
        // Old field that might exist
        legacy_field: 'some value',
      };

      const stateDir = join(testDir, '.hypernative');
      const stateFile = join(stateDir, 'state.json');
      mkdirSync(stateDir, { recursive: true });
      writeFileSync(stateFile, JSON.stringify(oldFormatState));

      // Should load successfully due to passthrough schema
      const loadedState = await stateStore.loadState();
      expect(loadedState.version).toBe('1.0.0');
      expect((loadedState as any).legacy_field).toBe('some value');
    });

    it('should reject unsupported versions after security filtering', async () => {
      const futureState = {
        version: '2.0.0', // unsupported version
        resources: {},
        metadata: {},
        __proto__: {
          admin: true, // This gets filtered out by schema
        },
      };

      const stateDir = join(testDir, '.hypernative');
      const stateFile = join(stateDir, 'state.json');
      mkdirSync(stateDir, { recursive: true });
      writeFileSync(stateFile, JSON.stringify(futureState));

      // Should fail due to version check after security filtering
      await expect(stateStore.loadState()).rejects.toThrow('Unsupported state file version: 2.0.0');
    });

    it('should maintain existing functionality for valid states', async () => {
      const validState = TestFixture.createMockState();

      const stateDir = join(testDir, '.hypernative');
      const stateFile = join(stateDir, 'state.json');
      mkdirSync(stateDir, { recursive: true });
      writeFileSync(stateFile, JSON.stringify(validState));

      // All existing functionality should work
      const loadedState = await stateStore.loadState();
      expect(loadedState.resources).toEqual(validState.resources);

      // Should be able to update resources
      const updateResult = await stateStore.updateResource(
        'test',
        'watchlist',
        'wl_1',
        'hash1',
        'hash1'
      );
      expect(updateResult.success).toBe(true);

      // Should be able to save state
      const saveResult = await stateStore.saveState(loadedState);
      expect(saveResult.success).toBe(true);
    });
  });

  describe('Error Handling and Recovery', () => {
    it('should provide clear error messages for security violations', async () => {
      const stateDir = join(testDir, '.hypernative');
      const stateFile = join(stateDir, 'state.json');
      mkdirSync(stateDir, { recursive: true });

      // Use constructor pollution that will definitely be detected
      const maliciousStateJson = `{
        "version": "1.0.0",
        "resources": {},
        "metadata": {},
        "constructor": {
          "prototype": {
            "admin": true
          }
        }
      }`;

      writeFileSync(stateFile, maliciousStateJson);

      try {
        await stateStore.loadState();
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).toContain('prototype pollution');
        expect(error.message).not.toContain('internal'); // Should not leak internal details
      }
    });

    it('should gracefully handle schema validation failures', async () => {
      const stateDir = join(testDir, '.hypernative');
      const stateFile = join(stateDir, 'state.json');
      mkdirSync(stateDir, { recursive: true });

      // Invalid but non-malicious state - version as number instead of string
      const invalidState = {
        version: 123, // should be string
        resources: {},
        metadata: {},
      };

      writeFileSync(stateFile, JSON.stringify(invalidState));

      try {
        await stateStore.loadState();
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).toContain('validation failed');
      }
    });

    it('should maintain system stability after security violations', async () => {
      const stateDir = join(testDir, '.hypernative');
      const stateFile = join(stateDir, 'state.json');
      mkdirSync(stateDir, { recursive: true });

      // First, try to load malicious state with constructor pollution
      const maliciousStateJson = `{
        "version": "1.0.0",
        "resources": {},
        "metadata": {},
        "constructor": { "prototype": { "admin": true } }
      }`;
      writeFileSync(stateFile, maliciousStateJson);

      await expect(stateStore.loadState()).rejects.toThrow('prototype pollution');

      // Then, create a valid state and verify system still works
      const validState = TestFixture.createMockState();
      writeFileSync(stateFile, JSON.stringify(validState));

      const loadedState = await stateStore.loadState();
      expect(loadedState).toBeDefined();
      expect(loadedState.version).toBe('1.0.0');
    });
  });
});
