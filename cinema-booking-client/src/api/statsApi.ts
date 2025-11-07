import api from './index';

export interface DashboardStats {
  totalRevenue: number;
  totalBookings: number;
  totalTickets: number;
  activeMovies: number;
  revenueGrowth: number;
  bookingsGrowth: number;
}

export interface RevenueData {
  date: string;
  revenue: number;
  tickets: number;
}

export interface TopMovie {
  movieId: string;
  title: string;
  revenue: number;
  ticketsSold: number;
}

export const statsApi = {
  /**
   * Get dashboard statistics
   */
  getDashboard: async (period?: 'week' | 'month' | 'year'): Promise<DashboardStats> => {
    return api.get('/stats/dashboard', { params: { period } });
  },

  /**
   * Get revenue data
   */
  getRevenue: async (startDate: string, endDate: string): Promise<RevenueData[]> => {
    return api.get('/stats/revenue', { params: { startDate, endDate } });
  },

  /**
   * Get top movies
   */
  getTopMovies: async (limit = 10, period?: string): Promise<TopMovie[]> => {
    return api.get('/stats/top-movies', { params: { limit, period } });
  },

  /**
   * Get booking statistics
   */
  getBookingStats: async (startDate: string, endDate: string): Promise<any> => {
    return api.get('/stats/bookings', { params: { startDate, endDate } });
  },
};