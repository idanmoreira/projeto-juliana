
import { useState } from 'react';

export type DashboardTab = 'overview' | 'courses' | 'consultations' | 'resources' | 'tools' | 'files';

export function useDashboardTabs(isPaid: boolean) {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  
  // Get available tabs based on user role
  const availableTabs: Array<{ value: DashboardTab; label: string }> = [
    ...(isPaid ? [
      { value: 'overview', label: 'overview' },
      { value: 'courses', label: 'courses' },
    ] : []),
    { value: 'consultations', label: 'consultations' },
    { value: 'resources', label: 'resources' },
    { value: 'tools', label: 'tools' },
    ...(isPaid ? [{ value: 'files', label: 'files' }] : []),
  ];

  return {
    activeTab,
    setActiveTab,
    availableTabs
  };
}
