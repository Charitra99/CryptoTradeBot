// if have elevated access to twitter API could do it more easily than this 
const { TwitterApi } = require('twitter-api-v2');

const client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);

// List of user IDs to monitor
const TRACKED_USER_IDS = [
  '44196397',     // Elon Musk
  '1622243071806128131', // pump.fun
  '1470958472409792515', // a1lon9
  '951329744804392960',  // solana
  '902926941413453824'   // cz_binance
];

// Meme coin keywords to detect in tweet text
const KEYWORDS = ['$', 'coin', 'pump', 'launch', 'moon', 'ape', 'buy', 'token', 'mint', 'ca', 'doge'];

// console.log("Using Bearer Token:", process.env.TWITTER_BEARER_TOKEN);  use the line // require('dotenv').config();


// Cache to avoid reprocessing the same tweet
const seenTweetIds = new Set();

// Poll latest tweets from tracked users
async function pollTweets(callback) {
  for (const userId of TRACKED_USER_IDS) {
    try {
      const timeline = await client.v2.userTimeline(userId, {
        max_results: 5,
        'tweet.fields': ['author_id', 'text', 'id']
      });

      const tweets = timeline.data?.data || [];
      for (const tweet of tweets) {
        if (seenTweetIds.has(tweet.id)) continue;

        seenTweetIds.add(tweet.id);
        const text = tweet.text.toLowerCase();
        const keywordMatched = KEYWORDS.some(k => text.includes(k));

        if (keywordMatched) {
          console.log(`🚨 Matched keyword in tweet from user ${userId}: ${tweet.text}`);
          callback(tweet); // trigger swap or alert
        } else {
          console.log(`ℹ️ Skipped (no keyword): ${tweet.text}`);
        }
      }
    } catch (err) {
      console.error(`❌ Error fetching tweets from user ${userId}:`, err.message);
    }
  }
}

// Start polling at interval
function monitorTweets(callback, intervalMs = 90000) {        
  console.log("📡 Starting tweet polling every", intervalMs / 1000, "seconds...");
  pollTweets(callback); // run immediately once
  setInterval(() => pollTweets(callback), intervalMs); // then on interval
}

module.exports = { monitorTweets };
