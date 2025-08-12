# Mentions in Suspicious Contract

<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/custom-agents`

### Rule

<table><thead><tr><th width="264">Property</th><th width="95">Type</th><th>Description</th></tr></thead><tbody><tr><td>chain</td><td>string</td><td>required</td></tr><tr><td>monitoredAddresses</td><td>array</td><td>required</td></tr><tr><td>monitoredAddressesAliases</td><td>array</td><td>optional - for better in-app experience</td></tr><tr><td>ruleString</td><td>string</td><td>optional - for better in-app experience</td></tr></tbody></table>

### Example

```json
{
  "agentType": "suspiciousMentions",
  "agentName": "name",
  "state": "enabled",
  "rule": {
    "chain": "ethereum",
    "monitoredAddresses": [
      "0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7",
      "0x6c3f90f043a72fa612cbac8115ee7e52bde6e490"
    ],
    "monitoredAddressesAliases": [
      "Curve.fi: DAI/USDC/USDT Pool",
      "Curve.fi: 3CRV Token"
    ],
    "fileName": "",
    "ruleString": "On Ethereum: when one of Curve.fi: DAI/USDC/USDT Pool, Curve.fi: 3CRV Token  is mentioned in a suspicious contract"
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
