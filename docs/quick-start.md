# Quick Start Guide

Get up and running with Hypernative CLI in 5 minutes.

## Prerequisites

- Node.js 18+ 
- Hypernative API credentials (client ID and secret)
- Basic understanding of YAML configuration files

## Step 1: Install the CLI

```bash
npm install -g @hypernative/cli

# Verify installation
hypernative --version
```

## Step 2: Initialize a Project

```bash
mkdir my-monitoring
cd my-monitoring
hypernative init --yes
```

This creates:
```
my-monitoring/
├── hypernative/
│   ├── config.yaml
│   ├── watchlists/example-watchlist.yaml
│   ├── notification-channels/example-channel.yaml
│   └── custom-agents/example-agent.yaml
└── .hypernative/
    └── state.json
```

## Step 3: Set Up Authentication

### Option A: Environment Variables (Recommended)
```bash
export HN_CLIENT_ID="your_client_id_here"
export HN_CLIENT_SECRET="your_client_secret_here"
```

### Option B: Profile Configuration  
Create `~/.hypernative/config.yaml`:
```yaml
profiles:
  default:
    client_id: "your_client_id_here"
    client_secret: "your_client_secret_here"
    base_url: "https://api.hypernative.com"
```

## Step 4: Verify Setup

```bash
hypernative doctor
```

Expected output:
```
🔍 Running Hypernative CLI diagnostics...

📋 Diagnostic Results:

✅ Node.js Version: Node.js v18.17.0 (supported)
✅ Dependencies: All critical dependencies available  
✅ File Permissions: Read/write permissions available
⚠️  Configuration: Configuration directory found but no resources defined
✅ Authentication: Credentials configured
✅ Network Connectivity: Internet connectivity available
✅ API Connectivity: Connected to https://api.hypernative.com

⚠️  1 warning(s), 6 passed
```

## Step 5: Customize Your Configuration

### Update Notification Channel
Edit `hypernative/notification-channels/example-channel.yaml`:

```yaml
name: my-slack-alerts
type: slack
description: "My project security alerts"
config:
  webhook_url: "https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK"
  channel: "#security-alerts"
  username: "Security Bot"
enabled: true
```

### Update Watchlist
Edit `hypernative/watchlists/example-watchlist.yaml`:

```yaml
name: my-treasury-wallet
description: "Monitor treasury wallet activity"
assets:
  - chain: ethereum
    type: Wallet
    address: "0xYOUR_WALLET_ADDRESS_HERE"
alert_config:
  notification_channels: ["my-slack-alerts"]
  severity: medium
enabled: true
```

## Step 6: Deploy Your Configuration

### Preview Changes
```bash
hypernative plan
```

Expected output:
```
Plan: 2 to add, 0 to change, 0 to delete

+ notification-channel.my-slack-alerts
+ watchlist.my-treasury-wallet
```

### Apply Changes
```bash
hypernative apply
```

Expected output:
```
Applying plan: 2 to add, 0 to change, 0 to delete

+ notification-channel.my-slack-alerts ... created
+ watchlist.my-treasury-wallet ... created

Apply complete! 2 resources created, 0 updated, 0 deleted.
```

## Step 7: Test Your Setup

Send a test notification:
```bash
# Test notification channel (if supported by the API)
hypernative test notification-channel my-slack-alerts
```

Monitor the logs to verify everything is working:
```bash
hypernative plan --debug
```

## What's Next?

### Add More Resources
- **Custom Agents**: Set up automated monitoring rules
- **More Watchlists**: Monitor additional addresses or contracts
- **Multiple Channels**: Set up email, Discord, or webhook notifications

### Advanced Features
- **Environment Variables**: Use `${VAR_NAME}` for secrets and environment-specific values
- **Multi-Environment**: Set up staging and production configurations
- **CI/CD Integration**: Automate deployments with GitHub Actions

### Learn More
- [Configuration Guide](./configuration.md) - Complete configuration reference
- [Best Practices](./best-practices.md) - Security and operational recommendations
- [Troubleshooting](./troubleshooting.md) - Common issues and solutions

## Common Next Steps

1. **Add real addresses**: Replace example addresses with your actual wallets/contracts
2. **Set up Slack**: Create a Slack webhook and update the notification channel
3. **Configure alerts**: Adjust thresholds and severity levels in custom agents
4. **Test thoroughly**: Use `hypernative plan` before every `apply`
5. **Version control**: Commit your configuration and `.hypernative/state.json` to git

## Need Help?

- Run `hypernative doctor --verbose` to diagnose issues
- Check the [Troubleshooting Guide](./troubleshooting.md)
- Join our [Discord Community](https://discord.gg/hypernative)
- Email us at [support@hypernative.io](mailto:support@hypernative.io)