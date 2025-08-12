---
description: Update Member's Account Information
---

# 🟠 Update Member

## Update Member

<mark style="color:purple;">`PATCH`</mark> `https://api.hypernative.xyz/members/{id}`

#### Headers

| Name            | Type   | Description                                                                                                                                                                                                                                                                                                                             |
| --------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| x-client-id     | String | Required if you use [API Keys](../api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                               |
| x-client-secret | String | Required if you use [API Keys](../api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                           |
| authorization   | String | <p>Required if you prefer to login with a member's identity. See <a href="../login.md">Login with Email and Password</a> or <a href="../login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |

#### Request Body

| Name             | Type   | Description |
| ---------------- | ------ | ----------- |
| firstName        | string |             |
| lastName         | String |             |
| email            | String |             |
| previousPassword | String |             |
| password         | String |             |
| verifyPassword   | String |             |

{% tabs %}
{% tab title="200: OK " %}

{% endtab %}
{% endtabs %}

### Example

#### Request:

{% tabs %}
{% tab title="Curl" %}
```bash
curl -X 'PATCH' \
  'https://api.hypernative.xyz/members/{id}' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer <token>'
  -d '{
          "firstName": "Org",
          "lastName": "Admin",
          "email": "member@orgmail.io",
          "currentPassword": "password",
          "password": "password",
          "verifyPassword": "password",
    }'
```
{% endtab %}

{% tab title="Python" %}
```python
endpoint = "https://api.hypernative.xyz/members/{id}"
headers = {
    "x-client-id": <API Client ID>,
  "x-client-secret": <API Client Secret>, 
    "Content-Type": "application/json"
    }
payload = {
          "firstName": "Org",
          "lastName": "Admin",
          "email": "member@orgmail.io",
          "currentPassword": "password",
          "password": "password",
          "verifyPassword": "password"
}
response = requests.patch(endpoint, headers=headers, json=payload).json()
```
{% endtab %}
{% endtabs %}

#### Response:

```json
{
    "success": true,
    "data": {
        "id": {id},
        "firstName": "Org",
        "lastName": "Admin",
        "email": "new_member@orgmail.io",
        "organizationId": {organizationId},
        "role": "OrgAdmin"
    },
    "error": null,
    "version": "2.2.0",
    "service": "hypernative-webapp-server",
    "stackTrace": null
}
```
