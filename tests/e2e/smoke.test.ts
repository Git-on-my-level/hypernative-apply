/**
 * E2E Smoke Tests
 *
 * These tests run against real API endpoints when E2E=1 environment variable is set.
 * They verify basic functionality end-to-end without extensive mocking.
 */

import { describe, it, expect, beforeAll, beforeEach, afterEach } from 'vitest';
import { execSync } from 'child_process';
import { join } from 'path';
import { writeFileSync, mkdirSync, rmSync, existsSync, readFileSync } from 'fs';
import { createTestWorkspace, cleanupTestWorkspace } from './setup.js';

// Skip all E2E tests unless E2E=1 is set
const isE2E = process.env.E2E === '1';

describe.skipIf(!isE2E)('E2E Smoke Tests', () => {
  let testWorkspace: string;
  let originalCwd: string;

  beforeAll(() => {
    // Ensure we have required environment variables
    expect(process.env.HYPERNATIVE_API_URL).toBeDefined();
    expect(process.env.HYPERNATIVE_API_KEY).toBeDefined();

    console.log('Running E2E tests against:', process.env.HYPERNATIVE_API_URL);
  });

  beforeEach(() => {
    originalCwd = process.cwd();
    testWorkspace = createTestWorkspace('smoke');
    process.chdir(testWorkspace);

    console.log(`Test workspace: ${testWorkspace}`);
  });

  afterEach(() => {
    process.chdir(originalCwd);
    cleanupTestWorkspace(testWorkspace);
  });

  const runCliCommand = (command: string, expectSuccess = true): string => {
    try {
      const result = execSync(`node ${join(originalCwd, 'dist/index.js')} ${command}`, {
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'pipe'],
        env: {
          ...process.env,
          NODE_ENV: 'test',
        },
      });
      return result;
    } catch (error: any) {
      if (expectSuccess) {
        console.error('CLI command failed:', error.stdout || error.stderr);
        throw error;
      }
      return error.stdout || error.stderr || '';
    }
  };

  const createBasicConfig = () => {
    const hypernativeDir = join(testWorkspace, 'hypernative');
    const channelsDir = join(hypernativeDir, 'notification-channels');
    const watchlistsDir = join(hypernativeDir, 'watchlists');

    mkdirSync(channelsDir, { recursive: true });
    mkdirSync(watchlistsDir, { recursive: true });

    // Create a simple notification channel
    writeFileSync(
      join(channelsDir, 'e2e-test-slack.yaml'),
      `
name: E2E Test Slack Channel
type: slack
enabled: true
webhook_url: \${E2E_SLACK_WEBHOOK_URL}
channel: "#e2e-tests"
username: "hypernative-e2e"
icon_emoji: ":test_tube:"
`
    );

    // Create a simple watchlist
    writeFileSync(
      join(watchlistsDir, 'e2e-test-watchlist.yaml'),
      `
name: E2E Test Watchlist
description: Watchlist for E2E testing
assets:
  - chain: ethereum
    type: Wallet
    address: "0x0000000000000000000000000000000000000001"
    name: "E2E Test Address"
alert_config:
  notification_channels:
    - e2e-test-slack
`
    );

    // Set required environment variable
    process.env.E2E_SLACK_WEBHOOK_URL =
      'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX';
  };

  describe('CLI Version and Help', () => {
    it('should show version information', () => {
      const output = runCliCommand('version');
      expect(output).toContain('0.1.0');
    });

    it('should show help information', () => {
      const output = runCliCommand('--help');
      expect(output).toContain('Hypernative configuration management CLI');
      expect(output).toContain('Commands:');
      expect(output).toContain('plan');
      expect(output).toContain('apply');
    });
  });

  describe('Init Command', () => {
    it('should initialize a new hypernative project', () => {
      const output = runCliCommand('init');

      expect(existsSync(join(testWorkspace, 'hypernative'))).toBe(true);
      expect(existsSync(join(testWorkspace, 'hypernative', 'notification-channels'))).toBe(true);
      expect(existsSync(join(testWorkspace, 'hypernative', 'watchlists'))).toBe(true);
      expect(existsSync(join(testWorkspace, 'hypernative', 'custom-agents'))).toBe(true);

      expect(output).toContain('Initialized');
    });

    it('should not overwrite existing configuration', () => {
      // First init
      runCliCommand('init');

      // Create custom file
      const customFile = join(testWorkspace, 'hypernative', 'custom-file.txt');
      writeFileSync(customFile, 'custom content');

      // Second init should not overwrite
      const output = runCliCommand('init');

      expect(readFileSync(customFile, 'utf-8')).toBe('custom content');
      expect(output).toContain('already exists');
    });
  });

  describe('Doctor Command', () => {
    it('should validate basic environment', () => {
      createBasicConfig();

      const output = runCliCommand('doctor');

      expect(output).toContain('Doctor Report');
      // Should validate API connectivity, config syntax, etc.
    });

    it('should detect configuration issues', () => {
      const hypernativeDir = join(testWorkspace, 'hypernative');
      const channelsDir = join(hypernativeDir, 'notification-channels');
      mkdirSync(channelsDir, { recursive: true });

      // Create invalid config
      writeFileSync(
        join(channelsDir, 'invalid.yaml'),
        `
name: Invalid Channel
type: slack
# Missing required webhook_url
enabled: true
`
      );

      const output = runCliCommand('doctor', false);
      expect(output).toContain('Configuration issues detected');
    });
  });

  describe('Plan Command', () => {
    it('should generate plan for empty state', () => {
      createBasicConfig();

      const output = runCliCommand('plan');

      expect(output).toContain('Execution Plan');
      expect(output).toContain('to create');
      expect(output).toContain('notification-channels');
      expect(output).toContain('watchlists');
    });

    it('should save plan to file when requested', () => {
      createBasicConfig();

      const planFile = join(testWorkspace, 'test-plan.json');
      runCliCommand(`plan --out ${planFile}`);

      expect(existsSync(planFile)).toBe(true);

      const planContent = JSON.parse(readFileSync(planFile, 'utf-8'));
      expect(planContent.version).toBe('1.0.0');
      expect(planContent.plan).toBeDefined();
      expect(planContent.signature).toBeDefined();
    });

    it('should detect no changes when state matches config', () => {
      createBasicConfig();

      // First apply to create resources
      runCliCommand('apply --auto-approve');

      // Then plan again - should show no changes
      const output = runCliCommand('plan');
      expect(output).toContain('No changes');
    });

    it('should show field-level diffs when requested', () => {
      createBasicConfig();

      const output = runCliCommand('plan --show-diffs');

      expect(output).toContain('Field changes:');
    });
  });

  describe('Apply Command', () => {
    it('should require confirmation by default', () => {
      createBasicConfig();

      // Without --auto-approve, should prompt for confirmation
      const output = runCliCommand('apply', false);
      expect(output).toContain('Do you want to perform these actions?');
    });

    it('should apply changes with auto-approve', () => {
      createBasicConfig();

      const output = runCliCommand('apply --auto-approve');

      expect(output).toContain('Apply complete');
      expect(output).toContain('Resources:');
      expect(output).toContain('created');

      // Verify state file was created
      expect(existsSync(join(testWorkspace, '.hypernative', 'state.json'))).toBe(true);
    });

    it('should handle dry-run mode', () => {
      createBasicConfig();

      const output = runCliCommand('apply --dry-run');

      expect(output).toContain('[DRY RUN]');
      expect(output).toContain('Would create');

      // Should not create actual state file in dry-run
      expect(existsSync(join(testWorkspace, '.hypernative', 'state.json'))).toBe(false);
    });

    it('should detect and handle concurrent operations', () => {
      createBasicConfig();

      // Create a mock lock file
      const lockFile = join(testWorkspace, '.hypernative', '.lock');
      mkdirSync(join(testWorkspace, '.hypernative'), { recursive: true });
      writeFileSync(
        lockFile,
        JSON.stringify({
          pid: 999999, // Non-existent PID
          created_at: new Date().toISOString(),
          operation: 'apply',
          version: '0.1.0',
          cwd: testWorkspace,
        })
      );

      const output = runCliCommand('apply --auto-approve', false);
      expect(output).toContain('operation is in progress');
    });

    it('should update existing resources', () => {
      createBasicConfig();

      // First apply
      runCliCommand('apply --auto-approve');

      // Modify config
      const channelFile = join(
        testWorkspace,
        'hypernative',
        'notification-channels',
        'e2e-test-slack.yaml'
      );
      writeFileSync(
        channelFile,
        `
name: E2E Test Slack Channel Updated
type: slack
enabled: true
webhook_url: \${E2E_SLACK_WEBHOOK_URL}
channel: "#e2e-tests-updated"
username: "hypernative-e2e-updated"
icon_emoji: ":gear:"
`
      );

      // Apply changes
      const output = runCliCommand('apply --auto-approve');

      expect(output).toContain('updated');
    });

    it('should delete resources not in config', () => {
      createBasicConfig();

      // First apply with full config
      runCliCommand('apply --auto-approve');

      // Remove watchlist from config
      rmSync(join(testWorkspace, 'hypernative', 'watchlists'), { recursive: true, force: true });
      mkdirSync(join(testWorkspace, 'hypernative', 'watchlists'));

      // Apply changes
      const output = runCliCommand('apply --auto-approve');

      expect(output).toContain('deleted') || expect(output).toContain('destroyed');
    });
  });

  describe('State Management', () => {
    it('should maintain state consistency across operations', () => {
      createBasicConfig();

      // Apply configuration
      runCliCommand('apply --auto-approve');

      // Check state file
      const stateFile = join(testWorkspace, '.hypernative', 'state.json');
      expect(existsSync(stateFile)).toBe(true);

      const state = JSON.parse(readFileSync(stateFile, 'utf-8'));
      expect(state.version).toBe('1.0.0');
      expect(state.resources).toBeDefined();
      expect(Object.keys(state.resources).length).toBeGreaterThan(0);

      // Verify state has correct resource types
      const resourceKinds = Object.values(state.resources).map((r: any) => r.kind);
      expect(resourceKinds).toContain('notification_channel');
      expect(resourceKinds).toContain('watchlist');
    });

    it('should handle state corruption gracefully', () => {
      createBasicConfig();

      // Create corrupted state file
      const stateDir = join(testWorkspace, '.hypernative');
      mkdirSync(stateDir, { recursive: true });
      writeFileSync(join(stateDir, 'state.json'), 'invalid json{');

      const output = runCliCommand('plan', false);
      expect(output).toContain('State file is corrupted');
    });
  });

  describe('Configuration Validation', () => {
    it('should validate cross-references between resources', () => {
      const hypernativeDir = join(testWorkspace, 'hypernative');
      const channelsDir = join(hypernativeDir, 'notification-channels');
      const watchlistsDir = join(hypernativeDir, 'watchlists');

      mkdirSync(channelsDir, { recursive: true });
      mkdirSync(watchlistsDir, { recursive: true });

      // Create watchlist that references non-existent channel
      writeFileSync(
        join(watchlistsDir, 'bad-watchlist.yaml'),
        `
name: Bad Watchlist
description: References non-existent channel
assets: []
alert_config:
  notification_channels:
    - non-existent-channel
`
      );

      const output = runCliCommand('plan', false);
      expect(output).toContain('not found') || expect(output).toContain('validation failed');
    });

    it('should handle environment variable substitution', () => {
      process.env.E2E_TEST_CHANNEL_NAME = 'Dynamic Channel Name';

      const hypernativeDir = join(testWorkspace, 'hypernative');
      const channelsDir = join(hypernativeDir, 'notification-channels');
      mkdirSync(channelsDir, { recursive: true });

      writeFileSync(
        join(channelsDir, 'dynamic.yaml'),
        `
name: \${E2E_TEST_CHANNEL_NAME}
type: slack
enabled: true
webhook_url: https://hooks.slack.com/test
channel: "#test"
`
      );

      const output = runCliCommand('plan');
      expect(output).toContain('Dynamic Channel Name');

      delete process.env.E2E_TEST_CHANNEL_NAME;
    });

    it('should handle missing environment variables', () => {
      const hypernativeDir = join(testWorkspace, 'hypernative');
      const channelsDir = join(hypernativeDir, 'notification-channels');
      mkdirSync(channelsDir, { recursive: true });

      writeFileSync(
        join(channelsDir, 'missing-env.yaml'),
        `
name: Missing Env Channel
type: slack
enabled: true
webhook_url: \${MISSING_ENV_VAR}
channel: "#test"
`
      );

      const output = runCliCommand('plan', false);
      expect(output).toContain('MISSING_ENV_VAR is not defined');
    });
  });

  describe('Performance and Reliability', () => {
    it('should handle large configurations efficiently', () => {
      const hypernativeDir = join(testWorkspace, 'hypernative');
      const channelsDir = join(hypernativeDir, 'notification-channels');
      mkdirSync(channelsDir, { recursive: true });

      // Create multiple channels in single file
      let channelsContent = '';
      for (let i = 0; i < 20; i++) {
        channelsContent += `
name: Test Channel ${i}
type: slack
enabled: true
webhook_url: https://hooks.slack.com/test-${i}
channel: "#test-${i}"
${i < 19 ? '---' : ''}
`;
      }

      writeFileSync(join(channelsDir, 'many-channels.yaml'), channelsContent);

      const startTime = Date.now();
      const output = runCliCommand('plan');
      const duration = Date.now() - startTime;

      expect(output).toContain('20 to create');
      expect(duration).toBeLessThan(10000); // Should complete within 10 seconds
    });

    it('should handle network failures gracefully', () => {
      createBasicConfig();

      // Temporarily point to invalid API endpoint
      const originalUrl = process.env.HYPERNATIVE_API_URL;
      process.env.HYPERNATIVE_API_URL = 'https://invalid-api-endpoint.invalid';

      const output = runCliCommand('apply --auto-approve', false);

      // Should fail gracefully with appropriate error message
      expect(output).toContain('Failed to connect') || expect(output).toContain('network error');

      // Restore original URL
      process.env.HYPERNATIVE_API_URL = originalUrl;
    });
  });

  describe('Output Formats', () => {
    it('should support JSON output format', () => {
      createBasicConfig();

      const output = runCliCommand('plan --output json');

      // Should be valid JSON
      expect(() => JSON.parse(output)).not.toThrow();

      const planData = JSON.parse(output);
      expect(planData.changes).toBeDefined();
      expect(planData.metadata).toBeDefined();
    });

    it('should support quiet mode', () => {
      createBasicConfig();

      const output = runCliCommand('plan --quiet');

      // Should have minimal output
      expect(output.length).toBeLessThan(100);
    });
  });
});
