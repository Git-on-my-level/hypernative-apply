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
import { ApiClient } from '../lib/api-client.js';
import { ChannelResolver } from '../lib/channel-resolver.js';
import type { CustomAgentConfig } from '../schemas/custom-agent.schema.js';
import type { CustomAgent, CustomAgentStatusResponse, CustomAgentQueryParams } from '../types/api.js';
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
export declare class CustomAgentProvider {
    private apiClient;
    private channelResolver;
    private dryRun;
    constructor(options: CustomAgentProviderOptions);
    /**
     * List all custom agents
     */
    list(params?: CustomAgentQueryParams): Promise<CustomAgent[]>;
    /**
     * Get a custom agent by ID
     */
    getById(id: string): Promise<CustomAgent | null>;
    /**
     * Get custom agent status
     */
    getStatus(id: string): Promise<CustomAgentStatusResponse | null>;
    /**
     * Create a new custom agent
     */
    create(config: CustomAgentConfig): Promise<CustomAgent>;
    /**
     * Update an existing custom agent
     * NOTE: If the type changes, this will be treated as a REPLACE operation in the planner
     */
    update(id: string, config: CustomAgentConfig, currentRemoteState?: CustomAgent): Promise<CustomAgent>;
    /**
     * Replace an existing custom agent (used when type changes)
     * This deletes the old agent and creates a new one
     */
    replace(id: string, config: CustomAgentConfig): Promise<CustomAgent>;
    /**
     * Delete a custom agent
     */
    delete(id: string): Promise<void>;
    /**
     * Validate configuration by agent type
     */
    validateConfiguration(config: CustomAgentConfig): ConfigurationValidationResult;
    /**
     * Build create payload from custom agent config
     */
    private buildCreatePayload;
    /**
     * Build update payload from custom agent config
     */
    private buildUpdatePayload;
    /**
     * Type-specific configuration validations
     */
    private validateBalanceChangeConfig;
    private validateHealthDeviationConfig;
    private validateTransactionConfig;
    private validateGovernanceConfig;
    private validateCommonConfig;
    /**
     * Create a mock custom agent for dry-run mode
     */
    private createMockAgent;
    /**
     * Generate hash for custom agent configuration (for state tracking)
     */
    static generateConfigHash(config: CustomAgentConfig): string;
    /**
     * Check if two custom agent configurations are equivalent
     */
    static isConfigEqual(config1: CustomAgentConfig, config2: CustomAgentConfig): boolean;
    /**
     * Check if the agent type has changed (triggers REPLACE instead of UPDATE)
     */
    static hasTypeChanged(config: CustomAgentConfig, remoteAgent: CustomAgent): boolean;
}
/**
 * Convenience function to create a custom agent provider
 */
export declare function createCustomAgentProvider(apiClient: ApiClient, dryRun?: boolean): CustomAgentProvider;
//# sourceMappingURL=custom-agent.provider.d.ts.map