const mongoose = require('mongoose');

// Define the Job Schema
const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  budget: {
    type: Number,
    required: true
  },
  deadline: {
    type: Date,
    required: true
  },
  skills: [{
    type: String
  }],
  
  // Reference to the Client (User)
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Reference to the Freelancer (User) who got approved and is working on the job
  takenBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },

  // Status of the job
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Review', 'Completed'],
    default: 'Open'
  },

  // Job's progress in %
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },

  // ✅ Freelancer requests for the job
  requests: [{
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    }
  }],

  // Blockchain-related fields (optional)
  blockchainContractAddress: {
    type: String,
    default: null
  },
  transactionHash: {
    type: String,
    default: null
  }

}, { timestamps: true });

// Export the Job model
module.exports = mongoose.model('Job', jobSchema);
