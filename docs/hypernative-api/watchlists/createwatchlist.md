# 🟢 Add Watchlist

## Create new watchlist

<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/watchlists`

| Name                                           | Type             | Description                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Content-Type<br /><mark style="color:red;">Required</mark> | application/json |                                                                                                                                                                                                                                                                                                                                                         |
| accept<br /><mark style="color:red;">Required</mark>       | application/json |                                                                                                                                                                                                                                                                                                                                                         |
| x-client-id                                    | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                       |
| x-client-secret                                | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                                   |
| authorization                                  | String           | <p>Required if you prefer to login with a member's identity. See <a href="../account/login.md">Login with Email and Password</a> or <a href="../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |

#### Request Body

| Name                                   | Type           | Description           |
| -------------------------------------- | -------------- | --------------------- |
| description                            | \<description> | Watchlist description |
| name<br /><mark style="color:red;">Required</mark> | \<name>        | Watchlist name        |

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
</strong>  'https://api.hypernative.xyz/watchlists' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'x-client-id: &#x3C;API Client ID> \'
  -H 'x-client-secret: &#x3C;API Client Secret> \'
    -d '{
  "name": "My New Watchlist",
  "description": "My whitelist assets"
  }'
</code></pre>
{% endtab %}

{% tab title="Python" %}
```python
endpoint="https://api.hypernative.xyz/watchlists"
headers={
    "x-client-id": <API Client ID>,
  "x-client-secret": <API Client Secret>,
    "Content-Type": "application/json"
}
payload={
    "name": "My New Watchlist",
    "description": "My whitelist assets"
}
response = requests.post(endpoint, json = payload, headers = headers).json()
```
{% endtab %}
{% endtabs %}

#### Response:

```json
{
    "data": {
        "id": 55,
        "name": "My New Watchlist",
        "description": "My whitelist assets",
        "createdAt": "2022-10-20T08:40:52.985Z",
        "updatedAt": "2022-10-20T08:40:52.985Z",
        "createdByUserId": 8,
        "createdBy": "My user name",
        "alertPolicies": [{
                "id": 43,
                "channelsConfigurations": []
                "watchlists": [55],
                "categories": ["Governance", "Financial", "Technical", "Security", "Community"],
                "severities": ["High"]
            }
        ]
    }
}
```
