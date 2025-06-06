
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const AdminHeader = () => {
  const { t } = useLanguage();

  return (
    <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('adminPanel')}</h1>
        <p className="text-muted-foreground mt-2">{t('adminPanelSubtitle')}</p>
      </div>
      <div className="flex gap-2">
        <Input 
          placeholder={t('searchUsers')} 
          className="w-full md:w-64" 
        />
        <Button className="bg-astral-purple hover:bg-astral-purple/90">
          {t('newUser')}
        </Button>
      </div>
    </div>
  );
};

export default AdminHeader;
