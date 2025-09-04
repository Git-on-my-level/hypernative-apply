---
icon: python
---

# Hypernative Agents SDK

Welcome to the Invariantive SDK documentation! This comprehensive guide will help you build powerful blockchain monitoring and automation agents using our Python SDK.

### What is Invariantive?

Invariantive is a Python-based SDK for creating blockchain monitoring and automation agents. It enables you to:

* **Monitor on-chain events** and transactions across multiple blockchains
* **Create complex calculations** and correlations
* **Access historical blockchain data** for analysis
* **Maintain persistent state** across executions
* **Trigger automated responses** based on conditions
* **Stream metrics** to dashboards and notification systems

### Quick Navigation

#### Getting Started

* **Installation** - Set up the SDK and configure credentials
* **Core Concepts** - Understand the architecture and key components
* **Quick Start** - Build your first agent in minutes

#### Learning and Reference

* **Examples** - Practical examples and common patterns
* **Real-World Examples** - Production examples with advanced patterns
* **Model Reference** - Complete documentation of all classes and methods
* **Advanced Features** - Sophisticated patterns and techniques

#### Best Practices and Support

* **Best Practices** - Production-ready development guidelines
* **Troubleshooting** - Common issues and solutions

### Architecture Overview

Every Invariantive agent consists of four main components:

```
┌─────────────┐    ┌──────────────┐    ┌────────────┐    ┌─────────────┐
│   Trigger   │───▶│  Variables   │───▶│   Alert    │───▶│ Notification│
│             │    │              │    │            │    │             │
│ When to run │    │ Data extract │    │ Conditions │    │ Send alert  │
└─────────────┘    └──────────────┘    └────────────┘    └─────────────┘
```

1. **Trigger**: Defines when your agent executes (every block, on events, or function calls)
2. **Variables**: Extract and process data from blockchains, APIs, or custom logic
3. **Alert**: Evaluate conditions and generate notifications
4. **Notification**: Send alerts to configured channels

### Key Features

#### 🔗 Multi-Chain Support

Monitor across 80+ blockchains including Ethereum, Arbitrum, Polygon, Base, Solana, Bitcoin, StarkNet, and many more EVM and non-EVM chains.

#### 📊 Rich Data Sources

* Smart contract state reading
* Historical event analysis
* External API integration
* Custom Python processing

#### 🚀 Production Ready

* Error handling and informative error descriptions
* Object Oriented Programming
* Performance optimization
* Secret management
* Comprehensive testing

#### 🔔 Flexible Alerting

* Multiple notification channels
* Templated messages
* State-based and one-shot alerts
* Custom severity levels

### Quick Example

Here's a simple agent that monitors USDT total supply:

```python
from invariantive.model.agent import Agent
from invariantive.model.trigger import BlockTrigger
from invariantive.model.variable import GenericContractReadVariable
from invariantive.model.alert import AlertConfig
from invariantive.model.run import RunConfig
from invariantive.common.consts import Chain
from invariantive.common.environment import set_default_chain

set_default_chain(Chain.ethereum)

# 1. Create trigger
trigger = BlockTrigger(period=1, period_unit="blocks")

# 2. Create agent
agent = Agent(trigger=trigger)

# 3. Add variable to monitor USDT supply
supply_var = GenericContractReadVariable(
    contract_address="0xdAC17F958D2ee523a2206206994597C13D831ec7",
    func_sig="totalSupply",
    output_index="output_arg_0",
    var_name="total_supply"
)
agent.add_variable(supply_var)

# 4. Configure alert
alert = AlertConfig(
    var_name="total_supply",
    operator="gt",
    operands=[80000000000000],
    description="USDT supply exceeded threshold: {{total_supply}}"
)
agent.set_alert(alert)

# 5. Test and deploy
findings = agent.run(RunConfig(blocks=[0]))
print("num findings:", len(findings["findings"]))
for f in findings["findings"]:
    print(f["description"])
    print("extracted variables during the run:", f["extracted_variables"])
agent.save_config("usdt_monitor.json")
```

### Use Cases

#### DeFi Monitoring

* Protocol health monitoring
* Liquidity pool analysis
* Utilization rate monitoring
* Position health monitoring

#### Security Monitoring

* Unusual transaction patterns
* Update monitoring agents based on contract deployment
* Integration with screener products
* Cross-chain correlation

#### Compliance and Risk

* Transaction volume thresholds
* Blacklist monitoring
* Data streaming
* Offchain data source integration via API

#### Portfolio Management

* Balance tracking
* Performance analysis
* Rebalancing triggers
* Market opportunity detection

### Supported Chains

**EVM Compatible:**\
Ethereum, Arbitrum, Base, Polygon, Optimism, Avalanche, BSC, Fantom, Gnosis, Linea, Scroll, and more

**Non-EVM:**\
Bitcoin, Solana, Starknet

**Testnets:**\
Ethereum Sepolia, Ethereum Holesky

See the Model Reference for the complete list.

### Learning Path

#### Beginner

1. Start with Installation
2. Read Core Concepts
3. Follow the Quick Start guide
4. Try the basic examples in Examples

#### Intermediate

1. Explore advanced patterns in Examples
2. Learn about Advanced Features
3. Review Best Practices
4. Build custom agents for your use case

#### Advanced

1. Master complex patterns from Advanced Features
2. Implement production systems using Best Practices
3. Contribute to the community with your own patterns



### What's Next?

Ready to start building? Choose your path:

* **New to blockchain monitoring?** → Start with [Core Concepts](core-concepts.md)
* **Want to jump right in?** → Go to [Quick Start](quick-start.md)
* **Looking for specific examples?** → [Browse Examples](examples.md)
* **Building for production?** → Review Best Practices

