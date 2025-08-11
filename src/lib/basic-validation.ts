/**
 * Basic validation schemas for security purposes
 * These schemas focus on preventing security vulnerabilities while maintaining backward compatibility
 */

import { z } from 'zod';

/**
 * Basic state file validation - just ensures basic structure for security
 */
export const basicStateFileSchema = z
  .object({
    version: z.string(),
    resources: z.record(z.string(), z.any()),
    metadata: z.any(),
  })
  .passthrough(); // Allow additional properties for backward compatibility

/**
 * Basic plan file validation - just ensures basic structure for security
 */
export const basicPlanFileSchema = z
  .object({
    version: z.string(),
    plan: z.any(),
    signature: z.string(),
  })
  .passthrough(); // Allow additional properties for backward compatibility

/**
 * Basic lock file validation
 */
export const basicLockFileSchema = z
  .object({
    pid: z.number(),
    created_at: z.string(),
    operation: z.string(),
    version: z.string(),
    cwd: z.string(),
  })
  .passthrough();
