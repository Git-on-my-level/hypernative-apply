---
description: >-
  For this Custom Agent please selected between the configuration options below
  to prevent errors/mis configuration
---

# Address Balance Change

<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/custom-agents`

### Rule

<table><thead><tr><th width="263">Property</th><th width="94">Type</th><th>Description</th></tr></thead><tbody><tr><td>chain</td><td>string</td><td>required</td></tr><tr><td>ruleType</td><td>string</td><td>optional - for better in-app experience, see <a data-mention href="address-balance-change.md#configuration-options-rule">#configuration-options-rule</a></td></tr><tr><td>monitoredTokens</td><td>array</td><td>required - array of strings (addresses)</td></tr><tr><td>monitoredTokensAliases</td><td>array</td><td>optional - for better in-app experience</td></tr><tr><td>monitoredAddresses</td><td>array of strings</td><td>required</td></tr><tr><td>monitoredAddressesAliases</td><td>array of strings</td><td>optional - for better in-app experience</td></tr><tr><td>threshold</td><td>string</td><td>required</td></tr><tr><td>assetsToMonitor</td><td>string</td><td>required - All assets/Specific assets</td></tr><tr><td>monitorUsdValue</td><td>boolean</td><td>required</td></tr><tr><td>thresholdType</td><td>string</td><td>required - absolute/relative</td></tr><tr><td>direction</td><td>string</td><td>required - increased by/decreased by/more than/less than</td></tr><tr><td>timeFrame</td><td>number</td><td>required - depends on the ruleType - see <a data-mention href="address-balance-change.md#configuration-options-rule">#configuration-options-rule</a></td></tr><tr><td>ruleString</td><td>string</td><td>optional - for better in-app experience</td></tr></tbody></table>

### Example

```json
{
  "agentType": "addressBalanceChanged",
  "agentName": "string",
  "rule": {
    "chain": "ethereum",
    "monitoredTokens": [
      "0x6c3f90f043a72fa612cbac8115ee7e52bde6e490"
    ],
    "monitoredTokensAliases": [
      "Curve.fi: 3CRV Token"
    ],
    "monitoredAddresses": ["0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7"],
    "monitoredAddressesAliases": ["Curve.fi: DAI/USDC/USDT Pool"],
    "threshold": "1",
    "assetsToMonitor": "Specific assets",
    "monitorUsdValue": false,
    "thresholdType": "absolute",
    "direction": "more than",
    "ruleString": "On Ethereum: when the amount of Curve.fi: 3CRV Token in Curve.fi: DAI/USDC/USDT Pool is more than 1 Curve.fi: 3CRV Token"
  },
  "state": "enabled",
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

#### Address - token amount

* `ruleType` - `addressTokenAmount`
* Insert only one token into the `monitoredTokens` array
* set `assetsToMonitor` to `Specific assets`
* set `monitorUsdValue` to `false`
* set `thresholdType` to `absolute`
* direction options - `more than` `less than`

```json
{
  "chain": "ethereum",
  "monitoredTokens": [
    "0x6b175474e89094c44da98b954eedeac495271d0f"
  ],
  "monitoredTokensAliases": [
    "Maker: Dai Stablecoin"
  ],
  "monitoredAddress": "0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7",
  "monitoredAddressAlias": "Curve.fi: DAI/USDC/USDT Pool",
  "threshold": "1",
  "ruleType": "addressTokenAmount",
  "assetsToMonitor": "Specific assets",
  "monitorUsdValue": false,
  "thresholdType": "absolute",
  "direction": "more than",
  "ruleString": "On Ethereum: when the amount of Maker: Dai Stablecoin in Curve.fi: DAI/USDC/USDT Pool is more than 1 Maker: Dai Stablecoin"
}
```

#### Address - token amount change over time

* `ruleType` - `addressTokenAmountChangeOverTime`
* Insert only one token into the `monitoredTokens` array
* set `assetsToMonitor` to `Specific assets`
* set `monitorUsdValue` to `false`
* `thresholdType` options - `absolute` `relative`
* direction options - `increased by` `decreased by`
* timeFrame options (seconds) - `600` `3600` `21600` `43200`

```json
{
  "chain": "ethereum",
  "ruleType": "addressTokenAmountChangeOverTime",
  "direction": "increased by",
  "threshold": "1",
  "ruleString": "On Ethereum: when the amount of Maker: Dai Stablecoin in Curve.fi: DAI/USDC/USDT Pool increased by 1 Maker: Dai Stablecoin in 10 minutes",
  "thresholdType": "absolute",
  "assetsToMonitor": "Specific assets",
  "monitorUsdValue": false,
  "monitoredTokens": [
    "0x6b175474e89094c44da98b954eedeac495271d0f"
  ],
  "monitoredAddress": "0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7",
  "monitoredAddressAlias": "Curve.fi: DAI/USDC/USDT Pool",
  "monitoredTokensAliases": [
    "Maker: Dai Stablecoin"
  ],
  "timeFrame": 600
}
```

#### Address - token(s) value (in USD)

* `ruleType` - `addressTokensValueInUsd`
* set `assetsToMonitor` to `Specific assets`
* set `monitorUsdValue` to `true`
* set `thresholdType` to `absolute`
* direction options - `more than` `less than`

```json
{
  "chain": "ethereum",
  "monitoredTokens": [
    "0x6b175474e89094c44da98b954eedeac495271d0f",
    "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
  ],
  "monitoredTokensAliases": [
    "Maker: Dai Stablecoin",
    "Centre: USD Coin"
  ],
  "monitoredAddress": "0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7",
  "monitoredAddressAlias": "Curve.fi: DAI/USDC/USDT Pool",
  "threshold": "1",
  "ruleType": "addressTokensValueInUsd",
  "assetsToMonitor": "Specific assets",
  "monitorUsdValue": true,
  "thresholdType": "absolute",
  "direction": "more than",
  "ruleString": "On Ethereum: when the value of Maker: Dai Stablecoin, Centre: USD Coin in Curve.fi: DAI/USDC/USDT Pool is more than $1"
}
```

#### Address - token(s) value change over time (in USD)

* `ruleType` - `addressTokensValueChangeOverTimeInUsd`
* set `assetsToMonitor` to `Specific assets`
* set `monitorUsdValue` to `true`
* `thresholdType` options - `absolute` `relative`
* direction options - `increased by` `decreased by`
* timeFrame options (seconds) - `600` `3600` `21600` `43200`

```json
{
  "chain": "ethereum",
  "ruleType": "addressTokensValueChangeOverTimeInUsd",
  "direction": "increased by",
  "threshold": "1",
  "ruleString": "On Ethereum: when the value of Maker: Dai Stablecoin, Centre: USD Coin in Curve.fi: DAI/USDC/USDT Pool increased by $1 in 10 minutes",
  "thresholdType": "absolute",
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
  ],
  "timeFrame": 600
}
```
