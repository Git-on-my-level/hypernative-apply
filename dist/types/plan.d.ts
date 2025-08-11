/**
 * Plan types for the Hypernative Apply CLI
 *
 * This module defines the types used for planning changes to resources,
 * including dependency resolution, change detection, and plan serialization.
 */
export declare enum ChangeType {
    CREATE = "CREATE",
    UPDATE = "UPDATE",
    REPLACE = "REPLACE",
    DELETE = "DELETE",
    NO_CHANGE = "NO_CHANGE"
}
export interface FieldDiff {
    /** The field path (e.g., "config.threshold_value" or "assets[2].address") */
    path: string;
    /** The old value (undefined for new fields) */
    old_value?: any;
    /** The new value (undefined for removed fields) */
    new_value?: any;
    /** Type of change for this field */
    change_type: 'added' | 'removed' | 'changed';
    /** Whether this field contains sensitive data that should be redacted */
    is_sensitive?: boolean;
}
export interface ResourceChange {
    /** Resource kind (watchlist, custom_agent, notification_channel) */
    kind: string;
    /** Logical name from configuration */
    name: string;
    /** Remote resource ID (undefined for CREATE operations) */
    remote_id?: string;
    /** Type of change for this resource */
    change_type: ChangeType;
    /** Hash of the current configuration */
    current_hash?: string;
    /** Hash of the desired configuration */
    desired_hash?: string;
    /** Field-level differences */
    field_diffs?: FieldDiff[];
    /** Dependencies that must be resolved before this change */
    dependencies: string[];
    /** Resources that depend on this resource */
    dependents: string[];
    /** Estimated risk level for this change */
    risk_level: 'low' | 'medium' | 'high';
}
export interface ResourceDependency {
    /** Name of the resource that has the dependency */
    resource_name: string;
    /** Kind of the resource that has the dependency */
    resource_kind: string;
    /** Name of the resource being depended on */
    depends_on_name: string;
    /** Kind of the resource being depended on */
    depends_on_kind: string;
    /** Type of dependency relationship */
    dependency_type: 'references' | 'requires' | 'uses';
}
export interface ExecutionPlan {
    /** Plan metadata */
    metadata: PlanMetadata;
    /** Ordered list of resource changes to execute */
    changes: ResourceChange[];
    /** Summary statistics */
    summary: PlanSummary;
    /** Dependency graph information */
    dependencies: ResourceDependency[];
    /** Validation warnings or issues */
    warnings?: PlanWarning[];
}
export interface PlanMetadata {
    /** Unique plan ID */
    plan_id: string;
    /** When the plan was generated */
    created_at: string;
    /** CLI version that generated the plan */
    cli_version: string;
    /** Hash of the configuration used to generate the plan */
    config_hash: string;
    /** Hash of the plan content itself */
    content_hash: string;
    /** Base directory where configuration was loaded from */
    base_directory: string;
    /** Configuration files that were loaded */
    config_files: string[];
}
export interface PlanSummary {
    /** Total number of resources in the plan */
    total_resources: number;
    /** Number of resources to create */
    to_create: number;
    /** Number of resources to update */
    to_update: number;
    /** Number of resources to replace */
    to_replace: number;
    /** Number of resources to delete */
    to_delete: number;
    /** Number of resources with no changes */
    no_change: number;
    /** Breakdown by resource type */
    by_resource_type: Record<string, {
        to_create: number;
        to_update: number;
        to_replace: number;
        to_delete: number;
        no_change: number;
    }>;
}
export interface PlanWarning {
    /** Warning type */
    type: 'dependency_cycle' | 'missing_dependency' | 'high_risk_change' | 'configuration_drift';
    /** Warning message */
    message: string;
    /** Resources affected by this warning */
    affected_resources: string[];
    /** Severity level */
    severity: 'info' | 'warning' | 'error';
}
export interface PlanFile {
    /** Plan format version */
    version: '1.0.0';
    /** The execution plan */
    plan: ExecutionPlan;
    /** Signature or hash for plan integrity */
    signature: string;
}
export interface DriftDetectionResult {
    /** Whether drift was detected */
    has_drift: boolean;
    /** Resources that have drifted from their expected state */
    drifted_resources: Array<{
        name: string;
        kind: string;
        remote_id: string;
        /** Expected hash based on last applied configuration */
        expected_hash: string;
        /** Current remote hash */
        current_remote_hash: string;
        /** Field-level diffs showing the drift */
        drift_diffs: FieldDiff[];
    }>;
    /** When drift detection was performed */
    detected_at: string;
}
export interface DependencyNode {
    /** Resource name */
    name: string;
    /** Resource kind */
    kind: string;
    /** Resources this node depends on */
    dependencies: string[];
    /** Resources that depend on this node */
    dependents: string[];
    /** Depth in the dependency graph (for ordering) */
    depth: number;
}
export interface DependencyGraph {
    /** All nodes in the graph */
    nodes: Record<string, DependencyNode>;
    /** Topologically sorted order for execution */
    execution_order: string[];
    /** Whether the graph has cycles */
    has_cycles: boolean;
    /** Any dependency cycles found */
    cycles: string[][];
}
export interface PlannerOptions {
    /** Whether to include field-level diffs */
    include_field_diffs?: boolean;
    /** Whether to check for remote drift */
    check_drift?: boolean;
    /** Whether to redact sensitive values in output */
    redact_secrets?: boolean;
    /** Whether to include detailed dependency information */
    include_dependencies?: boolean;
    /** Maximum depth for diff analysis */
    max_diff_depth?: number;
}
export interface PlanDisplayOptions {
    /** Whether to show colors in output */
    use_colors?: boolean;
    /** Whether to show field-level diffs */
    show_field_diffs?: boolean;
    /** Whether to show dependency information */
    show_dependencies?: boolean;
    /** Maximum number of field diffs to show per resource */
    max_field_diffs?: number;
    /** Whether to compact array diffs */
    compact_arrays?: boolean;
}
export interface ExecutionOptions {
    /** Whether to include no-change resources in execution */
    includeNoChange?: boolean;
    /** Continue execution even if some resources fail */
    continueOnError?: boolean;
    /** Maximum number of resources to execute in parallel */
    parallelism?: number;
}
export interface ResourceExecutionResult {
    /** Name of the resource */
    resource_name: string;
    /** Kind of the resource */
    resource_kind: string;
    /** Type of change that was attempted */
    change_type: ChangeType;
    /** Whether the execution was successful */
    success: boolean;
    /** Remote ID of the resource (if applicable) */
    remote_id?: string;
    /** Error message if execution failed */
    error?: string;
    /** Time taken to execute this resource change */
    duration_ms: number;
    /** Raw result from the provider */
    result?: any;
}
export interface ExecutionSummary {
    /** Total number of resources processed */
    total_resources: number;
    /** Number of successful operations */
    successful: number;
    /** Number of failed operations */
    failed: number;
    /** Total execution time */
    duration_ms: number;
    /** Breakdown by change type */
    by_change_type: {
        created: number;
        updated: number;
        replaced: number;
        deleted: number;
    };
    /** Breakdown by resource type */
    by_resource_type: Record<string, {
        successful: number;
        failed: number;
    }>;
}
export interface ExecutionResult {
    /** Whether the entire execution was successful */
    success: boolean;
    /** Results for each resource */
    results: ResourceExecutionResult[];
    /** Summary statistics */
    summary: ExecutionSummary;
    /** ID of the plan that was executed */
    plan_id: string;
    /** Resources that were rolled back due to failures */
    rolled_back?: string[];
}
//# sourceMappingURL=plan.d.ts.map