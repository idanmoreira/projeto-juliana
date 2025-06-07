
import React, { createContext, useContext } from 'react';
import { AuthContextType } from './types';
import { getRoleLevel } from './authUtils';
import { useAuthState } from './useAuthState';
import { useAuthActions } from './useAuthActions';

const AuthContext = createContext<AuthContextType | null>(null);

export const SupabaseAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, session, isLoading, setIsLoading } = useAuthState();
  const { login, signup, logout } = useAuthActions(setIsLoading);

  const hasAccess = (minimumRole: import('./types').UserRole): boolean => {
    if (!user) return false;
    return getRoleLevel(user.role) >= getRoleLevel(minimumRole);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      signup, 
      logout, 
      isAuthenticated: !!user && !!session,
      hasAccess
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a SupabaseAuthProvider');
  }
  return context;
};
