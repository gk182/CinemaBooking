export const SEAT_PRICES = {
  STANDARD: 80000,
  VIP: 150000,
  COUPLE: 200000
} as const;

export const BOOKING_TIMEOUT = 10 * 60 * 1000; // 10 minutes in milliseconds

export const MAX_SEATS_PER_BOOKING = 8;

export const PAYMENT_METHODS = {
  VNPAY: 'VNPAY',
  MOMO: 'MOMO',
  CASH: 'CASH'
} as const;

export const BOOKING_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED'
} as const;

export const USER_ROLES = {
  USER: 'USER',
  STAFF: 'STAFF',
  ADMIN: 'ADMIN'
} as const;

export const MOVIE_STATUS = {
  NOW_SHOWING: 'now_showing',
  COMING_SOON: 'coming_soon',
  ENDED: 'ended'
} as const;

export const GENRE_LIST = [
  'Action',
  'Adventure',
  'Comedy',
  'Crime',
  'Drama',
  'Fantasy',
  'Horror',
  'Romance',
  'Sci-Fi',
  'Thriller'
] as const;

export const AGE_RATINGS = [
  { value: 'G', label: 'G - General Audience' },
  { value: 'PG', label: 'PG - Parental Guidance' },
  { value: 'PG-13', label: 'PG-13' },
  { value: 'R', label: 'R - Restricted' },
  { value: 'NC-17', label: 'NC-17' }
] as const;

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  
  // Movies
  MOVIES: '/movies',
  MOVIE_BY_ID: (id: string) => `/movies/${id}`,
  
  // Showtimes
  SHOWTIMES: '/showtimes',
  SHOWTIMES_BY_MOVIE: (movieId: string) => `/showtimes/movie/${movieId}`,
  SHOWTIMES_BY_DATE: (date: string) => `/showtimes/date/${date}`,
  
  // Bookings
  BOOKINGS: '/bookings',
  MY_BOOKINGS: '/bookings/my',
  BOOKING_BY_ID: (id: string) => `/bookings/${id}`,
  
  // Payments
  PAYMENTS: '/payments',
  VERIFY_PAYMENT: '/payments/verify',
  
  // Admin
  ADMIN_MOVIES: '/admin/movies',
  ADMIN_ROOMS: '/admin/rooms',
  ADMIN_SHOWTIMES: '/admin/showtimes',
  ADMIN_STAFF: '/admin/staff',
  ADMIN_STATS: '/admin/stats',
  
  // Staff
  STAFF_CHECKIN: '/staff/checkin',
  STAFF_SEARCH_ORDER: '/staff/orders/search'
} as const;