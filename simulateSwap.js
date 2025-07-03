// const { Keypair, Connection, clusterApiUrl, PublicKey } = require('@solana/web3.js');
// const { getQuote } = require('./utils/jupiter');
// const { getWallet, connection } = require('./utils/solana');
// const { inputMint, outputMint, amount } = require('./utils/tradeConfig');
// const { createSwapInstruction } = require('@jup-ag/core');
// const web3 = require('@solana/web3.js');




//   console.log("🚀 Sending transaction...");
//   const sig = await connection.sendRawTransaction(signed.serialize());
//   console.log(`✅ Swap sent: https://explorer.solana.com/tx/${sig}?cluster=devnet`);
// })();

const web3 = require('@solana/web3.js'); // make sure this is added!
const { getQuote } = require('./utils/jupiter');
const { getWallet, connection } = require('./utils/solana');
const { inputMint, outputMint, amount } = require('./utils/tradeConfig');

require('dotenv').config();

(async () => {
  const wallet = getWallet();
  console.log(`🔐 Using wallet: ${wallet.publicKey.toBase58()}`);

  console.log("📡 Fetching best route...");
  const route = await getQuote(inputMint, outputMint, amount);
  if (!route) return console.log("❌ No route found.");

  console.log("🛠️ Building transaction...");
  const { swapTransaction } = await fetch('https://quote-api.jup.ag/v6/swap', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      route,
      userPublicKey: wallet.publicKey.toString(),
      wrapUnwrapSOL: true,
      dynamicComputeUnitLimit: true,
      feeAccount: null
    })
  }).then(res => res.json());

  const tx = Buffer.from(swapTransaction, 'base64');
  const transaction = web3.Transaction.from(tx);

  const { blockhash } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = wallet.publicKey;
  transaction.sign(wallet);

  console.log("🚀 Sending transaction...");
  const sig = await connection.sendRawTransaction(transaction.serialize());
  console.log(`✅ Swap sent: https://explorer.solana.com/tx/${sig}?cluster=devnet`);
})();
