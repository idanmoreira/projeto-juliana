
import { Toggle } from '@/components/ui/toggle';
import { useLanguage } from '../../context/LanguageContext';

interface NavbarLanguageToggleProps {
  isMobile?: boolean;
}

const NavbarLanguageToggle = ({ isMobile = false }: NavbarLanguageToggleProps) => {
  const { language, changeLanguage } = useLanguage();

  const containerClass = isMobile 
    ? "flex items-center py-2 justify-center"
    : "flex items-center justify-center";

  return (
    <div className={containerClass}>
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
        <div className={`absolute top-1 bottom-1 w-7 rounded-full transition-all duration-200 ${language === 'pt-BR' ? 'left-1 bg-astral-indigo' : 'right-1 bg-astral-indigo'}`} />
      </Toggle>
    </div>
  );
};

export default NavbarLanguageToggle;
