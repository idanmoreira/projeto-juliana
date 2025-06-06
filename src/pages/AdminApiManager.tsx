
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ApiManager from '@/components/admin/ApiManager';
import WhatsAppButton from '@/components/WhatsAppButton';

const AdminApiManager = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">API Management</h1>
          <p className="text-muted-foreground mt-2">
            Configure and manage API integrations for astrology tools
          </p>
        </div>
        
        <ApiManager />
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default AdminApiManager;
