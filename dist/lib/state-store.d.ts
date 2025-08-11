/**
 * State store module for managing local state and preventing concurrent operations
 *
 * This module handles:
 * - Loading and saving state to .hypernative/state.json
 * - Lock file management to prevent concurrent apply operations
 * - State comparison and change detection
 */
import { StateFile, LockFile, StateComparison, StateOperationResult } from '../types/state.js';
import type { ParsedConfig } from '../schemas/config.schema.js';
export declare class StateStore {
    private baseDir;
    private stateDir;
    private stateFilePath;
    private lockFilePath;
    constructor(baseDir?: string);
    /**
     * Initialize state directory if it doesn't exist with secure permissions
     */
    private ensureStateDirectory;
    /**
     * Create an initial empty state file
     */
    private createInitialState;
    /**
     * Load state from file, creating an empty state if file doesn't exist
     */
    loadState(): Promise<StateFile>;
    /**
     * Save state to file using atomic write (temp file + rename)
     */
    saveState(state: StateFile): Promise<StateOperationResult>;
    /**
     * Update a single resource in the state
     */
    updateResource(name: string, kind: string, remoteId: string, appliedHash: string, seenRemoteHash: string, configFile?: string): Promise<StateOperationResult>;
    /**
     * Remove a resource from the state
     */
    removeResource(name: string): Promise<StateOperationResult>;
    /**
     * Check if a process is still running (for lock file validation)
     * Cross-platform implementation for Windows and Unix systems
     */
    private isProcessRunning;
    /**
     * Check if there's an active lock
     */
    isLocked(): Promise<{
        locked: boolean;
        lockInfo?: LockFile;
        stale?: boolean;
    }>;
    /**
     * Create a lock file to prevent concurrent operations
     * Uses atomic file operations with 'wx' flag to prevent race conditions
     */
    createLock(operation: 'plan' | 'apply'): Promise<StateOperationResult>;
    /**
     * Remove the lock file
     */
    removeLock(): Promise<StateOperationResult>;
    /**
     * Convert parsed configuration to resources with hashes
     */
    private configToResourcesWithHash;
    /**
     * Compare current state with desired configuration
     */
    compareState(config: ParsedConfig): Promise<StateComparison>;
    /**
     * Check if this would be a no-op (no changes needed)
     */
    isNoOp(config: ParsedConfig): Promise<boolean>;
    /**
     * Get state directory path
     */
    getStateDir(): string;
    /**
     * Get state file path
     */
    getStateFilePath(): string;
    /**
     * Acquire a lock with retry logic and exponential backoff
     */
    acquireLockWithRetry(operation: 'plan' | 'apply', maxRetries?: number): Promise<StateOperationResult>;
    /**
     * Acquire a lock for the given operation (convenience method)
     */
    acquireLock(operation: 'plan' | 'apply'): Promise<void>;
    /**
     * Release the current lock (convenience method)
     */
    releaseLock(): Promise<void>;
}
//# sourceMappingURL=state-store.d.ts.map