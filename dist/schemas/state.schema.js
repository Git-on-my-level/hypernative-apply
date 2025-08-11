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
export const stateEntryMetadataSchema = z.object({
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
    created_by: z
        .union([z.enum(['cli', 'import']), z.string()])
        .transform((val) => val),
    cli_version: z.string().optional(),
    config_file: z.string().optional(),
});
/**
 * Schema for individual state entries
 */
export const stateEntrySchema = z.object({
    kind: z.string(),
    name: z.string(),
    remote_id: z.string(),
    last_applied_hash: z.string(),
    last_seen_remote_hash: z.string(),
    metadata: stateEntryMetadataSchema,
});
/**
 * Schema for state file metadata
 */
export const stateFileMetadataSchema = z.object({
    created_at: z.string().datetime(),
    created_by_version: z.string(),
    total_resources: z.number().int().min(0),
    resource_counts: z.object({
        watchlists: z.number().int().min(0),
        custom_agents: z.number().int().min(0),
        notification_channels: z.number().int().min(0),
    }),
});
/**
 * Schema for the entire state file
 */
export const stateFileSchema = z.object({
    version: z.literal('1.0.0'),
    last_sync: z.string().datetime().optional(),
    resources: z.record(z.string(), stateEntrySchema),
    metadata: stateFileMetadataSchema,
});
/**
 * Schema for lock files
 */
export const lockFileSchema = z.object({
    pid: z.number().int().positive(),
    created_at: z.string().datetime(),
    operation: z.enum(['plan', 'apply']),
    version: z.string(),
    cwd: z.string(),
});
//# sourceMappingURL=state.schema.js.map