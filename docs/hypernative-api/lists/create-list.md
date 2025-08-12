# 🟢 Add List

## Create new List

<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/lists`

#### Headers

| Name                                           | Type   | Description                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Content-Type<br /><mark style="color:red;">Required</mark> |        | "application/json"                                                                                                                                                                                                                                                                                                                                      |
| accept<br /><mark style="color:red;">Required</mark>       |        | "application/json"                                                                                                                                                                                                                                                                                                                                      |
| x-client-id                                    | String | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                       |
| x-client-secret                                | String | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                                   |
| authorization                                  | String | <p>Required if you prefer to login with a member's identity. See <a href="../account/login.md">Login with Email and Password</a> or <a href="../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |

#### Request Body

| Name                                   | Type           | Description                                       |
| -------------------------------------- | -------------- | ------------------------------------------------- |
| name<br /><mark style="color:red;">Required</mark> | String         | List name                                         |
| description                            | String         | List description                                  |
| assets                                 | \[JSON Object] | List of [asset](create-list.md#assets-structure)s |

#### asset structure

| Name                                      | Type   | Description                           |
| ----------------------------------------- | ------ | ------------------------------------- |
| address<br /><mark style="color:red;">Required</mark> | String |                                       |
| chain<br /><mark style="color:red;">Required</mark>   | String |                                       |
| note                                      | String | user note associated with this record |

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
<pre class="language-bash"><code class="lang-bash"><strong> curl -X 'POST' \
</strong>  'https://api.hypernative.xyz/lists' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'authorization: Bearer &#x3C;token>' \
  -d '{
  "name": "My List",
  "description": "ethereum assets",
  "assets": [
    {
      "address": "0xC1b634853Cb333D3aD8663715b08f41A3Aec47cc",
      "chain": "ethereum",
      "note": "my eth wallet"
    }
  ]
  }'
</code></pre>
{% endtab %}

{% tab title="Python" %}
```python
import requests

endpoint = "https://api.hypernative.xyz/lists"
headers = {
    "x-client-id": <API Client ID>,
  "x-client-secret": <API Client Secret>,
    "Content-Type": "application/json",
    "accept": "application/json"
}
payload = {
    "name": "My List",
    "description": "ethereum assets",
    "assets": [
        {
          "address": "0xC1b634853Cb333D3aD8663715b08f41A3Aec47cc",
          "chain": "ethereum",
          "note": "my eth wallet"
        }
    ]
}
response = requests.post(endpoint, json=payload, headers=headers).json()
```
{% endtab %}
{% endtabs %}

#### Response:

```json
{
  "success": true,
  "data": {
    "id": "<List id>",
    "name": "My List",
    "description": "ethereum assets",
    "createdAt": "2024-09-08T11:23:28.867Z",
    "updatedAt": "2024-09-08T11:23:28.867Z",
    "createdBy": "user@email.com",
    "updatedBy": "user@email.com",
    "chains": [
      "ethereum"
    ],
    "walletsCount": 1,
    "contractsCount": 0
  },
  "error": null,
  "version": "2.2.0",
  "service": "hypernative-webapp-server",
  "stackTrace": null
}
```
