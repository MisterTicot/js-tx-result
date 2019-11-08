**tx-result /**
[Readme](https://cosmic.plus/#view:js-tx-result)
• [Contributing](https://cosmic.plus/#view:js-tx-result/CONTRIBUTING)
• [Changelog](https://cosmic.plus/#view:js-tx-result/CHANGELOG)

# Readme

![Licence](https://img.shields.io/github/license/cosmic-plus/js-tx-result.svg)
[![Dependencies](https://badgen.net/david/dep/cosmic-plus/js-tx-result)](https://david-dm.org/cosmic-plus/js-tx-result)
![Vulnerabilities](https://snyk.io/test/npm/@cosmic-plus/tx-result/badge.svg)
![Bundle](https://badgen.net/badgesize/gzip/cosmic-plus/js-tx-result-web/master/tx-result.js?label=bundle)
![Downloads](https://badgen.net/npm/dt/@cosmic-plus/tx-result)

Turns Stellar Horizon responses into meaningful descriptions.

(Weekly updates: [Reddit](https://reddit.com/r/cosmic_plus),
[Twitter](https://twitter.com/cosmic_plus),
[Keybase](https://keybase.io/team/cosmic_plus),
[Telegram](https://t.me/cosmic_plus))

## Introduction

Horizon TX response codes.

After posting a transaction to the network, most software needs to display
comprehensive feedback to the user. This is especially true when an error
happens.

This library produces human-readable descriptions for any possible code
Stellar Core returns:

```js
const response = await server.submitTransaction(transaction)
const result = new TxResult(response)
```

**Result for successfull transactions:**

```js
{
 validated: true,
 title: "The transaction has been validated",
 hash: "d89c...007e",
 ledger: 370369,
 offerResults: undefined,
 link: "https://horizon-testnet.stellar.org/transactions/d89c...007e"
}
```

_Note:_ `offerResults` is as described in StellarSdk
`[server.submitTransaction()](https://stellar.github.io/js-stellar-sdk/Server.html#submitTransaction)`
documentation.

**Result for failed transactions:**

```js
{
 validated: false,
 title: "The transaction has been rejected",
 errors: [
   "Operation 1: The destination account doesn't exist.",
   "Operation 3: The source does not have enough funds."
 ]
}
```

## Installation

### NPM/Yarn

- NPM: `npm install @cosmic-plus/tx-result`
- Yarn: `yarn add @cosmic-plus/tx-result`

In your script: `const txResult = require("@cosmic-plus/tx-result")`

### Bower

`bower install cosmic-plus-tx-result`

In your HTML page:

```HTML
<script src="./bower_components/cosmic-plus-tx-result/tx-result.js"></script>
```

### CDN

In your HTML page:

```HTML
<script src="https://cdn.cosmic.plus/tx-result@1.x"></script>
```

_Note:_ For production release it is advised to serve your copy of the library.

## Usage

### Functions

#### new TxResult(txResponse)

The _TxResult_ constructor.

| Param      | Type     | Description                                                     |
| ---------- | -------- | --------------------------------------------------------------- |
| txResponse | `Object` | A response returned by StellarSdk `server.submitTransaction()`. |

#### await TxResult.fromPromise(promise) ⇒ `Object`

Returns the TxResult for an unresolved StellarSdk
`server.submitTransaction()` Promise.

| Param   | Type      | Description                     |
| ------- | --------- | ------------------------------- |
| promise | `Promise` | An unresolved Horizon response. |

#### TxResult.describeTxCode(code) ⇒ `String`

Returns a comprehensive description for transaction return **code**.

**See**: [Transaction possible errors](https://www.stellar.org/developers/guides/concepts/transactions.html#possible-errors)

| Param | Type     | Description                        |
| ----- | -------- | ---------------------------------- |
| code  | `String` | A Stellar transaction return code. |

#### TxResult.describeOpCode(code) ⇒ `String`

Returns a comprehensive description for operation return **code**.

**See**: [Operations possible errors](https://www.stellar.org/developers/guides/concepts/list-of-operations.html)

| Param | Type     | Description                      |
| ----- | -------- | -------------------------------- |
| code  | `String` | A Stellar operation return code. |

## Links

**Organization:** [Cosmic.plus](https://cosmic.plus/) | [@GitHub](https://git.cosmic.plus) | [@NPM](https://www.npmjs.com/search?q=cosmic-plus)

**Follow:** [Reddit](https://reddit.com/r/cosmic_plus) | [Twitter](https://twitter.com/cosmic_plus) | [Medium](https://medium.com/cosmic-plus) | [Codepen](https://codepen.io/cosmic-plus)

**Talk:** [Telegram](https://t.me/cosmic_plus) | [Keybase](https://keybase.io/team/cosmic_plus)
