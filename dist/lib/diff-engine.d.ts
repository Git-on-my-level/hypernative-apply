/**
 * Diff engine for deep object comparison and field-level change detection
 *
 * This module provides utilities for comparing configurations and detecting
 * changes at the field level, with support for secret redaction and array
 * stabilization.
 */
import { FieldDiff } from '../types/plan.js';
/**
 * Options for diff generation
 */
export interface DiffOptions {
    /** Whether to include field diffs for arrays */
    includeArrayDiffs?: boolean;
    /** Whether to redact sensitive values */
    redactSecrets?: boolean;
    /** Maximum depth for diff analysis */
    maxDepth?: number;
    /** Custom fields to ignore in addition to defaults */
    ignoreFields?: string[];
    /** Custom sensitive field patterns */
    sensitivePatterns?: RegExp[];
}
/**
 * Result of comparing two objects
 */
export interface DiffResult {
    /** Whether the objects are different */
    has_differences: boolean;
    /** Field-level differences */
    field_diffs: FieldDiff[];
    /** Summary of changes */
    summary: {
        fields_added: number;
        fields_removed: number;
        fields_changed: number;
        sensitive_fields_changed: number;
    };
}
/**
 * Deep compare two objects and generate field-level diffs
 */
export declare function deepCompare(oldObj: any, newObj: any, options?: DiffOptions): DiffResult;
/**
 * Generate a human-readable diff summary
 */
export declare function formatDiffSummary(result: DiffResult): string;
/**
 * Format field diffs for display
 */
export declare function formatFieldDiffs(diffs: FieldDiff[], options?: {
    maxDiffs?: number;
    useColors?: boolean;
}): string[];
//# sourceMappingURL=diff-engine.d.ts.map