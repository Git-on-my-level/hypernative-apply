# HIGH-005: Set Secure File Permissions

## Priority: HIGH
## Type: Security
## Estimate: 1.5 hours
## Dependencies: None

## Description
State files and lock files are created without explicit permissions, potentially making them world-readable on Unix systems. The current implementation in `src/lib/state-store.ts` uses default file permissions, which could expose sensitive state information including resource configurations, deployment history, and operational metadata to unauthorized users on the system.

## Root Cause
**Primary Locations**: `src/lib/state-store.ts`
- Line 74: `await fs.mkdir(this.stateDir, { recursive: true })` - No explicit mode set for directories
- Line 166: `await fs.writeFile(this.stateFilePath, content, 'utf-8')` - No mode set for state files
- Line 322: `await fs.writeFile(this.lockFilePath, JSON.stringify(lock, null, 2), 'utf-8')` - No mode set for lock files

## Security Impact
- **Information Disclosure**: State files may contain sensitive configuration data
- **Privilege Escalation**: Other users could read operational state and deployment info
- **Compliance Risk**: Violates principle of least privilege for file access
- **Data Exposure**: Lock files and state metadata accessible to unauthorized users

## Tasks
- [ ] Add secure file permission constants (0600 for owner read/write only)
- [ ] Update state directory creation with secure permissions (0700)
- [ ] Set secure permissions on state file creation and updates
- [ ] Set secure permissions on lock file creation
- [ ] Add utility function for secure file operations
- [ ] Update existing files to use secure permissions
- [ ] Add unit tests for file permission verification
- [ ] Test on different platforms (Unix/Windows compatibility)

## Implementation
1. Create secure file utilities in `src/lib/file-security.ts`:
   ```typescript
   import { chmod, mkdir, writeFile } from 'fs/promises';
   import { constants } from 'fs';
   
   // Secure file permissions (owner read/write only)
   export const SECURE_FILE_MODE = 0o600;
   export const SECURE_DIR_MODE = 0o700;
   
   export async function writeSecureFile(filePath: string, content: string): Promise<void> {
     await writeFile(filePath, content, { encoding: 'utf-8', mode: SECURE_FILE_MODE });
   }
   
   export async function createSecureDirectory(dirPath: string): Promise<void> {
     await mkdir(dirPath, { recursive: true, mode: SECURE_DIR_MODE });
   }
   
   export async function setSecurePermissions(filePath: string): Promise<void> {
     await chmod(filePath, SECURE_FILE_MODE);
   }
   ```

2. Update `state-store.ts:74` directory creation:
   ```typescript
   await createSecureDirectory(this.stateDir);
   ```

3. Update `state-store.ts:166` state file writing:
   ```typescript
   await writeSecureFile(this.stateFilePath, content);
   ```

4. Update `state-store.ts:322` lock file writing:
   ```typescript
   await writeSecureFile(this.lockFilePath, JSON.stringify(lock, null, 2));
   ```

## Platform Considerations
- **Unix/Linux/macOS**: Use octal permissions (0600, 0700)
- **Windows**: Permissions work differently, but Node.js fs.chmod provides cross-platform abstraction
- **Error Handling**: Graceful handling if permission setting fails on unsupported filesystems

## Testing
```bash
# Unit tests for file security utilities
npm run test:unit -- src/lib/file-security.test.ts

# Integration tests with state store
npm run test:unit -- src/lib/state-store.test.ts
```

Test cases:
- Verify state files created with 0600 permissions
- Verify lock files created with 0600 permissions  
- Verify state directory created with 0700 permissions
- Test permission setting on existing files
- Cross-platform compatibility testing
- Error handling for permission failures

## File Security Audit
Files that should have secure permissions:
- State files: `.hypernative/state/hypernative.state.json`
- Lock files: `.hypernative/state/hypernative.lock.json`
- State directory: `.hypernative/state/`
- Any temporary files containing sensitive data

## Impact if Not Fixed
- **MEDIUM-HIGH RISK**: Sensitive operational data exposed to other system users
- Configuration details and deployment history readable by unauthorized users
- Potential information leakage in shared or multi-user environments
- Compliance failures for systems requiring strict access controls
- Foundation for more serious attacks if combined with other vulnerabilities

---
Created: 2025-08-09T17:10:28.751Z
