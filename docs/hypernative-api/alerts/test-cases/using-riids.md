# Using RIIDs

After setting up an Alerts channel, you can test it by selecting an asset from the "involved assets" array of a specific Risk Insight. Add this asset to a Watchlist and invoke the Alert-Replay API using the associated RIID, provided the Risk Insight's severity is either Medium or High.

For example, for this RIID - USYUA5J50XGR - [![](https://app.hypernative.xyz/logo.ico)Hypernative](https://app.hypernative.xyz/risk-insights/explore/USYUA5J50XGR)

add this Asset to a Watchlist - Ethereum \ 0x27182842e098f60e3d576794a5bffb0777e025d3

## API

<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/alert-replay/ri-id`

#### Headers

| Name                                           | Type             | Description |
| ---------------------------------------------- | ---------------- | ----------- |
| accept<br /><mark style="color:red;">Required</mark>       | application/json |             |
| Content-Type<br /><mark style="color:red;">Required</mark> | application/json |             |

#### Request Body

| Name                               | Type     | Description    |
| ---------------------------------- | -------- | -------------- |
| <br /><mark style="color:red;">Required</mark> | \<array> | array of RIIDs |

{% tabs %}
{% tab title="200: OK " %}
```json
{
  "id": 0,
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "notificationEmail": "string",
  "notificationWebHook": "string",
  "slackWebHook": "string",
  "discordWebHook": "string",
  "phoneNumber": "string",
  "image": "string"
}
```
{% endtab %}
{% endtabs %}

### Example

#### Request:

{% tabs %}
{% tab title="Curl" %}
```bash
$ curl -X 'POST' \
  'https://api.hypernative.xyz/alert-replay/ri-id' \
  -H 'accept: application/json' \
  -H 'x-client-id: <API Client ID> \'
  -H 'x-client-secret: <API Client Secret> \'
  -H 'Content-Type: application/json' \
  -d '[
  "USYUA5J50XGR"
]'
  
  \\ data should be an array of RIIDs
```
{% endtab %}
{% endtabs %}

#### Response:

```json
{
    "success": true,
    "data": "ok"
}
```
