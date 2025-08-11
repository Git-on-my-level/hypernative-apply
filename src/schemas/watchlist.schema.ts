import { z } from 'zod';

// Supported chains
export const chainSchema = z.enum([
  'ethereum',
  'polygon',
  'bsc',
  'avalanche',
  'arbitrum',
  'optimism',
  'base',
  'fantom',
  'gnosis',
  'celo',
]);

// Asset types for monitoring
export const assetTypeSchema = z.enum(['Wallet', 'Protocol', 'Token', 'Contract', 'Pool', 'NFT']);

// Individual asset configuration
const assetSchema = z.object({
  chain: chainSchema,
  type: assetTypeSchema,
  address: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address format'),
  name: z.string().optional(),
  symbol: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

// Alert condition types
const alertConditionSchema = z.object({
  type: z.enum([
    'balance_change',
    'transaction_volume',
    'unusual_activity',
    'security_incident',
    'governance_event',
    'price_change',
    'liquidity_change',
  ]),
  threshold: z.union([z.number(), z.string()]), // Can be numeric or "high"/"medium"/"low"
  direction: z.enum(['increase', 'decrease', 'both']).optional(),
  timeframe: z.string().optional(), // e.g., "1h", "24h", "1d"
});

// Alert rules configuration
const alertRuleSchema = z.object({
  asset_types: z.array(assetTypeSchema).optional(),
  conditions: z.array(alertConditionSchema),
  severity: z.enum(['critical', 'high', 'medium', 'low']).optional(),
  enabled: z.boolean().default(true),
});

// Alert configuration (inline or reference to policy)
const alertConfigSchema = z.object({
  severity_threshold: z.enum(['critical', 'high', 'medium', 'low']).default('medium'),
  notification_channels: z.array(z.string()).optional(), // References to channel logical names
  rules: z.array(alertRuleSchema).optional(),
  enabled: z.boolean().default(true),
});

// Maintenance window configuration
const maintenanceWindowSchema = z.object({
  start: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)'),
  end: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)'),
  timezone: z.string().default('UTC'),
  days: z
    .array(z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']))
    .optional(),
});

// Custom thresholds
const thresholdsSchema = z
  .object({
    balance_change_major: z.number().optional(),
    balance_change_critical: z.number().optional(),
    transaction_count_unusual: z.number().optional(),
    value_at_risk: z.number().optional(),
  })
  .optional();

// Enhanced monitoring features
const enhancedMonitoringSchema = z
  .object({
    risk_scoring: z.boolean().default(false),
    pattern_detection: z.boolean().default(false),
    cross_chain_tracking: z.boolean().default(false),
    sentiment_analysis: z.boolean().default(false),
    compliance_monitoring: z.boolean().default(false),
  })
  .optional();

// Monitoring configuration
const monitoringConfigSchema = z
  .object({
    check_interval: z.number().min(1).max(1440).default(5), // minutes
    collect_history: z.boolean().default(true),
    retention_days: z.number().min(1).max(365).default(90),
  })
  .optional();

// Options configuration
const optionsSchema = z
  .object({
    maintenance_windows: z.array(maintenanceWindowSchema).optional(),
    thresholds: thresholdsSchema,
    enhanced_monitoring: enhancedMonitoringSchema,
    priority: z.enum(['critical', 'high', 'medium', 'low']).optional(),
    auto_disable_on_error: z.boolean().default(false),
  })
  .optional();

// Main watchlist schema
export const watchlistSchema = z
  .object({
    name: z.string().min(1, 'Watchlist name is required'),
    description: z.string().optional(),
    enabled: z.boolean().default(true),
    tags: z.record(z.string()).optional(),

    // Assets to monitor
    assets: z.array(assetSchema).min(1, 'At least one asset is required'),

    // Alert configuration (either reference to policy or inline config)
    alert_policy_id: z.string().optional(),
    alert_config: alertConfigSchema.optional(),

    // Monitoring settings
    monitoring: monitoringConfigSchema,

    // Advanced options
    options: optionsSchema,
  })
  .refine((data) => data.alert_policy_id || data.alert_config, {
    message: 'Either alert_policy_id or alert_config must be provided',
    path: ['alert_policy_id'],
  });

// For API integration - simplified watchlist creation payload
export const watchlistApiPayloadSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  assets: z.array(
    z.object({
      chain: chainSchema,
      type: assetTypeSchema,
      address: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
      name: z.string().optional(),
    })
  ),
  alert_policy_id: z.string().optional(),
});

export type WatchlistConfig = z.infer<typeof watchlistSchema>;
export type AssetConfig = z.infer<typeof assetSchema>;
export type AlertRuleConfig = z.infer<typeof alertRuleSchema>;
export type WatchlistApiPayload = z.infer<typeof watchlistApiPayloadSchema>;
