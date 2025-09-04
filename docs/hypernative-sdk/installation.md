---
icon: sign-posts-wrench
---

# Installation

## Prerequisites

* Python 3.10 or higher
* [A Hypernative API key](../hypernative-api/account/api-keys.md) (create one in Settings → API Keys)

## Installation Steps

### 1. Install the SDK

```bash
# Request a GitHub PAT token from Hypernative
# Then install using:
pip install git+https://github_pat_XXXXXXX@github.com/Hypernative-Labs/invariantive.git@refs/tags/stable
```

### 2. Configure Credentials

Create an API key called "sdk\_api\_key" in the Hypernative platform and download the JSON file:

```bash
mkdir ~/.hypernative
cat sdk_api_key.json > ~/.hypernative/credentials
```

You should now have a file named `credentials` in the path `~/.hypernative` which contains your API key details.

### 3. Verify Installation

Create a simple test script to verify your installation:

```python
from invariantive.model.agent import Agent
from invariantive.model.trigger import BlockTrigger
from invariantive.common.consts import Chain
from invariantive.common.environment import set_default_chain

# Set default chain for the session
set_default_chain(Chain.ethereum)

# Create a simple agent
trigger = BlockTrigger(
    period=1,
    period_unit="blocks",
)

agent = Agent(trigger=trigger)
print("Installation successful!")
print(f"Agent created with trigger: {type(trigger).__name__}")
```

## Dependencies

The SDK automatically installs the following dependencies:

* `dill==0.3.9` - Serialization support for Python processing functions
* `requests==2.32.3` - HTTP requests for external API integration
* `cryptography==44.0.1` - Cryptographic operations and secure communications
* `beartype==0.20.0` - Runtime type checking and validation
* `python-decouple==3.8` - Configuration management for secrets and settings
* `pyyaml==6.0.2` - YAML parsing for configuration files
* `web3>=6.0.0` - Ethereum and EVM blockchain interactions
* `pandas>=1.5.0` - Data analysis capabilities in Python processing
* `numpy>=1.21.0` - Numerical computing support

## Troubleshooting

### Common Issues

**Permission denied during installation:**

* Ensure your GitHub PAT token has the necessary repository access permissions

**Import errors:**

* Verify Python version is 3.10 or higher: `python --version`
* Check that all dependencies are installed correctly

**Credential errors:**

* Verify that the credentials file exists at `~/.hypernative/credentials`



## Next Steps

* Read the [Core Concepts](core-concepts.md) to understand the framework
* Explore [Quick Start](quick-start.md) for your first agent
* Browse [Examples](examples.md) for practical use cases
