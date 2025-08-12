# Generic Contract Read

<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/custom-agents`

### Rule

<table><thead><tr><th width="239">Property</th><th width="95">Type</th><th>Description</th></tr></thead><tbody><tr><td>chain</td><td>string</td><td>required</td></tr><tr><td>contractAddress</td><td>string</td><td>required</td></tr><tr><td>contractAddressAlias</td><td>string</td><td>optional - for better in-app experience</td></tr><tr><td>input</td><td>array</td><td>required</td></tr><tr><td>funcSig</td><td>string</td><td>required</td></tr><tr><td>contractFunctionObject</td><td>string</td><td>optional - for better in-app experience, selected object from ABI</td></tr><tr><td>outputDataType</td><td>array</td><td>required</td></tr><tr><td>outputIndex</td><td>number</td><td>required</td></tr><tr><td>operator</td><td>string</td><td>required - lte/lt/gte/gt/compare_exact/ne</td></tr><tr><td>operands</td><td>array</td><td>required</td></tr><tr><td>inputDataType</td><td>array</td><td>required</td></tr><tr><td>ruleString</td><td>string</td><td>optional - for better in-app experience</td></tr></tbody></table>

### Example

```json
{
   "agentType":"genericNodeQuery",
   "agentName":"name",
   "state":"enabled",
   "rule":{
      "chain":"ethereum",
      "input":[
         "1",
         "true"
      ],
      "funcSig":"calc_token_amount(uint256[3] amounts, bool deposit)",
      "fileName":"",
      "operands":[
         "2"
      ],
      "operator":"lt",
      "ruleString":"On Ethereum: when Curve.fi: DAI/USDC/USDT Pool: calc_token_amount(1, true) less than 2",
      "outputIndex":0,
      "inputDataType":[
         "uint256[3]",
         "bool"
      ],
      "outputDataType":[
         "uint256"
      ],
      "contractAddress":"0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7",
      "contractAddressAlias":"Curve.fi: DAI/USDC/USDT Pool",
      "contractFunctionObject":{
         "gas":4508776,
         "name":"calc_token_amount",
         "type":"function",
         "inputs":[
            {
               "name":"amounts",
               "type":"uint256[3]"
            },
            {
               "name":"deposit",
               "type":"bool"
            }
         ],
         "outputs":[
            {
               "name":"",
               "type":"uint256"
            }
         ],
         "stateMutability":"view"
      }
   },
   "severity":"High",
   "muteDuration":0,
  "channelsConfigurations": [
    {
      "id": 1,
      "name": "Email-1"
    },
    {
      "id": 2,
      "name": "Email-2"
    },
    {
      "id": 3,
      "name": "Slack-1"
    },
    {
      "id": 4,
      "name": "Slack-2"
    }
  ],
   "remindersConfigurations":[],
   "delay":600
}
```
