// FreelancerDashboard.jsx

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Briefcase, DollarSign, Star, Award, Search, MessageCircle } from 'lucide-react';
import { useJobStore } from '../../store/JobStore';
import JobDetails from '../components/JobDetails';
import toast from 'react-hot-toast';

const FreelancerDashboard = () => {
  const [view, setView] = useState('active');
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { getAllJobs, getAllJobsUser } = useJobStore();

  const { data: jobs = [], isLoading, error } = useQuery({
    queryKey: ['jobs'],
    queryFn: getAllJobs,
  });

  const { data: activeJobs = [], isLoading: loadingActive } = useQuery({
    queryKey: ['activeJobs'],
    queryFn: getAllJobsUser,
  });

  const availableJobs = jobs?.filter(job =>
    job.status === 'Open' &&
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmitJob = (jobId) => {
    toast.success(`Submit functionality coming soon for Job ID: ${jobId}`);
    // Backend integration for submission
  };

  const handleSendMessage = (clientName) => {
    toast.success(`Messaging ${clientName || 'Client'} feature coming soon!`);
    // Optional: Open message modal or navigate to chat
  };

  const totalEarnings = activeJobs?.reduce((acc, job) => acc + (job.payment || 0), 0);

  if (isLoading || loadingActive) return <div className="text-center text-yellow-500">Loading jobs...</div>;
  if (error) return <div className="text-center text-red-500">Error fetching jobs</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-yellow-500 mb-6">🎯 Freelancer Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { Icon: Briefcase, label: 'Active Jobs', value: activeJobs?.length },
          { Icon: DollarSign, label: 'Earnings', value: `~ ${totalEarnings} ETH` },
          { Icon: Star, label: 'Rating', value: '4.9' },
          { Icon: Award, label: 'Reputation Score', value: '850' },
        ].map(({ Icon, label, value }, idx) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-blue-950/45 p-6 rounded-xl border border-yellow-500/20"
          >
            <Icon className="h-8 w-8 text-yellow-500 mb-4" />
            <h3 className="text-lg font-semibold">{label}</h3>
            <p className="text-2xl font-bold text-yellow-500">{value}</p>
          </motion.div>
        ))}
      </div>

      {/* View Toggle */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        {['active', 'available'].map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded-lg transition-colors ${
              view === type
                ? 'bg-yellow-500 text-blue-950'
                : 'bg-blue-900/30 text-yellow-500 hover:bg-blue-900/40'
            }`}
            onClick={() => setView(type)}
          >
            {type === 'active' ? 'Active Jobs' : 'Available Jobs'}
          </button>
        ))}

        {view === 'available' && (
          <div className="flex items-center space-x-2 ml-auto bg-blue-900/30 px-3 py-2 rounded-lg">
            <Search className="h-4 w-4 text-yellow-500" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none text-yellow-100 placeholder-yellow-500 text-sm w-48"
            />
          </div>
        )}
      </div>

      {/* Job Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-blue-950/45 rounded-xl border border-yellow-500/20"
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-yellow-500">
            {view === 'active' ? 'Your Active Jobs' : 'Available Jobs'}
          </h2>

          <div className="space-y-6">
            {(view === 'active' ? activeJobs : availableJobs)?.map((job) => (
              <div
                key={job._id}
                className="bg-blue-900/30 p-6 rounded-lg cursor-pointer hover:bg-blue-900/40 transition-colors"
                onClick={() => setSelectedJob(job)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-yellow-500">{job.title}</h3>
                    <p className="text-gray-300 mt-2">
                      {view === 'active' ? `Client: ${job.client?.name || job.client}` : job.description}
                    </p>
                    <div className="mt-4 flex items-center space-x-4">
                      <span className="text-sm bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full">
                        {job.status}
                      </span>
                      <span className="text-sm text-gray-300">Payment: {job.payment} ETH</span>
                    </div>

                    {view === 'active' && (
                      <div className="mt-4 flex gap-3 flex-wrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSubmitJob(job._id);
                          }}
                          className="bg-yellow-500 text-blue-950 px-4 py-2 rounded-md font-medium hover:bg-yellow-400 transition"
                        >
                          Submit Work
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSendMessage(job.client?.name);
                          }}
                          className="flex items-center gap-2 border border-yellow-500 text-yellow-500 px-4 py-2 rounded-md hover:bg-yellow-500 hover:text-blue-950 transition"
                        >
                          <MessageCircle className="h-4 w-4" />
                          Message Client
                        </button>
                      </div>
                    )}
                  </div>

                  {view === 'active' && (
                    <div className="text-right">
                      <p className="text-sm text-gray-300">Deadline</p>
                      <p className="font-semibold">{job.deadline}</p>
                      <div className="mt-2">
                        <div className="w-32 h-2 bg-blue-900 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-500"
                            style={{ width: `${job.completionPercentage || 0}%` }}
                          />
                        </div>
                        <p className="text-sm mt-1">{job.completionPercentage || 0}% Complete</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Job Modal */}
      {selectedJob && (
        <JobDetails
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          isFreelancer={true}
        />
      )}
    </div>
  );
};

export default FreelancerDashboard;
