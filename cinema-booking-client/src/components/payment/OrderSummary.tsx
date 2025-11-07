import { Film, Clock, MapPin, Calendar, Users } from 'lucide-react';
import type { Booking } from '../../interfaces/Booking';

interface OrderSummaryProps {
  booking: Booking;
}

const OrderSummary = ({ booking }: OrderSummaryProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Order Summary
      </h3>

      {/* Movie Info */}
      <div className="flex gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
        {booking.showtime?.movie?.posterUrl && (
          <img 
            src={booking.showtime.movie.posterUrl}
            alt={booking.showtime.movie.title}
            className="w-20 h-28 rounded-lg object-cover"
          />
        )}
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
            {booking.showtime?.movie?.title}
          </h4>
          <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
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
        </div>
      </div>

      {/* Seats */}
      <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Selected Seats
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {booking.seats.map((seat) => (
            <span 
              key={seat.id}
              className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1.5 rounded-lg text-sm font-medium"
            >
              {seat.id}
            </span>
          ))}
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
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

      {/* Total */}
      <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            Total Amount
          </span>
          <span className="text-2xl font-bold text-red-600">
            ₫{booking.totalPrice.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Booking ID */}
      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <p className="text-xs text-gray-500 dark:text-gray-400">Booking ID</p>
        <p className="font-mono text-sm font-medium text-gray-900 dark:text-white">
          {booking.id}
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;