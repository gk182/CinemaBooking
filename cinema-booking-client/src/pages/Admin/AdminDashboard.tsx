import { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Ticket, 
  Film, 
  Users, 
  TrendingUp,
  Calendar,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical
} from 'lucide-react';
import StatsCard from '../../components/admin/StatsCard';
import RevenueChart from '../../components/admin/RevenueChart';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import type { DashboardStats, RevenueData, TopMovie } from '../../interfaces/Stats';

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('week');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, [period]);

  const fetchDashboardStats = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // const data = await adminApi.getDashboardStats(period);
      
      // Mock data
      const mockStats: DashboardStats = {
        totalRevenue: 125500000,
        totalTickets: 8543,
        totalBookings: 6234,
        activeMovies: 12,
        revenueData: generateRevenueData(period),
        topMovies: [
          { movieId: '1', title: 'Inception', revenue: 32500000, ticketsSold: 1250 },
          { movieId: '2', title: 'Interstellar', revenue: 29800000, ticketsSold: 1180 },
          { movieId: '3', title: 'The Dark Knight', revenue: 27600000, ticketsSold: 1050 },
          { movieId: '4', title: 'The Matrix', revenue: 18900000, ticketsSold: 890 },
          { movieId: '5', title: 'Avatar', revenue: 16700000, ticketsSold: 723 }
        ]
      };
      
      setStats(mockStats);
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateRevenueData = (period: string): RevenueData[] => {
    const days = period === 'week' ? 7 : period === 'month' ? 30 : 12;
    return Array.from({ length: days }, (_, i) => {
      const date = new Date();
      if (period === 'week') {
        date.setDate(date.getDate() - (days - 1 - i));
      } else if (period === 'month') {
        date.setDate(date.getDate() - (days - 1 - i));
      } else {
        date.setMonth(date.getMonth() - (days - 1 - i));
      }
      
      return {
        date: date.toISOString().split('T')[0],
        revenue: Math.floor(Math.random() * 2000000) + 1000000,
        tickets: Math.floor(Math.random() * 200) + 100
      };
    });
  };

  const recentBookings = [
    { 
      id: 'BK001234', 
      movie: 'Inception', 
      customer: 'John Doe', 
      amount: 160000, 
      status: 'confirmed', 
      time: '2 mins ago',
      seats: ['E5', 'E6']
    },
    { 
      id: 'BK001235', 
      movie: 'Interstellar', 
      customer: 'Jane Smith', 
      amount: 200000, 
      status: 'confirmed', 
      time: '5 mins ago',
      seats: ['I13']
    },
    { 
      id: 'BK001236', 
      movie: 'The Matrix', 
      customer: 'Bob Wilson', 
      amount: 240000, 
      status: 'pending', 
      time: '12 mins ago',
      seats: ['A1', 'A2', 'A3']
    },
    { 
      id: 'BK001237', 
      movie: 'Inception', 
      customer: 'Alice Brown', 
      amount: 320000, 
      status: 'confirmed', 
      time: '18 mins ago',
      seats: ['F7', 'F8', 'F9', 'F10']
    }
  ];

  const upcomingShowtimes = [
    { id: 'st1', movie: 'Inception', time: '14:30', room: 'Screen 1', available: 85 },
    { id: 'st2', movie: 'The Dark Knight', time: '15:00', room: 'IMAX Hall', available: 45 },
    { id: 'st3', movie: 'Interstellar', time: '16:00', room: 'Screen 2', available: 92 },
    { id: 'st4', movie: 'Avatar', time: '17:30', room: 'Screen 3', available: 120 }
  ];

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="p-4 sm:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        
        {/* Period Selector */}
        <div className="flex gap-2">
          {(['week', 'month', 'year'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                period === p
                  ? 'bg-red-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-red-300'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value={stats.totalRevenue}
          icon={DollarSign}
          trend={12.5}
          prefix="₫"
        />
        <StatsCard
          title="Tickets Sold"
          value={stats.totalTickets}
          icon={Ticket}
          trend={8.3}
        />
        <StatsCard
          title="Total Bookings"
          value={stats.totalBookings}
          icon={Calendar}
          trend={-2.4}
        />
        <StatsCard
          title="Active Movies"
          value={stats.activeMovies}
          icon={Film}
        />
      </div>

      {/* Revenue Chart */}
      <RevenueChart data={stats.revenueData} period={period} />

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Movies */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Top Performing Movies
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Based on ticket sales this {period}
              </p>
            </div>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="space-y-4">
            {stats.topMovies.map((movie, index) => {
              const isTop3 = index < 3;
              const trendUp = Math.random() > 0.5;
              
              return (
                <div
                  key={movie.movieId}
                  className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {/* Rank */}
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm
                    ${isTop3 
                      ? 'bg-gradient-to-br from-red-500 to-purple-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                    }
                  `}>
                    {index + 1}
                  </div>

                  {/* Movie Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white truncate">
                      {movie.title}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-500 dark:text-gray-400">
                      <span>₫{(movie.revenue / 1000000).toFixed(1)}M</span>
                      <span>•</span>
                      <span>{movie.ticketsSold} tickets</span>
                    </div>
                  </div>

                  {/* Trend */}
                  <div className={`flex items-center gap-1 ${
                    trendUp ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {trendUp ? (
                      <ArrowUpRight className="w-5 h-5" />
                    ) : (
                      <ArrowDownRight className="w-5 h-5" />
                    )}
                    <span className="text-sm font-semibold">
                      {Math.floor(Math.random() * 20) + 5}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <Button variant="ghost" className="w-full mt-4">
            View All Movies
          </Button>
        </Card>

        {/* Recent Bookings */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Recent Bookings
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Latest customer transactions
              </p>
            </div>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="space-y-3">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors cursor-pointer"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-mono font-semibold text-sm text-gray-900 dark:text-white">
                      {booking.id}
                    </p>
                    <Badge 
                      variant={booking.status === 'confirmed' ? 'success' : 'warning'}
                      size="sm"
                    >
                      {booking.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {booking.movie} • {booking.customer}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    Seats: {booking.seats.join(', ')}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    ₫{booking.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {booking.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Button variant="ghost" className="w-full mt-4">
            View All Bookings
          </Button>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Showtimes */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Upcoming Showtimes
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Next screenings today
                </p>
              </div>
              <Badge variant="info">
                {upcomingShowtimes.length} showtimes
              </Badge>
            </div>

            <div className="space-y-3">
              {upcomingShowtimes.map((showtime) => {
                const occupancyRate = ((150 - showtime.available) / 150) * 100;
                
                return (
                  <div
                    key={showtime.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <div className="text-center min-w-[80px]">
                      <div className="text-2xl font-bold text-red-600">
                        {showtime.time}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {showtime.room}
                      </p>
                    </div>

                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white mb-2">
                        {showtime.movie}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all ${
                              occupancyRate > 80
                                ? 'bg-red-500'
                                : occupancyRate > 50
                                ? 'bg-yellow-500'
                                : 'bg-green-500'
                            }`}
                            style={{ width: `${occupancyRate}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                          {showtime.available} left
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Quick Actions
          </h3>
          
          <div className="space-y-3">
            <Button className="w-full justify-start" variant="secondary">
              <Film className="w-5 h-5" />
              Add New Movie
            </Button>
            <Button className="w-full justify-start" variant="secondary">
              <Calendar className="w-5 h-5" />
              Schedule Showtime
            </Button>
            <Button className="w-full justify-start" variant="secondary">
              <Users className="w-5 h-5" />
              Add Staff Member
            </Button>
            <Button className="w-full justify-start" variant="secondary">
              <Eye className="w-5 h-5" />
              View Reports
            </Button>
          </div>

          {/* System Status */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
              System Status
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Server
                </span>
                <Badge variant="success" size="sm">Online</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Database
                </span>
                <Badge variant="success" size="sm">Connected</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Payment Gateway
                </span>
                <Badge variant="success" size="sm">Active</Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-3">
            <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {(stats.totalTickets / stats.totalBookings).toFixed(1)}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Avg Tickets/Booking
          </p>
        </Card>

        <Card className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full mb-3">
            <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            ₫{Math.floor(stats.totalRevenue / stats.totalTickets / 1000)}K
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Avg Ticket Price
          </p>
        </Card>

        <Card className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-3">
            <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {((stats.totalTickets / (stats.activeMovies * 100)) * 100).toFixed(1)}%
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Occupancy Rate
          </p>
        </Card>

        <Card className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-3">
            <Ticket className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {Math.floor(stats.totalRevenue / stats.totalBookings / 1000)}K
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Avg Booking Value
          </p>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
