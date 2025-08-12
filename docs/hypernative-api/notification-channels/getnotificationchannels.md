# 🔵 Get All Channels

## Get Notification Channels data

<mark style="color:blue;">`GET`</mark> `https://api.hypernative.xyz/notification-channels`

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
    "success": true,
    "data": {
        "results": [
            {
                "id": 57,
                "name": "My New Watchlist2",
                "description": "My New Watchlist Description2",
                "createdAt": "2022-10-20T10:41:20.817Z",
                "updatedAt": "2022-10-20T10:41:20.817Z",
                "createdByUserId": 8,
                "createdBy": " ",
                "assets": [
                    {
                        "chain": "Ethereum",
                        "address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
                        "name": null,
                        "type": "Wallet"
                    },
                    {
                        "chain": "Ethereum",
                        "address": null,
                        "name": "Chain",
                        "type": "Protocol"
                    },
                    {
                        "chain": "Ethereum",
                        "address": "0x071a26dc66df5028ee602713bc34130cb5055b08",
                        "name": null,
                        "type": "Wallet"
                    }
                ],
                "alertPolicies": [
                    {
                        "id": 44,
                        "channels": [],
                        "categories": [
                            "Community",
                            "SuspiciousActivity",
                            "Technical",
                            "Financial",
                            "Governance"
                        ],
                        "severities": [
                            "High"
                        ]
                    }
                ],
                "alertsTagsStats": [
                    {
                        "count": "26",
                        "name": "All"
                    },
                    {
                        "count": "0",
                        "name": "Read"
                    },
                    {
                        "count": "26",
                        "name": "Unread"
                    },
                    {
                        "count": "0",
                        "name": "Important"
                    },
                    {
                        "count": "0",
                        "name": "Dismissed"
                    }
                ]
            },
            {
                "id": 50,
                "name": "My Super WL2",
                "description": "",
                "createdAt": "2022-10-13T12:45:26.664Z",
                "updatedAt": "2022-10-13T12:45:26.664Z",
                "createdByUserId": 8,
                "createdBy": " ",
                "assets": [
                    {
                        "chain": "Ethereum",
                        "address": null,
                        "name": "0xmons",
                        "type": "Protocol"
                    },
                    {
                        "chain": "Ethereum",
                        "address": null,
                        "name": "0x",
                        "type": "Protocol"
                    },
                    {
                        "chain": "Ethereum",
                        "address": null,
                        "name": "0xSplits",
                        "type": "Protocol"
                    }
                ],
                "alertPolicies": [
                    {
                        "id": 41,
                        "channels": [
                            "Email"
                        ],
                        "categories": [
                            "Community",
                            "Financial",
                            "Governance",
                            "SuspiciousActivity",
                            "Technical"
                        ],
                        "severities": [
                            "High"
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
            }
        ],
        "totalCount": 2,
        "remainingCount": 0
    },
    "error": null,
    "version": "1.1.0",
    "service": "hypernative-webapp-server"
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
  'https://api.hypernative.xyz/notification-channels' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'x-client-id: <API Client ID> \'
  -H 'x-client-secret: <API Client Secret> \'
```
{% endtab %}

{% tab title="Python" %}
```python
endpoint = "https://api.hypernative.xyz/notification-channels"
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

"data": {
    "results": [
        {
            "id": 51,
            "name": "myWebhook",
            "type": "Webhook",
            "configuration": {
                "value": "https://myWebhook.com",
                "headers": [
                    {
                        "key": "header1",
                        "value": "value1"
                    },
                    {
                        "key": "header2",
                        "value": "value2"
                    }
                ]
            },
            "createdByUserId": 13,
            "createdBy": "User",
            "createdAt": "2023-10-22T15:00:19.771Z",
            "updatedAt": "2023-10-22T15:00:19.771Z",
            "channelsAlertPolicies": [],
            "remindersAlertPolicies": []
        }
    ],
    "totalCount": 1,
    "remainingCount": 0
}
```
