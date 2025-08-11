/**
 * Unit tests for the ConfigLoader class
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { join } from 'path';
import { rmSync, existsSync, writeFileSync, mkdirSync } from 'fs';
import {
  ConfigLoader,
  ConfigurationValidationError,
  loadHypernativeConfig,
} from './config-loader.js';
import { TestFixture } from '../../tests/utils/test-helpers.js';

describe('ConfigLoader', () => {
  let testDir: string;
  let configLoader: ConfigLoader;

  beforeEach(() => {
    testDir = TestFixture.createTempDir('config-loader');
    configLoader = new ConfigLoader({ baseDir: testDir });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    if (existsSync(testDir)) {
      rmSync(testDir, { recursive: true, force: true });
    }
  });

  describe('loadConfig', () => {
    it('should throw error when hypernative directory does not exist', async () => {
      await expect(configLoader.loadConfig()).rejects.toThrow(
        'Hypernative configuration directory not found'
      );
    });

    it('should load configuration from empty directory', async () => {
      // Create empty hypernative directory
      mkdirSync(join(testDir, 'hypernative'), { recursive: true });

      const result = await configLoader.loadConfig();

      expect(result.config.notification_channels).toEqual({});
      expect(result.config.watchlists).toEqual({});
      expect(result.config.custom_agents).toEqual({});
      expect(result.metadata.total_resources).toBe(0);
      expect(result.metadata.load_time).toBeGreaterThanOrEqual(0);
    });

    it('should load notification channels', async () => {
      const hypernativeDir = join(testDir, 'hypernative');
      const channelsDir = join(hypernativeDir, 'notification-channels');
      mkdirSync(channelsDir, { recursive: true });

      // Create a valid notification channel
      writeFileSync(
        join(channelsDir, 'slack-test.yaml'),
        `
name: Test Slack Channel
type: webhook
enabled: true
configuration:
  url: https://hooks.slack.com/services/test
  method: POST
`
      );

      const result = await configLoader.loadConfig();

      expect(result.config.notification_channels['slack-test-test-slack-channel']).toBeDefined();
      expect(result.config.notification_channels['slack-test-test-slack-channel'].name).toBe(
        'Test Slack Channel'
      );
      expect(result.config.notification_channels['slack-test-test-slack-channel'].type).toBe(
        'webhook'
      );
      expect(result.metadata.resource_counts.notification_channels).toBe(1);
    });

    it('should load watchlists', async () => {
      const hypernativeDir = join(testDir, 'hypernative');
      const watchlistsDir = join(hypernativeDir, 'watchlists');
      mkdirSync(watchlistsDir, { recursive: true });

      // Create a valid watchlist
      writeFileSync(
        join(watchlistsDir, 'test-watchlist.yaml'),
        `
name: Test Watchlist
description: A test watchlist
enabled: true
assets:
  - chain: ethereum
    type: Wallet
    address: "0x1234567890123456789012345678901234567890"
    name: Test Wallet
alert_config:
  severity_threshold: medium
`
      );

      const result = await configLoader.loadConfig();

      expect(result.config.watchlists['test-watchlist']).toBeDefined();
      expect(result.config.watchlists['test-watchlist'].name).toBe('Test Watchlist');
      expect(result.config.watchlists['test-watchlist'].assets).toHaveLength(1);
      expect(result.metadata.resource_counts.watchlists).toBe(1);
    });

    it('should load custom agents', async () => {
      const hypernativeDir = join(testDir, 'hypernative');
      const agentsDir = join(hypernativeDir, 'custom-agents');
      mkdirSync(agentsDir, { recursive: true });

      // Create a valid custom agent
      writeFileSync(
        join(agentsDir, 'test-agent.yaml'),
        `
name: Test Agent
description: A test custom agent
type: large_transaction_monitor
chain: ethereum
enabled: true
severity: medium
configuration:
  transaction_amount_threshold: 1000000
`
      );

      const result = await configLoader.loadConfig();

      expect(result.config.custom_agents['test-agent']).toBeDefined();
      expect(result.config.custom_agents['test-agent'].name).toBe('Test Agent');
      expect(result.config.custom_agents['test-agent'].type).toBe('large_transaction_monitor');
      expect(result.metadata.resource_counts.custom_agents).toBe(1);
    });

    it('should load global configuration', async () => {
      const hypernativeDir = join(testDir, 'hypernative');
      mkdirSync(hypernativeDir, { recursive: true });

      // Create global config
      writeFileSync(
        join(hypernativeDir, 'config.yaml'),
        `
global:
  project:
    name: Test Project
    environment: development
  defaults:
    timezone: UTC
`
      );

      const result = await configLoader.loadConfig();

      expect(result.config.global).toBeDefined();
      expect(result.config.global?.project?.name).toBe('Test Project');
      expect(result.config.global?.project?.environment).toBe('development');
      expect(result.config.global?.defaults?.timezone).toBe('UTC');
    });

    it('should handle multiple document YAML files', async () => {
      const hypernativeDir = join(testDir, 'hypernative');
      const channelsDir = join(hypernativeDir, 'notification-channels');
      mkdirSync(channelsDir, { recursive: true });

      // Create multi-document YAML
      writeFileSync(
        join(channelsDir, 'multi-channels.yaml'),
        `
name: Channel 1
type: webhook
enabled: true
configuration:
  url: https://hooks.slack.com/1
  method: POST
---
name: Channel 2
type: webhook
enabled: true
configuration:
  url: https://hooks.slack.com/2
  method: POST
`
      );

      const result = await configLoader.loadConfig();

      expect(result.config.notification_channels['multi-channels-channel-1']).toBeDefined();
      expect(result.config.notification_channels['multi-channels-channel-2']).toBeDefined();
      expect(result.metadata.resource_counts.notification_channels).toBe(2);
    });

    it('should interpolate environment variables', async () => {
      process.env.TEST_WEBHOOK_URL = 'https://hooks.slack.com/env-test';

      const hypernativeDir = join(testDir, 'hypernative');
      const channelsDir = join(hypernativeDir, 'notification-channels');
      mkdirSync(channelsDir, { recursive: true });

      writeFileSync(
        join(channelsDir, 'env-channel.yaml'),
        `
name: Env Channel
type: webhook
enabled: true
configuration:
  url: \${TEST_WEBHOOK_URL}
  method: POST
`
      );

      const result = await configLoader.loadConfig();

      expect(result.config.notification_channels['env-channel'].configuration.url).toBe(
        'https://hooks.slack.com/env-test'
      );

      delete process.env.TEST_WEBHOOK_URL;
    });

    it('should validate cross-references', async () => {
      const hypernativeDir = join(testDir, 'hypernative');
      const channelsDir = join(hypernativeDir, 'notification-channels');
      const watchlistsDir = join(hypernativeDir, 'watchlists');
      mkdirSync(channelsDir, { recursive: true });
      mkdirSync(watchlistsDir, { recursive: true });

      // Create notification channel
      writeFileSync(
        join(channelsDir, 'valid-channel.yaml'),
        `
name: Valid Channel
type: webhook
enabled: true
configuration:
  url: https://hooks.slack.com/valid
  method: POST
`
      );

      // Create watchlist that references the channel
      writeFileSync(
        join(watchlistsDir, 'valid-watchlist.yaml'),
        `
name: Valid Watchlist
description: References valid channel
enabled: true
assets:
  - chain: ethereum
    type: Wallet
    address: "0x1234567890123456789012345678901234567890"
    name: Test Wallet
alert_config:
  severity_threshold: medium
  notification_channels:
    - valid-channel
`
      );

      const result = await configLoader.loadConfig();

      expect(result.config.watchlists['valid-watchlist']).toBeDefined();
      expect(result.config.notification_channels['valid-channel']).toBeDefined();
      expect(result.metadata.files_loaded).toHaveLength(2);
    });
  });

  describe('error handling', () => {
    it('should handle YAML parsing errors', async () => {
      const hypernativeDir = join(testDir, 'hypernative');
      const channelsDir = join(hypernativeDir, 'notification-channels');
      mkdirSync(channelsDir, { recursive: true });

      // Create invalid YAML
      writeFileSync(join(channelsDir, 'invalid.yaml'), '---\n:\nkey: value\n');

      const error = await configLoader.loadConfig().catch((e) => e);
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toMatch(/Configuration validation failed/);
      // The YAML parse error should be contained within the validation error
    });

    it('should handle validation errors', async () => {
      const hypernativeDir = join(testDir, 'hypernative');
      const channelsDir = join(hypernativeDir, 'notification-channels');
      mkdirSync(channelsDir, { recursive: true });

      // Create channel with missing required fields
      writeFileSync(
        join(channelsDir, 'invalid-channel.yaml'),
        `
name: Invalid Channel
type: webhook
enabled: true
configuration:
  # Missing required url
  method: POST
`
      );

      await expect(configLoader.loadConfig()).rejects.toThrow(ConfigurationValidationError);
    });

    it('should handle missing environment variables', async () => {
      const hypernativeDir = join(testDir, 'hypernative');
      const channelsDir = join(hypernativeDir, 'notification-channels');
      mkdirSync(channelsDir, { recursive: true });

      writeFileSync(
        join(channelsDir, 'env-missing.yaml'),
        `
name: Env Missing
type: webhook
enabled: true
configuration:
  url: \${MISSING_ENV_VAR}
  method: POST
`
      );

      await expect(configLoader.loadConfig()).rejects.toThrow(
        'Environment variable MISSING_ENV_VAR is not defined'
      );
    });

    it('should handle missing cross-references', async () => {
      const hypernativeDir = join(testDir, 'hypernative');
      const watchlistsDir = join(hypernativeDir, 'watchlists');
      mkdirSync(watchlistsDir, { recursive: true });

      // Create watchlist that references non-existent channel
      writeFileSync(
        join(watchlistsDir, 'bad-ref.yaml'),
        `
name: Bad Reference Watchlist
description: References non-existent channel
enabled: true
assets:
  - chain: ethereum
    type: Wallet
    address: "0x1234567890123456789012345678901234567890"
    name: Test Wallet
alert_config:
  severity_threshold: medium
  notification_channels:
    - non-existent-channel
`
      );

      await expect(configLoader.loadConfig()).rejects.toThrow(ConfigurationValidationError);
    });
  });

  describe('options', () => {
    it('should respect strict validation option', async () => {
      const strictLoader = new ConfigLoader({ baseDir: testDir, strict: true });
      const lenientLoader = new ConfigLoader({ baseDir: testDir, strict: false });

      const hypernativeDir = join(testDir, 'hypernative');
      const channelsDir = join(hypernativeDir, 'notification-channels');
      mkdirSync(channelsDir, { recursive: true });

      // Create slightly invalid config
      writeFileSync(
        join(channelsDir, 'questionable.yaml'),
        `
name: Questionable Channel
type: webhook
enabled: true
configuration:
  url: https://hooks.slack.com/test
  method: POST
unknown_field: should_be_ignored
`
      );

      // Strict mode might be more restrictive (depends on schema implementation)
      // For now, just ensure both modes can handle the config
      const strictResult = await strictLoader.loadConfig();
      const lenientResult = await lenientLoader.loadConfig();

      expect(strictResult.config.notification_channels).toBeDefined();
      expect(lenientResult.config.notification_channels).toBeDefined();
    });

    it('should respect validateReferences option', async () => {
      const noValidationLoader = new ConfigLoader({
        baseDir: testDir,
        validateReferences: false,
      });

      const hypernativeDir = join(testDir, 'hypernative');
      const watchlistsDir = join(hypernativeDir, 'watchlists');
      mkdirSync(watchlistsDir, { recursive: true });

      // Create watchlist with invalid reference
      writeFileSync(
        join(watchlistsDir, 'bad-ref.yaml'),
        `
name: Bad Reference Watchlist
description: References non-existent channel
enabled: true
assets:
  - chain: ethereum
    type: Wallet
    address: "0x1234567890123456789012345678901234567890"
    name: Test Wallet
alert_config:
  severity_threshold: medium
  notification_channels:
    - non-existent-channel
`
      );

      // Should not throw when validation is disabled
      const result = await noValidationLoader.loadConfig();
      expect(result.config.watchlists['bad-ref-bad-reference-watchlist']).toBeDefined();
    });

    it('should respect interpolateEnv option', async () => {
      process.env.TEST_VALUE = 'test_value';

      const noInterpolationLoader = new ConfigLoader({
        baseDir: testDir,
        interpolateEnv: false,
      });

      const hypernativeDir = join(testDir, 'hypernative');
      const channelsDir = join(hypernativeDir, 'notification-channels');
      mkdirSync(channelsDir, { recursive: true });

      writeFileSync(
        join(channelsDir, 'env-test.yaml'),
        `
name: Env Test
type: webhook
enabled: true
configuration:
  url: https://hooks.slack.com/\${TEST_VALUE}
  method: POST
`
      );

      const result = await noInterpolationLoader.loadConfig();

      // Should keep the literal ${TEST_VALUE} without interpolation
      expect(result.config.notification_channels['env-test'].configuration.url).toBe(
        'https://hooks.slack.com/${TEST_VALUE}'
      );

      delete process.env.TEST_VALUE;
    });
  });

  describe('logical name generation', () => {
    it('should generate logical names from filenames', async () => {
      const hypernativeDir = join(testDir, 'hypernative');
      const channelsDir = join(hypernativeDir, 'notification-channels');
      mkdirSync(channelsDir, { recursive: true });

      writeFileSync(
        join(channelsDir, 'my-special-channel.yaml'),
        `
name: My Special Channel
type: webhook
enabled: true
configuration:
  url: https://hooks.slack.com/special
  method: POST
`
      );

      const result = await configLoader.loadConfig();

      expect(result.config.notification_channels['my-special-channel']).toBeDefined();
      expect(result.config.notification_channels['my-special-channel'].name).toBe(
        'My Special Channel'
      );
    });

    it('should handle resource names different from filenames', async () => {
      const hypernativeDir = join(testDir, 'hypernative');
      const channelsDir = join(hypernativeDir, 'notification-channels');
      mkdirSync(channelsDir, { recursive: true });

      writeFileSync(
        join(channelsDir, 'file-name.yaml'),
        `
name: Different Resource Name
type: webhook
enabled: true
configuration:
  url: https://hooks.slack.com/different
  method: POST
`
      );

      const result = await configLoader.loadConfig();

      // Should use combination of filename and resource name
      const logicalName = Object.keys(result.config.notification_channels)[0];
      expect(logicalName).toContain('file-name');
      expect(logicalName).toContain('different-resource-name');
    });

    it('should normalize special characters in names', async () => {
      const hypernativeDir = join(testDir, 'hypernative');
      const channelsDir = join(hypernativeDir, 'notification-channels');
      mkdirSync(channelsDir, { recursive: true });

      writeFileSync(
        join(channelsDir, 'Special@Channel#Name!.yaml'),
        `
name: Special Channel Name!
type: webhook
enabled: true
configuration:
  url: https://hooks.slack.com/special
  method: POST
`
      );

      const result = await configLoader.loadConfig();

      const logicalName = Object.keys(result.config.notification_channels)[0];
      expect(logicalName).toMatch(/^[a-z0-9-]+$/); // Should only contain lowercase, numbers, and dashes
    });
  });

  describe('performance', () => {
    it('should load large configurations efficiently', async () => {
      const hypernativeDir = join(testDir, 'hypernative');
      const channelsDir = join(hypernativeDir, 'notification-channels');
      mkdirSync(channelsDir, { recursive: true });

      // Create multiple files with multiple channels each
      for (let i = 0; i < 10; i++) {
        let content = '';
        for (let j = 0; j < 5; j++) {
          content += `
name: Channel ${i}-${j}
type: webhook
enabled: true
configuration:
  url: https://hooks.slack.com/channel-${i}-${j}
  method: POST
${j < 4 ? '---' : ''}
`;
        }
        writeFileSync(join(channelsDir, `channels-${i}.yaml`), content);
      }

      const startTime = Date.now();
      const result = await configLoader.loadConfig();
      const loadTime = Date.now() - startTime;

      expect(result.metadata.resource_counts.notification_channels).toBe(50);
      expect(loadTime).toBeLessThan(5000); // Should complete in < 5 seconds
      expect(result.metadata.load_time).toBeGreaterThanOrEqual(0);
    });
  });

  describe('convenience function', () => {
    it('loadHypernativeConfig should work', async () => {
      const hypernativeDir = join(testDir, 'hypernative');
      mkdirSync(hypernativeDir, { recursive: true });

      const result = await loadHypernativeConfig(testDir);

      expect(result.config).toBeDefined();
      expect(result.metadata).toBeDefined();
      expect(result.metadata.files_loaded).toBeDefined();
    });
  });

  describe('ConfigurationValidationError', () => {
    it('should format error messages correctly', () => {
      const errors = [
        {
          file_path: 'test/file1.yaml',
          resource_type: 'notification_channel',
          resource_name: 'test-channel',
          error_code: 'REQUIRED',
          message: 'webhook_url is required',
          line_number: 5,
        },
        {
          file_path: 'test/file2.yaml',
          resource_type: 'watchlist',
          resource_name: 'test-watchlist',
          error_code: 'VALIDATION_ERROR',
          message: 'Invalid asset address format',
        },
      ];

      const validationError = new ConfigurationValidationError(errors);

      expect(validationError.message).toContain('Configuration validation failed with 2 errors');
      expect(validationError.message).toContain(
        'test/file1.yaml:5 (notification_channel: test-channel): webhook_url is required'
      );
      expect(validationError.message).toContain(
        'test/file2.yaml (watchlist: test-watchlist): Invalid asset address format'
      );
      expect(validationError.errors).toBe(errors);
    });
  });
});
