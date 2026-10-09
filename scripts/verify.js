const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const network = await ethers.provider.getNetwork();
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  if (!contractAddress) {
    console.error("❌ Missing NEXT_PUBLIC_CONTRACT_ADDRESS in environment");
    process.exit(1);
  }

  console.log("========================================");
  console.log("Verifying GenesisNFT on Etherscan...");
  console.log("========================================\n");
  console.log("Network:", network.name, `(Chain ID: ${network.chainId})`);
  console.log("Contract Address:", contractAddress);

  // Read deployment info
  const deploymentFile = path.join(__dirname, `../deployments/${network.name}-deployment.json`);
  if (!fs.existsSync(deploymentFile)) {
    console.error("❌ Deployment file not found. Please deploy contract first.");
    process.exit(1);
  }

  const deploymentInfo = JSON.parse(fs.readFileSync(deploymentFile, "utf8"));
  const constructorArgs = deploymentInfo.constructorArgs;

  console.log("Constructor Args:", constructorArgs);
  console.log("\nVerifying contract...");

  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: constructorArgs,
    });

    console.log("\n✅ Contract verified successfully!");

    // Display explorer link
    let explorerUrl;
    if (network.chainId === 11155111) {
      explorerUrl = `https://sepolia.etherscan.io/address/${contractAddress}`;
    } else if (network.chainId === 1) {
      explorerUrl = `https://etherscan.io/address/${contractAddress}`;
    }

    if (explorerUrl) {
      console.log("\n📋 View verified contract on Etherscan:");
      console.log(explorerUrl);
    }
  } catch (error) {
    if (error.message.includes("Already Verified")) {
      console.log("✅ Contract is already verified.");
    } else {
      console.error("❌ Verification failed:", error.message);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
