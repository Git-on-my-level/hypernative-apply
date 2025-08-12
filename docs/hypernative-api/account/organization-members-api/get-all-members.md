# 🔵 Get All Members

## Get all organization members

<mark style="color:blue;">`GET`</mark> `https://api.hypernative.xyz/members`

#### Headers

| Name                                           | Type   | Description                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Content-Type<br /><mark style="color:red;">Required</mark> | String | application/json                                                                                                                                                                                                                                                                                                                        |
| x-client-id                                    | String | Required if you use [API Keys](../api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                               |
| x-client-secret                                | String | Required if you use [API Keys](../api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                           |
| authorization                                  | String | <p>Required if you prefer to login with a member's identity. See <a href="../login.md">Login with Email and Password</a> or <a href="../login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |

{% tabs %}
{% tab title="200: OK " %}

{% endtab %}
{% endtabs %}

### Example

#### Request:

{% tabs %}
{% tab title="Curl" %}
```bash
curl -X 'GET'
'https://api.hypernative.xyz/members'
-H 'accept: application/json'
-H 'Content-Type: application/json'
-H 'x-client-id: <API Client ID> \'
  -H 'x-client-secret: <API Client Secret> \'
```
{% endtab %}

{% tab title="Python" %}
```python
endpoint = "https://api.hypernative.xyz/members"
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
    "success": true,
    "data": {
        "results": [
            {
                "id": {id},
                "firstName": "Org",
                "lastName": "Member",
                "email": "org@member.org",
                "organizationId": {organizationId},
                "role": "OrgMember"
            },
            {
                "id": {id},
                "firstName": "Org",
                "lastName": "Viewer",
                "email": "org@viewer.org",
                "organizationId": {organizationId},
                "role": "OrgViewer"
            },
            {
                "id": {id},
                "firstName": "Org",
                "lastName": "Admin",
                "email": "org@admin.com",
                "organizationId": {organizationId},
                "role": "OrgAdmin"
            }
        ],
        "totalCount": 3,
        "remainingCount": 0
    },
    "error": null,
    "version": "2.2.0",
    "service": "hypernative-webapp-server",
    "stackTrace": null
}
```
