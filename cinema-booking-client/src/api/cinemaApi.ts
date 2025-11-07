import api from './index';
import type { Cinema, Room, Seat } from '../interfaces/Cinema';

export interface CreateRoomRequest {
  cinemaId: string;
  name: string;
  totalRows: number;
  seatsPerRow: number;
  roomType?: string;
}

export interface SeatMapUpdate {
  seatId: string;
  seatType: 'standard' | 'vip' | 'couple';
  price: number;
  isActive: boolean;
}

export const cinemaApi = {
  /**
   * Get all cinemas
   */
  getAll: async (): Promise<Cinema[]> => {
    return api.get('/cinemas');
  },

  /**
   * Get cinema by ID
   */
  getById: async (id: string): Promise<Cinema> => {
    return api.get(`/cinemas/${id}`);
  },

  /**
   * Get cinemas by city
   */
  getByCity: async (city: string): Promise<Cinema[]> => {
    return api.get('/cinemas/city', { params: { city } });
  },

  /**
   * Get rooms by cinema
   */
  getRooms: async (cinemaId: string): Promise<Room[]> => {
    return api.get(`/cinemas/${cinemaId}/rooms`);
  },

  /**
   * Get room by ID
   */
  getRoomById: async (roomId: string): Promise<Room> => {
    return api.get(`/rooms/${roomId}`);
  },

  /**
   * Get seats by room
   */
  getSeats: async (roomId: string): Promise<Seat[]> => {
    return api.get(`/rooms/${roomId}/seats`);
  },

  /**
   * Admin: Create cinema
   */
  createCinema: async (data: Partial<Cinema>): Promise<Cinema> => {
    return api.post('/cinemas', data);
  },

  /**
   * Admin: Update cinema
   */
  updateCinema: async (id: string, data: Partial<Cinema>): Promise<Cinema> => {
    return api.put(`/cinemas/${id}`, data);
  },

  /**
   * Admin: Delete cinema
   */
  deleteCinema: async (id: string): Promise<void> => {
    return api.delete(`/cinemas/${id}`);
  },

  /**
   * Admin: Create room
   */
  createRoom: async (data: CreateRoomRequest): Promise<Room> => {
    return api.post('/rooms', data);
  },

  /**
   * Admin: Update room
   */
  updateRoom: async (id: string, data: Partial<CreateRoomRequest>): Promise<Room> => {
    return api.put(`/rooms/${id}`, data);
  },

  /**
   * Admin: Delete room
   */
  deleteRoom: async (id: string): Promise<void> => {
    return api.delete(`/rooms/${id}`);
  },

  /**
   * Admin: Update seat map
   */
  updateSeatMap: async (roomId: string, seats: SeatMapUpdate[]): Promise<Room> => {
    return api.put(`/rooms/${roomId}/seat-map`, { seats });
  },
};