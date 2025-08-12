# 🟢 Get All Alerts

## Get Alerts

<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/alerts`

#### Headers

| Name                                                      | Type             | Description                                                                                                                                                                                                                                                                                                                                             |
| --------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <p>accept<br><mark style="color:red;">Required</mark></p> | application/json |                                                                                                                                                                                                                                                                                                                                                         |
| x-client-id                                               | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                       |
| x-client-secret                                           | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                                   |
| authorization                                             | String           | <p>Required if you prefer to login with a member's identity. See <a href="../account/login.md">Login with Email and Password</a> or <a href="../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |

#### Request Body

| Name            | Type   | Description                |
| --------------- | ------ | -------------------------- |
| severities      | List   | \[ "High", "Low"]          |
| addresses       | String |                            |
| protocols       | List   |                            |
| types           | List   |                            |
| sortDirection   | String | Desc                       |
| sortBy          | String | Timestamp                  |
| offset          | int    | 0                          |
| limit           | int    |                            |
| categories      | List   | \["Security", "Technical"] |
| chains          | List   |                            |
| systemAlertTags | List   | \["Unimportant", "Read"]   |
| customAgentIds  | List   |                            |
| watchlistIds    | List   |                            |
| fromDate        | String | "2025-06-29T08:02:35.124Z" |
| toDate          | String | "2025-06-30T08:02:35.124Z" |

> **Note:** If only a date (e.g., "2025-06-29") is provided for `fromDate` or `toDate`, it defaults to "00:00:00.000" for `fromDate` and "23:59:59.999" for `toDate`.

{% tabs %}
{% tab title="200: OK " %}
```json
{
    "data": 
    [
        {
            "chain": "string",
            "name": "string"
        }
    ]
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
'ttps://api.hypernative.xyz/alerts' \
-H 'accept: application/json' \
-H 'x-client-id: <API Client ID> \'
-H 'x-client-secret: <API Client Secret> \'
-d ' {
        "severities": [],
        "chains": [],
        "categories": [],
        "limit": 20,
        "offset": 0,
        "sortBy": "Timestamp",
        "sortDirection": "Desc",
        "fromDate":"2025-06-23T00:00:00.000Z",
        "toDate":"2025-06-30T08:07:09.179Z"
        "types": [],
        "protocols": [],
        "addresses": [],
        "systemAlertTags": [
            "All"
        ],
        "watchlistIds": [],
        "customAgentIds": []
}'
```
{% endtab %}

{% tab title="Python" %}
```python
url = "https://api.hypernative.xyz/alerts"
headers = {
    "x-client-id": <API Client ID>,
    "x-client-secret": <API Client Secret>,
    "Content-Type": "application/json"
}
payload = {
        "severities": [],
        "chains": [],
        "categories": [],
        "limit": 20,
        "offset": 0,
        "sortBy": "Timestamp",
        "sortDirection": "Desc",
        "fromDate":"2025-06-23T00:00:00.000Z",
        "toDate":"2025-06-30T08:07:09.179Z"
        "types": [],
        "protocols": [],
        "addresses": [],
        "systemAlertTags": [
            "All"
        ],
        "watchlistIds": [],
        "customAgentIds": []
}
response = requests.post(url, headers=headers, json=payload).json()
```
{% endtab %}
{% endtabs %}

#### Response:

```json
{
    "success": true,
    "data": [
      {
      "id": "H5FSEIFM34OM",
      "chain": "optimism",
      "name": "Phishing approval - funds at risk",
      "category": "Community",
      "status": "Active",
      "timestamp": "2025-06-25T07:05:29.000Z",
      "severity": "High",
      "details": "Approval to phishing: value at risk = 4248.709 Bridged USDT ($4.3K). Potential victim <0xa4a681f5eeb6acfa1a3c0f0bcdc17217511c548b|0xa4a681f5eeb6acfa1a3c0f0bcdc17217511c548b> approved to a phishing/scamming address <0x948627f5c0352f320b284a2a9dbb92933866995d|0x948627f5c0352f320b284a2a9dbb92933866995d>",
      "involvedAssets": [
        {
          "address": "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58",
          "alias": "Tether USD",
          "type": "Contract",
          "chain": "optimism",
          "involvementType": "Destination"
        },
        {
          "address": "0x948627f5c0352f320b284a2a9dbb92933866995d",
          "type": "Wallet",
          "chain": "optimism",
          "involvementType": "Scammer, Origin"
        },
        {
          "address": "0xa4a681f5eeb6acfa1a3c0f0bcdc17217511c548b",
          "type": "Wallet",
          "chain": "optimism",
          "involvementType": "Suspected Victim"
        },
        {
          "name": "Hop Protocol core",
          "type": "Protocol",
          "chain": "optimism",
          "involvementType": "Protocol, Destination"
        }
      ],
      "riskTypeId": "A-19251",
      "riskTypeDescription": "Approval to a phishing/scamming address, with current funds at risk >$50",
      "txnHash": "0x8b41cd7cfed0128ced37e8df2c9eb46244659e24c923ca525e36eb366d1cf3ea",
      "stage": "Undefined",
      "parentRiId": "H5FSEIFM34OM",
      "context": [
        {
          "title": "To",
          "value": "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58"
        },
        {
          "title": "From",
          "value": "0x948627f5c0352f320b284a2a9dbb92933866995d"
        },
        {
          "title": "Value",
          "value": "0"
        },
        {
          "title": "Amount",
          "value": "4248.708951"
        },
        {
          "title": "Status",
          "value": "Success"
        },
        {
          "title": "Txn Hash",
          "value": "0x8b41cd7cfed0128ced37e8df2c9eb46244659e24c923ca525e36eb366d1cf3ea"
        },
        {
          "title": "Timestamp",
          "value": "2025-06-25T07:05:29Z"
        },
        {
          "title": "Is Reorged",
          "value": "false"
        },
        {
          "title": "Token Name",
          "value": "Bridged USDT"
        },
        {
          "title": "Scammer Hop",
          "value": "0"
        },
        {
          "title": "Block Number",
          "value": "137618176"
        },
        {
          "title": "Tx Initiator",
          "value": "0x948627f5c0352f320b284a2a9dbb92933866995d"
        },
        {
          "title": "Amount In Usd",
          "value": "4257.206259501116"
        },
        {
          "title": "Token Address",
          "value": "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58"
        },
        {
          "title": "Scammer Source",
          "value": "malicious_permit"
        },
        {
          "title": "Amount Approved",
          "value": "74502.11405"
        },
        {
          "title": "Transaction Fee",
          "value": "4.3146531752e-8"
        },
        {
          "title": "Full Involved Assets",
          "value": "[\n  {\n    \"type\": \"contract\",\n    \"chain\": \"optimism\",\n    \"address\": \"0x94b008aa00579c1307b0ef2c499ad98a8ce58e58\",\n    \"involvement\": \"destination\",\n    \"system_labels\": [\n      \"USDT\",\n      \"Tether USD\",\n      \"Token Contract\",\n      \"stablecoin\",\n      \"Tether USD (USDT)\",\n      \"token-contract\"\n    ],\n    \"alias\": \"Tether USD\"\n  },\n  {\n    \"type\": \"wallet\",\n    \"chain\": \"optimism\",\n    \"address\": \"0x948627f5c0352f320b284a2a9dbb92933866995d\",\n    \"involvement\": \"scammer, origin\",\n    \"system_labels\": []\n  },\n  {\n    \"type\": \"wallet\",\n    \"chain\": \"optimism\",\n    \"address\": \"0xa4a681f5eeb6acfa1a3c0f0bcdc17217511c548b\",\n    \"involvement\": \"suspected_victim\",\n    \"system_labels\": []\n  }\n]"
        }
      ],
      "threatIntelReview": "NotReviewed",
      "alertId": 000000000,
      "isRead": false,
      "isImportant": false,
      "isDismissed": false,
      "triggeredByAssets": [
        {
          "chain": "optimism",
          "address": "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58",
          "name": null,
          "type": "Contract",
          "alias": "Tether USD",
          "id": 111111,
          "watchlistId": 000000,
          "watchlistName": "Watchlist1"
        }
      ],
      "triggeredByCustomAgents": []
    }
}
```
