# DeFi Protocol Monitoring Sample

Comprehensive monitoring configuration for a DeFi protocol including treasury management, smart contract monitoring, and multi-channel alerting.

## What's Included

### Watchlists
- **Treasury Wallets**: Monitor multiple treasury addresses
- **Smart Contracts**: Monitor core protocol contracts  
- **Multisig Wallets**: Monitor governance and admin wallets

### Notification Channels
- **Slack Critical**: High-priority alerts for immediate attention
- **Slack General**: General monitoring updates
- **Discord**: Community notifications
- **Email**: Executive team alerts

### Custom Agents
- **Large Treasury Movements**: Alert on movements >$500k
- **Contract Upgrades**: Monitor proxy contract upgrades  
- **Governance Votes**: Track governance proposal activity
- **Liquidity Monitoring**: Alert on significant liquidity changes

## Setup

1. Copy this directory to your project location
2. Set environment variables:
   ```bash
   export HN_CLIENT_ID="your_client_id"
   export HN_CLIENT_SECRET="your_client_secret"
   export SLACK_CRITICAL_WEBHOOK="https://hooks.slack.com/services/..."
   export SLACK_GENERAL_WEBHOOK="https://hooks.slack.com/services/..."
   export DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/..."
   export SMTP_SERVER="smtp.your-domain.com"
   export SMTP_USERNAME="alerts@your-domain.com"
   export SMTP_PASSWORD="your-smtp-password"
   ```

3. Update addresses in all configuration files with your actual contract and wallet addresses

4. Deploy:
   ```bash
   hypernative plan
   hypernative apply
   ```