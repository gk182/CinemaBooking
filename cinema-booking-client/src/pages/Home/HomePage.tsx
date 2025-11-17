// src/pages/Home/HomePage.tsx
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Film, X } from 'lucide-react';
import MovieGrid from '../../components/movie/MovieGrid';
import GenreFilter from '../../components/movie/GenreFilter';
import SearchBar from '../../components/common/SearchBar';
import Loading from '../../components/common/Loading';
import Button from '../../components/common/Button';
import { useDebounce } from '../../hooks/useDebounce';
import type { Movie } from '../../interfaces/Movie';
import  { movieApi }  from '../../api/movieApi';

const HomePage = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'now_showing' | 'coming_soon'>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'title' | 'releaseDate'>('rating');
  
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch from API
      const data = await movieApi.getAll();
      let moviesArray: Movie[] = [];
      if (Array.isArray(data)) {
        moviesArray = data;
      } else if (data && typeof data === 'object') {
        moviesArray = (data as any).movies ?? (data as any).items ?? (data as any).results ?? [];
      }
      setMovies(moviesArray);
      console.log("get data success");
    } catch (error) {
      console.error('Failed to fetch movies:', error);
      setError('Failed to load movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Extract all unique genres
  const allGenres = useMemo(() => {
    const genres = new Set<string>();
    movies.forEach(movie => {
      if (movie.genres && movie.genres.length > 0) {
        movie.genres.forEach(genre => genres.add(genre));
      }
    });
    return ['All', ...Array.from(genres).sort()];
  }, [movies]);

  // Filter and sort movies
  const filteredMovies = useMemo(() => {
    let filtered = movies;

    // Filter by search query
    if (debouncedSearchQuery) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        (movie.description && movie.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase())) ||
        (movie.director && movie.director.toLowerCase().includes(debouncedSearchQuery.toLowerCase()))
      );
    }

    // Filter by genre
    if (selectedGenre !== 'All') {
      filtered = filtered.filter(movie => movie.genres && movie.genres.includes(selectedGenre));
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(movie => movie.status === selectedStatus);
    }

    // Sort movies
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'releaseDate':
          return new Date(b.releaseDate || 0).getTime() - new Date(a.releaseDate || 0).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [movies, debouncedSearchQuery, selectedGenre, selectedStatus, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedGenre('All');
    setSelectedStatus('all');
    setSortBy('rating');
  };

  const activeFilterCount = [
    searchQuery.length > 0,
    selectedGenre !== 'All',
    selectedStatus !== 'all',
    sortBy !== 'rating'
  ].filter(Boolean).length;

  if (loading) {
    return <Loading fullScreen text="Loading movies..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {error}
          </h2>
          <Button onClick={fetchMovies}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-screen w-full bg-[url('/banner.jpg')] bg-cover bg-center flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-lg mb-4">
            Welcome to <span className="text-red-500">CinemaBook</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
            Experience the best movies in premium comfort
          </p>
          <button
            onClick={() => {
              const target = document.getElementById('movies');
              target?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="mt-6 px-5 py-2 border border-white/80 text-white/90 rounded-full 
                      hover:bg-white/20 backdrop-blur-sm transition-all duration-300 
                      text-sm tracking-wide"
          >
            Explore ↓
          </button>
        </div>
      </section>

      {/* Filters Section */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Left controls: Status + Genre */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Status filter (as segmented control) */}
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-full p-1 text-sm">
              {[
                { value: 'all' as const, label: 'All' },
                { value: 'now_showing' as const, label: 'Now' },
                { value: 'coming_soon' as const, label: 'Soon' }
              ].map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setSelectedStatus(value)}
                  className={`px-3 py-1.5 rounded-full transition-all ${
                    selectedStatus === value
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            {/* Genre dropdown */}
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="px-3 py-1.5 rounded-full text-sm bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 border-none"
            >
              {allGenres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          {/* Right controls: Sort + Clear */}
          <div className="flex items-center gap-3">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 rounded-full text-sm bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 border-none"
            >
              <option value="rating">Rating</option>
              <option value="title">A–Z</option>
              <option value="releaseDate">Date Release</option>
            </select>
            {/* Clear */}
            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Movies Grid */}
      <main id="movies" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {filteredMovies.length} {filteredMovies.length === 1 ? 'Movie' : 'Movies'} Found
          </h3>
        </div>

        {filteredMovies.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Film className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No movies found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Try adjusting your filters or search query
            </p>
            <Button onClick={resetFilters}>
              Reset Filters
            </Button>
          </div>
        ) : (
          <MovieGrid
            movies={filteredMovies}
            emptyMessage="No movies match your criteria"
          />
        )}
      </main>
    </div>
  );
};

export default HomePage;