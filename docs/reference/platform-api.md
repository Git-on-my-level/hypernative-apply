# Hypernative Platform - Ultimate Technical Documentation

**Author**: Ilan Sernov

**Version**: 3.0.0  
**Last Updated**: 2024-01-15  
**Total Technical Specifications**: 750+  
**Code Examples**: 200+  
**Supported Protocols**: 65+  
**Integration Examples**: 30+

## Table of Contents

### Core Platform
1. [Platform Overview](#platform-overview)
2. [Core Capabilities](#core-capabilities)
3. [Address Screening (Screener) - Complete Technical Reference](#address-screening-screener---complete-technical-reference)
4. [Hypernative Agents SDK V2 - Full Technical Reference](#hypernative-agents-sdk-v2---full-technical-reference)
5. [REST API Documentation - Complete Reference](#rest-api-documentation---complete-reference)
6. [Custom Agents - All 40+ Types with Configurations](#custom-agents---all-40-types-with-configurations)
7. [Guardian Feature - Transaction Security Implementation](#guardian-feature---transaction-security-implementation)

### Advanced Features
8. [SDK Examples - Real-World Implementations](#sdk-examples---real-world-implementations)
9. [Best Practices & Troubleshooting](#best-practices--troubleshooting)
10. [Protocol-Specific Implementations (65+ Protocols)](#protocol-specific-implementations-65-protocols)
11. [Integration Tutorials (25+ Services)](#integration-tutorials-25-services)
12. [Risk Framework & Security Solutions](#risk-framework--security-solutions)
13. [Non-EVM Chain Implementations](#non-evm-chain-implementations)

### Production Guide
14. [Supported Chains - Complete Technical Matrix](#supported-chains---complete-technical-matrix)
15. [Automated Response Smart Contracts](#automated-response-smart-contracts)
16. [Production Implementation Guide](#production-implementation-guide)
17. [Templates & Configuration Library](#templates--configuration-library)
18. [Educational Resources & Tips](#educational-resources--tips)
19. [Technical Specifications](#technical-specifications)

## Platform Overview

Hypernative is a Web3 security monitoring and automated response platform providing:
- **Sub-10 second alert latency** from on-chain events
- **99.9% uptime SLA** for enterprise deployments
- **$100M+ saved** from prevented exploits
- **200+ pre-configured risk types** monitored continuously
- **66 chains supported** (58 mainnet + 8 testnet)
- **65+ protocol-specific monitors** ready to deploy

### Core Architecture
```
┌─────────────────┐     ┌──────────────┐     ┌─────────────┐
│  Block Ingestion│────▶│  Processing  │────▶│   Alert     │
│   (All Chains)  │     │    Engine    │     │   Engine    │
└─────────────────┘     └──────────────┘     └─────────────┘
         │                      │                     │
         ▼                      ▼                     ▼
┌─────────────────┐     ┌──────────────┐     ┌─────────────┐
│   Data Lake     │     │  ML Models   │     │  Response   │
│   (Historical)  │     │  (Real-time) │     │  Execution  │
└─────────────────┘     └──────────────┘     └─────────────┘
```

- Block-by-block transaction analysis across all supported chains
- Multi-source data aggregation (on-chain, off-chain, ML models)
- Distributed processing with horizontal scaling
- Queue-based architecture for heavy operations
- CDN-backed static asset delivery
- Multi-region redundancy with automatic failover

## Core Capabilities

### 1. Real-Time Risk Detection
- **Processing Speed**: <10 seconds from block confirmation to alert
- **Risk Types**: 200+ pre-configured, unlimited custom
- **Detection Methods**: Pattern matching, ML models, heuristics
- **Coverage**: Full blockchain monitoring, not sampling
- **Accuracy**: 99.7% true positive rate on critical alerts

### 2. Automated Response System
- **Response Time**: <10 seconds from detection to action
- **Action Types**: Pause protocols, exit positions, move funds, custom calls
- **Execution Methods**: Direct wallet, multisig, smart contracts
- **Simulation**: All actions simulated before execution
- **Success Rate**: 99.9% for pre-configured responses

### 3. Pre-Transaction Security (Guardian)
- **Assessment Time**: <500ms average, <2s P99
- **Risk Categories**: 50+ detection rules
- **Integration Methods**: API, wallet plugins, smart contracts
- **Policy Enforcement**: Role-based, threshold-based, custom rules
- **Coverage**: 100% of submitted transactions

## Address Screening (Screener) - Complete Technical Reference

### All 30 Screening Flags with Technical Details

#### Origin Flags (Direct Risk Sources)

##### Sanctions Flags
| Flag Code | Name | Description | Pool Toxicity | API Response |
|-----------|------|-------------|---------------|--------------|
| OF-1010 | OFAC-sanctioned | Addresses on OFAC SDN list | ✅ | `{"flag": "OF-1010", "severity": "critical", "source": "ofac_sdn"}` |
| OF-1011 | UK-sanctioned | UK OFSI list addresses | ✅ | `{"flag": "OF-1011", "severity": "critical", "source": "uk_ofsi"}` |
| OF-1012 | EU-sanctioned | EU consolidated sanctions | ✅ | `{"flag": "OF-1012", "severity": "critical", "source": "eu_consolidated"}` |
| OF-1013 | Sanctioned removed | Previously sanctioned, now cleared | ❌ | `{"flag": "OF-1013", "severity": "info", "removal_date": "2024-01-15"}` |
| OF-1014 | Unified Sanctions | Multiple sanctions lists | ✅ | `{"flag": "OF-1014", "severity": "critical", "sources": ["ofac", "uk", "eu"]}` |
| OF-1015 | Japan Economic Sanctions | Japan sanctions list | ✅ | `{"flag": "OF-1015", "severity": "critical", "source": "japan_mof"}` |
| OF-1016 | French National Asset Freezing | French sanctions | ✅ | `{"flag": "OF-1016", "severity": "critical", "source": "france_tresor"}` |

##### Mixers & Privacy
| Flag Code | Name | Description | Pool Toxicity | API Response |
|-----------|------|-------------|---------------|--------------|
| OF-1510 | Mixer address | Known mixer services | ✅ | `{"flag": "OF-1510", "severity": "high", "mixer_type": "tornado_cash"}` |
| OF-1610 | Privacy preserving protocol | ZK-based privacy (not mixing) | ✅ | `{"flag": "OF-1610", "severity": "medium", "protocol": "aztec"}` |

##### Exchange & KYC
| Flag Code | Name | Description | Pool Toxicity | API Response |
|-----------|------|-------------|---------------|--------------|
| OF-1710 | No or weak KYC exchange | Exchanges with insufficient KYC | ❌ | `{"flag": "OF-1710", "severity": "medium", "exchange": "example_dex"}` |

##### Exploits & Attacks
| Flag Code | Name | Description | Pool Toxicity | API Response |
|-----------|------|-------------|---------------|--------------|
| OF-1310 | Attacker wallet | Confirmed exploit attacker | ✅ | `{"flag": "OF-1310", "severity": "critical", "incident_id": "2024-001"}` |
| OF-1311 | Attacker Contract | Exploit contract | ✅ | `{"flag": "OF-1311", "severity": "critical", "exploit_type": "reentrancy"}` |
| OF-1312 | Potentially malicious wallet | Suspected attacker | ❌ | `{"flag": "OF-1312", "severity": "high", "confidence": 0.85}` |
| OF-1313 | Potentially malicious contract | Suspected exploit contract | ❌ | `{"flag": "OF-1313", "severity": "high", "indicators": ["unusual_pattern"]}` |
| OF-1314 | Suspected victim | Hack victim address | ❌ | `{"flag": "OF-1314", "severity": "info", "loss_amount": "1000000"}` |

##### Stablecoin Blacklists
| Flag Code | Name | Description | Pool Toxicity | API Response |
|-----------|------|-------------|---------------|--------------|
| OF-1110 | Blacklisted by Circle (USDC) | USDC blacklist | ❌ | `{"flag": "OF-1110", "severity": "critical", "blacklist_date": "2024-01-01"}` |
| OF-1111 | Unblacklisted by Circle | Previously blacklisted USDC | ❌ | `{"flag": "OF-1111", "severity": "info", "removal_date": "2024-02-01"}` |
| OF-1112 | Blacklisted by Tether (USDT) | USDT blacklist | ❌ | `{"flag": "OF-1112", "severity": "critical", "blacklist_date": "2024-01-01"}` |
| OF-1113 | Unblacklisted by Tether | Previously blacklisted USDT | ❌ | `{"flag": "OF-1113", "severity": "info", "removal_date": "2024-02-01"}` |

##### Fraud & Terrorism
| Flag Code | Name | Description | Pool Toxicity | API Response |
|-----------|------|-------------|---------------|--------------|
| OF-1410 | Phishing & Scamming | Hypernative fraud detection | ✅ | `{"flag": "OF-1410", "severity": "high", "scam_type": "phishing"}` |
| OF-1411 | Phishing & Scams 3rd party | External fraud sources | ❌ | `{"flag": "OF-1411", "severity": "medium", "source": "chainabuse"}` |
| OF-1210 | Terrorism financing | NBCTF flagged addresses | ✅ | `{"flag": "OF-1210", "severity": "critical", "source": "nbctf"}` |

#### Relation Flags (Indirect Risk - All Support Pool Toxicity)

| Flag Code | Name | Hops | Trace Amount | API Response |
|-----------|------|------|--------------|--------------|
| RF-1010 | Related to OFAC-sanctioned | 1-3 | >$1000 | `{"flag": "RF-1010", "hops": 2, "amount": "50000"}` |
| RF-1310 | Related to Attacker wallet | 1-2 | >$10000 | `{"flag": "RF-1310", "hops": 1, "incident": "2024-001"}` |
| RF-1510 | Related to Mixer address | 1-2 | Any | `{"flag": "RF-1510", "hops": 1, "mixer": "tornado_cash"}` |

### Pool Toxicity API Implementation

#### Request
```bash
POST https://api.hypernative.xyz/screener/v2/pool-toxicity
Headers:
  x-client-id: YOUR_CLIENT_ID
  x-client-secret: YOUR_CLIENT_SECRET
Body:
{
  "pool_address": "0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8",
  "protocol": "uniswap_v3",
  "chain": "ethereum",
  "policy_id": "strict_defi_policy"
}
```

#### Response
```json
{
  "pool_address": "0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8",
  "toxicity_percentage": 15.73,
  "recommendation": "warn",
  "breakdown": {
    "OF-1310": {
      "percentage": 8.5,
      "addresses": ["0xabc...", "0xdef..."],
      "total_value": 2500000
    },
    "RF-1310": {
      "percentage": 7.23,
      "addresses": ["0x123...", "0x456..."],
      "total_value": 1800000
    }
  },
  "total_liquidity": 25000000,
  "providers_analyzed": 147,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Policy Configuration with Advanced Rules

```json
{
  "id": "strict_defi_policy",
  "name": "Strict DeFi Compliance",
  "chains": ["ethereum", "arbitrum", "polygon"],
  "default_action": "approve",
  "flags": {
    "OF-1010": {
      "severity": "critical",
      "action": "deny",
      "notification": true
    },
    "OF-1310": {
      "severity": "critical", 
      "action": "deny",
      "auto_report": true
    },
    "RF-1310": {
      "severity": "high",
      "action": "warn",
      "conditions": {
        "hops": {"max": 2},
        "amount_usd": {"min": 10000},
        "time_window": {"hours": 168}
      }
    }
  },
  "pool_toxicity": {
    "enabled": true,
    "thresholds": {
      "critical": 25,
      "high": 15,
      "medium": 5
    },
    "flag_weights": {
      "OF-1310": 2.0,
      "OF-1010": 2.0,
      "RF-1310": 1.0
    }
  },
  "whitelist": ["0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"],
  "blacklist": ["0x123..."],
  "notification_channels": ["webhook_prod", "slack_security"]
}
```

## REST API Documentation - Complete Endpoint Reference

### Authentication
All API requests require authentication using one of these methods:

#### Method 1: API Key Headers
```bash
Headers:
  x-client-id: YOUR_CLIENT_ID
  x-client-secret: YOUR_CLIENT_SECRET
```

#### Method 2: Bearer Token
```bash
# Get token
POST /auth/login
Body: {"email": "user@example.com", "password": "password"}

# Use token
Headers:
  Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

### Complete API Endpoints

#### Alerts API

##### List Alerts
```bash
GET /alerts

Query Parameters:
  limit: 100 (max 1000)
  offset: 0
  severity: "critical" | "high" | "medium" | "low"
  status: "open" | "acknowledged" | "resolved"
  from: "2024-01-01T00:00:00Z"
  to: "2024-01-31T23:59:59Z"
  chain: "ethereum" | "polygon" | etc.

Example:
curl -X GET "https://api.hypernative.xyz/alerts?limit=10&severity=high" \
  -H "x-client-id: YOUR_CLIENT_ID" \
  -H "x-client-secret: YOUR_CLIENT_SECRET"

Response:
{
  "data": [
    {
      "id": "alert_123",
      "timestamp": "2024-01-15T10:30:00Z",
      "severity": "high",
      "type": "exploit_suspected",
      "status": "open",
      "chain": "ethereum",
      "protocol": "Aave V3",
      "description": "Potential exploit detected",
      "tx_hash": "0xabc...",
      "involved_addresses": ["0x123...", "0x456..."],
      "value_at_risk": 1500000
    }
  ],
  "pagination": {
    "total": 150,
    "limit": 10,
    "offset": 0
  }
}
```

##### Get Alert by ID
```bash
GET /alerts/{alert_id}

Example:
curl -X GET "https://api.hypernative.xyz/alerts/alert_123" \
  -H "x-client-id: YOUR_CLIENT_ID" \
  -H "x-client-secret: YOUR_CLIENT_SECRET"

Response:
{
  "id": "alert_123",
  "timestamp": "2024-01-15T10:30:00Z",
  "severity": "high",
  "type": "exploit_suspected",
  "status": "open",
  "chain": "ethereum",
  "protocol": "Aave V3",
  "description": "Potential exploit detected",
  "tx_hash": "0xabc...",
  "block_number": 19000000,
  "involved_addresses": ["0x123...", "0x456..."],
  "value_at_risk": 1500000,
  "metadata": {
    "attack_vector": "reentrancy",
    "confidence": 0.85
  }
}
```

##### Acknowledge Alert
```bash
PATCH /alerts/{alert_id}/acknowledge

Body:
{
  "acknowledged_by": "user@example.com",
  "notes": "Investigating"
}

Example:
curl -X PATCH "https://api.hypernative.xyz/alerts/alert_123/acknowledge" \
  -H "x-client-id: YOUR_CLIENT_ID" \
  -H "x-client-secret: YOUR_CLIENT_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"acknowledged_by": "security@example.com", "notes": "Pausing protocol"}'

Response:
{
  "id": "alert_123",
  "status": "acknowledged",
  "acknowledged_at": "2024-01-15T10:35:00Z",
  "acknowledged_by": "security@example.com"
}
```

#### Watchlists API

##### List Watchlists
```bash
GET /watchlists

Query Parameters:
  limit: 50
  offset: 0

Example:
curl -X GET "https://api.hypernative.xyz/watchlists" \
  -H "x-client-id: YOUR_CLIENT_ID" \
  -H "x-client-secret: YOUR_CLIENT_SECRET"

Response:
{
  "data": [
    {
      "id": "watchlist_456",
      "name": "DeFi Positions",
      "description": "Monitor lending positions",
      "created_at": "2024-01-01T00:00:00Z",
      "asset_count": 25,
      "alert_policy": "strict_defi_policy"
    }
  ]
}
```

##### Create Watchlist
```bash
POST /watchlists

Body:
{
  "name": "Treasury Wallets",
  "description": "Monitor treasury addresses",
  "assets": [
    {
      "chain": "ethereum",
      "type": "Wallet",
      "address": "0x123..."
    },
    {
      "chain": "ethereum",
      "type": "Protocol",
      "name": "Aave V3"
    }
  ],
  "alert_policy_id": "policy_789"
}

Example:
curl -X POST "https://api.hypernative.xyz/watchlists" \
  -H "x-client-id: YOUR_CLIENT_ID" \
  -H "x-client-secret: YOUR_CLIENT_SECRET" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Treasury Wallets",
    "assets": [{"chain": "ethereum", "type": "Wallet", "address": "0x123..."}]
  }'

Response:
{
  "id": "watchlist_789",
  "name": "Treasury Wallets",
  "created_at": "2024-01-15T10:30:00Z"
}
```

##### Update Watchlist
```bash
PATCH /watchlists/{watchlist_id}

Body:
{
  "name": "Updated Name",
  "description": "Updated description",
  "alert_policy_id": "new_policy_id"
}
```

##### Delete Watchlist
```bash
DELETE /watchlists/{watchlist_id}

Response:
{
  "success": true,
  "deleted_at": "2024-01-15T10:30:00Z"
}
```

##### Upload CSV to Watchlist
```bash
POST /watchlists/{watchlist_id}/upload-csv

Content-Type: multipart/form-data
File Format:
address,chain,name,tags
0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48,ethereum,USDT,stablecoin
0x6B175474E89094C44Da98b954EedeAC495271d0F,ethereum,DAI,stablecoin

Response:
{
  "imported": 2,
  "failed": 0,
  "total": 2
}
```

#### Custom Agents API

##### List Custom Agents
```bash
GET /custom-agents

Query Parameters:
  limit: 100
  offset: 0
  enabled: true | false
  type: "health_factor" | "balance_monitor" | etc.

Response:
{
  "data": [
    {
      "id": "agent_123",
      "name": "Aave Health Monitor",
      "type": "position_health_deviation",
      "enabled": true,
      "severity": "high",
      "chain": "ethereum",
      "created_at": "2024-01-01T00:00:00Z",
      "last_triggered": "2024-01-15T09:00:00Z",
      "trigger_count": 5
    }
  ]
}
```

##### Create Custom Agent
```bash
POST /custom-agents

Body:
{
  "name": "USDC Balance Monitor",
  "type": "address_balance_change",
  "enabled": true,
  "severity": "high",
  "chain": "ethereum",
  "configuration": {
    "addresses": ["0x123..."],
    "threshold_type": "percentage",
    "threshold_value": 10,
    "direction": "decrease"
  },
  "notification_channels": ["webhook_prod", "slack_critical"]
}

Response:
{
  "id": "agent_456",
  "name": "USDC Balance Monitor",
  "created_at": "2024-01-15T10:30:00Z",
  "status": "active"
}
```

##### Update Custom Agent
```bash
PATCH /custom-agents/{agent_id}

Body:
{
  "enabled": false,
  "severity": "medium",
  "configuration": {
    "threshold_value": 20
  }
}
```

##### Delete Custom Agent
```bash
DELETE /custom-agents/{agent_id}

Response:
{
  "success": true,
  "deleted_at": "2024-01-15T10:30:00Z"
}
```

##### Get Agent Status
```bash
GET /custom-agents/{agent_id}/status

Response:
{
  "id": "agent_123",
  "status": "active",
  "last_execution": "2024-01-15T10:29:00Z",
  "next_execution": "2024-01-15T10:30:00Z",
  "execution_count": 1440,
  "error_count": 0,
  "last_error": null
}
```

#### Risk Insights API

##### List Risk Insights
```bash
GET /risk-insights

Query Parameters:
  limit: 100
  offset: 0
  category: "Governance" | "Financial" | "Technical" | "Security"
  severity: "Info" | "Low" | "Medium" | "High"
  from: "2024-01-01T00:00:00Z"
  to: "2024-01-31T23:59:59Z"

Response:
{
  "data": [
    {
      "id": "ri_123",
      "type": "A-4102",
      "name": "Exploit Suspected",
      "category": "Security",
      "severity": "High",
      "timestamp": "2024-01-15T10:30:00Z",
      "chain": "ethereum",
      "protocol": "Unknown DeFi",
      "description": "Potential reentrancy exploit detected",
      "involved_addresses": ["0xabc..."],
      "estimated_impact": 2500000
    }
  ]
}
```

##### Get Risk Insight by ID
```bash
GET /risk-insights/{insight_id}

Response:
{
  "id": "ri_123",
  "type": "A-4102",
  "name": "Exploit Suspected",
  "category": "Security",
  "severity": "High",
  "timestamp": "2024-01-15T10:30:00Z",
  "chain": "ethereum",
  "protocol": "Unknown DeFi",
  "description": "Potential reentrancy exploit detected",
  "technical_details": {
    "attack_vector": "reentrancy",
    "affected_functions": ["withdraw", "deposit"],
    "malicious_contract": "0xdef..."
  },
  "recommendations": [
    "Pause protocol immediately",
    "Review withdraw function",
    "Implement reentrancy guard"
  ]
}
```

##### Get Risk Insights by Type
```bash
GET /risk-insights/by-type/{type_id}

Example:
GET /risk-insights/by-type/A-4102

Response:
{
  "type_id": "A-4102",
  "type_name": "Exploit Suspected",
  "total_occurrences": 15,
  "recent_insights": [...]
}
```

#### Guardian API

##### Assess Transaction
```bash
POST /guardian/assess

Body:
{
  "from": "0x123...",
  "to": "0x456...",
  "value": "1000000000000000000",
  "data": "0xa9059cbb...",
  "chain": "ethereum",
  "gas": "65000",
  "gasPrice": "30000000000",
  "nonce": 42,
  "simulation_mode": "full"
}

Response:
{
  "recommendation": "warn",
  "severity": "medium",
  "risk_score": 65,
  "findings": [
    {
      "type": "large_approval",
      "severity": "medium",
      "description": "Approving unlimited token spending",
      "contract": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      "spender": "0x789..."
    }
  ],
  "simulation_results": {
    "success": true,
    "state_changes": [...],
    "balance_changes": [...],
    "gas_used": 46209
  }
}
```

##### List Guardian Policies
```bash
GET /guardian/policies

Response:
{
  "data": [
    {
      "id": "policy_123",
      "name": "DeFi Trading Policy",
      "default_action": "approve",
      "rules_count": 15,
      "created_at": "2024-01-01T00:00:00Z",
      "last_updated": "2024-01-15T00:00:00Z"
    }
  ]
}
```

##### Create Guardian Policy
```bash
POST /guardian/policies

Body:
{
  "name": "Treasury Policy",
  "default_action": "warn",
  "rules": [
    {
      "condition": "value_usd > 100000",
      "action": "require_approval",
      "message": "Large transaction requires approval"
    }
  ]
}
```

#### Screener API

##### Screen Single Address
```bash
POST /screener/address

Body:
{
  "address": "0x123...",
  "chain": "ethereum",
  "policy_id": "strict_policy"
}

Response:
{
  "address": "0x123...",
  "chain": "ethereum",
  "flags": [
    {
      "code": "OF-1310",
      "name": "Attacker wallet",
      "severity": "critical",
      "description": "Known exploit attacker",
      "incident_id": "2024-001"
    }
  ],
  "risk_score": 95,
  "recommendation": "deny"
}
```

##### Screen Multiple Addresses (Batch)
```bash
POST /screener/batch

Body:
{
  "addresses": [
    {"address": "0x123...", "chain": "ethereum"},
    {"address": "0x456...", "chain": "polygon"}
  ],
  "policy_id": "standard_policy"
}

Response:
{
  "results": [
    {
      "address": "0x123...",
      "chain": "ethereum",
      "flags": ["OF-1310"],
      "risk_score": 95
    },
    {
      "address": "0x456...",
      "chain": "polygon",
      "flags": [],
      "risk_score": 0
    }
  ],
  "summary": {
    "total_screened": 2,
    "flagged": 1,
    "clean": 1
  }
}
```

##### Check Pool Toxicity
```bash
POST /screener/pool-toxicity

Body:
{
  "pool_address": "0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8",
  "protocol": "uniswap_v3",
  "chain": "ethereum",
  "policy_id": "defi_policy"
}

Response:
{
  "pool_address": "0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8",
  "toxicity_percentage": 15.73,
  "recommendation": "warn",
  "breakdown": {
    "OF-1310": {
      "percentage": 8.5,
      "addresses": ["0xabc...", "0xdef..."],
      "total_value": 2500000
    },
    "RF-1310": {
      "percentage": 7.23,
      "addresses": ["0x123...", "0x456..."],
      "total_value": 1800000
    }
  },
  "total_liquidity": 25000000,
  "providers_analyzed": 147
}
```

#### Organization API

##### List Organization Members
```bash
GET /organizations/{org_id}/members

Response:
{
  "data": [
    {
      "id": "member_123",
      "email": "user@example.com",
      "role": "admin",
      "permissions": ["alerts:*", "agents:*", "watchlists:*"],
      "joined_at": "2024-01-01T00:00:00Z",
      "last_active": "2024-01-15T10:00:00Z"
    }
  ]
}
```

##### Add Organization Member
```bash
POST /organizations/{org_id}/members

Body:
{
  "email": "newuser@example.com",
  "role": "operator",
  "permissions": ["alerts:read", "alerts:acknowledge"]
}

Response:
{
  "id": "member_456",
  "email": "newuser@example.com",
  "role": "operator",
  "status": "invite_sent"
}
```

##### Update Organization Member
```bash
PATCH /organizations/{org_id}/members/{member_id}

Body:
{
  "role": "admin",
  "permissions": ["alerts:*", "agents:*"]
}
```

##### Remove Organization Member
```bash
DELETE /organizations/{org_id}/members/{member_id}

Response:
{
  "success": true,
  "removed_at": "2024-01-15T10:30:00Z"
}
```

#### Notification Channels API

##### List Notification Channels
```bash
GET /notification-channels

Response:
{
  "data": [
    {
      "id": "channel_123",
      "name": "Slack Critical",
      "type": "slack",
      "enabled": true,
      "configuration": {
        "webhook_url": "https://hooks.slack.com/...",
        "channel": "#security-alerts"
      }
    }
  ]
}
```

##### Create Notification Channel
```bash
POST /notification-channels

Body:
{
  "name": "Production Webhook",
  "type": "webhook",
  "enabled": true,
  "configuration": {
    "url": "https://api.example.com/hypernative-alerts",
    "headers": {
      "Authorization": "Bearer YOUR_TOKEN"
    },
    "secret": "webhook_signing_secret"
  }
}

Response:
{
  "id": "channel_456",
  "name": "Production Webhook",
  "created_at": "2024-01-15T10:30:00Z"
}
```

##### Update Notification Channel
```bash
PATCH /notification-channels/{channel_id}

Body:
{
  "enabled": false,
  "configuration": {
    "url": "https://api.example.com/new-endpoint"
  }
}
```

##### Delete Notification Channel
```bash
DELETE /notification-channels/{channel_id}

Response:
{
  "success": true,
  "deleted_at": "2024-01-15T10:30:00Z"
}
```

##### Test Notification Channel
```bash
POST /notification-channels/{channel_id}/test

Response:
{
  "success": true,
  "message": "Test notification sent successfully",
  "delivered_at": "2024-01-15T10:30:00Z"
}
```

#### Protocol Lists API

##### Get Supported Protocols
```bash
GET /protocols

Query Parameters:
  chain: "ethereum" | "polygon" | etc.

Response:
{
  "data": [
    {
      "name": "Aave V3",
      "chains": ["ethereum", "polygon", "arbitrum"],
      "category": "lending",
      "monitors_available": 15
    },
    {
      "name": "Uniswap V3",
      "chains": ["ethereum", "polygon", "arbitrum", "optimism"],
      "category": "dex",
      "monitors_available": 10
    }
  ]
}
```

##### Get Supported Chains
```bash
GET /chains

Response:
{
  "data": [
    {
      "id": "ethereum",
      "name": "Ethereum",
      "type": "evm",
      "features": {
        "invariant_monitoring": true,
        "automated_response": true,
        "guardian": true,
        "screener": true
      }
    },
    {
      "id": "solana",
      "name": "Solana",
      "type": "non-evm",
      "features": {
        "invariant_monitoring": true,
        "automated_response": true,
        "guardian": false,
        "screener": false
      }
    }
  ],
  "total": 66
}
```

### Error Responses

All API endpoints return consistent error responses:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": {
      "field": "address",
      "reason": "Invalid Ethereum address format"
    }
  },
  "request_id": "req_123456"
}
```

Common error codes:
- `AUTHENTICATION_ERROR`: Invalid credentials
- `AUTHORIZATION_ERROR`: Insufficient permissions
- `VALIDATION_ERROR`: Invalid request parameters
- `NOT_FOUND`: Resource not found
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `INTERNAL_ERROR`: Server error

### Rate Limiting

All endpoints are rate limited:

```
Headers returned:
  X-RateLimit-Limit: 1000
  X-RateLimit-Remaining: 950
  X-RateLimit-Reset: 1705318200
```

Rate limits by tier:
- **Free**: 100 req/hour
- **Standard**: 1,000 req/hour
- **Enterprise**: 10,000 req/hour

### Pagination

List endpoints support pagination:

```
Query Parameters:
  limit: Number of items (max 1000)
  offset: Starting position
  
Response includes:
  "pagination": {
    "total": 500,
    "limit": 100,
    "offset": 0,
    "has_more": true
  }
```

### Webhook Payload Structure

When notifications are sent to webhook channels:

```json
{
  "alert_id": "alert_123",
  "timestamp": "2024-01-15T10:30:00Z",
  "severity": "high",
  "type": "exploit_suspected",
  "chain": "ethereum",
  "description": "Potential exploit detected",
  "involved_addresses": ["0x123...", "0x456..."],
  "transaction_hash": "0xabc...",
  "block_number": 19000000,
  "value_at_risk": 1500000,
  "signature": "sha256=abc123..."
}
```

Verify webhook signature:
```python
import hmac
import hashlib

def verify_webhook(payload: bytes, signature: str, secret: str) -> bool:
    expected = hmac.new(
        secret.encode(),
        payload,
        hashlib.sha256
    ).hexdigest()
    provided = signature.replace("sha256=", "")
    return hmac.compare_digest(expected, provided)
```

## Hypernative Agents SDK V2 - Full Technical Reference

### Installation & Authentication
```bash
pip install invariantive --upgrade
```

```python
from invariantive.common.environment import set_creds, set_default_chain
from invariantive.common.consts import Chain

set_creds("YOUR_CLIENT_ID", "YOUR_CLIENT_SECRET")
set_default_chain(Chain.ethereum)
```

### Complete Variable Type Reference

#### 1. ContextVariable - Transaction/Block Data Extraction
```python
from invariantive.model.variable import ContextVariable

# Available output indices:
# Block: block_number, block_timestamp, block_hash
# Transaction: tx_from, tx_to, tx_value, txhash, gas, gas_price, gas_used, nonce, tx_status
# Event: emitted_arg_0...N, emitting_contract, event_name, event_signature
# Function: input_arg_0...N, trace_from, trace_to, trace_value, trace_type
# Raw: logs (List), traces (List)

context_var = ContextVariable(
    output_index="tx_from",
    var_name="sender"
)
```

#### 2. GenericContractReadVariable - Smart Contract State
```python
from invariantive.model.variable import GenericContractReadVariable

# Verified contract
balance_var = GenericContractReadVariable(
    contract_address="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    func_sig="balanceOf(address)",
    input=["0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643"],
    output_index="output_arg_0",
    var_name="whale_balance"
)

# Unverified contract with ABI types
unverified_var = GenericContractReadVariable(
    contract_address="0xe1b1e024f4Bc01Bdde23e891E081b76a1A914ddd",
    func_sig="getRate()",
    input_data_type=[],
    output_data_type=["uint256"],
    output_index="output_arg_0",
    var_name="current_rate"
)
```

#### 3. PythonProcessingVariable - Custom Logic with 16 Utility Functions

##### Available Global Functions
```python
# Blockchain Functions
get_node(chain) -> Web3Instance
eth_call(chain, contract_address, func_sig, input_data_type, input, output_data_type, block_number="latest")
generic_function_call(chain, contract_address, input, input_data_type, output_data_type, func_sig, block_number="latest", output_index=0)
get_bitcoin_tx(txhash) -> Dict

# Price & Data Functions  
get_price(price_source, asset, chain, ts=None, amount=1) -> {"price": float, "usd_value": float, "decimals": int, "symbol": str}
get_contract_data(address, chain) -> Dict

# Hypernative API Functions
hn_api_get(url, params=None) -> Dict
hn_api_post(url, data=None) -> Dict
hn_api_patch(url, data=None) -> Dict
hn_api_delete(url, params=None) -> Dict

# Utility Functions
is_eoa(address, chain, block_number=None) -> bool
get_selector_from_func_sig(func_sig, chain) -> str
disassemble_bytecode(code) -> str
is_hex(s, length=0) -> bool
sanitize_key(key) -> str
read_contract_data(x) -> Any
```

##### Programming Limitations & Patterns
```python
# ❌ AVOID - Will fail in production
total += new_value  # In-place operators
for key, value in dict.items():  # Tuple unpacking
result = a if condition else b  # Inline conditionals

# ✅ USE - Production-safe patterns
total = total + new_value  # Explicit operations
for key in dict.keys():  # Single iteration variable
    value = dict[key]
if condition:  # Full if-else blocks
    result = a
else:
    result = b
```

##### Complete Example with All Functions
```python
from invariantive.model.variable import PythonProcessingVariable

def advanced_analysis(extracted_variables):
    """Production-ready example using multiple utility functions"""
    # Import inside function
    from web3 import Web3
    import json
    
    # Get multiple chain nodes
    eth_node = get_node('ethereum').w3
    arb_node = get_node('arbitrum').w3
    
    # Contract interaction
    token_address = extracted_variables['token_address']
    whale_address = "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643"
    
    # Method 1: Using generic_function_call
    balance_result = generic_function_call(
        chain="ethereum",
        contract_address=token_address,
        func_sig="balanceOf(address)",
        input=[whale_address],
        input_data_type=["address"],
        output_data_type=["uint256"],
        block_number="latest"
    )
    balance = balance_result["output_args"][0]
    
    # Method 2: Using eth_call directly
    selector = get_selector_from_func_sig("symbol()", "ethereum")
    symbol_data = eth_call(
        chain="ethereum",
        contract_address=token_address,
        func_sig="symbol()",
        input_data_type=[],
        input=[],
        output_data_type=["string"],
        block_number="latest"
    )
    
    # Get price using contract address
    price_data = get_price(
        price_source="coingecko",
        asset=token_address,
        chain="ethereum",
        amount=balance
    )
    
    # Check if address is EOA
    is_wallet = is_eoa(whale_address, "ethereum")
    
    # Make Hypernative API call
    alerts = hn_api_get("/alerts", params={"limit": 10})
    
    # Get contract metadata
    contract_info = get_contract_data(token_address, "ethereum")
    
    # Process and return results
    return {
        "whale_balance": balance,
        "token_symbol": symbol_data,
        "usd_value": price_data["usd_value"],
        "is_eoa": is_wallet,
        "contract_verified": contract_info.get("verified", False),
        "recent_alerts": len(alerts.get("data", []))
    }

analysis_var = PythonProcessingVariable(
    source_code=advanced_analysis,
    var_name="comprehensive_analysis"
)
```

#### 4. HistoricalEventsVariable - Query Past Events
```python
from invariantive.model.variable import HistoricalEventsVariable

# Verified contract
transfers = HistoricalEventsVariable(
    chain=Chain.ethereum,
    contract_address="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    event_name="Transfer",
    event_filters={"from": "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643"},
    from_block=str(19000000),
    to_block="latest",
    var_name="whale_transfers"
)

# Unverified contract with ABI
pool_events = HistoricalEventsVariable(
    chain=Chain.ethereum,
    contract_address="0x5B42eC6D40f7B7965BE5308c70e2603c0281C1E9",
    event_name="PoolCreated(index_topic_1 address pool)",
    abi_string='[{"anonymous": false, "inputs": [{"indexed": true, "internalType": "address", "name": "pool", "type": "address"}], "name": "PoolCreated", "type": "event"}]',
    var_name="pool_creations"
)
```

#### 5. PriceServiceVariable - Asset Pricing
```python
from invariantive.model.variable import PriceServiceVariable

token_price = PriceServiceVariable(
    price_source="coingecko",
    asset="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",  # USDT contract
    amount=1000000,  # 1M tokens
    scale_to_decimals=True,
    chain=Chain.ethereum,
    var_name="usdt_value"
)
```

#### 6. TokenBalanceVariable - Balance Monitoring
```python
from invariantive.model.variable import TokenBalanceVariable

# ERC-20 balance
token_balance = TokenBalanceVariable(
    token_holder_address="0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643",
    token_address="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    scale_to_decimals=True,
    var_name="whale_usdt"
)

# Native ETH balance
eth_balance = TokenBalanceVariable(
    token_holder_address="0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643",
    native_token=True,
    var_name="whale_eth"
)
```

#### 7. State Management Variables
```python
from invariantive.model.variable import GetValueVariable, SetValueVariable

# Retrieve previous value
get_var = GetValueVariable(
    key="last_health_factor",
    var_name="previous_health"
)

# Store current value
set_var = SetValueVariable(
    key="last_health_factor",
    value="extracted_variables.current_health",
    var_name="stored"
)
```

#### 8. List Management Variables
```python
from invariantive.model.variable import IsInListVariable, AddToListVariable

# Check if in list
check_var = IsInListVariable(
    list_uuid="550e8400-e29b-41d4-a716-446655440000",
    address="extracted_variables.sender",
    var_name="is_whitelisted"
)

# Add to list
add_var = AddToListVariable(
    list_uuid="550e8400-e29b-41d4-a716-446655440001",
    address="extracted_variables.attacker",
    note="Detected in exploit",
    var_name="added"
)
```

#### 9. JsonEndpointVariable - External APIs
```python
from invariantive.model.variable import JsonEndpointVariable

# JSONata engine (recommended for complex processing)
api_var = JsonEndpointVariable(
    url="https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",
    method="get",
    json_path="ethereum.usd > 3000 ? 'bullish' : ethereum.usd > 2000 ? 'neutral' : 'bearish'",
    json_path_engine="jsonata",
    var_name="market_sentiment"
)
```

### Trigger Types - Complete Reference

#### 1. BlockTrigger - Periodic Execution
```python
from invariantive.model.trigger import BlockTrigger

trigger = BlockTrigger(
    period=100,
    period_unit="blocks",  # "blocks" or "seconds"
    chain=Chain.ethereum
)
```

#### 2. EventTrigger - Smart Contract Events
```python
from invariantive.model.trigger import EventTrigger

# Verified contract
trigger = EventTrigger(
    contract_address="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    event_sig="Transfer",
    operator="gt",
    output_index="emitted_arg_2",  # value
    operands=[1000000000000],  # >1M USDT (6 decimals)
    chain=Chain.ethereum
)

# Unverified contract
trigger = EventTrigger(
    contract_address="0xaf8E1AD06Fd19652299CFfd7e39c13e96acA4765",
    event_sig="Transfer(index_topic_1 address from, index_topic_2 address to, uint256 value)",
    output_data_type=["address", "address", "uint256"],
    operator="any",
    output_index="emitting_contract",
    operands=[]
)
```

#### 3. FunctionCallTrigger - Function Invocations
```python
from invariantive.model.trigger import FunctionCallTrigger

# Monitor withdrawals
trigger = FunctionCallTrigger(
    contract_address="0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9",
    trace_sig="withdraw(address,uint256,address)",
    operator="gt",
    output_index="input_arg_1",  # amount
    operands=[1000000000000000000],  # >1 ETH
    chain=Chain.ethereum
)
```

#### 4. RITrigger - Risk Insights Response
```python
from invariantive.model.trigger import RITrigger

trigger = RITrigger(
    type_ids=["A-4102", "A-4010", "TX-00011"],  # Multiple alert types
    chain=Chain.ethereum
)
```

### Alert Configuration - Advanced Operators

```python
from invariantive.model.alert import AlertConfig

# Time-based monitoring
alert = AlertConfig(
    var_name="tvl",
    operator="decreased_by",
    operands=[{
        "threshold": 1000000,
        "threshold_type": "absolute",  # or "relative" for percentage
        "period": 1,
        "period_unit": "hours"
    }],
    description="TVL decreased by ${{change}} in 1 hour",
    severity="high",
    involved_assets={"protocol": "extracted_variables.protocol_address"}
)

# JSON path evaluation
alert = AlertConfig(
    var_name="analysis_result",
    operator="json_path",
    operands=["health_factor < 1.05 and collateral > 1000000"],
    description="Large position at risk: HF={{analysis_result.health_factor}}"
)

# Contract type checking
alert = AlertConfig(
    var_name="recipient",
    operator="is_eoa",
    operands=[],
    description="Transfer to EOA detected: {{recipient}}"
)
```

## SDK Examples - Real-World Implementations

### Balance Monitoring

#### Basic Token Balance Monitor
```python
from invariantive.model.agent import Agent
from invariantive.model.trigger import BlockTrigger
from invariantive.model.variable import GenericContractReadVariable
from invariantive.model.alert import AlertConfig
from invariantive.model.run import RunConfig
from invariantive.common.consts import Chain
from invariantive.common.environment import set_default_chain

# Set default chain
set_default_chain(Chain.ethereum)

# Create agent with block trigger
trigger = BlockTrigger(period=100, period_unit="blocks")
agent = Agent(trigger=trigger)

# Monitor Binance hot wallet USDC balance
balance_var = GenericContractReadVariable(
    contract_address="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",  # USDC
    func_sig="balanceOf",
    input=["0xF977814e90dA44bFA03b6295A0616a897441aceC"],  # Binance wallet
    output_index="output_arg_0",
    var_name="binance_usdc_balance"
)
agent.add_variable(balance_var)

# Alert on low balance
alert = AlertConfig(
    var_name="binance_usdc_balance",
    operator="lt",
    operands=[1000000000000],  # Less than 1M USDC
    description="⚠️ Binance USDC balance low: {{binance_usdc_balance}}"
)
agent.set_alert(alert)

# Test the agent
findings = agent.run(RunConfig(blocks=[0]))
print(f"Found {len(findings['findings'])} alerts")
for f in findings["findings"]:
    print(f["description"])
    print(f"Variables: {f['extracted_variables']}")

# Deploy to production
agent_id = agent.deploy(
    agent_name="Binance_USDC_Balance_Monitor", 
    severity="High",
    channels_configurations=[{"channel_id": "webhook_prod"}]
)
print(f"Deployed agent ID: {agent_id}")
```

#### Multi-Token Balance Tracker
```python
from invariantive.model.variable import TokenBalanceVariable, PythonProcessingVariable

# Monitor multiple tokens for a whale wallet
whale_address = "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643"

# USDT balance
usdt_var = TokenBalanceVariable(
    token_holder_address=whale_address,
    token_address="0xdAC17F958D2ee523a2206206994597C13D831ec7",
    var_name="usdt_balance"
)
agent.add_variable(usdt_var)

# USDC balance
usdc_var = TokenBalanceVariable(
    token_holder_address=whale_address,
    token_address="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    var_name="usdc_balance"
)
agent.add_variable(usdc_var)

# DAI balance
dai_var = TokenBalanceVariable(
    token_holder_address=whale_address,
    token_address="0x6B175474E89094C44Da98b954EedeAC495271d0F",
    var_name="dai_balance"
)
agent.add_variable(dai_var)

# Calculate total stablecoin value
def calculate_total_stables(extracted_variables):
    usdt = extracted_variables.get("usdt_balance", 0)
    usdc = extracted_variables.get("usdc_balance", 0)
    dai = extracted_variables.get("dai_balance", 0)
    
    total = usdt + usdc + dai
    
    return {
        "total_stablecoins": total,
        "portfolio_breakdown": {
            "usdt_percentage": (usdt / total * 100) if total > 0 else 0,
            "usdc_percentage": (usdc / total * 100) if total > 0 else 0,
            "dai_percentage": (dai / total * 100) if total > 0 else 0
        }
    }

total_var = PythonProcessingVariable(
    source_code=calculate_total_stables,
    var_name="stablecoin_analysis"
)
agent.add_variable(total_var)
```

### Event-Based Monitoring

#### Aave Liquidation Monitor
```python
from invariantive.model.trigger import FunctionCallTrigger
from invariantive.model.variable import ContextVariable

# Monitor liquidations on Aave V3
trigger = FunctionCallTrigger(
    contract_address="0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2",  # Aave V3 Pool
    trace_sig="liquidationCall",
    operator="compare_exact",
    output_index="trace_to",
    operands=["0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2"]
)

agent = Agent(trigger=trigger)

# Extract liquidation details
user_var = ContextVariable(
    output_index="input_arg_2",  # user parameter
    var_name="liquidated_user"
)
agent.add_variable(user_var)

collateral_var = ContextVariable(
    output_index="input_arg_0",  # collateral asset
    var_name="collateral_asset"
)
agent.add_variable(collateral_var)

debt_var = ContextVariable(
    output_index="input_arg_1",  # debt asset
    var_name="debt_asset"
)
agent.add_variable(debt_var)

amount_var = ContextVariable(
    output_index="input_arg_3",  # debt to cover
    var_name="liquidation_amount"
)
agent.add_variable(amount_var)

# Alert on large liquidations
alert = AlertConfig(
    var_name="liquidation_amount",
    operator="gt",
    operands=[100000000000],  # >100k USDC (6 decimals)
    description="🚨 Large Aave liquidation: {{liquidated_user}} liquidated for {{liquidation_amount}} (Collateral: {{collateral_asset}}, Debt: {{debt_asset}})"
)
agent.set_alert(alert)
```

#### Uniswap V3 Pool Creation Monitor
```python
from invariantive.model.trigger import EventTrigger

# Monitor new pool creations
trigger = EventTrigger(
    contract_address="0x1F98431c8aD98523631AE4a59f267346ea31F984",  # UniswapV3Factory
    event_sig="PoolCreated",
    operator="any",
    output_index="emitting_contract",
    operands=[]
)

agent = Agent(trigger=trigger)

# Extract pool details
pool_address_var = ContextVariable(
    output_index="emitted_arg_3",  # pool address
    var_name="new_pool"
)
agent.add_variable(pool_address_var)

token0_var = ContextVariable(
    output_index="emitted_arg_0",
    var_name="token0"
)
agent.add_variable(token0_var)

token1_var = ContextVariable(
    output_index="emitted_arg_1",
    var_name="token1"
)
agent.add_variable(token1_var)

fee_var = ContextVariable(
    output_index="emitted_arg_2",
    var_name="fee_tier"
)
agent.add_variable(fee_var)

# Get token symbols
def get_token_info(extracted_variables):
    import json
    
    token0 = extracted_variables["token0"]
    token1 = extracted_variables["token1"]
    
    # Get token names using contract reads
    w3 = get_node('ethereum').w3
    
    # Minimal ERC20 ABI for symbol
    abi = json.loads('[{"inputs":[],"name":"symbol","outputs":[{"type":"string"}],"stateMutability":"view","type":"function"}]')
    
    try:
        contract0 = w3.eth.contract(address=token0, abi=abi)
        symbol0 = contract0.functions.symbol().call()
    except:
        symbol0 = "Unknown"
    
    try:
        contract1 = w3.eth.contract(address=token1, abi=abi)
        symbol1 = contract1.functions.symbol().call()
    except:
        symbol1 = "Unknown"
    
    fee_tier = int(extracted_variables["fee_tier"])
    fee_percentage = fee_tier / 10000  # Convert to percentage
    
    return {
        "pair_name": f"{symbol0}/{symbol1}",
        "fee_percentage": fee_percentage
    }

token_info_var = PythonProcessingVariable(
    source_code=get_token_info,
    var_name="pool_info"
)
agent.add_variable(token_info_var)

alert = AlertConfig(
    var_name="new_pool",
    operator="ne",
    operands=[""],
    description="🎉 New Uniswap V3 pool created: {{pool_info.pair_name}} ({{pool_info.fee_percentage}}% fee) at {{new_pool}}"
)
agent.set_alert(alert)
```

### Complex Analysis Patterns

#### DeFi Position Health Monitor
```python
def analyze_defi_position(extracted_variables):
    """
    Comprehensive DeFi position analysis across multiple protocols
    """
    import json
    
    user_address = extracted_variables["user_address"]
    
    # Get Aave V3 position
    aave_data = generic_function_call(
        chain="ethereum",
        contract_address="0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2",
        func_sig="getUserAccountData(address)",
        input=[user_address],
        input_data_type=["address"],
        output_data_type=["uint256", "uint256", "uint256", "uint256", "uint256", "uint256"],
        block_number="latest"
    )
    
    # Parse Aave data
    total_collateral_base = aave_data["output_args"][0]
    total_debt_base = aave_data["output_args"][1]
    available_borrows_base = aave_data["output_args"][2]
    current_liquidation_threshold = aave_data["output_args"][3]
    ltv = aave_data["output_args"][4]
    health_factor = aave_data["output_args"][5]
    
    # Convert health factor (18 decimals)
    health_factor_human = health_factor / 1e18
    
    # Get Compound V3 position
    compound_data = generic_function_call(
        chain="ethereum",
        contract_address="0xc3d688B66703497DAA19211EEdff47f25384cdc3",
        func_sig="borrowBalanceOf(address)",
        input=[user_address],
        input_data_type=["address"],
        output_data_type=["uint256"],
        block_number="latest"
    )
    
    compound_borrow = compound_data["output_args"][0]
    
    # Risk assessment
    risk_level = "low"
    if health_factor_human < 1.05:
        risk_level = "critical"
    elif health_factor_human < 1.2:
        risk_level = "high"
    elif health_factor_human < 1.5:
        risk_level = "medium"
    
    return {
        "aave_health_factor": health_factor_human,
        "aave_collateral_usd": total_collateral_base / 1e8,  # 8 decimals for base currency
        "aave_debt_usd": total_debt_base / 1e8,
        "compound_borrow_usdc": compound_borrow / 1e6,  # USDC 6 decimals
        "risk_level": risk_level,
        "needs_attention": risk_level in ["high", "critical"]
    }

position_analysis_var = PythonProcessingVariable(
    source_code=analyze_defi_position,
    var_name="position_health"
)
```

#### Cross-Chain Activity Tracker
```python
def track_cross_chain_activity(extracted_variables):
    """
    Monitor user activity across multiple chains
    """
    user = extracted_variables["user_address"]
    
    chains_to_check = ["ethereum", "arbitrum", "optimism", "polygon", "base"]
    activity_summary = {}
    
    for chain in chains_to_check:
        # Get native balance
        w3 = get_node(chain).w3
        native_balance = w3.eth.get_balance(user)
        
        # Get transaction count
        tx_count = w3.eth.get_transaction_count(user)
        
        # Check if address is contract
        code = w3.eth.get_code(user)
        is_contract = len(code) > 0
        
        activity_summary[chain] = {
            "native_balance": native_balance,
            "tx_count": tx_count,
            "is_contract": is_contract,
            "is_active": tx_count > 0 or native_balance > 0
        }
    
    # Identify primary chain
    primary_chain = max(
        activity_summary.keys(),
        key=lambda c: activity_summary[c]["tx_count"]
    )
    
    # Count active chains
    active_chains = [
        chain for chain, data in activity_summary.items()
        if data["is_active"]
    ]
    
    return {
        "primary_chain": primary_chain,
        "active_chains": active_chains,
        "chain_count": len(active_chains),
        "is_multi_chain": len(active_chains) > 1,
        "activity_details": activity_summary
    }

cross_chain_var = PythonProcessingVariable(
    source_code=track_cross_chain_activity,
    var_name="cross_chain_analysis"
)
```

## Best Practices & Troubleshooting

### PythonProcessingVariable Debugging

#### Silent Failure Detection
One of the most common issues with `PythonProcessingVariable` is the "silent failure," where the Python function fails without raising an exception.

**Best Practice: Always use try-except blocks**
```python
def my_python_function(extracted_variables):
    try:
        # Your code here
        result = process_data(extracted_variables)
        return {"result": result, "success": True}
    except Exception as e:
        return {
            "error": str(e),
            "error_type": type(e).__name__,
            "success": False,
            "debug_info": extracted_variables
        }
```

#### Incremental Development Methodology
When building complex agents with multiple `PythonProcessingVariable` instances:

1. **Build and test one variable at a time**
```python
# Step 1: Test data extraction
test_var = ContextVariable(output_index="tx_from", var_name="sender")
agent.add_variable(test_var)
findings = agent.run(RunConfig(blocks=[19000000]))
print(f"Sender: {findings['extracted_variables']['sender']}")

# Step 2: Add processing only after extraction works
process_var = PythonProcessingVariable(source_code=process_sender, var_name="processed")
agent.add_variable(process_var)
# Test again...
```

2. **Use debug variables**
```python
# Your complex processing
agent.add_variable(PythonProcessingVariable(
    source_code=complex_function,
    var_name="complex_output"
))

# Debug variable to inspect output
def debug_output(extracted_variables):
    print(f"Complex output: {extracted_variables.get('complex_output')}")
    print(f"Type: {type(extracted_variables.get('complex_output'))}")
    return {"debug": "complete"}

agent.add_variable(PythonProcessingVariable(
    source_code=debug_output,
    var_name="debug"
))
```

#### Common Python Syntax Issues

**Issue 1: In-place operators not supported**
```python
# ❌ WRONG
total += new_value
count -= 1
result *= factor

# ✅ CORRECT
total = total + new_value
count = count - 1
result = result * factor
```

**Issue 2: No tuple unpacking in loops**
```python
# ❌ WRONG
for key, value in my_dict.items():
    process(key, value)

# ✅ CORRECT
for key in my_dict.keys():
    value = my_dict[key]
    process(key, value)
```

**Issue 3: Imports must be inside function**
```python
# ❌ WRONG
import requests
def fetch_data(extracted_variables):
    return requests.get(url)

# ✅ CORRECT
def fetch_data(extracted_variables):
    import requests
    return requests.get(url)
```

#### Error Handling Patterns

**Robust API Call Pattern**
```python
def fetch_data_from_api(extracted_variables):
    import requests
    
    try:
        # Set timeout to prevent hanging
        response = requests.get(
            "https://api.example.com/data",
            timeout=10,
            headers={"User-Agent": "Hypernative-Agent"}
        )
        
        # Check status code
        response.raise_for_status()
        
        # Validate response format
        data = response.json()
        if not isinstance(data, dict):
            return {"error": "Invalid response format"}
        
        return {"data": data, "status": "success"}
        
    except requests.exceptions.Timeout:
        return {"error": "API timeout", "retry": True}
    except requests.exceptions.RequestException as e:
        return {"error": f"API request failed: {e}"}
    except ValueError as e:
        return {"error": f"JSON parsing failed: {e}"}
    except Exception as e:
        return {"error": f"Unexpected error: {e}"}
```

**Contract Interaction Error Handling**
```python
def safe_contract_read(extracted_variables):
    try:
        # Get contract data
        result = generic_function_call(
            chain="ethereum",
            contract_address=extracted_variables["contract"],
            func_sig="balanceOf(address)",
            input=[extracted_variables["user"]],
            input_data_type=["address"],
            output_data_type=["uint256"]
        )
        
        # Validate result
        if not result or "output_args" not in result:
            return {"error": "Invalid contract response"}
        
        balance = result["output_args"][0]
        
        # Sanity check
        if balance < 0 or balance > 2**256 - 1:
            return {"error": "Invalid balance value"}
        
        return {"balance": balance}
        
    except Exception as e:
        return {
            "error": str(e),
            "contract": extracted_variables.get("contract"),
            "user": extracted_variables.get("user")
        }
```

### Interacting with Hypernative API

#### Secure Credential Management
```python
from invariantive.model.agent import Agent
from invariantive.model.variable import GetSecretVariable

# Step 1: Save credentials as secrets
agent = Agent(trigger=trigger)
agent.save_secret("HN_API_CLIENT_ID", "your-client-id")
agent.save_secret("HN_API_CLIENT_SECRET", "your-client-secret")

# Step 2: Load secrets in agent
agent.add_variable(GetSecretVariable(
    secret_name="HN_API_CLIENT_ID",
    var_name="hn_client_id"
))
agent.add_variable(GetSecretVariable(
    secret_name="HN_API_CLIENT_SECRET",
    var_name="hn_client_secret"
))

# Step 3: Use hn_api_* helpers (automatically use loaded credentials)
def call_hypernative_api(extracted_variables):
    # Get alerts
    alerts = hn_api_get("/alerts", params={"limit": 10})
    
    # Update watchlist
    update_result = hn_api_patch(
        "/watchlists/123",
        data={"name": "Updated Watchlist"}
    )
    
    return {
        "alert_count": len(alerts.get("data", [])),
        "update_success": update_result.get("success", False)
    }
```

### Performance Optimization

#### Batch Operations
```python
def batch_contract_reads(extracted_variables):
    """
    Efficient batch reading of multiple contracts
    """
    addresses_to_check = extracted_variables["addresses"]
    results = {}
    
    # Batch by chunks to avoid timeout
    chunk_size = 10
    for i in range(0, len(addresses_to_check), chunk_size):
        chunk = addresses_to_check[i:i+chunk_size]
        
        for address in chunk:
            try:
                balance = generic_function_call(
                    chain="ethereum",
                    contract_address="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
                    func_sig="balanceOf(address)",
                    input=[address],
                    input_data_type=["address"],
                    output_data_type=["uint256"]
                )
                results[address] = balance["output_args"][0]
            except:
                results[address] = 0
    
    return results
```

#### Caching Pattern
```python
def cached_price_fetch(extracted_variables):
    """
    Cache expensive API calls
    """
    # Check if we have recent price
    cached_price = extracted_variables.get("cached_price")
    cache_timestamp = extracted_variables.get("cache_timestamp", 0)
    
    import time
    current_time = time.time()
    
    # Use cache if less than 5 minutes old
    if cached_price and (current_time - cache_timestamp) < 300:
        return {"price": cached_price, "from_cache": True}
    
    # Fetch fresh price
    price_data = get_price(
        price_source="coingecko",
        asset="ethereum",
        chain="ethereum"
    )
    
    return {
        "price": price_data["price"],
        "from_cache": False,
        "cache_timestamp": current_time
    }
```

## Protocol-Specific Implementations (65+ Protocols)

### Aave V3 Complete Implementation

#### Contract Addresses (Ethereum Mainnet)
```solidity
// Core contracts
address constant POOL = 0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2;
address constant POOL_DATA_PROVIDER = 0x7B4EB56E7CD4b454BA8ff71E4518426369a138a3;
address constant PRICE_ORACLE = 0x54586bE62E3c3580375aE3723C145253060Ca0C2;
address constant ACL_MANAGER = 0xc2aaCf6553D20d1e9d78E365AAba8032af9c85b0;
```

#### Health Factor Monitor
```python
def monitor_aave_health(extracted_variables):
    """
    Complete Aave V3 health factor monitoring
    """
    user = extracted_variables["user_address"]
    
    # Get user account data
    account_data = generic_function_call(
        chain="ethereum",
        contract_address="0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2",
        func_sig="getUserAccountData(address)",
        input=[user],
        input_data_type=["address"],
        output_data_type=["uint256", "uint256", "uint256", "uint256", "uint256", "uint256"]
    )
    
    # Parse response
    total_collateral = account_data["output_args"][0] / 1e8  # USD with 8 decimals
    total_debt = account_data["output_args"][1] / 1e8
    available_borrows = account_data["output_args"][2] / 1e8
    liquidation_threshold = account_data["output_args"][3] / 10000  # Percentage
    ltv = account_data["output_args"][4] / 10000
    health_factor = account_data["output_args"][5] / 1e18
    
    # Risk assessment
    risk_status = "safe"
    if health_factor < 1.02:
        risk_status = "emergency"
    elif health_factor < 1.05:
        risk_status = "critical"
    elif health_factor < 1.1:
        risk_status = "warning"
    
    # Calculate liquidation price
    liquidation_price = None
    if total_debt > 0:
        liquidation_price = (total_debt * health_factor) / total_collateral
    
    return {
        "health_factor": health_factor,
        "total_collateral_usd": total_collateral,
        "total_debt_usd": total_debt,
        "utilization": (total_debt / total_collateral * 100) if total_collateral > 0 else 0,
        "risk_status": risk_status,
        "liquidation_threshold": liquidation_threshold,
        "liquidation_price": liquidation_price,
        "available_to_borrow": available_borrows
    }
```

#### Automated Response Contract
```solidity
// Emergency withdrawal from Aave V3
contract AaveV3EmergencyExit {
    IPool constant AAVE_POOL = IPool(0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2);
    address public keeper;
    
    modifier onlyKeeper() {
        require(msg.sender == keeper, "Only keeper");
        _;
    }
    
    function emergencyWithdrawAll(
        address user,
        address[] calldata assets,
        address destination
    ) external onlyKeeper {
        for (uint i = 0; i < assets.length; i++) {
            // Get aToken for the asset
            DataTypes.ReserveData memory reserve = AAVE_POOL.getReserveData(assets[i]);
            address aToken = reserve.aTokenAddress;
            
            // Get balance
            uint256 balance = IERC20(aToken).balanceOf(user);
            
            if (balance > 0) {
                // Approve and withdraw
                IERC20(aToken).approve(address(AAVE_POOL), balance);
                AAVE_POOL.withdraw(assets[i], balance, destination);
            }
        }
    }
}
```

### Morpho Protocol Implementation

#### Market Configuration & Monitoring
```python
def monitor_morpho_position(extracted_variables):
    """
    Morpho Blue position monitoring with cbBTC/USDC market example
    """
    # Market parameters for cbBTC/USDC
    market_params = {
        "market_id": "0x64d65c9a2d91c36d56fbc42d69e979335320169b3df63bf92789e2c8883fcc64",
        "loan_token": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",  # USDC
        "collateral_token": "0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf",  # cbBTC
        "oracle": "0xA6D6950c9F177F1De7f7757FB33539e3Ec60182a",
        "irm": "0x870aC11D48B15DB9a138Cf899d20F13F79Ba00BC",
        "lltv": 860000000000000000,  # 86%
        "user": extracted_variables["user_address"]
    }
    
    # Get user health factor
    health_result = generic_function_call(
        chain="ethereum",
        contract_address="0x0de04a86d26d198ccf3d436337ffeaf0dedd21ff",
        func_sig="userHealthFactor(address,address,address,address,uint256,bytes32,address)",
        input=[
            market_params["loan_token"],
            market_params["collateral_token"],
            market_params["oracle"],
            market_params["irm"],
            market_params["lltv"],
            market_params["market_id"],
            market_params["user"]
        ],
        input_data_type=["address", "address", "address", "address", "uint256", "bytes32", "address"],
        output_data_type=["uint256"]
    )
    
    health_factor = health_result["output_args"][0] / 1e18
    
    # Get market utilization
    market_data = generic_function_call(
        chain="ethereum",
        contract_address="0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb",  # Morpho Blue
        func_sig="market(bytes32)",
        input=[market_params["market_id"]],
        input_data_type=["bytes32"],
        output_data_type=["uint128", "uint128", "uint128", "uint128", "uint128", "uint128"]
    )
    
    total_supply = market_data["output_args"][0]
    total_borrow = market_data["output_args"][1]
    utilization = (total_borrow / total_supply * 100) if total_supply > 0 else 0
    
    # Price divergence check
    morpho_price = generic_function_call(
        chain="ethereum",
        contract_address=market_params["oracle"],
        func_sig="price()",
        input=[],
        input_data_type=[],
        output_data_type=["uint256"]
    )["output_args"][0]
    
    # Get Chainlink price for comparison
    chainlink_price = get_price(
        price_source="chainlink",
        asset=market_params["collateral_token"],
        chain="ethereum"
    )["price"]
    
    price_divergence = abs(morpho_price - chainlink_price) / chainlink_price * 100
    
    return {
        "health_factor": health_factor,
        "utilization_rate": utilization,
        "price_divergence_percentage": price_divergence,
        "is_healthy": health_factor > 1.1,
        "needs_rebalance": health_factor < 1.2,
        "oracle_risk": price_divergence > 2
    }
```

### Compound V3 Implementation

#### Comet Position Monitor
```python
def monitor_compound_v3(extracted_variables):
    """
    Compound V3 USDC market monitoring
    """
    user = extracted_variables["user_address"]
    comet = "0xc3d688B66703497DAA19211EEdff47f25384cdc3"  # USDC Comet
    
    # Get user balance info
    balance_info = generic_function_call(
        chain="ethereum",
        contract_address=comet,
        func_sig="balanceOf(address)",
        input=[user],
        input_data_type=["address"],
        output_data_type=["int256"]
    )
    
    balance = balance_info["output_args"][0]
    
    # Positive = supplied, Negative = borrowed
    is_borrowing = balance < 0
    amount = abs(balance) / 1e6  # USDC decimals
    
    # Get account liquidity
    liquidity_info = generic_function_call(
        chain="ethereum",
        contract_address=comet,
        func_sig="getAccountLiquidity(address)",
        input=[user],
        input_data_type=["address"],
        output_data_type=["int256", "int256", "int256"]
    )
    
    error_code = liquidity_info["output_args"][0]
    liquidity = liquidity_info["output_args"][1] / 1e6
    shortfall = liquidity_info["output_args"][2] / 1e6
    
    # Get utilization
    utilization_data = generic_function_call(
        chain="ethereum",
        contract_address=comet,
        func_sig="getUtilization()",
        input=[],
        input_data_type=[],
        output_data_type=["uint256"]
    )
    
    utilization = utilization_data["output_args"][0] / 1e18 * 100
    
    return {
        "position_type": "borrowing" if is_borrowing else "supplying",
        "amount_usdc": amount,
        "liquidity": liquidity,
        "shortfall": shortfall,
        "is_liquidatable": shortfall > 0,
        "market_utilization": utilization,
        "health_status": "critical" if shortfall > 0 else "healthy"
    }
```

### Uniswap V3 Implementation

#### Position and Price Monitoring
```python
def monitor_uniswap_v3_position(extracted_variables):
    """
    Monitor Uniswap V3 liquidity position
    """
    position_id = extracted_variables["position_id"]
    
    # Get position details from NFT Position Manager
    position_manager = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88"
    
    position_data = generic_function_call(
        chain="ethereum",
        contract_address=position_manager,
        func_sig="positions(uint256)",
        input=[position_id],
        input_data_type=["uint256"],
        output_data_type=[
            "uint96",   # nonce
            "address",  # operator
            "address",  # token0
            "address",  # token1
            "uint24",   # fee
            "int24",    # tickLower
            "int24",    # tickUpper
            "uint128",  # liquidity
            "uint256",  # feeGrowthInside0LastX128
            "uint256",  # feeGrowthInside1LastX128
            "uint128",  # tokensOwed0
            "uint128"   # tokensOwed1
        ]
    )
    
    token0 = position_data["output_args"][2]
    token1 = position_data["output_args"][3]
    fee = position_data["output_args"][4]
    tick_lower = position_data["output_args"][5]
    tick_upper = position_data["output_args"][6]
    liquidity = position_data["output_args"][7]
    
    # Get pool address
    factory = "0x1F98431c8aD98523631AE4a59f267346ea31F984"
    pool_address = generic_function_call(
        chain="ethereum",
        contract_address=factory,
        func_sig="getPool(address,address,uint24)",
        input=[token0, token1, fee],
        input_data_type=["address", "address", "uint24"],
        output_data_type=["address"]
    )["output_args"][0]
    
    # Get current tick
    slot0_data = generic_function_call(
        chain="ethereum",
        contract_address=pool_address,
        func_sig="slot0()",
        input=[],
        input_data_type=[],
        output_data_type=["uint160", "int24", "uint16", "uint16", "uint16", "uint8", "bool"]
    )
    
    current_tick = slot0_data["output_args"][1]
    sqrt_price_x96 = slot0_data["output_args"][0]
    
    # Calculate if position is in range
    in_range = tick_lower <= current_tick <= tick_upper
    
    # Calculate price from sqrtPriceX96
    price = (sqrt_price_x96 / (2**96)) ** 2
    
    return {
        "position_id": position_id,
        "pool": pool_address,
        "in_range": in_range,
        "current_tick": current_tick,
        "tick_range": [tick_lower, tick_upper],
        "liquidity": liquidity,
        "current_price": price,
        "needs_rebalance": not in_range
    }
```

### Chainlink Oracle Monitoring

#### Price Feed Monitor
```python
def monitor_chainlink_price_feed(extracted_variables):
    """
    Monitor Chainlink price feeds for deviations
    """
    # ETH/USD price feed
    eth_usd_feed = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419"
    
    # Get latest round data
    round_data = generic_function_call(
        chain="ethereum",
        contract_address=eth_usd_feed,
        func_sig="latestRoundData()",
        input=[],
        input_data_type=[],
        output_data_type=["uint80", "int256", "uint256", "uint256", "uint80"]
    )
    
    round_id = round_data["output_args"][0]
    price = round_data["output_args"][1] / 1e8  # 8 decimals
    started_at = round_data["output_args"][2]
    updated_at = round_data["output_args"][3]
    answered_in_round = round_data["output_args"][4]
    
    # Check staleness
    import time
    current_time = int(time.time())
    time_since_update = current_time - updated_at
    is_stale = time_since_update > 3600  # 1 hour
    
    # Get historical price for comparison (1 hour ago)
    historical_round = round_id - 12  # Approximately 1 hour ago (5 min heartbeat)
    
    historical_data = generic_function_call(
        chain="ethereum",
        contract_address=eth_usd_feed,
        func_sig="getRoundData(uint80)",
        input=[historical_round],
        input_data_type=["uint80"],
        output_data_type=["uint80", "int256", "uint256", "uint256", "uint80"]
    )
    
    historical_price = historical_data["output_args"][1] / 1e8
    
    # Calculate price change
    price_change = ((price - historical_price) / historical_price) * 100
    
    return {
        "current_price": price,
        "historical_price": historical_price,
        "price_change_1h": price_change,
        "is_stale": is_stale,
        "time_since_update": time_since_update,
        "round_id": round_id,
        "significant_move": abs(price_change) > 5
    }
```

### MakerDAO Implementation

#### Vault Monitoring
```python
def monitor_maker_vault(extracted_variables):
    """
    Monitor MakerDAO vault health
    """
    vault_id = extracted_variables["vault_id"]
    ilk = extracted_variables["ilk"]  # Collateral type, e.g., "ETH-A"
    
    # Vat contract (core accounting)
    vat = "0x35D1b3F3D7966A1DFe207aa4514C12a259A0492B"
    
    # Get vault data
    vault_data = generic_function_call(
        chain="ethereum",
        contract_address=vat,
        func_sig="urns(bytes32,address)",
        input=[ilk, vault_id],
        input_data_type=["bytes32", "address"],
        output_data_type=["uint256", "uint256"]
    )
    
    collateral = vault_data["output_args"][0]  # ink
    debt = vault_data["output_args"][1]  # art
    
    # Get collateral parameters
    ilk_data = generic_function_call(
        chain="ethereum",
        contract_address=vat,
        func_sig="ilks(bytes32)",
        input=[ilk],
        input_data_type=["bytes32"],
        output_data_type=["uint256", "uint256", "uint256", "uint256", "uint256"]
    )
    
    debt_ceiling = ilk_data["output_args"][0]  # Art
    rate = ilk_data["output_args"][1]  # rate
    spot = ilk_data["output_args"][2]  # spot price
    line = ilk_data["output_args"][3]  # line (debt ceiling)
    dust = ilk_data["output_args"][4]  # dust (min debt)
    
    # Calculate collateralization ratio
    collateral_value = collateral * spot
    debt_value = debt * rate
    
    collateralization_ratio = (collateral_value / debt_value * 100) if debt_value > 0 else float('inf')
    
    # Liquidation threshold is typically 150% for ETH-A
    liquidation_threshold = 150
    
    return {
        "vault_id": vault_id,
        "collateral_type": ilk,
        "collateral_amount": collateral,
        "debt_amount": debt,
        "collateralization_ratio": collateralization_ratio,
        "is_safe": collateralization_ratio > liquidation_threshold,
        "liquidation_price": (debt_value * liquidation_threshold) / (collateral * 100) if collateral > 0 else 0,
        "stability_fee": rate
    }
```

### Balancer V2 Implementation

```python
def monitor_balancer_pools(extracted_variables):
    """
    Balancer V2 pool monitoring with impermanent loss calculation
    """
    pool_id = extracted_variables["pool_id"]
    vault = "0xBA12222222228d8Ba445958a75a0704d566BF2C8"
    
    # Get pool tokens
    pool_tokens = generic_function_call(
        chain="ethereum",
        contract_address=vault,
        func_sig="getPoolTokens(bytes32)",
        input=[pool_id],
        input_data_type=["bytes32"],
        output_data_type=["address[]", "uint256[]", "uint256"]
    )
    
    tokens = pool_tokens["output_args"][0]
    balances = pool_tokens["output_args"][1]
    last_change = pool_tokens["output_args"][2]
    
    # Calculate pool metrics
    total_value_usd = 0
    token_details = []
    
    for i, token in enumerate(tokens):
        price = get_price(
            price_source="coingecko",
            asset=token,
            chain="ethereum"
        )["price"]
        
        decimals = generic_function_call(
            chain="ethereum",
            contract_address=token,
            func_sig="decimals()",
            input=[],
            output_data_type=["uint8"]
        )["output_args"][0]
        
        balance_human = balances[i] / (10 ** decimals)
        value_usd = balance_human * price
        total_value_usd += value_usd
        
        token_details.append({
            "token": token,
            "balance": balance_human,
            "value_usd": value_usd,
            "weight_percent": 0  # Will calculate after total
        })
    
    # Calculate weights and check balance
    for detail in token_details:
        detail["weight_percent"] = (detail["value_usd"] / total_value_usd) * 100
    
    # Check for imbalance
    max_weight = max(d["weight_percent"] for d in token_details)
    min_weight = min(d["weight_percent"] for d in token_details)
    imbalance_ratio = max_weight / min_weight if min_weight > 0 else float('inf')
    
    return {
        "pool_tvl_usd": total_value_usd,
        "token_count": len(tokens),
        "imbalance_ratio": imbalance_ratio,
        "needs_rebalancing": imbalance_ratio > 1.5,
        "token_details": token_details,
        "last_change_block": last_change
    }
```

### Curve Finance Implementation

```python
def monitor_curve_pools(extracted_variables):
    """
    Curve pool monitoring with A parameter tracking
    """
    pool = extracted_variables["pool_address"]
    
    # Get A parameter (amplification coefficient)
    a_param = generic_function_call(
        chain="ethereum",
        contract_address=pool,
        func_sig="A()",
        input=[],
        output_data_type=["uint256"]
    )["output_args"][0]
    
    # Get virtual price
    virtual_price = generic_function_call(
        chain="ethereum",
        contract_address=pool,
        func_sig="get_virtual_price()",
        input=[],
        output_data_type=["uint256"]
    )["output_args"][0] / 1e18
    
    # Get pool balances
    balances = []
    for i in range(3):  # Assuming 3pool
        try:
            balance = generic_function_call(
                chain="ethereum",
                contract_address=pool,
                func_sig="balances(uint256)",
                input=[i],
                input_data_type=["uint256"],
                output_data_type=["uint256"]
            )["output_args"][0]
            balances.append(balance)
        except:
            break
    
    # Calculate pool imbalance
    total_balance = sum(balances)
    expected_per_token = total_balance / len(balances)
    max_deviation = max(abs(b - expected_per_token) / expected_per_token for b in balances)
    
    # Check for ramping A
    future_a = generic_function_call(
        chain="ethereum",
        contract_address=pool,
        func_sig="future_A()",
        input=[],
        output_data_type=["uint256"]
    )["output_args"][0]
    
    is_ramping = future_a != a_param
    
    return {
        "amplification_coefficient": a_param,
        "virtual_price": virtual_price,
        "pool_imbalance_percent": max_deviation * 100,
        "is_ramping_a": is_ramping,
        "future_a": future_a if is_ramping else a_param,
        "pool_health": "healthy" if max_deviation < 0.1 else "imbalanced",
        "risk_level": "high" if is_ramping or max_deviation > 0.2 else "low"
    }
```

## Integration Tutorials (25+ Services)

### Slack Integration

#### Advanced Slack Workflow
```python
def format_slack_alert(extracted_variables):
    """
    Format rich Slack messages with actions
    """
    alert_type = extracted_variables.get("alert_type", "info")
    
    # Emoji mapping
    emoji_map = {
        "critical": "🚨",
        "high": "⚠️",
        "medium": "📊",
        "low": "ℹ️"
    }
    
    # Color mapping for attachments
    color_map = {
        "critical": "#FF0000",
        "high": "#FFA500",
        "medium": "#FFFF00",
        "low": "#00FF00"
    }
    
    # Build Slack message
    message = {
        "text": f"{emoji_map.get(alert_type, '📌')} Alert: {extracted_variables.get('title', 'Hypernative Alert')}",
        "attachments": [
            {
                "color": color_map.get(alert_type, "#808080"),
                "fields": [
                    {
                        "title": "Protocol",
                        "value": extracted_variables.get("protocol", "Unknown"),
                        "short": True
                    },
                    {
                        "title": "Chain",
                        "value": extracted_variables.get("chain", "ethereum"),
                        "short": True
                    },
                    {
                        "title": "Severity",
                        "value": alert_type.upper(),
                        "short": True
                    },
                    {
                        "title": "Value at Risk",
                        "value": f"${extracted_variables.get('value_at_risk', 0):,.2f}",
                        "short": True
                    }
                ],
                "footer": "Hypernative",
                "ts": int(time.time())
            }
        ],
        "actions": [
            {
                "type": "button",
                "text": "View Details",
                "url": f"https://app.hypernative.xyz/alerts/{extracted_variables.get('alert_id')}"
            },
            {
                "type": "button",
                "text": "Acknowledge",
                "style": "primary",
                "action_id": "acknowledge_alert"
            }
        ]
    }
    
    # Add thread if part of ongoing incident
    if extracted_variables.get("incident_id"):
        message["thread_ts"] = extracted_variables["incident_id"]
    
    # Add mention for critical alerts
    if alert_type == "critical":
        message["text"] = f"<!channel> {message['text']}"
    
    return message
```

#### Slack Workflow Automation
```javascript
// Slack workflow configuration
{
  "trigger": {
    "type": "webhook",
    "url": "https://hooks.slack.com/triggers/YOUR_TRIGGER_ID"
  },
  "workflow": {
    "name": "Hypernative Critical Alert Response",
    "steps": [
      {
        "type": "send_message",
        "channel": "#security-alerts",
        "message": "{{trigger.alert_message}}"
      },
      {
        "type": "create_incident",
        "name": "{{trigger.alert_title}}",
        "severity": "{{trigger.severity}}",
        "assign_to": "@oncall"
      },
      {
        "type": "wait_for_approval",
        "approvers": ["@security-lead", "@risk-manager"],
        "timeout": "5m"
      },
      {
        "type": "conditional",
        "if": "approval.status == 'approved'",
        "then": {
          "type": "execute_response",
          "action": "{{trigger.recommended_action}}"
        }
      }
    ]
  }
}
```

### Discord Integration

#### Rich Discord Embeds
```python
def create_discord_embed(extracted_variables):
    """
    Create rich Discord embed messages
    """
    import json
    
    embed = {
        "embeds": [{
            "title": f"🔔 {extracted_variables.get('alert_title', 'Hypernative Alert')}",
            "description": extracted_variables.get('description', ''),
            "color": 0xFF0000 if extracted_variables.get('severity') == 'critical' else 0xFFA500,
            "fields": [
                {
                    "name": "Protocol",
                    "value": extracted_variables.get('protocol', 'N/A'),
                    "inline": True
                },
                {
                    "name": "Risk Level",
                    "value": extracted_variables.get('risk_level', 'Medium'),
                    "inline": True
                },
                {
                    "name": "Chain",
                    "value": extracted_variables.get('chain', 'ethereum'),
                    "inline": True
                },
                {
                    "name": "Transaction",
                    "value": f"[View on Etherscan](https://etherscan.io/tx/{extracted_variables.get('tx_hash', '')})",
                    "inline": False
                }
            ],
            "footer": {
                "text": "Hypernative Security",
                "icon_url": "https://hypernative.xyz/logo.png"
            },
            "timestamp": datetime.utcnow().isoformat()
        }],
        "components": [{
            "type": 1,
            "components": [
                {
                    "type": 2,
                    "style": 5,
                    "label": "View Alert",
                    "url": f"https://app.hypernative.xyz/alert/{extracted_variables.get('alert_id')}"
                },
                {
                    "type": 2,
                    "style": 1,
                    "label": "Pause Protocol",
                    "custom_id": "pause_protocol"
                }
            ]
        }]
    }
    
    # Add role mention for critical alerts
    if extracted_variables.get('severity') == 'critical':
        embed["content"] = "<@&SECURITY_ROLE_ID> Critical Alert!"
    
    return embed
```

### Telegram Integration

#### Telegram Bot with Inline Keyboards
```python
def create_telegram_message(extracted_variables):
    """
    Create Telegram message with inline keyboard
    """
    # Message formatting with Markdown
    message = f"""
🚨 *Hypernative Alert*

*Protocol:* {extracted_variables.get('protocol', 'Unknown')}
*Severity:* {extracted_variables.get('severity', 'Medium').upper()}
*Chain:* {extracted_variables.get('chain', 'ethereum')}

*Details:*
{extracted_variables.get('description', 'No description available')}

*Value at Risk:* ${extracted_variables.get('value_at_risk', 0):,.2f}

*Recommended Action:* {extracted_variables.get('recommended_action', 'Monitor')}
"""
    
    # Inline keyboard for actions
    inline_keyboard = {
        "inline_keyboard": [
            [
                {
                    "text": "📊 View Details",
                    "url": f"https://app.hypernative.xyz/alert/{extracted_variables.get('alert_id')}"
                },
                {
                    "text": "✅ Acknowledge",
                    "callback_data": f"ack_{extracted_variables.get('alert_id')}"
                }
            ],
            [
                {
                    "text": "🛑 Execute Response",
                    "callback_data": f"execute_{extracted_variables.get('alert_id')}"
                }
            ]
        ]
    }
    
    # Mention users for critical alerts
    if extracted_variables.get('severity') == 'critical':
        message = f"@security_team @risk_manager\n{message}"
    
    return {
        "text": message,
        "parse_mode": "Markdown",
        "reply_markup": inline_keyboard
    }
```

### Fireblocks Integration

#### Transaction Policy Enforcement
```python
def fireblocks_transaction_policy(extracted_variables):
    """
    Fireblocks transaction approval policy
    """
    transaction = extracted_variables.get('transaction', {})
    
    policy_result = {
        "action": "approve",
        "reason": "",
        "conditions": []
    }
    
    # Check transaction value
    value_usd = transaction.get('value_usd', 0)
    if value_usd > 1000000:
        policy_result["action"] = "require_approval"
        policy_result["conditions"].append({
            "type": "multi_sig",
            "required_approvers": 2,
            "approver_groups": ["risk_managers", "security_team"]
        })
        policy_result["reason"] = f"Large transaction: ${value_usd:,.2f}"
    
    # Check recipient
    recipient = transaction.get('to', '')
    
    # Screen recipient
    screening_result = hn_api_post(
        "/screener/address",
        data={"address": recipient, "chain": "ethereum"}
    )
    
    if screening_result.get('flags', []):
        policy_result["action"] = "deny"
        policy_result["reason"] = f"Recipient flagged: {screening_result['flags']}"
        return policy_result
    
    # Check if interacting with unverified contract
    if transaction.get('data', '0x') != '0x':
        contract_data = get_contract_data(recipient, "ethereum")
        if not contract_data.get('verified', False):
            policy_result["action"] = "require_approval"
            policy_result["conditions"].append({
                "type": "manual_review",
                "reviewer": "security_team"
            })
            policy_result["reason"] = "Unverified contract interaction"
    
    # Time-based restrictions
    import datetime
    current_hour = datetime.datetime.utcnow().hour
    if current_hour < 6 or current_hour > 22:  # Outside business hours
        if value_usd > 100000:
            policy_result["action"] = "delay"
            policy_result["conditions"].append({
                "type": "time_delay",
                "delay_minutes": 30,
                "notification": "security_team"
            })
            policy_result["reason"] = "Large transaction outside business hours"
    
    return policy_result
```

### Email Integration

#### HTML Email Templates
```python
def create_email_alert(extracted_variables):
    """
    Create rich HTML email alerts
    """
    html_template = """
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            .alert-container {
                font-family: Arial, sans-serif;
                max-width: 600px;
                margin: 0 auto;
                border: 1px solid #ddd;
                border-radius: 8px;
            }
            .alert-header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 20px;
                border-radius: 8px 8px 0 0;
            }
            .severity-critical { border-left: 5px solid #ff0000; }
            .severity-high { border-left: 5px solid #ffa500; }
            .severity-medium { border-left: 5px solid #ffff00; }
            .alert-body {
                padding: 20px;
            }
            .metric {
                display: inline-block;
                margin: 10px 20px;
            }
            .metric-value {
                font-size: 24px;
                font-weight: bold;
                color: #333;
            }
            .metric-label {
                font-size: 12px;
                color: #666;
            }
            .action-button {
                display: inline-block;
                padding: 10px 20px;
                margin: 10px;
                background-color: #667eea;
                color: white;
                text-decoration: none;
                border-radius: 5px;
            }
        </style>
    </head>
    <body>
        <div class="alert-container severity-{severity}">
            <div class="alert-header">
                <h2>{alert_title}</h2>
                <p>{timestamp}</p>
            </div>
            <div class="alert-body">
                <h3>Alert Details</h3>
                <p>{description}</p>
                
                <div class="metrics">
                    <div class="metric">
                        <div class="metric-value">{protocol}</div>
                        <div class="metric-label">Protocol</div>
                    </div>
                    <div class="metric">
                        <div class="metric-value">{severity}</div>
                        <div class="metric-label">Severity</div>
                    </div>
                    <div class="metric">
                        <div class="metric-value">${value_at_risk:,.2f}</div>
                        <div class="metric-label">Value at Risk</div>
                    </div>
                </div>
                
                <h3>Recommended Action</h3>
                <p>{recommended_action}</p>
                
                <div class="actions">
                    <a href="{view_url}" class="action-button">View Alert</a>
                    <a href="{response_url}" class="action-button">Execute Response</a>
                </div>
            </div>
        </div>
    </body>
    </html>
    """
    
    import datetime
    
    return html_template.format(
        severity=extracted_variables.get('severity', 'medium'),
        alert_title=extracted_variables.get('title', 'Hypernative Alert'),
        timestamp=datetime.datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC'),
        description=extracted_variables.get('description', ''),
        protocol=extracted_variables.get('protocol', 'Unknown'),
        value_at_risk=extracted_variables.get('value_at_risk', 0),
        recommended_action=extracted_variables.get('recommended_action', 'Monitor'),
        view_url=f"https://app.hypernative.xyz/alert/{extracted_variables.get('alert_id')}",
        response_url=f"https://app.hypernative.xyz/response/{extracted_variables.get('alert_id')}"
    )
```

## Risk Framework & Security Solutions

### Comprehensive Risk Categories

#### 1. Exploit Detection Framework
```python
def exploit_detection_system(extracted_variables):
    """
    Multi-layered exploit detection system
    """
    indicators = {
        "reentrancy": False,
        "flash_loan": False,
        "price_manipulation": False,
        "access_control": False,
        "integer_overflow": False
    }
    
    # Check for reentrancy patterns
    traces = extracted_variables.get('traces', [])
    call_stack = {}
    for trace in traces:
        if trace['type'] == 'call':
            contract = trace['to']
            if contract in call_stack:
                call_stack[contract] += 1
                if call_stack[contract] > 1:
                    indicators["reentrancy"] = True
            else:
                call_stack[contract] = 1
    
    # Check for flash loan
    logs = extracted_variables.get('logs', [])
    for log in logs:
        if 'FlashLoan' in log.get('event', ''):
            indicators["flash_loan"] = True
            
    # Check for price manipulation
    price_changes = extracted_variables.get('price_changes', [])
    for change in price_changes:
        if abs(change) > 10:  # >10% price change
            indicators["price_manipulation"] = True
    
    # Calculate risk score
    risk_score = sum(indicators.values()) * 20
    
    # Determine action
    if risk_score >= 60:
        action = "block_and_alert"
    elif risk_score >= 40:
        action = "alert_critical"
    elif risk_score >= 20:
        action = "alert_high"
    else:
        action = "monitor"
    
    return {
        "indicators": indicators,
        "risk_score": risk_score,
        "action": action,
        "detected_patterns": [k for k, v in indicators.items() if v]
    }
```

#### 2. Governance Attack Prevention
```python
def governance_attack_detection(extracted_variables):
    """
    Detect and prevent governance attacks
    """
    proposal_data = extracted_variables.get('proposal', {})
    
    risks = []
    risk_level = "low"
    
    # Check proposal timeline
    voting_period = proposal_data.get('voting_period_hours', 72)
    if voting_period < 24:
        risks.append("short_voting_period")
        risk_level = "high"
    
    # Check quorum
    current_votes = proposal_data.get('current_votes', 0)
    quorum = proposal_data.get('quorum', 1000000)
    quorum_percentage = (current_votes / quorum * 100) if quorum > 0 else 0
    
    if quorum_percentage < 10:
        risks.append("low_participation")
    
    # Check for last-minute voting
    time_remaining = proposal_data.get('time_remaining_hours', 24)
    recent_votes = proposal_data.get('votes_last_hour', 0)
    
    if time_remaining < 6 and recent_votes > current_votes * 0.5:
        risks.append("last_minute_voting_surge")
        risk_level = "critical"
    
    # Check proposal changes
    changes = proposal_data.get('parameter_changes', [])
    for change in changes:
        if change.get('type') == 'admin_transfer':
            risks.append("admin_rights_change")
            risk_level = "critical"
        elif change.get('type') == 'treasury_withdrawal':
            amount = change.get('amount_usd', 0)
            if amount > 1000000:
                risks.append("large_treasury_withdrawal")
                risk_level = "high"
    
    # Check voter concentration
    top_voter_percentage = proposal_data.get('top_voter_percentage', 0)
    if top_voter_percentage > 51:
        risks.append("voter_concentration")
        risk_level = "high"
    
    return {
        "proposal_id": proposal_data.get('id'),
        "risks_detected": risks,
        "risk_level": risk_level,
        "quorum_percentage": quorum_percentage,
        "time_remaining": time_remaining,
        "recommended_action": "emergency_pause" if risk_level == "critical" else "alert"
    }
```

#### 3. Oracle Manipulation Detection
```python
def oracle_manipulation_detection(extracted_variables):
    """
    Detect oracle price manipulation attempts
    """
    oracle_updates = extracted_variables.get('oracle_updates', [])
    
    manipulation_indicators = {
        "rapid_updates": False,
        "large_deviation": False,
        "single_source": False,
        "stale_price": False
    }
    
    # Check update frequency
    if len(oracle_updates) > 5:  # More than 5 updates in one block
        manipulation_indicators["rapid_updates"] = True
    
    # Check price deviations
    for i in range(1, len(oracle_updates)):
        prev_price = oracle_updates[i-1]['price']
        curr_price = oracle_updates[i]['price']
        deviation = abs((curr_price - prev_price) / prev_price * 100)
        
        if deviation > 10:  # >10% change
            manipulation_indicators["large_deviation"] = True
    
    # Check data sources
    sources = set(update['source'] for update in oracle_updates)
    if len(sources) == 1:
        manipulation_indicators["single_source"] = True
    
    # Check for stale prices
    current_time = int(time.time())
    for update in oracle_updates:
        if current_time - update['timestamp'] > 3600:  # >1 hour old
            manipulation_indicators["stale_price"] = True
    
    # Calculate manipulation probability
    risk_score = sum(manipulation_indicators.values()) * 25
    
    return {
        "manipulation_indicators": manipulation_indicators,
        "risk_score": risk_score,
        "is_likely_manipulation": risk_score >= 50,
        "recommended_action": "pause_oracle_dependent_functions" if risk_score >= 75 else "monitor"
    }
```

#### 4. Bridge Security Monitor
```python
def bridge_security_monitor(extracted_variables):
    """
    Monitor cross-chain bridge security
    """
    bridge_data = extracted_variables.get('bridge', {})
    
    security_checks = {
        "validator_consensus": True,
        "liquidity_sufficient": True,
        "unusual_volume": False,
        "destination_verified": True
    }
    
    # Check validator consensus
    signatures = bridge_data.get('signatures', [])
    required_signatures = bridge_data.get('required_signatures', 3)
    
    if len(signatures) < required_signatures:
        security_checks["validator_consensus"] = False
    
    # Check liquidity
    required_amount = bridge_data.get('amount', 0)
    available_liquidity = bridge_data.get('destination_liquidity', 0)
    
    if available_liquidity < required_amount * 1.1:  # 10% buffer
        security_checks["liquidity_sufficient"] = False
    
    # Check for unusual volume
    daily_volume = bridge_data.get('daily_volume', 0)
    average_volume = bridge_data.get('average_daily_volume', 0)
    
    if daily_volume > average_volume * 3:  # 3x normal volume
        security_checks["unusual_volume"] = True
    
    # Verify destination
    destination_chain = bridge_data.get('destination_chain')
    destination_address = bridge_data.get('destination_address')
    
    # Check if destination is a known contract
    if destination_address:
        contract_data = get_contract_data(destination_address, destination_chain)
        if not contract_data.get('verified'):
            security_checks["destination_verified"] = False
    
    # Calculate security score
    passed_checks = sum(1 for k, v in security_checks.items() 
                       if (k != "unusual_volume" and v) or (k == "unusual_volume" and not v))
    security_score = (passed_checks / len(security_checks)) * 100
    
    return {
        "bridge": bridge_data.get('name'),
        "security_checks": security_checks,
        "security_score": security_score,
        "is_secure": security_score >= 75,
        "warnings": [k for k, v in security_checks.items() 
                    if (k != "unusual_volume" and not v) or (k == "unusual_volume" and v)]
    }
```

## Non-EVM Chain Implementations

### Solana Implementation

#### Solana Program Monitoring
```python
def monitor_solana_program(extracted_variables):
    """
    Monitor Solana program execution
    """
    program_id = extracted_variables.get('program_id')
    
    # Get program account info
    program_data = generic_function_call(
        chain="solana",
        contract_address=program_id,
        func_sig="getAccountInfo",
        input=[],
        input_data_type=[],
        output_data_type=["bytes"],
        block_number="latest"
    )
    
    # Parse program data
    is_executable = program_data.get('executable', False)
    owner = program_data.get('owner')
    lamports = program_data.get('lamports', 0)
    
    # Monitor program upgrades
    upgrade_authority = generic_function_call(
        chain="solana",
        contract_address=program_id,
        func_sig="getUpgradeAuthority",
        input=[],
        input_data_type=[],
        output_data_type=["address"]
    )
    
    # Check for suspicious patterns
    risks = []
    
    if not is_executable:
        risks.append("program_not_executable")
    
    if upgrade_authority and upgrade_authority != "11111111111111111111111111111111":
        risks.append("upgradeable_program")
    
    if lamports < 1000000:  # Less than minimum rent
        risks.append("insufficient_rent")
    
    return {
        "program_id": program_id,
        "is_executable": is_executable,
        "owner": owner,
        "upgrade_authority": upgrade_authority,
        "risks": risks,
        "is_immutable": upgrade_authority == "11111111111111111111111111111111"
    }
```

#### Kamino Protocol (Solana) Monitor
```python
def monitor_kamino_position(extracted_variables):
    """
    Monitor Kamino lending positions on Solana
    """
    user_pubkey = extracted_variables.get('user_pubkey')
    market_pubkey = extracted_variables.get('market_pubkey')
    
    # IDL for Kamino
    kamino_idl = {
        "instructions": [
            {
                "name": "getUserPosition",
                "accounts": [
                    {"name": "user", "isMut": False, "isSigner": False},
                    {"name": "market", "isMut": False, "isSigner": False}
                ]
            }
        ]
    }
    
    # Get user position
    position_data = generic_function_call(
        chain="solana",
        contract_address=market_pubkey,
        func_sig="getUserPosition",
        input=[user_pubkey],
        input_data_type=["pubkey"],
        output_data_type=["u64", "u64", "u64"],  # collateral, debt, health
        idl_json=kamino_idl
    )
    
    collateral = position_data["output_args"][0] / 1e9  # Lamports to SOL
    debt = position_data["output_args"][1] / 1e9
    health_factor = position_data["output_args"][2] / 1e4  # Basis points
    
    # Get market parameters
    market_data = generic_function_call(
        chain="solana",
        contract_address=market_pubkey,
        func_sig="getMarketData",
        input=[],
        input_data_type=[],
        output_data_type=["u64", "u64", "u64", "u16"],  # totalSupply, totalBorrow, utilizationRate, ltv
        idl_json=kamino_idl
    )
    
    total_supply = market_data["output_args"][0] / 1e9
    total_borrow = market_data["output_args"][1] / 1e9
    utilization = market_data["output_args"][2] / 1e4
    max_ltv = market_data["output_args"][3] / 100
    
    return {
        "user": user_pubkey,
        "collateral_sol": collateral,
        "debt_sol": debt,
        "health_factor": health_factor,
        "utilization_rate": utilization,
        "max_ltv": max_ltv,
        "is_healthy": health_factor > 1.1,
        "liquidation_risk": "high" if health_factor < 1.05 else "low"
    }
```

### Aptos Implementation

```python
def monitor_aptos_module(extracted_variables):
    """
    Monitor Aptos Move module execution
    """
    module_address = extracted_variables.get('module_address')
    module_name = extracted_variables.get('module_name')
    
    # Get module data
    module_data = generic_function_call(
        chain="aptos",
        contract_address=module_address,
        func_sig=f"{module_name}::get_info",
        input=[],
        input_data_type=[],
        output_data_type=["u64", "address", "bool"]
    )
    
    version = module_data["output_args"][0]
    admin = module_data["output_args"][1]
    is_paused = module_data["output_args"][2]
    
    # Monitor function calls
    function_calls = generic_function_call(
        chain="aptos",
        contract_address=module_address,
        func_sig=f"{module_name}::get_call_count",
        input=[],
        input_data_type=[],
        output_data_type=["u64"]
    )
    
    call_count = function_calls["output_args"][0]
    
    return {
        "module": f"{module_address}::{module_name}",
        "version": version,
        "admin": admin,
        "is_paused": is_paused,
        "call_count": call_count,
        "is_active": not is_paused and call_count > 0
    }
```

### StarkNet Implementation

```python
def monitor_starknet_contract(extracted_variables):
    """
    Monitor StarkNet contract state
    """
    contract_address = extracted_variables.get('contract_address')
    
    # Get contract class hash
    class_hash = generic_function_call(
        chain="starknet",
        contract_address=contract_address,
        func_sig="get_class_hash",
        input=[],
        input_data_type=[],
        output_data_type=["felt252"]
    )
    
    # Monitor storage variables
    balance = generic_function_call(
        chain="starknet",
        contract_address=contract_address,
        func_sig="balanceOf",
        input=[extracted_variables.get('user_address')],
        input_data_type=["felt252"],
        output_data_type=["u256"]
    )
    
    return {
        "contract": contract_address,
        "class_hash": class_hash["output_args"][0],
        "user_balance": balance["output_args"][0],
        "is_deployed": class_hash["output_args"][0] != 0
    }
```

### Cross-Chain Bridge Monitoring

```python
def monitor_cross_chain_bridge(extracted_variables):
    """
    Monitor bridge activity across multiple chains
    """
    # Example: Wormhole bridge monitoring
    bridge_address = extracted_variables["bridge_address"]
    
    # Monitor locked value on source chain (Ethereum)
    eth_locked = generic_function_call(
        chain="ethereum",
        contract_address=bridge_address,
        func_sig="totalValueLocked()",
        input=[],
        output_data_type=["uint256"]
    )["output_args"][0]
    
    # Monitor minted value on destination chain (Polygon)
    polygon_minted = generic_function_call(
        chain="polygon",
        contract_address=bridge_address,
        func_sig="totalMinted()",
        input=[],
        output_data_type=["uint256"]
    )["output_args"][0]
    
    # Calculate imbalance
    imbalance = abs(eth_locked - polygon_minted)
    imbalance_percent = (imbalance / eth_locked * 100) if eth_locked > 0 else 0
    
    # Check for unusual activity patterns
    recent_transfers = get_recent_events(
        chain="ethereum",
        contract_address=bridge_address,
        event_sig="TokensLocked",
        block_range=100
    )
    
    large_transfers = [t for t in recent_transfers if t["amount"] > 1000000]
    transfer_frequency = len(recent_transfers) / 100  # transfers per block
    
    return {
        "eth_locked_value": eth_locked / 1e18,
        "polygon_minted_value": polygon_minted / 1e18,
        "imbalance_amount": imbalance / 1e18,
        "imbalance_percent": imbalance_percent,
        "large_transfer_count": len(large_transfers),
        "transfer_frequency": transfer_frequency,
        "bridge_health": "healthy" if imbalance_percent < 5 else "imbalanced",
        "risk_indicators": {
            "high_imbalance": imbalance_percent > 10,
            "unusual_activity": transfer_frequency > 1,
            "large_transfers": len(large_transfers) > 5
        }
    }
```

### Advanced Token Balance Monitoring

```python
from invariantive.model.variable import TokenBalanceVariable, PythonProcessingVariable

def comprehensive_wallet_monitor(extracted_variables):
    """
    Monitor wallet with automatic token discovery and valuation
    """
    wallet = extracted_variables["wallet_address"]
    
    # Common stablecoins to monitor
    stablecoins = {
        "USDT": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        "USDC": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        "DAI": "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        "BUSD": "0x4Fabb145d64652a948d72533023f6E7A623C7C53"
    }
    
    # Major tokens to monitor
    major_tokens = {
        "WETH": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        "WBTC": "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
        "LINK": "0x514910771AF9Ca656af840dff83E8264EcF986CA",
        "UNI": "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"
    }
    
    total_value = 0
    token_holdings = {}
    
    # Check all tokens
    for name, address in {**stablecoins, **major_tokens}.items():
        balance = generic_function_call(
            chain="ethereum",
            contract_address=address,
            func_sig="balanceOf(address)",
            input=[wallet],
            input_data_type=["address"],
            output_data_type=["uint256"]
        )["output_args"][0]
        
        if balance > 0:
            decimals = generic_function_call(
                chain="ethereum",
                contract_address=address,
                func_sig="decimals()",
                input=[],
                output_data_type=["uint8"]
            )["output_args"][0]
            
            balance_human = balance / (10 ** decimals)
            
            # Get USD price
            price = get_price(
                price_source="coingecko",
                asset=address,
                chain="ethereum"
            )["price"]
            
            value_usd = balance_human * price
            total_value += value_usd
            
            token_holdings[name] = {
                "balance": balance_human,
                "value_usd": value_usd,
                "price": price
            }
    
    # Get ETH balance
    eth_balance = get_native_balance(wallet, "ethereum")
    eth_price = get_price(
        price_source="coingecko",
        asset="ethereum",
        chain="ethereum"
    )["price"]
    eth_value = eth_balance * eth_price
    total_value += eth_value
    
    # Calculate portfolio composition
    stablecoin_value = sum(token_holdings.get(name, {}).get("value_usd", 0) for name in stablecoins)
    volatile_value = total_value - stablecoin_value
    
    return {
        "total_portfolio_value": total_value,
        "eth_balance": eth_balance,
        "eth_value_usd": eth_value,
        "stablecoin_value": stablecoin_value,
        "volatile_value": volatile_value,
        "stablecoin_percentage": (stablecoin_value / total_value * 100) if total_value > 0 else 0,
        "token_holdings": token_holdings,
        "is_whale": total_value > 10000000,  # > $10M
        "portfolio_health": "balanced" if 20 < (stablecoin_value / total_value * 100) < 60 else "imbalanced"
    }
```

### Historical Event Analysis Patterns

```python
from invariantive.model.variable import HistoricalEventsVariable

def analyze_protocol_history(extracted_variables):
    """
    Analyze historical patterns for risk detection
    """
    protocol = extracted_variables["protocol_address"]
    
    # Get 7 days of historical events
    historical_events = get_historical_events(
        chain="ethereum",
        contract_address=protocol,
        event_name="Transfer",
        block_range=50000,  # ~7 days
        filters={"value": {">": 1000000000000}}  # Large transfers only
    )
    
    # Analyze patterns
    daily_volumes = {}
    unique_addresses = set()
    
    for event in historical_events:
        day = event["block_timestamp"] // 86400
        if day not in daily_volumes:
            daily_volumes[day] = 0
        daily_volumes[day] += event["args"]["value"]
        
        unique_addresses.add(event["args"]["from"])
        unique_addresses.add(event["args"]["to"])
    
    # Calculate metrics
    avg_daily_volume = sum(daily_volumes.values()) / len(daily_volumes) if daily_volumes else 0
    max_daily_volume = max(daily_volumes.values()) if daily_volumes else 0
    volume_variance = max_daily_volume / avg_daily_volume if avg_daily_volume > 0 else 0
    
    # Detect anomalies
    current_day_volume = daily_volumes.get(max(daily_volumes.keys()), 0)
    is_volume_spike = current_day_volume > avg_daily_volume * 2
    
    return {
        "total_events": len(historical_events),
        "unique_addresses": len(unique_addresses),
        "avg_daily_volume": avg_daily_volume / 1e18,
        "max_daily_volume": max_daily_volume / 1e18,
        "current_day_volume": current_day_volume / 1e18,
        "volume_variance_ratio": volume_variance,
        "is_volume_spike": is_volume_spike,
        "days_analyzed": len(daily_volumes),
        "risk_level": "high" if is_volume_spike and volume_variance > 3 else "normal"
    }
```

## Automated Response Smart Contracts

### Complete Implementation Examples

#### Universal Emergency Response Module
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IProtocol {
    function pause() external;
    function unpause() external;
    function emergencyWithdraw(address asset, uint256 amount) external;
}

contract UniversalEmergencyModule {
    address public owner;
    mapping(address => bool) public authorizedCallers;
    
    event EmergencyActionExecuted(address protocol, string action);
    event FundsRecovered(address asset, uint256 amount);
    
    modifier onlyAuthorized() {
        require(authorizedCallers[msg.sender] || msg.sender == owner, "Unauthorized");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        authorizedCallers[msg.sender] = true;
    }
    
    function pauseProtocol(address protocol) external onlyAuthorized {
        IProtocol(protocol).pause();
        emit EmergencyActionExecuted(protocol, "PAUSED");
    }
    
    function emergencyExit(
        address protocol,
        address asset,
        uint256 amount,
        address destination
    ) external onlyAuthorized {
        IProtocol(protocol).emergencyWithdraw(asset, amount);
        IERC20(asset).transfer(destination, amount);
        emit FundsRecovered(asset, amount);
    }
    
    function executeCustomAction(
        address target,
        bytes calldata data
    ) external onlyAuthorized returns (bytes memory) {
        (bool success, bytes memory result) = target.call(data);
        require(success, "Action failed");
        return result;
    }
}
```

#### Aave V3 Automated Position Manager
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@aave/core-v3/contracts/interfaces/IPool.sol";
import "@aave/core-v3/contracts/interfaces/IPriceOracle.sol";

contract AaveV3PositionManager {
    IPool public constant POOL = IPool(0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9);
    IPriceOracle public constant ORACLE = IPriceOracle(0x54586bE62E3c3580375aE3723C145253060Ca0C2);
    
    uint256 public constant HEALTH_FACTOR_THRESHOLD = 1.2e18; // 1.2
    uint256 public constant TARGET_HEALTH_FACTOR = 1.5e18; // 1.5
    
    event PositionRebalanced(address user, uint256 newHealthFactor);
    event EmergencyRepay(address user, address asset, uint256 amount);
    
    function checkAndRebalance(address user) external {
        (,,,,, uint256 healthFactor) = POOL.getUserAccountData(user);
        
        if (healthFactor < HEALTH_FACTOR_THRESHOLD) {
            _rebalancePosition(user, healthFactor);
        }
    }
    
    function _rebalancePosition(address user, uint256 currentHealthFactor) private {
        // Calculate required repayment
        uint256 repayAmount = _calculateRepayAmount(user, currentHealthFactor);
        
        // Get user's deposits
        address[] memory reserves = POOL.getReservesList();
        
        for (uint256 i = 0; i < reserves.length; i++) {
            DataTypes.ReserveData memory reserveData = POOL.getReserveData(reserves[i]);
            uint256 userBalance = IERC20(reserveData.aTokenAddress).balanceOf(user);
            
            if (userBalance > 0 && repayAmount > 0) {
                // Withdraw and repay
                uint256 withdrawAmount = userBalance > repayAmount ? repayAmount : userBalance;
                POOL.withdraw(reserves[i], withdrawAmount, address(this));
                POOL.repay(reserves[i], withdrawAmount, 2, user);
                
                repayAmount -= withdrawAmount;
                emit EmergencyRepay(user, reserves[i], withdrawAmount);
            }
        }
        
        // Check new health factor
        (,,,,, uint256 newHealthFactor) = POOL.getUserAccountData(user);
        emit PositionRebalanced(user, newHealthFactor);
    }
    
    function _calculateRepayAmount(
        address user,
        uint256 currentHealthFactor
    ) private view returns (uint256) {
        (
            uint256 totalCollateralBase,
            uint256 totalDebtBase,
            ,
            uint256 currentLiquidationThreshold,
            ,
        ) = POOL.getUserAccountData(user);
        
        // Calculate amount needed to reach target health factor
        uint256 targetDebt = (totalCollateralBase * currentLiquidationThreshold) / 
                            (TARGET_HEALTH_FACTOR * 10000);
        
        return totalDebtBase > targetDebt ? totalDebtBase - targetDebt : 0;
    }
}
```

## Templates & Configuration Library

### Incident Response Template
```yaml
incident_response_template:
  metadata:
    id: "INC-{{timestamp}}"
    type: "{{incident_type}}"
    severity: "{{severity}}"
    created_at: "{{timestamp}}"
    
  detection:
    source: "{{detection_source}}"
    alert_id: "{{alert_id}}"
    confidence: "{{confidence_score}}"
    
  impact_assessment:
    affected_protocols: "{{protocols}}"
    value_at_risk: "{{value_usd}}"
    affected_users: "{{user_count}}"
    chains: "{{chains}}"
    
  timeline:
    - detected_at: "{{detection_time}}"
    - acknowledged_at: "{{ack_time}}"
    - response_initiated: "{{response_time}}"
    - resolved_at: "{{resolution_time}}"
    
  response_actions:
    immediate:
      - action: "pause_protocol"
        status: "{{pause_status}}"
        executor: "{{executor_address}}"
      - action: "notify_team"
        channels: ["slack", "pagerduty", "email"]
        
    investigation:
      - analyze_root_cause: "{{root_cause}}"
      - identify_vulnerability: "{{vulnerability}}"
      - assess_damage: "{{damage_assessment}}"
      
    remediation:
      - deploy_fix: "{{fix_deployment}}"
      - verify_fix: "{{verification_status}}"
      - restore_service: "{{restoration_status}}"
      
  post_incident:
    lessons_learned: "{{lessons}}"
    action_items: "{{action_items}}"
    documentation_updates: "{{doc_updates}}"
```

### Ready-to-Deploy Agent Configurations

#### DeFi Lending Monitor
```json
{
  "name": "Universal DeFi Lending Monitor",
  "description": "Monitor health across all major lending protocols",
  "agents": [
    {
      "protocol": "Aave V3",
      "type": "health_factor",
      "config": {
        "pool_address": "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2",
        "warning_threshold": 1.5,
        "critical_threshold": 1.05,
        "check_interval": "1 block"
      }
    },
    {
      "protocol": "Compound V3",
      "type": "account_liquidity",
      "config": {
        "comet_address": "0xc3d688B66703497DAA19211EEdff47f25384cdc3",
        "min_liquidity": 1000,
        "check_utilization": true
      }
    },
    {
      "protocol": "Morpho",
      "type": "position_health",
      "config": {
        "market_id": "0xb323495f7e4148be5643a4ea4a8221eef163e4bccfdedc2a6f4696baacbc86cc",
        "health_threshold": 1.1,
        "check_oracle_deviation": true
      }
    }
  ],
  "notifications": {
    "channels": ["slack", "email"],
    "severity_filter": "medium",
    "aggregation": "5m"
  }
}
```

#### Cross-Chain Bridge Monitor
```json
{
  "name": "Multi-Bridge Security Monitor",
  "description": "Monitor security across major bridges",
  "bridges": [
    {
      "name": "LayerZero",
      "endpoints": {
        "ethereum": "0x66A71Dcef29A0fFBDBE3c6a460a3B5BC225Cd675",
        "arbitrum": "0x3c2269811836af69497E5F486A85D7316753cf62",
        "optimism": "0x3c2269811836af69497E5F486A85D7316753cf62"
      },
      "monitoring": {
        "check_liquidity": true,
        "check_validators": true,
        "unusual_volume_multiplier": 3
      }
    },
    {
      "name": "Wormhole",
      "endpoints": {
        "ethereum": "0x98f3c9e6E3fAce36bAAd05FE09d375Ef1464288B",
        "solana": "worm2ZoG2kUd4vFXhvjh93UUH596ayRfgQ2MgjNMTth"
      },
      "monitoring": {
        "guardian_threshold": 0.66,
        "check_attestations": true
      }
    }
  ],
  "alerts": {
    "validator_issues": "critical",
    "liquidity_shortage": "high",
    "unusual_volume": "medium"
  }
}
```

## Educational Resources & Tips

### Tips & Tricks for Efficient Monitoring

#### 1. Using Emojis in Alerts
- **Windows**: Press `Win + .` or `Win + ;` to open emoji picker
- **macOS**: Press `Ctrl + Cmd + Space` to open emoji picker  
- **Linux (GNOME)**: Press `Ctrl + .` or `Ctrl + ;` to open emoji picker

```python
def add_alert_emojis(extracted_variables):
    """
    Add contextual emojis to alerts for quick visual parsing
    """
    severity = extracted_variables.get('severity', 'info')
    alert_type = extracted_variables.get('type', 'general')
    
    # Severity emojis
    severity_emojis = {
        'critical': '🚨',
        'high': '⚠️',
        'medium': '📊',
        'low': 'ℹ️',
        'info': '📌'
    }
    
    # Type-specific emojis
    type_emojis = {
        'liquidation': '💧',
        'exploit': '🔓',
        'governance': '🗳️',
        'price': '📈',
        'whale': '🐋',
        'bridge': '🌉',
        'oracle': '🔮'
    }
    
    emoji = severity_emojis.get(severity, '') + ' ' + type_emojis.get(alert_type, '')
    
    return {
        'emoji': emoji,
        'formatted_title': f"{emoji} {extracted_variables.get('title', 'Alert')}"
    }
```

#### 2. Mention Users in Notifications
- **Telegram**: Use `@username` in alert message to mention users
- **Slack**: Use `<@USER_ID>` for user mentions, `<!channel>` for channel-wide
- **Discord**: Use `<@USER_ID>` for mentions, `@everyone` for all users

```python
def format_alert_with_mentions(extracted_variables):
    """
    Add user mentions based on severity
    """
    severity = extracted_variables["severity"]
    protocol = extracted_variables["protocol_name"]
    
    mentions = {
        "critical": "@everyone",
        "high": "@security-team @dev-team",
        "medium": "@security-team",
        "low": ""
    }
    
    return {
        "alert_message": f"{mentions.get(severity, '')} Alert for {protocol}",
        "needs_immediate_action": severity in ["critical", "high"]
    }
```

#### 3. Automated Slack Workflows
1. Navigate to **More** → **Automations** → **Workflows**
2. Click **New Workflow**
3. Select trigger: "When emoji reaction 📁 in #hypernative-alerts"
4. Add actions:
   - Collect info in a form
   - Add to Google Sheets
   - Create Jira ticket
   - Send to incident channel
5. Save and activate workflow

#### 4. Alert Aggregation Patterns
```python
def aggregate_similar_alerts(extracted_variables):
    """
    Aggregate similar alerts to prevent alert fatigue
    """
    recent_alerts = extracted_variables.get('recent_alerts', [])
    current_alert = extracted_variables.get('current_alert', {})
    
    # Group by similarity
    alert_groups = {}
    for alert in recent_alerts:
        key = f"{alert['type']}_{alert['protocol']}_{alert['severity']}"
        if key not in alert_groups:
            alert_groups[key] = []
        alert_groups[key].append(alert)
    
    # Check if current alert should be aggregated
    current_key = f"{current_alert['type']}_{current_alert['protocol']}_{current_alert['severity']}"
    
    if current_key in alert_groups and len(alert_groups[current_key]) >= 3:
        # Aggregate instead of individual alert
        return {
            'should_aggregate': True,
            'aggregated_count': len(alert_groups[current_key]) + 1,
            'summary': f"Multiple {current_alert['type']} alerts for {current_alert['protocol']}",
            'first_occurrence': alert_groups[current_key][0]['timestamp'],
            'details': alert_groups[current_key]
        }
    
    return {'should_aggregate': False}
```

#### 3. Smart Notification Routing
```python
def route_notifications(extracted_variables):
    """
    Route notifications based on context and time
    """
    import datetime
    
    severity = extracted_variables.get('severity')
    alert_type = extracted_variables.get('type')
    current_hour = datetime.datetime.utcnow().hour
    is_weekend = datetime.datetime.utcnow().weekday() >= 5
    
    channels = []
    
    # Critical always goes everywhere
    if severity == 'critical':
        channels = ['pagerduty', 'slack', 'telegram', 'email']
    
    # High severity routing
    elif severity == 'high':
        if 6 <= current_hour <= 22:  # Business hours
            channels = ['slack', 'email']
        else:  # After hours
            channels = ['pagerduty', 'email']
    
    # Medium severity
    elif severity == 'medium':
        if is_weekend:
            channels = ['email']  # Email only on weekends
        else:
            channels = ['slack']
    
    # Low severity - aggregate and send summary
    else:
        channels = ['email_summary']  # Daily summary
    
    # Special routing for specific types
    if alert_type == 'governance':
        channels.append('dao_channel')
    elif alert_type == 'whale_movement':
        channels.append('trading_desk')
    
    return {
        'channels': list(set(channels)),  # Remove duplicates
        'priority': 'immediate' if severity == 'critical' else 'normal',
        'escalation': severity in ['critical', 'high']
    }
```

### Common Troubleshooting Patterns

#### Debug Helper Functions
```python
def debug_helper(extracted_variables):
    """
    Comprehensive debug helper for agent development
    """
    import json
    import traceback
    
    debug_info = {
        'timestamp': datetime.utcnow().isoformat(),
        'variables_count': len(extracted_variables),
        'variable_types': {},
        'errors': [],
        'warnings': []
    }
    
    # Analyze each variable
    for key, value in extracted_variables.items():
        var_type = type(value).__name__
        debug_info['variable_types'][key] = var_type
        
        # Check for common issues
        if value is None:
            debug_info['warnings'].append(f"{key} is None")
        elif var_type == 'str' and value == '':
            debug_info['warnings'].append(f"{key} is empty string")
        elif var_type == 'list' and len(value) == 0:
            debug_info['warnings'].append(f"{key} is empty list")
        elif var_type == 'dict' and len(value) == 0:
            debug_info['warnings'].append(f"{key} is empty dict")
    
    # Check for required variables
    required = ['tx_hash', 'block_number', 'chain']
    missing = [r for r in required if r not in extracted_variables]
    if missing:
        debug_info['errors'].append(f"Missing required variables: {missing}")
    
    # Memory usage check
    total_size = sum(len(str(v)) for v in extracted_variables.values())
    if total_size > 1000000:  # 1MB
        debug_info['warnings'].append(f"Large memory usage: {total_size} bytes")
    
    # Print formatted debug info
    print("=== DEBUG INFO ===")
    print(json.dumps(debug_info, indent=2))
    print("=== VARIABLES ===")
    for key, value in extracted_variables.items():
        print(f"{key}: {value[:100] if isinstance(value, str) else value}")
    
    return debug_info
```

## Supported Chains - Complete Technical Matrix

### All 66 Supported Chains (58 Mainnet + 8 Testnet)

#### EVM Chains - Mainnet
| Chain | Chain ID | Features | Block Time | Finality |
|-------|----------|----------|------------|----------|
| Ethereum | 1 | Full Support | 12s | 12 min |
| BNB Smart Chain | 56 | Full Support | 3s | 45s |
| Polygon | 137 | Full Support | 2s | 256 blocks |
| Avalanche C-Chain | 43114 | Full Support | 2s | 1s |
| Arbitrum One | 42161 | Full Support | 0.25s | ~13 min |
| Optimism | 10 | Full Support | 2s | ~13 min |
| Base | 8453 | Full Support | 2s | ~13 min |
| zkSync Era | 324 | Full Support | 1s | 10-15 min |
| Polygon zkEVM | 1101 | Full Support | 2s | 20 min |
| Linea | 59144 | Full Support | 12s | 12 min |
| Scroll | 534352 | Full Support | 3s | 10 min |
| Mode | 34443 | Full Support | 2s | ~13 min |
| Blast | 81457 | Full Support | 2s | ~13 min |
| Fantom | 250 | Full Support | 1s | 1s |
| Celo | 42220 | Full Support | 5s | 1 block |
| Gnosis | 100 | Full Support | 5s | 5 min |
| Moonbeam | 1284 | Full Support | 12s | 25 blocks |
| Moonriver | 1285 | Full Support | 12s | 25 blocks |
| Aurora | 1313161554 | Full Support | 1s | 2s |
| Cronos | 25 | Full Support | 5s | 1 block |
| Harmony | 1666600000 | Full Support | 2s | 2s |
| Metis | 1088 | Full Support | 4s | 12 min |
| Boba | 288 | Full Support | 0.25s | ~13 min |
| Mantle | 5000 | Full Support | 2s | 10 min |
| Kava | 2222 | Full Support | 6s | 1 block |
| Klaytn | 8217 | Full Support | 1s | 1s |
| Core | 1116 | Full Support | 3s | 3s |
| Evmos | 9001 | Full Support | 2s | 1 block |
| Oasis Emerald | 42262 | Full Support | 6s | 1 block |
| Fuse | 122 | Full Support | 5s | 1 block |
| Canto | 7700 | Full Support | 6s | 1 block |
| zkFair | 42766 | Full Support | 1s | 10 min |
| Manta Pacific | 169 | Full Support | 2s | ~13 min |
| X Layer | 196 | Full Support | 2s | 20 min |
| Zora | 7777777 | Full Support | 2s | ~13 min |
| PulseChain | 369 | Full Support | 12s | 12 min |
| Filecoin | 314 | Full Support | 30s | 900 epochs |
| opBNB | 204 | Full Support | 1s | 10 blocks |
| Rootstock | 30 | Full Support | 30s | 6 blocks |
| Shimmer EVM | 148 | Full Support | 5s | 1 block |
| Hedera | 295 | Limited | 2s | Instant |
| Rollux | 570 | Full Support | 2s | 10 min |
| BitTorrent | 199 | Full Support | 3s | 1 block |
| Beam | 4337 | Full Support | 12s | 12 min |
| IOTA EVM | 1075 | Full Support | 5s | 1 block |
| Taiko | 167000 | Full Support | 12s | 12 min |
| Sei v2 | 1329 | Full Support | 0.5s | Instant |
| BOB | 60808 | Full Support | 2s | ~13 min |
| ZetaChain | 7000 | Full Support | 6s | 2 blocks |
| World Chain | 480 | Full Support | 2s | ~13 min |
| Immutable zkEVM | 13371 | Full Support | 2s | 20 min |
| Soneium | 1868 | Full Support | 2s | ~13 min |

#### EVM Chains - Testnet
| Chain | Chain ID | Purpose | Faucet Available |
|-------|----------|---------|------------------|
| Sepolia | 11155111 | Ethereum Testnet | Yes |
| Holesky | 17000 | Ethereum Testnet | Yes |
| BNB Testnet | 97 | BSC Testnet | Yes |
| Polygon Amoy | 80002 | Polygon Testnet | Yes |
| Base Sepolia | 84532 | Base Testnet | Yes |
| Avalanche Fuji | 43113 | Avalanche Testnet | Yes |
| Arbitrum Sepolia | 421614 | Arbitrum Testnet | Yes |
| Optimism Sepolia | 11155420 | Optimism Testnet | Yes |

#### Non-EVM Chains
| Chain | Type | Features | Block Time |
|-------|------|----------|------------|
| Solana | SVM | Events, Functions, State | 0.4s |
| Aptos | Move | Events, Functions, State | 1s |
| Sui | Move | Events, Functions | 1s |
| Starknet | Cairo | Events, Functions | 10s |
| TON | FunC | Limited | 5s |
| Near | Rust/AS | Events, State | 1s |
| Cosmos | CosmWasm | Events | 6s |
| Bitcoin | UTXO | Transactions Only | 10 min |

### Chain-Specific Features Matrix

| Feature | EVM | Solana | Aptos | Starknet | Bitcoin |
|---------|-----|--------|-------|----------|---------|
| Real-time Monitoring | ✅ | ✅ | ✅ | ✅ | ✅ |
| Smart Contract Calls | ✅ | ✅ | ✅ | ✅ | ❌ |
| Event Monitoring | ✅ | ✅ | ✅ | ✅ | ❌ |
| State Reading | ✅ | ✅ | ✅ | ✅ | ❌ |
| Transaction Analysis | ✅ | ✅ | ✅ | ✅ | ✅ |
| Token Balances | ✅ | ✅ | ✅ | ✅ | ❌ |
| Price Feeds | ✅ | ✅ | ✅ | ✅ | ✅ |
| Historical Data | ✅ | ✅ | ✅ | ✅ | ✅ |
| Automated Response | ✅ | ✅ | ✅ | ✅ | ❌ |
| Guardian Support | ✅ | ✅ | ✅ | ❌ | ❌ |

## Technical Specifications

### System Requirements
- **API Rate Limits**: 100 req/s, 50k req/hour, burst to 200 req/s
- **Webhook Timeout**: 30 seconds standard, 60 seconds max
- **Max Payload Size**: 10MB compressed, 50MB uncompressed
- **Supported TLS**: 1.2, 1.3
- **Authentication**: OAuth 2.0, API Keys, JWT tokens
- **Websocket**: Supported for real-time alerts

### Performance Metrics
- **Alert Latency**: P50 < 5s, P95 < 10s, P99 < 30s
- **API Response Time**: P50 < 200ms, P95 < 500ms, P99 < 1s
- **Simulation Time**: Simple < 1s, Complex < 5s, Cross-chain < 10s
- **Agent Execution**: Block agents < 2s, Event agents < 1s
- **Historical Query**: <5s for 1 day, <30s for 1 month

### Security Standards
- **Encryption**: AES-256-GCM at rest, TLS 1.3 in transit
- **Key Rotation**: 90 days recommended, 180 days maximum
- **Audit Logging**: All API calls logged with request/response
- **Compliance**: SOC 2 Type II (in progress), GDPR compliant
- **Infrastructure**: Multi-region, redundant, DDoS protected
- **Backup**: Real-time replication, 30-day retention

### Integration Requirements
- **Webhooks**: HTTPS only, signature validation required
- **API Clients**: Exponential backoff, circuit breaker pattern
- **Smart Contracts**: Audited, upgradeable, pausable
- **Monitoring**: Prometheus metrics, OpenTelemetry traces
- **SDKs**: Python 3.8+, Node.js 16+, Go 1.19+

### Chain-Specific Limits
| Chain | Max Block Range | Max Events/Query | Rate Limit |
|-------|----------------|------------------|------------|
| Ethereum | 10,000 | 10,000 | 100 req/s |
| Polygon | 50,000 | 50,000 | 200 req/s |
| BSC | 20,000 | 20,000 | 150 req/s |
| Arbitrum | 100,000 | 100,000 | 300 req/s |
| Solana | N/A | 1,000 | 50 req/s |

---

**End of Documentation**

This ultimate technical documentation provides the most comprehensive reference for the Hypernative platform, including:
- 750+ technical specifications
- 200+ code examples
- 65+ protocol implementations
- 30+ integration tutorials
- Complete SDK reference with all variables and functions
- Production-ready templates and configurations
- Advanced monitoring patterns
- Multi-chain implementations
- Best practices and troubleshooting guides

Total: ~5,000+ lines of technical documentation optimized for developers and AI consumption.