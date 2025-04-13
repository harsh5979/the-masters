import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Wallet, Link as ChainLink, Bitcoin, Shield } from 'lucide-react';
import { useForm } from 'react-hook-form';

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    alert('Message sent successfully!');
    reset();
  };

  // Animated chain background
  const chainElements = Array(5).fill(null);

  return (
    <div className="min-h-screen w-full p-4 bg-gradient-to-br from-blue-950 to-black text-white overflow-hidden relative">
      {/* Animated chain background */}
      {chainElements.map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0.1, x: -100 }}
          animate={{ 
            opacity: [0.1, 0.2, 0.1],
            x: [index * 100 - 100, index * 100],
            y: [index * 50, index * 50 + 20, index * 50]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            delay: index * 0.5
          }}
          className="absolute"
        >
          <ChainLink className="w-20 h-20 text-yellow-500/10 transform rotate-45" />
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto relative"
      >
        <div className="flex items-center justify-center gap-3 mb-8">
          <Bitcoin className="w-10 h-10 text-yellow-400" />
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-yellow-400 to-yellow-900 text-transparent bg-clip-text">
            Connect to Our Blockchain Network
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-blue-900/30 border border-yellow-800 p-6 rounded-xl backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <Shield className="text-yellow-400 w-6 h-6" />
              <h2 className="text-2xl font-bold text-yellow-300">Secure Communication</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-3 bg-blue-900/20 rounded-lg border border-yellow-800/50">
                <Mail className="text-yellow-400 w-6 h-6" />
                <div>
                  <p className="text-gray-300">Email</p>
                  <p className="text-white">blockchain@inno.com</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-3 bg-blue-900/20 rounded-lg border border-yellow-800/50">
                <Wallet className="text-yellow-400 w-6 h-6" />
                <div>
                  <p className="text-gray-300">Public Address</p>
                  <p className="text-white font-mono text-sm">0x1234...5678</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-3 bg-blue-900/20 rounded-lg border border-yellow-800/50">
                <MapPin className="text-yellow-400 w-6 h-6" />
                <div>
                  <p className="text-gray-300">Network</p>
                  <p className="text-white">Ethereum Mainnet</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-400/10 rounded-lg border border-yellow-400/20">
              <p className="text-sm text-yellow-200">
                All communications are encrypted and stored on our secure blockchain network
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-blue-900/30 border border-yellow-800 p-6 rounded-xl backdrop-blur-sm"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  {...register("name", { required: "Name is required" })}
                  className="w-full px-4 py-3 rounded-lg bg-blue-900/30 border border-yellow-500 placeholder-yellow-200/50 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  className="w-full px-4 py-3 rounded-lg bg-blue-900/30 border border-yellow-500 placeholder-yellow-200/50 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Wallet Address (Optional)"
                  {...register("wallet")}
                  className="w-full px-4 py-3 rounded-lg bg-blue-900/30 border border-yellow-500 placeholder-yellow-200/50 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 font-mono"
                />
              </div>

              <div>
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  {...register("message", { required: "Message is required" })}
                  className="w-full px-4 py-3 rounded-lg bg-blue-900/30 border border-yellow-500 placeholder-yellow-200/50 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full px-6 py-4 bg-gradient-to-r from-yellow-400 to-yellow-900 text-white font-bold rounded-lg hover:from-yellow-500 hover:to-yellow-950 transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                Submit to Blockchain
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;