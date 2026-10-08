# NFT Project

A complete NFT starter project built with Next.js and Solidity.

## Stack

- React / Next.js
- Ethers.js
- Hardhat
- Solidity
- OpenZeppelin

## Features

- NFT landing page
- Collection gallery
- Wallet connection UI
- ERC-721 smart contract
- Local deployment scripts

## Setup

```bash
npm install
npm run dev
```

For contract deployment:

```bash
npx hardhat compile
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```
