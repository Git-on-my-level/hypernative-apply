---
description: This API is intended for Zircuit chain only
---

# 🟢 Get Priced Tokens

This API returns all Price sources available for Zircuit

<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/tokens/priced-tokens`

#### Headers

| Name                                                            | Type   | Description                                                                                                                                                                                                                                                                                                                                             |
| --------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <p>Content-Type<br><mark style="color:red;">Required</mark></p> |        | "application/json"                                                                                                                                                                                                                                                                                                                                      |
| <p>accept<br><mark style="color:red;">Required</mark></p>       |        | "application/json"                                                                                                                                                                                                                                                                                                                                      |
| x-client-id                                                     | String | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                       |
| x-client-secret                                                 | String | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                                   |
| authorization                                                   | String | <p>Required if you prefer to login with a member's identity. See <a href="../account/login.md">Login with Email and Password</a> or <a href="../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |

#### Request Body

| Name                                                      | Type      | Description |
| --------------------------------------------------------- | --------- | ----------- |
| <p>chains<br><mark style="color:red;">Required</mark></p> | \[String] | zircuit     |

{% tabs %}
{% tab title="200: OK " %}
```json
{
  "success": true,
  "data": [...],
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
curl -X 'POST' \
'https://api.hypernative.xyz/tokens/priced-tokens' \
-H 'accept: application/json' \
-H 'Content-Type: application/json' \
-H 'authorization: Bearer <token>'
-d '{"chains": ["zircuit"]}'
```
{% endtab %}

{% tab title="Python" %}
```python
import requests

endpoint = "https://api.hypernative.xyz/tokens/priced-tokens"
headers = {
    "x-client-id": <API Client ID>,
  "x-client-secret": <API Client Secret>,
    "Content-Type": "application/json",
    "accept": "application/json"
}
payload = {"chains":["zircuit"]}

response = requests.post(endpoint, json=payload, headers=headers).json()
```
{% endtab %}
{% endtabs %}

#### Response:

```json
{
  "success": true,
  "data": [
    {
      "name": "Ether",
      "address": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      "symbol": "ETH",
      "id": null,
      "chain": "zircuit",
      "isNFT": false,
      "decimals": 18,
      "coingeckoSupported": true,
      "terminalSupported": false,
      "llamaSupported": false
    }
  ],
  "error": null,
  "version": "2.2.0",
  "service": "hypernative-webapp-server",
  "stackTrace": null
}
```
