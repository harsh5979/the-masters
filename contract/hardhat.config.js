require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.21",  
  networks: {
    gensyn: {
      url: "https://gensyn-testnet.g.alchemy.com/public", // Ensure this is the correct RPC URL for Gensyn
      chainId: 685685,
      accounts: ["b31c735614faf0abb1b0c7e77f67702598af9b9fa6c9d07f9e4f6c8287326551"]  // Replace with your private key
    }
  }
};