import { useState } from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { type User, UserRole } from '../../interfaces/User';

interface StaffFormProps {
  staff?: User;
  onSubmit: (data: Partial<User> & { password?: string }) => void;
  onCancel: () => void;
}

const StaffForm = ({ staff, onSubmit, onCancel }: StaffFormProps) => {
  const [formData, setFormData] = useState({
    fullName: staff?.fullName || '',
    email: staff?.email || '',
    phone: staff?.phone || '',
    password: '',
    role: staff?.role || UserRole.STAFF
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Full Name"
        value={formData.fullName}
        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        required
      />

      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />

      <Input
        label="Phone"
        type="tel"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />

      {!staff && (
        <Input
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required={!staff}
        />
      )}

      <Select
        label="Role"
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
        options={[
          { value: UserRole.STAFF, label: 'Staff' },
          { value: UserRole.ADMIN, label: 'Admin' }
        ]}
      />

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {staff ? 'Update Staff' : 'Create Staff'}
        </Button>
      </div>
    </form>
  );
};

export default StaffForm;