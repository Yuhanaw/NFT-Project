# NFT-Project

A modern NFT starter project built with Next.js and Solidity. It includes a ready-to-deploy ERC-721 smart contract, a polished frontend gallery, and wallet connection flow for minting demo NFTs.

## Features

- ERC-721 smart contract with minting and base URI support
- Hardhat deployment setup
- Modern NFT landing page and collection gallery
- Wallet connection using MetaMask / injected wallet
- Responsive UI built with Next.js

## Tech Stack

- Next.js
- React
- Ethers.js
- Hardhat
- Solidity
- OpenZeppelin

## Project Structure

- `contracts/` - Smart contracts
- `scripts/` - Deployment scripts
- `pages/` - Frontend pages
- `components/` - Reusable UI components
- `styles/` - Global CSS styling

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Start frontend

```bash
npm run dev
```

Open http://localhost:3000

### 3. Compile contract

```bash
npx hardhat compile
```

### 4. Deploy contract locally

```bash
npx hardhat node
```

In another terminal:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

## Smart Contract

The project includes a simple NFT collection contract named `GenesisNFT` with:

- Name: `GenesisNFT`
- Symbol: `GNFT`
- Maximum supply: `1000`
- Owner-only mint function
- Token URI support

## Customize

Update the collection metadata and branding in:

- `pages/index.js`
- `styles/globals.css`
- `contracts/NFTCollection.sol`
- `scripts/deploy.js`

## License

This project is licensed under the MIT License.
