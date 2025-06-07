
import { useState, useCallback } from 'react';
import { toast } from '@/components/ui/sonner';

interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

interface UseApiErrorHandlerReturn {
  error: ApiError | null;
  isLoading: boolean;
  handleError: (error: any) => void;
  clearError: () => void;
  executeWithErrorHandling: <T>(
    asyncFn: () => Promise<T>
  ) => Promise<T | null>;
}

/**
 * Custom hook for centralized API error handling.
 * Ready for Supabase integration - will handle Supabase errors when connected.
 */
export const useApiErrorHandler = (): UseApiErrorHandlerReturn => {
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleError = useCallback((error: any) => {
    console.error('API Error:', error);
    
    let errorMessage = 'An unexpected error occurred';
    let errorCode: string | undefined;

    // Handle Supabase errors (ready for when Supabase is connected)
    if (error?.message) {
      errorMessage = error.message;
      errorCode = error.code;
    }

    // Handle fetch/network errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      errorMessage = 'Network error. Please check your connection.';
      errorCode = 'NETWORK_ERROR';
    }

    // Handle authentication errors
    if (error?.code === 'UNAUTHENTICATED' || error?.status === 401) {
      errorMessage = 'Authentication required. Please log in.';
      errorCode = 'AUTH_ERROR';
    }

    // Handle authorization errors
    if (error?.code === 'UNAUTHORIZED' || error?.status === 403) {
      errorMessage = 'You do not have permission to perform this action.';
      errorCode = 'PERMISSION_ERROR';
    }

    const apiError: ApiError = {
      message: errorMessage,
      code: errorCode,
      details: error
    };

    setError(apiError);
    
    // Show toast notification
    toast.error('Error', {
      description: errorMessage,
    });

    return apiError;
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const executeWithErrorHandling = useCallback(
    async <T>(asyncFn: () => Promise<T>): Promise<T | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await asyncFn();
        return result;
      } catch (err) {
        handleError(err);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [handleError]
  );

  return {
    error,
    isLoading,
    handleError,
    clearError,
    executeWithErrorHandling,
  };
};
