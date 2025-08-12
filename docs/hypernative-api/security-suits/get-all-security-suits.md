# 🔵 Get All Security Suits

## Retrieve all Security Suits linked to the currently logged-in user.

<mark style="color:blue;">`GET`</mark> `https://api.hypernative.xyz/security-suit`

#### Headers

| Name                                           | Type             | Description                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accept<br /><mark style="color:red;">Required</mark>       | application/json |                                                                                                                                                                                                                                                                                                                                                         |
| Content-Type<br /><mark style="color:red;">Required</mark> | application/json |                                                                                                                                                                                                                                                                                                                                                         |
| x-client-id                                    | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                       |
| x-client-secret                                | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                                   |
| authorization                                  | String           | <p>Required if you prefer to login with a member's identity. See <a href="../account/login.md">Login with Email and Password</a> or <a href="../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |

### Example

#### Request:

{% tabs %}
{% tab title="Curl" %}
```bash
curl -X 'GET' \
  'https://api.hypernative.xyz/security-suit' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer <token>'
```
{% endtab %}

{% tab title="Python" %}
```python
endpoint = "https://api.hypernative.xyz/security-suit"
headers = {
    "x-client-id": <API Client ID>,
  "x-client-secret": <API Client Secret>,
    "Content-Type": "application/json"
}
response = requests.get(endpoint, headers=headers).json() 
```
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

```json
{
  "results": [
    {
      "id": 2,
      "name": "name1",
      "description": "description1",
      "createdAt": "2023-08-07T08:25:02.232Z",
      "updatedAt": "2023-08-07T08:25:02.232Z",
      "createdByUserId": 13,
      "createdBy": "User full name",
      "createdByMemberId": 12,
      "watchlists": [
        {
          "id": 778,
          "name": "watchlist1"
        }
      ],
      "customAgents": [
        {
          "id": 557,
          "agentName": "agent1"
        }
      ],
    "alertsCount":{"total":3, "high":2, "medium":1}
    },
    {
      "id": 1,
      "name": "hack",
      "description": null,
      "createdAt": "2023-08-07T08:24:43.003Z",
      "updatedAt": "2023-08-07T08:24:43.003Z",
      "createdByUserId": 13,
      "createdBy": "User full name",
      "createdByMemberId": 12,
      "watchlists": [
        {
          "id": 778,
          "name": "watchlist1"
        }
      ],
      "customAgents": [],
      "alertsCount":{"total":3, "high":2, "medium":1}
    },
    {
      "id": 3,
      "name": "ETH",
      "description": null,
      "createdAt": "2023-08-07T09:49:53.494Z",
      "updatedAt": "2023-08-07T09:49:53.494Z",
      "createdByUserId": 13,
      "createdBy": "User full name",
      "createdByMemberId": 12,
      "watchlists": [],
      "customAgents": [],
      "alertsCount":{"total":3, "high":2, "medium":1}
    }
  ],
  "totalCount": 3,
  "remainingCount": 0
}
```

</details>
