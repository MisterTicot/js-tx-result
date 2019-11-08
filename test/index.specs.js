/* eslint-env jasmine */
/* eslint-disable no-console */
"use strict"

const { config, CosmicLink } = require("cosmic-lib")
const StellarSdk = require("stellar-sdk")
const { friendbot } = require("@cosmic-plus/base")

const TxResult = require("../src")

const { any } = jasmine

/* Setup */

const kp = StellarSdk.Keypair.random()

const validOp = { type: "setOptions" }
const invalidOp = {
  type: "payment",
  amount: 20000,
  destination: "tips*cosmic.link"
}

config.network = "test"
config.source = kp.publicKey()

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000

/* Initialization */

async function init () {
  await friendbot(config.source)
}

/* Helpers */

async function makeTxResponse (...ops) {
  const txReq = new CosmicLink()
  ops.forEach(op => txReq.addOperation(null, op))

  await txReq.lock()
  txReq.sign(kp)

  return txReq.send().catch(x => x)
}

/* Specifications */

describe("TxResult", () => {
  const tx = {}
  beforeAll(async () => {
    console.log("Initializing test environment...")
    await init()
    tx.success1 = await makeTxResponse(validOp)
    tx.fail1 = await makeTxResponse(invalidOp)
    tx.fail1and3 = await makeTxResponse(invalidOp, validOp, invalidOp)
    console.log("Done")
    console.log()
  })

  it("Rejects arguments other than a txResponse", () => {
    expect(() => new TxResult({ foo: "bar" })).toThrow()
  })

  it("Returns info about successful transactions", () => {
    const result = new TxResult(tx.success1)
    console.log(result)
    expect(result.validated).toBeTrue()
    expect(result.title).toBe("The transaction has been validated")
    expect(result.hash).toEqual(any(String))
    expect(result.hash).toBe(tx.success1.hash)
    expect(result.ledger).toEqual(any(Number))
    expect(result.ledger).toBe(tx.success1.ledger)
  })

  it("Returns details about failed transactions", () => {
    const result = new TxResult(tx.fail1)
    console.log(result)
    expect(result.validated).toBeFalse()
    expect(result.title).toEqual(any(String))
    expect(result.codes).not.toBeNull()
    expect(result.errors).toEqual(any(Array))
    expect(result.errors.length).toBe(1)
    expect(result.errors[0].match(/^Operation 1: /)).not.toBeNull()

    const result2 = new TxResult(tx.fail1and3)
    console.log(result2)
    expect(result2.errors.length).toBe(2)
    expect(result2.errors[0].match(/^Operation 1: /)).not.toBeNull()
    expect(result2.errors[1].match(/^Operation 3: /)).not.toBeNull()
  })
})
