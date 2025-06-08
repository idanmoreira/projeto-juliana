
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useAdminUsers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) {
        throw profilesError;
      }

      setUsers(profilesData || []);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch users'));
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .rpc('update_user_role', {
          target_user_id: userId,
          new_role: newRole
        });

      if (error) {
        throw error;
      }

      // Refresh users after successful update
      await fetchUsers();
      
      return data;
    } catch (err) {
      console.error('Error updating user role:', err);
      throw err;
    }
  };

  const deleteUser = async (userId: string): Promise<boolean> => {
    try {
      // First, delete the profile (this will cascade to related records)
      const { error: deleteError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (deleteError) {
        throw deleteError;
      }

      // Refresh users after successful deletion
      await fetchUsers();
      
      return true;
    } catch (err) {
      console.error('Error deleting user:', err);
      throw err;
    }
  };

  return {
    users,
    isLoading,
    error,
    fetchUsers,
    updateUserRole,
    deleteUser
  };
};
