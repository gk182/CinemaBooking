import { useState, useEffect } from 'react';
import { Plus, MapPin, Phone, Edit, Trash, Building2 } from 'lucide-react';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Modal from '../../components/common/Modal';
import CinemaForm from '../../components/admin/CinemaForm';
import { useModal } from '../../hooks/useModal';
import type { Cinema } from '../../interfaces/Cinema';
import { cinemaApi } from '../../api/cinemaApi';

const CinemasPage = () => {
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingCinema, setEditingCinema] = useState<Cinema | null>(null);
  
  const formModal = useModal();

  useEffect(() => {
    fetchCinemas();
  }, []);

  const fetchCinemas = async () => {
    setLoading(true);
    try {
      // ================= MOCK data ===============
      // const mockCinemas: Cinema[] = [
      //   {
      //     id: 'c1',
      //     name: 'CGV Vincom Da Nang',
      //     address: '123 Main Street, Hai Chau District',
      //     city: 'Da Nang',
      //     phone: '0236-123-4567',
      //     rooms: []
      //   },
      //   {
      //     id: 'c2',
      //     name: 'CGV Lotte Mart',
      //     address: '456 Second Street, Thanh Khe District',
      //     city: 'Da Nang',
      //     phone: '0236-234-5678',
      //     rooms: []
      //   },
      //   {
      //     id: 'c3',
      //     name: 'Lotte Cinema',
      //     address: '789 Third Street, Son Tra District',
      //     city: 'Da Nang',
      //     phone: '0236-345-6789',
      //     rooms: []
      //   }
      // ];
      // setCinemas(mockCinemas);
      // ===============================================
      const cinemas = await cinemaApi.getAll();
      setCinemas(cinemas);
    } catch (error) {
      console.error('Failed to fetch cinemas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingCinema(null);
    formModal.open();
  };

  const handleEdit = (cinema: Cinema) => {
    setEditingCinema(cinema);
    formModal.open();
  };

  const handleDelete = async (cinemaId: string) => {
    if (!confirm('Are you sure you want to delete this cinema?')) return;
    
    try {
      await cinemaApi.deleteCinema(cinemaId);
      alert('Cinema deleted successfully');
      fetchCinemas();
    } catch (error) {
      console.error('Failed to delete cinema:', error);
      alert('Failed to delete cinema');
    }
  };

  const handleSubmit = async (data: Partial<Cinema>) => {
    try {
      if (editingCinema) {
        await cinemaApi.updateCinema(editingCinema.id, data);
      } else {
        await cinemaApi.createCinema(data);
      }
      alert('Cinema saved successfully!');
      formModal.close();
      fetchCinemas();
    } catch (error) {
      console.error('Failed to save cinema:', error);
      alert('Failed to save cinema');
    }
  };

  return (
    <div className="p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Cinema Branches</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage cinema locations and information
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="w-5 h-5" />
          Add Cinema
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Building2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{cinemas.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Cinemas</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <MapPin className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {new Set(cinemas.map(c => c.city)).size}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Cities Covered</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Phone className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {/* Gọi api của room để đếm phòng */}
                {cinemas.reduce((sum, cinema) => sum + (cinema.rooms?.length || 0), 0)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Rooms</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Table */}
      <Card padding="none">
        <Table
          data={cinemas}
          columns={[
            {
              header: 'Cinema Name',
              accessor: (row) => (
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{row.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{row.city}</p>
                </div>
              )
            },
            {
              header: 'Address',
              accessor: (row) => (
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{row.address}</span>
                </div>
              )
            },
            {
              header: 'Contact',
              accessor: (row) => (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{row.phone}</span>
                </div>
              )
            },
            {
              header: 'Rooms',
              accessor: (row) => (
                <span className="font-semibold text-gray-900 dark:text-white">
                  {row.rooms?.length || 0} rooms
                </span>
              )
            },
            {
              header: 'Actions',
              accessor: (row) => (
                <div className="flex gap-2">
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
          emptyMessage="No cinemas found"
        />
      </Card>

      {/* Cinema Form Modal */}
      {formModal.isOpen && (
        <Modal
          isOpen
          onClose={formModal.close}
          title={editingCinema ? 'Edit Cinema' : 'Add New Cinema'}
          size="lg"
        >
          <CinemaForm
            cinema={editingCinema || undefined}
            onSubmit={handleSubmit}
            onCancel={formModal.close}
          />
        </Modal>
      )}
    </div>
  );
};

export default CinemasPage;