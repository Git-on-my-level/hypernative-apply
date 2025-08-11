import { readFileSync } from 'fs';
import yaml from 'yaml';

// Build and import from dist
import { completeNotificationChannelSchema } from './dist/schemas/notification-channel.schema.js';

// Test with the working example from test-config
try {
  const content = readFileSync('./test-config/hypernative/notification-channels/valid-channel.yaml', 'utf-8');
  const data = yaml.parse(content);
  console.log('Valid channel data:');
  console.log(JSON.stringify(data, null, 2));
  
  const result = completeNotificationChannelSchema.safeParse(data);
  if (!result.success) {
    console.log('\nValidation failed for WORKING example:');
    console.log(JSON.stringify(result.error.issues, null, 2));
  } else {
    console.log('\nWorking example validation: PASSED!');
  }
} catch (error) {
  console.error('Error:', error.message);
}

// Test with our test structure
const testData = {
  name: "Test Webhook Channel",
  type: "webhook",  
  enabled: true,
  configuration: {
    url: "https://hooks.slack.com/services/test",
    method: "POST"
  }
};

console.log('\n\nTest data:');
console.log(JSON.stringify(testData, null, 2));

const testResult = completeNotificationChannelSchema.safeParse(testData);
if (!testResult.success) {
  console.log('\nTest validation failed:');
  console.log(JSON.stringify(testResult.error.issues, null, 2));
} else {
  console.log('\nTest validation: PASSED!');
}