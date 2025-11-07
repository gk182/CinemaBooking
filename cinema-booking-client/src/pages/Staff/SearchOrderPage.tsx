import { useState } from 'react';
import {  FileX } from 'lucide-react';
import OrderSearchForm from '../../components/staff/OrderSearchForm';
import OrderDetails from '../../components/staff/OrderDetails';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Loading from '../../components/common/Loading';
import type { Booking } from '../../interfaces/Booking';

const SearchOrderPage = () => {
  const [searchResults, setSearchResults] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (params: { searchType: string; query: string }) => {
    setLoading(true);
    setSearched(true);
    try {
      // TODO: Replace with actual API call
      // const results = await bookingApi.search(params);
      
      // Mock search
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (params.query) {
        const mockResults: Booking[] = [
          {
            id: 'BK001234',
            userId: '1',
            showtimeId: 'st1',
            seats: [
              { id: 'E5', row: 'E', number: 5, type: 'standard', status: 'sold', price: 80000 },
              { id: 'E6', row: 'E', number: 6, type: 'standard', status: 'sold', price: 80000 }
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
              endTime: '22:00',
              date: '2025-11-15',
              availableSeats: 98,
              basePrice: 80000,
              movie: {
                id: '1',
                title: 'Inception',
                posterUrl: 'https://via.placeholder.com/100x150/1a1a2e/ffffff?text=Movie',
                description: '',
                duration: 148,
                releaseDate: '2024-01-15',
                genres: ['Action', 'Sci-Fi'],
                rating: 8.8,
                language: 'English',
                director: 'Christopher Nolan',
                cast: [],
                ageRating: 'PG-13',
                status: 'now_showing'
              },
              cinema: {
                id: 'c1',
                name: 'CGV Vincom Da Nang',
                address: '123 Main St',
                city: 'Da Nang',
                phone: '0236-123-4567',
                rooms: []
              }
            }
          }
        ];
        setSearchResults(mockResults);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    if (!selectedBooking) return;
    
    try {
      // await checkinApi.checkIn(selectedBooking.id);
      alert('Customer checked in successfully!');
      setSelectedBooking(null);
    } catch (error) {
      console.error('Check-in failed:', error);
    }
  };

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Search Orders
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Find customer bookings by phone, email, or booking ID
        </p>
      </div>

      {/* Search Form */}
      <div className="mb-6">
        <OrderSearchForm onSearch={handleSearch} loading={loading} />
      </div>

      {/* Search Results */}
      {loading ? (
        <Loading text="Searching..." />
      ) : searched && searchResults.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <FileX className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-500 dark:text-gray-400">No orders found</p>
            <p className="text-gray-400 dark:text-gray-500 mt-2">
              Try searching with a different query
            </p>
          </div>
        </Card>
      ) : searchResults.length > 0 ? (
        <div className="space-y-4">
          {searchResults.map((booking) => (
            <div
              key={booking.id}
              className="cursor-pointer"
              onClick={() => setSelectedBooking(booking)}
            >
              <Card hover>
                <div className="flex items-start gap-4">
                  <img
                    src={booking.showtime?.movie?.posterUrl}
                    alt={booking.showtime?.movie?.title}
                    className="w-20 h-28 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
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
                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <p>Seats: {booking.seats.map((s: { id: any; }) => s.id).join(', ')}</p>
                      <p>Date: {new Date(booking.showtime?.date || '').toLocaleDateString()}</p>
                      <p>Time: {booking.showtime?.startTime}</p>
                      <p className="font-semibold text-lg text-red-600">
                        ₫{booking.totalPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      ) : null}

      {/* Order Details Modal */}
      {selectedBooking && (
        <OrderDetails
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onCheckIn={handleCheckIn}
        />
      )}
    </div>
  );
};

export default SearchOrderPage;