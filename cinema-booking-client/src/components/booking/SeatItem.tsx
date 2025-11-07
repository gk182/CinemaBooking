import { CheckCircle2, XCircle } from 'lucide-react';
import type { Seat } from '../../interfaces/Cinema';

interface SeatItemProps {
  seat: Seat;
  onSelect: (seat: Seat) => void;
  isSelected: boolean;
}

const SeatItem = ({ seat, onSelect, isSelected }: SeatItemProps) => {
  const getStyles = () => {
    if (seat.status === 'sold' || seat.status === 'blocked') {
      return 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed';
    }
    if (isSelected) {
      return 'bg-red-600 text-white scale-110 shadow-lg ring-2 ring-red-400';
    }
    
    switch (seat.type) {
      case 'vip':
        return 'bg-purple-100 dark:bg-purple-900/30 border-2 border-purple-500 hover:bg-purple-200 dark:hover:bg-purple-900/50';
      case 'couple':
        return 'bg-pink-100 dark:bg-pink-900/30 border-2 border-pink-500 hover:bg-pink-200 dark:hover:bg-pink-900/50';
      default:
        return 'bg-green-100 dark:bg-green-900/30 border-2 border-green-500 hover:bg-green-200 dark:hover:bg-green-900/50';
    }
  };

  return (
    <button
      onClick={() => onSelect(seat)}
      disabled={seat.status === 'sold' || seat.status === 'blocked'}
      className={`
        relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg transition-all duration-200
        flex items-center justify-center text-xs font-semibold
        ${getStyles()}
        ${seat.type === 'couple' ? 'col-span-2' : ''}
      `}
      title={`${seat.id} - ${seat.type.toUpperCase()} - ₫${seat.price.toLocaleString()}`}
    >
      {isSelected && <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />}
      {seat.status === 'sold' && <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />}
      {seat.status === 'available' && !isSelected && (
        <span className="text-[10px] sm:text-xs opacity-70">{seat.id}</span>
      )}
    </button>
  );
};

export default SeatItem;