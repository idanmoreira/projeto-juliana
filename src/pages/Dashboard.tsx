
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

// Sample user files for demonstration - Updated with proper literal types
const userFiles = [
  {
    id: "1",
    name: "Birth Chart Analysis.pdf",
    type: "document" as const,  // Using literal type
    size: "2.4 MB",
    date: "2025-04-18",
    url: "#",
    consultationId: "c1"
  },
  {
    id: "2",
    name: "Transit Forecast 2025.pdf",
    type: "document" as const,  // Using literal type
    size: "3.1 MB",
    date: "2025-05-10",
    url: "#",
    consultationId: "c2"
  },
  {
    id: "3",
    name: "Your Astral Map.jpg",
    type: "image" as const,  // Using literal type
    size: "1.2 MB",
    date: "2025-04-28",
    url: "#",
    consultationId: "c1"
  },
  {
    id: "4",
    name: "Venus Retrograde Effects.pptx",
    type: "presentation" as const,  // Using literal type
    size: "4.8 MB",
    date: "2025-05-15",
    url: "#",
    consultationId: "c3"
  }
];

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
  
  if (!user) {
    return <AccessDenied />;
  }

  const isPaid = user.role === 'paid' || user.role === 'admin';
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 container px-4 py-8">
        <DashboardHeader user={user} isPaid={isPaid} />
        <DashboardSummary user={user} isPaid={isPaid} />
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid w-full max-w-xl" style={{ 
            gridTemplateColumns: isPaid ? 'repeat(5, 1fr)' : 'repeat(2, 1fr)' 
          }}>
            {isPaid && <TabsTrigger value="overview">{t('overview')}</TabsTrigger>}
            {isPaid && <TabsTrigger value="courses">{t('courses')}</TabsTrigger>}
            <TabsTrigger value="consultations">{t('consultations')}</TabsTrigger>
            <TabsTrigger value="resources">{t('resources')}</TabsTrigger>
            {isPaid && <TabsTrigger value="files">{t('myFiles')}</TabsTrigger>}
          </TabsList>
          
          {isPaid && (
            <TabsContent value="overview">
              <DashboardOverview isPaid={isPaid} />
            </TabsContent>
          )}
          
          {isPaid && (
            <TabsContent value="courses">
              <DashboardCourses isPaid={isPaid} />
            </TabsContent>
          )}
          
          <TabsContent value="consultations">
            <DashboardConsultations
              isPaid={isPaid}
              consultationTypes={consultationTypes}
            />
          </TabsContent>
          
          <TabsContent value="resources">
            <DashboardResources isPaid={isPaid} />
          </TabsContent>
          
          {isPaid && (
            <TabsContent value="files">
              <DashboardFiles files={userFiles} isPaid={isPaid} />
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
