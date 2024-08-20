# Crypto Wallet Generator Backend

This is the backend service for a cryptocurrency wallet generator supporting Ethereum and Solana.

## 🚀 Features

- Generate mnemonic phrases
- Create Ethereum and Solana wallets
- Generate multiple wallet addresses from a single mnemonic

## 🛠️ Technology Stack

- Node.js
- Express.js
- bip39
- ethereumjs-wallet
- @solana/web3.js
- ed25519-hd-key

## 📦 Installation

1. Clone the repository:

```
git clone https://github.com/kamrancodex/crypto-wallet-backend.git
```

```
cd crypto-wallet-backend
```

2. Install dependencies:

```
npm install
```

3. Start the server:

```
npm start
```

The server will start on `http://localhost:3001` by default.

## 🔧 Configuration

Create a `.env` file in the root directory and add:
PORT=3001
CopyAdjust the port number if needed.

## 📡 API Endpoints

- `POST /api/generate-mnemonic`: Generate a new mnemonic phrase
- `POST /api/create-wallets`: Create Ethereum and Solana wallets from a mnemonic
- `POST /api/generate-new-addresses`: Generate new addresses for existing wallets

## 🚀 Deployment

This backend can be deployed to platforms like Heroku, DigitalOcean, or AWS. Ensure you set up environment variables on your hosting platform.

## 🔒 Security Considerations

- This is for educational purposes. Implement additional security measures for production use.
- Secure all API endpoints and implement proper authentication.

## 📄 License

This project is [MIT](LICENSE) licensed.
