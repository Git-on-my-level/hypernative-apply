import { z } from 'zod';
import { watchlistSchema } from './watchlist.schema.js';
import { customAgentSchema } from './custom-agent.schema.js';
import { completeNotificationChannelSchema, } from './notification-channel.schema.js';
// Global configuration options
const globalConfigSchema = z
    .object({
    // Project metadata
    project: z
        .object({
        name: z.string().min(1, 'Project name is required'),
        description: z.string().optional(),
        version: z.string().optional(),
        environment: z.enum(['development', 'staging', 'production']).default('development'),
        tags: z.record(z.string()).optional(),
    })
        .optional(),
    // Default settings that apply to all resources
    defaults: z
        .object({
        // Default notification channels for all resources (can be overridden)
        notification_channels: z.array(z.string()).optional(),
        // Default severity threshold
        severity_threshold: z.enum(['critical', 'high', 'medium', 'low']).default('medium'),
        // Default timezone for all schedule configurations
        timezone: z.string().default('UTC'),
        // Default retry configuration
        retry_config: z
            .object({
            max_retries: z.number().min(0).max(10).default(3),
            retry_delay: z.string().default('5m'),
            exponential_backoff: z.boolean().default(true),
        })
            .optional(),
        // Default monitoring settings
        monitoring: z
            .object({
            collect_metrics: z.boolean().default(true),
            health_checks_enabled: z.boolean().default(true),
            performance_tracking: z.boolean().default(true),
        })
            .optional(),
        // Input validation limits
        validation_limits: z
            .object({
            // Maximum file size for uploads (in bytes)
            max_file_size: z
                .number()
                .min(1024)
                .max(100 * 1024 * 1024)
                .default(10 * 1024 * 1024), // 10MB default
            // Maximum number of assets per watchlist
            max_assets_per_watchlist: z.number().min(1).max(10000).default(1000),
            // Maximum number of resources per configuration
            max_resources_total: z.number().min(1).max(1000).default(100),
            // Maximum string lengths
            max_name_length: z.number().min(1).max(1000).default(100),
            max_description_length: z.number().min(1).max(10000).default(1000),
            // Maximum code size for custom agents (in characters)
            max_agent_code_length: z.number().min(1).max(100000).default(50000), // 50k characters
        })
            .optional(),
    })
        .optional(),
    // Environment variable configuration
    env: z
        .object({
        // Required environment variables
        required: z.array(z.string()).optional(),
        // Optional environment variables with defaults
        optional: z.record(z.string()).optional(),
        // Environment variable validation patterns
        validation: z
            .record(z.object({
            pattern: z.string().optional(),
            message: z.string().optional(),
        }))
            .optional(),
    })
        .optional(),
    // Integration settings
    integrations: z
        .object({
        // Hypernative API settings
        hypernative: z
            .object({
            base_url: z.string().url().optional(),
            timeout: z.string().default('30s'),
            retry_attempts: z.number().min(0).max(10).default(3),
            rate_limit: z
                .object({
                requests_per_minute: z.number().min(1).default(60),
                burst_limit: z.number().min(1).default(10),
            })
                .optional(),
        })
            .optional(),
        // External service integrations
        external_services: z
            .record(z.object({
            base_url: z.string().url(),
            auth_type: z.enum(['none', 'api_key', 'bearer', 'basic']).default('none'),
            timeout: z.string().default('10s'),
            headers: z.record(z.string()).optional(),
        }))
            .optional(),
    })
        .optional(),
})
    .optional();
// Resource collection schemas
const resourceCollectionsSchema = z
    .object({
    // Notification channels (keyed by logical name)
    notification_channels: z.record(completeNotificationChannelSchema).optional(),
    // Watchlists (keyed by logical name)
    watchlists: z.record(watchlistSchema).optional(),
    // Custom agents (keyed by logical name)
    custom_agents: z.record(customAgentSchema).optional(),
})
    .optional();
// Configuration file metadata
const configMetadataSchema = z
    .object({
    // File format version for compatibility
    version: z.string().default('v1'),
    // Configuration last updated timestamp
    updated_at: z.string().optional(),
    // Configuration author/source
    author: z.string().optional(),
    // Import other configuration files
    imports: z.array(z.string()).optional(),
    // Configuration validation settings
    validation: z
        .object({
        strict_mode: z.boolean().default(true),
        allow_unknown_properties: z.boolean().default(false),
        validate_references: z.boolean().default(true),
    })
        .optional(),
})
    .optional();
// Schema for validating standalone global configuration files
export const globalOnlyConfigSchema = z.object({
    // Metadata about this configuration file
    config: configMetadataSchema,
    // Global settings
    global: globalConfigSchema,
    // Resource collections (optional for global-only config)
    resources: resourceCollectionsSchema,
});
// Main configuration schema that combines everything
export const rootConfigSchema = z
    .object({
    // Metadata about this configuration file
    config: configMetadataSchema,
    // Global settings
    global: globalConfigSchema,
    // Resource collections
    resources: resourceCollectionsSchema,
})
    .refine((data) => {
    // At least one resource type should be defined
    const resources = data.resources;
    if (!resources)
        return false;
    return ((resources.notification_channels &&
        Object.keys(resources.notification_channels).length > 0) ||
        (resources.watchlists && Object.keys(resources.watchlists).length > 0) ||
        (resources.custom_agents && Object.keys(resources.custom_agents).length > 0));
}, {
    message: 'At least one resource must be defined',
    path: ['resources'],
});
// Parsed configuration with resolved references
export const parsedConfigSchema = z.object({
    global: globalConfigSchema,
    notification_channels: z.record(completeNotificationChannelSchema).default({}),
    watchlists: z.record(watchlistSchema).default({}),
    custom_agents: z.record(customAgentSchema).default({}),
});
// Configuration loading result with metadata
export const configLoadResultSchema = z.object({
    config: parsedConfigSchema,
    metadata: z.object({
        files_loaded: z.array(z.string()),
        total_resources: z.number(),
        resource_counts: z.object({
            notification_channels: z.number(),
            watchlists: z.number(),
            custom_agents: z.number(),
        }),
        validation_warnings: z.array(z.string()).optional(),
        load_time: z.number().optional(),
    }),
});
// Configuration validation error with detailed information
export const configValidationErrorSchema = z.object({
    file_path: z.string(),
    line_number: z.number().optional(),
    column_number: z.number().optional(),
    resource_type: z.string().optional(),
    resource_name: z.string().optional(),
    error_code: z.string(),
    message: z.string(),
    details: z.record(z.any()).optional(),
    suggestions: z.array(z.string()).optional(),
});
// Cross-reference validation result
export const crossReferenceValidationSchema = z.object({
    valid: z.boolean(),
    missing_references: z
        .array(z.object({
        resource_type: z.string(),
        resource_name: z.string(),
        reference_type: z.string(),
        reference_name: z.string(),
        file_path: z.string(),
    }))
        .optional(),
    circular_references: z
        .array(z.object({
        cycle: z.array(z.string()),
        file_paths: z.array(z.string()),
    }))
        .optional(),
});
// Utility function to create an empty parsed config
export function createEmptyParsedConfig() {
    return {
        global: undefined,
        notification_channels: {},
        watchlists: {},
        custom_agents: {},
    };
}
//# sourceMappingURL=config.schema.js.map