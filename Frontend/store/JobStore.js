import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

const url = import.meta.env.VITE_API_URL;

axios.defaults.withCredentials = true;

export const useJobStore = create((set, get) => ({
    jobs: [],
    job: null,
    isLoading: false,
    error: null,

    // Fetch all jobs
      getAllJobsUser: async () => {
    try {
      const res = await axios.get(`${url}/jobs/user`);
      if (res.data.success) {
        set({ jobs: res.data.jobs });
        return res.data.jobs;
      } else {
        throw new Error(res.data.message);
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
      throw err;
    }
  },

    getAllJobs: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(`${url}/jobs`);
            set({ jobs: response.data.jobs, isLoading: false });
            return response.data.jobs;
        } catch (error) {
            set({ error: error.response?.data?.message || 'Error fetching jobs', isLoading: false });
            toast.error(error.response?.data?.message || 'Error fetching jobs');
        }
    },

    // Create a new job
    createJob: async (data) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${url}/jobs/create`, data);
            toast.success(response.data.message);
            set({ job: response.data.job, isLoading: false });
            return response.data.job; 
        } catch (error) {
            set({ error: error.response?.data?.message || 'Error creating job', isLoading: false });
            toast.error(error.response?.data?.message || 'Error creating job');
        }
    },

    // Accept a job as a freelancer
    acceptJob: async (jobId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${url}/jobs/accept/${jobId}`);
            toast.success(response.data.message);
            set({ job: response.data.job, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || 'Error accepting job', isLoading: false });
            toast.error(error.response?.data?.message || 'Error accepting job');
        }
    },

    // Update the job progress (freelancer updates their progress)
    updateJobProgress: async (jobId, progress) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.put(`${url}/jobs/progress/${jobId}`, { progress });
            toast.success(response.data.message);
            set({ job: response.data.job, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || 'Error updating progress', isLoading: false });
            toast.error(error.response?.data?.message || 'Error updating progress');
        }
    },

    // Mark job as completed
    completeJob: async (jobId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${url}/jobs/complete/${jobId}`);
            toast.success(response.data.message);
            set({ job: response.data.job, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || 'Error completing job', isLoading: false });
            toast.error(error.response?.data?.message || 'Error completing job');
        }
    },

    // Clear any error
    clearError: () => set({ error: null }),
}));
