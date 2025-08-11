/**
 * Executor module for the Hypernative Apply CLI
 *
 * Handles the execution of planned changes by:
 * - Coordinating with resource providers (watchlists, custom agents, notification channels)
 * - Managing execution order based on dependencies
 * - Updating state after successful operations
 * - Rolling back changes on failure
 * - Providing detailed progress reporting
 */
import { StateStore } from './state-store.js';
import { log } from './logger.js';
import { WatchlistProvider } from '../providers/watchlist.provider.js';
import { CustomAgentProvider } from '../providers/custom-agent.provider.js';
import { NotificationChannelProvider } from '../providers/notification-channel.provider.js';
import { generateFingerprint } from './fingerprint.js';
import { ChangeType } from '../types/plan.js';
export class Executor {
    apiClient;
    stateStore;
    dryRun;
    parallelism;
    continueOnError;
    providers;
    originalStates = new Map(); // Store original remote states for rollback
    constructor(options) {
        this.apiClient = options.apiClient;
        this.stateStore = new StateStore(options.baseDir);
        this.dryRun = options.dryRun ?? false;
        this.parallelism = options.parallelism ?? 1;
        this.continueOnError = options.continueOnError ?? false;
        // Initialize providers
        this.providers = {
            watchlistProvider: new WatchlistProvider({
                apiClient: this.apiClient,
                dryRun: this.dryRun,
            }),
            customAgentProvider: new CustomAgentProvider({
                apiClient: this.apiClient,
                dryRun: this.dryRun,
            }),
            notificationChannelProvider: new NotificationChannelProvider({
                apiClient: this.apiClient,
                dryRun: this.dryRun,
            }),
        };
    }
    /**
     * Execute the entire execution plan
     */
    async execute(plan, config, options = {}) {
        const startTime = Date.now();
        const results = [];
        const rolledBack = [];
        let acquiredLock = false;
        try {
            // Acquire execution lock
            log.debug('Acquiring execution lock');
            await this.stateStore.acquireLock('apply');
            acquiredLock = true;
            // Filter out no-change resources unless requested
            const changesToExecute = plan.changes.filter((change) => change.change_type !== ChangeType.NO_CHANGE || options.includeNoChange);
            if (changesToExecute.length === 0) {
                log.info('No changes to execute');
                return {
                    success: true,
                    results: [],
                    summary: this.createExecutionSummary([], startTime),
                    plan_id: plan.metadata.plan_id,
                };
            }
            log.info(`Executing ${changesToExecute.length} changes...`);
            // Load current state
            let currentState = await this.stateStore.loadState();
            // Execute changes in dependency order
            for (let i = 0; i < changesToExecute.length; i++) {
                const change = changesToExecute[i];
                const progress = `(${i + 1}/${changesToExecute.length})`;
                try {
                    log.info(`${progress} Executing: ${change.change_type} ${change.kind}.${change.name}`);
                    const result = await this.executeChange(change, config, currentState);
                    results.push(result);
                    // Update state on successful operations
                    if (result.success && (result.remote_id || change.change_type === ChangeType.DELETE)) {
                        currentState = await this.updateStateAfterChange(change, result, config, currentState);
                    }
                    log.info(`${progress} Completed: ${change.kind}.${change.name}`);
                }
                catch (error) {
                    log.error(`${progress} Failed: ${change.kind}.${change.name}`, error);
                    const failureResult = {
                        resource_name: change.name,
                        resource_kind: change.kind,
                        change_type: change.change_type,
                        success: false,
                        error: error instanceof Error ? error.message : String(error),
                        duration_ms: 0,
                    };
                    results.push(failureResult);
                    if (!this.continueOnError) {
                        // Rollback previous successful changes
                        log.warn('Failure detected, rolling back previous changes...');
                        await this.rollbackChanges(results.filter((r) => r.success), currentState);
                        throw new Error(`Execution failed at ${change.kind}.${change.name}: ${error}`);
                    }
                }
            }
            // Save final state
            await this.stateStore.saveState(currentState);
            const summary = this.createExecutionSummary(results, startTime);
            const success = results.every((r) => r.success);
            if (success) {
                log.success(`All ${results.length} changes executed successfully`);
            }
            else {
                const failureCount = results.filter((r) => !r.success).length;
                log.warn(`${results.length - failureCount}/${results.length} changes executed successfully (${failureCount} failures)`);
            }
            return {
                success,
                results,
                summary,
                plan_id: plan.metadata.plan_id,
                rolled_back: rolledBack,
            };
        }
        finally {
            if (acquiredLock) {
                await this.stateStore.releaseLock();
            }
        }
    }
    /**
     * Execute a single resource change
     */
    async executeChange(change, config, currentState) {
        const startTime = Date.now();
        try {
            let remoteId;
            let result;
            switch (change.kind) {
                case 'watchlist':
                    result = await this.executeWatchlistChange(change, config, currentState);
                    remoteId = result?.id;
                    break;
                case 'notification_channel':
                    result = await this.executeNotificationChannelChange(change, config, currentState);
                    remoteId = result?.id;
                    break;
                case 'custom_agent':
                    result = await this.executeCustomAgentChange(change, config, currentState);
                    remoteId = result?.id;
                    break;
                default:
                    throw new Error(`Unknown resource kind: ${change.kind}`);
            }
            return {
                resource_name: change.name,
                resource_kind: change.kind,
                change_type: change.change_type,
                success: true,
                remote_id: remoteId,
                duration_ms: Date.now() - startTime,
                result,
            };
        }
        catch (error) {
            return {
                resource_name: change.name,
                resource_kind: change.kind,
                change_type: change.change_type,
                success: false,
                error: error instanceof Error ? error.message : String(error),
                duration_ms: Date.now() - startTime,
            };
        }
    }
    /**
     * Execute a watchlist change
     */
    async executeWatchlistChange(change, config, _currentState) {
        const watchlistConfig = config.watchlists[change.name];
        if (!watchlistConfig) {
            throw new Error(`Watchlist configuration not found: ${change.name}`);
        }
        switch (change.change_type) {
            case ChangeType.CREATE:
                return await this.providers.watchlistProvider.create(watchlistConfig);
            case ChangeType.UPDATE:
                if (!change.remote_id) {
                    throw new Error(`Remote ID not found for watchlist update: ${change.name}`);
                }
                // Get current remote state for asset reconciliation and store for rollback
                const currentRemoteState = await this.providers.watchlistProvider.getById(change.remote_id);
                if (currentRemoteState) {
                    this.originalStates.set(`${change.kind}.${change.name}`, currentRemoteState);
                }
                return await this.providers.watchlistProvider.update(change.remote_id, watchlistConfig, currentRemoteState || undefined);
            case ChangeType.DELETE:
                if (!change.remote_id) {
                    throw new Error(`Remote ID not found for watchlist deletion: ${change.name}`);
                }
                await this.providers.watchlistProvider.delete(change.remote_id);
                return null;
            case ChangeType.REPLACE:
                // Replace: delete and recreate
                if (change.remote_id) {
                    await this.providers.watchlistProvider.delete(change.remote_id);
                }
                return await this.providers.watchlistProvider.create(watchlistConfig);
            default:
                throw new Error(`Unsupported change type: ${change.change_type}`);
        }
    }
    /**
     * Execute a custom agent change
     */
    async executeCustomAgentChange(change, config, _currentState) {
        const agentConfig = config.custom_agents[change.name];
        if (!agentConfig) {
            throw new Error(`Custom agent configuration not found: ${change.name}`);
        }
        switch (change.change_type) {
            case ChangeType.CREATE:
                return await this.providers.customAgentProvider.create(agentConfig);
            case ChangeType.UPDATE:
                if (!change.remote_id) {
                    throw new Error(`Remote ID not found for custom agent update: ${change.name}`);
                }
                // Get current remote state for comparison and store for rollback
                const currentRemoteState = await this.providers.customAgentProvider.getById(change.remote_id);
                if (currentRemoteState) {
                    this.originalStates.set(`${change.kind}.${change.name}`, currentRemoteState);
                }
                return await this.providers.customAgentProvider.update(change.remote_id, agentConfig, currentRemoteState || undefined);
            case ChangeType.REPLACE:
                if (!change.remote_id) {
                    throw new Error(`Remote ID not found for custom agent replacement: ${change.name}`);
                }
                // Use the replace method which handles delete + create
                return await this.providers.customAgentProvider.replace(change.remote_id, agentConfig);
            case ChangeType.DELETE:
                if (!change.remote_id) {
                    throw new Error(`Remote ID not found for custom agent deletion: ${change.name}`);
                }
                await this.providers.customAgentProvider.delete(change.remote_id);
                return null;
            default:
                throw new Error(`Unsupported change type: ${change.change_type}`);
        }
    }
    /**
     * Update state after a successful change
     */
    async updateStateAfterChange(change, result, config, currentState) {
        const newState = { ...currentState };
        if (change.change_type === ChangeType.DELETE) {
            // Remove from state
            delete newState.resources[change.name];
        }
        else {
            // Add or update state entry
            const resourceConfig = this.getResourceConfig(change.name, change.kind, config);
            const configHash = generateFingerprint(resourceConfig);
            const now = new Date().toISOString();
            const existingEntry = currentState.resources[change.name];
            // Prepare base metadata
            const baseMetadata = {
                created_at: existingEntry?.metadata.created_at || now,
                updated_at: now,
                created_by: 'cli',
                cli_version: '0.1.0', // TODO: Import from package.json
            };
            // Add type-specific metadata for custom agents
            const metadata = change.kind === 'custom_agent'
                ? {
                    ...baseMetadata,
                    agent_type: this.getResourceConfig(change.name, change.kind, config).type,
                }
                : baseMetadata;
            const stateEntry = {
                kind: change.kind,
                name: change.name,
                remote_id: result.remote_id || change.remote_id || '',
                last_applied_hash: configHash,
                last_seen_remote_hash: configHash, // For now, assume they match
                metadata,
            };
            newState.resources[change.name] = stateEntry;
        }
        newState.last_sync = new Date().toISOString();
        return newState;
    }
    /**
     * Get resource configuration by name and kind
     */
    getResourceConfig(name, kind, config) {
        switch (kind) {
            case 'watchlist':
                return config.watchlists[name];
            case 'notification_channel':
                return config.notification_channels[name];
            case 'custom_agent':
                return config.custom_agents[name];
            default:
                throw new Error(`Unknown resource kind: ${kind}`);
        }
    }
    /**
     * Rollback successful changes
     */
    async rollbackChanges(successfulResults, _currentState) {
        log.info(`Rolling back ${successfulResults.length} successful changes...`);
        // Rollback in reverse order
        for (let i = successfulResults.length - 1; i >= 0; i--) {
            const result = successfulResults[i];
            const resourceKey = `${result.resource_kind}.${result.resource_name}`;
            try {
                switch (result.resource_kind) {
                    case 'watchlist':
                        await this.rollbackWatchlistChange(result, resourceKey);
                        break;
                    case 'notification_channel':
                        await this.rollbackNotificationChannelChange(result, resourceKey);
                        break;
                    case 'custom_agent':
                        await this.rollbackCustomAgentChange(result, resourceKey);
                        break;
                }
            }
            catch (error) {
                log.error(`Failed to rollback ${result.resource_kind}.${result.resource_name}:`, error);
            }
        }
    }
    /**
     * Rollback a watchlist change
     */
    async rollbackWatchlistChange(result, resourceKey) {
        switch (result.change_type) {
            case ChangeType.CREATE:
                if (result.remote_id) {
                    await this.providers.watchlistProvider.delete(result.remote_id);
                    log.debug(`Rolled back created watchlist: ${result.resource_name}`);
                }
                break;
            case ChangeType.UPDATE:
                if (result.remote_id) {
                    const originalState = this.originalStates.get(resourceKey);
                    if (originalState) {
                        // Restore the original state by updating with original configuration
                        await this.providers.watchlistProvider.update(result.remote_id, this.convertApiWatchlistToConfig(originalState), originalState);
                        log.debug(`Rolled back updated watchlist: ${result.resource_name}`);
                    }
                }
                break;
            case ChangeType.REPLACE:
                // REPLACE operations are more complex to rollback - would need original resource recreation
                log.warn(`Cannot rollback REPLACE operation for watchlist: ${result.resource_name}`);
                break;
        }
    }
    /**
     * Rollback a notification channel change
     */
    async rollbackNotificationChannelChange(result, resourceKey) {
        switch (result.change_type) {
            case ChangeType.CREATE:
                if (result.remote_id) {
                    await this.providers.notificationChannelProvider.delete(result.remote_id);
                    log.debug(`Rolled back created notification channel: ${result.resource_name}`);
                }
                break;
            case ChangeType.UPDATE:
                if (result.remote_id) {
                    const originalState = this.originalStates.get(resourceKey);
                    if (originalState) {
                        // Restore the original state by updating with original configuration
                        await this.providers.notificationChannelProvider.update(result.remote_id, this.convertApiNotificationChannelToConfig(originalState), originalState);
                        log.debug(`Rolled back updated notification channel: ${result.resource_name}`);
                    }
                }
                break;
            case ChangeType.REPLACE:
                log.warn(`Cannot rollback REPLACE operation for notification channel: ${result.resource_name}`);
                break;
        }
    }
    /**
     * Rollback a custom agent change
     */
    async rollbackCustomAgentChange(result, resourceKey) {
        switch (result.change_type) {
            case ChangeType.CREATE:
                if (result.remote_id) {
                    await this.providers.customAgentProvider.delete(result.remote_id);
                    log.debug(`Rolled back created custom agent: ${result.resource_name}`);
                }
                break;
            case ChangeType.UPDATE:
                if (result.remote_id) {
                    const originalState = this.originalStates.get(resourceKey);
                    if (originalState) {
                        // Restore the original state by updating with original configuration
                        await this.providers.customAgentProvider.update(result.remote_id, this.convertApiCustomAgentToConfig(originalState), originalState);
                        log.debug(`Rolled back updated custom agent: ${result.resource_name}`);
                    }
                }
                break;
            case ChangeType.REPLACE:
                log.warn(`Cannot rollback REPLACE operation for custom agent: ${result.resource_name}`);
                break;
        }
    }
    /**
     * Convert API watchlist response back to configuration format for rollback
     */
    convertApiWatchlistToConfig(apiWatchlist) {
        return {
            name: apiWatchlist.name,
            description: apiWatchlist.description || '',
            assets: apiWatchlist.assets || [],
            tags: apiWatchlist.tags || {},
        };
    }
    /**
     * Convert API notification channel response back to configuration format for rollback
     */
    convertApiNotificationChannelToConfig(apiChannel) {
        // This is a simplified conversion - in reality, we'd need more sophisticated mapping
        return {
            type: apiChannel.type,
            name: apiChannel.name,
            settings: apiChannel.settings || {},
            enabled: apiChannel.enabled ?? true,
        };
    }
    /**
     * Convert API custom agent response back to configuration format for rollback
     */
    convertApiCustomAgentToConfig(apiAgent) {
        return {
            name: apiAgent.name,
            type: apiAgent.type,
            description: apiAgent.description || '',
            code: apiAgent.code || '',
            enabled: apiAgent.enabled ?? true,
            tags: apiAgent.tags || {},
        };
    }
    /**
     * Create execution summary
     */
    createExecutionSummary(results, startTime) {
        const successful = results.filter((r) => r.success);
        const failed = results.filter((r) => !r.success);
        const summary = {
            total_resources: results.length,
            successful: successful.length,
            failed: failed.length,
            duration_ms: Date.now() - startTime,
            by_change_type: {
                created: 0,
                updated: 0,
                replaced: 0,
                deleted: 0,
            },
            by_resource_type: {},
        };
        // Count by change type and resource type
        for (const result of successful) {
            switch (result.change_type) {
                case ChangeType.CREATE:
                    summary.by_change_type.created++;
                    break;
                case ChangeType.UPDATE:
                    summary.by_change_type.updated++;
                    break;
                case ChangeType.REPLACE:
                    summary.by_change_type.replaced++;
                    break;
                case ChangeType.DELETE:
                    summary.by_change_type.deleted++;
                    break;
            }
            if (!summary.by_resource_type[result.resource_kind]) {
                summary.by_resource_type[result.resource_kind] = {
                    successful: 0,
                    failed: 0,
                };
            }
            summary.by_resource_type[result.resource_kind].successful++;
        }
        for (const result of failed) {
            if (!summary.by_resource_type[result.resource_kind]) {
                summary.by_resource_type[result.resource_kind] = {
                    successful: 0,
                    failed: 0,
                };
            }
            summary.by_resource_type[result.resource_kind].failed++;
        }
        return summary;
    }
    /**
     * Execute a notification channel change
     */
    async executeNotificationChannelChange(change, config, _currentState) {
        const channelConfig = config.notification_channels[change.name];
        if (!channelConfig) {
            throw new Error(`Notification channel configuration not found: ${change.name}`);
        }
        // Check if validation is requested
        const testOptions = channelConfig.validate ? { validate: channelConfig.validate } : {};
        switch (change.change_type) {
            case ChangeType.CREATE:
                return await this.providers.notificationChannelProvider.create(channelConfig, testOptions);
            case ChangeType.UPDATE:
                if (!change.remote_id) {
                    throw new Error(`Remote ID not found for notification channel update: ${change.name}`);
                }
                // Get current remote state for comparison and store for rollback
                const currentRemoteState = await this.providers.notificationChannelProvider.getById(change.remote_id);
                if (currentRemoteState) {
                    this.originalStates.set(`${change.kind}.${change.name}`, currentRemoteState);
                }
                return await this.providers.notificationChannelProvider.update(change.remote_id, channelConfig, currentRemoteState || undefined, testOptions);
            case ChangeType.REPLACE:
                if (!change.remote_id) {
                    throw new Error(`Remote ID not found for notification channel replacement: ${change.name}`);
                }
                // Delete the old channel and create a new one
                await this.providers.notificationChannelProvider.delete(change.remote_id);
                return await this.providers.notificationChannelProvider.create(channelConfig, testOptions);
            case ChangeType.DELETE:
                if (!change.remote_id) {
                    throw new Error(`Remote ID not found for notification channel deletion: ${change.name}`);
                }
                await this.providers.notificationChannelProvider.delete(change.remote_id);
                return null;
            default:
                throw new Error(`Unsupported change type: ${change.change_type}`);
        }
    }
    /**
     * Check if execution can proceed
     */
    async canExecute() {
        // Check if state is locked by another operation
        const lockCheck = await this.stateStore.isLocked();
        if (lockCheck.locked) {
            return {
                canExecute: false,
                reason: `Another operation is in progress (PID: ${lockCheck.lockInfo?.pid})`,
            };
        }
        // Check API connectivity
        try {
            // TODO: Add health check endpoint
            return { canExecute: true };
        }
        catch (error) {
            return {
                canExecute: false,
                reason: `API connectivity check failed: ${error}`,
            };
        }
    }
}
/**
 * Convenience function to create an executor
 */
export function createExecutor(options) {
    return new Executor(options);
}
/**
 * Convenience function to execute a plan
 */
export async function executePlan(plan, config, executorOptions, executionOptions) {
    const executor = createExecutor(executorOptions);
    return executor.execute(plan, config, executionOptions);
}
//# sourceMappingURL=executor.js.map