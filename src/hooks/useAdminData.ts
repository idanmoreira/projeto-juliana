
import { useEffect } from 'react';
import { useAuth } from '@/context/auth/SupabaseAuthProvider';
import { useAdminUsers } from './admin/useAdminUsers';
import { useAdminStatistics } from './admin/useAdminStatistics';
import { useAdminAuditLogs } from './admin/useAdminAuditLogs';

// Re-export types for backward compatibility
export type { AdminUser, UserStatistics, AuditLog } from './admin/types';

export const useAdminData = () => {
  const { user, hasAccess } = useAuth();
  
  const {
    users,
    isLoading: usersLoading,
    error: usersError,
    fetchUsers,
    updateUserRole,
    deleteUser
  } = useAdminUsers();

  const {
    statistics,
    isLoading: statisticsLoading,
    error: statisticsError,
    fetchStatistics
  } = useAdminStatistics();

  const {
    auditLogs,
    isLoading: auditLogsLoading,
    error: auditLogsError,
    fetchAuditLogs
  } = useAdminAuditLogs();

  // Combine loading states
  const isLoading = usersLoading || statisticsLoading || auditLogsLoading;
  
  // Combine errors (prioritize the first error found)
  const error = usersError || statisticsError || auditLogsError;

  const updateUserRoleWithRefresh = async (userId: string, newRole: string): Promise<boolean> => {
    const result = await updateUserRole(userId, newRole);
    // Refresh audit logs after user role update
    await fetchAuditLogs();
    return result;
  };

  const deleteUserWithRefresh = async (userId: string): Promise<boolean> => {
    const result = await deleteUser(userId);
    // Refresh statistics after user deletion
    await fetchStatistics();
    return result;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !hasAccess('admin')) {
        return;
      }

      try {
        await Promise.all([
          fetchUsers(),
          fetchStatistics(),
          fetchAuditLogs()
        ]);
      } catch (err) {
        console.error('Error fetching admin data:', err);
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
    updateUserRole: updateUserRoleWithRefresh,
    deleteUser: deleteUserWithRefresh,
    refreshUsers: fetchUsers,
    refreshStatistics: fetchStatistics,
    refreshAuditLogs: fetchAuditLogs
  };
};
