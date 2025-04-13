import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const JobModal = ({ job, isOpen, onClose, onInquire }) => {
  if (!job) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-blue-950/90 border border-yellow-800 p-6 rounded-xl shadow-xl z-50"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-bold text-yellow-300 mb-4">{job.title}</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-yellow-400 font-semibold mb-2">Description</h3>
                <p className="text-gray-300">{job.description}</p>
              </div>
              
              <div>
                <h3 className="text-yellow-400 font-semibold mb-2">Budget</h3>
                <p className="text-2xl font-bold text-white">₹{job.budget.toLocaleString()}</p>
              </div>
              
              <div>
                <h3 className="text-yellow-400 font-semibold mb-2">Posted On</h3>
                <p className="text-gray-300">
                  {new Date(job.createdAt).toLocaleDateString()}
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onInquire(job)}
                className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-900 text-white font-bold rounded-lg hover:from-yellow-500 hover:to-yellow-950 transition-all duration-200"
              >
                Send Inquiry
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default JobModal;