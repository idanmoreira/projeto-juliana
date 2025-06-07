
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import { AuthContextType, User, UserRole } from './types';
import { getRoleLevel } from './authUtils';
import { LoginFormValues, SignupFormValues } from './validation';

const AuthContext = createContext<AuthContextType | null>(null);

export const SupabaseAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        setSession(session);
        
        if (session?.user) {
          // Use setTimeout to defer Supabase calls and prevent deadlock
          setTimeout(async () => {
            try {
              const { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();

              if (error && error.code !== 'PGRST116') {
                console.error('Error fetching profile:', error);
              }

              const userWithProfile: User = {
                id: session.user.id,
                email: session.user.email || '',
                name: profile?.display_name || session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
                role: (profile?.role as UserRole) || 'free',
                subscriptionEnds: null
              };
              
              setUser(userWithProfile);

              // Handle signup success - redirect new users to dashboard
              if (event === 'SIGNED_UP' || (event === 'SIGNED_IN' && !profile)) {
                toast.success("Welcome!", {
                  description: "Your account has been created successfully.",
                });
                navigate('/dashboard');
              }
            } catch (err) {
              console.error('Error in auth state change:', err);
              // Create a fallback user object
              const fallbackUser: User = {
                id: session.user.id,
                email: session.user.email || '',
                name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
                role: 'free',
                subscriptionEnds: null
              };
              setUser(fallbackUser);
            }
          }, 0);
        } else {
          setUser(null);
        }
        
        setIsLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      // The onAuthStateChange will handle setting the user
      if (!session) {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const hasAccess = (minimumRole: UserRole): boolean => {
    if (!user) return false;
    return getRoleLevel(user.role) >= getRoleLevel(minimumRole);
  };

  const login = async (formData: LoginFormValues): Promise<void> => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        console.error('Login error:', error);
        toast.error("Login failed", {
          description: error.message,
        });
        return;
      }

      if (data.user) {
        toast.success("Logged in successfully", {
          description: `Welcome back!`,
        });
        
        // Check for return URL
        const urlParams = new URLSearchParams(window.location.search);
        const returnUrl = urlParams.get('returnUrl');
        
        if (returnUrl) {
          navigate(returnUrl);
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.error("Login failed", {
        description: "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (formData: SignupFormValues): Promise<void> => {
    setIsLoading(true);
    
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            name: formData.name,
            display_name: formData.name
          }
        }
      });

      if (error) {
        console.error('Signup error:', error);
        toast.error("Signup failed", {
          description: error.message,
        });
        return;
      }

      if (data.user) {
        // Check if email confirmation is required
        if (!data.user.email_confirmed_at) {
          toast.success("Account created", {
            description: "Please check your email to confirm your account before logging in.",
          });
        }
        // If email is already confirmed (like in development), the onAuthStateChange will handle the redirect
      }
    } catch (err) {
      console.error('Signup error:', err);
      toast.error("Signup failed", {
        description: "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Logout error:', error);
        toast.error("Logout failed", {
          description: error.message,
        });
        return;
      }

      toast.info("Logged out", {
        description: "You have been logged out successfully.",
      });
      
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
      toast.error("Logout failed", {
        description: "An unexpected error occurred",
      });
    }
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
