"use strict"
/**
 * Horizon TX response codes.
 *
 * @private
 */
const codes = module.exports

/**
 * Transaction codes
 *
 * @private
 * @see https://www.stellar.org/developers/guides/concepts/transactions.html#possible-errors
 */
codes.tx = {
  failed: "The transaction failed",
  too_early: "The transaction is not valid yet",
  too_late: "The transaction is not valid anymore",
  missing_operation: "The transaction does not have any operation",
  bad_seq: "The transaction sequence number is invalid",
  bad_auth: "The transaction doesn't have enough signatures",
  insufficient_balance:
    "There are not enough funds to pay for the transaction fees",
  no_account: "The source account does not exist",
  insufficient_fee: "The transaction fees are too small",
  bad_auth_extra: "The transaction has too many signatures",
  internal_error: "An unknown error occurred",
  success: "The transaction has been validated",
  fee_bump_inner_success: "The fees have been bumped",
  fee_bump_inner_failed: "The fees failed to get bumped"
}

/**
 * Operations codes
 *
 * @private
 * @see https://www.stellar.org/developers/guides/concepts/list-of-operations.html
 */
codes.op = {
  // Generic
  success: "The operation has been validated",
  not_supported: "This feature is not supported anymore",
  // Create account
  malformed: "The operation has invalid inputs",
  underfunded: "The source does not have enough funds",
  low_reserve: "The source does not have enough funds to pay for reserve fee",
  already_exist: "The destination account already exists",
  // Payment
  src_no_trust: "The source does not trust this asset",
  src_not_authorized: "The source is not authorized to send this asset",
  no_destination: "The destination does not exist",
  no_trust: "The destination does not trust this asset",
  not_authorized: "The destination is not authorized to receive this asset",
  line_full: "The trust limit for this asset is too low",
  no_issuer: "The issuer of the asset does not exist",
  // Path payments
  too_few_offers:
    "There is no path connecting `send asset` to `destination asset`",
  offer_cross_self: "The source would cross its own offer",
  under_destmin: "The destination amount would be under the requested minimum",
  over_sendmax: "The send amount would be over the requested maximum",
  // Offers
  sell_no_trust: "The source does not trust `selling asset`",
  buy_no_trust: "The source does not trust `buying asset`",
  buy_not_authorized: "The source is not authorized to buy this asset",
  sell_not_authorized: "The source is not authorized to sell this asset",
  sell_no_issuer: "The issuer of `selling asset` does not exist",
  buy_no_issuer: "The issuer of `buying asset` does not exist",
  offer_not_found: "There is no offer with that `offerId`",
  // Set options
  too_may_signers: "The source already has the maximum of 20 signers",
  bad_flags:
    "The flags set and/or cleared are invalid by themselves or in combination",
  invalid_inflation: "The inflation destination does not exist",
  options_cant_change: "The source can no longer change this option",
  unknown_flag: "This flag is unknown",
  threshold_out_of_range:
    "The value of a key weight or threshold is out of range",
  bad_signer: "The master key cannot be added as an additional signer",
  invalid_home_domain: "The home domain is malformed",
  // Change trust
  invalid_limit:
    "The limit is too low for current the current balance and liabilities",
  self_not_allowed: "The source already trust its own asset",
  // Allow trust
  no_trust_line: "The target account does not trust the source",
  trust_not_required: "The source has not set the `auth_required` flag",
  trust_cant_revoke: "The source is not allowed to revoke this trustline",
  // Account merge
  immutable_set: "The source has the `auth_immutable` flag set",
  has_sub_entries: "The source account still has opened trustlines or offers",
  merge_seqnum_too_far: "The source sequence number is too high",
  merge_dest_full: "The destination cannot receive the source Lumens",
  // Inflation
  not_time: "Inflation can only run once a week",
  // Manage data
  not_supported_yet: "The network does not support this feature yet",
  not_found: "The data entry does not exist",
  invalid_name: "The data entry name is not valid",
  // Bump Sequence
  bad_seq: "The sequence number is invalid"
}
