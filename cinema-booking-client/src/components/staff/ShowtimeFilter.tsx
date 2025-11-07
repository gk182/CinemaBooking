import { useState } from 'react';
import { Calendar, MapPin, Filter, X } from 'lucide-react';
import Select from '../common/Select';
import Button from '../common/Button';
import Input from '../common/Input';

interface Cinema {
  id: string;
  name: string;
}

interface ShowtimeFilterProps {
  cinemas: Cinema[];
  onFilter: (filters: {
    date: string;
    cinemaId: string;
    movieTitle?: string;
  }) => void;
  onReset?: () => void;
}

const ShowtimeFilter = ({ cinemas, onFilter, onReset }: ShowtimeFilterProps) => {
  const [filters, setFilters] = useState({
    date: new Date().toISOString().split('T')[0],
    cinemaId: cinemas[0]?.id || '',
    movieTitle: ''
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleApplyFilter = () => {
    onFilter(filters);
  };

  const handleReset = () => {
    const resetFilters = {
      date: new Date().toISOString().split('T')[0],
      cinemaId: cinemas[0]?.id || '',
      movieTitle: ''
    };
    setFilters(resetFilters);
    onReset?.();
  };

  const activeFilterCount = [
    filters.date !== new Date().toISOString().split('T')[0],
    filters.cinemaId !== cinemas[0]?.id,
    filters.movieTitle.length > 0
  ].filter(Boolean).length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Filter Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-gray-400" />
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Filter Showtimes
          </h3>
          {activeFilterCount > 0 && (
            <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-medium px-2 py-1 rounded-full">
              {activeFilterCount} active
            </span>
          )}
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          {isExpanded ? (
            <X className="w-5 h-5 text-gray-500" />
          ) : (
            <Filter className="w-5 h-5 text-gray-500" />
          )}
        </button>
      </div>

      {/* Filter Content */}
      <div className={`p-4 space-y-4 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
        {/* Date Filter */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Calendar className="w-4 h-4" />
            Date
          </label>
          <Input
            type="date"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Cinema Filter */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <MapPin className="w-4 h-4" />
            Cinema
          </label>
          <Select
            value={filters.cinemaId}
            onChange={(e) => setFilters({ ...filters, cinemaId: e.target.value })}
            options={[
              { value: '', label: 'All Cinemas' },
              ...cinemas.map(c => ({ value: c.id, label: c.name }))
            ]}
          />
        </div>

        {/* Movie Title Search */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            Movie Title (Optional)
          </label>
          <Input
            type="text"
            placeholder="Search by movie title..."
            value={filters.movieTitle}
            onChange={(e) => setFilters({ ...filters, movieTitle: e.target.value })}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            onClick={handleApplyFilter}
            className="flex-1"
          >
            Apply Filters
          </Button>
          <Button
            variant="secondary"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShowtimeFilter;