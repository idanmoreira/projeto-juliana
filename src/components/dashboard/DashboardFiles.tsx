
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import UserFiles from '@/components/UserFiles';
import { UserFile } from '@/hooks/useUserData';

interface DashboardFilesProps {
  files: UserFile[];
  isPaid: boolean;
}

const DashboardFiles = ({ files, isPaid }: DashboardFilesProps) => {
  const { t } = useLanguage();
  
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{t('myFiles')}</h2>
      <p className="text-muted-foreground mb-6">{t('filesDescription')}</p>
      
      <UserFiles files={files} isPremium={isPaid} />
    </div>
  );
};

export default DashboardFiles;
