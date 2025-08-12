---
description: Onchain Action Without a Predefined Channel, a.k.a. Parameterized AR
---

# 🟢 Trigger Onchain Action with Parameters

<mark style="color:green;">`POST`</mark> `https://api.hypernative.xyz/notification-channels/trigger-onchain-action`

Creates an onchain transaction to a destination and contract function parameters of your choice and sends it to the blockchain.&#x20;

Notes:&#x20;

1. Admin role is required to run this endpoint.
2. If you have a predefined Channel with this Action, it is preferred to use its ID - see [this endpoint](trigger-onchain-action-by-channel-id.md).

#### Headers

| Name                                           | Type   | Description                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| x-client-id                                    | string | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                       |
| x-client-id                                    | string | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                       |
| authorization                                  | string | <p>Required if you prefer to login with a member's identity. See <a href="../account/login.md">Login with Email and Password</a> or <a href="../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |
| Content-Type<br /><mark style="color:red;">Required</mark> | string | Should be set to `application/json`                                                                                                                                                                                                                                                                                                                     |
| accept<br /><mark style="color:red;">Required</mark>       | string | Should be set to `application/json`                                                                                                                                                                                                                                                                                                                     |

#### Request Body

<table><thead><tr><th width="214">Name</th><th width="190">Type</th><th>Description</th></tr></thead><tbody><tr><td>configuration<mark style="color:red;">*</mark></td><td>object</td><td></td></tr><tr><td>executionMode<mark style="color:red;">*</mark></td><td>string</td><td><p>An Enum of one of the following:</p><p><code>simulation</code> - run a simulation of the onchain action</p><p><code>onChain</code> - send the onchain action to the blockchain.</p></td></tr></tbody></table>

### Example - Function with Parameters

{% tabs %}
{% tab title="Curl" %}
<pre class="language-bash"><code class="lang-bash"><strong> curl -X 'POST' \
</strong>  'https://api.hypernative.xyz/notification-channels/trigger-onchain-action' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'authorization: Bearer &#x3C;token>' \
    -d '
<strong>  {
</strong>     "configuration": {
       "chain": "polygon",
       "input": [
          "0x3c499c542cef5e3811e1192ce70d8cc03d5c3333",
          "data"
       ],
       "funcName": "upgradeToAndCall",
       "inputDataType": [
          "address",
          "bytes"
       ],
       "contractAddress": "0x3c499c542cef5e3811e1192ce70d8cc03d5c3333",
       "contractAddressAlias": "Circle: USDC Token",
       "contractFunctionObject": {
          "name": "upgradeToAndCall",
          "type": "function",
          "inputs": [
              {
                  "name": "newImplementation",
                  "type": "address",
                  "internalType": "address"
              },
            {
                "name": "data",
                "type": "bytes",
                "internalType": "bytes"
             }
          ],
        "funcSig": "upgradeToAndCall(address newImplementation, bytes data)",
        "outputs": [],
        "stateMutability": "payable"
        }
      },
      "executionMode": "simulation"
   }
'
</code></pre>
{% endtab %}

{% tab title="Python" %}
<pre class="language-python"><code class="lang-python">endpoint="https://api.hypernative.xyz/notification-channels/trigger-onchain-action"
headers={
    "Authorization": "Bearer &#x3C;token>",
    "Content-Type": "application/json"
}
payload=
  {
     "configuration": {
       "chain": "polygon",
       "input": [
          "0x3c499c542cef5e3811e1192ce70d8cc03d5c3333",
          "data"
       ],
       "funcName": "upgradeToAndCall",
       "inputDataType": [
          "address",
          "bytes"
       ],
       "contractAddress": "0x3c499c542cef5e3811e1192ce70d8cc03d5c3333",
       "contractAddressAlias": "Circle: USDC Token",
       "contractFunctionObject": {
          "name": "upgradeToAndCall",
          "type": "function",
          "inputs": [
              {
                  "name": "newImplementation",
                  "type": "address",
                  "internalType": "address"
              },
            {
                "name": "data",
                "type": "bytes",
                "internalType": "bytes"
             }
          ],
        "funcSig": "upgradeToAndCall(address newImplementation, bytes data)",
        "outputs": [],
        "stateMutability": "payable"
        }
<strong>      },
</strong>      "executionMode": "simulation"
   }

response = requests.post(endpoint, json = payload, headers = headers).json()
</code></pre>
{% endtab %}
{% endtabs %}



### Example - Encoded Contract Call

Use this option to execute onchain automated responses with advanced parameters, such as arrays, structs, mappings, enums, or function pointers.&#x20;

This option receives an ABI-encoded version of your operation's data. You can retrieve the ABI-encoded data either using your Wallet's Confirmation Window or using an ABI Encoder Websites, such as [https://abi.hashex.org/](https://abi.hashex.org/).

This is similar to setting up an [Advanced Contract Call Channel](../../../hypernative-web-application/configure-external-alert-channels/advanced-contract-call.md).

{% tabs %}
{% tab title="Curl" %}
```bash
 curl -X 'POST' \
  'https://api.hypernative.xyz/notification-channels/trigger-onchain-action' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'authorization: Bearer <token>' \
    -d '
  {
     "configuration": {
       "chain": "polygon",
       "contractAddress": "0x3c499c542cef5e3811e1192ce70d8cc03d5c3333",
       "data": "0xaf53b4b8000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000013de27efa2f1aa663ae5d458857e731c129069f29000200000000000000000588"
      },
      "executionMode": "simulation"
   }
'
```
{% endtab %}

{% tab title="Python" %}
```python
endpoint="https://api.hypernative.xyz/notification-channels/trigger-onchain-action"
headers={
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}
payload=
  {
     "configuration": {
       "chain": "polygon",
       "contractAddress": "0x3c499c542cef5e3811e1192ce70d8cc03d5c3333",
       "data": "0xaf53b4b8000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000013de27efa2f1aa663ae5d458857e731c129069f29000200000000000000000588"
      },
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

