import { useState } from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';

interface ShowtimeFormData {
  movieId: string;
  roomId: string;
  date: string;
  startTime: string;
  basePrice: number;
}

interface ShowtimeFormProps {
  movies: Array<{ id: string; title: string }>;
  rooms: Array<{ id: string; name: string; cinemaName: string }>;
  onSubmit: (data: ShowtimeFormData) => void;
  onCancel: () => void;
}

const ShowtimeForm = ({ movies, rooms, onSubmit, onCancel }: ShowtimeFormProps) => {
  const [formData, setFormData] = useState<ShowtimeFormData>({
    movieId: movies[0]?.id || '',
    roomId: rooms[0]?.id || '',
    date: new Date().toISOString().split('T')[0],
    startTime: '19:00',
    basePrice: 80000
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Select
        label="Movie"
        value={formData.movieId}
        onChange={(e) => setFormData({ ...formData, movieId: e.target.value })}
        options={movies.map(m => ({ value: m.id, label: m.title }))}
      />

      <Select
        label="Room"
        value={formData.roomId}
        onChange={(e) => setFormData({ ...formData, roomId: e.target.value })}
        options={rooms.map(r => ({ 
          value: r.id, 
          label: `${r.cinemaName} - ${r.name}` 
        }))}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Date"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          min={new Date().toISOString().split('T')[0]}
          required
        />

        <Input
          label="Start Time"
          type="time"
          value={formData.startTime}
          onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
          required
        />
      </div>

      <Input
        label="Base Price (VND)"
        type="number"
        value={formData.basePrice}
        onChange={(e) => setFormData({ ...formData, basePrice: parseInt(e.target.value) })}
        min="0"
        step="1000"
        required
      />

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Create Showtime
        </Button>
      </div>
    </form>
  );
};

export default ShowtimeForm;