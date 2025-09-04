# SDK V2 Reference | Hypernative Product Docs

### 

Current Version - 2.0

This version enables faster development of your Onchain Agents and powerful new features:

-   **Strongly-typed objects and IntelliSense support** in your code editor, enabling faster and more efficient development of Onchain Agents.
    
-   New out-of-the-box utility functions:
    
    -   Retrieve an Asset's price
        
    -   Call a smart contract
        
    
-   Execute custom Python code
    
-   Analyze data across multiple blocks using the new `HistoricalEventsVariable`
    
-   Store values during one block execution and retrieve them in the next
    
-   Conditionally execute specific steps
    
-   Securely store and access third-party passwords and secrets
    
-   **Integrate Hypernative operations directly** into your Agents' flow, such as:
    
    -   Update the asset address list in a Watchlist or Custom Agent
        
    -   Retrieve existing Watchlist configurations
        
    -   Trigger Automated Responses
        
    

There are no breaking changes compared to Hypernative Agents SDK V1, which remains fully supported.

To upgrade to the latest version, please reinstall the Hypernative library using the personal access token provided to you by Hypernative.

### 

Agent

The main orchestrator class that coordinates triggers, variables, and alerts.

#### 

Class: `Agent`

```
class Agent:
    def __init__(self, trigger: Trigger)
```

**Constructor Parameters**

Parameter

Type

Description

`trigger`

`Trigger`

The trigger that defines when the agent executes

**Methods**

`**add_variable(variable: Variable) -> Agent**`

Add a variable to the agent for data extraction and processing.

**Parameters:**

-   `variable` (Variable): A variable instance for data extraction
    

**Returns:** The agent instance for method chaining

**Example:**

```
agent.add_variable(ContextVariable(
    output_index="block_number",
    var_name="current_block"
))
```

`**add_trigger_condition(condition: Condition) -> Agent**`

Add a condition to the trigger for additional filtering.

**Parameters:**

-   `condition` (Condition): A condition instance
    

**Returns:** The agent instance for method chaining

`**set_alert(alert_config: AlertConfig) -> Agent**`

Configure alert conditions and notifications.

**Parameters:**

-   `alert_config` (AlertConfig): Alert configuration
    

**Returns:** The agent instance for method chaining

`**save_secret(secret_name: str, secret_value: str) -> Agent**`

Store a secret for use in variables.

**Parameters:**

-   `secret_name` (str): Name to reference the secret
    
-   `secret_value` (str): The secret value to store
    

**Returns:** The agent instance for method chaining

`**run(run_config: RunConfig) -> Dict[str, Any]**`

Execute the agent with the specified configuration.

**Parameters:**

-   `run_config` (RunConfig): Execution configuration
    

**Returns:** Dictionary containing findings and extracted variables

`**deploy(agent_name: str, **kwargs) -> int**`

Deploy the agent to the Hypernative platform.

**Parameters:**

-   `agent_name` (str): Unique name for the agent
    
-   `severity` (str, optional): Alert severity ("Low", "Medium", "High")
    
-   `channels_configurations` (List\[Dict\], optional): Notification channels
    
-   `security_suit_ids` (List\[int\], optional): Security suite IDs
    
-   `reminders_configurations` (List\[Dict\], optional): Reminder settings
    

**Returns:** Agent ID if successful, -1 if failed

`**save_config(file_name: str) -> None**`

Save agent configuration to a JSON file.

**Parameters:**

-   `file_name` (str): Output file name
    

`**generate_config() -> Tuple[Dict, Dict]**`

Generate agent configuration as dictionaries.

**Returns:** Tuple of (agent\_config, metadata)

### 

Triggers

Triggers define when your agent should execute.

#### 

Class: `BlockTrigger`

Execute agent periodically based on blocks or time.

```
@dataclass
class BlockTrigger(Trigger):
    period: int
    period_unit: str
    chain: Chain = field(default_factory=get_default_chain)
```

**Parameters**

Parameter

Type

Required

Description

`period`

`int`

Yes

How often to execute

`period_unit`

`str`

Yes

Unit: "blocks" or "seconds"

`chain`

`Chain`

No

Blockchain to monitor (default from environment)

**Example**

```


# Execute every block
trigger = BlockTrigger(period=1, period_unit="blocks", chain=Chain.ethereum)

# Execute every 30 seconds
trigger = BlockTrigger(period=30, period_unit="seconds", chain=Chain.ethereum)
```

#### 

Class: `EventTrigger`

Execute agent when specific events are emitted.

```
@dataclass
class EventTrigger(Trigger):
    contract_address: str
    event_sig: str
    operator: str
    output_index: str
    operands: List[str]
    output_data_type: Optional[List[str]] = None
    chain: Chain = field(default_factory=get_default_chain)
```

**Parameters**

Parameter

Type

Required

Description

`contract_address`

`str`

Yes

Contract address to monitor

`event_sig`

`str`

Yes

Event signature (e.g., "Transfer")

`operator`

`str`

Yes

Comparison operator

`output_index`

`str`

Yes

What to compare (e.g., "emitting\_contract")

`operands`

`List[str]`

Yes

Values to compare against

`output_data_type`

`List[str]`

No

ABI types for event arguments when contract is unverified

`chain`

`Chain`

No

Blockchain to monitor

**Available Operators**

-   `compare_exact`: Exact match
    
-   `one_of`: Value is in the list
    
-   `not_one_of`: Value is not in the list
    
-   `any`: Any value (no filtering)
    

**Available Output Indices**

-   `emitting_contract`: Contract that emitted the event
    
-   `emitted_arg_0`, `emitted_arg_1`, etc.: Event arguments
    
-   `tx_from`, `tx_to`: Transaction sender/recipient
    
-   `block_number`, `block_timestamp`: Block information
    

**Example**

```


# Monitor Transfer events from USDT contract (verified contract)
trigger = EventTrigger(
    contract_address="0xdAC17F958D2ee523a2206206994597C13D831ec7",
    event_sig="Transfer",
    operator="compare_exact",
    output_index="emitting_contract",
    operands=["0xdAC17F958D2ee523a2206206994597C13D831ec7"]
)

# Monitor Transfer events from unverified contract with custom ABI types
trigger = EventTrigger(
    contract_address="0xaf8E1AD06Fd19652299CFfd7e39c13e96acA4765",
    event_sig="Transfer(index_topic_1 address from, index_topic_2 address to, uint256 value)",
    output_data_type=["address", "address", "uint256"],
    operator="compare_exact",
    output_index="emitting_contract",
    operands=["0xaf8E1AD06Fd19652299CFfd7e39c13e96acA4765"]
)
```

#### 

Class: `FunctionCallTrigger`

Execute agent when specific functions are called.

```
@dataclass
class FunctionCallTrigger(Trigger):
    contract_address: str
    trace_sig: str
    operator: str
    output_index: str
    operands: List[str]
    input_data_type: Optional[List[str]] = None
    output_data_type: Optional[List[str]] = None
    chain: Chain = field(default_factory=get_default_chain)
    idl_json: Optional[Dict] = None
```

**Parameters**

Parameter

Type

Required

Description

`contract_address`

`str`

Yes

Contract address to monitor

`trace_sig`

`str`

Yes

Function signature (e.g., "transfer")

`operator`

`str`

Yes

Comparison operator

`output_index`

`str`

Yes

What to compare

`operands`

`List[str]`

Yes

Values to compare against

`input_data_type`

`List[str]`

No

ABI types for function inputs when contract is unverified

`output_data_type`

`List[str]`

No

ABI types for function outputs when contract is unverified

`chain`

`Chain`

No

Blockchain to monitor

`idl_json`

`Dict`

No

Interface definition for solana contracts

**Available Output Indices**

-   `trace_from`, `trace_to`: Function call sender/recipient
    
-   `input_arg_0`, `input_arg_1`, etc.: Function arguments
    
-   All event trigger indices are also available
    

**Example**

```


# Monitor deposit function calls (verified contract)
trigger = FunctionCallTrigger(
    contract_address="0x1234567890abcdef1234567890abcdef12345678",
    trace_sig="deposit",
    operator="any",
    output_index="trace_to",
    operands=[]
)

# Monitor confirmMintRequest function calls (unverified contract with ABI types)
trigger = FunctionCallTrigger(
    contract_address="0x0C9a3dd6b8F28529d72d7f9cE918D493519EE383",
    trace_sig="confirmMintRequest(bytes32 _hash)",
    input_data_type=["bytes32"],
    output_data_type=[],
    operator="compare_exact",
    output_index="trace_to",
    operands=["0x0C9a3dd6b8F28529d72d7f9cE918D493519EE383"]
)
```

#### 

Class: `RITrigger`

Execute agent flows after specific Risk Insights alert types are triggered.

```
@dataclass
class RITrigger(Trigger):
    type_ids: List[str]
    chain: Chain = field(default_factory=get_default_chain)
```

**Parameters**

Parameter

Type

Required

Description

`type_ids`

`List[str]`

Yes

List of Risk Insights alert type IDs to monitor

`chain`

`Chain`

No

Blockchain to monitor (uses default)

**Overview**

RITrigger allows you to create automated response flows that execute when specific Risk Insights alerts are detected. This enables you to build reactive agents that respond to security threats, protocol risks, and market anomalies identified by Hypernative's monitoring system.

> **Note**: The Risk Insights type IDs shown in examples are real alert types. Contact your Hypernative representative to obtain the complete list of available Risk Insights type IDs for your specific use case.

**Example Use Cases**

-   **Automated Response**: Execute immediate actions when critical alerts are triggered
    
-   **Enhanced Analysis**: Perform additional on-chain analysis when risks are detected
    
-   **Cross-Protocol Monitoring**: React to alerts from multiple protocols simultaneously
    
-   **Escalation Workflows**: Create multi-step response procedures for different alert types
    

**Example**

```


# React to specific Risk Insights alert types
ri_trigger = RITrigger(
    type_ids=["A-4102", "A-4010"],  # Exploit Suspected & Potential Targets alerts
    chain=Chain.ethereum
)

agent = Agent(trigger=ri_trigger)

# Extract alert information
alert_severity_var = ContextVariable(
    output_index="alert_severity",
    var_name="severity_level"
)
agent.add_variable(alert_severity_var)

affected_contract_var = ContextVariable(
    output_index="contract_address",
    var_name="affected_contract"
)
agent.add_variable(affected_contract_var)

# Perform immediate contract analysis
contract_state_var = GenericContractReadVariable(
    contract_address="extracted_variables.affected_contract",
    func_sig="paused",
    output_index="output_arg_0",
    var_name="is_paused"
)
agent.add_variable(contract_state_var)

# Create response logic
def create_response_plan(extracted_variables):
    severity = extracted_variables["severity_level"]
    is_paused = extracted_variables["is_paused"]
    
    if severity == "critical" and not is_paused:
        response = "immediate_intervention_required"
    elif severity == "high":
        response = "enhanced_monitoring_required"
    else:
        response = "standard_monitoring"
    
    return {
        "response_level": response,
        "requires_manual_review": severity in ["critical", "high"],
        "automated_actions_enabled": severity == "critical"
    }

response_var = PythonProcessingVariable(
    source_code=create_response_plan,
    var_name="response_plan"
)
agent.add_variable(response_var)

# Alert with response plan
response_alert = AlertConfig(
    var_name="response_plan",
    operator="json_path",
    operands=["requires_manual_review == true"],
    description="Risk Insights Alert: {{severity_level}} in {{affected_contract}} - Response: {{response_plan.response_level}}"
)
agent.set_alert(response_alert)
```

**Multi-Alert Type Monitoring**

Monitor multiple alert types for comprehensive coverage:

```


# Comprehensive risk monitoring
comprehensive_ri_trigger = RITrigger(
    type_ids=[
        "A-4102",   # Exploit Suspected (M2)
        "A-4010",   # Potential Targets in unusual contract (High)
        "TX-00011", # Transaction Initiated (Guardian)
        "C-13956"   # Custom Agent alert
    ],
    chain=Chain.ethereum
)

agent = Agent(trigger=comprehensive_ri_trigger)

# Extract alert type for different handling
alert_type_var = ContextVariable(
    output_index="alert_type",
    var_name="alert_category"
)
agent.add_variable(alert_type_var)

# Different responses based on alert type
def categorize_response(extracted_variables):
    alert_type = extracted_variables["alert_category"]
    
    response_mapping = {
        "A-4102": {  # Exploit Suspected (M2)
            "priority": "critical",
            "response_time": "immediate",
            "escalation": "security_team"
        },
        "A-4010": {  # Potential Targets in unusual contract (High)
            "priority": "high", 
            "response_time": "5_minutes",
            "escalation": "risk_team"
        },
        "TX-00011": {  # Transaction Initiated (Guardian)
            "priority": "medium",
            "response_time": "10_minutes", 
            "escalation": "monitoring_team"
        },
        "C-13956": {  # Custom Agent alert
            "priority": "medium",
            "response_time": "15_minutes",
            "escalation": "operations_team"
        }
    }
    
    return response_mapping.get(alert_type, {
        "priority": "medium",
        "response_time": "15_minutes",
        "escalation": "monitoring_team"
    })

response_categorization_var = PythonProcessingVariable(
    source_code=categorize_response,
    var_name="response_category"
)
agent.add_variable(response_categorization_var)
```

### 

Variables

Variables extract and process data from various sources.

#### 

Base Class: `Variable`

All variables inherit from this base class.

```
@dataclass
class Variable(Model, ABC):
    var_name: str
```

**Common Parameters**

Parameter

Type

Required

Description

`var_name`

`str`

Yes

Name to reference this variable

#### 

Class: `ContextVariable`

Extract data from transaction and block context.

```
@dataclass
class ContextVariable(Variable):
    output_index: str
```

**Parameters**

Parameter

Type

Required

Description

`output_index`

`str`

Yes

What data to extract

`var_name`

`str`

Yes

Variable name

**Available Output Indices**

**Block Information:**

-   `block_number`: Block height (int)
    
-   `block_timestamp`: UTC timestamp (str)
    

**Transaction Information (Event/Function triggers only):**

-   `tx_from`: Transaction sender (str)
    
-   `tx_to`: Transaction recipient (str)
    
-   `tx_value`: ETH value transferred (int, in wei)
    
-   `txhash`: Transaction hash (str)
    
-   `gas`, `gas_price`, `gas_used`: Gas information
    
-   `nonce`: Transaction nonce
    
-   `tx_status`: "tx\_success", "tx\_failed", or "tx\_partial\_fail"
    

**Event Information (Event triggers only):**

-   `emitted_arg_0`, `emitted_arg_1`, etc.: Event arguments
    
-   `emitting_contract`: Contract that emitted the event
    

**Function Call Information (Function triggers only):**

-   `input_arg_0`, `input_arg_1`, etc.: Function arguments
    
-   `trace_from`, `trace_to`: Call sender/recipient
    
-   `trace_value`: ETH transferred in the call
    

**Raw Data:**

-   `logs`: Raw transaction logs (List)
    
-   `traces`: Raw transaction traces (List)
    

**Example**

```


# Get current block number
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

#### 

Class: `GenericContractReadVariable`

Read data from smart contracts using function calls.

```
@dataclass
class GenericContractReadVariable(Variable):
    contract_address: str
    func_sig: str
    output_index: str
    input: Optional[List[str]] = field(default_factory=list)
    input_data_type: Optional[List[str]] = None
    output_data_type: Optional[List[str]] = None
    chain: Chain = field(default_factory=get_default_chain)
```

**Parameters**

Parameter

Type

Required

Description

`contract_address`

`str`

Yes

Contract address to call

`func_sig`

`str`

Yes

Function signature

`output_index`

`str`

Yes

Which output to capture

`input`

`List[str]`

No

Function arguments

`input_data_type`

`List[str]`

No

ABI types for function inputs when contract is unverified

`output_data_type`

`List[str]`

No

ABI types for function outputs when contract is unverified

`chain`

`Chain`

No

Blockchain to query

`var_name`

`str`

Yes

Variable name

**Output Indices**

-   `output_arg_0`, `output_arg_1`, etc.: Function return values
    

**Example**

```


# Get USDT total supply (verified contract)
supply_var = GenericContractReadVariable(
    contract_address="0xdAC17F958D2ee523a2206206994597C13D831ec7",
    func_sig="totalSupply",
    output_index="output_arg_0",
    var_name="total_supply"
)

# Get balance of specific address (verified contract)
balance_var = GenericContractReadVariable(
    contract_address="0xdAC17F958D2ee523a2206206994597C13D831ec7",
    func_sig="balanceOf",
    input=["0xF977814e90dA44bFA03b6295A0616a897441aceC"],
    output_index="output_arg_0",
    var_name="balance"
)

# Call getRate() on unverified contract with ABI types
rate_var = GenericContractReadVariable(
    contract_address="0xe1b1e024f4Bc01Bdde23e891E081b76a1A914ddd",
    func_sig="getRate()",
    input_data_type=[],
    output_data_type=["uint256"],
    input=[],
    output_index="output_arg_0",
    var_name="get_rate_result"
)
```

#### 

Class: `PythonProcessingVariable`

Execute custom Python code for complex logic.

```
@dataclass
class PythonProcessingVariable(Variable):
    source_code: Union[Callable, str]
    entry_point: Optional[str] = None
```

**Parameters**

Parameter

Type

Required

Description

`source_code`

`Union[Callable, str]`

Yes

Python function or code string

`entry_point`

`str`

No

Function name if using code string

`var_name`

`str`

Yes

Variable name

**Function Signature**

Your function must accept one parameter: `extracted_variables` (dict)

**Available Libraries**

**Standard Python Libraries:**

-   `json`: JSON operations
    
-   `requests`: HTTP requests
    
-   `pandas` (as `pd`): Data analysis
    
-   `numpy` (as `np`): Numerical computing
    
-   `datetime`: Date/time operations
    
-   `math`: Mathematical functions
    
-   `hashlib`: Cryptographic hashing
    
-   `Web3`: Blockchain interactions
    

**Available Global Functions**

PythonProcessingVariable provides access to 16 utility functions for blockchain interactions, data processing, and API calls:

**Blockchain Interaction Functions:**

-   `get_node(chain)` - Get Web3 instance for any supported chain
    
    -   Returns a Web3 instance connected to the specified blockchain
        
    -   Usage: `w3 = get_node('ethereum').w3`
        
    
-   `eth_call(chain, contract_address, func_sig, input_data_type, input, output_data_type, block_number="latest")` - Direct smart contract calls
    
    -   Makes direct contract calls using eth\_call
        
    -   Returns contract function output data
        
    
-   `generic_function_call(chain, contract_address, input, input_data_type, output_data_type, func_sig, block_number="latest", output_index=0)` - Generic contract interaction
    
    -   Returns: `{'output_args': [...]}` - Access results via `result["output_args"][0]`
        
    -   More flexible than eth\_call for complex contract interactions
        
    
-   `get_bitcoin_tx(txhash)` - Retrieve Bitcoin transaction data by hash
    
    -   Returns complete Bitcoin transaction object
        
    

**Price & Data Functions:**

-   `get_price(price_source, asset, chain, ts=None, amount=1)` - Get asset prices
    
    -   `asset` parameter: Token contract address on the specified chain
        
    -   Returns: `{"price": price, "usd_value": usd_value, "decimals": decimals, "symbol": symbol}`
        
    -   `price_source`: "coingecko" or other supported sources
        
    
-   `get_contract_data(address, chain)` - Retrieve contract metadata
    
    -   Returns contract information and metadata
        
    

**Hypernative API Functions:**

-   `hn_api_get(url, params=None)` - GET requests to Hypernative API
    
-   `hn_api_post(url, data=None)` - POST requests to Hypernative API
    
-   `hn_api_patch(url, data=None)` - PATCH requests to Hypernative API
    
-   `hn_api_delete(url, params=None)` - DELETE requests to Hypernative API
    

**Utility Functions:**

-   `is_eoa(address, chain, block_number=None)` - Check if address is an Externally Owned Account
    
-   `get_selector_from_func_sig(func_sig, chain)` - Calculate function selectors from signatures
    
-   `disassemble_bytecode(code)` - Disassemble bytecode into human-readable assembly
    
-   `is_hex(s, length=0)` - Validate hexadecimal strings with optional length check
    
-   `sanitize_key(key)` - Sanitize strings for use as keys
    
-   `read_contract_data(x)` - Process and normalize contract data structures
    

**Global Functions Examples**

```
def treasury_balance_analysis(extracted_variables):
    """Real example showing actual function usage patterns"""
    
    # Get token balance using generic_function_call
    treasury_address = "0xdd82875f0840AAD58a455A70B88eEd9F59ceC7c7"
    token_address = extracted_variables["token_address"]
    
    balance_result = generic_function_call(
        chain="ethereum",
        func_sig="balanceOf(address)",
        contract_address=token_address,
        output_data_type=["uint256"],
        input=[treasury_address],
        input_data_type=["address"],
        block_number="latest"
    )
    # Access result: balance_result["output_args"][0]
    token_balance = balance_result["output_args"][0]
    
    # Get price using token contract address
    price_data = get_price(
        price_source="coingecko",
        asset=token_address,  # Token contract address, not symbol
        chain="ethereum",
        amount=token_balance
    )
    # Returns: {"price": price, "usd_value": usd_value, "decimals": decimals, "symbol": symbol}
    
    return {
        "token_balance": token_balance,
        "token_price": price_data["price"],
        "usd_value": price_data["usd_value"],
        "token_symbol": price_data["symbol"]
    }

def multi_chain_web3_example(extracted_variables):
    """Example using get_node for different chains"""
    
    # Get Web3 instances for different chains
    eth_w3 = get_node('ethereum').w3
    base_w3 = get_node('base').w3
    bitcoin_w3 = get_node('bitcoin').w3
    
    contract_address = extracted_variables["contract_address"]
    
    # Use Web3 directly for complex operations
    eth_balance = eth_w3.eth.get_balance(contract_address)
    latest_block = eth_w3.eth.block_number
    
    # Cross-chain balance checking
    bitcoin_balance = bitcoin_w3.eth.get_balance(contract_address)
    
    return {
        "eth_balance": eth_balance,
        "bitcoin_balance": bitcoin_balance,
        "latest_ethereum_block": latest_block
    }
```

**Python Processing Limitations**

**Important:** Python processing has specific limitations:

-   **No in-place operators**: Avoid `+=`, `-=`, `*=`, `/=`
    
-   **No tuple unpacking in loops**: Avoid `for key, value in dict.items()`
    
-   **Import statements**: Must be inside the function
    
-   **Single line statements**: Avoid inline if statements
    

**Good Patterns:**

```


# Good: Explicit addition
total = total + new_value

# Good: Direct loop iteration
for item in list_items:
    process(item)

# Good: Full if-else blocks
if condition:
    result = value_a
else:
    result = value_b
```

**Bad Patterns:**

```


# Bad: In-place operators
total += new_value

# Bad: Tuple unpacking
for key, value in dictionary.items():
    process(key, value)

# Bad: Inline if statement
result = value_a if condition else value_b
```

**Example**

```
def calculate_percentage(extracted_variables):
    old_value = extracted_variables["old_value"]
    new_value = extracted_variables["new_value"]
    # Good: Use explicit operations
    change = new_value - old_value
    percentage = (change / old_value) * 100
    return percentage

def advanced_contract_analysis(extracted_variables):
    # Import inside function
    from web3 import Web3
    import requests
    
    # Get Web3 instance
    w3 = get_node('ethereum').w3
    contract_address = extracted_variables["contract_address"]
    
    # Convert to checksum address
    checksum_address = w3.toChecksumAddress(contract_address)
    
    # Make contract call
    abi = [{"inputs": [], "name": "totalSupply", "outputs": [{"type": "uint256"}], "stateMutability": "view", "type": "function"}]
    contract = w3.contract(address=checksum_address, abi=abi)
    total_supply = contract.functions.totalSupply().call()
    
    # Make external API call
    response = requests.get(f"https://api.etherscan.io/api?module=contract&action=getsourcecode&address={contract_address}")
    if response.status_code == 200:
        contract_data = response.json()
    else:
        contract_data = {"error": "API call failed"}
    
    return {
        "total_supply": total_supply,
        "contract_verified": contract_data.get("result", [{}])[0].get("SourceCode") != "",
        "checksum_address": checksum_address
    }

python_var = PythonProcessingVariable(
    source_code=advanced_contract_analysis,
    var_name="contract_analysis"
)
```

#### 

Class: `JsonEndpointVariable`

Fetch data from external APIs.

```
@dataclass
class JsonEndpointVariable(Variable):
    url: str
    method: str
    json_path: str
    json_path_engine: str
```

**Parameters**

Parameter

Type

Required

Description

`url`

`str`

Yes

API endpoint URL

`method`

`str`

Yes

HTTP method ("get", "post", "patch")

`json_path`

`str`

Yes

Path to extract from response

`json_path_engine`

`str`

Yes

Path engine to use

`var_name`

`str`

Yes

Variable name

**Supported Path Engines**

**Recommended:**

-   `jsonata`: Advanced expressions, transformations, and calculations - **Default engine**
    

**Alternatives:**

-   `jmespath`: Simple JSON field extraction (legacy compatibility)
    
-   `jq`: Complex JSON processing (for jq experts)
    
-   `jsonpath-ng`: XPath-like syntax
    

**Example**

```


# Get ETH price with category from CoinGecko (recommended: jsonata)
price_var = JsonEndpointVariable(
    url="https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",
    method="get",
    json_path="ethereum.usd > 2500 ? 'expensive' : 'affordable'",
    json_path_engine="jsonata",
    var_name="eth_price_category"
)

# Simple price extraction (alternative: jmespath)
simple_price_var = JsonEndpointVariable(
    url="https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",
    method="get",
    json_path="ethereum.usd",
    json_path_engine="jmespath",
    var_name="eth_price"
)
```

#### 

Class: `HistoricalEventsVariable`

Query historical blockchain events.

```
@dataclass
class HistoricalEventsVariable(Variable):
    chain: Chain
    contract_address: str
    event_name: str
    event_filters: Optional[Dict[str, str]] = None
    abi_string: Optional[str] = None
    from_block: Optional[str] = None
    to_block: Optional[str] = None
```

**Parameters**

Parameter

Type

Required

Description

`chain`

`Chain`

Yes

Blockchain to query

`contract_address`

`str`

Yes

Contract to query

`event_name`

`str`

Yes

Event name to fetch

`event_filters`

`Dict[str, str]`

No

Filters for indexed parameters

`abi_string`

`str`

No

Full ABI JSON string for unverified contracts

`from_block`

`str`

No

Starting block number

`to_block`

`str`

No

Ending block number

`var_name`

`str`

Yes

Variable name

**Example**

```


# Get Transfer events from Binance wallet (verified contract)
history_var = HistoricalEventsVariable(
    chain=Chain.ETHEREUM,
    contract_address="0xdAC17F958D2ee523a2206206994597C13D831ec7",
    event_name="Transfer",
    event_filters={"from": "0xF977814e90dA44bFA03b6295A0616a897441aceC"},
    var_name="binance_transfers"
)

# Get PoolCreated events from unverified contract with custom ABI
pool_events_var = HistoricalEventsVariable(
    chain=Chain.ETHEREUM,
    contract_address="0x5B42eC6D40f7B7965BE5308c70e2603c0281C1E9",
    event_name="PoolCreated(index_topic_1 address pool)",
    abi_string='[{ "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "pool", "type": "address" } ], "name": "PoolCreated", "type": "event" }]',
    var_name="pool_created_events"
)
```

#### 

Class: `ContractDataServiceVariable`

Retrieve comprehensive contract data and analytics.

```
@dataclass
class ContractDataServiceVariable(Variable):
    address: str
    chain: Chain = field(default_factory=get_default_chain)
    output_index: Optional[str] = None
```

**Parameters**

Parameter

Type

Required

Description

`address`

`str`

Yes

Contract address to analyze

`chain`

`Chain`

No

Blockchain to query

`output_index`

`str`

No

Specific data field to extract

`var_name`

`str`

Yes

Variable name

**Example**

```
cds_var = ContractDataServiceVariable(
    address="0x1234567890abcdef1234567890abcdef12345678",
    chain=Chain.ETHEREUM,
    output_index="contract_score",
    var_name="contract_data"
)
```

#### 

Class: `JsonProcessingVariable`

Process and extract data from JSON structures.

```
@dataclass
class JsonProcessingVariable(Variable):
    json_path: str
    json_path_engine: Optional[str] = None
```

**Parameters**

Parameter

Type

Required

Description

`json_path`

`str`

Yes

Path to extract from JSON

`json_path_engine`

`str`

No

Engine for path processing

`var_name`

`str`

Yes

Variable name

**Supported Engines**

**Recommended (Primary Choice):**

-   `jsonata`: Advanced transformations, calculations, and conditional logic - **Default engine**
    

**Alternative Engines:**

-   `jmespath`: Simple JSON field extraction (legacy compatibility)
    
-   `jq`: Complex JSON transformations (for advanced users familiar with jq)
    
-   `jsonpath-ng`: XPath-like syntax (for users with XPath background)
    

**Engine Selection Guide:**

-   **Use jsonata for**: Calculations, transformations, conditionals, complex expressions
    
-   **Use jmespath for**: Simple field access like `data.field` or `items[0].name`
    
-   **Use jq for**: Advanced users who prefer jq syntax for complex transformations
    
-   **Use jsonpath-ng for**: Users familiar with XPath syntax patterns
    

**Example**

```


# Recommended: JSONata for complex processing
json_var = JsonProcessingVariable(
    json_path="data.transactions[0].amount > 1000000 ? 'large' : 'small'",
    json_path_engine="jsonata",
    var_name="transaction_category"
)

# Alternative: JMESPath for simple field extraction
simple_var = JsonProcessingVariable(
    json_path="data.transactions[0].amount",
    json_path_engine="jmespath", 
    var_name="transaction_amount"
)
```

#### 

Class: `GetSecretVariable`

Retrieve stored secrets.

```
@dataclass
class GetSecretVariable(Variable):
    secret_name: str
```

**Example**

```
secret_var = GetSecretVariable(
    secret_name="api_key",
    var_name="my_api_key"
)
```

#### 

Class: `PriceServiceVariable`

Retrieve asset prices using Hypernative's integrated price service.

```
@dataclass
class PriceServiceVariable(Variable):
    price_source: str
    asset: str
    amount: Optional[int] = 1
    chain: Chain = field(default_factory=get_default_chain)
    scale_to_decimals: Optional[bool] = None
    pre_conditions: Optional[List[str]] = None
```

**Parameters**

Parameter

Type

Required

Description

`price_source`

`str`

Yes

Price data source (e.g., "coingecko")

`asset`

`str`

Yes

Asset identifier (contract address or coin ID)

`amount`

`Optional[int]`

No

Amount for price calculation (default: 1)

`chain`

`Chain`

No

Blockchain to query (uses default if not set)

`scale_to_decimals`

`Optional[bool]`

No

Whether to scale the price to token decimals

`pre_conditions`

`Optional[List[str]]`

No

Conditions that must be met before execution

`var_name`

`str`

Yes

Variable name

**Example**

```


# Get token price using contract address
token_price_var = PriceServiceVariable(
    price_source="coingecko",
    asset="0xdAC17F958D2ee523a2206206994597C13D831ec7",  # USDT contract
    amount=1,
    scale_to_decimals=True,
    var_name="token_price"
)
agent.add_variable(token_price_var)

# Get native asset price using coin ID
eth_price_var = PriceServiceVariable(
    price_source="coingecko",
    asset="ethereum",
    amount=1,
    chain=Chain.ethereum,
    var_name="eth_price"
)
agent.add_variable(eth_price_var)
```

#### 

Class: `TokenBalanceVariable`

Monitor token balances for any address and token with automatic decimal scaling.

```
@dataclass
class TokenBalanceVariable(Variable):
    token_holder_address: str
    chain: Chain = field(default_factory=get_default_chain)
    token_address: Optional[str] = None
    native_token: Optional[bool] = False
    scale_to_decimals: Optional[bool] = True
```

**Parameters**

Parameter

Type

Required

Description

`token_holder_address`

`str`

Yes

Address whose balance to check

`token_address`

`str`

No

ERC-20 token contract address (omit for native)

`native_token`

`bool`

No

Set to True for native token balance (ETH, BNB)

`scale_to_decimals`

`bool`

No

Automatically scale to human-readable format

`chain`

`Chain`

No

Blockchain to query (uses default if not set)

`var_name`

`str`

Yes

Variable name

**Examples**

```


# Monitor USDT balance for whale wallet
whale_usdt_var = TokenBalanceVariable(
    token_holder_address="0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643",
    token_address="0xdAC17F958D2ee523a2206206994597C13D831ec7",  # USDT
    var_name="whale_usdt_balance"
)
agent.add_variable(whale_usdt_var)

# Monitor native ETH balance
eth_balance_var = TokenBalanceVariable(
    token_holder_address="0x8ba1f109551bD432803012645Hac136c22C57Mee",
    native_token=True,
    var_name="wallet_eth_balance"
)
agent.add_variable(eth_balance_var)

# Monitor token with manual decimal handling
raw_token_var = TokenBalanceVariable(
    token_holder_address="0x123...456",
    token_address="0x789...abc",
    scale_to_decimals=False,  # Returns raw balance
    var_name="raw_token_balance"
)
agent.add_variable(raw_token_var)
```

#### 

Class: `GetValueVariable`

Retrieve previously stored values from persistent storage.

```
@dataclass
class GetValueVariable(Variable):
    key: str
```

**Parameters**

Parameter

Type

Required

Description

`key`

`str`

Yes

Storage key to retrieve value from

`var_name`

`str`

Yes

Variable name

**Example**

```


# Retrieve previously stored balance
get_var = GetValueVariable(
    key="last_balance",
    var_name="previous_balance"
)
agent.add_variable(get_var)

# Use in Python processing
def calculate_change(extracted_variables):
    current = extracted_variables["current_balance"]
    previous = extracted_variables["previous_balance"]
    
    if previous is False:  # First run
        return {"change": 0, "is_first_run": True}
    
    change = current - int(previous)
    return {"change": change, "is_first_run": False}
```

#### 

Class: `SetValueVariable`

Store values in persistent storage for future retrieval.

```
@dataclass
class SetValueVariable(Variable):
    key: str
    value: str
```

**Parameters**

Parameter

Type

Required

Description

`key`

`str`

Yes

Storage key for the value

`value`

`str`

Yes

Value to store (use extracted\_variables reference)

`var_name`

`str`

Yes

Variable name

**Example**

```


# Store current balance for next execution
set_var = SetValueVariable(
    key="last_balance",
    value="extracted_variables.current_balance",
    var_name="storage_result"
)
agent.add_variable(set_var)

# Complete stateful monitoring pattern
def process_balance(extracted_variables):
    balance = extracted_variables["current_balance"]
    return str(balance)

# Process and store balance
process_var = PythonProcessingVariable(
    source_code=process_balance,
    var_name="balance_to_store"
)
agent.add_variable(process_var)

# Store the processed value
store_var = SetValueVariable(
    key="last_balance",
    value="extracted_variables.balance_to_store",
    var_name="store_result"
)
agent.add_variable(store_var)
```

**State Management Pattern**

Use GetValueVariable and SetValueVariable together for stateful monitoring:

```
from invariantive.model.variable import GetValueVariable, SetValueVariable, PythonProcessingVariable

# 1. Retrieve previous state
get_previous = GetValueVariable(
    key="last_total_supply",
    var_name="previous_supply"
)
agent.add_variable(get_previous)

# 2. Get current data
current_supply = GenericContractReadVariable(
    contract_address="0xdAC17F958D2ee523a2206206994597C13D831ec7",
    func_sig="totalSupply",
    output_index="output_arg_0",
    var_name="current_supply"
)
agent.add_variable(current_supply)

# 3. Compare and analyze
def analyze_supply_change(extracted_variables):
    current = extracted_variables["current_supply"]
    previous = extracted_variables["previous_supply"]
    
    if previous is False:
        return {"change": 0, "percentage": 0, "is_first_run": True}
    
    previous_int = int(previous)
    change = current - previous_int
    percentage = (change / previous_int) * 100 if previous_int > 0 else 0
    
    return {
        "change": change,
        "percentage": percentage,
        "is_significant": abs(percentage) > 1.0,  # 1% threshold
        "is_first_run": False
    }

analysis_var = PythonProcessingVariable(
    source_code=analyze_supply_change,
    var_name="supply_analysis"
)
agent.add_variable(analysis_var)

# 4. Store current value for next run
store_current = SetValueVariable(
    key="last_total_supply",
    value="extracted_variables.current_supply",
    var_name="store_result"
)
agent.add_variable(store_current)

# 5. Alert on significant changes
supply_alert = AlertConfig(
    var_name="supply_analysis",
    operator="json_path",
    operands=["is_significant == true"],
    description="USDT supply changed by {{supply_analysis.percentage}}% ({{supply_analysis.change}} tokens)"
)
agent.set_alert(supply_alert)
```

#### 

Class: `IsInListVariable`

Check if an address exists in a managed address list.

```
@dataclass
class IsInListVariable(Variable):
    list_uuid: str
    address: str
    chain: Chain = field(default_factory=get_default_chain)
```

**Parameters**

Parameter

Type

Required

Description

`list_uuid`

`str`

Yes

UUID of the managed address list

`address`

`str`

Yes

Address to check for existence in list

`chain`

`Chain`

No

Blockchain to check on (uses default)

`var_name`

`str`

Yes

Variable name

**Example**

```


# Check if sender is in whitelist
whitelist_check_var = IsInListVariable(
    list_uuid="550e8400-e29b-41d4-a716-446655440000",
    address="extracted_variables.tx_from",
    var_name="is_whitelisted"
)
agent.add_variable(whitelist_check_var)

# Use in alert condition
whitelist_alert = AlertConfig(
    var_name="is_whitelisted",
    operator="compare_exact",
    operands=[True],
    description="Transaction from whitelisted address: {{tx_from}}"
)
agent.set_alert(whitelist_alert)
```

#### 

Class: `AddToListVariable`

Dynamically add addresses to a managed address list.

```
@dataclass
class AddToListVariable(Variable):
    list_uuid: str
    address: str
    chain: Chain = field(default_factory=get_default_chain)
    note: str = ""
```

**Parameters**

Parameter

Type

Required

Description

`list_uuid`

`str`

Yes

UUID of the managed address list

`address`

`str`

Yes

Address to add to the list

`note`

`str`

No

Optional note or reason for addition

`chain`

`Chain`

No

Blockchain context (uses default)

`var_name`

`str`

Yes

Variable name

**Example**

```


# Add large transfer recipient to watchlist
add_to_watchlist_var = AddToListVariable(
    list_uuid="550e8400-e29b-41d4-a716-446655440001",
    address="extracted_variables.transfer_to",
    note="Large transfer recipient",
    var_name="add_result"
)
agent.add_variable(add_to_watchlist_var)

# Complete pattern: Check and conditionally add
def should_add_to_list(extracted_variables):
    transfer_amount = extracted_variables["transfer_amount"]
    return transfer_amount > 1000000  # Add if over 1M tokens

check_var = PythonProcessingVariable(
    source_code=should_add_to_list,
    var_name="should_add"
)
agent.add_variable(check_var)

# Conditional addition using pre_conditions
conditional_add_var = AddToListVariable(
    list_uuid="550e8400-e29b-41d4-a716-446655440001",
    address="extracted_variables.transfer_to",
    note="High-value transfer recipient",
    pre_conditions=["should_add == true"],
    var_name="conditional_add_result"
)
agent.add_variable(conditional_add_var)
```

### 

Alert Configuration

Define when and how to send notifications.

#### 

Class: `AlertConfig`

```
@dataclass
class AlertConfig(Model):
    var_name: str
    operator: str
    operands: List[Union[float, int, bool]]
    description: str
    involved_assets: Dict[str, str] = field(default_factory=dict)
    is_one_shot: Optional[bool] = None
    type_id: Optional[str] = None
```

**Parameters**

Parameter

Type

Required

Description

`var_name`

`str`

Yes

Variable to monitor

`operator`

`str`

Yes

Comparison operator

`operands`

`List[Union[float, int, bool]]`

Yes

Values to compare against

`description`

`str`

Yes

Alert message template

`involved_assets`

`Dict[str, str]`

No

Map variable names to asset aliases

`is_one_shot`

`bool`

No

Whether alert triggers only once

`type_id`

`str`

No

Custom alert type identifier

**Available Operators**

**Comparison Operators:**

-   `gt`: Greater than
    
-   `gte`: Greater than or equal
    
-   `lt`: Less than
    
-   `lte`: Less than or equal
    
-   `compare_exact`: Exact match
    
-   `ne`: Not equal
    
-   `one_of`: Value is in list
    
-   `not_one_of`: Value is not in list
    
-   `in_range`: Value is between two numbers (inclusive)
    
-   `out_range`: Value is outside range
    
-   `any`: Always true
    

**Address Operators:**

-   `is_contract`: Address is a smart contract
    
-   `is_eoa`: Address is an externally owned account
    

**Time-Based Operators:**

-   `changed_by`: Value changed by threshold over time period
    
-   `increased_by`: Value increased by threshold over time period
    
-   `decreased_by`: Value decreased by threshold over time period
    

**Time-Based Operator Parameters**

For `changed_by`, `increased_by`, and `decreased_by`, use this operand format:

```
operands=[{
    "threshold": 10,                    # Amount of change
    "threshold_type": "absolute",       # "absolute" or "relative"
    "period": 3,                       # Time period
    "period_unit": "hours"             # "blocks", "seconds", "hours", "days"
}]
```

**Template Variables**

Use `{{variable_name}}` in descriptions to include variable values:

```
description="Balance changed from {{old_balance}} to {{new_balance}}"
```

**Notification Channels**

When deploying agents to production, configure notification channels to receive alerts:

**Channel Configuration Format:**

```
channels_configurations = [
    {"id": 1337},  # Channel ID from Hypernative platform
    {"id": 1275},  # Multiple channels supported
    {"id": 2024}
]
```

**Getting Channel IDs:**

-   **Platform UI**: Navigate to notification channels, click on desired channel, copy ID from URL
    

**Deployment with Channels:**

```


# Deploy agent with notification channels
agent_id = agent.deploy(
    agent_name="my_monitoring_agent",
    severity="Medium",
    channels_configurations=[{"id": 1337}, {"id": 1275}]
)
```

**Example**

```


# Basic alert configuration
alert = AlertConfig(
    var_name="total_supply",
    operator="gt", 
    operands=[80000000000000],
    description="USDT supply exceeded threshold: {{total_supply}}",
    involved_assets={"total_supply": "USDT"},
    is_one_shot=False
)

# Production deployment with multiple notification channels
agent_id = agent.deploy(
    agent_name="usdt_supply_monitor",
    severity="High",
    channels_configurations=[
        {"id": 1337},  # Primary notification channel
        {"id": 1275},  # Secondary notification channel  
        {"id": 2024}   # Additional channel for alerts
    ],
    security_suit_ids=[1342, 1343],     # Optional: Security suite integration
    reminders_configurations=[{         # Optional: Reminder settings
        "interval": 3600,               # 1 hour intervals
        "max_reminders": 3
    }]
)

if agent_id != -1:
    print(f"Agent deployed successfully with ID: {agent_id}")
    print("Notifications will be sent to configured channels")
else:
    print("Deployment failed - check channel IDs and configuration")
```

### 

Run Configuration

Configure how to execute your agent.

#### 

Class: `RunConfig`

```
@dataclass
class RunConfig(Model):
    chain: Chain = field(default_factory=get_default_chain)
    hashes: Optional[List[str]] = None
    blocks: Optional[List[int]] = None
```

**Parameters**

Parameter

Type

Required

Description

`chain`

`Chain`

No

Blockchain to run on

`hashes`

`List[str]`

No

Specific transaction hashes

`blocks`

`List[int]`

No

Specific block numbers

**Note:** Either `hashes` or `blocks` must be provided.

**Special Values**

-   `blocks=[0]`: Run on the latest block
    
-   Multiple values: Run on all specified blocks/transactions
    

**Example**

```


# Test on specific blocks
run_config = RunConfig(
    chain=Chain.ETHEREUM,
    blocks=[21202357, 21202358]
)

# Test on specific transactions
run_config = RunConfig(
    chain=Chain.ETHEREUM,
    hashes=["0xbe110429f51279921ec95367234f3ca04e299c654b2386c102eb023081fed3cc"]
)

# Test on latest block
run_config = RunConfig(
    chain=Chain.ETHEREUM,
    blocks=[0]
)
```

### 

Conditions

Add additional filtering to triggers.

#### 

Class: `Condition`

```
@dataclass
class Condition:
    output_index: str
    operator: str
    operands: List[str]
```

**Parameters**

Parameter

Type

Required

Description

`output_index`

`str`

Yes

What to compare

`operator`

`str`

Yes

Comparison operator

`operands`

`List[str]`

Yes

Values to compare against

**Example**

```


# Only process large transfers
condition = Condition(
    output_index="emitted_arg_2",  # Transfer amount
    operator="gt",
    operands=["1000000000000"]
)

trigger.add_condition(condition)
```

### 

Base Classes

#### 

Class: `Model`

Abstract base class for all SDK models with type validation and serialization.

```
from abc import ABC, abstractmethod

class Model(ABC):
    @abstractmethod
    def _serialize_to_json(self) -> dict:
        raise NotImplementedError
    
    def __post_init__(self):
        # Automatic type validation for all fields
```

**Features**

-   **Automatic Type Validation**: All fields are validated against their type hints
    
-   **JSON Serialization**: Abstract method for converting to dictionary format
    
-   **Beartype Integration**: Runtime type checking for all model fields
    

**Usage**

All model classes (Agent, AlertConfig, RunConfig, etc.) inherit from this base class and benefit from automatic type validation.

#### 

Class: `Variable` (Abstract)

Base class for all variable types used in data extraction.

```
@dataclass
class Variable(Model, ABC):
    var_name: str
```

**Common Parameters**

Parameter

Type

Required

Description

`var_name`

`str`

Yes

Unique name to reference this variable

**Inheritance**

All variable classes inherit from this base:

-   `ContextVariable`
    
-   `ContractDataServiceVariable`
    
-   `GenericContractReadVariable`
    
-   `PythonProcessingVariable`
    
-   `JsonEndpointVariable`
    
-   `HistoricalEventsVariable`
    
-   `GetSecretVariable`
    
-   `JsonProcessingVariable`
    

#### 

Class: `Trigger` (Abstract)

Base class for all trigger types that define when agents execute.

```
@dataclass
class Trigger(Model, ABC):
    @abstractmethod
    def _create_runnable(self) -> invariantive.Trigger:
        raise NotImplementedError
        
    def add_condition(self, condition: Condition):
        # Most triggers support adding conditions
        
    def _runnable(self) -> invariantive.Trigger:
        # Returns the internal runnable trigger
```

**Features**

-   **Condition Support**: Most triggers can have conditions added
    
-   **Runtime Creation**: Creates internal trigger objects for execution
    
-   **Type Safety**: Ensures proper trigger configuration
    

**Inheritance**

All trigger classes inherit from this base:

-   `EventTrigger`
    
-   `FunctionCallTrigger`
    
-   `BlockTrigger`
    

### 

Enums and Constants

#### 

Enum: `Chain`

Comprehensive list of supported blockchain networks.

```
from invariantive.common.consts import Chain
```

**Major EVM Chains**

-   `Chain.ethereum`: Ethereum Mainnet
    
-   `Chain.arbitrum`: Arbitrum One
    
-   `Chain.base`: Base (Coinbase L2)
    
-   `Chain.polygon`: Polygon (formerly Matic)
    
-   `Chain.optimism`: Optimism
    
-   `Chain.avalanche`: Avalanche C-Chain
    
-   `Chain.bsc`: Binance Smart Chain
    
-   `Chain.fantom`: Fantom Opera
    
-   `Chain.gnosis`: Gnosis Chain (formerly xDai)
    

**Layer 2 & Scaling Solutions**

-   `Chain.linea`: Linea
    
-   `Chain.scroll`: Scroll
    
-   `Chain.zksync_era_mainnet`: zkSync Era
    
-   `Chain.polygon_zkevm`: Polygon zkEVM
    
-   `Chain.blast`: Blast L2
    
-   `Chain.mode`: Mode Network
    
-   `Chain.fraxtal`: Fraxtal
    
-   `Chain.mantle`: Mantle Network
    
-   `Chain.astar`: Astar
    
-   `Chain.astar_zkevm`: Astar zkEVM
    
-   `Chain.zkatana`: zkKatana Testnet
    

**Emerging EVM Chains**

-   `Chain.b3`: B3
    
-   `Chain.berachain`: Berachain
    
-   `Chain.hyperliquid_evm`: Hyperliquid EVM
    
-   `Chain.ink`: Ink
    
-   `Chain.ink_sand`: Ink Sandbox
    
-   `Chain.ink_sepolia`: Ink Sepolia
    
-   `Chain.kinto`: Kinto
    
-   `Chain.manta_pacific`: Manta Pacific
    
-   `Chain.sei_evm`: Sei EVM
    
-   `Chain.zircuit`: Zircuit
    
-   `Chain.zircuit_beta`: Zircuit Beta
    
-   `Chain.zircuit_mainnet`: Zircuit Mainnet
    
-   `Chain.core`: Core Chain
    
-   `Chain.corn`: Corn Network
    
-   `Chain.deri`: Deri Protocol
    
-   `Chain.flare`: Flare Network
    
-   `Chain.haven1`: Haven1
    
-   `Chain.hemi`: Hemi Network
    
-   `Chain.hychain`: HyChain
    
-   `Chain.hyperliquid_evm_testnet`: Hyperliquid EVM Testnet
    
-   `Chain.karak`: Karak
    
-   `Chain.kava`: Kava EVM
    
-   `Chain.moonbeam`: Moonbeam
    
-   `Chain.moonriver`: Moonriver
    
-   `Chain.orderly`: Orderly Network
    
-   `Chain.plume`: Plume Network
    
-   `Chain.songbird`: Songbird
    
-   `Chain.sonic`: Sonic
    
-   `Chain.tac`: TAC
    
-   `Chain.tac_spb`: TAC SPB
    
-   `Chain.tac_turin`: TAC Turin
    
-   `Chain.unichain`: Unichain
    
-   `Chain.x_layer`: X Layer
    
-   `Chain.zeta`: ZetaChain
    
-   `Chain.celo`: Celo
    

**Non-EVM Blockchains**

-   `Chain.bitcoin`: Bitcoin
    
-   `Chain.solana`: Solana
    
-   `Chain.starknet`: StarkNet
    
-   `Chain.aptos`: Aptos
    
-   `Chain.movement`: Movement
    
-   `Chain.injective`: Injective
    
-   `Chain.sei_cosmos`: Sei (Cosmos)
    
-   `Chain.stellar`: Stellar
    
-   `Chain.stacks`: Stacks
    
-   `Chain.thorchain`: THORChain
    

**Testnets**

-   `Chain.ethereum_sepolia`: Ethereum Sepolia
    
-   `Chain.ethereum_holesky`: Ethereum Holesky
    
-   `Chain.berachain_testnet`: Berachain Testnet
    
-   `Chain.caldera_testnet`: Caldera Testnet
    
-   `Chain.sei_evm_testnet`: Sei EVM Testnet
    
-   `Chain.hn_assessment`: Hypernative Assessment Chain
    

**Example**

```
from invariantive.common.consts import Chain

# Ethereum mainnet agent
trigger = BlockTrigger(
    period=1,
    period_unit="blocks",
    chain=Chain.ethereum
)

# Multi-chain support
chains = [Chain.ethereum, Chain.arbitrum, Chain.base]
for chain in chains:
    agent_config = RunConfig(chain=chain, blocks=[0])
```

#### 

Supported Operators

Constants for comparison operations used in alerts and conditions.

```
from invariantive.common.consts import OPERATORS
```

**Available Operators**

-   `"lte"`: Less than or equal
    
-   `"lt"`: Less than
    
-   `"gte"`: Greater than or equal
    
-   `"gt"`: Greater than
    
-   `"compare_exact"`: Exact equality
    
-   `"ne"`: Not equal
    
-   `"one_of"`: Value in list
    
-   `"not_one_of"`: Value not in list
    
-   `"in_range"`: Value within range
    
-   `"out_range"`: Value outside range
    
-   `"is_contract"`: Address is smart contract
    
-   `"is_eoa"`: Address is externally owned account
    
-   `"any"`: Always true (no filtering)
    
-   `"decreased_by"`: Value decreased by threshold
    
-   `"increased_by"`: Value increased by threshold
    
-   `"changed_by"`: Value changed by threshold
    
-   `"changed"`: Value changed
    

### 

Type Hints

The SDK uses comprehensive type hints for better IDE support:

```
from typing import Dict, List, Optional, Union, Any
from invariantive.model.agent import Agent
from invariantive.model.trigger import BlockTrigger
from invariantive.model.variable import Variable
from invariantive.model.alert import AlertConfig
from invariantive.model.run import RunConfig
```
