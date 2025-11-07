import { useState } from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import type { Room } from '../../interfaces/Cinema';
import { Info } from 'lucide-react';

interface RoomFormProps {
  room?: Room;
  cinemas: Array<{ id: string; name: string }>;
  onSubmit: (data: Partial<Room>) => void;
  onCancel: () => void;
}

const RoomForm = ({ room, cinemas, onSubmit, onCancel }: RoomFormProps) => {
  const [formData, setFormData] = useState({
    name: room?.name || '',
    cinemaId: room?.cinemaId || cinemas[0]?.id || '',
    rows: room?.rows || 10,
    seatsPerRow: room?.seatsPerRow || 14,
    vipRowCount: 2, // Last N rows will be VIP
    coupleSeatsPerVipRow: 2 // Last N seats in VIP rows
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const totalSeats = formData.rows * formData.seatsPerRow;
    
    onSubmit({
      ...formData,
      capacity: totalSeats
    });
  };

  const totalSeats = formData.rows * formData.seatsPerRow;
  const standardSeats = (formData.rows - formData.vipRowCount) * formData.seatsPerRow;
  const vipSeats = (formData.vipRowCount * formData.seatsPerRow) - (formData.vipRowCount * formData.coupleSeatsPerVipRow);
  const coupleSeats = formData.vipRowCount * formData.coupleSeatsPerVipRow;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Room Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g., Screen 1, IMAX Hall"
          required
        />

        <Select
          label="Cinema"
          value={formData.cinemaId}
          onChange={(e) => setFormData({ ...formData, cinemaId: e.target.value })}
          options={cinemas.map(c => ({ value: c.id, label: c.name }))}
        />

        <Input
          label="Number of Rows"
          type="number"
          min="5"
          max="20"
          value={formData.rows}
          onChange={(e) => setFormData({ ...formData, rows: parseInt(e.target.value) })}
          required
        />

        <Input
          label="Seats per Row"
          type="number"
          min="8"
          max="20"
          value={formData.seatsPerRow}
          onChange={(e) => setFormData({ ...formData, seatsPerRow: parseInt(e.target.value) })}
          required
        />

        <Input
          label="VIP Rows (from back)"
          type="number"
          min="0"
          max={formData.rows}
          value={formData.vipRowCount}
          onChange={(e) => setFormData({ ...formData, vipRowCount: parseInt(e.target.value) })}
        />

        <Input
          label="Couple Seats per VIP Row (from end)"
          type="number"
          min="0"
          max={Math.floor(formData.seatsPerRow / 2)}
          step="2"
          value={formData.coupleSeatsPerVipRow}
          onChange={(e) => setFormData({ ...formData, coupleSeatsPerVipRow: parseInt(e.target.value) })}
        />
      </div>

      {/* Seat Layout Preview */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
              Seat Layout Summary
            </h4>
            <div className="space-y-1 text-sm text-blue-800 dark:text-blue-400">
              <p>• Total Capacity: <strong>{totalSeats} seats</strong></p>
              <p>• Standard Seats: <strong>{standardSeats}</strong> (₫80,000 each)</p>
              <p>• VIP Seats: <strong>{vipSeats}</strong> (₫150,000 each)</p>
              <p>• Couple Seats: <strong>{coupleSeats}</strong> (₫200,000 each)</p>
              <p className="mt-2 text-xs text-blue-600 dark:text-blue-500">
                💡 VIP rows will be at the back. Couple seats will be at the end of each VIP row.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Layout Presets */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Quick Presets
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, rows: 6, seatsPerRow: 10, vipRowCount: 1 })}
            className="p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-red-500 dark:hover:border-red-500 transition-colors text-left"
          >
            <p className="font-semibold text-gray-900 dark:text-white">Small</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">6×10 (60 seats)</p>
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, rows: 8, seatsPerRow: 12, vipRowCount: 2 })}
            className="p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-red-500 dark:hover:border-red-500 transition-colors text-left"
          >
            <p className="font-semibold text-gray-900 dark:text-white">Medium</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">8×12 (96 seats)</p>
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, rows: 10, seatsPerRow: 14, vipRowCount: 2 })}
            className="p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-red-500 dark:hover:border-red-500 transition-colors text-left"
          >
            <p className="font-semibold text-gray-900 dark:text-white">Large</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">10×14 (140 seats)</p>
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, rows: 12, seatsPerRow: 16, vipRowCount: 3 })}
            className="p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-red-500 dark:hover:border-red-500 transition-colors text-left"
          >
            <p className="font-semibold text-gray-900 dark:text-white">IMAX</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">12×16 (192 seats)</p>
          </button>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {room ? 'Update Room' : 'Create Room'}
        </Button>
      </div>
    </form>
  );
};

export default RoomForm;