
// this file is needed as mainly newly created meme coins are not ez to fetch diretcly hence using min address and from new verison of spl
// we are fetching name and token decimal correctly to sell effectively(25% 50% 100%)

const { getMint } = require(require.resolve("@solana/spl-token", { paths: [__dirname] }));   // will use latest version of spl token
// const { getMint } = require("@solana/spl-token"); almost all of jupiter sdk thing depend on olderversion hence cant delete that also
const { PublicKey } = require("@solana/web3.js");
const { connection } = require("./solana");

async function getOnChainTokenName(mintAddress) {
  try {
    const mintInfo = await getMint(connection, new PublicKey(mintAddress));
    return mintInfo.name || "Unknown Token"; // Not always available
  } catch (err) {
    console.error(`❌ Failed to fetch on-chain name for ${mintAddress}:`, err.message);
    return "Unknown Token";
  }
}


async function getOnChainDecimals(mintAddress) {
  try {
    const mintInfo = await getMint(connection, new PublicKey(mintAddress));
    return mintInfo.decimals;
  } catch (err) {
    console.error(`❌ Failed to fetch on-chain decimals for ${mintAddress}`, err.message);
    return 0; // Default fallback
  }
}
module.exports = {
  getOnChainDecimals,
  getOnChainTokenName
};
