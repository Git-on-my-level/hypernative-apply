/**
 * Hypernative API types and response schemas
 */
export interface ApiResponse<T = any> {
    data?: T;
    error?: ApiError;
    request_id?: string;
}
export interface ApiError {
    code: string;
    message: string;
    details?: {
        field?: string;
        reason?: string;
    };
}
export interface RateLimitHeaders {
    limit: number;
    remaining: number;
    reset: number;
}
export type ApiErrorCode = 'AUTHENTICATION_ERROR' | 'AUTHORIZATION_ERROR' | 'VALIDATION_ERROR' | 'NOT_FOUND' | 'RATE_LIMIT_EXCEEDED' | 'INTERNAL_ERROR';
export interface PaginationMeta {
    total: number;
    limit: number;
    offset: number;
    has_more: boolean;
}
export interface PaginatedResponse<T> {
    items: T[];
    pagination: PaginationMeta;
}
export interface Alert {
    id: string;
    severity: 'critical' | 'high' | 'medium' | 'low';
    status: 'open' | 'acknowledged' | 'resolved';
    title: string;
    description: string;
    timestamp: string;
    chain: string;
    tx_hash?: string;
    involved_addresses: string[];
    value_at_risk?: number;
    risk_score?: number;
}
export interface ApiWatchlistAsset {
    chain: string;
    type: string;
    address: string;
    name?: string;
    symbol?: string;
    tags?: string[];
}
export interface ApiWatchlist {
    id: string;
    name: string;
    description?: string;
    asset_count: number;
    alert_policy?: string;
    enabled: boolean;
    created_at: string;
    updated_at?: string;
    assets?: ApiWatchlistAsset[];
    tags?: Record<string, string>;
}
export interface ApiWatchlistCreatePayload {
    name: string;
    description?: string;
    assets: ApiWatchlistAsset[];
    alert_policy_id?: string;
}
export interface ApiWatchlistUpdatePayload {
    name?: string;
    description?: string;
    alert_policy_id?: string;
    assets_to_add?: ApiWatchlistAsset[];
    assets_to_remove?: Omit<ApiWatchlistAsset, 'name' | 'symbol' | 'tags'>[];
}
export interface CsvUploadResult {
    imported: number;
    failed: number;
    total: number;
    errors?: string[];
}
export interface AssetReconciliationResult {
    current_count: number;
    desired_count: number;
    assets_to_add: ApiWatchlistAsset[];
    assets_to_remove: ApiWatchlistAsset[];
    no_change_count: number;
}
export interface Watchlist {
    id: string;
    name: string;
    description?: string;
    addresses: string[];
    enabled: boolean;
    created_at: string;
    updated_at: string;
}
export interface CustomAgent {
    id: string;
    name: string;
    description?: string;
    type: string;
    enabled: boolean;
    configuration: Record<string, any>;
    created_at: string;
    updated_at: string;
    last_execution?: string;
    next_execution?: string;
    execution_count: number;
    error_count: number;
    last_error?: string;
    code?: string;
    tags?: Record<string, string>;
}
export interface CustomAgentCreatePayload {
    name: string;
    type: string;
    description?: string;
    enabled?: boolean;
    severity?: 'critical' | 'high' | 'medium' | 'low';
    chain?: string;
    configuration: Record<string, any>;
    notification_channels?: string[];
}
export interface CustomAgentUpdatePayload {
    name?: string;
    description?: string;
    enabled?: boolean;
    severity?: 'critical' | 'high' | 'medium' | 'low';
    configuration?: Record<string, any>;
    notification_channels?: string[];
}
export interface CustomAgentStatusResponse {
    id: string;
    status: 'active' | 'inactive' | 'error' | 'pending';
    last_execution?: string;
    next_execution?: string;
    execution_count: number;
    error_count: number;
    last_error?: string;
}
export interface RiskInsight {
    id: string;
    category: 'Governance' | 'Financial' | 'Technical' | 'Security';
    severity: 'Info' | 'Low' | 'Medium' | 'High';
    title: string;
    description: string;
    timestamp: string;
    affected_addresses: string[];
    recommendations: string[];
}
export interface GuardianAssessment {
    transaction_id: string;
    risk_score: number;
    findings: Array<{
        type: string;
        severity: 'info' | 'low' | 'medium' | 'high' | 'critical';
        description: string;
        contract?: string;
        spender?: string;
    }>;
    simulation_results?: {
        success: boolean;
        gas_estimate: number;
        state_changes: Array<{
            address: string;
            slot: string;
            before: string;
            after: string;
        }>;
    };
    recommendation: 'approve' | 'warn' | 'block';
    timestamp: string;
}
export interface ListQueryParams {
    limit?: number;
    offset?: number;
}
export interface AlertQueryParams extends ListQueryParams {
    severity?: Alert['severity'];
    status?: Alert['status'];
    from?: string;
    to?: string;
    chain?: string;
}
export interface CustomAgentQueryParams extends ListQueryParams {
    enabled?: boolean;
    type?: string;
}
export interface RiskInsightQueryParams extends ListQueryParams {
    category?: RiskInsight['category'];
    severity?: RiskInsight['severity'];
    from?: string;
    to?: string;
}
export interface NotificationChannel {
    id: string;
    name: string;
    type: 'webhook' | 'slack' | 'email' | 'telegram' | 'discord' | 'pagerduty' | 'msteams';
    enabled: boolean;
    configuration: Record<string, any>;
    created_at: string;
    updated_at: string;
    description?: string;
    tags?: Record<string, string>;
    settings?: Record<string, any>;
    last_test_result?: {
        success: boolean;
        message: string;
        tested_at: string;
    };
}
export interface NotificationChannelCreatePayload {
    name: string;
    type: 'webhook' | 'slack' | 'email' | 'telegram' | 'discord' | 'pagerduty' | 'msteams';
    description?: string;
    enabled?: boolean;
    configuration: Record<string, any>;
    tags?: Record<string, string>;
}
export interface NotificationChannelUpdatePayload {
    name?: string;
    description?: string;
    enabled?: boolean;
    configuration?: Record<string, any>;
    tags?: Record<string, string>;
}
export interface NotificationChannelTestResponse {
    success: boolean;
    message: string;
    delivered_at: string;
    error_details?: string;
}
export interface NotificationChannelQueryParams extends ListQueryParams {
    enabled?: boolean;
    type?: NotificationChannel['type'];
}
export interface PoolToxicityResponse {
    pool_address: string;
    toxicity_percentage: number;
    recommendation: 'approve' | 'warn' | 'block';
    breakdown: Record<string, {
        percentage: number;
        addresses: string[];
        total_value: number;
    }>;
    total_liquidity: number;
    providers_analyzed: number;
    timestamp: string;
}
//# sourceMappingURL=api.d.ts.map