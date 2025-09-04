# Examples | Hypernative Product Docs

### 

Basic Monitoring

#### 

Balance Monitoring

Monitor a specific wallet's token balance:

```


# Set default chain
set_default_chain(Chain.ethereum)

# Monitor Binance hot wallet USDC balance
balance_var = GenericContractReadVariable(
    contract_address="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",  # USDC
    func_sig="balanceOf",
    input=["0xF977814e90dA44bFA03b6295A0616a897441aceC"],  # Binance wallet
    output_index="output_arg_0",
    var_name="binance_usdc_balance"
)
agent.add_variable(balance_var)

alert = AlertConfig(
    var_name="binance_usdc_balance",
    operator="lt",
    operands=[1000000000000],  # Less than 1M USDC
    description="Binance USDC balance low: {{binance_usdc_balance}}"
)
agent.set_alert(alert)

# Test the agent
findings = agent.run(RunConfig(blocks=[0]))
print("num findings:", len(findings["findings"]))
for f in findings["findings"]:
    print(f["description"])
    print("extracted variables during the run:", f["extracted_variables"])

# Deploy to production (uncomment when ready)


# agent.deploy(


#     agent_name="Binance_USDC_Balance_Monitor", 


#     severity="High",


#     channels_configurations=[{"id": 1337}]  # Replace with your channel ID


# )
```

#### 

Token Balance Monitoring (Simplified)

Monitor token balances using the dedicated TokenBalanceVariable for automatic decimal handling:

```
from invariantive.model.agent import Agent
from invariantive.model.trigger import BlockTrigger
from invariantive.model.variable import TokenBalanceVariable
from invariantive.model.alert import AlertConfig
from invariantive.model.run import RunConfig
from invariantive.common.consts import Chain
from invariantive.common.environment import set_default_chain

# Set default chain
set_default_chain(Chain.ethereum)

# Create block-based trigger (check every 10 blocks)
trigger = BlockTrigger(period=10, period_unit="blocks")
agent = Agent(trigger=trigger)

# Monitor whale wallet USDT balance (automatically handles 6 decimals)
whale_usdt_var = TokenBalanceVariable(
    token_holder_address="0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643",
    token_address="0xdAC17F958D2ee523a2206206994597C13D831ec7",  # USDT
    var_name="whale_usdt_balance"
)
agent.add_variable(whale_usdt_var)

# Monitor ETH balance of the same wallet
whale_eth_var = TokenBalanceVariable(
    token_holder_address="0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643",
    native_token=True,
    var_name="whale_eth_balance"
)
agent.add_variable(whale_eth_var)

# Alert on large USDT movements (over 1M USDT)
usdt_alert = AlertConfig(
    var_name="whale_usdt_balance",
    operator="gt",
    operands=[1000000],
    description="Whale wallet holds {{whale_usdt_balance}} USDT ({{whale_eth_balance}} ETH)"
)
agent.set_alert(usdt_alert)

# Test the agent
findings = agent.run(RunConfig(blocks=[0]))
print("num findings:", len(findings["findings"]))
for f in findings["findings"]:
    print(f["description"])
    print("extracted variables during the run:", f["extracted_variables"])

# Deploy to production (uncomment when ready)


# agent.deploy(


#     agent_name="Whale_Token_Balance_Monitor", 


#     severity="High",


#     channels_configurations=[{"id": 1337}]  # Replace with your channel ID


# )
```

### 

Event-Based Agents

#### 

Balancer Pool Creation Monitoring

Monitor new Balancer pool creations on Mode network:

```
from invariantive.model.agent import Agent
from invariantive.model.trigger import EventTrigger
from invariantive.model.variable import ContextVariable
from invariantive.model.alert import AlertConfig
from invariantive.model.run import RunConfig
from invariantive.common.consts import Chain
from invariantive.common.environment import set_default_chain

# Set default chain
set_default_chain(Chain.mode)

# Monitor PoolCreated events from Balancer Vault
trigger = EventTrigger(
    contract_address="0x5DbAd78818D4c8958EfF2d5b95b28385A22113Cd",
    event_sig="PoolCreated",
    operator="compare_exact",
    output_index="emitting_contract",
    operands=["0x5DbAd78818D4c8958EfF2d5b95b28385A22113Cd"]
)

agent = Agent(trigger=trigger)

# Extract pool address from event
pool_var = ContextVariable(
    output_index="emitted_arg_0",
    var_name="pool_address"
)
agent.add_variable(pool_var)

# Alert on any new pool creation
alert = AlertConfig(
    var_name="pool_address",
    operator="ne",
    operands=["none"], # always alert
    description="New Balancer pool created: {{pool_address}}"
)
agent.set_alert(alert)

# Test the agent
findings = agent.run(RunConfig(blocks=[0]))
print("num findings:", len(findings["findings"]))
for f in findings["findings"]:
    print(f["description"])
    print("extracted variables during the run:", f["extracted_variables"])

# Deploy to production (uncomment when ready)


# agent.deploy(


#     agent_name="Balancer_Pool_Creation_Monitor", 


#     severity="Low",


#     channels_configurations=[{"id": 1337}]  # Replace with your channel ID


# )
```

### 

Function Call Monitoring

#### 

Aave Liquidation Monitoring

Monitor liquidations on Aave Protocol:

```
from invariantive.model.agent import Agent
from invariantive.model.trigger import FunctionCallTrigger
from invariantive.model.variable import ContextVariable
from invariantive.model.alert import AlertConfig
from invariantive.model.run import RunConfig
from invariantive.common.consts import Chain
from invariantive.common.environment import set_default_chain

# Set default chain
set_default_chain(Chain.ethereum)

# Monitor liquidateCall function calls on Aave Pool
trigger = FunctionCallTrigger(
    contract_address="0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9",  # Aave Pool V2
    trace_sig="liquidationCall",
    operator="compare_exact",
    output_index="trace_to",
    operands=["0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9"]
)

agent = Agent(trigger=trigger)

# Extract liquidated user address
user_var = ContextVariable(
    output_index="input_arg_2",  # user parameter in liquidationCall
    var_name="liquidated_user"
)
agent.add_variable(user_var)

# Extract collateral asset
collateral_var = ContextVariable(
    output_index="input_arg_0",  # collateralAsset parameter
    var_name="collateral_asset"
)
agent.add_variable(collateral_var)

# Extract debt asset
debt_var = ContextVariable(
    output_index="input_arg_1",  # debtAsset parameter
    var_name="debt_asset"
)
agent.add_variable(debt_var)

# Extract liquidator
liquidator_var = ContextVariable(
    output_index="trace_from",
    var_name="liquidator"
)
agent.add_variable(liquidator_var)

# Alert on any liquidation
alert = AlertConfig(
    var_name="liquidated_user",
    operator="ne",
    operands=["0x"],
    description="Aave liquidation detected: User {{liquidated_user}} liquidated by {{liquidator}} (Collateral: {{collateral_asset}}, Debt: {{debt_asset}})"
)
agent.set_alert(alert)

# Test the agent
findings = agent.run(RunConfig(hashes=["LiquidationTxHashExample"]))
print("num findings:", len(findings["findings"]))
for f in findings["findings"]:
    print(f["description"])
    print("extracted variables during the run:", f["extracted_variables"])

# Deploy to production (uncomment when ready)


# agent.deploy(


#     agent_name="Aave_Liquidation_Monitor", 


#     severity="High",


#     channels_configurations=[{"id": 1337}]  # Replace with your channel ID


# )
```

### 

External API Integration

#### 

Price Feed Integration

Combine on-chain data with price feeds:

```
from invariantive.model.variable import PriceServiceVariable, PythonProcessingVariable

# Get token balance
balance_var = GenericContractReadVariable(
    contract_address="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",  # USDC
    func_sig="balanceOf",
    input=["0xF977814e90dA44bFA03b6295A0616a897441aceC"],
    output_index="output_arg_0",
    var_name="usdc_balance"
)
agent.add_variable(balance_var)

# Get USDC price using PriceServiceVariable
price_var = PriceServiceVariable(
    price_source="coingecko",
    asset="usd-coin",  # CoinGecko ID for USDC
    amount=1,
    var_name="usdc_price"
)
agent.add_variable(price_var)

# Calculate USD value
def calculate_usd_value(extracted_variables):
    balance = extracted_variables["usdc_balance"]
    price = extracted_variables["usdc_price"]
    # USDC has 6 decimals
    # PriceServiceVariable returns price directly
    return (balance / 1e6) * price

value_var = PythonProcessingVariable(
    source_code=calculate_usd_value,
    var_name="usd_value"
)
agent.add_variable(value_var)

alert = AlertConfig(
    var_name="usd_value",
    operator="lt",
    operands=[1000000000],  # Less than $1B
    description="Binance USDC value: ${{usd_value}}"
)
agent.set_alert(alert)

# Test the agent
findings = agent.run(RunConfig(blocks=[0]))
print("num findings:", len(findings["findings"]))
for f in findings["findings"]:
    print(f["description"])
    print("extracted variables during the run:", f["extracted_variables"])

# Deploy to production (uncomment when ready)


# agent.deploy(


#     agent_name="USDC_Balance_Value_Monitor", 


#     severity="Medium",


#     channels_configurations=[{"id": 1337}]  # Replace with your channel ID


# )
```

#### 

Reputation Checking

Check address reputation using external APIs:

```
from invariantive.model.agent import Agent
from invariantive.model.trigger import EventTrigger
from invariantive.model.variable import ContextVariable, JsonEndpointVariable
from invariantive.model.alert import AlertConfig
from invariantive.model.run import RunConfig
from invariantive.common.consts import Chain
from invariantive.common.environment import set_default_chain

# Set default chain
set_default_chain(Chain.ethereum)

# Monitor Transfer events from USDT contract
trigger = EventTrigger(
    contract_address="0xdAC17F958D2ee523a2206206994597C13D831ec7",  # USDT
    event_sig="Transfer",
    operator="any",
    output_index="emitting_contract",
    operands=[]
)

# Create agent
agent = Agent(trigger=trigger)

# Extract address from transaction
address_var = ContextVariable(
    output_index="tx_from",
    var_name="sender_address"
)
agent.add_variable(address_var)

# Check reputation
reputation_var = JsonEndpointVariable(
    url="https://api.hypernative.xyz/assets/reputation/addresses",
    method="post",
    headers={
        "x-client-secret": "your-secret",
        "x-client-id": "your-id",
        "Content-Type": "application/json"
    },
    data={
        "addresses": "extracted_variables.sender_address",
        "chains": [],
        "flagIds": []
    },
    json_path="data",
    json_path_engine="jmespath",
    var_name="reputation_data"
)
agent.add_variable(reputation_var)

# Alert on flagged addresses
alert = AlertConfig(
    var_name="reputation_data",
    operator="ne",
    operands=["null"],
    description="Address reputation check: {{sender_address}} - {{reputation_data}}"
)
agent.set_alert(alert)

# Test the agent with transaction hashes
findings = agent.run(RunConfig(hashes=[
    "0xbe110429f51279921ec95367234f3ca04e299c654b2386c102eb023081fed3cc",
    "0x1e2152aebc169e33bc97a5933e93966a3fbdbed877ca702d78b5b4ffa600c663"
]))
print("num findings:", len(findings["findings"]))
for f in findings["findings"]:
    print(f["description"])
    print("extracted variables during the run:", f["extracted_variables"])

# Deploy to production (uncomment when ready)


# agent.deploy(


#     agent_name="Address_Reputation_Monitor", 


#     severity="Medium",


#     channels_configurations=[{"id": 1337}]  # Replace with your channel ID


# )
```

### 

Custom Python Logic

#### 

Complex Calculations

Perform custom analysis with Python:

```
def analyze_transaction_pattern(extracted_variables):
    import json
    
    # Get transaction data
    tx_value = extracted_variables["tx_value"]
    tx_from = extracted_variables["tx_from"]
    block_number = extracted_variables["block_number"]
    
    # Custom analysis logic
    if tx_value > 1000000000000000000:  # > 1 ETH
        risk_score = 80
    elif tx_from.lower() in ["0x123...", "0x456..."]:  # Known addresses
        risk_score = 90
    else:
        risk_score = 10
    
    # Return analysis result
    return {
        "risk_score": risk_score,
        "analysis": f"Transaction risk assessment for block {block_number}",
        "recommendation": "high_risk" if risk_score > 70 else "low_risk"
    }

analysis_var = PythonProcessingVariable(
    source_code=analyze_transaction_pattern,
    var_name="risk_analysis"
)
agent.add_variable(analysis_var)
```

#### 

Web3 Integration

Use Web3.py for advanced contract interactions:

```
def get_advanced_token_data(extracted_variables):
    from web3 import Web3
    import json
    
    # Get connected Web3 instance
    w3 = get_node('ethereum').w3
    
    # Token contract
    token_address = "0xdAC17F958D2ee523a2206206994597C13D831ec7"
    
    # Simple ABI for totalSupply and decimals
    abi = json.loads('[{"inputs":[],"name":"totalSupply","outputs":[{"type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"type":"uint8"}],"stateMutability":"view","type":"function"}]')
    
    # Create contract instance
    contract = w3.eth.contract(address=token_address, abi=abi)
    
    # Get data
    total_supply = contract.functions.totalSupply().call()
    decimals = contract.functions.decimals().call()
    
    # Calculate human-readable supply
    human_supply = total_supply / (10 ** decimals)
    
    return {
        "total_supply_wei": total_supply,
        "decimals": decimals,
        "total_supply_human": human_supply
    }

web3_var = PythonProcessingVariable(
    source_code=get_advanced_token_data,
    var_name="token_data"
)
agent.add_variable(web3_var)
```

### 

Multi-Variable Agents

#### 

DeFi Protocol Monitoring

Monitor multiple aspects of a DeFi protocol:

```


# Monitor Aave protocol
aave_address = "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9"

# 1. Total deposits
deposits_var = GenericContractReadVariable(
    contract_address=aave_address,
    func_sig="totalSupply",
    output_index="output_arg_0",
    var_name="total_deposits"
)
agent.add_variable(deposits_var)

# 2. Total borrows  
borrows_var = GenericContractReadVariable(
    contract_address=aave_address,
    func_sig="totalDebt",
    output_index="output_arg_0",
    var_name="total_borrows"
)
agent.add_variable(borrows_var)

# 3. Calculate utilization rate
def calculate_utilization(extracted_variables):
    deposits = extracted_variables["total_deposits"]
    borrows = extracted_variables["total_borrows"]
    if deposits == 0:
        return 0
    return (borrows / deposits) * 100

utilization_var = PythonProcessingVariable(
    source_code=calculate_utilization,
    var_name="utilization_rate"
)
agent.add_variable(utilization_var)

# 4. Get protocol TVL from DeFi Llama
tvl_var = JsonEndpointVariable(
    url="https://api.llama.fi/tvl/aave",
    method="get",
    json_path="@",
    json_path_engine="jmespath",
    var_name="protocol_tvl"
)
agent.add_variable(tvl_var)

# Alert on high utilization
alert = AlertConfig(
    var_name="utilization_rate",
    operator="gt",
    operands=[90],
    description="High utilization rate: {{utilization_rate}}% (TVL: ${{protocol_tvl}})"
)
agent.set_alert(alert)
```

### 

Conditional Execution

#### 

Conditional Variable Processing

Use conditions to control execution flow:

```
from invariantive.model.trigger import Condition

# Base agent setup
trigger = EventTrigger(
    contract_address="0xdAC17F958D2ee523a2206206994597C13D831ec7",
    event_sig="Transfer",
    operator="compare_exact",
    output_index="emitting_contract",
    operands=["0xdAC17F958D2ee523a2206206994597C13D831ec7"]
)

agent = Agent(trigger=trigger)

# Add condition to trigger
condition = Condition(
    output_index="emitted_arg_2",  # Transfer amount
    operator="gt",
    operands=["1000000000000"]  # Only process large transfers
)
trigger.add_condition(condition)

# This variable only processes if condition is met
amount_var = ContextVariable(
    output_index="emitted_arg_2",
    var_name="transfer_amount"
)
agent.add_variable(amount_var)

# Conditional processing based on amount
def analyze_large_transfer(extracted_variables):
    amount = extracted_variables["transfer_amount"]
    if amount > 10000000000000:  # > 10M USDT
        return "whale_transaction"
    elif amount > 1000000000000:  # > 1M USDT
        return "large_transaction"
    else:
        return "normal_transaction"

analysis_var = PythonProcessingVariable(
    source_code=analyze_large_transfer,
    var_name="transaction_type"
)
agent.add_variable(analysis_var)
```

### 

Historical Data Analysis

#### 

Event History Analysis

Analyze historical events:

```
from invariantive.model.variable import HistoricalEventsVariable

# Get historical Transfer events
history_var = HistoricalEventsVariable(
    chain=Chain.ETHEREUM,
    contract_address="0xdAC17F958D2ee523a2206206994597C13D831ec7",
    event_name="Transfer",
    event_filters={"from": "0xF977814e90dA44bFA03b6295A0616a897441aceC"},  # Binance wallet
    var_name="transfer_history"
)
agent.add_variable(history_var)

# Analyze transfer patterns
def analyze_transfer_patterns(extracted_variables):
    transfers = extracted_variables["transfer_history"]
    
    total_volume = 0
    transfer_count = len(transfers)
    
    for transfer in transfers:
        total_volume += transfer["args"]["value"]
    
    average_transfer = total_volume / transfer_count if transfer_count > 0 else 0
    
    return {
        "total_transfers": transfer_count,
        "total_volume": total_volume,
        "average_transfer": average_transfer,
        "analysis": f"Processed {transfer_count} transfers with average {average_transfer}"
    }

pattern_var = PythonProcessingVariable(
    source_code=analyze_transfer_patterns,
    var_name="transfer_patterns"
)
agent.add_variable(pattern_var)
```

### 

Testing Examples

#### 

Comprehensive Testing

Test your agents thoroughly:

```
from invariantive.model.run import RunConfig

# Test on multiple blocks
run_config = RunConfig(
    chain=Chain.ETHEREUM,
    blocks=[21202357, 21202358, 21202359]
)

findings = agent.run(run_config)

# Analyze results
for i, finding in enumerate(findings["findings"]):
    print(f"Finding {i+1}:")
    print(f"  Description: {finding['description']}")
    print(f"  Variables: {finding['extracted_variables']}")
    print()

# Test on specific transactions
tx_config = RunConfig(
    chain=Chain.ETHEREUM,
    hashes=[
        "0xbe110429f51279921ec95367234f3ca04e299c654b2386c102eb023081fed3cc",
        "0x1e2152aebc169e33bc97a5933e93966a3fbdbed877ca702d78b5b4ffa600c663"
    ]
)

tx_findings = agent.run(tx_config)
print("Transaction-specific findings:", tx_findings)

# Deploy to production (uncomment when ready)


# agent.deploy(


#     agent_name="Comprehensive_Test_Agent", 


#     severity="Medium",


#     channels_configurations=[{"id": 1337}]  # Replace with your channel ID


# )
```

### 

Non-EVM Chain Examples

The SDK supports multiple non-EVM blockchains, each with specific patterns for interaction.

#### 

Solana

Solana requires IDL (Interface Description Language) files to interact with programs. Here are common patterns:

**Event Monitoring on Solana**

```
from invariantive.model.agent import Agent
from invariantive.model.trigger import EventTrigger
from invariantive.model.variable import ContextVariable
from invariantive.model.alert import AlertConfig
from invariantive.model.run import RunConfig
from invariantive.common.consts import Chain

# Monitor VaultDeposited events
trigger = EventTrigger(
    chain=Chain.solana,
    contract_address="ErBmAD61mGFKvrFNaTJuxoPwqrS8GgtwtqJTJVjFWx9Q",
    event_sig="VaultDeposited()",
    operator="compare_exact",
    output_index="emitting_contract",
    operands=["ErBmAD61mGFKvrFNaTJuxoPwqrS8GgtwtqJTJVjFWx9Q"],
    idl_json={
        "version": "0.1.0",
        "events": [
            {
                "name": "VaultDeposited",
                "fields": [
                    {"name": "accountId", "type": {"array": ["u8", 32]}, "index": False},
                    {"name": "tokenAmount", "type": "u64", "index": False},
                    {"name": "srcChainDepositNonce", "type": "u64", "index": False},
                ],
            }
        ],
    }
)

agent = Agent(trigger=trigger)

# Extract event data
agent.add_variable(ContextVariable(
    output_index="emitted_arg_5",  # srcChainDepositNonce
    var_name="deposit_nonce"
))

agent.set_alert(AlertConfig(
    var_name="deposit_nonce",
    operator="gt",
    operands=[1000000],
    description="Large deposit nonce: {{deposit_nonce}}"
))

# Test with Solana transaction hashes
findings = agent.run(RunConfig(
    chain=Chain.solana,
    hashes=["5JYwqvKkqp4wd8FWt1j3KzrVKJh4kqTHF2K3NghthFWAb2ZhYJQRGqWxBzCJjNGKGfF7", "SolanaTransactionHashExample"]
))
print("num findings:", len(findings["findings"]))
for f in findings["findings"]:
    print(f["description"])
    print("extracted variables during the run:", f["extracted_variables"])
```

**Function Call Monitoring on Solana**

```
from invariantive.model.trigger import FunctionCallTrigger
from invariantive.model.variable import GenericContractReadVariable
import json

# Load Kamino IDL (example function)
def get_kamino_idl():
    # Load from your IDL file
    with open("kamino_idl.json", "r") as f:
        return json.load(f)

# Monitor invest function calls
trigger = FunctionCallTrigger(
    chain=Chain.solana,
    contract_address="6LtLpnUFNByNXLyCoK9wA2MykKAmQNZKBdY8s47dehDc",
    trace_sig="invest",
    operator="compare_exact",
    output_index="trace_to",
    operands=["6LtLpnUFNByNXLyCoK9wA2MykKAmQNZKBdY8s47dehDc"],
    idl_json=get_kamino_idl()
)

agent = Agent(trigger=trigger)

# Read contract state using IDL
strategy_var = GenericContractReadVariable(
    contract_address="6LtLpnUFNByNXLyCoK9wA2MykKAmQNZKBdY8s47dehDc",
    func_sig="WhirlpoolStrategy",
    output_index="output_arg_3",
    input=["GscnFgC7WLpgcg8Mop3bX6g7jRvwaQ2BUa564pdimwUW"],
    input_data_type=["Pubkey"],
    chain=Chain.solana,
    var_name="strategy_bump",
    idl_json=get_kamino_idl()
)
agent.add_variable(strategy_var)

# Alert on strategy bump changes
agent.set_alert(AlertConfig(
    var_name="strategy_bump",
    operator="gt",
    operands=[0],
    description="Solana investment function called: Strategy bump {{strategy_bump}}"
))

# Test with Solana transaction hashes  
findings = agent.run(RunConfig(
    chain=Chain.solana,
    hashes=["3Z8yTqk4kj5JHt8L6R2QxZnJm9VfN4pGsHmLX1Rz9K5A"]
))
print("num findings:", len(findings["findings"]))
for f in findings["findings"]:
    print(f["description"])
    print("extracted variables during the run:", f["extracted_variables"])
```

**Cross-Chain Solana Monitoring**

```
from invariantive.model.variable import JsonProcessingVariable

# Monitor Solana state triggered by Ethereum blocks
set_default_chain(Chain.ethereum)

# Ethereum block trigger
trigger = BlockTrigger(period=1, period_unit="blocks")
agent = Agent(trigger=trigger)

# Read Solana obligation state
obligation_var = GenericContractReadVariable(
    contract_address="KLend2g3cP87fffoy8q1mQqGKjrxjC8boSyAYavgmjD",
    func_sig="Obligation",
    output_index="output_arg_12",  # borrowedAssetsMarketValueSf
    input=["AZyBqWC6ZWbCUrakcgdmYM3TNNjzZP3WMiw3mFgvy1NJ"],
    input_data_type=["publicKey"],
    chain=Chain.solana,
    var_name="borrowed_value",
    idl_json=get_kamino_idl()
)
agent.add_variable(obligation_var)

# Calculate LTV ratio
ltv_var = JsonProcessingVariable(
    json_path="$round($number(borrowed_value) / $number(deposited_value) * 100, 2)",
    json_path_engine="jsonata",
    var_name="ltv_percentage"
)
agent.add_variable(ltv_var)
```

#### 

Aptos

Aptos uses Move modules for smart contracts. Key differences include module specification and Move-specific data types:

```
from invariantive.model.trigger import FunctionCallTrigger
from invariantive.model.variable import GenericContractReadVariable

# Monitor Move function calls
trigger = FunctionCallTrigger(
    chain=Chain.aptos,
    contract_address="0x664f1da7f6256b26a7808e0e5b02e747c4c6450e92b602740a2a5514bba91e52",
    trace_sig="increase_boss_killed",
    module="game",  # Move module name
    operator="compare_exact",
    output_index="trace_to",
    operands=["0x664f1da7f6256b26a7808e0e5b02e747c4c6450e92b602740a2a5514bba91e52"]
)

agent = Agent(trigger=trigger)

# Read from Move contract
balance_var = GenericContractReadVariable(
    contract_address="0x5a0ad9e31a2f452504429b6f7073cb325994c2c66204f5deb8e0561a9e950c3c",
    func_sig="get_balance",
    output_index="output_arg_0",
    input=["0x541e28fb12aa661a30358f2bebcd44460187ec918cb9cee075c2db86ee6aed93"],
    input_data_type=["u64"],
    chain=Chain.aptos,
    var_name="token_balance",
    module="TeviStar"  # Move module name
)
agent.add_variable(balance_var)

# Alert on balance changes
agent.set_alert(AlertConfig(
    var_name="token_balance", 
    operator="gt",
    operands=[0],
    description="Aptos game function called: Token balance {{token_balance}}"
))

# Test with Aptos transaction
findings = agent.run(RunConfig(
    chain=Chain.aptos,
    hashes=["0x6abfc991bef7f3e8b9f96af562103b1f6000caf830585080e9256936842c3ff8"]
))
print("num findings:", len(findings["findings"]))
for f in findings["findings"]:
    print(f["description"])
    print("extracted variables during the run:", f["extracted_variables"])
```

#### 

StarkNet

StarkNet uses Cairo contracts with specific data type handling:

```
from invariantive.model.trigger import EventTrigger

# Monitor StarkNet events
trigger = EventTrigger(
    contract_address="0x00ca1702e64c81d9a07b86bd2c540188d92a2c73cf5cc0e508d949015e7e84a7",
    event_sig="RemoveFromDelegationPoolIntent()",
    operator="compare_exact",
    output_index="emitting_contract",
    output_data_type=["ContractAddress", "ContractAddress", "felt252", "u128", "u128"],
    operands=["0x00ca1702e64c81d9a07b86bd2c540188d92a2c73cf5cc0e508d949015e7e84a7"],
    chain=Chain.starknet
)

agent = Agent(trigger=trigger)

# Extract Cairo-specific data types
agent.add_variable(ContextVariable(
    output_index="emitted_arg_4",  # u128 type
    var_name="intent_amount"
))

# Alert on delegation pool events
agent.set_alert(AlertConfig(
    var_name="intent_amount",
    operator="gt", 
    operands=[0],
    description="StarkNet delegation pool intent: {{intent_amount}}"
))

# Test with StarkNet transaction
findings = agent.run(RunConfig(
    chain=Chain.starknet,
    hashes=["0x010957d615d8fb3d158d380e2761bae0b49b299221f755a82544d8f582cbbd2c"]
))
print("num findings:", len(findings["findings"]))
for f in findings["findings"]:
    print(f["description"])
    print("extracted variables during the run:", f["extracted_variables"])
```

#### 

Bitcoin

Bitcoin monitoring focuses on transaction analysis using the `get_bitcoin_tx` global function:

```
from invariantive.model.variable import PythonProcessingVariable

def monitor_bitcoin_transaction(extracted_variables):
    # Get Bitcoin transaction data
    tx_data = get_bitcoin_tx("your_transaction_hash")
    
    # Analyze transaction
    total_output = sum(output["value"] for output in tx_data["outputs"])
    large_outputs = [out for out in tx_data["outputs"] if out["value"] > 100000000]  # > 1 BTC
    
    return {
        "total_output_satoshis": total_output,
        "large_output_count": len(large_outputs),
        "is_large_transaction": total_output > 1000000000  # > 10 BTC
    }

# Use with block trigger for periodic Bitcoin monitoring
bitcoin_var = PythonProcessingVariable(
    source_code=monitor_bitcoin_transaction,
    var_name="bitcoin_analysis"
)
```

#### 

Multi-Chain Patterns

Monitor related activity across different blockchain ecosystems:

```
def cross_chain_bridge_monitor(extracted_variables):
    # Monitor bridge activity across EVM and non-EVM chains
    evm_balance = extracted_variables.get("evm_token_balance", 0)
    solana_balance = extracted_variables.get("solana_token_balance", 0)
    
    # Calculate total locked value across chains
    total_tvl = evm_balance + solana_balance
    
    # Detect imbalances that might indicate bridge issues
    balance_ratio = evm_balance / solana_balance if solana_balance > 0 else float('inf')
    
    return {
        "total_tvl": total_tvl,
        "balance_ratio": balance_ratio,
        "potential_bridge_issue": balance_ratio > 10 or balance_ratio < 0.1
    }
```

### 

Best Practices

1.  **Start Simple**: Begin with basic monitoring and add complexity gradually
    
2.  **Test Thoroughly**: Use multiple test scenarios before deployment
    
3.  **Handle Errors**: Add error handling in Python processing functions
    
4.  **Use Descriptive Names**: Name variables clearly for easier debugging
    
5.  **Document Logic**: Comment complex calculations and business logic
    
6.  **Monitor Performance**: Consider the computational cost of complex operations
    
7.  **Chain-Specific Considerations**:
    
    -   **Solana**: Always provide IDL files for program interaction
        
    -   **Aptos**: Specify Move module names for function calls
        
    -   **StarkNet**: Use correct Cairo data types in output\_data\_type
        
    -   **Bitcoin**: Leverage `get_bitcoin_tx` for transaction analysis
