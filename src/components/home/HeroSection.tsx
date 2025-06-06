
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import HeroLogo from '@/assets/icons/hero-logo.svg?react';

/**
 * Renders the main hero section for the homepage.
 * This component displays a prominent title, subtitle, and call-to-action buttons.
 * It features an animated logo and a gradient background with a star field effect.
 * Internationalization is handled using the `useLanguage` hook to fetch translated strings.
 * @returns {JSX.Element} The hero section component.
 */
const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative gradient-bg star-field overflow-hidden py-20 md:py-32">
      <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8">
        <div className="relative w-24 h-24 mb-6">
          <div className="absolute inset-0 rounded-full bg-astral-purple opacity-30 animate-pulse"></div>
          <div className="absolute inset-[15%] rounded-full bg-astral-gold/20 border border-astral-gold"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <HeroLogo className="w-12 h-12 text-astral-gold animate-float" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-astral-purple via-white to-astral-gold">
          {t('heroTitle')}
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
          {t('heroSubtitle')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="bg-astral-purple hover:bg-astral-purple/90 text-white">
            {t('bookConsultation')}
          </Button>
          <Button size="lg" variant="outline" className="border-astral-gold text-astral-gold hover:bg-astral-gold/10">
            {t('exploreServices')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
