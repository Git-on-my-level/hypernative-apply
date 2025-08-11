/**
 * Zod schemas for state file validation
 *
 * These schemas provide runtime validation for state files to ensure
 * data integrity and prevent security issues from malformed state data.
 */
import { z } from 'zod';
/**
 * Schema for state entry metadata
 */
export declare const stateEntryMetadataSchema: z.ZodObject<{
    created_at: z.ZodString;
    updated_at: z.ZodString;
    created_by: z.ZodEffects<z.ZodUnion<[z.ZodEnum<["cli", "import"]>, z.ZodString]>, "cli" | "import", string>;
    cli_version: z.ZodOptional<z.ZodString>;
    config_file: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    updated_at: string;
    created_at: string;
    created_by: "cli" | "import";
    cli_version?: string | undefined;
    config_file?: string | undefined;
}, {
    updated_at: string;
    created_at: string;
    created_by: string;
    cli_version?: string | undefined;
    config_file?: string | undefined;
}>;
/**
 * Schema for individual state entries
 */
export declare const stateEntrySchema: z.ZodObject<{
    kind: z.ZodString;
    name: z.ZodString;
    remote_id: z.ZodString;
    last_applied_hash: z.ZodString;
    last_seen_remote_hash: z.ZodString;
    metadata: z.ZodObject<{
        created_at: z.ZodString;
        updated_at: z.ZodString;
        created_by: z.ZodEffects<z.ZodUnion<[z.ZodEnum<["cli", "import"]>, z.ZodString]>, "cli" | "import", string>;
        cli_version: z.ZodOptional<z.ZodString>;
        config_file: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        updated_at: string;
        created_at: string;
        created_by: "cli" | "import";
        cli_version?: string | undefined;
        config_file?: string | undefined;
    }, {
        updated_at: string;
        created_at: string;
        created_by: string;
        cli_version?: string | undefined;
        config_file?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    name: string;
    metadata: {
        updated_at: string;
        created_at: string;
        created_by: "cli" | "import";
        cli_version?: string | undefined;
        config_file?: string | undefined;
    };
    kind: string;
    remote_id: string;
    last_applied_hash: string;
    last_seen_remote_hash: string;
}, {
    name: string;
    metadata: {
        updated_at: string;
        created_at: string;
        created_by: string;
        cli_version?: string | undefined;
        config_file?: string | undefined;
    };
    kind: string;
    remote_id: string;
    last_applied_hash: string;
    last_seen_remote_hash: string;
}>;
/**
 * Schema for state file metadata
 */
export declare const stateFileMetadataSchema: z.ZodObject<{
    created_at: z.ZodString;
    created_by_version: z.ZodString;
    total_resources: z.ZodNumber;
    resource_counts: z.ZodObject<{
        watchlists: z.ZodNumber;
        custom_agents: z.ZodNumber;
        notification_channels: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        notification_channels: number;
        watchlists: number;
        custom_agents: number;
    }, {
        notification_channels: number;
        watchlists: number;
        custom_agents: number;
    }>;
}, "strip", z.ZodTypeAny, {
    total_resources: number;
    resource_counts: {
        notification_channels: number;
        watchlists: number;
        custom_agents: number;
    };
    created_at: string;
    created_by_version: string;
}, {
    total_resources: number;
    resource_counts: {
        notification_channels: number;
        watchlists: number;
        custom_agents: number;
    };
    created_at: string;
    created_by_version: string;
}>;
/**
 * Schema for the entire state file
 */
export declare const stateFileSchema: z.ZodObject<{
    version: z.ZodLiteral<"1.0.0">;
    last_sync: z.ZodOptional<z.ZodString>;
    resources: z.ZodRecord<z.ZodString, z.ZodObject<{
        kind: z.ZodString;
        name: z.ZodString;
        remote_id: z.ZodString;
        last_applied_hash: z.ZodString;
        last_seen_remote_hash: z.ZodString;
        metadata: z.ZodObject<{
            created_at: z.ZodString;
            updated_at: z.ZodString;
            created_by: z.ZodEffects<z.ZodUnion<[z.ZodEnum<["cli", "import"]>, z.ZodString]>, "cli" | "import", string>;
            cli_version: z.ZodOptional<z.ZodString>;
            config_file: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            updated_at: string;
            created_at: string;
            created_by: "cli" | "import";
            cli_version?: string | undefined;
            config_file?: string | undefined;
        }, {
            updated_at: string;
            created_at: string;
            created_by: string;
            cli_version?: string | undefined;
            config_file?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        metadata: {
            updated_at: string;
            created_at: string;
            created_by: "cli" | "import";
            cli_version?: string | undefined;
            config_file?: string | undefined;
        };
        kind: string;
        remote_id: string;
        last_applied_hash: string;
        last_seen_remote_hash: string;
    }, {
        name: string;
        metadata: {
            updated_at: string;
            created_at: string;
            created_by: string;
            cli_version?: string | undefined;
            config_file?: string | undefined;
        };
        kind: string;
        remote_id: string;
        last_applied_hash: string;
        last_seen_remote_hash: string;
    }>>;
    metadata: z.ZodObject<{
        created_at: z.ZodString;
        created_by_version: z.ZodString;
        total_resources: z.ZodNumber;
        resource_counts: z.ZodObject<{
            watchlists: z.ZodNumber;
            custom_agents: z.ZodNumber;
            notification_channels: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            notification_channels: number;
            watchlists: number;
            custom_agents: number;
        }, {
            notification_channels: number;
            watchlists: number;
            custom_agents: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        total_resources: number;
        resource_counts: {
            notification_channels: number;
            watchlists: number;
            custom_agents: number;
        };
        created_at: string;
        created_by_version: string;
    }, {
        total_resources: number;
        resource_counts: {
            notification_channels: number;
            watchlists: number;
            custom_agents: number;
        };
        created_at: string;
        created_by_version: string;
    }>;
}, "strip", z.ZodTypeAny, {
    version: "1.0.0";
    resources: Record<string, {
        name: string;
        metadata: {
            updated_at: string;
            created_at: string;
            created_by: "cli" | "import";
            cli_version?: string | undefined;
            config_file?: string | undefined;
        };
        kind: string;
        remote_id: string;
        last_applied_hash: string;
        last_seen_remote_hash: string;
    }>;
    metadata: {
        total_resources: number;
        resource_counts: {
            notification_channels: number;
            watchlists: number;
            custom_agents: number;
        };
        created_at: string;
        created_by_version: string;
    };
    last_sync?: string | undefined;
}, {
    version: "1.0.0";
    resources: Record<string, {
        name: string;
        metadata: {
            updated_at: string;
            created_at: string;
            created_by: string;
            cli_version?: string | undefined;
            config_file?: string | undefined;
        };
        kind: string;
        remote_id: string;
        last_applied_hash: string;
        last_seen_remote_hash: string;
    }>;
    metadata: {
        total_resources: number;
        resource_counts: {
            notification_channels: number;
            watchlists: number;
            custom_agents: number;
        };
        created_at: string;
        created_by_version: string;
    };
    last_sync?: string | undefined;
}>;
/**
 * Schema for lock files
 */
export declare const lockFileSchema: z.ZodObject<{
    pid: z.ZodNumber;
    created_at: z.ZodString;
    operation: z.ZodEnum<["plan", "apply"]>;
    version: z.ZodString;
    cwd: z.ZodString;
}, "strip", z.ZodTypeAny, {
    version: string;
    cwd: string;
    pid: number;
    created_at: string;
    operation: "plan" | "apply";
}, {
    version: string;
    cwd: string;
    pid: number;
    created_at: string;
    operation: "plan" | "apply";
}>;
/**
 * Type exports derived from schemas
 */
export type StateEntryMetadata = z.infer<typeof stateEntryMetadataSchema>;
export type StateEntry = z.infer<typeof stateEntrySchema>;
export type StateFileMetadata = z.infer<typeof stateFileMetadataSchema>;
export type StateFile = z.infer<typeof stateFileSchema>;
export type LockFile = z.infer<typeof lockFileSchema>;
//# sourceMappingURL=state.schema.d.ts.map