# 🔵 Get All Policies

Retrieve all available pool toxicity policies.

#### Endpoint

<mark style="color:blue;">`GET`</mark> `https://api.hypernative.xyz/screener/pool-toxicity/policies`

#### Request Headers

| Header          | Type             | Description                     |
| --------------- | ---------------- | ------------------------------- |
| Content-Type\*  | application/json |                                 |
| authorization\* | String           | Bearer token for authentication |



#### Example Request

{% tabs %}
{% tab title="cURL" %}
```bash
curl --location --request GET 'https://api.hypernative.xyz/screener/pool-toxicity/policies' \
--header 'Content-Type: application/json' \
--header 'authorization: Bearer <YOUR_TOKEN>'
```
{% endtab %}

{% tab title="Python" %}

{% endtab %}
{% endtabs %}

#### Example Response

```json
{
  "success": true,
  "data": [
    {
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
    {
      "id": "a427df91-c538-4e1b-b391-0f72ea316542",
      "name": "Strict Regulatory Policy",
      "flags": [
        {
          "id": "RF1010",
          "highThreshold": 2,
          "mediumThreshold": 1,
          "filters": [
            {
              "type": "hops",
              "operator": "<=",
              "valueA": 5
            }
          ]
        },
        {
          "id": "RF1510",
          "highThreshold": 5,
          "mediumThreshold": 2,
          "filters": [
            {
              "type": "hops",
              "operator": "between",
              "valueA": 1,
              "valueB": 3
            }
          ]
        },
        {
          "id": "RF1310",
          "highThreshold": 3,
          "mediumThreshold": 1,
          "filters": [
            {
              "type": "value",
              "operator": ">",
              "valueA": 500000000000000000
            }
          ]
        }
      ],
      "highThreshold": 5,
      "mediumThreshold": 2,
      "organizationId": 100,
      "createdBy": "abc123def456ghi789jkl",
      "updatedBy": "abc123def456ghi789jkl",
      "createdAt": "2025-05-02T14:23:18.721Z",
      "updatedAt": "2025-05-05T11:05:36.412Z"
    },
    {
      "id": "7d95e102-8bf1-4c2a-b3e7-9a214fd63159",
      "name": "Low Risk Tolerance Policy",
      "flags": [
        {
          "id": "RF1710",
          "highThreshold": 10,
          "mediumThreshold": 5,
          "filters": []
        }
      ],
      "highThreshold": 10,
      "mediumThreshold": 5,
      "organizationId": 100,
      "createdBy": "xqb3bQZg7hQ836t9Bu4G",
      "updatedBy": "abc123def456ghi789jkl",
      "createdAt": "2025-05-04T16:42:05.193Z",
      "updatedAt": "2025-05-04T16:42:05.193Z"
    }
  ],
  "error": null,
  "version": "2.2.0",
  "service": "hypernative-webapp-server"
}
```
