# Overview - Transaction Risk Assessment

With Hypernative’s API for initiated transactions, you can get an interpretation of the transaction, and explain to your users what will happen as a result of the assessed transaction.

#### **1) Provide a clear understanding of a transaction’s potential impact and reveal who your users are really interacting with.**&#x20;

Hypernative simulates the initiated transaction, and presents its outcomes, including:

1. Balance changes in all involved address.
2. Mapping of addresses to protocols and organizations.
3. Interpreted actions, including transfers, approvals, swaps, deposit or withdrawals from pools, and many more.
4. Changes to protocol states.



#### **2) Embed transaction security recommendations for your users directly in your wallet interface.**

Hypernative runs several AI-powered security engines, to detect fraud, scams, hacks & exploits.&#x20;

Selected list of included risks:

<table data-view="cards"><thead><tr><th></th><th></th></tr></thead><tbody><tr><td><span data-gb-custom-inline data-tag="emoji" data-code="1f47f">👿</span> <strong>Fraud &#x26; Phishing</strong></td><td><p></p><ul><li>Interactions with phishing addresses</li></ul><ul><li>Interactions with drainer addresses</li></ul><ul><li>Connections to addresses associated with various scams (e.g., social engineering, investment fraud, address poisoning)</li></ul><ul><li>Address poisoning - impersonating address</li></ul><ul><li>Scam token</li></ul></td></tr><tr><td><span data-gb-custom-inline data-tag="emoji" data-code="1f6e1">🛡️</span> <strong>Security</strong></td><td><p></p><ul><li>Detection of malicious websites</li></ul><ul><li>Unverified token</li></ul><ul><li>Approval to attacker contract</li></ul></td></tr><tr><td><span data-gb-custom-inline data-tag="emoji" data-code="1f3c3">🏃</span> <strong>Unusual User Behavior</strong></td><td>Unusual interaction based on the time of day, protocol, and amounts compared to the sender’s past transactions</td></tr><tr><td><span data-gb-custom-inline data-tag="emoji" data-code="2611">☑️</span> <strong>Compliance</strong></td><td><p></p><ul><li>Depositing funds into DeFi pools that include a high amount of illicit funds</li></ul><ul><li>Involved with terrorism financing, suspicious previous activity, or previously sanctioned by compliance organizations</li></ul></td></tr></tbody></table>

#### **3) Use Hypernative’s built-in recommendation system to have the primary action as Cancel - in case of a Deny Recommendation.**



### Supported Chains

Hypernative’s API for Transactions is available for **40+ EVM-based chains and Solana.** For details, refer to the **Hypernative Guardian** column in the [list of supported Chains](../../../supported-chains.md).

In addition, some of Hypernative’s customers are eligible for registering additional chains for support.



### Supported Transaction Types

Supported interaction types include:&#x20;

1. Contract calls
2. Transfers
3. Permits, and other types of typed off-chain messages signing
4. Meta-Transactions



In addition to assessing the transaction risk, the Hypernative API also provides an interpretation of the transaction, explaining to the user what will happen as a result of the assessed transaction.



## Presentation concepts

Following are some presentations concepts for various responses:

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXc5zkP4PMLYi5s8UQ8M4_9pA8y35tROWwiRs4N0DAc-bJC2HVIUu4uTC4JrfEfLSMwsMofo_caKsoRX8pSEwTW5noSjuBRwZsioIdBUWLcWU2AtpnblZjBz0aJwcylPeMzkdJBh?key=fg4C2lADMJr1bht7FoCCAg" alt=""><figcaption></figcaption></figure>

<figure><img src="https://lh6.googleusercontent.com/Od9d9muj7WzCksFaeqUDvbIJL4h0Rrh4thnpWUZb_FqcJA2t-bwaKUGbWws3r8Cb5tcg11KYu-viddUX_ntjfTQcdB6kd0LzPpSpFHIJR0sJ4ppvZksVpKV3oJz4PRLHqZteyN2EXHVYdTIGmF13chk5saLFuPoD2W-HJIljEkAebBnjsEUIEtV6wmw0TdAL" alt=""><figcaption><p>Example 1 - Transaction assessment presentation</p></figcaption></figure>

<figure><img src="https://lh4.googleusercontent.com/ehrp1hFH0izmg3F56bZwQSPcBlYfJE5UM3RQvLS1tCWupwozWeNH2mTpZ5nxOcCEvMKtRDzyx7lod-vj9th-L4vvHclNGQuJcYPo7DWCRSoogYhdlDshleyilYWH3OOmtzwr0pinoHSEEu0P7Fh1wvwlHj0wch2T7mMQ802UwLgOpyfoi7IIl3qYzFJQwNi8" alt=""><figcaption><p>Example 2 - Transaction assessment presentation</p></figcaption></figure>

<figure><img src="https://lh5.googleusercontent.com/U-PSZRSxTLrkPwNWf_0YLlQsL_3-BkmRNY7AlYbYlaA8muD739PPwwWRQee0OJdylOCMiw9NJ8acCBd2Wbtffr3N-fj5xOXk8gNUtlR-xeWaGPyRAlhZKlXEDF7d5HoO4vlGEcZB72zdBqu0fdbUaPJ3vehwzaBSODOLq4SqaBWE6jjcKDIollX_QTlkEsep" alt=""><figcaption><p>Example 3 - Transaction assessment presentation</p></figcaption></figure>

##
