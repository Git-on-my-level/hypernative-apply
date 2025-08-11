# Troubleshooting Guide

Common issues and solutions for the Hypernative CLI.

## Quick Diagnostics

Always start with the doctor command:
```bash
hypernative doctor --verbose
```

This will identify most common issues automatically.

## Common Issues

### Authentication Errors

#### Problem: "Missing credentials"
```
❌ Authentication: Missing credentials (HN_CLIENT_ID and HN_CLIENT_SECRET required)
```

**Solution:**
```bash
# Set environment variables
export HN_CLIENT_ID="your_client_id"
export HN_CLIENT_SECRET="your_client_secret"

# Verify
hypernative doctor
```

#### Problem: "Authentication failed (401/403)"
```
❌ API Connectivity: Authentication failed
```

**Solutions:**
1. Verify credentials are correct
2. Check if credentials have expired
3. Ensure you're using the correct API endpoint

```bash
# Test with debug mode
hypernative plan --debug

# Check current configuration
hypernative version --debug
```

### Configuration Errors

#### Problem: "Configuration directory not found"
```
❌ Configuration: No hypernative/ directory found
```

**Solution:**
```bash
# Initialize project structure
hypernative init --yes
```

#### Problem: "YAML parse error"
```
Configuration validation failed:
  hypernative/watchlists/treasury.yaml: YAML parse error at line 5: Invalid indentation
```

**Solutions:**
1. Check YAML syntax and indentation
2. Use a YAML validator: `yamllint hypernative/watchlists/treasury.yaml`
3. Ensure proper spacing (2 spaces, no tabs)

```yaml
# ❌ Incorrect (mixed tabs/spaces)
name: Treasury
  description: Monitor treasury
	enabled: true

# ✅ Correct (consistent 2-space indentation)  
name: Treasury
description: Monitor treasury
enabled: true
```

#### Problem: "Referenced resource not found"
```
Configuration validation failed:
  custom-agent.monitor: Referenced notification channel 'alerts' not found
```

**Solution:**
Ensure referenced resources exist and names match exactly:

```yaml
# ❌ Reference doesn't match
notification_channels: ["alerts"]  # File defines "slack-alerts"

# ✅ Correct reference
notification_channels: ["slack-alerts"]  # Matches resource name
```

### Network and Connectivity

#### Problem: "Cannot connect to API server"
```
❌ API Connectivity: Cannot connect to API server
```

**Solutions:**
1. Check internet connectivity
2. Verify API endpoint URL
3. Check firewall/proxy settings

```bash
# Test basic connectivity
ping api.hypernative.com

# Test HTTPS connectivity
curl -I https://api.hypernative.com

# Check with custom endpoint
hypernative plan --base-url https://api-staging.hypernative.com
```

#### Problem: "Request timeout"
```
⚠️ API Connectivity: API connection timeout (may be temporary)
```

**Solutions:**
1. Increase timeout: `--timeout 60000`
2. Check network stability
3. Try during off-peak hours
4. Reduce concurrency: `--concurrency 2`

### State Management Issues

#### Problem: "State file corruption"
```
Error: Invalid state file format
```

**Solution:**
```bash
# Backup current state
cp .hypernative/state.json .hypernative/state.json.backup

# Reset state (will show all resources as new)
rm .hypernative/state.json

# Review changes carefully
hypernative plan
```

#### Problem: "Resource ID conflicts"
```
Error: Resource 'treasury' maps to multiple remote IDs
```

**Solution:**
This usually happens when resources were created outside the CLI or state was corrupted.

```bash
# Option 1: Manual state cleanup
# Edit .hypernative/state.json to remove conflicting entries

# Option 2: Force recreation (destructive)
hypernative apply --force-update treasury

# Option 3: Reset specific resource
hypernative state remove treasury
hypernative plan  # Should show resource as new
```

### Rate Limiting

#### Problem: "Too many requests (429)"
```
❌ API request failed: Rate limit exceeded
```

**Solutions:**
The CLI handles rate limiting automatically, but you can:

```bash
# Reduce concurrent requests
hypernative apply --concurrency 1

# Check rate limit status
hypernative doctor --verbose

# Wait and retry (CLI does this automatically)
```

### Performance Issues

#### Problem: "Commands are slow"

**Solutions:**
1. Reduce configuration size
2. Lower concurrency
3. Increase timeout
4. Use `--debug` to identify bottlenecks

```bash
# Performance optimization
hypernative apply --concurrency 2 --timeout 60000

# Profile performance
time hypernative plan --debug
```

### File Permissions

#### Problem: "Cannot write to directory"
```
❌ File Permissions: Cannot write to current directory
```

**Solutions:**
```bash
# Check directory permissions
ls -la

# Fix permissions
chmod 755 .
chmod 755 hypernative/

# Check disk space
df -h .
```

### Environment Variables

#### Problem: "Environment variable not defined"
```
Error: Environment variable SLACK_WEBHOOK_URL is not defined
```

**Solutions:**
```bash
# Check current environment variables
env | grep HN_
env | grep SLACK_

# Set missing variables
export SLACK_WEBHOOK_URL="https://hooks.slack.com/services/..."

# Use .env file (if supported)
echo "SLACK_WEBHOOK_URL=https://..." > .env
```

#### Problem: "Environment variable substitution not working"
```yaml
# Check syntax - these are different:
webhook_url: ${SLACK_WEBHOOK_URL}     # ✅ Correct
webhook_url: $SLACK_WEBHOOK_URL       # ❌ Won't substitute  
webhook_url: "{SLACK_WEBHOOK_URL}"    # ❌ Won't substitute
```

## Debugging Techniques

### Enable Debug Mode
```bash
export DEBUG=1
hypernative plan --debug
```

This shows:
- HTTP request/response details
- Configuration loading steps
- State management operations
- Rate limiting information
- Request timing

### Validate Configuration Manually
```bash
# Check YAML syntax
yamllint hypernative/

# Validate against schema
hypernative plan --dry-run --debug

# Test specific resource
hypernative plan --only watchlist:treasury
```

### Check API Responses
```bash
# Show detailed API interactions
hypernative plan --debug --json

# Test API connectivity
curl -H "x-client-id: $HN_CLIENT_ID" \
     -H "x-client-secret: $HN_CLIENT_SECRET" \
     https://api.hypernative.com/health
```

### Inspect State File
```bash
# View current state
cat .hypernative/state.json | jq .

# Check specific resource mapping
jq '.resources.watchlist' .hypernative/state.json

# View fingerprints
jq '.fingerprints' .hypernative/state.json
```

## Error Codes and Exit Codes

### CLI Exit Codes
- `0`: Success, no changes
- `1`: General error  
- `2`: Changes detected (plan mode)
- `3`: Authentication error
- `4`: Configuration error
- `5`: API error

### Common Error Patterns

| Error Pattern | Likely Cause | Solution |
|---------------|--------------|----------|
| `ECONNREFUSED` | API server unreachable | Check network/URL |
| `ENOTFOUND` | DNS resolution failed | Check domain name |
| `TIMEOUT` | Request took too long | Increase timeout or check network |
| `401/403` | Authentication failed | Verify credentials |
| `429` | Rate limited | Wait and retry (automatic) |
| `500/502/503` | Server error | Retry later or contact support |

## Getting Help

### Before Contacting Support

1. Run `hypernative doctor --verbose`
2. Try with `--debug` flag  
3. Check the [FAQ](./faq.md)
4. Search [existing issues](https://github.com/hypernative/cli/issues)

### What to Include in Bug Reports

1. **CLI version**: `hypernative --version`
2. **System info**: `hypernative doctor --json`
3. **Configuration**: Sanitized configuration files (remove secrets)
4. **Error output**: Full error message with `--debug --verbose`
5. **Steps to reproduce**: Exact commands that cause the issue

### Support Channels

- 🐛 [GitHub Issues](https://github.com/hypernative/cli/issues) - Bug reports and feature requests
- 💬 [Discord Community](https://discord.gg/hypernative) - Community support and discussion
- 📧 [Email Support](mailto:support@hypernative.io) - Direct support for urgent issues
- 📖 [Documentation](https://docs.hypernative.com/cli) - Complete documentation

## Emergency Procedures

### Pause All Monitoring
If you need to quickly disable all monitoring:

```bash
# Disable all resources
find hypernative/ -name "*.yaml" -exec sed -i 's/enabled: true/enabled: false/g' {} \;

# Apply immediately
hypernative apply --auto-approve
```

### Rollback Changes
If a deployment causes issues:

```bash
# Option 1: Revert configuration files and apply
git checkout HEAD~1 -- hypernative/
hypernative apply

# Option 2: Delete problematic resources
hypernative state remove problematic-resource
hypernative apply

# Option 3: Full reset (nuclear option)
rm .hypernative/state.json
# Then carefully recreate resources
```

### Emergency Contacts
For critical security issues:
- 🚨 **Security Team**: security@hypernative.io  
- 📞 **Emergency Line**: +1-XXX-XXX-XXXX
- 💬 **Discord**: @security-team in #emergency channel