// this code file handels block chain set up 

const { Connection, Keypair, clusterApiUrl, PublicKey } = require('@solana/web3.js');
const web3 = require('@solana/web3.js');
require('dotenv').config();         // load the .env file which have your wallets private key

// const connection = new Connection(clusterApiUrl('devnet'), 'confirmed'); //  connects to solana devnet test network for testing purpose
// const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');    // now useing mainnet when using real phantom wallet and used real private key of your wallet
// const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
// const connection = new Connection(clusterApiUrl("devnet"), "confirmed");


const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");

// while using devnet cant fetch jupiter api and with mainnet(i.e real money on phantom )

function getWallet() {          // will be use to sign the transcation made
  const secret = Uint8Array.from(JSON.parse(process.env.PRIVATE_KEY));
  return Keypair.fromSecretKey(secret);
}
async function getBalance(publicKeyStr) {
  const pubkey = new PublicKey(publicKeyStr);
  const balance = await connection.getBalance(pubkey);
  console.log(`💰 Balance: ${balance / 1e9} SOL`);
}


module.exports = {
  connection,
  getWallet,
};
