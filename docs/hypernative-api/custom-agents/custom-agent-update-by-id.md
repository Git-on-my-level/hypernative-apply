# 🟠 Update Custom Agent

### Custom Agent update by ID

## Update Custom Agent by ID.

<mark style="color:purple;">`PATCH`</mark> `https://api.hypernative.xyz/custom-agents/{id}`

#### Headers

| Name                                     | Type             | Description                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accept<br /><mark style="color:red;">Required</mark> | application/json |                                                                                                                                                                                                                                                                                                                                                         |
| x-client-id                              | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                       |
| x-client-secret                          | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                                   |
| authorization                            | String           | <p>Required if you prefer to login with a member's identity. See <a href="../account/login.md">Login with Email and Password</a> or <a href="../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |

#### Request Body

| Name                                    | Type   | Description                                                                                                                            |
| --------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| channelsConfigurations                  | array  | <p>array of objects</p><p>that consists of notifcation channel id's</p><p>passing an empty array will result in only in-app alerts</p> |
| rule                                    | object | see Custom Agent types                                                                                                                 |
| muteDuration                            | number |                                                                                                                                        |
| severity                                | string | High \| Medium                                                                                                                         |
| agentName                               | string |                                                                                                                                        |
| remindersConfigurations                 | array  | <p>same as</p><p><code>channelsConfigurations</code></p><p>but not supported in all Custom Agent types</p>                             |
| state<br /><mark style="color:red;">Required</mark> | string | enabled \| disabled                                                                                                                    |

{% tabs %}
{% tab title="200: OK " %}

{% endtab %}
{% endtabs %}

#### Example

{% tabs %}
{% tab title="Curl" %}
```bash
curl -X 'PATCH' \
  'https://api.hypernative.xyz/custom-agents/{id}' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer <token>'
  -d '{
      "agentName": "string",
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
      "channelsConfigurations": [
        {
          "id": 1,
        },
        {
          "id": 2,
        }
      ],
      "remindersConfigurations": []
  }'
```
{% endtab %}

{% tab title="Python" %}
<pre class="language-python"><code class="lang-python">endpoint = "https://api.hypernative.xyz/custom-agents/{id}"
headers = {
    "Authorization": "Bearer &#x3C;token>",
    "Content-Type": "application/json"
}
payload = {
      "agentName": "string",
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
      "channelsConfigurations": [
        {
          "id": 1,
        },
        {
          "id": 2,
        }
      ],
<strong>      "remindersConfigurations": []
</strong>  }
response = requests.patch(endpoint, headers=headers, json=payload).json()
</code></pre>
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

```json
{
  "agentName": "string",
  "agentType": "string",
  "severity": "Info",
  "muteDuration": 0,
  "state": "enabled",
  "rule": {},
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
  "remindersConfigurations": []
}
```

</details>
