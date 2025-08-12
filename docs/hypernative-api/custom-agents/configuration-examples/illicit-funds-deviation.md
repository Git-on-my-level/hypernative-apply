# Illicit Funds Deviation

<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/custom-agents`

### Rule

<table><thead><tr><th width="239">Property</th><th width="95">Type</th><th>Description</th></tr></thead><tbody><tr><td>chain</td><td>string</td><td>required - ethereum</td></tr><tr><td>monitoredToken</td><td>string</td><td>required</td></tr><tr><td>monitoredTokenAlias</td><td>string</td><td>optional - for better in-app experience</td></tr><tr><td>threshold</td><td>string</td><td>required</td></tr><tr><td>ruleString</td><td>string</td><td>optional - for better in-app experience</td></tr></tbody></table>

### Example

```json
{
  "agentType": "tokenIllicitHoldersDomination",
  "agentName": "name",
  "state": "enabled",
  "rule": {
    "chain": "ethereum",
    "monitoredToken": "0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7",
    "monitoredTokenAlias": "Curve.fi: DAI/USDC/USDT Pool",
    "threshold": "1",
    "ruleString": "On Ethereum: when the ratio of illicit funds in Curve.fi: DAI/USDC/USDT Pool is above 1%"
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
