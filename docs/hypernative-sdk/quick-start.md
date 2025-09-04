# Quick Start | Hypernative Product Docs

### 

Your First Agent

Let's create a simple agent that runs every block, gets the block number from context, and alerts when block numbers are greater than 0.

#### 

Step 1: Import Required Classes

```
from invariantive.model.agent import Agent
from invariantive.model.trigger import BlockTrigger
from invariantive.model.variable import ContextVariable
from invariantive.model.alert import AlertConfig
from invariantive.model.run import RunConfig
from invariantive.common.consts import Chain
from invariantive.common.environment import set_default_chain
```

#### 

Step 2: Set Default Chain and Create a Trigger

```


# Set default chain for the session
set_default_chain(Chain.ethereum)

# Monitor every block on Ethereum
trigger = BlockTrigger(
    period=1,
    period_unit="blocks"
)
```

#### 

Step 3: Create an Agent

```
agent = Agent(trigger=trigger)
```

#### 

Step 4: Add Variables

```


# Get current block number from context
block_var = ContextVariable(
    output_index="block_number",
    var_name="current_block"
)

agent.add_variable(block_var)
```

#### 

Step 5: Configure Alert

```
alert = AlertConfig(
    var_name="current_block",
    operator="gt",
    operands=[0],
    description="Block number detected: {{current_block}}"
)

agent.set_alert(alert)
```

#### 

Step 6: Test Your Agent

```


# Test on latest block
findings = agent.run(RunConfig(blocks=[0]))
print("num findings:", len(findings["findings"]))
for f in findings["findings"]:
    print(f["description"])
    print("extracted variables during the run:", f["extracted_variables"])
```

#### 

Complete Working Example

Here's the complete script that you can copy and run:

```
from invariantive.model.agent import Agent
from invariantive.model.trigger import BlockTrigger
from invariantive.model.variable import ContextVariable
from invariantive.model.alert import AlertConfig
from invariantive.model.run import RunConfig
from invariantive.common.consts import Chain
from invariantive.common.environment import set_default_chain

# 1. Set default chain
set_default_chain(Chain.ethereum)

# 2. Create trigger - run every block
trigger = BlockTrigger(
    period=1,
    period_unit="blocks"
)

# 3. Create agent
agent = Agent(trigger=trigger)

# 4. Add variable - get block number from context
block_var = ContextVariable(
    output_index="block_number",
    var_name="current_block"
)
agent.add_variable(block_var)

# 5. Configure alert - alert when block number > 0
alert = AlertConfig(
    var_name="current_block",
    operator="gt",
    operands=[0],
    description="Block number detected: {{current_block}}"
)
agent.set_alert(alert)

# 6. Test
findings = agent.run(RunConfig(blocks=[0]))
print("num findings:", len(findings["findings"]))
for f in findings["findings"]:
    print(f["description"])
    print("extracted variables during the run:", f["extracted_variables"])

# 7. Deploy to production (uncomment when ready)


# agent.deploy(


#     agent_name="Block_Number_Monitor", 


#     severity="Low",


#     channels_configurations=[{"id": 1337}]  # Replace with your channel ID


# )
```

### 

More Examples

#### 

Contract Data Monitoring

Monitor USDT total supply:

```
from invariantive.model.agent import Agent
from invariantive.model.trigger import BlockTrigger
from invariantive.model.variable import GenericContractReadVariable
from invariantive.model.alert import AlertConfig
from invariantive.model.run import RunConfig
from invariantive.common.consts import Chain
from invariantive.common.environment import set_default_chain

# Set default chain
set_default_chain(Chain.ethereum)

# Create block trigger
trigger = BlockTrigger(
    period=1,
    period_unit="blocks"
)

# Create agent
agent = Agent(trigger=trigger)

# Get USDT total supply
supply_var = GenericContractReadVariable(
    contract_address="0xdAC17F958D2ee523a2206206994597C13D831ec7",  # USDT
    func_sig="totalSupply",
    output_index="output_arg_0",
    var_name="total_supply"
)
agent.add_variable(supply_var)

# Alert when supply exceeds threshold
alert = AlertConfig(
    var_name="total_supply",
    operator="gt",
    operands=[80000000000000],
    description="USDT total supply: {{total_supply}}"
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


#     agent_name="USDT_Supply_Monitor", 


#     severity="Medium",


#     channels_configurations=[{"id": 1337}]  # Replace with your channel ID


# )
```

#### 

Custom Python Logic

Use Python for complex calculations:

```
from invariantive.model.agent import Agent
from invariantive.model.trigger import BlockTrigger
from invariantive.model.variable import ContextVariable, PythonProcessingVariable
from invariantive.model.alert import AlertConfig
from invariantive.model.run import RunConfig
from invariantive.common.consts import Chain
from invariantive.common.environment import set_default_chain

# Set default chain
set_default_chain(Chain.ethereum)

# Create block trigger
trigger = BlockTrigger(
    period=1,
    period_unit="blocks"
)

# Create agent
agent = Agent(trigger=trigger)

# Get current block number
block_var = ContextVariable(
    output_index="block_number",
    var_name="current_block"
)
agent.add_variable(block_var)

# Custom Python analysis
def analyze_block(extracted_variables):
    # Custom logic here
    block_number = extracted_variables["current_block"]
    
    # Simple analysis
    if block_number % 1000 == 0:
        return True
    else:
        return False

analysis_var = PythonProcessingVariable(
    source_code=analyze_block,
    var_name="analysis_result"
)
agent.add_variable(analysis_var)

# Alert on milestone blocks
alert = AlertConfig(
    var_name="analysis_result",
    operator="compare_exact",
    operands=[True],
    description="{{analysis_result.message}}"
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


#     agent_name="Block_Milestone_Analyzer", 


#     severity="Low",


#     channels_configurations=[{"id": 1337}]  # Replace with your channel ID


# )
```

#### 

External API Integration

Fetch data from external APIs:

```
from invariantive.model.agent import Agent
from invariantive.model.trigger import BlockTrigger
from invariantive.model.variable import JsonEndpointVariable
from invariantive.model.alert import AlertConfig
from invariantive.model.run import RunConfig
from invariantive.common.consts import Chain
from invariantive.common.environment import set_default_chain

# Set default chain
set_default_chain(Chain.ethereum)

# Create block trigger
trigger = BlockTrigger(
    period=1,  # Check every 10 blocks
    period_unit="blocks"
)

# Create agent
agent = Agent(trigger=trigger)

# Get data from external API
api_var = JsonEndpointVariable(
    var_name="external_data",
    method="get", 
    url="https://dogk3wv4lymlcxoq3qb3rbbqeq0jmpli.lambda-url.us-east-1.on.aws/",
    json_path="data", 
    json_path_engine="jsonata"
)
agent.add_variable(api_var)

# Alert when external data is available
alert = AlertConfig(
    var_name="external_data",
    operator="ne",
    operands=[0],
    description="External API data received: {{external_data}}"
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


#     agent_name="External_API_Data_Monitor", 


#     severity="Medium",


#     channels_configurations=[{"id": 1337}]  # Replace with your channel ID


# )
```

#### 

Event-Based Monitoring

Monitor large USDT transfers:

```
from invariantive.model.agent import Agent
from invariantive.model.trigger import EventTrigger
from invariantive.model.variable import ContextVariable, PythonProcessingVariable
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

# Extract transfer amount
amount_var = ContextVariable(
    output_index="emitted_arg_2",  # Transfer amount
    var_name="raw_amount"
)
agent.add_variable(amount_var)

# Convert to human readable format
def format_usdt_amount(extracted_variables):
    raw_amount = int(extracted_variables["raw_amount"])
    # USDT has 6 decimals
    usdt_amount = raw_amount / (10 ** 6)
    return {
        "amount_usdt": usdt_amount,
        "is_large": usdt_amount > 1000000  # > 1M USDT
    }

format_var = PythonProcessingVariable(
    source_code=format_usdt_amount,
    var_name="formatted_transfer"  
)
agent.add_variable(format_var)

# Alert on large transfers only
alert = AlertConfig(
    var_name="formatted_transfer",
    operator="json_path",
    operands=["is_large == true"],
    description="Large USDT transfer detected: {{formatted_transfer.amount_usdt}} USDT"
)
agent.set_alert(alert)

# Test the agent with specific transaction hashes
findings = agent.run(RunConfig(hashes=[
    "0xbe110429f51279921ec95367234f3ca04e299c654b2386c102eb023081fed3cc"
]))
print("num findings:", len(findings["findings"]))
for f in findings["findings"]:
    print(f["description"])
    print("extracted variables during the run:", f["extracted_variables"])

# Deploy to production (uncomment when ready)  


# agent.deploy(


#     agent_name="Large_USDT_Transfer_Monitor",


#     severity="High", 


#     channels_configurations=[{"id": 1337}]  # Replace with your channel ID


# )
```

### 

Testing Strategies

#### 

Test on Multiple Blocks

```


# Test on multiple specific blocks
findings = agent.run(RunConfig(blocks=[21202357, 21202358, 21202359]))
print("num findings:", len(findings["findings"]))
for f in findings["findings"]:
    print(f["description"])
    print("extracted variables during the run:", f["extracted_variables"])
```

#### 

Test on Specific Transactions

```


# Test on specific transaction hashes
findings = agent.run(RunConfig(hashes=[
    "0xbe110429f51279921ec95367234f3ca04e299c654b2386c102eb023081fed3cc",
    "0x1e2152aebc169e33bc97a5933e93966a3fbdbed877ca702d78b5b4ffa600c663"
]))
print("num findings:", len(findings["findings"]))
for f in findings["findings"]:
    print(f["description"])
    print("extracted variables during the run:", f["extracted_variables"])
```

#### 

Test on Latest Block

```


# Test on latest block (0 means latest)
findings = agent.run(RunConfig(blocks=[0]))
print("num findings:", len(findings["findings"]))
for f in findings["findings"]:
    print(f["description"])
    print("extracted variables during the run:", f["extracted_variables"])
```

### 

Deployment

Once you've tested your agent locally:

#### 

Option 1: Save Configuration

```


# Save to JSON file
agent.save_config("my_agent.json")

# Then upload via the Hypernative UI
```

#### 

Option 2: Direct Deployment

```


# Deploy directly from code
agent_id = agent.deploy(
    agent_name='my_unique_agent_name',
    severity="Medium",
    channels_configurations=[{"id": 1337}],  # Notification channel IDs
)

if agent_id != -1:
    print(f"Agent deployed successfully with ID: {agent_id}")
else:
    print("Deployment failed")
```

**Production Deployment Configuration**

For production deployments, configure multiple notification channels and additional settings:

```


# Production-ready deployment
agent_id = agent.deploy(
    agent_name='production_usdt_monitor_v1',
    severity="High",                        # Alert severity level
    channels_configurations=[
        {"id": 1337},                       # Primary Slack channel
        {"id": 1275},                       # Email notifications  
        {"id": 2024}                        # Webhook endpoint
    ],
    security_suit_ids=[1342, 1343],         # Security suite integration
    reminders_configurations=[{             # Reminder settings
        "interval": 3600,                   # Remind every hour
        "max_reminders": 3                  # Maximum 3 reminders
    }]
)

if agent_id != -1:
    print(f"Production agent deployed with ID: {agent_id}")
    print("Configured with multiple notification channels")
else:
    print("Deployment failed - check configuration")
```

**Getting Channel IDs**

**Method 1: Platform UI**

1.  Navigate to Hypernative platform → Notification Channels
    
2.  Click on your desired channel (Slack, Email, Webhook, etc.)
    
3.  Copy the channel ID from the URL
    

**Method 2: API**

```
import requests

# Get all available notification channels
response = requests.get(
    "https://api.hypernative.xyz/notification-channels",
    headers={
        "x-client-id": "your_client_id",
        "x-client-secret": "your_client_secret"
    }
)

channels = response.json()
print("Available channels:")
for channel in channels:
    print(f"ID: {channel['id']}, Type: {channel['type']}, Name: {channel['name']}")
```

**Deployment Best Practices**

1.  **Test First**: Always test your agent with `RunConfig` before deploying
    
2.  **Unique Names**: Agent names must be unique across your organization
    
3.  **Multiple Channels**: Configure multiple notification channels for redundancy
    
4.  **Appropriate Severity**: Set severity levels that match your alerting strategy
    
5.  **Channel Validation**: Verify channel IDs exist before deployment
    

```


# Validation example
def deploy_with_validation():
    # Test agent locally first
    test_result = agent.run(RunConfig(blocks=[0]))
    
    if len(test_result["findings"]) > 0:
        print("✓ Agent test passed - generating findings")
        
        # Deploy to production
        agent_id = agent.deploy(
            agent_name=f'validated_agent_{int(time.time())}',
            severity="Medium",
            channels_configurations=[{"id": 1337}, {"id": 1275}]
        )
        
        if agent_id != -1:
            print(f"✓ Deployed successfully with ID: {agent_id}")
            return agent_id
        else:
            print("✗ Deployment failed")
            return None
    else:
        print("✗ Agent test failed - no findings generated")
        return None
```
