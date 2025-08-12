# 🟢 Reset Password

## Reset Password

<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/members/{}/reset-password`

#### Headers

| Name                                            | Type   | Description      |
| ----------------------------------------------- | ------ | ---------------- |
| Content-Type<br /><mark style="color:red;">Required</mark>  | String | application/json |
| Authorization<br /><mark style="color:red;">Required</mark> | String | Bearer \<token>  |

#### Request Body

| Name                                             | Type   | Description |
| ------------------------------------------------ | ------ | ----------- |
| password<br /><mark style="color:red;">Required</mark>       | String |             |
| verifyPassword<br /><mark style="color:red;">Required</mark> | String |             |

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
  https://api.hypernative.xyz/members/{id}/reset-password' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'x-client-id: <API Client ID> \'
  -H 'x-client-secret: <API Client Secret> \'
  -d '{"password": "password", "verifyPassword": "password"}'
```
{% endtab %}

{% tab title="Python" %}
```python
endpoint = "https://api.hypernative.xyz/members/{id}/reset-password"
headers={
  "x-client-id": <API Client ID>,
  "x-client-secret": <API Client Secret>,
  "Content-Type": "application/json"
}
payload =
{
    "password": "password", 
    "verifyPassword": "password"
    }
response = requests.post(endpoint, json=payload, headers=headers).json()
```
{% endtab %}
{% endtabs %}

#### Response:

```json
{
    "success": true,
    "error": null,
    "version": "2.2.0",
    "service": "hypernative-webapp-server",
    "stackTrace": null
}
```
