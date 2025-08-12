# 🟢 EVM Transaction Risk Assessment V1 (Legacy)

Provides recommendations for accepting or blocking a pending transaction based on Hypernative's risk assessment.

Notes:

1. This endpoint is supported for select customers only.
2. For risk assessment of historical transactions, see [EVM Transaction Risk Assessment V2](pre-transaction-risk-assessment.md).

## Transaction Simulation

<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/simulation/transaction`

#### Headers

| Name                                                            | Type   | Description                                                                                                                                                                                                                                                                                                                                             |
| --------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| x-client-id                                                     | String | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                       |
| x-client-secret                                                 | String | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                                   |
| authorization                                                   | String | <p>Required if you prefer to login with a member's identity. See <a href="../account/login.md">Login with Email and Password</a> or <a href="../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |
| <p>Content-Type<br><mark style="color:red;">Required</mark></p> |        | application/json                                                                                                                                                                                                                                                                                                                                        |
| <p>accept<br><mark style="color:red;">Required</mark></p>       |        | application/json                                                                                                                                                                                                                                                                                                                                        |

#### Request Body

| Name                                                           | Type        | Description |
| -------------------------------------------------------------- | ----------- | ----------- |
| blockNumber                                                    | Integer     |             |
| <p>transaction<br><mark style="color:red;">Required</mark></p> | JSON Object |             |

#### transaction structure

| Name                                                           | Type    | Description                                                                                                                               |
| -------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| hash                                                           | String  |                                                                                                                                           |
| <p>chain<br><mark style="color:red;">Required</mark></p>       | String  | The Chain's ID. See [Supported chains](../../../supported-chains.md). Note: Supported Chain IDs for this endpoint are given per-customer. |
| <p>fromAddress<br><mark style="color:red;">Required</mark></p> | String  | Transaction's source address.                                                                                                             |
| toAddress                                                      | String  | Transaction's destination address.                                                                                                        |
| input                                                          | String  |                                                                                                                                           |
| value                                                          | Integer |                                                                                                                                           |
| nonce                                                          | Integer |                                                                                                                                           |
| gas                                                            | Integer |                                                                                                                                           |
| gasPrice                                                       | Integer |                                                                                                                                           |
| maxPriorityFeePerGas                                           | Integer |                                                                                                                                           |
| maxFeePerGas                                                   | Integer |                                                                                                                                           |

### Example

{% tabs %}
{% tab title="Curl" %}
```bash
  curl -X 'POST' \
  'https://api.hypernative.xyz/simulation/transaction' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'x-client-id: <API Client ID> \'
  -H 'x-client-secret: <API Client Secret> \'
  -d '{
    "blockNumber": 14684301,
    "transaction": {
      "hash": "0x0",
      "chain": "ethereum",
      "fromAddress": "0x63341Ba917De90498F3903B199Df5699b4a55AC0",
      "toAddress": "0x7336F819775B1D31Ea472681D70cE7A903482191",
      "input": "0xaf8271f7",
      "value": 0,
      "nonce": 0,
      "gas": 3000000,
      "gasPrice": 3000000
    }
  }'
  
```
{% endtab %}

{% tab title="Python" %}
```python
import requests

endpoint = "https://api.hypernative.xyz/simulation/transaction"
headers = {
    "x-client-id": <API Client ID>,
  "x-client-secret": <API Client Secret>,
    "Content-Type": "application/json",
    "accept": "application/json"
}
payload = {
  "blockNumber": 14684301,
  "transaction": {
    "hash": "0x0",
    "chain": "ethereum",
    "fromAddress": "0x63341Ba917De90498F3903B199Df5699b4a55AC0",
    "toAddress": "0x7336F819775B1D31Ea472681D70cE7A903482191",
    "input": "0xaf8271f7",
    "value": 0,
    "nonce": 0,
    "gas": 3000000,
    "gasPrice": 3000000
  }
}
response = requests.post(endpoint, json=payload, headers=headers).json()
```
{% endtab %}
{% endtabs %}

#### Response:

{% tabs %}
{% tab title="200 OK" %}
```json
{
    "success": true,
    "data": {
      "blockNumber": 14684301,
      "recommendation": "accept",
      "receipt": {
        "type": "0x2",
        "root": "0x",
        "status": "0x1",
        "cumulativeGasUsed": "0x1bb21c",
        "logsBloom": "0x10304000000000000000200480000000000000020000040000002000048000000000000001000000204002000080010002000000088801000000000800200800000000000800000008002008080084608000040000000000000021000000004110000000020000000004000000000800000404000000000000000010000000000000000002000001020802000000000204004000110000080000004000100000024000000000200200000090002020000000000000000040000000800080000210000002000000800002000000000000000002000c00109000002100200020000018280200010000400040000000080404000000002000080000020000000000"
      },
      "logs": [
        {
          "address": "0x27182842e098f60e3d576794a5bffb0777e025d3",
          "topics": [
            "0x7a59cfb2756119e18fdaea3ea09825ada6f518aa38d0cec28a85ec4de091fb5e",
            "0x0000000000000000000000007336f819775b1d31ea472681d70ce7a903482191"
          ],
          "data": "0x00000000000000000000000000000000000000000000000000000da475abf000",
          "blockNumber": "0xe0108e",
          "transactionHash": "0xbb4a6d69c839a31fb7cefab05784a37af139617bc5138ae5a893ab908c6c4fda",
          "transactionIndex": "0x0",
          "blockHash": "0xd0bd75aca33bffda401a8076e61faf667d32f6a4e9f93f2f7ddf4574a24fa07a",
          "logIndex": "0x0",
          "removed": false
        }
      ],
      "transactionHash": "0xbb4a6d69c839a31fb7cefab05784a37af139617bc5138ae5a893ab908c6c4fda",
      "contractAddress": "0x0000000000000000000000000000000000000000",
      "gasUsed": "0x1bb21c",
      "effectiveGasPrice": "0x6e690e79b",
      "blockHash": "0xd0bd75aca33bffda401a8076e61faf667d32f6a4e9f93f2f7ddf4574a24fa07a",
      "blockNumber": "0xe0108e",
      "transactionIndex": "0x0",
      "trace": [
        {
          "from": "0x7336f819775b1d31ea472681d70ce7a903482191",
          "to": "0x59828fdf7ee634aaad3f58b19fdba3b03e2d9d80",
          "funcId": "",
          "callType": "call",
          "value": "0",
          "traceAddress": [
            0
          ],
          "status": "0x1",
          "callInput": "0x",
          "extraInfo": {}
        }
      ],
      "riIds": []
    },
    "error": null,
    "version": "2.2.0",
    "service": "hypernative-webapp-server"
}
```
{% endtab %}

{% tab title="400+ Error Codes" %}
```json
// Example: 560 Unknown error code
{
    "success": false,
    "data": null,
    "error": "empty simulation result", // Detailed error information will be displayed here
    "errorCode": 1000,
    "version": "2.2.0",
    "service": "hypernative-webapp-server"
}
```
{% endtab %}
{% endtabs %}
