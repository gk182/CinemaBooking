import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CreditCard, Wallet, Banknote, Shield } from 'lucide-react';
import PaymentMethod from '../../components/payment/PaymentMethod';
import OrderSummary from '../../components/payment/OrderSummary';
import Button from '../../components/common/Button';
import Loading from '../../components/common/Loading';
import type { Booking } from '../../interfaces/Booking';

const PaymentPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [booking, setBooking] = useState<Booking | null>(null);
  const [selectedMethod, setSelectedMethod] = useState('VNPAY');
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    // Get booking data from location state or fetch from API
    if (location.state?.booking) {
      setBooking(location.state.booking);
      setLoading(false);
    } else if (bookingId) {
      // Fetch booking details
      fetchBookingDetails(bookingId);
    }
  }, [bookingId, location.state]);

  const fetchBookingDetails = async (id: string) => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const response = await bookingApi.getById(id);
      
      // Mock data
      const mockBooking: Booking = {
        id: id,
        userId: '1',
        showtimeId: 'st1',
        seats: [
          { id: 'E5', row: 'E', number: 5, type: 'standard', status: 'selected', price: 80000 },
          { id: 'E6', row: 'E', number: 6, type: 'standard', status: 'selected', price: 80000 }
        ],
        totalPrice: 160000,
        status: 'PENDING',
        qrCode: '',
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
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
            posterUrl: 'https://via.placeholder.com/200x300/1a1a2e/ffffff?text=Inception',
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
      };

      setBooking(mockBooking);
    } catch (error) {
      console.error('Failed to fetch booking:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!booking) return;

    setProcessing(true);
    try {
      if (selectedMethod === 'VNPAY' || selectedMethod === 'MOMO') {
        // Create payment and redirect to payment gateway
        // const paymentUrl = await paymentApi.createPayment({
        //   bookingId: booking.id,
        //   method: selectedMethod,
        //   amount: booking.totalPrice
        // });
        
        // Simulate payment gateway redirect
        setTimeout(() => {
          navigate('/payment/callback', {
            state: {
              success: true,
              bookingId: booking.id,
              transactionId: `TXN${Date.now()}`,
              method: selectedMethod
            }
          });
        }, 2000);
      } else if (selectedMethod === 'CASH') {
        // Direct confirmation for cash payment
        navigate('/payment/callback', {
          state: {
            success: true,
            bookingId: booking.id,
            method: 'CASH',
            message: 'Please pay at the cinema counter'
          }
        });
      }
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return <Loading fullScreen text="Loading payment details..." />;
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">Booking not found</p>
          <Button onClick={() => navigate('/')}>Return to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Payment</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Complete your booking payment
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Method Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Security Notice */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-1">
                    Secure Payment
                  </h3>
                  <p className="text-sm text-blue-800 dark:text-blue-400">
                    Your payment information is encrypted and secure. We do not store your card details.
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <PaymentMethod
                selectedMethod={selectedMethod}
                onMethodChange={setSelectedMethod}
              />
            </div>

            {/* Payment Info */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Payment Information
              </h3>
              <div className="space-y-3 text-sm">
                {selectedMethod === 'VNPAY' && (
                  <div className="flex items-start gap-3">
                    <CreditCard className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">VNPay</p>
                      <p className="text-gray-600 dark:text-gray-400">
                        You will be redirected to VNPay to complete your payment securely.
                      </p>
                    </div>
                  </div>
                )}
                {selectedMethod === 'MOMO' && (
                  <div className="flex items-start gap-3">
                    <Wallet className="w-5 h-5 text-pink-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Momo</p>
                      <p className="text-gray-600 dark:text-gray-400">
                        You will be redirected to Momo to complete your payment.
                      </p>
                    </div>
                  </div>
                )}
                {selectedMethod === 'CASH' && (
                  <div className="flex items-start gap-3">
                    <Banknote className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Pay at Counter</p>
                      <p className="text-gray-600 dark:text-gray-400">
                        Your seats will be held for 30 minutes. Please pay at the cinema counter before the showtime.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <OrderSummary booking={booking} />
              
              <Button
                onClick={handlePayment}
                className="w-full mt-6"
                loading={processing}
                disabled={processing}
              >
                {processing ? 'Processing...' : `Pay ₫${booking.totalPrice.toLocaleString()}`}
              </Button>

              <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
                By completing this payment, you agree to our{' '}
                <a href="/terms" className="text-red-600 hover:underline">Terms of Service</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;