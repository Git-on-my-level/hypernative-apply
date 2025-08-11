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
import { ApiClient } from './api-client.js';
import { WatchlistProvider } from '../providers/watchlist.provider.js';
import { CustomAgentProvider } from '../providers/custom-agent.provider.js';
import { NotificationChannelProvider } from '../providers/notification-channel.provider.js';
import type { ParsedConfig } from '../schemas/config.schema.js';
import type { ExecutionPlan, ExecutionResult, ExecutionOptions } from '../types/plan.js';
export interface ExecutorOptions {
    apiClient: ApiClient;
    baseDir?: string;
    dryRun?: boolean;
    parallelism?: number;
    continueOnError?: boolean;
}
export interface ProviderContext {
    watchlistProvider: WatchlistProvider;
    customAgentProvider: CustomAgentProvider;
    notificationChannelProvider: NotificationChannelProvider;
}
export declare class Executor {
    private apiClient;
    private stateStore;
    private dryRun;
    private parallelism;
    private continueOnError;
    private providers;
    private originalStates;
    constructor(options: ExecutorOptions);
    /**
     * Execute the entire execution plan
     */
    execute(plan: ExecutionPlan, config: ParsedConfig, options?: ExecutionOptions): Promise<ExecutionResult>;
    /**
     * Execute a single resource change
     */
    private executeChange;
    /**
     * Execute a watchlist change
     */
    private executeWatchlistChange;
    /**
     * Execute a custom agent change
     */
    private executeCustomAgentChange;
    /**
     * Update state after a successful change
     */
    private updateStateAfterChange;
    /**
     * Get resource configuration by name and kind
     */
    private getResourceConfig;
    /**
     * Rollback successful changes
     */
    private rollbackChanges;
    /**
     * Rollback a watchlist change
     */
    private rollbackWatchlistChange;
    /**
     * Rollback a notification channel change
     */
    private rollbackNotificationChannelChange;
    /**
     * Rollback a custom agent change
     */
    private rollbackCustomAgentChange;
    /**
     * Convert API watchlist response back to configuration format for rollback
     */
    private convertApiWatchlistToConfig;
    /**
     * Convert API notification channel response back to configuration format for rollback
     */
    private convertApiNotificationChannelToConfig;
    /**
     * Convert API custom agent response back to configuration format for rollback
     */
    private convertApiCustomAgentToConfig;
    /**
     * Create execution summary
     */
    private createExecutionSummary;
    /**
     * Execute a notification channel change
     */
    private executeNotificationChannelChange;
    /**
     * Check if execution can proceed
     */
    canExecute(): Promise<{
        canExecute: boolean;
        reason?: string;
    }>;
}
/**
 * Convenience function to create an executor
 */
export declare function createExecutor(options: ExecutorOptions): Executor;
/**
 * Convenience function to execute a plan
 */
export declare function executePlan(plan: ExecutionPlan, config: ParsedConfig, executorOptions: ExecutorOptions, executionOptions?: ExecutionOptions): Promise<ExecutionResult>;
//# sourceMappingURL=executor.d.ts.map