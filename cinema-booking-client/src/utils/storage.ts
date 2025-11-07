const STORAGE_PREFIX = 'cinema_booking_';

export const storage = {
  /**
   * Get item from localStorage
   */
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(STORAGE_PREFIX + key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting item ${key} from localStorage:`, error);
      return null;
    }
  },

  /**
   * Set item in localStorage
   */
  set<T>(key: string, value: T): boolean {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting item ${key} in localStorage:`, error);
      return false;
    }
  },

  /**
   * Remove item from localStorage
   */
  remove(key: string): boolean {
    try {
      localStorage.removeItem(STORAGE_PREFIX + key);
      return true;
    } catch (error) {
      console.error(`Error removing item ${key} from localStorage:`, error);
      return false;
    }
  },

  /**
   * Clear all items with prefix
   */
  clear(): boolean {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(STORAGE_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },

  /**
   * Check if key exists
   */
  has(key: string): boolean {
    return localStorage.getItem(STORAGE_PREFIX + key) !== null;
  },

  /**
   * Get all keys with prefix
   */
  keys(): string[] {
    try {
      const allKeys = Object.keys(localStorage);
      return allKeys
        .filter(key => key.startsWith(STORAGE_PREFIX))
        .map(key => key.replace(STORAGE_PREFIX, ''));
    } catch (error) {
      console.error('Error getting keys from localStorage:', error);
      return [];
    }
  }
};

// Specialized storage functions for common use cases

export const authStorage = {
  getToken: () => storage.get<string>('token'),
  setToken: (token: string) => storage.set('token', token),
  removeToken: () => storage.remove('token'),
  
  getUser: () => storage.get<any>('user'),
  setUser: (user: any) => storage.set('user', user),
  removeUser: () => storage.remove('user'),
  
  clear: () => {
    storage.remove('token');
    storage.remove('user');
  }
};

export const bookingStorage = {
  getSelectedSeats: (showtimeId: string) => 
    storage.get<any[]>(`selected_seats_${showtimeId}`),
  
  setSelectedSeats: (showtimeId: string, seats: any[]) => 
    storage.set(`selected_seats_${showtimeId}`, seats),
  
  removeSelectedSeats: (showtimeId: string) => 
    storage.remove(`selected_seats_${showtimeId}`),
  
  getPendingBooking: () => storage.get<any>('pending_booking'),
  setPendingBooking: (booking: any) => storage.set('pending_booking', booking),
  removePendingBooking: () => storage.remove('pending_booking')
};

export const uiStorage = {
  getDarkMode: () => storage.get<boolean>('dark_mode'),
  setDarkMode: (value: boolean) => storage.set('dark_mode', value),
  
  getSidebarCollapsed: () => storage.get<boolean>('sidebar_collapsed'),
  setSidebarCollapsed: (value: boolean) => storage.set('sidebar_collapsed', value),
  
  getRecentSearches: () => storage.get<string[]>('recent_searches') || [],
  addRecentSearch: (query: string) => {
    const searches = uiStorage.getRecentSearches();
    const updated = [query, ...searches.filter(s => s !== query)].slice(0, 10);
    storage.set('recent_searches', updated);
  }
};