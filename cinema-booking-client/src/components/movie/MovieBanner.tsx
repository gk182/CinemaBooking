import { Play, Star } from 'lucide-react';
import type { Movie } from '../../interfaces/Movie';

interface MovieBannerProps {
  movie: Movie;
  onPlayTrailer?: () => void;
}

const MovieBanner = ({ movie, onPlayTrailer }: MovieBannerProps) => {
  return (
    <div className="relative h-[500px] lg:h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={movie.bannerUrl || movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl">
          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2 bg-yellow-500 text-white px-3 py-1.5 rounded-lg">
              <Star className="w-5 h-5 fill-white" />
              <span className="font-bold text-lg">{movie.rating}</span>
            </div>
            <span className="text-white/80">{movie.ageRating}</span>
            <span className="text-white/80">•</span>
            <span className="text-white/80">{movie.duration} min</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
            {movie.title}
          </h1>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 mb-6">
            {movie.genres.map((genre, idx) => (
              <span 
                key={idx}
                className="bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-medium"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-white/90 text-lg mb-8 line-clamp-3">
            {movie.description}
          </p>

          {/* Actions */}
          <div className="flex flex-wrap gap-4">
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center gap-2">
              Book Tickets
            </button>
            {movie.trailerUrl && onPlayTrailer && (
              <button 
                onClick={onPlayTrailer}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center gap-2"
              >
                <Play className="w-5 h-5 fill-white" />
                Watch Trailer
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieBanner;