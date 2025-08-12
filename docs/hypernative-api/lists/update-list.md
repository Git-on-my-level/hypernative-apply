# 🟠 Update List

## Request

<mark style="color:purple;">`PATCH`</mark> `https://api.hypernative.xyz/lists/{List id}`

#### Headers

| Name                                           | Type   | Description                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Content-Type<br /><mark style="color:red;">Required</mark> |        | "application/json"                                                                                                                                                                                                                                                                                                                                      |
| accept<br /><mark style="color:red;">Required</mark>       |        | "application/json"                                                                                                                                                                                                                                                                                                                                      |
| x-client-id                                    | String | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                       |
| x-client-secret                                | String | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                                   |
| authorization                                  | String | <p>Required if you prefer to login with a member's identity. See <a href="../account/login.md">Login with Email and Password</a> or <a href="../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |

#### Request Body

| Name                                        | Type           | Description                                                                                                                                                                                                                                                                                                                |
| ------------------------------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name                                        | String         |                                                                                                                                                                                                                                                                                                                            |
| description                                 | String         |                                                                                                                                                                                                                                                                                                                            |
| assets<mark style="color:yellow;">\*</mark> | \[JSON Object] | <p>List of <a href="create-list.md#asset-structure">Asset</a>s<br>Required if <code>mode</code> is present</p>                                                                                                                                                                                                             |
| mode<mark style="color:yellow;">\*</mark>   | String         | <p>One of the following values:</p><ul><li><code>add</code> - Adds provided assets to the list.</li><li><code>remove</code> - Removes provided assets from the list, if they exist.</li><li><code>replaceAll</code> - Clears the list and adds provided assets.</li></ul><p>Required if <code>assets</code> is present</p> |

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
<pre class="language-bash"><code class="lang-bash">  curl -X 'PATCH' \
  'https://dev.api.hypernative.xyz/lists/&#x3C;List id>' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'authorization: Bearer &#x3C;token>' \
  -d '{
  "assets": [
    {
      "address": "0xC1b634853Cb333D3aD8663715b08f41A3Aec47cd",
      "chain": "ethereum",
      "note": "my 2nd eth wallet"
    }
  ],
  "mode": "add"
<strong>  }'
</strong></code></pre>
{% endtab %}

{% tab title="Python" %}
```python
import requests

endpoint = "https://api.hypernative.xyz/lists/<List id>"
headers = {
    "x-client-id": <API Client ID>,
  "x-client-secret": <API Client Secret>,
    "Content-Type": "application/json",
    "accept": "application/json"
}
payload = {
  "assets": [
    {
      "address": "0xC1b634853Cb333D3aD8663715b08f41A3Aec47cd",
      "chain": "ethereum",
      "note": "my 2nd eth wallet"
    }
  ],
  "mode": "add"
}
response = requests.patch(endpoint, json=payload, headers=headers).json()
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
    "createdAt": "2024-09-08T13:48:16.860Z",
    "updatedAt": "2024-09-08T13:48:16.860Z",
    "createdBy": "user@email.com",
    "updatedBy": "user@email.com",
    "assets": [
      {
        "chain": "ethereum",
        "address": "0xc1b634853cb333d3ad8663715b08f41a3aec47cc",
        "note": "my eth wallet"
      },
      {
        "chain": "ethereum",
        "address": "0xc1b634853cb333d3ad8663715b08f41a3aec47cd",
        "note": "my 2nd eth wallet"
      }
    ]
  },
  "error": null,
  "version": "2.2.0",
  "service": "hypernative-webapp-server",
  "stackTrace": null
}
```
