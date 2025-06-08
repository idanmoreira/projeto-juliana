
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
