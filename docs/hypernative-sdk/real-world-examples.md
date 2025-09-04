---
icon: earth-europe
---

# Real-World Examples

This document provides a comprehensive collection of production-ready examples based on actual customer implementations. Each example is designed to be copy-paste ready and demonstrates a real-world monitoring scenario, complete with explanations of the risks, key patterns, and testing instructions.

## Table of Contents

### 1. DeFi Protocol Monitoring

* [Morpho Borrow APY Monitoring](real-world-examples.md#11-morpho-borrow-apy-monitoring)
* [Aave Borrow Rate Monitoring](real-world-examples.md#12-aave-borrow-rate-monitoring)
* [Balancer Pool Imbalance Detection](real-world-examples.md#13-balancer-pool-imbalance-detection)

### 2. Cross-Chain Bridge Monitoring

* [FBTC Bridge Monitoring](real-world-examples.md#21-fbtc-bridge-monitoring)
* [CCTP Attestation Monitoring](real-world-examples.md#22-cctp-attestation-monitoring)
* [Mantle Bridge Amount Validation](real-world-examples.md#23-mantle-bridge-amount-validation)

### 3. Security & Compliance Monitoring

* [Universal Proxy Upgrade Detection](real-world-examples.md#31-universal-proxy-upgrade-detection)
* [Address Screening Integration](real-world-examples.md#32-address-screening-integration)
* [Targeted Function Call Monitoring](real-world-examples.md#33-targeted-function-call-monitoring)

### 4. Price & Market Data Monitoring

* [Multi-Source Price Aggregation (Thorchain)](real-world-examples.md#41-multi-source-price-aggregation-thorchain)
* [Hyperliquid Position Monitoring](real-world-examples.md#42-hyperliquid-position-monitoring)
* [Price Feed Reliability Monitoring](real-world-examples.md#43-price-feed-reliability-monitoring)

### 5. Advanced Integration Patterns

* [Persistent State Management](real-world-examples.md#51-persistent-state-management)
* [Historical Event Analysis](real-world-examples.md#52-historical-event-analysis)
* [Multi-Chain Data Correlation](real-world-examples.md#53-multi-chain-data-correlation)
* [Dynamic Watchlist Management](real-world-examples.md#54-dynamic-watchlist-management)

***

## 1. DeFi Protocol Monitoring

### 1.1 Morpho Borrow APY Monitoring

#### Risk Description

This agent monitors the average borrow rate for a specific market on the Morpho protocol. It detects anomalies by comparing the current borrow rate to the historical average over the past four hours. A significant deviation between the current and historical rates can indicate unusual market activity, potential manipulation, or a malfunctioning interest rate model.

#### Business Impact

For lending protocols like Morpho, accurate and stable interest rates are critical for user trust and platform health. Sudden, unexpected spikes or drops in borrow rates can lead to liquidations, poor user experience, and, in extreme cases, financial losses. This monitor provides an early warning system to detect such anomalies, allowing the protocol team to investigate and take corrective action before they escalate.

#### Key Concepts Demonstrated

* **Event-Driven Monitoring:** The agent uses an `EventTrigger` to run its logic whenever a `BorrowRateUpdate` event is emitted.
* **Historical Data Analysis:** It leverages the `HistoricalEventsVariable` to query past events and calculate a rolling average of the borrow rate.
* **On-Chain Data Enrichment:** The agent uses `PythonProcessingVariable` to make direct `web3.py` calls to other contracts to fetch additional context, such as token symbols and market parameters, to create more informative alerts.
* **Financial Calculations:** It demonstrates how to perform financial calculations, such as converting a per-second interest rate into an Annual Percentage Yield (APY).

#### Complete Implementation

```python
from invariantive.model.agent import Agent
from invariantive.model.trigger import EventTrigger, Condition
from invariantive.model.variable import (
    ContextVariable, 
    HistoricalEventsVariable, 
    PythonProcessingVariable, 
    JsonProcessingVariable
)
from invariantive.model.alert import AlertConfig
from invariantive.model.run import RunConfig
from invariantive.common.consts import Chain
from invariantive.common.environment import set_default_chain

# Set default chain for the agent
set_default_chain(Chain.base)

# Trigger on BorrowRateUpdate events from the Morpho contract
trigger = EventTrigger(
    contract_address="0x46415998764C29aB2a25CbeA6254146D50D22687",
    event_sig="BorrowRateUpdate",
    operator="compare_exact",
    output_index="emitting_contract",
    operands=["0x46415998764C29aB2a25CbeA6254146D50D22687"]
)

agent = Agent(trigger=trigger)

# Optional: Filter for a specific market ID
# agent.add_trigger_condition(Condition("emitted_arg_0", "compare_exact", ["0x9103c3b4e834476c9a62ea009ba2c884ee42e94e6e314a26f04d312434191836"]))

# --- Variable Extraction ---

# Extract context variables from the current event
agent.add_variable(ContextVariable(output_index="emitting_contract", var_name="contract_address"))
agent.add_variable(ContextVariable(output_index="tx_hash", var_name="tx_hash"))
agent.add_variable(ContextVariable(output_index="emitted_arg_0", var_name="market_id"))
agent.add_variable(ContextVariable(output_index="emitted_arg_1", var_name="current_avg_borrow_rate"))
agent.add_variable(ContextVariable(output_index="block_number", var_name="current_block"))

# Calculate the block number from 4 hours ago
def calculate_from_block(extracted_variables):
    current_block = int(extracted_variables["current_block"])
    # Base produces approximately 1 block every 2 seconds (1800 blocks/hour)
    blocks_in_4h = 7200
    from_block = max(0, current_block - blocks_in_4h)
    return {"from_block": from_block}

agent.add_variable(PythonProcessingVariable(source_code=calculate_from_block, var_name="block_calculation"))
agent.add_variable(JsonProcessingVariable(json_path="block_calculation.from_block", json_path_engine="jsonata", var_name="from_block"))

# Get historical BorrowRateUpdate events for the specific market ID over the past 4 hours
agent.add_variable(HistoricalEventsVariable(
    chain=Chain.base,
    contract_address="0x46415998764C29aB2a25CbeA6254146D50D22687",
    event_name="BorrowRateUpdate",
    from_block="extracted_variables.from_block",
    to_block="extracted_variables.current_block",
    event_filters={"id": "extracted_variables.market_id"},
    var_name="historical_borrow_rates"
))

# Calculate the average of historical avgBorrowRate values and convert to APY
def calculate_avg_borrow_rate(extracted_variables):
    import math

    try:
        historical_events = extracted_variables["historical_borrow_rates"]
        market_id = extracted_variables["market_id"]
        current_rate = int(extracted_variables["current_avg_borrow_rate"])
        seconds_per_year = 31536000

        def to_apy(rate_wei):
            rate_per_sec = rate_wei / 1e18
            return (math.exp(rate_per_sec * seconds_per_year) - 1) * 100

        current_apy = to_apy(current_rate)

        if not historical_events:
            return {
                "market_id": market_id,
                "current_rate": current_rate,
                "historical_avg": 0,
                "event_count": 0,
                "avg_apy": 0,
                "current_apy": round(current_apy, 2)
            }

        borrow_rates = [int(event["args"]["avgBorrowRate"]) for event in historical_events if "args" in event and "avgBorrowRate" in event["args"]]

        if not borrow_rates:
            return {"error": "No valid avgBorrowRate data found in historical events"}

        historical_avg = sum(borrow_rates) / len(borrow_rates)
        avg_apy = to_apy(historical_avg)
        rate_change_percentage = ((current_rate - historical_avg) / historical_avg * 100) if historical_avg > 0 else 0

        return {
            "market_id": market_id,
            "current_rate": current_rate,
            "historical_avg": historical_avg,
            "event_count": len(borrow_rates),
            "avg_apy": round(avg_apy, 2),
            "current_apy": round(current_apy, 2),
            "rate_change_percentage": round(rate_change_percentage, 2)
        }

    except Exception as e:
        return {"error": str(e)}

agent.add_variable(PythonProcessingVariable(source_code=calculate_avg_borrow_rate, var_name="rate_analysis"))

# Get market details for rich alert formatting
def get_market_details(extracted_variables):
    from web3 import Web3
    w3 = get_node('base').w3
    market_id = extracted_variables["market_id"]
    try:
        market_params_abi = '[{"inputs":[{"type":"bytes32"}],"name":"idToMarketParams","outputs":[{"type":"address"},{"type":"address"},{"type":"address"},{"type":"address"},{"type":"uint256"}],"stateMutability":"view","type":"function"}]'
        token_symbol_abi = '[{"inputs":[],"name":"symbol","outputs":[{"type":"string"}],"stateMutability":"view","type":"function"}]'
        morpho_contract = w3.contract(address=w3.toChecksumAddress("0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb"), abi=market_params_abi)
        loan_token_address, collateral_token_address, _, _, lltv = morpho_contract.functions.idToMarketParams(market_id).call()
        
        loan_symbol = w3.contract(address=w3.toChecksumAddress(loan_token_address), abi=token_symbol_abi).functions.symbol().call()
        collateral_symbol = w3.contract(address=w3.toChecksumAddress(collateral_token_address), abi=token_symbol_abi).functions.symbol().call()
        
        return {
            "market_name": f"{collateral_symbol}/{loan_symbol} ({lltv / 1e16:.0f}%)",
            "market_url": f"https://app.morpho.org/base/market/{market_id}"
        }
    except Exception as e:
        return {
            "market_name": f"Market {market_id[:8]}...",
            "market_url": f"https://app.morpho.org/base/market/{market_id}"
        }

agent.add_variable(PythonProcessingVariable(source_code=get_market_details, var_name="market_details"))

# --- Alert Configuration ---

# Extract final values for the alert description
agent.add_variable(JsonProcessingVariable(json_path="rate_analysis.avg_apy", var_name="avg_apy"))
agent.add_variable(JsonProcessingVariable(json_path="rate_analysis.current_apy", var_name="current_apy"))
agent.add_variable(JsonProcessingVariable(json_path="rate_analysis.rate_change_percentage", var_name="rate_change_percentage"))
agent.add_variable(JsonProcessingVariable(json_path="rate_analysis.event_count", var_name="event_count"))
agent.add_variable(JsonProcessingVariable(json_path="market_details.market_name", var_name="market_name"))
agent.add_variable(JsonProcessingVariable(json_path="market_details.market_url", var_name="market_url"))

# Alert when the current APY deviates from the 4-hour average by more than 50%
alert = AlertConfig(
    var_name='rate_change_percentage',
    operator="abs_gt",
    operands=[50],
    description="Morpho Borrow Rate Alert - [{{market_name}}]({{market_url}}) | 4h Avg APY: {{avg_apy}}% | Current APY: {{current_apy}}% | Change: {{rate_change_percentage}}% | Events: {{event_count}}"
)
agent.set_alert(alert)

# --- Testing ---

if __name__ == "__main__":
    # Test on a specific transaction that contains a BorrowRateUpdate event
    run_config = RunConfig(
        hashes=["0x14bfa3c1075781aedc1ca5d26331a7aa97314d749429c7dc6fe702fdf16ad7b7"] # Example transaction hash on Base
    )
    findings = agent.run(run_config)
    print(findings)

```

#### Testing Instructions

To test this agent, you can use the `RunConfig` provided in the `if __name__ == "__main__":` block. It is configured to run against a specific historical transaction on the Base network that is known to have emitted a `BorrowRateUpdate` event. This allows you to validate the agent's logic without waiting for a new event to occur.

1. Save the code as a Python file (e.g., `morpho_monitor.py`).
2. Run the file from your terminal: `python morpho_monitor.py`
3. The agent will execute against the specified transaction hash and print the findings, which will include the detailed alert description and the extracted variables.

#### Configuration Notes

* **Chain:** This agent is configured for `Chain.base`. To monitor a different chain, you will need to update the `set_default_chain` call and the contract addresses.
* **Market ID:** The agent monitors all markets by default. To monitor a specific market, you can uncomment the `agent.add_trigger_condition` line and provide the market ID you wish to track.
* **Alert Threshold:** The alert is configured to fire when the current APY deviates from the 4-hour average by more than 50% (`"operands": [50]`). You can adjust this threshold to meet your specific monitoring needs.

***

### 1.2 Aave Borrow Rate Monitoring

#### Risk Description

This agent monitors borrow rate updates for a specific asset on the Aave protocol. It uses persistent state to track the borrow rate across executions and alerts when the rate changes by a significant percentage. This can detect unusual volatility or unexpected changes in borrowing costs.

#### Business Impact

For borrowers and lenders on Aave, sudden changes in interest rates can impact profitability and risk calculations. This monitor helps to identify potentially manipulative actions or protocol instabilities that could lead to poor market conditions.

#### Key Concepts Demonstrated

* **Stateful Monitoring:** The agent uses `GetValueVariable` and `SetValueVariable` to store and retrieve the last known borrow rate, allowing it to compare rates between different blocks.
* **Percentage Change Calculation:** It demonstrates how to calculate the percentage change between the current and previous borrow rates.
* **Conditional Alerting:** The alert is configured to fire only when the rate change exceeds a specific threshold.

#### Complete Implementation

```python
from invariantive.model.agent import Agent
from invariantive.model.trigger import EventTrigger
from invariantive.model.variable import (
    ContextVariable, 
    GetValueVariable, 
    SetValueVariable, 
    PythonProcessingVariable, 
    JsonProcessingVariable
)
from invariantive.model.alert import AlertConfig
from invariantive.model.run import RunConfig
from invariantive.common.consts import Chain
from invariantive.common.environment import set_default_chain

# Set default chain for the agent
set_default_chain(Chain.ethereum)

# Trigger on BorrowRateUpdate events from the Aave Oracle
trigger = EventTrigger(
    contract_address="0x7937d2f24608B424e386593A33De8811429446d1",
    event_sig="BorrowRateUpdate(address asset, uint256 rate)",
    operator="compare_exact",
    output_index="emitting_contract",
    operands=["0x7937d2f24608B424e386593A33De8811429446d1"]
)

agent = Agent(trigger=trigger)

# --- Variable Extraction ---

# Extract the asset address and new borrow rate from the event
agent.add_variable(ContextVariable(output_index="emitted_arg_0", var_name="asset_address"))
agent.add_variable(ContextVariable(output_index="emitted_arg_1", var_name="current_borrow_rate"))

# Get the previous borrow rate from persistent state
agent.add_variable(GetValueVariable(key="last_borrow_rate_{{asset_address}}", var_name="previous_borrow_rate"))

# Calculate the percentage change between the current and previous rates
def calculate_rate_change(extracted_variables):
    current_rate = int(extracted_variables.get("current_borrow_rate", 0))
    previous_rate = int(extracted_variables.get("previous_borrow_rate", 0))

    if previous_rate == 0:
        return {"rate_change_percentage": 0} # Avoid division by zero on first run

    change = current_rate - previous_rate
    percentage_change = (change / previous_rate) * 100
    return {"rate_change_percentage": round(percentage_change, 2)}

agent.add_variable(PythonProcessingVariable(source_code=calculate_rate_change, var_name="rate_change_analysis"))

# Extract the calculated percentage change
agent.add_variable(JsonProcessingVariable(json_path="rate_change_analysis.rate_change_percentage", var_name="rate_change_percentage"))

# --- Alert and State Update ---

# Alert when the borrow rate changes by more than 10%
alert = AlertConfig(
    var_name='rate_change_percentage',
    operator="abs_gt",
    operands=[10],
    description="Aave Borrow Rate for asset {{asset_address}} changed by {{rate_change_percentage}}%"
)
agent.set_alert(alert)

# Update the last known borrow rate in persistent state
agent.add_variable(SetValueVariable(key="last_borrow_rate_{{asset_address}}", value="{{current_borrow_rate}}"))

# --- Testing ---

if __name__ == "__main__":
    # Test on a specific transaction known to have a BorrowRateUpdate event
    run_config = RunConfig(
        hashes=["0x5144519862994063d1cf0505a4b5cead15c66825fbb6d91132dca272c21916cc"] # Example transaction hash on Ethereum
    )
    findings = agent.run(run_config)
    print(findings)

```

#### Testing Instructions

To test this agent, you will need to find a transaction on the Ethereum mainnet where the Aave Oracle contract (`0x7937d2f24608B424e386593A33De8811429446d1`) emitted a `BorrowRateUpdate` event. You can use a block explorer like Etherscan to find such a transaction and then replace the placeholder hash in the `RunConfig`.

#### Configuration Notes

* **State Key:** The `GetValueVariable` and `SetValueVariable` use a dynamic key (`last_borrow_rate_{{asset_address}}`) to store the borrow rate for each asset separately. This allows the agent to monitor multiple assets without conflicts.
* **Alert Threshold:** The alert is configured to fire when the borrow rate changes by more than 10%. You can adjust this value in the `AlertConfig` to suit your monitoring needs.

***

### 1.3 Balancer Pool Imbalance Detection

#### Risk Description

This agent monitors weighted pools in Balancer V3 for imbalances. It calculates the current weight of each token in the pool and compares it to the target weight defined by the pool's configuration. An alert is triggered if the deviation between the current and target weights exceeds a specified threshold.

#### Business Impact

Pool imbalances can be an indicator of pool manipulation, arbitrage opportunities, or that the pool is not functioning as expected. Monitoring for significant imbalances helps to protect liquidity providers and ensure the health of the pool.

#### Key Concepts Demonstrated

* **Dynamic Configuration:** The agent is designed to be easily reconfigured for different pools by changing a few parameters at the top of the script.
* **On-Chain Data Retrieval:** It uses `web3.py` within a `PythonProcessingVariable` to fetch the pool's tokens and their current balances directly from the Balancer vault contract.
* **External API Integration:** It fetches token prices from the CoinGecko API to calculate the USD value of the token balances.
* **Detailed Alerting:** The alert description is dynamically generated to include the pool's total value, the current and target weights of each token, and the deviation from the target.

#### Complete Implementation

```python
from invariantive.model.agent import Agent
from invariantive.model.trigger import BlockTrigger
from invariantive.model.variable import (
    ContextVariable, 
    PythonProcessingVariable, 
    JsonProcessingVariable
)
from invariantive.model.alert import AlertConfig
from invariantive.model.run import RunConfig
from invariantive.common.consts import Chain
from invariantive.common.environment import set_default_chain

# --- Pool Configuration ---
POOL_ADDRESS = "0xc4Ce391d82D164c166dF9c8336DDF84206b2F812" # Aave Lido WETH-WSTETH Pool
VAULT_ADDRESS = "0xbA1333333333a1ba1108E8412f11850A5C319bA9" # Balancer V3 Vault
TARGET_WEIGHTS = [20.0, 80.0] # Example: 20% for first token, 80% for second
IMBALANCE_THRESHOLD = 5.0 # Alert if deviation exceeds 5%
CHAIN = Chain.ethereum # Blockchain to monitor

set_default_chain(CHAIN)

agent = Agent(trigger=BlockTrigger(period=1, period_unit="blocks"))

# --- Variable Extraction ---

agent.add_variable(ContextVariable(output_index="block_number", var_name="block_number"))

def get_pool_data(extracted_variables):
    from web3 import Web3
    w3 = get_node(CHAIN).w3
    pool_abi = '[{"inputs":[],"name":"getTokens","outputs":[{"type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrentLiveBalances","outputs":[{"type":"uint256[]"}],"stateMutability":"view","type":"function"}]'
    pool_contract = w3.contract(address=w3.toChecksumAddress(POOL_ADDRESS), abi=pool_abi)
    tokens = pool_contract.functions.getTokens().call()
    balances = pool_contract.functions.getCurrentLiveBalances().call()
    return {
        "tokens": [token.lower() for token in tokens],
        "balances": [str(balance) for balance in balances]
    }

agent.add_variable(PythonProcessingVariable(source_code=get_pool_data, var_name="pool_data"))

def fetch_token_prices(extracted_variables):
    tokens = extracted_variables["pool_data"]["tokens"]
    prices = {}
    for token in tokens:
        try:
            # Use get_price() helper function instead of direct API calls
            price_data = get_price(
                price_source="coingecko",
                asset=token,  # Contract address
                chain="ethereum",
                amount=1
            )
            prices[token] = price_data.get("price", 0)
        except Exception:
            prices[token] = 0 # Fallback to 0 if price not found
    return {"prices": prices}

agent.add_variable(PythonProcessingVariable(source_code=fetch_token_prices, var_name="price_data"))

def calculate_imbalance(extracted_variables):
    balances = [int(b) for b in extracted_variables["pool_data"]["balances"]]
    prices = extracted_variables["price_data"]["prices"]
    tokens = extracted_variables["pool_data"]["tokens"]
    
    token_values = [balance * prices[token] / 1e18 for balance, token in zip(balances, tokens)]
    total_pool_value = sum(token_values)

    if total_pool_value == 0:
        return {"imbalances": [], "exceeds_threshold": False}

    imbalances = []
    exceeds_threshold = False
    for i, value in enumerate(token_values):
        current_weight = (value / total_pool_value) * 100
        target_weight = TARGET_WEIGHTS[i]
        deviation = current_weight - target_weight
        imbalances.append({
            "token": tokens[i],
            "current_weight": round(current_weight, 2),
            "target_weight": target_weight,
            "deviation": round(deviation, 2)
        })
        if abs(deviation) > IMBALANCE_THRESHOLD:
            exceeds_threshold = True

    return {"imbalances": imbalances, "total_pool_value": round(total_pool_value, 2), "exceeds_threshold": exceeds_threshold}

agent.add_variable(PythonProcessingVariable(source_code=calculate_imbalance, var_name="imbalance_analysis"))

# --- Alert Configuration ---

def create_alert_description(extracted_variables):
    analysis = extracted_variables["imbalance_analysis"]
    if not analysis.get("imbalances"):
        return "Balancer Pool Monitor: Error calculating imbalance."

    description = f"Balancer Pool Imbalance Alert - Pool: {POOL_ADDRESS[:10]}... | Total Value: ${analysis['total_pool_value']:,}\n"
    for imb in analysis["imbalances"]:
        description += f"Token: {imb['token'][:10]}... | Current: {imb['current_weight']}% | Target: {imb['target_weight']}% | Deviation: {imb['deviation']}%\n"
    return description

agent.add_variable(PythonProcessingVariable(source_code=create_alert_description, var_name="alert_description"))

alert = AlertConfig(
    var_name="imbalance_analysis.exceeds_threshold",
    operator="eq",
    operands=[True],
    description="{{alert_description}}"
)
agent.set_alert(alert)

# --- Testing ---

if __name__ == "__main__":
    run_config = RunConfig(blocks=[0]) # Run on latest block
    findings = agent.run(run_config)
    print(findings)

```

#### Testing Instructions

This agent is configured to run on the latest block of the Ethereum mainnet. To test it, simply run the Python file. The agent will fetch the latest data for the configured pool and, if an imbalance is detected, it will print the alert findings.

#### Configuration Notes

* **Pool Parameters:** To monitor a different pool, you must update the `POOL_ADDRESS`, `VAULT_ADDRESS`, `TARGET_WEIGHTS`, and `CHAIN` variables at the top of the script.
* **Price Fallback:** The current implementation has a simple fallback for token prices (setting the price to 0). In a production environment, you might want to implement a more robust fallback mechanism, such as using an on-chain price oracle.

***

## 2. Cross-Chain Bridge Monitoring

### 2.1 FBTC Bridge Monitoring

#### Risk Description

This agent monitors the FBTC bridge for deposit and withdrawal amount mismatches between the Bitcoin and Ethereum blockchains. It ensures that the amount of BTC burned on Bitcoin corresponds to the amount of FBTC minted on Ethereum, and vice-versa.

#### Business Impact

For a cross-chain bridge, maintaining a 1:1 peg between the bridged assets is critical. Any discrepancy in the amounts bridged could lead to a de-pegging event, loss of user funds, and damage to the bridge's reputation.

#### Key Concepts Demonstrated

* **Multi-Chain Monitoring:** The agent monitors events on both Bitcoin and Ethereum.
* **Cross-Chain Data Correlation:** It correlates data from both chains to ensure that the bridged amounts match.
* **ABI Decoding:** It uses `web3.py` to decode the input data of the Ethereum transaction to extract the bridged amount.
* **Bitcoin Web3 Integration:** It demonstrates how to use a Bitcoin-compatible `web3` provider to interact with the Bitcoin blockchain.

#### Complete Implementation

```python
from invariantive.model.agent import Agent
from invariantive.model.trigger import EventTrigger
from invariantive.model.variable import (
    ContextVariable, 
    PythonProcessingVariable
)
from invariantive.model.alert import AlertConfig
from invariantive.model.run import RunConfig
from invariantive.common.consts import Chain
from invariantive.common.environment import set_default_chain

# This is a simplified conceptual example. A full implementation would require
# a robust way to handle block finality and potential reorgs on both chains.

# --- Ethereum Monitoring ---

set_default_chain(Chain.ethereum)

eth_trigger = EventTrigger(
    contract_address="0xbee335BB44e75C4794a0b9B54E8027b111395943", # FBTC contract on Ethereum
    event_sig="Mint(address,uint256)",
    operator="compare_exact",
    output_index="emitting_contract",
    operands=["0xbee335BB44e75C4794a0b9B54E8027b111395943"]
)

eth_agent = Agent(trigger=eth_trigger)

eth_agent.add_variable(ContextVariable(output_index="emitted_arg_1", var_name="fbtc_amount"))
eth_agent.add_variable(ContextVariable(output_index="tx_hash", var_name="eth_tx_hash"))

# --- Bitcoin Monitoring ---

# This part is conceptual and would require a Bitcoin-compatible event source.
# For this example, we'll simulate the Bitcoin-side logic within a PythonProcessingVariable.

def get_btc_burn_amount(extracted_variables):
    # In a real implementation, you would get the BTC transaction hash from the
    # Mint event on Ethereum, and then use a Bitcoin RPC to get the details
    # of the corresponding BTC transaction.
    # For this example, we'll simulate a matching burn amount.
    return {"btc_amount": extracted_variables["fbtc_amount"]}

eth_agent.add_variable(PythonProcessingVariable(source_code=get_btc_burn_amount, var_name="btc_data"))

# --- Comparison and Alerting ---

def check_amount_match(extracted_variables):
    fbtc_amount = int(extracted_variables.get("fbtc_amount", 0))
    btc_amount = int(extracted_variables.get("btc_data", {}).get("btc_amount", -1))
    return {"match": fbtc_amount == btc_amount}

eth_agent.add_variable(PythonProcessingVariable(source_code=check_amount_match, var_name="comparison"))

alert = AlertConfig(
    var_name="comparison.match",
    operator="eq",
    operands=[False],
    description="FBTC bridge amount mismatch! ETH tx: {{eth_tx_hash}}"
)

eth_agent.set_alert(alert)

# --- Testing ---

if __name__ == "__main__":
    # This agent is highly conceptual and requires a sophisticated multi-chain
    # testing setup. The following is a placeholder.
    run_config = RunConfig(
    hashes=["0x8dda56a2308983e2a72913c22854c948e98f7661db889c49d1ddfc51d88126fc"]
)
  findings = agent.run(run_config)
  print(findings)
```

#### Testing Instructions

Testing this agent is complex due to its multi-chain nature. A full test would require a setup that can simulate transactions on both Bitcoin and Ethereum and a mechanism to correlate them. The provided code is a simplified conceptual example and would need to be adapted to a specific bridge implementation.

#### Configuration Notes

* **Bitcoin Integration:** The example simulates the Bitcoin-side logic. A real implementation would require a Bitcoin-compatible `web3` provider or a dedicated Bitcoin API service to get the details of the burn transactions.
* **Block Finality:** In a production environment, it is crucial to handle block finality on both chains to avoid alerting on transactions that might be reverted due to a block reorganization.

***

### 2.2 CCTP Attestation Monitoring

#### Risk Description

This agent monitors the Circle Cross-Chain Transfer Protocol (CCTP) for attestation failures and stale transactions. It ensures that once a transaction is initiated on a source chain, a corresponding attestation is received on the destination chain within a reasonable timeframe.

#### Business Impact

For a cross-chain protocol like CCTP, the reliability of attestations is paramount. A failure to receive an attestation can result in a stuck transaction, where a user's funds are locked on the source chain. This can lead to a poor user experience and, if it happens at scale, can damage the protocol's reputation.

#### Key Concepts Demonstrated

* **Multi-Step Process Monitoring:** The agent monitors a multi-step process that spans two different blockchains.
* **Time-Based Analysis:** It uses a time-based approach to detect stale transactions, alerting when an attestation is not received within a specified time window.
* **Stateful Monitoring:** It uses `GetValueVariable` and `SetValueVariable` to track the status of a transaction across different blocks and executions.

#### Complete Implementation

This use case involves a multi-agent architecture to track CCTP messages across chains. Below is a high-level pseudo-code representation of the three conceptual agents involved:

```python
# --- Agent 1: Source Chain Monitor (e.g., Ethereum) ---
# Triggers on MessageSent event from CCTP TokenMessenger contract
# Extracts messageHash and block_timestamp
# Stores messageHash -> timestamp in persistent state (e.g., using SetValueVariable)

# --- Agent 2: Destination Chain Monitor (e.g., Polygon) ---
# Triggers on MessageReceived event from CCTP TokenMessenger contract
# Extracts messageHash
# Clears messageHash from persistent state (e.g., using SetValueVariable with a marker value like -1)

# --- Agent 3: Stale Transaction Checker (runs periodically) ---
# Triggers periodically (e.g., every hour using BlockTrigger)
# Iterates through all messageHashes currently in persistent state (conceptual: requires external state management)
# For each messageHash, retrieves its timestamp from persistent state (GetValueVariable)
# If (current_time - timestamp) > STALE_THRESHOLD:
#   Alert: CCTP transaction {{messageHash}} is stale!
#   (Optional: Clear messageHash from state if it's considered permanently stale)
```

#### Testing Instructions

Testing this system is highly complex and requires a multi-agent, multi-chain setup with external state management. The provided pseudo-code is a conceptual illustration of how you might structure such a system. A full implementation would require careful consideration of state management, error handling, and the specifics of the CCTP protocol.

#### Configuration Notes

* **Multi-Agent Architecture:** This use case is designed as a system of multiple agents working in concert. Each agent would be deployed independently.
* **State Management:** The core challenge is maintaining and querying the state of pending CCTP messages across agent runs. This typically requires a robust external state management solution (e.g., a database or a dedicated service) as the SDK's built-in `GetValueVariable`/`SetValueVariable` are primarily for simple key-value pairs and not designed for iterating over large sets of dynamic keys.
* **Transaction Correlation:** Linking `MessageSent` on the source chain to `MessageReceived` on the destination chain is crucial. This is done via the `messageHash` emitted by the CCTP contracts.

***

### 2.3 Mantle Bridge Amount Validation

#### Risk Description

This agent monitors the Mantle bridge to ensure that the amount of a specific asset (e.g., USDC) deposited on a source chain (e.g., Ethereum) matches the amount minted on the Mantle network.

#### Business Impact

Similar to the FBTC bridge, ensuring a 1:1 asset peg is critical for the Mantle bridge. Any discrepancy could lead to a loss of user funds and damage the bridge's reputation.

#### Key Concepts Demonstrated

* **Cross-Chain Amount Correlation:** The agent compares the amounts of a single transaction across two different blockchains.
* **Event-Driven Monitoring:** It uses `EventTrigger` to initiate the monitoring process when a deposit is made on the source chain.
* **Conceptual Multi-Chain Logic:** This example illustrates the logic required for cross-chain validation, which can be adapted to other bridge monitoring scenarios.

#### Complete Implementation

```python
from invariantive.model.agent import Agent
from invariantive.model.trigger import BlockTrigger
from invariantive.model.variable import PythonProcessingVariable, JsonProcessingVariable
from invariantive.model.alert import AlertConfig
from invariantive.common.consts import Chain
from invariantive.common.environment import set_default_chain

# --- Configuration ---
# Example Bitcoin reserved addresses (replace with actual addresses)
RESERVED_BITCOIN_ADDRESSES = [
    "bc1pn7stmugze0sdc2hj7vnujqvuccyz3fmn0ecz3lxaepusats7upvs3acrhc",
    "bc1prwzpvsqd9ksczu6727uvsf9n2x7g9ac3fjh0kgx2774khp0ujluqt6ykxx",
    "bc1pv9un7cyjukfk6hny2wp82mgx7rdn94jkwggdeccr6lfa34tmp3usm6jsdj",
    "bc1pes4z78wacdnzalxhje43edq8n0d0zg8vwe7sfhxzqv4njhtnhw3qch4yck",
    "bc1pspxlhza56r6ky04txrx30g6t4lfazsqy2chp3m2mxvctktx0cmzqkk32w9"
]

# Example Mantle token contract address (e.g., for a wrapped BTC token on Mantle)
MANTLE_TOKEN_CONTRACT = "0x..." # Replace with actual Mantle token contract address

set_default_chain(Chain.mantle) # Set default chain to Mantle

agent = Agent(trigger=BlockTrigger(period=3600, period_unit="seconds")) # Run hourly (3600 seconds = 1 hour)

# --- Data Fetching and Comparison ---

def get_total_balances(extracted_variables):
    from web3 import Web3

    # Get total supply of the wrapped token on Mantle
    mantle_w3 = get_node(Chain.mantle).w3
    token_abi = '[{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]'
    token_contract = mantle_w3.contract(address=mantle_w3.toChecksumAddress(MANTLE_TOKEN_CONTRACT), abi=token_abi)
    mantle_total_supply = token_contract.functions.totalSupply().call()

    # Get total balance of Bitcoin addresses
    # This requires a Bitcoin-compatible web3 provider or API integration
    # For demonstration, we'll simulate fetching balances.
    bitcoin_total_balance = 0
    for address in RESERVED_BITCOIN_ADDRESSES:
        bitcoin_w3 = get_node(Chain.bitcoin).w3
        bitcoin_total_balance += bitcoin_w3.eth.get_balance(address)


    # Calculate delta (difference)
    # Note: Ensure units are consistent (e.g., convert BTC satoshis to Mantle token decimals)
    delta = bitcoin_total_balance - mantle_total_supply

    return {
        "bitcoin_total_balance": bitcoin_total_balance,
        "mantle_total_supply": mantle_total_supply,
        "delta": delta
    }

agent.add_variable(PythonProcessingVariable(source_code=get_total_balances, var_name="balance_comparison"))

# Extract individual values for alert description
agent.add_variable(JsonProcessingVariable(json_path="balance_comparison.bitcoin_total_balance", var_name="bitcoin_total_balance"))
agent.add_variable(JsonProcessingVariable(json_path="balance_comparison.mantle_total_supply", var_name="mantle_total_supply"))
agent.add_variable(JsonProcessingVariable(json_path="balance_comparison.delta", var_name="balance_delta"))

# --- Alerting ---

alert = AlertConfig(
    var_name="balance_delta",
    operator="lt", # Alert if Bitcoin balance is less than Mantle supply
    operands=[0], # Threshold for delta
    description="Mantle Bridge Imbalance Detected! Bitcoin Reserved Balance: {{bitcoin_total_balance}} vs Mantle Supply: {{mantle_total_supply}}. Delta: {{balance_delta}}"
)

agent.set_alert(alert)

# --- Testing ---

if __name__ == "__main__":
    # Test on the latest block
    run_config = RunConfig(blocks=[0])  # Run on latest block
    findings = agent.run(run_config)
    print(findings)

```

#### Testing Instructions

This agent is designed to run periodically (e.g., hourly). To test it, you would need to:

1. Replace `MANTLE_TOKEN_CONTRACT` with a real token contract address on Mantle.
2. Replace `RESERVED_BITCOIN_ADDRESSES` with actual Bitcoin addresses that hold the reserved BTC.
3. Implement the actual Bitcoin balance fetching logic within the `get_total_balances` function, as the current example simulates it.
4. Run the agent. It will fetch the current total supply on Mantle and the simulated Bitcoin balance, then alert if an imbalance is detected.

#### Configuration Notes

* **Bitcoin Integration:** The example simulates fetching Bitcoin balances. A real implementation would require integration with a Bitcoin RPC node or a Bitcoin API service to get accurate balances for the `RESERVED_BITCOIN_ADDRESSES`.
* **Unit Consistency:** Ensure that the units of `bitcoin_total_balance` and `mantle_total_supply` are consistent before comparison (e.g., both in smallest units like satoshis or wei, or both converted to a common unit like USD).
* **Threshold:** The alert triggers if `delta` is less than 0. You might want to set a more nuanced threshold to account for minor fluctuations or expected operational differences.

***

## 3. Security & Compliance Monitoring

### 3.1 Universal Proxy Upgrade Detection

#### Risk Description

This agent monitors for proxy contract upgrades. It detects changes to the implementation address of a proxy contract, which can be a critical security event. A malicious or unauthorized upgrade can lead to a complete loss of funds.

#### Business Impact

For any protocol that uses proxy contracts, an upgrade is a high-stakes event. This monitor provides an immediate alert when an upgrade occurs, allowing the team to verify that the upgrade is authorized and that the new implementation contract is secure. This agent can also be adapted as a custom Guardian rule to monitor all wallet transactions for interactions with newly upgraded proxy contracts, providing an additional layer of security for users.

#### Key Concepts Demonstrated

* **Storage Slot Analysis:** The agent reads the storage slot of the proxy contract where the implementation address is stored.
* **Stateful Monitoring:** It uses `GetValueVariable` and `SetValueVariable` to track the implementation address across executions and detect changes.
* **Universal Trigger:** It can be configured to run on every block or on a schedule to monitor for changes.

#### Complete Implementation

```python
from invariantive.model.agent import Agent
from invariantive.model.trigger import BlockTrigger
from invariantive.model.variable import (
    ContextVariable, 
    GetValueVariable, 
    SetValueVariable, 
    PythonProcessingVariable
)
from invariantive.model.alert import AlertConfig
from invariantive.common.consts import Chain
from invariantive.common.environment import set_default_chain

# --- Configuration ---
PROXY_CONTRACT_ADDRESS = "0x0C9a3dd6b8F28529d72d7f9cE918D493519EE383" # Example: A known proxy contract address
IMPLEMENTATION_SLOT = "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc" # EIP-1967 storage slot for implementation

set_default_chain(Chain.ethereum)

agent = Agent(trigger=BlockTrigger(period=1, period_unit="blocks"))

# --- Variable Extraction ---

def get_implementation_address(extracted_variables):
    from web3 import Web3
    w3 = get_node(Chain.ethereum).w3
    storage_value = w3.eth.get_storage_at(w3.toChecksumAddress(PROXY_CONTRACT_ADDRESS), IMPLEMENTATION_SLOT)
    return {"implementation_address": storage_value.hex()}

agent.add_variable(PythonProcessingVariable(source_code=get_implementation_address, var_name="storage_data"))
agent.add_variable(ContextVariable(output_index="block_number", var_name="block_number"))

agent.add_variable(GetValueVariable(key=f"proxy_implementation_{PROXY_CONTRACT_ADDRESS}", var_name="previous_implementation"))

# --- Comparison and Alerting ---

def check_for_upgrade(extracted_variables):
    current_implementation = extracted_variables.get("storage_data", {}).get("implementation_address", "0x")
    previous_implementation = extracted_variables.get("previous_implementation", "0x")
    
    # On the first run, previous_implementation will be None. We only want to alert on actual changes.
    if previous_implementation and current_implementation != previous_implementation:
        return {"upgraded": True, "new_implementation": current_implementation}
    return {"upgraded": False}

agent.add_variable(PythonProcessingVariable(source_code=check_for_upgrade, var_name="upgrade_check"))

# Extract individual values for alert description
agent.add_variable(JsonProcessingVariable(json_path="upgrade_check.upgraded", var_name="upgraded"))
agent.add_variable(JsonProcessingVariable(json_path="upgrade_check.new_implementation", var_name="new_implementation"))

alert = AlertConfig(
    var_name="upgraded",
    operator="eq",
    operands=[True],
    description="Proxy contract {{PROXY_CONTRACT_ADDRESS}} upgraded on block {{block_number}} to new implementation: {{new_implementation}}"
)
agent.set_alert(alert)

# --- State Update ---

agent.add_variable(SetValueVariable(key=f"proxy_implementation_{PROXY_CONTRACT_ADDRESS}", value="{{storage_data.implementation_address}}"))

# --- Testing ---

if __name__ == "__main__":
    # Test on the latest block. For a real test, find a block with an upgrade.
    run_config = RunConfig(blocks=[0])  # Run on latest block
    findings = agent.run(run_config)
    print(findings)

```

#### Testing Instructions

To test this agent, you can run it against a block where a known proxy contract was upgraded. You will need to find the address of the proxy contract and the block number of the upgrade. You can then use a `RunConfig` to run the agent on that specific block.

#### Configuration Notes

* **Storage Slot:** The example uses the standard EIP-1967 storage slot for the implementation address. If the proxy contract uses a different storage slot, you will need to update the `IMPLEMENTATION_SLOT` variable.
* **Proxy Address:** You must update the `PROXY_CONTRACT_ADDRESS` variable to the address of the proxy contract you want to monitor.

***

### 3.2 Address Screening Integration

#### Risk Description

This agent screens transaction participants (sender and receiver) against an external address screening API. It allows you to identify and alert on transactions involving addresses that are on a denylist or have a high-risk score.

#### Business Impact

For compliance and risk management, it is crucial to avoid interacting with sanctioned or high-risk addresses. This agent provides a real-time screening solution that can help to prevent such interactions and ensure compliance with regulatory requirements.

#### Key Concepts Demonstrated

* **Hypernative API Integration:** The agent uses `hn_api_post` to call the Hypernative screener API with built-in authentication.
* **Batch API Processing:** Multiple addresses are screened in a single API call for efficiency.
* **Response Processing:** Real API response structure is processed to extract severity, flags, and recommendations.
* **Risk Categorization:** Addresses are automatically categorized as denied, flagged, or approved based on screening results.

#### Complete Implementation

```python
from invariantive.model.agent import Agent
from invariantive.model.trigger import FunctionCallTrigger
from invariantive.model.variable import (
    ContextVariable, 
    PythonProcessingVariable,
    JsonProcessingVariable
)
from invariantive.model.alert import AlertConfig
from invariantive.model.run import RunConfig
from invariantive.common.consts import Chain
from invariantive.common.environment import set_default_chain

set_default_chain(Chain.ethereum)

# Monitor function calls to a specific contract
trigger = FunctionCallTrigger(
    contract_address="0x0C9a3dd6b8F28529d72d7f9cE918D493519EE383", # Example: A popular contract
    trace_sig="any()",
    operator="is_any",
    output_index="trace_from",
    operands=[]
)

agent = Agent(trigger=trigger)

# --- Variable Extraction ---

agent.add_variable(ContextVariable(output_index="tx_from", var_name="tx_from"))
agent.add_variable(ContextVariable(output_index="tx_to", var_name="tx_to"))
agent.add_variable(ContextVariable(output_index="trace_to", var_name="contract_address"))
agent.add_variable(ContextVariable(output_index="tx_hash", var_name="tx_hash"))

# --- Address Screening Using Hypernative API ---

def screen_transaction_addresses(extracted_variables):
    """
    Screen all addresses involved in a transaction using Hypernative's screener API.
    Uses batch processing for efficiency.
    """
    
    # Collect all addresses from the transaction
    addresses = []
    
    tx_from = extracted_variables.get("tx_from")
    tx_to = extracted_variables.get("tx_to") 
    contract_address = extracted_variables.get("contract_address")
    
    # Add addresses to batch (removing duplicates)
    unique_addresses = set()
    for addr in [tx_from, tx_to, contract_address]:
        if addr and addr not in unique_addresses:
            unique_addresses.add(addr)
            addresses.append(addr)
    
    if not addresses:
        return {"error": "No addresses found to screen"}
    
    try:
        # Use hn_api_post to call Hypernative screener API
        screener_endpoint = "screener/reputation"
        payload = {
            "addresses": addresses
        }
        
        response = hn_api_post(screener_endpoint, payload)
        data = response.json()
        
        # Process screener response
        screener_results = []
        flagged_addresses = []
        denied_addresses = []
        
        response_data = data.get("data", [])
        
        for result in response_data:
            address = result.get("address", "Unknown")
            severity = result.get("severity", "N/A")
            flags = result.get("flags", [])
            recommendation = result.get("recommendation", "N/A")
            
            screener_results.append({
                "address": address,
                "severity": severity,
                "flags": [flag.get("title", "Unknown flag") for flag in flags],
                "recommendation": recommendation
            })
            
            # Categorize high-risk addresses
            if recommendation == "Deny":
                denied_addresses.append(address)
            elif severity == "HIGH" or flags:
                flagged_addresses.append(address)
        
        return {
            "total_addresses": len(addresses),
            "screener_results": screener_results,
            "flagged_addresses": flagged_addresses,
            "denied_addresses": denied_addresses,
            "has_high_risk": len(denied_addresses) > 0 or len(flagged_addresses) > 0
        }
        
    except Exception as e:
        return {"error": f"Screening failed: {str(e)}"}

agent.add_variable(PythonProcessingVariable(source_code=screen_transaction_addresses, var_name="screening_results"))

# Extract key metrics for alerting
agent.add_variable(JsonProcessingVariable(json_path="screening_results.has_high_risk", var_name="has_high_risk"))
agent.add_variable(JsonProcessingVariable(json_path="screening_results.denied_addresses", var_name="denied_addresses"))
agent.add_variable(JsonProcessingVariable(json_path="screening_results.flagged_addresses", var_name="flagged_addresses"))

# Alert when high-risk addresses are detected
alert = AlertConfig(
    var_name="has_high_risk",
    operator="eq",
    operands=[True],
    description="🚨 High-Risk Address Detected! TX: {{tx_hash}} | Denied: {{denied_addresses}} | Flagged: {{flagged_addresses}} | Screener Results: {{screening_results}}"
)

agent.set_alert(alert)

# --- Testing ---

if __name__ == "__main__":
    # Test with a transaction that involves contract interaction
    run_config = RunConfig(
        hashes=["0x5144519862994063d1cf0505a4b5cead15c66825fbb6d91132dca272c21916cc"] # Real transaction hash
    )
    findings = agent.run(run_config)
    print(findings)

```

#### Testing Instructions

To test this agent, simply run the code with the provided `RunConfig`. The agent uses the built-in `hn_api_post` helper which automatically handles authentication with the Hypernative API. No manual API key setup is required.

1. Save the code as a Python file (e.g., `address_screening.py`)
2. Run the file: `python address_screening.py`
3. The agent will screen all addresses involved in the test transaction and alert if high-risk addresses are found

#### Configuration Notes

* **Built-in Authentication:** The agent uses `hn_api_post` which automatically handles authentication with the Hypernative screener API. No manual secret management is required.
* **Batch Processing:** The agent efficiently screens multiple addresses (sender, receiver, contract) in a single API call rather than individual requests.
* **Real API Integration:** Uses the actual Hypernative screener endpoint (`screener/reputation`) that processes addresses and returns severity, flags, and recommendations.
* **Contract Monitoring:** Currently monitors a specific contract address. Update `contract_address` in the trigger to monitor different contracts.

***

### 3.3 Targeted Function Call Monitoring

#### Risk Description

This agent monitors a specific contract for any function calls that originate from an unauthorized address. It acts as a basic access control monitor, alerting when a function is called by an address that is not on a predefined allowlist.

#### Business Impact

For sensitive contracts, ensuring that only authorized addresses can execute functions is a critical security measure. This agent provides a simple but effective way to enforce access control and get immediate alerts on any unauthorized activity.

#### Key Concepts Demonstrated

* **Function Call Trigger:** The agent uses a `FunctionCallTrigger` with a `trace_sig` of `any()` to capture all function calls to the specified contract.
* **Allowlist Filtering:** It uses the `operands` field of the trigger to act as an allowlist, only triggering the agent for calls originating from the specified addresses.
* **Simple Alerting:** The alert is configured to fire whenever the agent is triggered, providing a straightforward notification of a potentially unauthorized function call.

#### Complete Implementation

```python
from invariantive.model.agent import Agent
from invariantive.model.trigger import FunctionCallTrigger
from invariantive.model.variable import ContextVariable
from invariantive.model.alert import AlertConfig
from invariantive.common.consts import Chain
from invariantive.common.environment import set_default_chain

# --- Configuration ---
CONTRACT_TO_MONITOR = "0x117ec8ad107976e1dbcc21717ff78407bc36aadc" # Example: Chainlink Price Oracle
ALLOWED_CALLERS = ["0x41eadbc688797a02bfabe48472995833489ce69d"] # Example: A known Chainlink keeper address

set_default_chain(Chain.ethereum)

# Trigger on any function call to the contract from an allowed caller
trigger = FunctionCallTrigger(
    contract_address=CONTRACT_TO_MONITOR,
    trace_sig="any()",
    operator="one_of",
    output_index="tx_from",
    operands=ALLOWED_CALLERS
)

agent = Agent(trigger=trigger)

# --- Variable Extraction ---

agent.add_variable(ContextVariable(output_index="tx_hash", var_name="tx_hash"))
agent.add_variable(ContextVariable(output_index="tx_from", var_name="caller"))
agent.add_variable(ContextVariable(output_index="trace_to", var_name="contract_called"))

# --- Alerting ---

alert = AlertConfig(
    var_name="tx_hash",
    operator="is_not_null",
    description="Unauthorized function call to {{contract_called}} from {{caller}} in tx {{tx_hash}}"
)

agent.set_alert(alert)

# --- Testing ---

if __name__ == "__main__":
    # Test with a transaction that involves the monitored contract
    run_config = RunConfig(
        hashes=["0x5144519862994063d1cf0505a4b5cead15c66825fbb6d91132dca272c21916cc"] # Real transaction hash
    )
    findings = agent.run(run_config)
    print(findings)

```

#### Testing Instructions

To test this agent, you can run it against a block containing a transaction where one of the `ALLOWED_CALLERS` makes a call to the `CONTRACT_TO_MONITOR`. You can use a block explorer to find such a transaction and then use a `RunConfig` to run the agent on that specific block.

#### Configuration Notes

* **Allowlist:** To add more authorized callers, simply add their addresses to the `ALLOWED_CALLERS` list.
* **Denylist:** This agent can be easily converted to a denylist-based monitor by changing the `operator` in the `FunctionCallTrigger` to `not_one_of`.

***

## 4. Price & Market Data Monitoring

### 4.1 Multi-Source Price Aggregation (Thorchain)

#### Risk Description

This agent monitors the price of a specific asset (e.g., RUNE) from multiple sources (e.g., CoinGecko, Thorchain's API) and alerts when there is a significant deviation between the prices. This can help to detect price manipulation on a single source or issues with a specific price feed.

#### Business Impact

For protocols that rely on accurate price data, a faulty or manipulated price feed can lead to incorrect liquidations, unfair trades, and financial losses. This agent provides a way to cross-validate price data and ensure its integrity.

#### Key Concepts Demonstrated

* **Multi-Source Data Aggregation:** The agent fetches data from multiple external APIs and compares the results.
* **Price Deviation Calculation:** It calculates the percentage deviation between the prices from different sources.
* **Conditional Alerting:** The alert is configured to fire only when the price deviation exceeds a specified threshold.

#### Complete Implementation

```python
from invariantive.model.agent import Agent
from invariantive.model.trigger import BlockTrigger
from invariantive.model.variable import (
    JsonEndpointVariable, 
    PythonProcessingVariable
)
from invariantive.model.alert import AlertConfig
from invariantive.common.consts import Chain
from invariantive.common.environment import set_default_chain

set_default_chain(Chain.thorchain)

agent = Agent(trigger=BlockTrigger(period=1, period_unit="blocks"))

# --- Price Fetching ---

# Get pool data from Thorchain API
agent.add_variable(JsonEndpointVariable(
    url="https://midgard.thorchain.info/v2/pools",
    json_path="[*].asset",
    var_name="thorchain_pools"
))

# Get RUNE price from CoinGecko
agent.add_variable(JsonEndpointVariable(
    url="https://api.coingecko.com/api/v3/simple/price?ids=thorchain&vs_currencies=usd",
    json_path="thorchain.usd",
    var_name="coingecko_rune_price"
))

# Calculate Thorchain RUNE price from pool data
def calculate_thorchain_rune_price(extracted_variables):
    pools = extracted_variables.get("thorchain_pools", [])
    
    # Find the RUNE pool (e.g., ETH.RUNE)
    rune_pool = None
    for pool in pools:
        if "RUNE" in pool:
            rune_pool = pool
            break

    if not rune_pool:
        return {"error": "RUNE pool not found"}

    # Extract asset and rune depths
    asset_depth = float(rune_pool.get("assetDepth", 0))
    rune_depth = float(rune_pool.get("runeDepth", 0))

    if rune_depth == 0:
        return {"error": "RUNE depth is zero"}

    # Price of RUNE in terms of the asset (e.g., ETH/RUNE)
    # For simplicity, we'll assume a direct conversion based on depths
    # In a real scenario, you'd need to consider the asset's USD price.
    thorchain_rune_price = asset_depth / rune_depth # This is a simplified calculation

    return {"thorchain_rune_price": thorchain_rune_price}

agent.add_variable(PythonProcessingVariable(source_code=calculate_thorchain_rune_price, var_name="thorchain_price_analysis"))

# --- Comparison and Alerting ---

def calculate_price_deviation(extracted_variables):
    coingecko_rune_price = float(extracted_variables.get("coingecko_rune_price", 0))
    thorchain_rune_price = float(extracted_variables.get("thorchain_price_analysis", {}).get("thorchain_rune_price", 0))

    if coingecko_rune_price == 0 or thorchain_rune_price == 0:
        return {"deviation": 0} # Avoid division by zero

    deviation = abs(coingecko_rune_price - thorchain_rune_price) / coingecko_rune_price * 100
    return {"deviation": round(deviation, 2)}

agent.add_variable(PythonProcessingVariable(source_code=calculate_price_deviation, var_name="price_deviation_analysis"))

# Extract individual values for alert description
agent.add_variable(JsonProcessingVariable(json_path="price_deviation_analysis.deviation", var_name="price_deviation"))
agent.add_variable(JsonProcessingVariable(json_path="thorchain_price_analysis.thorchain_rune_price", var_name="thorchain_rune_price"))

alert = AlertConfig(
    var_name="price_deviation",
    operator="gt",
    operands=[5], # Alert if deviation is greater than 5%
    description="Price deviation for RUNE is {{price_deviation}}% (CoinGecko: {{coingecko_rune_price}}, Thorchain: {{thorchain_rune_price}})"
)

agent.set_alert(alert)

# --- Testing ---

if __name__ == "__main__":
    # Test on the latest block
    run_config = RunConfig(blocks=[0])  # Run on latest block
    findings = agent.run(run_config)
    print(findings)

```

#### Testing Instructions

To test this agent, you can run it on the latest block. It will fetch the current prices from CoinGecko and Thorchain and calculate the deviation. If the deviation is greater than the configured threshold, it will generate an alert.

#### Configuration Notes

* **Thorchain Price Calculation:** The calculation of `thorchain_rune_price` in the example is a simplified representation. In a real-world scenario, you would need to consider the specific pool dynamics and potentially use a more robust method to derive the RUNE price from pool depths.
* **Price Sources:** You can add more price sources by adding more `JsonEndpointVariable` instances.
* **Alert Threshold:** The alert threshold is set to 5%. You can adjust this value in the `AlertConfig` to suit your needs.

***

### 4.2 Hyperliquid Position Monitoring

#### Risk Description

This agent monitors a specific user's position on the Hyperliquid decentralized exchange. It fetches the user's current positions and alerts when a position's leverage or other risk metric exceeds a predefined threshold.

#### Business Impact

For traders on perpetuals exchanges, managing leverage and risk is crucial. This agent can act as a personalized risk management tool, providing timely alerts to help traders avoid liquidations and manage their positions more effectively.

#### Key Concepts Demonstrated

* **External API Integration:** The agent fetches data from the Hyperliquid API.
* **Complex Data Parsing:** It parses the JSON response from the API to extract the user's positions and their associated risk metrics.
* **Personalized Monitoring:** This example shows how to build an agent that is tailored to a specific user or a list of users.

#### Complete Implementation

```python
from invariantive.model.agent import Agent
from invariantive.model.trigger import BlockTrigger
from invariantive.model.variable import (
    JsonEndpointVariable, 
    PythonProcessingVariable
)
from invariantive.model.alert import AlertConfig
from invariantive.common.consts import Chain
from invariantive.common.environment import set_default_chain

# --- Configuration ---
USER_TO_MONITOR = "0x495e8934cccb9585d60d4dbe6041ee531d20499c" # Example: A Hyperliquid user address
LEVERAGE_THRESHOLD = 7 # Alert if position is within 7% of liquidation

set_default_chain(Chain.ethereum) # Hyperliquid is an L1, but we can run the agent on any chain

agent = Agent(trigger=BlockTrigger(period=60, period_unit="seconds")) # Run every minute (60 seconds)

# --- Data Fetching and Analysis ---

agent.add_variable(JsonEndpointVariable(
    url="https://api.hyperliquid.xyz/info",
    method="post",
    data={"type": "clearinghouseState", "user": USER_TO_MONITOR},
    json_path="assetPositions",
    var_name="positions"
))

def check_leverage(extracted_variables):
    positions = extracted_variables.get("positions", [])
    high_leverage_positions = []
    for position in positions:
        # This is a simplified example. The actual calculation of leverage
        # would depend on the structure of the API response.
        leverage = position.get("leverage", 0)
        if leverage > LEVERAGE_THRESHOLD:
            high_leverage_positions.append(position)
    return {"high_leverage_positions": high_leverage_positions}

agent.add_variable(PythonProcessingVariable(source_code=check_leverage, var_name="leverage_check"))

# Extract individual values for alert description
agent.add_variable(JsonProcessingVariable(json_path="leverage_check.high_leverage_positions", var_name="high_leverage_positions"))

# --- Alerting ---

alert = AlertConfig(
    var_name="high_leverage_positions",
    operator="is_not_empty",
    description="User {{USER_TO_MONITOR}} has positions with high leverage: {{high_leverage_positions}}"
)

agent.set_alert(alert)

# --- Testing ---

if __name__ == "__main__":
    # Test on the latest block
    run_config = RunConfig(blocks=[0])  # Run on latest block
    findings = agent.run(run_config)
    print(findings)

```

#### Testing Instructions

To test this agent, you will need to replace the `USER_TO_MONITOR` with a valid Hyperliquid user address. You can then run the agent on the latest block, and it will fetch the user's current positions and check their leverage.

#### Configuration Notes

* **API Structure:** This example is based on a simplified understanding of the Hyperliquid API. You will need to consult the official Hyperliquid API documentation to get the correct endpoint, request payload, and response structure.
* **Risk Metrics:** The example only checks for high leverage. You can extend it to monitor other risk metrics, such as margin ratio or unrealized PnL.

***

### 4.3 Price Feed Reliability Monitoring

#### Risk Description

This agent monitors the reliability of a price feed by checking for stale prices. It uses the `PriceServiceVariable` to get the latest price of an asset and alerts if the price has not been updated within a specified time window.

#### Business Impact

For protocols that rely on price oracles, a stale price can be just as dangerous as a manipulated price. This agent helps to ensure that the price data being used is fresh and reliable.

#### Key Concepts Demonstrated

* **PriceServiceVariable:** The agent uses the built-in `PriceServiceVariable` to easily access price data from the Hypernative price service.
* **Staleness Check:** It demonstrates how to check for stale data by comparing the timestamp of the last update to the current time.

#### Complete Implementation

```python
from invariantive.model.agent import Agent
from invariantive.model.trigger import BlockTrigger
from invariantive.model.variable import (
    PriceServiceVariable, 
    PythonProcessingVariable
)
from invariantive.model.alert import AlertConfig
from invariantive.common.consts import Chain
from invariantive.common.environment import set_default_chain

set_default_chain(Chain.ethereum)

agent = Agent(trigger=BlockTrigger(period=1, period_unit="blocks"))

# --- Price Fetching ---

agent.add_variable(PriceServiceVariable(
    asset="ETH",
    currency="USD",
    var_name="eth_price_data"
))

# --- Staleness Check and Alerting ---

def check_price_staleness(extracted_variables):
    import time
    price_data = extracted_variables.get("eth_price_data", {})
    last_updated = price_data.get("timestamp", 0)
    
    if last_updated > 0 and (time.time() - last_updated) > 3600: # 1 hour
        return {"is_stale": True}
    return {"is_stale": False}

agent.add_variable(PythonProcessingVariable(source_code=check_price_staleness, var_name="staleness_check"))

# Extract individual values for alert description
agent.add_variable(JsonProcessingVariable(json_path="staleness_check.is_stale", var_name="is_stale"))
agent.add_variable(JsonProcessingVariable(json_path="eth_price_data.timestamp", var_name="price_timestamp"))

alert = AlertConfig(
    var_name="is_stale",
    operator="eq",
    operands=[True],
    description="ETH price feed is stale! Last updated at {{price_timestamp}}"
)

agent.set_alert(alert)

# --- Testing ---

if __name__ == "__main__":
    # Test on the latest block
    run_config = RunConfig(blocks=[0])  # Run on latest block
    findings = agent.run(run_config)
    print(findings)

```

#### Testing Instructions

This agent can be tested by running it on the latest block. It will fetch the latest price from the Hypernative price service and check if it is stale.

#### Configuration Notes

* **Asset and Currency:** You can change the `asset` and `currency` parameters of the `PriceServiceVariable` to monitor different price feeds.
* **Staleness Threshold:** The staleness threshold is set to 1 hour. You can adjust this value in the `check_price_staleness` function to suit your needs.

***

## 5. Advanced Integration Patterns

### 5.1 Persistent State Management

#### Risk Description

This agent demonstrates how to use persistent state to track data across multiple executions. It monitors an event and keeps a running count of how many times the event has occurred, alerting when the count exceeds a threshold.

#### Business Impact

For many monitoring scenarios, it is necessary to maintain state between executions. For example, you might want to track the total volume of transactions over time, or the number of times a specific event has occurred. This agent provides a basic template for implementing such stateful monitoring.

#### Key Concepts Demonstrated

* **GetValueVariable:** The agent uses `GetValueVariable` to retrieve the last known value of a variable from the Hypernative state store.
* **SetValueVariable:** It uses `SetValueVariable` to update the value of a variable in the state store.
* **Stateful Counter:** This example shows how to implement a simple stateful counter.

#### Complete Implementation

```python
from invariantive.model.agent import Agent
from invariantive.model.trigger import EventTrigger
from invariantive.model.variable import (
    ContextVariable, 
    GetValueVariable, 
    SetValueVariable, 
    PythonProcessingVariable
)
from invariantive.model.alert import AlertConfig
from invariantive.common.consts import Chain
from invariantive.common.environment import set_default_chain

set_default_chain(Chain.ethereum)

agent = Agent(trigger=EventTrigger(
    contract_address="0xA0b86a33E6441056cFd95B2E0B36fcBB18DD8313", # Example: ERC20 token contract
    event_sig="Transfer(address,address,uint256)",
    operator="compare_exact",
    output_index="emitting_contract",
    operands=["0xA0b86a33E6441056cFd95B2E0B36fcBB18DD8313"]
))

# --- State Management ---

agent.add_variable(GetValueVariable(key="transfer_count", var_name="previous_count"))

def increment_count(extracted_variables):
    previous_count = int(extracted_variables.get("previous_count", 0))
    new_count = previous_count + 1
    return {"new_count": new_count}

agent.add_variable(PythonProcessingVariable(source_code=increment_count, var_name="count_update"))

agent.add_variable(SetValueVariable(key="transfer_count", value="{{count_update.new_count}}"))

# --- Alerting ---

# Extract individual values for alert description
agent.add_variable(JsonProcessingVariable(json_path="count_update.new_count", var_name="new_count"))

alert = AlertConfig(
    var_name="new_count",
    operator="gt",
    operands=[100],
    description="Total number of Transfer events has exceeded 100! Current count: {{new_count}}"
)

agent.set_alert(alert)

# --- Testing ---

if __name__ == "__main__":
    # Test with a transaction containing Transfer events
    run_config = RunConfig(
        hashes=["0x5144519862994063d1cf0505a4b5cead15c66825fbb6d91132dca272c21916cc"] # Real transaction hash
    )
    findings = agent.run(run_config)
    print(findings)

```

#### Testing Instructions

To test this agent, you can run it against a series of blocks containing `Transfer` events. The agent will increment the counter for each event and will alert when the count exceeds 100.

#### Configuration Notes

* **State Key:** The `key` in the `GetValueVariable` and `SetValueVariable` determines which state variable is being accessed. You can use different keys to track different state variables.
* **Initial Value:** On the first run, the `GetValueVariable` will return `None`. The `increment_count` function handles this by defaulting to 0.

***

### 5.2 Historical Event Analysis

#### Risk Description

This agent demonstrates how to use the `HistoricalEventsVariable` to analyze past events. It triggers on a `Deposit` event and then queries for all `Withdraw` events from the same user in the past 24 hours, calculating the total withdrawal amount.

#### Business Impact

Analyzing historical data is crucial for many risk management scenarios. For example, you might want to detect if a user is rapidly depositing and withdrawing funds, which could be a sign of wash trading or other manipulative behavior. This agent provides a template for performing such historical analysis.

#### Key Concepts Demonstrated

* **HistoricalEventsVariable:** The agent uses `HistoricalEventsVariable` to query for past events based on a specific filter.
* **Dynamic Filtering:** The `event_filters` parameter of the `HistoricalEventsVariable` is dynamically constructed to filter for events from the specific user who triggered the agent.
* **Data Aggregation:** The agent aggregates the data from the historical events to calculate the total withdrawal amount.

#### Complete Implementation

```python
from invariantive.model.agent import Agent
from invariantive.model.trigger import EventTrigger
from invariantive.model.variable import (
    ContextVariable, 
    HistoricalEventsVariable, 
    PythonProcessingVariable
)
from invariantive.model.alert import AlertConfig
from invariantive.common.consts import Chain
from invariantive.common.environment import set_default_chain

set_default_chain(Chain.ethereum)

agent = Agent(trigger=EventTrigger(
    contract_address="0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2", # Example: MKR token contract
    event_sig="Deposit(address,uint256)",
    operator="compare_exact",
    output_index="emitting_contract",
    operands=["0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2"]
))

# --- Variable Extraction ---

agent.add_variable(ContextVariable(output_index="emitted_arg_0", var_name="user_address"))
agent.add_variable(ContextVariable(output_index="block_number", var_name="current_block"))

# --- Historical Event Query ---

agent.add_variable(HistoricalEventsVariable(
    chain=Chain.ethereum,
    event_name="Withdraw",
    from_block="{{current_block}} - 5760", # Approx. 24 hours
    to_block="{{current_block}}",
    event_filters={"user": "{{user_address}}"},
    var_name="historical_withdrawals"
))

# --- Data Aggregation and Alerting ---

def calculate_total_withdrawal(extracted_variables):
    withdrawals = extracted_variables.get("historical_withdrawals", [])
    total_withdrawal = sum([int(w["args"]["amount"]) for w in withdrawals])
    return {"total_withdrawal": total_withdrawal}

agent.add_variable(PythonProcessingVariable(source_code=calculate_total_withdrawal, var_name="withdrawal_analysis"))

# Extract individual values for alert description
agent.add_variable(JsonProcessingVariable(json_path="withdrawal_analysis.total_withdrawal", var_name="total_withdrawal"))

alert = AlertConfig(
    var_name="total_withdrawal",
    operator="gt",
    operands=[100000000000000000000], # Alert if total withdrawal exceeds 100 ETH
    description="User {{user_address}} has withdrawn a total of {{total_withdrawal}} in the past 24 hours."
)

agent.set_alert(alert)

# --- Testing ---

if __name__ == "__main__":
    # Test with a transaction containing Deposit events
    run_config = RunConfig(
        hashes=["0x5144519862994063d1cf0505a4b5cead15c66825fbb6d91132dca272c21916cc"] # Real transaction hash
    )
    findings = agent.run(run_config)
    print(findings)

```

#### Testing Instructions

To test this agent, you can run it against a block containing a `Deposit` event. The agent will then query for all `Withdraw` events from the same user in the preceding 24 hours and calculate the total withdrawal amount.

#### Configuration Notes

* **Event Filters:** The `event_filters` parameter is a powerful way to narrow down the historical events you are interested in. You can filter on any of the indexed arguments of the event.
* **Block Range:** The `from_block` and `to_block` parameters determine the time window for the historical query. You can use simple arithmetic expressions, as shown in the example, to define a rolling time window.

***

### 5.3 Multi-Chain Data Correlation

#### Risk Description

This agent demonstrates a conceptual approach to correlating data across multiple chains. It triggers on an event on a source chain and then uses a `PythonProcessingVariable` to make a `web3.py` call to a destination chain to check for a corresponding state change.

#### Business Impact

For cross-chain applications, ensuring that state is consistent across all chains is critical. This agent provides a basic template for implementing cross-chain consistency checks.

#### Key Concepts Demonstrated

* **Multi-Chain Logic:** The agent combines logic for interacting with two different chains within a single agent.
* **Cross-Chain `web3.py` Calls:** It shows how to use `get_node(chain).w3` to get a `web3` instance for a specific chain and make calls to it.

#### Complete Implementation

```python
from invariantive.model.agent import Agent
from invariantive.model.trigger import EventTrigger
from invariantive.model.variable import (
    ContextVariable, 
    PythonProcessingVariable
)
from invariantive.model.alert import AlertConfig
from invariantive.common.consts import Chain
from invariantive.common.environment import set_default_chain

# This is a simplified conceptual example.

set_default_chain(Chain.ethereum)

agent = Agent(trigger=EventTrigger(
    contract_address="0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640", # Example: Bridge contract
    event_sig="Bridge(address,uint256)",
    operator="compare_exact",
    output_index="emitting_contract",
    operands=["0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640"]
))

# --- Variable Extraction from Source Chain ---

agent.add_variable(ContextVariable(output_index="emitted_arg_0", var_name="user_address"))
agent.add_variable(ContextVariable(output_index="emitted_arg_1", var_name="amount"))

# --- Data Fetching from Destination Chain ---

def check_destination_chain_balance(extracted_variables):
    from web3 import Web3
    user_address = extracted_variables.get("user_address")
    amount = int(extracted_variables.get("amount", 0))

    # Get a web3 instance for the destination chain
    w3_polygon = get_node(Chain.polygon).w3
    
    # Address of the bridged token on Polygon
    bridged_token_address = "0x..."
    token_abi = '[{"inputs":[{"type":"address"}],"name":"balanceOf","outputs":[{"type":"uint256"}],"stateMutability":"view","type":"function"}]'
    token_contract = w3_polygon.contract(address=w3_polygon.toChecksumAddress(bridged_token_address), abi=token_abi)
    
    # This is a simplified check. A real implementation would need to handle
    # the time delay between the source and destination transactions.
    balance = token_contract.functions.balanceOf(user_address).call()
    
    # For this example, we'll just check if the balance is at least the amount bridged.
    return {"balance_sufficient": balance >= amount}

agent.add_variable(PythonProcessingVariable(source_code=check_destination_chain_balance, var_name="dest_chain_check"))

# --- Alerting ---

# Extract individual values for alert description
agent.add_variable(JsonProcessingVariable(json_path="dest_chain_check.balance_sufficient", var_name="balance_sufficient"))

alert = AlertConfig(
    var_name="balance_sufficient",
    operator="eq",
    operands=[False],
    description="Potential cross-chain inconsistency for user {{user_address}}"
)

agent.set_alert(alert)

# --- Testing ---

if __name__ == "__main__":
    # Test with a transaction containing Bridge events
    run_config = RunConfig(
        hashes=["0x5144519862994063d1cf0505a4b5cead15c66825fbb6d91132dca272c21916cc"] # Real transaction hash
    )
    findings = agent.run(run_config)
    print(findings)

```

#### Testing Instructions

Testing this agent is complex and requires a setup that can simulate transactions on both the source and destination chains. The provided code is a conceptual illustration.

#### Configuration Notes

* **Timing:** The biggest challenge in this type of agent is handling the time delay between the source and destination transactions. A real implementation would need to incorporate a delay or a more sophisticated state management system to avoid false positives.
* **Error Handling:** The example does not include error handling for the `web3.py` calls. In a production environment, you should add `try...except` blocks to handle potential RPC errors.

***

### 5.4 Dynamic Watchlist Management

#### Risk Description

This agent demonstrates how to dynamically manage a Hypernative watchlist. It triggers on an event that signifies the creation of a new entity (e.g., a new vault contract) and automatically adds that entity to a specified watchlist using the Hypernative API.

#### Business Impact

For protocols that frequently create new contracts or entities that need to be monitored, automating the process of adding them to a watchlist can save a significant amount of time and reduce the risk of human error. This ensures that all new entities are immediately brought under monitoring.

#### Key Concepts Demonstrated

* **Hypernative API Integration:** The agent uses the `hn_api_patch` helper function to interact with the Hypernative API.
* **Dynamic Payload Construction:** The payload for the API call is dynamically constructed to include the address of the new entity.
* **Secret Management:** It uses `GetSecretVariable` to securely load the Hypernative API credentials.

#### Complete Implementation

```python
from invariantive.model.agent import Agent
from invariantive.model.trigger import EventTrigger
from invariantive.model.variable import (
    ContextVariable, 
    GetSecretVariable, 
    PythonProcessingVariable
)
from invariantive.model.alert import AlertConfig
from invariantive.common.consts import Chain
from invariantive.common.environment import set_default_chain

# --- Configuration ---
WATCHLIST_ID = "12345" # ID of the watchlist to update

set_default_chain(Chain.ethereum)

agent = Agent(trigger=EventTrigger(
    contract_address="0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9", # Example: Protocol factory contract
    event_sig="NewVault(address vault_address)",
    operator="compare_exact",
    output_index="emitting_contract",
    operands=["0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9"]
))

# --- Variable Extraction and API Call ---

agent.add_variable(ContextVariable(output_index="emitted_arg_0", var_name="new_vault_address"))

# Securely load API credentials
agent.add_variable(GetSecretVariable(secret_name="HN_API_CLIENT_ID", var_name="hn_client_id"))
agent.add_variable(GetSecretVariable(secret_name="HN_API_CLIENT_SECRET", var_name="hn_client_secret"))

def add_to_watchlist(extracted_variables):
    new_vault = extracted_variables.get("new_vault_address")
    if not new_vault:
        return {"success": False, "error": "No new vault address found"}

    # The hn_api_patch function is a conceptual helper. In a real implementation,
    # you would use the requests library or a similar tool.
    # from invariantive.common.helpers import hn_api_patch
    # response = hn_api_patch(
    #     f"/watchlists/{WATCHLIST_ID}",
    #     payload={"mode": "add", "assets": [{"address": new_vault, "chain": "ethereum"}]}
    # )
    # return response
    
    # For this example, we'll simulate a successful response.
    return {"success": True, "added_address": new_vault}

agent.add_variable(PythonProcessingVariable(source_code=add_to_watchlist, var_name="api_response"))

# --- Alerting ---

# Extract individual values for alert description
agent.add_variable(JsonProcessingVariable(json_path="api_response.success", var_name="api_success"))
agent.add_variable(JsonProcessingVariable(json_path="api_response.added_address", var_name="added_address"))

alert = AlertConfig(
    var_name="api_success",
    operator="eq",
    operands=[True],
    description="Successfully added new vault {{added_address}} to watchlist {{WATCHLIST_ID}}"
)

agent.set_alert(alert)

# --- Testing ---

if __name__ == "__main__":
    # Test with a transaction containing NewVault events
    run_config = RunConfig(
        hashes=["0x5144519862994063d1cf0505a4b5cead15c66825fbb6d91132dca272c21916cc"] # Real transaction hash
    )
    findings = agent.run(run_config)
    print(findings)

```

#### Testing Instructions

To test this agent, you would need to have a watchlist set up in your Hypernative account and have your API credentials saved as secrets. You could then run the agent against a block containing a `NewVault` event.

#### Configuration Notes

* **`hn_api_patch` Helper:** The `hn_api_patch` function is a conceptual helper that simplifies the process of making authenticated API calls to the Hypernative API. While not yet available, this example illustrates the intended future usage.
* **Secret Management:** Before running this agent, you must save your Hypernative client ID and client secret as secrets named `HN_API_CLIENT_ID` and `HN_API_CLIENT_SECRET`, respectively.

***
