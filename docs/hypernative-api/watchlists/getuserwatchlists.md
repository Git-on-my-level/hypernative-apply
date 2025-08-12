# 🔵 Get All Watchlists

## Get watchlist data

<mark style="color:blue;">`GET`</mark> `https://api.hypernative.xyz/watchlists`

#### Headers

| Name                                           | Type                                                             | Description                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Content-Type<br /><mark style="color:red;">Required</mark> | application/json                                                 |                                                                                                                                                                                                                                                                                                                                                         |
| accept<br /><mark style="color:red;">Required</mark>       | application/json                                                 |                                                                                                                                                                                                                                                                                                                                                         |
| x-client-id                                    | String                                                           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                       |
| x-client-secret                                | String                                                           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                                   |
| authorization                                  | String                                                           | <p>Required if you prefer to login with a member's identity. See <a href="../account/login.md">Login with Email and Password</a> or <a href="../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |
| limit                                          | Number                                                           | Presents a page of results. This is useful for receiving faster response times. By default, all results are returned.                                                                                                                                                                                                                                   |
| offset                                         | Number                                                           | Request results starting from a given index number. This is useful for receiving faster response times. By default, all results are returned.                                                                                                                                                                                                           |
| sort                                           | Enum of `Id, name, description, createdBy, createdAt, updatedAt` | Sort the results by a given field. By default, results are returned in no particular order.                                                                                                                                                                                                                                                             |
| order                                          | Enum of `Asc, Desc`                                              | <p>Sort the results ascending or descending.</p><p>Default: <code>Asc</code></p>                                                                                                                                                                                                                                                                        |

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
  'https://api.hypernative.xyz/watchlists/' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'x-client-id: <API Client ID> \'
  -H 'x-client-secret: <API Client Secret> \'
```
{% endtab %}

{% tab title="Python" %}
```python
endpoint = "https://api.hypernative.xyz/watchlists/"
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
            "id": 192,
            "name": "MyPoolCompRole",
            "description": "",
            "createdAt": "2023-01-15T16:49:19.281Z",
            "updatedAt": "2023-01-15T16:49:19.281Z",
            "createdByUserId": 8,
            "createdBy": "HN Labs",
            "assets": [
                {
                    "chain": "ethereum",
                    "address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                    "name": null,
                    "type": "Contract"
                },
                {
                    "chain": "ethereum",
                    "address": "0xf56d08221b5942c428acc5de8f78489a97fc5599",
                    "name": null,
                    "type": "Contract"
                },
                {
                    "chain": "ethereum",
                    "address": "0x6810e776880c02933d47db1b9fc05908e5386b96",
                    "name": null,
                    "type": "Contract"
                }
            ],
            "alertPolicies": [
                {
                    "id": 178,
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
                      43
                    ],
                    "remindersAlertPolicies": []
                  }
                ],
                    "categories": [],
                    "severities": [],
                    "typeIds": []
                }
            ],
            "alertsTagsStats": [
                {
                    "count": "74",
                    "name": "All"
                },
                {
                    "count": "0",
                    "name": "Read"
                },
                {
                    "count": "74",
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
            "id": 213,
            "name": "test",
            "description": "",
            "createdAt": "2023-01-25T09:30:59.029Z",
            "updatedAt": "2023-01-25T09:30:59.029Z",
            "createdByUserId": 8,
            "createdBy": "HN Labs",
            "assets": [
                {
                    "chain": "ethereum",
                    "address": null,
                    "name": "0xmons",
                    "type": "Protocol"
                }
            ],
            "alertPolicies": [
                {
                    "id": 199,
                    "channels": [],
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
}
```
