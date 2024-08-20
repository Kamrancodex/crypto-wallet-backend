const { Keypair } = require("@solana/web3.js");
const crypto = require("crypto");

try {
  const seed = crypto.randomBytes(32);
  const keypair = Keypair.fromSeed(seed);
  console.log("Public Key:", keypair.publicKey.toBase58());
  console.log("Private Key:", Buffer.from(keypair.secretKey).toString("hex"));
} catch (error) {
  console.error("Error:", error);
}
