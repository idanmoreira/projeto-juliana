
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth/SupabaseAuthProvider';

interface Consultation {
  id: string;
  title: string;
  description: string;
  date: string;
  status: string;
  price: number;
  is_premium: boolean;
  consultation_type_id: string;
  appointment_slot_id: string;
  meeting_url?: string;
  notes?: string;
  payment_status: string;
}

export const useConsultations = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setConsultations([]);
      setIsLoading(false);
      return;
    }

    const fetchConsultations = async () => {
      try {
        const { data, error } = await supabase
          .from('consultations')
          .select('*')
          .order('date', { ascending: true });

        if (error) {
          console.error('Error fetching consultations:', error);
          return;
        }

        setConsultations(data || []);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConsultations();
  }, [user]);

  return {
    consultations,
    isLoading,
    refetch: () => {
      if (user) {
        setIsLoading(true);
        // Re-run the fetch logic
      }
    }
  };
};
