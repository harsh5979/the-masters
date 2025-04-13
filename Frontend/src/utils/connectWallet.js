import { ethers } from "ethers";
import ContractABI from "../../hardhat/artifacts/contracts/FreelancePlatform.sol/FreelancePlatform.json";

const CONTRACT_ADDRESS = "your_contract_address_here"; // replace with actual address

export const getContract = () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, ContractABI.abi, signer);
};
