// here we could modify our bot working and eve may involve ai intergation
// enter in ths directory of parent folder in terminal and  run node index.js

require('dotenv').config();

const { getQuote } = require('./utils/jupiter');
const axios = require('axios');     // make http rewuest to jupiter API
const { connection, getWallet } = require('./utils/solana');
const { getTokenName } = require('./utils/tokenList');
const { getTokenSymbol } = require('./utils/getTokenSymbol');
const { executeSwap } = require('./utils/swap');
const { getBalance } = require('./utils/getBalance');
const { fetchSwapTransaction } = require('./utils/jupiterTransaction');
const { getOnChainDecimals } = require('./utils/get_Token_info_fromchain');
const { loadTokenList } = require('./utils/tokenList');



const wallet = getWallet();         // loading wallet for signing
getBalance(wallet.publicKey.toString());

// hardcoded
// console.log("PRIVATE KEY LOADED:", process.env.PRIVATE_KEY);  // to check if it is access

// get quotes get the swap routes from jupiter api needed when we swap solana with crypto or meme coin 

// this hardcoded could be moved seperately to juptier.js file to handle jupiter api seperatley instead of hardcoded
// async function getQuote(inputMint,outputMint,amount){ // input mint is token we r swaping and so on
// const url =   `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}`;
// const res = await axios.get(url);

// if (!res.data.data || res.data.data.length === 0) {
//   console.log("❌ No route found for this token pair.");
//   return;
// }
// // in case of no routes are found


// const bestRoute = res.data.data[0];
// console.log('Best Route Found:');
// console.log(`From ${amount} -> Out: ${bestRoute.outAmount}`);
// console.log(`Via AMMs: ${bestRoute.marketInfos.map(m => m.label).join(' -> ')}`);

// }// Logs how much output you'd get, and through which AMMs (decentralized exchanges like Orca, Lifinity, etc.)

// (async () => {
//   const Trump = '6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN';
//   const SOL = 'So11111111111111111111111111111111111111112';
//   const amount = 1000000; // 1 USDC (since USDC has 6 decimals)

//   await getQuote(Trump, SOL, amount);
// })();


const { inputMint, outputMint, amount } = require('./utils/tradeConfig');      // if not using twitter trigger then use trade config fil
const { monitorTweets } = require('./utils/twitter'); 
const SOL_MINT = 'So11111111111111111111111111111111111111112'; // Input token fixed as SOL


// const inputMint = 'So11111111111111111111111111111111111111112'; // SOL
// const outputMint = 'BAKr8e4iV1Y2c2XJxVFhbMyYnfcRU4dvkaKzQUsepump'; // trump
// const amount = 1000000; // 0.001 SOL in lamports


async function getTokenDecimals(mintAddress) {
  const map = await loadTokenList();
  return map[mintAddress]?.decimals ?? await getOnChainDecimals(mintAddress);
}

async function findMintBySymbol(symbol) {
  const map = await loadTokenList();
  for (const addr in map) {
    if (map[addr].symbol.toLowerCase() === symbol.toLowerCase()) {
      return addr;
    }
  }
  return null;
}


//////////////// if twitter.js is not used use this async block else the other


// (async () => {
//   console.log("🔑 Wallet loaded:", wallet.publicKey.toString());
  
//   // const inputName = await getTokenName(inputMint);
//   // const outputName = await getTokenName(outputMint);

//   let inputName = await getTokenName(inputMint);
//   let outputName = await getTokenName(outputMint);

//   // fallback to registry if still Unknown
//   if (inputName === "Unknown Token") inputName = await getTokenSymbol(inputMint);
//   if (outputName === "Unknown Token") outputName = await getTokenSymbol(outputMint);


//   console.log(`🔁 Swapping ${inputName} → ${outputName}`);


//   const route = await getQuote(inputMint, outputMint, amount);
//   if (route) {
//     // console.log("🚀 Best route found:");
//     // console.log(`Input: ${route.inAmount} → Output: ${route.outAmount}`);
//     // console.log("Route Path:", route.marketInfos.map(m => m.amm.label).join(' → '));   syntax error

//     console.log("🚀 Best route found:");
//     // console.log(`Input token in smallest unit: ${route.inAmount} ${inputName} → Output: ${route.outAmount} ${outputName}`);

  
//     const inputDecimals = await getTokenDecimals(inputMint);
//     const inputAmountAdjusted = route.inAmount / (10 ** inputDecimals);

//     const outputDecimals = await getTokenDecimals(outputMint);
//     const outputAmountAdjusted = route.outAmount / (10 ** outputDecimals);

//     console.log(`Input token (raw) in smallest unit: ${route.inAmount} ${inputName}`);
//     console.log(`🎯 Input (adjusted): ${inputAmountAdjusted} ${inputName}`);
//     console.log(`Output token (raw): ${route.outAmount} ${outputName}`);
//     console.log(`🎯 Output (adjusted): ${outputAmountAdjusted} ${outputName}`);

//     console.log("Route Path:", route.routePlan.map(p => p.swapInfo?.ammLabel || 'Unknown').join(' → '));
    
    
//     // console.log("📦 Full route object to be sent to Jupiter:", JSON.stringify(route, null, 2));  to printout eaCH INFO
    
//     const swapTx = await fetchSwapTransaction(route);
//     if (swapTx) {
//     await executeSwap(swapTx);

//   }
//   }
// })();





// using this if twitter api and twitter trigger is being used



monitorTweets(async (tweet) => {
  const text = tweet.text.toLowerCase();
  const possibleCoins = ['trump', 'elon', 'doge', 'moon', 'maga', 'pump'];

  const foundSymbol = possibleCoins.find(sym => text.includes(sym));
  if (!foundSymbol) return;

  console.log(`🚨 Tweet contains symbol: ${foundSymbol}`);

  const outputMint = await findMintBySymbol(foundSymbol);
  if (!outputMint) {
    console.log("❌ Mint not found for that symbol in Jupiter token list.");
    return;
  }

  const amount = 100000; // 0.0001 SOL (lamports)

  const inputName = await getTokenName(SOL_MINT);
  const outputName = await getTokenName(outputMint);

  console.log(`🔁 Swapping ${inputName} → ${outputName}`);

  const route = await getQuote(SOL_MINT, outputMint, amount);
  if (!route) return;

  const inputDecimals = await getTokenDecimals(SOL_MINT);
  const inputAmountAdjusted = route.inAmount / (10 ** inputDecimals);

  const outputDecimals = await getTokenDecimals(outputMint);
  const outputAmountAdjusted = route.outAmount / (10 ** outputDecimals);

  console.log(`Input: ${inputAmountAdjusted} ${inputName}`);
  console.log(`Output: ${outputAmountAdjusted} ${outputName}`);
  console.log("Route Path:", route.routePlan.map(p => p.swapInfo?.ammLabel || 'Unknown').join(' → '));

  const swapTx = await fetchSwapTransaction(route);
  if (swapTx) {
    await executeSwap(swapTx);
  }
});
