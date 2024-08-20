const express = require("express");
const router = express.Router();
const walletController = require("../controller/walletController");

router.get("/generate-mnemonic", walletController.generateMnemonic);
router.post("/create-wallets", walletController.createWallets);
router.get("/generate-new-addresses", walletController.generateNewAddresses);

module.exports = router;
