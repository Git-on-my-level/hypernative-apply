---
icon: face-thinking
---

# Core Concepts

### Overview

The Invariantive SDK is a Python framework for creating blockchain monitoring and automation agents. It uses an object-oriented approach to build powerful agents that can monitor on-chain events, perform calculations, and trigger automated responses.

### Architecture

Every Invariantive agent consists of four main components:

#### 1. Trigger

Defines when your agent should execute. Four types are available:

* **BlockTrigger**: Execute periodically (every N blocks or seconds)
* **EventTrigger**: Execute when specific events are emitted
* **FunctionCallTrigger**: Execute when specific functions are called
* **RITrigger**: Execute when specific Risk Insights alerts are triggered

#### 2. Variables

Extract and process data from various sources:

* **Context Variables**: Extract data from transactions and blocks
* **Contract Variables**: Read smart contract state
* **API Variables**: Fetch data from external APIs
* **Python Variables**: Custom logic and calculations

#### 3. Conditions (Optional)

Add additional filtering criteria for event and function call triggers.

#### 4. Alerts

Define when and how to notify about important conditions.

### Key Classes

#### Agent

The main orchestrator that coordinates all components:

```python
from invariantive.model.agent import Agent
from invariantive.model.trigger import BlockTrigger
from invariantive.common.consts import Chain
from invariantive.common.environment import set_default_chain

# Set default chain (optional but recommended)
set_default_chain(Chain.ethereum)

# Create an agent with a block trigger
trigger = BlockTrigger(period=1, period_unit="blocks")
agent = Agent(trigger=trigger)
```

#### Triggers

**BlockTrigger** - Time-based execution:

```python
from invariantive.model.trigger import BlockTrigger
from invariantive.common.consts import Chain

# Execute every block
trigger = BlockTrigger(
    period=1,
    period_unit="blocks",
)

# Execute every 10 seconds
trigger = BlockTrigger(
    period=10,
    period_unit="seconds",
)
```

**EventTrigger** - Event-based execution:

```python
from invariantive.model.trigger import EventTrigger
from invariantive.common.consts import Chain

# Monitor Transfer events on USDT contract
trigger = EventTrigger(
    contract_address="0xdAC17F958D2ee523a2206206994597C13D831ec7",  # USDT
    event_sig="Transfer",
    operator="compare_exact",
    output_index="emitting_contract",
    operands=["0xdAC17F958D2ee523a2206206994597C13D831ec7"],
)
```

**FunctionCallTrigger** - Function call-based execution:

```python
from invariantive.model.trigger import FunctionCallTrigger
from invariantive.common.consts import Chain

# Monitor transfer function calls on USDT contract
trigger = FunctionCallTrigger(
    contract_address="0xdAC17F958D2ee523a2206206994597C13D831ec7",
    trace_sig="transfer",
    operator="compare_exact",
    output_index="trace_to",
    operands=["0xdAC17F958D2ee523a2206206994597C13D831ec7"],
)
```

**RITrigger** - Risk Insights alert-based execution:

```python
from invariantive.model.trigger import RITrigger
from invariantive.common.consts import Chain

# Monitor for specific Risk Insights alerts
trigger = RITrigger(
    type_id="A-4102",  # Exploit Suspected (M2) alert
    chain=Chain.ethereum
)

# Multiple alert types can be monitored:
# A-4102: Exploit Suspected (M2)
# A-4010: Potential Targets in unusual contract (High)  
# TX-00011: Transaction Initiated (Guardian)
# C-13956: Custom Agent alert
```

#### Variables

Variables are the building blocks for data extraction and processing:

**ContextVariable** - Extract transaction/block data:

```python
from invariantive.model.variable import ContextVariable

# Get block number
block_var = ContextVariable(
    output_index="block_number",
    var_name="current_block"
)

# Get transaction sender
sender_var = ContextVariable(
    output_index="tx_from",
    var_name="sender_address"
)
```

**GenericContractReadVariable** - Read contract state:

```python
from invariantive.model.variable import GenericContractReadVariable
from invariantive.common.consts import Chain

# Get USDT total supply
supply_var = GenericContractReadVariable(
    contract_address="0xdAC17F958D2ee523a2206206994597C13D831ec7",
    func_sig="totalSupply",
    output_index="output_arg_0",
    var_name="total_supply",
    chain=Chain.ethereum  # Specify chain explicitly if different than default
)
```

**TokenBalanceVariable** - Simplified token balance monitoring:

```python
from invariantive.model.variable import TokenBalanceVariable
from invariantive.common.consts import Chain

# Monitor USDT balance with automatic decimal handling
balance_var = TokenBalanceVariable(
    token_holder_address="0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643",
    token_address="0xdAC17F958D2ee523a2206206994597C13D831ec7",  # USDT
    var_name="whale_balance"
)

# Monitor native ETH balance
eth_var = TokenBalanceVariable(
    token_holder_address="0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643",
    native_token=True,
    var_name="eth_balance"
)
```

**IsInListVariable** & **AddToListVariable** - Address list management:

```python
from invariantive.model.variable import IsInListVariable, AddToListVariable

# Check if address is in whitelist
whitelist_check = IsInListVariable(
    list_name="vip_addresses",
    address="extracted_variables.sender_address",
    var_name="is_vip"
)

# Add suspicious address to watchlist
add_to_watchlist = AddToListVariable(
    list_name="suspicious_addresses",
    address="extracted_variables.flagged_address",
    var_name="added_to_watchlist"
)
```

**PythonProcessingVariable** - Custom logic with global utilities:

```python
from invariantive.model.variable import PythonProcessingVariable

def calculate_percentage_change(extracted_variables):
    old_value = extracted_variables["old_value"]
    new_value = extracted_variables["new_value"]
    # Note: Use explicit operations, avoid += or -= operators
    change = new_value - old_value
    percentage = (change / old_value) * 100
    return percentage

python_var = PythonProcessingVariable(
    source_code=calculate_percentage_change,
    var_name="percentage_change"
)

# Global utility functions available in PythonProcessingVariable:
# get_node(), get_price(), eth_call(), generic_function_call(), 
# get_bitcoin_tx(), hn_api_get(), is_eoa(), and 9 more utilities
```

**JsonEndpointVariable** - External API integration:

```python
from invariantive.model.variable import JsonEndpointVariable

# Get data from external API
api_var = JsonEndpointVariable(
    var_name="get_offchain_data",
    method="get", 
    url="https://dogk3wv4lymlcxoq3qb3rbbqeq0jmpli.lambda-url.us-east-1.on.aws/",
    json_path="data", 
    json_path_engine="jsonata"
)
```

#### Alerts

Define conditions that trigger notifications:

```python
from invariantive.model.alert import AlertConfig

alert = AlertConfig(
    var_name="total_supply",
    operator="gt",
    operands=[80000000000000],
    description="USDT total supply exceeded threshold: {{total_supply}}"
)
```

#### Run Configuration

Configure how to execute your agent:

```python
from invariantive.model.run import RunConfig
from invariantive.common.consts import Chain

# Test on specific blocks
run_config = RunConfig(
    blocks=[21202357, 21202358]
)

# Test on specific transactions
run_config = RunConfig(
    hashes=["0xbe110429f51279921ec95367234f3ca04e299c654b2386c102eb023081fed3cc"]
)
```

### Variable Dependencies

Variables are processed sequentially, allowing later variables to reference earlier ones:

```python
# First, extract sender address
sender_var = ContextVariable(
    output_index="tx_from",
    var_name="sender_address"
)

# Then, get their balance using the extracted address
balance_var = GenericContractReadVariable(
    contract_address="0xdAC17F958D2ee523a2206206994597C13D831ec7",
    func_sig="balanceOf",
    input=["extracted_variables.sender_address"],  # Reference previous variable
    output_index="output_arg_0",
    var_name="sender_balance"
)
```

### Supported Chains

The SDK supports 80+ blockchain networks across multiple ecosystems:

**Major EVM Networks:** ethereum, bitcoin\_cash, polygon, arbitrum, optimism, base, avalanche, bsc

**Layer 2 Solutions:** arbitrum, optimism, base, polygon, mantle, blast, mode, scroll

**Emerging Networks:** movement, sei, berachain, monad, sonic

**Non-EVM Blockchains:** bitcoin, solana, aptos, starknet, cosmos, algorand, tron

**Testnets:** ethereum\_sepolia, ethereum\_holesky, arbitrum\_sepolia, polygon\_amoy

See the Chain enum in the Model Reference for the complete list of all 80+ supported chains.

### Best Practices

1. **Use descriptive variable names** for better debugging
2. **Order variables carefully** since they execute sequentially
3. **Test locally** before deploying to production
4. **Use type hints** for better IDE support
5. **Handle errors gracefully** in Python processing functions

### Next Steps

* Explore [Examples](examples.md) for practical use cases
* Review the [Model Reference](model-reference.md) for detailed documentation
