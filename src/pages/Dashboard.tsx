
import { useAuth } from '@/context/auth/SupabaseAuthProvider';
import { Tabs } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSummary from '@/components/dashboard/DashboardSummary';
import DashboardTabsList from '@/components/dashboard/DashboardTabsList';
import DashboardTabsContent from '@/components/dashboard/DashboardTabsContent';
import AccessDenied from '@/components/dashboard/AccessDenied';
import { useUserData } from '@/hooks/useUserData';
import { useDashboardTabs } from '@/hooks/useDashboardTabs';

// Sample consultation types
const consultationTypes = [
  { id: "type1", name: "Birth Chart", description: "Complete natal chart analysis" },
  { id: "type2", name: "Solar Return", description: "Your year ahead forecast" },
  { id: "type3", name: "Relationship Synastry", description: "Compatibility analysis" },
];

interface SafeUserData {
  name: string;
  email: string;
  role: string;
}

interface DashboardContentProps {
  safeUserData: SafeUserData;
  isPaid: boolean;
  courses: any[];
  files: any[];
  consultations: any[];
  error: Error | null;
}

const Dashboard = () => {
  const { user } = useAuth();
  const { profile, courses, files, consultations, isLoading, error } = useUserData();
  
  if (!user) {
    return <AccessDenied />;
  }

  if (isLoading) {
    return <DashboardLoadingState />;
  }

  // Build a safe user profile even if there's an error
  const safeUserData: SafeUserData = {
    name: profile?.display_name || user.name || user.email?.split('@')[0] || 'User',
    email: user.email,
    role: profile?.role || user.role || 'free'
  };

  // Determine if user has paid features
  const isPaid = safeUserData.role === 'paid' || safeUserData.role === 'admin';
  
  return (
    <DashboardContent 
      safeUserData={safeUserData}
      isPaid={isPaid}
      courses={courses}
      files={files}
      consultations={consultations}
      error={error}
    />
  );
};

// Extracted components for better code organization
const DashboardContent = ({ 
  safeUserData, 
  isPaid, 
  courses, 
  files, 
  consultations, 
  error 
}: DashboardContentProps) => {
  const { activeTab, setActiveTab, availableTabs } = useDashboardTabs(isPaid);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 container px-4 py-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>
              Error loading some dashboard data: {error.message}
            </AlertDescription>
          </Alert>
        )}

        <DashboardHeader user={safeUserData} isPaid={isPaid} />
        <DashboardSummary user={safeUserData} isPaid={isPaid} />
        
        <Tabs 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value as any)}
          className="space-y-4"
        >
          <DashboardTabsList availableTabs={availableTabs} />
          
          <DashboardTabsContent 
            activeTab={activeTab}
            isPaid={isPaid}
            courses={courses}
            files={files}
            consultations={consultations}
            consultationTypes={consultationTypes}
          />
        </Tabs>
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

const DashboardLoadingState = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <div className="flex-1 container px-4 py-8 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-astral-purple mx-auto mb-4" />
        <p className="text-muted-foreground">Loading your dashboard...</p>
      </div>
    </div>
    <Footer />
  </div>
);

export default Dashboard;
