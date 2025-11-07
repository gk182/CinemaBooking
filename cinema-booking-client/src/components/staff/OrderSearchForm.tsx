import { useState } from 'react';
import { Search } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';
import Select from '../common/Select';

interface OrderSearchFormProps {
  onSearch: (params: { searchType: 'phone' | 'email' | 'bookingId'; query: string }) => void;
  loading?: boolean;
}

const OrderSearchForm = ({ onSearch, loading }: OrderSearchFormProps) => {
  const [searchType, setSearchType] = useState<'phone' | 'email' | 'bookingId'>('phone');
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch({ searchType, query: query.trim() });
  };

  const placeholders = {
    phone: 'Enter phone number (e.g., 0901234567)',
    email: 'Enter email address',
    bookingId: 'Enter booking ID (e.g., BK001234)'
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="sm:w-48">
          <Select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value as any)}
            options={[
              { value: 'phone', label: 'Phone Number' },
              { value: 'email', label: 'Email' },
              { value: 'bookingId', label: 'Booking ID' }
            ]}
          />
        </div>
        
        <div className="flex-1">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholders[searchType]}
          />
        </div>

        <Button type="submit" loading={loading}>
          <Search className="w-5 h-5" />
          <span className="hidden sm:inline">Search</span>
        </Button>
      </div>
    </form>
  );
};

export default OrderSearchForm;