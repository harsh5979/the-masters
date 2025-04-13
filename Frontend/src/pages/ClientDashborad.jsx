import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Users, Star, Clock, Plus } from 'lucide-react';
import CreateJob from '../components/CreateJob';
import JobDetails from '../components/JobDetails';
import axios from "axios";
import { useJobStore } from '../../store/JobStore';
import { useQuery } from '@tanstack/react-query';


const ClientDashboard = () => {
  const { getAllJobs } = useJobStore()
  const [showCreateJob, setShowCreateJob] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);



  const { data: projects = [], isLoading, isError } = useQuery({
    queryKey: ['jobs'],
    queryFn: getAllJobs,
  });
  console.log(projects)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Client Dashboard</h1>
        <button
          onClick={() => setShowCreateJob(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Create Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-950/45 backdrop-blur-xl p-6 rounded-xl border border-yellow-500/20"
        >
          <FileText className="h-8 w-8 text-yellow-500 mb-4" />
          <h3 className="text-lg font-semibold">Active Projects</h3>
          <p className="text-2xl font-bold text-yellow-500">4</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-blue-950/45 backdrop-blur-xl p-6 rounded-xl border border-yellow-500/20"
        >
          <Users className="h-8 w-8 text-yellow-500 mb-4" />
          <h3 className="text-lg font-semibold">Hired Freelancers</h3>
          <p className="text-2xl font-bold text-yellow-500">7</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-blue-950/45 backdrop-blur-xl p-6 rounded-xl border border-yellow-500/20"
        >
          <Star className="h-8 w-8 text-yellow-500 mb-4" />
          <h3 className="text-lg font-semibold">Average Rating</h3>
          <p className="text-2xl font-bold text-yellow-500">4.8</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-blue-950/45 backdrop-blur-xl p-6 rounded-xl border border-yellow-500/20"
        >
          <Clock className="h-8 w-8 text-yellow-500 mb-4" />
          <h3 className="text-lg font-semibold">Completion Rate</h3>
          <p className="text-2xl font-bold text-yellow-500">95%</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-blue-950/45 backdrop-blur-xl rounded-xl border border-yellow-500/20 overflow-hidden"
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Your Projects</h2>
          <div className="space-y-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-blue-900/30 p-6 rounded-lg cursor-pointer hover:bg-blue-900/40 transition-colors"
                onClick={() => setSelectedJob(project)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-yellow-500">{project.title}</h3>
                    <p className="text-gray-300 mt-2">{project.description}</p>
                    <div className="mt-4 flex items-center space-x-4">
                      <span className="text-sm bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full">
                        {project.status}
                      </span>
                      <span className="text-sm text-gray-300">Budget: {project.budget}</span>
                    </div>
                  </div>
                  {project.freelancer && (
                    <div className="text-right">
                      <p className="text-sm text-gray-300">Freelancer</p>
                      <p className="font-semibold">{project.freelancer}</p>
                      <div className="flex items-center mt-2 justify-end">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span>{project.rating}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {showCreateJob && <CreateJob onClose={() => setShowCreateJob(false)} />}
      {selectedJob && (
        <JobDetails
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          isFreelancer={false}
        />
      )}
    </div>
  );
};

export default ClientDashboard;