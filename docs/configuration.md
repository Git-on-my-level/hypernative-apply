# Configuration Guide

Complete reference for configuring the Hypernative CLI and defining your monitoring resources.

## Configuration Structure

The Hypernative CLI uses a directory-based configuration approach:

```
hypernative/
├── config.yaml                 # Global configuration
├── watchlists/                 # Watchlist definitions
│   ├── treasury.yaml
│   └── contracts.yaml
├── notification-channels/      # Notification channel definitions  
│   ├── slack-critical.yaml
│   └── email-alerts.yaml
└── custom-agents/             # Custom monitoring agents
    ├── large-transfers.yaml
    └── contract-monitoring.yaml
```

## Global Configuration

### config.yaml

The main configuration file that defines global settings:

```yaml
# Required
version: 1
api:
  endpoint: "https://api.hypernative.com"
  timeout: 30000

# Optional global settings
global:
  default_severity: medium
  enable_notifications: true
  protocol_name: "My Protocol"
  
  # Rate limiting
  rate_limit:
    requests_per_minute: 60
    burst_limit: 10
    
  # Default chains to monitor
  default_chains:
    - ethereum
    - polygon
    - arbitrum

# Resource collections (populated by individual files)
watchlists: []
notification_channels: []
custom_agents: []
```

### Configuration Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `version` | number | Yes | Configuration schema version (currently 1) |
| `api.endpoint` | string | Yes | Hypernative API endpoint URL |
| `api.timeout` | number | No | Request timeout in milliseconds (default: 30000) |
| `global.*` | object | No | Global settings that apply to all resources |

## Resource Configuration

### Watchlists

Monitor blockchain addresses, contracts, and assets.

```yaml
# hypernative/watchlists/treasury.yaml
name: Treasury Monitoring
description: Monitor main treasury wallets
assets:
  - chain: ethereum
    type: Wallet
    address: "0x1234567890123456789012345678901234567890"
    tags: ["treasury", "critical"]
    
  - chain: ethereum  
    type: Contract
    address: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd"
    tags: ["core", "proxy"]
    
alert_config:
  notification_channels: ["slack-critical"]
  severity: high
  conditions:
    - type: transaction_threshold
      amount: 50000
      currency: USD
    - type: balance_change
      percentage: 10
      
enabled: true
```

#### Watchlist Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Unique name for the watchlist |
| `description` | string | No | Human-readable description |
| `assets` | array | Yes | List of blockchain assets to monitor |
| `assets[].chain` | string | Yes | Blockchain network (ethereum, polygon, etc.) |
| `assets[].type` | string | Yes | Asset type (Wallet, Contract) |
| `assets[].address` | string | Yes | Blockchain address |
| `assets[].tags` | array | No | Tags for organization |
| `alert_config` | object | No | Alert configuration |
| `enabled` | boolean | No | Whether watchlist is active (default: true) |

### Notification Channels

Configure how and where alerts are sent.

#### Slack Channel
```yaml
# hypernative/notification-channels/slack-critical.yaml
name: slack-critical
type: slack
description: Critical security alerts
config:
  webhook_url: ${SLACK_WEBHOOK_URL}
  channel: "#security-critical"
  username: "Hypernative Alert"
  icon_emoji: ":rotating_light:"
  mention_channel: true  # @channel for critical alerts
  mention_users: ["@security-team"]
  
  # Message customization
  message_template: |
    🚨 *{{severity}} Alert* 🚨
    
    *{{alert_title}}*
    {{alert_description}}
    
    *Chain:* {{chain}}
    *Address:* `{{address}}`
    {{#if tx_hash}}*Transaction:* <https://etherscan.io/tx/{{tx_hash}}|View>{{/if}}
    
enabled: true
```

#### Email Channel
```yaml
# hypernative/notification-channels/email-executives.yaml
name: email-executives
type: email
description: Executive team email alerts
config:
  smtp_server: ${SMTP_SERVER}
  smtp_port: 587
  smtp_security: tls
  smtp_username: ${SMTP_USERNAME}
  smtp_password: ${SMTP_PASSWORD}
  
  from_email: "alerts@yourprotocol.com"
  from_name: "Protocol Security"
  
  recipients:
    - email: "ceo@yourprotocol.com"
      name: "CEO"
      alert_types: ["critical", "treasury"]
    - email: "security@yourprotocol.com"
      name: "Security Team"
      alert_types: ["all"]
      
  email_template:
    subject: "[{{severity}}] {{protocol_name}}: {{alert_title}}"
    html_body: |
      <h2>Security Alert</h2>
      <p><strong>{{alert_title}}</strong></p>
      <p>{{alert_description}}</p>
      <p>Chain: {{chain}}<br>
      Address: <code>{{address}}</code></p>
      
enabled: true
```

#### Discord Channel
```yaml
# hypernative/notification-channels/discord-community.yaml  
name: discord-community
type: discord
description: Community transparency notifications
config:
  webhook_url: ${DISCORD_WEBHOOK_URL}
  username: "Protocol Monitor"
  avatar_url: "https://yourprotocol.com/logo.png"
  
  embed_config:
    color: 0xff6b35  # Orange color
    footer_text: "Hypernative Monitoring"
    
  filters:
    min_severity: medium
    alert_types: ["governance", "treasury", "public"]
    
enabled: true
```

#### Webhook Channel
```yaml
# hypernative/notification-channels/custom-webhook.yaml
name: custom-webhook
type: webhook
description: Custom webhook integration
config:
  url: ${WEBHOOK_URL}
  method: POST
  headers:
    Authorization: "Bearer ${WEBHOOK_TOKEN}"
    Content-Type: "application/json"
    
  payload_template: |
    {
      "alert_type": "{{alert_type}}",
      "severity": "{{severity}}",
      "title": "{{alert_title}}",
      "description": "{{alert_description}}",
      "chain": "{{chain}}",
      "address": "{{address}}",
      "timestamp": "{{timestamp}}",
      "tx_hash": "{{tx_hash}}"
    }
    
  retry_config:
    max_retries: 3
    backoff_multiplier: 2
    
enabled: true
```

### Custom Agents

Define custom monitoring logic and automated responses.

```yaml
# hypernative/custom-agents/large-transfers.yaml
name: Large Transfer Monitor
description: Alert on large token transfers
type: transaction_monitor
chain: ethereum
configuration:
  # Transaction monitoring
  threshold:
    amount: 100000
    currency: USD
    
  # Addresses to monitor
  addresses:
    - "0x1234567890123456789012345678901234567890"
    
  # Tokens to include
  tokens:
    - "USDC"
    - "USDT"
    - "WETH"
    - "*"  # All tokens
    
  # Transaction direction
  direction: both  # in, out, or both
  
  # Alert conditions
  conditions:
    - type: single_transaction
      operator: gte
      threshold: 100000
      
    - type: cumulative_amount
      timeframe: "1h"
      operator: gte  
      threshold: 500000
      
  # Advanced settings
  settings:
    include_failed_transactions: false
    gas_limit_threshold: 1000000
    ignore_internal_transfers: true
    
notification_channels:
  - "slack-critical"
  - "email-executives"
  
enabled: true
```

## Environment Variables

Use environment variables for secrets and environment-specific values:

```yaml
# Example using environment variables
config:
  webhook_url: ${SLACK_WEBHOOK_URL}
  api_key: ${API_KEY}
  environment: ${DEPLOY_ENV:-staging}  # Default value
  timeout: ${API_TIMEOUT:-30000}       # Numeric default
```

### Supported Syntax
- `${VAR_NAME}` - Required variable, fails if not set
- `${VAR_NAME:-default}` - Optional variable with default value
- Variables are substituted at runtime
- Secrets are automatically redacted in logs

## Validation

The CLI validates all configuration files using JSON Schema:

### Schema Validation
- **Structure**: Required fields and data types
- **References**: Cross-resource references (e.g., notification channels)
- **Business Logic**: Resource-specific validation rules
- **Format**: Address formats, URL validation, etc.

### Validation Errors
```bash
hypernative plan --debug
```

Example error output:
```
Configuration validation failed with 2 errors:
  hypernative/watchlists/treasury.yaml (watchlist: treasury): assets.0.address: Invalid Ethereum address format
  hypernative/custom-agents/monitor.yaml (custom_agent: monitor): notification_channels: Referenced notification channel 'alerts' not found
```

## Advanced Configuration

### Multi-Document YAML
Some resources support multiple definitions in a single file:

```yaml
# hypernative/notification-channels/all-channels.yaml
---
name: slack-critical
type: slack
config:
  webhook_url: ${SLACK_CRITICAL_WEBHOOK}
  channel: "#critical"
enabled: true

---
name: slack-general  
type: slack
config:
  webhook_url: ${SLACK_GENERAL_WEBHOOK}
  channel: "#general"
enabled: true
```

### Conditional Configuration
Use environment variables for conditional settings:

```yaml
# Different settings per environment
name: treasury-monitor
enabled: ${ENABLE_MONITORING:-true}
configuration:
  threshold: ${ALERT_THRESHOLD:-100000}
  debug_mode: ${DEBUG_MODE:-false}
notification_channels:
  - ${NOTIFICATION_CHANNEL:-slack-alerts}
```

### Resource Tagging
Organize resources with tags:

```yaml
assets:
  - chain: ethereum
    type: Wallet
    address: "0x123..."
    tags: ["treasury", "critical", "ethereum"]
    metadata:
      owner: "treasury-team"
      environment: "production"
      created: "2024-01-01"
```

## Configuration Best Practices

1. **Use Descriptive Names**: Make resource names clear and consistent
2. **Leverage Environment Variables**: Keep secrets out of configuration files
3. **Start Simple**: Begin with basic configurations and add complexity gradually
4. **Test Thoroughly**: Always run `hypernative plan` before `apply`
5. **Version Control**: Commit configurations and state files
6. **Document Changes**: Add descriptions to all resources
7. **Use Tags**: Organize resources with consistent tagging

## File Naming Conventions

- Use kebab-case for file names: `treasury-wallets.yaml`
- Use descriptive names that match the resource purpose
- Group related resources in the same file when appropriate
- Use environment prefixes for multi-environment setups: `prod-treasury.yaml`

## Next Steps

- [Authentication Setup](./authentication.md) - Detailed auth configuration
- [Resource Types](./resource-types.md) - Complete resource reference  
- [Best Practices](./best-practices.md) - Security recommendations
- [Troubleshooting](./troubleshooting.md) - Common issues and solutions