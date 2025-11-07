import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { CheckCircle2, XCircle, Loader2, Download, Home } from 'lucide-react';
import PaymentSuccess from '../../components/payment/PaymentSuccess';
import Button from '../../components/common/Button';
// import QRCodeDisplay from '../../components/payment/QRCodeDisplay';

const PaymentCallbackPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading');
  const [bookingData, setBookingData] = useState<any>(null);

  useEffect(() => {
    // Check if data was passed via state
    if (location.state) {
      handlePaymentResult(location.state);
    } else {
      // Parse URL parameters (from payment gateway redirect)
      verifyPaymentFromUrl();
    }
  }, [location.state, searchParams]);

  const handlePaymentResult = (data: any) => {
    setTimeout(() => {
      if (data.success) {
        setStatus('success');
        setBookingData(data);
      } else {
        setStatus('failed');
        setBookingData(data);
      }
    }, 1500);
  };

  const verifyPaymentFromUrl = async () => {
    // Get parameters from URL
    const transactionId = searchParams.get('transactionId');
    const responseCode = searchParams.get('responseCode');
    const bookingId = searchParams.get('bookingId');

    if (!transactionId || !bookingId) {
      setStatus('failed');
      return;
    }

    try {
      // Verify payment with backend
      // const result = await paymentApi.verifyPayment({
      //   transactionId,
      //   responseCode,
      //   bookingId
      // });

      // Mock verification
      setTimeout(() => {
        const mockResult = {
          success: responseCode === '00',
          bookingId,
          transactionId,
          qrCode: `QR-${bookingId}`,
          message: responseCode === '00' ? 'Payment successful' : 'Payment failed'
        };

        if (mockResult.success) {
          setStatus('success');
          setBookingData(mockResult);
        } else {
          setStatus('failed');
          setBookingData(mockResult);
        }
      }, 2000);
    } catch (error) {
      console.error('Payment verification failed:', error);
      setStatus('failed');
    }
  };

  const handleDownloadTicket = () => {
    // Generate and download ticket PDF
    alert('Downloading ticket... (To be implemented)');
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-red-600 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Processing Payment
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Please wait while we confirm your payment...
          </p>
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl text-center">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Payment Failed
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {bookingData?.message || 'Something went wrong with your payment. Please try again.'}
            </p>

            {bookingData?.bookingId && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 dark:text-gray-400">Booking ID</p>
                <p className="font-mono font-semibold text-gray-900 dark:text-white">
                  {bookingData.bookingId}
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={() => navigate('/')}
                className="flex-1"
              >
                <Home className="w-5 h-5" />
                Go Home
              </Button>
              <Button
                onClick={() => navigate(`/payment/${bookingData?.bookingId}`)}
                className="flex-1"
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
          <PaymentSuccess
            bookingId={bookingData.bookingId}
            qrCode={bookingData.qrCode || `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><rect width='200' height='200' fill='%23000'/></svg>`}
            onDownloadTicket={handleDownloadTicket}
            onShare={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'My Movie Ticket',
                  text: `Booking ID: ${bookingData.bookingId}`,
                  url: window.location.href
                });
              }
            }}
          />

          {/* Additional Actions */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={() => navigate('/history')}
                className="flex-1"
              >
                View My Bookings
              </Button>
              <Button
                onClick={() => navigate('/')}
                className="flex-1"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </Button>
            </div>
          </div>

          {/* Important Info */}
          <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>Important:</strong> Please arrive at the cinema at least 15 minutes before showtime. 
              Present this QR code at the entrance for check-in.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCallbackPage;