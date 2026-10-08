const { ethers } = require("hardhat");

async function main() {
  const baseURI = "ipfs://QmYourCollectionCID/";

  const GenesisNFT = await ethers.getContractFactory("GenesisNFT");
  const contract = await GenesisNFT.deploy(baseURI);

  await contract.waitForDeployment();

  const address = await contract.getAddress();

  console.log("GenesisNFT deployed to:", address);
  console.log("Base URI:", baseURI);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
