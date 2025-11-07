import api from './index';
import type { User,  } from '../interfaces/User';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: User;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
}

export const authApi = {
  /**
   * Login user
   */
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    return api.post('/auth/login', data);
  },

  /**
   * Register new user
   */
  register: async (data: RegisterRequest): Promise<LoginResponse> => {
    return api.post('/auth/register', data);
  },

  /**
   * Refresh access token
   */
  refreshToken: async (data: RefreshTokenRequest): Promise<RefreshTokenResponse> => {
    return api.post('/auth/refresh', data);
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    return api.post('/auth/logout');
  },

  /**
   * Verify email
   */
  verifyEmail: async (token: string): Promise<{ message: string }> => {
    return api.post('/auth/verify-email', { token });
  },

  /**
   * Request password reset
   */
  forgotPassword: async (email: string): Promise<{ message: string }> => {
    return api.post('/auth/forgot-password', { email });
  },

  /**
   * Reset password
   */
  resetPassword: async (token: string, newPassword: string): Promise<{ message: string }> => {
    return api.post('/auth/reset-password', { token, newPassword });
  },

  /**
   * Change password
   */
  changePassword: async (currentPassword: string, newPassword: string): Promise<{ message: string }> => {
    return api.post('/auth/change-password', { currentPassword, newPassword });
  },
};