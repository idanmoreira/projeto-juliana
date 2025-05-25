
import { Toaster as Sonner, toast } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import AdminTestimonialManager from "./pages/AdminTestimonialManager";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/auth/AuthProvider";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

/**
 * Defines the main application routes using React Router.
 * It includes public routes, authenticated routes protected by `ProtectedRoute`,
 * and admin-specific routes.
 * @returns {JSX.Element} The router configuration for the application.
 */
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/services" element={<Services />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
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
      path="/admin/testimonials" 
      element={
        <ProtectedRoute requiredRole="admin">
          <AdminTestimonialManager />
        </ProtectedRoute>
      } 
    />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

/**
 * The root component of the application.
 * It sets up essential providers for the entire application:
 * - `QueryClientProvider` for TanStack Query (data fetching and caching).
 * - `TooltipProvider` for UI tooltips.
 * - `LanguageProvider` for internationalization.
 * - `BrowserRouter` for client-side routing.
 * - `AuthProvider` for authentication state management.
 * It also renders the `Sonner` component for toast notifications and `AppRoutes` for route handling.
 * @returns {JSX.Element} The main application structure.
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <BrowserRouter>
          <AuthProvider>
            <Sonner />
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
