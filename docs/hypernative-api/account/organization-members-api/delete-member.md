# 🔴 Delete Member

## Delete Member

<mark style="color:red;">`DELETE`</mark> `https://api.hypernative.xyz/members/{}`

#### Headers

| Name                                            | Type   | Description      |
| ----------------------------------------------- | ------ | ---------------- |
| Content-Type<br /><mark style="color:red;">Required</mark>  | String | application/json |
| Authorization<br /><mark style="color:red;">Required</mark> | String | Bearer \<token>  |

{% tabs %}
{% tab title="200: OK " %}

{% endtab %}
{% endtabs %}

### Example

#### Request:

{% tabs %}
{% tab title="Curl" %}
```bash
curl -X 'DELETE' \
  'https://api.hypernative.xyz/members/{id}' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer <token>'
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
response = requests.delete(endpoint, headers=headers).json()
```
{% endtab %}
{% endtabs %}

#### Response:

```
No Content at the moment 
```
