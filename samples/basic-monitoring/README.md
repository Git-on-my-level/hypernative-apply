# Basic Monitoring Sample

A simple configuration for monitoring wallet activity with Slack notifications.

## What's Included

- **Watchlist**: Monitor a treasury wallet for transaction activity
- **Notification Channel**: Slack integration for alerts
- **Custom Agent**: Alert on large transactions (>$100k)

## Setup

1. Copy this directory to your project location
2. Set environment variables:
   ```bash
   export HN_CLIENT_ID="your_client_id"
   export HN_CLIENT_SECRET="your_client_secret"
   export SLACK_WEBHOOK_URL="https://hooks.slack.com/services/..."
   ```

3. Update the wallet address in `hypernative/watchlists/treasury-wallet.yaml`

4. Deploy:
   ```bash
   hypernative plan
   hypernative apply
   ```

## Configuration Files

- `hypernative/config.yaml` - Global configuration
- `hypernative/watchlists/treasury-wallet.yaml` - Main wallet to monitor
- `hypernative/notification-channels/slack-alerts.yaml` - Slack notification setup
- `hypernative/custom-agents/large-transaction-alert.yaml` - Alert on large transactions