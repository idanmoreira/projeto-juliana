
import React from 'react';
import { useLanguage } from "@/context/LanguageContext";
import AstrologyTools from "@/components/AstrologyTools";

const ToolsSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-astral-midnight/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t('astrologyTools')}</h2>
          <p className="text-muted-foreground max-w-2xl">
            {t('astrologyToolsDesc')}
          </p>
        </div>
        
        <AstrologyTools />
      </div>
    </section>
  );
};

export default ToolsSection;
