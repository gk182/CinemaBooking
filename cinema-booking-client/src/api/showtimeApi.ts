import api from './index';
import type { Showtime } from '../interfaces/Showtime';

export interface ShowtimeFilters {
  movieId?: string;
  cinemaId?: string;
  date?: string;
  startDate?: string;
  endDate?: string;
}

export interface CreateShowtimeRequest {
  movieId: string;
  roomId: string;
  showDate: string;
  startTime: string;
  basePrice: number;
}

export const showtimeApi = {
  /**
   * Get showtimes with filters
   */
  getAll: async (filters?: ShowtimeFilters): Promise<Showtime[]> => {
    return api.get('/showtimes', { params: filters });
  },

  /**
   * Get showtimes by movie ID
   */
  getByMovie: async (movieId: string, date?: string): Promise<Showtime[]> => {
    return api.get(`/showtimes/movie/${movieId}`, { params: { date } });
  },

  /**
   * Get showtimes by date
   */
  getByDate: async (date: string, cinemaId?: string): Promise<Showtime[]> => {
    return api.get(`/showtimes/date/${date}`, { params: { cinemaId } });
  },

  /**
   * Get showtime by ID
   */
  getById: async (id: string): Promise<Showtime> => {
    return api.get(`/showtimes/${id}`);
  },

  /**
   * Get available dates for movie
   */
  getAvailableDates: async (movieId: string): Promise<string[]> => {
    return api.get(`/showtimes/movie/${movieId}/dates`);
  },

  /**
   * Admin: Create showtime
   */
  create: async (data: CreateShowtimeRequest): Promise<Showtime> => {
    return api.post('/showtimes', data);
  },

  /**
   * Admin: Update showtime
   */
  update: async (id: string, data: Partial<CreateShowtimeRequest>): Promise<Showtime> => {
    return api.put(`/showtimes/${id}`, data);
  },

  /**
   * Admin: Delete showtime
   */
  delete: async (id: string): Promise<void> => {
    return api.delete(`/showtimes/${id}`);
  },

  /**
   * Admin: Cancel showtime
   */
  cancel: async (id: string, reason?: string): Promise<Showtime> => {
    return api.post(`/showtimes/${id}/cancel`, { reason });
  },
};