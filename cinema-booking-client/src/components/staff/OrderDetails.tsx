import { X, MapPin, Calendar, Clock, Users, CheckCircle } from 'lucide-react';
import type { Booking } from '../../interfaces/Booking';
import Button from '../common/Button';

interface OrderDetailsProps {
  booking: Booking;
  onClose: () => void;
  onCheckIn?: () => void;
}

const OrderDetails = ({ booking, onClose, onCheckIn }: OrderDetailsProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between z-10">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Booking Details
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              ID: {booking.id}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Movie Info */}
          <div className="flex gap-4">
            {booking.showtime?.movie?.posterUrl && (
              <img 
                src={booking.showtime.movie.posterUrl}
                alt={booking.showtime.movie.title}
                className="w-24 h-36 rounded-lg object-cover"
              />
            )}
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {booking.showtime?.movie?.title}
              </h4>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
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
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-gray-400" />
              <span className="font-semibold text-gray-900 dark:text-white">Selected Seats</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {booking.seats.map((seat) => (
                <span 
                  key={seat.id}
                  className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg font-medium"
                >
                  {seat.id}
                </span>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                booking.status === 'COMPLETED' 
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                  : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
              }`}>
                {booking.status}
              </span>
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex items-center justify-between text-lg">
              <span className="font-semibold text-gray-900 dark:text-white">Total Amount</span>
              <span className="text-2xl font-bold text-red-600">
                ₫{booking.totalPrice.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        {booking.status !== 'COMPLETED' && onCheckIn && (
          <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-6">
            <Button 
              onClick={onCheckIn}
              className="w-full"
            >
              <CheckCircle className="w-5 h-5" />
              Check In Customer
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;