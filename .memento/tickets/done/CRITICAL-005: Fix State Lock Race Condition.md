# CRITICAL-005: Fix State Lock Race Condition

**Priority:** CRITICAL  
**Status:** Open  
**Component:** State Management  
**Security Impact:** High (data corruption, concurrent access)

## Description

A Time-of-Check-Time-of-Use (TOCTOU) race condition exists in the state lock mechanism between the `isLocked()` check and `createLock()` operation in `state-store.ts` lines 304-334. This can lead to multiple processes believing they have exclusive access to the state file.

### Current Vulnerable Code
```typescript
// Lines 306-322 in src/lib/state-store.ts
async createLock(operation: 'plan' | 'apply'): Promise<StateOperationResult> {
  try {
    const lockCheck = await this.isLocked();  // CHECK
    if (lockCheck.locked) {
      // Handle already locked...
    }
    
    // GAP - Another process can create lock here
    
    await fs.writeFile(this.lockFilePath, JSON.stringify(lock, null, 2), 'utf-8');  // USE
    
    return { success: true };
  } catch (error) {
    // Error handling...
  }
}
```

## Root Cause Analysis

1. **TOCTOU Gap**: Time gap between checking lock existence and creating lock file
2. **Non-Atomic Operation**: File system operations are not atomic
3. **Race Window**: Multiple processes can pass the `isLocked()` check simultaneously
4. **Missing Exclusive Creation**: No use of exclusive file creation flags

## Impact if Not Fixed

- **Data Corruption**: Multiple processes modifying state simultaneously
- **Lost Operations**: Concurrent applies may overwrite each other
- **Inconsistent State**: State file may become corrupted
- **Resource Conflicts**: Multiple operations affecting same resources
- **User Confusion**: Unclear error messages when locks fail

## Implementation Steps

### Task 1: Implement Atomic Lock Creation
Replace the current lock creation with atomic file operations:

```typescript
import { constants as fsConstants } from 'fs';

async createLock(operation: 'plan' | 'apply'): Promise<StateOperationResult> {
  try {
    await this.ensureStateDirectory();

    const lock: LockFile = {
      pid: process.pid,
      created_at: new Date().toISOString(),
      operation,
      version: CLI_VERSION,
      cwd: process.cwd(),
    };

    // Atomic lock creation with exclusive flag
    await fs.writeFile(
      this.lockFilePath, 
      JSON.stringify(lock, null, 2), 
      { 
        encoding: 'utf-8',
        flag: 'wx' // Exclusive creation - fails if file exists
      }
    );

    log.debug(`Created lock for ${operation} operation (PID: ${process.pid})`);
    return { success: true };
  } catch (error: any) {
    if (error.code === 'EEXIST') {
      // Lock already exists - check if it's stale
      const lockCheck = await this.isLocked();
      const msg = lockCheck.locked 
        ? `Another hypernative operation is in progress (PID: ${lockCheck.lockInfo?.pid}, operation: ${lockCheck.lockInfo?.operation})`
        : 'Lock file exists but appears stale';
      return { success: false, message: msg };
    }
    
    const message = `Failed to create lock: ${error.message}`;
    return {
      success: false,
      message,
      error: error instanceof Error ? error : new Error(String(error)),
    };
  }
}
```

### Task 2: Improve Lock Validation
Enhance the `isLocked()` method to better detect stale locks:

```typescript
async isLocked(): Promise<{ locked: boolean; lockInfo?: LockFile }> {
  try {
    if (!(await this.fileExists(this.lockFilePath))) {
      return { locked: false };
    }

    const content = await fs.readFile(this.lockFilePath, 'utf-8');
    const lockInfo: LockFile = JSON.parse(content);

    // Check if process is still running
    if (!this.isProcessRunning(lockInfo.pid)) {
      log.warn(`Removing stale lock from dead process ${lockInfo.pid}`);
      await this.removeLock();
      return { locked: false };
    }

    // Check lock age (remove locks older than 1 hour)
    const lockAge = Date.now() - new Date(lockInfo.created_at).getTime();
    if (lockAge > 60 * 60 * 1000) {
      log.warn(`Removing stale lock older than 1 hour (PID: ${lockInfo.pid})`);
      await this.removeLock();
      return { locked: false };
    }

    return { locked: true, lockInfo };
  } catch (error) {
    log.debug('Error checking lock, assuming unlocked:', error);
    return { locked: false };
  }
}
```

### Task 3: Add Process Running Check
Add utility method to check if process is still running:

```typescript
private isProcessRunning(pid: number): boolean {
  try {
    // Sending signal 0 checks if process exists without killing it
    process.kill(pid, 0);
    return true;
  } catch (error: any) {
    // ESRCH means process doesn't exist
    return error.code !== 'ESRCH';
  }
}
```

### Task 4: Add Retry Logic for Lock Acquisition
Implement exponential backoff retry logic:

```typescript
async acquireLock(operation: 'plan' | 'apply', maxRetries = 3): Promise<StateOperationResult> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const result = await this.createLock(operation);
    
    if (result.success) {
      return result;
    }
    
    if (attempt < maxRetries) {
      const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000); // Exponential backoff, max 5s
      log.debug(`Lock acquisition failed, retrying in ${delay}ms (attempt ${attempt}/${maxRetries})`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  return {
    success: false,
    message: `Failed to acquire lock after ${maxRetries} attempts`,
  };
}
```

## Testing Instructions

### Race Condition Tests
1. **Concurrent Lock Creation**:
```typescript
test('should prevent concurrent lock creation', async () => {
  const promises = Array(10).fill(null).map(() => 
    stateStore.createLock('plan')
  );
  
  const results = await Promise.allSettled(promises);
  const successes = results.filter(r => r.status === 'fulfilled' && r.value.success);
  
  expect(successes).toHaveLength(1); // Only one should succeed
});
```

2. **Stale Lock Cleanup**:
```typescript
test('should remove stale locks from dead processes', async () => {
  // Create lock with fake PID
  await fs.writeFile(lockPath, JSON.stringify({
    pid: 999999, // Non-existent PID
    created_at: new Date().toISOString(),
    operation: 'plan'
  }));
  
  const result = await stateStore.createLock('plan');
  expect(result.success).toBe(true);
});
```

3. **Lock Age Cleanup**:
```typescript
test('should remove locks older than 1 hour', async () => {
  // Create old lock
  await fs.writeFile(lockPath, JSON.stringify({
    pid: process.pid,
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    operation: 'plan'
  }));
  
  const result = await stateStore.createLock('plan');
  expect(result.success).toBe(true);
});
```

### Integration Tests
1. Test multiple CLI instances running simultaneously
2. Test lock cleanup after process termination
3. Test lock behavior during system shutdown

## Files to Modify
- `/Users/dazheng/workspace/hypernative-apply/src/lib/state-store.ts` (lines 304-334)
- Add new utility methods for process checking and lock validation
- Update all callers to use `acquireLock()` instead of `createLock()`

## Performance Considerations
- Lock checks should be fast to minimize blocking
- Stale lock cleanup should not significantly delay operations
- Process existence checks are OS-specific but generally fast

## Backward Compatibility
- Existing lock files will be handled correctly
- No changes to lock file format required
- Enhanced error messages for better debugging

---
Created: 2025-08-09T17:10:25.234Z
