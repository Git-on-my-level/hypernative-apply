/**
 * State management types for tracking applied resources and their hashes
 */
export interface StateEntry {
    /** Resource kind (watchlist, custom_agent, notification_channel) */
    kind: string;
    /** Logical name from configuration */
    name: string;
    /** Remote resource ID from API */
    remote_id: string;
    /** SHA-256 hash of the configuration when last applied successfully */
    last_applied_hash: string;
    /** SHA-256 hash of the remote resource when last seen */
    last_seen_remote_hash: string;
    /** Additional metadata about the resource */
    metadata: StateEntryMetadata;
}
export interface StateEntryMetadata {
    /** When this resource was first created locally */
    created_at: string;
    /** When this resource was last updated */
    updated_at: string;
    /** How this resource was created (cli, import, etc.) */
    created_by: 'cli' | 'import';
    /** Version of the CLI that last modified this resource */
    cli_version?: string;
    /** Original configuration file path */
    config_file?: string;
}
export interface StateFile {
    /** State file format version */
    version: '1.0.0';
    /** When the state was last synchronized with remote */
    last_sync?: string;
    /** Map of resource entries by logical name */
    resources: Record<string, StateEntry>;
    /** Metadata about the state file itself */
    metadata: StateFileMetadata;
}
export interface StateFileMetadata {
    /** When the state file was created */
    created_at: string;
    /** CLI version that created this state */
    created_by_version: string;
    /** Total number of resources tracked */
    total_resources: number;
    /** Breakdown by resource type */
    resource_counts: {
        watchlists: number;
        custom_agents: number;
        notification_channels: number;
    };
}
export interface LockFile {
    /** Process ID that created the lock */
    pid: number;
    /** When the lock was created */
    created_at: string;
    /** Operation that created the lock */
    operation: 'plan' | 'apply';
    /** CLI version */
    version: string;
    /** Working directory */
    cwd: string;
}
export interface StateComparison {
    /** Resources that need to be created */
    to_create: Array<{
        kind: string;
        name: string;
        config_hash: string;
    }>;
    /** Resources that need to be updated */
    to_update: Array<{
        kind: string;
        name: string;
        remote_id: string;
        old_hash: string;
        new_hash: string;
    }>;
    /** Resources that need to be deleted (exist in state but not config) */
    to_delete: Array<{
        kind: string;
        name: string;
        remote_id: string;
    }>;
    /** Resources with no changes */
    no_change: Array<{
        kind: string;
        name: string;
        remote_id: string;
        hash: string;
    }>;
}
export interface ResourceWithHash {
    kind: string;
    name: string;
    config: any;
    hash: string;
    config_file?: string;
}
export interface StateOperationResult {
    success: boolean;
    message?: string;
    error?: Error;
}
//# sourceMappingURL=state.d.ts.map