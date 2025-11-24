export interface Cinema {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  rooms?: Room[];
  createdAt?: string;
}

export interface Room {
  id: string;
  cinemaId: string;
  name: string;
  rowsCount: number;
  seatsPerRow: number;
  capacity: number;
  description?: string;
  seats?: Seat[];
  createdAt?: string;
}

export interface Seat {
  id: string;
  rowLabel: string;
  seatNumber: number;
  seatType: 'standard' | 'vip' | 'couple';
  price: number;
  isBlocked: boolean;
}