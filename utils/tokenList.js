// to get the ticker or name of tokens want to swap or trade
// but api says unknown token for meme coins    so also using spl mint address and get mint function of neweer spl version as if normal jup.ag also fails

const axios = require('axios');
const { TokenListProvider } = require('@solana/spl-token-registry');
const { getTokenSymbol } = require('./getTokenSymbol');
const { getOnChainTokenName } = require('./get_Token_info_fromchain');

// Separate maps to avoid overwriting
let jupTokenMap = null;
let registryTokenMap = null;

// 1. Load Jupiter token list
async function loadTokenList() {
  if (jupTokenMap) return jupTokenMap;

  const res = await axios.get('https://cache.jup.ag/tokens');
  jupTokenMap = {};
  for (const token of res.data) {
    jupTokenMap[token.address] = token;
  }

  return jupTokenMap;
}

// 2. Load SPL Token Registry
async function loadTokenRegistry() {
  if (registryTokenMap) return registryTokenMap;

  const tokenList = await new TokenListProvider().resolve();
  registryTokenMap = tokenList
    .filterByChainId(101)
    .getList()
    .reduce((map, item) => {
      map[item.address] = item.name;
      return map;
    }, {});

  return registryTokenMap;
}

// 3. Unified getTokenName
async function getTokenName(address) {
  const jupMap = await loadTokenList();
  if (jupMap[address]) return jupMap[address].symbol;

  const regMap = await loadTokenRegistry();
  if (regMap[address]) return regMap[address];

  const symbol = await getTokenSymbol(address);
  if (symbol !== "Unknown Token") return symbol;

  const onChainName = await getOnChainTokenName(address);
  return onChainName || "Unknown Token";
}

module.exports = {
  getTokenName,
  loadTokenList
};
