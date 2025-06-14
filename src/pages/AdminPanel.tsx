
import React from 'react';
import { useAuth } from '@/context/auth/SupabaseAuthProvider';
import { Navigate } from 'react-router-dom';
// Removed: import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ContentManager from '@/components/admin/ContentManager';
import AdminHeader from '@/components/admin/AdminHeader';
import UsersTab from '@/components/admin/tabs/UsersTab';
import ContentTab from '@/components/admin/tabs/ContentTab';
import SubscriptionsTab from '@/components/admin/tabs/SubscriptionsTab';
import AnalyticsTab from '@/components/admin/tabs/AnalyticsTab';

const AdminPanel: React.FC = () => {
  const { isAuthenticated, hasAccess, isLoading } = useAuth();
  // Removed: const { t } = useLanguage();
  
  if (isLoading) {
    return <div className="h-screen flex items-center justify-center">Carregando...</div>;
  }
  
  if (!isAuthenticated || !hasAccess('admin')) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 container px-4 py-8">
        <AdminHeader />
        
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList className="overflow-x-auto">
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="content">Conteúdo</TabsTrigger>
            <TabsTrigger value="cms">CMS</TabsTrigger>
            <TabsTrigger value="subscriptions">Assinaturas</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users">
            <UsersTab />
          </TabsContent>
          
          <TabsContent value="content">
            <ContentTab />
          </TabsContent>
          
          <TabsContent value="cms">
            <ContentManager />
          </TabsContent>
          
          <TabsContent value="subscriptions">
            <SubscriptionsTab />
          </TabsContent>
          
          <TabsContent value="analytics">
            <AnalyticsTab />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPanel;
