import { useState, useEffect } from 'react';
import { Plus, Edit, Trash, Eye, Search, Filter } from 'lucide-react';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import MovieForm from '../../components/admin/MovieForm';
import Badge from '../../components/common/Badge';
import Card from '../../components/common/Card';
import SearchBar from '../../components/common/SearchBar';
import Pagination from '../../components/common/Pagination';
import { useModal } from '../../hooks/useModal';
import { useDebounce } from '../../hooks/useDebounce';
import type { Movie } from '../../interfaces/Movie';
import { movieApi } from '../../api/movieApi.ts';

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  const formModal = useModal();
  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    filterMovies();
  }, [movies, debouncedSearch, statusFilter]);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // const data = await movieApi.getAll();
      const movies = await movieApi.getAll();
      setMovies(movies);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterMovies = () => {
    let filtered = [...movies];

    // Search filter
    if (debouncedSearch) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        movie.director.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(movie => movie.status === statusFilter);
    }

    setFilteredMovies(filtered);
    setCurrentPage(1);
  };

  const handleCreate = () => {
    setEditingMovie(null);
    formModal.open();
  };

  const handleEdit = (movie: Movie) => {
    setEditingMovie(movie);
    formModal.open();
  };

  const handleDelete = async (movieId: string) => {
    if (!confirm('Are you sure you want to delete this movie?')) return;
    
    try {
      // await movieApi.delete(movieId);
      await movieApi.delete(movieId);
      alert('Movie deleted successfully');
      fetchMovies();
    } catch (error) {
      console.error('Failed to delete movie:', error);
    }
  };

  const handleSubmit = async (data: Partial<Movie>) => {
    try {
      if (editingMovie) {
        // await movieApi.update(editingMovie.id, data);
        await movieApi.update(editingMovie.id,data);
        alert('Movie updated successfully!');
      } else {
        // await movieApi.create(data);
        console.log(data);
        await movieApi.create(data);
        
        alert('Movie created successfully!');
      }
      formModal.close();
      fetchMovies();
    } catch (error) {
      console.error('Failed to save movie:', error);
    }
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);

  const stats = {
    total: movies.length,
    nowShowing: movies.filter(m => m.status === 'now_showing').length,
    comingSoon: movies.filter(m => m.status === 'coming_soon').length,
    ended: movies.filter(m => m.status === 'ended').length
  };

  return (
    <div className="p-4 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Movies Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your movie catalog
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="w-5 h-5" />
          Add Movie
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Movies</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">{stats.nowShowing}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Now Showing</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-yellow-600">{stats.comingSoon}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Coming Soon</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-600">{stats.ended}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Ended</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              placeholder="Search by title or director..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClear={() => setSearchQuery('')}
            />
          </div>
          <div className="flex gap-2">
            {['all', 'now_showing', 'coming_soon', 'ended'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  statusFilter === status
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {status === 'all' ? 'All' : status.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card padding="none">
        <Table
          data={currentMovies}
          columns={[
            {
              header: 'Movie',
              accessor: (row) => (
                <div className="flex items-center gap-3">
                  <img
                    src={row.posterUrl}
                    alt={row.title}
                    className="w-12 h-16 rounded object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{row.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{row.director}</p>
                  </div>
                </div>
              )
            },
            {
              header: 'Genre',
              accessor: (row) => row.genres.slice(0, 2).join(', ')
            },
            {
              header: 'Duration',
              accessor: (row) => `${row.durationMinutes} min`
            },
            {
              header: 'Rating',
              accessor: (row) => (
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">⭐</span>
                  <span className="font-semibold">{row.rating}</span>
                </div>
              )
            },
            {
              header: 'Status',
              accessor: (row) => (
                <Badge variant={
                  row.status === 'now_showing' ? 'success' :
                  row.status === 'coming_soon' ? 'warning' :
                  'default'
                }>
                  {row.status.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </Badge>
              )
            },
            {
              header: 'Actions',
              accessor: (row) => (
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="secondary"
                    onClick={() => window.open(`/movies/${row.id}`, '_blank')}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="secondary"
                    onClick={() => handleEdit(row)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="danger"
                    onClick={() => handleDelete(row.id)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              )
            }
          ]}
          keyExtractor={(row) => row.id}
          loading={loading}
          emptyMessage="No movies found"
        />
        
        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredMovies.length}
          />
        )}
      </Card>

      {/* Movie Form Modal */}
      {formModal.isOpen && (
        <Modal
          isOpen
          onClose={formModal.close}
          title={editingMovie ? 'Edit Movie' : 'Add New Movie'}
          size="xl"
        >
          <MovieForm
            movie={editingMovie || undefined}
            onSubmit={handleSubmit}
            onCancel={formModal.close}
          />
        </Modal>
      )}
    </div>
  );
};

export default MoviesPage;