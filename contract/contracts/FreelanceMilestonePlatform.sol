// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract FreelanceMilestonePlatform {
    enum JobStatus { Open, InProgress, MilestoneSubmitted, Completed, Disputed }

    struct Job {
        address payable client;
        address payable freelancer;
        string description;
        uint totalAmount;
        uint amountPerMilestone;
        uint milestoneCount;
        uint currentMilestone;
        JobStatus status;
    }

    uint public jobCounter;
    mapping(uint => Job) public jobs;

    event JobPosted(uint jobId, address client, uint totalAmount);
    event JobAccepted(uint jobId, address freelancer);
    event MilestoneSubmitted(uint jobId, uint milestone);
    event MilestoneApproved(uint jobId, uint milestone, uint amountReleased);
    event JobCompleted(uint jobId);
    event DisputeRaised(uint jobId);

    modifier onlyClient(uint jobId) {
        require(msg.sender == jobs[jobId].client, "You are not the client of this job");
        _;
    }

    modifier onlyFreelancer(uint jobId) {
        require(msg.sender == jobs[jobId].freelancer, "You are not the freelancer of this job");
        _;
    }

    modifier jobInProgress(uint jobId) {
        require(jobs[jobId].status == JobStatus.InProgress, "Job is not in progress");
        _;
    }

    modifier jobNotCompleted(uint jobId) {
        require(jobs[jobId].status != JobStatus.Completed, "Job is already completed");
        _;
    }

    function postJob(string memory _description) external payable {
        require(msg.value > 0, "Must send full job payment upfront");

        jobs[jobCounter] = Job({
            client: payable(msg.sender),
            freelancer: payable(address(0)),
            description: _description,
            totalAmount: msg.value,
            amountPerMilestone: msg.value / 4,
            milestoneCount: 4,
            currentMilestone: 0,
            status: JobStatus.Open
        });

        emit JobPosted(jobCounter, msg.sender, msg.value);
        jobCounter++;
    }

    function acceptJob(uint _jobId) external jobNotCompleted(_jobId) {
        Job storage job = jobs[_jobId];
        require(job.freelancer == address(0), "Job already accepted");
        require(job.status == JobStatus.Open, "Job is not open");

        job.freelancer = payable(msg.sender);
        job.status = JobStatus.InProgress;

        emit JobAccepted(_jobId, msg.sender);
    }

    function submitMilestone(uint _jobId) external onlyFreelancer(_jobId) jobInProgress(_jobId) {
        Job storage job = jobs[_jobId];
        require(job.currentMilestone < job.milestoneCount, "All milestones already submitted");

        job.status = JobStatus.MilestoneSubmitted;

        emit MilestoneSubmitted(_jobId, job.currentMilestone);
    }

    function approveMilestone(uint _jobId) external onlyClient(_jobId) jobInProgress(_jobId) {
        Job storage job = jobs[_jobId];
        require(job.status == JobStatus.MilestoneSubmitted, "No milestone has been submitted");

        job.freelancer.transfer(job.amountPerMilestone);
        job.currentMilestone++;

        if (job.currentMilestone == job.milestoneCount) {
            job.status = JobStatus.Completed;
            emit JobCompleted(_jobId);
        } else {
            job.status = JobStatus.InProgress;
        }

        emit MilestoneApproved(_jobId, job.currentMilestone - 1, job.amountPerMilestone);
    }

    function raiseDispute(uint _jobId) external jobNotCompleted(_jobId) {
        Job storage job = jobs[_jobId];
        require(msg.sender == job.client || msg.sender == job.freelancer, "You must be involved in the job");

        job.status = JobStatus.Disputed;
        emit DisputeRaised(_jobId);
    }

    function getJob(uint _jobId) external view returns (
        address client,
        address freelancer,
        string memory description,
        uint totalAmount,
        uint amountPerMilestone,
        uint currentMilestone,
        JobStatus status
    ) {
        Job memory job = jobs[_jobId];
        return (
            job.client,
            job.freelancer,
            job.description,
            job.totalAmount,
            job.amountPerMilestone,
            job.currentMilestone,
            job.status
        );
    }

    // Just a simple ping method for testing purposes
    function ping() public pure returns (string memory) {
        return "pong";
    }
}
