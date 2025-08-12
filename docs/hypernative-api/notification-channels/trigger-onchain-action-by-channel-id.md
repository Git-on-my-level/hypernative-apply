# 🟢 Trigger Onchain Action by Channel ID

<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/notification-channels/trigger-onchain-action/{id}`

Runs a predefined Channel on the blockchain.

Notes:

1. Admin role is required to run this endpoint.
2. If you don't have a predefined Channel with this Action, you can craft the transaction and send it to the blockchain using [this endpoint](trigger-onchain-action-by-channel-id.md).

#### Headers

| Name                                           | Type   | Description                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| x-client-id                                    | string | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                       |
| x-client-secret                                | string | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                       |
| authorization                                  | string | <p>Required if you prefer to login with a member's identity. See <a href="../account/login.md">Login with Email and Password</a> or <a href="../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |
| Content-Type<br /><mark style="color:red;">Required</mark> | string | Should be set to `application/json`                                                                                                                                                                                                                                                                                                                     |
| accept<br /><mark style="color:red;">Required</mark>       | string | Should be set to `application/json`                                                                                                                                                                                                                                                                                                                     |

#### Request Body

<table><thead><tr><th width="214">Name</th><th width="190">Type</th><th>Description</th></tr></thead><tbody><tr><td>executionMode<mark style="color:red;">*</mark></td><td>string</td><td><p>An Enum of one of the following:</p><p><code>simulation</code> - run a simulation of the onchain action</p><p><code>onChain</code> - send the onchain action to the blockchain.</p></td></tr></tbody></table>

### Example

{% tabs %}
{% tab title="Curl" %}
<pre class="language-bash"><code class="lang-bash"><strong> curl -X 'POST' \
</strong>  'https://api.hypernative.xyz/notification-channels/trigger-onchain-action/{id}' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'authorization: Bearer &#x3C;token>' \
    -d '
<strong>   {
</strong>      "executionMode": "simulation"
   }
'
</code></pre>
{% endtab %}

{% tab title="Python" %}
```python
endpoint="https://api.hypernative.xyz/notification-channels/trigger-onchain-action/{id}"
headers={
    "x-client-id": <API Client ID>,
  "x-client-secret": <API Client Secret>,
    "Content-Type": "application/json"
}
payload=
  {
    "executionMode": "simulation"
  }

response = requests.post(endpoint, json = payload, headers = headers).json()
```
{% endtab %}
{% endtabs %}

Response:

{% tabs %}
{% tab title="200: OK " %}
simulation executionMode

```json
{
  "data": "Simulation run completed successfully"
}
```

onChain executionMode

```json
{
  "data": "Trigger run completed successfully"
}
```
{% endtab %}

{% tab title="400: Bad Request" %}
simulation or onChain executionMode

```json
{
  "error": "..." // error message varies depending on the error
}
```
{% endtab %}

{% tab title="500: Internal Server Error" %}
simulation executionMode

```json
{
  "error": "Simulation run failed due to an internal error."
}
```

onChain executionMode

```json
{
  "error": "Trigger run failed due to an internal error."
}
```
{% endtab %}
{% endtabs %}
