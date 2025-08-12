# 🟢 Get Risk Insights by Signed Transaction

## Get Signed Transaction Risk Assessment

<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/risk-assessments/signed-transaction`

#### Headers

| Name                                           | Type             | Description                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| x-client-id                                    | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                       |
| x-client-secret                                | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                                   |
| authorization                                  | String           | <p>Required if you prefer to login with a member's identity. See <a href="../account/login.md">Login with Email and Password</a> or <a href="../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |
| Content-Type<br /><mark style="color:red;">Required</mark> | application/json |                                                                                                                                                                                                                                                                                                                                                         |
| accept<br /><mark style="color:red;">Required</mark>       | application/json |                                                                                                                                                                                                                                                                                                                                                         |

#### Request Body

| Name                                         | Type    | Description                                                                                   |
| -------------------------------------------- | ------- | --------------------------------------------------------------------------------------------- |
| chain<br /><mark style="color:red;">Required</mark>      | String  | [Chain ](../supported-chains/get-supported-chains.md)(from a list of chains)                  |
| blockNumber                                  | Integer |                                                                                               |
| signedData<br /><mark style="color:red;">Required</mark> | String  | Transaction's origin [address](../parameter-options.md#address-less-than-string-greater-than) |
| applicationName                              | String  | the name of the application that originated the transaction                                   |
| applicationUrl                               | String  | the URL of the application that originated the transaction                                    |
| additionalDetails                            | JSON    | a properly-formatted JSON can be added with additional information regarding the transaction  |

{% tabs %}
{% tab title="200: OK " %}
```json
{
  "transactionId": "T_c39d84440f12eb57",
  "transactionRiskScore": "Medium",
  "transactionInvolvedAddresses": [
    {
      "address": "0x0752139330bb7550097a9dd9111570ee4e3b534a",
      "type": "contract",
      "associatedProtocol": "",
      "alias": "",
      "systemLabels": [],
      "riskScores": {
        "community": "Low",
        "technical": "Low",
        "financial": "Low",
        "governance": "Low",
        "security": "Low",
        "total": "Low"
      }
    },
    {
      "address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
      "type": "contract",
      "associatedProtocol": "",
      "alias": "",
      "systemLabels": [
        "Token",
        "USDT"
      ],
      "riskScores": {
        "community": "Low",
        "technical": "Low",
        "financial": "Low",
        "governance": "Low",
        "security": "Low",
        "total": "Low"
      }
    },
    {
      "address": "0x71fc860f7d3a592a4a98740e39db31d25db65ae8",
      "type": "contract",
      "associatedProtocol": "Aave V1",
      "alias": "",
      "systemLabels": [
        "Aave V2",
        "Aave V1",
        "aUSDT"
      ],
      "riskScores": {
        "community": "Low",
        "technical": "Low",
        "financial": "Low",
        "governance": "Low",
        "security": "Low",
        "total": "Low"
      }
    }
  ],
  "transactionRiskInsights": [
    {
      "name": "High value token transfer",
      "category": "Financial",
      "severity": "Info",
      "timestamp": "2020-01-10T15:57:07.000Z",
      "addresses": [
        "0x3dfd23a6c5e8bbcfc9581d2e864a68feb6a076d3",
        "0x622837c6203c1cf4bf0d0fe23263113efba75661"
      ],
      "details": "300000.0 USDT ($299843.8284266924824805755634) transferred from <0x3dfd23a6c5e8bbcfc9581d2e864a68feb6a076d3|0x3dfd23a6c5e8bbcfc9581d2e864a68feb6a076d3> to <0x622837c6203c1cf4bf0d0fe23263113efba75661|0x622837c6203c1cf4bf0d0fe23263113efba75661>",
      "involvedAssets": [
        {
          "address": "0x3dfd23a6c5e8bbcfc9581d2e864a68feb6a076d3",
          "type": "Contract",
          "chain": "ethereum",
          "involvementType": "Sender"
        },
        {
          "address": "0x622837c6203c1cf4bf0d0fe23263113efba75661",
          "type": "Wallet",
          "chain": "ethereum",
          "involvementType": "Recipient"
        }
      ],
      "riskTypeId": "A-09",
      "riskTypeDescription": "Transfer of over $100K value in token",
      "context": {
        "block_number": 9253994,
        "timestamp": "2020-01-10T15:57:07Z",
        "status": "Success",
        "txn_hash": "0x324a55e44cc0f9ee1672dd3562aeab0421d06a4bc3a6ba5534fcae3804678241",
        "from": "0x622837c6203c1cf4bf0d0fe23263113efba75661",
        "to": "0x71fc860f7d3a592a4a98740e39db31d25db65ae8",
        "value": 0,
        "transaction_fee": 0,
        "tokens": [
          {
            "symbol": "USDT",
            "contract": "0xdac17f958d2ee523a2206206994597c13d831ec7",
            "amount": 300000,
            "usd_value": 299843.82842669246
          }
        ],
        "full_involved_assets": [
          {
            "type": "contract",
            "chain": "ethereum",
            "address": "0x3dfd23a6c5e8bbcfc9581d2e864a68feb6a076d3",
            "system_labels": [
              "LendingPoolCore",
              "Aave V2",
              "Aave V1"
            ],
            "involvement": "sender"
          },
          {
            "type": "wallet",
            "chain": "ethereum",
            "address": "0x622837c6203c1cf4bf0d0fe23263113efba75661",
            "system_labels": [],
            "involvement": "origin, recipient"
          },
          {
            "type": "contract",
            "chain": "ethereum",
            "address": "0x71fc860f7d3a592a4a98740e39db31d25db65ae8",
            "system_labels": [
              "Aave V2",
              "Aave V1",
              "aUSDT"
            ],
            "involvement": "destination"
          },
          {
            "type": "contract",
            "chain": "ethereum",
            "address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
            "system_labels": [
              "Token",
              "USDT"
            ],
            "involvement": "token",
            "symbol": "USDT"
          },
          {
            "type": "contract",
            "chain": "ethereum",
            "address": "0x0752139330bb7550097a9dd9111570ee4e3b534a",
            "system_labels": [],
            "involvement": "participant"
          },
          {
            "type": "contract",
            "chain": "ethereum",
            "address": "0x6d252baea75459ed0077410613c5f6e51cab4750",
            "system_labels": [],
            "involvement": "participant"
          },
          {
            "type": "contract",
            "chain": "ethereum",
            "address": "0x398ec7346dcd622edc5ae82352f02be94c62d119",
            "system_labels": [
              "Aave V2",
              "LendingPool",
              "Aave V1"
            ],
            "involvement": "participant"
          }
        ]
      }
    },
    {
      "name": "Minor holdings withdrawal",
      "category": "Financial",
      "severity": "Info",
      "timestamp": "2020-01-10T15:57:07.000Z",
      "addresses": [
        "0x3dfd23a6c5e8bbcfc9581d2e864a68feb6a076d3"
      ],
      "details": "300000.0 USDT ($299843.8284266924824805755634), ~96.37% of contract TVL, withdrawn from contract <0x3dfd23a6c5e8bbcfc9581d2e864a68feb6a076d3|0x3dfd23a6c5e8bbcfc9581d2e864a68feb6a076d3> to <0x622837c6203c1cf4bf0d0fe23263113efba75661|0x622837c6203c1cf4bf0d0fe23263113efba75661>",
      "involvedAssets": [
        {
          "address": "0x3dfd23a6c5e8bbcfc9581d2e864a68feb6a076d3",
          "type": "Contract",
          "chain": "ethereum",
          "involvementType": "Pool"
        }
      ],
      "riskTypeId": "A-1305",
      "riskTypeDescription": "An unusually high value was withdrawn from a minor-holdings pool contract",
      "context": {
        "block_number": 9253994,
        "timestamp": "2020-01-10T15:57:07Z",
        "status": "Success",
        "txn_hash": "0x324a55e44cc0f9ee1672dd3562aeab0421d06a4bc3a6ba5534fcae3804678241",
        "from": "0x622837c6203c1cf4bf0d0fe23263113efba75661",
        "to": "0x71fc860f7d3a592a4a98740e39db31d25db65ae8",
        "value": 0,
        "transaction_fee": 0,
        "tokens": [
          {
            "symbol": "USDT",
            "contract": "0xdac17f958d2ee523a2206206994597c13d831ec7",
            "amount": 300000,
            "usd_value": 299843.82842669246
          }
        ],
        "full_involved_assets": [
          {
            "type": "contract",
            "chain": "ethereum",
            "address": "0x3dfd23a6c5e8bbcfc9581d2e864a68feb6a076d3",
            "system_labels": [
              "LendingPoolCore",
              "Aave V2",
              "Aave V1"
            ],
            "involvement": "pool, sender"
          },
          {
            "type": "wallet",
            "chain": "ethereum",
            "address": "0x622837c6203c1cf4bf0d0fe23263113efba75661",
            "system_labels": [],
            "involvement": "origin, recipient"
          },
          {
            "type": "contract",
            "chain": "ethereum",
            "address": "0x71fc860f7d3a592a4a98740e39db31d25db65ae8",
            "system_labels": [
              "Aave V2",
              "Aave V1",
              "aUSDT"
            ],
            "involvement": "destination"
          },
          {
            "type": "contract",
            "chain": "ethereum",
            "address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
            "system_labels": [
              "Token",
              "USDT"
            ],
            "involvement": "token",
            "symbol": "USDT"
          },
          {
            "type": "contract",
            "chain": "ethereum",
            "address": "0x0752139330bb7550097a9dd9111570ee4e3b534a",
            "system_labels": [],
            "involvement": "participant"
          },
          {
            "type": "contract",
            "chain": "ethereum",
            "address": "0x6d252baea75459ed0077410613c5f6e51cab4750",
            "system_labels": [],
            "involvement": "participant"
          },
          {
            "type": "contract",
            "chain": "ethereum",
            "address": "0x398ec7346dcd622edc5ae82352f02be94c62d119",
            "system_labels": [
              "Aave V2",
              "LendingPool",
              "Aave V1"
            ],
            "involvement": "participant"
          }
        ]
      }
    },
    {
      "name": "Recently deployed destination",
      "category": "Technical",
      "severity": "Medium",
      "timestamp": "2020-01-10T15:57:07.000Z",
      "addresses": [
        "0x71fc860f7d3a592a4a98740e39db31d25db65ae8"
      ],
      "details": "The destination 0x71fc860f7d3a592a4a98740e39db31d25db65ae8 is a recently deployed contract - deployed on 2020-01-08 16:37:30",
      "involvedAssets": [
        {
          "address": "0x71fc860f7d3a592a4a98740e39db31d25db65ae8",
          "type": "Contract",
          "chain": "ethereum",
          "involvementType": "Destination"
        }
      ],
      "riskTypeId": "TRI-04",
      "riskTypeDescription": "Destination is a recently deployed contract",
      "context": {
        "block_number": 9253994,
        "timestamp": "2020-01-10T15:57:07Z",
        "status": "Success",
        "txn_hash": "0x324a55e44cc0f9ee1672dd3562aeab0421d06a4bc3a6ba5534fcae3804678241",
        "from": "0x622837c6203c1cf4bf0d0fe23263113efba75661",
        "to": "0x71fc860f7d3a592a4a98740e39db31d25db65ae8",
        "value": 0,
        "transaction_fee": 0,
        "full_involved_assets": [
          {
            "type": "wallet",
            "chain": "ethereum",
            "address": "0x622837c6203c1cf4bf0d0fe23263113efba75661",
            "system_labels": [],
            "involvement": "origin"
          },
          {
            "type": "contract",
            "chain": "ethereum",
            "address": "0x71fc860f7d3a592a4a98740e39db31d25db65ae8",
            "system_labels": [
              "Aave V2",
              "Aave V1",
              "aUSDT"
            ],
            "involvement": "token, destination",
            "symbol": "AUSDT"
          },
          {
            "type": "contract",
            "chain": "ethereum",
            "address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
            "system_labels": [
              "Token",
              "USDT"
            ],
            "involvement": "token",
            "symbol": "USDT"
          },
          {
            "type": "contract",
            "chain": "ethereum",
            "address": "0x0752139330bb7550097a9dd9111570ee4e3b534a",
            "system_labels": [],
            "involvement": "participant"
          },
          {
            "type": "contract",
            "chain": "ethereum",
            "address": "0x3dfd23a6c5e8bbcfc9581d2e864a68feb6a076d3",
            "system_labels": [
              "LendingPoolCore",
              "Aave V2",
              "Aave V1"
            ],
            "involvement": "participant"
          },
          {
            "type": "contract",
            "chain": "ethereum",
            "address": "0x6d252baea75459ed0077410613c5f6e51cab4750",
            "system_labels": [],
            "involvement": "participant"
          },
          {
            "type": "contract",
            "chain": "ethereum",
            "address": "0x398ec7346dcd622edc5ae82352f02be94c62d119",
            "system_labels": [
              "Aave V2",
              "LendingPool",
              "Aave V1"
            ],
            "involvement": "participant"
          }
        ]
      }
    }
  ],
  "tokenTransfers": [
    {
      "amount": 1.184914,
      "chain": "ethereum",
      "from": "0x0000000000000000000000000000000000000000",
      "to": "0x622837c6203c1cf4bf0d0fe23263113efba75661",
      "tokenAddress": "0x71fc860f7d3a592a4a98740e39db31d25db65ae8",
      "tokenSymbol": "AUSDT",
      "usdValue": 0
    },
    {
      "amount": 300000,
      "chain": "ethereum",
      "from": "0x622837c6203c1cf4bf0d0fe23263113efba75661",
      "to": "0x0000000000000000000000000000000000000000",
      "tokenAddress": "0x71fc860f7d3a592a4a98740e39db31d25db65ae8",
      "tokenSymbol": "AUSDT",
      "usdValue": 0
    },
    {
      "amount": 300000,
      "chain": "ethereum",
      "from": "0x3dfd23a6c5e8bbcfc9581d2e864a68feb6a076d3",
      "to": "0x622837c6203c1cf4bf0d0fe23263113efba75661",
      "tokenAddress": "0xdac17f958d2ee523a2206206994597c13d831ec7",
      "tokenSymbol": "USDT",
      "usdValue": 299843.82842669246
    }
  ],
  "addressBalanceChanges": {
    "0x622837c6203c1cf4bf0d0fe23263113efba75661": [
      {
        "amount": 299998.815086,
        "changeType": "Send",
        "tokenAddress": "0x71fc860f7d3a592a4a98740e39db31d25db65ae8",
        "chain": "ethereum",
        "tokenSymbol": "AUSDT",
        "usdValue": 0
      },
      {
        "amount": 300000,
        "changeType": "Receive",
        "tokenAddress": "0xdac17f958d2ee523a2206206994597c13d831ec7",
        "chain": "ethereum",
        "tokenSymbol": "USDT",
        "usdValue": 299843.82842669246
      }
    ],
    "0x3dfd23a6c5e8bbcfc9581d2e864a68feb6a076d3": [
      {
        "amount": 300000,
        "changeType": "Send",
        "tokenAddress": "0xdac17f958d2ee523a2206206994597c13d831ec7",
        "chain": "ethereum",
        "tokenSymbol": "USDT",
        "usdValue": 299843.82842669246
      }
    ]
  },
  "transactionInterpretation": {
    "originating_wallet_actions": {
      "0x622837c6203c1cf4bf0d0fe23263113efba75661": {
        "receive": [
          {
            "token_name": "Aave USDT v1",
            "token_symbol": "AUSDT",
            "token_address": "0x71fc860f7d3a592a4a98740e39db31d25db65ae8",
            "token_total_supply": 0,
            "token_market_cap": 0,
            "amount": 1.184914,
            "token_id": 0,
            "to": "0x622837c6203c1cf4bf0d0fe23263113efba75661",
            "from": "0x0000000000000000000000000000000000000000",
            "is_nft": false,
            "decimals": 6,
            "description": "Receive 1.184914 AUSDT ($0) from 0x0000000000000000000000000000000000000000 to this Wallet",
            "token_24h_volume": 0,
            "usd_value": 0
          },
          {
            "token_name": "Tether",
            "token_symbol": "USDT",
            "token_address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
            "token_total_supply": 4289174896.180974,
            "token_market_cap": 4286942072.2085485,
            "amount": 300000,
            "token_id": 0,
            "to": "0x622837c6203c1cf4bf0d0fe23263113efba75661",
            "from": "0x3dfd23a6c5e8bbcfc9581d2e864a68feb6a076d3",
            "is_nft": false,
            "decimals": 6,
            "description": "Receive 300000.0 USDT ($299843.8284266924824805755634) from 0x3dfd23a6c5e8bbcfc9581d2e864a68feb6a076d3 to this Wallet",
            "token_24h_volume": 31855695067.773724,
            "usd_value": 299843.82842669246
          }
        ],
        "send": [
          {
            "token_name": "Aave USDT v1",
            "token_symbol": "AUSDT",
            "token_address": "0x71fc860f7d3a592a4a98740e39db31d25db65ae8",
            "token_total_supply": 0,
            "token_market_cap": 0,
            "amount": 300000,
            "token_id": 0,
            "to": "0x0000000000000000000000000000000000000000",
            "from": "0x622837c6203c1cf4bf0d0fe23263113efba75661",
            "is_nft": false,
            "decimals": 6,
            "description": "Send 300000.0 AUSDT ($0) from this Wallet to 0x0000000000000000000000000000000000000000",
            "token_24h_volume": 0,
            "usd_value": 0
          }
        ],
        "withdraw": [
          {
            "items": [
              {
                "amount": 300000,
                "token_name": "Tether",
                "token_symbol": "USDT",
                "token_address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
                "token_market_cap": 4286942072.2085485,
                "token_total_supply": 4289174896.180974,
                "token_24h_volume": 31855695067.773724,
                "usd_value": 299843.82842669246
              }
            ],
            "total_amount": 300000,
            "protocol_name": "aaveV1",
            "pool_address": "0x3dfd23a6c5e8bbcfc9581d2e864a68feb6a076d3",
            "pool_id": "0xdac17f958d2ee523a2206206994597c13d831ec7",
            "to_from": "0x622837c6203c1cf4bf0d0fe23263113efba75661",
            "pool_balance": [
              {
                "token_address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
                "token_name": "Tether",
                "token_symbol": "USDT",
                "token_market_cap": 4286942072.2085485,
                "amount_in_pool": 11295.714798,
                "usd_value_in_pool": 11289.834566161211
              }
            ],
            "is_full_balance": true,
            "total_usd_value": 299843.82842669246,
            "description": "withdraw 300000.0 USDT ($299843.8284266924824805755634) from Pool 0x3dfd23a6c5e8bbcfc9581d2e864a68feb6a076d3 to this Wallet"
          }
        ]
      }
    },
    "involved_addresses_actions": {
      "0x3dfd23a6c5e8bbcfc9581d2e864a68feb6a076d3": {
        "send": [
          {
            "token_name": "Tether",
            "token_symbol": "USDT",
            "token_address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
            "token_total_supply": 4289174896.180974,
            "token_market_cap": 4286942072.2085485,
            "amount": 300000,
            "token_id": 0,
            "to": "0x622837c6203c1cf4bf0d0fe23263113efba75661",
            "from": "0x3dfd23a6c5e8bbcfc9581d2e864a68feb6a076d3",
            "is_nft": false,
            "decimals": 6,
            "description": "Send 300000.0 USDT ($299843.8284266924824805755634) from 0x3dfd23a6c5e8bbcfc9581d2e864a68feb6a076d3 to 0x622837c6203c1cf4bf0d0fe23263113efba75661",
            "token_24h_volume": 31855695067.773724,
            "usd_value": 299843.82842669246
          }
        ]
      }
    }
  }
}
```
{% endtab %}
{% endtabs %}

### Example

#### Request:

{% tabs %}
{% tab title="Curl" %}
```bash
  curl -X 'POST' \
  'https://api.hypernative.xyz/risk-assessments/signed-transaction' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'x-client-id: <API Client ID> \'
  -H 'x-client-secret: <API Client Secret> \'
  -d '{
  "chain": "ethereum",
  "signedData": "f888058483215600830456b59471fc860f7d3a592a4a98740e39db31d25db65ae880a4db006a7500000000000000000000000000000000000000000000000000000045d964b80026a09e868c6028c0abd9e0f5485780d65ef74362114297267c0c868ad0038d279bd9a062e2cbcd6eaae7750d7cfce769bff8a05f48f54c690b858f2981b92ca25e10bd",
  "blockNumber": 9253994
  }'

```
{% endtab %}

{% tab title="Python" %}
<pre class="language-python"><code class="lang-python">endpoint = "https://api.hypernative.xyz/risk-assessments/signed-transaction"
headers={
  "Authorization": "Bearer &#x3C;token>",
  "Content-Type": "application/json"
}
<strong>payload ={
</strong>  "chain": "ethereum",
  "signedData": "f888058483215600830456b59471fc860f7d3a592a4a98740e39db31d25db65ae880a4db006a7500000000000000000000000000000000000000000000000000000045d964b80026a09e868c6028c0abd9e0f5485780d65ef74362114297267c0c868ad0038d279bd9a062e2cbcd6eaae7750d7cfce769bff8a05f48f54c690b858f2981b92ca25e10bd",
  "blockNumber": 9253994
}
response = requests.post(endpoint, json=payload, headers=headers).json()
</code></pre>
{% endtab %}
{% endtabs %}

#### Response:

```json
{
    "success": true,
    "data": {
        "transactionId": "T_6626cfe0d3787c24",
        "transactionRiskScore": "Medium",
        "transactionInvolvedAddresses": [
            {
                "address": "0x71fc860f7d3a592a4a98740e39db31d25db65ae8",
                "type": "contract",
                "associatedProtocol": "",
                "alias": "",
                "systemLabels": [
                    "Aave V1",
                    "Aave V2",
                    "aUSDT"
                ],
                "riskScores": {
                    "community": "Low",
                    "technical": "Low",
                    "financial": "Low",
                    "governance": "Low",
                    "security": "Low",
                    "total": "Low"
                }
            },
            {
                "address": "0x622837c6203c1cf4bf0d0fe23263113efba75661",
                "type": "wallet",
                "associatedProtocol": "",
                "alias": "",
                "systemLabels": [],
                "riskScores": {
                    "community": "Low",
                    "technical": "Low",
                    "financial": "Low",
                    "governance": "Low",
                    "security": "Low",
                    "total": "Low"
                }
            },
			//more...
            {
                "address": "0x6d252baea75459ed0077410613c5f6e51cab4750",
                "type": "contract",
                "associatedProtocol": "",
                "alias": "",
                "systemLabels": [],
                "riskScores": {
                    "community": "Low",
                    "technical": "Low",
                    "financial": "Low",
                    "governance": "Low",
                    "security": "Low",
                    "total": "Low"
                }
            }
        ],
        "transactionRiskInsights": [
            {
                "name": "High value token transfer",
                "category": "Financial",
                "severity": "Info",
                "timestamp": "2020-01-10T15:57:07.000Z",
                "addresses": [
                    "0x3dfd23a6c5e8bbcfc9581d2e864a68feb6a076d3",
                    "0x622837c6203c1cf4bf0d0fe23263113efba75661"
                ],
                "details": "300000.0 USDT ($299843.8284266924824805755634) transferred from <0x3dfd23a6c5e8bbcfc9581d2e864a68feb6a076d3|0x3dfd23a6c5e8bbcfc9581d2e864a68feb6a076d3> to <0x622837c6203c1cf4bf0d0fe23263113efba75661|0x622837c6203c1cf4bf0d0fe23263113efba75661>",
                "involvedAssets": [
                    {
                        "address": "0x3dfd23a6c5e8bbcfc9581d2e864a68feb6a076d3",
                        "type": "Contract",
                        "chain": "ethereum",
                        "involvementType": "Sender"
                    },
                    {
                        "address": "0x622837c6203c1cf4bf0d0fe23263113efba75661",
                        "type": "Wallet",
                        "chain": "ethereum",
                        "involvementType": "Recipient"
                    }
                ],
           //more...
            }
        ],
        "tokenTransfers": [
            {
                "amount": 1.184914,
                "chain": "ethereum",
                "from": "0x0000000000000000000000000000000000000000",
                "to": "0x622837c6203c1cf4bf0d0fe23263113efba75661",
                "tokenAddress": "0x71fc860f7d3a592a4a98740e39db31d25db65ae8",
                "tokenSymbol": "AUSDT",
                "usdValue": 0
            }
			//more...
        ],
        "addressBalanceChanges": {
            "0x622837c6203c1cf4bf0d0fe23263113efba75661": [
                {
                    "amount": 299998.815086,
                    "changeType": "Send",
                    "tokenAddress": "0x71fc860f7d3a592a4a98740e39db31d25db65ae8",
                    "chain": "ethereum",
                    "tokenSymbol": "AUSDT",
                    "usdValue": 0
                },
                {
                    "amount": 300000,
                    "changeType": "Receive",
                    "tokenAddress": "0xdac17f958d2ee523a2206206994597c13d831ec7",
                    "chain": "ethereum",
                    "tokenSymbol": "USDT",
                    "usdValue": 299843.82842669246
                }
            ],
            "0x3dfd23a6c5e8bbcfc9581d2e864a68feb6a076d3": [
                {
                    "amount": 300000,
                    "changeType": "Send",
                    "tokenAddress": "0xdac17f958d2ee523a2206206994597c13d831ec7",
                    "chain": "ethereum",
                    "tokenSymbol": "USDT",
                    "usdValue": 299843.82842669246
                }
            ]
        },
        "transactionInterpretation": {
            "originating_wallet_actions": {
                "0x622837c6203c1cf4bf0d0fe23263113efba75661": {
                    "receive": [
                        {
                            "token_name": "Aave USDT v1",
                            "token_symbol": "AUSDT",
                            "token_address": "0x71fc860f7d3a592a4a98740e39db31d25db65ae8",
                            "token_total_supply": 0,
                            "token_market_cap": 0,
                            "amount": 1.184914,
                            "token_id": 0,
                            "to": "0x622837c6203c1cf4bf0d0fe23263113efba75661",
                            "from": "0x0000000000000000000000000000000000000000",
                            "is_nft": false,
                            "decimals": 6,
                            "description": "Receive 1.184914 AUSDT ($0) from 0x0000000000000000000000000000000000000000 to this Wallet",
                            "token_24h_volume": 0,
                            "usd_value": 0
                        },
                        {
                            "token_name": "Tether",
                            "token_symbol": "USDT",
                            "token_address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
                            "token_total_supply": 4289174896.180974,
                            "token_market_cap": 4286942072.2085485,
                            "amount": 300000,
                            "token_id": 0,
                            "to": "0x622837c6203c1cf4bf0d0fe23263113efba75661",
                            "from": "0x3dfd23a6c5e8bbcfc9581d2e864a68feb6a076d3",
                            "is_nft": false,
                            "decimals": 6,
                            "description": "Receive 300000.0 USDT ($299843.8284266924824805755634) from 0x3dfd23a6c5e8bbcfc9581d2e864a68feb6a076d3 to this Wallet",
                            "token_24h_volume": 31855695067.773724,
                            "usd_value": 299843.82842669246
                        }
                    ],
                    "send": [
                        {
                            "token_name": "Aave USDT v1",
                            "token_symbol": "AUSDT",
                            "token_address": "0x71fc860f7d3a592a4a98740e39db31d25db65ae8",
                            "token_total_supply": 0,
                            "token_market_cap": 0,
                            "amount": 300000,
                            "token_id": 0,
                            "to": "0x0000000000000000000000000000000000000000",
                            "from": "0x622837c6203c1cf4bf0d0fe23263113efba75661",
                            "is_nft": false,
                            "decimals": 6,
                            "description": "Send 300000.0 AUSDT ($0) from this Wallet to 0x0000000000000000000000000000000000000000",
                            "token_24h_volume": 0,
                            "usd_value": 0
                        }
                    ],
                    "withdraw": [
                        {
                            "items": [
                                {
                                    "amount": 300000,
                                    "token_name": "Tether",
                                    "token_symbol": "USDT",
                                    "token_address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
                                    "token_market_cap": 4286942072.2085485,
                                    "token_total_supply": 4289174896.180974,
                                    "token_24h_volume": 31855695067.773724,
                                    "usd_value": 299843.82842669246
                                }
                            ],
                            "total_amount": 300000,
                            "protocol_name": "aaveV1",
                            "pool_address": "0x3dfd23a6c5e8bbcfc9581d2e864a68feb6a076d3",
                            "pool_id": "0xdac17f958d2ee523a2206206994597c13d831ec7",
                            "to_from": "0x622837c6203c1cf4bf0d0fe23263113efba75661",
                            "pool_balance": [
                                {
                                    "token_address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
                                    "token_name": "Tether",
                                    "token_symbol": "USDT",
                                    "token_market_cap": 4286942072.2085485,
                                    "amount_in_pool": 11295.714798,
                                    "usd_value_in_pool": 11289.834566161211
                                }
                            ],
                            "is_full_balance": true,
                            "total_usd_value": 299843.82842669246,
                            "description": "withdraw 300000.0 USDT ($299843.8284266924824805755634) from Pool 0x3dfd23a6c5e8bbcfc9581d2e864a68feb6a076d3 to this Wallet"
                        }
                    ]
                }
            },
            "involved_addresses_actions": {
                "0x3dfd23a6c5e8bbcfc9581d2e864a68feb6a076d3": {
                    "send": [
                        {
                            "token_name": "Tether",
                            "token_symbol": "USDT",
                            "token_address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
                            "token_total_supply": 4289174896.180974,
                            "token_market_cap": 4286942072.2085485,
                            "amount": 300000,
                            "token_id": 0,
                            "to": "0x622837c6203c1cf4bf0d0fe23263113efba75661",
                            "from": "0x3dfd23a6c5e8bbcfc9581d2e864a68feb6a076d3",
                            "is_nft": false,
                            "decimals": 6,
                            "description": "Send 300000.0 USDT ($299843.8284266924824805755634) from 0x3dfd23a6c5e8bbcfc9581d2e864a68feb6a076d3 to 0x622837c6203c1cf4bf0d0fe23263113efba75661",
                            "token_24h_volume": 31855695067.773724,
                            "usd_value": 299843.82842669246
                        }
                    ]
                }
            }
        }
    },
    "error": null,
    "version": "2.2.0",
    "service": "hypernative-webapp-server"
}
```
