export interface DashboardStats {
  totalRevenue: number;
  totalTickets: number;
  totalBookings: number;
  activeMovies: number;
  revenueData: RevenueData[];
  topMovies: TopMovie[];
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