# Position Health Deviation

<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/custom-agents`

### Rule

<table><thead><tr><th width="246">Property</th><th width="95">Type</th><th>Description</th></tr></thead><tbody><tr><td>chain</td><td>string</td><td>required - ethereum/polygon/gnosis</td></tr><tr><td>userAccountAddress</td><td>string</td><td>required</td></tr><tr><td>userAccountAddressAlias</td><td>string</td><td>optional - for better in-app experience</td></tr><tr><td>protocol</td><td>string</td><td>required - for ethereum/polygon:<br>AAVEv2/AAVEv3/Gearbox<br>for gnosis:<br>Agave</td></tr><tr><td>threshold</td><td>string</td><td>required</td></tr><tr><td>ruleString</td><td>string</td><td>optional - for better in-app experience</td></tr><tr><td>monitoredToken</td><td>string</td><td>required when Gearbox is selected</td></tr><tr><td>monitoredTokenAlias</td><td>string</td><td>optional - for better in-app experience</td></tr></tbody></table>

### Example

```json
{
  "agentType": "lendingPositionHealth",
  "agentName": "123",
  "state": "enabled",
  "rule": {
    "chain": "ethereum",
    "userAccountAddress": "0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7",
    "userAccountAddressAlias": "Curve.fi: DAI/USDC/USDT Pool",
    "protocol": "AAVEv2",
    "threshold": "1",
    "ruleString": "On Ethereum: when Position Health factor of Curve.fi: DAI/USDC/USDT Pool on AAVEv2 is below 1"
  },
  "severity": "Medium",
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
