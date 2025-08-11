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
export const changeTypeSchema = z.nativeEnum(ChangeType);

/**
 * Schema for field diffs
 */
export const fieldDiffSchema = z.object({
  path: z.string(),
  old_value: z.any().optional(),
  new_value: z.any().optional(),
  change_type: z.enum(['added', 'removed', 'changed']),
  is_sensitive: z.boolean().optional(),
});

/**
 * Schema for resource changes
 */
export const resourceChangeSchema = z.object({
  kind: z.string(),
  name: z.string(),
  remote_id: z.string().optional(),
  change_type: changeTypeSchema,
  current_hash: z.string().optional(),
  desired_hash: z.string().optional(),
  field_diffs: z.array(fieldDiffSchema).optional(),
  dependencies: z.array(z.string()),
  dependents: z.array(z.string()),
  risk_level: z.enum(['low', 'medium', 'high']),
});

/**
 * Schema for resource dependencies
 */
export const resourceDependencySchema = z.object({
  resource_name: z.string(),
  resource_kind: z.string(),
  depends_on_name: z.string(),
  depends_on_kind: z.string(),
  dependency_type: z.enum(['references', 'requires', 'uses']),
});

/**
 * Schema for plan metadata
 */
export const planMetadataSchema = z.object({
  plan_id: z.string(),
  created_at: z.string().datetime(),
  cli_version: z.string(),
  config_hash: z.string(),
  content_hash: z.string(),
  base_directory: z.string(),
  config_files: z.array(z.string()),
});

/**
 * Schema for plan summary
 */
export const planSummarySchema = z.object({
  total_resources: z.number().int().min(0),
  to_create: z.number().int().min(0),
  to_update: z.number().int().min(0),
  to_replace: z.number().int().min(0),
  to_delete: z.number().int().min(0),
  no_change: z.number().int().min(0),
  by_resource_type: z.record(
    z.string(),
    z.object({
      to_create: z.number().int().min(0),
      to_update: z.number().int().min(0),
      to_replace: z.number().int().min(0),
      to_delete: z.number().int().min(0),
      no_change: z.number().int().min(0),
    })
  ),
});

/**
 * Schema for plan warnings
 */
export const planWarningSchema = z.object({
  type: z.enum([
    'dependency_cycle',
    'missing_dependency',
    'high_risk_change',
    'configuration_drift',
  ]),
  message: z.string(),
  affected_resources: z.array(z.string()),
  severity: z.enum(['info', 'warning', 'error']),
});

/**
 * Schema for execution plan
 */
export const executionPlanSchema = z.object({
  metadata: planMetadataSchema,
  changes: z.array(resourceChangeSchema),
  summary: planSummarySchema,
  dependencies: z.array(resourceDependencySchema),
  warnings: z.array(planWarningSchema).optional(),
});

/**
 * Schema for plan file
 */
export const planFileSchema = z.object({
  version: z.literal('1.0.0'),
  plan: executionPlanSchema,
  signature: z.string(),
});

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
