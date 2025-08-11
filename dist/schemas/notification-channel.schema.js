import { z } from 'zod';
// Base configuration for all notification channels
const baseChannelSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().optional(),
    enabled: z.boolean().default(true),
    tags: z.record(z.string()).optional(),
    validate: z.boolean().default(false).optional(),
});
// Webhook specific configuration
const webhookConfigSchema = z.object({
    url: z.string().url('Invalid webhook URL'),
    method: z.enum(['GET', 'POST', 'PUT', 'PATCH']).default('POST'),
    headers: z.record(z.string()).optional(),
    secret: z.string().optional(),
    timeout: z.number().min(1).max(300).default(30),
    retry_config: z
        .object({
        max_retries: z.number().min(0).max(10).default(3),
        retry_delay: z.number().min(1).max(300).default(5),
        exponential_backoff: z.boolean().default(true),
        max_delay: z.number().min(1).max(3600).default(60),
    })
        .optional(),
    payload_template: z.record(z.any()).optional(),
});
// Slack specific configuration
const slackConfigSchema = z.object({
    webhook_url: z.string().url('Invalid Slack webhook URL'),
    channel: z.string().optional(),
    username: z.string().default('Hypernative'),
    icon_emoji: z.string().optional(),
    icon_url: z.string().url().optional(),
    message_template: z.record(z.any()).optional(),
    mentions: z
        .object({
        critical_severity: z.array(z.string()).optional(),
        high_severity: z.array(z.string()).optional(),
        medium_severity: z.array(z.string()).optional(),
        low_severity: z.array(z.string()).optional(),
    })
        .optional(),
    threading: z
        .object({
        group_by: z.string().optional(),
        thread_timeout: z.string().optional(),
    })
        .optional(),
});
// Email specific configuration
const emailConfigSchema = z.object({
    smtp: z.object({
        host: z.string().min(1, 'SMTP host is required'),
        port: z.number().min(1).max(65535),
        secure: z.boolean().default(true),
        auth: z.object({
            user: z.string().min(1, 'SMTP username is required'),
            pass: z.string().min(1, 'SMTP password is required'),
        }),
    }),
    recipients: z.object({
        to: z
            .array(z.string().email('Invalid email address'))
            .min(1, 'At least one recipient required'),
        cc: z.array(z.string().email('Invalid email address')).optional(),
        bcc: z.array(z.string().email('Invalid email address')).optional(),
    }),
    template: z.object({
        subject: z.string().min(1, 'Email subject template is required'),
        html_body: z.string().optional(),
        text_body: z.string().min(1, 'Email body template is required'),
    }),
});
// Discord specific configuration
const discordConfigSchema = z.object({
    webhook_url: z.string().url('Invalid Discord webhook URL'),
    embed: z
        .object({
        title: z.string().optional(),
        description: z.string().optional(),
        color: z.string().optional(),
        footer: z
            .object({
            text: z.string().optional(),
            icon_url: z.string().url().optional(),
        })
            .optional(),
        thumbnail: z
            .object({
            url: z.string().url().optional(),
        })
            .optional(),
        fields: z
            .array(z.object({
            name: z.string(),
            value: z.string(),
            inline: z.boolean().optional(),
        }))
            .optional(),
        timestamp: z.string().optional(),
    })
        .optional(),
    mentions: z.record(z.array(z.string())).optional(),
});
// PagerDuty specific configuration
const pagerdutyConfigSchema = z.object({
    integration_key: z.string().min(1, 'PagerDuty integration key is required'),
    severity_filter: z.array(z.enum(['critical', 'high', 'medium', 'low'])).optional(),
    event_action: z.enum(['trigger', 'acknowledge', 'resolve']).default('trigger'),
    custom_details: z.record(z.any()).optional(),
    dedup_key: z.string().optional(),
});
// Microsoft Teams specific configuration
const msteamsConfigSchema = z.object({
    webhook_url: z.string().url('Invalid Microsoft Teams webhook URL'),
    card_template: z.record(z.any()).optional(),
});
// Telegram specific configuration
const telegramConfigSchema = z.object({
    bot_token: z.string().min(1, 'Telegram bot token is required'),
    chat_id: z.string().min(1, 'Telegram chat ID is required'),
    parse_mode: z.enum(['MarkdownV2', 'HTML', 'Markdown']).optional(),
    disable_web_page_preview: z.boolean().optional(),
    disable_notification: z.boolean().optional(),
});
// Main notification channel schema with discriminated union based on type
export const notificationChannelSchema = z.discriminatedUnion('type', [
    baseChannelSchema.extend({
        type: z.literal('webhook'),
        configuration: webhookConfigSchema,
    }),
    baseChannelSchema.extend({
        type: z.literal('slack'),
        configuration: slackConfigSchema,
    }),
    baseChannelSchema.extend({
        type: z.literal('email'),
        configuration: emailConfigSchema,
    }),
    baseChannelSchema.extend({
        type: z.literal('discord'),
        configuration: discordConfigSchema,
    }),
    baseChannelSchema.extend({
        type: z.literal('pagerduty'),
        configuration: pagerdutyConfigSchema,
    }),
    baseChannelSchema.extend({
        type: z.literal('msteams'),
        configuration: msteamsConfigSchema,
    }),
    baseChannelSchema.extend({
        type: z.literal('telegram'),
        configuration: telegramConfigSchema,
    }),
]);
// Testing configuration (optional)
const testingConfigSchema = z
    .object({
    test_mode: z.boolean().default(false),
    test_endpoint: z.string().url().optional(),
})
    .optional();
// Complete notification channel schema with testing options
export const completeNotificationChannelSchema = z.union([
    notificationChannelSchema.and(z.object({ testing: testingConfigSchema })),
    notificationChannelSchema,
]);
//# sourceMappingURL=notification-channel.schema.js.map