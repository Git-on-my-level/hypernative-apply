# 🔵 Get Incidents

## Get Incidents

<mark style="color:blue;">`GET`</mark> `https://api.hypernative.xyz/incidents`

#### Query Parameters

| Name      | Type | Description             |
| --------- | ---- | ----------------------- |
| startTime | Date | 2023-11-01T00:00:00Z    |
| queryType |      | updateTime/incidentTime |
| endTime   | Date | 2023-11-11T00:00:00Z    |

#### Headers

| Name                                           | Type             | Description |
| ---------------------------------------------- | ---------------- | ----------- |
| accept<br /><mark style="color:red;">Required</mark>       | application/json |             |
| Content-Type<br /><mark style="color:red;">Required</mark> | application/json |             |

{% tabs %}
{% tab title="200: OK " %}

{% endtab %}
{% endtabs %}

### Example

#### Request:

{% tabs %}
{% tab title="Curl" %}
```bash
  curl \
  'https://api.hypernative.xyz/incidents?startTime=2023-12-01T00%3A00%3A00Z&endTime=2023-12-14T00%3A00%3A00Z&queryType=updateTime' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <token>'
```
{% endtab %}

{% tab title="Python" %}
```python
endpoint = "https://api.hypernative.xyz/incidents"
headers = {
    "x-client-id": <API Client ID>,
  "x-client-secret": <API Client Secret>,
    "Content-Type": "application/json"
}
params={"startTime": "2023-12-01T00:00:00Z",
        "endTime": "2023-12-14T00:00:00Z",
        "queryType": "updateTime"}
        
response = requests.get(endpoint, params=params, headers=headers).json() 
```
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

```json
{
  "success": true,
  "data": [
    {
      "incidentName": "2023.05.28 - Jimbos",
      "urlSuffix": "2023.05.28-jimbos",
      "description": "On 2023.05.28, the Jimbos protocol was exploited in a price manipulation attack. Leveraging flashloans, the attacker was able to disrupt the token balance in the liquidity pool, enabling them to obtain 4048 ETH, equivalent to approximately $7.7 Million. The stolen funds were bridged to Ethereum and are being held in one of the attacker's addresses at the time of writing. Our platform detected the attack on Jimbos Protocol with a 7 minutes early warning before the first hack transaction.",
      "incidentDate": "2023-05-28T00:00:00Z",
      "chains": [
        "arbitrum",
        "ethereum",
        "bsc"
      ],
      "protocols": [
        "Jimbos"
      ],
      "eventType": "Exploit",
      "impactedAssets": 7700000,
      "externalResources": [
        "https://twitter.com/HypernativeLabs/status/1662702937200533504?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1662702937200533504%7Ctwgr%5Ee1b914ff84b2c482f9af173445767b1f06940ca3%7Ctwcon%5Es1_&ref_url=https%3A%2F%2Fcdn.iframe.ly%2FZDsZSlC%3Fapp%3D1",
        "https://rekt.news/jimbo-rekt/",
        "https://neptunemutual.com/blog/understanding-jimbos-protocol-exploit/?_branch_match_id=1065933261087468840&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXz8nMy9bLTU3JLM3VS87P1Xf2LXTKSExOz3BMAgDgOKXjIwAAAA%3D%3D"
      ],
      "savedQuery": "https://app.hypernative.xyz/risk-insights/explore?query=3e4220ca-9b7f-4fe4-8596-84a151052ade",
      "addresses": {
        "other": [],
        "victims": [
          {
            "address": "0x271944d9D8CA831F7c0dBCb20C4ee482376d6DE7",
            "chain": "arbitrum",
            "alias": "JimboController"
          },
          {
            "address": "0xC3813645Ad2Ea0AC9D4d72D77c3755ac3B819e38",
            "chain": "arbitrum",
            "alias": "TURBOJIMBO"
          }
        ],
        "suspects": [
          {
            "address": "0x102be4bccc2696c35fd5f5bfe54c1dfba416a741",
            "chain": "arbitrum",
            "alias": "Jimbos Protocol Exploiter (Arbitrum)"
          }
        ]
      },
            "transactions": [
        {
          "chain": "bsc",
          "txHash": "0x0d34d09404f8528d1c970a53a51c07d42e522bf66fb30c3cdd0be5874d09dc29"
        },
        {
          "chain": "arbitrum",
          "txHash": "0x52e4b95787e3f856f10e0fe356522aa127851a1840f758eeb620bd0deef930bd"
        }
      ],
      "riskInsights": [
        {
          "riId": "ILHUL4TPZKKA",
          "riType": "Receiving funds from a mixer (A-3901)"
        },
        {
          "riId": "TH311MRW5BAD",
          "riType": "Interaction with an OFAC-sanctioned address (A-2010)"
        }
      ],
      "createdAt": "2023-12-13T11:44:03Z",
      "updatedAt": "2023-12-13T11:44:03Z",
      "displayName": "2023.05.28 - Jimbos",
      "id": 13,
      "status": null
    }
  ],
  "error": null
}
```

</details>
