import type { Cinema } from '../../interfaces/Cinema';

export const mockCinemas: Cinema[] = [
  {
    id: "c1",
    name: "CGV Vincom Da Nang",
    address: "910A Ngo Quyen Street, Son Tra District",
    city: "Da Nang",
    phone: "0236 3630 555",
    rooms: [
      {
          id: "r1",
          name: "Cinema 1",
          rows: 10,
          seatsPerRow: 15,
          cinemaId: "c1",
          capacity: 0,
          seatMap: []
      },
      {
          id: "r2",
          name: "Cinema 2",
          rows: 8,
          seatsPerRow: 12,
          cinemaId: "c1",
          capacity: 0,
          seatMap: []
      }
    ]
  },
  {
    id: "c2",
    name: "CGV Lotte Mart",
    address: "6 Nam Ky Khoi Nghia Street, Hai Chau District",
    city: "Da Nang",
    phone: "0236 3679 888",
    rooms: [
      {
          id: "r3",
          name: "Cinema 1",
          rows: 12,
          seatsPerRow: 16,
          cinemaId: "c2",
          capacity: 0,
          seatMap: []
      }
    ]
  }
];