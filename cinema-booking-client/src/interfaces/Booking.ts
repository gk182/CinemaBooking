import type { Seat } from "./Cinema";
import type { Showtime } from "./Showtime";

export const BookingStatus = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED',
} as const;

export type BookingStatus = typeof BookingStatus[keyof typeof BookingStatus];

export interface Booking {
  id: string;
  userId: string;
  showtimeId: string;
  seats: Seat[];
  totalPrice: number;
  status: BookingStatus;
  qrCode: string;
  createdAt: string;
  expiresAt: string;
  showtime?: Showtime;
}