
async function getTokenDecimals(mintAddress) {
  const map = await require('./utils/tokenList').loadTokenList();
  return map[mintAddress]?.decimals || 0;
}