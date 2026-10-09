const fs = require("fs");
const path = require("path");

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_API_SECRET = process.env.PINATA_API_SECRET;
const TOTAL_NFTS = Number(process.env.TOTAL_NFTS || 10);

if (!PINATA_API_KEY || !PINATA_API_SECRET) {
  console.error("Missing PINATA_API_KEY or PINATA_API_SECRET. Add them to .env.local");
  process.exit(1);
}

const PINATA_JSON_URL = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

function generateMetadata(tokenId) {
  const traits = ["Founder", "OG", "Rare", "Common", "Legendary", "Mythic"];
  const selected = traits[tokenId % traits.length];

  return {
    name: `Genesis NFT #${String(tokenId).padStart(4, "0")}`,
    description: "Genesis NFT from the LUNAVERSE collection. Limited to 1,000 total mints and designed for early supporters.",
    image: `ipfs://QmYourCollectionCID/images/${tokenId}.png`,
    external_url: `https://lunaverse.com/nft/${tokenId}`,
    attributes: [
      { trait_type: "Rarity", value: selected },
      { trait_type: "Collection", value: "Genesis" },
      { trait_type: "Edition", value: "1 of 1,000" },
      { trait_type: "Network", value: "Ethereum" }
    ]
  };
}

async function uploadMetadataToPinata(metadata, name) {
  const response = await fetch(PINATA_JSON_URL, {
    method: "POST",
    headers: {
      pinata_api_key: PINATA_API_KEY,
      pinata_api_secret: PINATA_API_SECRET,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      pinataContent: metadata,
      pinataMetadata: { name }
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Pinata upload failed: ${response.status} ${text}`);
  }

  const data = await response.json();
  return `ipfs://${data.IpfsHash}`;
}

async function main() {
  console.log(`Uploading metadata for ${TOTAL_NFTS} NFTs...`);
  const result = {};

  for (let i = 0; i < TOTAL_NFTS; i++) {
    const metadata = generateMetadata(i);
    const uri = await uploadMetadataToPinata(metadata, `genesis-nft-${i}.json`);
    result[i] = uri;
    console.log(`Token ${i}: ${uri}`);
  }

  const outFile = path.join(__dirname, "../metadata-uris.json");
  fs.writeFileSync(outFile, JSON.stringify(result, null, 2));
  console.log(`Saved metadata URIs to ${outFile}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
