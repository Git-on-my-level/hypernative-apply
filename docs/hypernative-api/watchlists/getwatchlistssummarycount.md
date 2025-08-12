# 🔵 Get the Total Number of All Watchlists and Assets

{% openapi src="../../../.gitbook/assets/openapi.yaml" path="/watchlists/summary/count" method="get" expanded="true" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endopenapi %}

## Get watchlists summary data

<mark style="color:blue;">`GET`</mark> `https://api.hypernative.xyz/watchlists/summary/count`

#### Headers

| Name                                           | Type             | Description                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Content-Type<br /><mark style="color:red;">Required</mark> | application/json |                                                                                                                                                                                                                                                                                                                                                         |
| accept<br /><mark style="color:red;">Required</mark>       | application/json |                                                                                                                                                                                                                                                                                                                                                         |
| x-client-id                                    | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                       |
| x-client-secret                                | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                                   |
| authorization                                  | String           | <p>Required if you prefer to login with a member's identity. See <a href="../account/login.md">Login with Email and Password</a> or <a href="../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |

{% tabs %}
{% tab title="200: OK " %}
```json
{
  "id": 0,
  "name": "string",
  "description": "string",
  "assets": [
    {
      "chain": "string",
      "type": "string",
      "name": "string",
      "address": "string"
    }
  ],
  "alertPolicies": [
    null
  ],
  "alertsTagsStats": [
    {
      "name": "All",
      "count": 0
    }
  ],
  "createdByUserId": 0,
  "createdBy": "string",
  "createdAt": "2022-10-20T12:11:46.245Z",
  "updatedAt": "2022-10-20T12:11:46.245Z"
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
  'https://api.hypernative.xyz/watchlists/summary/count' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'x-client-id: <API Client ID> \'
  -H 'x-client-secret: <API Client Secret> \'
  
```
{% endtab %}

{% tab title="Python" %}
```python
endpoint = "https://api.hypernative.xyz/watchlists/summary/count"
headers = {
    "x-client-id": <API Client ID>,
  "x-client-secret": <API Client Secret>, 
    "Content-Type": "application/json"
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
    "watchlists": 10,
    "totalAssets": 33,
    "contracts": 11,
    "wallets": 7,
    "protocols": 10,
    "bridges": 5,
    "chains": 6
  },
  "error": null,
  "version": "2.2.0",
  "service": "hypernative-webapp-server"
}
```
