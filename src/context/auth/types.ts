
// Define user roles
import { LoginFormValues, SignupFormValues } from "./validation";

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
  login: (formData: LoginFormValues) => Promise<void>;
  signup: (formData: SignupFormValues) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  hasAccess: (minimumRole: UserRole) => boolean;
}
