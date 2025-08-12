# 🟢 Login with Single Sign-On

Note: Hypernative recommends creating a designated **API Key** from its platform. This eliminates the need to use the `login-auth0` endpoint; simply provide the Client ID and Client Secret for all API calls.

<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/auth/login-auth0`

### Request Headers

| Name                                           | Type             | Description |
| ---------------------------------------------- | ---------------- | ----------- |
| accept<br /><mark style="color:red;">Required</mark>       | application/json |             |
| Content-Type<br /><mark style="color:red;">Required</mark> | application/json |             |

### Request Body

| Name                                    | Type   | Description                                                                                                                                                                                                                             |
| --------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token<br /><mark style="color:red;">Required</mark> | string |                                                                                                                                                                                                                                         |
| organizationId                          | number | If you have more than one Organization in Hypernative, you must include the specific Organization ID. See [Get Associated Organizations](get-associated-organizations.md) to retrieve the list of the organizations that you belong to. |

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
  'https://api.hypernative.xyz/auth/login-auth0' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "token": "{myAuth0Token}",
  "organizationId": 1
}'
```
{% endtab %}

{% tab title="Python" %}
<pre class="language-python"><code class="lang-python"> endpoint = "https://api.hypernative.xyz/auth/login-auth0"
 headers = {"Content-Type": "application/json"}
 payload = {
<strong>  "token": "{myAuth0Token}",
</strong>  "organizationId": 1
 }
 response = requests.post(endpoint, json=payload, headers=headers).json()
</code></pre>
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

