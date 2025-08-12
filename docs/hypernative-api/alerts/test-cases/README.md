---
description: Set alerts notification channels for user account
---

# 🟢 Replay Alert

## Test cases - RIIDs

Upon configuring an Alerts channel, it can be tested by adding one of the following assets to a Watchlist and calling the Alert-Replay API with the corresponding Test Case ID.

1\. USYUA5J50XGR - [![](https://app.hypernative.xyz/logo.ico)Hypernative](https://app.hypernative.xyz/risk-insights/explore/USYUA5J50XGR)

* Exploit suspected (M1)
* Asset to add to Watchlist - Ethereum \ 0x27182842e098f60e3d576794a5bffb0777e025d3

2\. CLI2ROM2TSTS - [![](https://app.hypernative.xyz/logo.ico)Hypernative](https://app.hypernative.xyz/risk-insights/explore/CLI2ROM2TSTS)

* Potentially malicious contract (M1)
* Asset to add to Watchlist - Ethereum \ 0x036cec1a199234fc02f72d29e596a09440825f1c

3\. XR1XNOQBYIQE - [![](https://app.hypernative.xyz/logo.ico)Hypernative](https://app.hypernative.xyz/risk-insights/explore/XR1XNOQBYIQE)

* Paired token major depeg up
* Asset to add to Watchlist - Ethereum \ 0x956f47f50a910163d8bf957cf5846d573e7f87ca

4\. OKVUVOXLVLVG - [![](https://app.hypernative.xyz/logo.ico)Hypernative](https://app.hypernative.xyz/risk-insights/explore/OKVUVOXLVLVG)

* Significant value withdrawal
* Asset to add to Watchlist - Ethereum \ 0xea4ba4ce14fdd287f380b55419b1c5b6c3f22ab6

5\. DJQD0EYFAPTT - [![](https://app.hypernative.xyz/logo.ico)Hypernative](https://app.hypernative.xyz/risk-insights/explore/DJQD0EYFAPTT)

* Significant mint
* Asset to add to Watchlist - Polygon \ 0x346404079b3792a6c548b072b9c4dddfb92948d5

6\. 1EPEZTFTGFJT - [![](https://app.hypernative.xyz/logo.ico)Hypernative](https://app.hypernative.xyz/risk-insights/explore/1EPEZTFTGFJT)

* Ownership changed
* Asset to add to Watchlist - Polygon \ 0x7178549f60ba32c6f7d3b41eb22f4f0c3996f3aa

7\. 4MNDDT4TQ2I2 - [![](https://app.hypernative.xyz/logo.ico)Hypernative](https://app.hypernative.xyz/risk-insights/explore/4MNDDT4TQ2I2)

* New DAO proposer
* Asset to add to Watchlist - Ethereum \ 0xc8ee187a5e5c9dc9b42414ddf861ffc615446a2c

## API

<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/alert-replay`

#### Headers

| Name                                           | Type             | Description |
| ---------------------------------------------- | ---------------- | ----------- |
| accept<br /><mark style="color:red;">Required</mark>       | application/json |             |
| Content-Type<br /><mark style="color:red;">Required</mark> | application/json |             |

#### Request Body

| Name                | Type     | Description |
| ------------------- | -------- | ----------- |
| notificationEmail   | \<email> |             |
| notificationWebHook | \<URL>   |             |
| slackWebHook        | \<URL>   |             |
| discordWebHook      | \<URL>   |             |

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
  'https://api.hypernative.xyz/alert-replay' \
  -H 'accept: application/json' \
  -H 'x-client-id: <API Client ID> \'
  -H 'x-client-secret: <API Client Secret> \'
  -H 'Content-Type: application/json' \
  -d '[1]'
  
  \\ data should be an array with number at the range 1-7,
  \\ represents the test cases above
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
