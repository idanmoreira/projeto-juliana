
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { UserStatistics } from './types';

export const useAdminStatistics = () => {
  const [statistics, setStatistics] = useState<UserStatistics | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchStatistics = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data: statsData, error: statsError } = await supabase
        .rpc('get_user_statistics');

      if (statsError) {
        throw statsError;
      }

      // Safely convert the Json response to our UserStatistics interface
      if (statsData && typeof statsData === 'object' && !Array.isArray(statsData)) {
        const stats = statsData as Record<string, any>;
        setStatistics({
          total_users: Number(stats.total_users) || 0,
          admin_users: Number(stats.admin_users) || 0,
          paid_users: Number(stats.paid_users) || 0,
          free_users: Number(stats.free_users) || 0,
          total_courses: Number(stats.total_courses) || 0,
          total_consultations: Number(stats.total_consultations) || 0,
          total_files: Number(stats.total_files) || 0,
        });
      } else {
        console.warn('Invalid statistics data received:', statsData);
        setStatistics(null);
      }
    } catch (err) {
      console.error('Error fetching statistics:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch statistics'));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    statistics,
    isLoading,
    error,
    fetchStatistics
  };
};
