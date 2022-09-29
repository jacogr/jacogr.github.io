# Polkadot Governance 2: Referenda, creating and retrieving

## Introduction

As of end-September 2022 Polkadot Governance 2 is around the corner. As the case in all on-chain rollouts, the more-stable Polkadot will be second in line for actual deployment, with the wild cousin Kusama getting the deployments first. If you are here looking for a "why Governance 2", I'm rather directing you to the excellent writings from Gavin Wood on [the subject](https://medium.com/polkadot-network/gov2-polkadots-next-generation-of-decentralised-governance-4d9ef657d11b), or if you prefer video, Gavin has also done a [recorded talk on it](https://www.youtube.com/watch?v=tBvxn8WfcFI).

With this imminent deployment in mind, developers are starting to look at the actual [referenda pallet](https://github.com/paritytech/substrate/blob/a47f200eebeb88a5bde6f1ed2be9728b82536dde/frame/referenda/src/lib.rs) and trying to understand how integration would work on their user interfaces and tools. This writing is here to help. We will take a deep-dive and walk-through on the usage of (some of) the new interfaces and try to de-obfuscate the Rust code.

Based on my specific background in a [dark corner of the ecosystem](https://github.com/polkadot-js), this will be kept from the perspective of a JS integrator, however if you are a user of any of the other excellent APIs and toolsets out there, you will find that the knowledge gained here should be directly transposable to your specific tools of choice.

One small caveat: everybody makes mistakes, so there is always a possibility that I slip-up somewhere or that I don't quite answer your specific questions exactly. If this does happen and I can add more clarifications, please do let me know [via an issue](https://github.com/jacogr/jacogr.github.io/issues/new?title=HOWTO:%20Gov2). For any other related of not-at-all-related questions, the community would also be glad to assist on the [Substrate and Polkadot Stack Exchange](https://substrate.stackexchange.com/).


## Referenda in a nutshell

A base pallet for Governance 2 and the one who are going to focus on here as a deep-dive, is the [referenda pallet](https://github.com/paritytech/substrate/tree/a47f200eebeb88a5bde6f1ed2be9728b82536dde/frame/referenda/src). In Governance 2, this forms a backbone for any on-chain referenda, used for both general community-led referenda and well as those made by other bodies such as the [Polkadot Fellowship](https://github.com/polkadot-fellows/).

Expanding on the above: this means that the core functionality for the management of referendums can be shared, however each usage itself will be configured with a specific voting-related setup based on the desired requirements. This is indeed the way it is configured on-chain, for instance in the [Kusama Governance 2 PR](https://github.com/paritytech/polkadot/pull/5205) tracks (more on this later) are defined for both `referenda` and `fellowshipReferenda`, the former using conviction voting, the latter using voting from ranked colklectives.


## Changes

- 30 Sep 2022 - Initial version
