
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import AdminTestimonialManager from './pages/AdminTestimonialManager';
import AdminCmsManager from './pages/AdminCmsManager';
import Services from './pages/Services';
import Blog from './pages/Blog';
import ProtectedRoute from './components/ProtectedRoute';

/**
 * Centralized routing configuration for the application.
 * All route definitions are organized here for better maintainability.
 */
export const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<Index />} />
    <Route path="/services" element={<Services />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    
    {/* Protected User Routes */}
    <Route 
      path="/dashboard" 
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } 
    />
    
    {/* Protected Admin Routes */}
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
    <Route 
      path="/admin/cms" 
      element={
        <ProtectedRoute requiredRole="admin">
          <AdminCmsManager />
        </ProtectedRoute>
      } 
    />
    
    {/* Catch-all Route */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);
