
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { AuthContextType, User, UserRole } from './types';
import { MOCK_USERS } from './mockUsers';
import { getRoleLevel } from './authUtils';
import { LoginFormValues, SignupFormValues } from './validation';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check for saved user in localStorage on initial load
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const hasAccess = (minimumRole: UserRole): boolean => {
    if (!user) return false;
    return getRoleLevel(user.role) >= getRoleLevel(minimumRole);
  };

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
      
      toast({
        title: "Logged in successfully",
        description: `Welcome, ${safeUser.name}!`,
      });
      
      navigate('/dashboard');
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  const signup = async (formData: SignupFormValues): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists in mock database
    if (MOCK_USERS.some(u => u.email === formData.email)) {
      toast({
        title: "Signup failed",
        description: "Email already exists",
        variant: "destructive",
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
    
    toast({
      title: "Account created",
      description: "Your free account has been created successfully.",
    });
    
    navigate('/dashboard');
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
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
