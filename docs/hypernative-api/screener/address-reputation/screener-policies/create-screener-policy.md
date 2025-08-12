# 🟢 Create Screener Policy

## Create a new Screener Policy

<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/screener/policies`

#### Headers

| Name                                                            | Type             | Description                                                                                                                                                                                                                                                                                                                                                         |
| --------------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <p>accept<br><mark style="color:red;">Required</mark></p>       | application/json |                                                                                                                                                                                                                                                                                                                                                                     |
| <p>Content-Type<br><mark style="color:red;">Required</mark></p> | application/json |                                                                                                                                                                                                                                                                                                                                                                     |
| x-client-id                                                     | String           | Required if you use [API Keys](../../../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                             |
| x-client-secret                                                 | String           | Required if you use [API Keys](../../../account/api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                                         |
| authorization                                                   | String           | <p>Required if you prefer to login with a member's identity. See <a href="../../../account/login.md">Login with Email and Password</a> or <a href="../../../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |

#### Request Body

| Name                                                    | Type          | Description                                                                         |
| ------------------------------------------------------- | ------------- | ----------------------------------------------------------------------------------- |
| <p>name<br><mark style="color:red;">Required</mark></p> | string        |                                                                                     |
| chains                                                  | string\[]     | values must be from the [supported chains](../../../../../supported-chains.md) list |
| flags                                                   | PolicyFlag\[] | see [type definition](broken-reference/)                                            |

### Example

#### Request:

{% tabs %}
{% tab title="Curl" %}
```bash
  curl -X 'POST' \
  'https://api.hypernative.xyz/screener/policies' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
   "name":"My first policy",
   "flags":[
      {
         "id":"F-1101",
         "severity":"Medium",
         "rules":[
            {
               "severity":"High",
               "name":"my first rule",
               "conditions":[
                  {
                     "type":"hops",
                     "operator":">",
                     "valueA":5
                  },
                  {
                     "type":"amounts",
                     "operator":"<",
                     "valueA":1000
                  },
                  {
                     "type":"maxValues",
                     "operator":"between",
                     "valueA":4000,
                     "valueB":5000
                  }
               ]
            },
            {
               "severity":"Info",
               "name":"second rule",
               "conditions":[
                  {
                     "type":"hops",
                     "operator":"=",
                     "valueA":3
                  }
               ]
            }
         ]
      },
      {
         "id":"F-11011",
         "severity":"Low",
         "rules":[
            
         ]
      }
   ],
   "chains":[
      "ethereum",
      "bsc"
   ]
}'
```
{% endtab %}

{% tab title="Python" %}
```python
 endpoint = "https://api.hypernative.xyz/screener/policies"
 headers={
    "x-client-id": <API Client ID>,
  "x-client-secret": <API Client Secret>,
    "Content-Type": "application/json"
}
 payload = {
   "name":"My first policy",
   "flags":[
      {
         "id":"F-1101",
         "severity":"Medium",
         "rules":[
            {
               "severity":"High",
               "name":"my first rule",
               "conditions":[
                  {
                     "type":"hops",
                     "operator":">",
                     "valueA":5
                  },
                  {
                     "type":"amounts",
                     "operator":"<",
                     "valueA":1000
                  },
                  {
                     "type":"maxValues",
                     "operator":"between",
                     "valueA":4000,
                     "valueB":5000
                  }
               ]
            },
            {
               "severity":"Info",
               "name":"second rule",
               "conditions":[
                  {
                     "type":"hops",
                     "operator":"=",
                     "valueA":3
                  }
               ]
            }
         ]
      },
      {
         "id":"F-11011",
         "severity":"Low",
         "rules":[
            
         ]
      }
   ],
   "chains":[
      "ethereum",
      "bsc"
   ]
}
 response = requests.post(endpoint, json=payload, headers=headers).json() 
```
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

```json
{
   "id":"94f07b70-6e4f-4410-8772-86cda3d2d93d",
   "name":"My first policy",
   "flags":[
      {
         "id":"F-1101",
         "severity":"Medium",
         "rules":[
            {
               "severity":"High",
               "name":"my first rule",
               "conditions":[
                  {
                     "type":"hops",
                     "operator":">",
                     "valueA":5
                  },
                  {
                     "type":"amounts",
                     "operator":"<",
                     "valueA":1000
                  },
                  {
                     "type":"maxValues",
                     "operator":"between",
                     "valueA":4000,
                     "valueB":5000
                  }
               ]
            },
            {
               "severity":"Info",
               "name":"second rule",
               "conditions":[
                  {
                     "type":"hops",
                     "operator":"=",
                     "valueA":3
                  }
               ]
            }
         ]
      },
      {
         "id":"F-11011",
         "severity":"Low",
         "rules":[
            
         ]
      }
   ],
   "chains":[
      "ethereum",
      "bsc"
   ],
   "createdAt":"2025-01-30T11:49:57.605Z",
   "updatedAt":"2025-01-30T12:05:53.061Z",
   "createdBy":"user@hypernative.io",
   "updatedBy":"user@hypernative.io"
}
```

</details>
