# 🟢 Get Address Risk Insights

This API returns all Medium and High Severity Risk Insights for the requested addresses over the last 10 days.

<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/risk-assessments/addresses`

#### Headers

| Name                                           | Type             | Description                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accept<br /><mark style="color:red;">Required</mark>       | application/json |                                                                                                                                                                                                                                                                                                                                                         |
| Content-Type<br /><mark style="color:red;">Required</mark> | application/json |                                                                                                                                                                                                                                                                                                                                                         |
| x-client-id                                    | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                       |
| x-client-secret                                | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                                   |
| authorization                                  | String           | <p>Required if you prefer to login with a member's identity. See <a href="../account/login.md">Login with Email and Password</a> or <a href="../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |

#### Request Body

| Name                                        | Type                | Description                                                                                             |
| ------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------- |
| addresses<br /><mark style="color:red;">Required</mark> | \[{Address, Chain}] | List of {Address, Chain} ([see example](../parameter-options.md#addresses-less-than-json-greater-than)) |

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
  'https://api.hypernative.xyz/risk-assessments/addresses' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'x-client-id: <API Client ID> \'
  -H 'x-client-secret: <API Client Secret> \'
  -d '{
    "addresses": [
      {
        "address": "0xfde0d1575ed8e06fbf36256bcdfa1f359281455a",
        "chain": "ethereum"
      }
    ]
  }'
```
{% endtab %}

{% tab title="Python" %}
```python
endpoint = "https://api.hypernative.xyz/risk-assessments/addresses"
headers = {
     "x-client-id": <API Client ID>,
  "x-client-secret": <API Client Secret>,
     "Content-Type": "application/json"
 }
payload = {
  "addresses": [
    {
      "address": "0xfde0d1575ed8e06fbf36256bcdfa1f359281455a",
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
    "contracts": [
      {
        "chain": "ethereum",
        "systemLabels": [],
        "risksInsights": [
          {
            "id": "LBICSL2JHAPZ",
            "name": "Exploit suspected (M2)",
            "chain": "ethereum",
            "category": "Security",
            "status": "Active",
            "timestamp": "2024-04-17T15:33:23.000Z",
            "severity": "High",
            "details": "Exploit detected ($27073) from wallet <0xfde0d1575ed8e06fbf36256bcdfa1f359281455a|0xfde0d1575ed8e06fbf36256bcdfa1f359281455a>. Suspected Victim <Uniswap V3: USDC 3|0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640>. Approximate value compromised: $27073 and a suspected Heist Wallet <MEV Builder: 0x22...d5f|0x229b8325bb9ac04602898b7e8989998710235d5f>",
            "involvedAssets": [
              {
                "address": "0xfde0d1575ed8e06fbf36256bcdfa1f359281455a",
                "systemLabels": [],
                "systemLabelsStr": "",
                "type": "Contract",
                "chain": "ethereum",
                "involvementType": "Attacker Wallet"
              }
            ],
            "riskTypeId": "A-4102",
            "riskTypeDescription": "A suspected exploit was detected by Hypernative models (M2). Suggested action: review the impacted assets.",
            "context": [
              {
                "title": "To",
                "value": "0x6980a47bee930a4584b09ee79ebe46484fbdbdd0"
              },
              {
                "title": "From",
                "value": "0xfde0d1575ed8e06fbf36256bcdfa1f359281455a"
              },
              {
                "title": "Score",
                "value": "0.6379842758178711"
              },
              {
                "title": "Value",
                "value": "992"
              }
            ],
            "txnHash": "0xa9d6a95c537f075062887be02f10576f65157c4222b4dc8491592688b4273b8f",
            "parentRiId": "LBICSL2JHAPZ",
            "stage": "Undefined",
            "threatIntelReview": "NotReviewed",
          },
        ],
        "address": "0xfde0d1575ed8e06fbf36256bcdfa1f359281455a",
        "deployedBy": "",
        "deploymentDate": "",
        "contractProtocol": ""
      }
    ]
  },
  "error": null,
  "version": "2.2.0",
  "service": "hypernative-webapp-server",
  "stackTrace": null
}
```
