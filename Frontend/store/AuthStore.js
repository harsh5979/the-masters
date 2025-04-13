import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import toast from 'react-hot-toast';

const url = import.meta.env.VITE_API_URL;

axios.defaults.withCredentials = true;

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      error: null,
      isRole: null,
      isAuthenticated: false,
      isLoading: false,
      isCheckingAuth: true,
      isEmail: localStorage.getItem('e') || null,
      isVerified: false,
      isStatus: false,
      isAddress: null,
      isprofileCompleted: false,
      isWalletConnected: localStorage.getItem('walletConnected') === "true",

      setIsWalletConnected: (value) => {
        set({ isWalletConnected: value, isLoading: true });
        try {
          if (value) {
            localStorage.setItem('walletConnected', "true");
          } else {
            localStorage.removeItem('walletConnected');
          }
          set({ isLoading: false, error: null });
        } catch (error) {
          set({ isLoading: false, error: error.message });
        }
      },

      setIsAddress: (value) => set({ isAddress: value }),

      signup: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${url}/users/register`, data);
          toast.success(response.data.message);
          set({
            user: response.data.user,
            isEmail: response.data.user?.email,
            isAuthenticated: true,
            error: null,
            isLoading: false,
          });
          localStorage.setItem('e', response.data.user?.email);
        } catch (error) {
          set({
            error: error.response?.data?.error || 'Error signing up',
            isLoading: false,
          });
          toast.error(error.response?.data?.error);
          throw error;
        }
      },

      verifyEmail: async (otp) => {
        const email = get().isEmail;
        if (!email) {
          set({ error: 'Email not found, please sign up first', isLoading: false });
          return;
        }
        set({ isLoading: true, error: null });

        try {
          const response = await axios.post(`${url}/users/verify-email`, { email, otp });
          toast.success(response.data.message);
          set({
            user: response.data.user,
            isEmail: null,
            isVerified: true,
            isAuthenticated: true,
            error: null,
            isLoading: false,
          });
          localStorage.removeItem('e');
        } catch (error) {
          set({
            error: error.response?.data?.message || 'Error verifying email',
            isLoading: false,
          });
          throw error;
        }
      },

      CompleteProfile: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${url}/users/complete-profile`, data);
          toast.success(response.data.message);
          set({
            user: response.data.user,
            isRole: response.data.user?.profile?.role,
            isprofileCompleted: true,
            isAuthenticated: true,
            error: null,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error.response?.data?.message || 'Error completing profile',
            isLoading: false,
          });
          toast.error(error.response?.data?.message);
          throw error;
        }
      },

      getProfile: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.get(`${url}/users/profile`);
          set({ error: null, isLoading: false });
          return response.data;
        } catch (error) {
          set({
            error: error.response?.data?.message || 'Error fetching profile',
            isLoading: false,
          });
          toast.error(error.response?.data?.message);
          throw error;
        }
      },

      login: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${url}/users/login`, data);
          toast.success(response.data.message);
          set({
            user: response.data.user,
            isAuthenticated: true,
            error: null,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error.response?.data?.message || 'Error logging in',
            isLoading: false,
          });
          toast.error(error.response?.data?.message);
          throw error;
        }
      },

      checkAuth: async () => {
        set({ isCheckingAuth: true, error: null, isLoading: true });
        try {
          const response = await axios.get(`${url}/users/check-auth`);
          set({
            user: response.data.user,
            isRole: response.data.user?.profile?.role,
            isAuthenticated: true,
            isVerified: response.data.user?.isVerified,
            isprofileCompleted: response.data.user?.profileCompleted,
            error: null,
            isCheckingAuth: false,
            isLoading: false,
          });
        } catch (error) {
          set({
            isAuthenticated: false,
            isVerified: false,
            isprofileCompleted: false,
            isCheckingAuth: false,
            isLoading: false,
          });
        }
      },

      logout: async () => {
        set({ error: null, isLoading: true });
        try {
          const response = await axios.post(`${url}/users/logout`);
          toast.success(response.data.message);
          set({
            user: null,
            isAuthenticated: false,
            isVerified: false,
            isprofileCompleted: false,
            isAddress: null,
            isEmail: null,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error.response?.data?.message || 'Error logging out',
            isLoading: false,
          });
          toast.error(error.response?.data?.message);
          throw error;
        }
      },

      forgotPassword: async (email) => {
        set({ error: null, isLoading: true, isStatus: false });
        try {
          const response = await axios.post(`${url}/users/forgot-password`, { email });
          toast.success(response.data.message);
          set({ isStatus: true, error: null, isLoading: false });
        } catch (error) {
          set({
            error: error.response?.data?.message,
            isStatus: false,
            isLoading: false,
          });
        }
      },

      resetPassword: async (token, password) => {
        set({ error: null, isLoading: true, isStatus: false });
        try {
          const response = await axios.post(`${url}/users/reset-password/${token}`, { password });
          toast.success(response.data.message);
          set({ isStatus: true, error: null, isLoading: false });
        } catch (error) {
          set({
            error: error.response?.data?.message,
            isStatus: false,
            isLoading: false,
          });
        }
      },

      clearError: () => set({ error: null }),
    }),

    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isRole: state.isRole,
        isAuthenticated: state.isAuthenticated,
        isVerified: state.isVerified,
        isprofileCompleted: state.isprofileCompleted,
        isWalletConnected: state.isWalletConnected,
        isAddress: state.isAddress,
      }),
    }
  )
);
