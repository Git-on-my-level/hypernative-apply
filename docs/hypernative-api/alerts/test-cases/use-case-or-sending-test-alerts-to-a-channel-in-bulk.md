# Use Case | Sending Test Alerts To A Channel In Bulk

1\. Configure a new alert channel by navigating to Profile Settings -> Channels -> Add Channel.

<figure><img src="../../../../.gitbook/assets/api-image.png" alt="" width="235"><figcaption></figcaption></figure>

2\. Navigate to Watchlists tab, from there, create a new watchlist by providing preferred involved assets or choose already configured one.

3\. Navigate to Configure Alerts. It is suggested to leave filtering as broad as possible in order to be able to test alerting channel functionality. (Make sure to include the risk types you are interesting in)

<figure><img src="../../../../.gitbook/assets/api-image(1).png" alt="" width="563"><figcaption></figcaption></figure>

4\. Press on next and choose your preferred alert channel.

<figure><img src="../../../../.gitbook/assets/api-image(2).png" alt=""><figcaption></figcaption></figure>

6\. Press on Save.

5\. Under the same watchlist, navigate to Risk Insights tab.

6\. From Query, remove Start Date to reveal broader risk insights timeframe.

<figure><img src="../../../../.gitbook/assets/api-image(3).png" alt=""><figcaption></figcaption></figure>

7\. Choose preferred filters (suggested to choose Medium and/or High Severity types, make sure to include the risk types you are interesting in).\
8\. Download the CSV of your current query risk insights by pressing on the download icon:

<figure><img src="../../../../.gitbook/assets/api-image(4).png" alt=""><figcaption></figcaption></figure>

9\. Query Hypernative’s API endpoint by providing array (list) of risks insight ID’s (from the downloaded CSV). Endpoint: [https://api.hypernative.xyz/alert-replay/ri-id](https://api.hypernative.xyz/alert-replay/ri-id)

More details can be found here:

{% content-ref url="using-riids.md" %}
[using-riids.md](using-riids.md)
{% endcontent-ref %}
