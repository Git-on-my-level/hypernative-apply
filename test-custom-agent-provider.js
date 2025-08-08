/**
 * Test script for Custom Agent Provider functionality
 * 
 * This script demonstrates:
 * 1. Creating a custom agent
 * 2. Updating a custom agent 
 * 3. Handling type changes (REPLACE operation)
 * 4. Channel resolution
 * 5. Configuration validation
 */

import { CustomAgentProvider } from './dist/providers/custom-agent.provider.js';
import { ChannelResolver } from './dist/lib/channel-resolver.js';
import { ApiClient } from './dist/lib/api-client.js';
import { log } from './dist/lib/logger.js';

// Mock API client for demonstration
class MockApiClient {
  async get(path) {
    log.info(`[MOCK] GET ${path}`);
    
    if (path.includes('/notification-channels')) {
      return {
        data: [
          { id: 'ch_001', name: 'slack_critical', type: 'slack', enabled: true },
          { id: 'ch_002', name: 'webhook_prod', type: 'webhook', enabled: true }
        ]
      };
    }
    
    if (path.includes('/custom-agents/')) {
      return {
        data: {
          id: 'agent_123',
          name: 'Test Agent',
          type: 'address_balance_change',
          enabled: true,
          configuration: {},
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          execution_count: 0,
          error_count: 0
        }
      };
    }
    
    return { data: [] };
  }
  
  async post(path, data) {
    log.info(`[MOCK] POST ${path}`, { payload: JSON.stringify(data, null, 2) });
    return {
      data: {
        id: `agent_${Date.now()}`,
        name: data.name,
        type: data.type,
        enabled: data.enabled,
        configuration: data.configuration,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        execution_count: 0,
        error_count: 0
      }
    };
  }
  
  async patch(path, data) {
    log.info(`[MOCK] PATCH ${path}`, { payload: JSON.stringify(data, null, 2) });
    return {
      data: {
        id: 'agent_123',
        name: data.name,
        type: 'address_balance_change',
        enabled: data.enabled,
        configuration: data.configuration,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: new Date().toISOString(),
        execution_count: 5,
        error_count: 0
      }
    };
  }
  
  async delete(path) {
    log.info(`[MOCK] DELETE ${path}`);
    return { success: true };
  }
}

async function testCustomAgentProvider() {
  console.log('🚀 Testing Custom Agent Provider functionality...\n');
  
  // Setup
  const apiClient = new MockApiClient();
  const channelResolver = new ChannelResolver(apiClient);
  const provider = new CustomAgentProvider({ 
    apiClient, 
    channelResolver, 
    dryRun: false 
  });
  
  // Test 1: Channel resolution
  console.log('📡 Testing channel resolution...');
  try {
    const channels = ['slack_critical', 'webhook_prod', 'nonexistent_channel'];
    const resolution = await channelResolver.resolveChannels(channels);
    
    console.log('✅ Resolved channels:', resolution.resolved);
    console.log('❌ Failed channels:', resolution.failed);
    if (resolution.errors) {
      console.log('🔍 Errors:', resolution.errors);
    }
  } catch (error) {
    console.error('❌ Channel resolution failed:', error);
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test 2: Configuration validation
  console.log('🔧 Testing configuration validation...');
  
  const validConfig = {
    name: 'test-balance-monitor',
    description: 'Test balance monitoring',
    type: 'address_balance_change',
    enabled: true,
    chain: 'ethereum',
    severity: 'high',
    configuration: {
      addresses: ['0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'],
      threshold_type: 'percentage',
      threshold_value: 10,
      direction: 'both'
    },
    notification_channels: ['slack_critical']
  };
  
  const validation = provider.validateConfiguration(validConfig);
  console.log('✅ Configuration valid:', validation.valid);
  if (validation.errors.length > 0) {
    console.log('❌ Validation errors:', validation.errors);
  }
  if (validation.warnings.length > 0) {
    console.log('⚠️  Validation warnings:', validation.warnings);
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test 3: Create custom agent
  console.log('🆕 Testing custom agent creation...');
  try {
    const createdAgent = await provider.create(validConfig);
    console.log('✅ Created agent:', createdAgent.name, `(${createdAgent.id})`);
  } catch (error) {
    console.error('❌ Creation failed:', error.message);
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test 4: Update custom agent
  console.log('🔄 Testing custom agent update...');
  try {
    const updateConfig = { ...validConfig, description: 'Updated description', enabled: false };
    const updatedAgent = await provider.update('agent_123', updateConfig);
    console.log('✅ Updated agent:', updatedAgent.name);
  } catch (error) {
    console.error('❌ Update failed:', error.message);
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test 5: Replace custom agent (type change)
  console.log('🔁 Testing custom agent replacement...');
  try {
    const replaceConfig = { 
      ...validConfig, 
      type: 'large_transaction_monitor',
      configuration: { value_threshold_usd: 100000 }
    };
    const replacedAgent = await provider.replace('agent_123', replaceConfig);
    console.log('✅ Replaced agent:', replacedAgent.name, `(new type: ${replaceConfig.type})`);
  } catch (error) {
    console.error('❌ Replace failed:', error.message);
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test 6: List agents
  console.log('📋 Testing agent listing...');
  try {
    const agents = await provider.list({ enabled: true });
    console.log(`✅ Found ${agents.length} agents`);
  } catch (error) {
    console.error('❌ Listing failed:', error.message);
  }
  
  console.log('\n🎉 Custom Agent Provider testing completed!');
}

// Run the tests
testCustomAgentProvider().catch(console.error);