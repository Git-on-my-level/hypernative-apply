# Continuous monitoring & Alerts

## Continuous monitoring & Alerts configuration

### 1. Create watchlist

#### Request

{% tabs %}
{% tab title="Curl" %}
```bash
  curl -X 'POST' \
  'https://api.hypernative.xyz/watchlists' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'x-client-id: <API Client ID> \'
  -H 'x-client-secret: <API Client Secret> \'
    -d '{
  "name": "My New Watchlist",
  "description": "My white list assets"
  }'
```
{% endtab %}

{% tab title="Python" %}
```python
 endpoint = "https://api.hypernative.xyz/watchlists"
 headers={
    "x-client-id": <API Client ID>,
  "x-client-secret": <API Client Secret>,
    "Content-Type": "application/json"
}
   payload={
        "name": "My New Watchlist",
        "description": "My white list assets"
    }
 response = requests.post(endpoint, json=payload, headers=headers).json()
```
{% endtab %}
{% endtabs %}

#### Response

```bash
{
    "data": {
        "id": 55,
        "name": "My New Watchlist",
        "description": "My white list assets",
        "createdAt": "2022-10-20T08:40:52.985Z",
        "updatedAt": "2022-10-20T08:40:52.985Z",
        "createdByUserId": 8,
        "createdBy": "My user name",
        "alertPolicies": [{
                "id": 43,
                "channels": [],
                "watchlists": [55],
                "categories": ["Governance", "Financial", "Technical", "Security", "Community"],
                "severities": ["High"]
            }
        ]
    }
}
```

#### Note:

{% hint style="info" %}
Upon Watchlist creation - A default Alert-Policy is created.\
This policy will be updated (step#3), using the policy ID that returned as part of the watchlist object
{% endhint %}

### 1.1 Retrieve Watchlist Data by watch-list ID

#### Request

{% tabs %}
{% tab title="Crul" %}
```bash
curl -X 'GET' \
  'https://api.hypernative.xyz/watchlists/55 \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'x-client-id: <API Client ID> \'
  -H 'x-client-secret: <API Client Secret> \'
  
```
{% endtab %}

{% tab title="Python" %}
```python
endpoint = "https://api.hypernative.xyz/watchlists/55"
headers = {
    "x-client-id": <API Client ID>,
  "x-client-secret": <API Client Secret>, 
    "Content-Type": "application/json"
    }
response = requests.get(endpoint, headers=headers).json()
```
{% endtab %}
{% endtabs %}

#### Response

```json

"data": {
    "id": 213,
    "name": "test",
    "description": "",
    "createdAt": "2023-01-25T09:30:59.029Z",
    "updatedAt": "2023-01-25T09:30:59.029Z",
    "createdByUserId": 8,
    "createdBy": "Lior Betzalel",
    "assets": [
        {
            "chain": "ethereum",
            "address": null,
            "name": "0xmons",
            "type": "Protocol"
        }
    ],
    "alertPolicies": [
        {
            "id": 199,
            "channels": [],
            "categories": [
                "Governance",
                "Financial",
                "Technical",
                "Security",
                "Community"
            ],
            "severities": [
                "High"
            ],
            "typeIds": []
        }
    ],
    "alertsTagsStats": [
        {
            "count": 0,
            "name": "All"
        },
        {
            "count": 0,
            "name": "Read"
        },
        {
            "count": 0,
            "name": "Unread"
        },
        {
            "count": 0,
            "name": "Important"
        },
        {
            "count": 0,
            "name": "Dismissed"
        }
    ]
}
```

### 1.2 Retrieve all user watchlists

#### Request

{% tabs %}
{% tab title="Crul" %}
```bash
curl -X 'GET' \
  'https://api.hypernative.xyz/watchlists/ \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'x-client-id: <API Client ID> \'
  -H 'x-client-secret: <API Client Secret> \'
```
{% endtab %}

{% tab title="Python" %}
```python
endpoint = "https://api.hypernative.xyz/watchlists/"
headers = {
    "Authorization": "<token>", 
    "Content-Type": "application/json"
    }
response = requests.post(endpoint, headers=headers).json()
```
{% endtab %}
{% endtabs %}

#### Response

```bash

"data": {
    "results": [
        {
            "id": 192,
            "name": "MyPoolCompRole",
            "description": "",
            "createdAt": "2023-01-15T16:49:19.281Z",
            "updatedAt": "2023-01-15T16:49:19.281Z",
            "createdByUserId": 8,
            "createdBy": "HN Labs",
            "assets": [
                {
                    "chain": "ethereum",
                    "address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                    "name": null,
                    "type": "Contract"
                },
                {
                    "chain": "ethereum",
                    "address": "0xf56d08221b5942c428acc5de8f78489a97fc5599",
                    "name": null,
                    "type": "Contract"
                },
                {
                    "chain": "ethereum",
                    "address": "0x6810e776880c02933d47db1b9fc05908e5386b96",
                    "name": null,
                    "type": "Contract"
                }
            ],
            "alertPolicies": [
                {
                    "id": 178,
                    "channels": [
                        "Slack"
                    ],
                    "categories": [],
                    "severities": [],
                    "typeIds": []
                }
            ],
            "alertsTagsStats": [
                {
                    "count": "74",
                    "name": "All"
                },
                {
                    "count": "0",
                    "name": "Read"
                },
                {
                    "count": "74",
                    "name": "Unread"
                },
                {
                    "count": "0",
                    "name": "Important"
                },
                {
                    "count": "0",
                    "name": "Dismissed"
                }
            ]
        },
        {
            "id": 213,
            "name": "test",
            "description": "",
            "createdAt": "2023-01-25T09:30:59.029Z",
            "updatedAt": "2023-01-25T09:30:59.029Z",
            "createdByUserId": 8,
            "createdBy": "HN Labs",
            "assets": [
                {
                    "chain": "ethereum",
                    "address": null,
                    "name": "0xmons",
                    "type": "Protocol"
                }
            ],
            "alertPolicies": [
                {
                    "id": 199,
                    "channels": [],
                    "categories": [
                        "Governance",
                        "Financial",
                        "Technical",
                        "Security",
                        "Community"
                    ],
                    "severities": [
                        "High"
                    ],
                    "typeIds": []
                }
            ],
            "alertsTagsStats": [
                {
                    "count": 0,
                    "name": "All"
                },
                {
                    "count": 0,
                    "name": "Read"
                },
                {
                    "count": 0,
                    "name": "Unread"
                },
                {
                    "count": 0,
                    "name": "Important"
                },
                {
                    "count": 0,
                    "name": "Dismissed"
                }
            ]
        }
    ],
    "totalCount": 2,
    "remainingCount": 0
}
```

###

### 2. Populate watchlist

#### Request

{% tabs %}
{% tab title="Crul" %}
```bash
$ curl -X 'PATCH' \
  'https://api.hypernative.xyz/watchlists/55' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'x-client-id: <API Client ID> \'
  -H 'x-client-secret: <API Client Secret> \'
    -d '{
  "name": "My New Watchlist",
  "description": "",
  "assets": [
    {
	  "chain": "Ethereum",
	  "type": "Protocol",
          "name": "Chain"
    },
    {
	  "chain": "Ethereum",
	  "type": "Wallet",
	  "address": "0x071a26dc66df5028ee602713bc34130cb5055b08"
    },
	{
	  "chain": "Ethereum",
	  "type": "Contract",
	  "address": "0xdAC17F958D2ee523a2206206994597C13D831ec7"
    }
  ]
}'
```
{% endtab %}

{% tab title="Python" %}
```python
endpoint = "https://api.hypernative.xyz/watchlists/55"
headers = {
     "Authorization": "<token>",
     "Content-Type": "application/json"
 }
payload ={
   "name": "My New Watchlist",
   "description": "",
   "assets": [
     {
	  "chain": "Ethereum",
	  "type": "Protocol",
          "name": "Chain"
     },
     {
	  "chain": "Ethereum",
	  "type": "Wallet",
	  "address": "0x071a26dc66df5028ee602713bc34130cb5055b08"
     },
     {
	  "chain": "Ethereum",
	  "type": "Contract",
	  "address": "0xdAC17F958D2ee523a2206206994597C13D831ec7"
     }
   ]
}
response = requests.patch(endpoint, json=payload, headers=headers).json()
```
{% endtab %}
{% endtabs %}

#### Response

```bash
{
    "success": true,
    "data": {
        "id": 200,
        "name": "My New Watchlist",
        "description": "",
        "createdAt": "2023-01-20T13:28:04.232Z",
        "updatedAt": "2023-01-20T13:28:04.232Z",
        "createdByUserId": 518,
        "createdBy": "Hyper Native Labs",
        "assets": [
            {
                "chain": "ethereum",
                "address": null,
                "name": "Curve",
                "type": "Protocol"
            }
        ],
        "alertPolicies": [
            {
                "id": 186,
                "channels": [
                    "Slack"
                ],
                "categories": [
                    "Governance",
                    "Financial",
                    "Technical",
                    "Security",
                    "Community"
                ],
                "severities": [
                    "Medium",
                    "High"
                ],
                "typeIds": []
            }
        ],
        "alertsTagsStats": [
            {
                "count": "20",
                "name": "All"
            },
            {
                "count": "0",
                "name": "Read"
            },
            {
                "count": "20",
                "name": "Unread"
            },
            {
                "count": "0",
                "name": "Important"
            },
            {
                "count": "0",
                "name": "Dismissed"
            }
        ]
    }
```

### 3. Configure alert policy

#### Request

{% tabs %}
{% tab title="Crul" %}
```bash
$ curl -X 'PATCH' \
  'https://api.hypernative.xyz/alert-policies/186' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'x-client-id: <API Client ID> \'
  -H 'x-client-secret: <API Client Secret> \'
  -d '{
  "channels": [
    "Email",
    "Slack",
    "WebHook"
  ],
  "categories": [
    "Governance",
    "Financial",
    "Technical",
    "Security",
    "Community"
    
  ],
  "severities": [
    "High"
  ],
    "typeIds": []
}'
```
{% endtab %}

{% tab title="Python" %}
```python
endpoint = "https://api.hypernative.xyz/alert-policies/186"
headers = {
     "Authorization": "<token>",
     "Content-Type": "application/json"
 }
payload ={
    "channels": [
    "Email"
  ],
    "categories": [
    "Governance"
  ],
    "severities": [
    "High"
   ]
 }
response = requests.patch(endpoint, json=payload, headers=headers).json()
```
{% endtab %}
{% endtabs %}

#### Response

```bash
"data": {
    "id": 186,
    "channels": [
        "Slack",
        "Email"
    ],
    "watchlists": [
        200
    ],
    "categories": [
        "Governance",
        "Financial",
        "Technical",
        "Security",
        "Community"
    ],
    "severities": [
        "Medium",
        "High"
    ],
    "typeIds": []
},
```

### Alert format examples:

#### Mail notification:

<figure><img src="../../../.gitbook/assets/Screenshot2022-11-17152043(2).png" alt=""><figcaption></figcaption></figure>

#### Slack notification:

<figure><img src="../../../.gitbook/assets/Screenshot2022-11-17152043.png" alt=""><figcaption></figcaption></figure>

#### Web-hook notification:

Sended Request: {"id":"3823c042-bc64-49ea-be0f-a47d710338a9",

"data":{"riskInsight":{"id":"YO4QSGDO0ZL1","name":"High value ETH transfer","category":"Financial","status":"Active","timestamp":"2022-11-17T12:44:11.000Z","severity":"Info","details":"100 ETH ($120K) transferred from 0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45 to 0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",

"involvedAssets":\[{"address":"0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45","type":"Contract","chain":"Ethereum","involvementType":"Sender"},{"address":"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2","type":"Contract","chain":"Etherem","involvementType":"Recipient"},{"name":"UniswapV3","type":"Protocol","chain":"Ethereum","involvementType":"Protocol"},{"name":"Uniswap V2","type":"Protocol","chain":"Ethereum","involvementType":"Protocol"},{"name":"Uniswap V1","type":"Protocol","chain":"Ethereum","involvementType":"Protocol"},{"name":"Maker","type":"Protocol","chain":"Ethereum","involvementType":"Protocol"}],"riskTypeId":"A-10","riskTypeDescription":"Transfer of over $100K in ETH","txnHash":"0x11a1a77521f1c8e62a3b26b3ea238fe7365cdfde5b93b55e167a26467e9c2b7a","context":\[{"title":"To","value":"0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45"},{"title":"From","value":"0xa1252c149fe7a3ce2a85ec3777b825d1f163b9ce"},

"system\_labels": \[\n "USDC",\n "Aave V1",\n "Aave V2",\n "Token"\n ]\n },\n {\n "type": "contract",\n "chain": "ethereum",\n "address": "0xa2327a938febf5fec13bacfb16ae10ecbc4cbdcf",\n "involvement": "participant",\n "system\_labels": \[]\n }\n]"}]},"watchlists":\[{"id":84,"name":"MyWatchList 341 protocols","description":"","createdAt":"2022-11-12T16:08:59.361Z","updatedAt":"2022-11-12T16:22:04.828Z","assets":\[{"chain":"Ethereum","address":null,"name":"0x","type":"Protocol"},{"chain":"Ethereum","address":null,"name":"XMON","type":"Protocol"}],"alertsTagsStats":\[{"count":0,"name":"All"},{"count":0,"name":"Read"},{"count":0,"name":"Unread"},{"count":0,"name":"Important"},{"count":0,"name":"Dismissed"}]}],"triggeredAssets":\[{"chain":"Ethereum","address":null,"name":"Maker","type":"Protocol"}]\}}…

<figure><img src="../../../.gitbook/assets/Continuesmonitoringandalerts(1).png" alt=""><figcaption><p>Alert subscription flow</p></figcaption></figure>
