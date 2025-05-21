
// Define user roles
export type UserRole = 'free' | 'paid' | 'admin';

// Define user interface
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  subscriptionEnds?: string | null;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  hasAccess: (minimumRole: UserRole) => boolean;
}
