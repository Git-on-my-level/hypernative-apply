# 🔵 Get All Custom Agents

### Custom Agent retrieval

## Retrieve all Custom Agents linked to the currently logged-in user.

<mark style="color:blue;">`GET`</mark> `https://api.hypernative.xyz/custom-agents`

#### Headers

| Name                                     | Type                                                                      | Description                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accept<br /><mark style="color:red;">Required</mark> | application/json                                                          |                                                                                                                                                                                                                                                                                                                                                         |
| x-client-id                              | String                                                                    | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                       |
| x-client-secret                          | String                                                                    | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                                   |
| authorization                            | String                                                                    | <p>Required if you prefer to login with a member's identity. See <a href="../account/login.md">Login with Email and Password</a> or <a href="../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |
| limit                                    | Number                                                                    | Presents a page of results. This is useful for receiving faster response times. By default, all results are returned.                                                                                                                                                                                                                                   |
| offset                                   | Number                                                                    | Request results starting from a given index number. This is useful for receiving faster response times. By default, all results are returned.                                                                                                                                                                                                           |
| sort                                     | Enum of `Id, agentName, severity, state, createdBy, createdAt, updatedAt` | Sort the results by a given field. By default, results are returned in no particular order.                                                                                                                                                                                                                                                             |
| order                                    | Enum of `Asc, Desc`                                                       | <p>Sort the results ascending or descending.</p><p>Default: <code>Asc</code></p>                                                                                                                                                                                                                                                                        |

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
                "id": 215,
                "agentName": "functionCallDetection",
                "agentType": "functionCallDetection",
                "severity": "Medium",
                "muteDuration": 0,
                "delay": 600,
                "chain": "ethereum",
                "ruleString": "On Ethereum: when function pausePoolSwaps() of 0x29..eB3D is called",
                "createdAt": "2023-05-29T13:22:03.689Z",
                "updatedAt": "2023-09-26T18:22:03.993Z",
                "state": "enabled",
                "createdBy": "LB",
                "createdByUserId": 8,
                "alertPolicies": [
                    {
                        "id": 794,
                        "channelsConfigurations": [],
                        "remindersConfigurations": [],
                        "categories": [],
                        "severities": [],
                        "typeIds": [],
                        "involvementTypes": []
                    }
                ],
                "alertsTagsStats": [
                    {
                        "count": 0,
                        "name": "All"
                    },
                    {
                        "count": 0,
                        "name": "Read"
                    },
                    {
                        "count": 0,
                        "name": "Unread"
                    },
                    {
                        "count": 0,
                        "name": "Important"
                    },
                    {
                        "count": 0,
                        "name": "Dismissed"
                    }
                ],
                "securitySuits": [
                    {
                        "id": 79,
                        "name": "Test1"
                    }
                ]
            }
```

</details>
