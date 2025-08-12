# 🟢 Create New Policy

### Create New Policy

Create a new pool toxicity policy.

#### Endpoint

<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/screener/pool-toxicity/policies`

#### Request Headers

| Header          | Type             | Description                     |
| --------------- | ---------------- | ------------------------------- |
| Content-Type\*  | application/json |                                 |
| authorization\* | String           | Bearer token for authentication |

#### Request Body

| Field           | Type   | Description                                        |
| --------------- | ------ | -------------------------------------------------- |
| name\*          | String | Human-readable name for the policy (max 100 chars) |
| flags\*         | Array  | Array of flag configuration objects                |
| highThreshold   | Number |                                                    |
| mediumThreshold | Number |                                                    |

#### Example Request

{% tabs %}
{% tab title="cURL" %}
```bash
curl -X POST "https://api.hypernative.xyz/policies" \
-H "Content-Type: application/json" \
-H "x-client-id: YOUR_CLIENT_ID" \
-H "x-client-secret: YOUR_CLIENT_SECRET" \
-d '{
  "name": "Comprehensive Operators Policy",
  "flags": [
    {
      "id": "RF1710",
      "highThreshold": 5,
      "mediumThreshold": 2,
      "filters": [
        {
          "type": "hops",
          "operator": "=",
          "valueA": 1
        }
      ]
    },
    {
      "id": "RF1010",
      "highThreshold": 8,
      "mediumThreshold": 3,
      "filters": [
        {
          "type": "hops",
          "operator": "<",
          "valueA": 3
        }
      ]
    },
    {
      "id": "RF1510",
      "highThreshold": 6,
      "mediumThreshold": 2,
      "filters": [
        {
          "type": "hops",
          "operator": ">",
          "valueA": 2
        }
      ]
    },
    {
      "id": "RF1310",
      "highThreshold": 7,
      "mediumThreshold": 3,
      "filters": [
        {
          "type": "hops",
          "operator": "<=",
          "valueA": 4
        }
      ]
    },
    {
      "id": "RF1110",
      "highThreshold": 10,
      "mediumThreshold": 5,
      "filters": [
        {
          "type": "hops",
          "operator": ">=",
          "valueA": 1
        }
      ]
    },
    {
      "id": "RF1112",
      "highThreshold": 12,
      "mediumThreshold": 6,
      "filters": [
        {
          "type": "hops",
          "operator": "between",
          "valueA": 2,
          "valueB": 5
        }
      ]
    },
    {
      "id": "RF1410",
      "highThreshold": 15,
      "mediumThreshold": 7,
      "filters": [
        {
          "type": "value",
          "operator": ">",
          "valueA": 1000000000000000000
        }
      ]
    }
  ],
  "highThreshold": 10,
  "mediumThreshold": 5
}'
```


{% endtab %}

{% tab title="Python" %}
```python
import requests
import json

url = "https://api.hypernative.xyz/policies"

headers = {
    "Content-Type": "application/json",
    "x-client-id": "YOUR_CLIENT_ID",
    "x-client-secret": "YOUR_CLIENT_SECRET"
}

payload = {
  "name": "Comprehensive Operators Policy",
  "flags": [
    {
      "id": "RF1710",
      "highThreshold": 5,
      "mediumThreshold": 2,
      "filters": [
        {
          "type": "hops",
          "operator": "=",
          "valueA": 1
        }
      ]
    },
    {
      "id": "RF1010",
      "highThreshold": 8,
      "mediumThreshold": 3,
      "filters": [
        {
          "type": "hops",
          "operator": "<",
          "valueA": 3
        }
      ]
    },
    {
      "id": "RF1510",
      "highThreshold": 6,
      "mediumThreshold": 2,
      "filters": [
        {
          "type": "hops",
          "operator": ">",
          "valueA": 2
        }
      ]
    },
    {
      "id": "RF1310",
      "highThreshold": 7,
      "mediumThreshold": 3,
      "filters": [
        {
          "type": "hops",
          "operator": "<=",
          "valueA": 4
        }
      ]
    },
    {
      "id": "RF1110",
      "highThreshold": 10,
      "mediumThreshold": 5,
      "filters": [
        {
          "type": "hops",
          "operator": ">=",
          "valueA": 1
        }
      ]
    },
    {
      "id": "RF1112",
      "highThreshold": 12,
      "mediumThreshold": 6,
      "filters": [
        {
          "type": "hops",
          "operator": "between",
          "valueA": 2,
          "valueB": 5
        }
      ]
    },
    {
      "id": "RF1410",
      "highThreshold": 15,
      "mediumThreshold": 7,
      "filters": [
        {
          "type": "value",
          "operator": ">",
          "valueA": 1000000000000000000
        }
      ]
    }
  ],
  "highThreshold": 10,
  "mediumThreshold": 5,
  "policyType": "PoolToxicity"
}

response = requests.post(url, headers=headers, data=json.dumps(payload))
print(response.status_code)
print(response.json())
```
{% endtab %}
{% endtabs %}

#### Example Response

```json
{
  "success": true,
  "data": {
    "id": "f892dc15-7bda-42ef-9c39-e5a83c47fb19",
    "name": "Comprehensive Operators Policy",
    "flags": [
      {
        "id": "RF1710",
        "highThreshold": 5,
        "mediumThreshold": 2,
        "filters": [
          {
            "type": "hops",
            "operator": "=",
            "valueA": 1
          }
        ]
      },
      {
        "id": "RF1010",
        "highThreshold": 8,
        "mediumThreshold": 3,
        "filters": [
          {
            "type": "hops",
            "operator": "<",
            "valueA": 3
          }
        ]
      },
      {
        "id": "RF1510",
        "highThreshold": 6,
        "mediumThreshold": 2,
        "filters": [
          {
            "type": "hops",
            "operator": ">",
            "valueA": 2
          }
        ]
      },
      {
        "id": "RF1310",
        "highThreshold": 7,
        "mediumThreshold": 3,
        "filters": [
          {
            "type": "hops",
            "operator": "<=",
            "valueA": 4
          }
        ]
      },
      {
        "id": "RF1110",
        "highThreshold": 10,
        "mediumThreshold": 5,
        "filters": [
          {
            "type": "hops",
            "operator": ">=",
            "valueA": 1
          }
        ]
      },
      {
        "id": "RF1112",
        "highThreshold": 12,
        "mediumThreshold": 6,
        "filters": [
          {
            "type": "hops",
            "operator": "between",
            "valueA": 2,
            "valueB": 5
          }
        ]
      },
      {
        "id": "RF1410",
        "highThreshold": 15,
        "mediumThreshold": 7,
        "filters": [
          {
            "type": "value",
            "operator": ">",
            "valueA": 1000000000000000000
          }
        ]
      }
    ],
    "highThreshold": 10,
    "mediumThreshold": 5,
    "organizationId": 100,
    "createdBy": "xqb3bQZg7hQ836t9Bu4G",
    "updatedBy": "xqb3bQZg7hQ836t9Bu4G",
    "createdAt": "2025-05-06T15:42:18.329Z",
    "updatedAt": "2025-05-06T15:42:18.329Z"
  },
  "error": null,
  "version": "2.2.0",
  "service": "hypernative-webapp-server"
}
```
