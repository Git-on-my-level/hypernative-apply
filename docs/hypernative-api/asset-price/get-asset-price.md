# 🔵 Get Asset Price

This API returns price data of a token.

<mark style="color:blue;">`Get`</mark> `https://api.hypernative.xyz/tokens/price`

#### Headers

| Name                                                      | Type   | Description                                                                                                                                                                                                                                                                                                                                             |
| --------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <p>accept<br><mark style="color:red;">Required</mark></p> |        | "application/json"                                                                                                                                                                                                                                                                                                                                      |
| x-client-id                                               | String | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                       |
| x-client-secret                                           | String | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                                   |
| authorization                                             | String | <p>Required if you prefer to login with a member's identity. See <a href="../account/login.md">Login with Email and Password</a> or <a href="../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |

#### Query Params

| Name                                                       | Type      | Description                                                    |
| ---------------------------------------------------------- | --------- | -------------------------------------------------------------- |
| <p>address<br><mark style="color:red;">Required</mark></p> | string    |                                                                |
| chains                                                     | \[string] | Array of [Chains](../supported-chains/get-supported-chains.md) |
| priceSources                                               | \[string] | Array of[ Price Sources](get-supported-price-sources.md)       |

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

### Example

#### Request:

{% tabs %}
{% tab title="Curl" %}
```bash
curl -X 'GET' \
  'https://api.hypernative.xyz/tokens/price?address=0x0000206329b97db379d5e1bf586bbdb969c63274&chains=ethereum&chains=arbitrum' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer <token>'
```
{% endtab %}

{% tab title="Python" %}
```python
import requests

endpoint = 'https://api.hypernative.xyz/tokens/price'
headers = {
     "x-client-id": <API Client ID>,
     "x-client-secret": <API Client Secret>,
     "accept": "application/json"
}
params = {
    'address': '0x0000206329b97db379d5e1bf586bbdb969c63274',
    'chains': ['ethereum', 'arbitrum']
}

response = requests.get(endpoint, headers=headers, params=params).json()
```
{% endtab %}
{% endtabs %}

#### Response:

```json
{
  "success": true,
  "data": [
    {
      "address": "0x0000206329b97db379d5e1bf586bbdb969c63274",
      "chain": "ethereum",
      "name": "USDA",
      "price": 0.9955350160598755,
      "isNFT": false,
      "totalVolume": 104018.3125,
      "marketCap": 0,
      "h24Change": -1.7398676872253418,
      "timestamp": "2025-07-07T15:04:32.000Z",
      "priceSource": "COINGECKO"
    },
    {
      "address": "0x0000206329b97db379d5e1bf586bbdb969c63274",
      "chain": "arbitrum",
      "name": "USDA",
      "price": 0.9955350160598755,
      "isNFT": false,
      "totalVolume": 104018.3125,
      "marketCap": 0,
      "h24Change": -1.7398676872253418,
      "timestamp": "2025-07-07T15:04:32.000Z",
      "priceSource": "COINGECKO"
    }
  ],
  "error": null,
  "version": "2.2.0",
  "service": "hypernative-webapp-server",
  "stackTrace": null
}
```
