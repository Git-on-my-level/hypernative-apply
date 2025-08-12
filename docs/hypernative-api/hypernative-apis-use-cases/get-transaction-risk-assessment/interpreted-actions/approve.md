# Approve

#### Description format

* For Originating Wallet - Approve ({amount or unlimited}) {token symbol} from this Wallet to {address} (current holdings {number of tokens} {token symbol} (${USD value})
  * Example - "Approve unlimited USDT from this Wallet to 0x123 (current holdings 1000 USDT, \~$1K)",
* For Involved Addresses - Approve ({amount or unlimited}) {token symbol} from {address} to {address} (current holdings {number of tokens} {token symbol} (${USD value})

#### JSON format

```json
{
	"description": "Approve unlimited USDT from this Wallet to 0x123 (current holdings 1000 USDT, ~$1K)",
	"tokenName": "Tether",
	"tokenSymbol": "USDT",
	"tokenAddress": "0xdac17f958d2ee523a2206206994597c13d831ec7",
	"tokenTotalSupply": 67602249054.16985,
	"tokenMarketCap": 67625932969.779689,
	"token24HVolume": 34619330861.96415,
	"usdValue": 102.02910257401402,
	"amount": 101.99337,
	"tokenId": 0,
	"to": "0x244c97579fbafec8bca08c19c87552b610230e80",
	"from": "0xa9d1e08c7793af67e9d92fe308d5697fb81d3e43",
	"isNft": false
}
```
