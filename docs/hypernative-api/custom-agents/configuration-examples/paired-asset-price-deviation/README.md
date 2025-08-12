# Paired Asset Price Deviation

<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/custom-agents`

### Rule

<table><thead><tr><th width="230">Property</th><th width="95">Type</th><th>Description</th></tr></thead><tbody><tr><td>selectedPair</td><td>string</td><td>optional field for better in-app experience, concat peggedAssetAlias with linkAssetAlias</td></tr><tr><td>peggedAsset</td><td>string</td><td>required - see options provided below</td></tr><tr><td>peggedAssetAlias</td><td>string</td><td>optional - for better in-app experience</td></tr><tr><td>linkAsset</td><td>string</td><td>required - see options provided below</td></tr><tr><td>linkAssetAlias</td><td>string</td><td>optional - for better in-app experience</td></tr><tr><td>chain</td><td>string</td><td>required</td></tr><tr><td>threshold</td><td>string</td><td>required</td></tr><tr><td>direction</td><td>string</td><td>required - below/above</td></tr><tr><td>ruleString</td><td>string</td><td>optional - for better in-app experience</td></tr><tr><td>priceSource</td><td>string</td><td>required</td></tr><tr><td>isReminderEnabled</td><td>bool</td><td>optional - for better in-app experience</td></tr></tbody></table>

### Example

```json
{
  "agentType": "depeggingAgent",
  "agentName": "name",
  "state": "enabled",
  "rule": {
    "selectedPair": "USDT - USD",
    "peggedAsset": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "peggedAssetAlias": "USDT",
    "linkAsset": "USD",
    "linkAssetAlias": "USD",
    "chain": "ethereum",
    "threshold": "1",
    "isReminderEnabled": false,
    "priceSource": "CHAINLINK",
    "direction": "below",
    "ruleString": "On Ethereum: when the price of USDT is 1% below the price of USD (from Chainlink)"
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

{% content-ref url="options.md" %}
[options.md](options.md)
{% endcontent-ref %}
