# Function Call Detected

<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/custom-agents`

### Rule

<table><thead><tr><th width="239">Property</th><th width="95">Type</th><th>Description</th></tr></thead><tbody><tr><td>chain</td><td>string</td><td><strong>required</strong></td></tr><tr><td>monitoredAddress</td><td>string</td><td><strong>required</strong></td></tr><tr><td>monitoredAddressAlias</td><td>string</td><td>[optional] - for better in-app experience</td></tr><tr><td>monitoredFunction</td><td>string</td><td><strong>required</strong></td></tr><tr><td>contractFunctionObject</td><td>string</td><td>[optional] - for better in-app experience, selected object from ABI</td></tr><tr><td>ruleString</td><td>string</td><td>[optional] - for better in-app experience</td></tr></tbody></table>

### Example JSON

```json
{
  "agentType": "functionCallDetection",
  "agentName": "name",
  "state": "enabled",
  "rule": {
    "chain": "ethereum",
    "monitoredAddress": "0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7",
    "monitoredAddressAlias": "Curve.fi: DAI/USDC/USDT Pool",
    "monitoredFunction": "TokenExchange(address,int128,uint256,int128,uint256)",
    "contractFunctionObject": {
      "name": "TokenExchange",
      "inputs": [
        {
          "type": "address",
          "name": "buyer",
          "indexed": true
        },
        {
          "type": "int128",
          "name": "sold_id",
          "indexed": false
        },
        {
          "type": "uint256",
          "name": "tokens_sold",
          "indexed": false
        },
        {
          "type": "int128",
          "name": "bought_id",
          "indexed": false
        },
        {
          "type": "uint256",
          "name": "tokens_bought",
          "indexed": false
        }
      ],
      "anonymous": false,
      "type": "event"
    },
    "ruleString": "On Ethereum: when function TokenExchange(address,int128,uint256,int128,uint256) of Curve.fi: DAI/USDC/USDT Pool is called"
  },
  "severity": "Medium",
  "muteDuration": 10,
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
  "remindersConfigurations": []
}
```
