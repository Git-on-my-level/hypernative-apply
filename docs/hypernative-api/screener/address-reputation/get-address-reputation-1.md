# 🟢 Get Address Reputation (Screener)

Retrieve the reputation details for one or more addresses, including flags and a recommendation based on a specific Screener Policy.

For more information regarding screener vist:

{% content-ref url="../../../../address-screening.md" %}
[address-screening.md](../../../../address-screening.md)
{% endcontent-ref %}

***

### Endpoint

<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/screener/reputation`

### Request Headers

| Header                                                             | Type             | Description                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------------------------------------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <p>Content-Type<br><mark style="color:red;">Required</mark></p>    | application/json |                                                                                                                                                                                                                                                                                                                                                               |
| <p>x-client-id<br><mark style="color:red;">Required</mark></p>     | String           | Required if you use [API Keys](../../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                          |
| <p>x-client-secret<br><mark style="color:red;">Required</mark></p> | String           | Required if you use [API Keys](../../account/api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                                      |
| authorization                                                      | String           | <p>Required if you prefer to login with a member's identity. See <a href="../../account/login.md">Login with Email and Password</a> or <a href="../../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |

***

### Request Body

Send a JSON object containing:

| Field                                                        | Type      | Description                                                                                                                                          |
| ------------------------------------------------------------ | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| <p>addresses<br><mark style="color:red;">Required</mark></p> | String\[] | A list of wallet addresses to check.                                                                                                                 |
| screenerPolicyId                                             | UUID      | The unique ID of the Screener Policy that defines which flags/severities are applied to these addresses. if not added default policy will be applied |

#### Example Request Body

```json
{
  "addresses": [
    "0x70884132cc85409674e4189b1f17a72f67d2d7ff"
  ],
  "screenerPolicyId": "e10bd3b9-89fc-4e78-8ffc-b5602adcfb34"
}
```

{% tabs %}
{% tab title="Python" %}
```python
import requests

endpoint = "https://api.hypernative.xyz/screener/reputation"
headers = {
    "x-client-id": <API Client ID>,
    "x-client-secret": <API Client Secret>,
    "Content-Type": "application/json"
}
payload = {
    "addresses": ["0x70884132cc85409674e4189b1f17a72f67d2d7ff"],
    "screenerPolicyId": "ac938c22-4a3b-4f6c-9c1a-e9e7c7e9113d"
}
response = requests.post(endpoint, json=payload, headers=headers).json()

```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
const endpoint = "https://api.hypernative.xyz/screener/reputation";
const headers = {
    "x-client-id": <API Client ID>,
    "x-client-secret": <API Client Secret>,
    "Content-Type": "application/json"
};
const payload = {
    addresses: ["0x70884132cc85409674e4189b1f17a72f67d2d7ff"],
    screenerPolicyId: "ac938c22-4a3b-4f6c-9c1a-e9e7c7e9113d"
};

const response = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify(payload)
}).then(res => res.json());
```
{% endtab %}
{% endtabs %}

#### Example Response

```json
{
    "address": "0x7ccaf3edda4ca3e1f61c81d19019c92dd250fa26",
    "recommendation": "Deny",
    "severity": "High",
    "policyId": "0f8a1ae1-e9ca-4491-9499-b13ba21f1bb6",
    "flags": [
        {
            "title": "Phishing & Scamming",
            "flagId": "OF1410",
            "chain": "ethereum",
            "lastUpdate": "2025-02-20T06:35:11Z",
            "events": [
                {
                    "eventId": "UMWKOWWCB0JZ",
                    "address": "0x7ccaf3edda4ca3e1f61c81d19019c92dd250fa26",
                    "alias": "Fake_Phishing877893",
                    "chain": "ethereum",
                    "flagId": "OF1410",
                    "timestampEvent": "2025-02-20T06:35:11Z"
                }
            ],
            "severity": "High"
        }
    ],
    "timestamp": "2025-02-25T15:51:23.570Z"
}
```
