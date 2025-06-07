
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import { User, UserRole } from './types';

export const useAuthState = () => {
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
              if (event === 'SIGNED_IN' && !profile) {
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

  return {
    user,
    session,
    isLoading,
    setUser,
    setSession,
    setIsLoading
  };
};
