import Job from '../model/Job.model.js';
import User from '../model/User.model.js'; // Assuming you are using the User model for role validation

// Create a new job posting (Client creates a job)
export const createJob = async (req, res) => {
  try {
    const { title, description, budget, deadline, skills } = req.body;

    // Ensure the logged-in user is a 'Client'
    const user = await User.findById(req.userId);
    if (!user || user.profile.role !== 'Client') {
      return res.status(403).json({ success: false, message: 'Only clients can create jobs.' });
    }

    // Create a new job
    const job = new Job({
      title,
      description,
      budget,
      deadline,
      skills,
      createdBy: user._id, // Link the job to the client's user ID
    });

    // Save the job to the database
    await job.save();

    res.status(201).json({ success: true, message: 'Job created successfully', job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Get all jobs (for clients and freelancers to view)
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    console.log(jobs); // Log all jobs for debugging
    res.status(200).json({ success: true, jobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Get all jobs for a specific user (based on their role: Freelancer or Client)
export const getJobsForUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId); // Get the user from their ID (passed in the request)

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // If the user is a Client, fetch jobs they created
    if (user.profile.role === 'Client') {
      const jobs = await Job.find({ createdBy: user._id }).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, jobs });
    }

    // If the user is a Freelancer, fetch jobs that are open or in progress and assigned to them
    if (user.profile.role === 'Freelancer') {
      const jobs = await Job.find({ $or: [{ takenBy: user._id }, { status: 'Open' }] }).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, jobs });
    }

    res.status(400).json({ success: false, message: 'Invalid user role' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Freelancer accepts a job
export const acceptJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Find the job
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Ensure the user is a freelancer
    const user = await User.findById(req.userId);
    if (!user || user.profile.role !== 'Freelancer') {
      return res.status(403).json({ success: false, message: 'Only freelancers can accept jobs' });
    }

    // Ensure the job is still open
    if (job.status !== 'Open') {
      return res.status(400).json({ success: false, message: 'Job is no longer available' });
    }

    // Assign the job to the freelancer
    job.takenBy = user._id;
    job.status = 'In Progress'; // Change the status of the job
    await job.save();

    res.status(200).json({ success: true, message: 'Job accepted successfully', job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Update job progress (e.g., from Freelancer)
export const updateJobProgress = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { progress } = req.body;

    // Validate the progress value
    if (progress < 0 || progress > 100) {
      return res.status(400).json({ success: false, message: 'Progress must be between 0 and 100' });
    }

    // Find the job and ensure it is taken by the freelancer
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    if (job.takenBy.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'You are not assigned to this job' });
    }

    // Update the job progress
    job.progress = progress;
    await job.save();

    res.status(200).json({ success: true, message: 'Job progress updated successfully', job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Mark job as completed (for Freelancer or Client)
export const completeJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Find the job
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Ensure the user is the Client or Freelancer assigned to the job
    const user = await User.findById(req.userId);
    if (!user || (user.profile.role !== 'Client' && user.profile.role !== 'Freelancer')) {
      return res.status(403).json({ success: false, message: 'Only the client or freelancer can mark the job as completed' });
    }

    // Mark the job as completed
    job.status = 'Completed';
    await job.save();

    res.status(200).json({ success: true, message: 'Job marked as completed', job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
