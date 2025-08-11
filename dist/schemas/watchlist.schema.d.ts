import { z } from 'zod';
export declare const chainSchema: z.ZodEnum<["ethereum", "polygon", "bsc", "avalanche", "arbitrum", "optimism", "base", "fantom", "gnosis", "celo"]>;
export declare const assetTypeSchema: z.ZodEnum<["Wallet", "Protocol", "Token", "Contract", "Pool", "NFT"]>;
declare const assetSchema: z.ZodObject<{
    chain: z.ZodEnum<["ethereum", "polygon", "bsc", "avalanche", "arbitrum", "optimism", "base", "fantom", "gnosis", "celo"]>;
    type: z.ZodEnum<["Wallet", "Protocol", "Token", "Contract", "Pool", "NFT"]>;
    address: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    symbol: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
    chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
    address: string;
    symbol?: string | undefined;
    name?: string | undefined;
    tags?: string[] | undefined;
}, {
    type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
    chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
    address: string;
    symbol?: string | undefined;
    name?: string | undefined;
    tags?: string[] | undefined;
}>;
declare const alertRuleSchema: z.ZodObject<{
    asset_types: z.ZodOptional<z.ZodArray<z.ZodEnum<["Wallet", "Protocol", "Token", "Contract", "Pool", "NFT"]>, "many">>;
    conditions: z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<["balance_change", "transaction_volume", "unusual_activity", "security_incident", "governance_event", "price_change", "liquidity_change"]>;
        threshold: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
        direction: z.ZodOptional<z.ZodEnum<["increase", "decrease", "both"]>>;
        timeframe: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
        threshold: string | number;
        direction?: "increase" | "decrease" | "both" | undefined;
        timeframe?: string | undefined;
    }, {
        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
        threshold: string | number;
        direction?: "increase" | "decrease" | "both" | undefined;
        timeframe?: string | undefined;
    }>, "many">;
    severity: z.ZodOptional<z.ZodEnum<["critical", "high", "medium", "low"]>>;
    enabled: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    conditions: {
        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
        threshold: string | number;
        direction?: "increase" | "decrease" | "both" | undefined;
        timeframe?: string | undefined;
    }[];
    enabled: boolean;
    asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
    severity?: "critical" | "high" | "medium" | "low" | undefined;
}, {
    conditions: {
        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
        threshold: string | number;
        direction?: "increase" | "decrease" | "both" | undefined;
        timeframe?: string | undefined;
    }[];
    asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
    severity?: "critical" | "high" | "medium" | "low" | undefined;
    enabled?: boolean | undefined;
}>;
export declare const watchlistSchema: z.ZodEffects<z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    enabled: z.ZodDefault<z.ZodBoolean>;
    tags: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    assets: z.ZodArray<z.ZodObject<{
        chain: z.ZodEnum<["ethereum", "polygon", "bsc", "avalanche", "arbitrum", "optimism", "base", "fantom", "gnosis", "celo"]>;
        type: z.ZodEnum<["Wallet", "Protocol", "Token", "Contract", "Pool", "NFT"]>;
        address: z.ZodString;
        name: z.ZodOptional<z.ZodString>;
        symbol: z.ZodOptional<z.ZodString>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
        chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
        address: string;
        symbol?: string | undefined;
        name?: string | undefined;
        tags?: string[] | undefined;
    }, {
        type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
        chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
        address: string;
        symbol?: string | undefined;
        name?: string | undefined;
        tags?: string[] | undefined;
    }>, "many">;
    alert_policy_id: z.ZodOptional<z.ZodString>;
    alert_config: z.ZodOptional<z.ZodObject<{
        severity_threshold: z.ZodDefault<z.ZodEnum<["critical", "high", "medium", "low"]>>;
        notification_channels: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        rules: z.ZodOptional<z.ZodArray<z.ZodObject<{
            asset_types: z.ZodOptional<z.ZodArray<z.ZodEnum<["Wallet", "Protocol", "Token", "Contract", "Pool", "NFT"]>, "many">>;
            conditions: z.ZodArray<z.ZodObject<{
                type: z.ZodEnum<["balance_change", "transaction_volume", "unusual_activity", "security_incident", "governance_event", "price_change", "liquidity_change"]>;
                threshold: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                direction: z.ZodOptional<z.ZodEnum<["increase", "decrease", "both"]>>;
                timeframe: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                threshold: string | number;
                direction?: "increase" | "decrease" | "both" | undefined;
                timeframe?: string | undefined;
            }, {
                type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                threshold: string | number;
                direction?: "increase" | "decrease" | "both" | undefined;
                timeframe?: string | undefined;
            }>, "many">;
            severity: z.ZodOptional<z.ZodEnum<["critical", "high", "medium", "low"]>>;
            enabled: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            conditions: {
                type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                threshold: string | number;
                direction?: "increase" | "decrease" | "both" | undefined;
                timeframe?: string | undefined;
            }[];
            enabled: boolean;
            asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
            severity?: "critical" | "high" | "medium" | "low" | undefined;
        }, {
            conditions: {
                type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                threshold: string | number;
                direction?: "increase" | "decrease" | "both" | undefined;
                timeframe?: string | undefined;
            }[];
            asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
            severity?: "critical" | "high" | "medium" | "low" | undefined;
            enabled?: boolean | undefined;
        }>, "many">>;
        enabled: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        severity_threshold: "critical" | "high" | "medium" | "low";
        notification_channels?: string[] | undefined;
        rules?: {
            conditions: {
                type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                threshold: string | number;
                direction?: "increase" | "decrease" | "both" | undefined;
                timeframe?: string | undefined;
            }[];
            enabled: boolean;
            asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
            severity?: "critical" | "high" | "medium" | "low" | undefined;
        }[] | undefined;
    }, {
        enabled?: boolean | undefined;
        severity_threshold?: "critical" | "high" | "medium" | "low" | undefined;
        notification_channels?: string[] | undefined;
        rules?: {
            conditions: {
                type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                threshold: string | number;
                direction?: "increase" | "decrease" | "both" | undefined;
                timeframe?: string | undefined;
            }[];
            asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
            severity?: "critical" | "high" | "medium" | "low" | undefined;
            enabled?: boolean | undefined;
        }[] | undefined;
    }>>;
    monitoring: z.ZodOptional<z.ZodObject<{
        check_interval: z.ZodDefault<z.ZodNumber>;
        collect_history: z.ZodDefault<z.ZodBoolean>;
        retention_days: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        check_interval: number;
        collect_history: boolean;
        retention_days: number;
    }, {
        check_interval?: number | undefined;
        collect_history?: boolean | undefined;
        retention_days?: number | undefined;
    }>>;
    options: z.ZodOptional<z.ZodObject<{
        maintenance_windows: z.ZodOptional<z.ZodArray<z.ZodObject<{
            start: z.ZodString;
            end: z.ZodString;
            timezone: z.ZodDefault<z.ZodString>;
            days: z.ZodOptional<z.ZodArray<z.ZodEnum<["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]>, "many">>;
        }, "strip", z.ZodTypeAny, {
            start: string;
            end: string;
            timezone: string;
            days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
        }, {
            start: string;
            end: string;
            timezone?: string | undefined;
            days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
        }>, "many">>;
        thresholds: z.ZodOptional<z.ZodObject<{
            balance_change_major: z.ZodOptional<z.ZodNumber>;
            balance_change_critical: z.ZodOptional<z.ZodNumber>;
            transaction_count_unusual: z.ZodOptional<z.ZodNumber>;
            value_at_risk: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            balance_change_major?: number | undefined;
            balance_change_critical?: number | undefined;
            transaction_count_unusual?: number | undefined;
            value_at_risk?: number | undefined;
        }, {
            balance_change_major?: number | undefined;
            balance_change_critical?: number | undefined;
            transaction_count_unusual?: number | undefined;
            value_at_risk?: number | undefined;
        }>>;
        enhanced_monitoring: z.ZodOptional<z.ZodObject<{
            risk_scoring: z.ZodDefault<z.ZodBoolean>;
            pattern_detection: z.ZodDefault<z.ZodBoolean>;
            cross_chain_tracking: z.ZodDefault<z.ZodBoolean>;
            sentiment_analysis: z.ZodDefault<z.ZodBoolean>;
            compliance_monitoring: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            risk_scoring: boolean;
            pattern_detection: boolean;
            cross_chain_tracking: boolean;
            sentiment_analysis: boolean;
            compliance_monitoring: boolean;
        }, {
            risk_scoring?: boolean | undefined;
            pattern_detection?: boolean | undefined;
            cross_chain_tracking?: boolean | undefined;
            sentiment_analysis?: boolean | undefined;
            compliance_monitoring?: boolean | undefined;
        }>>;
        priority: z.ZodOptional<z.ZodEnum<["critical", "high", "medium", "low"]>>;
        auto_disable_on_error: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        auto_disable_on_error: boolean;
        maintenance_windows?: {
            start: string;
            end: string;
            timezone: string;
            days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
        }[] | undefined;
        thresholds?: {
            balance_change_major?: number | undefined;
            balance_change_critical?: number | undefined;
            transaction_count_unusual?: number | undefined;
            value_at_risk?: number | undefined;
        } | undefined;
        enhanced_monitoring?: {
            risk_scoring: boolean;
            pattern_detection: boolean;
            cross_chain_tracking: boolean;
            sentiment_analysis: boolean;
            compliance_monitoring: boolean;
        } | undefined;
        priority?: "critical" | "high" | "medium" | "low" | undefined;
    }, {
        maintenance_windows?: {
            start: string;
            end: string;
            timezone?: string | undefined;
            days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
        }[] | undefined;
        thresholds?: {
            balance_change_major?: number | undefined;
            balance_change_critical?: number | undefined;
            transaction_count_unusual?: number | undefined;
            value_at_risk?: number | undefined;
        } | undefined;
        enhanced_monitoring?: {
            risk_scoring?: boolean | undefined;
            pattern_detection?: boolean | undefined;
            cross_chain_tracking?: boolean | undefined;
            sentiment_analysis?: boolean | undefined;
            compliance_monitoring?: boolean | undefined;
        } | undefined;
        priority?: "critical" | "high" | "medium" | "low" | undefined;
        auto_disable_on_error?: boolean | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    enabled: boolean;
    assets: {
        type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
        chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
        address: string;
        symbol?: string | undefined;
        name?: string | undefined;
        tags?: string[] | undefined;
    }[];
    options?: {
        auto_disable_on_error: boolean;
        maintenance_windows?: {
            start: string;
            end: string;
            timezone: string;
            days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
        }[] | undefined;
        thresholds?: {
            balance_change_major?: number | undefined;
            balance_change_critical?: number | undefined;
            transaction_count_unusual?: number | undefined;
            value_at_risk?: number | undefined;
        } | undefined;
        enhanced_monitoring?: {
            risk_scoring: boolean;
            pattern_detection: boolean;
            cross_chain_tracking: boolean;
            sentiment_analysis: boolean;
            compliance_monitoring: boolean;
        } | undefined;
        priority?: "critical" | "high" | "medium" | "low" | undefined;
    } | undefined;
    tags?: Record<string, string> | undefined;
    description?: string | undefined;
    alert_policy_id?: string | undefined;
    alert_config?: {
        enabled: boolean;
        severity_threshold: "critical" | "high" | "medium" | "low";
        notification_channels?: string[] | undefined;
        rules?: {
            conditions: {
                type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                threshold: string | number;
                direction?: "increase" | "decrease" | "both" | undefined;
                timeframe?: string | undefined;
            }[];
            enabled: boolean;
            asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
            severity?: "critical" | "high" | "medium" | "low" | undefined;
        }[] | undefined;
    } | undefined;
    monitoring?: {
        check_interval: number;
        collect_history: boolean;
        retention_days: number;
    } | undefined;
}, {
    name: string;
    assets: {
        type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
        chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
        address: string;
        symbol?: string | undefined;
        name?: string | undefined;
        tags?: string[] | undefined;
    }[];
    options?: {
        maintenance_windows?: {
            start: string;
            end: string;
            timezone?: string | undefined;
            days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
        }[] | undefined;
        thresholds?: {
            balance_change_major?: number | undefined;
            balance_change_critical?: number | undefined;
            transaction_count_unusual?: number | undefined;
            value_at_risk?: number | undefined;
        } | undefined;
        enhanced_monitoring?: {
            risk_scoring?: boolean | undefined;
            pattern_detection?: boolean | undefined;
            cross_chain_tracking?: boolean | undefined;
            sentiment_analysis?: boolean | undefined;
            compliance_monitoring?: boolean | undefined;
        } | undefined;
        priority?: "critical" | "high" | "medium" | "low" | undefined;
        auto_disable_on_error?: boolean | undefined;
    } | undefined;
    tags?: Record<string, string> | undefined;
    enabled?: boolean | undefined;
    description?: string | undefined;
    alert_policy_id?: string | undefined;
    alert_config?: {
        enabled?: boolean | undefined;
        severity_threshold?: "critical" | "high" | "medium" | "low" | undefined;
        notification_channels?: string[] | undefined;
        rules?: {
            conditions: {
                type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                threshold: string | number;
                direction?: "increase" | "decrease" | "both" | undefined;
                timeframe?: string | undefined;
            }[];
            asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
            severity?: "critical" | "high" | "medium" | "low" | undefined;
            enabled?: boolean | undefined;
        }[] | undefined;
    } | undefined;
    monitoring?: {
        check_interval?: number | undefined;
        collect_history?: boolean | undefined;
        retention_days?: number | undefined;
    } | undefined;
}>, {
    name: string;
    enabled: boolean;
    assets: {
        type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
        chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
        address: string;
        symbol?: string | undefined;
        name?: string | undefined;
        tags?: string[] | undefined;
    }[];
    options?: {
        auto_disable_on_error: boolean;
        maintenance_windows?: {
            start: string;
            end: string;
            timezone: string;
            days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
        }[] | undefined;
        thresholds?: {
            balance_change_major?: number | undefined;
            balance_change_critical?: number | undefined;
            transaction_count_unusual?: number | undefined;
            value_at_risk?: number | undefined;
        } | undefined;
        enhanced_monitoring?: {
            risk_scoring: boolean;
            pattern_detection: boolean;
            cross_chain_tracking: boolean;
            sentiment_analysis: boolean;
            compliance_monitoring: boolean;
        } | undefined;
        priority?: "critical" | "high" | "medium" | "low" | undefined;
    } | undefined;
    tags?: Record<string, string> | undefined;
    description?: string | undefined;
    alert_policy_id?: string | undefined;
    alert_config?: {
        enabled: boolean;
        severity_threshold: "critical" | "high" | "medium" | "low";
        notification_channels?: string[] | undefined;
        rules?: {
            conditions: {
                type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                threshold: string | number;
                direction?: "increase" | "decrease" | "both" | undefined;
                timeframe?: string | undefined;
            }[];
            enabled: boolean;
            asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
            severity?: "critical" | "high" | "medium" | "low" | undefined;
        }[] | undefined;
    } | undefined;
    monitoring?: {
        check_interval: number;
        collect_history: boolean;
        retention_days: number;
    } | undefined;
}, {
    name: string;
    assets: {
        type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
        chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
        address: string;
        symbol?: string | undefined;
        name?: string | undefined;
        tags?: string[] | undefined;
    }[];
    options?: {
        maintenance_windows?: {
            start: string;
            end: string;
            timezone?: string | undefined;
            days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
        }[] | undefined;
        thresholds?: {
            balance_change_major?: number | undefined;
            balance_change_critical?: number | undefined;
            transaction_count_unusual?: number | undefined;
            value_at_risk?: number | undefined;
        } | undefined;
        enhanced_monitoring?: {
            risk_scoring?: boolean | undefined;
            pattern_detection?: boolean | undefined;
            cross_chain_tracking?: boolean | undefined;
            sentiment_analysis?: boolean | undefined;
            compliance_monitoring?: boolean | undefined;
        } | undefined;
        priority?: "critical" | "high" | "medium" | "low" | undefined;
        auto_disable_on_error?: boolean | undefined;
    } | undefined;
    tags?: Record<string, string> | undefined;
    enabled?: boolean | undefined;
    description?: string | undefined;
    alert_policy_id?: string | undefined;
    alert_config?: {
        enabled?: boolean | undefined;
        severity_threshold?: "critical" | "high" | "medium" | "low" | undefined;
        notification_channels?: string[] | undefined;
        rules?: {
            conditions: {
                type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                threshold: string | number;
                direction?: "increase" | "decrease" | "both" | undefined;
                timeframe?: string | undefined;
            }[];
            asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
            severity?: "critical" | "high" | "medium" | "low" | undefined;
            enabled?: boolean | undefined;
        }[] | undefined;
    } | undefined;
    monitoring?: {
        check_interval?: number | undefined;
        collect_history?: boolean | undefined;
        retention_days?: number | undefined;
    } | undefined;
}>;
export declare const watchlistApiPayloadSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    assets: z.ZodArray<z.ZodObject<{
        chain: z.ZodEnum<["ethereum", "polygon", "bsc", "avalanche", "arbitrum", "optimism", "base", "fantom", "gnosis", "celo"]>;
        type: z.ZodEnum<["Wallet", "Protocol", "Token", "Contract", "Pool", "NFT"]>;
        address: z.ZodString;
        name: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
        chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
        address: string;
        name?: string | undefined;
    }, {
        type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
        chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
        address: string;
        name?: string | undefined;
    }>, "many">;
    alert_policy_id: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    assets: {
        type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
        chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
        address: string;
        name?: string | undefined;
    }[];
    description?: string | undefined;
    alert_policy_id?: string | undefined;
}, {
    name: string;
    assets: {
        type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
        chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
        address: string;
        name?: string | undefined;
    }[];
    description?: string | undefined;
    alert_policy_id?: string | undefined;
}>;
export type WatchlistConfig = z.infer<typeof watchlistSchema>;
export type AssetConfig = z.infer<typeof assetSchema>;
export type AlertRuleConfig = z.infer<typeof alertRuleSchema>;
export type WatchlistApiPayload = z.infer<typeof watchlistApiPayloadSchema>;
export {};
//# sourceMappingURL=watchlist.schema.d.ts.map