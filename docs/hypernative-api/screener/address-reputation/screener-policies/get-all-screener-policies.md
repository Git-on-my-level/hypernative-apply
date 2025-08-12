# 🔵 Get All Screener Policies

## Retrieve all Screener Policies linked to the currently logged-in user.

<mark style="color:blue;">`GET`</mark> `https://api.hypernative.xyz/screener/policies`

#### Headers

| Name                                           | Type             | Description                                                                                                                                                                                                                                                                                                                                                         |
| ---------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accept<br /><mark style="color:red;">Required</mark>       | application/json |                                                                                                                                                                                                                                                                                                                                                                     |
| Content-Type<br /><mark style="color:red;">Required</mark> | application/json |                                                                                                                                                                                                                                                                                                                                                                     |
| x-client-id                                    | String           | Required if you use [API Keys](../../../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                             |
| x-client-secret                                | String           | Required if you use [API Keys](../../../account/api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                                         |
| authorization                                  | String           | <p>Required if you prefer to login with a member's identity. See <a href="../../../account/login.md">Login with Email and Password</a> or <a href="../../../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |

### Example

#### Request:

{% tabs %}
{% tab title="Curl" %}
```bash
curl -X 'GET' \
  'https://api.hypernative.xyz/screener/policies' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer <token>'
```
{% endtab %}
{% endtabs %}
