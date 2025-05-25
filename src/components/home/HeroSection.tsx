
import React from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative gradient-bg star-field overflow-hidden py-20 md:py-32">
      <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8">
        <div className="relative w-24 h-24 mb-6">
          <div className="absolute inset-0 rounded-full bg-astral-purple opacity-30 animate-pulse"></div>
          <div className="absolute inset-[15%] rounded-full bg-astral-gold/20 border border-astral-gold"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-astral-gold animate-float">
              <circle cx="12" cy="12" r="10" />
              <path d="m16 12-4-4-4 4" />
              <path d="m8 12 4 4 4-4" />
            </svg>
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
