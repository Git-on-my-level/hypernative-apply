import { z } from 'zod';
export declare const agentTypeSchema: z.ZodEnum<["address_balance_change", "position_health_deviation", "large_transaction_monitor", "contract_interaction_monitor", "token_transfer_monitor", "defi_position_monitor", "governance_proposal_monitor", "bridge_transaction_monitor", "yield_farming_monitor", "liquidation_risk_monitor", "flash_loan_monitor", "mev_activity_monitor", "whale_movement_monitor", "unusual_pattern_detector", "custom_webhook_trigger"]>;
export declare const customAgentSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    enabled: z.ZodDefault<z.ZodBoolean>;
    type: z.ZodEnum<["address_balance_change", "position_health_deviation", "large_transaction_monitor", "contract_interaction_monitor", "token_transfer_monitor", "defi_position_monitor", "governance_proposal_monitor", "bridge_transaction_monitor", "yield_farming_monitor", "liquidation_risk_monitor", "flash_loan_monitor", "mev_activity_monitor", "whale_movement_monitor", "unusual_pattern_detector", "custom_webhook_trigger"]>;
    code: z.ZodOptional<z.ZodString>;
    chain: z.ZodEnum<["ethereum", "polygon", "bsc", "avalanche", "arbitrum", "optimism", "base", "fantom", "gnosis", "celo"]>;
    severity: z.ZodDefault<z.ZodEnum<["critical", "high", "medium", "low"]>>;
    tags: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    configuration: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    notification_channels: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    schedule: z.ZodOptional<z.ZodObject<{
        interval: z.ZodDefault<z.ZodNumber>;
        timezone: z.ZodDefault<z.ZodString>;
        skip_windows: z.ZodOptional<z.ZodArray<z.ZodObject<{
            start: z.ZodString;
            end: z.ZodString;
            days: z.ZodOptional<z.ZodArray<z.ZodEnum<["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]>, "many">>;
        }, "strip", z.ZodTypeAny, {
            start: string;
            end: string;
            days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
        }, {
            start: string;
            end: string;
            days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
        }>, "many">>;
        max_executions_per_hour: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        timezone: string;
        interval: number;
        skip_windows?: {
            start: string;
            end: string;
            days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
        }[] | undefined;
        max_executions_per_hour?: number | undefined;
    }, {
        timezone?: string | undefined;
        interval?: number | undefined;
        skip_windows?: {
            start: string;
            end: string;
            days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
        }[] | undefined;
        max_executions_per_hour?: number | undefined;
    }>>;
    alert_template: z.ZodOptional<z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        message: z.ZodOptional<z.ZodString>;
        include_context: z.ZodOptional<z.ZodObject<{
            transaction_details: z.ZodDefault<z.ZodBoolean>;
            risk_analysis: z.ZodDefault<z.ZodBoolean>;
            historical_comparison: z.ZodDefault<z.ZodBoolean>;
            cross_reference_alerts: z.ZodDefault<z.ZodBoolean>;
            price_impact: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            transaction_details: boolean;
            risk_analysis: boolean;
            historical_comparison: boolean;
            cross_reference_alerts: boolean;
            price_impact: boolean;
        }, {
            transaction_details?: boolean | undefined;
            risk_analysis?: boolean | undefined;
            historical_comparison?: boolean | undefined;
            cross_reference_alerts?: boolean | undefined;
            price_impact?: boolean | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        message?: string | undefined;
        title?: string | undefined;
        include_context?: {
            transaction_details: boolean;
            risk_analysis: boolean;
            historical_comparison: boolean;
            cross_reference_alerts: boolean;
            price_impact: boolean;
        } | undefined;
    }, {
        message?: string | undefined;
        title?: string | undefined;
        include_context?: {
            transaction_details?: boolean | undefined;
            risk_analysis?: boolean | undefined;
            historical_comparison?: boolean | undefined;
            cross_reference_alerts?: boolean | undefined;
            price_impact?: boolean | undefined;
        } | undefined;
    }>>;
    automated_responses: z.ZodOptional<z.ZodObject<{
        triggers: z.ZodOptional<z.ZodArray<z.ZodObject<{
            condition: z.ZodString;
            actions: z.ZodArray<z.ZodObject<{
                type: z.ZodEnum<["notify_additional_channels", "create_incident", "pause_automated_trading", "require_manual_approval", "webhook_call", "update_risk_score"]>;
                channels: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                severity: z.ZodOptional<z.ZodEnum<["critical", "high", "medium", "low"]>>;
                duration: z.ZodOptional<z.ZodString>;
                for_operations: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                webhook_url: z.ZodOptional<z.ZodString>;
                risk_score_adjustment: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                severity?: "critical" | "high" | "medium" | "low" | undefined;
                channels?: string[] | undefined;
                duration?: string | undefined;
                for_operations?: string[] | undefined;
                webhook_url?: string | undefined;
                risk_score_adjustment?: number | undefined;
            }, {
                type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                severity?: "critical" | "high" | "medium" | "low" | undefined;
                channels?: string[] | undefined;
                duration?: string | undefined;
                for_operations?: string[] | undefined;
                webhook_url?: string | undefined;
                risk_score_adjustment?: number | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            condition: string;
            actions: {
                type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                severity?: "critical" | "high" | "medium" | "low" | undefined;
                channels?: string[] | undefined;
                duration?: string | undefined;
                for_operations?: string[] | undefined;
                webhook_url?: string | undefined;
                risk_score_adjustment?: number | undefined;
            }[];
        }, {
            condition: string;
            actions: {
                type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                severity?: "critical" | "high" | "medium" | "low" | undefined;
                channels?: string[] | undefined;
                duration?: string | undefined;
                for_operations?: string[] | undefined;
                webhook_url?: string | undefined;
                risk_score_adjustment?: number | undefined;
            }[];
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        triggers?: {
            condition: string;
            actions: {
                type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                severity?: "critical" | "high" | "medium" | "low" | undefined;
                channels?: string[] | undefined;
                duration?: string | undefined;
                for_operations?: string[] | undefined;
                webhook_url?: string | undefined;
                risk_score_adjustment?: number | undefined;
            }[];
        }[] | undefined;
    }, {
        triggers?: {
            condition: string;
            actions: {
                type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                severity?: "critical" | "high" | "medium" | "low" | undefined;
                channels?: string[] | undefined;
                duration?: string | undefined;
                for_operations?: string[] | undefined;
                webhook_url?: string | undefined;
                risk_score_adjustment?: number | undefined;
            }[];
        }[] | undefined;
    }>>;
    testing: z.ZodOptional<z.ZodObject<{
        test_mode: z.ZodDefault<z.ZodBoolean>;
        test_scenarios: z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            mock_data: z.ZodRecord<z.ZodString, z.ZodAny>;
            expected_result: z.ZodEnum<["alert_triggered", "no_alert", "error"]>;
            description: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            mock_data: Record<string, any>;
            expected_result: "error" | "alert_triggered" | "no_alert";
            description?: string | undefined;
        }, {
            name: string;
            mock_data: Record<string, any>;
            expected_result: "error" | "alert_triggered" | "no_alert";
            description?: string | undefined;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        test_mode: boolean;
        test_scenarios?: {
            name: string;
            mock_data: Record<string, any>;
            expected_result: "error" | "alert_triggered" | "no_alert";
            description?: string | undefined;
        }[] | undefined;
    }, {
        test_mode?: boolean | undefined;
        test_scenarios?: {
            name: string;
            mock_data: Record<string, any>;
            expected_result: "error" | "alert_triggered" | "no_alert";
            description?: string | undefined;
        }[] | undefined;
    }>>;
    monitoring: z.ZodOptional<z.ZodObject<{
        collect_metrics: z.ZodDefault<z.ZodBoolean>;
        max_execution_time: z.ZodDefault<z.ZodString>;
        max_memory_usage: z.ZodDefault<z.ZodString>;
        retry_on_failure: z.ZodDefault<z.ZodBoolean>;
        max_retries: z.ZodDefault<z.ZodNumber>;
        retry_delay: z.ZodDefault<z.ZodString>;
        health_check_interval: z.ZodDefault<z.ZodString>;
        alert_on_health_failure: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        collect_metrics: boolean;
        max_execution_time: string;
        max_memory_usage: string;
        retry_on_failure: boolean;
        max_retries: number;
        retry_delay: string;
        health_check_interval: string;
        alert_on_health_failure: boolean;
    }, {
        collect_metrics?: boolean | undefined;
        max_execution_time?: string | undefined;
        max_memory_usage?: string | undefined;
        retry_on_failure?: boolean | undefined;
        max_retries?: number | undefined;
        retry_delay?: string | undefined;
        health_check_interval?: string | undefined;
        alert_on_health_failure?: boolean | undefined;
    }>>;
    integrations: z.ZodOptional<z.ZodObject<{
        external_apis: z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            url: z.ZodString;
            auth_type: z.ZodDefault<z.ZodEnum<["none", "api_key", "bearer", "basic"]>>;
            timeout: z.ZodDefault<z.ZodString>;
            headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            url: string;
            auth_type: "none" | "api_key" | "bearer" | "basic";
            timeout: string;
            headers?: Record<string, string> | undefined;
        }, {
            name: string;
            url: string;
            auth_type?: "none" | "api_key" | "bearer" | "basic" | undefined;
            timeout?: string | undefined;
            headers?: Record<string, string> | undefined;
        }>, "many">>;
        databases: z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            type: z.ZodEnum<["postgresql", "mysql", "mongodb", "redis"]>;
            connection_string_env: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            type: "postgresql" | "mysql" | "mongodb" | "redis";
            connection_string_env: string;
        }, {
            name: string;
            type: "postgresql" | "mysql" | "mongodb" | "redis";
            connection_string_env: string;
        }>, "many">>;
        message_queues: z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            type: z.ZodEnum<["rabbitmq", "kafka", "sqs", "pubsub"]>;
            queue_name: z.ZodString;
            config: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
            queue_name: string;
            config?: Record<string, any> | undefined;
        }, {
            name: string;
            type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
            queue_name: string;
            config?: Record<string, any> | undefined;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        external_apis?: {
            name: string;
            url: string;
            auth_type: "none" | "api_key" | "bearer" | "basic";
            timeout: string;
            headers?: Record<string, string> | undefined;
        }[] | undefined;
        databases?: {
            name: string;
            type: "postgresql" | "mysql" | "mongodb" | "redis";
            connection_string_env: string;
        }[] | undefined;
        message_queues?: {
            name: string;
            type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
            queue_name: string;
            config?: Record<string, any> | undefined;
        }[] | undefined;
    }, {
        external_apis?: {
            name: string;
            url: string;
            auth_type?: "none" | "api_key" | "bearer" | "basic" | undefined;
            timeout?: string | undefined;
            headers?: Record<string, string> | undefined;
        }[] | undefined;
        databases?: {
            name: string;
            type: "postgresql" | "mysql" | "mongodb" | "redis";
            connection_string_env: string;
        }[] | undefined;
        message_queues?: {
            name: string;
            type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
            queue_name: string;
            config?: Record<string, any> | undefined;
        }[] | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "address_balance_change" | "position_health_deviation" | "large_transaction_monitor" | "contract_interaction_monitor" | "token_transfer_monitor" | "defi_position_monitor" | "governance_proposal_monitor" | "bridge_transaction_monitor" | "yield_farming_monitor" | "liquidation_risk_monitor" | "flash_loan_monitor" | "mev_activity_monitor" | "whale_movement_monitor" | "unusual_pattern_detector" | "custom_webhook_trigger";
    chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
    severity: "critical" | "high" | "medium" | "low";
    enabled: boolean;
    code?: string | undefined;
    tags?: Record<string, string> | undefined;
    notification_channels?: string[] | undefined;
    description?: string | undefined;
    monitoring?: {
        collect_metrics: boolean;
        max_execution_time: string;
        max_memory_usage: string;
        retry_on_failure: boolean;
        max_retries: number;
        retry_delay: string;
        health_check_interval: string;
        alert_on_health_failure: boolean;
    } | undefined;
    configuration?: Record<string, any> | undefined;
    schedule?: {
        timezone: string;
        interval: number;
        skip_windows?: {
            start: string;
            end: string;
            days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
        }[] | undefined;
        max_executions_per_hour?: number | undefined;
    } | undefined;
    alert_template?: {
        message?: string | undefined;
        title?: string | undefined;
        include_context?: {
            transaction_details: boolean;
            risk_analysis: boolean;
            historical_comparison: boolean;
            cross_reference_alerts: boolean;
            price_impact: boolean;
        } | undefined;
    } | undefined;
    automated_responses?: {
        triggers?: {
            condition: string;
            actions: {
                type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                severity?: "critical" | "high" | "medium" | "low" | undefined;
                channels?: string[] | undefined;
                duration?: string | undefined;
                for_operations?: string[] | undefined;
                webhook_url?: string | undefined;
                risk_score_adjustment?: number | undefined;
            }[];
        }[] | undefined;
    } | undefined;
    testing?: {
        test_mode: boolean;
        test_scenarios?: {
            name: string;
            mock_data: Record<string, any>;
            expected_result: "error" | "alert_triggered" | "no_alert";
            description?: string | undefined;
        }[] | undefined;
    } | undefined;
    integrations?: {
        external_apis?: {
            name: string;
            url: string;
            auth_type: "none" | "api_key" | "bearer" | "basic";
            timeout: string;
            headers?: Record<string, string> | undefined;
        }[] | undefined;
        databases?: {
            name: string;
            type: "postgresql" | "mysql" | "mongodb" | "redis";
            connection_string_env: string;
        }[] | undefined;
        message_queues?: {
            name: string;
            type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
            queue_name: string;
            config?: Record<string, any> | undefined;
        }[] | undefined;
    } | undefined;
}, {
    name: string;
    type: "address_balance_change" | "position_health_deviation" | "large_transaction_monitor" | "contract_interaction_monitor" | "token_transfer_monitor" | "defi_position_monitor" | "governance_proposal_monitor" | "bridge_transaction_monitor" | "yield_farming_monitor" | "liquidation_risk_monitor" | "flash_loan_monitor" | "mev_activity_monitor" | "whale_movement_monitor" | "unusual_pattern_detector" | "custom_webhook_trigger";
    chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
    code?: string | undefined;
    tags?: Record<string, string> | undefined;
    severity?: "critical" | "high" | "medium" | "low" | undefined;
    enabled?: boolean | undefined;
    notification_channels?: string[] | undefined;
    description?: string | undefined;
    monitoring?: {
        collect_metrics?: boolean | undefined;
        max_execution_time?: string | undefined;
        max_memory_usage?: string | undefined;
        retry_on_failure?: boolean | undefined;
        max_retries?: number | undefined;
        retry_delay?: string | undefined;
        health_check_interval?: string | undefined;
        alert_on_health_failure?: boolean | undefined;
    } | undefined;
    configuration?: Record<string, any> | undefined;
    schedule?: {
        timezone?: string | undefined;
        interval?: number | undefined;
        skip_windows?: {
            start: string;
            end: string;
            days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
        }[] | undefined;
        max_executions_per_hour?: number | undefined;
    } | undefined;
    alert_template?: {
        message?: string | undefined;
        title?: string | undefined;
        include_context?: {
            transaction_details?: boolean | undefined;
            risk_analysis?: boolean | undefined;
            historical_comparison?: boolean | undefined;
            cross_reference_alerts?: boolean | undefined;
            price_impact?: boolean | undefined;
        } | undefined;
    } | undefined;
    automated_responses?: {
        triggers?: {
            condition: string;
            actions: {
                type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                severity?: "critical" | "high" | "medium" | "low" | undefined;
                channels?: string[] | undefined;
                duration?: string | undefined;
                for_operations?: string[] | undefined;
                webhook_url?: string | undefined;
                risk_score_adjustment?: number | undefined;
            }[];
        }[] | undefined;
    } | undefined;
    testing?: {
        test_mode?: boolean | undefined;
        test_scenarios?: {
            name: string;
            mock_data: Record<string, any>;
            expected_result: "error" | "alert_triggered" | "no_alert";
            description?: string | undefined;
        }[] | undefined;
    } | undefined;
    integrations?: {
        external_apis?: {
            name: string;
            url: string;
            auth_type?: "none" | "api_key" | "bearer" | "basic" | undefined;
            timeout?: string | undefined;
            headers?: Record<string, string> | undefined;
        }[] | undefined;
        databases?: {
            name: string;
            type: "postgresql" | "mysql" | "mongodb" | "redis";
            connection_string_env: string;
        }[] | undefined;
        message_queues?: {
            name: string;
            type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
            queue_name: string;
            config?: Record<string, any> | undefined;
        }[] | undefined;
    } | undefined;
}>;
export declare const customAgentApiPayloadSchema: z.ZodObject<{
    name: z.ZodString;
    type: z.ZodEnum<["address_balance_change", "position_health_deviation", "large_transaction_monitor", "contract_interaction_monitor", "token_transfer_monitor", "defi_position_monitor", "governance_proposal_monitor", "bridge_transaction_monitor", "yield_farming_monitor", "liquidation_risk_monitor", "flash_loan_monitor", "mev_activity_monitor", "whale_movement_monitor", "unusual_pattern_detector", "custom_webhook_trigger"]>;
    enabled: z.ZodDefault<z.ZodBoolean>;
    severity: z.ZodDefault<z.ZodEnum<["critical", "high", "medium", "low"]>>;
    chain: z.ZodEnum<["ethereum", "polygon", "bsc", "avalanche", "arbitrum", "optimism", "base", "fantom", "gnosis", "celo"]>;
    configuration: z.ZodRecord<z.ZodString, z.ZodAny>;
    notification_channels: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "address_balance_change" | "position_health_deviation" | "large_transaction_monitor" | "contract_interaction_monitor" | "token_transfer_monitor" | "defi_position_monitor" | "governance_proposal_monitor" | "bridge_transaction_monitor" | "yield_farming_monitor" | "liquidation_risk_monitor" | "flash_loan_monitor" | "mev_activity_monitor" | "whale_movement_monitor" | "unusual_pattern_detector" | "custom_webhook_trigger";
    chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
    severity: "critical" | "high" | "medium" | "low";
    enabled: boolean;
    configuration: Record<string, any>;
    notification_channels?: string[] | undefined;
}, {
    name: string;
    type: "address_balance_change" | "position_health_deviation" | "large_transaction_monitor" | "contract_interaction_monitor" | "token_transfer_monitor" | "defi_position_monitor" | "governance_proposal_monitor" | "bridge_transaction_monitor" | "yield_farming_monitor" | "liquidation_risk_monitor" | "flash_loan_monitor" | "mev_activity_monitor" | "whale_movement_monitor" | "unusual_pattern_detector" | "custom_webhook_trigger";
    chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
    configuration: Record<string, any>;
    severity?: "critical" | "high" | "medium" | "low" | undefined;
    enabled?: boolean | undefined;
    notification_channels?: string[] | undefined;
}>;
export type CustomAgentConfig = z.infer<typeof customAgentSchema>;
export type CustomAgentApiPayload = z.infer<typeof customAgentApiPayloadSchema>;
//# sourceMappingURL=custom-agent.schema.d.ts.map