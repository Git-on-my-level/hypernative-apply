# MEDIUM-003: Implement Atomic State Updates

## Description
The current state persistence mechanism in `/src/lib/state-store.ts` is not atomic, creating a risk of state corruption when failures occur during write operations. The `saveState()` method directly writes to the state file, which can leave the state in a partially written or corrupted state if the process crashes, disk space runs out, or other I/O errors occur during writing.

## Problem Analysis
Current implementation writes directly to the state file:
```typescript
const content = JSON.stringify(state, null, 2);
await fs.writeFile(this.stateFilePath, content, 'utf-8'); // Not atomic!
```

This approach has several failure modes:
- **Process interruption**: If the process crashes mid-write, the state file may be truncated
- **Disk space**: If disk fills up during write, partial content may be written
- **Permission errors**: Write failures can leave state in inconsistent state
- **Concurrent access**: Multiple processes could corrupt the file (though locks help)

## Impact
- **Severity**: Medium (data integrity risk but low probability)
- **Risk**: State corruption, loss of resource tracking, failed recovery
- **Scope**: All state write operations across the CLI
- **Frequency**: Occurs on every `apply` operation and resource updates

## Current State File Location
- Path: `.hypernative/state.json`
- Format: JSON with metadata and resource tracking
- Size: Typically small (< 1MB) but can grow with many resources
- Critical importance: Loss would require manual resource re-tracking

## Tasks
- [ ] Implement atomic write pattern using temporary files
- [ ] Add write verification and rollback on corruption
- [ ] Create comprehensive error handling for I/O failures
- [ ] Add file integrity checks (checksums) for state validation
- [ ] Update all state write operations to use atomic method
- [ ] Add tests for failure scenarios and recovery
- [ ] Implement state backup mechanism for additional safety
- [ ] Add monitoring for write operation success rates

## Technical Implementation

### Atomic Write Pattern
```typescript
private async atomicWriteState(state: StateFile): Promise<StateOperationResult> {
  const tempFilePath = `${this.stateFilePath}.tmp.${Date.now()}.${process.pid}`;
  
  try {
    // Write to temporary file first
    const content = JSON.stringify(state, null, 2);
    await fs.writeFile(tempFilePath, content, 'utf-8');
    
    // Verify the written content is valid
    await this.validateStateFile(tempFilePath);
    
    // Atomic rename to final location
    await fs.rename(tempFilePath, this.stateFilePath);
    
    return { success: true };
  } catch (error) {
    // Clean up temp file on failure
    await this.cleanupTempFile(tempFilePath);
    return { success: false, error };
  }
}
```

### State Validation
```typescript
private async validateStateFile(filePath: string): Promise<void> {
  const content = await fs.readFile(filePath, 'utf-8');
  const parsed = JSON.parse(content); // Throws if invalid JSON
  
  // Validate schema structure
  if (!parsed.version || !parsed.resources || !parsed.metadata) {
    throw new Error('Invalid state file structure');
  }
  
  // Optional: Add checksum validation
  const checksum = this.calculateChecksum(content);
  // Store/verify checksum...
}
```

## Files to Modify
- `/src/lib/state-store.ts` - Primary implementation location
  - Replace `saveState()` method with atomic implementation
  - Add temporary file management utilities
  - Add state validation methods
  - Update error handling and logging

## Error Handling Strategy
- **Disk space**: Check available space before writing
- **Permissions**: Validate write permissions to state directory
- **Corruption**: Implement state file validation and checksums
- **Recovery**: Maintain backup of previous state for rollback
- **Cleanup**: Ensure temporary files are always cleaned up

## Testing Strategy
- [ ] Unit tests for atomic write operations
- [ ] Failure simulation tests (disk full, permission denied)
- [ ] Corruption recovery tests
- [ ] Concurrent access tests (multiple processes)
- [ ] Performance tests for large state files
- [ ] Rollback and cleanup verification tests

## Backup and Recovery
```typescript
// Keep last N state backups
private async createBackup(): Promise<void> {
  const backupPath = `${this.stateFilePath}.backup.${Date.now()}`;
  if (existsSync(this.stateFilePath)) {
    await fs.copyFile(this.stateFilePath, backupPath);
    await this.cleanupOldBackups(); // Keep only last 5 backups
  }
}
```

## Performance Considerations
- Temporary file operations add ~10ms overhead per write
- Disk space usage temporarily doubles during write
- Validation adds JSON parsing overhead
- Consider async/parallel operations where safe

## Success Criteria
- [ ] All state write operations are atomic (write-then-rename pattern)
- [ ] State corruption is impossible during normal failures
- [ ] Comprehensive error handling for all I/O failure modes
- [ ] State validation prevents invalid data persistence
- [ ] Backup mechanism provides recovery options
- [ ] Performance impact is minimal (< 50ms per operation)
- [ ] All existing functionality works unchanged
- [ ] Test coverage includes failure scenarios

## Security Benefits
- Prevents state corruption attacks
- Ensures state integrity during system failures
- Maintains audit trail of state changes
- Reduces data loss risk

## Notes
- The atomic rename operation is atomic on most filesystems (ext4, APFS, NTFS)
- Consider adding state file encryption in future iterations
- Monitor disk space usage patterns to optimize backup retention
- Document recovery procedures for operators

---
Created: 2025-08-09T17:10:31.386Z
