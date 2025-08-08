/**
 * Unit tests for the CustomAgentProvider class
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { CustomAgentProvider } from './custom-agent.provider.js';
import { ApiClient } from '../lib/api-client.js';
import type { CustomAgentConfig } from '../schemas/custom-agent.schema.js';
import type { ApiCustomAgent } from '../types/api.js';

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

    provider = new CustomAgentProvider({ apiClient: mockApiClient, dryRun: false });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockTransactionMonitoringConfig: CustomAgentConfig = {
    name: 'Transaction Monitoring Agent',
    description: 'Monitors high-value transactions',
    type: 'transaction_monitoring',
    enabled: true,
    notification_channels: ['slack-alerts', 'email-alerts'],
    conditions: {
      transaction_amount_threshold: 1000000,
      asset_addresses: ['0xA0b86991c431e8c5F2cfae5C4F1b2A4c0b48F8C7'],
      exclude_addresses: ['0x123...'],
    },
  };

  const mockPriceMonitoringConfig: CustomAgentConfig = {
    name: 'Price Monitoring Agent',
    description: 'Monitors price changes',
    type: 'price_monitoring',
    enabled: true,
    notification_channels: ['telegram-alerts'],
    conditions: {
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

  const mockApiResponse: ApiCustomAgent = {
    id: 'ca_test_123',
    name: 'Transaction Monitoring Agent',
    description: 'Monitors high-value transactions',
    type: 'transaction_monitoring',
    enabled: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    notification_channels: ['nc_slack_123', 'nc_email_456'],
    conditions: {
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

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/v2/custom-agents', {
        params: { limit: 50, offset: 0 },
      });
      expect(result).toEqual(mockAgents);
    });

    it('should list custom agents with custom parameters', async () => {
      const mockAgents = [mockApiResponse];
      mockApiClient.get = vi.fn().mockResolvedValue({ data: mockAgents });

      const result = await provider.list({ limit: 10, offset: 20, type: 'transaction_monitoring' });

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/v2/custom-agents', {
        params: { limit: 10, offset: 20, type: 'transaction_monitoring' },
      });
      expect(result).toEqual(mockAgents);
    });

    it('should handle API errors', async () => {
      mockApiClient.get = vi.fn().mockRejectedValue(new Error('API Error'));

      await expect(provider.list()).rejects.toThrow('Failed to list custom agents: API Error');
    });
  });

  describe('getById', () => {
    it('should get custom agent by ID', async () => {
      mockApiClient.get = vi.fn().mockResolvedValue({ data: mockApiResponse });

      const result = await provider.getById('ca_test_123');

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/v2/custom-agents/ca_test_123');
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

      expect(mockApiClient.post).toHaveBeenCalledWith('/api/v2/custom-agents', {
        name: 'Transaction Monitoring Agent',
        description: 'Monitors high-value transactions',
        type: 'transaction_monitoring',
        enabled: true,
        notification_channels: ['slack-alerts', 'email-alerts'],
        conditions: {
          transaction_amount_threshold: 1000000,
          asset_addresses: ['0xA0b86991c431e8c5F2cfae5C4F1b2A4c0b48F8C7'],
          exclude_addresses: ['0x123...'],
        },
      });
      expect(result).toEqual(mockApiResponse);
    });

    it('should create a price monitoring agent', async () => {
      const mockPriceResponse: ApiCustomAgent = {
        id: 'ca_price_123',
        name: 'Price Monitoring Agent',
        description: 'Monitors price changes',
        type: 'price_monitoring',
        enabled: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        notification_channels: ['nc_telegram_123'],
        conditions: {
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

      expect(mockApiClient.post).toHaveBeenCalledWith('/api/v2/custom-agents', {
        name: 'Price Monitoring Agent',
        description: 'Monitors price changes',
        type: 'price_monitoring',
        enabled: true,
        notification_channels: ['telegram-alerts'],
        conditions: mockPriceMonitoringConfig.conditions,
      });
      expect(result).toEqual(mockPriceResponse);
    });

    it('should handle dry run mode', async () => {
      const dryRunProvider = new CustomAgentProvider({ apiClient: mockApiClient, dryRun: true });

      const result = await dryRunProvider.create(mockTransactionMonitoringConfig);

      expect(mockApiClient.post).not.toHaveBeenCalled();
      expect(result.name).toBe('Transaction Monitoring Agent');
      expect(result.type).toBe('transaction_monitoring');
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

      expect(mockApiClient.patch).toHaveBeenCalledWith('/api/v2/custom-agents/ca_test_123', {
        name: 'Transaction Monitoring Agent',
        description: 'Updated description',
        type: 'transaction_monitoring',
        enabled: false,
        notification_channels: ['slack-alerts', 'email-alerts'],
        conditions: mockTransactionMonitoringConfig.conditions,
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

      expect(mockApiClient.delete).toHaveBeenCalledWith('/api/v2/custom-agents/ca_test_123');
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

  describe('enable/disable', () => {
    it('should enable custom agent', async () => {
      const enabledResponse = { ...mockApiResponse, enabled: true };
      mockApiClient.patch = vi.fn().mockResolvedValue({ data: enabledResponse });

      const result = await provider.enable('ca_test_123');

      expect(mockApiClient.patch).toHaveBeenCalledWith('/api/v2/custom-agents/ca_test_123', {
        enabled: true,
      });
      expect(result).toEqual(enabledResponse);
    });

    it('should disable custom agent', async () => {
      const disabledResponse = { ...mockApiResponse, enabled: false };
      mockApiClient.patch = vi.fn().mockResolvedValue({ data: disabledResponse });

      const result = await provider.disable('ca_test_123');

      expect(mockApiClient.patch).toHaveBeenCalledWith('/api/v2/custom-agents/ca_test_123', {
        enabled: false,
      });
      expect(result).toEqual(disabledResponse);
    });

    it('should handle dry run for enable/disable', async () => {
      const dryRunProvider = new CustomAgentProvider({ apiClient: mockApiClient, dryRun: true });

      const enableResult = await dryRunProvider.enable('ca_test_123');
      const disableResult = await dryRunProvider.disable('ca_test_123');

      expect(mockApiClient.patch).not.toHaveBeenCalled();
      expect(enableResult.enabled).toBe(true);
      expect(disableResult.enabled).toBe(false);
    });
  });

  describe('getMetrics', () => {
    it('should get agent metrics', async () => {
      const mockMetrics = {
        alerts_triggered: 42,
        last_alert_at: '2024-01-01T12:00:00Z',
        status: 'active',
        uptime_percentage: 99.5,
        performance_metrics: {
          avg_processing_time: 123,
          success_rate: 0.995,
        },
      };

      mockApiClient.get = vi.fn().mockResolvedValue({ data: mockMetrics });

      const result = await provider.getMetrics('ca_test_123', {
        start_time: '2024-01-01T00:00:00Z',
        end_time: '2024-01-02T00:00:00Z',
      });

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/v2/custom-agents/ca_test_123/metrics', {
        params: {
          start_time: '2024-01-01T00:00:00Z',
          end_time: '2024-01-02T00:00:00Z',
        },
      });
      expect(result).toEqual(mockMetrics);
    });

    it('should handle API errors for metrics', async () => {
      mockApiClient.get = vi.fn().mockRejectedValue(new Error('Metrics failed'));

      await expect(
        provider.getMetrics('ca_test_123', { start_time: '2024-01-01T00:00:00Z' })
      ).rejects.toThrow('Failed to get metrics for custom agent ca_test_123');
    });
  });

  describe('validateConditions', () => {
    it('should validate transaction monitoring conditions', async () => {
      const mockValidation = {
        valid: true,
        warnings: [],
        suggestions: ['Consider adding more specific asset filters'],
      };

      mockApiClient.post = vi.fn().mockResolvedValue({ data: mockValidation });

      const result = await provider.validateConditions(mockTransactionMonitoringConfig);

      expect(mockApiClient.post).toHaveBeenCalledWith('/api/v2/custom-agents/validate', {
        type: 'transaction_monitoring',
        conditions: mockTransactionMonitoringConfig.conditions,
      });
      expect(result).toEqual(mockValidation);
    });

    it('should validate price monitoring conditions', async () => {
      const mockValidation = {
        valid: false,
        errors: ['Invalid asset address format'],
        warnings: ['Price change percentage is very high'],
      };

      mockApiClient.post = vi.fn().mockResolvedValue({ data: mockValidation });

      const result = await provider.validateConditions(mockPriceMonitoringConfig);

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Invalid asset address format');
    });

    it('should handle dry run for validation', async () => {
      const dryRunProvider = new CustomAgentProvider({ apiClient: mockApiClient, dryRun: true });

      const result = await dryRunProvider.validateConditions(mockTransactionMonitoringConfig);

      expect(mockApiClient.post).not.toHaveBeenCalled();
      expect(result.valid).toBe(true);
      expect(result.message).toContain('[DRY RUN]');
    });
  });

  describe('payload building', () => {
    it('should build correct payload for transaction monitoring', () => {
      const payload = (provider as any).buildCreatePayload(mockTransactionMonitoringConfig);

      expect(payload).toEqual({
        name: 'Transaction Monitoring Agent',
        description: 'Monitors high-value transactions',
        type: 'transaction_monitoring',
        enabled: true,
        notification_channels: ['slack-alerts', 'email-alerts'],
        conditions: {
          transaction_amount_threshold: 1000000,
          asset_addresses: ['0xA0b86991c431e8c5F2cfae5C4F1b2A4c0b48F8C7'],
          exclude_addresses: ['0x123...'],
        },
      });
    });

    it('should build correct payload for price monitoring', () => {
      const payload = (provider as any).buildCreatePayload(mockPriceMonitoringConfig);

      expect(payload).toEqual({
        name: 'Price Monitoring Agent',
        description: 'Monitors price changes',
        type: 'price_monitoring',
        enabled: true,
        notification_channels: ['telegram-alerts'],
        conditions: {
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
      });
    });

    it('should handle minimal configurations', () => {
      const minimalConfig: CustomAgentConfig = {
        name: 'Minimal Agent',
        type: 'transaction_monitoring',
        enabled: true,
        notification_channels: ['basic-alerts'],
        conditions: {
          transaction_amount_threshold: 1000,
        },
      };

      const payload = (provider as any).buildCreatePayload(minimalConfig);

      expect(payload.description).toBeUndefined();
      expect(payload.conditions.transaction_amount_threshold).toBe(1000);
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
    it('should handle complex conditions with multiple asset types', () => {
      const complexConfig: CustomAgentConfig = {
        name: 'Complex Agent',
        type: 'transaction_monitoring',
        enabled: true,
        notification_channels: ['multi-channel'],
        conditions: {
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

      const payload = (provider as any).buildCreatePayload(complexConfig);
      expect(payload.conditions.asset_addresses).toHaveLength(3);
      expect(payload.conditions.exclude_addresses).toHaveLength(2);
      expect(payload.conditions.monitor_internal_transactions).toBe(true);
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
        'Failed to create custom agent: ETIMEDOUT'
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
