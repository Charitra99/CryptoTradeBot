// when need to simulate the code without risking orignal wallet than can use devnet instead of main net


const { Keypair } = require('@solana/web3.js');
const kp = Keypair.generate();

console.log("PUBLIC KEY:", kp.publicKey.toBase58());
console.log("PRIVATE_KEY=[", kp.secretKey.toString(), "]");
