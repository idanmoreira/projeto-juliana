
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TestimonialManager from '@/components/admin/TestimonialManager';
import WhatsAppButton from '@/components/WhatsAppButton';
import ProtectedRoute from '@/components/ProtectedRoute';

const AdminTestimonialManager = () => {
  return (
    <ProtectedRoute requiredRole="admin">
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 container px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Manage Testimonials</h1>
            <p className="text-muted-foreground mt-2">
              Manage client testimonials displayed on the home page
            </p>
          </div>
          
          <TestimonialManager />
        </div>
        <Footer />
        <WhatsAppButton />
      </div>
    </ProtectedRoute>
  );
};

export default AdminTestimonialManager;
