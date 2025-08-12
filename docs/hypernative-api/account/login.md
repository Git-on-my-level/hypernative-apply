# 🟢 Login with Email and Password

Note: Hypernative recommends creating a designated **API Key** from its platform. This eliminates the need to use the `login` endpoint; simply provide the Client ID and Client Secret for all API calls.

<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/auth/login`

### Request Headers

| Name                                           | Type             | Description |
| ---------------------------------------------- | ---------------- | ----------- |
| accept<br /><mark style="color:red;">Required</mark>       | application/json |             |
| Content-Type<br /><mark style="color:red;">Required</mark> | application/json |             |

### Request Body

| Name                                       | Type        | Description                                                                                                                                                                                                                             |
| ------------------------------------------ | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| email<br /><mark style="color:red;">Required</mark>    | \<email>    |                                                                                                                                                                                                                                         |
| password<br /><mark style="color:red;">Required</mark> | \<password> |                                                                                                                                                                                                                                         |
| organizationId                             | number      | If you have more than one Organization in Hypernative, you must include the specific Organization ID. See [Get Associated Organizations](get-associated-organizations.md) to retrieve the list of the organizations that you belong to. |

### Response

{% tabs %}
{% tab title="200: OK " %}
```json
{
    "data":
    {
        "token": "string",
        "refreshToken": "string"
    }
}
```
{% endtab %}

{% tab title="400: Error" %}
```json
{
  "success": false,
  "data": null,
  "error": "organizationId is mandatory",
  "errorCode": 1002,
  "version": "2.2.0",
  "service": "hypernative-webapp-server"
}
```
{% endtab %}
{% endtabs %}

### Example

#### Request:&#x20;

{% tabs %}
{% tab title="Curl" %}
```bash
 curl -X 'POST' \
  'https://api.hypernative.xyz/auth/login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
      "email": "some@mail.com",
      "password": "password",
      "organizationId": 1
  }'
```
{% endtab %}

{% tab title="Python" %}
```python
 endpoint = "https://api.hypernative.xyz/auth/login"
 headers = {"Content-Type": "application/json"}
 payload = {
     "email": "some@mail.com",
     "password": "password",
     "organizationId": 1
 }
 response = requests.post(endpoint, json=payload, headers=headers).json()
```
{% endtab %}
{% endtabs %}

#### Response:&#x20;

```json
{
    "data":
    {
        "token": "<token>"
    }
}
```
