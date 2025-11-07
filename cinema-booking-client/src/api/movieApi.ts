import api from './index';
import type { Movie } from '../interfaces/Movie';

export interface MovieFilters {
  status?: 'now_showing' | 'coming_soon' | 'ended';
  genre?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: 'releaseDate' | 'rating' | 'title';
  sortOrder?: 'asc' | 'desc';
}

export interface MovieListResponse {
  movies: Movie[];
  total: number;
  page: number;
  totalPages: number;
}

export const movieApi = {
  /**
   * Get all movies with filters
   */
  getAll: async (filters?: MovieFilters): Promise<MovieListResponse> => {
    return api.get('/movies', { params: filters });
  },

  /**
   * Get movie by ID
   */
  getById: async (id: string): Promise<Movie> => {
    return api.get(`/movies/${id}`);
  },

  /**
   * Search movies
   */
  search: async (query: string, filters?: MovieFilters): Promise<MovieListResponse> => {
    return api.get('/movies/search', { 
      params: { q: query, ...filters } 
    });
  },

  /**
   * Get now showing movies
   */
  getNowShowing: async (page = 1, limit = 10): Promise<MovieListResponse> => {
    return api.get('/movies/now-showing', { params: { page, limit } });
  },

  /**
   * Get coming soon movies
   */
  getComingSoon: async (page = 1, limit = 10): Promise<MovieListResponse> => {
    return api.get('/movies/coming-soon', { params: { page, limit } });
  },

  /**
   * Get top rated movies
   */
  getTopRated: async (limit = 10): Promise<Movie[]> => {
    return api.get('/movies/top-rated', { params: { limit } });
  },

  /**
   * Get movie genres
   */
  getGenres: async (): Promise<string[]> => {
    return api.get('/movies/genres');
  },

  /**
   * Admin: Create movie
   */
  create: async (data: Partial<Movie>): Promise<Movie> => {
    return api.post('/movies', data);
  },

  /**
   * Admin: Update movie
   */
  update: async (id: string, data: Partial<Movie>): Promise<Movie> => {
    return api.put(`/movies/${id}`, data);
  },

  /**
   * Admin: Delete movie
   */
  delete: async (id: string): Promise<void> => {
    return api.delete(`/movies/${id}`);
  },
};