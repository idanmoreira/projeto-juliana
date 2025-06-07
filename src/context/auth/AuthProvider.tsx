
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';
import { AuthContextType, User, UserRole } from './types';
import { MOCK_USERS } from './mockUsers';
import { getRoleLevel } from './authUtils';
import { LoginFormValues, SignupFormValues } from './validation';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for saved user in localStorage on initial load
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        
        // Log security event
        console.log('Security Event:', {
          type: 'session_restored',
          user: parsedUser.email,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('user'); // Clear corrupted data
      }
    }
    setIsLoading(false);
  }, []);

  const hasAccess = (minimumRole: UserRole): boolean => {
    if (!user) return false;
    return getRoleLevel(user.role) >= getRoleLevel(minimumRole);
  };

  const login = async (formData: LoginFormValues): Promise<void> => {
    setIsLoading(true);
    
    // Log login attempt
    console.log('Security Event:', {
      type: 'login_attempt',
      user: formData.email,
      timestamp: new Date().toISOString()
    });
    
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
      
      // Log successful login
      console.log('Security Event:', {
        type: 'login_success',
        user: safeUser.email,
        role: safeUser.role,
        timestamp: new Date().toISOString()
      });
      
      toast.success("Logged in successfully", {
        description: `Welcome, ${safeUser.name}!`,
      });
      
      // Check for return URL
      const urlParams = new URLSearchParams(window.location.search);
      const returnUrl = urlParams.get('returnUrl');
      
      if (returnUrl) {
        navigate(returnUrl);
      } else {
        navigate('/dashboard');
      }
    } else {
      // Log failed login
      console.log('Security Event:', {
        type: 'login_failed',
        user: formData.email,
        reason: 'invalid_credentials',
        timestamp: new Date().toISOString()
      });
      
      toast.error("Login failed", {
        description: "Invalid email or password",
      });
    }
    
    setIsLoading(false);
  };

  const signup = async (formData: SignupFormValues): Promise<void> => {
    setIsLoading(true);
    
    // Log signup attempt
    console.log('Security Event:', {
      type: 'signup_attempt',
      user: formData.email,
      timestamp: new Date().toISOString()
    });
    
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
    
    // Log successful signup
    console.log('Security Event:', {
      type: 'signup_success',
      user: newUser.email,
      role: newUser.role,
      timestamp: new Date().toISOString()
    });
    
    toast.success("Account created", {
      description: "Your free account has been created successfully.",
    });
    
    navigate('/dashboard');
    setIsLoading(false);
  };

  const logout = () => {
    // Log logout event
    console.log('Security Event:', {
      type: 'logout',
      user: user?.email,
      timestamp: new Date().toISOString()
    });
    
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
