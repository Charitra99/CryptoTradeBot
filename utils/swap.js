
// this is real swapping of tokens 
// to avoid risk we try it on devnet and get free SOL(not real) from some faucets like https://solfaucet.com/ for testing purpose

const { VersionedTransaction } = require('@solana/web3.js');
const { getWallet, connection } = require('./solana');

/**
 * Executes a token swap using the base64 transaction string from Jupiter's /v6/swap endpoint.
 * @param {string} swapTxBase64 - base64 encoded swap transaction
 */
async function executeSwap(swapTxBase64) {
  console.log("📦 Preparing swap transaction...");

  try {
    const wallet = getWallet();  // ✅ Get wallet here

    // Decode and deserialize the transaction
    const txBuf = Buffer.from(swapTxBase64, 'base64');
    const tx = VersionedTransaction.deserialize(txBuf);

    // Sign the transaction with wallet
    tx.sign([wallet]);

    // Send transaction
    const txid = await connection.sendTransaction(tx, {
      maxRetries: 3,
      skipPreflight: false,
    });

    console.log(`✅ Swap transaction submitted. Txid: https://solscan.io/tx/${txid}`);
    return txid;

  } catch (err) {
    console.error("❌ Error during swap:", err.message || err);
    return null;
  }
}

module.exports = { executeSwap };
