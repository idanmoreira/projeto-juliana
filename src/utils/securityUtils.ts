
/**
 * Security utility functions for the application.
 * Ready for backend integration when Supabase is connected.
 */

export const sanitizeInput = (input: string): string => {
  // Basic XSS prevention
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): {
  isValid: boolean;
  issues: string[];
} => {
  const issues: string[] = [];
  
  if (password.length < 8) {
    issues.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    issues.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    issues.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    issues.push('Password must contain at least one number');
  }
  
  return {
    isValid: issues.length === 0,
    issues
  };
};

export const generateCSRFToken = (): string => {
  // Generate a random CSRF token
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

export const isSecureContext = (): boolean => {
  return window.isSecureContext || location.hostname === 'localhost';
};

// Rate limiting utilities (client-side basic implementation)
const rateLimitStore = new Map<string, { attempts: number; lastAttempt: number }>();

export const checkRateLimit = (
  key: string, 
  maxAttempts: number = 5, 
  windowMs: number = 15 * 60 * 1000 // 15 minutes
): boolean => {
  const now = Date.now();
  const record = rateLimitStore.get(key);
  
  if (!record) {
    rateLimitStore.set(key, { attempts: 1, lastAttempt: now });
    return true;
  }
  
  // Reset if window has passed
  if (now - record.lastAttempt > windowMs) {
    rateLimitStore.set(key, { attempts: 1, lastAttempt: now });
    return true;
  }
  
  // Check if limit exceeded
  if (record.attempts >= maxAttempts) {
    return false;
  }
  
  // Increment attempts
  record.attempts++;
  record.lastAttempt = now;
  
  return true;
};
