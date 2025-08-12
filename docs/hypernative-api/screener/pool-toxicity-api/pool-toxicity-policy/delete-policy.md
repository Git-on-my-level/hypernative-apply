# 🔴 Delete Policy

Delete a pool toxicity policy.

#### Endpoint

<mark style="color:red;">`DELETE`</mark> `https://api.hypernative.xyz/screener/pool-toxicity/policies/{id}`

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
curl --location --request DELETE 'https://api.hypernative.xyz/screener/pool-toxicity/policies/e10bd3b9-89fc-4e78-8ffc-b5602adcfb34' \
--header 'Content-Type: application/json' \
--header 'authorization: Bearer <YOUR_TOKEN>'
```

#### Example Response

```json
{
  "success": true
}
```
