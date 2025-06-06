
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AnalyticsTab = () => {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{t('analytics')}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              {t('lastMonth')}
            </Button>
            <Button variant="outline" size="sm">
              {t('last3Months')}
            </Button>
            <Button variant="outline" size="sm" className="bg-muted">
              {t('lastYear')}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full bg-muted rounded-md flex items-center justify-center mb-4">
          <p className="text-muted-foreground">{t('analyticsChart')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm font-medium text-muted-foreground mb-1">{t('visitors')}</p>
              <p className="text-2xl font-bold">14.2K</p>
              <p className="text-xs text-green-500 font-medium mt-1">+12%</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm font-medium text-muted-foreground mb-1">{t('newUsers')}</p>
              <p className="text-2xl font-bold">1.2K</p>
              <p className="text-xs text-green-500 font-medium mt-1">+8%</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm font-medium text-muted-foreground mb-1">{t('conversions')}</p>
              <p className="text-2xl font-bold">8.7%</p>
              <p className="text-xs text-green-500 font-medium mt-1">+2.3%</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm font-medium text-muted-foreground mb-1">{t('revenue')}</p>
              <p className="text-2xl font-bold">$12.4K</p>
              <p className="text-xs text-green-500 font-medium mt-1">+23%</p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsTab;
