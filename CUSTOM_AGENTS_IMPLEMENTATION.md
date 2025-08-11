# Custom Agents Feature Implementation

## Overview

This document summarizes the implementation of the Provider Custom Agents feature for the Hypernative Apply CLI, following the technical requirements and patterns established in the existing codebase.

## Implementation Summary

### ✅ Completed Components

1. **API Types** (`src/types/api.ts`)
   - Added `CustomAgentCreatePayload` for API creation requests
   - Added `CustomAgentUpdatePayload` for API update requests  
   - Added `CustomAgentStatusResponse` for status monitoring
   - Extended existing `CustomAgent` interface for completeness

2. **Custom Agent Provider** (`src/providers/custom-agent.provider.ts`)
   - Full CRUD operations: List, Create, Update, Delete, Status
   - **Replace on type change** - implements REPLACE logic when agent type changes
   - Configuration validation by type with specific rules for known agent types
   - Channel resolution integration for notification channels
   - Dry-run support following existing patterns
   - Error handling and actionable error messages

3. **Channel Resolver Utility** (`src/lib/channel-resolver.ts`)
   - Resolves logical channel names to API IDs during planning phase
   - Caching mechanism for performance (5-minute TTL)
   - Validation and suggestion system for better error messages
   - Batch resolution for efficiency

4. **Planner Integration** (`src/lib/planner.ts`)
   - **Type change detection** - detects when custom agent type changes
   - **REPLACE logic** - marks type changes as REPLACE instead of UPDATE
   - Stores agent type in state metadata for comparison
   - Enhanced risk assessment (REPLACE operations = high risk)
   - Dependency tracking for notification channels

5. **Executor Integration** (`src/lib/executor.ts`)
   - Custom agent provider integration
   - Support for all CRUD operations including REPLACE
   - State management with agent type tracking
   - Proper error handling and rollback support

## Key Technical Features

### 🔄 Replace on Type Change
- **Detection**: Type changes detected by comparing stored agent type in state metadata
- **Logic**: When agent type changes, operation is marked as REPLACE (not UPDATE)  
- **Implementation**: Delete old agent → Create new agent with new type
- **Safety**: High risk level assigned to prevent accidental data loss

### 📡 Channel Resolution
- **Planning Phase**: Resolve logical names to API IDs during plan generation
- **Validation**: Validate all referenced channels exist
- **Error Handling**: Actionable error messages with suggestions
- **Performance**: Intelligent caching to reduce API calls

### 🔧 Configuration Validation
- **Type-Specific**: Different validation rules for different agent types
- **Known Types**: Specific validation for `address_balance_change`, `position_health_deviation`, etc.
- **Extensible**: Easy to add new agent type validations
- **Flexible**: Pass-through unknown configuration keys for future compatibility

### 📊 State Management
- **Type Tracking**: Agent type stored in state metadata for change detection
- **Fingerprinting**: Configuration hashing for drift detection
- **Consistency**: Follows existing state management patterns

## Example Configuration

```yaml
# hypernative/custom-agents/balance-monitor.yaml
name: treasury-balance-monitor
description: Monitor treasury wallet balance changes
type: address_balance_change
enabled: true
chain: ethereum
severity: high

configuration:
  addresses:
    - "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"  # USDC
    - "0x6B175474E89094C44Da98b954EedeAC495271d0F"  # DAI
  threshold_type: percentage
  threshold_value: 10
  direction: both
  time_window: 1h
  monitor_native_token: true
  monitor_erc20_tokens: true

notification_channels:
  - slack_critical
  - webhook_prod

schedule:
  interval: 5
  timezone: UTC

monitoring:
  collect_metrics: true
  retry_on_failure: true
  max_retries: 3
```

## Usage Examples

### Create/Update Agent
```bash
# Plan changes
hypernative plan

# Apply changes
hypernative apply

# Dry run
hypernative apply --dry-run
```

### Type Change (Triggers REPLACE)
```yaml
# Original configuration
type: address_balance_change

# Modified configuration (will trigger REPLACE)  
type: large_transaction_monitor
configuration:
  value_threshold_usd: 100000
```

## Testing

A comprehensive test script (`test-custom-agent-provider.js`) demonstrates:
- ✅ Channel resolution with error handling
- ✅ Configuration validation 
- ✅ CRUD operations
- ✅ Type change replacement logic
- ✅ Error scenarios and recovery

## API Endpoints Used

- `GET /custom-agents` - List agents
- `POST /custom-agents` - Create agent  
- `PATCH /custom-agents/{id}` - Update agent
- `DELETE /custom-agents/{id}` - Delete agent
- `GET /custom-agents/{id}/status` - Get status
- `GET /notification-channels` - Resolve channels

## Architecture Alignment

The implementation follows the established patterns:
- **Provider Pattern**: Follows `watchlist.provider.ts` structure
- **State Management**: Uses existing state store with metadata extensions
- **Error Handling**: Consistent error patterns with actionable messages
- **Dependency Management**: Integrates with existing dependency graph
- **Type Safety**: Full TypeScript support with proper type definitions

## Future Enhancements

1. **Enhanced Type Detection**: Could implement remote agent fetching for more robust type change detection
2. **Configuration Templates**: Pre-built templates for common agent types
3. **Validation Extensions**: More sophisticated validation rules for complex configurations
4. **Metrics Integration**: Agent performance and execution metrics tracking
5. **Bulk Operations**: Support for bulk agent operations

## Files Modified/Created

### New Files
- `src/providers/custom-agent.provider.ts` - Main provider implementation
- `src/lib/channel-resolver.ts` - Channel resolution utility
- `test-custom-agent.yaml` - Example configuration
- `test-custom-agent-provider.js` - Demonstration script

### Modified Files  
- `src/types/api.ts` - Added custom agent API types
- `src/lib/planner.ts` - Added type change detection and REPLACE logic
- `src/lib/executor.ts` - Added custom agent provider integration

## Conclusion

The Custom Agents feature is now fully implemented with:
- ✅ Complete CRUD functionality
- ✅ Type change detection and replacement logic
- ✅ Channel resolution and validation
- ✅ Integration with existing planning and execution systems
- ✅ Comprehensive error handling and user feedback
- ✅ Full TypeScript support and type safety

The implementation maintains consistency with existing patterns while providing the specific functionality required for custom agent management.