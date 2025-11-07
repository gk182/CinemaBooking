import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Clock, ChevronRight } from 'lucide-react';
import type { Booking } from '../../interfaces/Booking';
import Badge from '../../components/common/Badge';
import SearchBar from '../../components/common/SearchBar';
import Loading from '../../components/common/Loading';

const HistoryPage = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      // const data = await bookingApi.getMyBookings();
      
      // Mock data
      const mockBookings: Booking[] = [
        {
          id: 'BK001234',
          userId: '1',
          showtimeId: 'st1',
          seats: [
            { id: 'E5', row: 'E', number: 5, type: 'standard', status: 'sold', price: 80000 }
          ],
          totalPrice: 160000,
          status: 'CONFIRMED',
          qrCode: '',
          createdAt: '2025-11-01T10:30:00Z',
          expiresAt: '2025-11-15T09:45:00Z',
          showtime: {
            id: 'st1',
            movieId: '1',
            roomId: 'r1',
            cinemaId: 'c1',
            startTime: '19:30',
            date: '2025-11-15',
            endTime: '22:00',
            availableSeats: 100,
            basePrice: 80000,
            movie: {
              id: '1',
              title: 'Inception',
              posterUrl: 'https://via.placeholder.com/100x150/1a1a2e/ffffff?text=Movie',
              description: '',
              duration: 148,
              releaseDate: '2024-01-15',
              genres: ['Action'],
              rating: 8.8,
              language: 'English',
              director: 'Christopher Nolan',
              cast: [],
              ageRating: 'PG-13',
              status: 'now_showing'
            },
            cinema: {
              id: 'c1',
              name: 'CGV Vincom',
              address: '123 Main St',
              city: 'Da Nang',
              phone: '0236-123-4567',
              rooms: []
            }
          }
        }
      ];
      setBookings(mockBookings);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.showtime?.movie?.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <Loading fullScreen text="Loading booking history..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Booking History
        </h1>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <SearchBar
            placeholder="Search by movie title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery('')}
            className="flex-1"
          />
          <div className="flex gap-2">
            {['all', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterStatus === status
                    ? 'bg-red-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {status === 'all' ? 'All' : status}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-500 dark:text-gray-400">No bookings found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/tickets/${booking.id}`)}
              >
                <div className="flex items-start gap-4">
                  <img
                    src={booking.showtime?.movie?.posterUrl}
                    alt={booking.showtime?.movie?.title}
                    className="w-20 h-28 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {booking.showtime?.movie?.title}
                        </h3>
                        <Badge variant={booking.status === 'CONFIRMED' ? 'success' : 'default'}>
                          {booking.status}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Booking ID</p>
                        <p className="font-mono font-semibold text-gray-900 dark:text-white">
                          {booking.id}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{booking.showtime?.cinema?.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(booking.showtime?.date || '').toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{booking.showtime?.startTime}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Seats</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {booking.seats.map(s => s.id).join(', ')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
                        <p className="text-xl font-bold text-red-600">
                          ₫{booking.totalPrice.toLocaleString()}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;