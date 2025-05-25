
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';
import { AuthContextType, User, UserRole } from './types';
import { MOCK_USERS } from './mockUsers';
import { getRoleLevel } from './authUtils';
import { LoginFormValues, SignupFormValues } from './validation';

/**
 * Context for managing authentication state and actions.
 * @type {React.Context<AuthContextType | null>}
 */
const AuthContext = createContext<AuthContextType | null>(null);

/**
 * Provides authentication state and functions to its children components.
 * It manages the current user, loading states, and authentication operations like login, signup, and logout.
 * User information is persisted in localStorage.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components that will have access to the auth context.
 * @returns {JSX.Element} The AuthProvider component.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  /**
   * @state {User | null} user - The current authenticated user object, or null if not authenticated.
   */
  const [user, setUser] = useState<User | null>(null);
  /**
   * @state {boolean} isLoading - Indicates if an authentication operation is in progress or initial state is being loaded.
   */
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for saved user in localStorage on initial load
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  /**
   * Checks if the current user has at least the minimum required role.
   * @param {UserRole} minimumRole - The minimum role required for access.
   * @returns {boolean} True if the user has access, false otherwise.
   */
  const hasAccess = (minimumRole: UserRole): boolean => {
    if (!user) return false;
    return getRoleLevel(user.role) >= getRoleLevel(minimumRole);
  };

  /**
   * Logs in a user with the provided credentials.
   * Simulates an API call and uses a mock user database.
   * On successful login, updates user state, stores user in localStorage, and navigates to the dashboard.
   * Displays toast notifications for success or failure.
   * @param {LoginFormValues} formData - The login form data (email and password).
   * @returns {Promise<void>}
   */
  const login = async (formData: LoginFormValues): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user in mock database
    const foundUser = MOCK_USERS.find(
      u => u.email === formData.email && u.password === formData.password
    );
    
    if (foundUser) {
      // Create a safe user object without the password before storing
      const safeUser = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role,
        subscriptionEnds: foundUser.subscriptionEnds
      };
      
      setUser(safeUser);
      localStorage.setItem('user', JSON.stringify(safeUser));
      
      toast.success("Logged in successfully", {
        description: `Welcome, ${safeUser.name}!`,
      });
      
      navigate('/dashboard');
    } else {
      toast.error("Login failed", {
        description: "Invalid email or password",
      });
    }
    
    setIsLoading(false);
  };

  /**
   * Signs up a new user with the provided form data.
   * Simulates an API call and uses a mock user database.
   * Checks for existing users. On successful signup, creates a new user,
   * updates user state, stores user in localStorage, and navigates to the dashboard.
   * Displays toast notifications for success or failure.
   * @param {SignupFormValues} formData - The signup form data (name, email, password).
   * @returns {Promise<void>}
   * @throws Will not throw directly but handles errors by showing toast messages.
   */
  const signup = async (formData: SignupFormValues): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists in mock database
    if (MOCK_USERS.some(u => u.email === formData.email)) {
      toast.error("Signup failed", {
        description: "Email already exists",
      });
      setIsLoading(false);
      return;
    }
    
    // In a real app, we would call an API to create a new user
    // For demo purposes, we'll just create a new user object
    const newUser = {
      id: `${MOCK_USERS.length + 1}`,
      email: formData.email,
      name: formData.name,
      role: 'free' as UserRole,
    };
    
    // Add to mock database (this would be handled by the backend in a real app)
    MOCK_USERS.push({ ...newUser, password: formData.password });
    
    // Store only the safe user data (without password)
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    toast.success("Account created", {
      description: "Your free account has been created successfully.",
    });
    
    navigate('/dashboard');
    setIsLoading(false);
  };

  /**
   * Logs out the current user.
   * Clears user state, removes user from localStorage, and navigates to the homepage.
   * Displays a toast notification on successful logout.
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.info("Logged out", {
      description: "You have been logged out successfully.",
    });
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      signup, 
      logout, 
      isAuthenticated: !!user,
      hasAccess
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
