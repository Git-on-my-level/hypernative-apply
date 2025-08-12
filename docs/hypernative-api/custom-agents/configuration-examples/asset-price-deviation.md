# Asset Price Deviation

<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/custom-agents`

### Rule

<table><thead><tr><th width="182">Property</th><th width="127">Type</th><th>Description</th></tr></thead><tbody><tr><td>state</td><td>string</td><td></td></tr><tr><td>severity</td><td>string</td><td></td></tr><tr><td>channel</td><td>string</td><td>optional - for better in-app experience</td></tr><tr><td>chain</td><td>string</td><td>required</td></tr><tr><td>selectedToken</td><td></td><td>required</td></tr><tr><td>priceSource</td><td></td><td>required</td></tr></tbody></table>

### Example

```json
{
"agentType":"assetPriceDeviation",
"agentName":"Asset Price Deviation",
"state":"enabled",
"rule":{
    "isReminderEnabled":false
        },
"severity":"Medium",
"muteDuration":0,
"channelsConfigurations":[
    {
        "id":1018,"name":"slack-1"
    }
    ],
"remindersConfigurations":[],
"securitySuitIds":[],
"graphData":
    {
        "description":"On Bitcoin: when the price of BTC is less than 82000 * 10^0 USD (from Coingecko)",
        "nodes":[
            {
            "id":"3bc9e87e-e46b-45de-8001-f875e39455ef",
            "type":"time-based-node",
            "data":
                {
                    "type":"blocks",
                    "amount":1,
                    "chain":"ethereum"
                }
            },
            {
            "id":"10922b97-4cea-4bca-9517-0c516937b3cc",
            "type":"asset-price-node",
            "data":
            {
                "aliasType":"number",
                "amount":1,
                "alias":"firstAddress",
                "description":"",
                "selectedToken":
                {
                    "name":"Bitcoin",
                    "address":"0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
                    "symbol":"BTC",
                    "id":null,
                    "chain":"bitcoin",
                    "isNft":false,
                    "decimals":8,
                    "availableSources":["COINGECKO","CMC"],
                    "cmcId":1,
                    "llamaId":null,
                    "cmcSlug":"bitcoin"
                },
                "chain":"bitcoin",
                "priceSource":"COINGECKO",
                "address":"0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
                "addressAlias":"BTC"
            }
            },
            {
                "id":"d0dee36c-c50b-4144-b5cd-71e6f0e277b3",
                "type":"condition-node",
                "data":
                {
                    "condition":"<",
                    "valueA":"firstAddress",
                    "valueAmultiplier":0,
                    "description":"",
                    "valueB":"82000",
                    "valueBMultiplier":0,
                    "valueCMultiplier":0
                }
            },
            {
                "id":"b71eed96-98b0-49d8-820e-26bc58cbfbd7",
                "type":"send-alert-node",
                "data":
                {
                    "message":"Price of BTC is $ {{firstAddress}}, less than 82000 * 10^0 (Bitcoin | BTC | 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee | COINGECKO)",
                    "description":""
                }
        }
        ],
        "edges":[
        {
        "source":"3bc9e87e-e46b-45de-8001-f875e39455ef",
        "target":"10922b97-4cea-4bca-9517-0c516937b3cc",
        "id":"xy-edge__3bc9e87e-e46b-45de-8001-f875e39455ef-10922b97-4cea-4bca-9517-0c516937b3cc"
        },
        {
        "source":"10922b97-4cea-4bca-9517-0c516937b3cc",
        "target":"d0dee36c-c50b-4144-b5cd-71e6f0e277b3",
        "id":"xy-edge__10922b97-4cea-4bca-9517-0c516937b3cc-d0dee36c-c50b-4144-b5cd-71e6f0e277b3"
        },
        {
        "source":"d0dee36c-c50b-4144-b5cd-71e6f0e277b3",
        "target":"b71eed96-98b0-49d8-820e-26bc58cbfbd7",
        "id":"xy-edge__d0dee36c-c50b-4144-b5cd-71e6f0e277b3-b71eed96-98b0-49d8-820e-26bc58cbfbd7"
        }
        ]
        }
    }
```
