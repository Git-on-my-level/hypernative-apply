# Swap

#### Description format

* For Originating Wallet - Swap {number of tokens} {token symbol}] (${USD value}) to {number of tokens} {token symbol}] (${USD value}) to this Wallet on {pool alias}
  * Example - Swap 1000 USDC ($1K) to 1001 USDT ($1K) to this Wallet on Uniswap V3: USDC-USDT 4
* For Involved Addresses - Swap {number of tokens} {token symbol}] (${USD value}) to {number of tokens} {token symbol}] (${USD value}) to this Wallet on {pool alias}

#### JSON format

```json
{
	"description": "Swap 101 USDT ($102) to 102 USDC ($102) to this Wallet on Uniswap V3: USDC-USDT 4",
	"token_from": {
		"tokenName": "Tether",
		"tokenSymbol": "USDT",
		"tokenAddress": "0xdac17f958d2ee523a2206206994597c13d831ec7",
		"tokenTotalSupply": 67602249054.16985,
		"tokenMarketCap": 67625932969.779689,
		"token24HVolume": 34619330861.96415,
		"usdValue": 102.02910257401402,
		"amount": 101.99337,
		"tokenId": 0,
		"isNft": false
	},
	"token_to": {
		"tokenName": "USD Coin",
		"tokenSymbol": "USDC",
		"tokenAddress": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
		"tokenTotalSupply": 67602249054.16985,
		"tokenMarketCap": 67625932969.779689,
		"token24HVolume": 34619330861.96415,
		"usdValue": 102.02910257401402,
		"amount": 101.99337,
		"tokenId": 0,
		"isNft": false
	},
	"protocolName": "uniswapV3",
	"poolAddress": "0x3416cf6c708da44db2624d63ea0aaef7113527c6",
	"toFrom": "",
	"poolBalance": [
		{
			"tokenAddress": "0xdac17f958d2ee523a2206206994597c13d831ec7",
			"tokenName": "Tether",
			"tokenSymbol": "USDT",
			"tokenMarketCap": 67625932969.779689,
			"amountInPool": 53012837.17305437,
			"usdValueInPool": 229491.67028491244
		},
		{
			"tokenAddress": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
			"tokenName": "USD Coin",
			"tokenSymbol": "USDC",
			"tokenMarketCap": 0.0,
			"amountInPool": 151.34442941424636,
			"usdValueInPool": 232542.2620697977
		}
	],
	"isFullBalance": true
}
```
