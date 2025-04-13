import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Bitcoin, Feather as Ethereum, Blocks, Wallet, Users, Shield } from 'lucide-react';

const Home = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay: 0.2, ease: "easeInOut" },
    },
  };

  // Floating blockchain nodes animation
  const nodes = Array(6).fill(null);
  
  return (
    <div className="min-h-screen  w-full  bg-gradient-to-br from-blue-950 to-black text-white overflow-hidden">
      {/* Animated blockchain nodes */}
      {nodes.map((_, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            x: [index * 200, index * 200 + 50, index * 200],
            y: [index * 100, index * 100 + 30, index * 100],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: index * 0.5,
          }}
        >
          <Blocks className="w-16 h-16 text-yellow-500/20" />
        </motion.div>
      ))}

      <section className="relative min-h-[80vh]  mb-5 flex flex-col items-center justify-center px-4">
        <motion.div
          className="z-10 relative"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <Bitcoin className="w-12 h-12 text-yellow-400" />
            <Ethereum className="w-12 h-12 text-yellow-400" />
          </div>

          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text mb-4">
              Decentralized Freelancing
            </h1>
            <p className="text-2xl md:text-5xl font-light"
               style={{
                 WebkitTextStroke: "1px rgba(234, 179, 8, 0.3)",
                 WebkitTextFillColor: "transparent"
               }}>
              Powered by Blockchain Technology
            </p>
          </div>

          <motion.div 
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="bg-blue-900/20 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-6 text-center">
              <Wallet className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <h3 className="text-yellow-300 font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-300 text-sm">Smart contract escrow system</p>
            </div>
            <div className="bg-blue-900/20 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-6 text-center">
              <Users className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <h3 className="text-yellow-300 font-semibold mb-2">Verified Talent</h3>
              <p className="text-gray-300 text-sm">Blockchain-verified credentials</p>
            </div>
            <div className="bg-blue-900/20 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-6 text-center">
              <Shield className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <h3 className="text-yellow-300 font-semibold mb-2">Zero Trust</h3>
              <p className="text-gray-300 text-sm">Decentralized dispute resolution</p>
            </div>
          </motion.div>

          <motion.div 
            className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Link to="/join" className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl font-bold text-blue-900 hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 w-64 text-center">
              Connect Wallet ⚡
            </Link>
            <Link to="/jobs" className="px-8 py-4 border border-yellow-500/50 rounded-xl font-bold hover:bg-yellow-500/10 transition-all duration-300 w-64 text-center backdrop-blur-sm">
              Browse Jobs 🔍
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <motion.section
        className="py-20 px-4 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text">
            Trusted by Web3 Companies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['Ethereum', 'Polygon', 'Solana', 'Chainlink'].map((network) => (
              <div key={network} className="p-4 bg-blue-900/20 rounded-xl border border-yellow-500/20 backdrop-blur-sm">
                <p className="text-yellow-300 font-mono">{network}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;