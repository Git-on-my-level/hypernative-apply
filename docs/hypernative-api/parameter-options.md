# Data Types & Objects

### Date <_date>_

format

```
YYYY-MM-DDTHH:MM:SS.MSZ
```

example

```
"2022-10-18T12:58:30.355Z"
```

### Severity <_enum>_

options

```
Info, Low, Medium, High
```

example

```
"Medium"
```

### Category <_enum>_

options

```
 Governance, Financial, Technical, Security, Community
```

example

```
"SuspiciousActivity"
```

### Protocol _\<enum>_

options

[getProtocolsList Endpoint](supported-protocols/get-supported-protocols.md)

example

```
"Aave V2"
```

### Address <_string>_

example

```
"0xa21740833858985e4d801533a808786d3647fb83"
```

### Channel <_enum>_

options

```
Slack, Email, WebHook
```

example

```
"Email"
```

### Type <_enum>_

used by

[Risk Insight Types Table](../../hypernative-web-application/alerts/hypernative-risk-framework.md)

[Get Risk Insight by ID](risk-insights/get-risk-insight-by-id.md)

example

```
"A-01"
```

### SortBy <_enum>_

options

```
timestamp, severity
```

example

```
"severity"
```

defaults to **timestamp**

### SortDirection _\<enum>_

options

```
desc, asc
```

example

```
"asc"
```

defaults to **desc**

### Chain

Supported chains:

"ethereum"

### Asset _\<json>_

types

```
Protocol, Contract, Wallet
```

[Optional Protocol Names](supported-protocols/get-supported-protocols.md)

examples

```json
#Protocol
{
  "chain": "Ethereum",
  "type": "Protocol",
  "name": "Aave V2" #protocol name getProtocolsList
}

#Contract
{
  "chain": "Ethereum",
  "type": "Contract",
  "address": "0xdAC17F958D2ee523a2206206994597C13D831ec7"
}

#Wallet
{
  "chain": "Ethereum",
  "type": "Wallet",
  "address": "0x071a26dc66df5028ee602713bc34130cb5055b08"
}
```

### Addresses _\<json>_

example

```json
{
  "addresses": [
    {
      "chain": "ethereum",
      "address": "0xdAC17F958D2ee523a2206206994597C13D831ec7"
    },
    {
      "chain": "ethereum",
      "address": "0x071a26dc66df5028ee602713bc34130cb5055b08"
    }
  ]
}
```

### Protocols _\<json>_

example

```json
{
  "protocols": [
    {
      "chain": "ethereum",
      "name": "Aave V2"
    },
    {
      "chain": "ethereum",
      "name": "Uniswap V3"
    }
  ]
}
```
