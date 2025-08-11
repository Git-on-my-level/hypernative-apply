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
import { ApiClient } from '../lib/api-client.js';
import { type EnvSubstitutionOptions } from '../lib/env-substitution.js';
import type { NotificationChannelConfig } from '../schemas/notification-channel.schema.js';
import type { NotificationChannel, NotificationChannelTestResponse, NotificationChannelQueryParams } from '../types/api.js';
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
export declare class NotificationChannelProvider {
    private apiClient;
    private dryRun;
    private envOptions;
    constructor(options: NotificationChannelProviderOptions);
    /**
     * List all notification channels
     */
    list(params?: NotificationChannelQueryParams): Promise<NotificationChannel[]>;
    /**
     * Get a notification channel by ID
     */
    getById(id: string): Promise<NotificationChannel | null>;
    /**
     * Test a notification channel
     */
    test(id: string, options?: TestChannelOptions): Promise<NotificationChannelTestResponse>;
    /**
     * Create a new notification channel
     */
    create(config: NotificationChannelConfig, options?: TestChannelOptions): Promise<NotificationChannel>;
    /**
     * Update an existing notification channel
     */
    update(id: string, config: NotificationChannelConfig, currentRemoteState?: NotificationChannel, options?: TestChannelOptions): Promise<NotificationChannel>;
    /**
     * Delete a notification channel
     */
    delete(id: string): Promise<void>;
    /**
     * Validate configuration by channel type
     */
    validateConfiguration(config: NotificationChannelConfig): ConfigurationValidationResult;
    /**
     * Build create payload from notification channel config
     */
    private buildCreatePayload;
    /**
     * Build update payload from notification channel config
     */
    private buildUpdatePayload;
    /**
     * Type-specific configuration validations
     */
    private validateWebhookConfig;
    private validateSlackConfig;
    private validateEmailConfig;
    private validateDiscordConfig;
    private validatePagerDutyConfig;
    private validateMSTeamsConfig;
    private validateTelegramConfig;
    private validateCommonConfig;
    /**
     * Create a mock notification channel for dry-run mode
     */
    private createMockChannel;
    /**
     * Generate hash for notification channel configuration (for state tracking)
     */
    static generateConfigHash(config: NotificationChannelConfig): string;
    /**
     * Check if two notification channel configurations are equivalent
     */
    static isConfigEqual(config1: NotificationChannelConfig, config2: NotificationChannelConfig): boolean;
}
/**
 * Convenience function to create a notification channel provider
 */
export declare function createNotificationChannelProvider(apiClient: ApiClient, dryRun?: boolean, envOptions?: EnvSubstitutionOptions): NotificationChannelProvider;
//# sourceMappingURL=notification-channel.provider.d.ts.map