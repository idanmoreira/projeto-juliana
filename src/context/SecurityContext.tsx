
import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth } from './auth/SupabaseAuthProvider';
import { useApiErrorHandler } from '@/hooks/useApiErrorHandler';

interface SecurityContextType {
  validateAccess: (requiredRole: string) => boolean;
  logSecurityEvent: (event: SecurityEvent) => void;
  handleSecurityError: (error: any) => void;
  isSecureEnvironment: boolean;
}

interface SecurityEvent {
  type: 'access_denied' | 'login_attempt' | 'logout' | 'unauthorized_action';
  user?: string;
  details?: any;
  timestamp: string;
}

const SecurityContext = createContext<SecurityContextType | null>(null);

/**
 * Security context provider for centralized security policies and logging.
 * Ready for integration with backend security services.
 */
export const SecurityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, hasAccess } = useAuth();
  const { handleError } = useApiErrorHandler();

  // Check if we're in a secure environment (HTTPS in production)
  const isSecureEnvironment = location.protocol === 'https:' || 
                              location.hostname === 'localhost' || 
                              location.hostname === '127.0.0.1';

  const validateAccess = (requiredRole: string): boolean => {
    if (!user) return false;
    return hasAccess(requiredRole as any);
  };

  const logSecurityEvent = (event: SecurityEvent): void => {
    const logEntry = {
      ...event,
      user: user?.email || 'anonymous',
      userAgent: navigator.userAgent,
      ip: 'client-side', // Will be replaced with actual IP when backend is connected
    };

    // Log to console for now (will be sent to backend when Supabase is connected)
    console.log('Security Event:', logEntry);

    // In production, this would send to a security logging service
    if (process.env.NODE_ENV === 'production') {
      // TODO: Send to backend logging service when Supabase is connected
    }
  };

  const handleSecurityError = (error: any): void => {
    logSecurityEvent({
      type: 'unauthorized_action',
      details: error,
      timestamp: new Date().toISOString(),
    });

    handleError(error);
  };

  const value: SecurityContextType = {
    validateAccess,
    logSecurityEvent,
    handleSecurityError,
    isSecureEnvironment,
  };

  return (
    <SecurityContext.Provider value={value}>
      {children}
    </SecurityContext.Provider>
  );
};

export const useSecurity = (): SecurityContextType => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
};
