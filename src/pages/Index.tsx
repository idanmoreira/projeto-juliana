
import PageLayout from "@/components/layout/PageLayout";
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
    <PageLayout>
      <HeroSection />
      <FeaturesSection />
      <SocialMediaSection />
      <ServicesSection />
      <TestimonialsSection />
      <BlogPreviewSection />
      <ToolsSection />
      <CTASection />
      <NewsletterSection />
    </PageLayout>
  );
};

export default Index;
