/**
 * Unit tests for the CustomAgentProvider class
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { CustomAgentProvider } from './custom-agent.provider.js';
import { ApiClient } from '../lib/api-client.js';
import type { CustomAgentConfig } from '../schemas/custom-agent.schema.js';
import type { CustomAgent } from '../types/api.js';

describe('CustomAgentProvider', () => {
  let provider: CustomAgentProvider;
  let mockApiClient: ApiClient;

  beforeEach(() => {
    mockApiClient = {
      get: vi.fn(),
      post: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    } as any;

    // Mock the notification channels API endpoint for channel resolution
    const mockNotificationChannels = [
      { id: 123, name: 'slack-alerts', type: 'slack' },
      { id: 456, name: 'email-alerts', type: 'email' },
      { id: 789, name: 'telegram-alerts', type: 'telegram' },
      { id: 1, name: 'multi-channel', type: 'webhook' },
      { id: 2, name: 'basic-alerts', type: 'webhook' },
      // Add channels for the large channel list test
      ...Array.from({ length: 10 }, (_, i) => ({
        id: 1000 + i,
        name: `channel-${i}`,
        type: 'webhook',
      })),
    ];

    // Set up default mock for notification channels endpoint
    (mockApiClient.get as any).mockImplementation((url: string) => {
      if (url === '/notification-channels') {
        return Promise.resolve({ data: mockNotificationChannels });
      }
      // For other endpoints, return a rejected promise that tests can override
      return Promise.reject(new Error(`Unmocked API endpoint: ${url}`));
    });

    provider = new CustomAgentProvider({ apiClient: mockApiClient, dryRun: false });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockTransactionMonitoringConfig: CustomAgentConfig = {
    name: 'Transaction Monitoring Agent',
    description: 'Monitors high-value transactions',
    type: 'large_transaction_monitor',
    chain: 'ethereum',
    enabled: true,
    notification_channels: ['slack-alerts', 'email-alerts'],
    configuration: {
      transaction_amount_threshold: 1000000,
      asset_addresses: ['0xA0b86991c431e8c5F2cfae5C4F1b2A4c0b48F8C7'],
      exclude_addresses: ['0x123...'],
    },
  };

  const mockPriceMonitoringConfig: CustomAgentConfig = {
    name: 'Price Monitoring Agent',
    description: 'Monitors price changes',
    type: 'whale_movement_monitor',
    chain: 'ethereum',
    enabled: true,
    notification_channels: ['telegram-alerts'],
    configuration: {
      price_change_percentage: 10,
      assets: [
        {
          chain: 'ethereum',
          address: '0xA0b86991c431e8c5F2cfae5C4F1b2A4c0b48F8C7',
          symbol: 'USDC',
        },
      ],
      timeframe: '1h',
    },
  };

  const mockApiResponse: CustomAgent = {
    id: 'ca_test_123',
    name: 'Transaction Monitoring Agent',
    description: 'Monitors high-value transactions',
    type: 'large_transaction_monitor',
    enabled: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    execution_count: 0,
    error_count: 0,
    configuration: {
      transaction_amount_threshold: 1000000,
      asset_addresses: ['0xA0b86991c431e8c5F2cfae5C4F1b2A4c0b48F8C7'],
      exclude_addresses: ['0x123...'],
    },
  };

  describe('list', () => {
    it('should list custom agents with default parameters', async () => {
      const mockAgents = [mockApiResponse];
      mockApiClient.get = vi.fn().mockResolvedValue({ data: mockAgents });

      const result = await provider.list();

      expect(mockApiClient.get).toHaveBeenCalledWith('/custom-agents', {
        params: {
          limit: 100,
          offset: 0,
          enabled: undefined,
          type: undefined,
        },
      });
      expect(result).toEqual(mockAgents);
    });

    it('should list custom agents with custom parameters', async () => {
      const mockAgents = [mockApiResponse];
      mockApiClient.get = vi.fn().mockResolvedValue({ data: mockAgents });

      const result = await provider.list({
        limit: 10,
        offset: 20,
        type: 'large_transaction_monitor',
      });

      expect(mockApiClient.get).toHaveBeenCalledWith('/custom-agents', {
        params: {
          limit: 10,
          offset: 20,
          enabled: undefined,
          type: 'large_transaction_monitor',
        },
      });
      expect(result).toEqual(mockAgents);
    });

    it('should handle API errors', async () => {
      mockApiClient.get = vi.fn().mockRejectedValue(new Error('API Error'));

      await expect(provider.list()).rejects.toThrow(
        'Failed to list custom agents: Error: API Error'
      );
    });
  });

  describe('getById', () => {
    it('should get custom agent by ID', async () => {
      mockApiClient.get = vi.fn().mockResolvedValue({ data: mockApiResponse });

      const result = await provider.getById('ca_test_123');

      expect(mockApiClient.get).toHaveBeenCalledWith('/custom-agents/ca_test_123');
      expect(result).toEqual(mockApiResponse);
    });

    it('should return null for 404 errors', async () => {
      mockApiClient.get = vi.fn().mockRejectedValue({ status: 404 });

      const result = await provider.getById('ca_nonexistent');

      expect(result).toBeNull();
    });

    it('should throw for other API errors', async () => {
      mockApiClient.get = vi.fn().mockRejectedValue(new Error('Server Error'));

      await expect(provider.getById('ca_test_123')).rejects.toThrow(
        'Failed to get custom agent ca_test_123'
      );
    });
  });

  describe('create', () => {
    it('should create a transaction monitoring agent', async () => {
      mockApiClient.post = vi.fn().mockResolvedValue({ data: mockApiResponse });

      const result = await provider.create(mockTransactionMonitoringConfig);

      expect(mockApiClient.post).toHaveBeenCalledWith('/custom-agents', {
        agentName: 'Transaction Monitoring Agent',
        agentType: 'large_transaction_monitor',
        severity: 'Medium',
        muteDuration: 0,
        state: 'enabled',
        rule: {
          transaction_amount_threshold: 1000000,
          asset_addresses: ['0xA0b86991c431e8c5F2cfae5C4F1b2A4c0b48F8C7'],
          exclude_addresses: ['0x123...'],
        },
        channelsConfigurations: [{ id: 123 }, { id: 456 }],
        remindersConfigurations: [],
      });
      expect(result).toEqual(mockApiResponse);
    });

    it('should create a price monitoring agent', async () => {
      const mockPriceResponse: CustomAgent = {
        id: 'ca_price_123',
        name: 'Price Monitoring Agent',
        description: 'Monitors price changes',
        type: 'whale_movement_monitor',
        enabled: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        execution_count: 0,
        error_count: 0,
        configuration: {
          price_change_percentage: 10,
          assets: [
            {
              chain: 'ethereum',
              address: '0xA0b86991c431e8c5F2cfae5C4F1b2A4c0b48F8C7',
              symbol: 'USDC',
            },
          ],
          timeframe: '1h',
        },
      };

      mockApiClient.post = vi.fn().mockResolvedValue({ data: mockPriceResponse });

      const result = await provider.create(mockPriceMonitoringConfig);

      expect(mockApiClient.post).toHaveBeenCalledWith('/custom-agents', {
        agentName: 'Price Monitoring Agent',
        agentType: 'whale_movement_monitor',
        severity: 'Medium',
        muteDuration: 0,
        state: 'enabled',
        rule: mockPriceMonitoringConfig.configuration,
        channelsConfigurations: [{ id: 789 }],
        remindersConfigurations: [],
      });
      expect(result).toEqual(mockPriceResponse);
    });

    it('should handle dry run mode', async () => {
      const dryRunProvider = new CustomAgentProvider({ apiClient: mockApiClient, dryRun: true });

      const result = await dryRunProvider.create(mockTransactionMonitoringConfig);

      expect(mockApiClient.post).not.toHaveBeenCalled();
      expect(result.name).toBe('Transaction Monitoring Agent');
      expect(result.type).toBe('large_transaction_monitor');
      expect(result.id).toMatch(/^mock_\d+$/);
    });

    it('should handle API errors', async () => {
      mockApiClient.post = vi.fn().mockRejectedValue(new Error('Creation failed'));

      await expect(provider.create(mockTransactionMonitoringConfig)).rejects.toThrow(
        'Failed to create custom agent'
      );
    });
  });

  describe('update', () => {
    it('should update custom agent', async () => {
      const updatedConfig = {
        ...mockTransactionMonitoringConfig,
        description: 'Updated description',
        enabled: false,
      };

      const expectedResponse = {
        ...mockApiResponse,
        description: 'Updated description',
        enabled: false,
      };

      mockApiClient.patch = vi.fn().mockResolvedValue({ data: expectedResponse });

      const result = await provider.update('ca_test_123', updatedConfig);

      expect(mockApiClient.patch).toHaveBeenCalledWith('/custom-agents/ca_test_123', {
        agentName: 'Transaction Monitoring Agent',
        severity: 'Medium',
        muteDuration: 0,
        state: 'disabled',
        rule: mockTransactionMonitoringConfig.configuration,
        channelsConfigurations: [{ id: 123 }, { id: 456 }],
        remindersConfigurations: [],
      });
      expect(result).toEqual(expectedResponse);
    });

    it('should handle dry run mode', async () => {
      const dryRunProvider = new CustomAgentProvider({ apiClient: mockApiClient, dryRun: true });

      const result = await dryRunProvider.update('ca_test_123', mockTransactionMonitoringConfig);

      expect(mockApiClient.patch).not.toHaveBeenCalled();
      expect(result.name).toBe('Transaction Monitoring Agent');
    });

    it('should handle API errors', async () => {
      mockApiClient.patch = vi.fn().mockRejectedValue(new Error('Update failed'));

      await expect(provider.update('ca_test_123', mockTransactionMonitoringConfig)).rejects.toThrow(
        'Failed to update custom agent ca_test_123'
      );
    });
  });

  describe('delete', () => {
    it('should delete custom agent', async () => {
      mockApiClient.delete = vi.fn().mockResolvedValue({});

      await provider.delete('ca_test_123');

      expect(mockApiClient.delete).toHaveBeenCalledWith('/custom-agents/ca_test_123');
    });

    it('should handle dry run mode', async () => {
      const dryRunProvider = new CustomAgentProvider({ apiClient: mockApiClient, dryRun: true });

      await dryRunProvider.delete('ca_test_123');

      expect(mockApiClient.delete).not.toHaveBeenCalled();
    });

    it('should handle API errors', async () => {
      mockApiClient.delete = vi.fn().mockRejectedValue(new Error('Delete failed'));

      await expect(provider.delete('ca_test_123')).rejects.toThrow(
        'Failed to delete custom agent ca_test_123'
      );
    });
  });

  // Note: enable/disable methods are not implemented in the current provider

  // Note: getMetrics method is not implemented in the current provider

  // Note: validateConditions method is not implemented in the current provider
  // Instead, use the validateConfiguration method which is implemented

  describe('payload building', () => {
    it('should build correct payload for transaction monitoring', async () => {
      const payload = await (provider as any).buildCreatePayload(mockTransactionMonitoringConfig);

      expect(payload).toEqual({
        agentName: 'Transaction Monitoring Agent',
        agentType: 'large_transaction_monitor',
        severity: 'Medium',
        muteDuration: 0,
        state: 'enabled',
        rule: {
          transaction_amount_threshold: 1000000,
          asset_addresses: ['0xA0b86991c431e8c5F2cfae5C4F1b2A4c0b48F8C7'],
          exclude_addresses: ['0x123...'],
        },
        channelsConfigurations: [{ id: 123 }, { id: 456 }],
        remindersConfigurations: [],
      });
    });

    it('should build correct payload for price monitoring', async () => {
      const payload = await (provider as any).buildCreatePayload(mockPriceMonitoringConfig);

      expect(payload).toEqual({
        agentName: 'Price Monitoring Agent',
        agentType: 'whale_movement_monitor',
        severity: 'Medium',
        muteDuration: 0,
        state: 'enabled',
        rule: {
          price_change_percentage: 10,
          assets: [
            {
              chain: 'ethereum',
              address: '0xA0b86991c431e8c5F2cfae5C4F1b2A4c0b48F8C7',
              symbol: 'USDC',
            },
          ],
          timeframe: '1h',
        },
        channelsConfigurations: [{ id: 789 }],
        remindersConfigurations: [],
      });
    });

    it('should handle minimal configurations', async () => {
      const minimalConfig: CustomAgentConfig = {
        name: 'Minimal Agent',
        type: 'large_transaction_monitor',
        chain: 'ethereum',
        enabled: true,
        notification_channels: ['basic-alerts'],
        configuration: {
          transaction_amount_threshold: 1000,
        },
      };

      const payload = await (provider as any).buildCreatePayload(minimalConfig);

      expect(payload.agentName).toBe('Minimal Agent');
      expect(payload.rule.transaction_amount_threshold).toBe(1000);
    });
  });

  describe('static methods', () => {
    it('should generate consistent hashes for configs', () => {
      const hash1 = CustomAgentProvider.generateConfigHash(mockTransactionMonitoringConfig);
      const hash2 = CustomAgentProvider.generateConfigHash(mockTransactionMonitoringConfig);

      expect(hash1).toBe(hash2);
      expect(hash1).toMatch(/^[a-f0-9]+$/);
    });

    it('should generate different hashes for different configs', () => {
      const modifiedConfig = {
        ...mockTransactionMonitoringConfig,
        conditions: {
          ...mockTransactionMonitoringConfig.conditions,
          transaction_amount_threshold: 2000000,
        },
      };

      const hash1 = CustomAgentProvider.generateConfigHash(mockTransactionMonitoringConfig);
      const hash2 = CustomAgentProvider.generateConfigHash(modifiedConfig);

      expect(hash1).not.toBe(hash2);
    });

    it('should correctly compare configurations', () => {
      const config1 = mockTransactionMonitoringConfig;
      const config2 = { ...mockTransactionMonitoringConfig };
      const config3 = { ...mockTransactionMonitoringConfig, enabled: false };

      expect(CustomAgentProvider.isConfigEqual(config1, config2)).toBe(true);
      expect(CustomAgentProvider.isConfigEqual(config1, config3)).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle complex conditions with multiple asset types', async () => {
      const complexConfig: CustomAgentConfig = {
        name: 'Complex Agent',
        type: 'large_transaction_monitor',
        chain: 'ethereum',
        enabled: true,
        notification_channels: ['multi-channel'],
        configuration: {
          transaction_amount_threshold: 100000,
          asset_addresses: [
            '0xA0b86991c431e8c5F2cfae5C4F1b2A4c0b48F8C7', // USDC
            '0xdAC17F958D2ee523a2206206994597C13D831ec7', // USDT
            '0x6B175474E89094C44Da98b954EedeAC495271d0F', // DAI
          ],
          exclude_addresses: [
            '0x0000000000000000000000000000000000000000',
            '0x000000000000000000000000000000000000dEaD',
          ],
          min_confirmation_blocks: 12,
          monitor_internal_transactions: true,
        },
      };

      const payload = await (provider as any).buildCreatePayload(complexConfig);
      expect(payload.rule.asset_addresses).toHaveLength(3);
      expect(payload.rule.exclude_addresses).toHaveLength(2);
      expect(payload.rule.monitor_internal_transactions).toBe(true);
    });

    it('should handle agents with large notification channel lists', async () => {
      const manyChannelsConfig = {
        ...mockTransactionMonitoringConfig,
        notification_channels: Array.from({ length: 10 }, (_, i) => `channel-${i}`),
      };

      mockApiClient.post = vi.fn().mockResolvedValue({ data: mockApiResponse });

      const result = await provider.create(manyChannelsConfig);
      expect(result).toBeDefined();
    });

    it('should handle special characters in agent names', async () => {
      const specialConfig = {
        ...mockTransactionMonitoringConfig,
        name: 'Agent w/ Special Characters: #1 @monitor',
      };

      mockApiClient.post = vi.fn().mockResolvedValue({
        data: { ...mockApiResponse, name: specialConfig.name },
      });

      const result = await provider.create(specialConfig);
      expect(result.name).toBe('Agent w/ Special Characters: #1 @monitor');
    });
  });

  describe('error scenarios', () => {
    it('should handle malformed API responses gracefully', async () => {
      mockApiClient.get = vi.fn().mockResolvedValue({ data: null });

      const result = await provider.list();
      expect(result).toEqual([]);
    });

    it('should handle network timeouts', async () => {
      mockApiClient.post = vi.fn().mockRejectedValue(new Error('ETIMEDOUT'));

      await expect(provider.create(mockTransactionMonitoringConfig)).rejects.toThrow(
        'Failed to create custom agent: Error: ETIMEDOUT'
      );
    });

    it('should handle validation errors from API', async () => {
      mockApiClient.post = vi.fn().mockRejectedValue({
        status: 400,
        data: { error: 'Invalid condition parameters' },
      });

      await expect(provider.create(mockTransactionMonitoringConfig)).rejects.toThrow(
        'Failed to create custom agent'
      );
    });
  });
});
