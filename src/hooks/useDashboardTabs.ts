
import { useState } from 'react';

export type DashboardTab = 'overview' | 'courses' | 'consultations' | 'resources' | 'tools' | 'files';

export function useDashboardTabs(isPaid: boolean) {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  
  // Get available tabs based on user role
  const availableTabs: Array<{ value: DashboardTab; label: string }> = [
    ...(isPaid ? [
      { value: 'overview' as DashboardTab, label: 'overview' },
      { value: 'courses' as DashboardTab, label: 'courses' },
    ] : []),
    { value: 'consultations' as DashboardTab, label: 'consultations' },
    { value: 'resources' as DashboardTab, label: 'resources' },
    { value: 'tools' as DashboardTab, label: 'tools' },
    ...(isPaid ? [{ value: 'files' as DashboardTab, label: 'files' }] : []),
  ];

  return {
    activeTab,
    setActiveTab,
    availableTabs
  };
}
