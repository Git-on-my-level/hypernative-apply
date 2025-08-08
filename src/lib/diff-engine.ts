/**
 * Diff engine for deep object comparison and field-level change detection
 *
 * This module provides utilities for comparing configurations and detecting
 * changes at the field level, with support for secret redaction and array
 * stabilization.
 */

import { FieldDiff } from '../types/plan.js';

// Fields that should be ignored in diffs (server-managed fields)
const SERVER_MANAGED_FIELDS = new Set([
  'id',
  'created_at',
  'updated_at',
  'last_execution',
  'next_execution',
  'execution_count',
  'error_count',
  'last_error',
  'request_id',
  'metadata.created_at',
  'metadata.updated_at',
  'metadata.last_modified',
  'metadata.etag',
  'metadata.version',
  'pagination',
  '_links',
  '_metadata',
]);

// Fields that contain sensitive data
const SENSITIVE_FIELDS = new Set([
  'api_key',
  'secret',
  'password',
  'token',
  'private_key',
  'webhook_secret',
  'auth_token',
  'bearer_token',
  'client_secret',
]);

// Pagination and server metadata patterns to ignore
const IGNORED_PATTERNS = [
  /^metadata\./,
  /^_/, // Fields starting with underscore
  /pagination$/,
  /count$/,
  /^etag$/i,
  /^version$/,
];

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
export function deepCompare(oldObj: any, newObj: any, options: DiffOptions = {}): DiffResult {
  const opts: Required<DiffOptions> = {
    includeArrayDiffs: options.includeArrayDiffs ?? true,
    redactSecrets: options.redactSecrets ?? true,
    maxDepth: options.maxDepth ?? 10,
    ignoreFields: options.ignoreFields ?? [],
    sensitivePatterns: options.sensitivePatterns ?? [],
  };

  const fieldDiffs: FieldDiff[] = [];
  const summary = {
    fields_added: 0,
    fields_removed: 0,
    fields_changed: 0,
    sensitive_fields_changed: 0,
  };

  // Clean objects before comparison to remove server-managed fields
  const cleanedOld = cleanForComparison(oldObj, opts);
  const cleanedNew = cleanForComparison(newObj, opts);

  // Perform recursive comparison
  compareObjects(cleanedOld, cleanedNew, '', fieldDiffs, summary, opts, 0);

  return {
    has_differences: fieldDiffs.length > 0,
    field_diffs: fieldDiffs,
    summary,
  };
}

/**
 * Clean an object by removing server-managed fields and normalizing values
 */
function cleanForComparison(obj: any, options: Required<DiffOptions>): any {
  if (obj === null || obj === undefined) {
    return null;
  }

  if (Array.isArray(obj)) {
    return stabilizeArray(obj.map((item) => cleanForComparison(item, options)));
  }

  if (typeof obj === 'object') {
    const cleaned: Record<string, any> = {};

    for (const [key, value] of Object.entries(obj)) {
      // Skip server-managed fields
      if (shouldIgnoreField(key)) {
        continue;
      }

      // Skip custom ignored fields
      if (options.ignoreFields.includes(key)) {
        continue;
      }

      const cleanedValue = cleanForComparison(value, options);

      // Only include non-null, non-undefined values
      if (cleanedValue !== null && cleanedValue !== undefined) {
        // Convert empty arrays and objects to null for consistency
        if (Array.isArray(cleanedValue) && cleanedValue.length === 0) {
          continue;
        }
        if (typeof cleanedValue === 'object' && Object.keys(cleanedValue).length === 0) {
          continue;
        }

        cleaned[key] = cleanedValue;
      }
    }

    return cleaned;
  }

  // Handle primitive types
  if (typeof obj === 'string') {
    return obj.trim();
  }

  return obj;
}

/**
 * Stabilize array ordering for semantic comparison
 */
function stabilizeArray(arr: any[]): any[] {
  if (!Array.isArray(arr)) {
    return arr;
  }

  // For arrays of objects, try to sort by a stable key
  if (arr.length > 0 && typeof arr[0] === 'object' && arr[0] !== null) {
    // Look for common stable keys
    const stableKeys = ['id', 'name', 'address', 'type', 'key'];
    const sortKey = stableKeys.find((key) => arr[0][key] !== undefined);

    if (sortKey) {
      return [...arr].sort((a, b) => {
        const aVal = String(a[sortKey] || '');
        const bVal = String(b[sortKey] || '');
        return aVal.localeCompare(bVal);
      });
    }
  }

  // For arrays of primitives, sort if they're all the same type
  if (arr.length > 0 && arr.every((item) => typeof item === typeof arr[0])) {
    if (typeof arr[0] === 'string' || typeof arr[0] === 'number') {
      return [...arr].sort();
    }
  }

  return arr;
}

/**
 * Check if a field should be ignored in comparisons
 */
function shouldIgnoreField(fieldPath: string): boolean {
  // Check direct field names
  if (SERVER_MANAGED_FIELDS.has(fieldPath)) {
    return true;
  }

  // Check patterns
  return IGNORED_PATTERNS.some((pattern) => pattern.test(fieldPath));
}

/**
 * Check if a field contains sensitive data
 */
function isSensitiveField(fieldPath: string, customPatterns: RegExp[] = []): boolean {
  const lowerPath = fieldPath.toLowerCase();

  // Check direct sensitive field names
  if ([...SENSITIVE_FIELDS].some((field) => lowerPath.includes(field))) {
    return true;
  }

  // Check custom patterns
  return customPatterns.some((pattern) => pattern.test(fieldPath));
}

/**
 * Recursively compare two objects and build field diffs
 */
function compareObjects(
  oldObj: any,
  newObj: any,
  path: string,
  diffs: FieldDiff[],
  summary: DiffResult['summary'],
  options: Required<DiffOptions>,
  depth: number
): void {
  if (depth > options.maxDepth) {
    return;
  }

  // Handle null/undefined cases
  if (oldObj === null || oldObj === undefined) {
    if (newObj !== null && newObj !== undefined) {
      addFieldDiff(diffs, summary, path, undefined, newObj, 'added', options);
    }
    return;
  }

  if (newObj === null || newObj === undefined) {
    addFieldDiff(diffs, summary, path, oldObj, undefined, 'removed', options);
    return;
  }

  // Handle primitive types
  if (typeof oldObj !== 'object' || typeof newObj !== 'object') {
    if (oldObj !== newObj) {
      addFieldDiff(diffs, summary, path, oldObj, newObj, 'changed', options);
    }
    return;
  }

  // Handle arrays
  if (Array.isArray(oldObj) && Array.isArray(newObj)) {
    if (options.includeArrayDiffs) {
      compareArrays(oldObj, newObj, path, diffs, summary, options, depth);
    } else {
      // Simple array comparison
      if (JSON.stringify(oldObj) !== JSON.stringify(newObj)) {
        addFieldDiff(diffs, summary, path, oldObj, newObj, 'changed', options);
      }
    }
    return;
  }

  if (Array.isArray(oldObj) !== Array.isArray(newObj)) {
    addFieldDiff(diffs, summary, path, oldObj, newObj, 'changed', options);
    return;
  }

  // Compare object properties
  const allKeys = new Set([...Object.keys(oldObj), ...Object.keys(newObj)]);

  for (const key of allKeys) {
    const fieldPath = path ? `${path}.${key}` : key;

    // Skip ignored fields
    if (shouldIgnoreField(fieldPath)) {
      continue;
    }

    const oldValue = oldObj[key];
    const newValue = newObj[key];

    compareObjects(oldValue, newValue, fieldPath, diffs, summary, options, depth + 1);
  }
}

/**
 * Compare two arrays and generate detailed diffs
 */
function compareArrays(
  oldArr: any[],
  newArr: any[],
  path: string,
  diffs: FieldDiff[],
  summary: DiffResult['summary'],
  options: Required<DiffOptions>,
  depth: number
): void {
  // For simple equality check
  if (JSON.stringify(oldArr) === JSON.stringify(newArr)) {
    return;
  }

  // Check if this is a simple array change
  if (
    oldArr.length !== newArr.length ||
    !oldArr.every((item) => typeof item !== 'object') ||
    !newArr.every((item) => typeof item !== 'object')
  ) {
    // Complex array - compare element by element
    const maxLength = Math.max(oldArr.length, newArr.length);

    for (let i = 0; i < maxLength; i++) {
      const elementPath = `${path}[${i}]`;
      const oldElement = i < oldArr.length ? oldArr[i] : undefined;
      const newElement = i < newArr.length ? newArr[i] : undefined;

      compareObjects(oldElement, newElement, elementPath, diffs, summary, options, depth + 1);
    }
  } else {
    // Simple array - treat as single change
    addFieldDiff(diffs, summary, path, oldArr, newArr, 'changed', options);
  }
}

/**
 * Add a field diff to the results
 */
function addFieldDiff(
  diffs: FieldDiff[],
  summary: DiffResult['summary'],
  path: string,
  oldValue: any,
  newValue: any,
  changeType: 'added' | 'removed' | 'changed',
  options: Required<DiffOptions>
): void {
  const isSensitive = isSensitiveField(path, options.sensitivePatterns);

  // Redact sensitive values if requested
  let displayOldValue = oldValue;
  let displayNewValue = newValue;

  if (isSensitive && options.redactSecrets) {
    displayOldValue = oldValue !== undefined ? '[REDACTED]' : undefined;
    displayNewValue = newValue !== undefined ? '[REDACTED]' : undefined;
  }

  diffs.push({
    path,
    old_value: displayOldValue,
    new_value: displayNewValue,
    change_type: changeType,
    is_sensitive: isSensitive,
  });

  // Update summary
  switch (changeType) {
    case 'added':
      summary.fields_added++;
      break;
    case 'removed':
      summary.fields_removed++;
      break;
    case 'changed':
      summary.fields_changed++;
      break;
  }

  if (isSensitive) {
    summary.sensitive_fields_changed++;
  }
}

/**
 * Generate a human-readable diff summary
 */
export function formatDiffSummary(result: DiffResult): string {
  if (!result.has_differences) {
    return 'No differences found';
  }

  const { summary } = result;
  const parts: string[] = [];

  if (summary.fields_added > 0) {
    parts.push(`${summary.fields_added} field${summary.fields_added === 1 ? '' : 's'} added`);
  }

  if (summary.fields_changed > 0) {
    parts.push(`${summary.fields_changed} field${summary.fields_changed === 1 ? '' : 's'} changed`);
  }

  if (summary.fields_removed > 0) {
    parts.push(`${summary.fields_removed} field${summary.fields_removed === 1 ? '' : 's'} removed`);
  }

  let result_str = parts.join(', ');

  if (summary.sensitive_fields_changed > 0) {
    result_str += ` (${summary.sensitive_fields_changed} sensitive)`;
  }

  return result_str;
}

/**
 * Format field diffs for display
 */
export function formatFieldDiffs(
  diffs: FieldDiff[],
  options: { maxDiffs?: number; useColors?: boolean } = {}
): string[] {
  const maxDiffs = options.maxDiffs ?? 20;
  const useColors = options.useColors ?? false;

  const formatted: string[] = [];
  const displayDiffs = diffs.slice(0, maxDiffs);

  for (const diff of displayDiffs) {
    let line = '';

    switch (diff.change_type) {
      case 'added':
        line = useColors
          ? `\x1b[32m+ ${diff.path}: ${formatValue(diff.new_value)}\x1b[0m`
          : `+ ${diff.path}: ${formatValue(diff.new_value)}`;
        break;
      case 'removed':
        line = useColors
          ? `\x1b[31m- ${diff.path}: ${formatValue(diff.old_value)}\x1b[0m`
          : `- ${diff.path}: ${formatValue(diff.old_value)}`;
        break;
      case 'changed':
        line = useColors
          ? `\x1b[33m~ ${diff.path}: ${formatValue(diff.old_value)} -> ${formatValue(diff.new_value)}\x1b[0m`
          : `~ ${diff.path}: ${formatValue(diff.old_value)} -> ${formatValue(diff.new_value)}`;
        break;
    }

    if (diff.is_sensitive) {
      line += useColors ? ' \x1b[35m[SENSITIVE]\x1b[0m' : ' [SENSITIVE]';
    }

    formatted.push(line);
  }

  if (diffs.length > maxDiffs) {
    formatted.push(`... and ${diffs.length - maxDiffs} more changes`);
  }

  return formatted;
}

/**
 * Format a value for display in diffs
 */
function formatValue(value: any): string {
  if (value === undefined) {
    return '<undefined>';
  }

  if (value === null) {
    return '<null>';
  }

  if (typeof value === 'string') {
    return `"${value}"`;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return '[]';
    }
    if (value.length <= 3) {
      return `[${value.map(formatValue).join(', ')}]`;
    }
    return `[${value.slice(0, 2).map(formatValue).join(', ')}, ...${value.length - 2} more]`;
  }

  if (typeof value === 'object') {
    const keys = Object.keys(value);
    if (keys.length === 0) {
      return '{}';
    }
    if (keys.length <= 2) {
      return `{${keys.map((k) => `${k}: ${formatValue(value[k])}`).join(', ')}}`;
    }
    return `{${keys
      .slice(0, 1)
      .map((k) => `${k}: ${formatValue(value[k])}`)
      .join(', ')}, ...${keys.length - 1} more}`;
  }

  return String(value);
}
