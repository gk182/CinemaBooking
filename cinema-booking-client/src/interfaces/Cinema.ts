export interface Cinema {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  rooms: Room[];
}

export interface Room {
  id: string;
  cinemaId: string;
  name: string;
  capacity: number;
  rows: number;
  seatsPerRow: number;
  seatMap: Seat[][];
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  type: 'standard' | 'vip' | 'couple';
  status: 'available' | 'selected' | 'sold' | 'blocked';
  price: number;
}