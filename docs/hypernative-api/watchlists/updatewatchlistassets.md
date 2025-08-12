# 🟠 Update Watchlist

## Watchlist assets populate/update

<mark style="color:purple;">`PATCH`</mark> `https://api.hypernative.xyz/watchlists/{id}`

#### Headers

| Name                                           | Type             | Description                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Content-Type<br /><mark style="color:red;">Required</mark> | application/json |                                                                                                                                                                                                                                                                                                                                                         |
| accept<br /><mark style="color:red;">Required</mark>       | application/json |                                                                                                                                                                                                                                                                                                                                                         |
| x-client-id                                    | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                       |
| x-client-secret                                | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                                   |
| authorization                                  | String           | <p>Required if you prefer to login with a member's identity. See <a href="../account/login.md">Login with Email and Password</a> or <a href="../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |

#### Request Body

| Name                                     | Type           | Description                                                                                                                                                                                                                                                                                                                                                                 |
| ---------------------------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| description                              | \<description> | Watch list description                                                                                                                                                                                                                                                                                                                                                      |
| Name                                     | \<name>        | Watch list name                                                                                                                                                                                                                                                                                                                                                             |
| assets<br /><mark style="color:red;">Required</mark> | \[Asset]       | List of [Assets](../parameter-options.md#asset-less-than-json-greater-than)                                                                                                                                                                                                                                                                                                 |
| mode                                     | String         | <p>One of the following values:</p><ul><li><code>add</code> - Adds provided assets to the watchlist.</li><li><code>remove</code> - Removes provided assets from the watchlist, if they exist.</li><li><code>replaceAll</code> - Clears the watchlist and adds provided assets.</li></ul><p>If <code>mode</code> is not included, it defaults to<code>replaceAll</code>.</p> |

{% tabs %}
{% tab title="200: OK " %}
```json
{
    "data":
    {
        "id": 0,
        "name": "string",
        "description": "string",
        "assets":
        [
            {
                "chain": "string",
                "type": "string",
                "name": "string",
                "address": "string"
            }
        ],
        "alertPolicies":
        [
            null
        ],
        "alertsTagsStats":
        [
            {
                "name": "All",
                "count": 0
            }
        ],
        "createdByUserId": 0,
        "createdBy": "string",
        "createdAt": "2022-10-19T19:36:09.965Z",
        "updatedAt": "2022-10-19T19:36:09.965Z"
    }
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
  'https://api.hypernative.xyz/watchlists/1167' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'x-client-id: <API Client ID> \'
  -H 'x-client-secret: <API Client Secret> \'
    -d '{
  "name": "My New Watchlist",
  "description": "",
  "assets": [
    {
	  "chain": "Ethereum",
	  "type": "Protocol",
          "name": "Chain"
    },
    {
	  "chain": "Ethereum",
	  "type": "Wallet",
	  "address": "0x071a26dc66df5028ee602713bc34130cb5055b08"
    },
	{
	  "chain": "Ethereum",
	  "type": "Contract",
	  "address": "0xdAC17F958D2ee523a2206206994597C13D831ec7"
    }
  ]
}'
```
{% endtab %}

{% tab title="Python" %}
```python
endpoint = "https://api.hypernative.xyz/watchlists/1167"
headers = {
     "x-client-id": <API Client ID>,
  "x-client-secret": <API Client Secret>,
     "Content-Type": "application/json"
 }
payload ={
   "name": "My New Watchlist",
   "description": "",
   "assets": [
     {
	  "chain": "Ethereum",
	  "type": "Protocol",
          "name": "Chain"
     },
     {
	  "chain": "Ethereum",
	  "type": "Wallet",
	  "address": "0x071a26dc66df5028ee602713bc34130cb5055b08"
     },
     {
	  "chain": "Ethereum",
	  "type": "Contract",
	  "address": "0xdAC17F958D2ee523a2206206994597C13D831ec7"
     }
   ]
}
response = requests.patch(endpoint, json=payload, headers=headers).json()
```
{% endtab %}
{% endtabs %}

#### Response:

```json
{
    "success": true,
    "data": {
        "id": 1167,
        "name": "My New Watchlist",
        "description": "",
        "createdAt": "2023-10-05T13:13:10.887Z",
        "updatedAt": "2023-10-05T13:13:10.887Z",
        "createdBy": "Sean Hypernative",
        "createdByUserId": 53,
        "assets": [
            {
                "chain": "ethereum",
                "address": null,
                "name": "Chain",
                "type": "Protocol"
            },
            {
                "chain": "ethereum",
                "address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
                "name": null,
                "type": "Wallet"
            },
            {
                "chain": "ethereum",
                "address": "0x071a26dc66df5028ee602713bc34130cb5055b08",
                "name": null,
                "type": "Wallet"
            }
        ],
        "alertPolicies": [
            {
                "id": 2146,
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
    },
    "error": null,
    "version": "2.2.0",
    "service": "hypernative-webapp-server"
}
```
