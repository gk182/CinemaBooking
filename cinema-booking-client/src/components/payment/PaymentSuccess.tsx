import { CheckCircle2, Download, Share2 } from 'lucide-react';

interface PaymentSuccessProps {
  bookingId: string;
  qrCode: string;
  onDownloadTicket?: () => void;
  onShare?: () => void;
}

const PaymentSuccess = ({ bookingId, qrCode, onDownloadTicket, onShare }: PaymentSuccessProps) => {
  return (
    <div className="text-center max-w-md mx-auto">
      <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
      </div>

      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Payment Successful!
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Your booking has been confirmed. Show this QR code at the cinema entrance.
      </p>

      {/* QR Code */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 mb-6">
        <img 
          src={qrCode} 
          alt="Booking QR Code"
          className="w-48 h-48 mx-auto"
        />
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          Booking ID: <span className="font-mono font-semibold">{bookingId}</span>
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        {onDownloadTicket && (
          <button
            onClick={onDownloadTicket}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download Ticket
          </button>
        )}
        {onShare && (
          <button
            onClick={onShare}
            className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Share
          </button>
        )}
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
        A confirmation email has been sent to your registered email address.
      </p>
    </div>
  );
};

export default PaymentSuccess;