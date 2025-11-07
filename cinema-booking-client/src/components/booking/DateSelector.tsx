import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DateSelectorProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  availableDates?: string[];
}

const DateSelector = ({ selectedDate, onDateChange, availableDates }: DateSelectorProps) => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleDates = 7;

  // Generate dates for next 30 days if not provided
  const dates = availableDates || Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toISOString().split('T')[0];
  });

  const visibleDateSlice = dates.slice(startIndex, startIndex + visibleDates);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return { label: 'Today', day: date.getDate(), month: date.toLocaleDateString('en-US', { month: 'short' }) };
    }
    if (date.toDateString() === tomorrow.toDateString()) {
      return { label: 'Tomorrow', day: date.getDate(), month: date.toLocaleDateString('en-US', { month: 'short' }) };
    }
    return {
      label: date.toLocaleDateString('en-US', { weekday: 'short' }),
      day: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' })
    };
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setStartIndex(Math.max(0, startIndex - 1))}
        disabled={startIndex === 0}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </button>

      <div className="flex gap-2 overflow-hidden">
        {visibleDateSlice.map((dateStr) => {
          const { label, day, month } = formatDate(dateStr);
          const isSelected = dateStr === selectedDate;

          return (
            <button
              key={dateStr}
              onClick={() => onDateChange(dateStr)}
              className={`
                flex flex-col items-center px-4 py-3 rounded-lg min-w-[80px] transition-all
                ${isSelected
                  ? 'bg-red-600 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }
              `}
            >
              <span className="text-xs font-medium">{label}</span>
              <span className="text-2xl font-bold">{day}</span>
              <span className="text-xs">{month}</span>
            </button>
          );
        })}
      </div>

      <button
        onClick={() => setStartIndex(Math.min(dates.length - visibleDates, startIndex + 1))}
        disabled={startIndex >= dates.length - visibleDates}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </button>
    </div>
  );
};

export default DateSelector;