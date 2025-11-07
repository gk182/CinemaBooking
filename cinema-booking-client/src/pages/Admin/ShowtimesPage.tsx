import { useState, useEffect } from 'react';
import { Plus, Calendar, Clock, Film, Trash } from 'lucide-react';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import ShowtimeForm from '../../components/admin/ShowtimeForm';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import DateSelector from '../../components/booking/DateSelector';
import { useModal } from '../../hooks/useModal';
import type { Room } from '../../interfaces/Cinema';
import type { Movie } from '../../interfaces/Movie';
import type { Showtime} from '../../interfaces/Showtime';


const ShowtimesPage = () => {
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  
  const formModal = useModal();

  useEffect(() => {
    fetchShowtimes(selectedDate);
    fetchMovies();
    fetchRooms();
  }, [selectedDate]);

  const fetchShowtimes = async (date: string) => {
    setLoading(true);
    try {
      // TODO: API call
      // const data = await showtimeApi.getByDate(date);
      
      // Mock data
      const mockShowtimes: Showtime[] = [
        {
          id: 'st1',
          movieId: '1',
          roomId: 'r1',
          cinemaId: 'c1',
          startTime: '10:00',
          endTime: '12:30',
          date,
          availableSeats: 140,
          basePrice: 80000
        },
        {
          id: 'st2',
          movieId: '2',
          roomId: 'r2',
          cinemaId: 'c1',
          startTime: '14:00',
          endTime: '16:35',
          date,
          availableSeats: 192,
          basePrice: 100000
        }
      ];
      setShowtimes(mockShowtimes);
    } catch (error) {
      console.error('Failed to fetch showtimes:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMovies = async () => {
    // Mock data
    const mockMovies: Movie[] = [
      { id: '1', title: 'Inception', posterUrl: '', description: '', duration: 148, releaseDate: '', genres: [], rating: 8.8, language: '', director: '', cast: [], ageRating: '', status: 'now_showing' },
      { id: '2', title: 'The Dark Knight', posterUrl: '', description: '', duration: 152, releaseDate: '', genres: [], rating: 9.0, language: '', director: '', cast: [], ageRating: '', status: 'now_showing' }
    ];
    setMovies(mockMovies);
  };

  const fetchRooms = async () => {
    // Mock data
    const mockRooms: Room[] = [
      { id: 'r1', cinemaId: 'c1', name: 'Screen 1 - CGV Vincom', capacity: 140, rows: 10, seatsPerRow: 14, seatMap: [] },
      { id: 'r2', cinemaId: 'c1', name: 'IMAX Hall - CGV Vincom', capacity: 192, rows: 12, seatsPerRow: 16, seatMap: [] }
    ];
    setRooms(mockRooms);
  };

  const handleCreate = () => {
    formModal.open();
  };

  const handleDelete = async (showtimeId: string) => {
    if (!confirm('Are you sure you want to delete this showtime?')) return;
    
    try {
      // await showtimeApi.delete(showtimeId);
      alert('Showtime deleted successfully');
      fetchShowtimes(selectedDate);
    } catch (error) {
      console.error('Failed to delete showtime:', error);
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      // await showtimeApi.create(data);
      alert('Showtime created successfully!');
      formModal.close();
      fetchShowtimes(selectedDate);
    } catch (error) {
      console.error('Failed to create showtime:', error);
    }
  };

  // Group showtimes by time
  const sortedShowtimes = [...showtimes].sort((a, b) => 
    a.startTime.localeCompare(b.startTime)
  );

  return (
    <div className="p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Showtimes</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Schedule and manage movie showtimes
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="w-5 h-5" />
          Add Showtime
        </Button>
      </div>

      {/* Date Selector */}
      <div className="mb-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Select Date
          </h3>
          <DateSelector
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
        </Card>
      </div>

      {/* Showtimes Timeline */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full mx-auto"></div>
        </div>
      ) : showtimes.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-500 dark:text-gray-400">
              No showtimes scheduled for this date
            </p>
            <Button onClick={handleCreate} className="mt-4">
              Create First Showtime
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {sortedShowtimes.map((showtime) => {
            const movie = movies.find(m => m.id === showtime.movieId);
            const room = rooms.find(r => r.id === showtime.roomId);
            
            return (
              <Card key={showtime.id}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-600">
                        {showtime.startTime}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {showtime.endTime}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Film className="w-5 h-5 text-gray-400" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {movie?.title || 'Unknown Movie'}
                        </h3>
                        <Badge variant="info">{movie?.duration} min</Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>🎬 {room?.name}</span>
                        <span>💺 {showtime.availableSeats} seats</span>
                        <span>💰 ₫{showtime.basePrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(showtime.id)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Create Showtime Modal */}
      {formModal.isOpen && (
        <Modal
          isOpen
          onClose={formModal.close}
          title="Create New Showtime"
          size="lg"
        >
          <ShowtimeForm
            movies={movies}
            rooms={rooms.map(r => ({
              id: r.id,
              name: r.name,
              // If you have a cinemas state, replace the fallback below with the real cinema name lookup.
              cinemaName: (r as any).cinemaName ?? r.cinemaId ?? '',
            }))}
            onSubmit={handleSubmit}
            onCancel={formModal.close}
          />
        </Modal>
      )}
    </div>
  );
};

export default ShowtimesPage;
