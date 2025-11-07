import type { Seat } from '../interfaces/Cinema';

interface SeatGeneratorOptions {
  rows: string[];
  seatsPerRow: number;
  vipRowCount?: number;
  soldProbability?: number;
  standardPrice?: number;
  vipPrice?: number;
  couplePrice?: number;
}

export const generateSeats = ({
  rows,
  seatsPerRow,
  vipRowCount = 2,
  soldProbability = 0.25,
  standardPrice = 80000,
  vipPrice = 150000,
  couplePrice = 200000
}: SeatGeneratorOptions): Seat[] => {
  const seats: Seat[] = [];
  
  rows.forEach((row, rowIndex) => {
    for (let i = 1; i <= seatsPerRow; i++) {
      // Determine if it's a VIP row (last N rows)
      const isVip = rowIndex >= rows.length - vipRowCount;
      
      // Couple seats are the last 2 seats in VIP rows
      const isCouple = isVip && (i === seatsPerRow - 1 || i === seatsPerRow);
      
      // Randomly mark some as sold
      const isSold = Math.random() < soldProbability;
      
      seats.push({
        id: `${row}${i}`,
        row,
        number: i,
        type: isCouple ? 'couple' : isVip ? 'vip' : 'standard',
        status: isSold ? 'sold' : 'available',
        price: isCouple ? couplePrice : isVip ? vipPrice : standardPrice
      });
    }
  });
  
  return seats;
};

// Default cinema layout
export const CINEMA_LAYOUTS = {
  small: {
    rows: ['A', 'B', 'C', 'D', 'E', 'F'],
    seatsPerRow: 10,
    vipRowCount: 1
  },
  medium: {
    rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    seatsPerRow: 12,
    vipRowCount: 2
  },
  large: {
    rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
    seatsPerRow: 14,
    vipRowCount: 2
  },
  imax: {
    rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
    seatsPerRow: 16,
    vipRowCount: 3
  }
};