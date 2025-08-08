# Best Practices Guide

Security, operational, and development best practices for the Hypernative CLI.

## Security Best Practices

### Credential Management

#### 1. Never Store Secrets in Configuration Files
```yaml
# ❌ Bad: Hardcoded secrets
config:
  webhook_url: "https://hooks.slack.com/services/T123/B456/xyz"
  api_key: "sk_live_abcd1234"

# ✅ Good: Use environment variables  
config:
  webhook_url: ${SLACK_WEBHOOK_URL}
  api_key: ${API_KEY}
```

#### 2. Use Environment-Specific Credentials
```bash
# Staging
export HN_CLIENT_ID="staging_client_id"
export HN_CLIENT_SECRET="staging_secret"

# Production (different credentials)
export HN_CLIENT_ID="production_client_id"
export HN_CLIENT_SECRET="production_secret"
```

#### 3. Rotate Credentials Regularly
- Set calendar reminders for credential rotation (every 90 days)
- Use different credentials for different environments
- Monitor API key usage in Hypernative dashboard
- Have a rollback plan when rotating credentials

#### 4. Secure File Permissions
```bash
# Secure configuration directory
chmod 700 ~/.hypernative/
chmod 600 ~/.hypernative/config.yaml

# Check permissions
ls -la ~/.hypernative/
```

### Access Control

#### 1. Principle of Least Privilege
Only grant necessary API permissions:

```yaml
# For read-only CI jobs
api_permissions:
  - "read:watchlists"
  - "read:agents"  
  - "read:channels"

# For deployment pipelines
api_permissions:
  - "read:*"
  - "write:watchlists"
  - "write:agents"
  - "write:channels"
```

#### 2. Environment Isolation
- Use separate API keys for staging and production
- Never test with production credentials
- Implement approval workflows for production changes

## Operational Best Practices

### Configuration Management

#### 1. Use Version Control
```bash
# Initialize git repository
git init
git add hypernative/ .hypernative/
git commit -m "Initial Hypernative configuration"

# Create .gitignore
echo ".env" >> .gitignore
echo "*.log" >> .gitignore
git add .gitignore
git commit -m "Add gitignore"
```

#### 2. Test Before Applying
```bash
# Always plan first
hypernative plan

# Review changes carefully
hypernative plan --debug

# Apply only after verification
hypernative apply
```

#### 3. Use Descriptive Names and Documentation
```yaml
# ❌ Bad: Unclear naming
name: monitor1
description: "Some monitoring"

# ✅ Good: Clear and descriptive
name: treasury-large-transfers
description: "Monitor treasury wallets for transfers >$100k USD that may require approval"
tags: ["treasury", "high-value", "approval-required"]
```

#### 4. Organize Configuration Files
```
hypernative/
├── config.yaml                 # Global settings
├── watchlists/
│   ├── treasury/               # Group by function
│   │   ├── main-treasury.yaml
│   │   └── emergency-fund.yaml
│   └── operations/
│       ├── dev-wallets.yaml
│       └── marketing-budget.yaml
├── notification-channels/
│   ├── critical/               # Group by urgency
│   │   ├── slack-security.yaml
│   │   └── email-executives.yaml
│   └── informational/
│       ├── discord-community.yaml
│       └── slack-general.yaml
└── custom-agents/
    ├── security/               # Group by purpose
    │   ├── large-transfers.yaml
    │   └── admin-actions.yaml
    └── compliance/
        ├── transaction-reporting.yaml
        └── audit-trail.yaml
```

### Monitoring and Alerting

#### 1. Set Appropriate Alert Thresholds
```yaml
# ❌ Bad: Too sensitive (alert fatigue)
threshold: 100  # $100 transactions

# ✅ Good: Meaningful thresholds
configuration:
  thresholds:
    critical: 1000000    # $1M+ requires immediate attention
    high: 100000         # $100k+ needs review  
    medium: 10000        # $10k+ for awareness
```

#### 2. Use Severity Levels Appropriately
- **Critical**: Immediate action required, potential security breach
- **High**: Requires prompt attention, significant risk
- **Medium**: Should be reviewed, moderate risk
- **Low**: Informational, minimal risk

#### 3. Implement Alert Escalation
```yaml
# notification-channels/escalation-example.yaml
name: escalated-alerts
type: slack
config:
  webhook_url: ${SLACK_CRITICAL_WEBHOOK}
  mention_channel: true  # @channel for critical alerts
  mention_users: ["@security-team", "@cto"]
  
  # Escalation rules
  escalation:
    - after_minutes: 5
      mention_additional: ["@on-call-engineer"]
    - after_minutes: 15  
      mention_additional: ["@executive-team"]
```

### State Management

#### 1. Commit State Files
```bash
# Include state in version control
git add .hypernative/state.json
git commit -m "Update Hypernative state after deployment"
```

#### 2. Backup State Before Major Changes
```bash
# Backup before risky operations
cp .hypernative/state.json .hypernative/state.json.backup.$(date +%Y%m%d)

# Restore if needed
cp .hypernative/state.json.backup.20240101 .hypernative/state.json
```

#### 3. Handle State Conflicts
```bash
# If state gets out of sync
hypernative plan --debug  # Shows what CLI thinks vs reality

# Force refresh from remote (careful!)
hypernative state refresh

# Manual conflict resolution
hypernative state show | jq .resources
```

## Development Best Practices

### Configuration Development

#### 1. Start with Examples
```bash
# Copy from samples
cp -r samples/basic-monitoring/* ./

# Or start with init
hypernative init --interactive
```

#### 2. Iterative Development
```bash
# Test configuration syntax
hypernative plan --dry-run

# Test in staging first
hypernative plan --profile staging
hypernative apply --profile staging

# Then promote to production
hypernative plan --profile production  
hypernative apply --profile production
```

#### 3. Use Configuration Templates
Create reusable templates for common patterns:

```yaml
# templates/slack-notification.yaml
name: ${CHANNEL_NAME}
type: slack
description: ${CHANNEL_DESCRIPTION}
config:
  webhook_url: ${SLACK_WEBHOOK_URL}
  channel: ${SLACK_CHANNEL}
  username: "Hypernative ${ENVIRONMENT}"
  icon_emoji: ":shield:"
enabled: true
```

### Testing Strategies

#### 1. Validation Testing
```bash
# Test configuration without applying
hypernative plan --dry-run

# Validate specific resources
hypernative validate watchlist treasury-wallet

# Test with sample data
hypernative test --sample-data
```

#### 2. Integration Testing
```bash
# Test notification channels
hypernative test notification-channel slack-alerts

# Test API connectivity
hypernative doctor --verbose

# End-to-end test
hypernative plan && hypernative apply --dry-run
```

#### 3. Performance Testing  
```bash
# Test with large configurations
time hypernative plan

# Test with high concurrency
hypernative apply --concurrency 10

# Monitor resource usage
hypernative apply --debug --verbose
```

## CI/CD Best Practices

### Pipeline Structure

#### 1. Multi-Stage Validation
```yaml
# .github/workflows/hypernative.yml
name: Hypernative Deployment

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install CLI
        run: npm install -g @hypernative/cli
        
      - name: Validate configuration
        run: hypernative plan --json
        env:
          HN_CLIENT_ID: ${{ secrets.HN_CLIENT_ID_STAGING }}
          HN_CLIENT_SECRET: ${{ secrets.HN_CLIENT_SECRET_STAGING }}

  deploy-staging:
    needs: validate
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to staging
        run: |
          npm install -g @hypernative/cli
          hypernative apply --auto-approve --json
        env:
          HN_CLIENT_ID: ${{ secrets.HN_CLIENT_ID_STAGING }}
          HN_CLIENT_SECRET: ${{ secrets.HN_CLIENT_SECRET_STAGING }}

  deploy-production:
    needs: deploy-staging
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to production
        run: |
          npm install -g @hypernative/cli
          hypernative doctor --verbose
          hypernative plan
          hypernative apply --json
        env:
          HN_CLIENT_ID: ${{ secrets.HN_CLIENT_ID_PRODUCTION }}
          HN_CLIENT_SECRET: ${{ secrets.HN_CLIENT_SECRET_PRODUCTION }}
```

#### 2. Change Detection
```bash
# Only deploy if configuration changed
if git diff --quiet HEAD~1 hypernative/; then
  echo "No changes to Hypernative configuration"
  exit 0
fi

# Deploy changes
hypernative apply --auto-approve
```

#### 3. Rollback Strategy
```bash
# Store previous state
cp .hypernative/state.json .hypernative/state.json.pre-deploy

# Deploy with rollback capability
if ! hypernative apply --auto-approve; then
  echo "Deployment failed, rolling back..."
  cp .hypernative/state.json.pre-deploy .hypernative/state.json
  hypernative apply --auto-approve
  exit 1
fi
```

### Deployment Gates

#### 1. Plan-Only on Pull Requests
```yaml
# Only plan on PRs, don't apply
- name: Plan changes
  if: github.event_name == 'pull_request'
  run: |
    hypernative plan --json | tee plan-output.json
    
    # Fail if significant changes without approval
    if jq -e '.summary.to_add > 5 or .summary.to_delete > 0' plan-output.json; then
      echo "Major changes detected - requires manual approval"
      exit 1
    fi
```

#### 2. Manual Approval for Production
```yaml
# Require manual approval for production
environment: production
steps:
  - name: Wait for approval
    uses: trstringer/manual-approval@v1
    with:
      secret: ${{ github.TOKEN }}
      approvers: security-team,cto
      
  - name: Deploy to production
    run: hypernative apply --auto-approve
```

## Resource Configuration Best Practices

### Naming Conventions

#### 1. Use Consistent Naming
```yaml
# Use kebab-case for resource names
name: treasury-main-wallet        # ✅ Good
name: Treasury_Main_Wallet        # ❌ Inconsistent
name: treasuryMainWallet          # ❌ camelCase

# Use environment prefixes
name: prod-treasury-main          # ✅ Clear environment
name: staging-treasury-backup     # ✅ Clear environment
```

#### 2. Hierarchical Organization
```yaml
# Group related resources
name: protocol-treasury-main
name: protocol-treasury-backup
name: protocol-operations-daily
name: protocol-operations-monthly

# Or use tags for grouping
tags: ["protocol", "treasury", "critical"]
tags: ["protocol", "operations", "routine"]
```

### Resource Documentation

#### 1. Comprehensive Descriptions
```yaml
name: treasury-large-transfers
description: |
  Monitor treasury wallets for transfers exceeding $100,000 USD.
  
  This agent helps ensure large transfers are properly authorized
  and documented. Alerts are sent to both security team and 
  executive team for awareness and approval tracking.
  
  Monitoring includes:
  - Outbound transfers from main treasury wallets
  - Cross-chain bridge transactions
  - Multi-signature wallet transactions
  
  Response procedures:
  - Verify transaction was authorized
  - Check against planned operations
  - Escalate if unauthorized
  
threshold: 100000
tags: ["treasury", "high-value", "requires-approval"]
```

#### 2. Change Documentation
```bash
# Document changes in git commits
git commit -m "Add treasury monitoring for new wallet

- Monitor 0x123... for large transfers  
- Set $50k threshold for executive alerts
- Include Polygon network in monitoring
- Refs: SECURITY-123"
```

### Alert Configuration

#### 1. Avoid Alert Fatigue
```yaml
# ❌ Bad: Too many low-value alerts
threshold: 100  # $100 - will generate noise

# ✅ Good: Meaningful thresholds
thresholds:
  critical: 1000000    # $1M - immediate attention
  high: 100000         # $100k - prompt review
  medium: 10000        # $10k - daily review
  
# Rate limiting to prevent spam
rate_limit:
  max_alerts_per_hour: 5
  suppress_duplicates: true
  cooldown_minutes: 30
```

#### 2. Use Appropriate Notification Channels
```yaml
# Critical alerts - immediate attention
notification_channels: ["slack-security", "email-executives", "pager-duty"]
severity: critical

# Informational alerts - periodic review
notification_channels: ["discord-community", "slack-general"]
severity: low
```

#### 3. Context-Rich Alerts
```yaml
message_template: |
  🚨 *Large Transfer Alert*
  
  *Amount:* ${{amount_usd}} ({{amount}} {{token}})
  *From:* {{from_address}} ({{from_name}})
  *To:* {{to_address}} ({{to_name}}) 
  *Chain:* {{chain}}
  
  *Transaction:* <{{explorer_url}}|{{tx_hash}}>
  *Block:* {{block_number}} | *Gas:* {{gas_used}}
  
  *Risk Score:* {{risk_score}}/100
  *Previous Activity:* {{previous_activity_summary}}
  
  *Action Required:* 
  - [ ] Verify authorization
  - [ ] Check against planned operations  
  - [ ] Update stakeholders
```

## Operational Best Practices

### Change Management

#### 1. Always Plan Before Applying
```bash
# ❌ Bad: Apply without reviewing
hypernative apply --auto-approve

# ✅ Good: Review changes first
hypernative plan
# Review output carefully
hypernative apply
```

#### 2. Use Staging Environments
```bash
# Test in staging first
hypernative apply --profile staging

# Verify functionality
# Monitor for issues
# Then deploy to production

hypernative apply --profile production
```

#### 3. Document Changes
```yaml
# Add change documentation
metadata:
  last_updated: "2024-01-15"
  updated_by: "security-team"
  change_reason: "Added monitoring for new treasury wallet"
  approval_ticket: "SEC-123"
  review_date: "2024-04-15"
```

### Monitoring Configuration Health

#### 1. Regular Health Checks
```bash
# Weekly health check
hypernative doctor --verbose

# Configuration drift detection
hypernative plan --json | jq '.summary'

# Resource audit
hypernative state show | jq '.resources | keys'
```

#### 2. Performance Monitoring
```bash
# Monitor plan/apply performance
time hypernative plan

# Check API rate limit status
hypernative doctor --verbose | grep "Rate limit"

# Monitor resource counts
hypernative plan --json | jq '.metadata.resource_counts'
```

#### 3. Alert on Configuration Issues
Set up monitoring for the CLI itself:

```yaml
# Monitor CLI failures in CI/CD
name: cli-health-monitor
type: system_monitor
configuration:
  check_interval: "1h"
  failure_threshold: 3
  metrics:
    - cli_plan_success_rate
    - cli_apply_success_rate
    - api_connectivity_uptime
notification_channels: ["ops-alerts"]
```

### Team Collaboration

#### 1. Code Review for Configuration Changes
```bash
# Use pull requests for all changes
git checkout -b add-treasury-monitoring
# Make changes
git add . && git commit -m "Add treasury monitoring"
git push origin add-treasury-monitoring
# Create pull request
```

#### 2. Shared Responsibility Model
- **Security Team**: Reviews all critical alerts and thresholds
- **DevOps Team**: Manages CI/CD and operational monitoring
- **Development Team**: Maintains agent configurations and testing
- **Executive Team**: Approves high-value alert configurations

#### 3. Documentation Standards
```yaml
# Required fields for all resources
name: descriptive-resource-name
description: |
  Clear description of what this resource does,
  why it exists, and how it should be maintained.
  
  Owner: team-name
  Contact: team-email@company.com
  Documentation: https://wiki.company.com/monitoring/resource-name
  
tags: ["team:security", "env:production", "priority:critical"]
metadata:
  owner: "security-team"
  contact: "security@company.com"
  created: "2024-01-01"
  review_frequency: "quarterly"
```

## Performance Best Practices

### Configuration Optimization

#### 1. Resource Organization
```bash
# ✅ Good: Organized by environment/function
hypernative/
├── staging/
│   ├── watchlists/
│   └── agents/
└── production/
    ├── watchlists/
    └── agents/

# Deploy specific environments
hypernative apply --config staging/
hypernative apply --config production/
```

#### 2. Concurrency Management
```bash
# For large configurations
hypernative apply --concurrency 3

# For rate-limited APIs
hypernative apply --concurrency 1

# Monitor performance
time hypernative apply --debug
```

#### 3. Resource Batching
```yaml
# ❌ Bad: Many small watchlists
# treasury-wallet-1.yaml (1 address)
# treasury-wallet-2.yaml (1 address)  
# treasury-wallet-3.yaml (1 address)

# ✅ Good: Logical grouping
# treasury-wallets.yaml (all treasury addresses)
assets:
  - address: "0x111..." 
  - address: "0x222..."
  - address: "0x333..."
```

## Security Hardening

### Network Security

#### 1. API Endpoint Validation
```bash
# Always use HTTPS
export HN_BASE_URL="https://api.hypernative.com"  # ✅ Secure
export HN_BASE_URL="http://api.hypernative.com"   # ❌ Insecure

# Verify SSL certificates
curl -I https://api.hypernative.com
```

#### 2. Firewall Configuration
```bash
# Allow outbound HTTPS to Hypernative API
# Block unnecessary inbound connections
# Use VPN for remote team access
```

### Audit and Compliance

#### 1. Audit Trail
```bash
# Enable audit logging
export HYPERNATIVE_AUDIT=true

# Log all CLI operations
hypernative apply --debug 2>&1 | tee deployment.log

# Store logs securely
aws s3 cp deployment.log s3://audit-bucket/hypernative/$(date +%Y/%m/%d)/
```

#### 2. Change Approval Process
```yaml
# Document approval in configurations
metadata:
  approvals:
    - approver: "security-lead"
      timestamp: "2024-01-15T10:00:00Z"
      ticket: "SEC-123"
    - approver: "cto"
      timestamp: "2024-01-15T11:00:00Z"  
      ticket: "SEC-123"
```

#### 3. Regular Security Reviews
- **Monthly**: Review alert thresholds and effectiveness
- **Quarterly**: Audit API key permissions and usage
- **Annually**: Complete security assessment of monitoring setup

## Error Prevention

### Common Mistakes to Avoid

#### 1. Configuration Errors
```yaml
# ❌ Common mistakes
name: "treasury wallet"        # Spaces in names cause issues
webhook_url: $SLACK_WEBHOOK    # Missing ${} syntax
threshold: "100000"            # Numbers as strings
enabled: yes                   # Use true/false, not yes/no

# ✅ Correct format
name: treasury-wallet
webhook_url: ${SLACK_WEBHOOK_URL}
threshold: 100000
enabled: true
```

#### 2. Resource Naming Conflicts
```bash
# ❌ Bad: Same names in different files
# file1.yaml: name: "alerts"
# file2.yaml: name: "alerts"

# ✅ Good: Unique descriptive names
# slack-critical.yaml: name: "slack-critical-alerts"
# email-alerts.yaml: name: "email-executive-alerts"
```

#### 3. Environment Variable Issues
```bash
# ❌ Bad: Variables not set
export SLACK_URL=  # Empty value

# ✅ Good: Verify variables
echo $SLACK_WEBHOOK_URL  # Should show URL
hypernative doctor       # Validates all variables
```

### Pre-Deployment Checklist

- [ ] Configuration passes `hypernative plan`
- [ ] All environment variables are set
- [ ] Changes reviewed by appropriate team
- [ ] Tested in staging environment
- [ ] State file backed up
- [ ] Rollback plan prepared
- [ ] Team notified of deployment
- [ ] Monitoring verified post-deployment

## Maintenance Best Practices

### Regular Maintenance Tasks

#### Weekly
- [ ] Run `hypernative doctor` to check system health
- [ ] Review alert effectiveness and adjust thresholds
- [ ] Check for configuration drift with `hypernative plan`

#### Monthly  
- [ ] Review and update resource descriptions
- [ ] Audit notification channel effectiveness
- [ ] Update dependencies: `npm update -g @hypernative/cli`
- [ ] Clean up unused resources

#### Quarterly
- [ ] Rotate API credentials
- [ ] Review and update security settings
- [ ] Performance optimization review
- [ ] Team training on new features

#### Annually
- [ ] Complete security audit
- [ ] Review disaster recovery procedures
- [ ] Update operational documentation
- [ ] Strategic monitoring plan review

These practices will help you maintain a secure, reliable, and efficient Hypernative monitoring setup.