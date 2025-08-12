# 🔵 Get Policy by ID

Retrieve a specific pool toxicity policy by its ID.

#### Endpoint

<mark style="color:green;">`GET`</mark> `https://api.hypernative.xyz/screener/pool-toxicity/policies/{id}`

#### Request Headers

| Header          | Type             | Description                     |
| --------------- | ---------------- | ------------------------------- |
| Content-Type\*  | application/json |                                 |
| authorization\* | String           | Bearer token for authentication |

#### Path Parameters

| Parameter | Type   | Description                     |
| --------- | ------ | ------------------------------- |
| id\*      | String | Unique identifier of the policy |

#### Example Request

```bash
curl --location --request GET 'https://api.hypernative.xyz/screener/pool-toxicity/policies/e10bd3b9-89fc-4e78-8ffc-b5602adcfb34' \
--header 'Content-Type: application/json' \
--header 'authorization: Bearer <YOUR_TOKEN>'
```

#### Example Response

```json
{
  "success": true,
  "data": {
    "id": "1581ce02-d336-437d-bae4-c737d22b931b",
    "name": "Standard Compliance Policy",
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
        "highThreshold": 10,
        "mediumThreshold": 5,
        "filters": [
          {
            "type": "hops",
            "operator": "<",
            "valueA": 3
          }
        ]
      }
    ],
    "highThreshold": 8,
    "mediumThreshold": 3,
    "organizationId": 100,
    "createdBy": "xqb3bQZg7hQ836t9Bu4G",
    "updatedBy": "xqb3bQZg7hQ836t9Bu4G",
    "createdAt": "2025-05-01T09:14:20.518Z",
    "updatedAt": "2025-05-01T09:14:20.518Z"
  },
  "error": null,
  "version": "2.2.0",
  "service": "hypernative-webapp-server"
}
```
