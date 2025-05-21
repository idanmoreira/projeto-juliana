
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSummary from '@/components/dashboard/DashboardSummary';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import DashboardCourses from '@/components/dashboard/DashboardCourses';
import DashboardConsultations from '@/components/dashboard/DashboardConsultations';
import DashboardResources from '@/components/dashboard/DashboardResources';
import DashboardFiles from '@/components/dashboard/DashboardFiles';
import AccessDenied from '@/components/dashboard/AccessDenied';
import AstrologyTools from '@/components/AstrologyTools';
import { useUserData } from '@/hooks/useUserData';

// Sample consultation types
const consultationTypes = [
  { id: "type1", name: "Birth Chart", description: "Complete natal chart analysis" },
  { id: "type2", name: "Solar Return", description: "Your year ahead forecast" },
  { id: "type3", name: "Relationship Synastry", description: "Compatibility analysis" },
];

const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const { profile, courses, files, consultations, isLoading, error } = useUserData();
  
  if (!user) {
    return <AccessDenied />;
  }

  if (isLoading) {
    return (
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
  }

  // Build a safe user profile even if there's an error
  const safeUserData = {
    name: profile?.display_name || user.name || user.email?.split('@')[0] || 'User',
    email: user.email,
    role: profile?.role || user.role || 'free'
  };

  // Determine if user has paid features
  const isPaid = safeUserData.role === 'paid' || safeUserData.role === 'admin';

  if (error) {
    // Show error alert but still render the dashboard with available data
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 container px-4 py-8">
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>
              Error loading some dashboard data: {error.message}
            </AlertDescription>
          </Alert>

          <DashboardHeader user={safeUserData} isPaid={isPaid} />
          <DashboardSummary user={safeUserData} isPaid={isPaid} />
          
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="grid w-full max-w-xl" style={{ 
              gridTemplateColumns: isPaid ? 'repeat(6, 1fr)' : 'repeat(3, 1fr)' 
            }}>
              {isPaid && <TabsTrigger value="overview">{t('overview')}</TabsTrigger>}
              {isPaid && <TabsTrigger value="courses">{t('courses')}</TabsTrigger>}
              <TabsTrigger value="consultations">{t('consultations')}</TabsTrigger>
              <TabsTrigger value="resources">{t('resources')}</TabsTrigger>
              <TabsTrigger value="tools">{t('tools')}</TabsTrigger>
              {isPaid && <TabsTrigger value="files">{t('myFiles')}</TabsTrigger>}
            </TabsList>
            
            {isPaid && (
              <TabsContent value="overview">
                <DashboardOverview 
                  isPaid={isPaid} 
                  courses={courses}
                />
              </TabsContent>
            )}
            
            {isPaid && (
              <TabsContent value="courses">
                <DashboardCourses 
                  isPaid={isPaid}
                  courses={courses}
                />
              </TabsContent>
            )}
            
            <TabsContent value="consultations">
              <DashboardConsultations
                isPaid={isPaid}
                consultationTypes={consultationTypes}
                consultations={consultations}
              />
            </TabsContent>
            
            <TabsContent value="resources">
              <DashboardResources isPaid={isPaid} />
            </TabsContent>
            
            <TabsContent value="tools">
              <h2 className="text-2xl font-semibold mb-4">{t('astrologyTools')}</h2>
              <AstrologyTools />
            </TabsContent>
            
            {isPaid && (
              <TabsContent value="files">
                <DashboardFiles files={files} isPaid={isPaid} />
              </TabsContent>
            )}
          </Tabs>
        </div>
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 container px-4 py-8">
        <DashboardHeader user={safeUserData} isPaid={isPaid} />
        <DashboardSummary 
          user={safeUserData} 
          isPaid={isPaid} 
        />
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid w-full max-w-xl" style={{ 
            gridTemplateColumns: isPaid ? 'repeat(6, 1fr)' : 'repeat(3, 1fr)' 
          }}>
            {isPaid && <TabsTrigger value="overview">{t('overview')}</TabsTrigger>}
            {isPaid && <TabsTrigger value="courses">{t('courses')}</TabsTrigger>}
            <TabsTrigger value="consultations">{t('consultations')}</TabsTrigger>
            <TabsTrigger value="resources">{t('resources')}</TabsTrigger>
            <TabsTrigger value="tools">{t('tools')}</TabsTrigger>
            {isPaid && <TabsTrigger value="files">{t('myFiles')}</TabsTrigger>}
          </TabsList>
          
          {isPaid && (
            <TabsContent value="overview">
              <DashboardOverview 
                isPaid={isPaid} 
                courses={courses}
              />
            </TabsContent>
          )}
          
          {isPaid && (
            <TabsContent value="courses">
              <DashboardCourses 
                isPaid={isPaid}
                courses={courses}
              />
            </TabsContent>
          )}
          
          <TabsContent value="consultations">
            <DashboardConsultations
              isPaid={isPaid}
              consultationTypes={consultationTypes}
              consultations={consultations}
            />
          </TabsContent>
          
          <TabsContent value="resources">
            <DashboardResources isPaid={isPaid} />
          </TabsContent>
          
          <TabsContent value="tools">
            <h2 className="text-2xl font-semibold mb-4">{t('astrologyTools')}</h2>
            <AstrologyTools />
          </TabsContent>
          
          {isPaid && (
            <TabsContent value="files">
              <DashboardFiles files={files} isPaid={isPaid} />
            </TabsContent>
          )}
        </Tabs>
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Dashboard;
