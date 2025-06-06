
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

const AccessDenied = () => {
  const { t } = useLanguage();
  
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-3">{t('accessDenied')}</h1>
        <p className="text-muted-foreground mb-4">{t('pleaseLogin')}</p>
        <Button asChild>
          <a href="/login">{t('login')}</a>
        </Button>
      </div>
    </div>
  );
};

export default AccessDenied;
