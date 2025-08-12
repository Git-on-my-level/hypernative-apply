# Balancer Pool Composition Deviation

<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/custom-agents`

### Rule

<table><thead><tr><th width="239">Property</th><th width="95">Type</th><th>Description</th></tr></thead><tbody><tr><td>chain</td><td>string</td><td>required - ethereum/gnosis</td></tr><tr><td>protocol</td><td>string</td><td>required - Balancer</td></tr><tr><td>poolId</td><td>string</td><td>required</td></tr><tr><td>poolIdAlias</td><td>string</td><td>optional - for better in-app experience</td></tr><tr><td>poolTokens</td><td>array</td><td>required</td></tr><tr><td>poolTokensAliases</td><td>array</td><td>optional - for better in-app experience</td></tr><tr><td>monitoredToken</td><td>string</td><td>required</td></tr><tr><td>monitoredTokenAlias</td><td>string</td><td>optional - for better in-app experience</td></tr><tr><td>direction</td><td>string</td><td>required - below/above</td></tr><tr><td>threshold</td><td>string</td><td>required</td></tr><tr><td>ruleString</td><td>string</td><td>optional - for better in-app experience</td></tr></tbody></table>

### Example

```json
{
  "agentType": "poolCompositionProtocolRatio",
  "agentName": "name",
  "state": "enabled",
  "rule": {
    "protocol": "Balancer",
    "chain": "ethereum",
    "poolId": "0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014",
    "poolIdAlias": "0x5c..0014",
    "poolTokens": [
      "0xba100000625a3754423978a60c9317c58a424e3d",
      "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
    ],
    "poolTokensAliases": [
      "Balancer: BAL Token",
      "Wrapped Ether"
    ],
    "monitoredToken": "0xba100000625a3754423978a60c9317c58a424e3d",
    "monitoredTokenAlias": "Balancer: BAL Token",
    "direction": "below",
    "threshold": "1",
    "ruleString": "On Ethereum: when Balancer: BAL Token value is below 1% of Balancer pool 0x5c..0014 TVL"
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
