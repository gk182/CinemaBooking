import api from './index';
import type { User } from '../interfaces/User';

export interface UpdateProfileRequest {
  fullName?: string;
  phone?: string;
  avatar?: string;
}

export interface UpdateEmailRequest {
  newEmail: string;
  password: string;
}

export const userApi = {
  /**
   * Get current user profile
   */
  getProfile: async (): Promise<User> => {
    return api.get('/users/profile');
  },

  /**
   * Update profile
   */
  updateProfile: async (data: UpdateProfileRequest): Promise<User> => {
    return api.put('/users/profile', data);
  },

  /**
   * Update email
   */
  updateEmail: async (data: UpdateEmailRequest): Promise<{ message: string }> => {
    return api.put('/users/email', data);
  },

  /**
   * Upload avatar
   */
  uploadAvatar: async (file: File): Promise<{ avatarUrl: string }> => {
    const formData = new FormData();
    formData.append('avatar', file);
    return api.post('/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  /**
   * Delete account
   */
  deleteAccount: async (password: string): Promise<void> => {
    return api.delete('/users/account', { data: { password } });
  },

  /**
   * Admin: Get all users
   */
  getAll: async (filters?: {
    role?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{ users: User[]; total: number }> => {
    return api.get('/users', { params: filters });
  },

  /**
   * Admin: Get user by ID
   */
  getById: async (userId: string): Promise<User> => {
    return api.get(`/users/${userId}`);
  },

  /**
   * Admin: Create staff account
   */
  createStaff: async (data: {
    email: string;
    password: string;
    fullName: string;
    phone?: string;
    role: 'STAFF' | 'ADMIN';
  }): Promise<User> => {
    return api.post('/users/staff', data);
  },

  /**
   * Admin: Update user
   */
  update: async (userId: string, data: Partial<User>): Promise<User> => {
    return api.put(`/users/${userId}`, data);
  },

  /**
   * Admin: Delete user
   */
  delete: async (userId: string): Promise<void> => {
    return api.delete(`/users/${userId}`);
  },

  /**
   * Admin: Toggle user active status
   */
  toggleActive: async (userId: string): Promise<User> => {
    return api.post(`/users/${userId}/toggle-active`);
  },
};