# 🟡 Update Policy

Update an existing pool toxicity policy.

#### Endpoint

<mark style="color:purple;">`PATCH`</mark> `https://api.hypernative.xyz/screener/pool-toxicity/policies/{id}`

#### Request Headers

| Header          | Type             | Description                     |
| --------------- | ---------------- | ------------------------------- |
| Content-Type\*  | application/json |                                 |
| authorization\* | String           | Bearer token for authentication |

#### Path Parameters

| Parameter | Type   | Description                     |
| --------- | ------ | ------------------------------- |
| id\*      | String | Unique identifier of the policy |

#### Request Body

| Field        | Type   | Description                                                |
| ------------ | ------ | ---------------------------------------------------------- |
| name         | String | Human-readable name for the policy (max 100 chars)         |
| description  | String | Detailed description of the policy purpose (max 500 chars) |
| flagSettings | Array  | Array of flag configuration objects                        |
| settings     | Object | Additional parameters including extraData and tradeParams  |

#### Example Request

```bash
curl --location --request PATCH 'https://api.hypernative.xyz/screener/pool-toxicity/policies/e10bd3b9-89fc-4e78-8ffc-b5602adcfb34' \
--header 'Content-Type: application/json' \
--header 'authorization: Bearer <YOUR_TOKEN>' \
--data-raw '{
  "name": "Updated Compliance Policy",
  "flagSettings": [
    {
      "flagId": "RF1010",
      "highThreshold": 7.0,
      "mediumThreshold": 2.0
    }
  ]
}'
```

#### Example Response

```json
{
  "id": "e10bd3b9-89fc-4e78-8ffc-b5602adcfb34",
  "name": "Updated Compliance Policy",
  "description": "A balanced policy for general compliance requirements",
  "orgId": 12345,
  "chains": ["ethereum", "arbitrum"],
  "policyType": "poolToxicity",
  "flagSettings": [
    {
      "flagId": "RF1010",
      "highThreshold": 7.0,
      "mediumThreshold": 2.0,
      "filters": [
        {
          "type": "hops",
          "operator": "=",
          "valueA": 3
        }
      ]
    }
  ],
  "settings": {
    "extraData": {
      "allowedProtocols": ["uniswap-v3", "balancer"]
    },
    "tradeParams": {
      "timeRange": 10080
    }
  }
}
```
