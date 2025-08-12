# 🔵 Get Supported Protocols

## Get Protocol List

<mark style="color:blue;">`GET`</mark> `https://api.hypernative.xyz/protocols`

#### Headers

| Name                                     | Type             | Description                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accept<br /><mark style="color:red;">Required</mark> | application/json |                                                                                                                                                                                                                                                                                                                                                         |
| x-client-id                              | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                       |
| x-client-secret                          | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                                   |
| authorization                            | String           | <p>Required if you prefer to login with a member's identity. See <a href="../account/login.md">Login with Email and Password</a> or <a href="../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |

{% tabs %}
{% tab title="200: OK " %}
```json
{
    "data": 
    [
        {
            "chain": "string",
            "name": "string"
        }
    ]
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
'https://api.hypernative.xyz/protocols' \
-H 'accept: application/json' \
-H 'authorization: Bearer <token>'
```
{% endtab %}

{% tab title="Python" %}
```python
endpoint = "https://api.hypernative.xyz/protocols"
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
    "data":
    [
        {
            "chain": "Ethereum",
            "name": "0x"
        },
        {
            "chain": "Ethereum",
            "name": "0xmons"
        }, ...
        {
            "chain": "Ethereum",
            "name": "0xSplits"
        }
    ]
}
```
