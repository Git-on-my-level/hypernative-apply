---
description: >-
  This page provides documentation for the Custom Agents endpoint. Learn how to
  create, update, delete, and retrieve Custom Agent data
---

# Custom Agents

## Endpoints

### Custom Agent retrieval

## Retrieve all Custom Agents linked to the currently logged-in user.

<mark style="color:blue;">`GET`</mark> `https://api.hypernative.xyz/custom-agents`

#### Headers

| Name                                     | Type             | Description                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accept<br /><mark style="color:red;">Required</mark> | application/json |                                                                                                                                                                                                                                                                                                                                                         |
| x-client-id                              | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                       |
| x-client-secret                          | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                                   |
| authorization                            | String           | <p>Required if you prefer to login with a member's identity. See <a href="../account/login.md">Login with Email and Password</a> or <a href="../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |

{% tabs %}
{% tab title="200: OK " %}

{% endtab %}
{% endtabs %}

#### Example

{% tabs %}
{% tab title="Curl" %}
```bash
curl -X 'GET' \
  'https://api.hypernative.xyz/custom-agents' \
  -H 'accept: application/json' \
  -H 'x-client-id: <API Client ID> \'
  -H 'x-client-secret: <API Client Secret> \'
```
{% endtab %}

{% tab title="Python" %}
```python
endpoint = "https://api.hypernative.xyz/custom-agents"
headers = {
    "x-client-id": <API Client ID>,
  "x-client-secret": <API Client Secret>,
    "Content-Type": "application/json"
}
response = requests.get(endpoint, headers=headers).json()
```
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

```json
{
  "results": [
    {
      "id": 0,
      "agentName": "string",
      "agentType": "string",
      "severity": "string",
      "muteDuration": 0,
      "state": "enabled",
      "ruleString": "",
      "chain":"ethereum",
      "alertPolicies": [
        {
          "id": {},
          "channelsConfigurations": [
          {
            "id": 27,
            "name": "Webhook-1",
            "type": "Webhook",
            "configuration": {
              "value": "https://mywebhook.com",
              "headers": [
                {
                  "key": "header1",
                  "value": "value1"
                },
                {
                  "key": "header2",
                  "value": "value2"
                }
              ]
            },
            "createdByUserId": 1,
            "createdBy": "",
            "createdAt": "2023-06-25T09:11:01.504Z",
            "updatedAt": "2023-10-22T12:01:56.320Z",
            "channelsAlertPolicies": [],
            "remindersAlertPolicies": []
          }
        ],
          "remindersConfigurations": [],
          "categories": [
            "Governance"
          ],
          "severities": [
            "Info"
          ],
          "typeIds": [
            "string"
          ],
          "watchlists": [
            "string"
          ]
        }
      ],
      "alertsTagsStats": [
        {
          "name": "All",
          "count": 0
        }
      ],
      "createdByUserId": 0,
      "createdBy": "string",
      "createdAt": "2023-06-11T14:14:06.930Z",
      "updatedAt": "2023-06-11T14:14:06.930Z",
      "lastTriggered": "2023-06-11T14:14:06.930Z"
    }
  ],
  "totalCount": 0,
  "remainingCount": 0
}
```

</details>

### Custom Agent creation

## Create a new Custom Agent (depends on Custom Agent Type)

<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/custom-agents`

#### Headers

| Name                                     | Type             | Description                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accept<br /><mark style="color:red;">Required</mark> | application/json |                                                                                                                                                                                                                                                                                                                                                         |
| x-client-id                              | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                       |
| x-client-secret                          | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                                   |
| authorization                            | String           | <p>Required if you prefer to login with a member's identity. See <a href="../account/login.md">Login with Email and Password</a> or <a href="../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |

#### Request Body

| Name                                                     | Type   | Description                                                                                                                                      |
| -------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| agentType<br /><mark style="color:red;">Required</mark>              | string |                                                                                                                                                  |
| channelsConfigurations<br /><mark style="color:red;">Required</mark> | array  | <p>array of objects</p><p>that consists of notifcation channel id's and names</p><p>passing an empty array will result in only in-app alerts</p> |
| rule<br /><mark style="color:red;">Required</mark>                   | object | see Custom Agent types                                                                                                                           |
| muteDuration                                             | number |                                                                                                                                                  |
| severity<br /><mark style="color:red;">Required</mark>               | string | High \| Medium                                                                                                                                   |
| agentName<br /><mark style="color:red;">Required</mark>              | string |                                                                                                                                                  |
| remindersConfigurations                                  | array  | <p>same as</p><p><code>channelsConfigurations</code></p><p>but not supported in all Custom Agent types</p>                                       |
| state<br /><mark style="color:red;">Required</mark>                  | string | enabled \| disabled                                                                                                                              |

{% tabs %}
{% tab title="201: Created " %}

{% endtab %}
{% endtabs %}

#### Example

{% tabs %}
{% tab title="Curl" %}
```bash
curl -X 'POST' \
  'https://api.hypernative.xyz/custom-agents' \
  -H 'accept: application/json' \
  -H 'x-client-id: <API Client ID> \'
  -H 'x-client-secret: <API Client Secret> \'
  -d '{
      "agentName": "string",
      "agentType": "string",
      "severity": "High",
      "muteDuration": 0,
      "state": "enabled",
      "rule": { #depends on the agent type
        "direction": "below",
        "threshold": 2.2,
        "peggedAsset": "0xdac17f958d2ee523a2206206994597c13d831ec7",
        "linkAsset": "USD",
        "chain": "ethereum"
      },
      "channelsConfigurations": [
        {
          "id": 1,
          "name": "Email-1"
        },
        {
          "id": 2,
          "name": "Email-2"
        },
        {
          "id": 3,
          "name": "Slack-1"
        },
        {
          "id": 4,
          "name": "Slack-2"
        }
      ],
      "remindersConfigurations": []
  }'
```
{% endtab %}

{% tab title="Python" %}
```python
endpoint = "https://api.hypernative.xyz/custom-agents"
headers = {
    "x-client-id": <API Client ID>,
  "x-client-secret": <API Client Secret>,
    "Content-Type": "application/json"
}
payload = {
    "agentName": "string",
    "agentType": "string",
    "severity": "High",
    "muteDuration": 0,
    "state": "enabled",
    "rule": { #depends on the agent type
      "direction": "below",
      "threshold": 2.2,
      "peggedAsset": "0xdac17f958d2ee523a2206206994597c13d831ec7",
      "linkAsset": "USD",
      "chain": "ethereum"
    },
    "channelsConfigurations": [
      {
        "id": 1,
        "name": "Email-1"
      },
      {
        "id": 2,
        "name": "Email-2"
      },
      {
        "id": 3,
        "name": "Slack-1"
      },
      {
        "id": 4,
        "name": "Slack-2"
      }
    ],
    "remindersConfigurations": []
}
response = requests.post(endpoint, json=payload, headers=headers).json()
```
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

```json
{
  "id": 0,
  "agentName": "string",
  "agentType": "string",
  "severity": "string",
  "muteDuration": 0,
  "state": "enabled",
  "rule": {},
  "alertPolicies": [
    {
      "id": {},
      "channelsConfigurations": [
        {
          "id": 27,
          "name": "Webhook-1",
          "type": "Webhook",
          "configuration": {
            "value": "https://mywebhook.com",
            "headers": [
              {
                "key": "header1",
                "value": "value1"
              },
              {
                "key": "header2",
                "value": "value2"
              }
            ]
          },
          "createdByUserId": 1,
          "createdBy": "",
          "createdAt": "2023-06-25T09:11:01.504Z",
          "updatedAt": "2023-10-22T12:01:56.320Z",
          "channelsAlertPolicies": [],
          "remindersAlertPolicies": []
        }
      ],
      "remindersConfigurations": [],
      "categories": [
        "Governance"
      ],
      "severities": [
        "Info"
      ],
      "typeIds": [
        "string"
      ],
      "watchlists": [
        "string"
      ]
    }
  ],
  "alertsTagsStats": [
    {
      "name": "All",
      "count": 0
    }
  ],
  "createdByUserId": 0,
  "createdBy": "string",
  "createdAt": "2023-06-11T14:16:29.532Z",
  "updatedAt": "2023-06-11T14:16:29.532Z",
  "lastTriggered": "2023-06-11T14:16:29.532Z"
}
```

</details>

### Custom Agent retrieval by ID

## Retrieve Custom Agent by ID.

<mark style="color:blue;">`GET`</mark> `https://api.hypernative.xyz/custom-agents/{id}`

#### Headers

| Name                                     | Type             | Description                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accept<br /><mark style="color:red;">Required</mark> | application/json |                                                                                                                                                                                                                                                                                                                                                         |
| x-client-id                              | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                       |
| x-client-secret                          | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                                   |
| authorization                            | String           | <p>Required if you prefer to login with a member's identity. See <a href="../account/login.md">Login with Email and Password</a> or <a href="../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |

{% tabs %}
{% tab title="200: OK " %}

{% endtab %}
{% endtabs %}

#### Example

{% tabs %}
{% tab title="Curl" %}
```bash
curl -X 'GET' \
  'https://api.hypernative.xyz/custom-agents/{id}' \
  -H 'accept: application/json' \
  -H 'x-client-id: <API Client ID> \'
  -H 'x-client-secret: <API Client Secret> \'
```
{% endtab %}

{% tab title="Python" %}
```python
endpoint = "https://api.hypernative.xyz/custom-agents/{id}"
headers = {
    "x-client-id": <API Client ID>,
  "x-client-secret": <API Client Secret>,
    "Content-Type": "application/json"
}
response = requests.get(endpoint, headers=headers).json()
```
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

```json
{
  "id": 0,
  "agentName": "string",
  "agentType": "string",
  "severity": "string",
  "muteDuration": 0,
  "state": "enabled",
  "rule": {},
  "alertPolicies": [
    {
      "id": {},
      "channelsConfigurations": [
        {
          "id": 27,
          "name": "Webhook-1",
          "type": "Webhook",
          "configuration": {
            "value": "https://mywebhook.com",
            "headers": [
              {
                "key": "header1",
                "value": "value1"
              },
              {
                "key": "header2",
                "value": "value2"
              }
            ]
          },
          "createdByUserId": 1,
          "createdBy": "",
          "createdAt": "2023-06-25T09:11:01.504Z",
          "updatedAt": "2023-10-22T12:01:56.320Z",
          "channelsAlertPolicies": [],
          "remindersAlertPolicies": []
        }
      ],
      "remindersConfigurations": [],
      "categories": [
        "Governance"
      ],
      "severities": [
        "Info"
      ],
      "typeIds": [
        "string"
      ],
      "watchlists": [
        "string"
      ]
    }
  ],
  "alertsTagsStats": [
    {
      "name": "All",
      "count": 0
    }
  ],
  "createdByUserId": 0,
  "createdBy": "string",
  "createdAt": "2023-06-11T14:20:42.265Z",
  "updatedAt": "2023-06-11T14:20:42.265Z",
  "lastTriggered": "2023-06-11T14:20:42.265Z"
}
```

</details>

### Custom Agent update by ID

## Update Custom Agent by ID.

<mark style="color:purple;">`PATCH`</mark> `https://api.hypernative.xyz/custom-agents/{id}`

#### Headers

| Name                                     | Type             | Description                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accept<br /><mark style="color:red;">Required</mark> | application/json |                                                                                                                                                                                                                                                                                                                                                         |
| x-client-id                              | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                       |
| x-client-secret                          | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                                   |
| authorization                            | String           | <p>Required if you prefer to login with a member's identity. See <a href="../account/login.md">Login with Email and Password</a> or <a href="../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |

#### Request Body

| Name                                    | Type   | Description                                                                                                                                      |
| --------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| channelsConfigurations                  | array  | <p>array of objects</p><p>that consists of notifcation channel id's and names</p><p>passing an empty array will result in only in-app alerts</p> |
| rule                                    | object | see Custom Agent types                                                                                                                           |
| muteDuration                            | number |                                                                                                                                                  |
| severity                                | string | High \| Medium                                                                                                                                   |
| agentName                               | string |                                                                                                                                                  |
| remindersConfigurations                 | array  | <p>same as</p><p><code>channelsConfigurations</code></p><p>but not supported in all Custom Agent types</p>                                       |
| state<br /><mark style="color:red;">Required</mark> | string | enabled \| disabled                                                                                                                              |

{% tabs %}
{% tab title="200: OK " %}

{% endtab %}
{% endtabs %}

#### Example

{% tabs %}
{% tab title="Curl" %}
```bash
curl -X 'PATCH' \
  'https://api.hypernative.xyz/custom-agents/{id}' \
  -H 'accept: application/json' \
  -H 'x-client-id: <API Client ID> \'
  -H 'x-client-secret: <API Client Secret> \'
  -d '{
      "agentName": "string",
      "severity": "High",
      "muteDuration": 0,
      "state": "enabled",
      "rule": { #depends on the agent type
        "direction": "below",
        "threshold": 2.2,
        "peggedAsset": "0xdac17f958d2ee523a2206206994597c13d831ec7",
        "linkAsset": "USD",
        "chain": "ethereum"
      },
      "channelsConfigurations": [
        {
          "id": 1,
          "name": "Email-1"
        },
        {
          "id": 2,
          "name": "Email-2"
        },
        {
          "id": 3,
          "name": "Slack-1"
        },
        {
          "id": 4,
          "name": "Slack-2"
        }
      ],
      "remindersConfigurations": []
  }'
```
{% endtab %}

{% tab title="Python" %}
```python
endpoint = "https://api.hypernative.xyz/custom-agents"
headers = {
    "x-client-id": <API Client ID>,
  "x-client-secret": <API Client Secret>,
    "Content-Type": "application/json"
}
payload = {
      "agentName": "string",
      "severity": "High",
      "muteDuration": 0,
      "state": "enabled",
      "rule": { #depends on the agent type
        "direction": "below",
        "threshold": 2.2,
        "peggedAsset": "0xdac17f958d2ee523a2206206994597c13d831ec7",
        "linkAsset": "USD",
        "chain": "ethereum"
      },
      "channelsConfigurations": [
        {
          "channelType": "Slack",
          "configuration": {
            "url": [
              "string"
            ]
          }
        }
      ],
      "remindersConfigurations": [
        {
          "channelType": "Email",
          "configuration": {
            "email": [
              "string"
            ]
          }
        }
      ]
  }
response = requests.patch(endpoint, headers=headers, json=payload).json()
```
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

```json
{
  "agentName": "string",
  "agentType": "string",
  "severity": "Info",
  "muteDuration": 0,
  "state": "enabled",
  "rule": {},
  "channelsConfigurations": [
      {
        "id": 27,
        "name": "Webhook-1",
        "type": "Webhook",
        "configuration": {
          "value": "https://mywebhook.com",
          "headers": [
            {
              "key": "header1",
              "value": "value1"
            },
            {
              "key": "header2",
              "value": "value2"
            }
          ]
        },
        "createdByUserId": 1,
        "createdBy": "",
        "createdAt": "2023-06-25T09:11:01.504Z",
        "updatedAt": "2023-10-22T12:01:56.320Z",
        "channelsAlertPolicies": [],
        "remindersAlertPolicies": []
      }
  ],
  "remindersConfigurations": []
}
```

</details>

### Custom Agent deletion

## Delete Custom Agent by ID.

<mark style="color:red;">`DELETE`</mark> `https://api.hypernative.xyz/custom-agents/{id}`

#### Headers

| Name                                     | Type             | Description                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accept<br /><mark style="color:red;">Required</mark> | application/json |                                                                                                                                                                                                                                                                                                                                                         |
| x-client-id                              | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                       |
| x-client-secret                          | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                                   |
| authorization                            | String           | <p>Required if you prefer to login with a member's identity. See <a href="../account/login.md">Login with Email and Password</a> or <a href="../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |

{% tabs %}
{% tab title="200: OK " %}

{% endtab %}
{% endtabs %}

#### Example

{% tabs %}
{% tab title="Curl" %}
```bash
curl -X 'DELETE' \
  'https://api.hypernative.xyz/custom-agents/{id}' \
  -H 'accept: application/json' \
  -H 'x-client-id: <API Client ID> \'
  -H 'x-client-secret: <API Client Secret> \'
```
{% endtab %}

{% tab title="Python" %}
```python
endpoint = "https://api.hypernative.xyz/custom-agents/{id}"
headers = {
    "x-client-id": <API Client ID>,
  "x-client-secret": <API Client Secret>,
    "Content-Type": "application/json"
}
response = requests.delete(endpoint, headers=headers).json()
```
{% endtab %}
{% endtabs %}

## Custom Agent Types

{% content-ref url="configuration-examples/" %}
[configuration-examples](configuration-examples/)
{% endcontent-ref %}
