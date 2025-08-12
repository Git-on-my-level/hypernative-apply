# 🟢 Get Risk Insights by Transaction Hash

<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/transaction-hash/risk-insights`

#### Headers

| Name                                           | Type             | Description                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accept<br /><mark style="color:red;">Required</mark>       | application/json |                                                                                                                                                                                                                                                                                                                                                         |
| Content-Type<br /><mark style="color:red;">Required</mark> | application/json |                                                                                                                                                                                                                                                                                                                                                         |
| x-client-id                                    | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                       |
| x-client-secret                                | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                                   |
| authorization                                  | String           | <p>Required if you prefer to login with a member's identity. See <a href="../account/login.md">Login with Email and Password</a> or <a href="../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |

#### Request Body

| Name                                         | Type | Description                                          |
| -------------------------------------------- | ---- | ---------------------------------------------------- |
| txn\_hash <br /><mark style="color:red;">Required</mark> |      |                                                      |
| chain<br /><mark style="color:red;">Required</mark>      |      | [chain](../supported-chains/get-supported-chains.md) |

{% tabs %}
{% tab title="200: OK " %}
```json
{
  "id": "string",
  "name": "string",
  "chain": "string",
  "category": "Governance",
  "status": "Active",
  "timestamp": "2022-12-22T13:31:24.038Z",
  "severity": "Info",
  "details": "string",
  "involvedAssets": [
    {
      "name": "This value is optional",
      "address": "0x123412431243",
      "type": "Protocol",
      "chain": "Ethereum",
      "involvementType": "Sender"
    }
  ],
  "riskTypeId": "string",
  "riskTypeDescription": "string",
  "txnHash": "string",
  "context": [
    {
      "title": "string",
      "value": "string"
    }
  ]
}
```
{% endtab %}
{% endtabs %}

### Example

**Request:**

{% tabs %}
{% tab title="Curl" %}
```bash
$ curl -X 'POST' \
  'https://api.hypernative.xyz/transaction-hash/risk-insights' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'x-client-id: <API Client ID> \'
  -H 'x-client-secret: <API Client Secret> \'
  -d '{
      "txn_hash": "0x32c9378ead5008e8231ccaf68ceede4c856ea31d866c4ee439d4a9eb57ffc6c1",
      "chain": "ethereum"
      }'

```
{% endtab %}

{% tab title="Python" %}
```python
endpoint = "https://api.hypernative.xyz/transaction-hash/risk-insights"
headers={
  "x-client-id": <API Client ID>,
  "x-client-secret": <API Client Secret>,
  "Content-Type": "application/json"
  }
payload ={
  "txn_hash": "0x32c9378ead5008e8231ccaf68ceede4c856ea31d866c4ee439d4a9eb57ffc6c1",
  "chain": "ethereum"
}
response = requests.post(endpoint, json=payload, headers=headers).json()
```
{% endtab %}
{% endtabs %}

**Response**

```json
{
  "success": true,
  "data": [
    {
      "id": "BHICWMAVWVV0",
      "chain": "ethereum",
      "name": "Bridge - significant token withdrawal",
      "category": "Financial",
      "status": "Active",
      "timestamp": "2022-12-22T11:21:59.000Z",
      "severity": "Medium",
      "details": "105.49% of ETH token amount on bridge <Loopring: Exchange v2|0x0baba1ad5be3a5c0a66e7ac838a129bf948f1ea4> was withdrawn from the bridge in this transaction",
      "involvedAssets": [
        {
          "address": "0x674bdf20a0f284d710bc40872100128e2d66bd3f",
          "type": "Contract",
          "chain": "ethereum",
          "involvementType": "Recipient"
        },
        {
          "address": "0x0baba1ad5be3a5c0a66e7ac838a129bf948f1ea4",
          "type": "Contract",
          "chain": "ethereum",
          "involvementType": "Sender"
        },
        {
          "name": "Loopring",
          "type": "Protocol",
          "chain": "ethereum",
          "involvementType": "Protocol"
        }
      ],
      "riskTypeId": "A-5013",
      "riskTypeDescription": "Over 15% of token amount on bridge was withdrawn from a bridge in this transaction",
      "txnHash": "0x32c9378ead5008e8231ccaf68ceede4c856ea31d866c4ee439d4a9eb57ffc6c1",
      "context": [
        {
          "title": "To",
          "value": "0x0baba1ad5be3a5c0a66e7ac838a129bf948f1ea4"
        },
        {
          "title": "From",
          "value": "0xc6b6350b04722cc19ee6e19c4fa35bedb639f328"
        },
        {
          "title": "Status",
          "value": "Success"
        },
        {
          "title": "Tokens",
          "value": "[\n  {\n    \"amount\": 5,\n    \"symbol\": \"ETH\",\n    \"usd_value\": 6073.6\n  },\n  {\n    \"amount\": 5,\n    \"symbol\": \"ETH\",\n    \"usd_value\": 6073.6\n  }\n]"
        },
        {
          "title": "Txn Hash",
          "value": "0x32c9378ead5008e8231ccaf68ceede4c856ea31d866c4ee439d4a9eb57ffc6c1"
        },
        {
          "title": "Timestamp",
          "value": "2022-12-22T11:21:59Z"
        },
        {
          "title": "Usd Value",
          "value": "5000000000000000000"
        },
        {
          "title": "Block Number",
          "value": "16239914"
        },
        {
          "title": "Transaction Fee",
          "value": "0.000887318765867676"
        },
        {
          "title": "Full Involved Assets",
          "value": "[\n  {\n    \"type\": \"contract\",\n    \"chain\": \"ethereum\",\n    \"address\": \"0x674bdf20a0f284d710bc40872100128e2d66bd3f\",\n    \"involvement\": \"recipient\",\n    \"system_labels\": [\n      \"Non-KYC funds\",\n      \"Loopring: Exchange v2 Deposit\",\n      \"Bridge\"\n    ]\n  },\n  {\n    \"type\": \"contract\",\n    \"chain\": \"ethereum\",\n    \"address\": \"0x0baba1ad5be3a5c0a66e7ac838a129bf948f1ea4\",\n    \"involvement\": \"destination, sender\",\n    \"system_labels\": [\n      \"Loopring: Exchange v2\",\n      \"Non-KYC funds\",\n      \"Bridge\"\n    ]\n  },\n  {\n    \"type\": \"wallet\",\n    \"chain\": \"ethereum\",\n    \"address\": \"0xc6b6350b04722cc19ee6e19c4fa35bedb639f328\",\n    \"involvement\": \"origin\",\n    \"system_labels\": []\n  },\n  {\n    \"type\": \"contract\",\n    \"chain\": \"ethereum\",\n    \"address\": \"0x26d8ba776a067c5928841985bce342f75bae7e82\",\n    \"involvement\": \"participant\",\n    \"system_labels\": []\n  }\n]"
        }
      ]
    },
    {
      "id": "5HW3SXH1GE5M",
      "chain": "ethereum",
      "name": "Bridge - significant token deposit",
      "category": "Financial",
      "status": "Active",
      "timestamp": "2022-12-22T11:21:59.000Z",
      "severity": "Medium",
      "details": "105.49% of ETH token amount on bridge <Loopring: Exchange v2|0x0baba1ad5be3a5c0a66e7ac838a129bf948f1ea4> was deposited to the bridge in this transaction",
      "involvedAssets": [
        {
          "address": "0x0baba1ad5be3a5c0a66e7ac838a129bf948f1ea4",
          "type": "Contract",
          "chain": "ethereum",
          "involvementType": "Recipient, sender"
        }
      ],
      "riskTypeId": "A-5023",
      "riskTypeDescription": "Over 15% of token amount on bridge was deposited to a bridge in this transaction",
      "txnHash": "0x32c9378ead5008e8231ccaf68ceede4c856ea31d866c4ee439d4a9eb57ffc6c1",
      "context": [
        {
          "title": "To",
          "value": "0x0baba1ad5be3a5c0a66e7ac838a129bf948f1ea4"
        },
        {
          "title": "From",
          "value": "0xc6b6350b04722cc19ee6e19c4fa35bedb639f328"
        },
        {
          "title": "Status",
          "value": "Success"
        },
        {
          "title": "Tokens",
          "value": "[\n  {\n    \"amount\": 5,\n    \"symbol\": \"ETH\",\n    \"usd_value\": 6073.6\n  },\n  {\n    \"amount\": 5,\n    \"symbol\": \"ETH\",\n    \"usd_value\": 6073.6\n  }\n]"
        },
        {
          "title": "Txn Hash",
          "value": "0x32c9378ead5008e8231ccaf68ceede4c856ea31d866c4ee439d4a9eb57ffc6c1"
        },
        {
          "title": "Timestamp",
          "value": "2022-12-22T11:21:59Z"
        },
        {
          "title": "Usd Value",
          "value": "5000000000000000000"
        },
        {
          "title": "Block Number",
          "value": "16239914"
        },
        {
          "title": "Transaction Fee",
          "value": "0.000887318765867676"
        },
        {
          "title": "Full Involved Assets",
          "value": "[\n  {\n    \"type\": \"contract\",\n    \"chain\": \"ethereum\",\n    \"address\": \"0x0baba1ad5be3a5c0a66e7ac838a129bf948f1ea4\",\n    \"involvement\": \"recipient, destination, sender\",\n    \"system_labels\": [\n      \"Loopring: Exchange v2\",\n      \"Non-KYC funds\",\n      \"Bridge\"\n    ]\n  },\n  {\n    \"type\": \"wallet\",\n    \"chain\": \"ethereum\",\n    \"address\": \"0xc6b6350b04722cc19ee6e19c4fa35bedb639f328\",\n    \"involvement\": \"origin\",\n    \"system_labels\": []\n  },\n  {\n    \"type\": \"contract\",\n    \"chain\": \"ethereum\",\n    \"address\": \"0x674bdf20a0f284d710bc40872100128e2d66bd3f\",\n    \"involvement\": \"participant\",\n    \"system_labels\": [\n      \"Non-KYC funds\",\n      \"Loopring: Exchange v2 Deposit\",\n      \"Bridge\"\n    ]\n  },\n  {\n    \"type\": \"contract\",\n    \"chain\": \"ethereum\",\n    \"address\": \"0x26d8ba776a067c5928841985bce342f75bae7e82\",\n    \"involvement\": \"participant\",\n    \"system_labels\": []\n  }\n]"
        }
      ]
    }
  ],
  "error": null,
  "version": "2.2.0",
  "service": "hypernative-webapp-server",
  "stackTrace": null
}
```
