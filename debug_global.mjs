import { readFileSync } from 'fs';
import yaml from 'yaml';

// Build and import from dist
import { globalOnlyConfigSchema } from './dist/schemas/config.schema.js';

const testGlobalConfig = `
global:
  project:
    name: Test Project
    environment: development
  defaults:
    timezone: UTC
`;

const data = yaml.parse(testGlobalConfig);
console.log('Global config data:');
console.log(JSON.stringify(data, null, 2));

const result = globalOnlyConfigSchema.safeParse(data);
if (!result.success) {
  console.log('\nGlobal config validation failed:');
  console.log(JSON.stringify(result.error.issues, null, 2));
} else {
  console.log('\nGlobal config validation: PASSED!');
  console.log('Validated data:', JSON.stringify(result.data, null, 2));
}