/**
 * Unit tests for the NotificationChannelProvider class
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { NotificationChannelProvider } from './notification-channel.provider.js';
import { ApiClient } from '../lib/api-client.js';
import type { NotificationChannelConfig } from '../schemas/notification-channel.schema.js';
import type { ApiNotificationChannel } from '../types/api.js';

describe('NotificationChannelProvider', () => {
  let provider: NotificationChannelProvider;
  let mockApiClient: ApiClient;

  beforeEach(() => {
    mockApiClient = {
      get: vi.fn(),
      post: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    } as any;

    provider = new NotificationChannelProvider({ apiClient: mockApiClient, dryRun: false });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockSlackConfig: NotificationChannelConfig = {
    name: 'Test Slack Channel',
    type: 'slack',
    enabled: true,
    configuration: {
      webhook_url: 'https://hooks.slack.com/services/test',
      channel: '#alerts',
      username: 'hypernative-bot',
      icon_emoji: ':warning:',
    },
  };

  const mockEmailConfig: NotificationChannelConfig = {
    name: 'Test Email Channel',
    type: 'email',
    enabled: true,
    configuration: {
      smtp: {
        host: 'smtp.example.com',
        port: 587,
        auth: {
          user: 'alerts@company.com',
          pass: 'secret123',
        },
        secure: true,
      },
      recipients: {
        to: ['test@example.com', 'alerts@company.com'],
      },
      subject_prefix: '[HYPERNATIVE]',
    },
  };

  const mockWebhookConfig: NotificationChannelConfig = {
    name: 'Test Webhook Channel',
    type: 'webhook',
    enabled: true,
    configuration: {
      url: 'https://api.example.com/webhook',
      method: 'POST',
      headers: {
        Authorization: 'Bearer token123',
        'Content-Type': 'application/json',
      },
      timeout: 30,
    },
  };

  const mockSlackResponse: ApiNotificationChannel = {
    id: 'nc_slack_123',
    name: 'Test Slack Channel',
    type: 'slack',
    enabled: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    configuration: {
      webhook_url: 'https://hooks.slack.com/services/test',
      channel: '#alerts',
      username: 'hypernative-bot',
      icon_emoji: ':warning:',
    },
  };

  describe('list', () => {
    it('should list notification channels with default parameters', async () => {
      const mockChannels = [mockSlackResponse];
      mockApiClient.get = vi.fn().mockResolvedValue({ data: mockChannels });

      const result = await provider.list();

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/v2/notification-channels', {
        params: { limit: 100, offset: 0, enabled: undefined, type: undefined },
      });
      expect(result).toEqual(mockChannels);
    });

    it('should list notification channels with custom parameters', async () => {
      const mockChannels = [mockSlackResponse];
      mockApiClient.get = vi.fn().mockResolvedValue({ data: mockChannels });

      const result = await provider.list({ limit: 10, offset: 20 });

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/v2/notification-channels', {
        params: { limit: 10, offset: 20, enabled: undefined, type: undefined },
      });
      expect(result).toEqual(mockChannels);
    });

    it('should filter by type', async () => {
      const mockChannels = [mockSlackResponse];
      mockApiClient.get = vi.fn().mockResolvedValue({ data: mockChannels });

      const result = await provider.list({ type: 'slack' });

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/v2/notification-channels', {
        params: { limit: 100, offset: 0, enabled: undefined, type: 'slack' },
      });
      expect(result).toEqual(mockChannels);
    });

    it('should handle API errors', async () => {
      mockApiClient.get = vi.fn().mockRejectedValue(new Error('API Error'));

      await expect(provider.list()).rejects.toThrow(
        'Failed to list notification channels: Error: API Error'
      );
    });
  });

  describe('getById', () => {
    it('should get notification channel by ID', async () => {
      mockApiClient.get = vi.fn().mockResolvedValue({ data: mockSlackResponse });

      const result = await provider.getById('nc_slack_123');

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/v2/notification-channels/nc_slack_123');
      expect(result).toEqual(mockSlackResponse);
    });

    it('should return null for 404 errors', async () => {
      mockApiClient.get = vi.fn().mockRejectedValue({ status: 404 });

      const result = await provider.getById('nc_nonexistent');

      expect(result).toBeNull();
    });

    it('should throw for other API errors', async () => {
      mockApiClient.get = vi.fn().mockRejectedValue(new Error('Server Error'));

      await expect(provider.getById('nc_slack_123')).rejects.toThrow(
        'Failed to get notification channel nc_slack_123'
      );
    });
  });

  describe('create', () => {
    it('should create a Slack notification channel', async () => {
      mockApiClient.post = vi.fn().mockResolvedValue({ data: mockSlackResponse });

      const result = await provider.create(mockSlackConfig);

      expect(mockApiClient.post).toHaveBeenCalledWith('/api/v2/notification-channels', {
        name: 'Test Slack Channel',
        type: 'slack',
        description: undefined,
        enabled: true,
        configuration: {
          webhook_url: 'https://hooks.slack.com/services/test',
          channel: '#alerts',
          username: 'hypernative-bot',
          icon_emoji: ':warning:',
        },
        tags: undefined,
      });
      expect(result).toEqual(mockSlackResponse);
    });

    it('should create an email notification channel', async () => {
      const mockEmailResponse: ApiNotificationChannel = {
        id: 'nc_email_123',
        name: 'Test Email Channel',
        type: 'email',
        enabled: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        configuration: {
          smtp: {
            host: 'smtp.example.com',
            port: 587,
            auth: {
              user: 'alerts@company.com',
              pass: 'secret123',
            },
            secure: true,
          },
          recipients: {
            to: ['test@example.com', 'alerts@company.com'],
          },
          subject_prefix: '[HYPERNATIVE]',
        },
      };

      mockApiClient.post = vi.fn().mockResolvedValue({ data: mockEmailResponse });

      const result = await provider.create(mockEmailConfig);

      expect(mockApiClient.post).toHaveBeenCalledWith('/api/v2/notification-channels', {
        name: 'Test Email Channel',
        type: 'email',
        description: undefined,
        enabled: true,
        configuration: {
          smtp: {
            host: 'smtp.example.com',
            port: 587,
            auth: {
              user: 'alerts@company.com',
              pass: 'secret123',
            },
            secure: true,
          },
          recipients: {
            to: ['test@example.com', 'alerts@company.com'],
          },
          subject_prefix: '[HYPERNATIVE]',
        },
        tags: undefined,
      });
      expect(result).toEqual(mockEmailResponse);
    });

    it('should create a webhook notification channel', async () => {
      const mockWebhookResponse: ApiNotificationChannel = {
        id: 'nc_webhook_123',
        name: 'Test Webhook Channel',
        type: 'webhook',
        enabled: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        configuration: {
          url: 'https://api.example.com/webhook',
          method: 'POST',
          headers: {
            Authorization: 'Bearer token123',
            'Content-Type': 'application/json',
          },
          timeout: 30,
        },
      };

      mockApiClient.post = vi.fn().mockResolvedValue({ data: mockWebhookResponse });

      const result = await provider.create(mockWebhookConfig);

      expect(mockApiClient.post).toHaveBeenCalledWith('/api/v2/notification-channels', {
        name: 'Test Webhook Channel',
        type: 'webhook',
        description: undefined,
        enabled: true,
        configuration: {
          url: 'https://api.example.com/webhook',
          method: 'POST',
          headers: {
            Authorization: 'Bearer token123',
            'Content-Type': 'application/json',
          },
          timeout: 30,
        },
        tags: undefined,
      });
      expect(result).toEqual(mockWebhookResponse);
    });

    it('should handle dry run mode', async () => {
      const dryRunProvider = new NotificationChannelProvider({
        apiClient: mockApiClient,
        dryRun: true,
      });

      const result = await dryRunProvider.create(mockSlackConfig);

      expect(mockApiClient.post).not.toHaveBeenCalled();
      expect(result.name).toBe('Test Slack Channel');
      expect(result.type).toBe('slack');
      expect(result.id).toMatch(/^mock_\d+$/);
    });

    it('should handle API errors', async () => {
      mockApiClient.post = vi.fn().mockRejectedValue(new Error('Creation failed'));

      await expect(provider.create(mockSlackConfig)).rejects.toThrow(
        'Failed to create notification channel: Error: Creation failed'
      );
    });
  });

  describe('update', () => {
    it('should update notification channel', async () => {
      const updatedConfig = {
        ...mockSlackConfig,
        configuration: {
          ...mockSlackConfig.configuration,
          channel: '#updated-alerts',
        },
        enabled: false,
      };

      const expectedResponse = {
        ...mockSlackResponse,
        configuration: {
          ...mockSlackResponse.configuration,
          channel: '#updated-alerts',
        },
        enabled: false,
      };

      mockApiClient.patch = vi.fn().mockResolvedValue({ data: expectedResponse });

      const result = await provider.update('nc_slack_123', updatedConfig);

      expect(mockApiClient.patch).toHaveBeenCalledWith(
        '/api/v2/notification-channels/nc_slack_123',
        {
          name: 'Test Slack Channel',
          description: undefined,
          enabled: false,
          configuration: {
            webhook_url: 'https://hooks.slack.com/services/test',
            channel: '#updated-alerts',
            username: 'hypernative-bot',
            icon_emoji: ':warning:',
          },
          tags: undefined,
        }
      );
      expect(result).toEqual(expectedResponse);
    });

    it('should handle dry run mode', async () => {
      const dryRunProvider = new NotificationChannelProvider({
        apiClient: mockApiClient,
        dryRun: true,
      });

      const result = await dryRunProvider.update('nc_slack_123', mockSlackConfig);

      expect(mockApiClient.patch).not.toHaveBeenCalled();
      expect(result.name).toBe('Test Slack Channel');
    });

    it('should handle API errors', async () => {
      mockApiClient.patch = vi.fn().mockRejectedValue(new Error('Update failed'));

      await expect(provider.update('nc_slack_123', mockSlackConfig)).rejects.toThrow(
        'Failed to update notification channel nc_slack_123: Error: Update failed'
      );
    });
  });

  describe('delete', () => {
    it('should delete notification channel', async () => {
      mockApiClient.delete = vi.fn().mockResolvedValue({});

      await provider.delete('nc_slack_123');

      expect(mockApiClient.delete).toHaveBeenCalledWith(
        '/api/v2/notification-channels/nc_slack_123'
      );
    });

    it('should handle dry run mode', async () => {
      const dryRunProvider = new NotificationChannelProvider({
        apiClient: mockApiClient,
        dryRun: true,
      });

      await dryRunProvider.delete('nc_slack_123');

      expect(mockApiClient.delete).not.toHaveBeenCalled();
    });

    it('should handle API errors', async () => {
      mockApiClient.delete = vi.fn().mockRejectedValue(new Error('Delete failed'));

      await expect(provider.delete('nc_slack_123')).rejects.toThrow(
        'Failed to delete notification channel nc_slack_123: Error: Delete failed'
      );
    });
  });

  describe('test', () => {
    it('should test notification channel', async () => {
      const mockTestResponse = {
        success: true,
        message: 'Connection successful',
        delivered_at: '2024-01-01T00:00:00Z',
      };

      mockApiClient.post = vi.fn().mockResolvedValue({ data: mockTestResponse });

      const result = await provider.test('nc_slack_123');

      expect(mockApiClient.post).toHaveBeenCalledWith(
        '/api/v2/notification-channels/nc_slack_123/test',
        {},
        { timeout: 30000 }
      );
      expect(result).toEqual(mockTestResponse);
    });

    it('should test notification channel with custom message', async () => {
      const mockTestResponse = {
        success: true,
        message: 'Test message sent',
        delivered_at: '2024-01-01T00:00:00Z',
      };

      mockApiClient.post = vi.fn().mockResolvedValue({ data: mockTestResponse });

      const result = await provider.test('nc_slack_123', { testMessage: 'Custom test' });

      expect(mockApiClient.post).toHaveBeenCalledWith(
        '/api/v2/notification-channels/nc_slack_123/test',
        { message: 'Custom test' },
        { timeout: 30000 }
      );
      expect(result).toEqual(mockTestResponse);
    });

    it('should handle dry run mode', async () => {
      const dryRunProvider = new NotificationChannelProvider({
        apiClient: mockApiClient,
        dryRun: true,
      });

      const result = await dryRunProvider.test('nc_slack_123');

      expect(mockApiClient.post).not.toHaveBeenCalled();
      expect(result.success).toBe(true);
      expect(result.message).toBe('DRY RUN: Test would have been sent');
    });

    it('should handle API errors', async () => {
      mockApiClient.post = vi.fn().mockRejectedValue(new Error('Test failed'));

      await expect(provider.test('nc_slack_123')).rejects.toThrow(
        'Failed to test notification channel nc_slack_123: Error: Test failed'
      );
    });
  });

  describe('static methods', () => {
    it('should generate consistent hashes for configs', () => {
      const hash1 = NotificationChannelProvider.generateConfigHash(mockSlackConfig);
      const hash2 = NotificationChannelProvider.generateConfigHash(mockSlackConfig);

      expect(hash1).toBe(hash2);
      expect(hash1).toMatch(/^[a-f0-9]+$/);
    });

    it('should generate different hashes for different configs', () => {
      const modifiedConfig = {
        ...mockSlackConfig,
        channel: '#different-channel',
      };

      const hash1 = NotificationChannelProvider.generateConfigHash(mockSlackConfig);
      const hash2 = NotificationChannelProvider.generateConfigHash(modifiedConfig);

      expect(hash1).not.toBe(hash2);
    });

    it('should correctly compare configurations', () => {
      const config1 = mockSlackConfig;
      const config2 = { ...mockSlackConfig };
      const config3 = { ...mockSlackConfig, enabled: false };

      expect(NotificationChannelProvider.isConfigEqual(config1, config2)).toBe(true);
      expect(NotificationChannelProvider.isConfigEqual(config1, config3)).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle channels with complex configurations', async () => {
      const complexWebhookConfig: NotificationChannelConfig = {
        name: 'Complex Webhook',
        type: 'webhook',
        enabled: true,
        configuration: {
          url: 'https://api.example.com/complex',
          headers: {
            Authorization: 'Bearer token123',
            'X-Custom-Header': 'custom-value',
            'X-Another-Header': 'another-value',
          },
        },
      };

      const mockResponse: ApiNotificationChannel = {
        id: 'nc_complex_123',
        name: 'Complex Webhook',
        type: 'webhook',
        enabled: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        configuration: complexWebhookConfig.configuration,
      };

      mockApiClient.post = vi.fn().mockResolvedValue({ data: mockResponse });

      const result = await provider.create(complexWebhookConfig);
      expect(result.configuration).toEqual(complexWebhookConfig.configuration);
    });

    it('should handle channels with special characters in names', async () => {
      const specialConfig = {
        ...mockSlackConfig,
        name: 'Test Channel w/ Special Characters: #1 @alerts',
      };

      mockApiClient.post = vi.fn().mockResolvedValue({
        data: { ...mockSlackResponse, name: specialConfig.name },
      });

      const result = await provider.create(specialConfig);
      expect(result.name).toBe('Test Channel w/ Special Characters: #1 @alerts');
    });

    it('should handle very long recipient lists', async () => {
      const longEmailConfig = {
        ...mockEmailConfig,
        recipients: Array.from({ length: 100 }, (_, i) => `user${i}@example.com`),
      };

      mockApiClient.post = vi.fn().mockResolvedValue({
        data: { id: 'nc_email_long', recipients: longEmailConfig.recipients },
      });

      const result = await provider.create(longEmailConfig);
      expect(result.recipients).toHaveLength(100);
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

      await expect(provider.create(mockSlackConfig)).rejects.toThrow(
        'Failed to create notification channel: Error: ETIMEDOUT'
      );
    });

    it('should handle validation errors from API', async () => {
      const error = new Error('Invalid webhook URL format');
      (error as any).status = 400;
      (error as any).data = { error: 'Invalid webhook URL format' };
      mockApiClient.post = vi.fn().mockRejectedValue(error);

      await expect(provider.create(mockSlackConfig)).rejects.toThrow(
        'Failed to create notification channel: Error: Invalid webhook URL format'
      );
    });
  });
});
