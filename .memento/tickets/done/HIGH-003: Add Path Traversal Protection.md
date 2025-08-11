# HIGH-003: Add Path Traversal Protection

## Priority: HIGH
## Type: Security
## Estimate: 2 hours
## Dependencies: None

## Description
The config loader in `src/lib/config-loader.ts` doesn't validate file paths when loading configuration files, allowing potential path traversal attacks. Malicious configuration files could reference paths like `../../etc/passwd` to read files outside the intended configuration directories, leading to unauthorized file access and potential information disclosure.

## Root Cause
File: `src/lib/config-loader.ts:130-169`
- `loadNotificationChannels()` method uses glob patterns and file paths without validation
- No checks for path traversal sequences (`../`, `..\\`)
- Paths are not resolved or verified against a base directory
- Similar issues likely exist in other file loading methods

## Security Impact
- **Confidentiality**: Attackers could read sensitive files outside config directories
- **Information Disclosure**: System files, environment variables, and secrets could be exposed
- **Privilege Escalation**: Configuration files could be crafted to access restricted areas

## Tasks
- [ ] Create path validation utility function
- [ ] Add path traversal detection (check for `../` sequences)
- [ ] Implement absolute path resolution and base directory verification
- [ ] Update `loadNotificationChannels()` to use secure path validation
- [ ] Update other file loading methods with same protection
- [ ] Add unit tests for path traversal protection
- [ ] Test with malicious path examples

## Implementation
1. Create `src/lib/path-security.ts` with validation utilities:
   ```typescript
   import { resolve, normalize, relative } from 'path';
   
   export function validateConfigPath(filePath: string, baseDir: string): string {
     // Normalize and resolve paths
     const normalizedPath = normalize(filePath);
     const resolvedPath = resolve(baseDir, normalizedPath);
     const resolvedBase = resolve(baseDir);
     
     // Check for path traversal
     if (normalizedPath.includes('..')) {
       throw new Error(`Path traversal detected in: ${filePath}`);
     }
     
     // Verify resolved path is within base directory
     const relativePath = relative(resolvedBase, resolvedPath);
     if (relativePath.startsWith('..') || relativePath.startsWith('/')) {
       throw new Error(`Path outside base directory: ${filePath}`);
     }
     
     return resolvedPath;
   }
   ```

2. Update `config-loader.ts:130-169` to validate paths before file operations
3. Apply same validation to other file loading methods

## Testing
```bash
# Unit tests for path validation
npm run test:unit -- src/lib/path-security.test.ts

# Integration tests with config loader
npm run test:unit -- src/lib/config-loader.test.ts
```

Test cases:
- Valid relative paths within config directory
- Path traversal attempts (`../../../etc/passwd`)
- Absolute paths pointing outside base directory
- Symlink attacks (if applicable)

## Impact if Not Fixed
- **HIGH RISK**: Remote file inclusion vulnerability
- Potential exposure of sensitive system files
- Compliance violations for data protection standards
- Possible credential theft and system compromise

---
Created: 2025-08-09T17:10:27.286Z
