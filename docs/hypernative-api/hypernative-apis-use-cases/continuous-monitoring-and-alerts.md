# Continuously register your wallets, contracts and bridges.

The process of configuring continuous monitoring and Alerts on the Hypernative platform comprises 3 main steps:

1. Create a Watchlist
2. Populate a Watchlist
3. Configure Alerts policy for the Watchlist
   * Define the endpoint for Alerts -
     * Email, Slack or webhook

Upon completion of this process, the user will receive Alerts upon any Risk Insight detected by the Hypernative platform involving user-defined assets and corresponding to the user-defined Alert policy.

<figure><img src="../../../.gitbook/assets/2.png" alt=""><figcaption><p>Configuring continuous monitoring and Alerts</p></figcaption></figure>

### Create and populate a Watchlist

[Create Watchlist API](../watchlists/createwatchlist.md)

A Hypernative Watchlist is a collection of Assets, which may be:

* **Wallets** - uniquely identified as a combination of \<chain>/\<address>
* **Contracts** - uniquely identified as a combination of \<chain>/\<address>
* **Protocol** - - uniquely identified as a combination of \<chain>/\<name>

### Populate a Watchlist

[Update Watchlist Assets API](../watchlists/updatewatchlistassets.md)

### Configure Alerts

The user can configure an Alert policy for a Watchlist they created. There can only be one Alert policy associated with each Watchlist.

The Alert policy comprises the following aspects:

* **Severities** - the Severity of the Risk Insights the user is interested in, can be one or more of the following:
  * High / Medium / Low / Info
* **Categories** - the Category of the Risk Insights the user is interested in, can be one or more of the following:
  * Suspicious Activity / Financial / Governance / Technical / Community
* **Channels** - the notification channel for receiving the Alerts, can be one or more of the following:
  * email / Slack / webhook

[Watchlist Policy Binding API](../alerts/configurealerts.md)

<figure><img src="../../../.gitbook/assets/3.png" alt=""><figcaption><p>An email Alert example</p></figcaption></figure>

##
