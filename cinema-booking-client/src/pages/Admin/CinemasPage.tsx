import { useState, useEffect } from 'react';
import { Plus, MapPin, Phone, Edit, Trash } from 'lucide-react';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import type { Cinema } from '../../interfaces/Cinema';

const CinemasPage = () => {
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCinemas();
  }, []);

  const fetchCinemas = async () => {
    setLoading(true);
    try {
      // TODO: API call
      const mockCinemas: Cinema[] = [
        {
          id: 'c1',
          name: 'CGV Vincom Da Nang',
          address: '123 Main Street, Hai Chau District',
          city: 'Da Nang',
          phone: '0236-123-4567',
          rooms: []
        },
        {
          id: 'c2',
          name: 'CGV Lotte Mart',
          address: '456 Second Street, Thanh Khe District',
          city: 'Da Nang',
          phone: '0236-234-5678',
          rooms: []
        },
        {
          id: 'c3',
          name: 'Lotte Cinema',
          address: '789 Third Street, Son Tra District',
          city: 'Da Nang',
          phone: '0236-345-6789',
          rooms: []
        }
      ];
      setCinemas(mockCinemas);
    } catch (error) {
      console.error('Failed to fetch cinemas:', error);
    } finally {
      setLoading(false);
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
        <Button>
          <Plus className="w-5 h-5" />
          Add Cinema
        </Button>
      </div>

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
              header: 'Actions',
              accessor: (row) => (
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="danger">
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
    </div>
  );
};

export default CinemasPage;