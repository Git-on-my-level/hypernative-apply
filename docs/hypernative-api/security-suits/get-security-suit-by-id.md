# 🔵 Get Security Suit by ID

## Retrieve all Monitors linked to a Security Suit.

<mark style="color:blue;">`GET`</mark> `https://api.hypernative.xyz/security-suit/{id}/monitors`

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
  'https://api.hypernative.xyz/security-suit/1/monitors' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer <token>'
```
{% endtab %}

{% tab title="Python" %}
```python
endpoint = "https://api.hypernative.xyz/security-suit/1/monitors"
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
[
  {
    "id": 369,
    "channels": [
      {
        "id": 9,
        "name": "Slack-1",
        "type": "Slack",
        "configuration": {
          "value": "https://hooks.slack.com/services..."
        },
        "createdByUserId": 13,
        "createdBy": "",
        "createdAt": "2022-10-19T10:46:33.181Z",
        "updatedAt": "2023-11-01T10:04:20.747Z",
        "channelsAlertPolicies": [
          1575,
          1662,
          1580
        ],
        "remindersAlertPolicies": [
          1666,
          965,
          922
        ]
      }
    ],
    "totalAlerts": 1990,
    "lastTenDaysAlerts": 0,
    "lastTriggered": "2023-09-14T05:33:25.263Z",
    "securitySuits": [
      {
        "id": 1,
        "name": "mySuit"
      },
      {
        "id": 2,
        "name": "mySuit2"
      }
    ],
    "type": "Watchlist",
    "name": "my Watchlist",
    "status": "enabled",
    "severities": [
      "Medium",
      "High"
    ],
    "ruleString": "Alerting on: Governance, Financial, Technical, Security, Community"
  },
  {
    "id": 607,
    "channels": [
      {
        "id": 9,
        "name": "Slack-1",
        "type": "Slack",
        "configuration": {
          "value": "https://hooks.slack.com/services..."
        },
        "createdByUserId": 13,
        "createdBy": "",
        "createdAt": "2022-10-19T10:46:33.181Z",
        "updatedAt": "2023-11-01T10:04:20.747Z",
        "channelsAlertPolicies": [
          1512,
          1575,
          1662,
          1580
        ],
        "remindersAlertPolicies": [
          1000,
          999,
          965,
          922
        ]
      },
      {
        "id": 12,
        "name": "Discord-1",
        "type": "Discord",
        "configuration": {
          "value": "https://discord.com/api/webhooks/.../slack"
        },
        "createdByUserId": 13,
        "createdBy": "",
        "createdAt": "2022-12-29T15:27:39.003Z",
        "updatedAt": "2023-11-01T10:03:42.891Z",
        "channelsAlertPolicies": [
          1666,
          218,
          453,
          1662,
          1580,
          1621
        ],
        "remindersAlertPolicies": [
          1666,
          1162,
          955
        ]
      }
    ],
    "totalAlerts": 2,
    "lastTenDaysAlerts": 0,
    "lastTriggered": "2023-09-03T11:56:25.486Z",
    "securitySuits": [
      {
        "id": 1,
        "name": "mySuit"
      },
      {
        "id": 3,
        "name": "mySuit3"
      }
    ],
    "type": "CustomAgent",
    "name": "my Custom Agent",
    "status": "disabled",
    "severities": [
      "Medium"
    ],
    "ruleString": "On Ethereum: when the value of Maker: Dai Stablecoin in Curve.fi: DAI/USDC/USDT Pool is more than $0.0001"
  },
]
```

</details>
