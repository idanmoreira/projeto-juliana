
import { UserRole } from './types';

export interface MockUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  password: string;
  subscriptionEnds?: string | null;
}

// Mock users for demo purposes - replace with backend integration
export const MOCK_USERS: MockUser[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    password: 'admin123'
  },
  {
    id: '2',
    email: 'paid@example.com',
    name: 'Premium User',
    role: 'paid',
    password: 'paid123',
    subscriptionEnds: '2025-12-31'
  },
  {
    id: '3',
    email: 'free@example.com',
    name: 'Free User',
    role: 'free',
    password: 'free123'
  }
];
