import { createContext, useState, useEffect, type ReactNode } from 'react';
import { type User, UserRole } from '../interfaces/User';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for stored auth on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await authApi.login(email, password);
      
      // Mock login - simulate API response
      const mockUser: User = {
        id: '1',
        email,
        fullName: 'Demo User',
        role: email.includes('admin') ? UserRole.ADMIN : 
              email.includes('staff') ? UserRole.STAFF : 
              UserRole.USER,
        createdAt: new Date().toISOString()
      };

      const mockToken = 'mock-jwt-token-' + Date.now();
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', mockToken);
      setUser(mockUser);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  const register = async (data: RegisterData) => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await authApi.register(data);
      
      // Mock registration
      const mockUser: User = {
        id: Date.now().toString(),
        email: data.email,
        fullName: data.fullName,
        phone: data.phone,
        role: UserRole.USER,
        createdAt: new Date().toISOString()
      };

      const mockToken = 'mock-jwt-token-' + Date.now();
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', mockToken);
      setUser(mockUser);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
