
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import AdminApiManager from "./pages/AdminApiManager";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminTestimonialManager from "./pages/AdminTestimonialManager";

const queryClient = new QueryClient();

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/services" element={<Services />} />
    <Route path="/blog" element={<Blog />} />
    <Route 
      path="/dashboard" 
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/admin" 
      element={
        <ProtectedRoute requiredRole="admin">
          <AdminPanel />
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/admin/api-manager" 
      element={
        <ProtectedRoute requiredRole="admin">
          <AdminApiManager />
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/admin/testimonials" 
      element={
        <ProtectedRoute requiredRole="admin">
          <AdminTestimonialManager />
        </ProtectedRoute>
      } 
    />
    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <BrowserRouter>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
