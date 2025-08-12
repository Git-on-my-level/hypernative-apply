# 🟢 Add Member

## Add Member

<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/members/add-member`

#### Headers

| Name                                           | Type   | Description                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Content-Type<br /><mark style="color:red;">Required</mark> | String | application/json                                                                                                                                                                                                                                                                                                                        |
| x-client-id                                    | String | Required if you use [API Keys](../api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                               |
| x-client-secret                                | String | Required if you use [API Keys](../api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                           |
| authorization                                  | String | <p>Required if you prefer to login with a member's identity. See <a href="../login.md">Login with Email and Password</a> or <a href="../login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |

#### Request Body

| Name           | Type   | Description |
| -------------- | ------ | ----------- |
| firstName      | String |             |
| lastName       | String |             |
| email          | String |             |
| password       | String |             |
| verifyPassword | String |             |
| role           | String |             |

{% tabs %}
{% tab title="200: OK " %}

{% endtab %}
{% endtabs %}

### Example

#### Request:

{% tabs %}
{% tab title="Curl" %}
```bash
  curl -X 'POST' \
  '
  https://api.hypernative.xyz/members/add-member' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'x-client-id: <API Client ID> \'
  -H 'x-client-secret: <API Client Secret> \'
  -d '{
    "firstName": "new",
    "lastName": "user",
    "email": "new@user.com",
    "password": "password", 
    "verifyPassword": "password", 
    "role": "OrgMember"
    }'
```
{% endtab %}

{% tab title="Python" %}
```python
endpoint = "https://api.hypernative.xyz/members/add-member "
headers={
  "x-client-id": <API Client ID>,
  "x-client-secret": <API Client Secret>,
  "Content-Type": "application/json"
}
payload ={
    "firstName": "new",
    "lastName": "user",
    "email": "new@user.com",
    "password": "password", 
    "verifyPassword": "password", 
    "role": "OrgMember"
    }
response = requests.post(endpoint, json=payload, headers=headers).json()
```
{% endtab %}
{% endtabs %}

#### Response:

```json
{
    "success": true,
    "data": {
        "id": {id},
        "firstName": "new",
        "lastName": "user",
        "email": "new@user.com",
        "organizationId": {organizationId},
        "role": "OrgMember"
    },
    "error": null,
    "version": "2.2.0",
    "service": "hypernative-webapp-server",
    "stackTrace": null
}
```
