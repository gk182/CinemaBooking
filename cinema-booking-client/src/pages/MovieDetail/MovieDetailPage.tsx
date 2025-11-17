import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, ChevronRight, X } from 'lucide-react';
import MovieBanner from '../../components/movie/MovieBanner';
import MovieInfo from '../../components/movie/MovieInfo';
import RatingDisplay from '../../components/movie/RatingDisplay';
import DateSelector from '../../components/booking/DateSelector';
// import ShowtimeCard from '../../components/booking/ShowtimeCard';
import Tabs from '../../components/common/Tabs';
import Loading from '../../components/common/Loading';
import Button from '../../components/common/Button';
import type { Movie } from '../../interfaces/Movie';
import type { Showtime } from '../../interfaces/Showtime';
import type { Cinema } from '../../interfaces/Cinema';
import  { movieApi }  from '../../api/movieApi';

// import { mockMovies } from '../../assets/mock/movies';

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedCinema, setSelectedCinema] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    if (id) {
      fetchMovieDetails(id);
      fetchShowtimes(id, selectedDate, selectedCinema);
    }
  }, [id, selectedDate, selectedCinema]);

  const fetchMovieDetails = async (movieId: string) => {
    try {
      setLoading(true);
      // Mock data
      // const mockMovie = mockMovies.find(m => m.id === movieId);
      // if (mockMovie) {
      //   setMovie(mockMovie as Movie);
      // }
      const data = await movieApi.getById(movieId);
      setMovie(data);
    } catch (error) {
      console.error('Failed to fetch movie:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchShowtimes = async (movieId: string, date: string, cinemaId: string) => {
    try {
      // TODO: Replace with actual API call
      // const response = await showtimeApi.getByMovie(movieId, date, cinemaId);
      
      // Mock showtimes
      const mockShowtimes: Showtime[] = [
        {
          id: 'st1',
          movieId,
          roomId: 'r1',
          cinemaId: 'c1',
          startTime: '10:00',
          endTime: '12:30',
          date,
          availableSeats: 85,
          basePrice: 80000,
          cinema: {
            id: 'c1',
            name: 'CGV Vincom Da Nang',
            address: '123 Main St',
            city: 'Da Nang',
            phone: '0236-123-4567',
            rooms: []
          },
          room: {
            id: 'r1',
            cinemaId: 'c1',
            name: 'Screen 1',
            capacity: 100,
            rows: 10,
            seatsPerRow: 14,
            seatMap: []
          }
        },
        {
          id: 'st2',
          movieId,
          roomId: 'r1',
          cinemaId: 'c1',
          startTime: '14:00',
          endTime: '16:30',
          date,
          availableSeats: 92,
          basePrice: 80000,
          cinema: {
            id: 'c1',
            name: 'CGV Vincom Da Nang',
            address: '123 Main St',
            city: 'Da Nang',
            phone: '0236-123-4567',
            rooms: []
          },
          room: {
            id: 'r1',
            cinemaId: 'c1',
            name: 'Screen 1',
            capacity: 100,
            rows: 10,
            seatsPerRow: 14,
            seatMap: []
          }
        },
        {
          id: 'st3',
          movieId,
          roomId: 'r2',
          cinemaId: 'c1',
          startTime: '19:30',
          endTime: '22:00',
          date,
          availableSeats: 45,
          basePrice: 100000,
          cinema: {
            id: 'c1',
            name: 'CGV Vincom Da Nang',
            address: '123 Main St',
            city: 'Da Nang',
            phone: '0236-123-4567',
            rooms: []
          },
          room: {
            id: 'r2',
            cinemaId: 'c1',
            name: 'IMAX Hall',
            capacity: 150,
            rows: 12,
            seatsPerRow: 16,
            seatMap: []
          }
        },
        {
          id: 'st4',
          movieId,
          roomId: 'r3',
          cinemaId: 'c2',
          startTime: '13:00',
          endTime: '15:30',
          date,
          availableSeats: 78,
          basePrice: 80000,
          cinema: {
            id: 'c2',
            name: 'Lotte Cinema',
            address: '456 Second St',
            city: 'Da Nang',
            phone: '0236-234-5678',
            rooms: []
          },
          room: {
            id: 'r3',
            cinemaId: 'c2',
            name: 'Screen 2',
            capacity: 100,
            rows: 10,
            seatsPerRow: 14,
            seatMap: []
          }
        }
      ];

      // Filter by cinema if selected
      const filtered = cinemaId === 'all' 
        ? mockShowtimes 
        : mockShowtimes.filter(st => st.cinemaId === cinemaId);

      setShowtimes(filtered);

      // Extract unique cinemas
      const uniqueCinemas = Array.from(
        new Map(mockShowtimes.map(st => [st.cinema!.id, st.cinema!])).values()
      );
      setCinemas(uniqueCinemas as Cinema[]);
    } catch (error) {
      console.error('Failed to fetch showtimes:', error);
    }
  };

  const handleBookShowtime = (showtimeId: string) => {
    navigate(`/booking/${showtimeId}`);
  };

  // Group showtimes by cinema
  const groupedShowtimes = showtimes.reduce((acc, showtime) => {
    const cinemaName = showtime.cinema?.name || 'Unknown Cinema';
    if (!acc[cinemaName]) {
      acc[cinemaName] = [];
    }
    acc[cinemaName].push(showtime);
    return acc;
  }, {} as Record<string, Showtime[]>);

  if (loading) {
    return <Loading fullScreen text="Loading movie details..." />;
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">Movie not found</p>
          <Button onClick={() => navigate('/')}>Return to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Movie Banner */}
      <MovieBanner 
        movie={movie} 
        onPlayTrailer={() => setShowTrailer(true)}
      />

      {/* Trailer Modal */}
      {showTrailer && movie.trailerUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
          <button
            onClick={() => setShowTrailer(false)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="w-full max-w-5xl aspect-video">
            <iframe
              src={movie.trailerUrl.replace('watch?v=', 'embed/')}
              className="w-full h-full rounded-xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs
          tabs={[
            {
              id: 'showtimes',
              label: 'Showtimes',
              icon: <Calendar className="w-4 h-4" />,
              content: (
                <div className="space-y-6">
                  {/* Date Selector */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Select Date
                    </h3>
                    <DateSelector
                      selectedDate={selectedDate}
                      onDateChange={setSelectedDate}
                    />
                  </div>

                  {/* Cinema Filter */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Select Cinema
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => setSelectedCinema('all')}
                        className={`px-6 py-3 rounded-lg font-medium transition-all ${
                          selectedCinema === 'all'
                            ? 'bg-red-600 text-white shadow-md'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-red-300'
                        }`}
                      >
                        All Cinemas
                      </button>
                      {cinemas.map((cinema) => (
                        <button
                          key={cinema.id}
                          onClick={() => setSelectedCinema(cinema.id)}
                          className={`px-6 py-3 rounded-lg font-medium transition-all ${
                            selectedCinema === cinema.id
                              ? 'bg-red-600 text-white shadow-md'
                              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-red-300'
                          }`}
                        >
                          {cinema.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Showtimes by Cinema */}
                  {showtimes.length === 0 ? (
                    <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
                      <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-xl text-gray-500 dark:text-gray-400">
                        No showtimes available for this date
                      </p>
                      <p className="text-gray-400 dark:text-gray-500 mt-2">
                        Please select another date
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {Object.entries(groupedShowtimes).map(([cinemaName, times]) => (
                        <div key={cinemaName} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                          <div className="flex items-center gap-3 mb-4">
                            <MapPin className="w-5 h-5 text-red-600" />
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {cinemaName}
                            </h4>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {times.map((showtime) => (
                              <div
                                key={showtime.id}
                                className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-red-500 dark:hover:border-red-500 transition-all cursor-pointer"
                                onClick={() => handleBookShowtime(showtime.id)}
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-red-600" />
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                      {showtime.startTime}
                                    </span>
                                  </div>
                                  {showtime.availableSeats <= 20 && (
                                    <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 px-2 py-1 rounded-full font-medium">
                                      {showtime.availableSeats} left
                                    </span>
                                  )}
                                </div>
                                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                  <p>{showtime.room?.name}</p>
                                  <p className="font-semibold text-gray-900 dark:text-white">
                                    From ₫{showtime.basePrice.toLocaleString()}
                                  </p>
                                </div>
                                <button className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                                  Book Now
                                  <ChevronRight className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            },
            {
              id: 'info',
              label: 'Information',
              content: <MovieInfo movie={movie} />
            },
            {
              id: 'reviews',
              label: 'Reviews',
              content: (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center">
                  <div className="max-w-md mx-auto">
                    <RatingDisplay rating={movie.rating} size="lg" />
                    <p className="text-gray-600 dark:text-gray-400 mt-4">
                      Reviews feature coming soon!
                    </p>
                  </div>
                </div>
              )
            }
          ]}
          defaultTab="showtimes"
        />
      </div>
    </div>
  );
};

export default MovieDetailPage;