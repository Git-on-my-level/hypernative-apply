import { completeNotificationChannelSchema } from './src/schemas/notification-channel.schema.js';

const testData = {
  name: "Test Slack Channel",
  type: "slack",
  enabled: true,
  configuration: {
    webhook_url: "https://hooks.slack.com/services/test",
    channel: "#alerts"
  }
};

const result = completeNotificationChannelSchema.safeParse(testData);
if (!result.success) {
  console.log("Validation failed:", JSON.stringify(result.error.issues, null, 2));
} else {
  console.log("Validation passed!");
}