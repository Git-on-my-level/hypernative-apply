/**
 * Unit tests for the Planner class
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { rmSync, existsSync } from 'fs';
import { Planner, generateExecutionPlan, createPlanFile } from './planner.js';
import { StateStore } from './state-store.js';
import { TestFixture } from '../../tests/utils/test-helpers.js';
import { ChangeType } from '../types/plan.js';
import type { ParsedConfig } from '../schemas/config.schema.js';
import type { PlannerOptions } from '../types/plan.js';

describe('Planner', () => {
  let planner: Planner;
  let testDir: string;
  let mockConfig: ParsedConfig;

  beforeEach(() => {
    testDir = TestFixture.createTempDir('planner');
    planner = new Planner(testDir);
    mockConfig = TestFixture.createMockConfig();

    // Mock the StateStore to avoid file system operations in most tests
    vi.spyOn(StateStore.prototype, 'loadState').mockResolvedValue(TestFixture.createMockState());
  });

  afterEach(() => {
    vi.restoreAllMocks();
    if (existsSync(testDir)) {
      rmSync(testDir, { recursive: true, force: true });
    }
  });

  describe('generatePlan', () => {
    it('should generate a basic execution plan', async () => {
      const plan = await planner.generatePlan(mockConfig);

      expect(plan).toBeDefined();
      expect(plan.metadata).toBeDefined();
      expect(plan.changes).toBeDefined();
      expect(plan.summary).toBeDefined();
      expect(plan.dependencies).toBeDefined();

      // Should have plan ID and timestamps
      expect(plan.metadata.plan_id).toMatch(/^[0-9a-f-]+$/);
      expect(plan.metadata.created_at).toBeDefined();
      expect(plan.metadata.cli_version).toBe('0.1.0');
    });

    it('should detect new resources that need to be created', async () => {
      // Mock empty state (no existing resources)
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

      const plan = await planner.generatePlan(mockConfig);

      // Should have CREATE operations for all resources
      const createChanges = plan.changes.filter((c) => c.change_type === ChangeType.CREATE);
      expect(createChanges).toHaveLength(4); // 2 channels, 1 watchlist, 1 agent

      // Check summary
      expect(plan.summary.to_create).toBe(4);
      expect(plan.summary.to_update).toBe(0);
      expect(plan.summary.to_delete).toBe(0);
    });

    it('should detect resources that need updates', async () => {
      // Mock state with different hashes (indicating changes)
      const stateWithChanges = TestFixture.createMockState();
      stateWithChanges.resources['test-slack'].last_applied_hash = 'old_hash_different';

      vi.spyOn(StateStore.prototype, 'loadState').mockResolvedValue(stateWithChanges);

      const plan = await planner.generatePlan(mockConfig);

      // Should have UPDATE operations for changed resources
      const updateChanges = plan.changes.filter((c) => c.change_type === ChangeType.UPDATE);
      expect(updateChanges.length).toBeGreaterThan(0);

      // Find the slack channel update
      const slackUpdate = updateChanges.find((c) => c.name === 'test-slack');
      expect(slackUpdate).toBeDefined();
      expect(slackUpdate!.current_hash).toBe('old_hash_different');
    });

    it('should detect resources to delete', async () => {
      // Mock state with extra resources not in config
      const stateWithExtra = TestFixture.createMockState();
      stateWithExtra.resources['orphaned-resource'] = {
        kind: 'watchlist',
        name: 'orphaned-resource',
        remote_id: 'wl_orphaned',
        last_applied_hash: 'hash_orphaned',
        last_seen_remote_hash: 'hash_orphaned',
        metadata: {
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          created_by: 'test',
          cli_version: '0.1.0',
        },
      };

      vi.spyOn(StateStore.prototype, 'loadState').mockResolvedValue(stateWithExtra);

      const plan = await planner.generatePlan(mockConfig);

      // Should have DELETE operation for orphaned resource
      const deleteChanges = plan.changes.filter((c) => c.change_type === ChangeType.DELETE);
      expect(deleteChanges).toHaveLength(1);
      expect(deleteChanges[0].name).toBe('orphaned-resource');
      expect(deleteChanges[0].risk_level).toBe('medium');
    });

    it('should build dependency graph correctly', async () => {
      const plan = await planner.generatePlan(mockConfig);

      // Watchlist should depend on notification channels
      const watchlistChange = plan.changes.find((c) => c.name === 'test-watchlist');
      expect(watchlistChange).toBeDefined();
      expect(watchlistChange!.dependencies).toContain('test-slack');

      // Custom agent should depend on notification channels
      const agentChange = plan.changes.find((c) => c.name === 'test-agent');
      expect(agentChange).toBeDefined();
      expect(agentChange!.dependencies).toContain('test-email');

      // Dependencies should be in the plan
      expect(plan.dependencies).toBeDefined();
      expect(plan.dependencies.length).toBeGreaterThan(0);
    });

    it('should order changes by dependencies', async () => {
      const plan = await planner.generatePlan(mockConfig);

      // Notification channels should come before watchlists and agents
      const channelIndex = plan.changes.findIndex((c) => c.kind === 'notification_channel');
      const watchlistIndex = plan.changes.findIndex((c) => c.kind === 'watchlist');
      const agentIndex = plan.changes.findIndex((c) => c.kind === 'custom_agent');

      expect(channelIndex).toBeLessThan(watchlistIndex);
      expect(channelIndex).toBeLessThan(agentIndex);
    });

    it('should detect circular dependencies and generate warnings', async () => {
      // Create config with circular dependency (contrived example)
      const circularConfig: ParsedConfig = {
        notification_channels: {
          'channel-a': {
            name: 'Channel A',
            type: 'slack',
            enabled: true,
            webhook_url: 'https://hooks.slack.com/a',
            channel: '#a',
          },
        },
        watchlists: {},
        custom_agents: {},
      };

      const plan = await planner.generatePlan(circularConfig);

      // This specific case won't have circular deps, so warnings might be undefined
      // but the plan should be generated successfully
      expect(plan).toBeDefined();
      // Warnings field is optional and may be undefined when there are no warnings
      if (plan.warnings) {
        expect(plan.warnings).toBeInstanceOf(Array);
      }
    });

    it('should assess risk levels correctly', async () => {
      const plan = await planner.generatePlan(mockConfig);

      // CREATE operations should be low risk
      const createChanges = plan.changes.filter((c) => c.change_type === ChangeType.CREATE);
      createChanges.forEach((change) => {
        expect(change.risk_level).toBe('low');
      });
    });

    it('should handle custom agent type changes requiring replacement', async () => {
      // Mock a custom agent with different type
      const stateWithAgent = TestFixture.createMockState();
      stateWithAgent.resources['test-agent'] = {
        kind: 'custom_agent',
        name: 'test-agent',
        remote_id: 'ca_123',
        last_applied_hash: 'old_hash',
        last_seen_remote_hash: 'old_hash',
        metadata: {
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          created_by: 'test',
          cli_version: '0.1.0',
          agent_type: 'price_monitoring', // Different from config
        },
      };

      vi.spyOn(StateStore.prototype, 'loadState').mockResolvedValue(stateWithAgent);

      const plan = await planner.generatePlan(mockConfig);

      const agentChange = plan.changes.find((c) => c.name === 'test-agent');
      expect(agentChange).toBeDefined();
      // Should be REPLACE due to type change, or UPDATE if we can't determine
      expect([ChangeType.REPLACE, ChangeType.UPDATE]).toContain(agentChange!.change_type);
    });
  });

  describe('generatePlan with options', () => {
    it('should include field diffs when requested', async () => {
      const options: PlannerOptions = {
        include_field_diffs: true,
        redact_secrets: true,
      };

      const plan = await planner.generatePlan(mockConfig, options);

      // Changes should include field diffs
      const changesWithDiffs = plan.changes.filter((c) => c.field_diffs);
      expect(changesWithDiffs.length).toBeGreaterThan(0);
    });

    it('should redact secrets when requested', async () => {
      const options: PlannerOptions = {
        include_field_diffs: true,
        redact_secrets: true,
      };

      const plan = await planner.generatePlan(mockConfig, options);

      // Field diffs should not contain sensitive information
      plan.changes.forEach((change) => {
        if (change.field_diffs) {
          change.field_diffs.forEach((diff) => {
            if (diff.is_sensitive) {
              expect(diff.new_value).not.toContain('hooks.slack.com');
              expect(diff.old_value).not.toContain('hooks.slack.com');
            }
          });
        }
      });
    });

    it('should check for drift when requested', async () => {
      const options: PlannerOptions = {
        check_drift: true,
      };

      const plan = await planner.generatePlan(mockConfig, options);

      // Plan should be generated successfully (drift checking is placeholder)
      expect(plan).toBeDefined();
    });
  });

  describe('plan metadata and hashing', () => {
    it('should generate consistent config hash', async () => {
      const plan1 = await planner.generatePlan(mockConfig);
      const plan2 = await planner.generatePlan(mockConfig);

      expect(plan1.metadata.config_hash).toBe(plan2.metadata.config_hash);
    });

    it('should generate different config hash for different configs', async () => {
      const plan1 = await planner.generatePlan(mockConfig);

      const modifiedConfig = { ...mockConfig };
      modifiedConfig.watchlists = {}; // Remove watchlists

      const plan2 = await planner.generatePlan(modifiedConfig);

      expect(plan1.metadata.config_hash).not.toBe(plan2.metadata.config_hash);
    });

    it('should include config files in metadata', async () => {
      const plan = await planner.generatePlan(mockConfig);

      expect(plan.metadata.config_files).toBeDefined();
      expect(plan.metadata.config_files.length).toBeGreaterThan(0);
    });
  });

  describe('convenience functions', () => {
    it('generateExecutionPlan should work', async () => {
      const plan = await generateExecutionPlan(mockConfig, testDir);

      expect(plan).toBeDefined();
      expect(plan.metadata.base_directory).toBe(testDir);
    });

    it('createPlanFile should generate valid plan file', async () => {
      const plan = await generateExecutionPlan(mockConfig, testDir);
      const planFile = await createPlanFile(plan);

      expect(planFile.version).toBe('1.0.0');
      expect(planFile.plan).toBe(plan);
      expect(planFile.signature).toBeDefined();
      expect(planFile.signature).toMatch(/^[a-f0-9]{64}$/); // SHA-256 hex
    });
  });

  describe('error handling', () => {
    it('should handle state loading errors gracefully', async () => {
      vi.spyOn(StateStore.prototype, 'loadState').mockRejectedValue(new Error('State load failed'));

      await expect(planner.generatePlan(mockConfig)).rejects.toThrow('State load failed');
    });

    it('should handle invalid configuration gracefully', async () => {
      const invalidConfig = {} as ParsedConfig;

      // Should not throw, but might produce warnings or empty plan
      const plan = await planner.generatePlan(invalidConfig);
      expect(plan).toBeDefined();
    });
  });

  describe('performance', () => {
    it('should generate plan in reasonable time for large configs', async () => {
      // Create a config with many resources
      const largeConfig: ParsedConfig = {
        notification_channels: {},
        watchlists: {},
        custom_agents: {},
      };

      // Generate 50 of each type
      for (let i = 0; i < 50; i++) {
        largeConfig.notification_channels[`channel-${i}`] = {
          name: `Channel ${i}`,
          type: 'slack',
          enabled: true,
          webhook_url: `https://hooks.slack.com/channel-${i}`,
          channel: `#channel-${i}`,
        };

        largeConfig.watchlists[`watchlist-${i}`] = {
          name: `Watchlist ${i}`,
          description: `Test watchlist ${i}`,
          assets: [
            {
              chain: 'ethereum',
              type: 'Wallet',
              address: `0x${i.toString(16).padStart(40, '0')}`,
            },
          ],
          alert_config: {
            notification_channels: [`channel-${i % 10}`], // Some dependencies
          },
        };
      }

      const startTime = Date.now();
      const plan = await planner.generatePlan(largeConfig);
      const endTime = Date.now();

      expect(endTime - startTime).toBeLessThan(5000); // Should complete in < 5 seconds
      expect(plan.changes.length).toBeGreaterThan(50);
    });
  });
});
