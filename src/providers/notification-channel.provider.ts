/**
 * Notification Channel Provider
 *
 * Handles CRUD operations for Hypernative Notification Channels including:
 * - Creating, updating, and deleting notification channels
 * - Environment variable substitution with ${ENV_NAME} syntax
 * - Configuration validation by channel type
 * - Test endpoint integration for validation
 * - Comprehensive secret redaction for logging
 * - Integration with existing state management and planning
 */

import { log } from '../lib/logger.js';
import { unwrapApiResponse, unwrapApiListResponse } from '../lib/api-response.js';
import { ApiClient } from '../lib/api-client.js';
import { generateFingerprint } from '../lib/fingerprint.js';
import {
  redactSecrets,
  createSafeConfigForLogging,
  safeSubstituteEnvVars,
  type EnvSubstitutionOptions,
} from '../lib/env-substitution.js';
import type { NotificationChannelConfig } from '../schemas/notification-channel.schema.js';
import type {
  NotificationChannel,
  NotificationChannelCreatePayload,
  NotificationChannelUpdatePayload,
  NotificationChannelTestResponse,
  NotificationChannelQueryParams,
} from '../types/api.js';

export interface NotificationChannelProviderOptions {
  apiClient: ApiClient;
  dryRun?: boolean;
  envSubstitutionOptions?: EnvSubstitutionOptions;
}

export interface ConfigurationValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export interface TestChannelOptions {
  /** Whether to validate the channel during the apply phase */
  validate?: boolean;
  /** Custom test message to send */
  testMessage?: string;
  /** Maximum time to wait for test response (in seconds) */
  timeout?: number;
}

export class NotificationChannelProvider {
  private apiClient: ApiClient;
  private dryRun: boolean;
  private envOptions: EnvSubstitutionOptions;

  constructor(options: NotificationChannelProviderOptions) {
    this.apiClient = options.apiClient;
    this.dryRun = options.dryRun ?? false;
    this.envOptions = options.envSubstitutionOptions ?? {};
  }

  /**
   * List all notification channels
   */
  async list(params?: NotificationChannelQueryParams): Promise<NotificationChannel[]> {
    log.debug('Fetching notification channels', createSafeConfigForLogging(params, 'query params'));

    try {
      const response = await this.apiClient.get('/api/v2/notification-channels', {
        params: {
          limit: params?.limit ?? 100,
          offset: params?.offset ?? 0,
          enabled: params?.enabled,
          type: params?.type,
        },
      });

      return unwrapApiListResponse<NotificationChannel>(response);
    } catch (error) {
      log.error('Failed to list notification channels:', error);
      throw new Error(`Failed to list notification channels: ${error}`);
    }
  }

  /**
   * Get a notification channel by ID
   */
  async getById(id: string): Promise<NotificationChannel | null> {
    log.debug(`Fetching notification channel: ${id}`);

    try {
      const response = await this.apiClient.get(`/api/v2/notification-channels/${id}`);
      return unwrapApiResponse<NotificationChannel>(response);
    } catch (error: any) {
      if (error.status === 404) {
        return null;
      }
      log.error(`Failed to get notification channel ${id}:`, error);
      throw new Error(`Failed to get notification channel ${id}: ${error}`);
    }
  }

  /**
   * Test a notification channel
   */
  async test(
    id: string,
    options: TestChannelOptions = {}
  ): Promise<NotificationChannelTestResponse> {
    log.debug(
      `Testing notification channel: ${id}`,
      createSafeConfigForLogging(options, 'test options')
    );

    if (this.dryRun) {
      log.info(`[DRY RUN] Would test notification channel: ${id}`);
      return {
        success: true,
        message: 'DRY RUN: Test would have been sent',
        delivered_at: new Date().toISOString(),
      };
    }

    try {
      const payload: Record<string, any> = {};

      if (options.testMessage) {
        payload.message = options.testMessage;
      }

      const response = await this.apiClient.post(
        `/api/v2/notification-channels/${id}/test`,
        payload,
        {
          timeout: (options.timeout || 30) * 1000, // Convert to milliseconds
        }
      );

      const result = unwrapApiResponse<NotificationChannelTestResponse>(response);

      log.info(`Notification channel test completed: ${id}`, {
        success: result.success,
        message: result.message,
      });

      return result;
    } catch (error) {
      log.error(`Failed to test notification channel ${id}:`, error);
      throw new Error(`Failed to test notification channel ${id}: ${error}`);
    }
  }

  /**
   * Create a new notification channel
   */
  async create(
    config: NotificationChannelConfig,
    options: TestChannelOptions = {}
  ): Promise<NotificationChannel> {
    const payload = await this.buildCreatePayload(config);

    log.debug('Creating notification channel:', {
      name: payload.name,
      type: payload.type,
      enabled: payload.enabled,
      safeConfig: createSafeConfigForLogging(payload.configuration, 'channel configuration'),
    });

    if (this.dryRun) {
      log.info(`[DRY RUN] Would create notification channel: ${payload.name} (${payload.type})`);
      return this.createMockChannel(payload);
    }

    try {
      const response = await this.apiClient.post('/api/v2/notification-channels', payload);
      const createdChannel = unwrapApiResponse<NotificationChannel>(response);

      log.info(`Created notification channel: ${createdChannel.name} (${createdChannel.id})`);

      // Test the channel if validation is requested
      if (options.validate) {
        try {
          const testResult = await this.test(createdChannel.id, options);
          log.info(`Channel validation completed: ${testResult.success ? 'PASSED' : 'FAILED'}`);

          if (!testResult.success) {
            log.warn(`Channel test failed: ${testResult.message}`);
          }
        } catch (testError) {
          log.error(`Channel validation failed:`, testError);
          // Don't fail the creation if just the test fails
        }
      }

      return createdChannel;
    } catch (error) {
      log.error('Failed to create notification channel:', error);
      throw new Error(`Failed to create notification channel: ${error}`);
    }
  }

  /**
   * Update an existing notification channel
   */
  async update(
    id: string,
    config: NotificationChannelConfig,
    currentRemoteState?: NotificationChannel,
    options: TestChannelOptions = {}
  ): Promise<NotificationChannel> {
    const payload = await this.buildUpdatePayload(config);

    log.debug(`Updating notification channel: ${id}`, {
      name: payload.name,
      enabled: payload.enabled,
      safeConfig: createSafeConfigForLogging(payload.configuration, 'channel configuration'),
    });

    if (this.dryRun) {
      log.info(`[DRY RUN] Would update notification channel: ${id}`);
      return currentRemoteState || this.createMockChannel(payload);
    }

    try {
      const response = await this.apiClient.patch(`/api/v2/notification-channels/${id}`, payload);
      const updatedChannel = unwrapApiResponse<NotificationChannel>(response);

      log.info(`Updated notification channel: ${updatedChannel.name} (${id})`);

      // Test the channel if validation is requested and it's enabled
      if (options.validate && updatedChannel.enabled) {
        try {
          const testResult = await this.test(id, options);
          log.info(`Channel validation completed: ${testResult.success ? 'PASSED' : 'FAILED'}`);

          if (!testResult.success) {
            log.warn(`Channel test failed: ${testResult.message}`);
          }
        } catch (testError) {
          log.error(`Channel validation failed:`, testError);
          // Don't fail the update if just the test fails
        }
      }

      return updatedChannel;
    } catch (error) {
      log.error(`Failed to update notification channel ${id}:`, error);
      throw new Error(`Failed to update notification channel ${id}: ${error}`);
    }
  }

  /**
   * Delete a notification channel
   */
  async delete(id: string): Promise<void> {
    log.debug(`Deleting notification channel: ${id}`);

    if (this.dryRun) {
      log.info(`[DRY RUN] Would delete notification channel: ${id}`);
      return;
    }

    try {
      await this.apiClient.delete(`/api/v2/notification-channels/${id}`);
      log.info(`Deleted notification channel: ${id}`);
    } catch (error) {
      log.error(`Failed to delete notification channel ${id}:`, error);
      throw new Error(`Failed to delete notification channel ${id}: ${error}`);
    }
  }

  /**
   * Validate configuration by channel type
   */
  validateConfiguration(config: NotificationChannelConfig): ConfigurationValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validate based on channel type
    switch (config.type) {
      case 'webhook':
        this.validateWebhookConfig(config, errors, warnings);
        break;
      case 'slack':
        this.validateSlackConfig(config, errors, warnings);
        break;
      case 'email':
        this.validateEmailConfig(config, errors, warnings);
        break;
      case 'discord':
        this.validateDiscordConfig(config, errors, warnings);
        break;
      case 'pagerduty':
        this.validatePagerDutyConfig(config, errors, warnings);
        break;
      case 'msteams':
        this.validateMSTeamsConfig(config, errors, warnings);
        break;
      case 'telegram':
        this.validateTelegramConfig(config, errors, warnings);
        break;
      default:
        errors.push(`Unknown notification channel type: ${(config as any).type}`);
    }

    // Common validations
    this.validateCommonConfig(config, errors, warnings);

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Build create payload from notification channel config
   */
  private async buildCreatePayload(
    config: NotificationChannelConfig
  ): Promise<NotificationChannelCreatePayload> {
    // Perform environment variable substitution
    const envResult = safeSubstituteEnvVars(config.configuration, this.envOptions);

    if (envResult.missingVars.length > 0 && this.envOptions.strict !== false) {
      throw new Error(
        `Missing required environment variables: ${envResult.missingVars.join(', ')}`
      );
    }

    return {
      name: config.name,
      type: config.type,
      description: config.description,
      enabled: config.enabled ?? true,
      configuration: envResult.substituted,
      tags: config.tags,
    };
  }

  /**
   * Build update payload from notification channel config
   */
  private async buildUpdatePayload(
    config: NotificationChannelConfig
  ): Promise<NotificationChannelUpdatePayload> {
    // Perform environment variable substitution
    const envResult = safeSubstituteEnvVars(config.configuration, this.envOptions);

    if (envResult.missingVars.length > 0 && this.envOptions.strict !== false) {
      throw new Error(
        `Missing required environment variables: ${envResult.missingVars.join(', ')}`
      );
    }

    return {
      name: config.name,
      description: config.description,
      enabled: config.enabled,
      configuration: envResult.substituted,
      tags: config.tags,
    };
  }

  /**
   * Type-specific configuration validations
   */
  private validateWebhookConfig(
    config: NotificationChannelConfig,
    errors: string[],
    warnings: string[]
  ): void {
    const cfg = config.configuration as any;

    if (!cfg.url) {
      errors.push("Webhook requires 'url' field");
    } else if (typeof cfg.url === 'string' && !cfg.url.match(/^https?:\/\/.+/)) {
      errors.push('Webhook URL must be a valid HTTP/HTTPS URL');
    }

    if (cfg.method && !['GET', 'POST', 'PUT', 'PATCH'].includes(cfg.method)) {
      errors.push('Invalid webhook method. Must be one of: GET, POST, PUT, PATCH');
    }

    if (cfg.timeout && (typeof cfg.timeout !== 'number' || cfg.timeout < 1 || cfg.timeout > 300)) {
      warnings.push('Webhook timeout should be between 1 and 300 seconds');
    }
  }

  private validateSlackConfig(
    config: NotificationChannelConfig,
    errors: string[],
    warnings: string[]
  ): void {
    const cfg = config.configuration as any;

    if (!cfg.webhook_url) {
      errors.push("Slack channel requires 'webhook_url' field");
    } else if (
      typeof cfg.webhook_url === 'string' &&
      !cfg.webhook_url.includes('hooks.slack.com')
    ) {
      warnings.push('Slack webhook URL should be from hooks.slack.com');
    }

    if (cfg.icon_url && typeof cfg.icon_url === 'string' && !cfg.icon_url.match(/^https?:\/\/.+/)) {
      warnings.push('Slack icon_url should be a valid URL');
    }
  }

  private validateEmailConfig(
    config: NotificationChannelConfig,
    errors: string[],
    _warnings: string[]
  ): void {
    const cfg = config.configuration as any;

    if (!cfg.smtp) {
      errors.push("Email channel requires 'smtp' configuration");
      return;
    }

    if (!cfg.smtp.host) {
      errors.push('Email SMTP host is required');
    }

    if (!cfg.smtp.auth || !cfg.smtp.auth.user || !cfg.smtp.auth.pass) {
      errors.push('Email SMTP authentication (user and pass) is required');
    }

    if (
      !cfg.recipients ||
      !cfg.recipients.to ||
      !Array.isArray(cfg.recipients.to) ||
      cfg.recipients.to.length === 0
    ) {
      errors.push("Email recipients 'to' field is required and must be a non-empty array");
    }
  }

  private validateDiscordConfig(
    config: NotificationChannelConfig,
    errors: string[],
    warnings: string[]
  ): void {
    const cfg = config.configuration as any;

    if (!cfg.webhook_url) {
      errors.push("Discord channel requires 'webhook_url' field");
    } else if (
      typeof cfg.webhook_url === 'string' &&
      !cfg.webhook_url.includes('discord.com/api/webhooks')
    ) {
      warnings.push('Discord webhook URL should be from discord.com/api/webhooks');
    }
  }

  private validatePagerDutyConfig(
    config: NotificationChannelConfig,
    errors: string[],
    _warnings: string[]
  ): void {
    const cfg = config.configuration as any;

    if (!cfg.integration_key) {
      errors.push("PagerDuty channel requires 'integration_key' field");
    }

    if (cfg.event_action && !['trigger', 'acknowledge', 'resolve'].includes(cfg.event_action)) {
      errors.push('PagerDuty event_action must be one of: trigger, acknowledge, resolve');
    }
  }

  private validateMSTeamsConfig(
    config: NotificationChannelConfig,
    errors: string[],
    warnings: string[]
  ): void {
    const cfg = config.configuration as any;

    if (!cfg.webhook_url) {
      errors.push("Microsoft Teams channel requires 'webhook_url' field");
    } else if (
      typeof cfg.webhook_url === 'string' &&
      !cfg.webhook_url.includes('webhook.office.com')
    ) {
      warnings.push('Microsoft Teams webhook URL should be from webhook.office.com');
    }
  }

  private validateTelegramConfig(
    config: NotificationChannelConfig,
    errors: string[],
    warnings: string[]
  ): void {
    const cfg = config.configuration as any;

    if (!cfg.bot_token) {
      errors.push("Telegram channel requires 'bot_token' field");
    }

    if (!cfg.chat_id) {
      errors.push("Telegram channel requires 'chat_id' field");
    }

    if (cfg.parse_mode && !['MarkdownV2', 'HTML', 'Markdown'].includes(cfg.parse_mode)) {
      warnings.push('Telegram parse_mode should be one of: MarkdownV2, HTML, Markdown');
    }
  }

  private validateCommonConfig(
    config: NotificationChannelConfig,
    errors: string[],
    warnings: string[]
  ): void {
    // Common validation that applies to all channel types
    if (!config.configuration || Object.keys(config.configuration).length === 0) {
      warnings.push('Channel configuration is empty - this may not work as expected');
    }

    // Check for environment variable references
    try {
      const envResult = safeSubstituteEnvVars(config.configuration, { strict: false });
      if (envResult.referencedVars.length > 0) {
        log.debug('Environment variables referenced in configuration:', envResult.referencedVars);
      }
    } catch (error) {
      warnings.push(`Environment variable substitution check failed: ${error}`);
    }
  }

  /**
   * Create a mock notification channel for dry-run mode
   */
  private createMockChannel(
    payload: NotificationChannelCreatePayload | NotificationChannelUpdatePayload
  ): NotificationChannel {
    return {
      id: `mock_${Date.now()}`,
      name: payload.name || 'Mock Channel',
      type: 'type' in payload ? payload.type : ('webhook' as const),
      description: payload.description,
      enabled: payload.enabled ?? true,
      configuration: redactSecrets(payload.configuration || {}),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      tags: payload.tags,
    };
  }

  /**
   * Generate hash for notification channel configuration (for state tracking)
   */
  static generateConfigHash(config: NotificationChannelConfig): string {
    // Create a copy and redact secrets before hashing
    const safeConfig = redactSecrets(config);
    return generateFingerprint(safeConfig);
  }

  /**
   * Check if two notification channel configurations are equivalent
   */
  static isConfigEqual(
    config1: NotificationChannelConfig,
    config2: NotificationChannelConfig
  ): boolean {
    return this.generateConfigHash(config1) === this.generateConfigHash(config2);
  }
}

/**
 * Convenience function to create a notification channel provider
 */
export function createNotificationChannelProvider(
  apiClient: ApiClient,
  dryRun?: boolean,
  envOptions?: EnvSubstitutionOptions
): NotificationChannelProvider {
  return new NotificationChannelProvider({
    apiClient,
    dryRun,
    envSubstitutionOptions: envOptions,
  });
}
