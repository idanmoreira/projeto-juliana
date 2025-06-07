
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';
import { supabase } from '@/integrations/supabase/client';
import { LoginFormValues, SignupFormValues } from './validation';

export const useAuthActions = (setIsLoading: (loading: boolean) => void) => {
  const navigate = useNavigate();

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

  return {
    login,
    signup,
    logout
  };
};
