import { z } from 'zod';
import { chainSchema } from './watchlist.schema.js';

// Common agent types supported by the platform
export const agentTypeSchema = z.enum([
  "address_balance_change",
  "position_health_deviation", 
  "large_transaction_monitor",
  "contract_interaction_monitor",
  "token_transfer_monitor",
  "defi_position_monitor",
  "governance_proposal_monitor",
  "bridge_transaction_monitor",
  "yield_farming_monitor",
  "liquidation_risk_monitor",
  "flash_loan_monitor",
  "mev_activity_monitor",
  "whale_movement_monitor",
  "unusual_pattern_detector",
  "custom_webhook_trigger"
]);

// Threshold types for various monitoring conditions
const thresholdTypeSchema = z.enum([
  "percentage", 
  "absolute", 
  "relative", 
  "standard_deviation",
  "moving_average"
]);

// Time window options
const timeWindowSchema = z.enum([
  "1m", "5m", "15m", "30m", "1h", "2h", "6h", "12h", "24h", "7d", "30d"
]);

// Direction for change monitoring
const directionSchema = z.enum(["increase", "decrease", "both"]);

// Base configuration that applies to most agent types
const baseAgentConfigSchema = z.object({
  addresses: z.array(z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid address format")).optional(),
  threshold_type: thresholdTypeSchema.optional(),
  threshold_value: z.union([z.number(), z.string()]).optional(),
  direction: directionSchema.optional(),
  time_window: timeWindowSchema.optional(),
  min_absolute_change: z.number().optional(),
});

// Advanced monitoring options
const advancedConfigSchema = z.object({
  aggregate_transactions: z.boolean().default(false),
  include_pending: z.boolean().default(false),
  cross_chain_tracking: z.boolean().default(false),
  correlation_enabled: z.boolean().default(false),
  whitelist_addresses: z.array(z.string()).optional(),
  blacklist_addresses: z.array(z.string()).optional(),
  minimum_gas_price: z.number().optional(),
  maximum_gas_price: z.number().optional(),
}).optional();

// Specific configurations for different agent types
const balanceChangeConfigSchema = baseAgentConfigSchema.extend({
  token_address: z.string().regex(/^0x[a-fA-F0-9]{40}$/).optional(),
  monitor_native_token: z.boolean().default(true),
  monitor_erc20_tokens: z.boolean().default(true),
  token_whitelist: z.array(z.string()).optional(),
  advanced: advancedConfigSchema,
});

const positionHealthConfigSchema = z.object({
  protocol: z.enum(["aave", "compound", "makerdao", "venus", "benqi"]),
  addresses: z.array(z.string().regex(/^0x[a-fA-F0-9]{40}$/)).min(1),
  health_factor_threshold: z.number().min(0).max(10).default(1.5),
  liquidation_threshold: z.number().min(0).max(1).default(0.8),
  collateral_ratio_threshold: z.number().min(0).default(1.2),
  monitor_borrowed_assets: z.boolean().default(true),
  monitor_supplied_assets: z.boolean().default(true),
  advanced: advancedConfigSchema,
});

const transactionConfigSchema = baseAgentConfigSchema.extend({
  transaction_types: z.array(z.enum([
    "transfer", "swap", "deposit", "withdraw", "stake", "unstake", 
    "borrow", "repay", "liquidation", "mint", "burn"
  ])).optional(),
  contract_addresses: z.array(z.string()).optional(),
  value_threshold_usd: z.number().optional(),
  gas_threshold: z.number().optional(),
  advanced: advancedConfigSchema,
});

const governanceConfigSchema = z.object({
  protocol: z.string().min(1),
  governance_contract: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  proposal_states: z.array(z.enum([
    "pending", "active", "canceled", "defeated", "succeeded", "queued", "expired", "executed"
  ])).default(["active", "succeeded", "queued"]),
  voting_power_threshold: z.number().optional(),
  monitor_delegations: z.boolean().default(false),
  advanced: advancedConfigSchema,
});

// Schedule configuration
const scheduleSchema = z.object({
  interval: z.number().min(1).max(1440).default(5), // minutes
  timezone: z.string().default("UTC"),
  skip_windows: z.array(z.object({
    start: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    end: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    days: z.array(z.enum([
      "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"
    ])).optional(),
  })).optional(),
  max_executions_per_hour: z.number().min(1).max(3600).optional(),
}).optional();

// Alert template for customizing notifications
const alertTemplateSchema = z.object({
  title: z.string().optional(),
  message: z.string().optional(),
  include_context: z.object({
    transaction_details: z.boolean().default(true),
    risk_analysis: z.boolean().default(true),
    historical_comparison: z.boolean().default(false),
    cross_reference_alerts: z.boolean().default(false),
    price_impact: z.boolean().default(false),
  }).optional(),
}).optional();

// Automated response configuration
const automatedResponseSchema = z.object({
  triggers: z.array(z.object({
    condition: z.string().min(1), // e.g., "change_percentage > 25"
    actions: z.array(z.object({
      type: z.enum([
        "notify_additional_channels",
        "create_incident", 
        "pause_automated_trading",
        "require_manual_approval",
        "webhook_call",
        "update_risk_score"
      ]),
      channels: z.array(z.string()).optional(),
      severity: z.enum(["critical", "high", "medium", "low"]).optional(),
      duration: z.string().optional(),
      for_operations: z.array(z.string()).optional(),
      webhook_url: z.string().url().optional(),
      risk_score_adjustment: z.number().optional(),
    })),
  })).optional(),
}).optional();

// Testing configuration
const testingConfigSchema = z.object({
  test_mode: z.boolean().default(false),
  test_scenarios: z.array(z.object({
    name: z.string(),
    mock_data: z.record(z.any()),
    expected_result: z.enum(["alert_triggered", "no_alert", "error"]),
    description: z.string().optional(),
  })).optional(),
}).optional();

// Monitoring and performance configuration
const monitoringConfigSchema = z.object({
  collect_metrics: z.boolean().default(true),
  max_execution_time: z.string().default("30s"),
  max_memory_usage: z.string().default("512MB"),
  retry_on_failure: z.boolean().default(true),
  max_retries: z.number().min(0).max(10).default(3),
  retry_delay: z.string().default("5m"),
  health_check_interval: z.string().default("15m"),
  alert_on_health_failure: z.boolean().default(true),
}).optional();

// External integrations
const integrationsSchema = z.object({
  external_apis: z.array(z.object({
    name: z.string(),
    url: z.string().url(),
    auth_type: z.enum(["none", "api_key", "bearer", "basic"]).default("none"),
    timeout: z.string().default("10s"),
    headers: z.record(z.string()).optional(),
  })).optional(),
  databases: z.array(z.object({
    name: z.string(),
    type: z.enum(["postgresql", "mysql", "mongodb", "redis"]),
    connection_string_env: z.string(),
  })).optional(),
  message_queues: z.array(z.object({
    name: z.string(),
    type: z.enum(["rabbitmq", "kafka", "sqs", "pubsub"]),
    queue_name: z.string(),
    config: z.record(z.any()).optional(),
  })).optional(),
}).optional();

// We'll remove this discriminated union as it's causing issues with duplicate values
// Instead, we'll use a flexible configuration object in the main schema

// Main custom agent schema
export const customAgentSchema = z.object({
  name: z.string().min(1, "Agent name is required"),
  description: z.string().optional(),
  enabled: z.boolean().default(true),
  type: agentTypeSchema,
  chain: chainSchema,
  severity: z.enum(["critical", "high", "medium", "low"]).default("medium"),
  tags: z.record(z.string()).optional(),
  
  // Agent-specific configuration
  configuration: z.record(z.any()).optional(), // Flexible configuration object
  
  // Notification settings
  notification_channels: z.array(z.string()).optional(), // References to channel logical names
  
  // Execution schedule
  schedule: scheduleSchema,
  
  // Alert customization
  alert_template: alertTemplateSchema,
  
  // Response automation
  automated_responses: automatedResponseSchema,
  
  // Testing
  testing: testingConfigSchema,
  
  // Monitoring
  monitoring: monitoringConfigSchema,
  
  // Integrations
  integrations: integrationsSchema,
});

// API payload schema for creating custom agents
export const customAgentApiPayloadSchema = z.object({
  name: z.string().min(1),
  type: agentTypeSchema,
  enabled: z.boolean().default(true),
  severity: z.enum(["critical", "high", "medium", "low"]).default("medium"),
  chain: chainSchema,
  configuration: z.record(z.any()),
  notification_channels: z.array(z.string()).optional(),
});

export type CustomAgentConfig = z.infer<typeof customAgentSchema>;
export type CustomAgentApiPayload = z.infer<typeof customAgentApiPayloadSchema>;