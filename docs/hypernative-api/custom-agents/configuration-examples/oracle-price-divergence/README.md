# Oracle Price Divergence

<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/custom-agents`

### Rule

<table><thead><tr><th width="196">Property</th><th width="82">Type</th><th>Description</th></tr></thead><tbody><tr><td>chain1</td><td>string</td><td>required</td></tr><tr><td>chain2</td><td>string</td><td>required - undefined</td></tr><tr><td>selectedPair</td><td>string</td><td>optional - for better in-app experience</td></tr><tr><td>priceFeedAddress1</td><td>string</td><td>required - see options provided below</td></tr><tr><td>aggregator1</td><td>string</td><td>required - see options provided below</td></tr><tr><td>priceFeedAddress2</td><td>string</td><td>required - 0x0000000000000000000000000000000000000000</td></tr><tr><td>aggregator2</td><td>string</td><td>required - 0x0000000000000000000000000000000000000000</td></tr><tr><td>threshold</td><td>string</td><td>required</td></tr><tr><td>ruleString</td><td>string</td><td>optional - for better in-app experience</td></tr></tbody></table>

### Example

```json
{
  "agentType": "oracleMonitor",
  "agentName": "asedhs",
  "state": "enabled",
  "rule": {
    "chain1": "ethereum",
    "chain2": "undefined",
    "selectedPair": "1INCH / ETH",
    "priceFeedAddress1": "0x72AFAECF99C9d9C8215fF44C77B94B99C28741e8",
    "aggregator1": "0xb2f68c82479928669b0487d1daed6ef47b63411e",
    "priceFeedAddress2": "0x0000000000000000000000000000000000000000",
    "aggregator2": "0x0000000000000000000000000000000000000000",
    "threshold": "1",
    "ruleString": "On Ethereum: when the price of 1INCH / ETH diverged from previous price by 1%"
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
