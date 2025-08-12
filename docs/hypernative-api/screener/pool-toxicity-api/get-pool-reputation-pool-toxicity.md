# Get Pool Reputation ("Pool Toxicity")

### Pool Toxicity API

The Pool Toxicity API leverages Screener data to analyze the reputation of liquidity pools and their participants, enabling risk assessment for DeFi interactions, according to user-defined Pool Toxicity Policies.

### Endpoints

#### Get LP Pool Toxicity

Analyze the toxicity of a liquidity pool based on its liquidity providers.

<mark style="color:green;">`POST`</mark>  `https://api.hypernative.xyz/screener/pool-toxicity/reputation/lp`

### Request Headers

| Header            | Type             | Description                                      |
| ----------------- | ---------------- | ------------------------------------------------ |
| Content-Type\*    | application/json |                                                  |
| x-client-id\*     | String           | Client ID portion of API Key                     |
| x-client-secret\* | String           | Client Secret portion of API Key                 |
| authorization     | String           | Bearer token (alternative to client credentials) |

### LP Pool Toxicity

#### Request Body

| Field                 | Type    | Description                                                                           |
| --------------------- | ------- | ------------------------------------------------------------------------------------- |
| poolId\*              | String  | On-chain pool identifier                                                              |
| chain\*               | String  | Blockchain network (ethereum, arbitrum, polygon, etc.)                                |
| poolToxicityPolicyIds | UUID\[] | Unique IDs Array of the Toxicity Policies. At least one is required, up to 5 policies |

#### Example Request

{% tabs %}
{% tab title="cURL" %}
```bash
curl --location 'https://api.hypernative.xyz/screener/pool-toxicity/reputation/lp' \
--header 'x-client-id: <Client Id>' \
--header 'x-client-secret: <Client Secret>' \
--header 'Content-Type: application/json' \
--data '{
    "poolId": "0x88e6A0c2ddd26fEEB64f039a2C41296fcb3F5640",
    "chain": "ethereum",
    "protocol": "uniswapV3",
    "poolToxicityPolicyIds": [
        "0629379a-a87b-4c4d-8e4e-82aafae16683",
        "18b17055-2ebd-41d4-af82-dd4478232812"
    ]
}'
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
import json

url = "https://api.hypernative.xyz/screener/pool-toxicity/reputation/lp"

payload = json.dumps({
  "poolId": "0x88e6A0c2ddd26fEEB64f039a2C41296fcb3F5640",
  "chain": "ethereum",
  "protocol": "uniswapV3",
  "poolToxicityPolicyIds": [
    "0629379a-a87b-4c4d-8e4e-82aafae16683",
    "18b17055-2ebd-41d4-af82-dd4478232812"
  ]
})
headers = {
  'x-client-id': '<Client Id>',
  'x-client-secret': '<Client Secret>',
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)

```
{% endtab %}
{% endtabs %}

#### Example Response

```json
{
    "success": true,
    "data": {
        "poolId": "0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640",
        "chain": "ethereum",
        "protocol": "Uniswap V3",
        "liquidity": "74078207790304840000",
        "token0": {
            "id": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            "symbol": "USDC"
        },
        "token1": {
            "id": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
            "symbol": "WETH"
        },
        "severity": "N/A",
        "recommendation": "Approve",
        "policiesResults": [
            {
                "policyId": "18b17055-2ebd-41d4-af82-dd4478232812",
                "policyName": "Comprehensive Pool Toxicity Policy - All Flags",
                "policyToxicityPercentage": 9.8218,
                "policyHighThreshold": 85,
                "policyMediumThreshold": 65,
                "recommendation": "Approve",
                "severity": "N/A",
                "flags": [
                    {
                        "title": "OFAC-sanctioned",
                        "flagId": "OF1010",
                        "toxicityPercentage": 0.0001,
                        "severity": "N/A",
                        "highThreshold": 80,
                        "mediumThreshold": 60
                    },
                    {
                        "title": "Related to OFAC-sanctioned",
                        "flagId": "RF1010",
                        "toxicityPercentage": 8.4258,
                        "severity": "N/A",
                        "highThreshold": 75,
                        "mediumThreshold": 55
                    },
                    {
                        "title": "UK (OFSI)- sanctioned",
                        "flagId": "OF1011",
                        "toxicityPercentage": 0.0001,
                        "severity": "N/A",
                        "highThreshold": 80,
                        "mediumThreshold": 60
                    },
                    {
                        "title": "Related to UK (OFSI)- sanctioned",
                        "flagId": "RF1011",
                        "toxicityPercentage": 0.0001,
                        "severity": "N/A",
                        "highThreshold": 75,
                        "mediumThreshold": 55
                    },
                    {
                        "title": "EU-sanctioned",
                        "flagId": "OF1012",
                        "toxicityPercentage": 0.0001,
                        "severity": "N/A",
                        "highThreshold": 80,
                        "mediumThreshold": 60
                    },
                    {
                        "title": "Related to EU-sanctioned",
                        "flagId": "RF1012",
                        "toxicityPercentage": 0.0001,
                        "severity": "N/A",
                        "highThreshold": 75,
                        "mediumThreshold": 55
                    },
                    {
                        "title": "Phishing & Scamming",
                        "flagId": "OF1410",
                        "toxicityPercentage": 0.0247,
                        "severity": "N/A",
                        "highThreshold": 90,
                        "mediumThreshold": 70
                    },
                    {
                        "title": "Attacker wallet",
                        "flagId": "OF1310",
                        "toxicityPercentage": 0.0001,
                        "severity": "N/A",
                        "highThreshold": 95,
                        "mediumThreshold": 85
                    },
                    {
                        "title": "Related to Attacker wallet",
                        "flagId": "RF1310",
                        "toxicityPercentage": 8.1623,
                        "severity": "N/A",
                        "highThreshold": 85,
                        "mediumThreshold": 65
                    },
                    {
                        "title": "Attacker contract",
                        "flagId": "OF1311",
                        "toxicityPercentage": 0.0001,
                        "severity": "N/A",
                        "highThreshold": 95,
                        "mediumThreshold": 85
                    },
                    {
                        "title": "Related to Attacker contract",
                        "flagId": "RF1311",
                        "toxicityPercentage": 0.0001,
                        "severity": "N/A",
                        "highThreshold": 85,
                        "mediumThreshold": 65
                    },
                    {
                        "title": "Mixer address",
                        "flagId": "OF1510",
                        "toxicityPercentage": 0.0001,
                        "severity": "N/A",
                        "highThreshold": 70,
                        "mediumThreshold": 50
                    },
                    {
                        "title": "Related to Mixer address",
                        "flagId": "RF1510",
                        "toxicityPercentage": 9.6329,
                        "severity": "N/A",
                        "highThreshold": 60,
                        "mediumThreshold": 40
                    }
                ]
            },
            {
                "policyId": "0629379a-a87b-4c4d-8e4e-82aafae16683",
                "policyName": "High Sensitivity Pool Policy - Critical Flags Only",
                "policyToxicityPercentage": 0.0247,
                "policyHighThreshold": 25,
                "policyMediumThreshold": 10,
                "recommendation": "Approve",
                "severity": "N/A",
                "flags": [
                    {
                        "title": "Attacker wallet",
                        "flagId": "OF1310",
                        "toxicityPercentage": 0.0001,
                        "severity": "N/A",
                        "highThreshold": 25,
                        "mediumThreshold": 10
                    },
                    {
                        "title": "Phishing & Scamming",
                        "flagId": "OF1410",
                        "toxicityPercentage": 0.0247,
                        "severity": "N/A",
                        "highThreshold": 20,
                        "mediumThreshold": 5
                    },
                    {
                        "title": "OFAC-sanctioned",
                        "flagId": "OF1010",
                        "toxicityPercentage": 0.0001,
                        "severity": "N/A",
                        "highThreshold": 30,
                        "mediumThreshold": 15
                    },
                    {
                        "title": "Terrorism financing",
                        "flagId": "OF1210",
                        "toxicityPercentage": 0.0001,
                        "severity": "N/A",
                        "highThreshold": 15,
                        "mediumThreshold": 5
                    },
                    {
                        "title": "Mixer address",
                        "flagId": "OF1510",
                        "toxicityPercentage": 0.0001,
                        "severity": "N/A",
                        "highThreshold": 35,
                        "mediumThreshold": 20
                    }
                ]
            }
        ]
    },
    "error": null,
    "version": "2.2.0",
    "service": "hypernative-webapp-server",
    "stackTrace": null
}
```

