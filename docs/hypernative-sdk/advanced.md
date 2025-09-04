# Advanced Features | Hypernative Product Docs

This guide covers advanced features and patterns for building sophisticated monitoring agents.

## 

Variable Templating

Variables can reference previously defined variables using the `extracted_variables` notation.

### 

Basic Templating

```
from invariantive.model.agent import Agent
from invariantive.model.trigger import EventTrigger
from invariantive.model.variable import ContextVariable, GenericContractReadVariable, PythonProcessingVariable
from invariantive.common.consts import Chain
from invariantive.common.environment import set_default_chain

# Set default chain
set_default_chain(Chain.ethereum)

# Monitor Transfer events
trigger = EventTrigger(
    contract_address="0xdAC17F958D2ee523a2206206994597C13D831ec7",
    event_sig="Transfer",
    operator="any",
    output_index="emitting_contract",
    operands=[]
)

agent = Agent(trigger=trigger)

# 1. Extract sender address
sender_var = ContextVariable(
    output_index="emitted_arg_0",
    var_name="sender_address"
)
agent.add_variable(sender_var)

# 2. Extract token contract address
token_var = ContextVariable(
    output_index="emitting_contract",
    var_name="token_address"
)
agent.add_variable(token_var)

# 3. Get sender's balance using extracted address and contract
balance_var = GenericContractReadVariable(
    contract_address="extracted_variables.token_address",  # Reference token
    func_sig="balanceOf",
    input=["extracted_variables.sender_address"],  # Reference sender
    output_index="output_arg_0",
    var_name="sender_balance"
)
agent.add_variable(balance_var)
```

### 

Dynamic Contract Calls

Use templating for dynamic contract interactions:

```


# Get token decimals dynamically
decimals_var = GenericContractReadVariable(
    contract_address="extracted_variables.token_address",
    func_sig="decimals",
    input=[],
    output_index="output_arg_0",
    var_name="token_decimals"
)
agent.add_variable(decimals_var)

# Calculate human-readable amount
def calculate_human_amount(extracted_variables):
    amount = extracted_variables["transfer_amount"]
    decimals = extracted_variables["token_decimals"]
    return amount / (10 ** decimals)

human_amount_var = PythonProcessingVariable(
    source_code=calculate_human_amount,
    var_name="human_amount"
)
agent.add_variable(human_amount_var)
```

### 

JSON Path Templating

Use extracted variables in JSON processing:

```
from invariantive.model.variable import JsonProcessingVariable

# Create a JSON structure using extracted variables
def create_analysis_json(extracted_variables):
    return {
        "transaction": {
            "hash": extracted_variables["tx_hash"],
            "from": extracted_variables["sender_address"],
            "amount": extracted_variables["human_amount"],
            "timestamp": extracted_variables["block_timestamp"]
        }
    }

json_var = PythonProcessingVariable(
    source_code=create_analysis_json,
    var_name="transaction_data"
)
agent.add_variable(json_var)

# Extract specific fields using JSONata
analysis_var = JsonProcessingVariable(
    json_path="transaction.amount > 1000000 ? 'large' : 'normal'",
    json_path_engine="jsonata",
    var_name="transaction_size"
)
agent.add_variable(analysis_var)
```

#### 

Script Parameter Templating

Template hardcoded script parameters into `extracted_variables` for use in `PythonProcessingVariable` functions:

```
from invariantive.model.variable import JsonProcessingVariable, PythonProcessingVariable

# Script-level parameter
RISK_THRESHOLD_PCT = 75

# Template parameter into extracted_variables
risk_threshold_var = JsonProcessingVariable(
    json_path=f'{RISK_THRESHOLD_PCT}',
    json_path_engine="jsonata",
    var_name="risk_threshold"
)
agent.add_variable(risk_threshold_var)

# PythonProcessingVariable can now access the parameter
def calculate_risk_level(extracted_variables):
    current_balance = extracted_variables["account_balance"]
    threshold = extracted_variables["risk_threshold"]  # Access templated parameter
    
    risk_pct = (current_balance / 1000000) * 100
    
    return {
        "risk_level": "high" if risk_pct > threshold else "low",
        "risk_percentage": risk_pct
    }

risk_var = PythonProcessingVariable(
    source_code=calculate_risk_level,
    var_name="risk_assessment"
)
agent.add_variable(risk_var)
```

This pattern allows `PythonProcessingVariable` functions to access script-level configuration while maintaining clean separation.

## 

Conditional Execution

### 

Pre-conditions

Control variable execution based on previous results:

```
from invariantive.model.variable import PythonProcessingVariable

# Check if amount is significant
def is_large_transfer(extracted_variables):
    amount = extracted_variables["human_amount"]
    return amount > 100000  # > 100k tokens

large_check_var = PythonProcessingVariable(
    source_code=is_large_transfer,
    var_name="is_large"
)
agent.add_variable(large_check_var)

# Only process reputation if transfer is large
def check_sender_reputation(extracted_variables):
    # This only runs if is_large is True
    sender = extracted_variables["sender_address"]
    # Reputation checking logic here
    return f"Checking reputation for {sender}"

reputation_var = PythonProcessingVariable(
    source_code=check_sender_reputation,
    var_name="reputation_check",
    pre_conditions=["is_large"]  # Only run if is_large is True
)
agent.add_variable(reputation_var)
```

### 

Trigger Conditions

Add conditions to triggers for fine-grained filtering:

```
from invariantive.model.trigger import Condition

# Only process transfers above threshold
condition = Condition(
    output_index="emitted_arg_2",  # Transfer amount
    operator="gt",
    operands=["1000000000000"]  # 1M tokens
)

trigger.add_condition(condition)

# Multiple conditions
min_amount_condition = Condition(
    output_index="emitted_arg_2",
    operator="gt",
    operands=["1000000"]
)

max_amount_condition = Condition(
    output_index="emitted_arg_2",
    operator="lt",
    operands=["1000000000000"]
)

trigger.add_condition(min_amount_condition)
trigger.add_condition(max_amount_condition)
```

## 

State Management

### 

Persistent Storage

Store and retrieve data across agent executions:

```
from invariantive.model.variable import SetValueVariable, GetValueVariable

# Store last seen balance
def store_balance(extracted_variables):
    balance = extracted_variables["current_balance"]
    return str(balance)

store_var = PythonProcessingVariable(
    source_code=store_balance,
    var_name="balance_to_store"
)
agent.add_variable(store_var)

# Save to persistent storage
set_var = SetValueVariable(
    key="last_balance",
    value="extracted_variables.balance_to_store",
    var_name="stored_result"
)
agent.add_variable(set_var)

# Retrieve in next execution
get_var = GetValueVariable(
    key="last_balance",
    var_name="previous_balance"
)
agent.add_variable(get_var)

# Calculate change
def calculate_change(extracted_variables):
    current = extracted_variables["current_balance"]
    previous = extracted_variables["previous_balance"]
    
    if previous is False:  # First run
        return 0
    
    return current - int(previous)

change_var = PythonProcessingVariable(
    source_code=calculate_change,
    var_name="balance_change"
)
agent.add_variable(change_var)
```

### 

State-Based Alerts

Create alerts that track state changes:

```
alert = AlertConfig(
    var_name="balance_change",
    operator="gt",
    operands=[1000000],
    description="Balance increased by {{balance_change}} (previous: {{previous_balance}}, current: {{current_balance}})"
)
agent.set_alert(alert)
```

## 

Secret Management

### 

Storing Secrets

Store sensitive data securely:

```


# Store API credentials
agent.save_secret("coingecko_api_key", "your-api-key-here")
agent.save_secret("telegram_bot_token", "your-bot-token")
```

### 

Using Secrets

Retrieve secrets in variables:

```
from invariantive.model.variable import GetSecretVariable

# Get API key
api_key_var = GetSecretVariable(
    secret_name="coingecko_api_key",
    var_name="api_key"
)
agent.add_variable(api_key_var)

# Use in API call
def fetch_price_with_auth(extracted_variables):
    import requests
    
    api_key = extracted_variables["api_key"]
    if api_key is False:
        return {"error": "API key not found"}
    
    headers = {"Authorization": f"Bearer {api_key}"}
    response = requests.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",
        headers=headers
    )
    return response.json()

price_var = PythonProcessingVariable(
    source_code=fetch_price_with_auth,
    var_name="price_data"
)
agent.add_variable(price_var)
agent.save_secret("coingecko_api_key", "your-api-key-here") # Will only execute during creation of the agent
```

### 

Alternative: JsonEndpointVariable

For simpler API calls without complex authentication, you can use JsonEndpointVariable:

```
from invariantive.model.variable import JsonEndpointVariable

# Simple API call without authentication
simple_api_var = JsonEndpointVariable(
    var_name="get_offchain_data",
    method="get", 
    url="https://dogk3wv4lymlcxoq3qb3rbbqeq0jmpli.lambda-url.us-east-1.on.aws/",
    json_path="data", 
    json_path_engine="jsonata"
)
agent.add_variable(simple_api_var)
```

## 

Complex Python Processing

### 

Advanced Web3 Usage

Leverage Web3.py for complex blockchain interactions:

```
def analyze_contract_interactions(extracted_variables):
    from web3 import Web3
    import json
    
    # Get Web3 instance - w3 object is already connected
    w3 = get_node('ethereum').w3
    
    # Get transaction receipt
    tx_hash = extracted_variables["tx_hash"]
    receipt = w3.eth.get_transaction_receipt(tx_hash)
    
    # Analyze logs (avoid list comprehensions with complex operations)
    total_events = len(receipt.logs)
    unique_addresses = []
    for log in receipt.logs:
        if log.address not in unique_addresses:
            unique_addresses.append(log.address)
    unique_contracts = len(unique_addresses)
    
    # Check if transaction involved DEX
    dex_addresses = [
        "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",  # Uniswap V2
        "0xE592427A0AEce92De3Edee1F18E0157C05861564",  # Uniswap V3
    ]
    
    involved_dex = False
    for log in receipt.logs:
        for dex_addr in dex_addresses:
            if log.address.lower() == dex_addr.lower():
                involved_dex = True
                break
        if involved_dex:
            break
    
    return {
        "total_events": total_events,
        "unique_contracts": unique_contracts,
        "gas_used": receipt.gasUsed,
        "involved_dex": involved_dex,
        "analysis": f"Transaction involved {unique_contracts} contracts and {total_events} events"
    }

def multi_contract_analysis(extracted_variables):
    """Example showing multiple contract calls and Bitcoin integration"""
    from web3 import Web3
    
    # Get Ethereum Web3 instance
    eth_w3 = get_node('ethereum').w3
    
    # Get Bitcoin Web3 instance for cross-chain analysis
    btc_w3 = get_node('bitcoin').w3
    
    contract_address = extracted_variables["contract_address"]
    market_id = extracted_variables["market_id"]
    
    # Convert address to checksum format
    checksum_address = eth_w3.toChecksumAddress(contract_address)
    
    # Define ABI for multiple function calls
    abi = [
        {
            "inputs": [],
            "name": "totalAssets",
            "outputs": [{"type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{"type": "bytes32"}],
            "name": "idToMarketParams",
            "outputs": [
                {"type": "address", "name": "loanToken"},
                {"type": "address", "name": "collateralToken"},
                {"type": "address", "name": "oracle"},
                {"type": "address", "name": "irm"},
                {"type": "uint256", "name": "lltv"}
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
    
    try:
        # Create contract instance
        contract = eth_w3.contract(address=checksum_address, abi=abi)
        
        # Make multiple contract calls
        total_assets = contract.functions.totalAssets().call()
        market_params = contract.functions.idToMarketParams(market_id).call()
        
        # Extract market parameters
        loan_token = market_params[0]
        collateral_token = market_params[1]
        lltv = market_params[4]
        
        # Calculate LLTV percentage (avoid /= operator)
        lltv_percentage = lltv / 10**16
        
        # Example Bitcoin transaction lookup (if relevant)
        try:
            btc_tx_response = btc_w3.get_transaction("some_tx_id")
            btc_data = btc_tx_response.get("result", {})
        except Exception:
            btc_data = {"error": "Bitcoin data not available"}
        
        return {
            "total_assets": total_assets,
            "loan_token": loan_token,
            "collateral_token": collateral_token,
            "lltv_percentage": lltv_percentage,
            "bitcoin_data": btc_data,
            "checksum_address": checksum_address
        }
        
    except Exception as e:
        return {"error": str(e), "contract_address": contract_address}

analysis_var = PythonProcessingVariable(
    source_code=analyze_contract_interactions,
    var_name="tx_analysis"
)
agent.add_variable(analysis_var)
```

### 

Data Processing with Pandas

Use Pandas for complex data analysis:

```
def analyze_price_trends(extracted_variables):
    import pandas as pd
    import numpy as np
    
    # Get historical price data (assume this comes from previous variables)
    price_history = extracted_variables["price_history"]
    
    # Convert to DataFrame
    df = pd.DataFrame(price_history)
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    df = df.sort_values('timestamp')
    
    # Calculate moving averages
    df['ma_7'] = df['price'].rolling(window=7).mean()
    df['ma_30'] = df['price'].rolling(window=30).mean()
    
    # Calculate volatility
    df['returns'] = df['price'].pct_change()
    volatility = df['returns'].std() * np.sqrt(365)  # Annualized
    
    # Detect trend
    recent_ma_7 = df['ma_7'].iloc[-1]
    recent_ma_30 = df['ma_30'].iloc[-1]
    
    if recent_ma_7 > recent_ma_30 * 1.05:
        trend = "bullish"
    elif recent_ma_7 < recent_ma_30 * 0.95:
        trend = "bearish"
    else:
        trend = "sideways"
    
    return {
        "volatility": volatility,
        "trend": trend,
        "ma_7": recent_ma_7,
        "ma_30": recent_ma_30,
        "latest_price": df['price'].iloc[-1]
    }

trend_var = PythonProcessingVariable(
    source_code=analyze_price_trends,
    var_name="price_trend"
)
agent.add_variable(trend_var)
```

## 

Multi-Chain Agents

### 

Cross-Chain Data Collection

Monitor multiple chains in a single agent:

```
def get_cross_chain_balances(extracted_variables):
    # Get balances across multiple chains
    address = extracted_variables["address"]
    
    balances = {}
    chains = ['ethereum', 'arbitrum', 'polygon']
    
    for chain in chains:
        try:
            w3 = get_node(chain).w3
            balance = w3.eth.get_balance(address)
            balances[chain] = balance
        except Exception as e:
            balances[chain] = 0
    
    total_balance = sum(balances.values())
    
    return {
        "individual_balances": balances,
        "total_balance": total_balance,
        "chain_count": len([b for b in balances.values() if b > 0])
    }

multi_chain_var = PythonProcessingVariable(
    source_code=get_cross_chain_balances,
    var_name="cross_chain_data"
)
agent.add_variable(multi_chain_var)
```

## 

Historical Data Analysis

### 

Time Series Analysis

Analyze patterns over time:

```
from invariantive.model.variable import HistoricalEventsVariable

# Get historical events
history_var = HistoricalEventsVariable(
    chain=Chain.ethereum,
    contract_address="0xdAC17F958D2ee523a2206206994597C13D831ec7",
    event_name="Transfer",
    from_block="21000000",
    to_block="latest",
    var_name="transfer_history"
)
agent.add_variable(history_var)

# Analyze patterns
def analyze_transfer_patterns(extracted_variables):
    transfers = extracted_variables["transfer_history"]
    
    # Group by hour
    hourly_volume = {}
    hourly_count = {}
    
    for transfer in transfers:
        block_time = transfer["block_timestamp"]
        hour = block_time.split("T")[1][:2]  # Extract hour
        amount = transfer["args"]["value"]
        
        if hour not in hourly_volume:
            hourly_volume[hour] = 0
            hourly_count[hour] = 0
        
        hourly_volume[hour] = hourly_volume[hour] + amount
        hourly_count[hour] = hourly_count[hour] + 1
    
    # Find peak hours
    peak_volume_hour = max(hourly_volume.items(), key=lambda x: x[1])
    peak_count_hour = max(hourly_count.items(), key=lambda x: x[1])
    
    return {
        "total_transfers": len(transfers),
        "hourly_volume": hourly_volume,
        "hourly_count": hourly_count,
        "peak_volume_hour": peak_volume_hour[0],
        "peak_count_hour": peak_count_hour[0],
        "analysis": f"Peak volume at hour {peak_volume_hour[0]}, peak count at hour {peak_count_hour[0]}"
    }

pattern_var = PythonProcessingVariable(
    source_code=analyze_transfer_patterns,
    var_name="transfer_patterns"
)
agent.add_variable(pattern_var)
```

## 

Performance Optimization

### 

Robust Python Processing

Handle errors gracefully in custom functions:

```
def robust_api_call(extracted_variables):
    import requests
    import time
    
    max_retries = 3
    retry_delay = 1
    
    for attempt in range(max_retries):
        try:
            response = requests.get(
                "https://api.example.com/data",
                timeout=10
            )
            response.raise_for_status()
            return response.json()
            
        except requests.exceptions.Timeout:
            if attempt < max_retries - 1:
                time.sleep(retry_delay)
                retry_delay = retry_delay * 2  # Exponential backoff
                continue
            return {"error": "API timeout after retries"}
            
        except requests.exceptions.RequestException as e:
            return {"error": f"API error: {str(e)}"}
        
        except Exception as e:
            return {"error": f"Unexpected error: {str(e)}"}
    
    return {"error": "Max retries exceeded"}

robust_var = PythonProcessingVariable(
    source_code=robust_api_call,
    var_name="api_result"
)
agent.add_variable(robust_var)

# Handle errors in subsequent processing
def process_api_result(extracted_variables):
    result = extracted_variables["api_result"]
    
    if "error" in result:
        return f"API call failed: {result['error']}"
    
    # Process successful result
    return result.get("data", "No data found")

process_var = PythonProcessingVariable(
    source_code=process_api_result,
    var_name="processed_result"
)
agent.add_variable(process_var)
```

### 

Alert Error Conditions

Alert on error conditions:

```
def check_for_errors(extracted_variables):
    result = extracted_variables["api_result"]
    return "error" in result

error_check_var = PythonProcessingVariable(
    source_code=check_for_errors,
    var_name="has_error"
)
agent.add_variable(error_check_var)

error_alert = AlertConfig(
    var_name="has_error",
    operator="compare_exact",
    operands=[True],
    description="Agent encountered error: {{api_result}}"
)
agent.set_alert(error_alert)
```

## 

Best Practices

1.  **Variable Dependencies**: Order variables carefully since they execute sequentially
    
2.  **Error Handling**: Always handle potential errors in Python processing
    
3.  **Performance**: Cache expensive operations and API calls
    
4.  **Testing**: Test with various scenarios and edge cases
    
5.  **Logging**: Use descriptive variable names and alert messages
    
6.  **Security**: Use secret management for sensitive data
    
7.  **Documentation**: Comment complex logic and business rules
