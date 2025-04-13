const hre = require("hardhat");

async function main() {
  // Get contract factory
  const FreelancePlatform = await hre.ethers.getContractFactory("FreelanceMilestonePlatform");

  // Deploy contract
  const contract = await FreelancePlatform.deploy(); 

  // Wait for deployment completion (using .deployed() in Ethers.js v6)
  await contract.deployed(); 

  console.log("Contract deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
