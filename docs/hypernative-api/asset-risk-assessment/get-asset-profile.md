---
description: Retrieves Hypernative's metadata about an asset.
---

# 🟢 Get Asset Profile

### Retrieve assets profile

<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/assets/profile`

#### Headers

| Name                                     | Type             | Description                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accept<br /><mark style="color:red;">Required</mark> | application/json |                                                                                                                                                                                                                                                                                                                                                         |
| x-client-id                              | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                       |
| x-client-secret                          | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                                   |
| authorization                            | String           | <p>Required if you prefer to login with a member's identity. See <a href="../account/login.md">Login with Email and Password</a> or <a href="../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |

#### Request Body

| Name   | Type               | Description |
| ------ | ------------------ | ----------- |
| assets | array of AssetData |             |

AssetData Object

| Name                                    | Type   | Description                                                                                   |
| --------------------------------------- | ------ | --------------------------------------------------------------------------------------------- |
| chain<br /><mark style="color:red;">Required</mark> | string | ID of the Asset's Chain. See [Supported Chains](../supported-chains/get-supported-chains.md). |
| type<br /><mark style="color:red;">Required</mark>  | enum   | `Wallet`,  `Contract`or `Protocol`                                                            |
| address                                 | string | Asset's address (for Wallets & Contracts)                                                     |
| name                                    | string | Asset's name (for Protocols)                                                                  |

{% tabs %}
{% tab title="200: OK " %}
```json
{
  "success": true,
  "data": {...},
  "error": null,
  "version": "2.2.0",
  "service": "hypernative-webapp-server",
  "stackTrace": null
}
```
{% endtab %}
{% endtabs %}



#### Example

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl -X 'POST' \
  'https://api.hypernative.xyz/assets/profile' \
  -H 'accept: application/json' \
  -H "Content-Type: application/json" \
  -H "x-client-id: <client id>" \
  -H "x-client-secret: <client secret>" \
  -d '{
    "assets": [
      {
        "chain": "ethereum",
        "type": "Protocol",
        "name": "0x core"
      }
    ]
  }'
```
{% endtab %}

{% tab title="Python" %}
```python
import requests

url = "https://api.hypernative.xyz/assets/profile"

headers = {
    "accept": "application/json",
    "Content-Type": "application/json",
    "x-client-id": "<client id>",
    "x-client-secret": "<client secret>",
}

data = {
    "assets": [
        {
            "chain": "ethereum",
            "type": "Protocol",
            "name": "0x core"
        }
    ]
}

response = requests.post(url, headers=headers, json=data)
print(response.json())
```
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

```json
{
  "success": true,
  "data": [
    {
      "chain": "ethereum",
      "name": "0x core",
      "type": "Protocol",
      "coreContracts": [
        {
          "type": "Governance",
          "addresses": [
            {
              "chain": "ethereum",
              "type": "Contract",
              "address": "0x618f9c67ce7bf1a50afa1e7e0238422601b0ff6e",
              "deployedBy": "0xe750ad66de350f8110e305fb78ec6a9f594445e3",
              "deploymentDate": "2020-06-11T22:26:44Z",
              "deploymentTxHash": "0xe52509e0bd9c54bda6fe7bd6e2f9a7cda65416e7167c929eccf4d71376f78240",
              "alias": "0x: Exchange Proxy Governor"
            }
          ]
        },
        {
          "type": "Team wallets",
          "addresses": [
            {
              "chain": "ethereum",
              "type": "Contract",
              "address": "0x39dce47a67ad34344eab877eae3ef1fa2a1d50bb",
              "deployedBy": "0xe750ad66de350f8110e305fb78ec6a9f594445e3",
              "deploymentDate": "2020-09-04T00:18:32Z",
              "deploymentTxHash": "0xa248fa62e21c18f276685d0663b1e971b35c1564b254773337d5c154bca6fe28",
              "alias": "0x: Exchange Proxy Transformer Deployer"
            }
          ]
        },
        {
          "type": "Other",
          "addresses": [
            {
              "chain": "ethereum",
              "type": "Contract",
              "address": "0x161793cdca4ff9e766a706c2c49c36ac1340bbcd",
              "deployedBy": "0x013a18430fee600990fb560b5cb4be5cefaadcdb",
              "deploymentDate": "2020-01-22T01:43:46Z",
              "deploymentTxHash": "0x235974f7d92f6679c56453a6fd83a8a93d13ad49e18bf87ff5068836d255ad6c",
              "alias": "0x: Dev Utils V3"
            }
          ]
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

</details>
