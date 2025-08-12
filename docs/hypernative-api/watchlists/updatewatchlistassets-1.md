# 🟠 Attach Alert Policy to a Watchlist

With this API, you can apply a single Alert Policy to multiple Watchlists, allowing you to easily maintain your settings without needing to clone them.

Note: This feature is available only with the Hypernative API and not with the Hypernative Web Application.

<mark style="color:purple;">`PATCH`</mark> `https://api.hypernative.xyz/watchlists/{id}/switch-alert-policy`

#### Headers

| Name                                           | Type             | Description                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Content-Type<br /><mark style="color:red;">Required</mark> | application/json |                                                                                                                                                                                                                                                                                                                                                         |
| accept<br /><mark style="color:red;">Required</mark>       | application/json |                                                                                                                                                                                                                                                                                                                                                         |
| x-client-id                                    | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                       |
| x-client-secret                                | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                                   |
| authorization                                  | String           | <p>Required if you prefer to login with a member's identity. See <a href="../account/login.md">Login with Email and Password</a> or <a href="../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |

#### Request Body

| Name                                            | Type    | Description                                                                                                                                      |
| ----------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| alertPolicyId<br /><mark style="color:red;">Required</mark> | integer | <p>Alert Policy Id to attach to your Watchlist.<br>Use <a href="../alerts/getalertpolicies.md">Get Alert Policies</a> to retrieve their IDs.</p> |

{% tabs %}
{% tab title="200: OK " %}
```json
{
  "success": true,
  "data": {
    "id": number,
    "name": string,
    "description": string,
    "createdAt": string,
    "updatedAt": string,
    "createdBy": string,
    "createdByUserId": number,
    "assets": asset objects array,
    "alertPolicies": alert policy objects array,
  },
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
  curl -X 'PATCH' \
  'https://api.hypernative.xyz/watchlists/<watchlist id> ' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'x-client-id: <API Client ID> \'
  -H 'x-client-secret: <API Client Secret> \'
  -d '{"alertPolicyId": <alert policy id>}'
```
{% endtab %}

{% tab title="Python" %}
```python
endpoint = "https://api.hypernative.xyz/watchlists/<watchlist id>"
headers = {
     "x-client-id": <API Client ID>,
  "x-client-secret": <API Client Secret>,
     "Content-Type": "application/json"
 }
payload = {"alertPolicyId": <alert policy id>}
response = requests.patch(endpoint, json=payload, headers=headers).json()
```
{% endtab %}
{% endtabs %}

#### Response:

```json
{
  "success": true,
  "data": {
    "id": 629,
    "name": "general",
    "description": "",
    "createdAt": "2023-04-03T09:42:26.664Z",
    "updatedAt": "2023-04-03T09:42:26.664Z",
    "createdBy": "user user",
    "createdByUserId": 1,
    "assets": [
      {
        "chain": "ethereum",
        "address": null,
        "name": "Aave V1",
        "type": "Protocol"
      }
    ],
    "alertPolicies": [
      {
        "id": 696,
        "channelsConfigurations": [],
        "remindersConfigurations": [],
        "watchlists": [
          607
        ],
        "categories": [],
        "severities": [],
        "typeIds": [
          "A-2010",
          "A-3902"
        ]
      }
    ],
    "alertsTagsStats": [
      {
        "count": 0,
        "name": "All"
      },
      {
        "count": 0,
        "name": "Read"
      },
      {
        "count": 0,
        "name": "Unread"
      },
      {
        "count": 0,
        "name": "Important"
      },
      {
        "count": 0,
        "name": "Dismissed"
      }
    ]
  },
  "error": null,
  "version": "2.2.0",
  "service": "hypernative-webapp-server",
  "stackTrace": null
}
```
