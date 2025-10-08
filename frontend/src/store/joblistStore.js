import { create } from 'zustand';
import axios from 'axios';

const API_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:8080/job'
    : '/job';

axios.defaults.withCredentials = true;

export const useJoblistStore = create((set, get) => ({
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
    }),

  getPassionJoblist: async (prompt) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_URL}/passion`, { prompt });

      set((state) => ({
        list: {
          ...state.list,
          passion: response.data,
        },
        isLoading: false,
      }));
    } catch (error) {
      console.error(error.response?.data);
      set({
        error:
          error.response?.data?.message ||
          `Error in getting Joblist`,
        isLoading: false,
      });
      throw error;
    }
  },
}));
