/**
 * Custom Agent Provider
 *
 * Handles CRUD operations for Hypernative Custom Agents including:
 * - Creating, updating, and deleting custom agents
 * - Configuration validation by type where feasible
 * - Channel resolution during planning phase
 * - Replace logic when agent type changes (not update)
 * - Status monitoring and error handling
 * - Integration with existing state management and planning
 */

import { log } from '../lib/logger.js';
import { unwrapApiResponse, unwrapApiListResponse } from '../lib/api-response.js';
import { ApiClient } from '../lib/api-client.js';
import { generateFingerprint } from '../lib/fingerprint.js';
import { ChannelResolver } from '../lib/channel-resolver.js';
import type { CustomAgentConfig } from '../schemas/custom-agent.schema.js';
import type {
  CustomAgent,
  CustomAgentCreatePayload,
  CustomAgentUpdatePayload,
  CustomAgentStatusResponse,
  CustomAgentQueryParams,
} from '../types/api.js';

export interface CustomAgentProviderOptions {
  apiClient: ApiClient;
  channelResolver?: ChannelResolver;
  dryRun?: boolean;
}

export interface ConfigurationValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export class CustomAgentProvider {
  private apiClient: ApiClient;
  private channelResolver: ChannelResolver;
  private dryRun: boolean;

  constructor(options: CustomAgentProviderOptions) {
    this.apiClient = options.apiClient;
    this.channelResolver = options.channelResolver || new ChannelResolver(options.apiClient);
    this.dryRun = options.dryRun ?? false;
  }

  /**
   * List all custom agents
   */
  async list(params?: CustomAgentQueryParams): Promise<CustomAgent[]> {
    log.debug('Fetching custom agents', params);

    try {
      const response = await this.apiClient.get('/api/v2/custom-agents', {
        params: {
          limit: params?.limit ?? 100,
          offset: params?.offset ?? 0,
          enabled: params?.enabled,
          type: params?.type,
        },
      });

      return unwrapApiListResponse<CustomAgent>(response);
    } catch (error) {
      log.error('Failed to list custom agents:', error);
      throw new Error(`Failed to list custom agents: ${error}`);
    }
  }

  /**
   * Get a custom agent by ID
   */
  async getById(id: string): Promise<CustomAgent | null> {
    log.debug(`Fetching custom agent: ${id}`);

    try {
      const response = await this.apiClient.get(`/api/v2/custom-agents/${id}`);
      return unwrapApiResponse<CustomAgent>(response);
    } catch (error: any) {
      if (error.status === 404) {
        return null;
      }
      log.error(`Failed to get custom agent ${id}:`, error);
      throw new Error(`Failed to get custom agent ${id}: ${error}`);
    }
  }

  /**
   * Get custom agent status
   */
  async getStatus(id: string): Promise<CustomAgentStatusResponse | null> {
    log.debug(`Fetching custom agent status: ${id}`);

    try {
      const response = await this.apiClient.get(`/api/v2/custom-agents/${id}/status`);
      return unwrapApiResponse<CustomAgentStatusResponse>(response);
    } catch (error: any) {
      if (error.status === 404) {
        return null;
      }
      log.error(`Failed to get custom agent status ${id}:`, error);
      throw new Error(`Failed to get custom agent status ${id}: ${error}`);
    }
  }

  /**
   * Create a new custom agent
   */
  async create(config: CustomAgentConfig): Promise<CustomAgent> {
    const payload = await this.buildCreatePayload(config);
    log.debug('Creating custom agent:', {
      name: payload.name,
      type: payload.type,
      channels: payload.notification_channels?.length || 0,
    });

    if (this.dryRun) {
      log.info(`[DRY RUN] Would create custom agent: ${payload.name} (${payload.type})`);
      return this.createMockAgent(payload);
    }

    try {
      const response = await this.apiClient.post('/api/v2/custom-agents', payload);
      const created = unwrapApiResponse<CustomAgent>(response);
      log.info(`Created custom agent: ${created.name} (${created.id})`);
      return created;
    } catch (error) {
      log.error('Failed to create custom agent:', error);
      throw new Error(`Failed to create custom agent: ${error}`);
    }
  }

  /**
   * Update an existing custom agent
   * NOTE: If the type changes, this will be treated as a REPLACE operation in the planner
   */
  async update(
    id: string,
    config: CustomAgentConfig,
    currentRemoteState?: CustomAgent
  ): Promise<CustomAgent> {
    const payload = await this.buildUpdatePayload(config);
    log.debug(`Updating custom agent: ${id}`, {
      name: payload.name,
      type: config.type,
      channels: payload.notification_channels?.length || 0,
    });

    if (this.dryRun) {
      log.info(`[DRY RUN] Would update custom agent: ${id}`);
      return currentRemoteState || this.createMockAgent(payload);
    }

    try {
      const response = await this.apiClient.patch(`/api/v2/custom-agents/${id}`, payload);
      const updated = unwrapApiResponse<CustomAgent>(response);
      log.info(`Updated custom agent: ${updated.name} (${id})`);
      return updated;
    } catch (error) {
      log.error(`Failed to update custom agent ${id}:`, error);
      throw new Error(`Failed to update custom agent ${id}: ${error}`);
    }
  }

  /**
   * Replace an existing custom agent (used when type changes)
   * This deletes the old agent and creates a new one
   */
  async replace(id: string, config: CustomAgentConfig): Promise<CustomAgent> {
    log.debug(`Replacing custom agent: ${id}`, {
      name: config.name,
      type: config.type,
    });

    if (this.dryRun) {
      log.info(`[DRY RUN] Would replace custom agent: ${id}`);
      const payload = await this.buildCreatePayload(config);
      return this.createMockAgent(payload);
    }

    try {
      // First delete the existing agent
      await this.delete(id);

      // Then create a new one
      const newAgent = await this.create(config);
      log.info(`Replaced custom agent: ${newAgent.name} (${id} -> ${newAgent.id})`);
      return newAgent;
    } catch (error) {
      log.error(`Failed to replace custom agent ${id}:`, error);
      throw new Error(`Failed to replace custom agent ${id}: ${error}`);
    }
  }

  /**
   * Delete a custom agent
   */
  async delete(id: string): Promise<void> {
    log.debug(`Deleting custom agent: ${id}`);

    if (this.dryRun) {
      log.info(`[DRY RUN] Would delete custom agent: ${id}`);
      return;
    }

    try {
      await this.apiClient.delete(`/api/v2/custom-agents/${id}`);
      log.info(`Deleted custom agent: ${id}`);
    } catch (error) {
      log.error(`Failed to delete custom agent ${id}:`, error);
      throw new Error(`Failed to delete custom agent ${id}: ${error}`);
    }
  }

  /**
   * Validate configuration by agent type
   */
  validateConfiguration(config: CustomAgentConfig): ConfigurationValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validate based on agent type
    switch (config.type) {
      case 'address_balance_change':
        this.validateBalanceChangeConfig(config, errors, warnings);
        break;
      case 'position_health_deviation':
        this.validateHealthDeviationConfig(config, errors, warnings);
        break;
      case 'large_transaction_monitor':
        this.validateTransactionConfig(config, errors, warnings);
        break;
      case 'governance_proposal_monitor':
        this.validateGovernanceConfig(config, errors, warnings);
        break;
      // Add more type-specific validations as needed
      default:
        // For unknown types, just validate common fields
        this.validateCommonConfig(config, errors, warnings);
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Build create payload from custom agent config
   */
  private async buildCreatePayload(config: CustomAgentConfig): Promise<CustomAgentCreatePayload> {
    // Resolve notification channels
    let resolvedChannels: string[] | undefined;
    if (config.notification_channels && config.notification_channels.length > 0) {
      const resolution = await this.channelResolver.resolveChannels(config.notification_channels);
      if (resolution.failed.length > 0) {
        const errorMessage = this.channelResolver.generateErrorMessage(resolution);
        throw new Error(`Channel resolution failed:\n${errorMessage}`);
      }
      resolvedChannels = Object.values(resolution.resolved);
    }

    return {
      name: config.name,
      type: config.type,
      description: config.description,
      enabled: config.enabled ?? true,
      severity: config.severity ?? 'medium',
      chain: config.chain,
      configuration: config.configuration || {},
      notification_channels: resolvedChannels,
    };
  }

  /**
   * Build update payload from custom agent config
   */
  private async buildUpdatePayload(config: CustomAgentConfig): Promise<CustomAgentUpdatePayload> {
    // Resolve notification channels
    let resolvedChannels: string[] | undefined;
    if (config.notification_channels && config.notification_channels.length > 0) {
      const resolution = await this.channelResolver.resolveChannels(config.notification_channels);
      if (resolution.failed.length > 0) {
        const errorMessage = this.channelResolver.generateErrorMessage(resolution);
        throw new Error(`Channel resolution failed:\n${errorMessage}`);
      }
      resolvedChannels = Object.values(resolution.resolved);
    }

    return {
      name: config.name,
      description: config.description,
      enabled: config.enabled,
      severity: config.severity,
      configuration: config.configuration,
      notification_channels: resolvedChannels,
    };
  }

  /**
   * Type-specific configuration validations
   */
  private validateBalanceChangeConfig(
    config: CustomAgentConfig,
    errors: string[],
    warnings: string[]
  ): void {
    const cfg = config.configuration || {};

    if (!cfg.addresses || !Array.isArray(cfg.addresses) || cfg.addresses.length === 0) {
      errors.push("Balance change monitor requires 'addresses' array");
    }

    if (cfg.threshold_value !== undefined && typeof cfg.threshold_value !== 'number') {
      errors.push("'threshold_value' must be a number");
    }

    if (
      cfg.time_window &&
      !['1m', '5m', '15m', '30m', '1h', '2h', '6h', '12h', '24h'].includes(cfg.time_window)
    ) {
      warnings.push(`Unknown time_window '${cfg.time_window}', using default`);
    }
  }

  private validateHealthDeviationConfig(
    config: CustomAgentConfig,
    errors: string[],
    _warnings: string[]
  ): void {
    const cfg = config.configuration || {};

    if (!cfg.protocol) {
      errors.push("Health deviation monitor requires 'protocol' field");
    }

    if (
      cfg.health_factor_threshold !== undefined &&
      (typeof cfg.health_factor_threshold !== 'number' || cfg.health_factor_threshold <= 0)
    ) {
      errors.push("'health_factor_threshold' must be a positive number");
    }
  }

  private validateTransactionConfig(
    config: CustomAgentConfig,
    errors: string[],
    _warnings: string[]
  ): void {
    const cfg = config.configuration || {};

    if (cfg.value_threshold_usd !== undefined && typeof cfg.value_threshold_usd !== 'number') {
      errors.push("'value_threshold_usd' must be a number");
    }
  }

  private validateGovernanceConfig(
    config: CustomAgentConfig,
    errors: string[],
    _warnings: string[]
  ): void {
    const cfg = config.configuration || {};

    if (!cfg.governance_contract) {
      errors.push("Governance monitor requires 'governance_contract' address");
    }
  }

  private validateCommonConfig(
    config: CustomAgentConfig,
    errors: string[],
    warnings: string[]
  ): void {
    // Common validation that applies to all agent types
    if (!config.configuration || Object.keys(config.configuration).length === 0) {
      warnings.push('Agent configuration is empty - this may not work as expected');
    }
  }

  /**
   * Create a mock custom agent for dry-run mode
   */
  private createMockAgent(
    payload: CustomAgentCreatePayload | CustomAgentUpdatePayload
  ): CustomAgent {
    return {
      id: `mock_${Date.now()}`,
      name: payload.name || 'Mock Agent',
      description: payload.description,
      type: 'type' in payload ? payload.type : 'mock_type',
      enabled: payload.enabled ?? true,
      configuration: payload.configuration || {},
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      execution_count: 0,
      error_count: 0,
    };
  }

  /**
   * Generate hash for custom agent configuration (for state tracking)
   */
  static generateConfigHash(config: CustomAgentConfig): string {
    return generateFingerprint(config);
  }

  /**
   * Check if two custom agent configurations are equivalent
   */
  static isConfigEqual(config1: CustomAgentConfig, config2: CustomAgentConfig): boolean {
    return this.generateConfigHash(config1) === this.generateConfigHash(config2);
  }

  /**
   * Check if the agent type has changed (triggers REPLACE instead of UPDATE)
   */
  static hasTypeChanged(config: CustomAgentConfig, remoteAgent: CustomAgent): boolean {
    return config.type !== remoteAgent.type;
  }
}

/**
 * Convenience function to create a custom agent provider
 */
export function createCustomAgentProvider(
  apiClient: ApiClient,
  dryRun?: boolean
): CustomAgentProvider {
  return new CustomAgentProvider({ apiClient, dryRun });
}
