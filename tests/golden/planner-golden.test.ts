/**
 * Golden tests for plan output consistency
 * These tests ensure that plan output remains stable across changes
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Planner } from '../../src/lib/planner.js';
import { StateStore } from '../../src/lib/state-store.js';
import { TestFixture, GoldenTestHelper } from '../utils/test-helpers.js';
import { ChangeType } from '../../src/types/plan.js';
import type { ParsedConfig } from '../../src/schemas/config.schema.js';
import type { ExecutionPlan } from '../../src/types/plan.js';

describe('Golden Tests - Planner Output', () => {
  let planner: Planner;
  let testDir: string;
  let golden: GoldenTestHelper;

  beforeEach(() => {
    testDir = TestFixture.createTempDir('golden-planner');
    planner = new Planner(testDir);
    golden = new GoldenTestHelper();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Helper to normalize plan output for golden testing
  const normalizePlan = (plan: ExecutionPlan): any => {
    return {
      ...plan,
      metadata: {
        ...plan.metadata,
        // Remove dynamic fields for consistent comparisons
        plan_id: '[NORMALIZED]',
        created_at: '[NORMALIZED]',
        base_directory: '[NORMALIZED]',
      },
    };
  };

  describe('Create Operations', () => {
    it('should generate consistent plan for creating new resources', async () => {
      // Mock empty state
      vi.spyOn(StateStore.prototype, 'loadState').mockResolvedValue({
        version: '1.0.0',
        resources: {},
        metadata: {
          created_at: '2024-01-01T00:00:00Z',
          created_by_version: '0.1.0',
          total_resources: 0,
          resource_counts: { watchlists: 0, custom_agents: 0, notification_channels: 0 },
        },
      });

      const config: ParsedConfig = {
        notification_channels: {
          'slack-alerts': {
            name: 'Slack Alerts',
            type: 'slack',
            enabled: true,
            webhook_url: 'https://hooks.slack.com/services/TEST/TEST/TEST',
            channel: '#alerts',
          },
          'email-alerts': {
            name: 'Email Alerts',
            type: 'email',
            enabled: true,
            recipients: ['alerts@example.com'],
          },
        },
        watchlists: {
          'main-watchlist': {
            name: 'Main Watchlist',
            description: 'Primary asset monitoring list',
            assets: [
              {
                chain: 'ethereum',
                type: 'Wallet',
                address: '0x1234567890123456789012345678901234567890',
                name: 'Test Wallet',
              },
            ],
            alert_config: {
              notification_channels: ['slack-alerts'],
            },
          },
        },
        custom_agents: {
          'tx-monitor': {
            name: 'Transaction Monitor',
            description: 'Monitors large transactions',
            type: 'transaction_monitoring',
            enabled: true,
            notification_channels: ['email-alerts'],
            conditions: {
              transaction_amount_threshold: 1000000,
            },
          },
        },
      };

      const plan = await planner.generatePlan(config);
      const normalizedPlan = normalizePlan(plan);

      // Verify plan structure
      expect(plan.changes).toHaveLength(4); // 2 channels + 1 watchlist + 1 agent
      expect(plan.changes.every(c => c.change_type === ChangeType.CREATE)).toBe(true);
      expect(plan.summary.to_create).toBe(4);
      expect(plan.summary.to_update).toBe(0);

      // Compare with golden file
      const isMatch = golden.compareWithGolden('create-all-resources', normalizedPlan);
      expect(isMatch).toBe(true);
    });

    it('should generate consistent plan for dependency ordering', async () => {
      // Mock empty state
      vi.spyOn(StateStore.prototype, 'loadState').mockResolvedValue({
        version: '1.0.0',
        resources: {},
        metadata: {
          created_at: '2024-01-01T00:00:00Z',
          created_by_version: '0.1.0',
          total_resources: 0,
          resource_counts: { watchlists: 0, custom_agents: 0, notification_channels: 0 },
        },
      });

      const config: ParsedConfig = {
        notification_channels: {
          'channel-1': {
            name: 'Channel 1',
            type: 'slack',
            enabled: true,
            webhook_url: 'https://hooks.slack.com/1',
            channel: '#channel1',
          },
          'channel-2': {
            name: 'Channel 2',
            type: 'email',
            enabled: true,
            recipients: ['test2@example.com'],
          },
        },
        watchlists: {
          'watchlist-1': {
            name: 'Watchlist 1',
            description: 'First watchlist',
            assets: [],
            alert_config: {
              notification_channels: ['channel-1', 'channel-2'],
            },
          },
        },
        custom_agents: {
          'agent-1': {
            name: 'Agent 1',
            type: 'price_monitoring',
            enabled: true,
            notification_channels: ['channel-2'],
            conditions: {
              price_change_percentage: 5,
            },
          },
        },
      };

      const plan = await planner.generatePlan(config);
      const normalizedPlan = normalizePlan(plan);

      // Verify dependency ordering - channels should come first
      const channelIndices = plan.changes
        .filter(c => c.kind === 'notification_channel')
        .map(c => plan.changes.indexOf(c));
      const watchlistIndex = plan.changes.findIndex(c => c.kind === 'watchlist');
      const agentIndex = plan.changes.findIndex(c => c.kind === 'custom_agent');

      channelIndices.forEach(idx => {
        expect(idx).toBeLessThan(watchlistIndex);
        expect(idx).toBeLessThan(agentIndex);
      });

      const isMatch = golden.compareWithGolden('dependency-ordering', normalizedPlan);
      expect(isMatch).toBe(true);
    });
  });

  describe('Update Operations', () => {
    it('should generate consistent plan for updates', async () => {
      // Mock state with existing resources
      const existingState = {
        version: '1.0.0' as const,
        resources: {
          'slack-alerts': {
            kind: 'notification_channel' as const,
            name: 'slack-alerts',
            remote_id: 'nc_123',
            last_applied_hash: 'old_slack_hash',
            last_seen_remote_hash: 'old_slack_hash',
            metadata: {
              created_at: '2024-01-01T00:00:00Z',
              updated_at: '2024-01-01T00:00:00Z',
              created_by: 'test',
              cli_version: '0.1.0',
            },
          },
          'main-watchlist': {
            kind: 'watchlist' as const,
            name: 'main-watchlist',
            remote_id: 'wl_456',
            last_applied_hash: 'old_watchlist_hash',
            last_seen_remote_hash: 'old_watchlist_hash',
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
      };

      vi.spyOn(StateStore.prototype, 'loadState').mockResolvedValue(existingState);

      const config: ParsedConfig = {
        notification_channels: {
          'slack-alerts': {
            name: 'Slack Alerts Updated',
            type: 'slack',
            enabled: true,
            webhook_url: 'https://hooks.slack.com/services/NEW/URL',
            channel: '#updated-alerts',
          },
        },
        watchlists: {
          'main-watchlist': {
            name: 'Main Watchlist Updated',
            description: 'Updated description',
            assets: [
              {
                chain: 'ethereum',
                type: 'Token',
                address: '0xA0b86991c431e8c5F2cfae5C4F1b2A4c0b48F8C7',
                symbol: 'USDC',
              },
            ],
            alert_config: {
              notification_channels: ['slack-alerts'],
            },
          },
        },
        custom_agents: {},
      };

      const plan = await planner.generatePlan(config);
      const normalizedPlan = normalizePlan(plan);

      // Should have updates for both existing resources
      const updates = plan.changes.filter(c => c.change_type === ChangeType.UPDATE);
      expect(updates).toHaveLength(2);

      const isMatch = golden.compareWithGolden('update-resources', normalizedPlan);
      expect(isMatch).toBe(true);
    });
  });

  describe('Delete Operations', () => {
    it('should generate consistent plan for deletions', async () => {
      // Mock state with extra resources
      const stateWithExtra = {
        version: '1.0.0' as const,
        resources: {
          'keep-me': {
            kind: 'notification_channel' as const,
            name: 'keep-me',
            remote_id: 'nc_keep',
            last_applied_hash: 'keep_hash',
            last_seen_remote_hash: 'keep_hash',
            metadata: {
              created_at: '2024-01-01T00:00:00Z',
              updated_at: '2024-01-01T00:00:00Z',
              created_by: 'test',
              cli_version: '0.1.0',
            },
          },
          'delete-me': {
            kind: 'watchlist' as const,
            name: 'delete-me',
            remote_id: 'wl_delete',
            last_applied_hash: 'delete_hash',
            last_seen_remote_hash: 'delete_hash',
            metadata: {
              created_at: '2024-01-01T00:00:00Z',
              updated_at: '2024-01-01T00:00:00Z',
              created_by: 'test',
              cli_version: '0.1.0',
            },
          },
          'also-delete': {
            kind: 'custom_agent' as const,
            name: 'also-delete',
            remote_id: 'ca_delete',
            last_applied_hash: 'delete_hash_2',
            last_seen_remote_hash: 'delete_hash_2',
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
          total_resources: 3,
          resource_counts: {
            watchlists: 1,
            custom_agents: 1,
            notification_channels: 1,
          },
        },
      };

      vi.spyOn(StateStore.prototype, 'loadState').mockResolvedValue(stateWithExtra);

      // Config only has one resource - others should be deleted
      const config: ParsedConfig = {
        notification_channels: {
          'keep-me': {
            name: 'Keep Me',
            type: 'slack',
            enabled: true,
            webhook_url: 'https://hooks.slack.com/keep',
            channel: '#keep',
          },
        },
        watchlists: {},
        custom_agents: {},
      };

      const plan = await planner.generatePlan(config);
      const normalizedPlan = normalizePlan(plan);

      const deletes = plan.changes.filter(c => c.change_type === ChangeType.DELETE);
      expect(deletes).toHaveLength(2); // delete-me and also-delete

      const isMatch = golden.compareWithGolden('delete-resources', normalizedPlan);
      expect(isMatch).toBe(true);
    });
  });

  describe('Complex Mixed Operations', () => {
    it('should generate consistent plan for mixed operations', async () => {
      // Mock complex existing state
      const complexState = {
        version: '1.0.0' as const,
        resources: {
          'update-channel': {
            kind: 'notification_channel' as const,
            name: 'update-channel',
            remote_id: 'nc_update',
            last_applied_hash: 'old_update_hash',
            last_seen_remote_hash: 'old_update_hash',
            metadata: {
              created_at: '2024-01-01T00:00:00Z',
              updated_at: '2024-01-01T00:00:00Z',
              created_by: 'test',
              cli_version: '0.1.0',
            },
          },
          'delete-watchlist': {
            kind: 'watchlist' as const,
            name: 'delete-watchlist',
            remote_id: 'wl_delete',
            last_applied_hash: 'delete_hash',
            last_seen_remote_hash: 'delete_hash',
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
      };

      vi.spyOn(StateStore.prototype, 'loadState').mockResolvedValue(complexState);

      const config: ParsedConfig = {
        notification_channels: {
          'update-channel': {
            name: 'Updated Channel Name',
            type: 'slack',
            enabled: true,
            webhook_url: 'https://hooks.slack.com/updated',
            channel: '#updated',
          },
          'create-channel': {
            name: 'New Channel',
            type: 'email',
            enabled: true,
            recipients: ['new@example.com'],
          },
        },
        watchlists: {
          'create-watchlist': {
            name: 'New Watchlist',
            description: 'Newly created watchlist',
            assets: [],
            alert_config: {
              notification_channels: ['create-channel'],
            },
          },
        },
        custom_agents: {
          'create-agent': {
            name: 'New Agent',
            type: 'price_monitoring',
            enabled: true,
            notification_channels: ['update-channel'],
            conditions: {
              price_change_percentage: 10,
            },
          },
        },
      };

      const plan = await planner.generatePlan(config);
      const normalizedPlan = normalizePlan(plan);

      // Should have mixed operations
      const creates = plan.changes.filter(c => c.change_type === ChangeType.CREATE);
      const updates = plan.changes.filter(c => c.change_type === ChangeType.UPDATE);
      const deletes = plan.changes.filter(c => c.change_type === ChangeType.DELETE);

      expect(creates).toHaveLength(3); // new channel, watchlist, agent
      expect(updates).toHaveLength(1); // updated channel
      expect(deletes).toHaveLength(1); // delete watchlist

      // Verify dependency ordering still works with mixed operations
      const updateChannelIndex = plan.changes.findIndex(c => 
        c.name === 'update-channel' && c.change_type === ChangeType.UPDATE
      );
      const createAgentIndex = plan.changes.findIndex(c => c.name === 'create-agent');
      
      expect(updateChannelIndex).toBeLessThan(createAgentIndex);

      const isMatch = golden.compareWithGolden('mixed-operations', normalizedPlan);
      expect(isMatch).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should generate consistent plan with no changes', async () => {
      // Mock state that exactly matches config
      const matchingState = TestFixture.createMockState();
      
      // Mock fingerprint generation to return consistent hashes
      vi.mock('../../src/lib/fingerprint.js', () => ({
        generateFingerprint: vi.fn((obj) => {
          // Create deterministic hash based on object content
          const str = JSON.stringify(obj);
          return 'hash_' + str.length.toString(16);
        }),
      }));

      vi.spyOn(StateStore.prototype, 'loadState').mockResolvedValue(matchingState);

      const config = TestFixture.createMockConfig();
      const plan = await planner.generatePlan(config);
      const normalizedPlan = normalizePlan(plan);

      // Should be mostly no-change operations
      const noChanges = plan.changes.filter(c => c.change_type === ChangeType.NO_CHANGE);
      expect(noChanges.length).toBeGreaterThan(0);

      const isMatch = golden.compareWithGolden('no-changes', normalizedPlan);
      expect(isMatch).toBe(true);
    });

    it('should handle empty configuration consistently', async () => {
      vi.spyOn(StateStore.prototype, 'loadState').mockResolvedValue({
        version: '1.0.0',
        resources: {},
        metadata: {
          created_at: '2024-01-01T00:00:00Z',
          created_by_version: '0.1.0',
          total_resources: 0,
          resource_counts: { watchlists: 0, custom_agents: 0, notification_channels: 0 },
        },
      });

      const emptyConfig: ParsedConfig = {
        notification_channels: {},
        watchlists: {},
        custom_agents: {},
      };

      const plan = await planner.generatePlan(emptyConfig);
      const normalizedPlan = normalizePlan(plan);

      expect(plan.changes).toHaveLength(0);
      expect(plan.summary.total_resources).toBe(0);

      const isMatch = golden.compareWithGolden('empty-config', normalizedPlan);
      expect(isMatch).toBe(true);
    });
  });

  describe('Update Golden Files', () => {
    // This test can be used to regenerate golden files when intentional changes are made
    // Run with UPDATE_GOLDEN=1 environment variable to update all golden files
    it.skipIf(!process.env.UPDATE_GOLDEN)('should update all golden files', async () => {
      // This would re-run all the above tests but with updateGolden instead of compareWithGolden
      // Implementation would go here if needed for maintenance
      console.log('Golden files update mode - skipping comparison tests');
    });
  });
});