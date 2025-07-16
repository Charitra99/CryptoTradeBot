# CryptoTradeBot

# 🚀 Twitter-Triggered Solana Meme Coin Trading Bot

> ⚠️ **CAUTION**: This bot performs real-time token swaps on Solana. Using your private key on mainnet can result in irreversible loss of funds. Use **Devnet/Testnet** for testing and deploy to Mainnet only **at your own risk** after full understanding. Always DYOR (Do Your Own Research).

---

## 🧠 What This Project Does

This is an **automated Solana trading bot** that:

- ✅ Listens to tweets from specific users (e.g., Elon Musk or Pump.fun creators).
- ✅ Detects **keywords** in real-time (like “launch” or “Solana”).
- ✅ Automatically swaps SOL to a meme coin using **Jupiter Aggregator API**.
- ✅ Logs transaction status and wallet balance.
- ✅ Designed for **automation**, **reaction-based trading**, and **future AI triggers**.

---

## 🔧 Features

- 🐦 Twitter Streaming using `twitter-api-v2`
- ⚡ Fast, real-time keyword detection
- 🤖 Swaps tokens using `Jupiter Aggregator` via Solana's Web3 API
- 💰 Fetches wallet balance and transaction logs
- 🔄 Simulate swaps on Devnet/Testnet before risking real SOL
- 📜 Modular utilities for wallet generation, token metadata, and config

---

## 📁 Folder Structure

```bash
CryptoTradingBot/
├── logs/                     # Logs for activity or errors
├── node_modules/             # Project dependencies
├── services/                 # (Reserved for future features)
├── utils/                    # Utility functions
│   ├── get_Token_info_fromMint.js
│   ├── get_user_ids.js       # Fetch Twitter user IDs
│   ├── getBalance.js         # Get SOL balance of a wallet
│   ├── getTokenSymbol.js     # Fetch token symbols using registry
│   ├── jupiter.js            # Jupiter Aggregator config
│   ├── jupiterTransaction.js # Builds swap transaction
│   ├── solana.js             # Solana connection setup
│   ├── swap.js               # Executes final swap transaction
│   ├── test_twitter.js       # Poll tweets manually every 30s
│   ├── tokenList.js          # Handles token metadata list
│   ├── tradeConfig.js        # Controls slippage, amount, default tokens
│   └── twitter.js            # Twitter stream core logic
├── .env                      # Store private key & API secrets (NOT COMMITTED)
├── convertBase58Key.js       # Convert raw private key to base58
├── generate_wallet.js        # Generate a fresh Solana wallet
├── index.js                  # Main bot entrypoint
├── simulateSwap.js           # Safely test swap on Devnet/Testnet
├── test_code.js              # Misc logic testing
├── package.json
├── package-lock.json
└── README.md


{
  "@solana/web3.js": "^1.88.2",
  "dotenv": "^16.3.1",
  "twitter-api-v2": "^1.18.6",
  "bs58": "^5.0.0",
  "axios": "^1.7.2"
}
```

 How To Run Locally

1. Clone the repo:
``` bash
git clone https://github.com/Charitra99/CryptoTradeBot.git
cd CryptoTradeBot
```
2. Install dependencies:
3.  Set up your .env file:
Create a .env file in the root with the following:

🔍 Sample Output
``` bash
📡 Starting tweet polling every 30 seconds...
ℹ️ Skipped (no keyword): "@SciGuySpace It’s time to retire the Space Station..."
🚨 Matched keyword in tweet from user 951329744804392960: "@grass banger, congrats on launch!"
💰 Balance: 0.29 SOL
✅ Swap complete! 1000000 X Token bought.
```
