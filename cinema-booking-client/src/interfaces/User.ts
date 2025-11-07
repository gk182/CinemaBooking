export const UserRole = {
  USER: 'USER',
  STAFF: 'STAFF',
  ADMIN: 'ADMIN'
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}