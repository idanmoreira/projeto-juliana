
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContentManager from '@/components/admin/ContentManager';
import WhatsAppButton from '@/components/WhatsAppButton';
import ProtectedRoute from '@/components/ProtectedRoute';

const AdminCmsManager = () => {
  return (
    <ProtectedRoute requiredRole="admin">
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 container px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">CMS Manager</h1>
            <p className="text-muted-foreground mt-2">
              Manage all content across your application including pages, blog posts, services, and courses
            </p>
          </div>
          
          <ContentManager />
        </div>
        <Footer />
        <WhatsAppButton />
      </div>
    </ProtectedRoute>
  );
};

export default AdminCmsManager;
