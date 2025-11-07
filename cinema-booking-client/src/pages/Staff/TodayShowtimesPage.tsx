import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Film } from 'lucide-react';
import ShowtimeFilter from '../../components/staff/ShowtimeFilter';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Loading from '../../components/common/Loading';
import type { Cinema } from '../../interfaces/Cinema';
import type {  Showtime } from '../../interfaces/Showtime';


const TodayShowtimesPage = () => {
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [loading, setLoading] = useState(true);

  const cinemas: Cinema[] = [
    { id: 'c1', name: 'CGV Vincom Da Nang', address: '123 Main St', city: 'Da Nang', phone: '0236-123-4567', rooms: [] },
    { id: 'c2', name: 'CGV Lotte Mart', address: '456 Second St', city: 'Da Nang', phone: '0236-234-5678', rooms: [] },
    { id: 'c3', name: 'Lotte Cinema', address: '789 Third St', city: 'Da Nang', phone: '0236-345-6789', rooms: [] }
  ];

  useEffect(() => {
    fetchTodayShowtimes({ 
      date: new Date().toISOString().split('T')[0], 
      cinemaId: '', 
      movieTitle: '' 
    });
  }, []);

  const fetchTodayShowtimes = async (filters: any) => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // const data = await showtimeApi.getByDate(filters);
      
      // Mock data
      const mockShowtimes: Showtime[] = [
        {
          id: 'st1',
          movieId: '1',
          roomId: 'r1',
          cinemaId: 'c1',
          startTime: '10:00',
          endTime: '12:30',
          date: new Date().toISOString().split('T')[0],
          availableSeats: 85,
          basePrice: 80000,
          movie: {
            id: '1',
            title: 'Inception',
            posterUrl: 'https://via.placeholder.com/80x120/1a1a2e/ffffff?text=Movie',
            description: '',
            duration: 148,
            releaseDate: '2024-01-15',
            genres: ['Action', 'Sci-Fi'],
            rating: 8.8,
            language: 'English',
            director: 'Christopher Nolan',
            cast: [],
            ageRating: 'PG-13',
            status: 'now_showing'
          },
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
          movieId: '2',
          roomId: 'r2',
          cinemaId: 'c1',
          startTime: '14:30',
          endTime: '17:00',
          date: new Date().toISOString().split('T')[0],
          availableSeats: 45,
          basePrice: 100000,
          movie: {
            id: '2',
            title: 'The Dark Knight',
            posterUrl: 'https://via.placeholder.com/80x120/16213e/ffffff?text=Movie',
            description: '',
            duration: 152,
            releaseDate: '2024-02-10',
            genres: ['Action', 'Crime'],
            rating: 9.0,
            language: 'English',
            director: 'Christopher Nolan',
            cast: [],
            ageRating: 'PG-13',
            status: 'now_showing'
          },
          cinema: cinemas[0],
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
          id: 'st3',
          movieId: '1',
          roomId: 'r1',
          cinemaId: 'c1',
          startTime: '19:30',
          endTime: '22:00',
          date: new Date().toISOString().split('T')[0],
          availableSeats: 12,
          basePrice: 80000,
          movie: {
            id: '1',
            title: 'Inception',
            posterUrl: 'https://via.placeholder.com/80x120/1a1a2e/ffffff?text=Movie',
            description: '',
            duration: 148,
            releaseDate: '2024-01-15',
            genres: ['Action', 'Sci-Fi'],
            rating: 8.8,
            language: 'English',
            director: 'Christopher Nolan',
            cast: [],
            ageRating: 'PG-13',
            status: 'now_showing'
          },
          cinema: cinemas[0],
          room: {
            id: 'r1',
            cinemaId: 'c1',
            name: 'Screen 1',
            capacity: 100,
            rows: 10,
            seatsPerRow: 14,
            seatMap: []
          }
        }
      ];

      // Apply filters
      let filtered = mockShowtimes;
      if (filters.cinemaId) {
        filtered = filtered.filter(st => st.cinemaId === filters.cinemaId);
      }
      if (filters.movieTitle) {
        filtered = filtered.filter(st => 
          st.movie?.title.toLowerCase().includes(filters.movieTitle.toLowerCase())
        );
      }

      setShowtimes(filtered);
    } catch (error) {
      console.error('Failed to fetch showtimes:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTimeStatus = (startTime: string) => {
    const now = new Date();
    const [hours, minutes] = startTime.split(':').map(Number);
    const showtimeDate = new Date();
    showtimeDate.setHours(hours, minutes, 0);
    
    const diffMinutes = (showtimeDate.getTime() - now.getTime()) / (1000 * 60);
    
    if (diffMinutes < -30) return { status: 'completed', label: 'Completed', variant: 'default' as const };
    if (diffMinutes < 0) return { status: 'ongoing', label: 'Ongoing', variant: 'warning' as const };
    if (diffMinutes < 30) return { status: 'starting-soon', label: 'Starting Soon', variant: 'error' as const };
    return { status: 'upcoming', label: 'Upcoming', variant: 'success' as const };
  };

  if (loading) {
    return <Loading fullScreen text="Loading showtimes..." />;
  }

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Today's Showtimes
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <ShowtimeFilter
          cinemas={cinemas}
          onFilter={fetchTodayShowtimes}
          onReset={() => fetchTodayShowtimes({ 
            date: new Date().toISOString().split('T')[0], 
            cinemaId: '', 
            movieTitle: '' 
          })}
        />
      </div>

      {/* Showtimes List */}
      {showtimes.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-500 dark:text-gray-400">No showtimes found</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {showtimes.map((showtime) => {
            const timeStatus = getTimeStatus(showtime.startTime);
            return (
              <Card key={showtime.id} hover>
                <div className="flex items-start gap-4">
                  <img
                    src={showtime.movie?.posterUrl}
                    alt={showtime.movie?.title}
                    className="w-20 h-28 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {showtime.movie?.title}
                        </h3>
                        <Badge variant={timeStatus.variant}>
                          {timeStatus.label}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-red-600">
                          {showtime.startTime}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {showtime.endTime}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span>{showtime.cinema?.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Film className="w-4 h-4" />
                        <span>{showtime.room?.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>{showtime.availableSeats} / {showtime.room?.capacity} available</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{showtime.movie?.duration} min</span>
                      </div>
                    </div>

                    {/* Capacity Bar */}
                    <div className="mt-4">
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            showtime.availableSeats / (showtime.room?.capacity || 1) > 0.5
                              ? 'bg-green-500'
                              : showtime.availableSeats / (showtime.room?.capacity || 1) > 0.2
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                          }`}
                          style={{
                            width: `${((showtime.room?.capacity || 0) - showtime.availableSeats) / (showtime.room?.capacity || 1) * 100}%`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TodayShowtimesPage;