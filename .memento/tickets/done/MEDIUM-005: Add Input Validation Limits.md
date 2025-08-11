# MEDIUM-005: Add Input Validation Limits

## Description
The configuration loading and validation system currently lacks limits on input sizes and resource counts, creating potential denial-of-service (DoS) vulnerabilities. Malicious or poorly constructed configuration files could consume excessive memory, CPU, or storage resources, leading to system instability or crashes.

## Security Vulnerability Analysis
Current implementation accepts unlimited:
- **Configuration file sizes**: Large YAML/JSON files could exhaust memory
- **Resource counts**: Unlimited watchlists, agents, channels could overwhelm API rate limits
- **Nesting depth**: Deep object structures could cause stack overflow
- **String lengths**: Extremely long names, descriptions could cause buffer issues
- **Array sizes**: Large arrays in configuration could exhaust memory

## Potential Attack Vectors
1. **Memory exhaustion**: Giant configuration files causing OOM errors
2. **CPU exhaustion**: Deep nesting causing excessive parsing time
3. **API flooding**: Too many resources overwhelming upstream services
4. **Storage exhaustion**: Large state files filling disk space
5. **Rate limit abuse**: Bulk operations triggering API blocks

## Impact
- **Severity**: Medium (DoS risk but requires malicious input)
- **Risk**: System instability, service disruption, resource exhaustion
- **Scope**: Configuration loading, validation, and execution phases
- **CVSS**: Availability impact through resource consumption

## Current Vulnerable Areas
Based on codebase analysis:
- `/src/lib/config-loader.ts` - Configuration file parsing
- `/src/schemas/*.ts` - Schema validation without size limits
- `/src/lib/state-store.ts` - State file management
- `/src/lib/executor.ts` - Batch operation processing

## Tasks
- [ ] Define reasonable limits for all input validation
- [ ] Implement file size validation before parsing
- [ ] Add resource count limits to configuration schemas
- [ ] Implement nesting depth validation
- [ ] Add string length limits to all text fields
- [ ] Create configurable limit system with defaults
- [ ] Add memory usage monitoring during parsing
- [ ] Implement graceful degradation for limit violations
- [ ] Add comprehensive limit violation error messages
- [ ] Create bypass mechanism for legitimate large configurations

## Proposed Limits

### File Size Limits
```typescript
const DEFAULT_LIMITS = {
  // File sizes (bytes)
  max_config_file_size: 10 * 1024 * 1024, // 10MB
  max_state_file_size: 50 * 1024 * 1024,  // 50MB
  
  // Resource counts
  max_watchlists: 1000,
  max_custom_agents: 500,
  max_notification_channels: 100,
  max_total_resources: 1500,
  
  // Structure limits
  max_nesting_depth: 10,
  max_object_keys: 1000,
  max_array_length: 10000,
  
  // String limits
  max_name_length: 255,
  max_description_length: 2000,
  max_url_length: 2048,
  max_json_string_length: 100000,
} as const;
```

### Schema Integration
```typescript
// Enhanced Zod schemas with limits
const watchlistNameSchema = z.string()
  .min(1, 'Name is required')
  .max(DEFAULT_LIMITS.max_name_length, `Name cannot exceed ${DEFAULT_LIMITS.max_name_length} characters`);

const watchlistArraySchema = z.array(watchlistSchema)
  .max(DEFAULT_LIMITS.max_watchlists, `Cannot exceed ${DEFAULT_LIMITS.max_watchlists} watchlists`);
```

## Implementation Strategy

### Phase 1: File Size Validation
```typescript
private async validateFileSize(filePath: string): Promise<void> {
  const stats = await fs.stat(filePath);
  if (stats.size > DEFAULT_LIMITS.max_config_file_size) {
    throw new Error(
      `Configuration file too large: ${stats.size} bytes. ` +
      `Maximum allowed: ${DEFAULT_LIMITS.max_config_file_size} bytes`
    );
  }
}
```

### Phase 2: Resource Count Validation
```typescript
private validateResourceCounts(config: ParsedConfig): void {
  const counts = {
    watchlists: Object.keys(config.watchlists).length,
    custom_agents: Object.keys(config.custom_agents).length,
    notification_channels: Object.keys(config.notification_channels).length,
  };
  
  if (counts.watchlists > DEFAULT_LIMITS.max_watchlists) {
    throw new Error(`Too many watchlists: ${counts.watchlists}. Maximum: ${DEFAULT_LIMITS.max_watchlists}`);
  }
  // ... additional validations
}
```

### Phase 3: Nesting Depth Validation
```typescript
private validateNestingDepth(obj: any, currentDepth = 0): void {
  if (currentDepth > DEFAULT_LIMITS.max_nesting_depth) {
    throw new Error(`Configuration nesting too deep. Maximum depth: ${DEFAULT_LIMITS.max_nesting_depth}`);
  }
  
  if (typeof obj === 'object' && obj !== null) {
    for (const value of Object.values(obj)) {
      this.validateNestingDepth(value, currentDepth + 1);
    }
  }
}
```

## Configuration System
Make limits configurable through environment variables or configuration:
```typescript
interface ValidationLimits {
  max_config_file_size: number;
  max_watchlists: number;
  max_custom_agents: number;
  // ... other limits
}

// Load from environment or config file
const limits = loadValidationLimits();
```

## Files to Modify
- `/src/lib/config-loader.ts` - Add file size and structure validation
- `/src/schemas/config.schema.ts` - Add count and size limits to Zod schemas
- `/src/schemas/watchlist.schema.ts` - Add field length limits
- `/src/schemas/custom-agent.schema.ts` - Add field length limits
- `/src/schemas/notification-channel.schema.ts` - Add field length limits
- `/src/types/config.ts` - Add validation limit types
- `/src/lib/validator.ts` - Create centralized validation utility

## Error Handling
- Clear, actionable error messages for each limit violation
- Suggestions for reducing file/resource sizes
- Graceful handling without system crashes
- Structured error responses for programmatic handling

## Testing Strategy
- [ ] Unit tests for each validation limit
- [ ] Large file simulation tests
- [ ] Memory usage tests with large inputs
- [ ] Performance tests for validation overhead
- [ ] Error message clarity tests
- [ ] Configuration override tests
- [ ] Boundary condition tests (exactly at limits)

## Performance Considerations
- Validation overhead should be minimal (< 100ms for typical configs)
- Memory usage should remain bounded during validation
- Early validation prevents expensive downstream processing
- Consider streaming validation for very large files

## Monitoring and Alerting
- Track validation limit violations
- Monitor file sizes and resource counts over time
- Alert on unusual patterns that might indicate attacks
- Log validation performance metrics

## Success Criteria
- [ ] All input validation includes appropriate size and count limits
- [ ] DoS attacks through large inputs are prevented
- [ ] Clear error messages guide users to fix limit violations
- [ ] Limits are configurable for different deployment environments
- [ ] Performance impact is negligible for normal use cases
- [ ] Memory usage remains bounded regardless of input size
- [ ] Comprehensive test coverage for all limit scenarios
- [ ] Documentation explains limits and how to configure them

## Deployment Considerations
- Different limits for development vs production environments
- Enterprise customers may need higher limits
- Consider offering limit increase requests through support
- Monitor actual usage patterns to optimize default limits

## Future Enhancements
- Dynamic limits based on system resources
- Streaming validation for extremely large configurations
- Intelligent limit recommendations based on usage patterns
- Integration with system resource monitoring

## Notes
- Balance security with usability - limits should not hinder legitimate use cases
- Consider providing configuration validation tools to help users optimize their configs
- Document performance implications of approaching limits
- Plan for gradual limit increases as the platform scales

---
Created: 2025-08-09T17:10:32.735Z
