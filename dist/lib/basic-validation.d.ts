/**
 * Basic validation schemas for security purposes
 * These schemas focus on preventing security vulnerabilities while maintaining backward compatibility
 */
import { z } from 'zod';
/**
 * Basic state file validation - just ensures basic structure for security
 */
export declare const basicStateFileSchema: z.ZodObject<{
    version: z.ZodString;
    resources: z.ZodRecord<z.ZodString, z.ZodAny>;
    metadata: z.ZodAny;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    version: z.ZodString;
    resources: z.ZodRecord<z.ZodString, z.ZodAny>;
    metadata: z.ZodAny;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    version: z.ZodString;
    resources: z.ZodRecord<z.ZodString, z.ZodAny>;
    metadata: z.ZodAny;
}, z.ZodTypeAny, "passthrough">>;
/**
 * Basic plan file validation - just ensures basic structure for security
 */
export declare const basicPlanFileSchema: z.ZodObject<{
    version: z.ZodString;
    plan: z.ZodAny;
    signature: z.ZodString;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    version: z.ZodString;
    plan: z.ZodAny;
    signature: z.ZodString;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    version: z.ZodString;
    plan: z.ZodAny;
    signature: z.ZodString;
}, z.ZodTypeAny, "passthrough">>;
/**
 * Basic lock file validation
 */
export declare const basicLockFileSchema: z.ZodObject<{
    pid: z.ZodNumber;
    created_at: z.ZodString;
    operation: z.ZodString;
    version: z.ZodString;
    cwd: z.ZodString;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    pid: z.ZodNumber;
    created_at: z.ZodString;
    operation: z.ZodString;
    version: z.ZodString;
    cwd: z.ZodString;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    pid: z.ZodNumber;
    created_at: z.ZodString;
    operation: z.ZodString;
    version: z.ZodString;
    cwd: z.ZodString;
}, z.ZodTypeAny, "passthrough">>;
//# sourceMappingURL=basic-validation.d.ts.map