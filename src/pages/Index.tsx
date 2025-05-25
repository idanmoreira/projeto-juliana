
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import SocialMediaSection from "@/components/home/SocialMediaSection";
import ServicesSection from "@/components/home/ServicesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import BlogPreviewSection from "@/components/home/BlogPreviewSection";
import ToolsSection from "@/components/home/ToolsSection";
import CTASection from "@/components/home/CTASection";
import NewsletterSection from "@/components/home/NewsletterSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <SocialMediaSection />
      <ServicesSection />
      <TestimonialsSection />
      <BlogPreviewSection />
      <ToolsSection />
      <CTASection />
      <NewsletterSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
