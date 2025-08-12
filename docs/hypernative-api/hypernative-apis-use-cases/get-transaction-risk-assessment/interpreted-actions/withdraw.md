# Withdraw

#### Description format

* For Originating Wallet - Withdraw \[list of {number of tokens} {token symbol}] (${USD value}) to this Wallet from {address} ({pool alias})
  * Example - Withdraw 1000 USDC, 1000 USDT ($2K) to this Wallet from 0x3416cf6c708da44db2624d63ea0aaef7113527c6 (Uniswap V3: USDC-USDT 4)
* For Involved Addresses - Withdraw \[list of {number of tokens} {token symbol}] (${USD value}) to {address} from {address} ({pool alias})

#### JSON format

```json
{
	"description": "Deposit 1000 USDT ($1K) to 0x3416cf6c708da44db2624d63ea0aaef7113527c6 (Uniswap V3: USDC-USDT 4)",
	"items": [
		{
			"amount": 41000000.0,
			"tokenName": "Origin Dollar Governance",
			"tokenSymbol": "OGV",
			"tokenAddress": "0x9c354503c38481a7a7a51629142963f98ecc12d0",
			"usdValue": 177488.30252126073,
			"tokenMarketCap": 3669025.536898451,
			"tokenTotalSupply": 3669025.536898451,
			"token24HVolume": 262561.4659709194
		},
		{
			"amount": 110.63739140061311,
			"tokenName": "WETH",
			"tokenSymbol": "WETH",
			"tokenAddress": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
			"usdValue": 169995.4822610626,
			"tokenMarketCap": 0.0,
			"tokenTotalSupply": 3669025.536898451,
			"token24HVolume": 371745996.813129
		}
	],
	"totalAmount": 41000110.6373914,
	"totalUsdValue": 347483.7847823233,
	"protocolName": "uniswapV3",
	"poolAddress": "0xa0b30e46f6aeb8f5a849241d703254bb4a719d92",
	"poolId": "0x9c354503c38481a7a7a51629142963f98ecc12d00xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
	"toFrom": "",
	"poolBalance": [
		{
			"tokenAddress": "0x9c354503c38481a7a7a51629142963f98ecc12d0",
			"tokenName": "Origin Dollar Governance",
			"tokenSymbol": "OGV",
			"tokenMarketCap": 3669025.536898451,
			"amountInPool": 53012837.17305437,
			"usdValueInPool": 229491.67028491244
		},
		{
			"tokenAddress": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
			"tokenName": "WETH",
			"tokenSymbol": "WETH",
			"tokenMarketCap": 0.0,
			"amountInPool": 151.34442941424636,
			"usdValueInPool": 232542.2620697977
		}
	],
	"isFullBalance": true
}
```
