#!/usr/bin/env node

/**
 * Simple test script to verify notification channel functionality
 */

import { NotificationChannelProvider } from './dist/providers/notification-channel.provider.js';
import { substituteEnvVars, redactSecrets } from './dist/lib/env-substitution.js';

// Mock API client for testing
class MockApiClient {
  constructor() {
    this.channels = new Map();
  }

  async get(path, options) {
    console.log(`[MOCK] GET ${path}`, options?.params || {});
    
    if (path === '/api/v2/notification-channels') {
      return { data: Array.from(this.channels.values()) };
    }
    
    const id = path.split('/').pop();
    if (this.channels.has(id)) {
      return { data: this.channels.get(id) };
    }
    
    const error = new Error('Not found');
    error.status = 404;
    throw error;
  }

  async post(path, data, options) {
    console.log(`[MOCK] POST ${path}`, 'data:', redactSecrets(data));
    
    if (path === '/api/v2/notification-channels') {
      const id = `ch_${Date.now()}`;
      const channel = {
        id,
        name: data.name,
        type: data.type,
        enabled: data.enabled,
        description: data.description,
        configuration: data.configuration,
        tags: data.tags,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      this.channels.set(id, channel);
      return { data: channel };
    }
    
    if (path.includes('/test')) {
      return {
        data: {
          success: true,
          message: 'Test notification sent successfully',
          delivered_at: new Date().toISOString()
        }
      };
    }
    
    throw new Error(`Unknown endpoint: ${path}`);
  }

  async patch(path, data, options) {
    console.log(`[MOCK] PATCH ${path}`, 'data:', redactSecrets(data));
    
    const id = path.split('/').pop();
    if (this.channels.has(id)) {
      const existing = this.channels.get(id);
      const updated = { ...existing, ...data, updated_at: new Date().toISOString() };
      this.channels.set(id, updated);
      return { data: updated };
    }
    
    const error = new Error('Not found');
    error.status = 404;
    throw error;
  }

  async delete(path, options) {
    console.log(`[MOCK] DELETE ${path}`);
    
    const id = path.split('/').pop();
    if (this.channels.has(id)) {
      this.channels.delete(id);
      return { data: { success: true, deleted_at: new Date().toISOString() } };
    }
    
    const error = new Error('Not found');
    error.status = 404;
    throw error;
  }
}

// Test environment variable substitution
function testEnvSubstitution() {
  console.log('\n=== Testing Environment Variable Substitution ===');
  
  const config = {
    url: '${WEBHOOK_URL}',
    token: '${API_TOKEN:default-token}',
    nested: {
      secret: '${SECRET_KEY}',
      timeout: 30
    }
  };

  const customEnv = {
    WEBHOOK_URL: 'https://example.com/webhook',
    SECRET_KEY: 'super-secret-key-123'
  };

  try {
    const result = substituteEnvVars(config, { customEnv, strict: false });
    console.log('Original config:', config);
    console.log('Substituted config:', result.redacted);
    console.log('Referenced vars:', result.referencedVars);
    console.log('Missing vars:', result.missingVars);
  } catch (error) {
    console.error('Environment substitution failed:', error);
  }
}

// Test notification channel provider
async function testNotificationChannelProvider() {
  console.log('\n=== Testing Notification Channel Provider ===');
  
  const apiClient = new MockApiClient();
  const provider = new NotificationChannelProvider({
    apiClient,
    dryRun: false,
    envSubstitutionOptions: {
      strict: false,
      customEnv: {
        WEBHOOK_URL: 'https://hooks.slack.com/services/TEST/TEST/TEST',
        API_TOKEN: 'test-token-123'
      }
    }
  });

  try {
    // Test creation
    const channelConfig = {
      name: 'Test Webhook',
      description: 'Test webhook channel',
      type: 'webhook',
      enabled: true,
      validate: true,
      tags: { environment: 'test' },
      configuration: {
        url: '${WEBHOOK_URL}',
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ${API_TOKEN}',
          'Content-Type': 'application/json'
        },
        timeout: 30
      }
    };

    console.log('Creating channel...');
    const created = await provider.create(channelConfig);
    console.log('Created channel:', created.name, 'ID:', created.id);

    // Test listing
    console.log('Listing channels...');
    const channels = await provider.list();
    console.log('Found channels:', channels.length);

    // Test update
    console.log('Updating channel...');
    const updateConfig = { ...channelConfig, description: 'Updated description', enabled: false };
    const updated = await provider.update(created.id, updateConfig);
    console.log('Updated channel:', updated.name, 'Enabled:', updated.enabled);

    // Test validation
    console.log('Validating configuration...');
    const validation = provider.validateConfiguration(channelConfig);
    console.log('Validation result:', validation.valid ? 'PASSED' : 'FAILED');
    if (validation.errors.length > 0) {
      console.log('Errors:', validation.errors);
    }
    if (validation.warnings.length > 0) {
      console.log('Warnings:', validation.warnings);
    }

    // Test deletion
    console.log('Deleting channel...');
    await provider.delete(created.id);
    console.log('Channel deleted successfully');

  } catch (error) {
    console.error('Provider test failed:', error);
  }
}

// Run tests
async function main() {
  console.log('🚀 Testing Notification Channel Implementation\n');
  
  testEnvSubstitution();
  await testNotificationChannelProvider();
  
  console.log('\n✅ All tests completed!');
}

main().catch(console.error);