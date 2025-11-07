import { Film, ArrowLeft } from 'lucide-react';
import type { Seat } from '../../interfaces/Cinema';

interface BookingSummaryProps {
  selectedSeats: Seat[];
  onRemoveSeat: (seat: Seat) => void;
  onConfirm: () => void;
  countdown: number;
}

const BookingSummary = ({ 
  selectedSeats, 
  onRemoveSeat, 
  onConfirm, 
  countdown 
}: BookingSummaryProps) => {
  const getTotalPrice = () => {
    return selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Group seats by type for price breakdown
  const priceBreakdown = Object.entries(
    selectedSeats.reduce((acc, seat) => {
      const key = `${seat.type}-${seat.price}`;
      if (!acc[key]) {
        acc[key] = { type: seat.type, price: seat.price, count: 0 };
      }
      acc[key].count++;
      return acc;
    }, {} as Record<string, { type: string; price: number; count: number }>)
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm lg:sticky lg:top-24">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        Booking Summary
      </h3>
      
      {selectedSeats.length === 0 ? (
        <div className="text-center py-8">
          <Film className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400">No seats selected</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            Click on available seats to select
          </p>
        </div>
      ) : (
        <>
          {/* Selected Seats */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Selected Seats ({selectedSeats.length}/8):
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedSeats.map((seat) => (
                <div
                  key={seat.id}
                  className="px-3 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium flex items-center gap-2"
                >
                  {seat.id}
                  <button
                    onClick={() => onRemoveSeat(seat)}
                    className="hover:text-red-800 dark:hover:text-red-200 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-3 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
            {priceBreakdown.map(([key, { type, price, count }]) => (
              <div key={key} className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400 capitalize">
                  {type} ({count}x)
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  ₫{(price * count).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              Total
            </span>
            <span className="text-2xl font-bold text-red-600">
              ₫{getTotalPrice().toLocaleString()}
            </span>
          </div>

          {/* Confirm Button */}
          <button
            onClick={onConfirm}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          >
            Continue to Payment
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </button>

          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
            Seats will be held for {formatTime(countdown)}
          </p>
        </>
      )}
    </div>
  );
};

export default BookingSummary;