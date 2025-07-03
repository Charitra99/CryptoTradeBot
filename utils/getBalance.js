const { connection } = require('./solana');
const { PublicKey } = require('@solana/web3.js');

/**
 * Get and print balance of a wallet by public key string
 * @param {string} publicKeyStr - base58 wallet address
 */
async function getBalance(publicKeyStr) {
  try {
    const pubkey = new PublicKey(publicKeyStr);
    const balance = await connection.getBalance(pubkey);
    console.log(`💰 Balance: ${balance / 1e9} SOL`);
    return balance / 1e9;
  } catch (err) {
    console.error("❌ Error fetching balance:", err.message);
    return null;
  }
}

module.exports = { getBalance };


// // Standalone runner
// if (require.main === module) {
//   require('dotenv').config(); // Load env variables

//   const { getWallet } = require('./solana'); // Get wallet
//   const wallet = getWallet();

//   getBalance(wallet.publicKey.toString());
// }
