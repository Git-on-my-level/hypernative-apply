import yaml from 'yaml';

const yamlContent = `
name: Test Slack Channel
type: slack
enabled: true
configuration:
  webhook_url: https://hooks.slack.com/services/test
  channel: "#alerts"
`;

const data = yaml.parse(yamlContent);
console.log('Parsed YAML:', JSON.stringify(data, null, 2));