const { TokenListProvider } = require('@solana/spl-token-registry');

let tokenMap;

async function loadTokenRegistry() {
  const tokenList = await new TokenListProvider().resolve();
  tokenMap = tokenList.filterByChainId(101).getList().reduce((map, item) => {
    map[item.address] = item.symbol;
    return map;
  }, {});
}

async function getTokenSymbol(address) {
  if (!tokenMap) await loadTokenRegistry();
  return tokenMap[address] || "Unknown Token";
}

module.exports = { getTokenSymbol };
