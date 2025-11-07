import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Download,
  Share2,
  CheckCircle,
  XCircle,
  Film
} from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Loading from '../../components/common/Loading';
import QRCodeDisplay from '../../components/payment/QRCodeDisplay';
import type { Booking } from '../../interfaces/Booking';

const TicketDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchBookingDetails(id);
    }
  }, [id]);

  const fetchBookingDetails = async (bookingId: string) => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // const data = await bookingApi.getById(bookingId);
      
      // Mock data
      const mockBooking: Booking = {
        id: bookingId,
        userId: '1',
        showtimeId: 'st1',
        seats: [
          { id: 'E5', row: 'E', number: 5, type: 'standard', status: 'sold', price: 80000 },
          { id: 'E6', row: 'E', number: 6, type: 'standard', status: 'sold', price: 80000 }
        ],
        totalPrice: 160000,
        status: 'CONFIRMED',
        qrCode: `QR-${bookingId}`,
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
            posterUrl: 'https://via.placeholder.com/300x450/1a1a2e/ffffff?text=Inception',
            bannerUrl: 'https://via.placeholder.com/1200x400/1a1a2e/ffffff?text=Inception+Banner',
            description: 'A thief who steals corporate secrets through dream-sharing technology.',
            duration: 148,
            releaseDate: '2024-01-15',
            genres: ['Action', 'Sci-Fi', 'Thriller'],
            rating: 8.8,
            language: 'English',
            director: 'Christopher Nolan',
            cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt'],
            ageRating: 'PG-13',
            status: 'now_showing'
          },
          cinema: {
            id: 'c1',
            name: 'CGV Vincom Da Nang',
            address: '123 Main Street, Hai Chau District',
            city: 'Da Nang',
            phone: '0236-123-4567',
            rooms: []
          },
          room: {
            id: 'r1',
            cinemaId: 'c1',
            name: 'Screen 1',
            capacity: 140,
            rows: 10,
            seatsPerRow: 14,
            seatMap: []
          }
        }
      };
      setBooking(mockBooking);
    } catch (error) {
      console.error('Failed to fetch booking:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    // TODO: Generate PDF ticket
    alert('Downloading ticket... (To be implemented)');
  };

  const handleShare = async () => {
    if (navigator.share && booking) {
      try {
        await navigator.share({
          title: `Movie Ticket - ${booking.showtime?.movie?.title}`,
          text: `Booking ID: ${booking.id}`,
          url: window.location.href
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'success';
      case 'COMPLETED':
        return 'default';
      case 'CANCELLED':
        return 'error';
      default:
        return 'warning';
    }
  };

  const isUpcoming = () => {
    if (!booking?.showtime?.date || !booking?.showtime?.startTime) return false;
    const showtimeDate = new Date(`${booking.showtime.date}T${booking.showtime.startTime}`);
    return showtimeDate > new Date();
  };

  if (loading) {
    return <Loading fullScreen text="Loading ticket details..." />;
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">Ticket not found</p>
          <Button onClick={() => navigate('/history')}>Back to History</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/history')}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to History
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Ticket Details
              </h1>
              <Badge variant={getStatusColor(booking.status)} size="lg">
                {booking.status}
              </Badge>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={handleShare}>
                <Share2 className="w-5 h-5" />
                Share
              </Button>
              <Button onClick={handleDownload}>
                <Download className="w-5 h-5" />
                Download
              </Button>
            </div>
          </div>
        </div>

        {/* Ticket Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Main Ticket Info */}
          <div className="lg:col-span-2">
            <Card>
              {/* Movie Banner */}
              <div className="relative h-48 -mx-6 -mt-6 mb-6 rounded-t-xl overflow-hidden">
                <img
                  src={booking.showtime?.movie?.bannerUrl || booking.showtime?.movie?.posterUrl}
                  alt={booking.showtime?.movie?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-4 left-6 right-6">
                  <h2 className="text-2xl font-bold text-white mb-1">
                    {booking.showtime?.movie?.title}
                  </h2>
                  <p className="text-white/80 text-sm">
                    {booking.showtime?.movie?.genres.join(' • ')} • {booking.showtime?.movie?.duration} min
                  </p>
                </div>
              </div>

              {/* Booking Details */}
              <div className="space-y-6">
                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                      <Calendar className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {new Date(booking.showtime?.date || '').toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Time</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {booking.showtime?.startTime} - {booking.showtime?.endTime}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Cinema</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {booking.showtime?.cinema?.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {booking.showtime?.cinema?.address}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {booking.showtime?.room?.name}
                    </p>
                  </div>
                </div>

                {/* Seats */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-5 h-5 text-gray-400" />
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Selected Seats
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {booking.seats.map((seat) => (
                      <div
                        key={seat.id}
                        className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg font-semibold"
                      >
                        {seat.id}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="space-y-3 mb-4">
                    {Object.entries(
                      booking.seats.reduce((acc, seat) => {
                        const key = `${seat.type}-${seat.price}`;
                        if (!acc[key]) {
                          acc[key] = { type: seat.type, price: seat.price, count: 0 };
                        }
                        acc[key].count++;
                        return acc;
                      }, {} as Record<string, { type: string; price: number; count: number }>)
                    ).map(([key, { type, price, count }]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400 capitalize">
                          {type} Seat ({count}x)
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          ₫{(price * count).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      Total Amount
                    </span>
                    <span className="text-2xl font-bold text-red-600">
                      ₫{booking.totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Booking Info */}
                <div className="pt-6 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <p>Booking ID: <span className="font-mono font-semibold text-gray-900 dark:text-white">{booking.id}</span></p>
                  <p>Booked on: {new Date(booking.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* QR Code & Actions */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Entry Pass
                </h3>
                
                {isUpcoming() && booking.status === 'CONFIRMED' ? (
                  <>
                    <QRCodeDisplay
                      data={booking.qrCode}
                      bookingId={booking.id}
                      size={200}
                    />
                    
                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                      <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">
                        Show this QR code at the entrance
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                        Please arrive 15 minutes before showtime
                      </p>
                    </div>
                  </>
                ) : booking.status === 'COMPLETED' ? (
                  <div className="py-12">
                    <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      This ticket has been used
                    </p>
                  </div>
                ) : booking.status === 'CANCELLED' ? (
                  <div className="py-12">
                    <XCircle className="w-16 h-16 text-red-600 dark:text-red-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      This booking was cancelled
                    </p>
                  </div>
                ) : (
                  <div className="py-12">
                    <Film className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      QR code not available
                    </p>
                  </div>
                )}

                {/* Additional Info */}
                {isUpcoming() && booking.status === 'CONFIRMED' && (
                  <div className="mt-6 text-left space-y-3">
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Cinema Contact</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {booking.showtime?.cinema?.phone}
                      </p>
                    </div>
                    
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900 rounded-lg">
                      <p className="text-xs font-medium text-yellow-800 dark:text-yellow-300">
                        ⚠️ Important
                      </p>
                      <p className="text-xs text-yellow-700 dark:text-yellow-400 mt-1">
                        Tickets cannot be refunded or exchanged
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* Actions */}
        {booking.status === 'CONFIRMED' && !isUpcoming() && (
          <Card>
            <div className="text-center py-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                How was your experience?
              </h3>
              <Button>
                Rate this Movie
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TicketDetailPage;