# 🟠 Update Channel

## Update Notification Channel

<mark style="color:purple;">`PATCH`</mark> `https://api.hypernative.xyz/notification-channels/{id}`

#### Headers

| Name                                           | Type             | Description                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Content-Type<br /><mark style="color:red;">Required</mark> | application/json |                                                                                                                                                                                                                                                                                                                                                         |
| accept<br /><mark style="color:red;">Required</mark>       | application/json |                                                                                                                                                                                                                                                                                                                                                         |
| x-client-id                                    | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                       |
| x-client-secret                                | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                                   |
| authorization                                  | String           | <p>Required if you prefer to login with a member's identity. See <a href="../account/login.md">Login with Email and Password</a> or <a href="../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |

#### Request Body

| Name          | Type   | Description                                                                                                                                                                                                                        |
| ------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type          | string | Email \| Slack \| Discord \| Telegram \| Webhook \| Defender \| PagerDuty                                                                                                                                                          |
| name          | string | Notification Channel name                                                                                                                                                                                                          |
| configuration | object | <p>value:string</p><p>notificationStructure?:array of objects - <a href="changing-the-notification-structure.md">learn more</a></p><p>for webhooks - headers is optional</p><p>example:</p><p>[{ key: string ,value: string }]</p> |

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
  'https://api.hypernative.xyz/notification-channels/{id}' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'x-client-id: <API Client ID> \'
  -H 'x-client-secret: <API Client Secret> \'
    -d '  {
    "configuration": {
      "value": "https://myWebhook1.com",
      "headers":[{key:"header2",value:"value2"}]
    }
  }'
```
{% endtab %}

{% tab title="Python" %}
```python
endpoint = "https://api.hypernative.xyz/notification-channels/{id}"
headers = {
     "x-client-id": <API Client ID>,
  "x-client-secret": <API Client Secret>,
     "Content-Type": "application/json"
 }
payload = {
    "configuration": {
      "value": "https://myWebhook1.com",
      "headers":[{key:"header2",value:"value2"}]
    }
  }
response = requests.patch(endpoint, json=payload, headers=headers).json()
```
{% endtab %}
{% endtabs %}

#### Response:

```json
{
    "data": {
        "id": 51,
        "name": "myWebhook",
        "type": "Webhook",
        "configuration": {
            "value": "https://myWebhook1.com",
            "headers": [
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
}
```
