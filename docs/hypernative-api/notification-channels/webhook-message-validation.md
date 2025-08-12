# Webhook Message Validation

[To create Webhooks in the Hypernative Web Application, see this guide.](../../../hypernative-web-application/configure-external-alert-channels/webhook/overview.md)

When receiving Webhooks, you can verify that the message originated from Hypernative. This is done using the `digitalSignature` field included in the Webhook message. To validate, you create a hash of the `digitalSignature` field and the message, and then check that this hash matches Hypernative's public key.

Hypernative's public key is `MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEBgZAJk+OuOzp3sO6B+44gqLDzz/X1KloIQYkqefTYMv+URMIvN97gsoLYrZ9K08uQR0XHLXbB0RCTAt6BNFhzQ==`

Additionally, you can check if the message's timestamp is within the last 10 minutes. This ensures the alert is new and was not sent as part of Hypernative's [Alert Replay](../../../hypernative-web-application/configure-external-alert-channels/sending-test-alerts.md) or [Reminder Alert](../../../hypernative-web-application/configure-external-alert-channels/configuring-channels.md#frequency-of-alerts) features.

{% tabs %}
{% tab title="Node.js" %}
```javascript
const crypto = require("crypto");

const webhookResponse = {
  id: "125d5b5e-222a-4a5f-a325-28412ca8a771",
  data: '{"riskInsight":{"id":"M0OFLUXEDDV4","chain":"bsc","name":"Ownership changed","category":"Governance","status":"Active","timestamp":"2023-09-05T04:55:53.000Z","severity":"Medium","details":"Ownership of contract <0xf7fce88ee8ca8f9fc3abc97e2ca8b2bb5ea9524d|0xf7fce88ee8ca8f9fc3abc97e2ca8b2bb5ea9524d> changed - new owner <Null: 0x000...000|0x0000000000000000000000000000000000000000>","involvedAssets":[{"address":"0x0000000000000000000000000000000000000000","alias":"Null: 0x000...000","type":"Contract","chain":"bsc","involvementType":"New Owner"},{"address":"0xf7fce88ee8ca8f9fc3abc97e2ca8b2bb5ea9524d","type":"Contract","chain":"bsc","involvementType":"Target"},{"address":"0xd7ed580f4587205454a4d2ef7c39d844d694de6a","type":"Wallet","chain":"bsc","involvementType":"Removed Owner"}],"riskTypeId":"A-29","riskTypeDescription":"Contract ownership transferred","txnHash":"0xb2264473af745cb4e238d521e002ef223df801031d04699c5bcc18851e75e492","context":[{"title":"To","value":"0xf7fce88ee8ca8f9fc3abc97e2ca8b2bb5ea9524d"},{"title":"From","value":"0xd7ed580f4587205454a4d2ef7c39d844d694de6a"},{"title":"Value","value":"0"},{"title":"Status","value":"Success"},{"title":"Txn Hash","value":"0xb2264473af745cb4e238d521e002ef223df801031d04699c5bcc18851e75e492"},{"title":"Timestamp","value":"2023-09-05T04:55:53Z"},{"title":"Is Reorged","value":"false"},{"title":"Block Number","value":"31467736"},{"title":"Transaction Fee","value":"0.00007047002901015"},{"title":"Full Involved Assets","value":"[\\n  {\\n    \\"type\\": \\"contract\\",\\n    \\"chain\\": \\"bsc\\",\\n    \\"address\\": \\"0x0000000000000000000000000000000000000000\\",\\n    \\"involvement\\": \\"new_owner\\",\\n    \\"system_labels\\": [\\n      \\"Reward Calculator (Binance smart chain)\\",\\n      \\"Null: 0x000...000\\",\\n      \\"Swap Factory (Binance smart chain)\\",\\n      \\"Notifier  (Binance smart chain)\\",\\n      \\"(Tetu): Tetu Token (BSC)\\",\\n      \\"Mint Helper (Binance smart chain)\\",\\n      \\"Swap Router  (Binance smart chain)\\",\\n      \\"Pawn Shop (Binance smart chain)\\",\\n      \\"PS Vault (Binance smart chain)\\",\\n      \\"Auto Rewarder (Binance smart chain)\\",\\n      \\"Tetu Token (BSC)\\",\\n      \\"Tetu Token (Binance smart chain)\\",\\n      \\"Burn\\",\\n      \\"burn\\",\\n      \\"genesis\\"\\n    ],\\n    \\"alias\\": \\"Null: 0x000...000\\"\\n  },\\n  {\\n    \\"type\\": \\"contract\\",\\n    \\"chain\\": \\"bsc\\",\\n    \\"address\\": \\"0xf7fce88ee8ca8f9fc3abc97e2ca8b2bb5ea9524d\\",\\n    \\"involvement\\": \\"destination, target\\",\\n    \\"system_labels\\": []\\n  },\\n  {\\n    \\"type\\": \\"wallet\\",\\n    \\"chain\\": \\"bsc\\",\\n    \\"address\\": \\"0xd7ed580f4587205454a4d2ef7c39d844d694de6a\\",\\n    \\"involvement\\": \\"origin, removed_owner\\",\\n    \\"system_labels\\": []\\n  }\\n]"}],"stage":"Undefined","parentRiId":"M0OFLUXEDDV4","threatIntelReview":"NotReviewed"},"watchlists":[{"id":632,"name":"Alert testש\'sdaweddfs","description":"awdeaw","createdAt":"2023-04-10T14:40:43.245Z","updatedAt":"2023-08-27T15:17:11.242Z","createdBy":"Ronen Badalov","createdByUserId":13,"assets":[{"chain":"ethereum","address":null,"name":"0xmons","type":"Protocol"},{"chain":"ethereum","address":"0x0000000000000000000000000000000000000000","name":null,"type":"Wallet"},{"chain":"ethereum","address":"0x036cec1a199234fc02f72d29e596a09440825f1c","name":null,"type":"Contract"},{"chain":"ethereum","address":null,"name":"0x core","type":"Protocol"},{"chain":"bsc","address":"0x0000000000000000000000000000000000000000","name":null,"type":"Contract"},{"chain":"ethereum","address":null,"name":"0xSplits","type":"Protocol"},{"chain":"ethereum","address":null,"name":"[Deprecated] StarkGate: DAI [Ethereum <> StarkNet] - Pegged Bridge","type":"Protocol"},{"chain":"ethereum","address":null,"name":"Gnosis xDai [Ethereum <> Gnosis] - Pegged Bridge","type":"Protocol"},{"chain":"ethereum","address":null,"name":"Polygon POS [Ethereum <> Polygon] - Pegged Bridge","type":"Protocol"},{"chain":"ethereum","address":null,"name":"StarkGate: USDC [Ethereum <> StarkNet] - Pegged Bridge","type":"Protocol"},{"chain":"ethereum","address":null,"name":"StarkGate: DAI [Ethereum <> StarkNet] - Pegged Bridge","type":"Protocol"},{"chain":"ethereum","address":null,"name":"1inch core","type":"Protocol"},{"chain":"arbitrum","address":"0x102be4bccc2696c35fd5f5bfe54c1dfba416a741","name":null,"type":"Wallet"}],"alertsTagsStats":[{"count":0,"name":"All"},{"count":0,"name":"Read"},{"count":0,"name":"Unread"},{"count":0,"name":"Important"},{"count":0,"name":"Dismissed"}]}],"customAgents":[],"triggeredAssets":[{"chain":"bsc","address":"0x0000000000000000000000000000000000000000","name":null,"type":"Contract"}],"securitySuits":[]}',
  digitalSignature:
    "MEYCIQCkaaHML+7jTJJKmD7me8cj2yXr1cwii2t87eZ5g5KKIgIhANofGJuOyAH5+/eEg1bm66cUjGm3mgW0GtTuRVgSNASe",
};

const publicKey =
  "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEBgZAJk+OuOzp3sO6B+44gqLDzz/X1KloIQYkqefTYMv+URMIvN97gsoLYrZ9K08uQR0XHLXbB0RCTAt6BNFhzQ==";

FRESHNESS_VALIDATION_THRESHOLD_MINUTES = 60;

const verifyWithPublicKey = (message, digitalSignature, publicKey) => {
  const publicKeyPEM = `-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`;
  try {
    const verify = crypto.createVerify("SHA256");
    verify.update(message);

    return verify.verify(publicKeyPEM, Buffer.from(digitalSignature, "base64"));
  } catch (error) {
    throw new Error(`Error verifying digital signature: ${error.message}`);
  }
};

// Optional freshness validation
const checkFreshness = (data) => {
  const timestamp = JSON.parse(data).riskInsight.timestamp; // parsing data back to JSON
  const d = new Date(
    Date.now() - FRESHNESS_VALIDATION_THRESHOLD_MINUTES * 60000 // time - threshold * ms per minute
  );

  return timestamp > d;
};

const isVerified = verifyWithPublicKey(
  webhookResponse.data,
  webhookResponse.digitalSignature,
  publicKey
);

const isFresh = checkFreshness(webhookResponse.data);

console.log(`is verified: ${isVerified} is fresh: ${isFresh}`);
```
{% endtab %}

{% tab title="Python" %}
```python
# REQUIRED 3rd PARTY PACKAGES - cryptography

import base64
import json
from datetime import datetime, timedelta

from cryptography.exceptions import InvalidSignature
from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.primitives.asymmetric.ec import ECDSA

received_webhook_msg = {
    "id": "125d5b5e-222a-4a5f-a325-28412ca8a771",
    "data": '{"riskInsight":{"id":"M0OFLUXEDDV4","chain":"bsc","name":"Ownership changed","category":"Governance","status":"Active","timestamp":"2023-09-05T04:55:53.000Z","severity":"Medium","details":"Ownership of contract <0xf7fce88ee8ca8f9fc3abc97e2ca8b2bb5ea9524d|0xf7fce88ee8ca8f9fc3abc97e2ca8b2bb5ea9524d> changed - new owner <Null: 0x000...000|0x0000000000000000000000000000000000000000>","involvedAssets":[{"address":"0x0000000000000000000000000000000000000000","alias":"Null: 0x000...000","type":"Contract","chain":"bsc","involvementType":"New Owner"},{"address":"0xf7fce88ee8ca8f9fc3abc97e2ca8b2bb5ea9524d","type":"Contract","chain":"bsc","involvementType":"Target"},{"address":"0xd7ed580f4587205454a4d2ef7c39d844d694de6a","type":"Wallet","chain":"bsc","involvementType":"Removed Owner"}],"riskTypeId":"A-29","riskTypeDescription":"Contract ownership transferred","txnHash":"0xb2264473af745cb4e238d521e002ef223df801031d04699c5bcc18851e75e492","context":[{"title":"To","value":"0xf7fce88ee8ca8f9fc3abc97e2ca8b2bb5ea9524d"},{"title":"From","value":"0xd7ed580f4587205454a4d2ef7c39d844d694de6a"},{"title":"Value","value":"0"},{"title":"Status","value":"Success"},{"title":"Txn Hash","value":"0xb2264473af745cb4e238d521e002ef223df801031d04699c5bcc18851e75e492"},{"title":"Timestamp","value":"2023-09-05T04:55:53Z"},{"title":"Is Reorged","value":"false"},{"title":"Block Number","value":"31467736"},{"title":"Transaction Fee","value":"0.00007047002901015"},{"title":"Full Involved Assets","value":"[\\n  {\\n    \\"type\\": \\"contract\\",\\n    \\"chain\\": \\"bsc\\",\\n    \\"address\\": \\"0x0000000000000000000000000000000000000000\\",\\n    \\"involvement\\": \\"new_owner\\",\\n    \\"system_labels\\": [\\n      \\"Reward Calculator (Binance smart chain)\\",\\n      \\"Null: 0x000...000\\",\\n      \\"Swap Factory (Binance smart chain)\\",\\n      \\"Notifier  (Binance smart chain)\\",\\n      \\"(Tetu): Tetu Token (BSC)\\",\\n      \\"Mint Helper (Binance smart chain)\\",\\n      \\"Swap Router  (Binance smart chain)\\",\\n      \\"Pawn Shop (Binance smart chain)\\",\\n      \\"PS Vault (Binance smart chain)\\",\\n      \\"Auto Rewarder (Binance smart chain)\\",\\n      \\"Tetu Token (BSC)\\",\\n      \\"Tetu Token (Binance smart chain)\\",\\n      \\"Burn\\",\\n      \\"burn\\",\\n      \\"genesis\\"\\n    ],\\n    \\"alias\\": \\"Null: 0x000...000\\"\\n  },\\n  {\\n    \\"type\\": \\"contract\\",\\n    \\"chain\\": \\"bsc\\",\\n    \\"address\\": \\"0xf7fce88ee8ca8f9fc3abc97e2ca8b2bb5ea9524d\\",\\n    \\"involvement\\": \\"destination, target\\",\\n    \\"system_labels\\": []\\n  },\\n  {\\n    \\"type\\": \\"wallet\\",\\n    \\"chain\\": \\"bsc\\",\\n    \\"address\\": \\"0xd7ed580f4587205454a4d2ef7c39d844d694de6a\\",\\n    \\"involvement\\": \\"origin, removed_owner\\",\\n    \\"system_labels\\": []\\n  }\\n]"}],"stage":"Undefined","parentRiId":"M0OFLUXEDDV4","threatIntelReview":"NotReviewed"},"watchlists":[{"id":632,"name":"Alert testש\'sdaweddfs","description":"awdeaw","createdAt":"2023-04-10T14:40:43.245Z","updatedAt":"2023-08-27T15:17:11.242Z","createdBy":"Ronen Badalov","createdByUserId":13,"assets":[{"chain":"ethereum","address":null,"name":"0xmons","type":"Protocol"},{"chain":"ethereum","address":"0x0000000000000000000000000000000000000000","name":null,"type":"Wallet"},{"chain":"ethereum","address":"0x036cec1a199234fc02f72d29e596a09440825f1c","name":null,"type":"Contract"},{"chain":"ethereum","address":null,"name":"0x core","type":"Protocol"},{"chain":"bsc","address":"0x0000000000000000000000000000000000000000","name":null,"type":"Contract"},{"chain":"ethereum","address":null,"name":"0xSplits","type":"Protocol"},{"chain":"ethereum","address":null,"name":"[Deprecated] StarkGate: DAI [Ethereum <> StarkNet] - Pegged Bridge","type":"Protocol"},{"chain":"ethereum","address":null,"name":"Gnosis xDai [Ethereum <> Gnosis] - Pegged Bridge","type":"Protocol"},{"chain":"ethereum","address":null,"name":"Polygon POS [Ethereum <> Polygon] - Pegged Bridge","type":"Protocol"},{"chain":"ethereum","address":null,"name":"StarkGate: USDC [Ethereum <> StarkNet] - Pegged Bridge","type":"Protocol"},{"chain":"ethereum","address":null,"name":"StarkGate: DAI [Ethereum <> StarkNet] - Pegged Bridge","type":"Protocol"},{"chain":"ethereum","address":null,"name":"1inch core","type":"Protocol"},{"chain":"arbitrum","address":"0x102be4bccc2696c35fd5f5bfe54c1dfba416a741","name":null,"type":"Wallet"}],"alertsTagsStats":[{"count":0,"name":"All"},{"count":0,"name":"Read"},{"count":0,"name":"Unread"},{"count":0,"name":"Important"},{"count":0,"name":"Dismissed"}]}],"customAgents":[],"triggeredAssets":[{"chain":"bsc","address":"0x0000000000000000000000000000000000000000","name":null,"type":"Contract"}],"securitySuits":[]}',
    "digitalSignature": "MEYCIQCkaaHML+7jTJJKmD7me8cj2yXr1cwii2t87eZ5g5KKIgIhANofGJuOyAH5+/eEg1bm66cUjGm3mgW0GtTuRVgSNASe",
}

PUBLIC_KEY = "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEBgZAJk+OuOzp3sO6B+44gqLDzz/X1KloIQYkqefTYMv+URMIvN97gsoLYrZ9K08uQR0XHLXbB0RCTAt6BNFhzQ=="

FRESHNESS_VALIDATION_THRESHOLD_MINUTES = 60

validator = serialization.load_der_public_key(base64.b64decode(PUBLIC_KEY.encode('ascii')))

try:
    validator.verify(
        signature=base64.b64decode(received_webhook_msg["digitalSignature"].encode('ascii')),
        data=received_webhook_msg["data"].encode(),
        signature_algorithm=ECDSA(hashes.SHA256()),
    )

    # Optional freshness validation
    parsed_msg = json.loads(received_webhook_msg["data"]) # parsing data back to JSON
    risk_insight = parsed_msg["riskInsight"]
    risk_insight["timestamp"] = datetime.strptime(risk_insight["timestamp"], "%Y-%m-%dT%H:%M:%S.%fZ")
    if risk_insight["timestamp"] < datetime.utcnow() - timedelta(minutes=FRESHNESS_VALIDATION_THRESHOLD_MINUTES):
        raise ValueError("Timestamp crossed the freshness threshold")
except InvalidSignature:
    print("Received an InvalidSignature")
    raise

```
{% endtab %}

{% tab title="Go" %}
```go
package main

import (
	"crypto/ecdsa"
	"crypto/sha256"
	"crypto/x509"
	"encoding/base64"
	"encoding/json"
	"encoding/pem"
	"fmt"
	"time"
)

const (
	webhookResponseJSON = `{"id":"794ad0c4-dae6-4d7c-8fe0-28e98a3ac65f","data":"{\"riskInsight\":{\"id\":\"21VPQTUA2C0R\",\"chain\":\"ethereum\",\"name\":\"[C] Bridge imbalance \",\"category\":\"Financial\",\"status\":\"Active\",\"timestamp\":\"2024-05-15T09:20:00.000Z\",\"severity\":\"Medium\",\"details\":\"<usdc|0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48> amount locked on ethereum is 0, less than minted tokens amounts [(polygon chain - 9.374256385728552e+25)], total 9.374256385728552e+25\",\"involvedAssets\":[{\"address\":\"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48\",\"alias\":\"Circle: USDC Token\",\"type\":\"Contract\",\"chain\":\"ethereum\",\"involvementType\":\"Token\"},{\"address\":\"0xcedd2501f713e63498c0a6ef982e62f6004fcf3b\",\"type\":\"Wallet\",\"chain\":\"ethereum\",\"involvementType\":\"Bridge\"},{\"address\":\"0xf2ae0038696774d65e67892c9d301c5f2cbbda58\",\"type\":\"Contract\",\"chain\":\"polygon\",\"involvementType\":\"Minted Token\"}],\"riskTypeId\":\"C-50101\",\"riskTypeDescription\":\"[C] Bridge imbalance detected \",\"context\":[{\"title\":\"Status\",\"value\":\"Success\"},{\"title\":\"Timestamp\",\"value\":\"2024-05-15T09:20:00Z\"},{\"title\":\"Is Reorged\",\"value\":\"false\"},{\"title\":\"Block Number\",\"value\":\"0\"},{\"title\":\"Full Involved Assets\",\"value\":\"[\\n  {\\n    \\\"type\\\": \\\"contract\\\",\\n    \\\"chain\\\": \\\"ethereum\\\",\\n    \\\"symbol\\\": \\\"usdc\\\",\\n    \\\"address\\\": \\\"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48\\\",\\n    \\\"involvement\\\": \\\"token\\\",\\n    \\\"system_labels\\\": [\\n      \\\"Circle\\\",\\n      \\\"Circle: USDC Token\\\",\\n      \\\"FiatTokenProxy\\\",\\n      \\\"Stablecoin\\\",\\n      \\\"Token Contract\\\",\\n      \\\"USDC (USDC)\\\"\\n    ],\\n    \\\"alias\\\": \\\"Circle: USDC Token\\\"\\n  },\\n  {\\n    \\\"type\\\": \\\"wallet\\\",\\n    \\\"chain\\\": \\\"ethereum\\\",\\n    \\\"address\\\": \\\"0xcedd2501f713e63498c0a6ef982e62f6004fcf3b\\\",\\n    \\\"involvement\\\": \\\"bridge\\\",\\n    \\\"system_labels\\\": []\\n  },\\n  {\\n    \\\"type\\\": \\\"contract\\\",\\n    \\\"chain\\\": \\\"polygon\\\",\\n    \\\"symbol\\\": \\\"cxo\\\",\\n    \\\"address\\\": \\\"0xf2ae0038696774d65e67892c9d301c5f2cbbda58\\\",\\n    \\\"involvement\\\": \\\"minted_token\\\",\\n    \\\"system_labels\\\": []\\n  }\\n]\"}],\"stage\":\"Undefined\",\"parentRiId\":\"21VPQTUA2C0R\",\"threatIntelReview\":\"NotReviewed\"},\"watchlists\":[],\"customAgents\":[{\"id\":7704,\"agentName\":\"Inconsistent USDC through Polygon bridge\",\"agentType\":\"bridgeBalanceCompareTimed\",\"severity\":\"Medium\",\"muteDuration\":0,\"delay\":600,\"rule\":{\"lockChain\":\"ethereum\",\"ruleString\":\"On Ethereum: when the amount of Circle: USDC Token locked on Ethereum is less than sum of minted tokens amounts on Polygon\\nSample every 10 Minutes\",\"mintedTokens\":[{\"alias\":\"0xf2..da58\",\"chain\":\"polygon\",\"address\":\"0xf2ae0038696774d65e67892c9d301c5f2cbbda58\"}],\"tickInterval\":600,\"vaultAddress\":\"0xcEDD2501f713e63498c0a6eF982E62F6004Fcf3B\",\"isReminderEnabled\":false,\"vaultAddressAlias\":\"0xce..cf3b\",\"lockedTokenAddress\":\"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48\",\"lockedTokenAddressAlias\":\"Circle: USDC Token\"},\"createdAt\":\"2024-05-08T12:20:29.105Z\",\"updatedAt\":\"2024-05-08T12:20:29.105Z\",\"state\":\"enabled\",\"createdBy\":\"tomers@hypernative.io Hypernative\",\"createdByUserId\":126,\"alertsTagsStats\":[{\"count\":0,\"name\":\"All\"},{\"count\":0,\"name\":\"Read\"},{\"count\":0,\"name\":\"Unread\"},{\"count\":0,\"name\":\"Important\"},{\"count\":0,\"name\":\"Dismissed\"}]}],\"triggeredAssets\":[],\"securitySuits\":[]}","digitalSignature":"MEUCIQDlK1yzhwa+v9nioyKce4fKdhfnQwUdxpUXqOG78cGD6AIgDxnbIw3JrjG+X5EMizuc3JoCXVqh8YxJRUshXbxhTK0="}`
	publicKeyPEM        = `-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEBgZAJk+OuOzp3sO6B+44gqLDzz/X
1KloIQYkqefTYMv+URMIvN97gsoLYrZ9K08uQR0XHLXbB0RCTAt6BNFhzQ==
-----END PUBLIC KEY-----`
	freshnessThresholdMinutes = 60
)

type WebhookResponse struct {
	ID               string `json:"id"`
	Data             string `json:"data"`
	DigitalSignature string `json:"digitalSignature"`
}

func verifyWithPublicKey(data, signature, publicKeyPEM string) bool {
	block, _ := pem.Decode([]byte(publicKeyPEM))
	if block == nil {
		fmt.Println("failed to parse PEM block containing the public key")
		return false
	}

	pubKey, err := x509.ParsePKIXPublicKey(block.Bytes)
	if err != nil {
		fmt.Println("failed to parse DER encoded public key: ", err)
		return false
	}

	hashed := sha256.Sum256([]byte(data))
	decodedSig, err := base64.StdEncoding.DecodeString(signature)
	if err != nil {
		fmt.Println("failed to decode base64 signature: ", err)
		return false
	}

	ecdsaPubKey, ok := pubKey.(*ecdsa.PublicKey)
	if !ok {
		fmt.Println("not an ECDSA public key")
		return false
	}

	return ecdsa.VerifyASN1(ecdsaPubKey, hashed[:], decodedSig)
}

func checkFreshness(data string) bool {
	var jsonData struct {
		RiskInsight struct {
			Timestamp string `json:"timestamp"`
		} `json:"riskInsight"`
	}

	if err := json.Unmarshal([]byte(data), &jsonData); err != nil {
		fmt.Println("failed to unmarshal data: ", err)
		return false
	}

	timestamp, err := time.Parse(time.RFC3339, jsonData.RiskInsight.Timestamp)
	if err != nil {
		fmt.Println("failed to parse timestamp: ", err)
		return false
	}

	thresholdTime := time.Now().Add(-time.Minute * time.Duration(freshnessThresholdMinutes))
	return timestamp.After(thresholdTime)
}

func main() {
	var webhookResponse WebhookResponse
	if err := json.Unmarshal([]byte(webhookResponseJSON), &webhookResponse); err != nil {
		fmt.Println("failed to unmarshal webhook response: ", err)
		return
	}

	isVerified := verifyWithPublicKey(webhookResponse.Data, webhookResponse.DigitalSignature, publicKeyPEM)
	isFresh := checkFreshness(webhookResponse.Data)

	fmt.Printf("is verified: %t is fresh: %t\n", isVerified, isFresh)
}

```
{% endtab %}

{% tab title="Java" %}
```java
import java.nio.charset.StandardCharsets;
import java.security.*;
import java.security.spec.X509EncodedKeySpec;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;

public class WebhookValidator {
    
    private static final String PUBLIC_KEY = "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEBgZAJk+OuOzp3sO6B+44gqLDzz/X1KloIQYkqefTYMv+URMIvN97gsoLYrZ9K08uQR0XHLXbB0RCTAt6BNFhzQ==";
    private static final int FRESHNESS_VALIDATION_THRESHOLD_MINUTES = 60;
    
    public static boolean verifyWithPublicKey(String message, String digitalSignature, String publicKey) {
        try {
            // Decode the public key from base64
            byte[] publicKeyBytes = Base64.getDecoder().decode(publicKey);
            
            // Create public key object
            X509EncodedKeySpec keySpec = new X509EncodedKeySpec(publicKeyBytes);
            KeyFactory keyFactory = KeyFactory.getInstance("EC");
            PublicKey pubKey = keyFactory.generatePublic(keySpec);
            
            // Create signature verifier
            Signature signature = Signature.getInstance("SHA256withECDSA");
            signature.initVerify(pubKey);
            signature.update(message.getBytes(StandardCharsets.UTF_8));
            
            // Decode signature from base64 and verify
            byte[] signatureBytes = Base64.getDecoder().decode(digitalSignature);
            return signature.verify(signatureBytes);
            
        } catch (Exception e) {
            System.err.println("Error verifying digital signature: " + e.getMessage());
            return false;
        }
    }
    
    public static boolean checkFreshness(String data) {
        try {
            // Simple string parsing to extract timestamp
            String searchStr = "\"timestamp\":\"";
            int startIndex = data.indexOf(searchStr);
            if (startIndex == -1) {
                return false;
            }
            startIndex += searchStr.length();
            int endIndex = data.indexOf("\"", startIndex);
            if (endIndex == -1) {
                return false;
            }
            
            String timestamp = data.substring(startIndex, endIndex);
            
            // Parse the timestamp
            Instant messageTime = Instant.parse(timestamp);
            Instant currentTime = Instant.now();
            
            // Check if the message is within the freshness threshold
            long minutesDifference = ChronoUnit.MINUTES.between(messageTime, currentTime);
            
            return minutesDifference <= FRESHNESS_VALIDATION_THRESHOLD_MINUTES;
            
        } catch (Exception e) {
            System.err.println("Error checking freshness: " + e.getMessage());
            return false;
        }
    }
    
    public static void main(String[] args) {
        // Sample webhook response
        String webhookId = "125d5b5e-222a-4a5f-a325-28412ca8a771";
        String webhookData = "{\"riskInsight\":{\"id\":\"M0OFLUXEDDV4\",\"chain\":\"bsc\",\"name\":\"Ownership changed\",\"category\":\"Governance\",\"status\":\"Active\",\"timestamp\":\"2023-09-05T04:55:53.000Z\",\"severity\":\"Medium\",\"details\":\"Ownership of contract <0xf7fce88ee8ca8f9fc3abc97e2ca8b2bb5ea9524d|0xf7fce88ee8ca8f9fc3abc97e2ca8b2bb5ea9524d> changed - new owner <Null: 0x000...000|0x0000000000000000000000000000000000000000>\",\"involvedAssets\":[{\"address\":\"0x0000000000000000000000000000000000000000\",\"alias\":\"Null: 0x000...000\",\"type\":\"Contract\",\"chain\":\"bsc\",\"involvementType\":\"New Owner\"},{\"address\":\"0xf7fce88ee8ca8f9fc3abc97e2ca8b2bb5ea9524d\",\"type\":\"Contract\",\"chain\":\"bsc\",\"involvementType\":\"Target\"},{\"address\":\"0xd7ed580f4587205454a4d2ef7c39d844d694de6a\",\"type\":\"Wallet\",\"chain\":\"bsc\",\"involvementType\":\"Removed Owner\"}],\"riskTypeId\":\"A-29\",\"riskTypeDescription\":\"Contract ownership transferred\",\"txnHash\":\"0xb2264473af745cb4e238d521e002ef223df801031d04699c5bcc18851e75e492\",\"context\":[{\"title\":\"To\",\"value\":\"0xf7fce88ee8ca8f9fc3abc97e2ca8b2bb5ea9524d\"},{\"title\":\"From\",\"value\":\"0xd7ed580f4587205454a4d2ef7c39d844d694de6a\"},{\"title\":\"Value\",\"value\":\"0\"},{\"title\":\"Status\",\"value\":\"Success\"},{\"title\":\"Txn Hash\",\"value\":\"0xb2264473af745cb4e238d521e002ef223df801031d04699c5bcc18851e75e492\"},{\"title\":\"Timestamp\",\"value\":\"2023-09-05T04:55:53Z\"},{\"title\":\"Is Reorged\",\"value\":\"false\"},{\"title\":\"Block Number\",\"value\":\"31467736\"},{\"title\":\"Transaction Fee\",\"value\":\"0.00007047002901015\"},{\"title\":\"Full Involved Assets\",\"value\":\"[\\n  {\\n    \\\"type\\\": \\\"contract\\\",\\n    \\\"chain\\\": \\\"bsc\\\",\\n    \\\"address\\\": \\\"0x0000000000000000000000000000000000000000\\\",\\n    \\\"involvement\\\": \\\"new_owner\\\",\\n    \\\"system_labels\\\": [\\n      \\\"Reward Calculator (Binance smart chain)\\\",\\n      \\\"Null: 0x000...000\\\",\\n      \\\"Swap Factory (Binance smart chain)\\\",\\n      \\\"Notifier  (Binance smart chain)\\\",\\n      \\\"(Tetu): Tetu Token (BSC)\\\",\\n      \\\"Mint Helper (Binance smart chain)\\\",\\n      \\\"Swap Router  (Binance smart chain)\\\",\\n      \\\"Pawn Shop (Binance smart chain)\\\",\\n      \\\"PS Vault (Binance smart chain)\\\",\\n      \\\"Auto Rewarder (Binance smart chain)\\\",\\n      \\\"Tetu Token (BSC)\\\",\\n      \\\"Tetu Token (Binance smart chain)\\\",\\n      \\\"Burn\\\",\\n      \\\"burn\\\",\\n      \\\"genesis\\\"\\n    ],\\n    \\\"alias\\\": \\\"Null: 0x000...000\\\"\\n  },\\n  {\\n    \\\"type\\\": \\\"contract\\\",\\n    \\\"chain\\\": \\\"bsc\\\",\\n    \\\"address\\\": \\\"0xf7fce88ee8ca8f9fc3abc97e2ca8b2bb5ea9524d\\\",\\n    \\\"involvement\\\": \\\"destination, target\\\",\\n    \\\"system_labels\\\": []\\n  },\\n  {\\n    \\\"type\\\": \\\"wallet\\\",\\n    \\\"chain\\\": \\\"bsc\\\",\\n    \\\"address\\\": \\\"0xd7ed580f4587205454a4d2ef7c39d844d694de6a\\\",\\n    \\\"involvement\\\": \\\"origin, removed_owner\\\",\\n    \\\"system_labels\\\": []\\n  }\\n]\"}],\"stage\":\"Undefined\",\"parentRiId\":\"M0OFLUXEDDV4\",\"threatIntelReview\":\"NotReviewed\"},\"watchlists\":[{\"id\":632,\"name\":\"Alert testש'sdaweddfs\",\"description\":\"awdeaw\",\"createdAt\":\"2023-04-10T14:40:43.245Z\",\"updatedAt\":\"2023-08-27T15:17:11.242Z\",\"createdBy\":\"Ronen Badalov\",\"createdByUserId\":13,\"assets\":[{\"chain\":\"ethereum\",\"address\":null,\"name\":\"0xmons\",\"type\":\"Protocol\"},{\"chain\":\"ethereum\",\"address\":\"0x0000000000000000000000000000000000000000\",\"name\":null,\"type\":\"Wallet\"},{\"chain\":\"ethereum\",\"address\":\"0x036cec1a199234fc02f72d29e596a09440825f1c\",\"name\":null,\"type\":\"Contract\"},{\"chain\":\"ethereum\",\"address\":null,\"name\":\"0x core\",\"type\":\"Protocol\"},{\"chain\":\"bsc\",\"address\":\"0x0000000000000000000000000000000000000000\",\"name\":null,\"type\":\"Contract\"},{\"chain\":\"ethereum\",\"address\":null,\"name\":\"0xSplits\",\"type\":\"Protocol\"},{\"chain\":\"ethereum\",\"address\":null,\"name\":\"[Deprecated] StarkGate: DAI [Ethereum <> StarkNet] - Pegged Bridge\",\"type\":\"Protocol\"},{\"chain\":\"ethereum\",\"address\":null,\"name\":\"Gnosis xDai [Ethereum <> Gnosis] - Pegged Bridge\",\"type\":\"Protocol\"},{\"chain\":\"ethereum\",\"address\":null,\"name\":\"Polygon POS [Ethereum <> Polygon] - Pegged Bridge\",\"type\":\"Protocol\"},{\"chain\":\"ethereum\",\"address\":null,\"name\":\"StarkGate: USDC [Ethereum <> StarkNet] - Pegged Bridge\",\"type\":\"Protocol\"},{\"chain\":\"ethereum\",\"address\":null,\"name\":\"StarkGate: DAI [Ethereum <> StarkNet] - Pegged Bridge\",\"type\":\"Protocol\"},{\"chain\":\"ethereum\",\"address\":null,\"name\":\"1inch core\",\"type\":\"Protocol\"},{\"chain\":\"arbitrum\",\"address\":\"0x102be4bccc2696c35fd5f5bfe54c1dfba416a741\",\"name\":null,\"type\":\"Wallet\"}],\"alertsTagsStats\":[{\"count\":0,\"name\":\"All\"},{\"count\":0,\"name\":\"Read\"},{\"count\":0,\"name\":\"Unread\"},{\"count\":0,\"name\":\"Important\"},{\"count\":0,\"name\":\"Dismissed\"}]}],\"customAgents\":[],\"triggeredAssets\":[{\"chain\":\"bsc\",\"address\":\"0x0000000000000000000000000000000000000000\",\"name\":null,\"type\":\"Contract\"}],\"securitySuits\":[]}";
        String webhookDigitalSignature = "MEYCIQCkaaHML+7jTJJKmD7me8cj2yXr1cwii2t87eZ5g5KKIgIhANofGJuOyAH5+/eEg1bm66cUjGm3mgW0GtTuRVgSNASe";
        
        try {
            // Verify the signature
            boolean isVerified = verifyWithPublicKey(
                webhookData,
                webhookDigitalSignature,
                PUBLIC_KEY
            );
            
            // Check freshness (optional)
            boolean isFresh = checkFreshness(webhookData);
            
            System.out.println("is verified: " + isVerified + " is fresh: " + isFresh);
            
        } catch (Exception e) {
            System.err.println("Error processing webhook: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
```
{% endtab %}
{% endtabs %}
