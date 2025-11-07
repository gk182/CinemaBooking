import { Star } from 'lucide-react';

interface RatingDisplayProps {
  rating: number;
  maxRating?: number;
  showNumber?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const RatingDisplay = ({ 
  rating, 
  maxRating = 10, 
  showNumber = true,
  size = 'md'
}: RatingDisplayProps) => {
  const starCount = 5;
  const normalizedRating = (rating / maxRating) * starCount;
  
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[...Array(starCount)].map((_, index) => {
          const fillPercentage = Math.min(Math.max(normalizedRating - index, 0), 1) * 100;
          
          return (
            <div key={index} className="relative">
              <Star className={`${sizes[size]} text-gray-300 dark:text-gray-600`} />
              <div 
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fillPercentage}%` }}
              >
                <Star className={`${sizes[size]} text-yellow-400 fill-yellow-400`} />
              </div>
            </div>
          );
        })}
      </div>
      {showNumber && (
        <span className={`font-semibold text-gray-900 dark:text-white ${textSizes[size]}`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default RatingDisplay;