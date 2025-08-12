# 🔵 Get Supported Chains

## Overview

Returns the list of chains that Hypernative monitors. Hypernative monitors all transactions in all blocks on these chains.

Examples of Hypernative features that required the `chain` field from the response:

1. [Create a Custom Agent](../custom-agents/custom-agent-creation.md) to use a protocol from a given chain
2. Edit a Watchlist and upload a [CSV file](../../../hypernative-web-application/watchlists/populate-watchlist-with-a-csv.md) of chains and addresses to monitor

## Usage

<mark style="color:blue;">`GET`</mark> `https://api.hypernative.xyz/supported-chains`

### Request Headers

| Name                                     | Type             | Description                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accept<br /><mark style="color:red;">Required</mark> | application/json |                                                                                                                                                                                                                                                                                                                                                         |
| x-client-id                              | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                       |
| x-client-secret                          | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                                   |
| authorization                            | String           | <p>Required if you prefer to login with a member's identity. See <a href="../account/login.md">Login with Email and Password</a> or <a href="../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |

### Response

Attributes:

<table><thead><tr><th width="166">Name</th><th width="150">Type</th><th>Description</th></tr></thead><tbody><tr><td>success<mark style="color:red;">*</mark></td><td>boolean</td><td>True in case the response returned successfully.</td></tr><tr><td>data<mark style="color:red;">*</mark></td><td>Array of <a href="get-supported-chains.md#chaindata-object">ChainData Object</a></td><td></td></tr></tbody></table>

#### ChainData Object

Attributes:

<table><thead><tr><th width="166">Name</th><th width="150">Type</th><th>Description</th></tr></thead><tbody><tr><td>chain<mark style="color:red;">*</mark></td><td>string</td><td>Unique name of the Chain. You can use this as the identifier of the Chain in all of Hypernative's API.</td></tr><tr><td>displayName<mark style="color:red;">*</mark></td><td>string</td><td>Display name of the Chain, for example "Manta Pacific".</td></tr><tr><td>evmChainId</td><td>number</td><td>For EVM-based Chains, the Chain's ID from the <a href="https://chainid.network/">Chainlist</a> standard.</td></tr><tr><td>beta</td><td>boolean</td><td>True if supported in beta, otherwise <code>False</code>.</td></tr><tr><td>comingSoon</td><td>boolean</td><td><p>For most Chains, this value is set to <code>False</code>.</p><p>Occasionally, Hypernative announces an upcoming support for a Chain. In that case, this value is <code>Tru</code>e and you cannot use assets from this Chain in any Watchlist or Custom Agent.</p></td></tr><tr><td>blockExplorer (deprecated)</td><td>string</td><td>This attribute and its contents are not officially supported or maintained. Hypernative may delete or change the contents of this attribute at any time.</td></tr><tr><td>iconUrl (deprecated)</td><td>string</td><td>This attribute and its contents are not officially supported or maintained. Hypernative may delete or change the contents of this attribute at any time.</td></tr><tr><td>supported (deprecated)</td><td>boolean</td><td>This attribute and its contents are not officially supported or maintained. Hypernative may delete or change the contents of this attribute at any time.</td></tr><tr><td>txSuffix (deprecated)</td><td>string</td><td>This attribute and its contents are not officially supported or maintained. Hypernative may delete or change the contents of this attribute at any time.</td></tr><tr><td>addressSuffix (deprecated)</td><td>string</td><td>This attribute and its contents are not officially supported or maintained. Hypernative may delete or change the contents of this attribute at any time.</td></tr><tr><td>hasCode (deprecated)</td><td>boolean</td><td>This attribute and its contents are not officially supported or maintained. Hypernative may delete or change the contents of this attribute at any time.</td></tr><tr><td>nativeToken (deprecated)</td><td><a href="get-supported-chains.md#tokendata-object">TokenData object</a></td><td>This attribute and its contents are not officially supported or maintained. Hypernative may delete or change the contents of this attribute at any time.</td></tr></tbody></table>

#### TokenData Object

<table><thead><tr><th width="166">Name</th><th width="150">Type</th><th>Description</th></tr></thead><tbody><tr><td>symbol</td><td>string</td><td></td></tr><tr><td>address</td><td>string</td><td></td></tr></tbody></table>

### Example

#### Request:

{% tabs %}
{% tab title="Curl" %}
```bash
 curl -X 'GET' \
'https://api.hypernative.xyz/supported-chains' \
-H 'accept: application/json' \
-H 'authorization: Bearer <token>'
```
{% endtab %}

{% tab title="Python" %}
```python
endpoint = "https://api.hypernative.xyz/supported-chains"
headers = {
    "x-client-id": <API Client ID>,
  "x-client-secret": <API Client Secret>,
    "Content-Type": "application/json"
}
response = requests.get(endpoint, headers=headers).json()
```
{% endtab %}
{% endtabs %}

#### Response:

```json
{
    "success": true,
    "data": [
        {
            "chain": "ethereum",
            "blockExplorer": "https://etherscan.io/",
            "displayName": "Ethereum",
            "iconUrl": "https://hypernative-webapp-icons.s3.amazonaws.com/chains-prod/ethereum.svg",
            "supported": true,
            "txSuffix": "tx/",
            "addressSuffix": "address/",
            "hasCode": true,
            "nativeToken": {
                "symbol": "ETH",
                "address": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
            },
            "evmChainId": 1
        },
        {
            "chain": "arbitrum",
            "blockExplorer": "https://arbiscan.io/",
            "displayName": "Arbitrum",
            "iconUrl": "https://hypernative-webapp-icons.s3.amazonaws.com/chains-prod/arbitrum.svg",
            "supported": true,
            "txSuffix": "tx/",
            "addressSuffix": "address/",
            "hasCode": true,
            "nativeToken": {
                "symbol": "ETH",
                "address": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
            },
            "evmChainId": 42161
        },
    ],
    "error": "",
    "version": "2.2.0",
    "service": "hypernative-webapp-server"
}
```
