import { Search, X } from 'lucide-react';
import { type InputHTMLAttributes, forwardRef } from 'react';

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
  showClear?: boolean;
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ onClear, showClear = true, className = '', ...props }, ref) => {
    const hasValue = props.value && String(props.value).length > 0;

    return (
      <div className={`relative ${className}`}>
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          ref={ref}
          type="text"
          className="w-full pl-12 pr-12 py-3 border border-gray-300 dark:border-gray-600 
                   rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                   focus:outline-none focus:ring-2 focus:ring-red-500
                   placeholder:text-gray-400"
          {...props}
        />
        {showClear && hasValue && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 
                     hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full
                     transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>
    );
  }
);

export default SearchBar;