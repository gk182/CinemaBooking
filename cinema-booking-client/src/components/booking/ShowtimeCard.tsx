import { Clock, MapPin, DollarSign } from 'lucide-react';
import type { Showtime } from '../../interfaces/Showtime';

interface ShowtimeCardProps {
  showtime: Showtime;
  onSelect: () => void;
  selected?: boolean;
}

const ShowtimeCard = ({ showtime, onSelect, selected = false }: ShowtimeCardProps) => {
  return (
    <button
      onClick={onSelect}
      className={`
        w-full p-4 rounded-lg border-2 transition-all text-left
        ${selected
          ? 'border-red-600 bg-red-50 dark:bg-red-900/20'
          : 'border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-700'
        }
      `}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-red-600" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            {showtime.startTime}
          </span>
        </div>
        {showtime.availableSeats <= 10 && (
          <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 px-2 py-1 rounded-full font-medium">
            Only {showtime.availableSeats} seats left
          </span>
        )}
      </div>
      
      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>{showtime.cinema?.name} - {showtime.room?.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4" />
          <span>From ₫{showtime.basePrice.toLocaleString()}</span>
        </div>
      </div>
    </button>
  );
};

export default ShowtimeCard;