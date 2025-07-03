// getUserId.js
require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

async function getUserId(username) {
  try {
    const user = await client.v2.userByUsername(username);
    console.log(`${username} → ID: ${user.data.id}`);
  } catch (err) {
    console.error(`❌ Error fetching ID for ${username}:`, err.message);
  }
}

['elonmusk', 'pumpdotfun', 'solana','a1lon9','cz_binance'].forEach(getUserId);

// output

// a1lon9 → ID: 1470958472409792515
// pumpdotfun → ID: 1622243071806128131
// solana → ID: 951329744804392960
// elonmusk → ID: 44196397
// cz_binance → ID: 902926941413453824