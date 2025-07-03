const axios = require('axios');

// const url = `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&excludeDexes=MeteoraDLMM,RaydiumCLMM`;


async function getQuote(inputMint, outputMint, amount) {
  console.log("📡 Fetching Jupiter quote...");
  try {
    const res = await axios.get('https://quote-api.jup.ag/v6/quote', {          // get request for swapping tokens
      params: {
        inputMint,
        outputMint,
        amount,
        // amount: amount.toString(),
        slippageBps: 100, // 1%    acc. to the risk u r willing to take
        onlyDirectRoutes: false,
        excludeDexes: 'RaydiumCLMM,MeteoraDLMM',

        tokenLedgerOpts: {
      includeTokensWithoutMeta: true  // sometime this is needed as jupiter no t able to fetch swpa routes
    }
      },
      timeout: 5000             // fail request within 5 sec if not answered by jupiter
    });

   
    if (!res.data || !res.data.routePlan || res.data.routePlan.length === 0) {      // was the error
      console.log("❌ No route found for this token pair.");
      return null;
    }
    return res.data;
    // return res.data.data[0]; // Best route   in this api version cant use .data.data[]
    // console.log("Selected AMMs:", res.data.routePlan.map(p => p.swapInfo?.ammLabel));


  } catch (err) {
    console.error("⚠️ Error getting quote:", err?.response?.data || err);
    return null;
  }
}

module.exports = { getQuote };
