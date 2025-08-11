# Hypernative CLI

[![Version](https://img.shields.io/npm/v/@hypernative/cli)](https://www.npmjs.com/package/@hypernative/cli)
[![Node Version](https://img.shields.io/node/v/@hypernative/cli)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Define your Hypernative configuration as code and safely synchronize it with the Hypernative platform. Think "terraform plan/apply" but for blockchain security and monitoring resources.

## Features

- **Infrastructure as Code**: Define monitoring configurations in YAML files
- **Plan & Apply Workflow**: Review changes before they happen, then apply idempotently  
- **State Management**: Automatic drift detection and conflict resolution
- **Environment Variables**: Secure secret interpolation with `${VAR_NAME}` syntax
- **Validation**: Schema validation with detailed error reporting
- **Rate Limiting**: Built-in API rate limiting with automatic backoff
- **CI/CD Ready**: Machine-readable JSON output and proper exit codes

## Supported Resources

- **Watchlists**: Monitor addresses, smart contracts, and transaction patterns
- **Custom Agents**: Define custom monitoring logic and alerts  
- **Notification Channels**: Configure Slack, Discord, email, and webhook notifications

## Installation

### From npm (Recommended)
```bash
npm install -g @hypernative/cli
# or
yarn global add @hypernative/cli
# or  
pnpm add -g @hypernative/cli
```

### From Source
```bash
git clone https://github.com/hypernative/cli.git
cd cli
npm install
npm run build
npm link
```

### Verify Installation
```bash
hypernative --version
hypernative --help
```

## Quick Start

### 1. Initialize a Project
```bash
mkdir my-hypernative-config
cd my-hypernative-config
hypernative init --yes
```

### 2. Configure Authentication
Set environment variables:
```bash
export HN_CLIENT_ID="your_client_id"
export HN_CLIENT_SECRET="your_client_secret"
```

Or create a profile in `~/.hypernative/config.yaml`:
```yaml
profiles:
  default:
    client_id: "your_client_id"
    client_secret: "your_client_secret"
    base_url: "https://api.hypernative.com"
```

### 3. Verify Setup
```bash
hypernative doctor
```

### 4. Plan and Apply
```bash
# Preview changes
hypernative plan

# Apply changes
hypernative apply
```

## Project Structure

After running `hypernative init`, you'll have:

```
my-project/
├── hypernative/
│   ├── config.yaml              # Global configuration
│   ├── watchlists/
│   │   └── example-watchlist.yaml
│   ├── notification-channels/
│   │   └── example-channel.yaml
│   └── custom-agents/
│       └── example-agent.yaml
└── .hypernative/
    └── state.json              # Managed state file
```

## Configuration Examples

### Watchlist Configuration
```yaml
# hypernative/watchlists/treasury.yaml
name: Treasury Wallets
description: Monitor treasury wallet activity
assets:
  - chain: ethereum
    type: Wallet
    address: "0x1234567890123456789012345678901234567890"
  - chain: polygon
    type: Contract
    address: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd"
alert_config:
  notification_channels: ["treasury-alerts"]
  severity: medium
enabled: true
```

### Notification Channel Configuration
```yaml
# hypernative/notification-channels/slack-alerts.yaml
name: treasury-alerts
type: slack
description: Treasury monitoring alerts
config:
  webhook_url: ${SLACK_WEBHOOK_URL}
  channel: "#security-alerts"
  username: "Hypernative"
  icon_emoji: ":shield:"
enabled: true
```

### Custom Agent Configuration
```yaml
# hypernative/custom-agents/large-transfers.yaml
name: Large Transfer Monitor
description: Alert on transfers above threshold
type: transaction_monitor
chain: ethereum
configuration:
  threshold:
    amount: 1000000
    token: USDC
  contracts:
    - "0x1234567890123456789012345678901234567890"
  severity: high
notification_channels:
  - "treasury-alerts"
enabled: true
```

## CLI Commands

### Core Commands

#### `hypernative init`
Initialize a new project with example configurations.

```bash
hypernative init [options]

Options:
  --yes          Skip confirmation and create files immediately
  --force        Overwrite existing files
  -h, --help     Display help
```

#### `hypernative plan`
Preview changes that would be applied.

```bash
hypernative plan [options]

Options:
  --json         Output in JSON format
  --debug        Enable debug logging
  -h, --help     Display help
```

Example output:
```
Plan: 2 to add, 1 to change, 0 to delete

+ notification-channel.treasury-alerts
+ watchlist.treasury-wallets
~ custom-agent.large-transfers
  ├─ enabled: false → true
  └─ threshold: 500000 → 1000000
```

#### `hypernative apply`
Apply the configuration changes.

```bash
hypernative apply [options]

Options:
  --auto-approve Skip confirmation prompt
  --json         Output in JSON format  
  --debug        Enable debug logging
  --concurrency  Max parallel operations (default: 5)
  -h, --help     Display help
```

#### `hypernative doctor`
Run system diagnostics and health checks.

```bash
hypernative doctor [options]

Options:
  --verbose      Show detailed diagnostic information
  -h, --help     Display help
```

Checks include:
- Node.js version compatibility
- API connectivity and authentication
- Configuration file validation
- Network connectivity
- Dependency verification

### Global Options

```bash
Options:
  --base-url <url>      API base URL (default: https://api.hypernative.com)
  --profile <name>      Use named profile from config
  --config <path>       Path to configuration directory
  --debug               Enable debug logging
  --json                Output in JSON format
  --no-color            Disable colored output
  -h, --help            Display help
  -V, --version         Display version
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `HN_CLIENT_ID` | Hypernative API client ID | Yes* |
| `HN_CLIENT_SECRET` | Hypernative API client secret | Yes* |
| `HN_BASE_URL` | API base URL | No |
| `HN_PROFILE` | Profile name to use | No |
| `NO_COLOR` | Disable colored output | No |
| `DEBUG` | Enable debug logging | No |

*Required unless using profiles in `~/.hypernative/config.yaml`

## State Management

The CLI maintains state in `.hypernative/state.json` to:
- Map logical resource names to remote IDs
- Track resource fingerprints for drift detection  
- Prevent concurrent operations with file locking
- Enable idempotent operations

**Important**: Commit `.hypernative/state.json` to version control for team collaboration.

## CI/CD Integration

### GitHub Actions Example
```yaml
name: Hypernative Deploy
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  hypernative:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install Hypernative CLI
        run: npm install -g @hypernative/cli
        
      - name: Run diagnostics
        run: hypernative doctor --verbose
        env:
          HN_CLIENT_ID: ${{ secrets.HN_CLIENT_ID }}
          HN_CLIENT_SECRET: ${{ secrets.HN_CLIENT_SECRET }}
          
      - name: Plan changes
        run: hypernative plan --json
        env:
          HN_CLIENT_ID: ${{ secrets.HN_CLIENT_ID }}
          HN_CLIENT_SECRET: ${{ secrets.HN_CLIENT_SECRET }}
          
      - name: Apply changes
        if: github.ref == 'refs/heads/main'
        run: hypernative apply --auto-approve --json
        env:
          HN_CLIENT_ID: ${{ secrets.HN_CLIENT_ID }}
          HN_CLIENT_SECRET: ${{ secrets.HN_CLIENT_SECRET }}
```

### Exit Codes
- `0`: Success, no changes
- `1`: General error
- `2`: Changes detected (useful for CI plan checks)
- `3`: Authentication error
- `4`: Configuration error
- `5`: API error

## Troubleshooting

### Common Issues

**Authentication Errors**
```bash
# Check credentials
hypernative doctor --verbose

# Test API connectivity
export DEBUG=1
hypernative plan --debug
```

**Schema Validation Errors**
```bash
# Get detailed validation errors
hypernative plan --debug

# Check specific file
yaml-lint hypernative/watchlists/my-watchlist.yaml
```

**Rate Limiting (429 errors)**
- The CLI automatically handles rate limiting with exponential backoff
- Reduce concurrency: `hypernative apply --concurrency 2`
- Check rate limit status: `hypernative doctor --verbose`

**State File Issues**
```bash
# Reset state (caution: may cause resource duplication)
rm .hypernative/state.json
hypernative plan  # Review carefully before applying
```

### Debug Mode
Enable debug logging for detailed information:
```bash
export DEBUG=1
hypernative plan --debug
```

Debug output includes:
- HTTP request/response details (secrets redacted)
- Request timing and rate limit headers
- Configuration loading steps
- State management operations

## Advanced Usage

### Environment Variable Substitution
Securely inject secrets and environment-specific values:

```yaml
# notification-channels/production-slack.yaml
name: production-alerts
type: slack
config:
  webhook_url: ${SLACK_PRODUCTION_WEBHOOK}
  channel: ${SLACK_CHANNEL:-#alerts}  # Default value
  environment: ${DEPLOY_ENV}
```

### Multi-Environment Setup
```bash
# Directory structure
project/
├── environments/
│   ├── staging/
│   │   └── hypernative/
│   └── production/
│       └── hypernative/
└── shared/
    └── notification-channels/

# Deploy to staging
hypernative apply --config environments/staging

# Deploy to production  
hypernative apply --config environments/production
```

### Profiles for Team Management
```yaml
# ~/.hypernative/config.yaml
profiles:
  staging:
    client_id: "staging_client_id"
    client_secret: "staging_client_secret"
    base_url: "https://api-staging.hypernative.com"
    
  production:
    client_id: "prod_client_id"
    client_secret: "prod_client_secret"
    base_url: "https://api.hypernative.com"
```

```bash
hypernative plan --profile staging
hypernative apply --profile production
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
```bash
git clone https://github.com/hypernative/cli.git
cd cli
npm install
npm run build
npm link

# Run tests
npm test
npm run test:e2e

# Format code
npm run format
npm run lint
```

## Support

- 📖 [Documentation](https://docs.hypernative.com/cli)
- 💬 [Discord Community](https://discord.gg/hypernative)
- 🐛 [Report Issues](https://github.com/hypernative/cli/issues)
- 📧 [Email Support](mailto:support@hypernative.io)

## License

MIT © [Hypernative](https://hypernative.io)

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for release history and migration guides.