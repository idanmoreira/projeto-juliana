
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminData } from '@/hooks/useAdminData';
import { formatDistanceToNow } from 'date-fns';

const AnalyticsTab = () => {
  const { t } = useLanguage();
  const { statistics, auditLogs, isLoading } = useAdminData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-astral-purple"></div>
        <span className="ml-2">Loading analytics...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* System Statistics */}
      {statistics && (
        <Card>
          <CardHeader>
            <CardTitle>System Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{statistics.total_users}</div>
                <div className="text-sm text-gray-600">Total Users</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">{statistics.total_courses}</div>
                <div className="text-sm text-gray-600">Total Courses</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600">{statistics.total_consultations}</div>
                <div className="text-sm text-gray-600">Total Consultations</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-3xl font-bold text-orange-600">{statistics.total_files}</div>
                <div className="text-sm text-gray-600">Total Files</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* User Role Distribution */}
      {statistics && (
        <Card>
          <CardHeader>
            <CardTitle>User Role Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-600">{statistics.free_users}</div>
                <div className="text-sm text-gray-600">Free Users</div>
                <div className="text-xs text-gray-500">
                  {statistics.total_users > 0 ? Math.round((statistics.free_users / statistics.total_users) * 100) : 0}%
                </div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{statistics.paid_users}</div>
                <div className="text-sm text-gray-600">Paid Users</div>
                <div className="text-xs text-gray-500">
                  {statistics.total_users > 0 ? Math.round((statistics.paid_users / statistics.total_users) * 100) : 0}%
                </div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{statistics.admin_users}</div>
                <div className="text-sm text-gray-600">Admin Users</div>
                <div className="text-xs text-gray-500">
                  {statistics.total_users > 0 ? Math.round((statistics.admin_users / statistics.total_users) * 100) : 0}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Admin Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Admin Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {auditLogs.length > 0 ? (
            <div className="space-y-3">
              {auditLogs.slice(0, 10).map((log) => (
                <div key={log.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{log.action.replace('_', ' ')}</div>
                    {log.target_table && (
                      <div className="text-sm text-gray-600">
                        Table: {log.target_table}
                        {log.target_id && ` (ID: ${log.target_id.slice(0, 8)}...)`}
                      </div>
                    )}
                    {log.new_values && (
                      <div className="text-xs text-gray-500 mt-1">
                        Changes: {JSON.stringify(log.new_values)}
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(log.created_at), { addSuffix: true })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No admin activity recorded yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsTab;
