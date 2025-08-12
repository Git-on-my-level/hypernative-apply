# Address Transfer Activity (legacy)

<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/custom-agents`

### Rule

<table><thead><tr><th width="239">Property</th><th width="95">Type</th><th>Description</th></tr></thead><tbody><tr><td>chain</td><td>string</td><td>required</td></tr><tr><td>ruleType</td><td>string</td><td>optional - for better in-app experience, see <a data-mention href="address-transfer-activity.md#configuration-options-rule">#configuration-options-rule</a></td></tr><tr><td>monitoredTokens</td><td>array</td><td>required - array of strings (addresses)</td></tr><tr><td>monitoredTokensAliases</td><td>array</td><td>optional - for better in-app experience</td></tr><tr><td>monitoredAddress</td><td>string</td><td>required</td></tr><tr><td>monitoredAddressAlias</td><td>string</td><td>optional - for better in-app experience</td></tr><tr><td>threshold</td><td>string</td><td>required</td></tr><tr><td>assetsToMonitor</td><td>string</td><td>required - All assets/Specific assets</td></tr><tr><td>monitorUsdValue</td><td>boolean</td><td>required</td></tr><tr><td>secondAddress</td><td>string</td><td>required - depends on the ruleType - see <a data-mention href="address-transfer-activity.md#configuration-options-rule">#configuration-options-rule</a></td></tr><tr><td>secondAddressAlias</td><td>string</td><td>optional - for better in-app experience</td></tr><tr><td>direction</td><td>string</td><td>required - send/receive/send_receive</td></tr><tr><td>ruleString</td><td>string</td><td>optional - for better in-app experience</td></tr></tbody></table>

### Example

```json
{
  "agentType": "addressTransferActivity",
  "agentName": "name",
  "state": "enabled",
  "rule": {
    "chain": "ethereum",
    "monitoredTokens": [],
    "monitoredTokensAliases": [],
    "monitoredAddress": "0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7",
    "monitoredAddressAlias": "Curve.fi: DAI/USDC/USDT Pool",
    "threshold": "1",
    "assetsToMonitor": "All assets",
    "monitorUsdValue": true,
    "direction": "receive",
    "ruleString": "On Ethereum: when Curve.fi: DAI/USDC/USDT Pool received more than  $1  in a single transaction"
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

### Configuration Options (rule)

#### Address sent / received funds - USD value

* `ruleType` - `addressSentOrReceivedFunds`
* `monitoredTokens` empty array
* set `assetsToMonitor` to `All assets`
* set `monitorUsdValue` to `true`

```json
{
  "chain": "ethereum",
  "monitoredTokens": [],
  "monitoredTokensAliases": [],
  "monitoredAddress": "0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7",
  "monitoredAddressAlias": "Curve.fi: DAI/USDC/USDT Pool",
  "threshold": "1",
  "ruleType": "addressSentOrReceivedFunds",
  "assetsToMonitor": "All assets",
  "monitorUsdValue": true,
  "direction": "receive",
  "ruleString": "On Ethereum: when Curve.fi: DAI/USDC/USDT Pool received more than  $1  in a single transaction"
}
```

#### Address sent to / received from another address - USD value

* `ruleType` - `addressSentOrReceivedFromAnotherAddress`
* `monitoredTokens` empty array
* set `assetsToMonitor` to `All assets`
* set `monitorUsdValue` to `true`

```json
{
  "chain": "ethereum",
  "ruleType": "addressSentOrReceivedFromAnotherAddress",
  "direction": "receive",
  "threshold": "1",
  "ruleString": "On Ethereum: when Curve.fi: DAI/USDC/USDT Pool received from Maker: Dai Stablecoin more than  $1  in a single transaction",
  "secondAddress": "0x6b175474e89094c44da98b954eedeac495271d0f",
  "assetsToMonitor": "All assets",
  "monitorUsdValue": true,
  "monitoredTokens": [],
  "monitoredAddress": "0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7",
  "secondAddressAlias": "Maker: Dai Stablecoin",
  "monitoredAddressAlias": "Curve.fi: DAI/USDC/USDT Pool",
  "monitoredTokensAliases": []
}
```

#### Address sent / received specific token(s) - USD value

* `ruleType` - `addressSentOrReceivedTokensUsdValue`
* set `assetsToMonitor` to `Specific assets`
* set `monitorUsdValue` to `true`

```json
{
  "chain": "ethereum",
  "ruleType": "addressSentOrReceivedTokensUsdValue",
  "direction": "receive",
  "threshold": "1",
  "ruleString": "On Ethereum: when Curve.fi: DAI/USDC/USDT Pool received more than  $1 in Maker: Dai Stablecoin, Centre: USD Coin  in a single transaction",
  "assetsToMonitor": "Specific assets",
  "monitorUsdValue": true,
  "monitoredTokens": [
    "0x6b175474e89094c44da98b954eedeac495271d0f",
    "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
  ],
  "monitoredAddress": "0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7",
  "monitoredAddressAlias": "Curve.fi: DAI/USDC/USDT Pool",
  "monitoredTokensAliases": [
    "Maker: Dai Stablecoin",
    "Centre: USD Coin"
  ]
}
```

#### Address sent / received specific token - amount

* `ruleType` - `addressSentOrReceivedTokenAmount`
* Insert only one token into the `monitoredTokens` array
* set `assetsToMonitor` to `Specific assets`
* set `monitorUsdValue` to `false`

```json
{
  "chain": "ethereum",
  "ruleType": "addressSentOrReceivedTokenAmount",
  "direction": "receive",
  "threshold": "1",
  "ruleString": "On Ethereum: when Curve.fi: DAI/USDC/USDT Pool received more than  1 Maker: Dai Stablecoin  in a single transaction",
  "assetsToMonitor": "Specific assets",
  "monitorUsdValue": false,
  "monitoredTokens": [
    "0x6b175474e89094c44da98b954eedeac495271d0f"
  ],
  "monitoredAddress": "0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7",
  "monitoredAddressAlias": "Curve.fi: DAI/USDC/USDT Pool",
  "monitoredTokensAliases": [
    "Maker: Dai Stablecoin"
  ]
}
```

#### Address sent / received specific token(s) to / from another address - USD value

* `ruleType` - `addressSentOrReceivedTokensAnotherAddressUsdValue`
* set `assetsToMonitor` to `Specific assets`
* set `monitorUsdValue` to `true`

```json
{
  "chain": "ethereum",
  "ruleType": "addressSentOrReceivedTokensAnotherAddressUsdValue",
  "direction": "receive",
  "threshold": "1",
  "ruleString": "On Ethereum: when Curve.fi: DAI/USDC/USDT Pool received from Tether: USDT Stablecoin more than  $1 in Maker: Dai Stablecoin, Centre: USD Coin  in a single transaction",
  "secondAddress": "0xdac17f958d2ee523a2206206994597c13d831ec7",
  "assetsToMonitor": "Specific assets",
  "monitorUsdValue": true,
  "monitoredTokens": [
    "0x6b175474e89094c44da98b954eedeac495271d0f",
    "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
  ],
  "monitoredAddress": "0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7",
  "secondAddressAlias": "Tether: USDT Stablecoin",
  "monitoredAddressAlias": "Curve.fi: DAI/USDC/USDT Pool",
  "monitoredTokensAliases": [
    "Maker: Dai Stablecoin",
    "Centre: USD Coin"
  ]
}
```

#### Address sent / received specific token to / from another address - amount

* `ruleType` - `addressSentOrReceivedTokenAnotherAddressAmount`
* Insert only one token into the `monitoredTokens` array
* set `assetsToMonitor` to `Specific assets`
* set `monitorUsdValue` to `false`

```json
{
  "chain": "ethereum",
  "ruleType": "addressSentOrReceivedTokenAnotherAddressAmount",
  "direction": "receive",
  "threshold": "1",
  "ruleString": "On Ethereum: when Curve.fi: DAI/USDC/USDT Pool received from Tether: USDT Stablecoin more than  1 Maker: Dai Stablecoin  in a single transaction",
  "secondAddress": "0xdac17f958d2ee523a2206206994597c13d831ec7",
  "assetsToMonitor": "Specific assets",
  "monitorUsdValue": false,
  "monitoredTokens": [
    "0x6b175474e89094c44da98b954eedeac495271d0f"
  ],
  "monitoredAddress": "0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7",
  "secondAddressAlias": "Tether: USDT Stablecoin",
  "monitoredAddressAlias": "Curve.fi: DAI/USDC/USDT Pool",
  "monitoredTokensAliases": [
    "Maker: Dai Stablecoin"
  ]
}
```
