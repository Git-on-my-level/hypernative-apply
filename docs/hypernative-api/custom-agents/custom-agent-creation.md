# 🟢 Create Custom Agent

### Custom Agent creation

## Create a new Custom Agent (depends on Custom Agent Type)

<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/custom-agents`

#### Headers

| Name                                     | Type             | Description                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accept<br /><mark style="color:red;">Required</mark> | application/json |                                                                                                                                                                                                                                                                                                                                                         |
| x-client-id                              | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                       |
| x-client-secret                          | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                                   |
| authorization                            | String           | <p>Required if you prefer to login with a member's identity. See <a href="../account/login.md">Login with Email and Password</a> or <a href="../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |

#### Request Body

| Name                                                     | Type   | Description                                                                                                                            |
| -------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| agentType<br /><mark style="color:red;">Required</mark>              | string |                                                                                                                                        |
| channelsConfigurations<br /><mark style="color:red;">Required</mark> | array  | <p>array of objects</p><p>that consists of notifcation channel id's</p><p>passing an empty array will result in only in-app alerts</p> |
| rule<br /><mark style="color:red;">Required</mark>                   | object | see Custom Agent types                                                                                                                 |
| muteDuration                                             | number |                                                                                                                                        |
| severity<br /><mark style="color:red;">Required</mark>               | string | High \| Medium                                                                                                                         |
| agentName<br /><mark style="color:red;">Required</mark>              | string |                                                                                                                                        |
| remindersConfigurations                                  | array  | <p>same as</p><p><code>channelsConfigurations</code></p><p>but not supported in all Custom Agent types</p>                             |
| state<br /><mark style="color:red;">Required</mark>                  | string | enabled \| disabled                                                                                                                    |

{% tabs %}
{% tab title="201: Created " %}

{% endtab %}
{% endtabs %}

#### Example

{% tabs %}
{% tab title="Curl" %}
<pre class="language-bash"><code class="lang-bash">curl -X 'POST' \
  'https://api.hypernative.xyz/custom-agents' \
  -H 'accept: application/json' \
  -H 'x-client-id: &#x3C;API Client ID> \'
  -H 'x-client-secret: &#x3C;API Client Secret> \'
  -d '{
<strong>        "agentName": "Price Deviation",
</strong>        "agentType": "depeggingAgent",
        "severity": "High",
        "muteDuration": 0,
        "state": "enabled",
        "rule": {
                    "chain":"ethereum",
                    "direction": "below",
                    "linkAsset":"USD",
                    "threshold": 2.2,
                    "peggedAsset": "0xdac17f958d2ee523a2206206994597c13d831ec7",
                    "priceSource": "COINGECKO"
                  },
      "channelsConfigurations": [
        {
          "id": 1 #your channel Id
        }
      }
      ],
      "remindersConfigurations": []
  }'
</code></pre>
{% endtab %}

{% tab title="Python" %}
```python
endpoint = "https://api.hypernative.xyz/custom-agents"
headers = {
    "x-client-id": <API Client ID>,
  "x-client-secret": <API Client Secret>,
    "Content-Type": "application/json"
}
payload = {
    "agentName": "string",
    "agentType": "string",
    "severity": "High",
    "muteDuration": 0,
    "state": "enabled",
    "rule": { #depends on the agent type
      "direction": "below",
      "threshold": 2.2,
      "peggedAsset": "0xdac17f958d2ee523a2206206994597c13d831ec7",
      "linkAsset": "USD",
      "chain": "ethereum"
    },
    "channelsConfigurations":  [
        {
          "id": 1
        },
        {
          "id": 2
        }
      ],
    "remindersConfigurations": []
}
response = requests.post(endpoint, json=payload, headers=headers).json()
```
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

```json
{
  "id": 0,
  "agentName": "string",
  "agentType": "string",
  "severity": "string",
  "muteDuration": 0,
  "state": "enabled",
  "rule": {},
  "alertPolicies": [
    {
      "id": 1,
      "channelsConfigurations": [
        {
          "id": 1,
          "name": "Webhook-1",
          "type": "Webhook",
          "configuration": {
            "value": "https://mywebhook.com",
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
          "createdByUserId": 1,
          "createdBy": "",
          "createdAt": "2023-06-25T09:11:01.504Z",
          "updatedAt": "2023-10-22T12:01:56.320Z",
          "channelsAlertPolicies": [],
          "remindersAlertPolicies": []
        },
        {
          "id": 2,
          "name": "Webhook-2",
          "type": "Webhook",
          "configuration": {
            "value": "https://mywebhook.com",
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
          "createdByUserId": 1,
          "createdBy": "",
          "createdAt": "2023-06-25T09:11:01.504Z",
          "updatedAt": "2023-10-22T12:01:56.320Z",
          "channelsAlertPolicies": [],
          "remindersAlertPolicies": []
        }
      ],
      "remindersConfigurations": [],
      "categories": [
        "Governance"
      ],
      "severities": [
        "Info"
      ],
      "typeIds": [
        "string"
      ],
      "watchlists": [
        "string"
      ]
    }
  ],
  "alertsTagsStats": [
    {
      "name": "All",
      "count": 0
    }
  ],
  "createdByUserId": 0,
  "createdBy": "string",
  "createdAt": "2023-06-11T14:16:29.532Z",
  "updatedAt": "2023-06-11T14:16:29.532Z",
  "lastTriggered": "2023-06-11T14:16:29.532Z"
}
```

</details>
