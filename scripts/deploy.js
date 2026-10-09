const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const [deployer] = await ethers.getSigners();
  const baseURI = process.env.BASE_URI || "ipfs://QmYourCollectionCID/";
  const network = await ethers.provider.getNetwork();

  console.log("========================================");
  console.log("Deploying GenesisNFT contract...");
  console.log("========================================\n");
  console.log("Network:", network.name, `(Chain ID: ${network.chainId})`);
  console.log("Deployer Address:", deployer.address);
  console.log("Base URI:", baseURI);

  // Check balance
  const balance = await ethers.provider.getBalance(deployer.address);
  const balanceInEth = ethers.formatEther(balance);
  console.log("Wallet Balance:", balanceInEth, "ETH\n");

  if (balance === 0n) {
    console.error("❌ Error: Wallet has no ETH. Please fund your wallet before deploying.");
    process.exit(1);
  }

  const GenesisNFT = await ethers.getContractFactory("GenesisNFT");
  
  console.log("Deploying contract...");
  const contract = await GenesisNFT.deploy(baseURI);

  console.log("Waiting for deployment confirmation...");
  await contract.waitForDeployment();

  const address = await contract.getAddress();

  console.log("\n✅ GenesisNFT deployed successfully!");
  console.log("\n========================================");
  console.log("Contract Address:", address);
  console.log("========================================\n");

  // Verify contract details
  const name = await contract.name();
  const symbol = await contract.symbol();
  const maxSupply = await contract.MAX_SUPPLY();
  const mintPrice = await contract.MINT_PRICE();
  const owner = await contract.owner();

  console.log("Contract Details:");
  console.log("- Name:", name);
  console.log("- Symbol:", symbol);
  console.log("- Max Supply:", maxSupply.toString());
  console.log("- Mint Price:", ethers.formatEther(mintPrice), "ETH");
  console.log("- Owner:", owner);

  // Set default royalty (5%)
  console.log("\nSetting royalty to 5%...");
  const royaltyTx = await contract.setDefaultRoyalty(deployer.address, 500);
  await royaltyTx.wait();
  console.log("✅ Royalty set to 5% for", deployer.address);

  // Save deployment info
  const deploymentInfo = {
    network: network.name,
    chainId: network.chainId,
    contractAddress: address,
    deployerAddress: deployer.address,
    deploymentBlock: await ethers.provider.getBlockNumber(),
    deploymentDate: new Date().toISOString(),
    baseURI: baseURI,
    constructorArgs: [baseURI],
  };

  const deploymentFile = path.join(__dirname, `../deployments/${network.name}-deployment.json`);
  const deploymentDir = path.dirname(deploymentFile);

  if (!fs.existsSync(deploymentDir)) {
    fs.mkdirSync(deploymentDir, { recursive: true });
  }

  fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));
  console.log("\n✅ Deployment info saved to:", deploymentFile);

  // Display explorer link
  let explorerUrl;
  if (network.chainId === 11155111) {
    explorerUrl = `https://sepolia.etherscan.io/address/${address}`;
  } else if (network.chainId === 1) {
    explorerUrl = `https://etherscan.io/address/${address}`;
  }

  console.log("\n📋 View on Explorer:");
  if (explorerUrl) {
    console.log(explorerUrl);
  }

  console.log("\n📝 Environment Variables to Add:");
  console.log(`NEXT_PUBLIC_CONTRACT_ADDRESS=${address}`);
  console.log(`NEXT_PUBLIC_CONTRACT_CHAIN_ID=${network.chainId}`);

  if (network.chainId === 11155111) {
    console.log("\n🔍 To verify contract on Etherscan, run:");
    console.log(`npx hardhat verify --network sepolia ${address} "${baseURI}"`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
