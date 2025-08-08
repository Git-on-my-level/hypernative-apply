# Sample Configurations

This directory contains sample configurations for common Hypernative use cases. Use these as starting points for your own configurations.

## Getting Started

1. Copy a sample directory to your project:
   ```bash
   cp -r samples/basic-monitoring ./my-config
   cd my-config
   ```

2. Update the configurations with your specific values (addresses, webhook URLs, etc.)

3. Set up your environment variables:
   ```bash
   export HN_CLIENT_ID="your_client_id"
   export HN_CLIENT_SECRET="your_client_secret"
   export SLACK_WEBHOOK_URL="https://hooks.slack.com/services/..."
   ```

4. Test the configuration:
   ```bash
   hypernative plan
   hypernative apply
   ```

## Available Samples

### [basic-monitoring/](./basic-monitoring/)
Simple watchlist and Slack notification setup for monitoring wallet activity.

### [defi-protocol-monitoring/](./defi-protocol-monitoring/)
Comprehensive monitoring for a DeFi protocol including:
- Treasury wallet monitoring
- Smart contract monitoring  
- Large transaction alerts
- Multi-channel notifications (Slack, Discord, email)

### [multi-environment/](./multi-environment/)
Example of managing staging and production environments with shared configurations.

### [custom-agents-advanced/](./custom-agents-advanced/)
Advanced custom agent configurations for complex monitoring scenarios.

## Best Practices

1. **Environment Variables**: Always use environment variables for secrets like webhook URLs and API keys
2. **Descriptive Names**: Use clear, descriptive names for your resources
3. **Documentation**: Add descriptions to all your configurations
4. **Testing**: Test in a staging environment before applying to production
5. **Version Control**: Commit your configurations and `.hypernative/state.json` to version control