import { create } from 'zustand';
import axios from 'axios';

const API_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:8080/roadmap'
    : '/roadmap';

axios.defaults.withCredentials = true;

export const useRoadmapStore = create((set) => ({
  job: null,
  roadmapData: null,
  error: null,
  isLoading: false,

  clearRoadmap: () => set({ job: null, roadmapData: null }),

  getJobRoadmap: async (job) => {
    set({ isLoading: true, error: null });

    try {
      const response  = await axios.post(API_URL, { job });

      set({
        job,
        roadmapData: response.data.data,
        isLoading: false,
      });
    } catch (error) {
      console.error(error.response?.data);
      set({
        error: error.response?.data?.message || `Error fetching ${job} roadmap`,
        isLoading: false,
      });
    }
  },
}));
