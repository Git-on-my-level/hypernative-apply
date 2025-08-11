/**
 * Test helper utilities for mocking and fixtures
 */

import nock from 'nock';
import { join } from 'path';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import type { ParsedConfig } from '../../src/schemas/config.schema.js';
import type { StateFile } from '../../src/types/state.js';
import type { ApiWatchlist, ApiNotificationChannel, ApiCustomAgent } from '../../src/types/api.js';

/**
 * Mock API client responses
 */
export class MockApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = 'https://api.hypernative.xyz') {
    this.baseUrl = baseUrl;
  }

  /**
   * Mock successful watchlist creation
   */
  mockCreateWatchlist(payload: any, response: ApiWatchlist) {
    return nock(this.baseUrl).post('/watchlists').reply(201, response);
  }

  /**
   * Mock successful watchlist update
   */
  mockUpdateWatchlist(id: string, payload: any, response: ApiWatchlist) {
    return nock(this.baseUrl).patch(`/watchlists/${id}`).reply(200, response);
  }

  /**
   * Mock watchlist deletion
   */
  mockDeleteWatchlist(id: string) {
    return nock(this.baseUrl).delete(`/watchlists/${id}`).reply(204);
  }

  /**
   * Mock get watchlist by ID
   */
  mockGetWatchlist(id: string, response: ApiWatchlist | null) {
    if (response === null) {
      return nock(this.baseUrl)
        .get(`/watchlists/${id}`)
        .reply(404, { error: 'Watchlist not found' });
    }

    return nock(this.baseUrl).get(`/watchlists/${id}`).reply(200, response);
  }

  /**
   * Mock list watchlists
   */
  mockListWatchlists(response: ApiWatchlist[]) {
    return nock(this.baseUrl).get('/watchlists').reply(200, { data: response });
  }

  /**
   * Mock notification channel operations
   */
  mockCreateChannel(payload: any, response: ApiNotificationChannel) {
    return nock(this.baseUrl).post('/notification-channels').reply(201, response);
  }

  mockUpdateChannel(id: string, payload: any, response: ApiNotificationChannel) {
    return nock(this.baseUrl).patch(`/notification-channels/${id}`).reply(200, response);
  }

  mockDeleteChannel(id: string) {
    return nock(this.baseUrl).delete(`/notification-channels/${id}`).reply(204);
  }

  /**
   * Mock custom agent operations
   */
  mockCreateAgent(payload: any, response: ApiCustomAgent) {
    return nock(this.baseUrl).post('/custom-agents').reply(201, response);
  }

  mockUpdateAgent(id: string, payload: any, response: ApiCustomAgent) {
    return nock(this.baseUrl).patch(`/custom-agents/${id}`).reply(200, response);
  }

  mockDeleteAgent(id: string) {
    return nock(this.baseUrl).delete(`/custom-agents/${id}`).reply(204);
  }

  /**
   * Mock API errors
   */
  mockApiError(
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    path: string,
    statusCode: number,
    error: any
  ) {
    const nockInstance = nock(this.baseUrl);

    switch (method) {
      case 'GET':
        return nockInstance.get(path).reply(statusCode, error);
      case 'POST':
        return nockInstance.post(path).reply(statusCode, error);
      case 'PATCH':
        return nockInstance.patch(path).reply(statusCode, error);
      case 'DELETE':
        return nockInstance.delete(path).reply(statusCode, error);
    }
  }
}

/**
 * Create test fixtures and temporary directories
 */
export class TestFixture {
  static createTempDir(name: string): string {
    const tempDir = join(process.cwd(), `.test-${name}-${Date.now()}`);
    mkdirSync(tempDir, { recursive: true });
    return tempDir;
  }

  static createMockConfig(): ParsedConfig {
    return {
      notification_channels: {
        'test-slack': {
          name: 'Test Slack',
          type: 'slack',
          enabled: true,
          webhook_url: 'https://hooks.slack.com/test',
          channel: '#alerts',
        },
        'test-email': {
          name: 'Test Email',
          type: 'email',
          enabled: true,
          recipients: ['test@example.com'],
        },
      },
      watchlists: {
        'test-watchlist': {
          name: 'Test Watchlist',
          description: 'Test watchlist for unit tests',
          assets: [
            {
              chain: 'ethereum',
              type: 'Wallet',
              address: '0x1234567890123456789012345678901234567890',
              name: 'Test Wallet',
            },
          ],
          alert_config: {
            notification_channels: ['test-slack'],
          },
        },
      },
      custom_agents: {
        'test-agent': {
          name: 'Test Agent',
          description: 'Test custom agent',
          type: 'transaction_monitoring',
          enabled: true,
          notification_channels: ['test-email'],
          conditions: {
            transaction_amount_threshold: 1000000,
          },
        },
      },
    };
  }

  static createMockState(): StateFile {
    return {
      version: '1.0.0',
      resources: {
        'test-slack': {
          kind: 'notification_channel',
          name: 'test-slack',
          remote_id: 'nc_123',
          last_applied_hash: 'hash123',
          last_seen_remote_hash: 'hash123',
          metadata: {
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            created_by: 'test',
            cli_version: '0.1.0',
          },
        },
        'test-watchlist': {
          kind: 'watchlist',
          name: 'test-watchlist',
          remote_id: 'wl_456',
          last_applied_hash: 'hash456',
          last_seen_remote_hash: 'hash456',
          metadata: {
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            created_by: 'test',
            cli_version: '0.1.0',
          },
        },
      },
      metadata: {
        created_at: '2024-01-01T00:00:00Z',
        created_by_version: '0.1.0',
        total_resources: 2,
        resource_counts: {
          watchlists: 1,
          custom_agents: 0,
          notification_channels: 1,
        },
      },
      last_sync: '2024-01-01T00:00:00Z',
    };
  }

  static createMockWatchlist(): ApiWatchlist {
    return {
      id: 'wl_test_123',
      name: 'Test Watchlist',
      description: 'Test watchlist for unit tests',
      asset_count: 1,
      alert_policy: 'default_policy',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      enabled: true,
      assets: [
        {
          chain: 'ethereum',
          type: 'Wallet',
          address: '0x1234567890123456789012345678901234567890',
          name: 'Test Wallet',
        },
      ],
    };
  }

  static createMockNotificationChannel(): ApiNotificationChannel {
    return {
      id: 'nc_test_123',
      name: 'Test Slack',
      type: 'slack',
      enabled: true,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      webhook_url: 'https://hooks.slack.com/test',
      channel: '#alerts',
    };
  }

  static createMockCustomAgent(): ApiCustomAgent {
    return {
      id: 'ca_test_123',
      name: 'Test Agent',
      description: 'Test custom agent',
      type: 'transaction_monitoring',
      enabled: true,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      notification_channels: ['nc_test_123'],
      conditions: {
        transaction_amount_threshold: 1000000,
      },
    };
  }

  /**
   * Write test config files to filesystem
   */
  static writeConfigFiles(baseDir: string, config: ParsedConfig): void {
    const hypernativeDir = join(baseDir, 'hypernative');

    // Create directories
    mkdirSync(join(hypernativeDir, 'notification-channels'), { recursive: true });
    mkdirSync(join(hypernativeDir, 'watchlists'), { recursive: true });
    mkdirSync(join(hypernativeDir, 'custom-agents'), { recursive: true });

    // Write notification channels
    Object.entries(config.notification_channels).forEach(([name, channel]) => {
      const filePath = join(hypernativeDir, 'notification-channels', `${name}.yaml`);
      writeFileSync(
        filePath,
        `name: ${channel.name}\ntype: ${channel.type}\nenabled: ${channel.enabled}\n`
      );
    });

    // Write watchlists
    Object.entries(config.watchlists).forEach(([name, watchlist]) => {
      const filePath = join(hypernativeDir, 'watchlists', `${name}.yaml`);
      writeFileSync(filePath, `name: ${watchlist.name}\ndescription: ${watchlist.description}\n`);
    });

    // Write custom agents
    Object.entries(config.custom_agents).forEach(([name, agent]) => {
      const filePath = join(hypernativeDir, 'custom-agents', `${name}.yaml`);
      writeFileSync(
        filePath,
        `name: ${agent.name}\ntype: ${agent.type}\nenabled: ${agent.enabled}\n`
      );
    });
  }
}

/**
 * Golden test utilities for plan output
 */
export class GoldenTestHelper {
  private goldenDir: string;

  constructor(goldenDir: string = join(process.cwd(), 'tests', 'fixtures', 'golden')) {
    this.goldenDir = goldenDir;
    mkdirSync(this.goldenDir, { recursive: true });
  }

  /**
   * Compare actual output with golden file
   */
  compareWithGolden(testName: string, actual: any): boolean {
    const goldenPath = join(this.goldenDir, `${testName}.json`);
    const actualJson = JSON.stringify(actual, null, 2);

    try {
      const goldenJson = readFileSync(goldenPath, 'utf-8');
      return actualJson === goldenJson;
    } catch (error) {
      // Golden file doesn't exist, create it
      writeFileSync(goldenPath, actualJson);
      console.log(`Created golden file: ${goldenPath}`);
      return true;
    }
  }

  /**
   * Update golden file (for when output intentionally changes)
   */
  updateGolden(testName: string, actual: any): void {
    const goldenPath = join(this.goldenDir, `${testName}.json`);
    const actualJson = JSON.stringify(actual, null, 2);
    writeFileSync(goldenPath, actualJson);
    console.log(`Updated golden file: ${goldenPath}`);
  }
}
