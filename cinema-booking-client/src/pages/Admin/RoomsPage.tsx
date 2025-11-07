import { useState, useEffect } from 'react';
import { Plus, Edit, Trash, DoorOpen, Users } from 'lucide-react';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import RoomForm from '../../components/admin/RoomForm';
import SeatMapEditor from '../../components/admin/SeatMapEditor';
import Card from '../../components/common/Card';
import { useModal } from '../../hooks/useModal';
import type { Room, Cinema } from '../../interfaces/Cinema';

const RoomsPage = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [editingSeatMap, setEditingSeatMap] = useState<Room | null>(null);
  
  const formModal = useModal();
  const seatMapModal = useModal();

  useEffect(() => {
    fetchRooms();
    fetchCinemas();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      // TODO: API call
      // const data = await roomApi.getAll();
      
      // Mock data
      const mockRooms: Room[] = [
        {
          id: 'r1',
          cinemaId: 'c1',
          name: 'Screen 1',
          capacity: 140,
          rows: 10,
          seatsPerRow: 14,
          seatMap: []
        },
        {
          id: 'r2',
          cinemaId: 'c1',
          name: 'IMAX Hall',
          capacity: 192,
          rows: 12,
          seatsPerRow: 16,
          seatMap: []
        },
        {
          id: 'r3',
          cinemaId: 'c2',
          name: 'Screen 2',
          capacity: 96,
          rows: 8,
          seatsPerRow: 12,
          seatMap: []
        }
      ];
      setRooms(mockRooms);
    } catch (error) {
      console.error('Failed to fetch rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCinemas = async () => {
    // TODO: API call
    const mockCinemas: Cinema[] = [
      { id: 'c1', name: 'CGV Vincom Da Nang', address: '', city: '', phone: '', rooms: [] },
      { id: 'c2', name: 'CGV Lotte Mart', address: '', city: '', phone: '', rooms: [] }
    ];
    setCinemas(mockCinemas);
  };

  const handleCreate = () => {
    setEditingRoom(null);
    formModal.open();
  };

  const handleEdit = (room: Room) => {
    setEditingRoom(room);
    formModal.open();
  };

  const handleEditSeatMap = (room: Room) => {
    setEditingSeatMap(room);
    seatMapModal.open();
  };

  const handleDelete = async (roomId: string) => {
    if (!confirm('Are you sure you want to delete this room?')) return;
    
    try {
      // await roomApi.delete(roomId);
      alert('Room deleted successfully');
      fetchRooms();
    } catch (error) {
      console.error('Failed to delete room:', error);
    }
  };

  const handleSubmit = async (data: Partial<Room>) => {
    try {
      if (editingRoom) {
        // await roomApi.update(editingRoom.id, data);
      } else {
        // await roomApi.create(data);
      }
      alert('Room saved successfully!');
      formModal.close();
      fetchRooms();
    } catch (error) {
      console.error('Failed to save room:', error);
    }
  };

  const handleSaveSeatMap = async (seatMap: any[]) => {
    if (!editingSeatMap) return;
    
    try {
      // await roomApi.updateSeatMap(editingSeatMap.id, seatMap);
      alert('Seat map updated successfully!');
      seatMapModal.close();
      fetchRooms();
    } catch (error) {
      console.error('Failed to update seat map:', error);
    }
  };

  return (
    <div className="p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Cinema Rooms</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage screening rooms and seat layouts
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="w-5 h-5" />
          Add Room
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <DoorOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{rooms.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Rooms</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Users className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {rooms.reduce((sum, room) => sum + room.capacity, 0)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Capacity</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <DoorOpen className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.round(rooms.reduce((sum, room) => sum + room.capacity, 0) / rooms.length || 0)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg per Room</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Table */}
      <Card padding="none">
        <Table
          data={rooms}
          columns={[
            { 
              header: 'Room Name', 
              accessor: (row) => (
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{row.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {cinemas.find(c => c.id === row.cinemaId)?.name}
                  </p>
                </div>
              )
            },
            { 
              header: 'Layout', 
              accessor: (row) => `${row.rows} × ${row.seatsPerRow}` 
            },
            { 
              header: 'Capacity', 
              accessor: (row) => (
                <span className="font-semibold">{row.capacity} seats</span>
              )
            },
            {
              header: 'Actions',
              accessor: (row) => (
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="secondary"
                    onClick={() => handleEditSeatMap(row)}
                  >
                    <DoorOpen className="w-4 h-4" />
                    Seat Map
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
          emptyMessage="No rooms found"
        />
      </Card>

      {/* Room Form Modal */}
      {formModal.isOpen && (
        <Modal
          isOpen
          onClose={formModal.close}
          title={editingRoom ? 'Edit Room' : 'Add New Room'}
          size="lg"
        >
          <RoomForm
            room={editingRoom || undefined}
            cinemas={cinemas}
            onSubmit={handleSubmit}
            onCancel={formModal.close}
          />
        </Modal>
      )}

      {/* Seat Map Editor Modal */}
      {seatMapModal.isOpen && editingSeatMap && (
        <Modal
          isOpen
          onClose={seatMapModal.close}
          title={`Edit Seat Map - ${editingSeatMap.name}`}
          size="xl"
        >
          <SeatMapEditor
            rows={editingSeatMap.rows}
            seatsPerRow={editingSeatMap.seatsPerRow}
            initialSeatMap={
              editingSeatMap.seatMap
                ? editingSeatMap.seatMap.flat().map((seat, idx) => {
                    const defaultRow = String(Math.floor(idx / editingSeatMap.seatsPerRow) + 1);
                    const defaultNumber = (idx % editingSeatMap.seatsPerRow) + 1;
                    return {
                      ...seat,
                      row: seat.row !== undefined ? String(seat.row) : defaultRow,
                      number: seat.number !== undefined ? seat.number : defaultNumber,
                      type: seat.type !== undefined ? seat.type : 'standard',
                    };
                  })
                : []
            }
            onSave={handleSaveSeatMap}
            onCancel={seatMapModal.close}
          />
        </Modal>
      )}
    </div>
  );
};

export default RoomsPage;