const axios = require('axios');
const { getWallet } = require('./solana');

/**
 * Fetches the base64 swap transaction for execution.
 */
async function fetchSwapTransaction(route) {
  try {
    const wallet = getWallet();
    const response = await axios.post('https://quote-api.jup.ag/v6/swap', {
      quoteResponse: route,
      userPublicKey: wallet.publicKey.toBase58(),
      wrapUnwrapSOL: true,
      dynamicComputeUnitLimit: true,
      feeAccount: null,
    });

    const tx = response.data.swapTransaction;
    if (!tx) {
      console.error("❌ swapTransaction field missing.");
      return null;
    }

    return tx;
  } catch (err) {
    console.error("❌ Failed to fetch swap transaction:", err?.response?.data || err.message);
    return null;
  }
}

module.exports = { fetchSwapTransaction };
