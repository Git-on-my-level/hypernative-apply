# 🔵 Get All Alert Policies

## Retrieve all policies for this user

<mark style="color:blue;">`GET`</mark> `https://api.hypernative.xyz/alert-policies/`

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
  'https://api.hypernative.xyz/alert-policies/' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'x-client-id: <API Client ID> \'
  -H 'x-client-secret: <API Client Secret> \'
  
```
{% endtab %}

{% tab title="Python" %}
```python
endpoint = "https://api.hypernative.xyz/alert-policies/"
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
        "results": [
            {
                "id": 195,
                "channelsConfigurations": [
                  {
                    "id": 1,
                    "name": "Slack-1",
                    "type": "Slack",
                    "configuration": {
                      "value": "https://hooks.slack.com/services..."
                    },
                    "createdByUserId": 13,
                    "createdBy": "",
                    "createdAt": "2023-06-04T12:15:13.635Z",
                    "updatedAt": "2023-10-22T11:59:10.055Z",
                    "channelsAlertPolicies": [
                      469,
                      470,
                    ],
                    "remindersAlertPolicies": []
                  },
                  {
                    "id": 2,
                    "name": "Email-1",
                    "type": "Email",
                    "configuration": {
                      "value": "my@email.com"
                    },
                    "createdByUserId": 1,
                    "createdBy": "",
                    "createdAt": "2023-06-25T11:41:45.742Z",
                    "updatedAt": "2023-09-06T14:21:34.873Z",
                    "channelsAlertPolicies": [
                      651,
                      785,
                      661,
                      1229,
                      1230
                    ],
                    "remindersAlertPolicies": []
                  }
                ]
                "watchlists": [],
                "categories": [
                    "Governance",
                    "Financial",
                    "Technical",
                    "Security",
                    "Community"
                ],
                "severities": [
                    "Medium",
                    "High",
                    "Low"
                ],
                "typeIds": []
            },
            {
                "id": 135,
                "channelsConfigurations": [
                  {
                    "id": 1,
                    "name": "Slack-1",
                    "type": "Slack",
                    "configuration": {
                      "value": "https://hooks.slack.com/services..."
                    },
                    "createdByUserId": 13,
                    "createdBy": "",
                    "createdAt": "2023-06-04T12:15:13.635Z",
                    "updatedAt": "2023-10-22T11:59:10.055Z",
                    "channelsAlertPolicies": [
                      469,
                      470,
                    ],
                    "remindersAlertPolicies": []
                  },
                  {
                    "id": 2,
                    "name": "Email-1",
                    "type": "Email",
                    "configuration": {
                      "value": "my@email.com"
                    },
                    "createdByUserId": 1,
                    "createdBy": "",
                    "createdAt": "2023-06-25T11:41:45.742Z",
                    "updatedAt": "2023-09-06T14:21:34.873Z",
                    "channelsAlertPolicies": [
                      651,
                      785,
                      661,
                      1229,
                      1230
                    ],
                    "remindersAlertPolicies": []
                  }
                ]
                "watchlists": [],
                "categories": [
                    "Governance",
                    "Financial",
                    "Technical",
                    "Security",
                    "Community"
                ],
                "severities": [
                    "High"
                ],
                "typeIds": []
            },
            {
                "id": 43,
                "channelsConfigurations": [
                  {
                    "id": 1,
                    "name": "Slack-1",
                    "type": "Slack",
                    "configuration": {
                      "value": "https://hooks.slack.com/services..."
                    },
                    "createdByUserId": 13,
                    "createdBy": "",
                    "createdAt": "2023-06-04T12:15:13.635Z",
                    "updatedAt": "2023-10-22T11:59:10.055Z",
                    "channelsAlertPolicies": [
                      469,
                      470,
                    ],
                    "remindersAlertPolicies": []
                  },
                  {
                    "id": 2,
                    "name": "Email-1",
                    "type": "Email",
                    "configuration": {
                      "value": "my@email.com"
                    },
                    "createdByUserId": 1,
                    "createdBy": "",
                    "createdAt": "2023-06-25T11:41:45.742Z",
                    "updatedAt": "2023-09-06T14:21:34.873Z",
                    "channelsAlertPolicies": [
                      651,
                      785,
                      661,
                      1229,
                      1230
                    ],
                    "remindersAlertPolicies": []
                  }
                ]
                "watchlists": [],
                "categories": [
                    "Governance"
                ],
                "severities": [
                    "Info"
                ],
                "typeIds": []
            }
        ],
        "totalCount": 17,
        "remainingCount": 0
    },
    "error": null,
    "version": "2.2.0",
    "service": "hypernative-webapp-server"
}
```
