# Accumulating Asset Price Deviation

<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/custom-agents`

### Rule

<table><thead><tr><th width="230">Property</th><th width="95">Type</th><th>Description</th></tr></thead><tbody><tr><td>selectedPair</td><td>string</td><td>optional field for better in-app experience, concat accumulatingAssetAlias with underlyingAssetAlias</td></tr><tr><td>accumulatingAsset</td><td>string</td><td>required - see options provided below</td></tr><tr><td>accumulatingAssetAlias</td><td>string</td><td>optional - for better in-app experience</td></tr><tr><td>underlyingAsset</td><td>string</td><td>required - see options provided below</td></tr><tr><td>underlyingAssetAlias</td><td>string</td><td>optional - for better in-app experience</td></tr><tr><td>chain</td><td>string</td><td>required</td></tr><tr><td>threshold</td><td>string</td><td>required</td></tr><tr><td>direction</td><td>string</td><td>required - below/above</td></tr><tr><td>ruleString</td><td>string</td><td>optional - for better in-app experience</td></tr></tbody></table>

### Example

```json
{
  "agentType": "accumulatingAssetsPriceDeviation",
  "agentName": "string",
  "rule": {
    "selectedPair": "rEth - ETH",
    "accumulatingAsset": "0xae78736cd615f374d3085123a210448e74fc6393",
    "accumulatingAssetAlias": "rEth",
    "underlyingAsset": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    "underlyingAssetAlias": "ETH",
    "chain": "ethereum",
    "threshold": "12",
    "direction": "below",
    "ruleString": "On Ethereum: when the price of rEth is 12% below the value of underlying ETH"
  },
  "state": "enabled",
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

{% content-ref url="options.md" %}
[options.md](options.md)
{% endcontent-ref %}
