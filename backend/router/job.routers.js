const express = require('express');
const { createJob, getAllJobs, getJobsForUser, acceptJob, updateJobProgress, completeJob } = require('../controller/job.controller');
const { verifyToken } = require('../middleware/verifyToken');

const router = express.Router();

// Route to create a job (requires authentication and client role)
router.post('/create', verifyToken, createJob);

// Route to get all jobs (accessible by anyone, no authentication required)
router.get('/', getAllJobs);

// Route to get jobs for a specific user (Freelancer or Client)
router.get('/user', verifyToken, getJobsForUser);

// Route to accept a job (requires authentication and freelancer role)
router.put('/:jobId/accept', verifyToken, acceptJob);

// Route to update job progress (requires authentication and freelancer role)
router.put('/:jobId/progress', verifyToken, updateJobProgress);

// Route to mark job as completed (requires authentication and client/freelancer role)
router.put('/:jobId/complete', verifyToken, completeJob);

module.exports = router;
