"use strict"
/**
 * After posting a transaction to the network, most software needs to display
 * comprehensive feedback to the user. This is especially true when an error
 * happens.
 *
 * This library produces human-readable descriptions for any possible code
 * Stellar Core returns:
 *
 * ```js
 * const response = await server.submitTransaction(transaction)
 * const result = new TxResult(response)
 * ```
 *
 * **Result for successful transactions:**
 *
 * ```js
 * {
 *  validated: true,
 *  title: "The transaction has been validated",
 *  hash: "d89c...007e",
 *  ledger: 370369,
 *  offerResults: undefined,
 *  link: "https://horizon-testnet.stellar.org/transactions/d89c...007e"
 * }
 * ```
 *
 * _Note:_ `offerResults` is as described in StellarSdk
 * `[server.submitTransaction()](https://stellar.github.io/js-stellar-sdk/Server.html#submitTransaction)`
 * documentation.
 *
 * **Result for failed transactions:**
 *
 * ```js
 * {
 *  validated: false,
 *  title: "The transaction has been rejected",
 *  errors: [
 *    "Operation 1: The destination account doesn't exist.",
 *    "Operation 3: The source does not have enough funds."
 *  ]
 * }
 * ```
 *
 * @category intro
 *
 */
const codes = require("./codes")

/* Definition */
class TxResult {
  /**
   * Returns the TxResult for an unresolved StellarSdk
   * `server.submitTransaction()` Promise.
   *
   * @async
   * @param {Promise} promise - An unresolved Horizon response.
   * @return {TxResult}
   */
  static fromPromise (promise) {
    return promise.finally(response => new TxResult(response))
  }

  /**
   * The _TxResult_ constructor.
   *
   * @class TxResult
   * @param {Object} txResponse - A response returned by StellarSdk
   * `server.submitTransaction()`.
   * @return {TxResult}
   */
  constructor (txResponse) {
    if (txResponse instanceof Error && txResponse.response) {
      txResponse = txResponse.response
    }

    if (txResponse.hash) {
      success(this, txResponse)
    } else if (txResponse.data && txResponse.data.extras) {
      failure(this, txResponse)
    } else {
      throw new Error("Not a Horizon txResponse", txResponse)
    }
  }
}

/* Parsers */

function success (result, response) {
  result.validated = true
  result.title = "The transaction has been validated"
  success.field.forEach(key => result[key] = response[key])
  result.link = response._links.transaction.href
}

success.field = ["hash", "ledger", "offerResults"]

function failure (result, response) {
  result.validated = false

  const data = response.data
  result.title = "The transaction has been rejected"
  result.codes = data.extras.result_codes
  result.errors = failure.errors(result)

  return result
}

failure.errors = function (result) {
  if (!result.codes.operations) {
    return [TxResult.describeTxCode(result.codes.transaction)]
  } else {
    return result.codes.operations
      .map(code => code !== "op_success" && TxResult.describeOpCode(code))
      .map((msg, index) => msg && `Operation ${index + 1}: ${msg}.`)
      .filter(msg => msg)
  }
}

/* Utilities */

/**
 * Returns a comprehensive description for transaction return **code**.
 *
 * @see [Transaction possible errors](https://www.stellar.org/developers/guides/concepts/transactions.html#possible-errors)
 * @param {String} code - A Stellar transaction return code.
 * @return {String}
 */
TxResult.describeTxCode = function (code) {
  const desc = codes.tx[code.substr(3)] // Removes "tx_" prefix
  return desc || `An unknown error occurred: tx_${code}`
}

/**
 * Returns a comprehensive description for operation return **code**.
 *
 * @see [Operations possible errors](https://www.stellar.org/developers/guides/concepts/list-of-operations.html)
 * @param {String} code - A Stellar operation return code.
 * @return {String}
 */
TxResult.describeOpCode = function (code) {
  const desc = codes.op[code.substr(3)] // Removes "op_" prefix
  return desc || `An unknown error occurred: op_${code}`
}

/* Exports */
module.exports = TxResult
