import { Calendar, Clock, User, Users as Cast, Film } from 'lucide-react';
import type { Movie } from '../../interfaces/Movie';

interface MovieInfoProps {
  movie: Movie;
}

const MovieInfo = ({ movie }: MovieInfoProps) => {
  const infoItems = [
    { icon: Calendar, label: 'Release Date', value: new Date(movie.releaseDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) },
    { icon: Clock, label: 'Duration', value: `${movie.duration} minutes` },
    { icon: User, label: 'Director', value: movie.director },
    { icon: Film, label: 'Language', value: movie.language }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Movie Information</h2>
      
      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        {infoItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-start gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <Icon className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
                <p className="font-medium text-gray-900 dark:text-white">{item.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cast */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <div className="flex items-center gap-2 mb-3">
          <Cast className="w-5 h-5 text-gray-400" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Cast</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {movie.cast.map((actor, idx) => (
            <span 
              key={idx}
              className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-lg text-sm"
            >
              {actor}
            </span>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Synopsis</h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {movie.description}
        </p>
      </div>
    </div>
  );
};

export default MovieInfo;