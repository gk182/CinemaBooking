import { useState } from 'react';
import { Users, Sofa, X, RotateCcw, Save } from 'lucide-react';
import Button from '../common/Button';

interface SeatPosition {
  row: string;
  number: number;
  type: 'standard' | 'vip' | 'couple' | 'blocked';
}

interface SeatMapEditorProps {
  rows: number;
  seatsPerRow: number;
  initialSeatMap?: SeatPosition[];
  onSave: (seatMap: SeatPosition[]) => void;
  onCancel: () => void;
}

const SeatMapEditor = ({ 
  rows, 
  seatsPerRow, 
  initialSeatMap,
  onSave, 
  onCancel 
}: SeatMapEditorProps) => {
  const [seatMap, setSeatMap] = useState<SeatPosition[]>(() => {
    if (initialSeatMap) return initialSeatMap;

    // Generate default seat map
    const map: SeatPosition[] = [];
    const rowLabels = Array.from({ length: rows }, (_, i) => String.fromCharCode(65 + i));
    
    rowLabels.forEach((row, rowIndex) => {
      for (let i = 1; i <= seatsPerRow; i++) {
        // Default: last 2 rows are VIP, last 2 seats in VIP rows are couple
        const isVip = rowIndex >= rows - 2;
        const isCouple = isVip && (i === seatsPerRow - 1 || i === seatsPerRow);
        
        map.push({
          row,
          number: i,
          type: isCouple ? 'couple' : isVip ? 'vip' : 'standard'
        });
      }
    });
    return map;
  });

  const [selectedTool, setSelectedTool] = useState<'standard' | 'vip' | 'couple' | 'blocked'>('standard');

  const rowLabels = Array.from({ length: rows }, (_, i) => String.fromCharCode(65 + i));

  const getSeat = (row: string, number: number) => {
    return seatMap.find(s => s.row === row && s.number === number);
  };

  const updateSeat = (row: string, number: number, type: SeatPosition['type']) => {
    setSeatMap(prev => 
      prev.map(s => 
        s.row === row && s.number === number 
          ? { ...s, type } 
          : s
      )
    );
  };

  const handleSeatClick = (row: string, number: number) => {
    const seat = getSeat(row, number);
    if (seat) {
      updateSeat(row, number, selectedTool);
    }
  };

  const resetToDefault = () => {
    // Reset to default layout
    const map: SeatPosition[] = [];
    rowLabels.forEach((row, rowIndex) => {
      for (let i = 1; i <= seatsPerRow; i++) {
        const isVip = rowIndex >= rows - 2;
        const isCouple = isVip && (i === seatsPerRow - 1 || i === seatsPerRow);
        map.push({
          row,
          number: i,
          type: isCouple ? 'couple' : isVip ? 'vip' : 'standard'
        });
      }
    });
    setSeatMap(map);
  };

  const getSeatStyles = (type: SeatPosition['type']) => {
    switch (type) {
      case 'vip':
        return 'bg-purple-100 dark:bg-purple-900/30 border-2 border-purple-500';
      case 'couple':
        return 'bg-pink-100 dark:bg-pink-900/30 border-2 border-pink-500';
      case 'blocked':
        return 'bg-gray-300 dark:bg-gray-600 opacity-50';
      default:
        return 'bg-green-100 dark:bg-green-900/30 border-2 border-green-500';
    }
  };

  const stats = seatMap.reduce((acc, seat) => {
    acc[seat.type]++;
    return acc;
  }, { standard: 0, vip: 0, couple: 0, blocked: 0 } as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Tools */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Select Tool</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => setSelectedTool('standard')}
            className={`p-3 rounded-lg border-2 transition-all ${
              selectedTool === 'standard'
                ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                : 'border-gray-200 dark:border-gray-700 hover:border-green-300'
            }`}
          >
            <Users className="w-5 h-5 mx-auto mb-1 text-green-600 dark:text-green-400" />
            <p className="text-sm font-medium text-gray-900 dark:text-white">Standard</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">₫80K</p>
          </button>

          <button
            onClick={() => setSelectedTool('vip')}
            className={`p-3 rounded-lg border-2 transition-all ${
              selectedTool === 'vip'
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30'
                : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
            }`}
          >
            <Users className="w-5 h-5 mx-auto mb-1 text-purple-600 dark:text-purple-400" />
            <p className="text-sm font-medium text-gray-900 dark:text-white">VIP</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">₫150K</p>
          </button>

          <button
            onClick={() => setSelectedTool('couple')}
            className={`p-3 rounded-lg border-2 transition-all ${
              selectedTool === 'couple'
                ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/30'
                : 'border-gray-200 dark:border-gray-700 hover:border-pink-300'
            }`}
          >
            <Sofa className="w-5 h-5 mx-auto mb-1 text-pink-600 dark:text-pink-400" />
            <p className="text-sm font-medium text-gray-900 dark:text-white">Couple</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">₫200K</p>
          </button>

          <button
            onClick={() => setSelectedTool('blocked')}
            className={`p-3 rounded-lg border-2 transition-all ${
              selectedTool === 'blocked'
                ? 'border-gray-500 bg-gray-50 dark:bg-gray-700'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
            }`}
          >
            <X className="w-5 h-5 mx-auto mb-1 text-gray-600 dark:text-gray-400" />
            <p className="text-sm font-medium text-gray-900 dark:text-white">Blocked</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Unavailable</p>
          </button>
        </div>
      </div>

      {/* Seat Map */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        {/* Screen */}
        <div className="mb-8">
          <div className="bg-gradient-to-b from-gray-700 via-gray-600 to-gray-500 h-3 rounded-t-full mb-2 shadow-lg"></div>
          <p className="text-center text-xs text-gray-500 dark:text-gray-400 font-medium">SCREEN</p>
        </div>

        {/* Seats Grid */}
        <div className="space-y-2 overflow-x-auto pb-4">
          <div className="min-w-max">
            {rowLabels.map((row) => (
              <div key={row} className="flex items-center gap-2 justify-center mb-2">
                <span className="w-8 text-center font-bold text-sm text-gray-600 dark:text-gray-400">
                  {row}
                </span>
                <div className="flex gap-1">
                  {Array.from({ length: seatsPerRow }, (_, i) => i + 1).map((number) => {
                    const seat = getSeat(row, number);
                    if (!seat) return null;

                    return (
                      <button
                        key={`${row}-${number}`}
                        onClick={() => handleSeatClick(row, number)}
                        className={`
                          w-10 h-10 rounded-lg transition-all hover:scale-110 hover:shadow-md
                          ${getSeatStyles(seat.type)}
                          ${seat.type === 'couple' ? 'w-20' : ''}
                        `}
                        title={`${row}${number} - ${seat.type}`}
                      >
                        <span className="text-xs opacity-70">{row}{number}</span>
                      </button>
                    );
                  })}
                </div>
                <span className="w-8 text-center font-bold text-sm text-gray-600 dark:text-gray-400">
                  {row}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.standard}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Standard Seats</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.vip}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">VIP Seats</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.couple}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Couple Seats</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.blocked}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Blocked</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button
          variant="secondary"
          onClick={resetToDefault}
        >
          <RotateCcw className="w-4 h-4" />
          Reset to Default
        </Button>

        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            onClick={() => onSave(seatMap)}
          >
            <Save className="w-4 h-4" />
            Save Seat Map
          </Button>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
        <p className="text-sm text-blue-800 dark:text-blue-300">
          💡 <strong>Tip:</strong> Click on any seat to change its type. Select a tool from above first, then click seats to apply.
          Couple seats automatically take double width.
        </p>
      </div>
    </div>
  );
};

export default SeatMapEditor;