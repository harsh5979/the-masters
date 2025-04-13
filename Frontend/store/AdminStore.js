import { create } from 'zustand'
import axios from 'axios'
import { toast } from 'react-toastify'
const url = `${import.meta.env.VITE_API_URL}/admin`;

export const useAdminStore = create((set, get) => ({

    error: null,
    isLoading: false,
    countStudent: 0,
    AllStudents: null,
    ViewStudent: null,

    dashboard: async (filter = "", page, limit) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axios.get(`${url}/dashboard?admissionStatus=${filter}&page=${page}&limit=${limit}`);
            set({ AllStudents: response.data.students, countStudent: response.data.totalUser, isLoading: false, error: null });
        } catch (error) {
            set({ error: error.response.data.error || 'Error to fetch data', isLoading: false })

        }

    },
    deleteStudent: async (id) => {
        set({ isLoading: false, error: null })
        try {
            const response = await axios.delete(`${url}/delete-student/${id}`);
            toast.success(response.data.message)

            set((state) => ({
                AllStudents: state.AllStudents.filter(student => student._id !== id),
                isLoading: false,
                error: null,
            }));

        } catch (error) {
            set({ error: error.response.data.error || 'error in deleting student', isLoading: false })

        }

    },
    Student: async (id) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axios.get(`${url}/view-student/${id}`);
            toast.success(response.data.message)

            set((state) => ({
                AllStudents: state.AllStudents.filter(student => student._id !== id),
                isLoading: false,
                error: null,
            }));

        } catch (error) {
            set({ error: error.response.data.error || 'error to view student', isLoading: false })

        }

    },
    MarkFeePaid: async (studentId, feekey, paymentMethod) => {
        set({ isLoading: true, error: null })
        try {

            const response = await axios.post(`${url}/mark-fee-as-paid/${studentId}/${feekey}`, { paymentMethod });
            toast.success("Fee marked as paid successfully");

            set({ isLoading: false, error: null });

        } catch (error) {
            set({ error: error.response.data.error || 'error', isLoading: false })

        }
    },
    DownloadReceipt: async (studentId, month, year) => {
        try {
            const response = await axios.get(`${url}/download-receipt/${studentId}/${month}/${year}`, { responseType: 'blob' });


            const blob =  response.data;
            console.log(response.data);
            const blobUrl = URL.createObjectURL(blob);
            window.open(blobUrl, "_blank");
            const fileName = `receipt_${response.data.student.fullName}_${month}_${year}.pdf`;
            saveAs(blob, fileName);
            toast.success("Receipt downloaded successfully!");
        } catch (error) {
            console.error("Error downloading the receipt:", error);
            toast.error("Failed to download the receipt.");
        }
    },






}))