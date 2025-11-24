import { useState, useEffect } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';
import type { Cinema } from '../../interfaces/Cinema';

interface CinemaFormProps {
  cinema?: Cinema;
  onSubmit: (data: Partial<Cinema>) => Promise<void>;
  onCancel: () => void;
}

const CinemaForm = ({ cinema, onSubmit, onCancel }: CinemaFormProps) => {
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    phone: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (cinema) {
      setFormData({
        name: cinema.name || '',
        address: cinema.address || '',
        city: cinema.city || '',
        phone: cinema.phone || ''
      });
    }
  }, [cinema]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Cinema name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Cinema name must be at least 3 characters';
    } else if (formData.name.trim().length > 100) {
      newErrors.name = 'Cinema name must not exceed 100 characters';
    }

    // Validate address
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    } else if (formData.address.trim().length < 5) {
      newErrors.address = 'Address must be at least 5 characters';
    } else if (formData.address.trim().length > 255) {
      newErrors.address = 'Address must not exceed 255 characters';
    }

    // Validate city
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    } else if (formData.city.trim().length < 2) {
      newErrors.city = 'City must be at least 2 characters';
    } else if (formData.city.trim().length > 50) {
      newErrors.city = 'City must not exceed 50 characters';
    }

    // Validate phone
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else {
      const phoneDigits = formData.phone.replace(/\D/g, '');
      if (phoneDigits.length < 10) {
        newErrors.phone = 'Phone number must be at least 10 digits';
      } else if (phoneDigits.length > 15) {
        newErrors.phone = 'Phone number must not exceed 15 digits';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Clear submit error
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setSubmitError(null);

    try {
      const submitData: Partial<Cinema> = {
        name: formData.name.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        phone: formData.phone.trim()
      };

      await onSubmit(submitData);
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to save cinema. Please try again.';
      setSubmitError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Submit Error Message */}
      {submitError && (
        <ErrorMessage 
          message={submitError}
        />
      )}

      {/* Cinema Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Cinema Name <span className="text-red-500">*</span>
        </label>
        <Input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., CGV Vincom Da Nang"
          error={errors.name}
          disabled={loading}
          maxLength={100}
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {formData.name.length}/100 characters
        </p>
      </div>

      {/* Address Field */}
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Address <span className="text-red-500">*</span>
        </label>
        <Input
          id="address"
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="e.g., 123 Main Street, Hai Chau District"
          error={errors.address}
          disabled={loading}
          maxLength={255}
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {formData.address.length}/255 characters
        </p>
      </div>

      {/* City and Phone Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* City Field */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            City <span className="text-red-500">*</span>
          </label>
          <Input
            id="city"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="e.g., Da Nang"
            error={errors.city}
            disabled={loading}
            maxLength={50}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {formData.city.length}/50 characters
          </p>
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <Input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g., 0236-123-4567"
            error={errors.phone}
            disabled={loading}
            maxLength={20}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            10-15 digits required
          </p>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex flex-col-reverse sm:flex-row gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="flex-1"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              {cinema ? 'Updating...' : 'Creating...'}
            </span>
          ) : (
            cinema ? 'Update Cinema' : 'Add Cinema'
          )}
        </Button>
      </div>
    </form>
  );
};

export default CinemaForm;