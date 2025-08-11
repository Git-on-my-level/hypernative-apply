/**
 * Zod schemas for plan file validation
 *
 * These schemas provide runtime validation for plan files to ensure
 * data integrity and prevent security issues from malformed plan data.
 */
import { z } from 'zod';
import { ChangeType } from '../types/plan.js';
/**
 * Schema for change types
 */
export declare const changeTypeSchema: z.ZodNativeEnum<typeof ChangeType>;
/**
 * Schema for field diffs
 */
export declare const fieldDiffSchema: z.ZodObject<{
    path: z.ZodString;
    old_value: z.ZodOptional<z.ZodAny>;
    new_value: z.ZodOptional<z.ZodAny>;
    change_type: z.ZodEnum<["added", "removed", "changed"]>;
    is_sensitive: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    path: string;
    change_type: "added" | "removed" | "changed";
    old_value?: any;
    new_value?: any;
    is_sensitive?: boolean | undefined;
}, {
    path: string;
    change_type: "added" | "removed" | "changed";
    old_value?: any;
    new_value?: any;
    is_sensitive?: boolean | undefined;
}>;
/**
 * Schema for resource changes
 */
export declare const resourceChangeSchema: z.ZodObject<{
    kind: z.ZodString;
    name: z.ZodString;
    remote_id: z.ZodOptional<z.ZodString>;
    change_type: z.ZodNativeEnum<typeof ChangeType>;
    current_hash: z.ZodOptional<z.ZodString>;
    desired_hash: z.ZodOptional<z.ZodString>;
    field_diffs: z.ZodOptional<z.ZodArray<z.ZodObject<{
        path: z.ZodString;
        old_value: z.ZodOptional<z.ZodAny>;
        new_value: z.ZodOptional<z.ZodAny>;
        change_type: z.ZodEnum<["added", "removed", "changed"]>;
        is_sensitive: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        path: string;
        change_type: "added" | "removed" | "changed";
        old_value?: any;
        new_value?: any;
        is_sensitive?: boolean | undefined;
    }, {
        path: string;
        change_type: "added" | "removed" | "changed";
        old_value?: any;
        new_value?: any;
        is_sensitive?: boolean | undefined;
    }>, "many">>;
    dependencies: z.ZodArray<z.ZodString, "many">;
    dependents: z.ZodArray<z.ZodString, "many">;
    risk_level: z.ZodEnum<["low", "medium", "high"]>;
}, "strip", z.ZodTypeAny, {
    name: string;
    kind: string;
    change_type: ChangeType;
    risk_level: "high" | "medium" | "low";
    dependencies: string[];
    dependents: string[];
    desired_hash?: string | undefined;
    remote_id?: string | undefined;
    current_hash?: string | undefined;
    field_diffs?: {
        path: string;
        change_type: "added" | "removed" | "changed";
        old_value?: any;
        new_value?: any;
        is_sensitive?: boolean | undefined;
    }[] | undefined;
}, {
    name: string;
    kind: string;
    change_type: ChangeType;
    risk_level: "high" | "medium" | "low";
    dependencies: string[];
    dependents: string[];
    desired_hash?: string | undefined;
    remote_id?: string | undefined;
    current_hash?: string | undefined;
    field_diffs?: {
        path: string;
        change_type: "added" | "removed" | "changed";
        old_value?: any;
        new_value?: any;
        is_sensitive?: boolean | undefined;
    }[] | undefined;
}>;
/**
 * Schema for resource dependencies
 */
export declare const resourceDependencySchema: z.ZodObject<{
    resource_name: z.ZodString;
    resource_kind: z.ZodString;
    depends_on_name: z.ZodString;
    depends_on_kind: z.ZodString;
    dependency_type: z.ZodEnum<["references", "requires", "uses"]>;
}, "strip", z.ZodTypeAny, {
    resource_name: string;
    resource_kind: string;
    depends_on_name: string;
    depends_on_kind: string;
    dependency_type: "references" | "requires" | "uses";
}, {
    resource_name: string;
    resource_kind: string;
    depends_on_name: string;
    depends_on_kind: string;
    dependency_type: "references" | "requires" | "uses";
}>;
/**
 * Schema for plan metadata
 */
export declare const planMetadataSchema: z.ZodObject<{
    plan_id: z.ZodString;
    created_at: z.ZodString;
    cli_version: z.ZodString;
    config_hash: z.ZodString;
    content_hash: z.ZodString;
    base_directory: z.ZodString;
    config_files: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    created_at: string;
    plan_id: string;
    cli_version: string;
    config_hash: string;
    content_hash: string;
    base_directory: string;
    config_files: string[];
}, {
    created_at: string;
    plan_id: string;
    cli_version: string;
    config_hash: string;
    content_hash: string;
    base_directory: string;
    config_files: string[];
}>;
/**
 * Schema for plan summary
 */
export declare const planSummarySchema: z.ZodObject<{
    total_resources: z.ZodNumber;
    to_create: z.ZodNumber;
    to_update: z.ZodNumber;
    to_replace: z.ZodNumber;
    to_delete: z.ZodNumber;
    no_change: z.ZodNumber;
    by_resource_type: z.ZodRecord<z.ZodString, z.ZodObject<{
        to_create: z.ZodNumber;
        to_update: z.ZodNumber;
        to_replace: z.ZodNumber;
        to_delete: z.ZodNumber;
        no_change: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        to_create: number;
        to_update: number;
        to_replace: number;
        to_delete: number;
        no_change: number;
    }, {
        to_create: number;
        to_update: number;
        to_replace: number;
        to_delete: number;
        no_change: number;
    }>>;
}, "strip", z.ZodTypeAny, {
    total_resources: number;
    to_create: number;
    to_update: number;
    to_replace: number;
    to_delete: number;
    no_change: number;
    by_resource_type: Record<string, {
        to_create: number;
        to_update: number;
        to_replace: number;
        to_delete: number;
        no_change: number;
    }>;
}, {
    total_resources: number;
    to_create: number;
    to_update: number;
    to_replace: number;
    to_delete: number;
    no_change: number;
    by_resource_type: Record<string, {
        to_create: number;
        to_update: number;
        to_replace: number;
        to_delete: number;
        no_change: number;
    }>;
}>;
/**
 * Schema for plan warnings
 */
export declare const planWarningSchema: z.ZodObject<{
    type: z.ZodEnum<["dependency_cycle", "missing_dependency", "high_risk_change", "configuration_drift"]>;
    message: z.ZodString;
    affected_resources: z.ZodArray<z.ZodString, "many">;
    severity: z.ZodEnum<["info", "warning", "error"]>;
}, "strip", z.ZodTypeAny, {
    message: string;
    type: "dependency_cycle" | "missing_dependency" | "high_risk_change" | "configuration_drift";
    severity: "info" | "error" | "warning";
    affected_resources: string[];
}, {
    message: string;
    type: "dependency_cycle" | "missing_dependency" | "high_risk_change" | "configuration_drift";
    severity: "info" | "error" | "warning";
    affected_resources: string[];
}>;
/**
 * Schema for execution plan
 */
export declare const executionPlanSchema: z.ZodObject<{
    metadata: z.ZodObject<{
        plan_id: z.ZodString;
        created_at: z.ZodString;
        cli_version: z.ZodString;
        config_hash: z.ZodString;
        content_hash: z.ZodString;
        base_directory: z.ZodString;
        config_files: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        created_at: string;
        plan_id: string;
        cli_version: string;
        config_hash: string;
        content_hash: string;
        base_directory: string;
        config_files: string[];
    }, {
        created_at: string;
        plan_id: string;
        cli_version: string;
        config_hash: string;
        content_hash: string;
        base_directory: string;
        config_files: string[];
    }>;
    changes: z.ZodArray<z.ZodObject<{
        kind: z.ZodString;
        name: z.ZodString;
        remote_id: z.ZodOptional<z.ZodString>;
        change_type: z.ZodNativeEnum<typeof ChangeType>;
        current_hash: z.ZodOptional<z.ZodString>;
        desired_hash: z.ZodOptional<z.ZodString>;
        field_diffs: z.ZodOptional<z.ZodArray<z.ZodObject<{
            path: z.ZodString;
            old_value: z.ZodOptional<z.ZodAny>;
            new_value: z.ZodOptional<z.ZodAny>;
            change_type: z.ZodEnum<["added", "removed", "changed"]>;
            is_sensitive: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            path: string;
            change_type: "added" | "removed" | "changed";
            old_value?: any;
            new_value?: any;
            is_sensitive?: boolean | undefined;
        }, {
            path: string;
            change_type: "added" | "removed" | "changed";
            old_value?: any;
            new_value?: any;
            is_sensitive?: boolean | undefined;
        }>, "many">>;
        dependencies: z.ZodArray<z.ZodString, "many">;
        dependents: z.ZodArray<z.ZodString, "many">;
        risk_level: z.ZodEnum<["low", "medium", "high"]>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        kind: string;
        change_type: ChangeType;
        risk_level: "high" | "medium" | "low";
        dependencies: string[];
        dependents: string[];
        desired_hash?: string | undefined;
        remote_id?: string | undefined;
        current_hash?: string | undefined;
        field_diffs?: {
            path: string;
            change_type: "added" | "removed" | "changed";
            old_value?: any;
            new_value?: any;
            is_sensitive?: boolean | undefined;
        }[] | undefined;
    }, {
        name: string;
        kind: string;
        change_type: ChangeType;
        risk_level: "high" | "medium" | "low";
        dependencies: string[];
        dependents: string[];
        desired_hash?: string | undefined;
        remote_id?: string | undefined;
        current_hash?: string | undefined;
        field_diffs?: {
            path: string;
            change_type: "added" | "removed" | "changed";
            old_value?: any;
            new_value?: any;
            is_sensitive?: boolean | undefined;
        }[] | undefined;
    }>, "many">;
    summary: z.ZodObject<{
        total_resources: z.ZodNumber;
        to_create: z.ZodNumber;
        to_update: z.ZodNumber;
        to_replace: z.ZodNumber;
        to_delete: z.ZodNumber;
        no_change: z.ZodNumber;
        by_resource_type: z.ZodRecord<z.ZodString, z.ZodObject<{
            to_create: z.ZodNumber;
            to_update: z.ZodNumber;
            to_replace: z.ZodNumber;
            to_delete: z.ZodNumber;
            no_change: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            to_create: number;
            to_update: number;
            to_replace: number;
            to_delete: number;
            no_change: number;
        }, {
            to_create: number;
            to_update: number;
            to_replace: number;
            to_delete: number;
            no_change: number;
        }>>;
    }, "strip", z.ZodTypeAny, {
        total_resources: number;
        to_create: number;
        to_update: number;
        to_replace: number;
        to_delete: number;
        no_change: number;
        by_resource_type: Record<string, {
            to_create: number;
            to_update: number;
            to_replace: number;
            to_delete: number;
            no_change: number;
        }>;
    }, {
        total_resources: number;
        to_create: number;
        to_update: number;
        to_replace: number;
        to_delete: number;
        no_change: number;
        by_resource_type: Record<string, {
            to_create: number;
            to_update: number;
            to_replace: number;
            to_delete: number;
            no_change: number;
        }>;
    }>;
    dependencies: z.ZodArray<z.ZodObject<{
        resource_name: z.ZodString;
        resource_kind: z.ZodString;
        depends_on_name: z.ZodString;
        depends_on_kind: z.ZodString;
        dependency_type: z.ZodEnum<["references", "requires", "uses"]>;
    }, "strip", z.ZodTypeAny, {
        resource_name: string;
        resource_kind: string;
        depends_on_name: string;
        depends_on_kind: string;
        dependency_type: "references" | "requires" | "uses";
    }, {
        resource_name: string;
        resource_kind: string;
        depends_on_name: string;
        depends_on_kind: string;
        dependency_type: "references" | "requires" | "uses";
    }>, "many">;
    warnings: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<["dependency_cycle", "missing_dependency", "high_risk_change", "configuration_drift"]>;
        message: z.ZodString;
        affected_resources: z.ZodArray<z.ZodString, "many">;
        severity: z.ZodEnum<["info", "warning", "error"]>;
    }, "strip", z.ZodTypeAny, {
        message: string;
        type: "dependency_cycle" | "missing_dependency" | "high_risk_change" | "configuration_drift";
        severity: "info" | "error" | "warning";
        affected_resources: string[];
    }, {
        message: string;
        type: "dependency_cycle" | "missing_dependency" | "high_risk_change" | "configuration_drift";
        severity: "info" | "error" | "warning";
        affected_resources: string[];
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    metadata: {
        created_at: string;
        plan_id: string;
        cli_version: string;
        config_hash: string;
        content_hash: string;
        base_directory: string;
        config_files: string[];
    };
    dependencies: {
        resource_name: string;
        resource_kind: string;
        depends_on_name: string;
        depends_on_kind: string;
        dependency_type: "references" | "requires" | "uses";
    }[];
    summary: {
        total_resources: number;
        to_create: number;
        to_update: number;
        to_replace: number;
        to_delete: number;
        no_change: number;
        by_resource_type: Record<string, {
            to_create: number;
            to_update: number;
            to_replace: number;
            to_delete: number;
            no_change: number;
        }>;
    };
    changes: {
        name: string;
        kind: string;
        change_type: ChangeType;
        risk_level: "high" | "medium" | "low";
        dependencies: string[];
        dependents: string[];
        desired_hash?: string | undefined;
        remote_id?: string | undefined;
        current_hash?: string | undefined;
        field_diffs?: {
            path: string;
            change_type: "added" | "removed" | "changed";
            old_value?: any;
            new_value?: any;
            is_sensitive?: boolean | undefined;
        }[] | undefined;
    }[];
    warnings?: {
        message: string;
        type: "dependency_cycle" | "missing_dependency" | "high_risk_change" | "configuration_drift";
        severity: "info" | "error" | "warning";
        affected_resources: string[];
    }[] | undefined;
}, {
    metadata: {
        created_at: string;
        plan_id: string;
        cli_version: string;
        config_hash: string;
        content_hash: string;
        base_directory: string;
        config_files: string[];
    };
    dependencies: {
        resource_name: string;
        resource_kind: string;
        depends_on_name: string;
        depends_on_kind: string;
        dependency_type: "references" | "requires" | "uses";
    }[];
    summary: {
        total_resources: number;
        to_create: number;
        to_update: number;
        to_replace: number;
        to_delete: number;
        no_change: number;
        by_resource_type: Record<string, {
            to_create: number;
            to_update: number;
            to_replace: number;
            to_delete: number;
            no_change: number;
        }>;
    };
    changes: {
        name: string;
        kind: string;
        change_type: ChangeType;
        risk_level: "high" | "medium" | "low";
        dependencies: string[];
        dependents: string[];
        desired_hash?: string | undefined;
        remote_id?: string | undefined;
        current_hash?: string | undefined;
        field_diffs?: {
            path: string;
            change_type: "added" | "removed" | "changed";
            old_value?: any;
            new_value?: any;
            is_sensitive?: boolean | undefined;
        }[] | undefined;
    }[];
    warnings?: {
        message: string;
        type: "dependency_cycle" | "missing_dependency" | "high_risk_change" | "configuration_drift";
        severity: "info" | "error" | "warning";
        affected_resources: string[];
    }[] | undefined;
}>;
/**
 * Schema for plan file
 */
export declare const planFileSchema: z.ZodObject<{
    version: z.ZodLiteral<"1.0.0">;
    plan: z.ZodObject<{
        metadata: z.ZodObject<{
            plan_id: z.ZodString;
            created_at: z.ZodString;
            cli_version: z.ZodString;
            config_hash: z.ZodString;
            content_hash: z.ZodString;
            base_directory: z.ZodString;
            config_files: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            created_at: string;
            plan_id: string;
            cli_version: string;
            config_hash: string;
            content_hash: string;
            base_directory: string;
            config_files: string[];
        }, {
            created_at: string;
            plan_id: string;
            cli_version: string;
            config_hash: string;
            content_hash: string;
            base_directory: string;
            config_files: string[];
        }>;
        changes: z.ZodArray<z.ZodObject<{
            kind: z.ZodString;
            name: z.ZodString;
            remote_id: z.ZodOptional<z.ZodString>;
            change_type: z.ZodNativeEnum<typeof ChangeType>;
            current_hash: z.ZodOptional<z.ZodString>;
            desired_hash: z.ZodOptional<z.ZodString>;
            field_diffs: z.ZodOptional<z.ZodArray<z.ZodObject<{
                path: z.ZodString;
                old_value: z.ZodOptional<z.ZodAny>;
                new_value: z.ZodOptional<z.ZodAny>;
                change_type: z.ZodEnum<["added", "removed", "changed"]>;
                is_sensitive: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                path: string;
                change_type: "added" | "removed" | "changed";
                old_value?: any;
                new_value?: any;
                is_sensitive?: boolean | undefined;
            }, {
                path: string;
                change_type: "added" | "removed" | "changed";
                old_value?: any;
                new_value?: any;
                is_sensitive?: boolean | undefined;
            }>, "many">>;
            dependencies: z.ZodArray<z.ZodString, "many">;
            dependents: z.ZodArray<z.ZodString, "many">;
            risk_level: z.ZodEnum<["low", "medium", "high"]>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            kind: string;
            change_type: ChangeType;
            risk_level: "high" | "medium" | "low";
            dependencies: string[];
            dependents: string[];
            desired_hash?: string | undefined;
            remote_id?: string | undefined;
            current_hash?: string | undefined;
            field_diffs?: {
                path: string;
                change_type: "added" | "removed" | "changed";
                old_value?: any;
                new_value?: any;
                is_sensitive?: boolean | undefined;
            }[] | undefined;
        }, {
            name: string;
            kind: string;
            change_type: ChangeType;
            risk_level: "high" | "medium" | "low";
            dependencies: string[];
            dependents: string[];
            desired_hash?: string | undefined;
            remote_id?: string | undefined;
            current_hash?: string | undefined;
            field_diffs?: {
                path: string;
                change_type: "added" | "removed" | "changed";
                old_value?: any;
                new_value?: any;
                is_sensitive?: boolean | undefined;
            }[] | undefined;
        }>, "many">;
        summary: z.ZodObject<{
            total_resources: z.ZodNumber;
            to_create: z.ZodNumber;
            to_update: z.ZodNumber;
            to_replace: z.ZodNumber;
            to_delete: z.ZodNumber;
            no_change: z.ZodNumber;
            by_resource_type: z.ZodRecord<z.ZodString, z.ZodObject<{
                to_create: z.ZodNumber;
                to_update: z.ZodNumber;
                to_replace: z.ZodNumber;
                to_delete: z.ZodNumber;
                no_change: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                to_create: number;
                to_update: number;
                to_replace: number;
                to_delete: number;
                no_change: number;
            }, {
                to_create: number;
                to_update: number;
                to_replace: number;
                to_delete: number;
                no_change: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            total_resources: number;
            to_create: number;
            to_update: number;
            to_replace: number;
            to_delete: number;
            no_change: number;
            by_resource_type: Record<string, {
                to_create: number;
                to_update: number;
                to_replace: number;
                to_delete: number;
                no_change: number;
            }>;
        }, {
            total_resources: number;
            to_create: number;
            to_update: number;
            to_replace: number;
            to_delete: number;
            no_change: number;
            by_resource_type: Record<string, {
                to_create: number;
                to_update: number;
                to_replace: number;
                to_delete: number;
                no_change: number;
            }>;
        }>;
        dependencies: z.ZodArray<z.ZodObject<{
            resource_name: z.ZodString;
            resource_kind: z.ZodString;
            depends_on_name: z.ZodString;
            depends_on_kind: z.ZodString;
            dependency_type: z.ZodEnum<["references", "requires", "uses"]>;
        }, "strip", z.ZodTypeAny, {
            resource_name: string;
            resource_kind: string;
            depends_on_name: string;
            depends_on_kind: string;
            dependency_type: "references" | "requires" | "uses";
        }, {
            resource_name: string;
            resource_kind: string;
            depends_on_name: string;
            depends_on_kind: string;
            dependency_type: "references" | "requires" | "uses";
        }>, "many">;
        warnings: z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["dependency_cycle", "missing_dependency", "high_risk_change", "configuration_drift"]>;
            message: z.ZodString;
            affected_resources: z.ZodArray<z.ZodString, "many">;
            severity: z.ZodEnum<["info", "warning", "error"]>;
        }, "strip", z.ZodTypeAny, {
            message: string;
            type: "dependency_cycle" | "missing_dependency" | "high_risk_change" | "configuration_drift";
            severity: "info" | "error" | "warning";
            affected_resources: string[];
        }, {
            message: string;
            type: "dependency_cycle" | "missing_dependency" | "high_risk_change" | "configuration_drift";
            severity: "info" | "error" | "warning";
            affected_resources: string[];
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        metadata: {
            created_at: string;
            plan_id: string;
            cli_version: string;
            config_hash: string;
            content_hash: string;
            base_directory: string;
            config_files: string[];
        };
        dependencies: {
            resource_name: string;
            resource_kind: string;
            depends_on_name: string;
            depends_on_kind: string;
            dependency_type: "references" | "requires" | "uses";
        }[];
        summary: {
            total_resources: number;
            to_create: number;
            to_update: number;
            to_replace: number;
            to_delete: number;
            no_change: number;
            by_resource_type: Record<string, {
                to_create: number;
                to_update: number;
                to_replace: number;
                to_delete: number;
                no_change: number;
            }>;
        };
        changes: {
            name: string;
            kind: string;
            change_type: ChangeType;
            risk_level: "high" | "medium" | "low";
            dependencies: string[];
            dependents: string[];
            desired_hash?: string | undefined;
            remote_id?: string | undefined;
            current_hash?: string | undefined;
            field_diffs?: {
                path: string;
                change_type: "added" | "removed" | "changed";
                old_value?: any;
                new_value?: any;
                is_sensitive?: boolean | undefined;
            }[] | undefined;
        }[];
        warnings?: {
            message: string;
            type: "dependency_cycle" | "missing_dependency" | "high_risk_change" | "configuration_drift";
            severity: "info" | "error" | "warning";
            affected_resources: string[];
        }[] | undefined;
    }, {
        metadata: {
            created_at: string;
            plan_id: string;
            cli_version: string;
            config_hash: string;
            content_hash: string;
            base_directory: string;
            config_files: string[];
        };
        dependencies: {
            resource_name: string;
            resource_kind: string;
            depends_on_name: string;
            depends_on_kind: string;
            dependency_type: "references" | "requires" | "uses";
        }[];
        summary: {
            total_resources: number;
            to_create: number;
            to_update: number;
            to_replace: number;
            to_delete: number;
            no_change: number;
            by_resource_type: Record<string, {
                to_create: number;
                to_update: number;
                to_replace: number;
                to_delete: number;
                no_change: number;
            }>;
        };
        changes: {
            name: string;
            kind: string;
            change_type: ChangeType;
            risk_level: "high" | "medium" | "low";
            dependencies: string[];
            dependents: string[];
            desired_hash?: string | undefined;
            remote_id?: string | undefined;
            current_hash?: string | undefined;
            field_diffs?: {
                path: string;
                change_type: "added" | "removed" | "changed";
                old_value?: any;
                new_value?: any;
                is_sensitive?: boolean | undefined;
            }[] | undefined;
        }[];
        warnings?: {
            message: string;
            type: "dependency_cycle" | "missing_dependency" | "high_risk_change" | "configuration_drift";
            severity: "info" | "error" | "warning";
            affected_resources: string[];
        }[] | undefined;
    }>;
    signature: z.ZodString;
}, "strip", z.ZodTypeAny, {
    version: "1.0.0";
    plan: {
        metadata: {
            created_at: string;
            plan_id: string;
            cli_version: string;
            config_hash: string;
            content_hash: string;
            base_directory: string;
            config_files: string[];
        };
        dependencies: {
            resource_name: string;
            resource_kind: string;
            depends_on_name: string;
            depends_on_kind: string;
            dependency_type: "references" | "requires" | "uses";
        }[];
        summary: {
            total_resources: number;
            to_create: number;
            to_update: number;
            to_replace: number;
            to_delete: number;
            no_change: number;
            by_resource_type: Record<string, {
                to_create: number;
                to_update: number;
                to_replace: number;
                to_delete: number;
                no_change: number;
            }>;
        };
        changes: {
            name: string;
            kind: string;
            change_type: ChangeType;
            risk_level: "high" | "medium" | "low";
            dependencies: string[];
            dependents: string[];
            desired_hash?: string | undefined;
            remote_id?: string | undefined;
            current_hash?: string | undefined;
            field_diffs?: {
                path: string;
                change_type: "added" | "removed" | "changed";
                old_value?: any;
                new_value?: any;
                is_sensitive?: boolean | undefined;
            }[] | undefined;
        }[];
        warnings?: {
            message: string;
            type: "dependency_cycle" | "missing_dependency" | "high_risk_change" | "configuration_drift";
            severity: "info" | "error" | "warning";
            affected_resources: string[];
        }[] | undefined;
    };
    signature: string;
}, {
    version: "1.0.0";
    plan: {
        metadata: {
            created_at: string;
            plan_id: string;
            cli_version: string;
            config_hash: string;
            content_hash: string;
            base_directory: string;
            config_files: string[];
        };
        dependencies: {
            resource_name: string;
            resource_kind: string;
            depends_on_name: string;
            depends_on_kind: string;
            dependency_type: "references" | "requires" | "uses";
        }[];
        summary: {
            total_resources: number;
            to_create: number;
            to_update: number;
            to_replace: number;
            to_delete: number;
            no_change: number;
            by_resource_type: Record<string, {
                to_create: number;
                to_update: number;
                to_replace: number;
                to_delete: number;
                no_change: number;
            }>;
        };
        changes: {
            name: string;
            kind: string;
            change_type: ChangeType;
            risk_level: "high" | "medium" | "low";
            dependencies: string[];
            dependents: string[];
            desired_hash?: string | undefined;
            remote_id?: string | undefined;
            current_hash?: string | undefined;
            field_diffs?: {
                path: string;
                change_type: "added" | "removed" | "changed";
                old_value?: any;
                new_value?: any;
                is_sensitive?: boolean | undefined;
            }[] | undefined;
        }[];
        warnings?: {
            message: string;
            type: "dependency_cycle" | "missing_dependency" | "high_risk_change" | "configuration_drift";
            severity: "info" | "error" | "warning";
            affected_resources: string[];
        }[] | undefined;
    };
    signature: string;
}>;
/**
 * Type exports derived from schemas
 */
export type FieldDiff = z.infer<typeof fieldDiffSchema>;
export type ResourceChange = z.infer<typeof resourceChangeSchema>;
export type ResourceDependency = z.infer<typeof resourceDependencySchema>;
export type PlanMetadata = z.infer<typeof planMetadataSchema>;
export type PlanSummary = z.infer<typeof planSummarySchema>;
export type PlanWarning = z.infer<typeof planWarningSchema>;
export type ExecutionPlan = z.infer<typeof executionPlanSchema>;
export type PlanFile = z.infer<typeof planFileSchema>;
//# sourceMappingURL=plan.schema.d.ts.map