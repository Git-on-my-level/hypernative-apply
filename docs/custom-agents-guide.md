# Custom Agents Implementation Guide

## Overview
This guide documents how to create custom monitoring agents using the Hypernative API, based on learnings from implementing oracle monitoring for dTrinity protocols.

> **Key Discovery**: The Hypernative API supports advanced agent types not available in the CLI, including native oracle monitoring and complex conditional logic.

## Agent Types

### 1. `genericNodeQuery` - Simple Threshold Monitoring
Best for: Direct contract reads with simple comparisons

**Structure:**
```javascript
{
  agentType: "genericNodeQuery",
  chain: "sonic",  // Sonic/Ronin ARE supported via API
  rule: {
    contractAddress: "0x...",
    funcSig: "getPriceInfo(address asset)",
    input: ["0x..."],  // Function parameters
    operator: "gt",    // gt, lt, eq, gte, lte
    operands: ["1000000000000000000"],  // Comparison value
    outputIndex: 0,    // Which output to check
    samplingPeriod: 5,
    samplingPeriodUnit: "blocks"  // or "seconds"
  }
}
```

**Example**: Agent 28202 (see `/oracle-agents/test-agent-record.json`)

### 2. `blankAgentBuilder` - Advanced Formula-Based
Best for: Complex conditions, multi-variable monitoring, historical tracking

**Structure:**
```javascript
{
  agentType: "blankAgentBuilder",
  rule: {
    triggerType: "time_based_trigger",
    time_based_trigger: {
      period: 30,
      period_unit: "seconds"
    },
    conditions: [{
      variable_extraction: [
        {
          type: "gcr",  // Generic Contract Read
          contract_address: "0x...",
          func_sig: "function(params)",
          var_name: "price"
        },
        {
          type: "json_processing",
          json_path: "base64_encoded_formula",
          json_path_engine: "jsonata"
        }
      ]
    }]
  }
}
```

**Example**: Agent 28201 (demonstrated in implementation)

## Key Capabilities

### Supported Chains (via API)
- ✅ Ethereum, Polygon, BSC, Avalanche (CLI + API)
- ✅ **Sonic** (API only - major discovery!)
- ✅ **Ronin** (API only)
- ✅ Base, Optimism, Arbitrum

### Monitoring Types
| Type | CLI Support | API Support | Agent Type |
|------|------------|-------------|------------|
| Oracle Prices | ❌ | ✅ | genericNodeQuery |
| Contract State | ❌ | ✅ | blankAgentBuilder |
| Complex Formulas | ❌ | ✅ | blankAgentBuilder |
| Transaction Monitor | ✅ | ✅ | large_transaction_monitor |
| Position Health | ✅ | ✅ | position_health_deviation |

## Implementation Pattern

### 1. Direct API Creation (Recommended)
```bash
# Create agent via API
curl -X POST https://api.hypernative.xyz/custom-agents \
  -H "x-client-id: ${CLIENT_ID}" \
  -H "x-client-secret: ${CLIENT_SECRET}" \
  -d @agent-config.json
```

### 2. Configuration as Code
Store configs in version control:
```
oracle-agents/
├── oracle-configs.json       # Agent definitions
├── deploy-oracle-agents.ts   # Deployment script
└── test-agent.js            # Testing utility
```

### 3. Required Fields for Oracle Monitoring
```javascript
{
  // Contract ABI information
  contractFunctionObject: {
    name: "getPriceInfo",
    inputs: [{name: "asset", type: "address"}],
    outputs: [
      {name: "price", type: "uint256"},
      {name: "isAlive", type: "bool"}
    ],
    stateMutability: "view"
  },
  
  // Data types (must match ABI)
  inputDataType: ["address"],
  outputDataType: ["uint256", "bool"]
}
```

## Common Patterns

### Price Deviation Monitoring
```javascript
// Check if price deviates >2% from expected
operator: "gt",
operands: ["980000000000000000"],  // 0.98 ETH (2% lower bound)
// OR
operator: "lt", 
operands: ["1020000000000000000"],  // 1.02 ETH (2% upper bound)
```

### Oracle Staleness Check
```javascript
variable_extraction: [
  {type: "context", var_name: "block_timestamp"},
  {type: "gcr", func_sig: "lastUpdateTime()", var_name: "last_update"}
],
condition: "block_timestamp - last_update > 3600"  // 1 hour
```

### Multi-Oracle Comparison
Use `blankAgentBuilder` with multiple GCR calls to compare oracle sources.

## Gotchas & Solutions

| Issue | Solution |
|-------|----------|
| CLI doesn't support agent type | Use API directly |
| Chain not in CLI enum | API supports it anyway |
| Complex conditions needed | Use blankAgentBuilder |
| Need historical data | Enable `data_retention_required` |
| Formula syntax | Encode JSONata as base64 |

## Testing Workflow

1. **Create test agent** with low severity
2. **Verify triggers** using block explorer
3. **Check agent status**: `GET /custom-agents/{id}`
4. **Monitor alerts**: `GET /alerts?agentId={id}`
5. **Adjust thresholds** based on results

## API Endpoints

See full API docs: `/docs/hypernative-api/custom-agents/`

Key endpoints:
- `POST /custom-agents` - Create agent
- `GET /custom-agents` - List all agents  
- `GET /custom-agents/{id}` - Get specific agent
- `PUT /custom-agents/{id}` - Update agent
- `DELETE /custom-agents/{id}` - Delete agent

## Example Implementations

### Live Examples
- **Agent 28201**: wstkscUSD price monitor (blankAgentBuilder)
- **Agent 28202**: sfrxUSD price monitor (genericNodeQuery)
- **Agent 28211**: dUSD oracle monitor (our test implementation)

### Reference Code
- `/oracle-agents/test-agent.js` - Working implementation
- `/oracle-agents/deploy-oracle-agents.ts` - Full deployment script
- `/oracle-agents/oracle-configs.json` - Configuration templates

## Best Practices

1. **Use both agent types** for redundancy
2. **Start with low severity** during testing
3. **Enable data retention** for trending
4. **Set appropriate sampling periods** (blocks for high precision, time for efficiency)
5. **Include contract ABI** for proper decoding
6. **Version control** all agent configurations
7. **Test on testnet** before mainnet deployment

## Quick Reference

### Convert CLI Config to API
```javascript
// CLI (limited)
type: "large_transaction_monitor"
chain: "ethereum"  // Limited chains

// API (full capability)  
agentType: "genericNodeQuery"
chain: "sonic"  // Any chain works
```

### Decimal Handling
Most oracles use 18 decimals:
- 1.00 = "1000000000000000000"
- 0.98 = "980000000000000000"
- 1.02 = "1020000000000000000"

### Severity Mapping
- CLI: "critical", "high", "medium", "low"
- API: "Critical", "High", "Medium", "Low" (capitalized)

---

*For complete API documentation, see `/docs/hypernative-api/custom-agents/`*