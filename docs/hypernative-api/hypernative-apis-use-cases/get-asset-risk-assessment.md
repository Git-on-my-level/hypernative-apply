# Get Asset Risk Assessment

To get a Risk Assessment for a specific asset, or a batch of assets, the user:

* **Request** - the user provides a list of assets
* **Response** - for each asset, receive:
  * Total Risk Score
  * Risk Score per category
    * Suspicious Activity / Financial / Governance / Technical / Community
  * Main Risk Insights explaining the Risk Score
  * Asset metadata

Each Risk Insight provided by the Hypernative platform has the following parameters:

* **Risk Insight ID** - enables referencing and sharing the Risk Insights with other users
* **Name**&#x20;
* **Category**
  * Suspicious Activity / Financial / Governance / Technical / Community
* **Description**
* **Details**
* **Severity**
  * High / Medium / Low / Info
* **Timestamp** - timestamps are UTC and [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) compliant

Asset metadata varies by Asset type and includes the following:

* **Contracts** -&#x20;
  * Alias
  * Deployed by - the address that deployed the contract
  * Deployment date - the date on which the contract was deployed
  * System Labels - additional labels associated with the Asset&#x20;
* **Wallets** -&#x20;
  * Alias
  * System Labels
* **Protocols** -&#x20;
  * System Labels
