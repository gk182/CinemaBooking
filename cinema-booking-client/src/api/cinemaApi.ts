import api from './index';
import type { Cinema } from '../interfaces/Cinema';


export const cinemaApi = {
  /**
   * Get all cinemas
   */
  getAll: async (): Promise<Cinema[]> => {
    return api.get('/cinema');
  },

  /**
   * Get cinema by ID
   */
  getById: async (id: string): Promise<Cinema> => {
    return api.get(`/cinema/${id}`);
  },

  /**
   * Admin: Create cinema
   */
  createCinema: async (data: Partial<Cinema>): Promise<Cinema> => {
    return api.post('/cinema', data);
  },

  /**
   * Admin: Update cinema
   */
  updateCinema: async (id: string, data: Partial<Cinema>): Promise<Cinema> => {
    return api.put(`/cinema/${id}`, data);
  },

  /**
   * Admin: Delete cinema
   */
  deleteCinema: async (id: string): Promise<void> => {
    return api.delete(`/cinema/${id}`);
  },

};