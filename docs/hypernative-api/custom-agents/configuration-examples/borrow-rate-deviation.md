# Borrow Rate Deviation

<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/custom-agents`

### Rule

<table><thead><tr><th width="239">Property</th><th width="95">Type</th><th>Description</th></tr></thead><tbody><tr><td>chain</td><td>string</td><td>required - ethereum/gnosis/polygon</td></tr><tr><td>protocol</td><td>string</td><td>required - for ethereum/polygon:<br>AAVEv2/AAVEv3/Gearbox<br>for gnosis:<br>Agave</td></tr><tr><td>monitoredToken</td><td>string</td><td>required</td></tr><tr><td>monitoredTokenAlias</td><td>string</td><td>optional - for better in-app experience</td></tr><tr><td>direction</td><td>string</td><td>required - below/above</td></tr><tr><td>threshold</td><td>string</td><td>required</td></tr><tr><td>ruleString</td><td>string</td><td>optional - for better in-app experience</td></tr></tbody></table>

### Example

```json
{
  "agentType": "borrowRateMonitor",
  "agentName": "name",
  "state": "enabled",
  "rule": {
    "chain": "ethereum",
    "monitoredToken": "0x6b175474e89094c44da98b954eedeac495271d0f",
    "monitoredTokenAlias": "Maker: Dai Stablecoin",
    "protocol": "AAVEv2",
    "direction": "below",
    "threshold": "1",
    "ruleString": "On Ethereum: when borrow rate of Maker: Dai Stablecoin is below 1%"
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
