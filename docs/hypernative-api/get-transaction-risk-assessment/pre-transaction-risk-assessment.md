# 🟢 EVM Transaction Risk Assessment V2

This endpoint enables a simulation of an assessed transaction, providing a comprehensive analysis of the results. It offers a recommendation, supporting rationale, and additional details to guide users in making informed decisions about whether to proceed with executing the transaction.

## Checks

The assessment comprises multiple security checks, such as:

* Interactions with known phishing addresses
* Connections to addresses associated with various scams (e.g., social engineering, investment fraud, address poisoning)
* Presence of fake / honeypot tokens \[ coming soon ... ]
* Tokens exhibiting abnormal trading patterns (e.g., potential rug pull behavior/pump and dump etc) \[ coming soon ... ]
* Detection of malicious dApps (url screening)

## Response content

* Recommendation: Accept / Deny
* Rationale: Explanation of assessment outcome
* Technical Simulation Details: In-depth technical data
* Transaction Summary
  * Balance changes (in token amount and USD values)
    * Including NFTs and ERC20 tokens
  * Involved addresses
  * Transaction interpretation (when available)
    * Decoding of common transaction patterns (swaps,transfer, deposit in common protocols, withdraw, NFT related operations, staking related operations…)

[See our Tutorials Section for various use cases.](../hypernative-apis-use-cases/get-transaction-risk-assessment/)

## Endpoint

<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/simulation/transaction/assessment`

### Request Headers

| Name                                                            | Type   | Description                                                                                                                                                                                                                                                                                                                                             |
| --------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| x-client-id                                                     | String | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                       |
| x-client-secret                                                 | String | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                                   |
| authorization                                                   | String | <p>Required if you prefer to login with a member's identity. See <a href="../account/login.md">Login with Email and Password</a> or <a href="../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |
| <p>Content-Type<br><mark style="color:red;">Required</mark></p> | String | application/json                                                                                                                                                                                                                                                                                                                                        |
| <p>accept<br><mark style="color:red;">Required</mark></p>       | String | application/json                                                                                                                                                                                                                                                                                                                                        |

### Request Body

| Name                                                           | Type                                                                        | Description                                                                                                                                                                                                                                                                                                                                                               |
| -------------------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <p>transaction<br><mark style="color:red;">Required</mark></p> | [Transaction Object](pre-transaction-risk-assessment.md#transaction-object) | Transaction data - see details below.                                                                                                                                                                                                                                                                                                                                     |
| url                                                            | String                                                                      | <p>Optional - The domain of a dApp associated with the transaction. When specified, Hypernative analyzes the dApp's reputation in addition to the transaction's risks.<br><br>Example of valid values:<br><code>"claimbitcoinminetrix.pages.dev"</code><br><code>"uniswap-trade.web.app"</code></p>                                                                       |
| blockNumber                                                    | Integer                                                                     | <p>Optional – the block number to simulate against, or <code>0</code> to use the latest state.<br><br><strong>Note: Querying older blocks impact latency</strong></p>                                                                                                                                                                                                     |
| validateNonce                                                  | Boolean                                                                     | <p>Optional - <strong>False</strong> by default.<br><br>When set to <strong>False</strong>, Hypernative will assign the next available nonce for the transaction's sender.<br><br>When set to <strong>True</strong>, Hypernative will use <code>transaction.nonce</code> as the specified nonce and validate whether it is available for use.</p>                         |
| showFullFindings                                               | Boolean                                                                     | <p>Optional - <strong>True</strong> by default.<br><br>When set to <strong>True</strong>, the response includes all user-facing messages related to the identified security risks.<br><br>When set to <strong>False</strong>, user-facing messages can only be retrieved by querying Risk Insights using the IDs provided in the response's <code>riIds</code> field.</p> |
| policy                                                         | String                                                                      | <p>Optional – specify which set of Agents to use when analyzing this transaction. For example, you can choose to run only Phishing &#x26; Scamming, Compliance, or Attacker Contracts checks.<br>This option is available to select customers only. Valid values for this field depend on the customer.</p>                                                               |

#### Transaction Object

| Name                                                           | Type                                          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| -------------------------------------------------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <p>chain<br><mark style="color:red;">Required</mark></p>       | Integer, Hexadecimal or String                | <p>The Chain's ID.</p><p>Note: Supported Chain IDs for this endpoint are given per-customer.<br><br>Valid formats include:</p><ul><li>Chainlist ID as a numeric string, e.g., <code>8453</code></li><li>Chainlist ID as a hexadecimal string, e.g., <code>0x2105</code></li><li>Hypernative-defined chain ID, e.g., <code>"base"</code> See <a href="../../../supported-chains.md">Supported chains</a>.</li></ul>                                                                                                                                   |
| <p>fromAddress<br><mark style="color:red;">Required</mark></p> | String                                        | Transaction's source address (case insensitive).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| <p>toAddress<br><mark style="color:red;">Required</mark></p>   | String                                        | Transaction's destination address (case insensitive).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| <p>input<br><mark style="color:red;">Required</mark></p>       | String                                        | <p>Hexadecimal data that encodes the function call and parameters required to execute a smart contract.<br><br>For example, <code>0xa9059cbb0000000000000000000000005AEDA56215b167893e80B4fE645BA6d5Bab767DE00000000000000000000000000000000000000000000000000000000000003e8</code> represents a call to the <code>transfer(address,uint256)</code> function in an ERC-20 token contract, sending 1000 tokens to the address <code>0x5AEDA56215b167893e80B4fE645BA6d5Bab767DE</code>.<br><br>If not set, it is considered to be <code>0x</code>.</p> |
| <p>hash<br><mark style="color:red;">Required</mark></p>        | String                                        | can be any string ("0x1")                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| value                                                          | Numeric String, Hexadecimal String or Integer | <p>The amount of Ether (in wei) to be transferred with the transaction. A value of <code>0</code> or no value means no Ether is transferred.<br>Examples of valid values:<br><code>"1000000"</code><br><code>"0x0xF4240"</code><br><code>1000000</code></p>                                                                                                                                                                                                                                                                                          |
| nonce                                                          | Numeric String, Hexadecimal String or Integer | <p>Optional - a counter representing the number of transactions sent from the sender's address. When specified, Hypernative validates that the nonce is correct.<br><br>To bypass nonce validation, set <code>validateNonce = False</code> in the <a href="https://docs.hypernative.xyz/hypernative-for-wallets/transactions/quickstart#request-body">request body</a>.</p>                                                                                                                                                                          |
| hash                                                           | String                                        | Optional - the transaction's hash. It will be included in the response for identification purposes.                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| gas                                                            | Numeric String, Hexadecimal String or Integer | <p>The maximum amount of gas units the sender is willing to use for the transaction.</p><p>When no value is set, Hypernative does not validate the transaction's gas.</p><p>Examples of valid values:<br><code>"1000000"</code><br><code>"0x0xF4240"</code><br><code>1000000</code></p>                                                                                                                                                                                                                                                              |
| gasPrice                                                       | Numeric String, Hexadecimal String or Integer | <p>The amount (in wei) the sender is willing to pay per unit of gas.</p><p>When no value is set, Hypernative does not validate the transaction's gas.</p><p>Examples of valid values:<br><code>"1000000"</code><br><code>"0x0xF4240"</code><br><code>1000000</code></p>                                                                                                                                                                                                                                                                              |
| maxPriorityFeePerGas                                           | Numeric String, Hexadecimal String or Integer | <p>The maximum additional fee (tip) per gas unit that goes to miners (or validators).</p><p>When no value is set, Hypernative does not validate the transaction's gas.</p><p>Examples of valid values:<br><code>"1000000"</code><br><code>"0x0xF4240"</code><br><code>1000000</code></p>                                                                                                                                                                                                                                                             |
| maxFeePerGas                                                   | Numeric String, Hexadecimal String or Integer | <p>The total maximum fee (in wei per gas unit) the sender is willing to pay. This includes both the base fee and the priority fee.</p><p>When no value is set, Hypernative does not validate the transaction's gas.</p><p>Examples of valid values:<br><code>"1000000"</code><br><code>"0x0xF4240"</code><br><code>1000000</code></p>                                                                                                                                                                                                                |

### Response Body

| Name    | Type                                                                         | Description                                                                        |
| ------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| success | Boolean                                                                      | `True` if the API call was successful. Otherwise, `False`.                         |
| data    | [TransactionRiskData Object](pre-transaction-risk-assessment.md#data-object) | Transaction Risk Data                                                              |
| error   | String                                                                       | Contains error messages if the API call fails. Otherwise, returns an empty string. |

#### TransactionRiskData Object

| Name           | Type                                                                                                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| -------------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| recommendation | Enum                                                                                                     | <p>Possible values: <code>accept</code>, <code>notes</code>, <code>warn</code>, or <code>deny</code>.<br></p><p>The recommendation is based on a set of security, financial, and compliance findings.<br></p><p>If there are multiple findings with different severity levels, the <strong>most severe</strong> one determines the overall recommendation for the transaction.<br><br>You can customize the logic and severity of these findings in your Hypernative Policy configuration.</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| expectedStatus | Enum                                                                                                     | The transaction's expected outcome if executed on-chain - either `success` or `fail`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| findings       | Array of [Finding Objects](pre-transaction-risk-assessment.md#finding-object)                            | <p>A list of security, financial, and compliance findings for the transaction, each with an associated severity level. Returned only when <code>showFullFindings</code> is set to <strong>True</strong>.<br>The strictest recommendation among all findings determines the overall <code>recommendation</code> for the transaction.</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| involvedAssets | Array of [Asset Objects](pre-transaction-risk-assessment.md#asset-object)                                | <p>The transaction's origin and destination Assets.<br>Returned only when <code>showFullFindings</code> is set to <strong>True</strong>.</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| balanceChanges | Map \<String, Array of [BalanceChange Objects](pre-transaction-risk-assessment.md#balancechange-object)> | <p>A mapping between an address and its balance changes.</p><p>Each key is an address that either sent or received funds.</p><p>The value is a list of balance changes for that address.</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| parsedActions  | Map \<Action Type, array of Actions>                                                                     | <p>Hypernative simulates the transaction and identifies its DeFi Actions. For a detected Action Type, Hypernative provides a list of Actions of that Type found within the transaction.<br><br>Partial list of supported Action types:<br><code>- transfer</code><br><code>- swap</code><br><code>- approval</code></p><p><br><br><br></p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| blockNumber    | Integer                                                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| trace          | JSON Object                                                                                              | Hypernative simulates this transaction and provides a list of all internal transactions resulting from it. Each transaction includes the sender, recipient, contract call, and value.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| receipt        | JSON Object                                                                                              | An object containing accumulating insights of this transaction, including the planned logs, gas used and effective gas price                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| riIds          | Array of String                                                                                          | <p>A list of Security, Financial, or Protocol-Specific Risk Insight IDs identified by simulating this transaction. Use the <a href="broken-reference/"><strong>Get Risk Insight by ID</strong></a> API call to retrieve full details. Alternatively, if the request includes <code>showFullFindings = True</code>, all Risk Insights will be included in the <code>findings</code> field.</p><p><br>Examples of Risk Insights:</p><ul><li>Security Risks - Hacks, Exploits, Phishing, Scamming - powered by Hypernative’s AI-based models that have detected 99.5% of all DeFi hacks in the past 3 years.</li><li>Financial Risks - configured by the customer with thresholds of their choice, such as yield impact, debt ratio, % of owned USD value and others.</li><li>Protocol-specific Risks, such as Aave Position Health, Morpho Health Factor and others - configured by the customer with thresholds of their choice, using Hypernative’s no-code position builder.</li></ul><p>Read more about Hypernative Risk Insight IDs <a href="../../../hypernative-web-application/alerts/">here</a>.</p> |

#### Finding Object

| Name          | Type           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| typeId        | String         | An ID for the type of the Finding. For example: `"F-12202"`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| title         | String         | A short title for the Finding. For example: `"Transfer to scammer"`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| description   | String         | A longer sentence explaining the repercussions of this Finding. For example: `Recipient address has few prior interactions, consider whether legitimate.`                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| severity      | Enum           | <p>Indicates the level of concern for this specific finding.<br><br>Possible values: <code>Accept</code>, <code>Notes</code>, <code>Warning</code>, <code>Deny</code>.</p><p><br>The <code>severity</code> determines how much this finding should influence the overall transaction <code>recommendation</code>. When multiple findings are present, the most severe level is used.</p><p></p><p>The logic and severity levels for each finding can be customized through your Hypernative policy configuration, allowing you to align risk tolerance and enforcement behavior with your specific needs.</p> |
| relatedAssets | Array of Asset | List of Assets involved in this Finding, for example, the scammer's address, the victim's address, the token involved.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

#### Asset Object

| Name            | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                           |
| --------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| chain           | String | The Asset's Chain ID. See [Supported chains](../../../supported-chains.md).                                                                                                                                                                                                                                                                                                                           |
| evmChainId      | String | For EVM-based Chains, the Chain's ID from the [Chainlist](https://chainid.network/) standard.                                                                                                                                                                                                                                                                                                         |
| address         | String | The Asset's address                                                                                                                                                                                                                                                                                                                                                                                   |
| type            | Enum   | The address classification, as `Wallet` , or `Contract`.                                                                                                                                                                                                                                                                                                                                              |
| involvementType | String | The Asset's association to the Finding. For example: `Scammer, Origin, Token.`                                                                                                                                                                                                                                                                                                                        |
| tag             | String | <p>The asset's label.<br>Hypernative automatically assigns labels based on the asset's purpose, such as <code>"Pendle V4 Router"</code><br>You can override this label using <strong>Tagged Assets</strong> in your Hypernative account, for example, to label your own wallet addresses or those of counterparties.</p>                                                                              |
| alias           | String | <p>The asset label assigned by Hypernative, for example, <strong>"Pendle V4 Router"</strong>.</p><p>The <code>tag</code> property uses the <code>note</code> if it exists. Otherwise, it falls back to the <code>alias</code> if available, and finally to the <code>address</code>.</p>                                                                                                              |
| note            | String | <p>The asset label defined by your organization. Navigate to <strong>Settings > Lists</strong> and edit the Tagged Assets to assign a note for your asset, for example, <strong>"User abc Vault"</strong>.</p><p>The <code>tag</code> property uses the <code>note</code> if it exists. Otherwise, it falls back to the <code>alias</code> if available, and finally to the <code>address</code>.</p> |

#### BalanceChange Object

| Name         | Type   | Description                                                                                                                       |
| ------------ | ------ | --------------------------------------------------------------------------------------------------------------------------------- |
| changeType   | enum   | `send` or `receive`                                                                                                               |
| tokenSymbol  | String |                                                                                                                                   |
| tokenAddress | String |                                                                                                                                   |
| usdValue     | String | The USD value of the token sent or received. If the asset does not have a reliable price source, this field will not be returned. |
| amount       | String | The native amount of the token that was sent or received.                                                                         |
| chain        | String | The Chain's ID. See [Supported chains](../../../supported-chains.md)                                                              |
| evmChainId   | String | For EVM-based Chains, the Chain's ID from the [Chainlist](https://chainid.network/) standard.                                     |

## Example of an allowed transaction

The examples are intended to help you explore the returned objects.

Please note that, since these transactions are old, fetching them may involve some latency. This latency does not reflect the performance for current or recent transactions. These examples are primarily meant for exploring the object structure and developing logic.

[See our tutorials section for additional use cases.](../hypernative-apis-use-cases/get-transaction-risk-assessment/)

### Request

{% tabs %}
{% tab title="Python" %}
```python
import requests

endpoint = "https://api.hypernative.xyz/simulation/transaction/assessment"
headers = {
    "x-client-id": "<client id>",
    "x-client-secret": "<client secret>",
    "Content-Type": "application/json",
    "accept": "application/json"
}
payload = {
    "blockNumber": 22610081, # Block number is an optional parameter. We specify it in this example to ensure we get consistent results for this address' token holding state at this block.
    "transaction": {
      "chain": 0x1, # Ethereum
      "fromAddress": "0x623777cc098c6058a46cf7530f45150ff6a8459d",
      "toAddress": "0x1c8600f5153c9c9e8e566d80f3d6e89505cac9f2",
      "input": "0x", # Optional
      "value": "7398000000001006", # ETH Transfer
      "hash":"0x1"
    },
    "url": "", # optional,
}
response = requests.post(endpoint, json=payload, headers=headers).json()

if not response['error']:
    deny = response['data']['recommendation'] == 'deny'
    accept = response['data']['recommendation'] == 'accept'
    balance_changes = response['data'].get('balanceChanges',{})
```
{% endtab %}

{% tab title="Typescript" %}
```python
import axios from 'axios';

const endpoint = 'https://api.hypernative.xyz/simulation/transaction/assessment';

const headers = {
    'x-client-id': '<YOUR CLIENT ID>',
    'x-client-secret': '<YOUR CLIENT SECRET>',
    'Content-Type': 'application/json',
    'accept': 'application/json',
};

const payload = {
    blockNumber: 22610081, // Block number is an optional parameter. We specify it in this example to ensure we get consistent results for this address' token holding state at this block.
    transaction: {
    chain: 0x1, // Ethereum
    fromAddress: '0x623777cc098c6058a46cf7530f45150ff6a8459d',
    toAddress: '0x1c8600f5153c9c9e8e566d80f3d6e89505cac9f2',
    input: '0x', // Optional
    value: '7398000000001006', // ETH Transfer
    },
    url : '', //optional
    hash: '0x1'
};

axios.post(endpoint, payload, { headers }).then(res => {
    const r = res.data?.data || {};
    const deny = r.recommendation === 'deny';
    const accept = r.recommendation === 'accept';
    const balanceChanges = r.balanceChanged || {};
});
```
{% endtab %}
{% endtabs %}

### Response

```json
{
  "success": true,
  "data": {
    "recommendation": "accept",
    "expectedStatus": "success",
    "findings": [],
    "involvedAssets": [
      {
        "chain": "ethereum",
        "evmChainId": 1,
        "address": "0x1c8600f5153c9c9e8e566d80f3d6e89505cac9f2",
        "type": "Wallet",
        "involvementTypes": [
          "destination"
        ],
        "tag": "0x1c8600f5153c9c9e8e566d80f3d6e89505cac9f2"
      },
      {
        "chain": "ethereum",
        "evmChainId": 1,
        "address": "0x623777cc098c6058a46cf7530f45150ff6a8459d",
        "type": "Contract",
        "involvementTypes": [
          "origin"
        ],
        "tag": "0x623777cc098c6058a46cf7530f45150ff6a8459d"
      }
    ],
    "balanceChanges": {
      "0x1c8600f5153c9c9e8e566d80f3d6e89505cac9f2": [
        {
          "changeType": "receive",
          "tokenSymbol": "ETH",
          "usdValue": "18.44",
          "amount": "0.01",
          "chain": "ethereum",
          "evmChainId": 1
        }
      ],
      "0x623777cc098c6058a46cf7530f45150ff6a8459d": [
        {
          "changeType": "send",
          "tokenSymbol": "ETH",
          "usdValue": "-18.44",
          "amount": "0.01",
          "chain": "ethereum",
          "evmChainId": 1
        }
      ]
    },
    "parsedActions": {
      "Transfer": [
        {
          "from": "0x623777cc098c6058a46cf7530f45150ff6a8459d",
          "to": "0x1c8600f5153c9c9e8e566d80f3d6e89505cac9f2"
        }
      ],
      "ethValues": [
        {
          "amountInUsd": "18.43855412695563232433789062",
          "amount": 0.007398000000001006,
          "from": "0x623777cc098c6058a46cf7530f45150ff6a8459d",
          "to": "0x1c8600f5153c9c9e8e566d80f3d6e89505cac9f2",
          "decimals": 18,
          "decimalValue": 7398000000001006,
          "callIndex": 0,
          "price": 2492.3701171875,
          "priceSource": "PriceSource.COINGECKO"
        }
      ]
    },
    "blockNumber": 22610081,
    "trace": [
      {
        "from": "0x623777cc098c6058a46cf7530f45150ff6a8459d",
        "to": "0x1c8600f5153c9c9e8e566d80f3d6e89505cac9f2",
        "funcId": "",
        "callType": "call",
        "value": "7398000000001006",
        "traceAddress": [],
        "status": "0x1",
        "callInput": "0x",
        "extraInfo": {}
      }
    ],
    "receipt": {
      "type": "0x2",
      "root": "0x",
      "status": "0x1",
      "cumulativeGasUsed": "0x5208",
      "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      "logs": [],
      "transactionHash": "0x936cb6677fbec8f2cdb24a3fcce13717a8ccafaeb11b9ca27e26c6722230feb3",
      "contractAddress": "0x0000000000000000000000000000000000000000",
      "gasUsed": "0x5208",
      "effectiveGasPrice": "0x4fa37888",
      "blobGasPrice": "0x1",
      "blockHash": "0xd8a26bc244fc4500e257afbf265df0fbd0b4342b98db3668798f2b7e77e5e761",
      "blockNumber": "0x15900a2",
      "transactionIndex": "0x0"
    },
    "riIds": [
      "RNV135PIH2YC"
    ]
  },
  "error": null,
  "version": "2.2.0",
  "service": "hypernative-webapp-server"
}
```

## Example of a denied transaction

[See our tutorials section for additional use cases.](../hypernative-apis-use-cases/get-transaction-risk-assessment/)

### Request

{% tabs %}
{% tab title="Python" %}
```python
import requests

endpoint = "https://api.hypernative.xyz/simulation/transaction/assessment"
headers = {
    "x-client-id": <API Client ID>,
  "x-client-secret": <API Client Secret>,
    "Content-Type": "application/json",
    "accept": "application/json"
}
payload = {
 "transaction": {
   "chain": "ethereum",
   "fromAddress": "0x7C01728004d3F2370C1BBC36a4Ad680fE6FE8729",
   "toAddress": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
   "input": "0x095ea7b300000000000000000000000066ba61be3bab35c0c00038f335850a390b086fe300000000000000000000000000000000000000000fffffffffffffffffffffff",
   "value": 0,
   "nonce": 2340,
   "gas": 3000000,
   "gasPrice": 3000000
 }
}
response = requests.post(endpoint, json=payload, headers=headers).json()
```
{% endtab %}

{% tab title="Typescript" %}
```typescript
import axios from 'axios';

const endpoint = 'https://api.hypernative.xyz/simulation/transaction/assessment';

const headers = {
  'x-client-id': '<API Client ID>',
  'x-client-secret': '<API Client Secret>',
  'Content-Type': 'application/json',
  'accept': 'application/json',
};

const payload = {
  transaction: {
    chain: 'ethereum',
    fromAddress: '0x7C01728004d3F2370C1BBC36a4Ad680fE6FE8729',
    toAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    input: '0x095ea7b300000000000000000000000066ba61be3bab35c0c00038f335850a390b086fe300000000000000000000000000000000000000000fffffffffffffffffffffff',
    value: 0,
    nonce: 2340,
    gas: 3000000,
    gasPrice: 3000000,
  },
};

axios.post(endpoint, payload, { headers }).then(res => {
  const data = res.data;
});

  
```
{% endtab %}
{% endtabs %}

### Response

```python
{
  "success": true,
  "data": {
    "recommendation": "deny",
    "expectedStatus": "success",
    "findings": [
      {
        "typeId": "S-1925",
        "title": "Phishing victim - approval",
        "description": "[Simulated] An address approved funds to a phishing/scamming address",
        "severity": "Deny",
        "relatedAssets": [
          {
            "chain": "ethereum",
            "evmChainId": 1,
            "address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            "type": "Contract",
            "involvementTypes": [
              "destination"
            ],
            "alias": "USDC",
            "note": "USDC",
            "tag": "USDC"
          },
          {
            "chain": "ethereum",
            "evmChainId": 1,
            "address": "0x7c01728004d3f2370c1bbc36a4ad680fe6fe8729",
            "type": "Wallet",
            "involvementTypes": [
              "suspected_victim",
              "origin"
            ],
            "tag": "0x7c01728004d3f2370c1bbc36a4ad680fe6fe8729"
          },
          {
            "chain": "ethereum",
            "evmChainId": 1,
            "address": "0x66ba61be3bab35c0c00038f335850a390b086fe3",
            "type": "Contract",
            "involvementTypes": [
              "scammer"
            ],
            "alias": "Fake_Phishing1068591",
            "tag": "Fake_Phishing1068591"
          }
        ]
      }
    ],
    "balanceChanges": null,
    "parsedActions": {
      "Approve": [
        {
          "from": "0x7c01728004d3f2370c1bbc36a4ad680fe6fe8729",
          "to": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
        }
      ],
      "approval": [
        {
          "tokenName": "USDC",
          "tokenSymbol": "USDC",
          "tokenAddress": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
          "tokenTotalSupply": 60929002110.874214,
          "tokenMarketCap": 60916817920,
          "tokenTotalVolume": 4583645696,
          "amountInUsd": "4950769935919644370865.750015",
          "amount": 4.951760157141521e+27,
          "amountAfterDecimals": 4.951760157141521e+21,
          "tokenId": 0,
          "owner": "0x7c01728004d3f2370c1bbc36a4ad680fe6fe8729",
          "spender": "0x66ba61be3bab35c0c00038f335850a390b086fe3",
          "isNft": false,
          "priceSource": "PriceSource.COINGECKO",
          "logIndex": 0,
          "action": "approval"
        }
      ],
      "ethValues": []
    },
    "blockNumber": 22574841,
    "trace": [
      {
        "from": "0x7c01728004d3f2370c1bbc36a4ad680fe6fe8729",
        "to": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        "funcId": "095ea7b3",
        "callType": "call",
        "value": "0",
        "traceAddress": [],
        "status": "0x1",
        "callInput": "0x095ea7b300000000000000000000000066ba61be3bab35c0c00038f335850a390b086fe300000000000000000000000000000000000000000fffffffffffffffffffffff",
        "extraInfo": {}
      },
      {
        "from": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        "to": "0x43506849d7c04f9138d1a2050bbf3a0c054402dd",
        "funcId": "095ea7b3",
        "callType": "delegatecall",
        "value": "0",
        "traceAddress": [
          0
        ],
        "status": "0x1",
        "callInput": "0x095ea7b300000000000000000000000066ba61be3bab35c0c00038f335850a390b086fe300000000000000000000000000000000000000000fffffffffffffffffffffff",
        "extraInfo": {}
      }
    ],
    "receipt": {
      "type": "0x2",
      "root": "0x",
      "status": "0x1",
      "cumulativeGasUsed": "0xd966",
      "logsBloom": "0x00000000080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000008000000000000000000000000000002000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000010000000000000000000000020001000000200000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000",
      "logs": [
        {
          "address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
          "topics": [
            "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925",
            "0x0000000000000000000000007c01728004d3f2370c1bbc36a4ad680fe6fe8729",
            "0x00000000000000000000000066ba61be3bab35c0c00038f335850a390b086fe3"
          ],
          "data": "0x00000000000000000000000000000000000000000fffffffffffffffffffffff",
          "blockNumber": "0x15876fa",
          "transactionHash": "0x7919745ed34461de81b568112531868fe6e9d7b93e37d6252314b74639e0f84e",
          "transactionIndex": "0x0",
          "blockHash": "0x4811abd5db45980116eefaa896d81a2c6f76d02c8542c827da509095dd107c22",
          "logIndex": "0x0",
          "removed": false
        }
      ],
      "transactionHash": "0x7919745ed34461de81b568112531868fe6e9d7b93e37d6252314b74639e0f84e",
      "contractAddress": "0x0000000000000000000000000000000000000000",
      "gasUsed": "0xd966",
      "effectiveGasPrice": "0x1666af463",
      "blobGasPrice": "0x1",
      "blockHash": "0x4811abd5db45980116eefaa896d81a2c6f76d02c8542c827da509095dd107c22",
      "blockNumber": "0x15876fa",
      "transactionIndex": "0x0"
    },
    "riIds": [
      "OUC1IJDXWEVO"
    ]
  },
  "error": null,
  "version": "2.2.0",
  "service": "hypernative-webapp-server"
}
```

## Postman collection (phishing examples)

Download the Postman collection [here](https://drive.google.com/file/d/1RJyq9s6cTComhhz9Pc_Xirw7Rn_5xkDs/view?usp=drive_link)

Note: you'll need to [generate the API keys](https://docs.hypernative.xyz/hypernative-product-docs/developers/hypernative-api/api-keys) and set the `x-client-id` and `x-client-secret` headers accordingly
