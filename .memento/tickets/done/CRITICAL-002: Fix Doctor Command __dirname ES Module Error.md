# CRITICAL-002: Fix Doctor Command __dirname ES Module Error

## Priority: CRITICAL  
## Type: Bug
## Estimate: 30 minutes
## Dependencies: None

## Description
The doctor command fails immediately with "ReferenceError: __dirname is not defined" because it uses CommonJS `__dirname` in an ES module context. This makes the entire doctor command unusable.

## Root Cause
File: `src/commands/doctor.ts`
- Uses `__dirname` which doesn't exist in ES modules
- Needs to use `import.meta.url` with `fileURLToPath` instead

## Tasks
- [ ] Import required ES module utilities
- [ ] Replace __dirname with ES module equivalent
- [ ] Test doctor command runs without errors
- [ ] Verify package.json reading works correctly

## Implementation
Add imports:
```typescript
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
```

Replace `__dirname` usage:
```typescript
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```

## Testing
```bash
npm run dev -- doctor
npm run dev -- doctor --verbose
```

## Impact if Not Fixed
- Doctor command completely broken
- Users cannot diagnose configuration issues
- No way to verify setup is correct

---
Created: 2025-08-09T17:09:51.270Z