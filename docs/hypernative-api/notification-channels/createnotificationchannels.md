# 🟢 Create Channel

## Create a new Notification Channel

<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/notification-channels`

the body is an array of objects that consists of name, type and configuration

#### Headers

| Name                                            | Type             | Description                                                                                                                                                                                                                                                                                                                                             |
| ----------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| authorization<br /><mark style="color:red;">Required</mark> | Bearer \<token>  | <p>Required if you prefer to login with a member's identity. See <a href="../account/login.md">Login with Email and Password</a> or <a href="../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |
| Content-Type<br /><mark style="color:red;">Required</mark>  | application/json |                                                                                                                                                                                                                                                                                                                                                         |
| accept<br /><mark style="color:red;">Required</mark>        | application/json |                                                                                                                                                                                                                                                                                                                                                         |

#### Request Body

| Name                                            | Type   | Description                                                                                                                                                                                                                        |
| ----------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type<br /><mark style="color:red;">Required</mark>          | string | Email \| Slack \| Discord \| Telegram \| Webhook \| Defender \| PagerDuty                                                                                                                                                          |
| name<br /><mark style="color:red;">Required</mark>          | string | Notification Channel name                                                                                                                                                                                                          |
| configuration<br /><mark style="color:red;">Required</mark> | object | <p>value:string</p><p>notificationStructure?:array of objects - <a href="changing-the-notification-structure.md">learn more</a></p><p>for webhooks - headers is optional</p><p>example:</p><p>[{ key: string ,value: string }]</p> |

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
<pre class="language-bash"><code class="lang-bash"><strong> curl -X 'POST' \
</strong>  'https://api.hypernative.xyz/notification-channels' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'authorization: Bearer &#x3C;token>' \
    -d '[
  {
    "name": "myWebhook",
    "type": "Webhook",
    "configuration": {
      "value": "https://myWebhook.com",
      "headers":[{key:"header1",value:"value1"},{key:"header2",value:"value2"}]
    }
  }
]'
</code></pre>
{% endtab %}

{% tab title="Python" %}
```python
endpoint="https://api.hypernative.xyz/notification-channels"
headers={
    "x-client-id": <API Client ID>,
  "x-client-secret": <API Client Secret>,
    "Content-Type": "application/json"
}
payload=[
  {
    "name": "myWebhook",
    "type": "Webhook",
    "configuration": {
      "value": "https://myWebhook.com",
      "headers":[{key:"header1",value:"value1"},{key:"header2",value:"value2"}]
    }
  }
]
response = requests.post(endpoint, json = payload, headers = headers).json()
```
{% endtab %}
{% endtabs %}

#### Response:

```json
{
    "data": [
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
    ]
}
```
