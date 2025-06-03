
import React from 'react';
import { Toggle } from '@/components/ui/toggle';
import { useLanguage } from '../../context/LanguageContext';

const LanguageToggle = () => {
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="flex items-center justify-center">
      <Toggle 
        pressed={language === 'pt-BR'}
        onPressedChange={() => changeLanguage(language === 'pt-BR' ? 'en-GB' : 'pt-BR')}
        className="w-16 h-8 relative rounded-full border border-border bg-muted hover:bg-muted/80"
      >
        <div className="absolute inset-0 flex items-center justify-between px-2">
          <span className={`z-10 text-xs font-medium transition-colors ${language === 'pt-BR' ? 'text-white' : 'text-muted-foreground'}`}>
            PT
          </span>
          <span className={`z-10 text-xs font-medium transition-colors ${language === 'en-GB' ? 'text-white' : 'text-muted-foreground'}`}>
            EN
          </span>
        </div>
        <div className={`absolute top-1 bottom-1 w-7 rounded-full transition-all duration-200 ${language === 'pt-BR' ? 'left-1 bg-astral-gold' : 'right-1 bg-astral-gold'}`} />
      </Toggle>
    </div>
  );
};

export default LanguageToggle;
