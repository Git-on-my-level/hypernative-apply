# 🔵 Get Watchlist By ID

## Request

<mark style="color:blue;">`GET`</mark> `https://api.hypernative.xyz/watchlists/{id}`

#### Headers

| Name                                           | Type             | Description                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Content-Type<br /><mark style="color:red;">Required</mark> | application/json |                                                                                                                                                                                                                                                                                                                                                         |
| accept<br /><mark style="color:red;">Required</mark>       | application/json |                                                                                                                                                                                                                                                                                                                                                         |
| x-client-id                                    | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                       |
| x-client-secret                                | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                                   |
| authorization                                  | String           | <p>Required if you prefer to login with a member's identity. See <a href="../account/login.md">Login with Email and Password</a> or <a href="../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |

#### Parameters

| Name | Type                   | Description                                                                                                                        |
| ---- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| id   |                number  | <p></p><ul><li>Refer to <a href="getuserwatchlists.md">Get All Watchlists</a> for a list of all Watchlist IDs and Names.</li></ul> |

## Response

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

## Example

#### Request:

{% tabs %}
{% tab title="Curl" %}
```bash
curl -X 'GET' \
  'https://api.hypernative.xyz/watchlists/55' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'x-client-id: <API Client ID> \'
  -H 'x-client-secret: <API Client Secret> \'
  
```
{% endtab %}

{% tab title="Python" %}
```python
endpoint = "https://api.hypernative.xyz/watchlists/55"
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
        "id": 55,
        "name": "My New Watchlist",
        "description": "My white list assets",
        "createdAt": "2022-10-20T08:40:52.985Z",
        "updatedAt": "2022-10-20T08:54:16.937Z",
        "alertPolicies": [{
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
                      43
                    ],
                    "remindersAlertPolicies": []
                  }
                ],
                "categories": ["Governance"],
                "severities": ["Info"]
            }
        ],
        "assets": [{
                "chain": "Ethereum",
                "address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
                "type": "Wallet",
                "systemLabels": ["USDT", "Aave V1", "Aave V2"],
                "riskScores": {
                    "technical": "Medium",
                    "total": "High",
                    "community": "Low",
                    "governance": "Medium",
                    "financial": "High",
                    "suspiciousActivity": "Medium"
                }
            }, {
                "chain": "Ethereum",
                "address": "0x071a26dc66df5028ee602713bc34130cb5055b08",
                "type": "Wallet",
                "systemLabels": [],
                "riskScores": {
                    "technical": "Low",
                    "total": "Low",
                    "community": "Low",
                    "governance": "Low",
                    "financial": "Low",
                    "suspiciousActivity": "Low"
                }
            }, {
                "chain": "Ethereum",
                "name": "Chain",
                "type": "Protocol",
                "systemLabels": [],
                "riskScores": {
                    "technical": "Low",
                    "total": "Low",
                    "community": "Low",
                    "governance": "Low",
                    "financial": "Low",
                    "suspiciousActivity": "Low"
                }
            }
        ],
        "createdByUserId": 8,
        "createdBy": "Lior Betzalel",
        "alertsTagsStats": [{
                "count": 0,
                "name": "All"
            }, {
                "count": 0,
                "name": "Read"
            }, {
                "count": 0,
                "name": "Unread"
            }, {
                "count": 0,
                "name": "Important"
            }, {
                "count": 0,
                "name": "Dismissed"
            }
        ]
    },
    "error": null,
    "version": "1.0.0",
    "service": "hypernative-webapp-server"
}
```
