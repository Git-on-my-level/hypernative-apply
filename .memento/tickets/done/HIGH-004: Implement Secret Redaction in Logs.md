# HIGH-004: Implement Secret Redaction in Logs

## Priority: HIGH
## Type: Security
## Estimate: 3 hours
## Dependencies: None

## Description
Secrets and credentials are exposed in debug logs without proper redaction throughout the codebase. While there's partial redaction in `src/lib/api-client.ts:189` (client ID), other sensitive data like client secrets, API keys, and tokens are logged in plaintext. This creates a significant security risk where sensitive information could be exposed in log files, console output, or log aggregation systems.

## Root Cause
**Primary Location**: `src/lib/api-client.ts:189`
- Only partial redaction of client ID (`${config.clientId.slice(0, 4)}****`)
- Client secret and other credentials not redacted

**Secondary Locations**: Throughout codebase
- `src/lib/planner.ts:457-458` - Has some redaction logic but not consistently applied
- Multiple logger calls that may expose sensitive configuration data
- Environment variable logging without redaction

## Security Impact
- **Credential Exposure**: API keys, secrets, and tokens logged in plaintext
- **Compliance Risk**: Violates security standards for credential handling
- **Data Breach Risk**: Log files could expose authentication credentials
- **Audit Trail Contamination**: Sensitive data in logs complicates security auditing

## Tasks
- [ ] Create centralized secret redaction utility
- [ ] Identify all sensitive field patterns (secrets, tokens, keys, passwords)
- [ ] Implement structured logging middleware with automatic redaction
- [ ] Update API client logging to use redaction utility
- [ ] Audit and fix all logger calls throughout codebase
- [ ] Add configuration for redaction patterns
- [ ] Test redaction with various sensitive data types
- [ ] Verify no sensitive data leaks in any log level

## Implementation
1. Create `src/lib/log-redaction.ts` with comprehensive redaction:
   ```typescript
   interface RedactionConfig {
     sensitiveFields: string[];
     patterns: RegExp[];
     replacement: string;
   }
   
   export class LogRedactor {
     private static readonly SENSITIVE_PATTERNS = [
       /\b[A-Za-z0-9+/]{20,}={0,2}\b/, // Base64 tokens
       /\b[a-f0-9]{32,}\b/i,           // Hex keys
       /password|secret|token|key|credential/i
     ];
   
     static redact(data: any): any {
       // Deep clone and redact sensitive fields
       // Replace with masked values (e.g., "***REDACTED***")
     }
   
     static redactString(str: string): string {
       // Apply regex patterns to redact sensitive strings
     }
   }
   ```

2. Update `api-client.ts:187-192` to use comprehensive redaction:
   ```typescript
   log.debug('API client initialized', LogRedactor.redact({
     baseUrl: config.baseUrl,
     clientId: config.clientId,
     clientSecret: config.clientSecret,
     timeout: config.timeout || 30000,
     maxRetries: this.backoffConfig.maxRetries,
   }));
   ```

3. Create logging middleware that automatically redacts before output
4. Update planner.ts to use centralized redaction instead of inline logic

## Testing
```bash
# Unit tests for redaction utility
npm run test:unit -- src/lib/log-redaction.test.ts

# Integration tests with API client
npm run test:unit -- src/lib/api-client.test.ts

# Full config loading with sensitive data
npm run test:unit -- src/lib/config-loader.test.ts
```

Test cases:
- Redaction of common secret formats (JWT, API keys, passwords)
- Nested object redaction
- Array redaction
- String pattern matching
- Performance with large objects
- Verify no sensitive data in any log output

## Configuration
Add redaction configuration options:
```yaml
# .hypernative/config.yml
logging:
  redaction:
    enabled: true
    patterns:
      - "secret"
      - "password" 
      - "token"
    replacement: "***REDACTED***"
```

## Impact if Not Fixed
- **HIGH RISK**: Credentials exposed in log files
- Potential unauthorized access to external services
- Compliance violations (PCI DSS, SOC 2, GDPR)
- Security incident if logs are compromised or shared
- Regulatory penalties for credential exposure

---
Created: 2025-08-09T17:10:28.031Z
