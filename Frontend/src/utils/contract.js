import { ethers } from "ethers";
import contractABI from "../../../contract/artifacts/contracts/FreelanceMilestonePlatform.sol/FreelanceMilestonePlatform.json";
// const contract = await getContract(); // <-- this line fails if not imported

// Replace with your deployed contract address
const contractAddress = "0xDE09a66e20939C06C867C820550391860767122A";

export const getContract = async () => {
  if (!window.ethereum) throw new Error("No crypto wallet found");

  const provider = new ethers.BrowserProvider(window.ethereum); // For ethers v6
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI.abi, signer);

  return contract;
};
