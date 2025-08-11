# CRITICAL-004: Add JSON Schema Validation Security

**Priority:** CRITICAL  
**Status:** Open  
**Component:** Core Security  
**Security Impact:** High (RCE, DoS, Prototype Pollution)

## Description

Multiple locations throughout the codebase use `JSON.parse()` without validation, creating critical security vulnerabilities including prototype pollution, denial of service attacks, and potential remote code execution.

### Vulnerable Code Locations

1. **State Store** (`src/lib/state-store.ts:115`):
```typescript
const state: StateFile = JSON.parse(content);
```

2. **Apply Command** (`src/commands/apply.ts:24`):
```typescript
const planFile: PlanFile = JSON.parse(planContent);
```

3. **Additional Locations**: Any other `JSON.parse()` usage without schema validation

## Root Cause Analysis

1. **No Input Validation**: JSON strings are parsed directly without schema validation
2. **Prototype Pollution**: Malicious JSON can modify Object.prototype
3. **DoS Vulnerability**: Large/complex JSON can cause memory exhaustion
4. **Type Safety**: Parsed data might not match expected TypeScript interfaces

## Security Vulnerabilities

### 1. Prototype Pollution
```json
{
  "__proto__": {
    "isAdmin": true,
    "polluted": "value"
  }
}
```

### 2. Denial of Service
```json
{
  "a": "a".repeat(10000000)
}
```

### 3. Memory Exhaustion
```json
{
  "data": [/* massive array */]
}
```

## Impact if Not Fixed

- **Security Breach**: Attackers can manipulate application behavior
- **Data Corruption**: Invalid data can break application state
- **Service Outage**: DoS attacks can crash the application
- **Compliance Issues**: Security vulnerabilities may violate security standards

## Implementation Steps

### Task 1: Install JSON Validation Dependencies
Zod is already installed, but ensure latest version:
```bash
npm install zod
```

### Task 2: Create Safe JSON Parser Utility
Create `/src/lib/safe-json.ts`:
```typescript
import { z } from 'zod';

export class SafeJsonParser {
  static parse<T>(jsonString: string, schema: z.ZodSchema<T>): T {
    try {
      // Basic DoS protection
      if (jsonString.length > 10 * 1024 * 1024) { // 10MB limit
        throw new Error('JSON payload too large');
      }
      
      const parsed = JSON.parse(jsonString);
      
      // Validate against schema
      return schema.parse(parsed);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(`JSON validation failed: ${error.message}`);
      }
      throw new Error(`JSON parsing failed: ${error.message}`);
    }
  }
}
```

### Task 3: Create Schemas for Parsed Data
Create schemas for state files and plan files:
```typescript
// In src/schemas/state.schema.ts
export const stateFileSchema = z.object({
  version: z.string(),
  metadata: z.object({
    total_resources: z.number(),
    // ... other state fields
  }),
  // ... rest of state structure
});

// In src/schemas/plan.schema.ts
export const planFileSchema = z.object({
  version: z.string(),
  plan: z.object({
    // ... plan structure
  }),
});
```

### Task 4: Replace Unsafe JSON.parse Calls
Replace all `JSON.parse()` calls with validated parsing:

**State Store** (`src/lib/state-store.ts:115`):
```typescript
import { SafeJsonParser } from './safe-json.js';
import { stateFileSchema } from '../schemas/state.schema.js';

// Replace line 115
const state = SafeJsonParser.parse(content, stateFileSchema);
```

**Apply Command** (`src/commands/apply.ts:24`):
```typescript
import { SafeJsonParser } from '../lib/safe-json.js';
import { planFileSchema } from '../schemas/plan.schema.js';

// Replace line 24
const planFile = SafeJsonParser.parse(planContent, planFileSchema);
```

### Task 5: Add Error Handling
Ensure all JSON parsing has proper error handling:
```typescript
try {
  const data = SafeJsonParser.parse(content, schema);
  // Use validated data
} catch (error) {
  log.error('Failed to parse JSON:', error.message);
  throw new Error('Invalid file format');
}
```

## Testing Instructions

### Security Tests
1. **Prototype Pollution Test**:
```typescript
test('should prevent prototype pollution', () => {
  const maliciousJson = '{"__proto__": {"polluted": true}}';
  expect(() => SafeJsonParser.parse(maliciousJson, schema)).toThrow();
  expect(Object.prototype.polluted).toBeUndefined();
});
```

2. **DoS Protection Test**:
```typescript
test('should reject oversized JSON', () => {
  const largeJson = JSON.stringify({ data: 'x'.repeat(20 * 1024 * 1024) });
  expect(() => SafeJsonParser.parse(largeJson, schema)).toThrow('too large');
});
```

3. **Schema Validation Test**:
```typescript
test('should validate against schema', () => {
  const invalidJson = '{"invalid": "structure"}';
  expect(() => SafeJsonParser.parse(invalidJson, validSchema)).toThrow();
});
```

### Integration Tests
1. Test state file loading with malformed JSON
2. Test plan file parsing with invalid structure
3. Test all file operations that use JSON parsing

## Files to Modify
- Create: `/Users/dazheng/workspace/hypernative-apply/src/lib/safe-json.ts`
- Create: `/Users/dazheng/workspace/hypernative-apply/src/schemas/state.schema.ts`
- Create: `/Users/dazheng/workspace/hypernative-apply/src/schemas/plan.schema.ts`
- Modify: `/Users/dazheng/workspace/hypernative-apply/src/lib/state-store.ts` (line 115)
- Modify: `/Users/dazheng/workspace/hypernative-apply/src/commands/apply.ts` (line 24)
- Audit: Search for all other `JSON.parse()` usage and replace

## Security Considerations
- Implement rate limiting for JSON parsing operations
- Consider adding JSON size limits based on operation type
- Log security events for monitoring
- Regular security audits of JSON parsing code

---
Created: 2025-08-09T17:10:24.568Z
