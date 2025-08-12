# Balancer Pool TVL Deviation

<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/custom-agents`

### Rule

<table><thead><tr><th width="239">Property</th><th width="95">Type</th><th>Description</th></tr></thead><tbody><tr><td>chain</td><td>string</td><td>required - ethereum/gnosis</td></tr><tr><td>protocol</td><td>string</td><td>required - Balancer</td></tr><tr><td>poolId</td><td>string</td><td>required</td></tr><tr><td>poolIdAlias</td><td>string</td><td>optional - for better in-app experience</td></tr><tr><td>direction</td><td>string</td><td>required - below/above</td></tr><tr><td>threshold</td><td>string</td><td>required</td></tr><tr><td>ruleString</td><td>string</td><td>optional - for better in-app experience</td></tr></tbody></table>

### Example

<pre class="language-json"><code class="lang-json">{
  "agentType": "poolCompositionProtocolTVL",
  "agentName": "name",
  "state": "enabled",
  "rule": {
    "protocol": "Balancer",
    "chain": "ethereum",
    "poolId": "0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014",
    "poolIdAlias": "0x5c..0014",
    "direction": "below",
    "threshold": "1",
    "ruleString": "On Ethereum: when TVL of Balancer pool 0x5c..0014 is below $1"
  },
  "severity": "High",
  "muteDuration": 0,
<strong>  "channelsConfigurations": [
</strong>    {
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
</code></pre>
