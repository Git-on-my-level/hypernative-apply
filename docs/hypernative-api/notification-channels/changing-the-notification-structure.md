# Change the Message Structure - Slack, Discord and Telegram

Use the Hypernative API to customize the structure of notifications and select the fields you wish to see in your preferred order.

{% hint style="info" %}
This page is relevant only for **Slack, Discord**, or **Telegram** notifications. For Webhooks or OpenZeppelin Defender, see [this page](webhook-alert-structure.md). For PagerDuty, see [this page](../../../hypernative-web-application/configure-external-alert-channels/pagerduty.md#optional-configuring-event-routing-and-actions-in-pagerduty-based-on-hypernative-alerts).
{% endhint %}

The default structure consists of the following fields:

* HN Alert by - The title of the Alert.
* Alert Type - The Risk Insight Type.
* RI details - The Risk Insight message.
* Chain - Chain name
* Timestamp&#x20;
* Category/Severity - {Risk Insight Category, i.e. Financial, Security} / {Severity i.e. Medium or Critical}
* Risk Insight ID - The ID of the Risk Insight.
* Links to read more about the Alert on the Hypernative Platform, both when using a desktop computer or a mobile phone.

In addition, you can select to show these fields:

* Involved Assets



### Show or hide some of the fields - using Hypernative Platform

1. Navigate to ⚙️ > Channels.
2. Create or Edit a Channel.
3. Click **Advanced**.
4. Select the desired fields.
5. Click **Test Channel** to review the message structure.



### Change the order of the fields or rename their titles - using Hypernative API

When creating or editing a notification channel, inside the `configuration` property, you can add the `notificationStructure` property, which is an array of objects. Each object consists of two properties:

* `propertyName` - required
* `customValue` - optional.

the `propertyName` has to be one of the following:

```
triggeredBy
alertType
details
chain
txnHash
timestamp
categorySeverity
riId
involvedAssets
hypernativeLink
```

Alternatively, you can use custom `propertyName`s along with `customValue` to add additional fields of your choice to the alert. The order of the array will determine the order of the fields in the alert. Leaving the `notificationStructure` array empty or undefined will result in receiving our default alert structure.

### Example

```json
{
  "configuration": {
      "value": "https://hooks.slack.com/services/...",
      "notificationStructure": [
        {
          "propertyName": "triggeredBy"
        },
        {
          "propertyName": "my prop name",
          "customValue": "my custom value"
        },
        {
          "propertyName": "timestamp"
        },
        {
          "propertyName": "details"
        },
        {
          "propertyName": "categorySeverity",
          "customValue": "another custom value"
        },
        {
          "propertyName": "alertType"
        },
        {
          "propertyName": "hypernativeLink"
        }
      ]
    }
}
```

<figure><img src="../../../.gitbook/assets/api-image(24).png" alt=""><figcaption></figcaption></figure>

