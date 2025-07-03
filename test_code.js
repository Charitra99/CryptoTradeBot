const axios = require('axios');

async function testQuote() {
  console.log("📡 Testing Jupiter Quote API...");

  try {
    const response = await axios.get(
      'https://quote-api.jup.ag/v6/quote',
      {
        params: {
          inputMint: 'So11111111111111111111111111111111111111112',
          outputMint: '9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump',
          amount: '1000000'
        },
        timeout: 10000,
      }
    );

    console.log("✅ Quote received:", response.data);
  } catch (error) {
    console.error("❌ API Error:", error?.response?.data || error.message);
  }
}

testQuote();
