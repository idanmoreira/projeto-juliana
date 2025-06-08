
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuditLog } from './types';

export const useAdminAuditLogs = () => {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchAuditLogs = async () => {
    try {
      setIsLoading(true);
      setError(null);

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
    } finally {
      setIsLoading(false);
    }
  };

  return {
    auditLogs,
    isLoading,
    error,
    fetchAuditLogs
  };
};
