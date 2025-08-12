# 🟠 Update Security Suit

## Update Security Suit by ID.

<mark style="color:purple;">`PATCH`</mark> `https://api.hypernative.xyz/security-suit/{id}`

#### Headers

| Name                                     | Type             | Description                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accept<br /><mark style="color:red;">Required</mark> | application/json |                                                                                                                                                                                                                                                                                                                                                         |
| x-client-id                              | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                       |
| x-client-secret                          | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                                   |
| authorization                            | String           | <p>Required if you prefer to login with a member's identity. See <a href="../account/login.md">Login with Email and Password</a> or <a href="../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |

#### Request Body

| Name           | Type      | Description |
| -------------- | --------- | ----------- |
| customAgentIds | number\[] |             |
| watchlistIds   | number\[] |             |
| description    | string    |             |
| name           | string    |             |

### Example

#### Request:

{% tabs %}
{% tab title="Curl" %}
```bash
curl -X 'PATCH' \
  'https://api.hypernative.xyz/security-suit/{id}' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer <token>'
  -d '{
      "name": "new name",
      "watchlistIds": [1,2]
  }'
```
{% endtab %}

{% tab title="Python" %}
```python
endpoint = "https://api.hypernative.xyz/security-suit/{id}"
headers = {
    "x-client-id": <API Client ID>,
  "x-client-secret": <API Client Secret>,
    "Content-Type": "application/json"
}
payload = {
      "name": "new name",
      "watchlistIds": [1,2]
  }
response = requests.patch(endpoint, headers=headers).json() 
```
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

```json
{
      "id": 3,
      "name": "new name",
      "description": null,
      "createdAt": "2023-08-07T09:49:53.494Z",
      "updatedAt": "2023-08-07T09:49:53.494Z",
      "createdByUserId": 13,
      "createdBy": "User full name",
      "createdByMemberId": 12,
      "watchlists": [{id:1, name:"watchlist1"} {id:2, name:"watchlist2"}],
      "customAgents": [],
      "alertsCount":{"total":3, "high":2, "medium":1}
}
```

</details>
