
// to check twitter tweets can be accessed

require('dotenv').config(); //  CRITICAL for loading .env

const { monitorTweets } = require('./twitter');

monitorTweets((tweet) => {
  console.log("🔁 Tweet received:", tweet.text);
});
