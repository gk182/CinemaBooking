import { useState } from 'react';
// import { X } from 'lucide-react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import type { Movie } from '../../interfaces/Movie';

interface MovieFormProps {
  movie?: Movie;
  onSubmit: (data: Partial<Movie>) => void;
  onCancel: () => void;
}

const MovieForm = ({ movie, onSubmit, onCancel }: MovieFormProps) => {
  const [formData, setFormData] = useState({
    title: movie?.title || '',
    description: movie?.description || '',
    posterUrl: movie?.posterUrl || '',
    duration: movie?.duration || 0,
    releaseDate: movie?.releaseDate || '',
    genres: movie?.genres || [],
    rating: movie?.rating || 0,
    language: movie?.language || '',
    director: movie?.director || '',
    ageRating: movie?.ageRating || 'PG',
    status: movie?.status || 'now_showing'
  });

  const genreOptions = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Thriller', 'Adventure'];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const toggleGenre = (genre: string) => {
    setFormData(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Movie Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        
        <Input
          label="Director"
          value={formData.director}
          onChange={(e) => setFormData({ ...formData, director: e.target.value })}
          required
        />

        <Input
          label="Duration (minutes)"
          type="number"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
          required
        />

        <Input
          label="Release Date"
          type="date"
          value={formData.releaseDate}
          onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
          required
        />

        <Input
          label="Rating (0-10)"
          type="number"
          step="0.1"
          min="0"
          max="10"
          value={formData.rating}
          onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
        />

        <Select
          label="Age Rating"
          value={formData.ageRating}
          onChange={(e) => setFormData({ ...formData, ageRating: e.target.value })}
          options={[
            { value: 'G', label: 'G - General Audience' },
            { value: 'PG', label: 'PG - Parental Guidance' },
            { value: 'PG-13', label: 'PG-13' },
            { value: 'R', label: 'R - Restricted' },
            { value: 'NC-17', label: 'NC-17' }
          ]}
        />

        <Select
          label="Language"
          value={formData.language}
          onChange={(e) => setFormData({ ...formData, language: e.target.value })}
          options={[
            { value: 'English', label: 'English' },
            { value: 'Vietnamese', label: 'Vietnamese' },
            { value: 'Chinese', label: 'Chinese' },
            { value: 'Korean', label: 'Korean' },
            { value: 'Japanese', label: 'Japanese' }
          ]}
        />

        <Select
          label="Status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
          options={[
            { value: 'now_showing', label: 'Now Showing' },
            { value: 'coming_soon', label: 'Coming Soon' },
            { value: 'ended', label: 'Ended' }
          ]}
        />
      </div>

      <Input
        label="Poster URL"
        value={formData.posterUrl}
        onChange={(e) => setFormData({ ...formData, posterUrl: e.target.value })}
        placeholder="https://example.com/poster.jpg"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Genres
        </label>
        <div className="flex flex-wrap gap-2">
          {genreOptions.map((genre) => (
            <button
              key={genre}
              type="button"
              onClick={() => toggleGenre(genre)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${formData.genres.includes(genre)
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }
              `}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {movie ? 'Update Movie' : 'Create Movie'}
        </Button>
      </div>
    </form>
  );
};

export default MovieForm;