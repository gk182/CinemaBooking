import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Armchair, Check } from 'lucide-react';
import Button from '../../components/common/Button';

const BookingPage = () => {
  const { showtimeId } = useParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Mock seat data (10 rows x 12 seats)
  const rows = Array.from({ length: 10 }, (_, i) => String.fromCharCode(65 + i));
  const seatsPerRow = 12;

  const toggleSeat = (seatId: string) => {
    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Screen */}
        <div className="mb-12">
          <div className="bg-gradient-to-b from-gray-800 to-gray-700 h-2 rounded-full mb-2"></div>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">SCREEN</p>
        </div>

        {/* Seats Grid */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 mb-6">
          <div className="space-y-3">
            {rows.map((row) => (
              <div key={row} className="flex items-center gap-2 justify-center">
                <span className="w-8 text-center font-semibold text-gray-600 dark:text-gray-400">{row}</span>
                <div className="flex gap-2">
                  {Array.from({ length: seatsPerRow }, (_, i) => {
                    const seatId = `${row}${i + 1}`;
                    const isSelected = selectedSeats.includes(seatId);
                    const isSold = Math.random() > 0.7; // Mock sold seats

                    return (
                      <button
                        key={seatId}
                        onClick={() => !isSold && toggleSeat(seatId)}
                        disabled={isSold}
                        className={`w-10 h-10 rounded-lg transition-all ${
                          isSold
                            ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
                            : isSelected
                            ? 'bg-red-600 text-white scale-110 shadow-lg'
                            : 'bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 border-2 border-green-500'
                        }`}
                      >
                        {isSelected && <Check className="w-5 h-5 mx-auto" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 border-2 border-green-500 rounded-lg"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-600 rounded-lg"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Sold</span>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 flex items-center justify-between">
          <div>
            <p className="text-gray-600 dark:text-gray-400 mb-1">Selected Seats:</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-gray-600 dark:text-gray-400 mb-1">Total Price:</p>
            <p className="text-2xl font-bold text-red-600">
              ₫{(selectedSeats.length * 80000).toLocaleString()}
            </p>
          </div>
          <Button
            disabled={selectedSeats.length === 0}
            onClick={() => navigate(`/payment/mock-booking-id`)}
          >
            Continue to Payment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;