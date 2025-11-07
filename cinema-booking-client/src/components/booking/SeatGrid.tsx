import type { Seat } from '../../interfaces/Cinema';
import SeatItem from './SeatItem';

interface SeatGridProps {
  seats: Seat[];
  selectedSeats: Seat[];
  onSeatSelect: (seat: Seat) => void;
}

const SeatGrid = ({ seats, selectedSeats, onSeatSelect }: SeatGridProps) => {
  // Group seats by row
  const groupedSeats = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {} as Record<string, Seat[]>);

  return (
    <div className="space-y-2 sm:space-y-3 overflow-x-auto pb-4">
      <div className="min-w-max">
        {Object.keys(groupedSeats).sort().map((row) => (
          <div key={row} className="flex items-center gap-2 justify-center mb-2 sm:mb-3">
            {/* Row Label Left */}
            <span className="w-6 sm:w-8 text-center font-bold text-sm sm:text-base text-gray-600 dark:text-gray-400">
              {row}
            </span>
            
            {/* Seats */}
            <div 
              className="grid gap-1 sm:gap-2" 
              style={{ gridTemplateColumns: `repeat(${groupedSeats[row].length}, minmax(0, 1fr))` }}
            >
              {groupedSeats[row].map((seat) => (
                <SeatItem
                  key={seat.id}
                  seat={seat}
                  onSelect={onSeatSelect}
                  isSelected={selectedSeats.some(s => s.id === seat.id)}
                />
              ))}
            </div>
            
            {/* Row Label Right */}
            <span className="w-6 sm:w-8 text-center font-bold text-sm sm:text-base text-gray-600 dark:text-gray-400">
              {row}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatGrid;