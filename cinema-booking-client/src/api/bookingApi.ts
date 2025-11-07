import api from './index';
import { type Booking } from '../interfaces/Booking';
import { type Seat } from '../interfaces/Cinema';

export interface CreateBookingRequest {
  showtimeId: string;
  seatIds: string[];
  promotionCode?: string;
}

export interface CreateBookingResponse {
  booking: Booking;
  expiresAt: string;
}

export interface BookingSeatAvailability {
  seatId: string;
  isAvailable: boolean;
  row: string;
  number: number;
  type: string;
  price: number;
}

export interface HoldSeatsRequest {
  showtimeId: string;
  seatIds: string[];
}

export const bookingApi = {
  /**
   * Get available seats for showtime
   */
  getAvailableSeats: async (showtimeId: string): Promise<Seat[]> => {
    return api.get(`/showtimes/${showtimeId}/seats`);
  },

  /**
   * Check seat availability
   */
  checkSeatAvailability: async (
    showtimeId: string,
    seatIds: string[]
  ): Promise<BookingSeatAvailability[]> => {
    return api.post(`/showtimes/${showtimeId}/check-seats`, { seatIds });
  },

  /**
   * Hold seats temporarily (10 minutes)
   */
  holdSeats: async (data: HoldSeatsRequest): Promise<{ holdId: string; expiresAt: string }> => {
    return api.post('/bookings/hold', data);
  },

  /**
   * Release held seats
   */
  releaseSeats: async (holdId: string): Promise<void> => {
    return api.delete(`/bookings/hold/${holdId}`);
  },

  /**
   * Create booking
   */
  create: async (data: CreateBookingRequest): Promise<CreateBookingResponse> => {
    return api.post('/bookings', data);
  },

  /**
   * Get booking by ID
   */
  getById: async (id: string): Promise<Booking> => {
    return api.get(`/bookings/${id}`);
  },

  /**
   * Get booking by code
   */
  getByCode: async (code: string): Promise<Booking> => {
    return api.get(`/bookings/code/${code}`);
  },

  /**
   * Get my bookings
   */
  getMyBookings: async (page = 1, limit = 10): Promise<{ bookings: Booking[]; total: number }> => {
    return api.get('/bookings/my', { params: { page, limit } });
  },

  /**
   * Confirm booking (after payment)
   */
  confirm: async (bookingId: string): Promise<Booking> => {
    return api.post(`/bookings/${bookingId}/confirm`);
  },

  /**
   * Cancel booking
   */
  cancel: async (bookingId: string, reason?: string): Promise<Booking> => {
    return api.post(`/bookings/${bookingId}/cancel`, { reason });
  },

  /**
   * Staff: Check in booking
   */
  checkIn: async (bookingId: string): Promise<Booking> => {
    return api.post(`/bookings/${bookingId}/checkin`);
  },

  /**
   * Staff: Search bookings
   */
  search: async (params: {
    searchType: 'phone' | 'email' | 'bookingId';
    query: string;
  }): Promise<Booking[]> => {
    return api.get('/bookings/search', { params });
  },

  /**
   * Admin: Get all bookings
   */
  getAll: async (filters?: {
    status?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }): Promise<{ bookings: Booking[]; total: number }> => {
    return api.get('/bookings', { params: filters });
  },
};