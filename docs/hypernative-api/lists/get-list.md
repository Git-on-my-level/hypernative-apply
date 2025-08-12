# 🔵 Get list By ID

## Request

<mark style="color:blue;">`GET`</mark> `https://api.hypernative.xyz/lists/{List id}`

#### Headers

| Name                                     | Type   | Description                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accept<br /><mark style="color:red;">Required</mark> |        | "application/json"                                                                                                                                                                                                                                                                                                                                      |
| x-client-id                              | String | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                       |
| x-client-secret                          | String | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                                   |
| authorization                            | String | <p>Required if you prefer to login with a member's identity. See <a href="../account/login.md">Login with Email and Password</a> or <a href="../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |

#### Request Body

Using the `chain`, `address`, or `noteContains` search parameters will return a list containing a subset of assets.

| Name                                 | Type   | Description                                                                                                                                                                                     |
| ------------------------------------ | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id<br /><mark style="color:red;">Required</mark> | string | The ID of the List. To retrieve all lists and their IDs, use [Get All Lists](get-user-lists.md).                                                                                                |
| chain                                | string | <p>Filter the List's members by a specific blockchain. See <a href="../supported-chains/get-supported-chains.md">Supported Chains</a>.<br><br>You can combine this with additional filters.</p> |
| address                              | string | <p>Filter the List's members by a specific address.<br><br>You can combine this with additional filters.</p>                                                                                    |
| noteContains                         | string | <p>Filter the List's members whose notes contain this content.<br><br>You can combine this with additional filters.</p>                                                                         |

## Response

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

## Example

#### Request:

{% tabs %}
{% tab title="Curl" %}
```bash
curl -X 'GET' \
  'https://api.hypernative.xyz/lists/<List id>' \
  -H 'accept: application/json' \
  -H 'authorization: Bearer <token>'
```
{% endtab %}

{% tab title="Python" %}
```python
import requests

endpoint = "https://api.hypernative.xyz/lists/<List id>"
headers = {
    "x-client-id": <API Client ID>,
  "x-client-secret": <API Client Secret>, 
    "accept": "application/json"
}
response = requests.get(endpoint, headers=headers).json()
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
      }
    ]
  },
  "error": null,
  "version": "2.2.0",
  "service": "hypernative-webapp-server",
  "stackTrace": null
}
```
