# IPFS Metadata Setup Guide

## Overview
This project can upload NFT metadata to IPFS using Pinata.

## 1. Create a Pinata account
- Go to https://pinata.cloud
- Create an account and generate an API key
- Copy the API key and secret

## 2. Add environment variables
Create a `.env.local` file with:

```bash
PINATA_API_KEY=your_api_key
PINATA_API_SECRET=your_api_secret
TOTAL_NFTS=10
```

## 3. Upload metadata
Run:

```bash
npm run upload-metadata
```

This will upload metadata JSON files to Pinata and save them in `metadata-uris.json`.

## 4. Set the base URI on the contract
After upload, use the resulting IPFS prefix and set it on your deployed contract:

```javascript
await contract.setBaseURI("ipfs://QmYourCollectionCID/");
```

## 5. Token metadata example
Each NFT metadata file should look like:

```json
{
  "name": "Genesis NFT #0001",
  "description": "Genesis NFT from the LUNAVERSE collection.",
  "image": "ipfs://QmYourCollectionCID/images/1.png",
  "external_url": "https://lunaverse.com/nft/1",
  "attributes": [
    { "trait_type": "Rarity", "value": "Rare" },
    { "trait_type": "Collection", "value": "Genesis" }
  ]
}
```

## Notes
- Keep images in a consistent folder structure.
- Use a real IPFS image CID and stable asset naming for production.
- IPFS metadata works well with OpenSea-style NFT collections.
