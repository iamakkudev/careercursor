import { create } from 'zustand';
import axios from 'axios';


const API_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:8080'
    : '';

axios.defaults.withCredentials = true;

export const useJoblistStore = create((set, get) => {
  const fetchJoblist = async (endpoint, key, payload) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/job/${endpoint}`, payload);
      set((state) => ({
        list: {
          ...state.list,
          [key]: response.data,
        },
        isLoading: false,
      }));
    } catch (error) {
      console.error(error.response?.data);
      set({
        error: error.response?.data?.message || error.message || `Error fetching ${key} joblist`,
        isLoading: false,
      });
      throw error;
    }
  };

  return {
    list: {
      passion: null,
      qualify: null,
      private: null,
      gov: null,
    },
    error: null,
    isLoading: false,

    clearAllFlows: () =>
      set({
        list: {
          passion: null,
          qualify: null,
          private: null,
          gov: null,
        },
        error: null,
        isLoading: false,
      }),

    resetStatus: () => set({ error: null, isLoading: false }),

    getPassionJoblist: (prompt) => fetchJoblist('passion', 'passion', { prompt }),
    getQualifyJoblist: (qualify) => fetchJoblist('qualify', 'qualify', { qualify }),
  };
});
