import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useJobStore } from '../../store/JobStore';
import toast from 'react-hot-toast';


const CreateJob = ({ onClose }) => {
  const queryClient = useQueryClient(); 
  const {createJob} =useJobStore()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    deadline: '',
    skills: []
  });
  const createJobMutation = useMutation({
    mutationFn: async (data) => await createJob(data),
    onSuccess: () => {
      queryClient.invalidateQueries( ['jobs'] ); 
      onClose()
    },
    onError: (error) => {
      console.error('Job creation failed:', error);
    }
  });



  const handleSubmit = async (e) => {
    e.preventDefault();
    createJobMutation.mutate(formData);


    // try {
    //   const response = await axios.post(`${import.meta.env.VITE_API_URL}/job/create`, formData);
    //   console.log('Job created successfully:', response.data);
    //   onClose(); // Close the modal only if submission is successful
    // } catch (error) {
    //   console.error('Error creating job:', error.response?.data || error.message);
    // }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-blue-950/80 backdrop-blur-xl p-6 rounded-xl border border-yellow-500/20 w-full max-w-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold mb-6">Create New Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Project Title</label>
            <input
              type="text"
              className="w-full bg-blue-900/30 border border-yellow-500/20 rounded-lg px-4 py-2 text-white"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              className="w-full bg-blue-900/30 border border-yellow-500/20 rounded-lg px-4 py-2 text-white h-32"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Budget (ETH)</label>
              <input
                type="number"
                step="0.1"
                className="w-full bg-blue-900/30 border border-yellow-500/20 rounded-lg px-4 py-2 text-white"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Deadline</label>
              <input
                type="date"
                className="w-full bg-blue-900/30 border border-yellow-500/20 rounded-lg px-4 py-2 text-white"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Required Skills</label>
            <input
              type="text"
              className="w-full bg-blue-900/30 border border-yellow-500/20 rounded-lg px-4 py-2 text-white"
              placeholder="Enter skills (comma separated)"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  const skills = e.target.value.split(',').map(skill => skill.trim());
                  setFormData({ ...formData, skills: [...formData.skills, ...skills] });
                  e.target.value = '';
                }
              }}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold py-2 px-4 rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-colors"
          >
            Create Project
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default CreateJob;
