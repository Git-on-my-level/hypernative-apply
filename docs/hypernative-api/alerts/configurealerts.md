---
description: Configure alert policy parameters
---

# 🟠 Update Alert Policy

This API is used for configuring alert policy to determine:

* ChannelsConfigurations, List of objects that consists of notification channel id's to send the triggered alert
* Categories that trigger the alerts
* Severities that trigger the alerts

## bind policy to watch list

<mark style="color:purple;">`PATCH`</mark> `https://api.hypernative.xyz/alert-policies/{id}`

#### Headers

| Name                                           | Type   | Description                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| x-client-id                                    | String | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                       |
| x-client-secret                                | String | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                                   |
| authorization                                  | String | <p>Required if you prefer to login with a member's identity. See <a href="../account/login.md">Login with Email and Password</a> or <a href="../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |
| Content-Type<br /><mark style="color:red;">Required</mark> | String | application/json                                                                                                                                                                                                                                                                                                                                        |
| accept<br /><mark style="color:red;">Required</mark>       | String | application/json                                                                                                                                                                                                                                                                                                                                        |

#### Request Body

| Name                   | Type                          | Description                                                                        |
| ---------------------- | ----------------------------- | ---------------------------------------------------------------------------------- |
| channelsConfigurations | \[{id:notificationChannelId}] | List of objects that consists of notification channel id's                         |
| categories             | \[Category]                   | List of [Categories](../parameter-options.md#category-less-than-enum-greater-than) |
| severities             | \[Severity]                   | List of [Severities](../parameter-options.md#severity-less-than-enum-greater-than) |

{% tabs %}
{% tab title="200: OK " %}
```json
{
    "data":
    {
        "id":
        {},
        "channels":
        [
            "Slack",
            "Email",
            "WebHook"
        ],
        "categories":
        [
            "Governance"
        ],
        "severities":
        [
            "High",
            "Medium"
        ],
        "watchlists":
        [
            "string"
        ]
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
  'https://api.hypernative.xyz/alert-policies/186' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'x-client-id: <API Client ID> \'
  -H 'x-client-secret: <API Client Secret> \'
  -d '{
    "channelsConfigurations": [
      {
        "id": 1
      },
      {
        "id": 2
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
        "High",
        "Medium"
    ],
    "typeIds": []
} '
```
{% endtab %}

{% tab title="Python" %}
<pre class="language-python"><code class="lang-python">endpoint = "https://api.hypernative.xyz/alert-policies/186"
headers = {
     "Authorization": "Bearer &#x3C;token>",
     "Content-Type": "application/json"
 }
<strong>payload ={
</strong>    "channelsConfigurations": [
      {
        "id": 1
      },
      {
        "id": 2
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
        "High",
        "Medium"
    ],
    "typeIds": []
}
response = requests.patch(endpoint, json=payload, headers=headers).json()
</code></pre>
{% endtab %}
{% endtabs %}

#### Response:

```json
"data": {
    "id": 186,
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
    "watchlists": [
        200
    ],
    "categories": [
        "Governance",
        "Financial",
        "Technical",
        "Security",
        "Community"
    ],
    "severities": [
        "Medium",
        "High"
    ],
    "typeIds": []
},
```
