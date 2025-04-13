import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useJobStore } from '../../store/jobStore';
import { Loader } from 'lucide-react';
import JobModal from '../components/JobModel';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const { getAllJobs } = useJobStore();

  const {
    data: jobs = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['all-jobs'],
    queryFn: getAllJobs,
  });

  const filteredJobs = jobs?.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInquiry = (job) => {
    // Handle inquiry logic here
    console.log('Sending inquiry for job:', job);
    alert('Inquiry sent successfully!');
    setSelectedJob(null);
  };

  return (
    <div className="min-h-screen w-full p-4 bg-gradient-to-br from-blue-950 to-black text-white overflow-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-yellow-400 to-yellow-900 text-transparent bg-clip-text mb-8">
          Find All Jobs
        </h1>

        <div className="flex items-center justify-between mb-6 gap-3">
          <input
            type="text"
            placeholder="Search job title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-blue-900/30 border border-yellow-500 placeholder-yellow-200 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            onClick={() => refetch()}
            className="ml-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-800 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-900 transition-all"
          >
            Refresh
          </button>
        </div>

        {isLoading && (
          <div className="flex justify-center py-10">
            <Loader className="w-6 h-6 animate-spin text-yellow-500" />
          </div>
        )}

        {isError && (
          <p className="text-red-500 text-center py-5 font-semibold">
            {error?.message || 'Error fetching jobs'}
          </p>
        )}

        {!isLoading && filteredJobs?.length === 0 && (
          <p className="text-yellow-400 text-center mt-10 text-lg">No jobs found.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 overflow-auto">
          {filteredJobs?.map((job) => (
            <motion.div
              key={job._id}
              whileHover={{ scale: 1.02 }}
              className="bg-blue-900/30 border border-yellow-800 p-5 rounded-xl shadow-md cursor-pointer"
              onClick={() => setSelectedJob(job)}
            >
              <h2 className="text-xl font-bold text-yellow-300">{job.title}</h2>
              <p className="text-sm mt-1 text-gray-300 line-clamp-2">{job.description}</p>
              <div className="mt-2 text-sm text-yellow-400">
                Budget: ₹{job.budget.toLocaleString()}
              </div>
              <div className="mt-1 text-xs text-gray-400">
                Posted on: {new Date(job.createdAt).toLocaleDateString()}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <JobModal
        job={selectedJob}
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        onInquire={handleInquiry}
      />
    </div>
  );
}

export default App;