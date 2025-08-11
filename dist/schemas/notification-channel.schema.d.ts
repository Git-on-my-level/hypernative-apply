import { z } from 'zod';
export declare const notificationChannelSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    enabled: z.ZodDefault<z.ZodBoolean>;
    tags: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    validate: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
} & {
    type: z.ZodLiteral<"webhook">;
    configuration: z.ZodObject<{
        url: z.ZodString;
        method: z.ZodDefault<z.ZodEnum<["GET", "POST", "PUT", "PATCH"]>>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        secret: z.ZodOptional<z.ZodString>;
        timeout: z.ZodDefault<z.ZodNumber>;
        retry_config: z.ZodOptional<z.ZodObject<{
            max_retries: z.ZodDefault<z.ZodNumber>;
            retry_delay: z.ZodDefault<z.ZodNumber>;
            exponential_backoff: z.ZodDefault<z.ZodBoolean>;
            max_delay: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            max_retries: number;
            retry_delay: number;
            exponential_backoff: boolean;
            max_delay: number;
        }, {
            max_retries?: number | undefined;
            retry_delay?: number | undefined;
            exponential_backoff?: boolean | undefined;
            max_delay?: number | undefined;
        }>>;
        payload_template: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        timeout: number;
        method: "GET" | "POST" | "PUT" | "PATCH";
        secret?: string | undefined;
        headers?: Record<string, string> | undefined;
        retry_config?: {
            max_retries: number;
            retry_delay: number;
            exponential_backoff: boolean;
            max_delay: number;
        } | undefined;
        payload_template?: Record<string, any> | undefined;
    }, {
        url: string;
        secret?: string | undefined;
        timeout?: number | undefined;
        headers?: Record<string, string> | undefined;
        method?: "GET" | "POST" | "PUT" | "PATCH" | undefined;
        retry_config?: {
            max_retries?: number | undefined;
            retry_delay?: number | undefined;
            exponential_backoff?: boolean | undefined;
            max_delay?: number | undefined;
        } | undefined;
        payload_template?: Record<string, any> | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "webhook";
    enabled: boolean;
    configuration: {
        url: string;
        timeout: number;
        method: "GET" | "POST" | "PUT" | "PATCH";
        secret?: string | undefined;
        headers?: Record<string, string> | undefined;
        retry_config?: {
            max_retries: number;
            retry_delay: number;
            exponential_backoff: boolean;
            max_delay: number;
        } | undefined;
        payload_template?: Record<string, any> | undefined;
    };
    tags?: Record<string, string> | undefined;
    description?: string | undefined;
    validate?: boolean | undefined;
}, {
    name: string;
    type: "webhook";
    configuration: {
        url: string;
        secret?: string | undefined;
        timeout?: number | undefined;
        headers?: Record<string, string> | undefined;
        method?: "GET" | "POST" | "PUT" | "PATCH" | undefined;
        retry_config?: {
            max_retries?: number | undefined;
            retry_delay?: number | undefined;
            exponential_backoff?: boolean | undefined;
            max_delay?: number | undefined;
        } | undefined;
        payload_template?: Record<string, any> | undefined;
    };
    tags?: Record<string, string> | undefined;
    enabled?: boolean | undefined;
    description?: string | undefined;
    validate?: boolean | undefined;
}>, z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    enabled: z.ZodDefault<z.ZodBoolean>;
    tags: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    validate: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
} & {
    type: z.ZodLiteral<"slack">;
    configuration: z.ZodObject<{
        webhook_url: z.ZodString;
        channel: z.ZodOptional<z.ZodString>;
        username: z.ZodDefault<z.ZodString>;
        icon_emoji: z.ZodOptional<z.ZodString>;
        icon_url: z.ZodOptional<z.ZodString>;
        message_template: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        mentions: z.ZodOptional<z.ZodObject<{
            critical_severity: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            high_severity: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            medium_severity: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            low_severity: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            critical_severity?: string[] | undefined;
            high_severity?: string[] | undefined;
            medium_severity?: string[] | undefined;
            low_severity?: string[] | undefined;
        }, {
            critical_severity?: string[] | undefined;
            high_severity?: string[] | undefined;
            medium_severity?: string[] | undefined;
            low_severity?: string[] | undefined;
        }>>;
        threading: z.ZodOptional<z.ZodObject<{
            group_by: z.ZodOptional<z.ZodString>;
            thread_timeout: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            group_by?: string | undefined;
            thread_timeout?: string | undefined;
        }, {
            group_by?: string | undefined;
            thread_timeout?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        webhook_url: string;
        username: string;
        channel?: string | undefined;
        icon_emoji?: string | undefined;
        icon_url?: string | undefined;
        message_template?: Record<string, any> | undefined;
        mentions?: {
            critical_severity?: string[] | undefined;
            high_severity?: string[] | undefined;
            medium_severity?: string[] | undefined;
            low_severity?: string[] | undefined;
        } | undefined;
        threading?: {
            group_by?: string | undefined;
            thread_timeout?: string | undefined;
        } | undefined;
    }, {
        webhook_url: string;
        channel?: string | undefined;
        username?: string | undefined;
        icon_emoji?: string | undefined;
        icon_url?: string | undefined;
        message_template?: Record<string, any> | undefined;
        mentions?: {
            critical_severity?: string[] | undefined;
            high_severity?: string[] | undefined;
            medium_severity?: string[] | undefined;
            low_severity?: string[] | undefined;
        } | undefined;
        threading?: {
            group_by?: string | undefined;
            thread_timeout?: string | undefined;
        } | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "slack";
    enabled: boolean;
    configuration: {
        webhook_url: string;
        username: string;
        channel?: string | undefined;
        icon_emoji?: string | undefined;
        icon_url?: string | undefined;
        message_template?: Record<string, any> | undefined;
        mentions?: {
            critical_severity?: string[] | undefined;
            high_severity?: string[] | undefined;
            medium_severity?: string[] | undefined;
            low_severity?: string[] | undefined;
        } | undefined;
        threading?: {
            group_by?: string | undefined;
            thread_timeout?: string | undefined;
        } | undefined;
    };
    tags?: Record<string, string> | undefined;
    description?: string | undefined;
    validate?: boolean | undefined;
}, {
    name: string;
    type: "slack";
    configuration: {
        webhook_url: string;
        channel?: string | undefined;
        username?: string | undefined;
        icon_emoji?: string | undefined;
        icon_url?: string | undefined;
        message_template?: Record<string, any> | undefined;
        mentions?: {
            critical_severity?: string[] | undefined;
            high_severity?: string[] | undefined;
            medium_severity?: string[] | undefined;
            low_severity?: string[] | undefined;
        } | undefined;
        threading?: {
            group_by?: string | undefined;
            thread_timeout?: string | undefined;
        } | undefined;
    };
    tags?: Record<string, string> | undefined;
    enabled?: boolean | undefined;
    description?: string | undefined;
    validate?: boolean | undefined;
}>, z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    enabled: z.ZodDefault<z.ZodBoolean>;
    tags: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    validate: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
} & {
    type: z.ZodLiteral<"email">;
    configuration: z.ZodObject<{
        smtp: z.ZodObject<{
            host: z.ZodString;
            port: z.ZodNumber;
            secure: z.ZodDefault<z.ZodBoolean>;
            auth: z.ZodObject<{
                user: z.ZodString;
                pass: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                user: string;
                pass: string;
            }, {
                user: string;
                pass: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            host: string;
            port: number;
            secure: boolean;
            auth: {
                user: string;
                pass: string;
            };
        }, {
            host: string;
            port: number;
            auth: {
                user: string;
                pass: string;
            };
            secure?: boolean | undefined;
        }>;
        recipients: z.ZodObject<{
            to: z.ZodArray<z.ZodString, "many">;
            cc: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            bcc: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            to: string[];
            cc?: string[] | undefined;
            bcc?: string[] | undefined;
        }, {
            to: string[];
            cc?: string[] | undefined;
            bcc?: string[] | undefined;
        }>;
        template: z.ZodObject<{
            subject: z.ZodString;
            html_body: z.ZodOptional<z.ZodString>;
            text_body: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            subject: string;
            text_body: string;
            html_body?: string | undefined;
        }, {
            subject: string;
            text_body: string;
            html_body?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        smtp: {
            host: string;
            port: number;
            secure: boolean;
            auth: {
                user: string;
                pass: string;
            };
        };
        recipients: {
            to: string[];
            cc?: string[] | undefined;
            bcc?: string[] | undefined;
        };
        template: {
            subject: string;
            text_body: string;
            html_body?: string | undefined;
        };
    }, {
        smtp: {
            host: string;
            port: number;
            auth: {
                user: string;
                pass: string;
            };
            secure?: boolean | undefined;
        };
        recipients: {
            to: string[];
            cc?: string[] | undefined;
            bcc?: string[] | undefined;
        };
        template: {
            subject: string;
            text_body: string;
            html_body?: string | undefined;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "email";
    enabled: boolean;
    configuration: {
        smtp: {
            host: string;
            port: number;
            secure: boolean;
            auth: {
                user: string;
                pass: string;
            };
        };
        recipients: {
            to: string[];
            cc?: string[] | undefined;
            bcc?: string[] | undefined;
        };
        template: {
            subject: string;
            text_body: string;
            html_body?: string | undefined;
        };
    };
    tags?: Record<string, string> | undefined;
    description?: string | undefined;
    validate?: boolean | undefined;
}, {
    name: string;
    type: "email";
    configuration: {
        smtp: {
            host: string;
            port: number;
            auth: {
                user: string;
                pass: string;
            };
            secure?: boolean | undefined;
        };
        recipients: {
            to: string[];
            cc?: string[] | undefined;
            bcc?: string[] | undefined;
        };
        template: {
            subject: string;
            text_body: string;
            html_body?: string | undefined;
        };
    };
    tags?: Record<string, string> | undefined;
    enabled?: boolean | undefined;
    description?: string | undefined;
    validate?: boolean | undefined;
}>, z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    enabled: z.ZodDefault<z.ZodBoolean>;
    tags: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    validate: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
} & {
    type: z.ZodLiteral<"discord">;
    configuration: z.ZodObject<{
        webhook_url: z.ZodString;
        embed: z.ZodOptional<z.ZodObject<{
            title: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            color: z.ZodOptional<z.ZodString>;
            footer: z.ZodOptional<z.ZodObject<{
                text: z.ZodOptional<z.ZodString>;
                icon_url: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                text?: string | undefined;
                icon_url?: string | undefined;
            }, {
                text?: string | undefined;
                icon_url?: string | undefined;
            }>>;
            thumbnail: z.ZodOptional<z.ZodObject<{
                url: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                url?: string | undefined;
            }, {
                url?: string | undefined;
            }>>;
            fields: z.ZodOptional<z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                value: z.ZodString;
                inline: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                value: string;
                name: string;
                inline?: boolean | undefined;
            }, {
                value: string;
                name: string;
                inline?: boolean | undefined;
            }>, "many">>;
            timestamp: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            timestamp?: string | undefined;
            color?: string | undefined;
            description?: string | undefined;
            title?: string | undefined;
            footer?: {
                text?: string | undefined;
                icon_url?: string | undefined;
            } | undefined;
            thumbnail?: {
                url?: string | undefined;
            } | undefined;
            fields?: {
                value: string;
                name: string;
                inline?: boolean | undefined;
            }[] | undefined;
        }, {
            timestamp?: string | undefined;
            color?: string | undefined;
            description?: string | undefined;
            title?: string | undefined;
            footer?: {
                text?: string | undefined;
                icon_url?: string | undefined;
            } | undefined;
            thumbnail?: {
                url?: string | undefined;
            } | undefined;
            fields?: {
                value: string;
                name: string;
                inline?: boolean | undefined;
            }[] | undefined;
        }>>;
        mentions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>>;
    }, "strip", z.ZodTypeAny, {
        webhook_url: string;
        mentions?: Record<string, string[]> | undefined;
        embed?: {
            timestamp?: string | undefined;
            color?: string | undefined;
            description?: string | undefined;
            title?: string | undefined;
            footer?: {
                text?: string | undefined;
                icon_url?: string | undefined;
            } | undefined;
            thumbnail?: {
                url?: string | undefined;
            } | undefined;
            fields?: {
                value: string;
                name: string;
                inline?: boolean | undefined;
            }[] | undefined;
        } | undefined;
    }, {
        webhook_url: string;
        mentions?: Record<string, string[]> | undefined;
        embed?: {
            timestamp?: string | undefined;
            color?: string | undefined;
            description?: string | undefined;
            title?: string | undefined;
            footer?: {
                text?: string | undefined;
                icon_url?: string | undefined;
            } | undefined;
            thumbnail?: {
                url?: string | undefined;
            } | undefined;
            fields?: {
                value: string;
                name: string;
                inline?: boolean | undefined;
            }[] | undefined;
        } | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "discord";
    enabled: boolean;
    configuration: {
        webhook_url: string;
        mentions?: Record<string, string[]> | undefined;
        embed?: {
            timestamp?: string | undefined;
            color?: string | undefined;
            description?: string | undefined;
            title?: string | undefined;
            footer?: {
                text?: string | undefined;
                icon_url?: string | undefined;
            } | undefined;
            thumbnail?: {
                url?: string | undefined;
            } | undefined;
            fields?: {
                value: string;
                name: string;
                inline?: boolean | undefined;
            }[] | undefined;
        } | undefined;
    };
    tags?: Record<string, string> | undefined;
    description?: string | undefined;
    validate?: boolean | undefined;
}, {
    name: string;
    type: "discord";
    configuration: {
        webhook_url: string;
        mentions?: Record<string, string[]> | undefined;
        embed?: {
            timestamp?: string | undefined;
            color?: string | undefined;
            description?: string | undefined;
            title?: string | undefined;
            footer?: {
                text?: string | undefined;
                icon_url?: string | undefined;
            } | undefined;
            thumbnail?: {
                url?: string | undefined;
            } | undefined;
            fields?: {
                value: string;
                name: string;
                inline?: boolean | undefined;
            }[] | undefined;
        } | undefined;
    };
    tags?: Record<string, string> | undefined;
    enabled?: boolean | undefined;
    description?: string | undefined;
    validate?: boolean | undefined;
}>, z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    enabled: z.ZodDefault<z.ZodBoolean>;
    tags: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    validate: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
} & {
    type: z.ZodLiteral<"pagerduty">;
    configuration: z.ZodObject<{
        integration_key: z.ZodString;
        severity_filter: z.ZodOptional<z.ZodArray<z.ZodEnum<["critical", "high", "medium", "low"]>, "many">>;
        event_action: z.ZodDefault<z.ZodEnum<["trigger", "acknowledge", "resolve"]>>;
        custom_details: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        dedup_key: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        integration_key: string;
        event_action: "trigger" | "acknowledge" | "resolve";
        severity_filter?: ("critical" | "high" | "medium" | "low")[] | undefined;
        custom_details?: Record<string, any> | undefined;
        dedup_key?: string | undefined;
    }, {
        integration_key: string;
        severity_filter?: ("critical" | "high" | "medium" | "low")[] | undefined;
        event_action?: "trigger" | "acknowledge" | "resolve" | undefined;
        custom_details?: Record<string, any> | undefined;
        dedup_key?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "pagerduty";
    enabled: boolean;
    configuration: {
        integration_key: string;
        event_action: "trigger" | "acknowledge" | "resolve";
        severity_filter?: ("critical" | "high" | "medium" | "low")[] | undefined;
        custom_details?: Record<string, any> | undefined;
        dedup_key?: string | undefined;
    };
    tags?: Record<string, string> | undefined;
    description?: string | undefined;
    validate?: boolean | undefined;
}, {
    name: string;
    type: "pagerduty";
    configuration: {
        integration_key: string;
        severity_filter?: ("critical" | "high" | "medium" | "low")[] | undefined;
        event_action?: "trigger" | "acknowledge" | "resolve" | undefined;
        custom_details?: Record<string, any> | undefined;
        dedup_key?: string | undefined;
    };
    tags?: Record<string, string> | undefined;
    enabled?: boolean | undefined;
    description?: string | undefined;
    validate?: boolean | undefined;
}>, z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    enabled: z.ZodDefault<z.ZodBoolean>;
    tags: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    validate: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
} & {
    type: z.ZodLiteral<"msteams">;
    configuration: z.ZodObject<{
        webhook_url: z.ZodString;
        card_template: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, "strip", z.ZodTypeAny, {
        webhook_url: string;
        card_template?: Record<string, any> | undefined;
    }, {
        webhook_url: string;
        card_template?: Record<string, any> | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "msteams";
    enabled: boolean;
    configuration: {
        webhook_url: string;
        card_template?: Record<string, any> | undefined;
    };
    tags?: Record<string, string> | undefined;
    description?: string | undefined;
    validate?: boolean | undefined;
}, {
    name: string;
    type: "msteams";
    configuration: {
        webhook_url: string;
        card_template?: Record<string, any> | undefined;
    };
    tags?: Record<string, string> | undefined;
    enabled?: boolean | undefined;
    description?: string | undefined;
    validate?: boolean | undefined;
}>, z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    enabled: z.ZodDefault<z.ZodBoolean>;
    tags: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    validate: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
} & {
    type: z.ZodLiteral<"telegram">;
    configuration: z.ZodObject<{
        bot_token: z.ZodString;
        chat_id: z.ZodString;
        parse_mode: z.ZodOptional<z.ZodEnum<["MarkdownV2", "HTML", "Markdown"]>>;
        disable_web_page_preview: z.ZodOptional<z.ZodBoolean>;
        disable_notification: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        bot_token: string;
        chat_id: string;
        parse_mode?: "MarkdownV2" | "HTML" | "Markdown" | undefined;
        disable_web_page_preview?: boolean | undefined;
        disable_notification?: boolean | undefined;
    }, {
        bot_token: string;
        chat_id: string;
        parse_mode?: "MarkdownV2" | "HTML" | "Markdown" | undefined;
        disable_web_page_preview?: boolean | undefined;
        disable_notification?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "telegram";
    enabled: boolean;
    configuration: {
        bot_token: string;
        chat_id: string;
        parse_mode?: "MarkdownV2" | "HTML" | "Markdown" | undefined;
        disable_web_page_preview?: boolean | undefined;
        disable_notification?: boolean | undefined;
    };
    tags?: Record<string, string> | undefined;
    description?: string | undefined;
    validate?: boolean | undefined;
}, {
    name: string;
    type: "telegram";
    configuration: {
        bot_token: string;
        chat_id: string;
        parse_mode?: "MarkdownV2" | "HTML" | "Markdown" | undefined;
        disable_web_page_preview?: boolean | undefined;
        disable_notification?: boolean | undefined;
    };
    tags?: Record<string, string> | undefined;
    enabled?: boolean | undefined;
    description?: string | undefined;
    validate?: boolean | undefined;
}>]>;
export declare const completeNotificationChannelSchema: z.ZodUnion<[z.ZodIntersection<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    enabled: z.ZodDefault<z.ZodBoolean>;
    tags: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    validate: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
} & {
    type: z.ZodLiteral<"webhook">;
    configuration: z.ZodObject<{
        url: z.ZodString;
        method: z.ZodDefault<z.ZodEnum<["GET", "POST", "PUT", "PATCH"]>>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        secret: z.ZodOptional<z.ZodString>;
        timeout: z.ZodDefault<z.ZodNumber>;
        retry_config: z.ZodOptional<z.ZodObject<{
            max_retries: z.ZodDefault<z.ZodNumber>;
            retry_delay: z.ZodDefault<z.ZodNumber>;
            exponential_backoff: z.ZodDefault<z.ZodBoolean>;
            max_delay: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            max_retries: number;
            retry_delay: number;
            exponential_backoff: boolean;
            max_delay: number;
        }, {
            max_retries?: number | undefined;
            retry_delay?: number | undefined;
            exponential_backoff?: boolean | undefined;
            max_delay?: number | undefined;
        }>>;
        payload_template: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        timeout: number;
        method: "GET" | "POST" | "PUT" | "PATCH";
        secret?: string | undefined;
        headers?: Record<string, string> | undefined;
        retry_config?: {
            max_retries: number;
            retry_delay: number;
            exponential_backoff: boolean;
            max_delay: number;
        } | undefined;
        payload_template?: Record<string, any> | undefined;
    }, {
        url: string;
        secret?: string | undefined;
        timeout?: number | undefined;
        headers?: Record<string, string> | undefined;
        method?: "GET" | "POST" | "PUT" | "PATCH" | undefined;
        retry_config?: {
            max_retries?: number | undefined;
            retry_delay?: number | undefined;
            exponential_backoff?: boolean | undefined;
            max_delay?: number | undefined;
        } | undefined;
        payload_template?: Record<string, any> | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "webhook";
    enabled: boolean;
    configuration: {
        url: string;
        timeout: number;
        method: "GET" | "POST" | "PUT" | "PATCH";
        secret?: string | undefined;
        headers?: Record<string, string> | undefined;
        retry_config?: {
            max_retries: number;
            retry_delay: number;
            exponential_backoff: boolean;
            max_delay: number;
        } | undefined;
        payload_template?: Record<string, any> | undefined;
    };
    tags?: Record<string, string> | undefined;
    description?: string | undefined;
    validate?: boolean | undefined;
}, {
    name: string;
    type: "webhook";
    configuration: {
        url: string;
        secret?: string | undefined;
        timeout?: number | undefined;
        headers?: Record<string, string> | undefined;
        method?: "GET" | "POST" | "PUT" | "PATCH" | undefined;
        retry_config?: {
            max_retries?: number | undefined;
            retry_delay?: number | undefined;
            exponential_backoff?: boolean | undefined;
            max_delay?: number | undefined;
        } | undefined;
        payload_template?: Record<string, any> | undefined;
    };
    tags?: Record<string, string> | undefined;
    enabled?: boolean | undefined;
    description?: string | undefined;
    validate?: boolean | undefined;
}>, z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    enabled: z.ZodDefault<z.ZodBoolean>;
    tags: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    validate: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
} & {
    type: z.ZodLiteral<"slack">;
    configuration: z.ZodObject<{
        webhook_url: z.ZodString;
        channel: z.ZodOptional<z.ZodString>;
        username: z.ZodDefault<z.ZodString>;
        icon_emoji: z.ZodOptional<z.ZodString>;
        icon_url: z.ZodOptional<z.ZodString>;
        message_template: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        mentions: z.ZodOptional<z.ZodObject<{
            critical_severity: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            high_severity: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            medium_severity: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            low_severity: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            critical_severity?: string[] | undefined;
            high_severity?: string[] | undefined;
            medium_severity?: string[] | undefined;
            low_severity?: string[] | undefined;
        }, {
            critical_severity?: string[] | undefined;
            high_severity?: string[] | undefined;
            medium_severity?: string[] | undefined;
            low_severity?: string[] | undefined;
        }>>;
        threading: z.ZodOptional<z.ZodObject<{
            group_by: z.ZodOptional<z.ZodString>;
            thread_timeout: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            group_by?: string | undefined;
            thread_timeout?: string | undefined;
        }, {
            group_by?: string | undefined;
            thread_timeout?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        webhook_url: string;
        username: string;
        channel?: string | undefined;
        icon_emoji?: string | undefined;
        icon_url?: string | undefined;
        message_template?: Record<string, any> | undefined;
        mentions?: {
            critical_severity?: string[] | undefined;
            high_severity?: string[] | undefined;
            medium_severity?: string[] | undefined;
            low_severity?: string[] | undefined;
        } | undefined;
        threading?: {
            group_by?: string | undefined;
            thread_timeout?: string | undefined;
        } | undefined;
    }, {
        webhook_url: string;
        channel?: string | undefined;
        username?: string | undefined;
        icon_emoji?: string | undefined;
        icon_url?: string | undefined;
        message_template?: Record<string, any> | undefined;
        mentions?: {
            critical_severity?: string[] | undefined;
            high_severity?: string[] | undefined;
            medium_severity?: string[] | undefined;
            low_severity?: string[] | undefined;
        } | undefined;
        threading?: {
            group_by?: string | undefined;
            thread_timeout?: string | undefined;
        } | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "slack";
    enabled: boolean;
    configuration: {
        webhook_url: string;
        username: string;
        channel?: string | undefined;
        icon_emoji?: string | undefined;
        icon_url?: string | undefined;
        message_template?: Record<string, any> | undefined;
        mentions?: {
            critical_severity?: string[] | undefined;
            high_severity?: string[] | undefined;
            medium_severity?: string[] | undefined;
            low_severity?: string[] | undefined;
        } | undefined;
        threading?: {
            group_by?: string | undefined;
            thread_timeout?: string | undefined;
        } | undefined;
    };
    tags?: Record<string, string> | undefined;
    description?: string | undefined;
    validate?: boolean | undefined;
}, {
    name: string;
    type: "slack";
    configuration: {
        webhook_url: string;
        channel?: string | undefined;
        username?: string | undefined;
        icon_emoji?: string | undefined;
        icon_url?: string | undefined;
        message_template?: Record<string, any> | undefined;
        mentions?: {
            critical_severity?: string[] | undefined;
            high_severity?: string[] | undefined;
            medium_severity?: string[] | undefined;
            low_severity?: string[] | undefined;
        } | undefined;
        threading?: {
            group_by?: string | undefined;
            thread_timeout?: string | undefined;
        } | undefined;
    };
    tags?: Record<string, string> | undefined;
    enabled?: boolean | undefined;
    description?: string | undefined;
    validate?: boolean | undefined;
}>, z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    enabled: z.ZodDefault<z.ZodBoolean>;
    tags: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    validate: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
} & {
    type: z.ZodLiteral<"email">;
    configuration: z.ZodObject<{
        smtp: z.ZodObject<{
            host: z.ZodString;
            port: z.ZodNumber;
            secure: z.ZodDefault<z.ZodBoolean>;
            auth: z.ZodObject<{
                user: z.ZodString;
                pass: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                user: string;
                pass: string;
            }, {
                user: string;
                pass: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            host: string;
            port: number;
            secure: boolean;
            auth: {
                user: string;
                pass: string;
            };
        }, {
            host: string;
            port: number;
            auth: {
                user: string;
                pass: string;
            };
            secure?: boolean | undefined;
        }>;
        recipients: z.ZodObject<{
            to: z.ZodArray<z.ZodString, "many">;
            cc: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            bcc: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            to: string[];
            cc?: string[] | undefined;
            bcc?: string[] | undefined;
        }, {
            to: string[];
            cc?: string[] | undefined;
            bcc?: string[] | undefined;
        }>;
        template: z.ZodObject<{
            subject: z.ZodString;
            html_body: z.ZodOptional<z.ZodString>;
            text_body: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            subject: string;
            text_body: string;
            html_body?: string | undefined;
        }, {
            subject: string;
            text_body: string;
            html_body?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        smtp: {
            host: string;
            port: number;
            secure: boolean;
            auth: {
                user: string;
                pass: string;
            };
        };
        recipients: {
            to: string[];
            cc?: string[] | undefined;
            bcc?: string[] | undefined;
        };
        template: {
            subject: string;
            text_body: string;
            html_body?: string | undefined;
        };
    }, {
        smtp: {
            host: string;
            port: number;
            auth: {
                user: string;
                pass: string;
            };
            secure?: boolean | undefined;
        };
        recipients: {
            to: string[];
            cc?: string[] | undefined;
            bcc?: string[] | undefined;
        };
        template: {
            subject: string;
            text_body: string;
            html_body?: string | undefined;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "email";
    enabled: boolean;
    configuration: {
        smtp: {
            host: string;
            port: number;
            secure: boolean;
            auth: {
                user: string;
                pass: string;
            };
        };
        recipients: {
            to: string[];
            cc?: string[] | undefined;
            bcc?: string[] | undefined;
        };
        template: {
            subject: string;
            text_body: string;
            html_body?: string | undefined;
        };
    };
    tags?: Record<string, string> | undefined;
    description?: string | undefined;
    validate?: boolean | undefined;
}, {
    name: string;
    type: "email";
    configuration: {
        smtp: {
            host: string;
            port: number;
            auth: {
                user: string;
                pass: string;
            };
            secure?: boolean | undefined;
        };
        recipients: {
            to: string[];
            cc?: string[] | undefined;
            bcc?: string[] | undefined;
        };
        template: {
            subject: string;
            text_body: string;
            html_body?: string | undefined;
        };
    };
    tags?: Record<string, string> | undefined;
    enabled?: boolean | undefined;
    description?: string | undefined;
    validate?: boolean | undefined;
}>, z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    enabled: z.ZodDefault<z.ZodBoolean>;
    tags: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    validate: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
} & {
    type: z.ZodLiteral<"discord">;
    configuration: z.ZodObject<{
        webhook_url: z.ZodString;
        embed: z.ZodOptional<z.ZodObject<{
            title: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            color: z.ZodOptional<z.ZodString>;
            footer: z.ZodOptional<z.ZodObject<{
                text: z.ZodOptional<z.ZodString>;
                icon_url: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                text?: string | undefined;
                icon_url?: string | undefined;
            }, {
                text?: string | undefined;
                icon_url?: string | undefined;
            }>>;
            thumbnail: z.ZodOptional<z.ZodObject<{
                url: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                url?: string | undefined;
            }, {
                url?: string | undefined;
            }>>;
            fields: z.ZodOptional<z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                value: z.ZodString;
                inline: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                value: string;
                name: string;
                inline?: boolean | undefined;
            }, {
                value: string;
                name: string;
                inline?: boolean | undefined;
            }>, "many">>;
            timestamp: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            timestamp?: string | undefined;
            color?: string | undefined;
            description?: string | undefined;
            title?: string | undefined;
            footer?: {
                text?: string | undefined;
                icon_url?: string | undefined;
            } | undefined;
            thumbnail?: {
                url?: string | undefined;
            } | undefined;
            fields?: {
                value: string;
                name: string;
                inline?: boolean | undefined;
            }[] | undefined;
        }, {
            timestamp?: string | undefined;
            color?: string | undefined;
            description?: string | undefined;
            title?: string | undefined;
            footer?: {
                text?: string | undefined;
                icon_url?: string | undefined;
            } | undefined;
            thumbnail?: {
                url?: string | undefined;
            } | undefined;
            fields?: {
                value: string;
                name: string;
                inline?: boolean | undefined;
            }[] | undefined;
        }>>;
        mentions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>>;
    }, "strip", z.ZodTypeAny, {
        webhook_url: string;
        mentions?: Record<string, string[]> | undefined;
        embed?: {
            timestamp?: string | undefined;
            color?: string | undefined;
            description?: string | undefined;
            title?: string | undefined;
            footer?: {
                text?: string | undefined;
                icon_url?: string | undefined;
            } | undefined;
            thumbnail?: {
                url?: string | undefined;
            } | undefined;
            fields?: {
                value: string;
                name: string;
                inline?: boolean | undefined;
            }[] | undefined;
        } | undefined;
    }, {
        webhook_url: string;
        mentions?: Record<string, string[]> | undefined;
        embed?: {
            timestamp?: string | undefined;
            color?: string | undefined;
            description?: string | undefined;
            title?: string | undefined;
            footer?: {
                text?: string | undefined;
                icon_url?: string | undefined;
            } | undefined;
            thumbnail?: {
                url?: string | undefined;
            } | undefined;
            fields?: {
                value: string;
                name: string;
                inline?: boolean | undefined;
            }[] | undefined;
        } | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "discord";
    enabled: boolean;
    configuration: {
        webhook_url: string;
        mentions?: Record<string, string[]> | undefined;
        embed?: {
            timestamp?: string | undefined;
            color?: string | undefined;
            description?: string | undefined;
            title?: string | undefined;
            footer?: {
                text?: string | undefined;
                icon_url?: string | undefined;
            } | undefined;
            thumbnail?: {
                url?: string | undefined;
            } | undefined;
            fields?: {
                value: string;
                name: string;
                inline?: boolean | undefined;
            }[] | undefined;
        } | undefined;
    };
    tags?: Record<string, string> | undefined;
    description?: string | undefined;
    validate?: boolean | undefined;
}, {
    name: string;
    type: "discord";
    configuration: {
        webhook_url: string;
        mentions?: Record<string, string[]> | undefined;
        embed?: {
            timestamp?: string | undefined;
            color?: string | undefined;
            description?: string | undefined;
            title?: string | undefined;
            footer?: {
                text?: string | undefined;
                icon_url?: string | undefined;
            } | undefined;
            thumbnail?: {
                url?: string | undefined;
            } | undefined;
            fields?: {
                value: string;
                name: string;
                inline?: boolean | undefined;
            }[] | undefined;
        } | undefined;
    };
    tags?: Record<string, string> | undefined;
    enabled?: boolean | undefined;
    description?: string | undefined;
    validate?: boolean | undefined;
}>, z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    enabled: z.ZodDefault<z.ZodBoolean>;
    tags: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    validate: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
} & {
    type: z.ZodLiteral<"pagerduty">;
    configuration: z.ZodObject<{
        integration_key: z.ZodString;
        severity_filter: z.ZodOptional<z.ZodArray<z.ZodEnum<["critical", "high", "medium", "low"]>, "many">>;
        event_action: z.ZodDefault<z.ZodEnum<["trigger", "acknowledge", "resolve"]>>;
        custom_details: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        dedup_key: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        integration_key: string;
        event_action: "trigger" | "acknowledge" | "resolve";
        severity_filter?: ("critical" | "high" | "medium" | "low")[] | undefined;
        custom_details?: Record<string, any> | undefined;
        dedup_key?: string | undefined;
    }, {
        integration_key: string;
        severity_filter?: ("critical" | "high" | "medium" | "low")[] | undefined;
        event_action?: "trigger" | "acknowledge" | "resolve" | undefined;
        custom_details?: Record<string, any> | undefined;
        dedup_key?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "pagerduty";
    enabled: boolean;
    configuration: {
        integration_key: string;
        event_action: "trigger" | "acknowledge" | "resolve";
        severity_filter?: ("critical" | "high" | "medium" | "low")[] | undefined;
        custom_details?: Record<string, any> | undefined;
        dedup_key?: string | undefined;
    };
    tags?: Record<string, string> | undefined;
    description?: string | undefined;
    validate?: boolean | undefined;
}, {
    name: string;
    type: "pagerduty";
    configuration: {
        integration_key: string;
        severity_filter?: ("critical" | "high" | "medium" | "low")[] | undefined;
        event_action?: "trigger" | "acknowledge" | "resolve" | undefined;
        custom_details?: Record<string, any> | undefined;
        dedup_key?: string | undefined;
    };
    tags?: Record<string, string> | undefined;
    enabled?: boolean | undefined;
    description?: string | undefined;
    validate?: boolean | undefined;
}>, z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    enabled: z.ZodDefault<z.ZodBoolean>;
    tags: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    validate: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
} & {
    type: z.ZodLiteral<"msteams">;
    configuration: z.ZodObject<{
        webhook_url: z.ZodString;
        card_template: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, "strip", z.ZodTypeAny, {
        webhook_url: string;
        card_template?: Record<string, any> | undefined;
    }, {
        webhook_url: string;
        card_template?: Record<string, any> | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "msteams";
    enabled: boolean;
    configuration: {
        webhook_url: string;
        card_template?: Record<string, any> | undefined;
    };
    tags?: Record<string, string> | undefined;
    description?: string | undefined;
    validate?: boolean | undefined;
}, {
    name: string;
    type: "msteams";
    configuration: {
        webhook_url: string;
        card_template?: Record<string, any> | undefined;
    };
    tags?: Record<string, string> | undefined;
    enabled?: boolean | undefined;
    description?: string | undefined;
    validate?: boolean | undefined;
}>, z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    enabled: z.ZodDefault<z.ZodBoolean>;
    tags: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    validate: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
} & {
    type: z.ZodLiteral<"telegram">;
    configuration: z.ZodObject<{
        bot_token: z.ZodString;
        chat_id: z.ZodString;
        parse_mode: z.ZodOptional<z.ZodEnum<["MarkdownV2", "HTML", "Markdown"]>>;
        disable_web_page_preview: z.ZodOptional<z.ZodBoolean>;
        disable_notification: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        bot_token: string;
        chat_id: string;
        parse_mode?: "MarkdownV2" | "HTML" | "Markdown" | undefined;
        disable_web_page_preview?: boolean | undefined;
        disable_notification?: boolean | undefined;
    }, {
        bot_token: string;
        chat_id: string;
        parse_mode?: "MarkdownV2" | "HTML" | "Markdown" | undefined;
        disable_web_page_preview?: boolean | undefined;
        disable_notification?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "telegram";
    enabled: boolean;
    configuration: {
        bot_token: string;
        chat_id: string;
        parse_mode?: "MarkdownV2" | "HTML" | "Markdown" | undefined;
        disable_web_page_preview?: boolean | undefined;
        disable_notification?: boolean | undefined;
    };
    tags?: Record<string, string> | undefined;
    description?: string | undefined;
    validate?: boolean | undefined;
}, {
    name: string;
    type: "telegram";
    configuration: {
        bot_token: string;
        chat_id: string;
        parse_mode?: "MarkdownV2" | "HTML" | "Markdown" | undefined;
        disable_web_page_preview?: boolean | undefined;
        disable_notification?: boolean | undefined;
    };
    tags?: Record<string, string> | undefined;
    enabled?: boolean | undefined;
    description?: string | undefined;
    validate?: boolean | undefined;
}>]>, z.ZodObject<{
    testing: z.ZodOptional<z.ZodObject<{
        test_mode: z.ZodDefault<z.ZodBoolean>;
        test_endpoint: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        test_mode: boolean;
        test_endpoint?: string | undefined;
    }, {
        test_mode?: boolean | undefined;
        test_endpoint?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    testing?: {
        test_mode: boolean;
        test_endpoint?: string | undefined;
    } | undefined;
}, {
    testing?: {
        test_mode?: boolean | undefined;
        test_endpoint?: string | undefined;
    } | undefined;
}>>, z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    enabled: z.ZodDefault<z.ZodBoolean>;
    tags: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    validate: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
} & {
    type: z.ZodLiteral<"webhook">;
    configuration: z.ZodObject<{
        url: z.ZodString;
        method: z.ZodDefault<z.ZodEnum<["GET", "POST", "PUT", "PATCH"]>>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        secret: z.ZodOptional<z.ZodString>;
        timeout: z.ZodDefault<z.ZodNumber>;
        retry_config: z.ZodOptional<z.ZodObject<{
            max_retries: z.ZodDefault<z.ZodNumber>;
            retry_delay: z.ZodDefault<z.ZodNumber>;
            exponential_backoff: z.ZodDefault<z.ZodBoolean>;
            max_delay: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            max_retries: number;
            retry_delay: number;
            exponential_backoff: boolean;
            max_delay: number;
        }, {
            max_retries?: number | undefined;
            retry_delay?: number | undefined;
            exponential_backoff?: boolean | undefined;
            max_delay?: number | undefined;
        }>>;
        payload_template: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        timeout: number;
        method: "GET" | "POST" | "PUT" | "PATCH";
        secret?: string | undefined;
        headers?: Record<string, string> | undefined;
        retry_config?: {
            max_retries: number;
            retry_delay: number;
            exponential_backoff: boolean;
            max_delay: number;
        } | undefined;
        payload_template?: Record<string, any> | undefined;
    }, {
        url: string;
        secret?: string | undefined;
        timeout?: number | undefined;
        headers?: Record<string, string> | undefined;
        method?: "GET" | "POST" | "PUT" | "PATCH" | undefined;
        retry_config?: {
            max_retries?: number | undefined;
            retry_delay?: number | undefined;
            exponential_backoff?: boolean | undefined;
            max_delay?: number | undefined;
        } | undefined;
        payload_template?: Record<string, any> | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "webhook";
    enabled: boolean;
    configuration: {
        url: string;
        timeout: number;
        method: "GET" | "POST" | "PUT" | "PATCH";
        secret?: string | undefined;
        headers?: Record<string, string> | undefined;
        retry_config?: {
            max_retries: number;
            retry_delay: number;
            exponential_backoff: boolean;
            max_delay: number;
        } | undefined;
        payload_template?: Record<string, any> | undefined;
    };
    tags?: Record<string, string> | undefined;
    description?: string | undefined;
    validate?: boolean | undefined;
}, {
    name: string;
    type: "webhook";
    configuration: {
        url: string;
        secret?: string | undefined;
        timeout?: number | undefined;
        headers?: Record<string, string> | undefined;
        method?: "GET" | "POST" | "PUT" | "PATCH" | undefined;
        retry_config?: {
            max_retries?: number | undefined;
            retry_delay?: number | undefined;
            exponential_backoff?: boolean | undefined;
            max_delay?: number | undefined;
        } | undefined;
        payload_template?: Record<string, any> | undefined;
    };
    tags?: Record<string, string> | undefined;
    enabled?: boolean | undefined;
    description?: string | undefined;
    validate?: boolean | undefined;
}>, z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    enabled: z.ZodDefault<z.ZodBoolean>;
    tags: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    validate: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
} & {
    type: z.ZodLiteral<"slack">;
    configuration: z.ZodObject<{
        webhook_url: z.ZodString;
        channel: z.ZodOptional<z.ZodString>;
        username: z.ZodDefault<z.ZodString>;
        icon_emoji: z.ZodOptional<z.ZodString>;
        icon_url: z.ZodOptional<z.ZodString>;
        message_template: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        mentions: z.ZodOptional<z.ZodObject<{
            critical_severity: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            high_severity: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            medium_severity: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            low_severity: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            critical_severity?: string[] | undefined;
            high_severity?: string[] | undefined;
            medium_severity?: string[] | undefined;
            low_severity?: string[] | undefined;
        }, {
            critical_severity?: string[] | undefined;
            high_severity?: string[] | undefined;
            medium_severity?: string[] | undefined;
            low_severity?: string[] | undefined;
        }>>;
        threading: z.ZodOptional<z.ZodObject<{
            group_by: z.ZodOptional<z.ZodString>;
            thread_timeout: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            group_by?: string | undefined;
            thread_timeout?: string | undefined;
        }, {
            group_by?: string | undefined;
            thread_timeout?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        webhook_url: string;
        username: string;
        channel?: string | undefined;
        icon_emoji?: string | undefined;
        icon_url?: string | undefined;
        message_template?: Record<string, any> | undefined;
        mentions?: {
            critical_severity?: string[] | undefined;
            high_severity?: string[] | undefined;
            medium_severity?: string[] | undefined;
            low_severity?: string[] | undefined;
        } | undefined;
        threading?: {
            group_by?: string | undefined;
            thread_timeout?: string | undefined;
        } | undefined;
    }, {
        webhook_url: string;
        channel?: string | undefined;
        username?: string | undefined;
        icon_emoji?: string | undefined;
        icon_url?: string | undefined;
        message_template?: Record<string, any> | undefined;
        mentions?: {
            critical_severity?: string[] | undefined;
            high_severity?: string[] | undefined;
            medium_severity?: string[] | undefined;
            low_severity?: string[] | undefined;
        } | undefined;
        threading?: {
            group_by?: string | undefined;
            thread_timeout?: string | undefined;
        } | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "slack";
    enabled: boolean;
    configuration: {
        webhook_url: string;
        username: string;
        channel?: string | undefined;
        icon_emoji?: string | undefined;
        icon_url?: string | undefined;
        message_template?: Record<string, any> | undefined;
        mentions?: {
            critical_severity?: string[] | undefined;
            high_severity?: string[] | undefined;
            medium_severity?: string[] | undefined;
            low_severity?: string[] | undefined;
        } | undefined;
        threading?: {
            group_by?: string | undefined;
            thread_timeout?: string | undefined;
        } | undefined;
    };
    tags?: Record<string, string> | undefined;
    description?: string | undefined;
    validate?: boolean | undefined;
}, {
    name: string;
    type: "slack";
    configuration: {
        webhook_url: string;
        channel?: string | undefined;
        username?: string | undefined;
        icon_emoji?: string | undefined;
        icon_url?: string | undefined;
        message_template?: Record<string, any> | undefined;
        mentions?: {
            critical_severity?: string[] | undefined;
            high_severity?: string[] | undefined;
            medium_severity?: string[] | undefined;
            low_severity?: string[] | undefined;
        } | undefined;
        threading?: {
            group_by?: string | undefined;
            thread_timeout?: string | undefined;
        } | undefined;
    };
    tags?: Record<string, string> | undefined;
    enabled?: boolean | undefined;
    description?: string | undefined;
    validate?: boolean | undefined;
}>, z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    enabled: z.ZodDefault<z.ZodBoolean>;
    tags: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    validate: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
} & {
    type: z.ZodLiteral<"email">;
    configuration: z.ZodObject<{
        smtp: z.ZodObject<{
            host: z.ZodString;
            port: z.ZodNumber;
            secure: z.ZodDefault<z.ZodBoolean>;
            auth: z.ZodObject<{
                user: z.ZodString;
                pass: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                user: string;
                pass: string;
            }, {
                user: string;
                pass: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            host: string;
            port: number;
            secure: boolean;
            auth: {
                user: string;
                pass: string;
            };
        }, {
            host: string;
            port: number;
            auth: {
                user: string;
                pass: string;
            };
            secure?: boolean | undefined;
        }>;
        recipients: z.ZodObject<{
            to: z.ZodArray<z.ZodString, "many">;
            cc: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            bcc: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            to: string[];
            cc?: string[] | undefined;
            bcc?: string[] | undefined;
        }, {
            to: string[];
            cc?: string[] | undefined;
            bcc?: string[] | undefined;
        }>;
        template: z.ZodObject<{
            subject: z.ZodString;
            html_body: z.ZodOptional<z.ZodString>;
            text_body: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            subject: string;
            text_body: string;
            html_body?: string | undefined;
        }, {
            subject: string;
            text_body: string;
            html_body?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        smtp: {
            host: string;
            port: number;
            secure: boolean;
            auth: {
                user: string;
                pass: string;
            };
        };
        recipients: {
            to: string[];
            cc?: string[] | undefined;
            bcc?: string[] | undefined;
        };
        template: {
            subject: string;
            text_body: string;
            html_body?: string | undefined;
        };
    }, {
        smtp: {
            host: string;
            port: number;
            auth: {
                user: string;
                pass: string;
            };
            secure?: boolean | undefined;
        };
        recipients: {
            to: string[];
            cc?: string[] | undefined;
            bcc?: string[] | undefined;
        };
        template: {
            subject: string;
            text_body: string;
            html_body?: string | undefined;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "email";
    enabled: boolean;
    configuration: {
        smtp: {
            host: string;
            port: number;
            secure: boolean;
            auth: {
                user: string;
                pass: string;
            };
        };
        recipients: {
            to: string[];
            cc?: string[] | undefined;
            bcc?: string[] | undefined;
        };
        template: {
            subject: string;
            text_body: string;
            html_body?: string | undefined;
        };
    };
    tags?: Record<string, string> | undefined;
    description?: string | undefined;
    validate?: boolean | undefined;
}, {
    name: string;
    type: "email";
    configuration: {
        smtp: {
            host: string;
            port: number;
            auth: {
                user: string;
                pass: string;
            };
            secure?: boolean | undefined;
        };
        recipients: {
            to: string[];
            cc?: string[] | undefined;
            bcc?: string[] | undefined;
        };
        template: {
            subject: string;
            text_body: string;
            html_body?: string | undefined;
        };
    };
    tags?: Record<string, string> | undefined;
    enabled?: boolean | undefined;
    description?: string | undefined;
    validate?: boolean | undefined;
}>, z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    enabled: z.ZodDefault<z.ZodBoolean>;
    tags: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    validate: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
} & {
    type: z.ZodLiteral<"discord">;
    configuration: z.ZodObject<{
        webhook_url: z.ZodString;
        embed: z.ZodOptional<z.ZodObject<{
            title: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            color: z.ZodOptional<z.ZodString>;
            footer: z.ZodOptional<z.ZodObject<{
                text: z.ZodOptional<z.ZodString>;
                icon_url: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                text?: string | undefined;
                icon_url?: string | undefined;
            }, {
                text?: string | undefined;
                icon_url?: string | undefined;
            }>>;
            thumbnail: z.ZodOptional<z.ZodObject<{
                url: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                url?: string | undefined;
            }, {
                url?: string | undefined;
            }>>;
            fields: z.ZodOptional<z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                value: z.ZodString;
                inline: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                value: string;
                name: string;
                inline?: boolean | undefined;
            }, {
                value: string;
                name: string;
                inline?: boolean | undefined;
            }>, "many">>;
            timestamp: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            timestamp?: string | undefined;
            color?: string | undefined;
            description?: string | undefined;
            title?: string | undefined;
            footer?: {
                text?: string | undefined;
                icon_url?: string | undefined;
            } | undefined;
            thumbnail?: {
                url?: string | undefined;
            } | undefined;
            fields?: {
                value: string;
                name: string;
                inline?: boolean | undefined;
            }[] | undefined;
        }, {
            timestamp?: string | undefined;
            color?: string | undefined;
            description?: string | undefined;
            title?: string | undefined;
            footer?: {
                text?: string | undefined;
                icon_url?: string | undefined;
            } | undefined;
            thumbnail?: {
                url?: string | undefined;
            } | undefined;
            fields?: {
                value: string;
                name: string;
                inline?: boolean | undefined;
            }[] | undefined;
        }>>;
        mentions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>>;
    }, "strip", z.ZodTypeAny, {
        webhook_url: string;
        mentions?: Record<string, string[]> | undefined;
        embed?: {
            timestamp?: string | undefined;
            color?: string | undefined;
            description?: string | undefined;
            title?: string | undefined;
            footer?: {
                text?: string | undefined;
                icon_url?: string | undefined;
            } | undefined;
            thumbnail?: {
                url?: string | undefined;
            } | undefined;
            fields?: {
                value: string;
                name: string;
                inline?: boolean | undefined;
            }[] | undefined;
        } | undefined;
    }, {
        webhook_url: string;
        mentions?: Record<string, string[]> | undefined;
        embed?: {
            timestamp?: string | undefined;
            color?: string | undefined;
            description?: string | undefined;
            title?: string | undefined;
            footer?: {
                text?: string | undefined;
                icon_url?: string | undefined;
            } | undefined;
            thumbnail?: {
                url?: string | undefined;
            } | undefined;
            fields?: {
                value: string;
                name: string;
                inline?: boolean | undefined;
            }[] | undefined;
        } | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "discord";
    enabled: boolean;
    configuration: {
        webhook_url: string;
        mentions?: Record<string, string[]> | undefined;
        embed?: {
            timestamp?: string | undefined;
            color?: string | undefined;
            description?: string | undefined;
            title?: string | undefined;
            footer?: {
                text?: string | undefined;
                icon_url?: string | undefined;
            } | undefined;
            thumbnail?: {
                url?: string | undefined;
            } | undefined;
            fields?: {
                value: string;
                name: string;
                inline?: boolean | undefined;
            }[] | undefined;
        } | undefined;
    };
    tags?: Record<string, string> | undefined;
    description?: string | undefined;
    validate?: boolean | undefined;
}, {
    name: string;
    type: "discord";
    configuration: {
        webhook_url: string;
        mentions?: Record<string, string[]> | undefined;
        embed?: {
            timestamp?: string | undefined;
            color?: string | undefined;
            description?: string | undefined;
            title?: string | undefined;
            footer?: {
                text?: string | undefined;
                icon_url?: string | undefined;
            } | undefined;
            thumbnail?: {
                url?: string | undefined;
            } | undefined;
            fields?: {
                value: string;
                name: string;
                inline?: boolean | undefined;
            }[] | undefined;
        } | undefined;
    };
    tags?: Record<string, string> | undefined;
    enabled?: boolean | undefined;
    description?: string | undefined;
    validate?: boolean | undefined;
}>, z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    enabled: z.ZodDefault<z.ZodBoolean>;
    tags: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    validate: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
} & {
    type: z.ZodLiteral<"pagerduty">;
    configuration: z.ZodObject<{
        integration_key: z.ZodString;
        severity_filter: z.ZodOptional<z.ZodArray<z.ZodEnum<["critical", "high", "medium", "low"]>, "many">>;
        event_action: z.ZodDefault<z.ZodEnum<["trigger", "acknowledge", "resolve"]>>;
        custom_details: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        dedup_key: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        integration_key: string;
        event_action: "trigger" | "acknowledge" | "resolve";
        severity_filter?: ("critical" | "high" | "medium" | "low")[] | undefined;
        custom_details?: Record<string, any> | undefined;
        dedup_key?: string | undefined;
    }, {
        integration_key: string;
        severity_filter?: ("critical" | "high" | "medium" | "low")[] | undefined;
        event_action?: "trigger" | "acknowledge" | "resolve" | undefined;
        custom_details?: Record<string, any> | undefined;
        dedup_key?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "pagerduty";
    enabled: boolean;
    configuration: {
        integration_key: string;
        event_action: "trigger" | "acknowledge" | "resolve";
        severity_filter?: ("critical" | "high" | "medium" | "low")[] | undefined;
        custom_details?: Record<string, any> | undefined;
        dedup_key?: string | undefined;
    };
    tags?: Record<string, string> | undefined;
    description?: string | undefined;
    validate?: boolean | undefined;
}, {
    name: string;
    type: "pagerduty";
    configuration: {
        integration_key: string;
        severity_filter?: ("critical" | "high" | "medium" | "low")[] | undefined;
        event_action?: "trigger" | "acknowledge" | "resolve" | undefined;
        custom_details?: Record<string, any> | undefined;
        dedup_key?: string | undefined;
    };
    tags?: Record<string, string> | undefined;
    enabled?: boolean | undefined;
    description?: string | undefined;
    validate?: boolean | undefined;
}>, z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    enabled: z.ZodDefault<z.ZodBoolean>;
    tags: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    validate: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
} & {
    type: z.ZodLiteral<"msteams">;
    configuration: z.ZodObject<{
        webhook_url: z.ZodString;
        card_template: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, "strip", z.ZodTypeAny, {
        webhook_url: string;
        card_template?: Record<string, any> | undefined;
    }, {
        webhook_url: string;
        card_template?: Record<string, any> | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "msteams";
    enabled: boolean;
    configuration: {
        webhook_url: string;
        card_template?: Record<string, any> | undefined;
    };
    tags?: Record<string, string> | undefined;
    description?: string | undefined;
    validate?: boolean | undefined;
}, {
    name: string;
    type: "msteams";
    configuration: {
        webhook_url: string;
        card_template?: Record<string, any> | undefined;
    };
    tags?: Record<string, string> | undefined;
    enabled?: boolean | undefined;
    description?: string | undefined;
    validate?: boolean | undefined;
}>, z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    enabled: z.ZodDefault<z.ZodBoolean>;
    tags: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    validate: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
} & {
    type: z.ZodLiteral<"telegram">;
    configuration: z.ZodObject<{
        bot_token: z.ZodString;
        chat_id: z.ZodString;
        parse_mode: z.ZodOptional<z.ZodEnum<["MarkdownV2", "HTML", "Markdown"]>>;
        disable_web_page_preview: z.ZodOptional<z.ZodBoolean>;
        disable_notification: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        bot_token: string;
        chat_id: string;
        parse_mode?: "MarkdownV2" | "HTML" | "Markdown" | undefined;
        disable_web_page_preview?: boolean | undefined;
        disable_notification?: boolean | undefined;
    }, {
        bot_token: string;
        chat_id: string;
        parse_mode?: "MarkdownV2" | "HTML" | "Markdown" | undefined;
        disable_web_page_preview?: boolean | undefined;
        disable_notification?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "telegram";
    enabled: boolean;
    configuration: {
        bot_token: string;
        chat_id: string;
        parse_mode?: "MarkdownV2" | "HTML" | "Markdown" | undefined;
        disable_web_page_preview?: boolean | undefined;
        disable_notification?: boolean | undefined;
    };
    tags?: Record<string, string> | undefined;
    description?: string | undefined;
    validate?: boolean | undefined;
}, {
    name: string;
    type: "telegram";
    configuration: {
        bot_token: string;
        chat_id: string;
        parse_mode?: "MarkdownV2" | "HTML" | "Markdown" | undefined;
        disable_web_page_preview?: boolean | undefined;
        disable_notification?: boolean | undefined;
    };
    tags?: Record<string, string> | undefined;
    enabled?: boolean | undefined;
    description?: string | undefined;
    validate?: boolean | undefined;
}>]>]>;
export type NotificationChannelConfig = z.infer<typeof notificationChannelSchema>;
export type CompleteNotificationChannelConfig = z.infer<typeof completeNotificationChannelSchema>;
//# sourceMappingURL=notification-channel.schema.d.ts.map