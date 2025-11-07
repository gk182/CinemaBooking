import type { ReactNode } from 'react';
import type { Movie } from '../../interfaces/Movie';
import MovieCard from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  emptyMessage?: string;
  emptyAction?: ReactNode;
}

const MovieGrid = ({ movies, emptyMessage = 'No movies found', emptyAction }: MovieGridProps) => {
  if (movies.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
          </svg>
        </div>
        <p className="text-xl text-gray-500 dark:text-gray-400 mb-2">{emptyMessage}</p>
        {emptyAction && (
          <div className="mt-4">
            {emptyAction}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;