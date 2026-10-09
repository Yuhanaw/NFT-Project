const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const baseURI = process.env.BASE_URI || "ipfs://QmYourCollectionCID/";

  console.log("Deploying GenesisNFT contract...");
  console.log("Account address:", deployer.address);

  const GenesisNFT = await ethers.getContractFactory("GenesisNFT");
  const contract = await GenesisNFT.deploy(baseURI);

  await contract.waitForDeployment();

  const address = await contract.getAddress();

  console.log("\n✅ GenesisNFT deployed to:", address);
  console.log("Base URI:", baseURI);
  console.log("Deployer Address:", deployer.address);

  // Verify contract details
  const name = await contract.name();
  const symbol = await contract.symbol();
  const maxSupply = await contract.MAX_SUPPLY();
  const mintPrice = await contract.MINT_PRICE();

  console.log("\nContract Details:");
  console.log("- Name:", name);
  console.log("- Symbol:", symbol);
  console.log("- Max Supply:", maxSupply.toString());
  console.log("- Mint Price:", ethers.formatEther(mintPrice), "ETH");

  // Set default royalty (5%)
  const royaltyTx = await contract.setDefaultRoyalty(deployer.address, 500);
  await royaltyTx.wait();
  console.log("\n✅ Royalty set to 5% for", deployer.address);

  console.log("\n📝 Add this to your .env.local:");
  console.log(`NEXT_PUBLIC_CONTRACT_ADDRESS=${address}`);
  console.log(`NEXT_PUBLIC_CONTRACT_CHAIN_ID=${(await ethers.provider.getNetwork()).chainId}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
