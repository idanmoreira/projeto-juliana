
import { User, UserRole } from './types';

// Mock user database - in a real app, this would be stored in a database
export const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as UserRole,
  },
  {
    id: '2',
    email: 'paid@example.com',
    password: 'paid123',
    name: 'Premium User',
    role: 'paid' as UserRole,
    subscriptionEnds: '2025-12-31',
  },
  {
    id: '3',
    email: 'free@example.com',
    password: 'free123',
    name: 'Free User',
    role: 'free' as UserRole,
  },
];
