# 🟢 Create Security Suit

## Create a new Security Suit

<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/security-suit`

#### Headers

| Name                                           | Type             | Description                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accept<br /><mark style="color:red;">Required</mark>       | application/json |                                                                                                                                                                                                                                                                                                                                                         |
| Content-Type<br /><mark style="color:red;">Required</mark> | application/json |                                                                                                                                                                                                                                                                                                                                                         |
| x-client-id                                    | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                       |
| x-client-secret                                | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                                   |
| authorization                                  | String           | <p>Required if you prefer to login with a member's identity. See <a href="../account/login.md">Login with Email and Password</a> or <a href="../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |

#### Request Body

| Name                                   | Type      | Description |
| -------------------------------------- | --------- | ----------- |
| name<br /><mark style="color:red;">Required</mark> | string    |             |
| description                            | string    |             |
| watchlistIds                           | number\[] |             |
| customAgentIds                         | number\[] |             |

### Example

#### Request:

{% tabs %}
{% tab title="Curl" %}
```bash
  curl -X 'POST' \
  'https://api.hypernative.xyz/security-suit' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "ETH",
  "description": "lorem ipsum",
  "watchlistIds": [123,22],
  "customAgentIds": [111]
}'
```
{% endtab %}

{% tab title="Python" %}
```python
 endpoint = "https://api.hypernative.xyz/security-suit"
 headers={
    "x-client-id": <API Client ID>,
  "x-client-secret": <API Client Secret>,
    "Content-Type": "application/json"
}
 payload = {
  "name": "ETH",
  "description": "lorem ipsum",
  "watchlistIds": [123,22],
  "customAgentIds": [111]
}
 response = requests.post(endpoint, json=payload, headers=headers).json() 
```
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

```json
{
    "id": 3,
    "name": "ETH",
    "description": "lorem ipsum",
    "createdAt": "2023-08-07T09:49:53.494Z",
    "updatedAt": "2023-08-07T09:49:53.494Z",
    "createdByUserId": 13,
    "createdBy": "user full name",
    "createdByMemberId": 12,
    "watchlists": [{"id": 123, "name": "myWatchlist"},{"id": 22, "name": "myWatchlist2"}],
    "customAgents": [{"id": 111, "agentName": "myAgent"}],
    "alertsCount":{"total":3, "high":2, "medium":1}
}
```

</details>
