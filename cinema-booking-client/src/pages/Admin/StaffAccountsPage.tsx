import { useState, useEffect } from 'react';
import { Plus, Edit, Trash, Shield, User } from 'lucide-react';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import StaffForm from '../../components/admin/StaffForm';
import Badge from '../../components/common/Badge';
import Card from '../../components/common/Card';
import { useModal } from '../../hooks/useModal';
import type { User as UserType } from '../../interfaces/User';

const StaffAccountsPage = () => {
  const [staff, setStaff] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingStaff, setEditingStaff] = useState<UserType | null>(null);
  
  const formModal = useModal();

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    setLoading(true);
    try {
      // TODO: API call
      const mockStaff: UserType[] = [
        {
          id: '1',
          email: 'admin@cinema.com',
          fullName: 'Admin User',
          phone: '0901234567',
          role: 'ADMIN',
          createdAt: '2025-01-01T00:00:00Z'
        },
        {
          id: '2',
          email: 'staff1@cinema.com',
          fullName: 'Staff Member 1',
          phone: '0901234568',
          role: 'STAFF',
          createdAt: '2025-01-15T00:00:00Z'
        },
        {
          id: '3',
          email: 'staff2@cinema.com',
          fullName: 'Staff Member 2',
          phone: '0901234569',
          role: 'STAFF',
          createdAt: '2025-02-01T00:00:00Z'
        }
      ];
      setStaff(mockStaff);
    } catch (error) {
      console.error('Failed to fetch staff:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingStaff(null);
    formModal.open();
  };

  const handleEdit = (user: UserType) => {
    setEditingStaff(user);
    formModal.open();
  };

  const handleDelete = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this staff account?')) return;
    
    try {
      // await userApi.delete(userId);
      alert('Staff account deleted successfully');
      fetchStaff();
    } catch (error) {
      console.error('Failed to delete staff:', error);
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      if (editingStaff) {
        // await userApi.update(editingStaff.id, data);
      } else {
        // await userApi.create(data);
      }
      alert('Staff account saved successfully!');
      formModal.close();
      fetchStaff();
    } catch (error) {
      console.error('Failed to save staff:', error);
    }
  };

  return (
    <div className="p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Staff Accounts</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage staff and admin users
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="w-5 h-5" />
          Add Staff
        </Button>
      </div>

      <Card padding="none">
        <Table
          data={staff}
          columns={[
            {
              header: 'User',
              accessor: (row) => (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                    {row.fullName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{row.fullName}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{row.email}</p>
                  </div>
                </div>
              )
            },
            {
              header: 'Phone',
              accessor: (row) => row.phone || 'N/A'
            },
            {
              header: 'Role',
              accessor: (row) => (
                <Badge variant={row.role === 'ADMIN' ? 'error' : 'info'}>
                  {row.role === 'ADMIN' ? (
                    <><Shield className="w-3 h-3 inline mr-1" />Admin</>
                  ) : (
                    <><User className="w-3 h-3 inline mr-1" />Staff</>
                  )}
                </Badge>
              )
            },
            {
              header: 'Created',
              accessor: (row) => new Date(row.createdAt).toLocaleDateString()
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
                    disabled={row.role === 'ADMIN' && staff.filter(s => s.role === 'ADMIN').length === 1}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              )
            }
          ]}
          keyExtractor={(row) => row.id}
          loading={loading}
          emptyMessage="No staff accounts found"
        />
      </Card>

      {/* Staff Form Modal */}
      {formModal.isOpen && (
        <Modal
          isOpen
          onClose={formModal.close}
          title={editingStaff ? 'Edit Staff Account' : 'Add New Staff'}
          size="lg"
        >
          <StaffForm
            staff={editingStaff || undefined}
            onSubmit={handleSubmit}
            onCancel={formModal.close}
          />
        </Modal>
      )}
    </div>
  );
};

export default StaffAccountsPage;