# 🟢 Get Protocol Risk Insights

This API returns all Medium and High Severity Risk Insights for the requested protocols over the last 10 days.

<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/risk-assessments/protocols`

#### Headers

| Name                                           | Type             | Description                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accept<br /><mark style="color:red;">Required</mark>       | application/json |                                                                                                                                                                                                                                                                                                                                                         |
| Content-Type<br /><mark style="color:red;">Required</mark> | application/json |                                                                                                                                                                                                                                                                                                                                                         |
| x-client-id                                    | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                       |
| x-client-secret                                | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                                   |
| authorization                                  | String           | <p>Required if you prefer to login with a member's identity. See <a href="../account/login.md">Login with Email and Password</a> or <a href="../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |

#### Request Body

| Name                                        | Type                 | Description                                                                                              |
| ------------------------------------------- | -------------------- | -------------------------------------------------------------------------------------------------------- |
| protocols<br /><mark style="color:red;">Required</mark> | \[{Protocol, Chain}] | List of {Protocol, Chain} ([see example](../parameter-options.md#addresses-less-than-json-greater-than)) |

{% tabs %}
{% tab title="200: OK " %}
```json
{
  "success": true,
  "data": {...},
  "error": null,
  "version": "2.2.0",
  "service": "hypernative-webapp-server",
  "stackTrace": null
}
```
{% endtab %}
{% endtabs %}

### Example

#### Request:

{% tabs %}
{% tab title="Curl" %}
```bash
  curl -X 'POST' \
  'https://api.hypernative.xyz/risk-assessments/protocols' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'x-client-id: <API Client ID> \'
  -H 'x-client-secret: <API Client Secret> \'
  -d '{
    "protocols": [
      {
        "name": "ACO",
        "chain": "ethereum"
      }
    ]
  }'
```
{% endtab %}

{% tab title="Python" %}
```python
endpoint = "https://api.hypernative.xyz/risk-assessments/protocols"
headers = {
     "x-client-id": <API Client ID>,
  "x-client-secret": <API Client Secret>,
     "Content-Type": "application/json"
 }
payload = {
  "protocols": [
    {
      "name": "ACO",
      "chain": "ethereum"
    }
  ]
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
    "protocols": [
      {
        "chain": "ethereum",
        "systemLabels": [],
        "risksInsights": [
          {
            "id": "4AIU1HKVSSXS",
            "name": "Phishing victim - approval",
            "chain": "bsc",
            "category": "Community",
            "status": "Active",
            "timestamp": "2024-04-17T18:23:44.000Z",
            "severity": "High",
            "details": "An address <0x09c8b01ba237645662ea45258eccf2e1b2cf3055|0x09c8b01ba237645662ea45258eccf2e1b2cf3055> approved transfers to a phishing/scamming address <0x6a38d27d00214c2a098167121862d605fb317433|0x6a38d27d00214c2a098167121862d605fb317433>",
            "involvedAssets": [
              {
                "address": "0x6a38d27d00214c2a098167121862d605fb317433",
                "systemLabels": [],
                "systemLabelsStr": "",
                "type": "Contract",
                "chain": "bsc",
                "involvementType": "Attacker Wallet"
              },
              {
                "address": "0x09c8b01ba237645662ea45258eccf2e1b2cf3055",
                "systemLabels": [],
                "systemLabelsStr": "",
                "type": "Wallet",
                "chain": "bsc",
                "involvementType": "Suspected Victim"
              }
            ],
            "riskTypeId": "A-1925",
            "riskTypeDescription": "An address approved funds to a phishing/scamming address",
            "context": [
              {
                "title": "To",
                "value": "0x6a38d27d00214c2a098167121862d605fb317433"
              },
              {
                "title": "From",
                "value": "0x09c8b01ba237645662ea45258eccf2e1b2cf3055"
              },
              {
                "title": "Value",
                "value": "855073300000000"
              },
              {
                "title": "Status",
                "value": "Success"
              }
            ],
            "txnHash": "0x2810373d4759ab1b2340feb3b985d22695f4dca3062f7e8e4acbd28c4f139353",
            "parentRiId": "4AIU1HKVSSXS",
            "stage": "Undefined",
            "threatIntelReview": "NotReviewed",
          }
        ],
        "name": "ACO"
      }
    ]
  },
  "error": null,
  "version": "2.2.0",
  "service": "hypernative-webapp-server",
  "stackTrace": null
}
```
