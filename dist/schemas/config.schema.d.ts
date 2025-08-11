import { z } from 'zod';
import { type WatchlistConfig } from './watchlist.schema.js';
import { type CustomAgentConfig } from './custom-agent.schema.js';
import { type CompleteNotificationChannelConfig } from './notification-channel.schema.js';
export declare const globalOnlyConfigSchema: z.ZodObject<{
    config: z.ZodOptional<z.ZodObject<{
        version: z.ZodDefault<z.ZodString>;
        updated_at: z.ZodOptional<z.ZodString>;
        author: z.ZodOptional<z.ZodString>;
        imports: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        validation: z.ZodOptional<z.ZodObject<{
            strict_mode: z.ZodDefault<z.ZodBoolean>;
            allow_unknown_properties: z.ZodDefault<z.ZodBoolean>;
            validate_references: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            strict_mode: boolean;
            allow_unknown_properties: boolean;
            validate_references: boolean;
        }, {
            strict_mode?: boolean | undefined;
            allow_unknown_properties?: boolean | undefined;
            validate_references?: boolean | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        validation?: {
            strict_mode: boolean;
            allow_unknown_properties: boolean;
            validate_references: boolean;
        } | undefined;
        updated_at?: string | undefined;
        author?: string | undefined;
        imports?: string[] | undefined;
    }, {
        validation?: {
            strict_mode?: boolean | undefined;
            allow_unknown_properties?: boolean | undefined;
            validate_references?: boolean | undefined;
        } | undefined;
        version?: string | undefined;
        updated_at?: string | undefined;
        author?: string | undefined;
        imports?: string[] | undefined;
    }>>;
    global: z.ZodOptional<z.ZodObject<{
        project: z.ZodOptional<z.ZodObject<{
            name: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            version: z.ZodOptional<z.ZodString>;
            environment: z.ZodDefault<z.ZodEnum<["development", "staging", "production"]>>;
            tags: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            environment: "development" | "staging" | "production";
            tags?: Record<string, string> | undefined;
            description?: string | undefined;
            version?: string | undefined;
        }, {
            name: string;
            tags?: Record<string, string> | undefined;
            description?: string | undefined;
            version?: string | undefined;
            environment?: "development" | "staging" | "production" | undefined;
        }>>;
        defaults: z.ZodOptional<z.ZodObject<{
            notification_channels: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            severity_threshold: z.ZodDefault<z.ZodEnum<["critical", "high", "medium", "low"]>>;
            timezone: z.ZodDefault<z.ZodString>;
            retry_config: z.ZodOptional<z.ZodObject<{
                max_retries: z.ZodDefault<z.ZodNumber>;
                retry_delay: z.ZodDefault<z.ZodString>;
                exponential_backoff: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                max_retries: number;
                retry_delay: string;
                exponential_backoff: boolean;
            }, {
                max_retries?: number | undefined;
                retry_delay?: string | undefined;
                exponential_backoff?: boolean | undefined;
            }>>;
            monitoring: z.ZodOptional<z.ZodObject<{
                collect_metrics: z.ZodDefault<z.ZodBoolean>;
                health_checks_enabled: z.ZodDefault<z.ZodBoolean>;
                performance_tracking: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                collect_metrics: boolean;
                health_checks_enabled: boolean;
                performance_tracking: boolean;
            }, {
                collect_metrics?: boolean | undefined;
                health_checks_enabled?: boolean | undefined;
                performance_tracking?: boolean | undefined;
            }>>;
            validation_limits: z.ZodOptional<z.ZodObject<{
                max_file_size: z.ZodDefault<z.ZodNumber>;
                max_assets_per_watchlist: z.ZodDefault<z.ZodNumber>;
                max_resources_total: z.ZodDefault<z.ZodNumber>;
                max_name_length: z.ZodDefault<z.ZodNumber>;
                max_description_length: z.ZodDefault<z.ZodNumber>;
                max_agent_code_length: z.ZodDefault<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                max_file_size: number;
                max_assets_per_watchlist: number;
                max_resources_total: number;
                max_name_length: number;
                max_description_length: number;
                max_agent_code_length: number;
            }, {
                max_file_size?: number | undefined;
                max_assets_per_watchlist?: number | undefined;
                max_resources_total?: number | undefined;
                max_name_length?: number | undefined;
                max_description_length?: number | undefined;
                max_agent_code_length?: number | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            severity_threshold: "critical" | "high" | "medium" | "low";
            timezone: string;
            notification_channels?: string[] | undefined;
            monitoring?: {
                collect_metrics: boolean;
                health_checks_enabled: boolean;
                performance_tracking: boolean;
            } | undefined;
            retry_config?: {
                max_retries: number;
                retry_delay: string;
                exponential_backoff: boolean;
            } | undefined;
            validation_limits?: {
                max_file_size: number;
                max_assets_per_watchlist: number;
                max_resources_total: number;
                max_name_length: number;
                max_description_length: number;
                max_agent_code_length: number;
            } | undefined;
        }, {
            severity_threshold?: "critical" | "high" | "medium" | "low" | undefined;
            notification_channels?: string[] | undefined;
            timezone?: string | undefined;
            monitoring?: {
                collect_metrics?: boolean | undefined;
                health_checks_enabled?: boolean | undefined;
                performance_tracking?: boolean | undefined;
            } | undefined;
            retry_config?: {
                max_retries?: number | undefined;
                retry_delay?: string | undefined;
                exponential_backoff?: boolean | undefined;
            } | undefined;
            validation_limits?: {
                max_file_size?: number | undefined;
                max_assets_per_watchlist?: number | undefined;
                max_resources_total?: number | undefined;
                max_name_length?: number | undefined;
                max_description_length?: number | undefined;
                max_agent_code_length?: number | undefined;
            } | undefined;
        }>>;
        env: z.ZodOptional<z.ZodObject<{
            required: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            optional: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            validation: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                pattern: z.ZodOptional<z.ZodString>;
                message: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                message?: string | undefined;
                pattern?: string | undefined;
            }, {
                message?: string | undefined;
                pattern?: string | undefined;
            }>>>;
        }, "strip", z.ZodTypeAny, {
            validation?: Record<string, {
                message?: string | undefined;
                pattern?: string | undefined;
            }> | undefined;
            required?: string[] | undefined;
            optional?: Record<string, string> | undefined;
        }, {
            validation?: Record<string, {
                message?: string | undefined;
                pattern?: string | undefined;
            }> | undefined;
            required?: string[] | undefined;
            optional?: Record<string, string> | undefined;
        }>>;
        integrations: z.ZodOptional<z.ZodObject<{
            hypernative: z.ZodOptional<z.ZodObject<{
                base_url: z.ZodOptional<z.ZodString>;
                timeout: z.ZodDefault<z.ZodString>;
                retry_attempts: z.ZodDefault<z.ZodNumber>;
                rate_limit: z.ZodOptional<z.ZodObject<{
                    requests_per_minute: z.ZodDefault<z.ZodNumber>;
                    burst_limit: z.ZodDefault<z.ZodNumber>;
                }, "strip", z.ZodTypeAny, {
                    requests_per_minute: number;
                    burst_limit: number;
                }, {
                    requests_per_minute?: number | undefined;
                    burst_limit?: number | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                timeout: string;
                retry_attempts: number;
                base_url?: string | undefined;
                rate_limit?: {
                    requests_per_minute: number;
                    burst_limit: number;
                } | undefined;
            }, {
                timeout?: string | undefined;
                base_url?: string | undefined;
                retry_attempts?: number | undefined;
                rate_limit?: {
                    requests_per_minute?: number | undefined;
                    burst_limit?: number | undefined;
                } | undefined;
            }>>;
            external_services: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                base_url: z.ZodString;
                auth_type: z.ZodDefault<z.ZodEnum<["none", "api_key", "bearer", "basic"]>>;
                timeout: z.ZodDefault<z.ZodString>;
                headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                auth_type: "none" | "api_key" | "bearer" | "basic";
                timeout: string;
                base_url: string;
                headers?: Record<string, string> | undefined;
            }, {
                base_url: string;
                auth_type?: "none" | "api_key" | "bearer" | "basic" | undefined;
                timeout?: string | undefined;
                headers?: Record<string, string> | undefined;
            }>>>;
        }, "strip", z.ZodTypeAny, {
            hypernative?: {
                timeout: string;
                retry_attempts: number;
                base_url?: string | undefined;
                rate_limit?: {
                    requests_per_minute: number;
                    burst_limit: number;
                } | undefined;
            } | undefined;
            external_services?: Record<string, {
                auth_type: "none" | "api_key" | "bearer" | "basic";
                timeout: string;
                base_url: string;
                headers?: Record<string, string> | undefined;
            }> | undefined;
        }, {
            hypernative?: {
                timeout?: string | undefined;
                base_url?: string | undefined;
                retry_attempts?: number | undefined;
                rate_limit?: {
                    requests_per_minute?: number | undefined;
                    burst_limit?: number | undefined;
                } | undefined;
            } | undefined;
            external_services?: Record<string, {
                base_url: string;
                auth_type?: "none" | "api_key" | "bearer" | "basic" | undefined;
                timeout?: string | undefined;
                headers?: Record<string, string> | undefined;
            }> | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        integrations?: {
            hypernative?: {
                timeout: string;
                retry_attempts: number;
                base_url?: string | undefined;
                rate_limit?: {
                    requests_per_minute: number;
                    burst_limit: number;
                } | undefined;
            } | undefined;
            external_services?: Record<string, {
                auth_type: "none" | "api_key" | "bearer" | "basic";
                timeout: string;
                base_url: string;
                headers?: Record<string, string> | undefined;
            }> | undefined;
        } | undefined;
        project?: {
            name: string;
            environment: "development" | "staging" | "production";
            tags?: Record<string, string> | undefined;
            description?: string | undefined;
            version?: string | undefined;
        } | undefined;
        defaults?: {
            severity_threshold: "critical" | "high" | "medium" | "low";
            timezone: string;
            notification_channels?: string[] | undefined;
            monitoring?: {
                collect_metrics: boolean;
                health_checks_enabled: boolean;
                performance_tracking: boolean;
            } | undefined;
            retry_config?: {
                max_retries: number;
                retry_delay: string;
                exponential_backoff: boolean;
            } | undefined;
            validation_limits?: {
                max_file_size: number;
                max_assets_per_watchlist: number;
                max_resources_total: number;
                max_name_length: number;
                max_description_length: number;
                max_agent_code_length: number;
            } | undefined;
        } | undefined;
        env?: {
            validation?: Record<string, {
                message?: string | undefined;
                pattern?: string | undefined;
            }> | undefined;
            required?: string[] | undefined;
            optional?: Record<string, string> | undefined;
        } | undefined;
    }, {
        integrations?: {
            hypernative?: {
                timeout?: string | undefined;
                base_url?: string | undefined;
                retry_attempts?: number | undefined;
                rate_limit?: {
                    requests_per_minute?: number | undefined;
                    burst_limit?: number | undefined;
                } | undefined;
            } | undefined;
            external_services?: Record<string, {
                base_url: string;
                auth_type?: "none" | "api_key" | "bearer" | "basic" | undefined;
                timeout?: string | undefined;
                headers?: Record<string, string> | undefined;
            }> | undefined;
        } | undefined;
        project?: {
            name: string;
            tags?: Record<string, string> | undefined;
            description?: string | undefined;
            version?: string | undefined;
            environment?: "development" | "staging" | "production" | undefined;
        } | undefined;
        defaults?: {
            severity_threshold?: "critical" | "high" | "medium" | "low" | undefined;
            notification_channels?: string[] | undefined;
            timezone?: string | undefined;
            monitoring?: {
                collect_metrics?: boolean | undefined;
                health_checks_enabled?: boolean | undefined;
                performance_tracking?: boolean | undefined;
            } | undefined;
            retry_config?: {
                max_retries?: number | undefined;
                retry_delay?: string | undefined;
                exponential_backoff?: boolean | undefined;
            } | undefined;
            validation_limits?: {
                max_file_size?: number | undefined;
                max_assets_per_watchlist?: number | undefined;
                max_resources_total?: number | undefined;
                max_name_length?: number | undefined;
                max_description_length?: number | undefined;
                max_agent_code_length?: number | undefined;
            } | undefined;
        } | undefined;
        env?: {
            validation?: Record<string, {
                message?: string | undefined;
                pattern?: string | undefined;
            }> | undefined;
            required?: string[] | undefined;
            optional?: Record<string, string> | undefined;
        } | undefined;
    }>>;
    resources: z.ZodOptional<z.ZodObject<{
        notification_channels: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodIntersection<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
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
        }>]>]>>>;
        watchlists: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodEffects<z.ZodObject<{
            name: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            enabled: z.ZodDefault<z.ZodBoolean>;
            tags: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            assets: z.ZodArray<z.ZodObject<{
                chain: z.ZodEnum<["ethereum", "polygon", "bsc", "avalanche", "arbitrum", "optimism", "base", "fantom", "gnosis", "celo"]>;
                type: z.ZodEnum<["Wallet", "Protocol", "Token", "Contract", "Pool", "NFT"]>;
                address: z.ZodString;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodOptional<z.ZodString>;
                tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
                chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
                address: string;
                symbol?: string | undefined;
                name?: string | undefined;
                tags?: string[] | undefined;
            }, {
                type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
                chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
                address: string;
                symbol?: string | undefined;
                name?: string | undefined;
                tags?: string[] | undefined;
            }>, "many">;
            alert_policy_id: z.ZodOptional<z.ZodString>;
            alert_config: z.ZodOptional<z.ZodObject<{
                severity_threshold: z.ZodDefault<z.ZodEnum<["critical", "high", "medium", "low"]>>;
                notification_channels: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                rules: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    asset_types: z.ZodOptional<z.ZodArray<z.ZodEnum<["Wallet", "Protocol", "Token", "Contract", "Pool", "NFT"]>, "many">>;
                    conditions: z.ZodArray<z.ZodObject<{
                        type: z.ZodEnum<["balance_change", "transaction_volume", "unusual_activity", "security_incident", "governance_event", "price_change", "liquidity_change"]>;
                        threshold: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        direction: z.ZodOptional<z.ZodEnum<["increase", "decrease", "both"]>>;
                        timeframe: z.ZodOptional<z.ZodString>;
                    }, "strip", z.ZodTypeAny, {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }, {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }>, "many">;
                    severity: z.ZodOptional<z.ZodEnum<["critical", "high", "medium", "low"]>>;
                    enabled: z.ZodDefault<z.ZodBoolean>;
                }, "strip", z.ZodTypeAny, {
                    conditions: {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }[];
                    enabled: boolean;
                    asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                }, {
                    conditions: {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }[];
                    asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                    enabled?: boolean | undefined;
                }>, "many">>;
                enabled: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                enabled: boolean;
                severity_threshold: "critical" | "high" | "medium" | "low";
                notification_channels?: string[] | undefined;
                rules?: {
                    conditions: {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }[];
                    enabled: boolean;
                    asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                }[] | undefined;
            }, {
                enabled?: boolean | undefined;
                severity_threshold?: "critical" | "high" | "medium" | "low" | undefined;
                notification_channels?: string[] | undefined;
                rules?: {
                    conditions: {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }[];
                    asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                    enabled?: boolean | undefined;
                }[] | undefined;
            }>>;
            monitoring: z.ZodOptional<z.ZodObject<{
                check_interval: z.ZodDefault<z.ZodNumber>;
                collect_history: z.ZodDefault<z.ZodBoolean>;
                retention_days: z.ZodDefault<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                check_interval: number;
                collect_history: boolean;
                retention_days: number;
            }, {
                check_interval?: number | undefined;
                collect_history?: boolean | undefined;
                retention_days?: number | undefined;
            }>>;
            options: z.ZodOptional<z.ZodObject<{
                maintenance_windows: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    start: z.ZodString;
                    end: z.ZodString;
                    timezone: z.ZodDefault<z.ZodString>;
                    days: z.ZodOptional<z.ZodArray<z.ZodEnum<["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]>, "many">>;
                }, "strip", z.ZodTypeAny, {
                    start: string;
                    end: string;
                    timezone: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }, {
                    start: string;
                    end: string;
                    timezone?: string | undefined;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }>, "many">>;
                thresholds: z.ZodOptional<z.ZodObject<{
                    balance_change_major: z.ZodOptional<z.ZodNumber>;
                    balance_change_critical: z.ZodOptional<z.ZodNumber>;
                    transaction_count_unusual: z.ZodOptional<z.ZodNumber>;
                    value_at_risk: z.ZodOptional<z.ZodNumber>;
                }, "strip", z.ZodTypeAny, {
                    balance_change_major?: number | undefined;
                    balance_change_critical?: number | undefined;
                    transaction_count_unusual?: number | undefined;
                    value_at_risk?: number | undefined;
                }, {
                    balance_change_major?: number | undefined;
                    balance_change_critical?: number | undefined;
                    transaction_count_unusual?: number | undefined;
                    value_at_risk?: number | undefined;
                }>>;
                enhanced_monitoring: z.ZodOptional<z.ZodObject<{
                    risk_scoring: z.ZodDefault<z.ZodBoolean>;
                    pattern_detection: z.ZodDefault<z.ZodBoolean>;
                    cross_chain_tracking: z.ZodDefault<z.ZodBoolean>;
                    sentiment_analysis: z.ZodDefault<z.ZodBoolean>;
                    compliance_monitoring: z.ZodDefault<z.ZodBoolean>;
                }, "strip", z.ZodTypeAny, {
                    risk_scoring: boolean;
                    pattern_detection: boolean;
                    cross_chain_tracking: boolean;
                    sentiment_analysis: boolean;
                    compliance_monitoring: boolean;
                }, {
                    risk_scoring?: boolean | undefined;
                    pattern_detection?: boolean | undefined;
                    cross_chain_tracking?: boolean | undefined;
                    sentiment_analysis?: boolean | undefined;
                    compliance_monitoring?: boolean | undefined;
                }>>;
                priority: z.ZodOptional<z.ZodEnum<["critical", "high", "medium", "low"]>>;
                auto_disable_on_error: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                auto_disable_on_error: boolean;
                maintenance_windows?: {
                    start: string;
                    end: string;
                    timezone: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                thresholds?: {
                    balance_change_major?: number | undefined;
                    balance_change_critical?: number | undefined;
                    transaction_count_unusual?: number | undefined;
                    value_at_risk?: number | undefined;
                } | undefined;
                enhanced_monitoring?: {
                    risk_scoring: boolean;
                    pattern_detection: boolean;
                    cross_chain_tracking: boolean;
                    sentiment_analysis: boolean;
                    compliance_monitoring: boolean;
                } | undefined;
                priority?: "critical" | "high" | "medium" | "low" | undefined;
            }, {
                maintenance_windows?: {
                    start: string;
                    end: string;
                    timezone?: string | undefined;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                thresholds?: {
                    balance_change_major?: number | undefined;
                    balance_change_critical?: number | undefined;
                    transaction_count_unusual?: number | undefined;
                    value_at_risk?: number | undefined;
                } | undefined;
                enhanced_monitoring?: {
                    risk_scoring?: boolean | undefined;
                    pattern_detection?: boolean | undefined;
                    cross_chain_tracking?: boolean | undefined;
                    sentiment_analysis?: boolean | undefined;
                    compliance_monitoring?: boolean | undefined;
                } | undefined;
                priority?: "critical" | "high" | "medium" | "low" | undefined;
                auto_disable_on_error?: boolean | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            enabled: boolean;
            assets: {
                type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
                chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
                address: string;
                symbol?: string | undefined;
                name?: string | undefined;
                tags?: string[] | undefined;
            }[];
            options?: {
                auto_disable_on_error: boolean;
                maintenance_windows?: {
                    start: string;
                    end: string;
                    timezone: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                thresholds?: {
                    balance_change_major?: number | undefined;
                    balance_change_critical?: number | undefined;
                    transaction_count_unusual?: number | undefined;
                    value_at_risk?: number | undefined;
                } | undefined;
                enhanced_monitoring?: {
                    risk_scoring: boolean;
                    pattern_detection: boolean;
                    cross_chain_tracking: boolean;
                    sentiment_analysis: boolean;
                    compliance_monitoring: boolean;
                } | undefined;
                priority?: "critical" | "high" | "medium" | "low" | undefined;
            } | undefined;
            tags?: Record<string, string> | undefined;
            description?: string | undefined;
            alert_policy_id?: string | undefined;
            alert_config?: {
                enabled: boolean;
                severity_threshold: "critical" | "high" | "medium" | "low";
                notification_channels?: string[] | undefined;
                rules?: {
                    conditions: {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }[];
                    enabled: boolean;
                    asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                }[] | undefined;
            } | undefined;
            monitoring?: {
                check_interval: number;
                collect_history: boolean;
                retention_days: number;
            } | undefined;
        }, {
            name: string;
            assets: {
                type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
                chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
                address: string;
                symbol?: string | undefined;
                name?: string | undefined;
                tags?: string[] | undefined;
            }[];
            options?: {
                maintenance_windows?: {
                    start: string;
                    end: string;
                    timezone?: string | undefined;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                thresholds?: {
                    balance_change_major?: number | undefined;
                    balance_change_critical?: number | undefined;
                    transaction_count_unusual?: number | undefined;
                    value_at_risk?: number | undefined;
                } | undefined;
                enhanced_monitoring?: {
                    risk_scoring?: boolean | undefined;
                    pattern_detection?: boolean | undefined;
                    cross_chain_tracking?: boolean | undefined;
                    sentiment_analysis?: boolean | undefined;
                    compliance_monitoring?: boolean | undefined;
                } | undefined;
                priority?: "critical" | "high" | "medium" | "low" | undefined;
                auto_disable_on_error?: boolean | undefined;
            } | undefined;
            tags?: Record<string, string> | undefined;
            enabled?: boolean | undefined;
            description?: string | undefined;
            alert_policy_id?: string | undefined;
            alert_config?: {
                enabled?: boolean | undefined;
                severity_threshold?: "critical" | "high" | "medium" | "low" | undefined;
                notification_channels?: string[] | undefined;
                rules?: {
                    conditions: {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }[];
                    asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                    enabled?: boolean | undefined;
                }[] | undefined;
            } | undefined;
            monitoring?: {
                check_interval?: number | undefined;
                collect_history?: boolean | undefined;
                retention_days?: number | undefined;
            } | undefined;
        }>, {
            name: string;
            enabled: boolean;
            assets: {
                type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
                chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
                address: string;
                symbol?: string | undefined;
                name?: string | undefined;
                tags?: string[] | undefined;
            }[];
            options?: {
                auto_disable_on_error: boolean;
                maintenance_windows?: {
                    start: string;
                    end: string;
                    timezone: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                thresholds?: {
                    balance_change_major?: number | undefined;
                    balance_change_critical?: number | undefined;
                    transaction_count_unusual?: number | undefined;
                    value_at_risk?: number | undefined;
                } | undefined;
                enhanced_monitoring?: {
                    risk_scoring: boolean;
                    pattern_detection: boolean;
                    cross_chain_tracking: boolean;
                    sentiment_analysis: boolean;
                    compliance_monitoring: boolean;
                } | undefined;
                priority?: "critical" | "high" | "medium" | "low" | undefined;
            } | undefined;
            tags?: Record<string, string> | undefined;
            description?: string | undefined;
            alert_policy_id?: string | undefined;
            alert_config?: {
                enabled: boolean;
                severity_threshold: "critical" | "high" | "medium" | "low";
                notification_channels?: string[] | undefined;
                rules?: {
                    conditions: {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }[];
                    enabled: boolean;
                    asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                }[] | undefined;
            } | undefined;
            monitoring?: {
                check_interval: number;
                collect_history: boolean;
                retention_days: number;
            } | undefined;
        }, {
            name: string;
            assets: {
                type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
                chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
                address: string;
                symbol?: string | undefined;
                name?: string | undefined;
                tags?: string[] | undefined;
            }[];
            options?: {
                maintenance_windows?: {
                    start: string;
                    end: string;
                    timezone?: string | undefined;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                thresholds?: {
                    balance_change_major?: number | undefined;
                    balance_change_critical?: number | undefined;
                    transaction_count_unusual?: number | undefined;
                    value_at_risk?: number | undefined;
                } | undefined;
                enhanced_monitoring?: {
                    risk_scoring?: boolean | undefined;
                    pattern_detection?: boolean | undefined;
                    cross_chain_tracking?: boolean | undefined;
                    sentiment_analysis?: boolean | undefined;
                    compliance_monitoring?: boolean | undefined;
                } | undefined;
                priority?: "critical" | "high" | "medium" | "low" | undefined;
                auto_disable_on_error?: boolean | undefined;
            } | undefined;
            tags?: Record<string, string> | undefined;
            enabled?: boolean | undefined;
            description?: string | undefined;
            alert_policy_id?: string | undefined;
            alert_config?: {
                enabled?: boolean | undefined;
                severity_threshold?: "critical" | "high" | "medium" | "low" | undefined;
                notification_channels?: string[] | undefined;
                rules?: {
                    conditions: {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }[];
                    asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                    enabled?: boolean | undefined;
                }[] | undefined;
            } | undefined;
            monitoring?: {
                check_interval?: number | undefined;
                collect_history?: boolean | undefined;
                retention_days?: number | undefined;
            } | undefined;
        }>>>;
        custom_agents: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            name: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            enabled: z.ZodDefault<z.ZodBoolean>;
            type: z.ZodEnum<["address_balance_change", "position_health_deviation", "large_transaction_monitor", "contract_interaction_monitor", "token_transfer_monitor", "defi_position_monitor", "governance_proposal_monitor", "bridge_transaction_monitor", "yield_farming_monitor", "liquidation_risk_monitor", "flash_loan_monitor", "mev_activity_monitor", "whale_movement_monitor", "unusual_pattern_detector", "custom_webhook_trigger"]>;
            code: z.ZodOptional<z.ZodString>;
            chain: z.ZodEnum<["ethereum", "polygon", "bsc", "avalanche", "arbitrum", "optimism", "base", "fantom", "gnosis", "celo"]>;
            severity: z.ZodDefault<z.ZodEnum<["critical", "high", "medium", "low"]>>;
            tags: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            configuration: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
            notification_channels: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            schedule: z.ZodOptional<z.ZodObject<{
                interval: z.ZodDefault<z.ZodNumber>;
                timezone: z.ZodDefault<z.ZodString>;
                skip_windows: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    start: z.ZodString;
                    end: z.ZodString;
                    days: z.ZodOptional<z.ZodArray<z.ZodEnum<["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]>, "many">>;
                }, "strip", z.ZodTypeAny, {
                    start: string;
                    end: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }, {
                    start: string;
                    end: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }>, "many">>;
                max_executions_per_hour: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                timezone: string;
                interval: number;
                skip_windows?: {
                    start: string;
                    end: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                max_executions_per_hour?: number | undefined;
            }, {
                timezone?: string | undefined;
                interval?: number | undefined;
                skip_windows?: {
                    start: string;
                    end: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                max_executions_per_hour?: number | undefined;
            }>>;
            alert_template: z.ZodOptional<z.ZodObject<{
                title: z.ZodOptional<z.ZodString>;
                message: z.ZodOptional<z.ZodString>;
                include_context: z.ZodOptional<z.ZodObject<{
                    transaction_details: z.ZodDefault<z.ZodBoolean>;
                    risk_analysis: z.ZodDefault<z.ZodBoolean>;
                    historical_comparison: z.ZodDefault<z.ZodBoolean>;
                    cross_reference_alerts: z.ZodDefault<z.ZodBoolean>;
                    price_impact: z.ZodDefault<z.ZodBoolean>;
                }, "strip", z.ZodTypeAny, {
                    transaction_details: boolean;
                    risk_analysis: boolean;
                    historical_comparison: boolean;
                    cross_reference_alerts: boolean;
                    price_impact: boolean;
                }, {
                    transaction_details?: boolean | undefined;
                    risk_analysis?: boolean | undefined;
                    historical_comparison?: boolean | undefined;
                    cross_reference_alerts?: boolean | undefined;
                    price_impact?: boolean | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                message?: string | undefined;
                title?: string | undefined;
                include_context?: {
                    transaction_details: boolean;
                    risk_analysis: boolean;
                    historical_comparison: boolean;
                    cross_reference_alerts: boolean;
                    price_impact: boolean;
                } | undefined;
            }, {
                message?: string | undefined;
                title?: string | undefined;
                include_context?: {
                    transaction_details?: boolean | undefined;
                    risk_analysis?: boolean | undefined;
                    historical_comparison?: boolean | undefined;
                    cross_reference_alerts?: boolean | undefined;
                    price_impact?: boolean | undefined;
                } | undefined;
            }>>;
            automated_responses: z.ZodOptional<z.ZodObject<{
                triggers: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    condition: z.ZodString;
                    actions: z.ZodArray<z.ZodObject<{
                        type: z.ZodEnum<["notify_additional_channels", "create_incident", "pause_automated_trading", "require_manual_approval", "webhook_call", "update_risk_score"]>;
                        channels: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                        severity: z.ZodOptional<z.ZodEnum<["critical", "high", "medium", "low"]>>;
                        duration: z.ZodOptional<z.ZodString>;
                        for_operations: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                        webhook_url: z.ZodOptional<z.ZodString>;
                        risk_score_adjustment: z.ZodOptional<z.ZodNumber>;
                    }, "strip", z.ZodTypeAny, {
                        type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                        severity?: "critical" | "high" | "medium" | "low" | undefined;
                        channels?: string[] | undefined;
                        duration?: string | undefined;
                        for_operations?: string[] | undefined;
                        webhook_url?: string | undefined;
                        risk_score_adjustment?: number | undefined;
                    }, {
                        type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                        severity?: "critical" | "high" | "medium" | "low" | undefined;
                        channels?: string[] | undefined;
                        duration?: string | undefined;
                        for_operations?: string[] | undefined;
                        webhook_url?: string | undefined;
                        risk_score_adjustment?: number | undefined;
                    }>, "many">;
                }, "strip", z.ZodTypeAny, {
                    condition: string;
                    actions: {
                        type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                        severity?: "critical" | "high" | "medium" | "low" | undefined;
                        channels?: string[] | undefined;
                        duration?: string | undefined;
                        for_operations?: string[] | undefined;
                        webhook_url?: string | undefined;
                        risk_score_adjustment?: number | undefined;
                    }[];
                }, {
                    condition: string;
                    actions: {
                        type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                        severity?: "critical" | "high" | "medium" | "low" | undefined;
                        channels?: string[] | undefined;
                        duration?: string | undefined;
                        for_operations?: string[] | undefined;
                        webhook_url?: string | undefined;
                        risk_score_adjustment?: number | undefined;
                    }[];
                }>, "many">>;
            }, "strip", z.ZodTypeAny, {
                triggers?: {
                    condition: string;
                    actions: {
                        type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                        severity?: "critical" | "high" | "medium" | "low" | undefined;
                        channels?: string[] | undefined;
                        duration?: string | undefined;
                        for_operations?: string[] | undefined;
                        webhook_url?: string | undefined;
                        risk_score_adjustment?: number | undefined;
                    }[];
                }[] | undefined;
            }, {
                triggers?: {
                    condition: string;
                    actions: {
                        type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                        severity?: "critical" | "high" | "medium" | "low" | undefined;
                        channels?: string[] | undefined;
                        duration?: string | undefined;
                        for_operations?: string[] | undefined;
                        webhook_url?: string | undefined;
                        risk_score_adjustment?: number | undefined;
                    }[];
                }[] | undefined;
            }>>;
            testing: z.ZodOptional<z.ZodObject<{
                test_mode: z.ZodDefault<z.ZodBoolean>;
                test_scenarios: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    name: z.ZodString;
                    mock_data: z.ZodRecord<z.ZodString, z.ZodAny>;
                    expected_result: z.ZodEnum<["alert_triggered", "no_alert", "error"]>;
                    description: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    mock_data: Record<string, any>;
                    expected_result: "error" | "alert_triggered" | "no_alert";
                    description?: string | undefined;
                }, {
                    name: string;
                    mock_data: Record<string, any>;
                    expected_result: "error" | "alert_triggered" | "no_alert";
                    description?: string | undefined;
                }>, "many">>;
            }, "strip", z.ZodTypeAny, {
                test_mode: boolean;
                test_scenarios?: {
                    name: string;
                    mock_data: Record<string, any>;
                    expected_result: "error" | "alert_triggered" | "no_alert";
                    description?: string | undefined;
                }[] | undefined;
            }, {
                test_mode?: boolean | undefined;
                test_scenarios?: {
                    name: string;
                    mock_data: Record<string, any>;
                    expected_result: "error" | "alert_triggered" | "no_alert";
                    description?: string | undefined;
                }[] | undefined;
            }>>;
            monitoring: z.ZodOptional<z.ZodObject<{
                collect_metrics: z.ZodDefault<z.ZodBoolean>;
                max_execution_time: z.ZodDefault<z.ZodString>;
                max_memory_usage: z.ZodDefault<z.ZodString>;
                retry_on_failure: z.ZodDefault<z.ZodBoolean>;
                max_retries: z.ZodDefault<z.ZodNumber>;
                retry_delay: z.ZodDefault<z.ZodString>;
                health_check_interval: z.ZodDefault<z.ZodString>;
                alert_on_health_failure: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                collect_metrics: boolean;
                max_execution_time: string;
                max_memory_usage: string;
                retry_on_failure: boolean;
                max_retries: number;
                retry_delay: string;
                health_check_interval: string;
                alert_on_health_failure: boolean;
            }, {
                collect_metrics?: boolean | undefined;
                max_execution_time?: string | undefined;
                max_memory_usage?: string | undefined;
                retry_on_failure?: boolean | undefined;
                max_retries?: number | undefined;
                retry_delay?: string | undefined;
                health_check_interval?: string | undefined;
                alert_on_health_failure?: boolean | undefined;
            }>>;
            integrations: z.ZodOptional<z.ZodObject<{
                external_apis: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    name: z.ZodString;
                    url: z.ZodString;
                    auth_type: z.ZodDefault<z.ZodEnum<["none", "api_key", "bearer", "basic"]>>;
                    timeout: z.ZodDefault<z.ZodString>;
                    headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    url: string;
                    auth_type: "none" | "api_key" | "bearer" | "basic";
                    timeout: string;
                    headers?: Record<string, string> | undefined;
                }, {
                    name: string;
                    url: string;
                    auth_type?: "none" | "api_key" | "bearer" | "basic" | undefined;
                    timeout?: string | undefined;
                    headers?: Record<string, string> | undefined;
                }>, "many">>;
                databases: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    name: z.ZodString;
                    type: z.ZodEnum<["postgresql", "mysql", "mongodb", "redis"]>;
                    connection_string_env: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    type: "postgresql" | "mysql" | "mongodb" | "redis";
                    connection_string_env: string;
                }, {
                    name: string;
                    type: "postgresql" | "mysql" | "mongodb" | "redis";
                    connection_string_env: string;
                }>, "many">>;
                message_queues: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    name: z.ZodString;
                    type: z.ZodEnum<["rabbitmq", "kafka", "sqs", "pubsub"]>;
                    queue_name: z.ZodString;
                    config: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
                    queue_name: string;
                    config?: Record<string, any> | undefined;
                }, {
                    name: string;
                    type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
                    queue_name: string;
                    config?: Record<string, any> | undefined;
                }>, "many">>;
            }, "strip", z.ZodTypeAny, {
                external_apis?: {
                    name: string;
                    url: string;
                    auth_type: "none" | "api_key" | "bearer" | "basic";
                    timeout: string;
                    headers?: Record<string, string> | undefined;
                }[] | undefined;
                databases?: {
                    name: string;
                    type: "postgresql" | "mysql" | "mongodb" | "redis";
                    connection_string_env: string;
                }[] | undefined;
                message_queues?: {
                    name: string;
                    type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
                    queue_name: string;
                    config?: Record<string, any> | undefined;
                }[] | undefined;
            }, {
                external_apis?: {
                    name: string;
                    url: string;
                    auth_type?: "none" | "api_key" | "bearer" | "basic" | undefined;
                    timeout?: string | undefined;
                    headers?: Record<string, string> | undefined;
                }[] | undefined;
                databases?: {
                    name: string;
                    type: "postgresql" | "mysql" | "mongodb" | "redis";
                    connection_string_env: string;
                }[] | undefined;
                message_queues?: {
                    name: string;
                    type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
                    queue_name: string;
                    config?: Record<string, any> | undefined;
                }[] | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            type: "address_balance_change" | "position_health_deviation" | "large_transaction_monitor" | "contract_interaction_monitor" | "token_transfer_monitor" | "defi_position_monitor" | "governance_proposal_monitor" | "bridge_transaction_monitor" | "yield_farming_monitor" | "liquidation_risk_monitor" | "flash_loan_monitor" | "mev_activity_monitor" | "whale_movement_monitor" | "unusual_pattern_detector" | "custom_webhook_trigger";
            chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
            severity: "critical" | "high" | "medium" | "low";
            enabled: boolean;
            code?: string | undefined;
            tags?: Record<string, string> | undefined;
            notification_channels?: string[] | undefined;
            description?: string | undefined;
            monitoring?: {
                collect_metrics: boolean;
                max_execution_time: string;
                max_memory_usage: string;
                retry_on_failure: boolean;
                max_retries: number;
                retry_delay: string;
                health_check_interval: string;
                alert_on_health_failure: boolean;
            } | undefined;
            configuration?: Record<string, any> | undefined;
            schedule?: {
                timezone: string;
                interval: number;
                skip_windows?: {
                    start: string;
                    end: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                max_executions_per_hour?: number | undefined;
            } | undefined;
            alert_template?: {
                message?: string | undefined;
                title?: string | undefined;
                include_context?: {
                    transaction_details: boolean;
                    risk_analysis: boolean;
                    historical_comparison: boolean;
                    cross_reference_alerts: boolean;
                    price_impact: boolean;
                } | undefined;
            } | undefined;
            automated_responses?: {
                triggers?: {
                    condition: string;
                    actions: {
                        type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                        severity?: "critical" | "high" | "medium" | "low" | undefined;
                        channels?: string[] | undefined;
                        duration?: string | undefined;
                        for_operations?: string[] | undefined;
                        webhook_url?: string | undefined;
                        risk_score_adjustment?: number | undefined;
                    }[];
                }[] | undefined;
            } | undefined;
            testing?: {
                test_mode: boolean;
                test_scenarios?: {
                    name: string;
                    mock_data: Record<string, any>;
                    expected_result: "error" | "alert_triggered" | "no_alert";
                    description?: string | undefined;
                }[] | undefined;
            } | undefined;
            integrations?: {
                external_apis?: {
                    name: string;
                    url: string;
                    auth_type: "none" | "api_key" | "bearer" | "basic";
                    timeout: string;
                    headers?: Record<string, string> | undefined;
                }[] | undefined;
                databases?: {
                    name: string;
                    type: "postgresql" | "mysql" | "mongodb" | "redis";
                    connection_string_env: string;
                }[] | undefined;
                message_queues?: {
                    name: string;
                    type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
                    queue_name: string;
                    config?: Record<string, any> | undefined;
                }[] | undefined;
            } | undefined;
        }, {
            name: string;
            type: "address_balance_change" | "position_health_deviation" | "large_transaction_monitor" | "contract_interaction_monitor" | "token_transfer_monitor" | "defi_position_monitor" | "governance_proposal_monitor" | "bridge_transaction_monitor" | "yield_farming_monitor" | "liquidation_risk_monitor" | "flash_loan_monitor" | "mev_activity_monitor" | "whale_movement_monitor" | "unusual_pattern_detector" | "custom_webhook_trigger";
            chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
            code?: string | undefined;
            tags?: Record<string, string> | undefined;
            severity?: "critical" | "high" | "medium" | "low" | undefined;
            enabled?: boolean | undefined;
            notification_channels?: string[] | undefined;
            description?: string | undefined;
            monitoring?: {
                collect_metrics?: boolean | undefined;
                max_execution_time?: string | undefined;
                max_memory_usage?: string | undefined;
                retry_on_failure?: boolean | undefined;
                max_retries?: number | undefined;
                retry_delay?: string | undefined;
                health_check_interval?: string | undefined;
                alert_on_health_failure?: boolean | undefined;
            } | undefined;
            configuration?: Record<string, any> | undefined;
            schedule?: {
                timezone?: string | undefined;
                interval?: number | undefined;
                skip_windows?: {
                    start: string;
                    end: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                max_executions_per_hour?: number | undefined;
            } | undefined;
            alert_template?: {
                message?: string | undefined;
                title?: string | undefined;
                include_context?: {
                    transaction_details?: boolean | undefined;
                    risk_analysis?: boolean | undefined;
                    historical_comparison?: boolean | undefined;
                    cross_reference_alerts?: boolean | undefined;
                    price_impact?: boolean | undefined;
                } | undefined;
            } | undefined;
            automated_responses?: {
                triggers?: {
                    condition: string;
                    actions: {
                        type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                        severity?: "critical" | "high" | "medium" | "low" | undefined;
                        channels?: string[] | undefined;
                        duration?: string | undefined;
                        for_operations?: string[] | undefined;
                        webhook_url?: string | undefined;
                        risk_score_adjustment?: number | undefined;
                    }[];
                }[] | undefined;
            } | undefined;
            testing?: {
                test_mode?: boolean | undefined;
                test_scenarios?: {
                    name: string;
                    mock_data: Record<string, any>;
                    expected_result: "error" | "alert_triggered" | "no_alert";
                    description?: string | undefined;
                }[] | undefined;
            } | undefined;
            integrations?: {
                external_apis?: {
                    name: string;
                    url: string;
                    auth_type?: "none" | "api_key" | "bearer" | "basic" | undefined;
                    timeout?: string | undefined;
                    headers?: Record<string, string> | undefined;
                }[] | undefined;
                databases?: {
                    name: string;
                    type: "postgresql" | "mysql" | "mongodb" | "redis";
                    connection_string_env: string;
                }[] | undefined;
                message_queues?: {
                    name: string;
                    type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
                    queue_name: string;
                    config?: Record<string, any> | undefined;
                }[] | undefined;
            } | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        notification_channels?: Record<string, {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | (({
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        }) & {
            testing?: {
                test_mode: boolean;
                test_endpoint?: string | undefined;
            } | undefined;
        })> | undefined;
        watchlists?: Record<string, {
            name: string;
            enabled: boolean;
            assets: {
                type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
                chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
                address: string;
                symbol?: string | undefined;
                name?: string | undefined;
                tags?: string[] | undefined;
            }[];
            options?: {
                auto_disable_on_error: boolean;
                maintenance_windows?: {
                    start: string;
                    end: string;
                    timezone: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                thresholds?: {
                    balance_change_major?: number | undefined;
                    balance_change_critical?: number | undefined;
                    transaction_count_unusual?: number | undefined;
                    value_at_risk?: number | undefined;
                } | undefined;
                enhanced_monitoring?: {
                    risk_scoring: boolean;
                    pattern_detection: boolean;
                    cross_chain_tracking: boolean;
                    sentiment_analysis: boolean;
                    compliance_monitoring: boolean;
                } | undefined;
                priority?: "critical" | "high" | "medium" | "low" | undefined;
            } | undefined;
            tags?: Record<string, string> | undefined;
            description?: string | undefined;
            alert_policy_id?: string | undefined;
            alert_config?: {
                enabled: boolean;
                severity_threshold: "critical" | "high" | "medium" | "low";
                notification_channels?: string[] | undefined;
                rules?: {
                    conditions: {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }[];
                    enabled: boolean;
                    asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                }[] | undefined;
            } | undefined;
            monitoring?: {
                check_interval: number;
                collect_history: boolean;
                retention_days: number;
            } | undefined;
        }> | undefined;
        custom_agents?: Record<string, {
            name: string;
            type: "address_balance_change" | "position_health_deviation" | "large_transaction_monitor" | "contract_interaction_monitor" | "token_transfer_monitor" | "defi_position_monitor" | "governance_proposal_monitor" | "bridge_transaction_monitor" | "yield_farming_monitor" | "liquidation_risk_monitor" | "flash_loan_monitor" | "mev_activity_monitor" | "whale_movement_monitor" | "unusual_pattern_detector" | "custom_webhook_trigger";
            chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
            severity: "critical" | "high" | "medium" | "low";
            enabled: boolean;
            code?: string | undefined;
            tags?: Record<string, string> | undefined;
            notification_channels?: string[] | undefined;
            description?: string | undefined;
            monitoring?: {
                collect_metrics: boolean;
                max_execution_time: string;
                max_memory_usage: string;
                retry_on_failure: boolean;
                max_retries: number;
                retry_delay: string;
                health_check_interval: string;
                alert_on_health_failure: boolean;
            } | undefined;
            configuration?: Record<string, any> | undefined;
            schedule?: {
                timezone: string;
                interval: number;
                skip_windows?: {
                    start: string;
                    end: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                max_executions_per_hour?: number | undefined;
            } | undefined;
            alert_template?: {
                message?: string | undefined;
                title?: string | undefined;
                include_context?: {
                    transaction_details: boolean;
                    risk_analysis: boolean;
                    historical_comparison: boolean;
                    cross_reference_alerts: boolean;
                    price_impact: boolean;
                } | undefined;
            } | undefined;
            automated_responses?: {
                triggers?: {
                    condition: string;
                    actions: {
                        type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                        severity?: "critical" | "high" | "medium" | "low" | undefined;
                        channels?: string[] | undefined;
                        duration?: string | undefined;
                        for_operations?: string[] | undefined;
                        webhook_url?: string | undefined;
                        risk_score_adjustment?: number | undefined;
                    }[];
                }[] | undefined;
            } | undefined;
            testing?: {
                test_mode: boolean;
                test_scenarios?: {
                    name: string;
                    mock_data: Record<string, any>;
                    expected_result: "error" | "alert_triggered" | "no_alert";
                    description?: string | undefined;
                }[] | undefined;
            } | undefined;
            integrations?: {
                external_apis?: {
                    name: string;
                    url: string;
                    auth_type: "none" | "api_key" | "bearer" | "basic";
                    timeout: string;
                    headers?: Record<string, string> | undefined;
                }[] | undefined;
                databases?: {
                    name: string;
                    type: "postgresql" | "mysql" | "mongodb" | "redis";
                    connection_string_env: string;
                }[] | undefined;
                message_queues?: {
                    name: string;
                    type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
                    queue_name: string;
                    config?: Record<string, any> | undefined;
                }[] | undefined;
            } | undefined;
        }> | undefined;
    }, {
        notification_channels?: Record<string, {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | (({
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        }) & {
            testing?: {
                test_mode?: boolean | undefined;
                test_endpoint?: string | undefined;
            } | undefined;
        })> | undefined;
        watchlists?: Record<string, {
            name: string;
            assets: {
                type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
                chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
                address: string;
                symbol?: string | undefined;
                name?: string | undefined;
                tags?: string[] | undefined;
            }[];
            options?: {
                maintenance_windows?: {
                    start: string;
                    end: string;
                    timezone?: string | undefined;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                thresholds?: {
                    balance_change_major?: number | undefined;
                    balance_change_critical?: number | undefined;
                    transaction_count_unusual?: number | undefined;
                    value_at_risk?: number | undefined;
                } | undefined;
                enhanced_monitoring?: {
                    risk_scoring?: boolean | undefined;
                    pattern_detection?: boolean | undefined;
                    cross_chain_tracking?: boolean | undefined;
                    sentiment_analysis?: boolean | undefined;
                    compliance_monitoring?: boolean | undefined;
                } | undefined;
                priority?: "critical" | "high" | "medium" | "low" | undefined;
                auto_disable_on_error?: boolean | undefined;
            } | undefined;
            tags?: Record<string, string> | undefined;
            enabled?: boolean | undefined;
            description?: string | undefined;
            alert_policy_id?: string | undefined;
            alert_config?: {
                enabled?: boolean | undefined;
                severity_threshold?: "critical" | "high" | "medium" | "low" | undefined;
                notification_channels?: string[] | undefined;
                rules?: {
                    conditions: {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }[];
                    asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                    enabled?: boolean | undefined;
                }[] | undefined;
            } | undefined;
            monitoring?: {
                check_interval?: number | undefined;
                collect_history?: boolean | undefined;
                retention_days?: number | undefined;
            } | undefined;
        }> | undefined;
        custom_agents?: Record<string, {
            name: string;
            type: "address_balance_change" | "position_health_deviation" | "large_transaction_monitor" | "contract_interaction_monitor" | "token_transfer_monitor" | "defi_position_monitor" | "governance_proposal_monitor" | "bridge_transaction_monitor" | "yield_farming_monitor" | "liquidation_risk_monitor" | "flash_loan_monitor" | "mev_activity_monitor" | "whale_movement_monitor" | "unusual_pattern_detector" | "custom_webhook_trigger";
            chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
            code?: string | undefined;
            tags?: Record<string, string> | undefined;
            severity?: "critical" | "high" | "medium" | "low" | undefined;
            enabled?: boolean | undefined;
            notification_channels?: string[] | undefined;
            description?: string | undefined;
            monitoring?: {
                collect_metrics?: boolean | undefined;
                max_execution_time?: string | undefined;
                max_memory_usage?: string | undefined;
                retry_on_failure?: boolean | undefined;
                max_retries?: number | undefined;
                retry_delay?: string | undefined;
                health_check_interval?: string | undefined;
                alert_on_health_failure?: boolean | undefined;
            } | undefined;
            configuration?: Record<string, any> | undefined;
            schedule?: {
                timezone?: string | undefined;
                interval?: number | undefined;
                skip_windows?: {
                    start: string;
                    end: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                max_executions_per_hour?: number | undefined;
            } | undefined;
            alert_template?: {
                message?: string | undefined;
                title?: string | undefined;
                include_context?: {
                    transaction_details?: boolean | undefined;
                    risk_analysis?: boolean | undefined;
                    historical_comparison?: boolean | undefined;
                    cross_reference_alerts?: boolean | undefined;
                    price_impact?: boolean | undefined;
                } | undefined;
            } | undefined;
            automated_responses?: {
                triggers?: {
                    condition: string;
                    actions: {
                        type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                        severity?: "critical" | "high" | "medium" | "low" | undefined;
                        channels?: string[] | undefined;
                        duration?: string | undefined;
                        for_operations?: string[] | undefined;
                        webhook_url?: string | undefined;
                        risk_score_adjustment?: number | undefined;
                    }[];
                }[] | undefined;
            } | undefined;
            testing?: {
                test_mode?: boolean | undefined;
                test_scenarios?: {
                    name: string;
                    mock_data: Record<string, any>;
                    expected_result: "error" | "alert_triggered" | "no_alert";
                    description?: string | undefined;
                }[] | undefined;
            } | undefined;
            integrations?: {
                external_apis?: {
                    name: string;
                    url: string;
                    auth_type?: "none" | "api_key" | "bearer" | "basic" | undefined;
                    timeout?: string | undefined;
                    headers?: Record<string, string> | undefined;
                }[] | undefined;
                databases?: {
                    name: string;
                    type: "postgresql" | "mysql" | "mongodb" | "redis";
                    connection_string_env: string;
                }[] | undefined;
                message_queues?: {
                    name: string;
                    type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
                    queue_name: string;
                    config?: Record<string, any> | undefined;
                }[] | undefined;
            } | undefined;
        }> | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    config?: {
        version: string;
        validation?: {
            strict_mode: boolean;
            allow_unknown_properties: boolean;
            validate_references: boolean;
        } | undefined;
        updated_at?: string | undefined;
        author?: string | undefined;
        imports?: string[] | undefined;
    } | undefined;
    global?: {
        integrations?: {
            hypernative?: {
                timeout: string;
                retry_attempts: number;
                base_url?: string | undefined;
                rate_limit?: {
                    requests_per_minute: number;
                    burst_limit: number;
                } | undefined;
            } | undefined;
            external_services?: Record<string, {
                auth_type: "none" | "api_key" | "bearer" | "basic";
                timeout: string;
                base_url: string;
                headers?: Record<string, string> | undefined;
            }> | undefined;
        } | undefined;
        project?: {
            name: string;
            environment: "development" | "staging" | "production";
            tags?: Record<string, string> | undefined;
            description?: string | undefined;
            version?: string | undefined;
        } | undefined;
        defaults?: {
            severity_threshold: "critical" | "high" | "medium" | "low";
            timezone: string;
            notification_channels?: string[] | undefined;
            monitoring?: {
                collect_metrics: boolean;
                health_checks_enabled: boolean;
                performance_tracking: boolean;
            } | undefined;
            retry_config?: {
                max_retries: number;
                retry_delay: string;
                exponential_backoff: boolean;
            } | undefined;
            validation_limits?: {
                max_file_size: number;
                max_assets_per_watchlist: number;
                max_resources_total: number;
                max_name_length: number;
                max_description_length: number;
                max_agent_code_length: number;
            } | undefined;
        } | undefined;
        env?: {
            validation?: Record<string, {
                message?: string | undefined;
                pattern?: string | undefined;
            }> | undefined;
            required?: string[] | undefined;
            optional?: Record<string, string> | undefined;
        } | undefined;
    } | undefined;
    resources?: {
        notification_channels?: Record<string, {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | (({
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        }) & {
            testing?: {
                test_mode: boolean;
                test_endpoint?: string | undefined;
            } | undefined;
        })> | undefined;
        watchlists?: Record<string, {
            name: string;
            enabled: boolean;
            assets: {
                type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
                chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
                address: string;
                symbol?: string | undefined;
                name?: string | undefined;
                tags?: string[] | undefined;
            }[];
            options?: {
                auto_disable_on_error: boolean;
                maintenance_windows?: {
                    start: string;
                    end: string;
                    timezone: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                thresholds?: {
                    balance_change_major?: number | undefined;
                    balance_change_critical?: number | undefined;
                    transaction_count_unusual?: number | undefined;
                    value_at_risk?: number | undefined;
                } | undefined;
                enhanced_monitoring?: {
                    risk_scoring: boolean;
                    pattern_detection: boolean;
                    cross_chain_tracking: boolean;
                    sentiment_analysis: boolean;
                    compliance_monitoring: boolean;
                } | undefined;
                priority?: "critical" | "high" | "medium" | "low" | undefined;
            } | undefined;
            tags?: Record<string, string> | undefined;
            description?: string | undefined;
            alert_policy_id?: string | undefined;
            alert_config?: {
                enabled: boolean;
                severity_threshold: "critical" | "high" | "medium" | "low";
                notification_channels?: string[] | undefined;
                rules?: {
                    conditions: {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }[];
                    enabled: boolean;
                    asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                }[] | undefined;
            } | undefined;
            monitoring?: {
                check_interval: number;
                collect_history: boolean;
                retention_days: number;
            } | undefined;
        }> | undefined;
        custom_agents?: Record<string, {
            name: string;
            type: "address_balance_change" | "position_health_deviation" | "large_transaction_monitor" | "contract_interaction_monitor" | "token_transfer_monitor" | "defi_position_monitor" | "governance_proposal_monitor" | "bridge_transaction_monitor" | "yield_farming_monitor" | "liquidation_risk_monitor" | "flash_loan_monitor" | "mev_activity_monitor" | "whale_movement_monitor" | "unusual_pattern_detector" | "custom_webhook_trigger";
            chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
            severity: "critical" | "high" | "medium" | "low";
            enabled: boolean;
            code?: string | undefined;
            tags?: Record<string, string> | undefined;
            notification_channels?: string[] | undefined;
            description?: string | undefined;
            monitoring?: {
                collect_metrics: boolean;
                max_execution_time: string;
                max_memory_usage: string;
                retry_on_failure: boolean;
                max_retries: number;
                retry_delay: string;
                health_check_interval: string;
                alert_on_health_failure: boolean;
            } | undefined;
            configuration?: Record<string, any> | undefined;
            schedule?: {
                timezone: string;
                interval: number;
                skip_windows?: {
                    start: string;
                    end: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                max_executions_per_hour?: number | undefined;
            } | undefined;
            alert_template?: {
                message?: string | undefined;
                title?: string | undefined;
                include_context?: {
                    transaction_details: boolean;
                    risk_analysis: boolean;
                    historical_comparison: boolean;
                    cross_reference_alerts: boolean;
                    price_impact: boolean;
                } | undefined;
            } | undefined;
            automated_responses?: {
                triggers?: {
                    condition: string;
                    actions: {
                        type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                        severity?: "critical" | "high" | "medium" | "low" | undefined;
                        channels?: string[] | undefined;
                        duration?: string | undefined;
                        for_operations?: string[] | undefined;
                        webhook_url?: string | undefined;
                        risk_score_adjustment?: number | undefined;
                    }[];
                }[] | undefined;
            } | undefined;
            testing?: {
                test_mode: boolean;
                test_scenarios?: {
                    name: string;
                    mock_data: Record<string, any>;
                    expected_result: "error" | "alert_triggered" | "no_alert";
                    description?: string | undefined;
                }[] | undefined;
            } | undefined;
            integrations?: {
                external_apis?: {
                    name: string;
                    url: string;
                    auth_type: "none" | "api_key" | "bearer" | "basic";
                    timeout: string;
                    headers?: Record<string, string> | undefined;
                }[] | undefined;
                databases?: {
                    name: string;
                    type: "postgresql" | "mysql" | "mongodb" | "redis";
                    connection_string_env: string;
                }[] | undefined;
                message_queues?: {
                    name: string;
                    type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
                    queue_name: string;
                    config?: Record<string, any> | undefined;
                }[] | undefined;
            } | undefined;
        }> | undefined;
    } | undefined;
}, {
    config?: {
        validation?: {
            strict_mode?: boolean | undefined;
            allow_unknown_properties?: boolean | undefined;
            validate_references?: boolean | undefined;
        } | undefined;
        version?: string | undefined;
        updated_at?: string | undefined;
        author?: string | undefined;
        imports?: string[] | undefined;
    } | undefined;
    global?: {
        integrations?: {
            hypernative?: {
                timeout?: string | undefined;
                base_url?: string | undefined;
                retry_attempts?: number | undefined;
                rate_limit?: {
                    requests_per_minute?: number | undefined;
                    burst_limit?: number | undefined;
                } | undefined;
            } | undefined;
            external_services?: Record<string, {
                base_url: string;
                auth_type?: "none" | "api_key" | "bearer" | "basic" | undefined;
                timeout?: string | undefined;
                headers?: Record<string, string> | undefined;
            }> | undefined;
        } | undefined;
        project?: {
            name: string;
            tags?: Record<string, string> | undefined;
            description?: string | undefined;
            version?: string | undefined;
            environment?: "development" | "staging" | "production" | undefined;
        } | undefined;
        defaults?: {
            severity_threshold?: "critical" | "high" | "medium" | "low" | undefined;
            notification_channels?: string[] | undefined;
            timezone?: string | undefined;
            monitoring?: {
                collect_metrics?: boolean | undefined;
                health_checks_enabled?: boolean | undefined;
                performance_tracking?: boolean | undefined;
            } | undefined;
            retry_config?: {
                max_retries?: number | undefined;
                retry_delay?: string | undefined;
                exponential_backoff?: boolean | undefined;
            } | undefined;
            validation_limits?: {
                max_file_size?: number | undefined;
                max_assets_per_watchlist?: number | undefined;
                max_resources_total?: number | undefined;
                max_name_length?: number | undefined;
                max_description_length?: number | undefined;
                max_agent_code_length?: number | undefined;
            } | undefined;
        } | undefined;
        env?: {
            validation?: Record<string, {
                message?: string | undefined;
                pattern?: string | undefined;
            }> | undefined;
            required?: string[] | undefined;
            optional?: Record<string, string> | undefined;
        } | undefined;
    } | undefined;
    resources?: {
        notification_channels?: Record<string, {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | (({
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        }) & {
            testing?: {
                test_mode?: boolean | undefined;
                test_endpoint?: string | undefined;
            } | undefined;
        })> | undefined;
        watchlists?: Record<string, {
            name: string;
            assets: {
                type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
                chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
                address: string;
                symbol?: string | undefined;
                name?: string | undefined;
                tags?: string[] | undefined;
            }[];
            options?: {
                maintenance_windows?: {
                    start: string;
                    end: string;
                    timezone?: string | undefined;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                thresholds?: {
                    balance_change_major?: number | undefined;
                    balance_change_critical?: number | undefined;
                    transaction_count_unusual?: number | undefined;
                    value_at_risk?: number | undefined;
                } | undefined;
                enhanced_monitoring?: {
                    risk_scoring?: boolean | undefined;
                    pattern_detection?: boolean | undefined;
                    cross_chain_tracking?: boolean | undefined;
                    sentiment_analysis?: boolean | undefined;
                    compliance_monitoring?: boolean | undefined;
                } | undefined;
                priority?: "critical" | "high" | "medium" | "low" | undefined;
                auto_disable_on_error?: boolean | undefined;
            } | undefined;
            tags?: Record<string, string> | undefined;
            enabled?: boolean | undefined;
            description?: string | undefined;
            alert_policy_id?: string | undefined;
            alert_config?: {
                enabled?: boolean | undefined;
                severity_threshold?: "critical" | "high" | "medium" | "low" | undefined;
                notification_channels?: string[] | undefined;
                rules?: {
                    conditions: {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }[];
                    asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                    enabled?: boolean | undefined;
                }[] | undefined;
            } | undefined;
            monitoring?: {
                check_interval?: number | undefined;
                collect_history?: boolean | undefined;
                retention_days?: number | undefined;
            } | undefined;
        }> | undefined;
        custom_agents?: Record<string, {
            name: string;
            type: "address_balance_change" | "position_health_deviation" | "large_transaction_monitor" | "contract_interaction_monitor" | "token_transfer_monitor" | "defi_position_monitor" | "governance_proposal_monitor" | "bridge_transaction_monitor" | "yield_farming_monitor" | "liquidation_risk_monitor" | "flash_loan_monitor" | "mev_activity_monitor" | "whale_movement_monitor" | "unusual_pattern_detector" | "custom_webhook_trigger";
            chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
            code?: string | undefined;
            tags?: Record<string, string> | undefined;
            severity?: "critical" | "high" | "medium" | "low" | undefined;
            enabled?: boolean | undefined;
            notification_channels?: string[] | undefined;
            description?: string | undefined;
            monitoring?: {
                collect_metrics?: boolean | undefined;
                max_execution_time?: string | undefined;
                max_memory_usage?: string | undefined;
                retry_on_failure?: boolean | undefined;
                max_retries?: number | undefined;
                retry_delay?: string | undefined;
                health_check_interval?: string | undefined;
                alert_on_health_failure?: boolean | undefined;
            } | undefined;
            configuration?: Record<string, any> | undefined;
            schedule?: {
                timezone?: string | undefined;
                interval?: number | undefined;
                skip_windows?: {
                    start: string;
                    end: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                max_executions_per_hour?: number | undefined;
            } | undefined;
            alert_template?: {
                message?: string | undefined;
                title?: string | undefined;
                include_context?: {
                    transaction_details?: boolean | undefined;
                    risk_analysis?: boolean | undefined;
                    historical_comparison?: boolean | undefined;
                    cross_reference_alerts?: boolean | undefined;
                    price_impact?: boolean | undefined;
                } | undefined;
            } | undefined;
            automated_responses?: {
                triggers?: {
                    condition: string;
                    actions: {
                        type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                        severity?: "critical" | "high" | "medium" | "low" | undefined;
                        channels?: string[] | undefined;
                        duration?: string | undefined;
                        for_operations?: string[] | undefined;
                        webhook_url?: string | undefined;
                        risk_score_adjustment?: number | undefined;
                    }[];
                }[] | undefined;
            } | undefined;
            testing?: {
                test_mode?: boolean | undefined;
                test_scenarios?: {
                    name: string;
                    mock_data: Record<string, any>;
                    expected_result: "error" | "alert_triggered" | "no_alert";
                    description?: string | undefined;
                }[] | undefined;
            } | undefined;
            integrations?: {
                external_apis?: {
                    name: string;
                    url: string;
                    auth_type?: "none" | "api_key" | "bearer" | "basic" | undefined;
                    timeout?: string | undefined;
                    headers?: Record<string, string> | undefined;
                }[] | undefined;
                databases?: {
                    name: string;
                    type: "postgresql" | "mysql" | "mongodb" | "redis";
                    connection_string_env: string;
                }[] | undefined;
                message_queues?: {
                    name: string;
                    type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
                    queue_name: string;
                    config?: Record<string, any> | undefined;
                }[] | undefined;
            } | undefined;
        }> | undefined;
    } | undefined;
}>;
export declare const rootConfigSchema: z.ZodEffects<z.ZodObject<{
    config: z.ZodOptional<z.ZodObject<{
        version: z.ZodDefault<z.ZodString>;
        updated_at: z.ZodOptional<z.ZodString>;
        author: z.ZodOptional<z.ZodString>;
        imports: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        validation: z.ZodOptional<z.ZodObject<{
            strict_mode: z.ZodDefault<z.ZodBoolean>;
            allow_unknown_properties: z.ZodDefault<z.ZodBoolean>;
            validate_references: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            strict_mode: boolean;
            allow_unknown_properties: boolean;
            validate_references: boolean;
        }, {
            strict_mode?: boolean | undefined;
            allow_unknown_properties?: boolean | undefined;
            validate_references?: boolean | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        validation?: {
            strict_mode: boolean;
            allow_unknown_properties: boolean;
            validate_references: boolean;
        } | undefined;
        updated_at?: string | undefined;
        author?: string | undefined;
        imports?: string[] | undefined;
    }, {
        validation?: {
            strict_mode?: boolean | undefined;
            allow_unknown_properties?: boolean | undefined;
            validate_references?: boolean | undefined;
        } | undefined;
        version?: string | undefined;
        updated_at?: string | undefined;
        author?: string | undefined;
        imports?: string[] | undefined;
    }>>;
    global: z.ZodOptional<z.ZodObject<{
        project: z.ZodOptional<z.ZodObject<{
            name: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            version: z.ZodOptional<z.ZodString>;
            environment: z.ZodDefault<z.ZodEnum<["development", "staging", "production"]>>;
            tags: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            environment: "development" | "staging" | "production";
            tags?: Record<string, string> | undefined;
            description?: string | undefined;
            version?: string | undefined;
        }, {
            name: string;
            tags?: Record<string, string> | undefined;
            description?: string | undefined;
            version?: string | undefined;
            environment?: "development" | "staging" | "production" | undefined;
        }>>;
        defaults: z.ZodOptional<z.ZodObject<{
            notification_channels: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            severity_threshold: z.ZodDefault<z.ZodEnum<["critical", "high", "medium", "low"]>>;
            timezone: z.ZodDefault<z.ZodString>;
            retry_config: z.ZodOptional<z.ZodObject<{
                max_retries: z.ZodDefault<z.ZodNumber>;
                retry_delay: z.ZodDefault<z.ZodString>;
                exponential_backoff: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                max_retries: number;
                retry_delay: string;
                exponential_backoff: boolean;
            }, {
                max_retries?: number | undefined;
                retry_delay?: string | undefined;
                exponential_backoff?: boolean | undefined;
            }>>;
            monitoring: z.ZodOptional<z.ZodObject<{
                collect_metrics: z.ZodDefault<z.ZodBoolean>;
                health_checks_enabled: z.ZodDefault<z.ZodBoolean>;
                performance_tracking: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                collect_metrics: boolean;
                health_checks_enabled: boolean;
                performance_tracking: boolean;
            }, {
                collect_metrics?: boolean | undefined;
                health_checks_enabled?: boolean | undefined;
                performance_tracking?: boolean | undefined;
            }>>;
            validation_limits: z.ZodOptional<z.ZodObject<{
                max_file_size: z.ZodDefault<z.ZodNumber>;
                max_assets_per_watchlist: z.ZodDefault<z.ZodNumber>;
                max_resources_total: z.ZodDefault<z.ZodNumber>;
                max_name_length: z.ZodDefault<z.ZodNumber>;
                max_description_length: z.ZodDefault<z.ZodNumber>;
                max_agent_code_length: z.ZodDefault<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                max_file_size: number;
                max_assets_per_watchlist: number;
                max_resources_total: number;
                max_name_length: number;
                max_description_length: number;
                max_agent_code_length: number;
            }, {
                max_file_size?: number | undefined;
                max_assets_per_watchlist?: number | undefined;
                max_resources_total?: number | undefined;
                max_name_length?: number | undefined;
                max_description_length?: number | undefined;
                max_agent_code_length?: number | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            severity_threshold: "critical" | "high" | "medium" | "low";
            timezone: string;
            notification_channels?: string[] | undefined;
            monitoring?: {
                collect_metrics: boolean;
                health_checks_enabled: boolean;
                performance_tracking: boolean;
            } | undefined;
            retry_config?: {
                max_retries: number;
                retry_delay: string;
                exponential_backoff: boolean;
            } | undefined;
            validation_limits?: {
                max_file_size: number;
                max_assets_per_watchlist: number;
                max_resources_total: number;
                max_name_length: number;
                max_description_length: number;
                max_agent_code_length: number;
            } | undefined;
        }, {
            severity_threshold?: "critical" | "high" | "medium" | "low" | undefined;
            notification_channels?: string[] | undefined;
            timezone?: string | undefined;
            monitoring?: {
                collect_metrics?: boolean | undefined;
                health_checks_enabled?: boolean | undefined;
                performance_tracking?: boolean | undefined;
            } | undefined;
            retry_config?: {
                max_retries?: number | undefined;
                retry_delay?: string | undefined;
                exponential_backoff?: boolean | undefined;
            } | undefined;
            validation_limits?: {
                max_file_size?: number | undefined;
                max_assets_per_watchlist?: number | undefined;
                max_resources_total?: number | undefined;
                max_name_length?: number | undefined;
                max_description_length?: number | undefined;
                max_agent_code_length?: number | undefined;
            } | undefined;
        }>>;
        env: z.ZodOptional<z.ZodObject<{
            required: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            optional: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            validation: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                pattern: z.ZodOptional<z.ZodString>;
                message: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                message?: string | undefined;
                pattern?: string | undefined;
            }, {
                message?: string | undefined;
                pattern?: string | undefined;
            }>>>;
        }, "strip", z.ZodTypeAny, {
            validation?: Record<string, {
                message?: string | undefined;
                pattern?: string | undefined;
            }> | undefined;
            required?: string[] | undefined;
            optional?: Record<string, string> | undefined;
        }, {
            validation?: Record<string, {
                message?: string | undefined;
                pattern?: string | undefined;
            }> | undefined;
            required?: string[] | undefined;
            optional?: Record<string, string> | undefined;
        }>>;
        integrations: z.ZodOptional<z.ZodObject<{
            hypernative: z.ZodOptional<z.ZodObject<{
                base_url: z.ZodOptional<z.ZodString>;
                timeout: z.ZodDefault<z.ZodString>;
                retry_attempts: z.ZodDefault<z.ZodNumber>;
                rate_limit: z.ZodOptional<z.ZodObject<{
                    requests_per_minute: z.ZodDefault<z.ZodNumber>;
                    burst_limit: z.ZodDefault<z.ZodNumber>;
                }, "strip", z.ZodTypeAny, {
                    requests_per_minute: number;
                    burst_limit: number;
                }, {
                    requests_per_minute?: number | undefined;
                    burst_limit?: number | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                timeout: string;
                retry_attempts: number;
                base_url?: string | undefined;
                rate_limit?: {
                    requests_per_minute: number;
                    burst_limit: number;
                } | undefined;
            }, {
                timeout?: string | undefined;
                base_url?: string | undefined;
                retry_attempts?: number | undefined;
                rate_limit?: {
                    requests_per_minute?: number | undefined;
                    burst_limit?: number | undefined;
                } | undefined;
            }>>;
            external_services: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                base_url: z.ZodString;
                auth_type: z.ZodDefault<z.ZodEnum<["none", "api_key", "bearer", "basic"]>>;
                timeout: z.ZodDefault<z.ZodString>;
                headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                auth_type: "none" | "api_key" | "bearer" | "basic";
                timeout: string;
                base_url: string;
                headers?: Record<string, string> | undefined;
            }, {
                base_url: string;
                auth_type?: "none" | "api_key" | "bearer" | "basic" | undefined;
                timeout?: string | undefined;
                headers?: Record<string, string> | undefined;
            }>>>;
        }, "strip", z.ZodTypeAny, {
            hypernative?: {
                timeout: string;
                retry_attempts: number;
                base_url?: string | undefined;
                rate_limit?: {
                    requests_per_minute: number;
                    burst_limit: number;
                } | undefined;
            } | undefined;
            external_services?: Record<string, {
                auth_type: "none" | "api_key" | "bearer" | "basic";
                timeout: string;
                base_url: string;
                headers?: Record<string, string> | undefined;
            }> | undefined;
        }, {
            hypernative?: {
                timeout?: string | undefined;
                base_url?: string | undefined;
                retry_attempts?: number | undefined;
                rate_limit?: {
                    requests_per_minute?: number | undefined;
                    burst_limit?: number | undefined;
                } | undefined;
            } | undefined;
            external_services?: Record<string, {
                base_url: string;
                auth_type?: "none" | "api_key" | "bearer" | "basic" | undefined;
                timeout?: string | undefined;
                headers?: Record<string, string> | undefined;
            }> | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        integrations?: {
            hypernative?: {
                timeout: string;
                retry_attempts: number;
                base_url?: string | undefined;
                rate_limit?: {
                    requests_per_minute: number;
                    burst_limit: number;
                } | undefined;
            } | undefined;
            external_services?: Record<string, {
                auth_type: "none" | "api_key" | "bearer" | "basic";
                timeout: string;
                base_url: string;
                headers?: Record<string, string> | undefined;
            }> | undefined;
        } | undefined;
        project?: {
            name: string;
            environment: "development" | "staging" | "production";
            tags?: Record<string, string> | undefined;
            description?: string | undefined;
            version?: string | undefined;
        } | undefined;
        defaults?: {
            severity_threshold: "critical" | "high" | "medium" | "low";
            timezone: string;
            notification_channels?: string[] | undefined;
            monitoring?: {
                collect_metrics: boolean;
                health_checks_enabled: boolean;
                performance_tracking: boolean;
            } | undefined;
            retry_config?: {
                max_retries: number;
                retry_delay: string;
                exponential_backoff: boolean;
            } | undefined;
            validation_limits?: {
                max_file_size: number;
                max_assets_per_watchlist: number;
                max_resources_total: number;
                max_name_length: number;
                max_description_length: number;
                max_agent_code_length: number;
            } | undefined;
        } | undefined;
        env?: {
            validation?: Record<string, {
                message?: string | undefined;
                pattern?: string | undefined;
            }> | undefined;
            required?: string[] | undefined;
            optional?: Record<string, string> | undefined;
        } | undefined;
    }, {
        integrations?: {
            hypernative?: {
                timeout?: string | undefined;
                base_url?: string | undefined;
                retry_attempts?: number | undefined;
                rate_limit?: {
                    requests_per_minute?: number | undefined;
                    burst_limit?: number | undefined;
                } | undefined;
            } | undefined;
            external_services?: Record<string, {
                base_url: string;
                auth_type?: "none" | "api_key" | "bearer" | "basic" | undefined;
                timeout?: string | undefined;
                headers?: Record<string, string> | undefined;
            }> | undefined;
        } | undefined;
        project?: {
            name: string;
            tags?: Record<string, string> | undefined;
            description?: string | undefined;
            version?: string | undefined;
            environment?: "development" | "staging" | "production" | undefined;
        } | undefined;
        defaults?: {
            severity_threshold?: "critical" | "high" | "medium" | "low" | undefined;
            notification_channels?: string[] | undefined;
            timezone?: string | undefined;
            monitoring?: {
                collect_metrics?: boolean | undefined;
                health_checks_enabled?: boolean | undefined;
                performance_tracking?: boolean | undefined;
            } | undefined;
            retry_config?: {
                max_retries?: number | undefined;
                retry_delay?: string | undefined;
                exponential_backoff?: boolean | undefined;
            } | undefined;
            validation_limits?: {
                max_file_size?: number | undefined;
                max_assets_per_watchlist?: number | undefined;
                max_resources_total?: number | undefined;
                max_name_length?: number | undefined;
                max_description_length?: number | undefined;
                max_agent_code_length?: number | undefined;
            } | undefined;
        } | undefined;
        env?: {
            validation?: Record<string, {
                message?: string | undefined;
                pattern?: string | undefined;
            }> | undefined;
            required?: string[] | undefined;
            optional?: Record<string, string> | undefined;
        } | undefined;
    }>>;
    resources: z.ZodOptional<z.ZodObject<{
        notification_channels: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodIntersection<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
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
        }>]>]>>>;
        watchlists: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodEffects<z.ZodObject<{
            name: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            enabled: z.ZodDefault<z.ZodBoolean>;
            tags: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            assets: z.ZodArray<z.ZodObject<{
                chain: z.ZodEnum<["ethereum", "polygon", "bsc", "avalanche", "arbitrum", "optimism", "base", "fantom", "gnosis", "celo"]>;
                type: z.ZodEnum<["Wallet", "Protocol", "Token", "Contract", "Pool", "NFT"]>;
                address: z.ZodString;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodOptional<z.ZodString>;
                tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
                chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
                address: string;
                symbol?: string | undefined;
                name?: string | undefined;
                tags?: string[] | undefined;
            }, {
                type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
                chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
                address: string;
                symbol?: string | undefined;
                name?: string | undefined;
                tags?: string[] | undefined;
            }>, "many">;
            alert_policy_id: z.ZodOptional<z.ZodString>;
            alert_config: z.ZodOptional<z.ZodObject<{
                severity_threshold: z.ZodDefault<z.ZodEnum<["critical", "high", "medium", "low"]>>;
                notification_channels: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                rules: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    asset_types: z.ZodOptional<z.ZodArray<z.ZodEnum<["Wallet", "Protocol", "Token", "Contract", "Pool", "NFT"]>, "many">>;
                    conditions: z.ZodArray<z.ZodObject<{
                        type: z.ZodEnum<["balance_change", "transaction_volume", "unusual_activity", "security_incident", "governance_event", "price_change", "liquidity_change"]>;
                        threshold: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        direction: z.ZodOptional<z.ZodEnum<["increase", "decrease", "both"]>>;
                        timeframe: z.ZodOptional<z.ZodString>;
                    }, "strip", z.ZodTypeAny, {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }, {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }>, "many">;
                    severity: z.ZodOptional<z.ZodEnum<["critical", "high", "medium", "low"]>>;
                    enabled: z.ZodDefault<z.ZodBoolean>;
                }, "strip", z.ZodTypeAny, {
                    conditions: {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }[];
                    enabled: boolean;
                    asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                }, {
                    conditions: {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }[];
                    asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                    enabled?: boolean | undefined;
                }>, "many">>;
                enabled: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                enabled: boolean;
                severity_threshold: "critical" | "high" | "medium" | "low";
                notification_channels?: string[] | undefined;
                rules?: {
                    conditions: {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }[];
                    enabled: boolean;
                    asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                }[] | undefined;
            }, {
                enabled?: boolean | undefined;
                severity_threshold?: "critical" | "high" | "medium" | "low" | undefined;
                notification_channels?: string[] | undefined;
                rules?: {
                    conditions: {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }[];
                    asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                    enabled?: boolean | undefined;
                }[] | undefined;
            }>>;
            monitoring: z.ZodOptional<z.ZodObject<{
                check_interval: z.ZodDefault<z.ZodNumber>;
                collect_history: z.ZodDefault<z.ZodBoolean>;
                retention_days: z.ZodDefault<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                check_interval: number;
                collect_history: boolean;
                retention_days: number;
            }, {
                check_interval?: number | undefined;
                collect_history?: boolean | undefined;
                retention_days?: number | undefined;
            }>>;
            options: z.ZodOptional<z.ZodObject<{
                maintenance_windows: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    start: z.ZodString;
                    end: z.ZodString;
                    timezone: z.ZodDefault<z.ZodString>;
                    days: z.ZodOptional<z.ZodArray<z.ZodEnum<["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]>, "many">>;
                }, "strip", z.ZodTypeAny, {
                    start: string;
                    end: string;
                    timezone: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }, {
                    start: string;
                    end: string;
                    timezone?: string | undefined;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }>, "many">>;
                thresholds: z.ZodOptional<z.ZodObject<{
                    balance_change_major: z.ZodOptional<z.ZodNumber>;
                    balance_change_critical: z.ZodOptional<z.ZodNumber>;
                    transaction_count_unusual: z.ZodOptional<z.ZodNumber>;
                    value_at_risk: z.ZodOptional<z.ZodNumber>;
                }, "strip", z.ZodTypeAny, {
                    balance_change_major?: number | undefined;
                    balance_change_critical?: number | undefined;
                    transaction_count_unusual?: number | undefined;
                    value_at_risk?: number | undefined;
                }, {
                    balance_change_major?: number | undefined;
                    balance_change_critical?: number | undefined;
                    transaction_count_unusual?: number | undefined;
                    value_at_risk?: number | undefined;
                }>>;
                enhanced_monitoring: z.ZodOptional<z.ZodObject<{
                    risk_scoring: z.ZodDefault<z.ZodBoolean>;
                    pattern_detection: z.ZodDefault<z.ZodBoolean>;
                    cross_chain_tracking: z.ZodDefault<z.ZodBoolean>;
                    sentiment_analysis: z.ZodDefault<z.ZodBoolean>;
                    compliance_monitoring: z.ZodDefault<z.ZodBoolean>;
                }, "strip", z.ZodTypeAny, {
                    risk_scoring: boolean;
                    pattern_detection: boolean;
                    cross_chain_tracking: boolean;
                    sentiment_analysis: boolean;
                    compliance_monitoring: boolean;
                }, {
                    risk_scoring?: boolean | undefined;
                    pattern_detection?: boolean | undefined;
                    cross_chain_tracking?: boolean | undefined;
                    sentiment_analysis?: boolean | undefined;
                    compliance_monitoring?: boolean | undefined;
                }>>;
                priority: z.ZodOptional<z.ZodEnum<["critical", "high", "medium", "low"]>>;
                auto_disable_on_error: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                auto_disable_on_error: boolean;
                maintenance_windows?: {
                    start: string;
                    end: string;
                    timezone: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                thresholds?: {
                    balance_change_major?: number | undefined;
                    balance_change_critical?: number | undefined;
                    transaction_count_unusual?: number | undefined;
                    value_at_risk?: number | undefined;
                } | undefined;
                enhanced_monitoring?: {
                    risk_scoring: boolean;
                    pattern_detection: boolean;
                    cross_chain_tracking: boolean;
                    sentiment_analysis: boolean;
                    compliance_monitoring: boolean;
                } | undefined;
                priority?: "critical" | "high" | "medium" | "low" | undefined;
            }, {
                maintenance_windows?: {
                    start: string;
                    end: string;
                    timezone?: string | undefined;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                thresholds?: {
                    balance_change_major?: number | undefined;
                    balance_change_critical?: number | undefined;
                    transaction_count_unusual?: number | undefined;
                    value_at_risk?: number | undefined;
                } | undefined;
                enhanced_monitoring?: {
                    risk_scoring?: boolean | undefined;
                    pattern_detection?: boolean | undefined;
                    cross_chain_tracking?: boolean | undefined;
                    sentiment_analysis?: boolean | undefined;
                    compliance_monitoring?: boolean | undefined;
                } | undefined;
                priority?: "critical" | "high" | "medium" | "low" | undefined;
                auto_disable_on_error?: boolean | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            enabled: boolean;
            assets: {
                type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
                chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
                address: string;
                symbol?: string | undefined;
                name?: string | undefined;
                tags?: string[] | undefined;
            }[];
            options?: {
                auto_disable_on_error: boolean;
                maintenance_windows?: {
                    start: string;
                    end: string;
                    timezone: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                thresholds?: {
                    balance_change_major?: number | undefined;
                    balance_change_critical?: number | undefined;
                    transaction_count_unusual?: number | undefined;
                    value_at_risk?: number | undefined;
                } | undefined;
                enhanced_monitoring?: {
                    risk_scoring: boolean;
                    pattern_detection: boolean;
                    cross_chain_tracking: boolean;
                    sentiment_analysis: boolean;
                    compliance_monitoring: boolean;
                } | undefined;
                priority?: "critical" | "high" | "medium" | "low" | undefined;
            } | undefined;
            tags?: Record<string, string> | undefined;
            description?: string | undefined;
            alert_policy_id?: string | undefined;
            alert_config?: {
                enabled: boolean;
                severity_threshold: "critical" | "high" | "medium" | "low";
                notification_channels?: string[] | undefined;
                rules?: {
                    conditions: {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }[];
                    enabled: boolean;
                    asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                }[] | undefined;
            } | undefined;
            monitoring?: {
                check_interval: number;
                collect_history: boolean;
                retention_days: number;
            } | undefined;
        }, {
            name: string;
            assets: {
                type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
                chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
                address: string;
                symbol?: string | undefined;
                name?: string | undefined;
                tags?: string[] | undefined;
            }[];
            options?: {
                maintenance_windows?: {
                    start: string;
                    end: string;
                    timezone?: string | undefined;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                thresholds?: {
                    balance_change_major?: number | undefined;
                    balance_change_critical?: number | undefined;
                    transaction_count_unusual?: number | undefined;
                    value_at_risk?: number | undefined;
                } | undefined;
                enhanced_monitoring?: {
                    risk_scoring?: boolean | undefined;
                    pattern_detection?: boolean | undefined;
                    cross_chain_tracking?: boolean | undefined;
                    sentiment_analysis?: boolean | undefined;
                    compliance_monitoring?: boolean | undefined;
                } | undefined;
                priority?: "critical" | "high" | "medium" | "low" | undefined;
                auto_disable_on_error?: boolean | undefined;
            } | undefined;
            tags?: Record<string, string> | undefined;
            enabled?: boolean | undefined;
            description?: string | undefined;
            alert_policy_id?: string | undefined;
            alert_config?: {
                enabled?: boolean | undefined;
                severity_threshold?: "critical" | "high" | "medium" | "low" | undefined;
                notification_channels?: string[] | undefined;
                rules?: {
                    conditions: {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }[];
                    asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                    enabled?: boolean | undefined;
                }[] | undefined;
            } | undefined;
            monitoring?: {
                check_interval?: number | undefined;
                collect_history?: boolean | undefined;
                retention_days?: number | undefined;
            } | undefined;
        }>, {
            name: string;
            enabled: boolean;
            assets: {
                type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
                chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
                address: string;
                symbol?: string | undefined;
                name?: string | undefined;
                tags?: string[] | undefined;
            }[];
            options?: {
                auto_disable_on_error: boolean;
                maintenance_windows?: {
                    start: string;
                    end: string;
                    timezone: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                thresholds?: {
                    balance_change_major?: number | undefined;
                    balance_change_critical?: number | undefined;
                    transaction_count_unusual?: number | undefined;
                    value_at_risk?: number | undefined;
                } | undefined;
                enhanced_monitoring?: {
                    risk_scoring: boolean;
                    pattern_detection: boolean;
                    cross_chain_tracking: boolean;
                    sentiment_analysis: boolean;
                    compliance_monitoring: boolean;
                } | undefined;
                priority?: "critical" | "high" | "medium" | "low" | undefined;
            } | undefined;
            tags?: Record<string, string> | undefined;
            description?: string | undefined;
            alert_policy_id?: string | undefined;
            alert_config?: {
                enabled: boolean;
                severity_threshold: "critical" | "high" | "medium" | "low";
                notification_channels?: string[] | undefined;
                rules?: {
                    conditions: {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }[];
                    enabled: boolean;
                    asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                }[] | undefined;
            } | undefined;
            monitoring?: {
                check_interval: number;
                collect_history: boolean;
                retention_days: number;
            } | undefined;
        }, {
            name: string;
            assets: {
                type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
                chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
                address: string;
                symbol?: string | undefined;
                name?: string | undefined;
                tags?: string[] | undefined;
            }[];
            options?: {
                maintenance_windows?: {
                    start: string;
                    end: string;
                    timezone?: string | undefined;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                thresholds?: {
                    balance_change_major?: number | undefined;
                    balance_change_critical?: number | undefined;
                    transaction_count_unusual?: number | undefined;
                    value_at_risk?: number | undefined;
                } | undefined;
                enhanced_monitoring?: {
                    risk_scoring?: boolean | undefined;
                    pattern_detection?: boolean | undefined;
                    cross_chain_tracking?: boolean | undefined;
                    sentiment_analysis?: boolean | undefined;
                    compliance_monitoring?: boolean | undefined;
                } | undefined;
                priority?: "critical" | "high" | "medium" | "low" | undefined;
                auto_disable_on_error?: boolean | undefined;
            } | undefined;
            tags?: Record<string, string> | undefined;
            enabled?: boolean | undefined;
            description?: string | undefined;
            alert_policy_id?: string | undefined;
            alert_config?: {
                enabled?: boolean | undefined;
                severity_threshold?: "critical" | "high" | "medium" | "low" | undefined;
                notification_channels?: string[] | undefined;
                rules?: {
                    conditions: {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }[];
                    asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                    enabled?: boolean | undefined;
                }[] | undefined;
            } | undefined;
            monitoring?: {
                check_interval?: number | undefined;
                collect_history?: boolean | undefined;
                retention_days?: number | undefined;
            } | undefined;
        }>>>;
        custom_agents: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            name: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            enabled: z.ZodDefault<z.ZodBoolean>;
            type: z.ZodEnum<["address_balance_change", "position_health_deviation", "large_transaction_monitor", "contract_interaction_monitor", "token_transfer_monitor", "defi_position_monitor", "governance_proposal_monitor", "bridge_transaction_monitor", "yield_farming_monitor", "liquidation_risk_monitor", "flash_loan_monitor", "mev_activity_monitor", "whale_movement_monitor", "unusual_pattern_detector", "custom_webhook_trigger"]>;
            code: z.ZodOptional<z.ZodString>;
            chain: z.ZodEnum<["ethereum", "polygon", "bsc", "avalanche", "arbitrum", "optimism", "base", "fantom", "gnosis", "celo"]>;
            severity: z.ZodDefault<z.ZodEnum<["critical", "high", "medium", "low"]>>;
            tags: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            configuration: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
            notification_channels: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            schedule: z.ZodOptional<z.ZodObject<{
                interval: z.ZodDefault<z.ZodNumber>;
                timezone: z.ZodDefault<z.ZodString>;
                skip_windows: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    start: z.ZodString;
                    end: z.ZodString;
                    days: z.ZodOptional<z.ZodArray<z.ZodEnum<["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]>, "many">>;
                }, "strip", z.ZodTypeAny, {
                    start: string;
                    end: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }, {
                    start: string;
                    end: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }>, "many">>;
                max_executions_per_hour: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                timezone: string;
                interval: number;
                skip_windows?: {
                    start: string;
                    end: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                max_executions_per_hour?: number | undefined;
            }, {
                timezone?: string | undefined;
                interval?: number | undefined;
                skip_windows?: {
                    start: string;
                    end: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                max_executions_per_hour?: number | undefined;
            }>>;
            alert_template: z.ZodOptional<z.ZodObject<{
                title: z.ZodOptional<z.ZodString>;
                message: z.ZodOptional<z.ZodString>;
                include_context: z.ZodOptional<z.ZodObject<{
                    transaction_details: z.ZodDefault<z.ZodBoolean>;
                    risk_analysis: z.ZodDefault<z.ZodBoolean>;
                    historical_comparison: z.ZodDefault<z.ZodBoolean>;
                    cross_reference_alerts: z.ZodDefault<z.ZodBoolean>;
                    price_impact: z.ZodDefault<z.ZodBoolean>;
                }, "strip", z.ZodTypeAny, {
                    transaction_details: boolean;
                    risk_analysis: boolean;
                    historical_comparison: boolean;
                    cross_reference_alerts: boolean;
                    price_impact: boolean;
                }, {
                    transaction_details?: boolean | undefined;
                    risk_analysis?: boolean | undefined;
                    historical_comparison?: boolean | undefined;
                    cross_reference_alerts?: boolean | undefined;
                    price_impact?: boolean | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                message?: string | undefined;
                title?: string | undefined;
                include_context?: {
                    transaction_details: boolean;
                    risk_analysis: boolean;
                    historical_comparison: boolean;
                    cross_reference_alerts: boolean;
                    price_impact: boolean;
                } | undefined;
            }, {
                message?: string | undefined;
                title?: string | undefined;
                include_context?: {
                    transaction_details?: boolean | undefined;
                    risk_analysis?: boolean | undefined;
                    historical_comparison?: boolean | undefined;
                    cross_reference_alerts?: boolean | undefined;
                    price_impact?: boolean | undefined;
                } | undefined;
            }>>;
            automated_responses: z.ZodOptional<z.ZodObject<{
                triggers: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    condition: z.ZodString;
                    actions: z.ZodArray<z.ZodObject<{
                        type: z.ZodEnum<["notify_additional_channels", "create_incident", "pause_automated_trading", "require_manual_approval", "webhook_call", "update_risk_score"]>;
                        channels: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                        severity: z.ZodOptional<z.ZodEnum<["critical", "high", "medium", "low"]>>;
                        duration: z.ZodOptional<z.ZodString>;
                        for_operations: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                        webhook_url: z.ZodOptional<z.ZodString>;
                        risk_score_adjustment: z.ZodOptional<z.ZodNumber>;
                    }, "strip", z.ZodTypeAny, {
                        type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                        severity?: "critical" | "high" | "medium" | "low" | undefined;
                        channels?: string[] | undefined;
                        duration?: string | undefined;
                        for_operations?: string[] | undefined;
                        webhook_url?: string | undefined;
                        risk_score_adjustment?: number | undefined;
                    }, {
                        type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                        severity?: "critical" | "high" | "medium" | "low" | undefined;
                        channels?: string[] | undefined;
                        duration?: string | undefined;
                        for_operations?: string[] | undefined;
                        webhook_url?: string | undefined;
                        risk_score_adjustment?: number | undefined;
                    }>, "many">;
                }, "strip", z.ZodTypeAny, {
                    condition: string;
                    actions: {
                        type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                        severity?: "critical" | "high" | "medium" | "low" | undefined;
                        channels?: string[] | undefined;
                        duration?: string | undefined;
                        for_operations?: string[] | undefined;
                        webhook_url?: string | undefined;
                        risk_score_adjustment?: number | undefined;
                    }[];
                }, {
                    condition: string;
                    actions: {
                        type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                        severity?: "critical" | "high" | "medium" | "low" | undefined;
                        channels?: string[] | undefined;
                        duration?: string | undefined;
                        for_operations?: string[] | undefined;
                        webhook_url?: string | undefined;
                        risk_score_adjustment?: number | undefined;
                    }[];
                }>, "many">>;
            }, "strip", z.ZodTypeAny, {
                triggers?: {
                    condition: string;
                    actions: {
                        type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                        severity?: "critical" | "high" | "medium" | "low" | undefined;
                        channels?: string[] | undefined;
                        duration?: string | undefined;
                        for_operations?: string[] | undefined;
                        webhook_url?: string | undefined;
                        risk_score_adjustment?: number | undefined;
                    }[];
                }[] | undefined;
            }, {
                triggers?: {
                    condition: string;
                    actions: {
                        type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                        severity?: "critical" | "high" | "medium" | "low" | undefined;
                        channels?: string[] | undefined;
                        duration?: string | undefined;
                        for_operations?: string[] | undefined;
                        webhook_url?: string | undefined;
                        risk_score_adjustment?: number | undefined;
                    }[];
                }[] | undefined;
            }>>;
            testing: z.ZodOptional<z.ZodObject<{
                test_mode: z.ZodDefault<z.ZodBoolean>;
                test_scenarios: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    name: z.ZodString;
                    mock_data: z.ZodRecord<z.ZodString, z.ZodAny>;
                    expected_result: z.ZodEnum<["alert_triggered", "no_alert", "error"]>;
                    description: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    mock_data: Record<string, any>;
                    expected_result: "error" | "alert_triggered" | "no_alert";
                    description?: string | undefined;
                }, {
                    name: string;
                    mock_data: Record<string, any>;
                    expected_result: "error" | "alert_triggered" | "no_alert";
                    description?: string | undefined;
                }>, "many">>;
            }, "strip", z.ZodTypeAny, {
                test_mode: boolean;
                test_scenarios?: {
                    name: string;
                    mock_data: Record<string, any>;
                    expected_result: "error" | "alert_triggered" | "no_alert";
                    description?: string | undefined;
                }[] | undefined;
            }, {
                test_mode?: boolean | undefined;
                test_scenarios?: {
                    name: string;
                    mock_data: Record<string, any>;
                    expected_result: "error" | "alert_triggered" | "no_alert";
                    description?: string | undefined;
                }[] | undefined;
            }>>;
            monitoring: z.ZodOptional<z.ZodObject<{
                collect_metrics: z.ZodDefault<z.ZodBoolean>;
                max_execution_time: z.ZodDefault<z.ZodString>;
                max_memory_usage: z.ZodDefault<z.ZodString>;
                retry_on_failure: z.ZodDefault<z.ZodBoolean>;
                max_retries: z.ZodDefault<z.ZodNumber>;
                retry_delay: z.ZodDefault<z.ZodString>;
                health_check_interval: z.ZodDefault<z.ZodString>;
                alert_on_health_failure: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                collect_metrics: boolean;
                max_execution_time: string;
                max_memory_usage: string;
                retry_on_failure: boolean;
                max_retries: number;
                retry_delay: string;
                health_check_interval: string;
                alert_on_health_failure: boolean;
            }, {
                collect_metrics?: boolean | undefined;
                max_execution_time?: string | undefined;
                max_memory_usage?: string | undefined;
                retry_on_failure?: boolean | undefined;
                max_retries?: number | undefined;
                retry_delay?: string | undefined;
                health_check_interval?: string | undefined;
                alert_on_health_failure?: boolean | undefined;
            }>>;
            integrations: z.ZodOptional<z.ZodObject<{
                external_apis: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    name: z.ZodString;
                    url: z.ZodString;
                    auth_type: z.ZodDefault<z.ZodEnum<["none", "api_key", "bearer", "basic"]>>;
                    timeout: z.ZodDefault<z.ZodString>;
                    headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    url: string;
                    auth_type: "none" | "api_key" | "bearer" | "basic";
                    timeout: string;
                    headers?: Record<string, string> | undefined;
                }, {
                    name: string;
                    url: string;
                    auth_type?: "none" | "api_key" | "bearer" | "basic" | undefined;
                    timeout?: string | undefined;
                    headers?: Record<string, string> | undefined;
                }>, "many">>;
                databases: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    name: z.ZodString;
                    type: z.ZodEnum<["postgresql", "mysql", "mongodb", "redis"]>;
                    connection_string_env: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    type: "postgresql" | "mysql" | "mongodb" | "redis";
                    connection_string_env: string;
                }, {
                    name: string;
                    type: "postgresql" | "mysql" | "mongodb" | "redis";
                    connection_string_env: string;
                }>, "many">>;
                message_queues: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    name: z.ZodString;
                    type: z.ZodEnum<["rabbitmq", "kafka", "sqs", "pubsub"]>;
                    queue_name: z.ZodString;
                    config: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
                    queue_name: string;
                    config?: Record<string, any> | undefined;
                }, {
                    name: string;
                    type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
                    queue_name: string;
                    config?: Record<string, any> | undefined;
                }>, "many">>;
            }, "strip", z.ZodTypeAny, {
                external_apis?: {
                    name: string;
                    url: string;
                    auth_type: "none" | "api_key" | "bearer" | "basic";
                    timeout: string;
                    headers?: Record<string, string> | undefined;
                }[] | undefined;
                databases?: {
                    name: string;
                    type: "postgresql" | "mysql" | "mongodb" | "redis";
                    connection_string_env: string;
                }[] | undefined;
                message_queues?: {
                    name: string;
                    type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
                    queue_name: string;
                    config?: Record<string, any> | undefined;
                }[] | undefined;
            }, {
                external_apis?: {
                    name: string;
                    url: string;
                    auth_type?: "none" | "api_key" | "bearer" | "basic" | undefined;
                    timeout?: string | undefined;
                    headers?: Record<string, string> | undefined;
                }[] | undefined;
                databases?: {
                    name: string;
                    type: "postgresql" | "mysql" | "mongodb" | "redis";
                    connection_string_env: string;
                }[] | undefined;
                message_queues?: {
                    name: string;
                    type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
                    queue_name: string;
                    config?: Record<string, any> | undefined;
                }[] | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            type: "address_balance_change" | "position_health_deviation" | "large_transaction_monitor" | "contract_interaction_monitor" | "token_transfer_monitor" | "defi_position_monitor" | "governance_proposal_monitor" | "bridge_transaction_monitor" | "yield_farming_monitor" | "liquidation_risk_monitor" | "flash_loan_monitor" | "mev_activity_monitor" | "whale_movement_monitor" | "unusual_pattern_detector" | "custom_webhook_trigger";
            chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
            severity: "critical" | "high" | "medium" | "low";
            enabled: boolean;
            code?: string | undefined;
            tags?: Record<string, string> | undefined;
            notification_channels?: string[] | undefined;
            description?: string | undefined;
            monitoring?: {
                collect_metrics: boolean;
                max_execution_time: string;
                max_memory_usage: string;
                retry_on_failure: boolean;
                max_retries: number;
                retry_delay: string;
                health_check_interval: string;
                alert_on_health_failure: boolean;
            } | undefined;
            configuration?: Record<string, any> | undefined;
            schedule?: {
                timezone: string;
                interval: number;
                skip_windows?: {
                    start: string;
                    end: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                max_executions_per_hour?: number | undefined;
            } | undefined;
            alert_template?: {
                message?: string | undefined;
                title?: string | undefined;
                include_context?: {
                    transaction_details: boolean;
                    risk_analysis: boolean;
                    historical_comparison: boolean;
                    cross_reference_alerts: boolean;
                    price_impact: boolean;
                } | undefined;
            } | undefined;
            automated_responses?: {
                triggers?: {
                    condition: string;
                    actions: {
                        type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                        severity?: "critical" | "high" | "medium" | "low" | undefined;
                        channels?: string[] | undefined;
                        duration?: string | undefined;
                        for_operations?: string[] | undefined;
                        webhook_url?: string | undefined;
                        risk_score_adjustment?: number | undefined;
                    }[];
                }[] | undefined;
            } | undefined;
            testing?: {
                test_mode: boolean;
                test_scenarios?: {
                    name: string;
                    mock_data: Record<string, any>;
                    expected_result: "error" | "alert_triggered" | "no_alert";
                    description?: string | undefined;
                }[] | undefined;
            } | undefined;
            integrations?: {
                external_apis?: {
                    name: string;
                    url: string;
                    auth_type: "none" | "api_key" | "bearer" | "basic";
                    timeout: string;
                    headers?: Record<string, string> | undefined;
                }[] | undefined;
                databases?: {
                    name: string;
                    type: "postgresql" | "mysql" | "mongodb" | "redis";
                    connection_string_env: string;
                }[] | undefined;
                message_queues?: {
                    name: string;
                    type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
                    queue_name: string;
                    config?: Record<string, any> | undefined;
                }[] | undefined;
            } | undefined;
        }, {
            name: string;
            type: "address_balance_change" | "position_health_deviation" | "large_transaction_monitor" | "contract_interaction_monitor" | "token_transfer_monitor" | "defi_position_monitor" | "governance_proposal_monitor" | "bridge_transaction_monitor" | "yield_farming_monitor" | "liquidation_risk_monitor" | "flash_loan_monitor" | "mev_activity_monitor" | "whale_movement_monitor" | "unusual_pattern_detector" | "custom_webhook_trigger";
            chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
            code?: string | undefined;
            tags?: Record<string, string> | undefined;
            severity?: "critical" | "high" | "medium" | "low" | undefined;
            enabled?: boolean | undefined;
            notification_channels?: string[] | undefined;
            description?: string | undefined;
            monitoring?: {
                collect_metrics?: boolean | undefined;
                max_execution_time?: string | undefined;
                max_memory_usage?: string | undefined;
                retry_on_failure?: boolean | undefined;
                max_retries?: number | undefined;
                retry_delay?: string | undefined;
                health_check_interval?: string | undefined;
                alert_on_health_failure?: boolean | undefined;
            } | undefined;
            configuration?: Record<string, any> | undefined;
            schedule?: {
                timezone?: string | undefined;
                interval?: number | undefined;
                skip_windows?: {
                    start: string;
                    end: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                max_executions_per_hour?: number | undefined;
            } | undefined;
            alert_template?: {
                message?: string | undefined;
                title?: string | undefined;
                include_context?: {
                    transaction_details?: boolean | undefined;
                    risk_analysis?: boolean | undefined;
                    historical_comparison?: boolean | undefined;
                    cross_reference_alerts?: boolean | undefined;
                    price_impact?: boolean | undefined;
                } | undefined;
            } | undefined;
            automated_responses?: {
                triggers?: {
                    condition: string;
                    actions: {
                        type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                        severity?: "critical" | "high" | "medium" | "low" | undefined;
                        channels?: string[] | undefined;
                        duration?: string | undefined;
                        for_operations?: string[] | undefined;
                        webhook_url?: string | undefined;
                        risk_score_adjustment?: number | undefined;
                    }[];
                }[] | undefined;
            } | undefined;
            testing?: {
                test_mode?: boolean | undefined;
                test_scenarios?: {
                    name: string;
                    mock_data: Record<string, any>;
                    expected_result: "error" | "alert_triggered" | "no_alert";
                    description?: string | undefined;
                }[] | undefined;
            } | undefined;
            integrations?: {
                external_apis?: {
                    name: string;
                    url: string;
                    auth_type?: "none" | "api_key" | "bearer" | "basic" | undefined;
                    timeout?: string | undefined;
                    headers?: Record<string, string> | undefined;
                }[] | undefined;
                databases?: {
                    name: string;
                    type: "postgresql" | "mysql" | "mongodb" | "redis";
                    connection_string_env: string;
                }[] | undefined;
                message_queues?: {
                    name: string;
                    type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
                    queue_name: string;
                    config?: Record<string, any> | undefined;
                }[] | undefined;
            } | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        notification_channels?: Record<string, {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | (({
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        }) & {
            testing?: {
                test_mode: boolean;
                test_endpoint?: string | undefined;
            } | undefined;
        })> | undefined;
        watchlists?: Record<string, {
            name: string;
            enabled: boolean;
            assets: {
                type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
                chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
                address: string;
                symbol?: string | undefined;
                name?: string | undefined;
                tags?: string[] | undefined;
            }[];
            options?: {
                auto_disable_on_error: boolean;
                maintenance_windows?: {
                    start: string;
                    end: string;
                    timezone: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                thresholds?: {
                    balance_change_major?: number | undefined;
                    balance_change_critical?: number | undefined;
                    transaction_count_unusual?: number | undefined;
                    value_at_risk?: number | undefined;
                } | undefined;
                enhanced_monitoring?: {
                    risk_scoring: boolean;
                    pattern_detection: boolean;
                    cross_chain_tracking: boolean;
                    sentiment_analysis: boolean;
                    compliance_monitoring: boolean;
                } | undefined;
                priority?: "critical" | "high" | "medium" | "low" | undefined;
            } | undefined;
            tags?: Record<string, string> | undefined;
            description?: string | undefined;
            alert_policy_id?: string | undefined;
            alert_config?: {
                enabled: boolean;
                severity_threshold: "critical" | "high" | "medium" | "low";
                notification_channels?: string[] | undefined;
                rules?: {
                    conditions: {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }[];
                    enabled: boolean;
                    asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                }[] | undefined;
            } | undefined;
            monitoring?: {
                check_interval: number;
                collect_history: boolean;
                retention_days: number;
            } | undefined;
        }> | undefined;
        custom_agents?: Record<string, {
            name: string;
            type: "address_balance_change" | "position_health_deviation" | "large_transaction_monitor" | "contract_interaction_monitor" | "token_transfer_monitor" | "defi_position_monitor" | "governance_proposal_monitor" | "bridge_transaction_monitor" | "yield_farming_monitor" | "liquidation_risk_monitor" | "flash_loan_monitor" | "mev_activity_monitor" | "whale_movement_monitor" | "unusual_pattern_detector" | "custom_webhook_trigger";
            chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
            severity: "critical" | "high" | "medium" | "low";
            enabled: boolean;
            code?: string | undefined;
            tags?: Record<string, string> | undefined;
            notification_channels?: string[] | undefined;
            description?: string | undefined;
            monitoring?: {
                collect_metrics: boolean;
                max_execution_time: string;
                max_memory_usage: string;
                retry_on_failure: boolean;
                max_retries: number;
                retry_delay: string;
                health_check_interval: string;
                alert_on_health_failure: boolean;
            } | undefined;
            configuration?: Record<string, any> | undefined;
            schedule?: {
                timezone: string;
                interval: number;
                skip_windows?: {
                    start: string;
                    end: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                max_executions_per_hour?: number | undefined;
            } | undefined;
            alert_template?: {
                message?: string | undefined;
                title?: string | undefined;
                include_context?: {
                    transaction_details: boolean;
                    risk_analysis: boolean;
                    historical_comparison: boolean;
                    cross_reference_alerts: boolean;
                    price_impact: boolean;
                } | undefined;
            } | undefined;
            automated_responses?: {
                triggers?: {
                    condition: string;
                    actions: {
                        type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                        severity?: "critical" | "high" | "medium" | "low" | undefined;
                        channels?: string[] | undefined;
                        duration?: string | undefined;
                        for_operations?: string[] | undefined;
                        webhook_url?: string | undefined;
                        risk_score_adjustment?: number | undefined;
                    }[];
                }[] | undefined;
            } | undefined;
            testing?: {
                test_mode: boolean;
                test_scenarios?: {
                    name: string;
                    mock_data: Record<string, any>;
                    expected_result: "error" | "alert_triggered" | "no_alert";
                    description?: string | undefined;
                }[] | undefined;
            } | undefined;
            integrations?: {
                external_apis?: {
                    name: string;
                    url: string;
                    auth_type: "none" | "api_key" | "bearer" | "basic";
                    timeout: string;
                    headers?: Record<string, string> | undefined;
                }[] | undefined;
                databases?: {
                    name: string;
                    type: "postgresql" | "mysql" | "mongodb" | "redis";
                    connection_string_env: string;
                }[] | undefined;
                message_queues?: {
                    name: string;
                    type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
                    queue_name: string;
                    config?: Record<string, any> | undefined;
                }[] | undefined;
            } | undefined;
        }> | undefined;
    }, {
        notification_channels?: Record<string, {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | (({
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        }) & {
            testing?: {
                test_mode?: boolean | undefined;
                test_endpoint?: string | undefined;
            } | undefined;
        })> | undefined;
        watchlists?: Record<string, {
            name: string;
            assets: {
                type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
                chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
                address: string;
                symbol?: string | undefined;
                name?: string | undefined;
                tags?: string[] | undefined;
            }[];
            options?: {
                maintenance_windows?: {
                    start: string;
                    end: string;
                    timezone?: string | undefined;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                thresholds?: {
                    balance_change_major?: number | undefined;
                    balance_change_critical?: number | undefined;
                    transaction_count_unusual?: number | undefined;
                    value_at_risk?: number | undefined;
                } | undefined;
                enhanced_monitoring?: {
                    risk_scoring?: boolean | undefined;
                    pattern_detection?: boolean | undefined;
                    cross_chain_tracking?: boolean | undefined;
                    sentiment_analysis?: boolean | undefined;
                    compliance_monitoring?: boolean | undefined;
                } | undefined;
                priority?: "critical" | "high" | "medium" | "low" | undefined;
                auto_disable_on_error?: boolean | undefined;
            } | undefined;
            tags?: Record<string, string> | undefined;
            enabled?: boolean | undefined;
            description?: string | undefined;
            alert_policy_id?: string | undefined;
            alert_config?: {
                enabled?: boolean | undefined;
                severity_threshold?: "critical" | "high" | "medium" | "low" | undefined;
                notification_channels?: string[] | undefined;
                rules?: {
                    conditions: {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }[];
                    asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                    enabled?: boolean | undefined;
                }[] | undefined;
            } | undefined;
            monitoring?: {
                check_interval?: number | undefined;
                collect_history?: boolean | undefined;
                retention_days?: number | undefined;
            } | undefined;
        }> | undefined;
        custom_agents?: Record<string, {
            name: string;
            type: "address_balance_change" | "position_health_deviation" | "large_transaction_monitor" | "contract_interaction_monitor" | "token_transfer_monitor" | "defi_position_monitor" | "governance_proposal_monitor" | "bridge_transaction_monitor" | "yield_farming_monitor" | "liquidation_risk_monitor" | "flash_loan_monitor" | "mev_activity_monitor" | "whale_movement_monitor" | "unusual_pattern_detector" | "custom_webhook_trigger";
            chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
            code?: string | undefined;
            tags?: Record<string, string> | undefined;
            severity?: "critical" | "high" | "medium" | "low" | undefined;
            enabled?: boolean | undefined;
            notification_channels?: string[] | undefined;
            description?: string | undefined;
            monitoring?: {
                collect_metrics?: boolean | undefined;
                max_execution_time?: string | undefined;
                max_memory_usage?: string | undefined;
                retry_on_failure?: boolean | undefined;
                max_retries?: number | undefined;
                retry_delay?: string | undefined;
                health_check_interval?: string | undefined;
                alert_on_health_failure?: boolean | undefined;
            } | undefined;
            configuration?: Record<string, any> | undefined;
            schedule?: {
                timezone?: string | undefined;
                interval?: number | undefined;
                skip_windows?: {
                    start: string;
                    end: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                max_executions_per_hour?: number | undefined;
            } | undefined;
            alert_template?: {
                message?: string | undefined;
                title?: string | undefined;
                include_context?: {
                    transaction_details?: boolean | undefined;
                    risk_analysis?: boolean | undefined;
                    historical_comparison?: boolean | undefined;
                    cross_reference_alerts?: boolean | undefined;
                    price_impact?: boolean | undefined;
                } | undefined;
            } | undefined;
            automated_responses?: {
                triggers?: {
                    condition: string;
                    actions: {
                        type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                        severity?: "critical" | "high" | "medium" | "low" | undefined;
                        channels?: string[] | undefined;
                        duration?: string | undefined;
                        for_operations?: string[] | undefined;
                        webhook_url?: string | undefined;
                        risk_score_adjustment?: number | undefined;
                    }[];
                }[] | undefined;
            } | undefined;
            testing?: {
                test_mode?: boolean | undefined;
                test_scenarios?: {
                    name: string;
                    mock_data: Record<string, any>;
                    expected_result: "error" | "alert_triggered" | "no_alert";
                    description?: string | undefined;
                }[] | undefined;
            } | undefined;
            integrations?: {
                external_apis?: {
                    name: string;
                    url: string;
                    auth_type?: "none" | "api_key" | "bearer" | "basic" | undefined;
                    timeout?: string | undefined;
                    headers?: Record<string, string> | undefined;
                }[] | undefined;
                databases?: {
                    name: string;
                    type: "postgresql" | "mysql" | "mongodb" | "redis";
                    connection_string_env: string;
                }[] | undefined;
                message_queues?: {
                    name: string;
                    type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
                    queue_name: string;
                    config?: Record<string, any> | undefined;
                }[] | undefined;
            } | undefined;
        }> | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    config?: {
        version: string;
        validation?: {
            strict_mode: boolean;
            allow_unknown_properties: boolean;
            validate_references: boolean;
        } | undefined;
        updated_at?: string | undefined;
        author?: string | undefined;
        imports?: string[] | undefined;
    } | undefined;
    global?: {
        integrations?: {
            hypernative?: {
                timeout: string;
                retry_attempts: number;
                base_url?: string | undefined;
                rate_limit?: {
                    requests_per_minute: number;
                    burst_limit: number;
                } | undefined;
            } | undefined;
            external_services?: Record<string, {
                auth_type: "none" | "api_key" | "bearer" | "basic";
                timeout: string;
                base_url: string;
                headers?: Record<string, string> | undefined;
            }> | undefined;
        } | undefined;
        project?: {
            name: string;
            environment: "development" | "staging" | "production";
            tags?: Record<string, string> | undefined;
            description?: string | undefined;
            version?: string | undefined;
        } | undefined;
        defaults?: {
            severity_threshold: "critical" | "high" | "medium" | "low";
            timezone: string;
            notification_channels?: string[] | undefined;
            monitoring?: {
                collect_metrics: boolean;
                health_checks_enabled: boolean;
                performance_tracking: boolean;
            } | undefined;
            retry_config?: {
                max_retries: number;
                retry_delay: string;
                exponential_backoff: boolean;
            } | undefined;
            validation_limits?: {
                max_file_size: number;
                max_assets_per_watchlist: number;
                max_resources_total: number;
                max_name_length: number;
                max_description_length: number;
                max_agent_code_length: number;
            } | undefined;
        } | undefined;
        env?: {
            validation?: Record<string, {
                message?: string | undefined;
                pattern?: string | undefined;
            }> | undefined;
            required?: string[] | undefined;
            optional?: Record<string, string> | undefined;
        } | undefined;
    } | undefined;
    resources?: {
        notification_channels?: Record<string, {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | (({
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        }) & {
            testing?: {
                test_mode: boolean;
                test_endpoint?: string | undefined;
            } | undefined;
        })> | undefined;
        watchlists?: Record<string, {
            name: string;
            enabled: boolean;
            assets: {
                type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
                chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
                address: string;
                symbol?: string | undefined;
                name?: string | undefined;
                tags?: string[] | undefined;
            }[];
            options?: {
                auto_disable_on_error: boolean;
                maintenance_windows?: {
                    start: string;
                    end: string;
                    timezone: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                thresholds?: {
                    balance_change_major?: number | undefined;
                    balance_change_critical?: number | undefined;
                    transaction_count_unusual?: number | undefined;
                    value_at_risk?: number | undefined;
                } | undefined;
                enhanced_monitoring?: {
                    risk_scoring: boolean;
                    pattern_detection: boolean;
                    cross_chain_tracking: boolean;
                    sentiment_analysis: boolean;
                    compliance_monitoring: boolean;
                } | undefined;
                priority?: "critical" | "high" | "medium" | "low" | undefined;
            } | undefined;
            tags?: Record<string, string> | undefined;
            description?: string | undefined;
            alert_policy_id?: string | undefined;
            alert_config?: {
                enabled: boolean;
                severity_threshold: "critical" | "high" | "medium" | "low";
                notification_channels?: string[] | undefined;
                rules?: {
                    conditions: {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }[];
                    enabled: boolean;
                    asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                }[] | undefined;
            } | undefined;
            monitoring?: {
                check_interval: number;
                collect_history: boolean;
                retention_days: number;
            } | undefined;
        }> | undefined;
        custom_agents?: Record<string, {
            name: string;
            type: "address_balance_change" | "position_health_deviation" | "large_transaction_monitor" | "contract_interaction_monitor" | "token_transfer_monitor" | "defi_position_monitor" | "governance_proposal_monitor" | "bridge_transaction_monitor" | "yield_farming_monitor" | "liquidation_risk_monitor" | "flash_loan_monitor" | "mev_activity_monitor" | "whale_movement_monitor" | "unusual_pattern_detector" | "custom_webhook_trigger";
            chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
            severity: "critical" | "high" | "medium" | "low";
            enabled: boolean;
            code?: string | undefined;
            tags?: Record<string, string> | undefined;
            notification_channels?: string[] | undefined;
            description?: string | undefined;
            monitoring?: {
                collect_metrics: boolean;
                max_execution_time: string;
                max_memory_usage: string;
                retry_on_failure: boolean;
                max_retries: number;
                retry_delay: string;
                health_check_interval: string;
                alert_on_health_failure: boolean;
            } | undefined;
            configuration?: Record<string, any> | undefined;
            schedule?: {
                timezone: string;
                interval: number;
                skip_windows?: {
                    start: string;
                    end: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                max_executions_per_hour?: number | undefined;
            } | undefined;
            alert_template?: {
                message?: string | undefined;
                title?: string | undefined;
                include_context?: {
                    transaction_details: boolean;
                    risk_analysis: boolean;
                    historical_comparison: boolean;
                    cross_reference_alerts: boolean;
                    price_impact: boolean;
                } | undefined;
            } | undefined;
            automated_responses?: {
                triggers?: {
                    condition: string;
                    actions: {
                        type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                        severity?: "critical" | "high" | "medium" | "low" | undefined;
                        channels?: string[] | undefined;
                        duration?: string | undefined;
                        for_operations?: string[] | undefined;
                        webhook_url?: string | undefined;
                        risk_score_adjustment?: number | undefined;
                    }[];
                }[] | undefined;
            } | undefined;
            testing?: {
                test_mode: boolean;
                test_scenarios?: {
                    name: string;
                    mock_data: Record<string, any>;
                    expected_result: "error" | "alert_triggered" | "no_alert";
                    description?: string | undefined;
                }[] | undefined;
            } | undefined;
            integrations?: {
                external_apis?: {
                    name: string;
                    url: string;
                    auth_type: "none" | "api_key" | "bearer" | "basic";
                    timeout: string;
                    headers?: Record<string, string> | undefined;
                }[] | undefined;
                databases?: {
                    name: string;
                    type: "postgresql" | "mysql" | "mongodb" | "redis";
                    connection_string_env: string;
                }[] | undefined;
                message_queues?: {
                    name: string;
                    type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
                    queue_name: string;
                    config?: Record<string, any> | undefined;
                }[] | undefined;
            } | undefined;
        }> | undefined;
    } | undefined;
}, {
    config?: {
        validation?: {
            strict_mode?: boolean | undefined;
            allow_unknown_properties?: boolean | undefined;
            validate_references?: boolean | undefined;
        } | undefined;
        version?: string | undefined;
        updated_at?: string | undefined;
        author?: string | undefined;
        imports?: string[] | undefined;
    } | undefined;
    global?: {
        integrations?: {
            hypernative?: {
                timeout?: string | undefined;
                base_url?: string | undefined;
                retry_attempts?: number | undefined;
                rate_limit?: {
                    requests_per_minute?: number | undefined;
                    burst_limit?: number | undefined;
                } | undefined;
            } | undefined;
            external_services?: Record<string, {
                base_url: string;
                auth_type?: "none" | "api_key" | "bearer" | "basic" | undefined;
                timeout?: string | undefined;
                headers?: Record<string, string> | undefined;
            }> | undefined;
        } | undefined;
        project?: {
            name: string;
            tags?: Record<string, string> | undefined;
            description?: string | undefined;
            version?: string | undefined;
            environment?: "development" | "staging" | "production" | undefined;
        } | undefined;
        defaults?: {
            severity_threshold?: "critical" | "high" | "medium" | "low" | undefined;
            notification_channels?: string[] | undefined;
            timezone?: string | undefined;
            monitoring?: {
                collect_metrics?: boolean | undefined;
                health_checks_enabled?: boolean | undefined;
                performance_tracking?: boolean | undefined;
            } | undefined;
            retry_config?: {
                max_retries?: number | undefined;
                retry_delay?: string | undefined;
                exponential_backoff?: boolean | undefined;
            } | undefined;
            validation_limits?: {
                max_file_size?: number | undefined;
                max_assets_per_watchlist?: number | undefined;
                max_resources_total?: number | undefined;
                max_name_length?: number | undefined;
                max_description_length?: number | undefined;
                max_agent_code_length?: number | undefined;
            } | undefined;
        } | undefined;
        env?: {
            validation?: Record<string, {
                message?: string | undefined;
                pattern?: string | undefined;
            }> | undefined;
            required?: string[] | undefined;
            optional?: Record<string, string> | undefined;
        } | undefined;
    } | undefined;
    resources?: {
        notification_channels?: Record<string, {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | (({
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        }) & {
            testing?: {
                test_mode?: boolean | undefined;
                test_endpoint?: string | undefined;
            } | undefined;
        })> | undefined;
        watchlists?: Record<string, {
            name: string;
            assets: {
                type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
                chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
                address: string;
                symbol?: string | undefined;
                name?: string | undefined;
                tags?: string[] | undefined;
            }[];
            options?: {
                maintenance_windows?: {
                    start: string;
                    end: string;
                    timezone?: string | undefined;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                thresholds?: {
                    balance_change_major?: number | undefined;
                    balance_change_critical?: number | undefined;
                    transaction_count_unusual?: number | undefined;
                    value_at_risk?: number | undefined;
                } | undefined;
                enhanced_monitoring?: {
                    risk_scoring?: boolean | undefined;
                    pattern_detection?: boolean | undefined;
                    cross_chain_tracking?: boolean | undefined;
                    sentiment_analysis?: boolean | undefined;
                    compliance_monitoring?: boolean | undefined;
                } | undefined;
                priority?: "critical" | "high" | "medium" | "low" | undefined;
                auto_disable_on_error?: boolean | undefined;
            } | undefined;
            tags?: Record<string, string> | undefined;
            enabled?: boolean | undefined;
            description?: string | undefined;
            alert_policy_id?: string | undefined;
            alert_config?: {
                enabled?: boolean | undefined;
                severity_threshold?: "critical" | "high" | "medium" | "low" | undefined;
                notification_channels?: string[] | undefined;
                rules?: {
                    conditions: {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }[];
                    asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                    enabled?: boolean | undefined;
                }[] | undefined;
            } | undefined;
            monitoring?: {
                check_interval?: number | undefined;
                collect_history?: boolean | undefined;
                retention_days?: number | undefined;
            } | undefined;
        }> | undefined;
        custom_agents?: Record<string, {
            name: string;
            type: "address_balance_change" | "position_health_deviation" | "large_transaction_monitor" | "contract_interaction_monitor" | "token_transfer_monitor" | "defi_position_monitor" | "governance_proposal_monitor" | "bridge_transaction_monitor" | "yield_farming_monitor" | "liquidation_risk_monitor" | "flash_loan_monitor" | "mev_activity_monitor" | "whale_movement_monitor" | "unusual_pattern_detector" | "custom_webhook_trigger";
            chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
            code?: string | undefined;
            tags?: Record<string, string> | undefined;
            severity?: "critical" | "high" | "medium" | "low" | undefined;
            enabled?: boolean | undefined;
            notification_channels?: string[] | undefined;
            description?: string | undefined;
            monitoring?: {
                collect_metrics?: boolean | undefined;
                max_execution_time?: string | undefined;
                max_memory_usage?: string | undefined;
                retry_on_failure?: boolean | undefined;
                max_retries?: number | undefined;
                retry_delay?: string | undefined;
                health_check_interval?: string | undefined;
                alert_on_health_failure?: boolean | undefined;
            } | undefined;
            configuration?: Record<string, any> | undefined;
            schedule?: {
                timezone?: string | undefined;
                interval?: number | undefined;
                skip_windows?: {
                    start: string;
                    end: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                max_executions_per_hour?: number | undefined;
            } | undefined;
            alert_template?: {
                message?: string | undefined;
                title?: string | undefined;
                include_context?: {
                    transaction_details?: boolean | undefined;
                    risk_analysis?: boolean | undefined;
                    historical_comparison?: boolean | undefined;
                    cross_reference_alerts?: boolean | undefined;
                    price_impact?: boolean | undefined;
                } | undefined;
            } | undefined;
            automated_responses?: {
                triggers?: {
                    condition: string;
                    actions: {
                        type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                        severity?: "critical" | "high" | "medium" | "low" | undefined;
                        channels?: string[] | undefined;
                        duration?: string | undefined;
                        for_operations?: string[] | undefined;
                        webhook_url?: string | undefined;
                        risk_score_adjustment?: number | undefined;
                    }[];
                }[] | undefined;
            } | undefined;
            testing?: {
                test_mode?: boolean | undefined;
                test_scenarios?: {
                    name: string;
                    mock_data: Record<string, any>;
                    expected_result: "error" | "alert_triggered" | "no_alert";
                    description?: string | undefined;
                }[] | undefined;
            } | undefined;
            integrations?: {
                external_apis?: {
                    name: string;
                    url: string;
                    auth_type?: "none" | "api_key" | "bearer" | "basic" | undefined;
                    timeout?: string | undefined;
                    headers?: Record<string, string> | undefined;
                }[] | undefined;
                databases?: {
                    name: string;
                    type: "postgresql" | "mysql" | "mongodb" | "redis";
                    connection_string_env: string;
                }[] | undefined;
                message_queues?: {
                    name: string;
                    type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
                    queue_name: string;
                    config?: Record<string, any> | undefined;
                }[] | undefined;
            } | undefined;
        }> | undefined;
    } | undefined;
}>, {
    config?: {
        version: string;
        validation?: {
            strict_mode: boolean;
            allow_unknown_properties: boolean;
            validate_references: boolean;
        } | undefined;
        updated_at?: string | undefined;
        author?: string | undefined;
        imports?: string[] | undefined;
    } | undefined;
    global?: {
        integrations?: {
            hypernative?: {
                timeout: string;
                retry_attempts: number;
                base_url?: string | undefined;
                rate_limit?: {
                    requests_per_minute: number;
                    burst_limit: number;
                } | undefined;
            } | undefined;
            external_services?: Record<string, {
                auth_type: "none" | "api_key" | "bearer" | "basic";
                timeout: string;
                base_url: string;
                headers?: Record<string, string> | undefined;
            }> | undefined;
        } | undefined;
        project?: {
            name: string;
            environment: "development" | "staging" | "production";
            tags?: Record<string, string> | undefined;
            description?: string | undefined;
            version?: string | undefined;
        } | undefined;
        defaults?: {
            severity_threshold: "critical" | "high" | "medium" | "low";
            timezone: string;
            notification_channels?: string[] | undefined;
            monitoring?: {
                collect_metrics: boolean;
                health_checks_enabled: boolean;
                performance_tracking: boolean;
            } | undefined;
            retry_config?: {
                max_retries: number;
                retry_delay: string;
                exponential_backoff: boolean;
            } | undefined;
            validation_limits?: {
                max_file_size: number;
                max_assets_per_watchlist: number;
                max_resources_total: number;
                max_name_length: number;
                max_description_length: number;
                max_agent_code_length: number;
            } | undefined;
        } | undefined;
        env?: {
            validation?: Record<string, {
                message?: string | undefined;
                pattern?: string | undefined;
            }> | undefined;
            required?: string[] | undefined;
            optional?: Record<string, string> | undefined;
        } | undefined;
    } | undefined;
    resources?: {
        notification_channels?: Record<string, {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | (({
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        }) & {
            testing?: {
                test_mode: boolean;
                test_endpoint?: string | undefined;
            } | undefined;
        })> | undefined;
        watchlists?: Record<string, {
            name: string;
            enabled: boolean;
            assets: {
                type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
                chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
                address: string;
                symbol?: string | undefined;
                name?: string | undefined;
                tags?: string[] | undefined;
            }[];
            options?: {
                auto_disable_on_error: boolean;
                maintenance_windows?: {
                    start: string;
                    end: string;
                    timezone: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                thresholds?: {
                    balance_change_major?: number | undefined;
                    balance_change_critical?: number | undefined;
                    transaction_count_unusual?: number | undefined;
                    value_at_risk?: number | undefined;
                } | undefined;
                enhanced_monitoring?: {
                    risk_scoring: boolean;
                    pattern_detection: boolean;
                    cross_chain_tracking: boolean;
                    sentiment_analysis: boolean;
                    compliance_monitoring: boolean;
                } | undefined;
                priority?: "critical" | "high" | "medium" | "low" | undefined;
            } | undefined;
            tags?: Record<string, string> | undefined;
            description?: string | undefined;
            alert_policy_id?: string | undefined;
            alert_config?: {
                enabled: boolean;
                severity_threshold: "critical" | "high" | "medium" | "low";
                notification_channels?: string[] | undefined;
                rules?: {
                    conditions: {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }[];
                    enabled: boolean;
                    asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                }[] | undefined;
            } | undefined;
            monitoring?: {
                check_interval: number;
                collect_history: boolean;
                retention_days: number;
            } | undefined;
        }> | undefined;
        custom_agents?: Record<string, {
            name: string;
            type: "address_balance_change" | "position_health_deviation" | "large_transaction_monitor" | "contract_interaction_monitor" | "token_transfer_monitor" | "defi_position_monitor" | "governance_proposal_monitor" | "bridge_transaction_monitor" | "yield_farming_monitor" | "liquidation_risk_monitor" | "flash_loan_monitor" | "mev_activity_monitor" | "whale_movement_monitor" | "unusual_pattern_detector" | "custom_webhook_trigger";
            chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
            severity: "critical" | "high" | "medium" | "low";
            enabled: boolean;
            code?: string | undefined;
            tags?: Record<string, string> | undefined;
            notification_channels?: string[] | undefined;
            description?: string | undefined;
            monitoring?: {
                collect_metrics: boolean;
                max_execution_time: string;
                max_memory_usage: string;
                retry_on_failure: boolean;
                max_retries: number;
                retry_delay: string;
                health_check_interval: string;
                alert_on_health_failure: boolean;
            } | undefined;
            configuration?: Record<string, any> | undefined;
            schedule?: {
                timezone: string;
                interval: number;
                skip_windows?: {
                    start: string;
                    end: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                max_executions_per_hour?: number | undefined;
            } | undefined;
            alert_template?: {
                message?: string | undefined;
                title?: string | undefined;
                include_context?: {
                    transaction_details: boolean;
                    risk_analysis: boolean;
                    historical_comparison: boolean;
                    cross_reference_alerts: boolean;
                    price_impact: boolean;
                } | undefined;
            } | undefined;
            automated_responses?: {
                triggers?: {
                    condition: string;
                    actions: {
                        type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                        severity?: "critical" | "high" | "medium" | "low" | undefined;
                        channels?: string[] | undefined;
                        duration?: string | undefined;
                        for_operations?: string[] | undefined;
                        webhook_url?: string | undefined;
                        risk_score_adjustment?: number | undefined;
                    }[];
                }[] | undefined;
            } | undefined;
            testing?: {
                test_mode: boolean;
                test_scenarios?: {
                    name: string;
                    mock_data: Record<string, any>;
                    expected_result: "error" | "alert_triggered" | "no_alert";
                    description?: string | undefined;
                }[] | undefined;
            } | undefined;
            integrations?: {
                external_apis?: {
                    name: string;
                    url: string;
                    auth_type: "none" | "api_key" | "bearer" | "basic";
                    timeout: string;
                    headers?: Record<string, string> | undefined;
                }[] | undefined;
                databases?: {
                    name: string;
                    type: "postgresql" | "mysql" | "mongodb" | "redis";
                    connection_string_env: string;
                }[] | undefined;
                message_queues?: {
                    name: string;
                    type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
                    queue_name: string;
                    config?: Record<string, any> | undefined;
                }[] | undefined;
            } | undefined;
        }> | undefined;
    } | undefined;
}, {
    config?: {
        validation?: {
            strict_mode?: boolean | undefined;
            allow_unknown_properties?: boolean | undefined;
            validate_references?: boolean | undefined;
        } | undefined;
        version?: string | undefined;
        updated_at?: string | undefined;
        author?: string | undefined;
        imports?: string[] | undefined;
    } | undefined;
    global?: {
        integrations?: {
            hypernative?: {
                timeout?: string | undefined;
                base_url?: string | undefined;
                retry_attempts?: number | undefined;
                rate_limit?: {
                    requests_per_minute?: number | undefined;
                    burst_limit?: number | undefined;
                } | undefined;
            } | undefined;
            external_services?: Record<string, {
                base_url: string;
                auth_type?: "none" | "api_key" | "bearer" | "basic" | undefined;
                timeout?: string | undefined;
                headers?: Record<string, string> | undefined;
            }> | undefined;
        } | undefined;
        project?: {
            name: string;
            tags?: Record<string, string> | undefined;
            description?: string | undefined;
            version?: string | undefined;
            environment?: "development" | "staging" | "production" | undefined;
        } | undefined;
        defaults?: {
            severity_threshold?: "critical" | "high" | "medium" | "low" | undefined;
            notification_channels?: string[] | undefined;
            timezone?: string | undefined;
            monitoring?: {
                collect_metrics?: boolean | undefined;
                health_checks_enabled?: boolean | undefined;
                performance_tracking?: boolean | undefined;
            } | undefined;
            retry_config?: {
                max_retries?: number | undefined;
                retry_delay?: string | undefined;
                exponential_backoff?: boolean | undefined;
            } | undefined;
            validation_limits?: {
                max_file_size?: number | undefined;
                max_assets_per_watchlist?: number | undefined;
                max_resources_total?: number | undefined;
                max_name_length?: number | undefined;
                max_description_length?: number | undefined;
                max_agent_code_length?: number | undefined;
            } | undefined;
        } | undefined;
        env?: {
            validation?: Record<string, {
                message?: string | undefined;
                pattern?: string | undefined;
            }> | undefined;
            required?: string[] | undefined;
            optional?: Record<string, string> | undefined;
        } | undefined;
    } | undefined;
    resources?: {
        notification_channels?: Record<string, {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | (({
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        }) & {
            testing?: {
                test_mode?: boolean | undefined;
                test_endpoint?: string | undefined;
            } | undefined;
        })> | undefined;
        watchlists?: Record<string, {
            name: string;
            assets: {
                type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
                chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
                address: string;
                symbol?: string | undefined;
                name?: string | undefined;
                tags?: string[] | undefined;
            }[];
            options?: {
                maintenance_windows?: {
                    start: string;
                    end: string;
                    timezone?: string | undefined;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                thresholds?: {
                    balance_change_major?: number | undefined;
                    balance_change_critical?: number | undefined;
                    transaction_count_unusual?: number | undefined;
                    value_at_risk?: number | undefined;
                } | undefined;
                enhanced_monitoring?: {
                    risk_scoring?: boolean | undefined;
                    pattern_detection?: boolean | undefined;
                    cross_chain_tracking?: boolean | undefined;
                    sentiment_analysis?: boolean | undefined;
                    compliance_monitoring?: boolean | undefined;
                } | undefined;
                priority?: "critical" | "high" | "medium" | "low" | undefined;
                auto_disable_on_error?: boolean | undefined;
            } | undefined;
            tags?: Record<string, string> | undefined;
            enabled?: boolean | undefined;
            description?: string | undefined;
            alert_policy_id?: string | undefined;
            alert_config?: {
                enabled?: boolean | undefined;
                severity_threshold?: "critical" | "high" | "medium" | "low" | undefined;
                notification_channels?: string[] | undefined;
                rules?: {
                    conditions: {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }[];
                    asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                    enabled?: boolean | undefined;
                }[] | undefined;
            } | undefined;
            monitoring?: {
                check_interval?: number | undefined;
                collect_history?: boolean | undefined;
                retention_days?: number | undefined;
            } | undefined;
        }> | undefined;
        custom_agents?: Record<string, {
            name: string;
            type: "address_balance_change" | "position_health_deviation" | "large_transaction_monitor" | "contract_interaction_monitor" | "token_transfer_monitor" | "defi_position_monitor" | "governance_proposal_monitor" | "bridge_transaction_monitor" | "yield_farming_monitor" | "liquidation_risk_monitor" | "flash_loan_monitor" | "mev_activity_monitor" | "whale_movement_monitor" | "unusual_pattern_detector" | "custom_webhook_trigger";
            chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
            code?: string | undefined;
            tags?: Record<string, string> | undefined;
            severity?: "critical" | "high" | "medium" | "low" | undefined;
            enabled?: boolean | undefined;
            notification_channels?: string[] | undefined;
            description?: string | undefined;
            monitoring?: {
                collect_metrics?: boolean | undefined;
                max_execution_time?: string | undefined;
                max_memory_usage?: string | undefined;
                retry_on_failure?: boolean | undefined;
                max_retries?: number | undefined;
                retry_delay?: string | undefined;
                health_check_interval?: string | undefined;
                alert_on_health_failure?: boolean | undefined;
            } | undefined;
            configuration?: Record<string, any> | undefined;
            schedule?: {
                timezone?: string | undefined;
                interval?: number | undefined;
                skip_windows?: {
                    start: string;
                    end: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                max_executions_per_hour?: number | undefined;
            } | undefined;
            alert_template?: {
                message?: string | undefined;
                title?: string | undefined;
                include_context?: {
                    transaction_details?: boolean | undefined;
                    risk_analysis?: boolean | undefined;
                    historical_comparison?: boolean | undefined;
                    cross_reference_alerts?: boolean | undefined;
                    price_impact?: boolean | undefined;
                } | undefined;
            } | undefined;
            automated_responses?: {
                triggers?: {
                    condition: string;
                    actions: {
                        type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                        severity?: "critical" | "high" | "medium" | "low" | undefined;
                        channels?: string[] | undefined;
                        duration?: string | undefined;
                        for_operations?: string[] | undefined;
                        webhook_url?: string | undefined;
                        risk_score_adjustment?: number | undefined;
                    }[];
                }[] | undefined;
            } | undefined;
            testing?: {
                test_mode?: boolean | undefined;
                test_scenarios?: {
                    name: string;
                    mock_data: Record<string, any>;
                    expected_result: "error" | "alert_triggered" | "no_alert";
                    description?: string | undefined;
                }[] | undefined;
            } | undefined;
            integrations?: {
                external_apis?: {
                    name: string;
                    url: string;
                    auth_type?: "none" | "api_key" | "bearer" | "basic" | undefined;
                    timeout?: string | undefined;
                    headers?: Record<string, string> | undefined;
                }[] | undefined;
                databases?: {
                    name: string;
                    type: "postgresql" | "mysql" | "mongodb" | "redis";
                    connection_string_env: string;
                }[] | undefined;
                message_queues?: {
                    name: string;
                    type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
                    queue_name: string;
                    config?: Record<string, any> | undefined;
                }[] | undefined;
            } | undefined;
        }> | undefined;
    } | undefined;
}>;
export declare const parsedConfigSchema: z.ZodObject<{
    global: z.ZodOptional<z.ZodObject<{
        project: z.ZodOptional<z.ZodObject<{
            name: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            version: z.ZodOptional<z.ZodString>;
            environment: z.ZodDefault<z.ZodEnum<["development", "staging", "production"]>>;
            tags: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            environment: "development" | "staging" | "production";
            tags?: Record<string, string> | undefined;
            description?: string | undefined;
            version?: string | undefined;
        }, {
            name: string;
            tags?: Record<string, string> | undefined;
            description?: string | undefined;
            version?: string | undefined;
            environment?: "development" | "staging" | "production" | undefined;
        }>>;
        defaults: z.ZodOptional<z.ZodObject<{
            notification_channels: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            severity_threshold: z.ZodDefault<z.ZodEnum<["critical", "high", "medium", "low"]>>;
            timezone: z.ZodDefault<z.ZodString>;
            retry_config: z.ZodOptional<z.ZodObject<{
                max_retries: z.ZodDefault<z.ZodNumber>;
                retry_delay: z.ZodDefault<z.ZodString>;
                exponential_backoff: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                max_retries: number;
                retry_delay: string;
                exponential_backoff: boolean;
            }, {
                max_retries?: number | undefined;
                retry_delay?: string | undefined;
                exponential_backoff?: boolean | undefined;
            }>>;
            monitoring: z.ZodOptional<z.ZodObject<{
                collect_metrics: z.ZodDefault<z.ZodBoolean>;
                health_checks_enabled: z.ZodDefault<z.ZodBoolean>;
                performance_tracking: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                collect_metrics: boolean;
                health_checks_enabled: boolean;
                performance_tracking: boolean;
            }, {
                collect_metrics?: boolean | undefined;
                health_checks_enabled?: boolean | undefined;
                performance_tracking?: boolean | undefined;
            }>>;
            validation_limits: z.ZodOptional<z.ZodObject<{
                max_file_size: z.ZodDefault<z.ZodNumber>;
                max_assets_per_watchlist: z.ZodDefault<z.ZodNumber>;
                max_resources_total: z.ZodDefault<z.ZodNumber>;
                max_name_length: z.ZodDefault<z.ZodNumber>;
                max_description_length: z.ZodDefault<z.ZodNumber>;
                max_agent_code_length: z.ZodDefault<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                max_file_size: number;
                max_assets_per_watchlist: number;
                max_resources_total: number;
                max_name_length: number;
                max_description_length: number;
                max_agent_code_length: number;
            }, {
                max_file_size?: number | undefined;
                max_assets_per_watchlist?: number | undefined;
                max_resources_total?: number | undefined;
                max_name_length?: number | undefined;
                max_description_length?: number | undefined;
                max_agent_code_length?: number | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            severity_threshold: "critical" | "high" | "medium" | "low";
            timezone: string;
            notification_channels?: string[] | undefined;
            monitoring?: {
                collect_metrics: boolean;
                health_checks_enabled: boolean;
                performance_tracking: boolean;
            } | undefined;
            retry_config?: {
                max_retries: number;
                retry_delay: string;
                exponential_backoff: boolean;
            } | undefined;
            validation_limits?: {
                max_file_size: number;
                max_assets_per_watchlist: number;
                max_resources_total: number;
                max_name_length: number;
                max_description_length: number;
                max_agent_code_length: number;
            } | undefined;
        }, {
            severity_threshold?: "critical" | "high" | "medium" | "low" | undefined;
            notification_channels?: string[] | undefined;
            timezone?: string | undefined;
            monitoring?: {
                collect_metrics?: boolean | undefined;
                health_checks_enabled?: boolean | undefined;
                performance_tracking?: boolean | undefined;
            } | undefined;
            retry_config?: {
                max_retries?: number | undefined;
                retry_delay?: string | undefined;
                exponential_backoff?: boolean | undefined;
            } | undefined;
            validation_limits?: {
                max_file_size?: number | undefined;
                max_assets_per_watchlist?: number | undefined;
                max_resources_total?: number | undefined;
                max_name_length?: number | undefined;
                max_description_length?: number | undefined;
                max_agent_code_length?: number | undefined;
            } | undefined;
        }>>;
        env: z.ZodOptional<z.ZodObject<{
            required: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            optional: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            validation: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                pattern: z.ZodOptional<z.ZodString>;
                message: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                message?: string | undefined;
                pattern?: string | undefined;
            }, {
                message?: string | undefined;
                pattern?: string | undefined;
            }>>>;
        }, "strip", z.ZodTypeAny, {
            validation?: Record<string, {
                message?: string | undefined;
                pattern?: string | undefined;
            }> | undefined;
            required?: string[] | undefined;
            optional?: Record<string, string> | undefined;
        }, {
            validation?: Record<string, {
                message?: string | undefined;
                pattern?: string | undefined;
            }> | undefined;
            required?: string[] | undefined;
            optional?: Record<string, string> | undefined;
        }>>;
        integrations: z.ZodOptional<z.ZodObject<{
            hypernative: z.ZodOptional<z.ZodObject<{
                base_url: z.ZodOptional<z.ZodString>;
                timeout: z.ZodDefault<z.ZodString>;
                retry_attempts: z.ZodDefault<z.ZodNumber>;
                rate_limit: z.ZodOptional<z.ZodObject<{
                    requests_per_minute: z.ZodDefault<z.ZodNumber>;
                    burst_limit: z.ZodDefault<z.ZodNumber>;
                }, "strip", z.ZodTypeAny, {
                    requests_per_minute: number;
                    burst_limit: number;
                }, {
                    requests_per_minute?: number | undefined;
                    burst_limit?: number | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                timeout: string;
                retry_attempts: number;
                base_url?: string | undefined;
                rate_limit?: {
                    requests_per_minute: number;
                    burst_limit: number;
                } | undefined;
            }, {
                timeout?: string | undefined;
                base_url?: string | undefined;
                retry_attempts?: number | undefined;
                rate_limit?: {
                    requests_per_minute?: number | undefined;
                    burst_limit?: number | undefined;
                } | undefined;
            }>>;
            external_services: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                base_url: z.ZodString;
                auth_type: z.ZodDefault<z.ZodEnum<["none", "api_key", "bearer", "basic"]>>;
                timeout: z.ZodDefault<z.ZodString>;
                headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                auth_type: "none" | "api_key" | "bearer" | "basic";
                timeout: string;
                base_url: string;
                headers?: Record<string, string> | undefined;
            }, {
                base_url: string;
                auth_type?: "none" | "api_key" | "bearer" | "basic" | undefined;
                timeout?: string | undefined;
                headers?: Record<string, string> | undefined;
            }>>>;
        }, "strip", z.ZodTypeAny, {
            hypernative?: {
                timeout: string;
                retry_attempts: number;
                base_url?: string | undefined;
                rate_limit?: {
                    requests_per_minute: number;
                    burst_limit: number;
                } | undefined;
            } | undefined;
            external_services?: Record<string, {
                auth_type: "none" | "api_key" | "bearer" | "basic";
                timeout: string;
                base_url: string;
                headers?: Record<string, string> | undefined;
            }> | undefined;
        }, {
            hypernative?: {
                timeout?: string | undefined;
                base_url?: string | undefined;
                retry_attempts?: number | undefined;
                rate_limit?: {
                    requests_per_minute?: number | undefined;
                    burst_limit?: number | undefined;
                } | undefined;
            } | undefined;
            external_services?: Record<string, {
                base_url: string;
                auth_type?: "none" | "api_key" | "bearer" | "basic" | undefined;
                timeout?: string | undefined;
                headers?: Record<string, string> | undefined;
            }> | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        integrations?: {
            hypernative?: {
                timeout: string;
                retry_attempts: number;
                base_url?: string | undefined;
                rate_limit?: {
                    requests_per_minute: number;
                    burst_limit: number;
                } | undefined;
            } | undefined;
            external_services?: Record<string, {
                auth_type: "none" | "api_key" | "bearer" | "basic";
                timeout: string;
                base_url: string;
                headers?: Record<string, string> | undefined;
            }> | undefined;
        } | undefined;
        project?: {
            name: string;
            environment: "development" | "staging" | "production";
            tags?: Record<string, string> | undefined;
            description?: string | undefined;
            version?: string | undefined;
        } | undefined;
        defaults?: {
            severity_threshold: "critical" | "high" | "medium" | "low";
            timezone: string;
            notification_channels?: string[] | undefined;
            monitoring?: {
                collect_metrics: boolean;
                health_checks_enabled: boolean;
                performance_tracking: boolean;
            } | undefined;
            retry_config?: {
                max_retries: number;
                retry_delay: string;
                exponential_backoff: boolean;
            } | undefined;
            validation_limits?: {
                max_file_size: number;
                max_assets_per_watchlist: number;
                max_resources_total: number;
                max_name_length: number;
                max_description_length: number;
                max_agent_code_length: number;
            } | undefined;
        } | undefined;
        env?: {
            validation?: Record<string, {
                message?: string | undefined;
                pattern?: string | undefined;
            }> | undefined;
            required?: string[] | undefined;
            optional?: Record<string, string> | undefined;
        } | undefined;
    }, {
        integrations?: {
            hypernative?: {
                timeout?: string | undefined;
                base_url?: string | undefined;
                retry_attempts?: number | undefined;
                rate_limit?: {
                    requests_per_minute?: number | undefined;
                    burst_limit?: number | undefined;
                } | undefined;
            } | undefined;
            external_services?: Record<string, {
                base_url: string;
                auth_type?: "none" | "api_key" | "bearer" | "basic" | undefined;
                timeout?: string | undefined;
                headers?: Record<string, string> | undefined;
            }> | undefined;
        } | undefined;
        project?: {
            name: string;
            tags?: Record<string, string> | undefined;
            description?: string | undefined;
            version?: string | undefined;
            environment?: "development" | "staging" | "production" | undefined;
        } | undefined;
        defaults?: {
            severity_threshold?: "critical" | "high" | "medium" | "low" | undefined;
            notification_channels?: string[] | undefined;
            timezone?: string | undefined;
            monitoring?: {
                collect_metrics?: boolean | undefined;
                health_checks_enabled?: boolean | undefined;
                performance_tracking?: boolean | undefined;
            } | undefined;
            retry_config?: {
                max_retries?: number | undefined;
                retry_delay?: string | undefined;
                exponential_backoff?: boolean | undefined;
            } | undefined;
            validation_limits?: {
                max_file_size?: number | undefined;
                max_assets_per_watchlist?: number | undefined;
                max_resources_total?: number | undefined;
                max_name_length?: number | undefined;
                max_description_length?: number | undefined;
                max_agent_code_length?: number | undefined;
            } | undefined;
        } | undefined;
        env?: {
            validation?: Record<string, {
                message?: string | undefined;
                pattern?: string | undefined;
            }> | undefined;
            required?: string[] | undefined;
            optional?: Record<string, string> | undefined;
        } | undefined;
    }>>;
    notification_channels: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodIntersection<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
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
    }>]>]>>>;
    watchlists: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodEffects<z.ZodObject<{
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        enabled: z.ZodDefault<z.ZodBoolean>;
        tags: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        assets: z.ZodArray<z.ZodObject<{
            chain: z.ZodEnum<["ethereum", "polygon", "bsc", "avalanche", "arbitrum", "optimism", "base", "fantom", "gnosis", "celo"]>;
            type: z.ZodEnum<["Wallet", "Protocol", "Token", "Contract", "Pool", "NFT"]>;
            address: z.ZodString;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodOptional<z.ZodString>;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
            chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
            address: string;
            symbol?: string | undefined;
            name?: string | undefined;
            tags?: string[] | undefined;
        }, {
            type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
            chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
            address: string;
            symbol?: string | undefined;
            name?: string | undefined;
            tags?: string[] | undefined;
        }>, "many">;
        alert_policy_id: z.ZodOptional<z.ZodString>;
        alert_config: z.ZodOptional<z.ZodObject<{
            severity_threshold: z.ZodDefault<z.ZodEnum<["critical", "high", "medium", "low"]>>;
            notification_channels: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            rules: z.ZodOptional<z.ZodArray<z.ZodObject<{
                asset_types: z.ZodOptional<z.ZodArray<z.ZodEnum<["Wallet", "Protocol", "Token", "Contract", "Pool", "NFT"]>, "many">>;
                conditions: z.ZodArray<z.ZodObject<{
                    type: z.ZodEnum<["balance_change", "transaction_volume", "unusual_activity", "security_incident", "governance_event", "price_change", "liquidity_change"]>;
                    threshold: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                    direction: z.ZodOptional<z.ZodEnum<["increase", "decrease", "both"]>>;
                    timeframe: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                    threshold: string | number;
                    direction?: "increase" | "decrease" | "both" | undefined;
                    timeframe?: string | undefined;
                }, {
                    type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                    threshold: string | number;
                    direction?: "increase" | "decrease" | "both" | undefined;
                    timeframe?: string | undefined;
                }>, "many">;
                severity: z.ZodOptional<z.ZodEnum<["critical", "high", "medium", "low"]>>;
                enabled: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                conditions: {
                    type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                    threshold: string | number;
                    direction?: "increase" | "decrease" | "both" | undefined;
                    timeframe?: string | undefined;
                }[];
                enabled: boolean;
                asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                severity?: "critical" | "high" | "medium" | "low" | undefined;
            }, {
                conditions: {
                    type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                    threshold: string | number;
                    direction?: "increase" | "decrease" | "both" | undefined;
                    timeframe?: string | undefined;
                }[];
                asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                severity?: "critical" | "high" | "medium" | "low" | undefined;
                enabled?: boolean | undefined;
            }>, "many">>;
            enabled: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            enabled: boolean;
            severity_threshold: "critical" | "high" | "medium" | "low";
            notification_channels?: string[] | undefined;
            rules?: {
                conditions: {
                    type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                    threshold: string | number;
                    direction?: "increase" | "decrease" | "both" | undefined;
                    timeframe?: string | undefined;
                }[];
                enabled: boolean;
                asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                severity?: "critical" | "high" | "medium" | "low" | undefined;
            }[] | undefined;
        }, {
            enabled?: boolean | undefined;
            severity_threshold?: "critical" | "high" | "medium" | "low" | undefined;
            notification_channels?: string[] | undefined;
            rules?: {
                conditions: {
                    type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                    threshold: string | number;
                    direction?: "increase" | "decrease" | "both" | undefined;
                    timeframe?: string | undefined;
                }[];
                asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                severity?: "critical" | "high" | "medium" | "low" | undefined;
                enabled?: boolean | undefined;
            }[] | undefined;
        }>>;
        monitoring: z.ZodOptional<z.ZodObject<{
            check_interval: z.ZodDefault<z.ZodNumber>;
            collect_history: z.ZodDefault<z.ZodBoolean>;
            retention_days: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            check_interval: number;
            collect_history: boolean;
            retention_days: number;
        }, {
            check_interval?: number | undefined;
            collect_history?: boolean | undefined;
            retention_days?: number | undefined;
        }>>;
        options: z.ZodOptional<z.ZodObject<{
            maintenance_windows: z.ZodOptional<z.ZodArray<z.ZodObject<{
                start: z.ZodString;
                end: z.ZodString;
                timezone: z.ZodDefault<z.ZodString>;
                days: z.ZodOptional<z.ZodArray<z.ZodEnum<["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]>, "many">>;
            }, "strip", z.ZodTypeAny, {
                start: string;
                end: string;
                timezone: string;
                days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
            }, {
                start: string;
                end: string;
                timezone?: string | undefined;
                days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
            }>, "many">>;
            thresholds: z.ZodOptional<z.ZodObject<{
                balance_change_major: z.ZodOptional<z.ZodNumber>;
                balance_change_critical: z.ZodOptional<z.ZodNumber>;
                transaction_count_unusual: z.ZodOptional<z.ZodNumber>;
                value_at_risk: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                balance_change_major?: number | undefined;
                balance_change_critical?: number | undefined;
                transaction_count_unusual?: number | undefined;
                value_at_risk?: number | undefined;
            }, {
                balance_change_major?: number | undefined;
                balance_change_critical?: number | undefined;
                transaction_count_unusual?: number | undefined;
                value_at_risk?: number | undefined;
            }>>;
            enhanced_monitoring: z.ZodOptional<z.ZodObject<{
                risk_scoring: z.ZodDefault<z.ZodBoolean>;
                pattern_detection: z.ZodDefault<z.ZodBoolean>;
                cross_chain_tracking: z.ZodDefault<z.ZodBoolean>;
                sentiment_analysis: z.ZodDefault<z.ZodBoolean>;
                compliance_monitoring: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                risk_scoring: boolean;
                pattern_detection: boolean;
                cross_chain_tracking: boolean;
                sentiment_analysis: boolean;
                compliance_monitoring: boolean;
            }, {
                risk_scoring?: boolean | undefined;
                pattern_detection?: boolean | undefined;
                cross_chain_tracking?: boolean | undefined;
                sentiment_analysis?: boolean | undefined;
                compliance_monitoring?: boolean | undefined;
            }>>;
            priority: z.ZodOptional<z.ZodEnum<["critical", "high", "medium", "low"]>>;
            auto_disable_on_error: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            auto_disable_on_error: boolean;
            maintenance_windows?: {
                start: string;
                end: string;
                timezone: string;
                days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
            }[] | undefined;
            thresholds?: {
                balance_change_major?: number | undefined;
                balance_change_critical?: number | undefined;
                transaction_count_unusual?: number | undefined;
                value_at_risk?: number | undefined;
            } | undefined;
            enhanced_monitoring?: {
                risk_scoring: boolean;
                pattern_detection: boolean;
                cross_chain_tracking: boolean;
                sentiment_analysis: boolean;
                compliance_monitoring: boolean;
            } | undefined;
            priority?: "critical" | "high" | "medium" | "low" | undefined;
        }, {
            maintenance_windows?: {
                start: string;
                end: string;
                timezone?: string | undefined;
                days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
            }[] | undefined;
            thresholds?: {
                balance_change_major?: number | undefined;
                balance_change_critical?: number | undefined;
                transaction_count_unusual?: number | undefined;
                value_at_risk?: number | undefined;
            } | undefined;
            enhanced_monitoring?: {
                risk_scoring?: boolean | undefined;
                pattern_detection?: boolean | undefined;
                cross_chain_tracking?: boolean | undefined;
                sentiment_analysis?: boolean | undefined;
                compliance_monitoring?: boolean | undefined;
            } | undefined;
            priority?: "critical" | "high" | "medium" | "low" | undefined;
            auto_disable_on_error?: boolean | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        enabled: boolean;
        assets: {
            type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
            chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
            address: string;
            symbol?: string | undefined;
            name?: string | undefined;
            tags?: string[] | undefined;
        }[];
        options?: {
            auto_disable_on_error: boolean;
            maintenance_windows?: {
                start: string;
                end: string;
                timezone: string;
                days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
            }[] | undefined;
            thresholds?: {
                balance_change_major?: number | undefined;
                balance_change_critical?: number | undefined;
                transaction_count_unusual?: number | undefined;
                value_at_risk?: number | undefined;
            } | undefined;
            enhanced_monitoring?: {
                risk_scoring: boolean;
                pattern_detection: boolean;
                cross_chain_tracking: boolean;
                sentiment_analysis: boolean;
                compliance_monitoring: boolean;
            } | undefined;
            priority?: "critical" | "high" | "medium" | "low" | undefined;
        } | undefined;
        tags?: Record<string, string> | undefined;
        description?: string | undefined;
        alert_policy_id?: string | undefined;
        alert_config?: {
            enabled: boolean;
            severity_threshold: "critical" | "high" | "medium" | "low";
            notification_channels?: string[] | undefined;
            rules?: {
                conditions: {
                    type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                    threshold: string | number;
                    direction?: "increase" | "decrease" | "both" | undefined;
                    timeframe?: string | undefined;
                }[];
                enabled: boolean;
                asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                severity?: "critical" | "high" | "medium" | "low" | undefined;
            }[] | undefined;
        } | undefined;
        monitoring?: {
            check_interval: number;
            collect_history: boolean;
            retention_days: number;
        } | undefined;
    }, {
        name: string;
        assets: {
            type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
            chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
            address: string;
            symbol?: string | undefined;
            name?: string | undefined;
            tags?: string[] | undefined;
        }[];
        options?: {
            maintenance_windows?: {
                start: string;
                end: string;
                timezone?: string | undefined;
                days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
            }[] | undefined;
            thresholds?: {
                balance_change_major?: number | undefined;
                balance_change_critical?: number | undefined;
                transaction_count_unusual?: number | undefined;
                value_at_risk?: number | undefined;
            } | undefined;
            enhanced_monitoring?: {
                risk_scoring?: boolean | undefined;
                pattern_detection?: boolean | undefined;
                cross_chain_tracking?: boolean | undefined;
                sentiment_analysis?: boolean | undefined;
                compliance_monitoring?: boolean | undefined;
            } | undefined;
            priority?: "critical" | "high" | "medium" | "low" | undefined;
            auto_disable_on_error?: boolean | undefined;
        } | undefined;
        tags?: Record<string, string> | undefined;
        enabled?: boolean | undefined;
        description?: string | undefined;
        alert_policy_id?: string | undefined;
        alert_config?: {
            enabled?: boolean | undefined;
            severity_threshold?: "critical" | "high" | "medium" | "low" | undefined;
            notification_channels?: string[] | undefined;
            rules?: {
                conditions: {
                    type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                    threshold: string | number;
                    direction?: "increase" | "decrease" | "both" | undefined;
                    timeframe?: string | undefined;
                }[];
                asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                severity?: "critical" | "high" | "medium" | "low" | undefined;
                enabled?: boolean | undefined;
            }[] | undefined;
        } | undefined;
        monitoring?: {
            check_interval?: number | undefined;
            collect_history?: boolean | undefined;
            retention_days?: number | undefined;
        } | undefined;
    }>, {
        name: string;
        enabled: boolean;
        assets: {
            type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
            chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
            address: string;
            symbol?: string | undefined;
            name?: string | undefined;
            tags?: string[] | undefined;
        }[];
        options?: {
            auto_disable_on_error: boolean;
            maintenance_windows?: {
                start: string;
                end: string;
                timezone: string;
                days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
            }[] | undefined;
            thresholds?: {
                balance_change_major?: number | undefined;
                balance_change_critical?: number | undefined;
                transaction_count_unusual?: number | undefined;
                value_at_risk?: number | undefined;
            } | undefined;
            enhanced_monitoring?: {
                risk_scoring: boolean;
                pattern_detection: boolean;
                cross_chain_tracking: boolean;
                sentiment_analysis: boolean;
                compliance_monitoring: boolean;
            } | undefined;
            priority?: "critical" | "high" | "medium" | "low" | undefined;
        } | undefined;
        tags?: Record<string, string> | undefined;
        description?: string | undefined;
        alert_policy_id?: string | undefined;
        alert_config?: {
            enabled: boolean;
            severity_threshold: "critical" | "high" | "medium" | "low";
            notification_channels?: string[] | undefined;
            rules?: {
                conditions: {
                    type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                    threshold: string | number;
                    direction?: "increase" | "decrease" | "both" | undefined;
                    timeframe?: string | undefined;
                }[];
                enabled: boolean;
                asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                severity?: "critical" | "high" | "medium" | "low" | undefined;
            }[] | undefined;
        } | undefined;
        monitoring?: {
            check_interval: number;
            collect_history: boolean;
            retention_days: number;
        } | undefined;
    }, {
        name: string;
        assets: {
            type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
            chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
            address: string;
            symbol?: string | undefined;
            name?: string | undefined;
            tags?: string[] | undefined;
        }[];
        options?: {
            maintenance_windows?: {
                start: string;
                end: string;
                timezone?: string | undefined;
                days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
            }[] | undefined;
            thresholds?: {
                balance_change_major?: number | undefined;
                balance_change_critical?: number | undefined;
                transaction_count_unusual?: number | undefined;
                value_at_risk?: number | undefined;
            } | undefined;
            enhanced_monitoring?: {
                risk_scoring?: boolean | undefined;
                pattern_detection?: boolean | undefined;
                cross_chain_tracking?: boolean | undefined;
                sentiment_analysis?: boolean | undefined;
                compliance_monitoring?: boolean | undefined;
            } | undefined;
            priority?: "critical" | "high" | "medium" | "low" | undefined;
            auto_disable_on_error?: boolean | undefined;
        } | undefined;
        tags?: Record<string, string> | undefined;
        enabled?: boolean | undefined;
        description?: string | undefined;
        alert_policy_id?: string | undefined;
        alert_config?: {
            enabled?: boolean | undefined;
            severity_threshold?: "critical" | "high" | "medium" | "low" | undefined;
            notification_channels?: string[] | undefined;
            rules?: {
                conditions: {
                    type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                    threshold: string | number;
                    direction?: "increase" | "decrease" | "both" | undefined;
                    timeframe?: string | undefined;
                }[];
                asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                severity?: "critical" | "high" | "medium" | "low" | undefined;
                enabled?: boolean | undefined;
            }[] | undefined;
        } | undefined;
        monitoring?: {
            check_interval?: number | undefined;
            collect_history?: boolean | undefined;
            retention_days?: number | undefined;
        } | undefined;
    }>>>;
    custom_agents: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodObject<{
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        enabled: z.ZodDefault<z.ZodBoolean>;
        type: z.ZodEnum<["address_balance_change", "position_health_deviation", "large_transaction_monitor", "contract_interaction_monitor", "token_transfer_monitor", "defi_position_monitor", "governance_proposal_monitor", "bridge_transaction_monitor", "yield_farming_monitor", "liquidation_risk_monitor", "flash_loan_monitor", "mev_activity_monitor", "whale_movement_monitor", "unusual_pattern_detector", "custom_webhook_trigger"]>;
        code: z.ZodOptional<z.ZodString>;
        chain: z.ZodEnum<["ethereum", "polygon", "bsc", "avalanche", "arbitrum", "optimism", "base", "fantom", "gnosis", "celo"]>;
        severity: z.ZodDefault<z.ZodEnum<["critical", "high", "medium", "low"]>>;
        tags: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        configuration: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        notification_channels: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        schedule: z.ZodOptional<z.ZodObject<{
            interval: z.ZodDefault<z.ZodNumber>;
            timezone: z.ZodDefault<z.ZodString>;
            skip_windows: z.ZodOptional<z.ZodArray<z.ZodObject<{
                start: z.ZodString;
                end: z.ZodString;
                days: z.ZodOptional<z.ZodArray<z.ZodEnum<["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]>, "many">>;
            }, "strip", z.ZodTypeAny, {
                start: string;
                end: string;
                days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
            }, {
                start: string;
                end: string;
                days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
            }>, "many">>;
            max_executions_per_hour: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            timezone: string;
            interval: number;
            skip_windows?: {
                start: string;
                end: string;
                days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
            }[] | undefined;
            max_executions_per_hour?: number | undefined;
        }, {
            timezone?: string | undefined;
            interval?: number | undefined;
            skip_windows?: {
                start: string;
                end: string;
                days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
            }[] | undefined;
            max_executions_per_hour?: number | undefined;
        }>>;
        alert_template: z.ZodOptional<z.ZodObject<{
            title: z.ZodOptional<z.ZodString>;
            message: z.ZodOptional<z.ZodString>;
            include_context: z.ZodOptional<z.ZodObject<{
                transaction_details: z.ZodDefault<z.ZodBoolean>;
                risk_analysis: z.ZodDefault<z.ZodBoolean>;
                historical_comparison: z.ZodDefault<z.ZodBoolean>;
                cross_reference_alerts: z.ZodDefault<z.ZodBoolean>;
                price_impact: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                transaction_details: boolean;
                risk_analysis: boolean;
                historical_comparison: boolean;
                cross_reference_alerts: boolean;
                price_impact: boolean;
            }, {
                transaction_details?: boolean | undefined;
                risk_analysis?: boolean | undefined;
                historical_comparison?: boolean | undefined;
                cross_reference_alerts?: boolean | undefined;
                price_impact?: boolean | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            message?: string | undefined;
            title?: string | undefined;
            include_context?: {
                transaction_details: boolean;
                risk_analysis: boolean;
                historical_comparison: boolean;
                cross_reference_alerts: boolean;
                price_impact: boolean;
            } | undefined;
        }, {
            message?: string | undefined;
            title?: string | undefined;
            include_context?: {
                transaction_details?: boolean | undefined;
                risk_analysis?: boolean | undefined;
                historical_comparison?: boolean | undefined;
                cross_reference_alerts?: boolean | undefined;
                price_impact?: boolean | undefined;
            } | undefined;
        }>>;
        automated_responses: z.ZodOptional<z.ZodObject<{
            triggers: z.ZodOptional<z.ZodArray<z.ZodObject<{
                condition: z.ZodString;
                actions: z.ZodArray<z.ZodObject<{
                    type: z.ZodEnum<["notify_additional_channels", "create_incident", "pause_automated_trading", "require_manual_approval", "webhook_call", "update_risk_score"]>;
                    channels: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                    severity: z.ZodOptional<z.ZodEnum<["critical", "high", "medium", "low"]>>;
                    duration: z.ZodOptional<z.ZodString>;
                    for_operations: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                    webhook_url: z.ZodOptional<z.ZodString>;
                    risk_score_adjustment: z.ZodOptional<z.ZodNumber>;
                }, "strip", z.ZodTypeAny, {
                    type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                    channels?: string[] | undefined;
                    duration?: string | undefined;
                    for_operations?: string[] | undefined;
                    webhook_url?: string | undefined;
                    risk_score_adjustment?: number | undefined;
                }, {
                    type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                    channels?: string[] | undefined;
                    duration?: string | undefined;
                    for_operations?: string[] | undefined;
                    webhook_url?: string | undefined;
                    risk_score_adjustment?: number | undefined;
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                condition: string;
                actions: {
                    type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                    channels?: string[] | undefined;
                    duration?: string | undefined;
                    for_operations?: string[] | undefined;
                    webhook_url?: string | undefined;
                    risk_score_adjustment?: number | undefined;
                }[];
            }, {
                condition: string;
                actions: {
                    type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                    channels?: string[] | undefined;
                    duration?: string | undefined;
                    for_operations?: string[] | undefined;
                    webhook_url?: string | undefined;
                    risk_score_adjustment?: number | undefined;
                }[];
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
            triggers?: {
                condition: string;
                actions: {
                    type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                    channels?: string[] | undefined;
                    duration?: string | undefined;
                    for_operations?: string[] | undefined;
                    webhook_url?: string | undefined;
                    risk_score_adjustment?: number | undefined;
                }[];
            }[] | undefined;
        }, {
            triggers?: {
                condition: string;
                actions: {
                    type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                    channels?: string[] | undefined;
                    duration?: string | undefined;
                    for_operations?: string[] | undefined;
                    webhook_url?: string | undefined;
                    risk_score_adjustment?: number | undefined;
                }[];
            }[] | undefined;
        }>>;
        testing: z.ZodOptional<z.ZodObject<{
            test_mode: z.ZodDefault<z.ZodBoolean>;
            test_scenarios: z.ZodOptional<z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                mock_data: z.ZodRecord<z.ZodString, z.ZodAny>;
                expected_result: z.ZodEnum<["alert_triggered", "no_alert", "error"]>;
                description: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                name: string;
                mock_data: Record<string, any>;
                expected_result: "error" | "alert_triggered" | "no_alert";
                description?: string | undefined;
            }, {
                name: string;
                mock_data: Record<string, any>;
                expected_result: "error" | "alert_triggered" | "no_alert";
                description?: string | undefined;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
            test_mode: boolean;
            test_scenarios?: {
                name: string;
                mock_data: Record<string, any>;
                expected_result: "error" | "alert_triggered" | "no_alert";
                description?: string | undefined;
            }[] | undefined;
        }, {
            test_mode?: boolean | undefined;
            test_scenarios?: {
                name: string;
                mock_data: Record<string, any>;
                expected_result: "error" | "alert_triggered" | "no_alert";
                description?: string | undefined;
            }[] | undefined;
        }>>;
        monitoring: z.ZodOptional<z.ZodObject<{
            collect_metrics: z.ZodDefault<z.ZodBoolean>;
            max_execution_time: z.ZodDefault<z.ZodString>;
            max_memory_usage: z.ZodDefault<z.ZodString>;
            retry_on_failure: z.ZodDefault<z.ZodBoolean>;
            max_retries: z.ZodDefault<z.ZodNumber>;
            retry_delay: z.ZodDefault<z.ZodString>;
            health_check_interval: z.ZodDefault<z.ZodString>;
            alert_on_health_failure: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            collect_metrics: boolean;
            max_execution_time: string;
            max_memory_usage: string;
            retry_on_failure: boolean;
            max_retries: number;
            retry_delay: string;
            health_check_interval: string;
            alert_on_health_failure: boolean;
        }, {
            collect_metrics?: boolean | undefined;
            max_execution_time?: string | undefined;
            max_memory_usage?: string | undefined;
            retry_on_failure?: boolean | undefined;
            max_retries?: number | undefined;
            retry_delay?: string | undefined;
            health_check_interval?: string | undefined;
            alert_on_health_failure?: boolean | undefined;
        }>>;
        integrations: z.ZodOptional<z.ZodObject<{
            external_apis: z.ZodOptional<z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                url: z.ZodString;
                auth_type: z.ZodDefault<z.ZodEnum<["none", "api_key", "bearer", "basic"]>>;
                timeout: z.ZodDefault<z.ZodString>;
                headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                name: string;
                url: string;
                auth_type: "none" | "api_key" | "bearer" | "basic";
                timeout: string;
                headers?: Record<string, string> | undefined;
            }, {
                name: string;
                url: string;
                auth_type?: "none" | "api_key" | "bearer" | "basic" | undefined;
                timeout?: string | undefined;
                headers?: Record<string, string> | undefined;
            }>, "many">>;
            databases: z.ZodOptional<z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                type: z.ZodEnum<["postgresql", "mysql", "mongodb", "redis"]>;
                connection_string_env: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                name: string;
                type: "postgresql" | "mysql" | "mongodb" | "redis";
                connection_string_env: string;
            }, {
                name: string;
                type: "postgresql" | "mysql" | "mongodb" | "redis";
                connection_string_env: string;
            }>, "many">>;
            message_queues: z.ZodOptional<z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                type: z.ZodEnum<["rabbitmq", "kafka", "sqs", "pubsub"]>;
                queue_name: z.ZodString;
                config: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
            }, "strip", z.ZodTypeAny, {
                name: string;
                type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
                queue_name: string;
                config?: Record<string, any> | undefined;
            }, {
                name: string;
                type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
                queue_name: string;
                config?: Record<string, any> | undefined;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
            external_apis?: {
                name: string;
                url: string;
                auth_type: "none" | "api_key" | "bearer" | "basic";
                timeout: string;
                headers?: Record<string, string> | undefined;
            }[] | undefined;
            databases?: {
                name: string;
                type: "postgresql" | "mysql" | "mongodb" | "redis";
                connection_string_env: string;
            }[] | undefined;
            message_queues?: {
                name: string;
                type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
                queue_name: string;
                config?: Record<string, any> | undefined;
            }[] | undefined;
        }, {
            external_apis?: {
                name: string;
                url: string;
                auth_type?: "none" | "api_key" | "bearer" | "basic" | undefined;
                timeout?: string | undefined;
                headers?: Record<string, string> | undefined;
            }[] | undefined;
            databases?: {
                name: string;
                type: "postgresql" | "mysql" | "mongodb" | "redis";
                connection_string_env: string;
            }[] | undefined;
            message_queues?: {
                name: string;
                type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
                queue_name: string;
                config?: Record<string, any> | undefined;
            }[] | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: "address_balance_change" | "position_health_deviation" | "large_transaction_monitor" | "contract_interaction_monitor" | "token_transfer_monitor" | "defi_position_monitor" | "governance_proposal_monitor" | "bridge_transaction_monitor" | "yield_farming_monitor" | "liquidation_risk_monitor" | "flash_loan_monitor" | "mev_activity_monitor" | "whale_movement_monitor" | "unusual_pattern_detector" | "custom_webhook_trigger";
        chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
        severity: "critical" | "high" | "medium" | "low";
        enabled: boolean;
        code?: string | undefined;
        tags?: Record<string, string> | undefined;
        notification_channels?: string[] | undefined;
        description?: string | undefined;
        monitoring?: {
            collect_metrics: boolean;
            max_execution_time: string;
            max_memory_usage: string;
            retry_on_failure: boolean;
            max_retries: number;
            retry_delay: string;
            health_check_interval: string;
            alert_on_health_failure: boolean;
        } | undefined;
        configuration?: Record<string, any> | undefined;
        schedule?: {
            timezone: string;
            interval: number;
            skip_windows?: {
                start: string;
                end: string;
                days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
            }[] | undefined;
            max_executions_per_hour?: number | undefined;
        } | undefined;
        alert_template?: {
            message?: string | undefined;
            title?: string | undefined;
            include_context?: {
                transaction_details: boolean;
                risk_analysis: boolean;
                historical_comparison: boolean;
                cross_reference_alerts: boolean;
                price_impact: boolean;
            } | undefined;
        } | undefined;
        automated_responses?: {
            triggers?: {
                condition: string;
                actions: {
                    type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                    channels?: string[] | undefined;
                    duration?: string | undefined;
                    for_operations?: string[] | undefined;
                    webhook_url?: string | undefined;
                    risk_score_adjustment?: number | undefined;
                }[];
            }[] | undefined;
        } | undefined;
        testing?: {
            test_mode: boolean;
            test_scenarios?: {
                name: string;
                mock_data: Record<string, any>;
                expected_result: "error" | "alert_triggered" | "no_alert";
                description?: string | undefined;
            }[] | undefined;
        } | undefined;
        integrations?: {
            external_apis?: {
                name: string;
                url: string;
                auth_type: "none" | "api_key" | "bearer" | "basic";
                timeout: string;
                headers?: Record<string, string> | undefined;
            }[] | undefined;
            databases?: {
                name: string;
                type: "postgresql" | "mysql" | "mongodb" | "redis";
                connection_string_env: string;
            }[] | undefined;
            message_queues?: {
                name: string;
                type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
                queue_name: string;
                config?: Record<string, any> | undefined;
            }[] | undefined;
        } | undefined;
    }, {
        name: string;
        type: "address_balance_change" | "position_health_deviation" | "large_transaction_monitor" | "contract_interaction_monitor" | "token_transfer_monitor" | "defi_position_monitor" | "governance_proposal_monitor" | "bridge_transaction_monitor" | "yield_farming_monitor" | "liquidation_risk_monitor" | "flash_loan_monitor" | "mev_activity_monitor" | "whale_movement_monitor" | "unusual_pattern_detector" | "custom_webhook_trigger";
        chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
        code?: string | undefined;
        tags?: Record<string, string> | undefined;
        severity?: "critical" | "high" | "medium" | "low" | undefined;
        enabled?: boolean | undefined;
        notification_channels?: string[] | undefined;
        description?: string | undefined;
        monitoring?: {
            collect_metrics?: boolean | undefined;
            max_execution_time?: string | undefined;
            max_memory_usage?: string | undefined;
            retry_on_failure?: boolean | undefined;
            max_retries?: number | undefined;
            retry_delay?: string | undefined;
            health_check_interval?: string | undefined;
            alert_on_health_failure?: boolean | undefined;
        } | undefined;
        configuration?: Record<string, any> | undefined;
        schedule?: {
            timezone?: string | undefined;
            interval?: number | undefined;
            skip_windows?: {
                start: string;
                end: string;
                days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
            }[] | undefined;
            max_executions_per_hour?: number | undefined;
        } | undefined;
        alert_template?: {
            message?: string | undefined;
            title?: string | undefined;
            include_context?: {
                transaction_details?: boolean | undefined;
                risk_analysis?: boolean | undefined;
                historical_comparison?: boolean | undefined;
                cross_reference_alerts?: boolean | undefined;
                price_impact?: boolean | undefined;
            } | undefined;
        } | undefined;
        automated_responses?: {
            triggers?: {
                condition: string;
                actions: {
                    type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                    channels?: string[] | undefined;
                    duration?: string | undefined;
                    for_operations?: string[] | undefined;
                    webhook_url?: string | undefined;
                    risk_score_adjustment?: number | undefined;
                }[];
            }[] | undefined;
        } | undefined;
        testing?: {
            test_mode?: boolean | undefined;
            test_scenarios?: {
                name: string;
                mock_data: Record<string, any>;
                expected_result: "error" | "alert_triggered" | "no_alert";
                description?: string | undefined;
            }[] | undefined;
        } | undefined;
        integrations?: {
            external_apis?: {
                name: string;
                url: string;
                auth_type?: "none" | "api_key" | "bearer" | "basic" | undefined;
                timeout?: string | undefined;
                headers?: Record<string, string> | undefined;
            }[] | undefined;
            databases?: {
                name: string;
                type: "postgresql" | "mysql" | "mongodb" | "redis";
                connection_string_env: string;
            }[] | undefined;
            message_queues?: {
                name: string;
                type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
                queue_name: string;
                config?: Record<string, any> | undefined;
            }[] | undefined;
        } | undefined;
    }>>>;
}, "strip", z.ZodTypeAny, {
    notification_channels: Record<string, {
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
    } | {
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
    } | {
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
    } | {
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
    } | {
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
    } | {
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
    } | {
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
    } | (({
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
    } | {
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
    } | {
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
    } | {
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
    } | {
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
    } | {
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
    } | {
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
    }) & {
        testing?: {
            test_mode: boolean;
            test_endpoint?: string | undefined;
        } | undefined;
    })>;
    watchlists: Record<string, {
        name: string;
        enabled: boolean;
        assets: {
            type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
            chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
            address: string;
            symbol?: string | undefined;
            name?: string | undefined;
            tags?: string[] | undefined;
        }[];
        options?: {
            auto_disable_on_error: boolean;
            maintenance_windows?: {
                start: string;
                end: string;
                timezone: string;
                days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
            }[] | undefined;
            thresholds?: {
                balance_change_major?: number | undefined;
                balance_change_critical?: number | undefined;
                transaction_count_unusual?: number | undefined;
                value_at_risk?: number | undefined;
            } | undefined;
            enhanced_monitoring?: {
                risk_scoring: boolean;
                pattern_detection: boolean;
                cross_chain_tracking: boolean;
                sentiment_analysis: boolean;
                compliance_monitoring: boolean;
            } | undefined;
            priority?: "critical" | "high" | "medium" | "low" | undefined;
        } | undefined;
        tags?: Record<string, string> | undefined;
        description?: string | undefined;
        alert_policy_id?: string | undefined;
        alert_config?: {
            enabled: boolean;
            severity_threshold: "critical" | "high" | "medium" | "low";
            notification_channels?: string[] | undefined;
            rules?: {
                conditions: {
                    type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                    threshold: string | number;
                    direction?: "increase" | "decrease" | "both" | undefined;
                    timeframe?: string | undefined;
                }[];
                enabled: boolean;
                asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                severity?: "critical" | "high" | "medium" | "low" | undefined;
            }[] | undefined;
        } | undefined;
        monitoring?: {
            check_interval: number;
            collect_history: boolean;
            retention_days: number;
        } | undefined;
    }>;
    custom_agents: Record<string, {
        name: string;
        type: "address_balance_change" | "position_health_deviation" | "large_transaction_monitor" | "contract_interaction_monitor" | "token_transfer_monitor" | "defi_position_monitor" | "governance_proposal_monitor" | "bridge_transaction_monitor" | "yield_farming_monitor" | "liquidation_risk_monitor" | "flash_loan_monitor" | "mev_activity_monitor" | "whale_movement_monitor" | "unusual_pattern_detector" | "custom_webhook_trigger";
        chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
        severity: "critical" | "high" | "medium" | "low";
        enabled: boolean;
        code?: string | undefined;
        tags?: Record<string, string> | undefined;
        notification_channels?: string[] | undefined;
        description?: string | undefined;
        monitoring?: {
            collect_metrics: boolean;
            max_execution_time: string;
            max_memory_usage: string;
            retry_on_failure: boolean;
            max_retries: number;
            retry_delay: string;
            health_check_interval: string;
            alert_on_health_failure: boolean;
        } | undefined;
        configuration?: Record<string, any> | undefined;
        schedule?: {
            timezone: string;
            interval: number;
            skip_windows?: {
                start: string;
                end: string;
                days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
            }[] | undefined;
            max_executions_per_hour?: number | undefined;
        } | undefined;
        alert_template?: {
            message?: string | undefined;
            title?: string | undefined;
            include_context?: {
                transaction_details: boolean;
                risk_analysis: boolean;
                historical_comparison: boolean;
                cross_reference_alerts: boolean;
                price_impact: boolean;
            } | undefined;
        } | undefined;
        automated_responses?: {
            triggers?: {
                condition: string;
                actions: {
                    type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                    channels?: string[] | undefined;
                    duration?: string | undefined;
                    for_operations?: string[] | undefined;
                    webhook_url?: string | undefined;
                    risk_score_adjustment?: number | undefined;
                }[];
            }[] | undefined;
        } | undefined;
        testing?: {
            test_mode: boolean;
            test_scenarios?: {
                name: string;
                mock_data: Record<string, any>;
                expected_result: "error" | "alert_triggered" | "no_alert";
                description?: string | undefined;
            }[] | undefined;
        } | undefined;
        integrations?: {
            external_apis?: {
                name: string;
                url: string;
                auth_type: "none" | "api_key" | "bearer" | "basic";
                timeout: string;
                headers?: Record<string, string> | undefined;
            }[] | undefined;
            databases?: {
                name: string;
                type: "postgresql" | "mysql" | "mongodb" | "redis";
                connection_string_env: string;
            }[] | undefined;
            message_queues?: {
                name: string;
                type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
                queue_name: string;
                config?: Record<string, any> | undefined;
            }[] | undefined;
        } | undefined;
    }>;
    global?: {
        integrations?: {
            hypernative?: {
                timeout: string;
                retry_attempts: number;
                base_url?: string | undefined;
                rate_limit?: {
                    requests_per_minute: number;
                    burst_limit: number;
                } | undefined;
            } | undefined;
            external_services?: Record<string, {
                auth_type: "none" | "api_key" | "bearer" | "basic";
                timeout: string;
                base_url: string;
                headers?: Record<string, string> | undefined;
            }> | undefined;
        } | undefined;
        project?: {
            name: string;
            environment: "development" | "staging" | "production";
            tags?: Record<string, string> | undefined;
            description?: string | undefined;
            version?: string | undefined;
        } | undefined;
        defaults?: {
            severity_threshold: "critical" | "high" | "medium" | "low";
            timezone: string;
            notification_channels?: string[] | undefined;
            monitoring?: {
                collect_metrics: boolean;
                health_checks_enabled: boolean;
                performance_tracking: boolean;
            } | undefined;
            retry_config?: {
                max_retries: number;
                retry_delay: string;
                exponential_backoff: boolean;
            } | undefined;
            validation_limits?: {
                max_file_size: number;
                max_assets_per_watchlist: number;
                max_resources_total: number;
                max_name_length: number;
                max_description_length: number;
                max_agent_code_length: number;
            } | undefined;
        } | undefined;
        env?: {
            validation?: Record<string, {
                message?: string | undefined;
                pattern?: string | undefined;
            }> | undefined;
            required?: string[] | undefined;
            optional?: Record<string, string> | undefined;
        } | undefined;
    } | undefined;
}, {
    notification_channels?: Record<string, {
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
    } | {
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
    } | {
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
    } | {
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
    } | {
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
    } | {
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
    } | {
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
    } | (({
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
    } | {
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
    } | {
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
    } | {
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
    } | {
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
    } | {
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
    } | {
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
    }) & {
        testing?: {
            test_mode?: boolean | undefined;
            test_endpoint?: string | undefined;
        } | undefined;
    })> | undefined;
    watchlists?: Record<string, {
        name: string;
        assets: {
            type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
            chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
            address: string;
            symbol?: string | undefined;
            name?: string | undefined;
            tags?: string[] | undefined;
        }[];
        options?: {
            maintenance_windows?: {
                start: string;
                end: string;
                timezone?: string | undefined;
                days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
            }[] | undefined;
            thresholds?: {
                balance_change_major?: number | undefined;
                balance_change_critical?: number | undefined;
                transaction_count_unusual?: number | undefined;
                value_at_risk?: number | undefined;
            } | undefined;
            enhanced_monitoring?: {
                risk_scoring?: boolean | undefined;
                pattern_detection?: boolean | undefined;
                cross_chain_tracking?: boolean | undefined;
                sentiment_analysis?: boolean | undefined;
                compliance_monitoring?: boolean | undefined;
            } | undefined;
            priority?: "critical" | "high" | "medium" | "low" | undefined;
            auto_disable_on_error?: boolean | undefined;
        } | undefined;
        tags?: Record<string, string> | undefined;
        enabled?: boolean | undefined;
        description?: string | undefined;
        alert_policy_id?: string | undefined;
        alert_config?: {
            enabled?: boolean | undefined;
            severity_threshold?: "critical" | "high" | "medium" | "low" | undefined;
            notification_channels?: string[] | undefined;
            rules?: {
                conditions: {
                    type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                    threshold: string | number;
                    direction?: "increase" | "decrease" | "both" | undefined;
                    timeframe?: string | undefined;
                }[];
                asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                severity?: "critical" | "high" | "medium" | "low" | undefined;
                enabled?: boolean | undefined;
            }[] | undefined;
        } | undefined;
        monitoring?: {
            check_interval?: number | undefined;
            collect_history?: boolean | undefined;
            retention_days?: number | undefined;
        } | undefined;
    }> | undefined;
    custom_agents?: Record<string, {
        name: string;
        type: "address_balance_change" | "position_health_deviation" | "large_transaction_monitor" | "contract_interaction_monitor" | "token_transfer_monitor" | "defi_position_monitor" | "governance_proposal_monitor" | "bridge_transaction_monitor" | "yield_farming_monitor" | "liquidation_risk_monitor" | "flash_loan_monitor" | "mev_activity_monitor" | "whale_movement_monitor" | "unusual_pattern_detector" | "custom_webhook_trigger";
        chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
        code?: string | undefined;
        tags?: Record<string, string> | undefined;
        severity?: "critical" | "high" | "medium" | "low" | undefined;
        enabled?: boolean | undefined;
        notification_channels?: string[] | undefined;
        description?: string | undefined;
        monitoring?: {
            collect_metrics?: boolean | undefined;
            max_execution_time?: string | undefined;
            max_memory_usage?: string | undefined;
            retry_on_failure?: boolean | undefined;
            max_retries?: number | undefined;
            retry_delay?: string | undefined;
            health_check_interval?: string | undefined;
            alert_on_health_failure?: boolean | undefined;
        } | undefined;
        configuration?: Record<string, any> | undefined;
        schedule?: {
            timezone?: string | undefined;
            interval?: number | undefined;
            skip_windows?: {
                start: string;
                end: string;
                days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
            }[] | undefined;
            max_executions_per_hour?: number | undefined;
        } | undefined;
        alert_template?: {
            message?: string | undefined;
            title?: string | undefined;
            include_context?: {
                transaction_details?: boolean | undefined;
                risk_analysis?: boolean | undefined;
                historical_comparison?: boolean | undefined;
                cross_reference_alerts?: boolean | undefined;
                price_impact?: boolean | undefined;
            } | undefined;
        } | undefined;
        automated_responses?: {
            triggers?: {
                condition: string;
                actions: {
                    type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                    channels?: string[] | undefined;
                    duration?: string | undefined;
                    for_operations?: string[] | undefined;
                    webhook_url?: string | undefined;
                    risk_score_adjustment?: number | undefined;
                }[];
            }[] | undefined;
        } | undefined;
        testing?: {
            test_mode?: boolean | undefined;
            test_scenarios?: {
                name: string;
                mock_data: Record<string, any>;
                expected_result: "error" | "alert_triggered" | "no_alert";
                description?: string | undefined;
            }[] | undefined;
        } | undefined;
        integrations?: {
            external_apis?: {
                name: string;
                url: string;
                auth_type?: "none" | "api_key" | "bearer" | "basic" | undefined;
                timeout?: string | undefined;
                headers?: Record<string, string> | undefined;
            }[] | undefined;
            databases?: {
                name: string;
                type: "postgresql" | "mysql" | "mongodb" | "redis";
                connection_string_env: string;
            }[] | undefined;
            message_queues?: {
                name: string;
                type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
                queue_name: string;
                config?: Record<string, any> | undefined;
            }[] | undefined;
        } | undefined;
    }> | undefined;
    global?: {
        integrations?: {
            hypernative?: {
                timeout?: string | undefined;
                base_url?: string | undefined;
                retry_attempts?: number | undefined;
                rate_limit?: {
                    requests_per_minute?: number | undefined;
                    burst_limit?: number | undefined;
                } | undefined;
            } | undefined;
            external_services?: Record<string, {
                base_url: string;
                auth_type?: "none" | "api_key" | "bearer" | "basic" | undefined;
                timeout?: string | undefined;
                headers?: Record<string, string> | undefined;
            }> | undefined;
        } | undefined;
        project?: {
            name: string;
            tags?: Record<string, string> | undefined;
            description?: string | undefined;
            version?: string | undefined;
            environment?: "development" | "staging" | "production" | undefined;
        } | undefined;
        defaults?: {
            severity_threshold?: "critical" | "high" | "medium" | "low" | undefined;
            notification_channels?: string[] | undefined;
            timezone?: string | undefined;
            monitoring?: {
                collect_metrics?: boolean | undefined;
                health_checks_enabled?: boolean | undefined;
                performance_tracking?: boolean | undefined;
            } | undefined;
            retry_config?: {
                max_retries?: number | undefined;
                retry_delay?: string | undefined;
                exponential_backoff?: boolean | undefined;
            } | undefined;
            validation_limits?: {
                max_file_size?: number | undefined;
                max_assets_per_watchlist?: number | undefined;
                max_resources_total?: number | undefined;
                max_name_length?: number | undefined;
                max_description_length?: number | undefined;
                max_agent_code_length?: number | undefined;
            } | undefined;
        } | undefined;
        env?: {
            validation?: Record<string, {
                message?: string | undefined;
                pattern?: string | undefined;
            }> | undefined;
            required?: string[] | undefined;
            optional?: Record<string, string> | undefined;
        } | undefined;
    } | undefined;
}>;
export declare const configLoadResultSchema: z.ZodObject<{
    config: z.ZodObject<{
        global: z.ZodOptional<z.ZodObject<{
            project: z.ZodOptional<z.ZodObject<{
                name: z.ZodString;
                description: z.ZodOptional<z.ZodString>;
                version: z.ZodOptional<z.ZodString>;
                environment: z.ZodDefault<z.ZodEnum<["development", "staging", "production"]>>;
                tags: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                name: string;
                environment: "development" | "staging" | "production";
                tags?: Record<string, string> | undefined;
                description?: string | undefined;
                version?: string | undefined;
            }, {
                name: string;
                tags?: Record<string, string> | undefined;
                description?: string | undefined;
                version?: string | undefined;
                environment?: "development" | "staging" | "production" | undefined;
            }>>;
            defaults: z.ZodOptional<z.ZodObject<{
                notification_channels: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                severity_threshold: z.ZodDefault<z.ZodEnum<["critical", "high", "medium", "low"]>>;
                timezone: z.ZodDefault<z.ZodString>;
                retry_config: z.ZodOptional<z.ZodObject<{
                    max_retries: z.ZodDefault<z.ZodNumber>;
                    retry_delay: z.ZodDefault<z.ZodString>;
                    exponential_backoff: z.ZodDefault<z.ZodBoolean>;
                }, "strip", z.ZodTypeAny, {
                    max_retries: number;
                    retry_delay: string;
                    exponential_backoff: boolean;
                }, {
                    max_retries?: number | undefined;
                    retry_delay?: string | undefined;
                    exponential_backoff?: boolean | undefined;
                }>>;
                monitoring: z.ZodOptional<z.ZodObject<{
                    collect_metrics: z.ZodDefault<z.ZodBoolean>;
                    health_checks_enabled: z.ZodDefault<z.ZodBoolean>;
                    performance_tracking: z.ZodDefault<z.ZodBoolean>;
                }, "strip", z.ZodTypeAny, {
                    collect_metrics: boolean;
                    health_checks_enabled: boolean;
                    performance_tracking: boolean;
                }, {
                    collect_metrics?: boolean | undefined;
                    health_checks_enabled?: boolean | undefined;
                    performance_tracking?: boolean | undefined;
                }>>;
                validation_limits: z.ZodOptional<z.ZodObject<{
                    max_file_size: z.ZodDefault<z.ZodNumber>;
                    max_assets_per_watchlist: z.ZodDefault<z.ZodNumber>;
                    max_resources_total: z.ZodDefault<z.ZodNumber>;
                    max_name_length: z.ZodDefault<z.ZodNumber>;
                    max_description_length: z.ZodDefault<z.ZodNumber>;
                    max_agent_code_length: z.ZodDefault<z.ZodNumber>;
                }, "strip", z.ZodTypeAny, {
                    max_file_size: number;
                    max_assets_per_watchlist: number;
                    max_resources_total: number;
                    max_name_length: number;
                    max_description_length: number;
                    max_agent_code_length: number;
                }, {
                    max_file_size?: number | undefined;
                    max_assets_per_watchlist?: number | undefined;
                    max_resources_total?: number | undefined;
                    max_name_length?: number | undefined;
                    max_description_length?: number | undefined;
                    max_agent_code_length?: number | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                severity_threshold: "critical" | "high" | "medium" | "low";
                timezone: string;
                notification_channels?: string[] | undefined;
                monitoring?: {
                    collect_metrics: boolean;
                    health_checks_enabled: boolean;
                    performance_tracking: boolean;
                } | undefined;
                retry_config?: {
                    max_retries: number;
                    retry_delay: string;
                    exponential_backoff: boolean;
                } | undefined;
                validation_limits?: {
                    max_file_size: number;
                    max_assets_per_watchlist: number;
                    max_resources_total: number;
                    max_name_length: number;
                    max_description_length: number;
                    max_agent_code_length: number;
                } | undefined;
            }, {
                severity_threshold?: "critical" | "high" | "medium" | "low" | undefined;
                notification_channels?: string[] | undefined;
                timezone?: string | undefined;
                monitoring?: {
                    collect_metrics?: boolean | undefined;
                    health_checks_enabled?: boolean | undefined;
                    performance_tracking?: boolean | undefined;
                } | undefined;
                retry_config?: {
                    max_retries?: number | undefined;
                    retry_delay?: string | undefined;
                    exponential_backoff?: boolean | undefined;
                } | undefined;
                validation_limits?: {
                    max_file_size?: number | undefined;
                    max_assets_per_watchlist?: number | undefined;
                    max_resources_total?: number | undefined;
                    max_name_length?: number | undefined;
                    max_description_length?: number | undefined;
                    max_agent_code_length?: number | undefined;
                } | undefined;
            }>>;
            env: z.ZodOptional<z.ZodObject<{
                required: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                optional: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                validation: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                    pattern: z.ZodOptional<z.ZodString>;
                    message: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    message?: string | undefined;
                    pattern?: string | undefined;
                }, {
                    message?: string | undefined;
                    pattern?: string | undefined;
                }>>>;
            }, "strip", z.ZodTypeAny, {
                validation?: Record<string, {
                    message?: string | undefined;
                    pattern?: string | undefined;
                }> | undefined;
                required?: string[] | undefined;
                optional?: Record<string, string> | undefined;
            }, {
                validation?: Record<string, {
                    message?: string | undefined;
                    pattern?: string | undefined;
                }> | undefined;
                required?: string[] | undefined;
                optional?: Record<string, string> | undefined;
            }>>;
            integrations: z.ZodOptional<z.ZodObject<{
                hypernative: z.ZodOptional<z.ZodObject<{
                    base_url: z.ZodOptional<z.ZodString>;
                    timeout: z.ZodDefault<z.ZodString>;
                    retry_attempts: z.ZodDefault<z.ZodNumber>;
                    rate_limit: z.ZodOptional<z.ZodObject<{
                        requests_per_minute: z.ZodDefault<z.ZodNumber>;
                        burst_limit: z.ZodDefault<z.ZodNumber>;
                    }, "strip", z.ZodTypeAny, {
                        requests_per_minute: number;
                        burst_limit: number;
                    }, {
                        requests_per_minute?: number | undefined;
                        burst_limit?: number | undefined;
                    }>>;
                }, "strip", z.ZodTypeAny, {
                    timeout: string;
                    retry_attempts: number;
                    base_url?: string | undefined;
                    rate_limit?: {
                        requests_per_minute: number;
                        burst_limit: number;
                    } | undefined;
                }, {
                    timeout?: string | undefined;
                    base_url?: string | undefined;
                    retry_attempts?: number | undefined;
                    rate_limit?: {
                        requests_per_minute?: number | undefined;
                        burst_limit?: number | undefined;
                    } | undefined;
                }>>;
                external_services: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                    base_url: z.ZodString;
                    auth_type: z.ZodDefault<z.ZodEnum<["none", "api_key", "bearer", "basic"]>>;
                    timeout: z.ZodDefault<z.ZodString>;
                    headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                }, "strip", z.ZodTypeAny, {
                    auth_type: "none" | "api_key" | "bearer" | "basic";
                    timeout: string;
                    base_url: string;
                    headers?: Record<string, string> | undefined;
                }, {
                    base_url: string;
                    auth_type?: "none" | "api_key" | "bearer" | "basic" | undefined;
                    timeout?: string | undefined;
                    headers?: Record<string, string> | undefined;
                }>>>;
            }, "strip", z.ZodTypeAny, {
                hypernative?: {
                    timeout: string;
                    retry_attempts: number;
                    base_url?: string | undefined;
                    rate_limit?: {
                        requests_per_minute: number;
                        burst_limit: number;
                    } | undefined;
                } | undefined;
                external_services?: Record<string, {
                    auth_type: "none" | "api_key" | "bearer" | "basic";
                    timeout: string;
                    base_url: string;
                    headers?: Record<string, string> | undefined;
                }> | undefined;
            }, {
                hypernative?: {
                    timeout?: string | undefined;
                    base_url?: string | undefined;
                    retry_attempts?: number | undefined;
                    rate_limit?: {
                        requests_per_minute?: number | undefined;
                        burst_limit?: number | undefined;
                    } | undefined;
                } | undefined;
                external_services?: Record<string, {
                    base_url: string;
                    auth_type?: "none" | "api_key" | "bearer" | "basic" | undefined;
                    timeout?: string | undefined;
                    headers?: Record<string, string> | undefined;
                }> | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            integrations?: {
                hypernative?: {
                    timeout: string;
                    retry_attempts: number;
                    base_url?: string | undefined;
                    rate_limit?: {
                        requests_per_minute: number;
                        burst_limit: number;
                    } | undefined;
                } | undefined;
                external_services?: Record<string, {
                    auth_type: "none" | "api_key" | "bearer" | "basic";
                    timeout: string;
                    base_url: string;
                    headers?: Record<string, string> | undefined;
                }> | undefined;
            } | undefined;
            project?: {
                name: string;
                environment: "development" | "staging" | "production";
                tags?: Record<string, string> | undefined;
                description?: string | undefined;
                version?: string | undefined;
            } | undefined;
            defaults?: {
                severity_threshold: "critical" | "high" | "medium" | "low";
                timezone: string;
                notification_channels?: string[] | undefined;
                monitoring?: {
                    collect_metrics: boolean;
                    health_checks_enabled: boolean;
                    performance_tracking: boolean;
                } | undefined;
                retry_config?: {
                    max_retries: number;
                    retry_delay: string;
                    exponential_backoff: boolean;
                } | undefined;
                validation_limits?: {
                    max_file_size: number;
                    max_assets_per_watchlist: number;
                    max_resources_total: number;
                    max_name_length: number;
                    max_description_length: number;
                    max_agent_code_length: number;
                } | undefined;
            } | undefined;
            env?: {
                validation?: Record<string, {
                    message?: string | undefined;
                    pattern?: string | undefined;
                }> | undefined;
                required?: string[] | undefined;
                optional?: Record<string, string> | undefined;
            } | undefined;
        }, {
            integrations?: {
                hypernative?: {
                    timeout?: string | undefined;
                    base_url?: string | undefined;
                    retry_attempts?: number | undefined;
                    rate_limit?: {
                        requests_per_minute?: number | undefined;
                        burst_limit?: number | undefined;
                    } | undefined;
                } | undefined;
                external_services?: Record<string, {
                    base_url: string;
                    auth_type?: "none" | "api_key" | "bearer" | "basic" | undefined;
                    timeout?: string | undefined;
                    headers?: Record<string, string> | undefined;
                }> | undefined;
            } | undefined;
            project?: {
                name: string;
                tags?: Record<string, string> | undefined;
                description?: string | undefined;
                version?: string | undefined;
                environment?: "development" | "staging" | "production" | undefined;
            } | undefined;
            defaults?: {
                severity_threshold?: "critical" | "high" | "medium" | "low" | undefined;
                notification_channels?: string[] | undefined;
                timezone?: string | undefined;
                monitoring?: {
                    collect_metrics?: boolean | undefined;
                    health_checks_enabled?: boolean | undefined;
                    performance_tracking?: boolean | undefined;
                } | undefined;
                retry_config?: {
                    max_retries?: number | undefined;
                    retry_delay?: string | undefined;
                    exponential_backoff?: boolean | undefined;
                } | undefined;
                validation_limits?: {
                    max_file_size?: number | undefined;
                    max_assets_per_watchlist?: number | undefined;
                    max_resources_total?: number | undefined;
                    max_name_length?: number | undefined;
                    max_description_length?: number | undefined;
                    max_agent_code_length?: number | undefined;
                } | undefined;
            } | undefined;
            env?: {
                validation?: Record<string, {
                    message?: string | undefined;
                    pattern?: string | undefined;
                }> | undefined;
                required?: string[] | undefined;
                optional?: Record<string, string> | undefined;
            } | undefined;
        }>>;
        notification_channels: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodIntersection<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
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
        }>]>]>>>;
        watchlists: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodEffects<z.ZodObject<{
            name: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            enabled: z.ZodDefault<z.ZodBoolean>;
            tags: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            assets: z.ZodArray<z.ZodObject<{
                chain: z.ZodEnum<["ethereum", "polygon", "bsc", "avalanche", "arbitrum", "optimism", "base", "fantom", "gnosis", "celo"]>;
                type: z.ZodEnum<["Wallet", "Protocol", "Token", "Contract", "Pool", "NFT"]>;
                address: z.ZodString;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodOptional<z.ZodString>;
                tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
                chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
                address: string;
                symbol?: string | undefined;
                name?: string | undefined;
                tags?: string[] | undefined;
            }, {
                type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
                chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
                address: string;
                symbol?: string | undefined;
                name?: string | undefined;
                tags?: string[] | undefined;
            }>, "many">;
            alert_policy_id: z.ZodOptional<z.ZodString>;
            alert_config: z.ZodOptional<z.ZodObject<{
                severity_threshold: z.ZodDefault<z.ZodEnum<["critical", "high", "medium", "low"]>>;
                notification_channels: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                rules: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    asset_types: z.ZodOptional<z.ZodArray<z.ZodEnum<["Wallet", "Protocol", "Token", "Contract", "Pool", "NFT"]>, "many">>;
                    conditions: z.ZodArray<z.ZodObject<{
                        type: z.ZodEnum<["balance_change", "transaction_volume", "unusual_activity", "security_incident", "governance_event", "price_change", "liquidity_change"]>;
                        threshold: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        direction: z.ZodOptional<z.ZodEnum<["increase", "decrease", "both"]>>;
                        timeframe: z.ZodOptional<z.ZodString>;
                    }, "strip", z.ZodTypeAny, {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }, {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }>, "many">;
                    severity: z.ZodOptional<z.ZodEnum<["critical", "high", "medium", "low"]>>;
                    enabled: z.ZodDefault<z.ZodBoolean>;
                }, "strip", z.ZodTypeAny, {
                    conditions: {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }[];
                    enabled: boolean;
                    asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                }, {
                    conditions: {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }[];
                    asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                    enabled?: boolean | undefined;
                }>, "many">>;
                enabled: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                enabled: boolean;
                severity_threshold: "critical" | "high" | "medium" | "low";
                notification_channels?: string[] | undefined;
                rules?: {
                    conditions: {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }[];
                    enabled: boolean;
                    asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                }[] | undefined;
            }, {
                enabled?: boolean | undefined;
                severity_threshold?: "critical" | "high" | "medium" | "low" | undefined;
                notification_channels?: string[] | undefined;
                rules?: {
                    conditions: {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }[];
                    asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                    enabled?: boolean | undefined;
                }[] | undefined;
            }>>;
            monitoring: z.ZodOptional<z.ZodObject<{
                check_interval: z.ZodDefault<z.ZodNumber>;
                collect_history: z.ZodDefault<z.ZodBoolean>;
                retention_days: z.ZodDefault<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                check_interval: number;
                collect_history: boolean;
                retention_days: number;
            }, {
                check_interval?: number | undefined;
                collect_history?: boolean | undefined;
                retention_days?: number | undefined;
            }>>;
            options: z.ZodOptional<z.ZodObject<{
                maintenance_windows: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    start: z.ZodString;
                    end: z.ZodString;
                    timezone: z.ZodDefault<z.ZodString>;
                    days: z.ZodOptional<z.ZodArray<z.ZodEnum<["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]>, "many">>;
                }, "strip", z.ZodTypeAny, {
                    start: string;
                    end: string;
                    timezone: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }, {
                    start: string;
                    end: string;
                    timezone?: string | undefined;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }>, "many">>;
                thresholds: z.ZodOptional<z.ZodObject<{
                    balance_change_major: z.ZodOptional<z.ZodNumber>;
                    balance_change_critical: z.ZodOptional<z.ZodNumber>;
                    transaction_count_unusual: z.ZodOptional<z.ZodNumber>;
                    value_at_risk: z.ZodOptional<z.ZodNumber>;
                }, "strip", z.ZodTypeAny, {
                    balance_change_major?: number | undefined;
                    balance_change_critical?: number | undefined;
                    transaction_count_unusual?: number | undefined;
                    value_at_risk?: number | undefined;
                }, {
                    balance_change_major?: number | undefined;
                    balance_change_critical?: number | undefined;
                    transaction_count_unusual?: number | undefined;
                    value_at_risk?: number | undefined;
                }>>;
                enhanced_monitoring: z.ZodOptional<z.ZodObject<{
                    risk_scoring: z.ZodDefault<z.ZodBoolean>;
                    pattern_detection: z.ZodDefault<z.ZodBoolean>;
                    cross_chain_tracking: z.ZodDefault<z.ZodBoolean>;
                    sentiment_analysis: z.ZodDefault<z.ZodBoolean>;
                    compliance_monitoring: z.ZodDefault<z.ZodBoolean>;
                }, "strip", z.ZodTypeAny, {
                    risk_scoring: boolean;
                    pattern_detection: boolean;
                    cross_chain_tracking: boolean;
                    sentiment_analysis: boolean;
                    compliance_monitoring: boolean;
                }, {
                    risk_scoring?: boolean | undefined;
                    pattern_detection?: boolean | undefined;
                    cross_chain_tracking?: boolean | undefined;
                    sentiment_analysis?: boolean | undefined;
                    compliance_monitoring?: boolean | undefined;
                }>>;
                priority: z.ZodOptional<z.ZodEnum<["critical", "high", "medium", "low"]>>;
                auto_disable_on_error: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                auto_disable_on_error: boolean;
                maintenance_windows?: {
                    start: string;
                    end: string;
                    timezone: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                thresholds?: {
                    balance_change_major?: number | undefined;
                    balance_change_critical?: number | undefined;
                    transaction_count_unusual?: number | undefined;
                    value_at_risk?: number | undefined;
                } | undefined;
                enhanced_monitoring?: {
                    risk_scoring: boolean;
                    pattern_detection: boolean;
                    cross_chain_tracking: boolean;
                    sentiment_analysis: boolean;
                    compliance_monitoring: boolean;
                } | undefined;
                priority?: "critical" | "high" | "medium" | "low" | undefined;
            }, {
                maintenance_windows?: {
                    start: string;
                    end: string;
                    timezone?: string | undefined;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                thresholds?: {
                    balance_change_major?: number | undefined;
                    balance_change_critical?: number | undefined;
                    transaction_count_unusual?: number | undefined;
                    value_at_risk?: number | undefined;
                } | undefined;
                enhanced_monitoring?: {
                    risk_scoring?: boolean | undefined;
                    pattern_detection?: boolean | undefined;
                    cross_chain_tracking?: boolean | undefined;
                    sentiment_analysis?: boolean | undefined;
                    compliance_monitoring?: boolean | undefined;
                } | undefined;
                priority?: "critical" | "high" | "medium" | "low" | undefined;
                auto_disable_on_error?: boolean | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            enabled: boolean;
            assets: {
                type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
                chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
                address: string;
                symbol?: string | undefined;
                name?: string | undefined;
                tags?: string[] | undefined;
            }[];
            options?: {
                auto_disable_on_error: boolean;
                maintenance_windows?: {
                    start: string;
                    end: string;
                    timezone: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                thresholds?: {
                    balance_change_major?: number | undefined;
                    balance_change_critical?: number | undefined;
                    transaction_count_unusual?: number | undefined;
                    value_at_risk?: number | undefined;
                } | undefined;
                enhanced_monitoring?: {
                    risk_scoring: boolean;
                    pattern_detection: boolean;
                    cross_chain_tracking: boolean;
                    sentiment_analysis: boolean;
                    compliance_monitoring: boolean;
                } | undefined;
                priority?: "critical" | "high" | "medium" | "low" | undefined;
            } | undefined;
            tags?: Record<string, string> | undefined;
            description?: string | undefined;
            alert_policy_id?: string | undefined;
            alert_config?: {
                enabled: boolean;
                severity_threshold: "critical" | "high" | "medium" | "low";
                notification_channels?: string[] | undefined;
                rules?: {
                    conditions: {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }[];
                    enabled: boolean;
                    asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                }[] | undefined;
            } | undefined;
            monitoring?: {
                check_interval: number;
                collect_history: boolean;
                retention_days: number;
            } | undefined;
        }, {
            name: string;
            assets: {
                type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
                chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
                address: string;
                symbol?: string | undefined;
                name?: string | undefined;
                tags?: string[] | undefined;
            }[];
            options?: {
                maintenance_windows?: {
                    start: string;
                    end: string;
                    timezone?: string | undefined;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                thresholds?: {
                    balance_change_major?: number | undefined;
                    balance_change_critical?: number | undefined;
                    transaction_count_unusual?: number | undefined;
                    value_at_risk?: number | undefined;
                } | undefined;
                enhanced_monitoring?: {
                    risk_scoring?: boolean | undefined;
                    pattern_detection?: boolean | undefined;
                    cross_chain_tracking?: boolean | undefined;
                    sentiment_analysis?: boolean | undefined;
                    compliance_monitoring?: boolean | undefined;
                } | undefined;
                priority?: "critical" | "high" | "medium" | "low" | undefined;
                auto_disable_on_error?: boolean | undefined;
            } | undefined;
            tags?: Record<string, string> | undefined;
            enabled?: boolean | undefined;
            description?: string | undefined;
            alert_policy_id?: string | undefined;
            alert_config?: {
                enabled?: boolean | undefined;
                severity_threshold?: "critical" | "high" | "medium" | "low" | undefined;
                notification_channels?: string[] | undefined;
                rules?: {
                    conditions: {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }[];
                    asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                    enabled?: boolean | undefined;
                }[] | undefined;
            } | undefined;
            monitoring?: {
                check_interval?: number | undefined;
                collect_history?: boolean | undefined;
                retention_days?: number | undefined;
            } | undefined;
        }>, {
            name: string;
            enabled: boolean;
            assets: {
                type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
                chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
                address: string;
                symbol?: string | undefined;
                name?: string | undefined;
                tags?: string[] | undefined;
            }[];
            options?: {
                auto_disable_on_error: boolean;
                maintenance_windows?: {
                    start: string;
                    end: string;
                    timezone: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                thresholds?: {
                    balance_change_major?: number | undefined;
                    balance_change_critical?: number | undefined;
                    transaction_count_unusual?: number | undefined;
                    value_at_risk?: number | undefined;
                } | undefined;
                enhanced_monitoring?: {
                    risk_scoring: boolean;
                    pattern_detection: boolean;
                    cross_chain_tracking: boolean;
                    sentiment_analysis: boolean;
                    compliance_monitoring: boolean;
                } | undefined;
                priority?: "critical" | "high" | "medium" | "low" | undefined;
            } | undefined;
            tags?: Record<string, string> | undefined;
            description?: string | undefined;
            alert_policy_id?: string | undefined;
            alert_config?: {
                enabled: boolean;
                severity_threshold: "critical" | "high" | "medium" | "low";
                notification_channels?: string[] | undefined;
                rules?: {
                    conditions: {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }[];
                    enabled: boolean;
                    asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                }[] | undefined;
            } | undefined;
            monitoring?: {
                check_interval: number;
                collect_history: boolean;
                retention_days: number;
            } | undefined;
        }, {
            name: string;
            assets: {
                type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
                chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
                address: string;
                symbol?: string | undefined;
                name?: string | undefined;
                tags?: string[] | undefined;
            }[];
            options?: {
                maintenance_windows?: {
                    start: string;
                    end: string;
                    timezone?: string | undefined;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                thresholds?: {
                    balance_change_major?: number | undefined;
                    balance_change_critical?: number | undefined;
                    transaction_count_unusual?: number | undefined;
                    value_at_risk?: number | undefined;
                } | undefined;
                enhanced_monitoring?: {
                    risk_scoring?: boolean | undefined;
                    pattern_detection?: boolean | undefined;
                    cross_chain_tracking?: boolean | undefined;
                    sentiment_analysis?: boolean | undefined;
                    compliance_monitoring?: boolean | undefined;
                } | undefined;
                priority?: "critical" | "high" | "medium" | "low" | undefined;
                auto_disable_on_error?: boolean | undefined;
            } | undefined;
            tags?: Record<string, string> | undefined;
            enabled?: boolean | undefined;
            description?: string | undefined;
            alert_policy_id?: string | undefined;
            alert_config?: {
                enabled?: boolean | undefined;
                severity_threshold?: "critical" | "high" | "medium" | "low" | undefined;
                notification_channels?: string[] | undefined;
                rules?: {
                    conditions: {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }[];
                    asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                    enabled?: boolean | undefined;
                }[] | undefined;
            } | undefined;
            monitoring?: {
                check_interval?: number | undefined;
                collect_history?: boolean | undefined;
                retention_days?: number | undefined;
            } | undefined;
        }>>>;
        custom_agents: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodObject<{
            name: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            enabled: z.ZodDefault<z.ZodBoolean>;
            type: z.ZodEnum<["address_balance_change", "position_health_deviation", "large_transaction_monitor", "contract_interaction_monitor", "token_transfer_monitor", "defi_position_monitor", "governance_proposal_monitor", "bridge_transaction_monitor", "yield_farming_monitor", "liquidation_risk_monitor", "flash_loan_monitor", "mev_activity_monitor", "whale_movement_monitor", "unusual_pattern_detector", "custom_webhook_trigger"]>;
            code: z.ZodOptional<z.ZodString>;
            chain: z.ZodEnum<["ethereum", "polygon", "bsc", "avalanche", "arbitrum", "optimism", "base", "fantom", "gnosis", "celo"]>;
            severity: z.ZodDefault<z.ZodEnum<["critical", "high", "medium", "low"]>>;
            tags: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            configuration: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
            notification_channels: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            schedule: z.ZodOptional<z.ZodObject<{
                interval: z.ZodDefault<z.ZodNumber>;
                timezone: z.ZodDefault<z.ZodString>;
                skip_windows: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    start: z.ZodString;
                    end: z.ZodString;
                    days: z.ZodOptional<z.ZodArray<z.ZodEnum<["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]>, "many">>;
                }, "strip", z.ZodTypeAny, {
                    start: string;
                    end: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }, {
                    start: string;
                    end: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }>, "many">>;
                max_executions_per_hour: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                timezone: string;
                interval: number;
                skip_windows?: {
                    start: string;
                    end: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                max_executions_per_hour?: number | undefined;
            }, {
                timezone?: string | undefined;
                interval?: number | undefined;
                skip_windows?: {
                    start: string;
                    end: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                max_executions_per_hour?: number | undefined;
            }>>;
            alert_template: z.ZodOptional<z.ZodObject<{
                title: z.ZodOptional<z.ZodString>;
                message: z.ZodOptional<z.ZodString>;
                include_context: z.ZodOptional<z.ZodObject<{
                    transaction_details: z.ZodDefault<z.ZodBoolean>;
                    risk_analysis: z.ZodDefault<z.ZodBoolean>;
                    historical_comparison: z.ZodDefault<z.ZodBoolean>;
                    cross_reference_alerts: z.ZodDefault<z.ZodBoolean>;
                    price_impact: z.ZodDefault<z.ZodBoolean>;
                }, "strip", z.ZodTypeAny, {
                    transaction_details: boolean;
                    risk_analysis: boolean;
                    historical_comparison: boolean;
                    cross_reference_alerts: boolean;
                    price_impact: boolean;
                }, {
                    transaction_details?: boolean | undefined;
                    risk_analysis?: boolean | undefined;
                    historical_comparison?: boolean | undefined;
                    cross_reference_alerts?: boolean | undefined;
                    price_impact?: boolean | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                message?: string | undefined;
                title?: string | undefined;
                include_context?: {
                    transaction_details: boolean;
                    risk_analysis: boolean;
                    historical_comparison: boolean;
                    cross_reference_alerts: boolean;
                    price_impact: boolean;
                } | undefined;
            }, {
                message?: string | undefined;
                title?: string | undefined;
                include_context?: {
                    transaction_details?: boolean | undefined;
                    risk_analysis?: boolean | undefined;
                    historical_comparison?: boolean | undefined;
                    cross_reference_alerts?: boolean | undefined;
                    price_impact?: boolean | undefined;
                } | undefined;
            }>>;
            automated_responses: z.ZodOptional<z.ZodObject<{
                triggers: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    condition: z.ZodString;
                    actions: z.ZodArray<z.ZodObject<{
                        type: z.ZodEnum<["notify_additional_channels", "create_incident", "pause_automated_trading", "require_manual_approval", "webhook_call", "update_risk_score"]>;
                        channels: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                        severity: z.ZodOptional<z.ZodEnum<["critical", "high", "medium", "low"]>>;
                        duration: z.ZodOptional<z.ZodString>;
                        for_operations: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                        webhook_url: z.ZodOptional<z.ZodString>;
                        risk_score_adjustment: z.ZodOptional<z.ZodNumber>;
                    }, "strip", z.ZodTypeAny, {
                        type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                        severity?: "critical" | "high" | "medium" | "low" | undefined;
                        channels?: string[] | undefined;
                        duration?: string | undefined;
                        for_operations?: string[] | undefined;
                        webhook_url?: string | undefined;
                        risk_score_adjustment?: number | undefined;
                    }, {
                        type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                        severity?: "critical" | "high" | "medium" | "low" | undefined;
                        channels?: string[] | undefined;
                        duration?: string | undefined;
                        for_operations?: string[] | undefined;
                        webhook_url?: string | undefined;
                        risk_score_adjustment?: number | undefined;
                    }>, "many">;
                }, "strip", z.ZodTypeAny, {
                    condition: string;
                    actions: {
                        type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                        severity?: "critical" | "high" | "medium" | "low" | undefined;
                        channels?: string[] | undefined;
                        duration?: string | undefined;
                        for_operations?: string[] | undefined;
                        webhook_url?: string | undefined;
                        risk_score_adjustment?: number | undefined;
                    }[];
                }, {
                    condition: string;
                    actions: {
                        type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                        severity?: "critical" | "high" | "medium" | "low" | undefined;
                        channels?: string[] | undefined;
                        duration?: string | undefined;
                        for_operations?: string[] | undefined;
                        webhook_url?: string | undefined;
                        risk_score_adjustment?: number | undefined;
                    }[];
                }>, "many">>;
            }, "strip", z.ZodTypeAny, {
                triggers?: {
                    condition: string;
                    actions: {
                        type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                        severity?: "critical" | "high" | "medium" | "low" | undefined;
                        channels?: string[] | undefined;
                        duration?: string | undefined;
                        for_operations?: string[] | undefined;
                        webhook_url?: string | undefined;
                        risk_score_adjustment?: number | undefined;
                    }[];
                }[] | undefined;
            }, {
                triggers?: {
                    condition: string;
                    actions: {
                        type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                        severity?: "critical" | "high" | "medium" | "low" | undefined;
                        channels?: string[] | undefined;
                        duration?: string | undefined;
                        for_operations?: string[] | undefined;
                        webhook_url?: string | undefined;
                        risk_score_adjustment?: number | undefined;
                    }[];
                }[] | undefined;
            }>>;
            testing: z.ZodOptional<z.ZodObject<{
                test_mode: z.ZodDefault<z.ZodBoolean>;
                test_scenarios: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    name: z.ZodString;
                    mock_data: z.ZodRecord<z.ZodString, z.ZodAny>;
                    expected_result: z.ZodEnum<["alert_triggered", "no_alert", "error"]>;
                    description: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    mock_data: Record<string, any>;
                    expected_result: "error" | "alert_triggered" | "no_alert";
                    description?: string | undefined;
                }, {
                    name: string;
                    mock_data: Record<string, any>;
                    expected_result: "error" | "alert_triggered" | "no_alert";
                    description?: string | undefined;
                }>, "many">>;
            }, "strip", z.ZodTypeAny, {
                test_mode: boolean;
                test_scenarios?: {
                    name: string;
                    mock_data: Record<string, any>;
                    expected_result: "error" | "alert_triggered" | "no_alert";
                    description?: string | undefined;
                }[] | undefined;
            }, {
                test_mode?: boolean | undefined;
                test_scenarios?: {
                    name: string;
                    mock_data: Record<string, any>;
                    expected_result: "error" | "alert_triggered" | "no_alert";
                    description?: string | undefined;
                }[] | undefined;
            }>>;
            monitoring: z.ZodOptional<z.ZodObject<{
                collect_metrics: z.ZodDefault<z.ZodBoolean>;
                max_execution_time: z.ZodDefault<z.ZodString>;
                max_memory_usage: z.ZodDefault<z.ZodString>;
                retry_on_failure: z.ZodDefault<z.ZodBoolean>;
                max_retries: z.ZodDefault<z.ZodNumber>;
                retry_delay: z.ZodDefault<z.ZodString>;
                health_check_interval: z.ZodDefault<z.ZodString>;
                alert_on_health_failure: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                collect_metrics: boolean;
                max_execution_time: string;
                max_memory_usage: string;
                retry_on_failure: boolean;
                max_retries: number;
                retry_delay: string;
                health_check_interval: string;
                alert_on_health_failure: boolean;
            }, {
                collect_metrics?: boolean | undefined;
                max_execution_time?: string | undefined;
                max_memory_usage?: string | undefined;
                retry_on_failure?: boolean | undefined;
                max_retries?: number | undefined;
                retry_delay?: string | undefined;
                health_check_interval?: string | undefined;
                alert_on_health_failure?: boolean | undefined;
            }>>;
            integrations: z.ZodOptional<z.ZodObject<{
                external_apis: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    name: z.ZodString;
                    url: z.ZodString;
                    auth_type: z.ZodDefault<z.ZodEnum<["none", "api_key", "bearer", "basic"]>>;
                    timeout: z.ZodDefault<z.ZodString>;
                    headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    url: string;
                    auth_type: "none" | "api_key" | "bearer" | "basic";
                    timeout: string;
                    headers?: Record<string, string> | undefined;
                }, {
                    name: string;
                    url: string;
                    auth_type?: "none" | "api_key" | "bearer" | "basic" | undefined;
                    timeout?: string | undefined;
                    headers?: Record<string, string> | undefined;
                }>, "many">>;
                databases: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    name: z.ZodString;
                    type: z.ZodEnum<["postgresql", "mysql", "mongodb", "redis"]>;
                    connection_string_env: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    type: "postgresql" | "mysql" | "mongodb" | "redis";
                    connection_string_env: string;
                }, {
                    name: string;
                    type: "postgresql" | "mysql" | "mongodb" | "redis";
                    connection_string_env: string;
                }>, "many">>;
                message_queues: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    name: z.ZodString;
                    type: z.ZodEnum<["rabbitmq", "kafka", "sqs", "pubsub"]>;
                    queue_name: z.ZodString;
                    config: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
                    queue_name: string;
                    config?: Record<string, any> | undefined;
                }, {
                    name: string;
                    type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
                    queue_name: string;
                    config?: Record<string, any> | undefined;
                }>, "many">>;
            }, "strip", z.ZodTypeAny, {
                external_apis?: {
                    name: string;
                    url: string;
                    auth_type: "none" | "api_key" | "bearer" | "basic";
                    timeout: string;
                    headers?: Record<string, string> | undefined;
                }[] | undefined;
                databases?: {
                    name: string;
                    type: "postgresql" | "mysql" | "mongodb" | "redis";
                    connection_string_env: string;
                }[] | undefined;
                message_queues?: {
                    name: string;
                    type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
                    queue_name: string;
                    config?: Record<string, any> | undefined;
                }[] | undefined;
            }, {
                external_apis?: {
                    name: string;
                    url: string;
                    auth_type?: "none" | "api_key" | "bearer" | "basic" | undefined;
                    timeout?: string | undefined;
                    headers?: Record<string, string> | undefined;
                }[] | undefined;
                databases?: {
                    name: string;
                    type: "postgresql" | "mysql" | "mongodb" | "redis";
                    connection_string_env: string;
                }[] | undefined;
                message_queues?: {
                    name: string;
                    type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
                    queue_name: string;
                    config?: Record<string, any> | undefined;
                }[] | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            type: "address_balance_change" | "position_health_deviation" | "large_transaction_monitor" | "contract_interaction_monitor" | "token_transfer_monitor" | "defi_position_monitor" | "governance_proposal_monitor" | "bridge_transaction_monitor" | "yield_farming_monitor" | "liquidation_risk_monitor" | "flash_loan_monitor" | "mev_activity_monitor" | "whale_movement_monitor" | "unusual_pattern_detector" | "custom_webhook_trigger";
            chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
            severity: "critical" | "high" | "medium" | "low";
            enabled: boolean;
            code?: string | undefined;
            tags?: Record<string, string> | undefined;
            notification_channels?: string[] | undefined;
            description?: string | undefined;
            monitoring?: {
                collect_metrics: boolean;
                max_execution_time: string;
                max_memory_usage: string;
                retry_on_failure: boolean;
                max_retries: number;
                retry_delay: string;
                health_check_interval: string;
                alert_on_health_failure: boolean;
            } | undefined;
            configuration?: Record<string, any> | undefined;
            schedule?: {
                timezone: string;
                interval: number;
                skip_windows?: {
                    start: string;
                    end: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                max_executions_per_hour?: number | undefined;
            } | undefined;
            alert_template?: {
                message?: string | undefined;
                title?: string | undefined;
                include_context?: {
                    transaction_details: boolean;
                    risk_analysis: boolean;
                    historical_comparison: boolean;
                    cross_reference_alerts: boolean;
                    price_impact: boolean;
                } | undefined;
            } | undefined;
            automated_responses?: {
                triggers?: {
                    condition: string;
                    actions: {
                        type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                        severity?: "critical" | "high" | "medium" | "low" | undefined;
                        channels?: string[] | undefined;
                        duration?: string | undefined;
                        for_operations?: string[] | undefined;
                        webhook_url?: string | undefined;
                        risk_score_adjustment?: number | undefined;
                    }[];
                }[] | undefined;
            } | undefined;
            testing?: {
                test_mode: boolean;
                test_scenarios?: {
                    name: string;
                    mock_data: Record<string, any>;
                    expected_result: "error" | "alert_triggered" | "no_alert";
                    description?: string | undefined;
                }[] | undefined;
            } | undefined;
            integrations?: {
                external_apis?: {
                    name: string;
                    url: string;
                    auth_type: "none" | "api_key" | "bearer" | "basic";
                    timeout: string;
                    headers?: Record<string, string> | undefined;
                }[] | undefined;
                databases?: {
                    name: string;
                    type: "postgresql" | "mysql" | "mongodb" | "redis";
                    connection_string_env: string;
                }[] | undefined;
                message_queues?: {
                    name: string;
                    type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
                    queue_name: string;
                    config?: Record<string, any> | undefined;
                }[] | undefined;
            } | undefined;
        }, {
            name: string;
            type: "address_balance_change" | "position_health_deviation" | "large_transaction_monitor" | "contract_interaction_monitor" | "token_transfer_monitor" | "defi_position_monitor" | "governance_proposal_monitor" | "bridge_transaction_monitor" | "yield_farming_monitor" | "liquidation_risk_monitor" | "flash_loan_monitor" | "mev_activity_monitor" | "whale_movement_monitor" | "unusual_pattern_detector" | "custom_webhook_trigger";
            chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
            code?: string | undefined;
            tags?: Record<string, string> | undefined;
            severity?: "critical" | "high" | "medium" | "low" | undefined;
            enabled?: boolean | undefined;
            notification_channels?: string[] | undefined;
            description?: string | undefined;
            monitoring?: {
                collect_metrics?: boolean | undefined;
                max_execution_time?: string | undefined;
                max_memory_usage?: string | undefined;
                retry_on_failure?: boolean | undefined;
                max_retries?: number | undefined;
                retry_delay?: string | undefined;
                health_check_interval?: string | undefined;
                alert_on_health_failure?: boolean | undefined;
            } | undefined;
            configuration?: Record<string, any> | undefined;
            schedule?: {
                timezone?: string | undefined;
                interval?: number | undefined;
                skip_windows?: {
                    start: string;
                    end: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                max_executions_per_hour?: number | undefined;
            } | undefined;
            alert_template?: {
                message?: string | undefined;
                title?: string | undefined;
                include_context?: {
                    transaction_details?: boolean | undefined;
                    risk_analysis?: boolean | undefined;
                    historical_comparison?: boolean | undefined;
                    cross_reference_alerts?: boolean | undefined;
                    price_impact?: boolean | undefined;
                } | undefined;
            } | undefined;
            automated_responses?: {
                triggers?: {
                    condition: string;
                    actions: {
                        type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                        severity?: "critical" | "high" | "medium" | "low" | undefined;
                        channels?: string[] | undefined;
                        duration?: string | undefined;
                        for_operations?: string[] | undefined;
                        webhook_url?: string | undefined;
                        risk_score_adjustment?: number | undefined;
                    }[];
                }[] | undefined;
            } | undefined;
            testing?: {
                test_mode?: boolean | undefined;
                test_scenarios?: {
                    name: string;
                    mock_data: Record<string, any>;
                    expected_result: "error" | "alert_triggered" | "no_alert";
                    description?: string | undefined;
                }[] | undefined;
            } | undefined;
            integrations?: {
                external_apis?: {
                    name: string;
                    url: string;
                    auth_type?: "none" | "api_key" | "bearer" | "basic" | undefined;
                    timeout?: string | undefined;
                    headers?: Record<string, string> | undefined;
                }[] | undefined;
                databases?: {
                    name: string;
                    type: "postgresql" | "mysql" | "mongodb" | "redis";
                    connection_string_env: string;
                }[] | undefined;
                message_queues?: {
                    name: string;
                    type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
                    queue_name: string;
                    config?: Record<string, any> | undefined;
                }[] | undefined;
            } | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        notification_channels: Record<string, {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | (({
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        }) & {
            testing?: {
                test_mode: boolean;
                test_endpoint?: string | undefined;
            } | undefined;
        })>;
        watchlists: Record<string, {
            name: string;
            enabled: boolean;
            assets: {
                type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
                chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
                address: string;
                symbol?: string | undefined;
                name?: string | undefined;
                tags?: string[] | undefined;
            }[];
            options?: {
                auto_disable_on_error: boolean;
                maintenance_windows?: {
                    start: string;
                    end: string;
                    timezone: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                thresholds?: {
                    balance_change_major?: number | undefined;
                    balance_change_critical?: number | undefined;
                    transaction_count_unusual?: number | undefined;
                    value_at_risk?: number | undefined;
                } | undefined;
                enhanced_monitoring?: {
                    risk_scoring: boolean;
                    pattern_detection: boolean;
                    cross_chain_tracking: boolean;
                    sentiment_analysis: boolean;
                    compliance_monitoring: boolean;
                } | undefined;
                priority?: "critical" | "high" | "medium" | "low" | undefined;
            } | undefined;
            tags?: Record<string, string> | undefined;
            description?: string | undefined;
            alert_policy_id?: string | undefined;
            alert_config?: {
                enabled: boolean;
                severity_threshold: "critical" | "high" | "medium" | "low";
                notification_channels?: string[] | undefined;
                rules?: {
                    conditions: {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }[];
                    enabled: boolean;
                    asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                }[] | undefined;
            } | undefined;
            monitoring?: {
                check_interval: number;
                collect_history: boolean;
                retention_days: number;
            } | undefined;
        }>;
        custom_agents: Record<string, {
            name: string;
            type: "address_balance_change" | "position_health_deviation" | "large_transaction_monitor" | "contract_interaction_monitor" | "token_transfer_monitor" | "defi_position_monitor" | "governance_proposal_monitor" | "bridge_transaction_monitor" | "yield_farming_monitor" | "liquidation_risk_monitor" | "flash_loan_monitor" | "mev_activity_monitor" | "whale_movement_monitor" | "unusual_pattern_detector" | "custom_webhook_trigger";
            chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
            severity: "critical" | "high" | "medium" | "low";
            enabled: boolean;
            code?: string | undefined;
            tags?: Record<string, string> | undefined;
            notification_channels?: string[] | undefined;
            description?: string | undefined;
            monitoring?: {
                collect_metrics: boolean;
                max_execution_time: string;
                max_memory_usage: string;
                retry_on_failure: boolean;
                max_retries: number;
                retry_delay: string;
                health_check_interval: string;
                alert_on_health_failure: boolean;
            } | undefined;
            configuration?: Record<string, any> | undefined;
            schedule?: {
                timezone: string;
                interval: number;
                skip_windows?: {
                    start: string;
                    end: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                max_executions_per_hour?: number | undefined;
            } | undefined;
            alert_template?: {
                message?: string | undefined;
                title?: string | undefined;
                include_context?: {
                    transaction_details: boolean;
                    risk_analysis: boolean;
                    historical_comparison: boolean;
                    cross_reference_alerts: boolean;
                    price_impact: boolean;
                } | undefined;
            } | undefined;
            automated_responses?: {
                triggers?: {
                    condition: string;
                    actions: {
                        type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                        severity?: "critical" | "high" | "medium" | "low" | undefined;
                        channels?: string[] | undefined;
                        duration?: string | undefined;
                        for_operations?: string[] | undefined;
                        webhook_url?: string | undefined;
                        risk_score_adjustment?: number | undefined;
                    }[];
                }[] | undefined;
            } | undefined;
            testing?: {
                test_mode: boolean;
                test_scenarios?: {
                    name: string;
                    mock_data: Record<string, any>;
                    expected_result: "error" | "alert_triggered" | "no_alert";
                    description?: string | undefined;
                }[] | undefined;
            } | undefined;
            integrations?: {
                external_apis?: {
                    name: string;
                    url: string;
                    auth_type: "none" | "api_key" | "bearer" | "basic";
                    timeout: string;
                    headers?: Record<string, string> | undefined;
                }[] | undefined;
                databases?: {
                    name: string;
                    type: "postgresql" | "mysql" | "mongodb" | "redis";
                    connection_string_env: string;
                }[] | undefined;
                message_queues?: {
                    name: string;
                    type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
                    queue_name: string;
                    config?: Record<string, any> | undefined;
                }[] | undefined;
            } | undefined;
        }>;
        global?: {
            integrations?: {
                hypernative?: {
                    timeout: string;
                    retry_attempts: number;
                    base_url?: string | undefined;
                    rate_limit?: {
                        requests_per_minute: number;
                        burst_limit: number;
                    } | undefined;
                } | undefined;
                external_services?: Record<string, {
                    auth_type: "none" | "api_key" | "bearer" | "basic";
                    timeout: string;
                    base_url: string;
                    headers?: Record<string, string> | undefined;
                }> | undefined;
            } | undefined;
            project?: {
                name: string;
                environment: "development" | "staging" | "production";
                tags?: Record<string, string> | undefined;
                description?: string | undefined;
                version?: string | undefined;
            } | undefined;
            defaults?: {
                severity_threshold: "critical" | "high" | "medium" | "low";
                timezone: string;
                notification_channels?: string[] | undefined;
                monitoring?: {
                    collect_metrics: boolean;
                    health_checks_enabled: boolean;
                    performance_tracking: boolean;
                } | undefined;
                retry_config?: {
                    max_retries: number;
                    retry_delay: string;
                    exponential_backoff: boolean;
                } | undefined;
                validation_limits?: {
                    max_file_size: number;
                    max_assets_per_watchlist: number;
                    max_resources_total: number;
                    max_name_length: number;
                    max_description_length: number;
                    max_agent_code_length: number;
                } | undefined;
            } | undefined;
            env?: {
                validation?: Record<string, {
                    message?: string | undefined;
                    pattern?: string | undefined;
                }> | undefined;
                required?: string[] | undefined;
                optional?: Record<string, string> | undefined;
            } | undefined;
        } | undefined;
    }, {
        notification_channels?: Record<string, {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | (({
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        }) & {
            testing?: {
                test_mode?: boolean | undefined;
                test_endpoint?: string | undefined;
            } | undefined;
        })> | undefined;
        watchlists?: Record<string, {
            name: string;
            assets: {
                type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
                chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
                address: string;
                symbol?: string | undefined;
                name?: string | undefined;
                tags?: string[] | undefined;
            }[];
            options?: {
                maintenance_windows?: {
                    start: string;
                    end: string;
                    timezone?: string | undefined;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                thresholds?: {
                    balance_change_major?: number | undefined;
                    balance_change_critical?: number | undefined;
                    transaction_count_unusual?: number | undefined;
                    value_at_risk?: number | undefined;
                } | undefined;
                enhanced_monitoring?: {
                    risk_scoring?: boolean | undefined;
                    pattern_detection?: boolean | undefined;
                    cross_chain_tracking?: boolean | undefined;
                    sentiment_analysis?: boolean | undefined;
                    compliance_monitoring?: boolean | undefined;
                } | undefined;
                priority?: "critical" | "high" | "medium" | "low" | undefined;
                auto_disable_on_error?: boolean | undefined;
            } | undefined;
            tags?: Record<string, string> | undefined;
            enabled?: boolean | undefined;
            description?: string | undefined;
            alert_policy_id?: string | undefined;
            alert_config?: {
                enabled?: boolean | undefined;
                severity_threshold?: "critical" | "high" | "medium" | "low" | undefined;
                notification_channels?: string[] | undefined;
                rules?: {
                    conditions: {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }[];
                    asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                    enabled?: boolean | undefined;
                }[] | undefined;
            } | undefined;
            monitoring?: {
                check_interval?: number | undefined;
                collect_history?: boolean | undefined;
                retention_days?: number | undefined;
            } | undefined;
        }> | undefined;
        custom_agents?: Record<string, {
            name: string;
            type: "address_balance_change" | "position_health_deviation" | "large_transaction_monitor" | "contract_interaction_monitor" | "token_transfer_monitor" | "defi_position_monitor" | "governance_proposal_monitor" | "bridge_transaction_monitor" | "yield_farming_monitor" | "liquidation_risk_monitor" | "flash_loan_monitor" | "mev_activity_monitor" | "whale_movement_monitor" | "unusual_pattern_detector" | "custom_webhook_trigger";
            chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
            code?: string | undefined;
            tags?: Record<string, string> | undefined;
            severity?: "critical" | "high" | "medium" | "low" | undefined;
            enabled?: boolean | undefined;
            notification_channels?: string[] | undefined;
            description?: string | undefined;
            monitoring?: {
                collect_metrics?: boolean | undefined;
                max_execution_time?: string | undefined;
                max_memory_usage?: string | undefined;
                retry_on_failure?: boolean | undefined;
                max_retries?: number | undefined;
                retry_delay?: string | undefined;
                health_check_interval?: string | undefined;
                alert_on_health_failure?: boolean | undefined;
            } | undefined;
            configuration?: Record<string, any> | undefined;
            schedule?: {
                timezone?: string | undefined;
                interval?: number | undefined;
                skip_windows?: {
                    start: string;
                    end: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                max_executions_per_hour?: number | undefined;
            } | undefined;
            alert_template?: {
                message?: string | undefined;
                title?: string | undefined;
                include_context?: {
                    transaction_details?: boolean | undefined;
                    risk_analysis?: boolean | undefined;
                    historical_comparison?: boolean | undefined;
                    cross_reference_alerts?: boolean | undefined;
                    price_impact?: boolean | undefined;
                } | undefined;
            } | undefined;
            automated_responses?: {
                triggers?: {
                    condition: string;
                    actions: {
                        type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                        severity?: "critical" | "high" | "medium" | "low" | undefined;
                        channels?: string[] | undefined;
                        duration?: string | undefined;
                        for_operations?: string[] | undefined;
                        webhook_url?: string | undefined;
                        risk_score_adjustment?: number | undefined;
                    }[];
                }[] | undefined;
            } | undefined;
            testing?: {
                test_mode?: boolean | undefined;
                test_scenarios?: {
                    name: string;
                    mock_data: Record<string, any>;
                    expected_result: "error" | "alert_triggered" | "no_alert";
                    description?: string | undefined;
                }[] | undefined;
            } | undefined;
            integrations?: {
                external_apis?: {
                    name: string;
                    url: string;
                    auth_type?: "none" | "api_key" | "bearer" | "basic" | undefined;
                    timeout?: string | undefined;
                    headers?: Record<string, string> | undefined;
                }[] | undefined;
                databases?: {
                    name: string;
                    type: "postgresql" | "mysql" | "mongodb" | "redis";
                    connection_string_env: string;
                }[] | undefined;
                message_queues?: {
                    name: string;
                    type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
                    queue_name: string;
                    config?: Record<string, any> | undefined;
                }[] | undefined;
            } | undefined;
        }> | undefined;
        global?: {
            integrations?: {
                hypernative?: {
                    timeout?: string | undefined;
                    base_url?: string | undefined;
                    retry_attempts?: number | undefined;
                    rate_limit?: {
                        requests_per_minute?: number | undefined;
                        burst_limit?: number | undefined;
                    } | undefined;
                } | undefined;
                external_services?: Record<string, {
                    base_url: string;
                    auth_type?: "none" | "api_key" | "bearer" | "basic" | undefined;
                    timeout?: string | undefined;
                    headers?: Record<string, string> | undefined;
                }> | undefined;
            } | undefined;
            project?: {
                name: string;
                tags?: Record<string, string> | undefined;
                description?: string | undefined;
                version?: string | undefined;
                environment?: "development" | "staging" | "production" | undefined;
            } | undefined;
            defaults?: {
                severity_threshold?: "critical" | "high" | "medium" | "low" | undefined;
                notification_channels?: string[] | undefined;
                timezone?: string | undefined;
                monitoring?: {
                    collect_metrics?: boolean | undefined;
                    health_checks_enabled?: boolean | undefined;
                    performance_tracking?: boolean | undefined;
                } | undefined;
                retry_config?: {
                    max_retries?: number | undefined;
                    retry_delay?: string | undefined;
                    exponential_backoff?: boolean | undefined;
                } | undefined;
                validation_limits?: {
                    max_file_size?: number | undefined;
                    max_assets_per_watchlist?: number | undefined;
                    max_resources_total?: number | undefined;
                    max_name_length?: number | undefined;
                    max_description_length?: number | undefined;
                    max_agent_code_length?: number | undefined;
                } | undefined;
            } | undefined;
            env?: {
                validation?: Record<string, {
                    message?: string | undefined;
                    pattern?: string | undefined;
                }> | undefined;
                required?: string[] | undefined;
                optional?: Record<string, string> | undefined;
            } | undefined;
        } | undefined;
    }>;
    metadata: z.ZodObject<{
        files_loaded: z.ZodArray<z.ZodString, "many">;
        total_resources: z.ZodNumber;
        resource_counts: z.ZodObject<{
            notification_channels: z.ZodNumber;
            watchlists: z.ZodNumber;
            custom_agents: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            notification_channels: number;
            watchlists: number;
            custom_agents: number;
        }, {
            notification_channels: number;
            watchlists: number;
            custom_agents: number;
        }>;
        validation_warnings: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        load_time: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        files_loaded: string[];
        total_resources: number;
        resource_counts: {
            notification_channels: number;
            watchlists: number;
            custom_agents: number;
        };
        validation_warnings?: string[] | undefined;
        load_time?: number | undefined;
    }, {
        files_loaded: string[];
        total_resources: number;
        resource_counts: {
            notification_channels: number;
            watchlists: number;
            custom_agents: number;
        };
        validation_warnings?: string[] | undefined;
        load_time?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    config: {
        notification_channels: Record<string, {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | (({
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        }) & {
            testing?: {
                test_mode: boolean;
                test_endpoint?: string | undefined;
            } | undefined;
        })>;
        watchlists: Record<string, {
            name: string;
            enabled: boolean;
            assets: {
                type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
                chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
                address: string;
                symbol?: string | undefined;
                name?: string | undefined;
                tags?: string[] | undefined;
            }[];
            options?: {
                auto_disable_on_error: boolean;
                maintenance_windows?: {
                    start: string;
                    end: string;
                    timezone: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                thresholds?: {
                    balance_change_major?: number | undefined;
                    balance_change_critical?: number | undefined;
                    transaction_count_unusual?: number | undefined;
                    value_at_risk?: number | undefined;
                } | undefined;
                enhanced_monitoring?: {
                    risk_scoring: boolean;
                    pattern_detection: boolean;
                    cross_chain_tracking: boolean;
                    sentiment_analysis: boolean;
                    compliance_monitoring: boolean;
                } | undefined;
                priority?: "critical" | "high" | "medium" | "low" | undefined;
            } | undefined;
            tags?: Record<string, string> | undefined;
            description?: string | undefined;
            alert_policy_id?: string | undefined;
            alert_config?: {
                enabled: boolean;
                severity_threshold: "critical" | "high" | "medium" | "low";
                notification_channels?: string[] | undefined;
                rules?: {
                    conditions: {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }[];
                    enabled: boolean;
                    asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                }[] | undefined;
            } | undefined;
            monitoring?: {
                check_interval: number;
                collect_history: boolean;
                retention_days: number;
            } | undefined;
        }>;
        custom_agents: Record<string, {
            name: string;
            type: "address_balance_change" | "position_health_deviation" | "large_transaction_monitor" | "contract_interaction_monitor" | "token_transfer_monitor" | "defi_position_monitor" | "governance_proposal_monitor" | "bridge_transaction_monitor" | "yield_farming_monitor" | "liquidation_risk_monitor" | "flash_loan_monitor" | "mev_activity_monitor" | "whale_movement_monitor" | "unusual_pattern_detector" | "custom_webhook_trigger";
            chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
            severity: "critical" | "high" | "medium" | "low";
            enabled: boolean;
            code?: string | undefined;
            tags?: Record<string, string> | undefined;
            notification_channels?: string[] | undefined;
            description?: string | undefined;
            monitoring?: {
                collect_metrics: boolean;
                max_execution_time: string;
                max_memory_usage: string;
                retry_on_failure: boolean;
                max_retries: number;
                retry_delay: string;
                health_check_interval: string;
                alert_on_health_failure: boolean;
            } | undefined;
            configuration?: Record<string, any> | undefined;
            schedule?: {
                timezone: string;
                interval: number;
                skip_windows?: {
                    start: string;
                    end: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                max_executions_per_hour?: number | undefined;
            } | undefined;
            alert_template?: {
                message?: string | undefined;
                title?: string | undefined;
                include_context?: {
                    transaction_details: boolean;
                    risk_analysis: boolean;
                    historical_comparison: boolean;
                    cross_reference_alerts: boolean;
                    price_impact: boolean;
                } | undefined;
            } | undefined;
            automated_responses?: {
                triggers?: {
                    condition: string;
                    actions: {
                        type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                        severity?: "critical" | "high" | "medium" | "low" | undefined;
                        channels?: string[] | undefined;
                        duration?: string | undefined;
                        for_operations?: string[] | undefined;
                        webhook_url?: string | undefined;
                        risk_score_adjustment?: number | undefined;
                    }[];
                }[] | undefined;
            } | undefined;
            testing?: {
                test_mode: boolean;
                test_scenarios?: {
                    name: string;
                    mock_data: Record<string, any>;
                    expected_result: "error" | "alert_triggered" | "no_alert";
                    description?: string | undefined;
                }[] | undefined;
            } | undefined;
            integrations?: {
                external_apis?: {
                    name: string;
                    url: string;
                    auth_type: "none" | "api_key" | "bearer" | "basic";
                    timeout: string;
                    headers?: Record<string, string> | undefined;
                }[] | undefined;
                databases?: {
                    name: string;
                    type: "postgresql" | "mysql" | "mongodb" | "redis";
                    connection_string_env: string;
                }[] | undefined;
                message_queues?: {
                    name: string;
                    type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
                    queue_name: string;
                    config?: Record<string, any> | undefined;
                }[] | undefined;
            } | undefined;
        }>;
        global?: {
            integrations?: {
                hypernative?: {
                    timeout: string;
                    retry_attempts: number;
                    base_url?: string | undefined;
                    rate_limit?: {
                        requests_per_minute: number;
                        burst_limit: number;
                    } | undefined;
                } | undefined;
                external_services?: Record<string, {
                    auth_type: "none" | "api_key" | "bearer" | "basic";
                    timeout: string;
                    base_url: string;
                    headers?: Record<string, string> | undefined;
                }> | undefined;
            } | undefined;
            project?: {
                name: string;
                environment: "development" | "staging" | "production";
                tags?: Record<string, string> | undefined;
                description?: string | undefined;
                version?: string | undefined;
            } | undefined;
            defaults?: {
                severity_threshold: "critical" | "high" | "medium" | "low";
                timezone: string;
                notification_channels?: string[] | undefined;
                monitoring?: {
                    collect_metrics: boolean;
                    health_checks_enabled: boolean;
                    performance_tracking: boolean;
                } | undefined;
                retry_config?: {
                    max_retries: number;
                    retry_delay: string;
                    exponential_backoff: boolean;
                } | undefined;
                validation_limits?: {
                    max_file_size: number;
                    max_assets_per_watchlist: number;
                    max_resources_total: number;
                    max_name_length: number;
                    max_description_length: number;
                    max_agent_code_length: number;
                } | undefined;
            } | undefined;
            env?: {
                validation?: Record<string, {
                    message?: string | undefined;
                    pattern?: string | undefined;
                }> | undefined;
                required?: string[] | undefined;
                optional?: Record<string, string> | undefined;
            } | undefined;
        } | undefined;
    };
    metadata: {
        files_loaded: string[];
        total_resources: number;
        resource_counts: {
            notification_channels: number;
            watchlists: number;
            custom_agents: number;
        };
        validation_warnings?: string[] | undefined;
        load_time?: number | undefined;
    };
}, {
    config: {
        notification_channels?: Record<string, {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | (({
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        } | {
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
        }) & {
            testing?: {
                test_mode?: boolean | undefined;
                test_endpoint?: string | undefined;
            } | undefined;
        })> | undefined;
        watchlists?: Record<string, {
            name: string;
            assets: {
                type: "Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT";
                chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
                address: string;
                symbol?: string | undefined;
                name?: string | undefined;
                tags?: string[] | undefined;
            }[];
            options?: {
                maintenance_windows?: {
                    start: string;
                    end: string;
                    timezone?: string | undefined;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                thresholds?: {
                    balance_change_major?: number | undefined;
                    balance_change_critical?: number | undefined;
                    transaction_count_unusual?: number | undefined;
                    value_at_risk?: number | undefined;
                } | undefined;
                enhanced_monitoring?: {
                    risk_scoring?: boolean | undefined;
                    pattern_detection?: boolean | undefined;
                    cross_chain_tracking?: boolean | undefined;
                    sentiment_analysis?: boolean | undefined;
                    compliance_monitoring?: boolean | undefined;
                } | undefined;
                priority?: "critical" | "high" | "medium" | "low" | undefined;
                auto_disable_on_error?: boolean | undefined;
            } | undefined;
            tags?: Record<string, string> | undefined;
            enabled?: boolean | undefined;
            description?: string | undefined;
            alert_policy_id?: string | undefined;
            alert_config?: {
                enabled?: boolean | undefined;
                severity_threshold?: "critical" | "high" | "medium" | "low" | undefined;
                notification_channels?: string[] | undefined;
                rules?: {
                    conditions: {
                        type: "balance_change" | "transaction_volume" | "unusual_activity" | "security_incident" | "governance_event" | "price_change" | "liquidity_change";
                        threshold: string | number;
                        direction?: "increase" | "decrease" | "both" | undefined;
                        timeframe?: string | undefined;
                    }[];
                    asset_types?: ("Wallet" | "Protocol" | "Token" | "Contract" | "Pool" | "NFT")[] | undefined;
                    severity?: "critical" | "high" | "medium" | "low" | undefined;
                    enabled?: boolean | undefined;
                }[] | undefined;
            } | undefined;
            monitoring?: {
                check_interval?: number | undefined;
                collect_history?: boolean | undefined;
                retention_days?: number | undefined;
            } | undefined;
        }> | undefined;
        custom_agents?: Record<string, {
            name: string;
            type: "address_balance_change" | "position_health_deviation" | "large_transaction_monitor" | "contract_interaction_monitor" | "token_transfer_monitor" | "defi_position_monitor" | "governance_proposal_monitor" | "bridge_transaction_monitor" | "yield_farming_monitor" | "liquidation_risk_monitor" | "flash_loan_monitor" | "mev_activity_monitor" | "whale_movement_monitor" | "unusual_pattern_detector" | "custom_webhook_trigger";
            chain: "ethereum" | "polygon" | "bsc" | "avalanche" | "arbitrum" | "optimism" | "base" | "fantom" | "gnosis" | "celo";
            code?: string | undefined;
            tags?: Record<string, string> | undefined;
            severity?: "critical" | "high" | "medium" | "low" | undefined;
            enabled?: boolean | undefined;
            notification_channels?: string[] | undefined;
            description?: string | undefined;
            monitoring?: {
                collect_metrics?: boolean | undefined;
                max_execution_time?: string | undefined;
                max_memory_usage?: string | undefined;
                retry_on_failure?: boolean | undefined;
                max_retries?: number | undefined;
                retry_delay?: string | undefined;
                health_check_interval?: string | undefined;
                alert_on_health_failure?: boolean | undefined;
            } | undefined;
            configuration?: Record<string, any> | undefined;
            schedule?: {
                timezone?: string | undefined;
                interval?: number | undefined;
                skip_windows?: {
                    start: string;
                    end: string;
                    days?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[] | undefined;
                }[] | undefined;
                max_executions_per_hour?: number | undefined;
            } | undefined;
            alert_template?: {
                message?: string | undefined;
                title?: string | undefined;
                include_context?: {
                    transaction_details?: boolean | undefined;
                    risk_analysis?: boolean | undefined;
                    historical_comparison?: boolean | undefined;
                    cross_reference_alerts?: boolean | undefined;
                    price_impact?: boolean | undefined;
                } | undefined;
            } | undefined;
            automated_responses?: {
                triggers?: {
                    condition: string;
                    actions: {
                        type: "notify_additional_channels" | "create_incident" | "pause_automated_trading" | "require_manual_approval" | "webhook_call" | "update_risk_score";
                        severity?: "critical" | "high" | "medium" | "low" | undefined;
                        channels?: string[] | undefined;
                        duration?: string | undefined;
                        for_operations?: string[] | undefined;
                        webhook_url?: string | undefined;
                        risk_score_adjustment?: number | undefined;
                    }[];
                }[] | undefined;
            } | undefined;
            testing?: {
                test_mode?: boolean | undefined;
                test_scenarios?: {
                    name: string;
                    mock_data: Record<string, any>;
                    expected_result: "error" | "alert_triggered" | "no_alert";
                    description?: string | undefined;
                }[] | undefined;
            } | undefined;
            integrations?: {
                external_apis?: {
                    name: string;
                    url: string;
                    auth_type?: "none" | "api_key" | "bearer" | "basic" | undefined;
                    timeout?: string | undefined;
                    headers?: Record<string, string> | undefined;
                }[] | undefined;
                databases?: {
                    name: string;
                    type: "postgresql" | "mysql" | "mongodb" | "redis";
                    connection_string_env: string;
                }[] | undefined;
                message_queues?: {
                    name: string;
                    type: "rabbitmq" | "kafka" | "sqs" | "pubsub";
                    queue_name: string;
                    config?: Record<string, any> | undefined;
                }[] | undefined;
            } | undefined;
        }> | undefined;
        global?: {
            integrations?: {
                hypernative?: {
                    timeout?: string | undefined;
                    base_url?: string | undefined;
                    retry_attempts?: number | undefined;
                    rate_limit?: {
                        requests_per_minute?: number | undefined;
                        burst_limit?: number | undefined;
                    } | undefined;
                } | undefined;
                external_services?: Record<string, {
                    base_url: string;
                    auth_type?: "none" | "api_key" | "bearer" | "basic" | undefined;
                    timeout?: string | undefined;
                    headers?: Record<string, string> | undefined;
                }> | undefined;
            } | undefined;
            project?: {
                name: string;
                tags?: Record<string, string> | undefined;
                description?: string | undefined;
                version?: string | undefined;
                environment?: "development" | "staging" | "production" | undefined;
            } | undefined;
            defaults?: {
                severity_threshold?: "critical" | "high" | "medium" | "low" | undefined;
                notification_channels?: string[] | undefined;
                timezone?: string | undefined;
                monitoring?: {
                    collect_metrics?: boolean | undefined;
                    health_checks_enabled?: boolean | undefined;
                    performance_tracking?: boolean | undefined;
                } | undefined;
                retry_config?: {
                    max_retries?: number | undefined;
                    retry_delay?: string | undefined;
                    exponential_backoff?: boolean | undefined;
                } | undefined;
                validation_limits?: {
                    max_file_size?: number | undefined;
                    max_assets_per_watchlist?: number | undefined;
                    max_resources_total?: number | undefined;
                    max_name_length?: number | undefined;
                    max_description_length?: number | undefined;
                    max_agent_code_length?: number | undefined;
                } | undefined;
            } | undefined;
            env?: {
                validation?: Record<string, {
                    message?: string | undefined;
                    pattern?: string | undefined;
                }> | undefined;
                required?: string[] | undefined;
                optional?: Record<string, string> | undefined;
            } | undefined;
        } | undefined;
    };
    metadata: {
        files_loaded: string[];
        total_resources: number;
        resource_counts: {
            notification_channels: number;
            watchlists: number;
            custom_agents: number;
        };
        validation_warnings?: string[] | undefined;
        load_time?: number | undefined;
    };
}>;
export declare const configValidationErrorSchema: z.ZodObject<{
    file_path: z.ZodString;
    line_number: z.ZodOptional<z.ZodNumber>;
    column_number: z.ZodOptional<z.ZodNumber>;
    resource_type: z.ZodOptional<z.ZodString>;
    resource_name: z.ZodOptional<z.ZodString>;
    error_code: z.ZodString;
    message: z.ZodString;
    details: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    suggestions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    message: string;
    file_path: string;
    error_code: string;
    line_number?: number | undefined;
    column_number?: number | undefined;
    resource_type?: string | undefined;
    resource_name?: string | undefined;
    details?: Record<string, any> | undefined;
    suggestions?: string[] | undefined;
}, {
    message: string;
    file_path: string;
    error_code: string;
    line_number?: number | undefined;
    column_number?: number | undefined;
    resource_type?: string | undefined;
    resource_name?: string | undefined;
    details?: Record<string, any> | undefined;
    suggestions?: string[] | undefined;
}>;
export declare const crossReferenceValidationSchema: z.ZodObject<{
    valid: z.ZodBoolean;
    missing_references: z.ZodOptional<z.ZodArray<z.ZodObject<{
        resource_type: z.ZodString;
        resource_name: z.ZodString;
        reference_type: z.ZodString;
        reference_name: z.ZodString;
        file_path: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        file_path: string;
        resource_type: string;
        resource_name: string;
        reference_type: string;
        reference_name: string;
    }, {
        file_path: string;
        resource_type: string;
        resource_name: string;
        reference_type: string;
        reference_name: string;
    }>, "many">>;
    circular_references: z.ZodOptional<z.ZodArray<z.ZodObject<{
        cycle: z.ZodArray<z.ZodString, "many">;
        file_paths: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        cycle: string[];
        file_paths: string[];
    }, {
        cycle: string[];
        file_paths: string[];
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    valid: boolean;
    missing_references?: {
        file_path: string;
        resource_type: string;
        resource_name: string;
        reference_type: string;
        reference_name: string;
    }[] | undefined;
    circular_references?: {
        cycle: string[];
        file_paths: string[];
    }[] | undefined;
}, {
    valid: boolean;
    missing_references?: {
        file_path: string;
        resource_type: string;
        resource_name: string;
        reference_type: string;
        reference_name: string;
    }[] | undefined;
    circular_references?: {
        cycle: string[];
        file_paths: string[];
    }[] | undefined;
}>;
export type RootConfig = z.infer<typeof rootConfigSchema>;
export type ParsedConfig = z.infer<typeof parsedConfigSchema>;
export type ConfigLoadResult = z.infer<typeof configLoadResultSchema>;
export type ConfigValidationError = z.infer<typeof configValidationErrorSchema>;
export type CrossReferenceValidation = z.infer<typeof crossReferenceValidationSchema>;
export type ResourceCollections = {
    notification_channels: Record<string, CompleteNotificationChannelConfig>;
    watchlists: Record<string, WatchlistConfig>;
    custom_agents: Record<string, CustomAgentConfig>;
};
export declare function createEmptyParsedConfig(): ParsedConfig;
//# sourceMappingURL=config.schema.d.ts.map