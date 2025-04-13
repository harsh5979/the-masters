import React,{useState,useEffect} from "react";
import { NavLink } from "react-router-dom";
import { useAddress, useMetamask } from "@thirdweb-dev/react"; // Add this


import {User} from "lucide-react"
const Index = () => {
   const connectWithMetamask = useMetamask(); // Connect function
    const address = useAddress(); // Wallet Address
    const [showConnectPopup, setShowConnectPopup] = useState(false);
    const handleConnectWallet = async () => {
      try {
        await connectWithMetamask();
       
        setShowConnectPopup(false); // Hide popup after connecting
      } catch (err) {
        console.error("Wallet connection failed:", err);
      }
    };
  
    useEffect(() => {
      if (address) {
        // localStorage.setItem('walletConnected', "true");
        // setIsAddress(address); // Save address in your store
        setShowConnectPopup(false); // Hide popup if connected
      } else {
        setShowConnectPopup(true); // Show popup if not connected
      }
    }, [address]);
  return (

    <div className="h-screen w-screen text-black {bg-gradient-to-br from-blue-500 to-purple-600} flex items-center justify-center">
      {showConnectPopup && (
  <div className="fixed inset-0 z-10  bg-opacity-50 flex justify-center items-center min-h-screen w-screen">
    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
      <h2 className="text-xl font-bold mb-4">Connect Your Wallet</h2>
      <button
        onClick={handleConnectWallet}
        className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600"
      >
        Connect Metamask
      </button>
    </div>
  </div>
)}
     
    </div>
  );
};

export default Index;
