# Pool Composition Deviation

<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/custom-agents`

### Rule

<table><thead><tr><th width="239">Property</th><th width="95">Type</th><th>Description</th></tr></thead><tbody><tr><td>chain</td><td>string</td><td>required</td></tr><tr><td>protocol</td><td>string</td><td>required - Balancer</td></tr><tr><td>poolAddress</td><td>string</td><td>required</td></tr><tr><td>poolAddressAlias</td><td>string</td><td>optional - for better in-app experience</td></tr><tr><td>poolTokens</td><td>array</td><td>required - at least 2</td></tr><tr><td>poolTokensAliases</td><td>array</td><td>optional - for better in-app experience</td></tr><tr><td>monitoredToken</td><td>string</td><td>required</td></tr><tr><td>monitoredTokenAlias</td><td>string</td><td>optional - for better in-app experience</td></tr><tr><td>direction</td><td>string</td><td>required - below/above</td></tr><tr><td>threshold</td><td>string</td><td>required</td></tr><tr><td>ruleString</td><td>string</td><td>optional - for better in-app experience</td></tr></tbody></table>

### Example

```json
{
  "agentType": "poolComposition",
  "agentName": "name",
  "state": "enabled",
  "rule": {
    "chain": "ethereum",
    "poolAddress": "0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7",
    "poolAddressAlias": "Curve.fi: DAI/USDC/USDT Pool",
    "poolTokens": [
      "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      "0x6c3f90f043a72fa612cbac8115ee7e52bde6e490"
    ],
    "poolTokensAliases": [
      "ETH",
      "Curve.fi: 3CRV Token"
    ],
    "monitoredToken": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    "monitoredTokenAlias": "ETH",
    "direction": "below",
    "threshold": "1",
    "ruleString": "On Ethereum: when ETH value is below 1% of pool Curve.fi: DAI/USDC/USDT Pool TVL"
  },
  "severity": "High",
  "muteDuration": 0,
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
