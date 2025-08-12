# 🟢 Get Associated Organizations

Use this API if you have more than one Organization in Hypernative.&#x20;

This API returns the Organization names and IDs. Later, you can use one of them when you login to the system [using email and password](login.md) or [using Single Sign-On](login-with-single-sign-on.md).



<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/auth/organizations-for-login`

#### Headers

| Name                                           | Type             | Description |
| ---------------------------------------------- | ---------------- | ----------- |
| accept<br /><mark style="color:red;">Required</mark>       | application/json |             |
| Content-Type<br /><mark style="color:red;">Required</mark> | application/json |             |

#### Request Body

If you usually login with **email and password**, please provide the `email` and `password` parameters and set the `type` parameter to `EmailPassword`.

If you usually login with **Single Sign-On**, please provide the `token` parameter and set the `type` parameter to `Token`.

| Name                                   | Type        | Description            |
| -------------------------------------- | ----------- | ---------------------- |
| email                                  | \<email>    |                        |
| password                               | \<password> |                        |
| token                                  | string      | auth0 token            |
| type<br /><mark style="color:red;">Required</mark> | string      | EmailPassword \| Token |

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
{% endtabs %}

### Examples

#### Request - EmailPasword:&#x20;

{% tabs %}
{% tab title="Curl" %}
```bash
 curl -X 'POST' \
  'https://api.hypernative.xyz/auth/organizations-for-login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
      "email": "some@mail.com",
      "password": "password",
      "type":"EmailPassword"
  }'
```
{% endtab %}

{% tab title="Python" %}
```python
 endpoint = "https://api.hypernative.xyz/auth/organizations-for-login"
 headers = {"Content-Type": "application/json"}
 payload = {
     "email": "some@mail.com",
     "password": "password",
     "type":"EmailPassword"
 }
 response = requests.post(endpoint, json=payload, headers=headers).json()
```
{% endtab %}
{% endtabs %}

#### Request - Token:&#x20;

{% tabs %}
{% tab title="Curl" %}
```bash
 curl -X 'POST' \
  'https://api.hypernative.xyz/auth/organizations-for-login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
      "token": "{myAuth0Token}",
      "type":"Token"
  }'
```
{% endtab %}

{% tab title="Python" %}
```python
 endpoint = "https://api.hypernative.xyz/auth/organizations-for-login"
 headers = {"Content-Type": "application/json"}
 payload = {
      "token": "{myAuth0Token}",
      "type":"Token"
 }
 response = requests.post(endpoint, json=payload, headers=headers).json()
```
{% endtab %}
{% endtabs %}

#### Response:&#x20;

```json
{
  "data":
  [
    {
      "organizationId": 1,
      "organizationName": "Hypernative"
    },
    {
      "organizationId": 2,
      "organizationName": "My Other Organization"
    }
  ]
}
```

