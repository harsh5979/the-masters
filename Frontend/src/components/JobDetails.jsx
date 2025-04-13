import React from 'react';
import { motion } from 'framer-motion';
import { Clock, DollarSign, Star, User, X } from 'lucide-react';

const JobDetails = ({ job, onClose, isFreelancer }) => {
  const participants = [
    { id: 1, name: 'Sarah Chen', rating: 4.9, proposal: 'Experienced smart contract developer...' },
    { id: 2, name: 'Mike Johnson', rating: 4.7, proposal: 'Blockchain specialist with 5 years...' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-blue-950/80 backdrop-blur-xl p-6 rounded-xl border border-yellow-500/20 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-yellow-500">{job.title}</h2>
          <p className="text-gray-300 mt-2">{job.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-yellow-500" />
            <span>Budget: {job.budget}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-yellow-500" />
            <span>Deadline: {job.deadline}</span>
          </div>
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-yellow-500" />
            <span>Status: {job.status}</span>
          </div>
        </div>

        {isFreelancer ? (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Submit Proposal</h3>
            <textarea
              className="w-full bg-blue-900/30 border border-yellow-500/20 rounded-lg px-4 py-2 text-white h-32"
              placeholder="Describe your experience and approach..."
            />
            <button className="mt-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold py-2 px-4 rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-colors">
              Submit Proposal
            </button>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-semibold mb-4">Proposals ({participants.length})</h3>
            <div className="space-y-4">
              {participants.map((participant) => (
                <div key={participant.id} className="bg-blue-900/30 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{participant.name}</h4>
                      <p className="text-gray-300 text-sm mt-1">{participant.proposal}</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span>{participant.rating}</span>
                    </div>
                  </div>
                  <button className="mt-4 bg-yellow-500/20 text-yellow-500 px-4 py-2 rounded-lg hover:bg-yellow-500/30 transition-colors">
                    Select Freelancer
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default JobDetails;