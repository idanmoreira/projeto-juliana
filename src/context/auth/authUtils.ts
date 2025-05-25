
import { UserRole } from './types';

// Helper function to determine if a user role has access to a minimum role level
export const getRoleLevel = (role: UserRole): number => {
  switch (role) {
    case 'admin': return 3;
    case 'paid': return 2;
    case 'free': return 1;
    default: return 0;
  }
};
