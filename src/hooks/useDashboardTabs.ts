
import { useState } from 'react';

export type DashboardTab = 'overview' | 'courses' | 'consultations' | 'resources' | 'tools' | 'files';

export function useDashboardTabs(isPaid: boolean) {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  
  // Get available tabs based on user role
  const availableTabs: Array<{ value: DashboardTab; label: string }> = [];
  
  // Always add these tabs for all users
  if (isPaid) {
    availableTabs.push({ value: 'overview', label: 'overview' });
    availableTabs.push({ value: 'courses', label: 'courses' });
  }
  
  // These tabs are available for everyone
  availableTabs.push({ value: 'consultations', label: 'consultations' });
  availableTabs.push({ value: 'resources', label: 'resources' });
  availableTabs.push({ value: 'tools', label: 'tools' });
  
  // Files tab only for paid users
  if (isPaid) {
    availableTabs.push({ value: 'files', label: 'files' });
  }

  // Make sure the active tab is valid
  if (activeTab && !availableTabs.some(tab => tab.value === activeTab)) {
    // If the current active tab isn't available, default to the first available tab
    setActiveTab(availableTabs[0]?.value || 'consultations');
  }

  return {
    activeTab,
    setActiveTab,
    availableTabs
  };
}
