# 🔵 Get Alert Policy by ID

## Retrieve Alert Policy by Id

<mark style="color:blue;">`GET`</mark> `https://api.hypernative.xyz/alert-policies/{id}`

#### Headers

| Name                                           | Type             | Description                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| x-client-id                                    | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                       |
| x-client-secret                                | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                                   |
| authorization                                  | String           | <p>Required if you prefer to login with a member's identity. See <a href="../account/login.md">Login with Email and Password</a> or <a href="../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |
| Content-Type<br /><mark style="color:red;">Required</mark> | application/json |                                                                                                                                                                                                                                                                                                                                                         |
| accept<br /><mark style="color:red;">Required</mark>       | application/json |                                                                                                                                                                                                                                                                                                                                                         |

{% tabs %}
{% tab title="200: OK " %}
```json

    "data": {
        "results": 
        [
            {
                "id": 62,
                "channels": [],
                "watchlists": [],
                "categories": [
                    "Governance",
                    "Financial",
                    "Technical",
                    "SuspiciousActivity",
                    "Community"
                ],
                "severities": [
                    "High"
                ]
            },
            {
                "id": 71,
                "channels": [
                    "Slack"
                ],
                "watchlists": [
                    84
                ],
                "categories": [
                    "Governance",
                    "Financial",
                    "Technical",
                    "SuspiciousActivity",
                    "Community"
                ],
                "severities": [
                    "High",
                    "Medium",
                    "Low"
                ]
            },

        ],
        "totalCount": 9,
        "remainingCount": 0
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
  'https://api.hypernative.xyz/alert-policies/{id}' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'x-client-id: <API Client ID> \'
  -H 'x-client-secret: <API Client Secret> \'
  
```
{% endtab %}

{% tab title="Python" %}
```python
endpoint = "https://api.hypernative.xyz/alert-policies/{id}"
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
    "id": 243,
    "channelsConfigurations": [
      {
        "id": 9,
        "name": "Slack-1",
        "type": "Slack",
        "configuration": {
          "value": "https://hooks.slack.com/services/..."
        },
        "createdByUserId": 13,
        "createdBy": "User Name",
        "createdAt": "2022-10-19T10:46:33.181Z",
        "updatedAt": "2023-04-30T13:05:48.516Z",
        "channelsAlertPolicies": [],
        "remindersAlertPolicies": []
      }
    ],
    "remindersConfigurations": [],
    "watchlists": [
      369
    ],
    "categories": [
      "Governance",
      "Financial",
      "Technical",
      "Security",
      "Community"
    ],
    "severities": [
      "High",
      "Medium"
    ],
    "typeIds": []
  },
  "error": null,
  "version": "2.2.0",
  "service": "hypernative-webapp-server",
  "stackTrace": null
}
```
