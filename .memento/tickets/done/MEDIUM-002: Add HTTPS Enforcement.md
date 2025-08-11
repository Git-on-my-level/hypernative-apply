# MEDIUM-002: Add HTTPS Enforcement

## Description
The API client currently accepts both HTTP and HTTPS URLs without enforcing secure connections, creating a potential security vulnerability where sensitive credentials could be transmitted over unencrypted connections. This poses a significant risk in production environments where API keys and authentication tokens need protection.

## Problem Analysis
The ApiClient class in `/src/lib/api-client.ts` accepts any `baseUrl` without validating the protocol scheme. This allows:
- Accidental use of HTTP in production environments
- Potential credential exposure through unencrypted network traffic
- Man-in-the-middle attacks on API communications
- Compliance violations in security-sensitive environments

## Security Impact
- **Severity**: Medium (security vulnerability but requires configuration mistake)
- **Risk**: Credential exposure, data interception, compliance violations
- **Scope**: All API communications when HTTP URLs are used
- **CVSS**: Potential for confidentiality impact in misconfigured environments

## Current Implementation Analysis
In `/src/lib/api-client.ts`, the constructor accepts `config.baseUrl` directly:
```typescript
this.axiosInstance = axios.create({
  baseURL: config.baseUrl, // No validation here
  // ...
});
```

## Tasks
- [ ] Add URL protocol validation in ApiClient constructor
- [ ] Implement HTTPS enforcement with clear error messages
- [ ] Add test mode exception for local development (localhost/127.0.0.1)
- [ ] Create comprehensive test cases for URL validation
- [ ] Update configuration validation to check base URL protocol
- [ ] Add documentation about HTTPS requirement
- [ ] Ensure backward compatibility with existing valid configurations

## Technical Implementation

### Validation Logic
```typescript
private validateBaseUrl(baseUrl: string): void {
  const url = new URL(baseUrl);
  
  // Allow HTTP only for localhost in test/dev mode
  if (url.protocol === 'http:') {
    const isLocalhost = ['localhost', '127.0.0.1', '0.0.0.0'].includes(url.hostname);
    const isTestMode = process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development';
    
    if (!isLocalhost || !isTestMode) {
      throw new Error('HTTPS is required for security. Use https:// instead of http://');
    }
  }
  
  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    throw new Error(`Unsupported protocol: ${url.protocol}. Only https:// (and http:// for localhost in test mode) are supported.`);
  }
}
```

### Integration Points
- Constructor validation in `ApiClient`
- Configuration loading in `config-loader.ts`
- Error handling in CLI commands
- Test environment detection

## Test Cases
- [ ] Valid HTTPS URLs should work
- [ ] HTTP URLs should be rejected in production
- [ ] HTTP localhost URLs should work in test mode
- [ ] Invalid protocols should be rejected
- [ ] Clear error messages for each failure case
- [ ] Environment variable behavior testing

## Files to Modify
- `/src/lib/api-client.ts` - Add URL validation in constructor
- `/src/lib/config-loader.ts` - Add base URL validation during config loading
- `/src/lib/api-client.test.ts` - Add comprehensive URL validation tests
- `/src/schemas/config.schema.ts` - Add Zod URL protocol validation

## Backward Compatibility
- Existing HTTPS configurations will continue to work unchanged
- HTTP configurations will fail with clear upgrade instructions
- Test environments can use HTTP for localhost development
- Configuration migration guide for users with HTTP URLs

## Success Criteria
- [ ] HTTPS URLs work without changes
- [ ] HTTP URLs are rejected with helpful error messages
- [ ] Test mode allows HTTP for localhost development
- [ ] All existing tests pass with HTTPS test fixtures
- [ ] New validation tests achieve 100% coverage
- [ ] Documentation updated with security requirements

## Security Benefits
- Prevents credential exposure over unencrypted connections
- Enforces security best practices by default
- Reduces attack surface for man-in-the-middle attacks
- Improves compliance with security standards

## Notes
- Consider adding a warning log when HTTP localhost is used in test mode
- May need environment variable to override for specific testing scenarios
- Document the security rationale in user-facing documentation
- Consider adding SSL/TLS certificate validation options in future iterations

---
Created: 2025-08-09T17:10:30.129Z
