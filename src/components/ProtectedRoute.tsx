
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, UserRole } from '@/context/auth';
import { toast } from '@/components/ui/sonner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  fallbackPath?: string;
  showAccessDeniedMessage?: boolean;
}

/**
 * Enhanced ProtectedRoute component with improved security and user feedback.
 * Protects routes based on authentication status and user roles.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole = 'free',
  fallbackPath = '/login',
  showAccessDeniedMessage = true
}) => {
  const { isAuthenticated, hasAccess, isLoading, user } = useAuth();
  const location = useLocation();
  
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-astral-purple mx-auto"></div>
          <p className="text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    );
  }
  
  // Check authentication
  if (!isAuthenticated) {
    // Store the attempted URL to redirect after login
    const returnUrl = location.pathname + location.search;
    
    if (showAccessDeniedMessage) {
      toast.error("Authentication Required", {
        description: "Please log in to access this page.",
      });
    }
    
    return <Navigate 
      to={`${fallbackPath}?returnUrl=${encodeURIComponent(returnUrl)}`} 
      replace 
    />;
  }
  
  // Check role-based access
  if (requiredRole && !hasAccess(requiredRole)) {
    if (showAccessDeniedMessage) {
      toast.error("Access Denied", {
        description: `This page requires ${requiredRole} access or higher.`,
      });
    }
    
    // Log security event (ready for audit logging when backend is connected)
    console.warn('Access denied:', {
      user: user?.email,
      userRole: user?.role,
      requiredRole,
      attemptedPath: location.pathname,
      timestamp: new Date().toISOString()
    });
    
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
