
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth/SupabaseAuthProvider';

export interface AdminUser {
  id: string;
  user_id: string;
  admin_level: string;
  permissions: Record<string, any>;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  profile?: {
    display_name: string | null;
    email?: string;
    role: string;
    is_paid: boolean | null;
  };
}

export interface UserStatistics {
  total_users: number;
  admin_users: number;
  paid_users: number;
  free_users: number;
  total_courses: number;
  total_consultations: number;
  total_files: number;
}

export interface AuditLog {
  id: string;
  admin_user_id: string;
  action: string;
  target_table: string | null;
  target_id: string | null;
  old_values: Record<string, any> | null;
  new_values: Record<string, any> | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

export const useAdminData = () => {
  const { user, hasAccess } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [statistics, setStatistics] = useState<UserStatistics | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUsers = async () => {
    if (!user || !hasAccess('admin')) {
      return;
    }

    try {
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
    }
  };

  const fetchStatistics = async () => {
    if (!user || !hasAccess('admin')) {
      return;
    }

    try {
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
    }
  };

  const fetchAuditLogs = async () => {
    if (!user || !hasAccess('admin')) {
      return;
    }

    try {
      const { data: logsData, error: logsError } = await supabase
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (logsError) {
        throw logsError;
      }

      // Transform the Supabase data to match our AuditLog interface
      const transformedLogs: AuditLog[] = (logsData || []).map(log => ({
        id: log.id,
        admin_user_id: log.admin_user_id,
        action: log.action,
        target_table: log.target_table,
        target_id: log.target_id,
        old_values: log.old_values as Record<string, any> | null,
        new_values: log.new_values as Record<string, any> | null,
        ip_address: log.ip_address as string | null,
        user_agent: log.user_agent,
        created_at: log.created_at,
      }));

      setAuditLogs(transformedLogs);
    } catch (err) {
      console.error('Error fetching audit logs:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch audit logs'));
    }
  };

  const updateUserRole = async (userId: string, newRole: string): Promise<boolean> => {
    if (!user || !hasAccess('admin')) {
      throw new Error('Access denied');
    }

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
      await fetchAuditLogs();
      
      return data;
    } catch (err) {
      console.error('Error updating user role:', err);
      throw err;
    }
  };

  const deleteUser = async (userId: string): Promise<boolean> => {
    if (!user || !hasAccess('admin')) {
      throw new Error('Access denied');
    }

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
      await fetchStatistics();
      
      return true;
    } catch (err) {
      console.error('Error deleting user:', err);
      throw err;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !hasAccess('admin')) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        await Promise.all([
          fetchUsers(),
          fetchStatistics(),
          fetchAuditLogs()
        ]);
      } catch (err) {
        console.error('Error fetching admin data:', err);
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, hasAccess]);

  return {
    users,
    statistics,
    auditLogs,
    isLoading,
    error,
    updateUserRole,
    deleteUser,
    refreshUsers: fetchUsers,
    refreshStatistics: fetchStatistics,
    refreshAuditLogs: fetchAuditLogs
  };
};
