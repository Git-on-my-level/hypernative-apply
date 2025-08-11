# HIGH-001: Fix Init Command Invalid Examples

**Priority:** HIGH  
**Status:** Open  
**Component:** Init Command  
**User Impact:** High (broken first-time experience)

## Description

The example configuration files created by the `hypernative init` command fail schema validation when users run the `hypernative plan` command. This creates a poor first-time user experience where the CLI-generated examples don't work.

### Schema Validation Failures

1. **Notification Channels Missing Configuration Wrapper**:
   - Current example has flat config structure
   - Schema requires `configuration` wrapper object

2. **Custom Agents Have Invalid Type Values**:
   - Example uses undefined agent types
   - Must use valid types from `agentTypeSchema`

3. **Watchlists Missing Required Fields**:
   - Missing required `assets` array
   - Missing required alert configuration

## Root Cause Analysis

1. **Schema Mismatch**: Example templates don't match current Zod schemas
2. **Outdated Templates**: Examples were created before schema evolution
3. **No Validation**: Init command doesn't validate generated examples
4. **Missing Required Fields**: Templates omit required schema fields

## Impact if Not Fixed

- **Broken Onboarding**: New users get immediate validation errors
- **Lost Confidence**: Users think the CLI is broken or unreliable
- **Support Burden**: Increased support requests for "broken" examples
- **Adoption Barrier**: Poor first impression reduces user adoption

## Current Invalid Examples

### Notification Channel (lines 30-38 in init.ts)
**Current (Invalid)**:
```yaml
name: example-slack-channel
type: slack
description: "Example Slack notification channel"
config:  # Should be 'configuration'
  webhook_url: "https://hooks.slack.com/services/YOUR/WEBHOOK/URL"
  channel: "#alerts"
  username: "Hypernative Bot"
enabled: true
```

**Should Be**:
```yaml
name: example-slack-channel
type: slack
description: "Example Slack notification channel"
configuration:  # Wrapped in configuration object
  webhook_url: "https://hooks.slack.com/services/YOUR/WEBHOOK/URL"
  channel: "#alerts"
  username: "Hypernative Bot"
enabled: true
```

### Custom Agent (lines 40-54 in init.ts)
**Current (Invalid)**:
```yaml
name: example-agent
description: "Example custom monitoring agent"
triggers:  # Invalid field
  - event: transaction
    filters:
      - field: amount
        operator: gt
        value: 100000
actions:  # Invalid field
  - type: alert
    severity: high
    message: "Large transaction detected"
enabled: true
```

**Should Be**:
```yaml
name: example-agent
description: "Example custom monitoring agent"
type: large_transaction_monitor  # Required field
chain: ethereum  # Required field
severity: high  # Required field
configuration:  # Agent-specific config
  addresses: ["0x742d35Cc6637C0532D4B8B1D96A4Bb7E6ad77e3A"]
  threshold_value: 100000
  direction: both
enabled: true
```

### Watchlist (lines 18-28 in init.ts)
**Current (Invalid)**:
```yaml
name: example-watchlist
description: "Example watchlist for monitoring"
rules:  # Invalid structure
  - type: balance_threshold
    threshold: 1000000
    token: USDC
  - type: transaction_volume
    threshold: 10000000
    timeframe: "1h"
enabled: true
```

**Should Be**:
```yaml
name: example-watchlist
description: "Example watchlist for monitoring"
enabled: true
assets:  # Required field
  - chain: ethereum
    type: Wallet
    address: "0x742d35Cc6637C0532D4B8B1D96A4Bb7E6ad77e3A"
    name: "Example Wallet"
alert_config:  # Required alert configuration
  severity_threshold: medium
  enabled: true
  rules:
    - conditions:
        - type: balance_change
          threshold: 1000000
          direction: both
      severity: high
      enabled: true
```

## Implementation Steps

### Task 1: Update Notification Channel Template
Fix the configuration structure:
```yaml
'hypernative/notification-channels/example-channel.yaml': `# Example Notification Channel Configuration
name: example-slack-channel
type: slack
description: "Example Slack notification channel"
configuration:
  webhook_url: "https://hooks.slack.com/services/YOUR/WEBHOOK/URL"
  channel: "#alerts"
  username: "Hypernative Bot"
enabled: true
`,
```

### Task 2: Update Custom Agent Template
Fix the agent configuration to match schema:
```yaml
'hypernative/custom-agents/example-agent.yaml': `# Example Custom Agent Configuration
name: example-agent
description: "Example custom monitoring agent"
type: large_transaction_monitor
chain: ethereum
severity: high
enabled: true
configuration:
  addresses: ["0x742d35Cc6637C0532D4B8B1D96A4Bb7E6ad77e3A"]
  threshold_value: 100000
  direction: both
  time_window: "1h"
notification_channels: ["example-slack-channel"]
`,
```

### Task 3: Update Watchlist Template
Fix the watchlist structure to include required fields:
```yaml
'hypernative/watchlists/example-watchlist.yaml': `# Example Watchlist Configuration
name: example-watchlist
description: "Example watchlist for monitoring"
enabled: true
assets:
  - chain: ethereum
    type: Wallet
    address: "0x742d35Cc6637C0532D4B8B1D96A4Bb7E6ad77e3A"
    name: "Example Treasury Wallet"
    tags: ["treasury", "example"]
  - chain: polygon
    type: Contract
    address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
    name: "USDC Contract"
    symbol: "USDC"
alert_config:
  severity_threshold: medium
  notification_channels: ["example-slack-channel"]
  enabled: true
  rules:
    - conditions:
        - type: balance_change
          threshold: 1000000
          direction: decrease
          timeframe: "1h"
      severity: critical
      enabled: true
    - conditions:
        - type: transaction_volume
          threshold: 10000000
          timeframe: "24h"
      severity: high
      enabled: true
`,
```

### Task 4: Add Validation to Init Command
Add schema validation to prevent invalid examples:
```typescript
import { notificationChannelSchema } from '../schemas/notification-channel.schema.js';
import { customAgentSchema } from '../schemas/custom-agent.schema.js';
import { watchlistSchema } from '../schemas/watchlist.schema.js';

// After creating files, validate them
Object.entries(SAMPLE_CONFIG_FILES).forEach(([relativePath, content]) => {
  // ... file creation logic ...
  
  // Validate created files
  if (relativePath.includes('notification-channel')) {
    // Parse and validate notification channel
  } else if (relativePath.includes('custom-agent')) {
    // Parse and validate custom agent
  } else if (relativePath.includes('watchlist')) {
    // Parse and validate watchlist
  }
});
```

## Testing Instructions

### Validation Tests
1. **Schema Compliance Test**:
```bash
# After running init, validate all examples
hypernative init --yes
hypernative plan  # Should not fail with validation errors
```

2. **Example File Tests**:
```typescript
describe('Init Command Examples', () => {
  test('notification channel example should pass schema validation', () => {
    const exampleContent = SAMPLE_CONFIG_FILES['hypernative/notification-channels/example-channel.yaml'];
    const parsed = yaml.parse(exampleContent);
    expect(() => notificationChannelSchema.parse(parsed)).not.toThrow();
  });
  
  test('custom agent example should pass schema validation', () => {
    const exampleContent = SAMPLE_CONFIG_FILES['hypernative/custom-agents/example-agent.yaml'];
    const parsed = yaml.parse(exampleContent);
    expect(() => customAgentSchema.parse(parsed)).not.toThrow();
  });
  
  test('watchlist example should pass schema validation', () => {
    const exampleContent = SAMPLE_CONFIG_FILES['hypernative/watchlists/example-watchlist.yaml'];
    const parsed = yaml.parse(exampleContent);
    expect(() => watchlistSchema.parse(parsed)).not.toThrow();
  });
});
```

### User Experience Tests
1. Run complete init -> plan -> apply flow
2. Test with different interactive mode options
3. Verify all generated examples work out of the box

## Files to Modify
- `/Users/dazheng/workspace/hypernative-apply/src/commands/init.ts` (lines 30-54, update SAMPLE_CONFIG_FILES)

## Success Criteria
- All generated examples pass schema validation
- `hypernative plan` succeeds after `hypernative init`
- No validation errors in first-time user workflow
- Examples demonstrate proper configuration structure

---
Created: 2025-08-09T17:10:25.874Z
