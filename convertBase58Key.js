/////////////

// here we are converting our private wallet key into 64-byte Uint8Array from b58 provided 

//////////

const bs58 = require('bs58').default;

// 🔐 Replace this with your Phantom exported private key (Base58 format)
const base58PrivateKey = 'you org. private key';

try {
    const decoded = bs58.decode(base58PrivateKey);
    console.log(`[${decoded.toString()}]`);
} catch (e) {
    console.error("❌ Error decoding key:", e.message);
}
