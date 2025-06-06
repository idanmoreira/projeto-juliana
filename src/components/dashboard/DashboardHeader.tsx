
import { useLanguage } from '@/context/LanguageContext';

interface DashboardHeaderProps {
  user: {
    name?: string;
    email?: string;
    role?: string;
  } | null;
  isPaid: boolean;
}

const DashboardHeader = ({ user, isPaid }: DashboardHeaderProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight">{t('welcomeUser')}</h1>
      <p className="text-muted-foreground mt-2">
        {user?.role === 'admin' 
          ? t('adminDashboardSubtitle') 
          : isPaid 
            ? t('paidDashboardSubtitle')
            : t('freeDashboardSubtitle')
        }
      </p>
      
      {user?.role === 'paid' && (
        <div className="mt-4 p-3 bg-astral-purple/10 border border-astral-purple/30 rounded-md inline-block">
          <p className="text-sm font-medium text-astral-purple">
            {t('subscriptionValidUntil')}
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
