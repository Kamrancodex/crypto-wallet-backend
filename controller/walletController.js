const { generateMnemonic, mnemonicToSeedSync } = require("bip39");
const { hdkey } = require("ethereumjs-wallet");
const { Keypair } = require("@solana/web3.js");
const { derivePath } = require("ed25519-hd-key");

// Store wallets in memory (replace with database in production)
let ethHdWallet, solHdWallet, mnemonic;
let currentEthIndex = 0,
  currentSolIndex = 0;

exports.generateMnemonic = (req, res) => {
  try {
    mnemonic = generateMnemonic();
    res.status(200).json({ mnemonic });
  } catch (error) {
    console.error("Error generating mnemonic:", error);
    res.status(500).send("Error generating mnemonic");
  }
};

exports.createWallets = (req, res) => {
  try {
    const { mnemonic: providedMnemonic } = req.body;
    if (!providedMnemonic) {
      return res.status(400).send("Mnemonic is required");
    }

    mnemonic = providedMnemonic;
    const seed = mnemonicToSeedSync(mnemonic);

    // Ethereum Wallet
    ethHdWallet = hdkey.fromMasterSeed(seed);
    const ethWallet = ethHdWallet.derivePath(`m/44'/60'/0'/0/0`).getWallet();
    const ethAddress = ethWallet.getAddressString();
    const ethPrivateKey = ethWallet.getPrivateKeyString();

    // Solana Wallet
    const solanaSeed = derivePath(`m/44'/501'/0'/0'`, seed.toString("hex")).key;
    solHdWallet = Keypair.fromSeed(solanaSeed);
    const solAddress = solHdWallet.publicKey.toBase58();
    const solPrivateKey = Buffer.from(solHdWallet.secretKey).toString("hex");

    res.status(200).json({
      ethereum: { address: ethAddress, privateKey: ethPrivateKey },
      solana: { address: solAddress, privateKey: solPrivateKey },
    });
  } catch (error) {
    console.error("Error creating wallets:", error);
    res.status(500).send("Error creating wallets");
  }
};

exports.generateNewAddresses = (req, res) => {
  try {
    if (!ethHdWallet || !solHdWallet || !mnemonic) {
      return res
        .status(400)
        .send("Wallets not initialized. Create wallets first.");
    }

    // Generate new Ethereum address
    currentEthIndex++;
    const newEthWallet = ethHdWallet
      .derivePath(`m/44'/60'/0'/0/${currentEthIndex}`)
      .getWallet();
    const newEthAddress = newEthWallet.getAddressString();
    const ethPrivateKey = newEthWallet.getPrivateKeyString();

    // Generate new Solana address
    currentSolIndex++;
    const seed = mnemonicToSeedSync(mnemonic);
    const solanaSeed = derivePath(
      `m/44'/501'/0'/${currentSolIndex}'`,
      seed.toString("hex")
    ).key;
    const newSolWallet = Keypair.fromSeed(solanaSeed);
    const newSolAddress = newSolWallet.publicKey.toBase58();
    const solPrivateKey = Buffer.from(newSolWallet.secretKey).toString("hex");

    res.status(200).json({
      ethereum: { address: newEthAddress, privateKey: ethPrivateKey },
      solana: { address: newSolAddress, privateKey: solPrivateKey },
    });
  } catch (error) {
    console.error("Error generating new addresses:", error);
    res.status(500).send("Error generating new addresses");
  }
};
