---
description: Conduct risk assessment and interpretation for EIP-712 signed data
---

# 🟢 Typed Message (EIP-712) Risk Assessment

This endpoint provides risk assessment for EIP-712 signed data messages.&#x20;

Read more about using Hypernative for Risk Assessment before sending transactions onchain [here](../hypernative-apis-use-cases/transaction-interpretation.md).

Current support is for the `Permit` format (ERC-20 / ERC-2612) with many more common use cases to be added soon.&#x20;

## Endpoint

<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/simulation/eip712/assessment`

### Request Headers

| Name                                           | Type   | Description                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| x-client-id                                    | String | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                       |
| x-client-secret                                | String | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                                   |
| authorization                                  | String | <p>Required if you prefer to login with a member's identity. See <a href="../account/login.md">Login with Email and Password</a> or <a href="../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |
| Content-Type<br /><mark style="color:red;">Required</mark> | String | application/json                                                                                                                                                                                                                                                                                                                                        |
| accept<br /><mark style="color:red;">Required</mark>       | String | application/json                                                                                                                                                                                                                                                                                                                                        |

### Request Body

| Name                                            | Type                   | Description                                                                                                                                                                                                |
| ----------------------------------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| walletAddress<br /><mark style="color:red;">Required</mark> | String                 | The crypto address used to sign this message (case insensitive).                                                                                                                                           |
| chainId<br /><mark style="color:red;">Required</mark>       | Integer or Hexadecimal | <p>The Chain's ID.</p><p><br>Valid formats include:</p><ul><li>Chainlist ID as a numeric string, e.g., <code>8453</code></li><li>Chainlist ID as a hexadecimal string, e.g., <code>0x2105</code></li></ul> |
| eip712Message<br /><mark style="color:red;">Required</mark> | JSON Object            | The message to sign.                                                                                                                                                                                       |

### Response Body

| Name    | Type                                                                                                | Description                                                                        |
| ------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| success | Boolean                                                                                             | `True` if the API call was successful. Otherwise, `False`.                         |
| data    | [TypedMessageRiskData Object](typed-message-eip-712-risk-assessment.md#typedmessageriskdata-object) | Typed Message Risk Data                                                            |
| error   | String                                                                                              | Contains error messages if the API call fails. Otherwise, returns an empty string. |

#### TypedMessageRiskData Object

| Name           | Type                                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| -------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockNumber    | Integer                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| recommendation | Enum                                 | <p>Possible values: <code>accept</code>, <code>notes</code>, <code>warning</code>, or <code>deny</code>.<br></p><p>The recommendation is based on a set of security, financial, and compliance findings.<br></p><p>If there are multiple findings with different severity levels, the <strong>most severe</strong> one determines the overall recommendation for the transaction. <br><br>You can customize the logic and severity of these findings in your Hypernative Policy configuration.</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| parsedActions  | Map \<Action Type, array of Actions> | <p>Hypernative simulates the transaction and identifies its DeFi Actions. For a detected Action Type, Hypernative provides a list of Actions of that Type found within the transaction.<br><br>Partial list of supported Action types:<br><code>- transfer</code><br><code>- swap</code><br><code>- approval</code></p><p><br><br><br> </p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| trace          | JSON Object                          | Hypernative simulates this transaction and provides a list of all internal transactions resulting from it. Each transaction includes the sender, recipient, contract call, and value.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| receipt        | JSON Object                          | An object containing accumulating insights of this transaction, including the planned logs, gas used and effective gas price                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| riIds          | Array of String                      | <p>A list of Security, Financial, or Protocol-Specific Risk Insight IDs identified by simulating this transaction. Use the <a href="../risk-insights/get-risk-insight-by-id.md"><strong>Get Risk Insight by ID</strong></a> API call to retrieve full details. </p><p><br>Examples of Risk Insights:</p><ul><li>Security Risks - Hacks, Exploits, Phishing, Scamming - powered by Hypernative’s AI-based models that have detected 99.5% of all DeFi hacks in the past 3 years. </li><li>Financial Risks - configured by the customer with thresholds of their choice, such as yield impact, debt ratio, % of owned USD value and others. </li><li>Protocol-specific Risks, such as Aave Position Health, Morpho Health Factor and others - configured by the customer with thresholds of their choice, using Hypernative’s no-code position builder.  </li></ul><p>Read more about Hypernative Risk Insight IDs <a href="../../../hypernative-web-application/alerts/">here</a>.</p> |



## Example of a Denied Request

### Request

{% tabs %}
{% tab title="Python" %}
```python
import requests
import json

url = "https://api.hypernative.xyz/simulation/eip712/assessment"

headers = {
  'x-client-id': '<YOUR CLIENT ID>',
  'x-client-secret': '<YOUR CLIENT SECRET>',
  'Content-Type': 'application/json'
}

payload = {
  "walletAddress": "0x54321",
  "chainId": 1,
  "eip712Message": {
    "primaryType": "Permit",
    "types": {
      "EIP712Domain": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "version",
          "type": "string"
        },
        {
          "name": "chainId",
          "type": "uint256"
        },
        {
          "name": "verifyingContract",
          "type": "address"
        }
      ],
      "Permit": [
        {
          "name": "owner",
          "type": "address"
        },
        {
          "name": "spender",
          "type": "address"
        },
        {
          "name": "value",
          "type": "uint256"
        },
        {
          "name": "nonce",
          "type": "uint256"
        },
        {
          "name": "deadline",
          "type": "uint256"
        }
      ]
    },
    "domain": {
      "chainId": 1,
      "name": "MyToken",
      "verifyingContract": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "version": "1"
    },
    "message": {
      "owner": "0x7b1363f33b86d16ef7c8d03d11f4394a37d95c36",
      "spender": "0x67beb4dd770a9c2cbc7133ba428b9eecdcf09186",
      "value": 3000,
      "nonce": 0,
      "deadline": 50000000000
    }
  }
}

response = requests.post(url, json=payload, headers=headers).json()
data = response.get("data")
```
{% endtab %}

{% tab title="Typescript" %}
```typescript
import axios from 'axios';

const url = 'https://api.hypernative.xyz/simulation/eip712/assessment'

const headers = {
  'x-client-id': '<YOUR CLIENT ID>',
  'x-client-secret': '<YOUR CLIENT SECRET>',
  'Content-Type': 'application/json',
}

const payload = {
  walletAddress: '0x12345',
  chainId: 1,
  eip712Message: {
    primaryType: 'Permit',
    types: {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' },
      ],
      Permit: [
        { name: 'owner', type: 'address' },
        { name: 'spender', type: 'address' },
        { name: 'value', type: 'uint256' },
        { name: 'nonce', type: 'uint256' },
        { name: 'deadline', type: 'uint256' },
      ],
    },
    domain: {
      chainId: 1,
      name: 'MyToken',
      verifyingContract: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      version: '1',
    },
    message: {
      owner: '0x7b1363f33b86d16ef7c8d03d11f4394a37d95c36',
      spender: '0x67beb4dd770a9c2cbc7133ba428b9eecdcf09186',
      value: 3000,
      nonce: 0,
      deadline: 50000000000,
    },
  },
}

axios.post(url, payload, { headers }).then(res => {
  const data = res.data;
})
```
{% endtab %}
{% endtabs %}



### Response

```json
{
    "success": true,
    "data": {
        "blockNumber": 22339698,
        "recommendation": "deny",
        "trace": [
            {
                "from": "0x7b1363f33b86d16ef7c8d03d11f4394a37d95c36",
                "to": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
                "funcId": "095ea7b3",
                "callType": "call",
                "value": "0",
                "traceAddress": [],
                "status": "0x1",
                "callInput": "0x095ea7b300000000000000000000000067beb4dd770a9c2cbc7133ba428b9eecdcf091860000000000000000000000000000000000000000000000000000000000000bb8",
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
                "callInput": "0x095ea7b300000000000000000000000067beb4dd770a9c2cbc7133ba428b9eecdcf091860000000000000000000000000000000000000000000000000000000000000bb8",
                "extraInfo": {}
            }
        ],
        "receipt": {
            "type": "0x2",
            "root": "0x",
            "status": "0x1",
            "cumulativeGasUsed": "0xd8fa",
            "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000100000000000000000000002000000000000000000000000000000200000000008000000000008000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000010000000000000000000000020000000000200000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000",
            "logs": [
                {
                    "address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
                    "topics": [
                        "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925",
                        "0x0000000000000000000000007b1363f33b86d16ef7c8d03d11f4394a37d95c36",
                        "0x00000000000000000000000067beb4dd770a9c2cbc7133ba428b9eecdcf09186"
                    ],
                    "data": "0x0000000000000000000000000000000000000000000000000000000000000bb8",
                    "blockNumber": "0x154e073",
                    "transactionHash": "0xdf2d7b9a5800c81732ac087bcf115ced09c5fbd6332aa7d1b84917b05cfdbc9f",
                    "transactionIndex": "0x0",
                    "blockHash": "0x29988b544989b12a30418f61ecb5ba80865705d4583a1e8777cdf3d24b57c07c",
                    "logIndex": "0x0",
                    "removed": false
                }
            ],
            "transactionHash": "0xdf2d7b9a5800c81732ac087bcf115ced09c5fbd6332aa7d1b84917b05cfdbc9f",
            "contractAddress": "0x0000000000000000000000000000000000000000",
            "gasUsed": "0xd8fa",
            "effectiveGasPrice": "0x191fe91b5",
            "blobGasPrice": "0xfa4a801e5",
            "blockHash": "0x29988b544989b12a30418f61ecb5ba80865705d4583a1e8777cdf3d24b57c07c",
            "blockNumber": "0x154e073",
            "transactionIndex": "0x0"
        },
        "riIds": [
            "2JU103S4CZJS"
        ],
        "parsedActions": {
            "approval": [
                {
                    "tokenName": "USDC",
                    "tokenSymbol": "USDC",
                    "tokenAddress": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
                    "tokenTotalSupply": 62207283200,
                    "tokenMarketCap": 62207283200,
                    "tokenTotalVolume": 4541637120,
                    "amountInUsd": "0.003",
                    "amount": 3000,
                    "amountAfterDecimals": 0.003,
                    "tokenId": 0,
                    "owner": "0x7b1363f33b86d16ef7c8d03d11f4394a37d95c36",
                    "spender": "0x67beb4dd770a9c2cbc7133ba428b9eecdcf09186",
                    "isNft": false,
                    "priceSource": "PriceSource.COINGECKO",
                    "logIndex": 0,
                    "action": "approval"
                }
            ],
            "ethValues": []
        }
    },
    "error": null,
    "version": "2.2.0",
    "service": "hypernative-webapp-server"
}
```
