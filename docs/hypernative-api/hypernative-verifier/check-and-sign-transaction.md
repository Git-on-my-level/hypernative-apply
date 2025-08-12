# 🟢 Check and Sign Transaction

## Hyprenative Verifier

​To obtain an API Key and integrate the Screener into your system, contact the Hypernative team. This may require a separate license.

### Usage <a href="#usage" id="usage"></a>

`POST` [`https://api.hypernative.xyz`verifier/check-and-sign](https://api.hypernative.xyz/verifier/check-and-sign)​

#### Headers <a href="#headers" id="headers"></a>

| Name            | Type             | Description                                                                                                                                                                                                                                                                                                                                             |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accept\*        | application/json | ​                                                                                                                                                                                                                                                                                                                                                       |
| x-client-id     | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client ID** portion of your API Key.                                                                                                                                                                                                                       |
| x-client-secret | String           | Required if you use [API Keys](../account/api-keys.md) for your API calls. Set this to the **Client Secret** portion of your API Key.                                                                                                                                                                                                                   |
| authorization   | String           | <p>Required if you prefer to login with a member's identity. See <a href="../account/login.md">Login with Email and Password</a> or <a href="../account/login-with-single-sign-on.md">Login with Single Sign-On</a> to retrieve a bearer token.<br><br>Use this token with the <code>Bearer</code> prefix, for example: <code>Bearer 1234215</code></p> |

**Example Request**

**Request:**

Curlcurl -X 'POST' \\'https://app.hypernative.xyz/verifier/check-and-sign' \\-H 'accept: application/json' \\-H 'authorization: Bearer \<token>'-H 'Content-Type: application/json' \\-d '{"transaction": {"chains": \["ethereum"],"fromAddress": "0x000000000000000000000000000000000000dEaD","toAddress": "0x000000000000000000000000000000000000dEaD","data": "0x8e724956000000000000000000000000000000000000000000000000000000000000dead0000000000000000000000000000000000000000000000000000000000000064","value": 100\}}'​

#### Response <a href="#response" id="response"></a>

​{"success": true,"data": {"statusCode": 200,"body": {"signature": "8065dbd933acdaa64189279c9b3f626ca048d30b6b81450df9303fbfdffad7656e2185300e898e89c0796af1a51000ec67b27eae6ea6e0bb01da90f56facdda01c","timestamp": 1715020259\}}​
