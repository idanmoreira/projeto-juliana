
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

interface DashboardSummaryProps {
  isPaid: boolean;
  user: {
    name?: string;
    email?: string;
    role?: string;
  } | null;
}

const DashboardSummary = ({ isPaid, user }: DashboardSummaryProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="mb-8 grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{t('coursesEnrolled')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{isPaid ? "12" : "2"}</div>
          <p className="text-sm text-muted-foreground">
            {isPaid ? t('accessToAllCourses') : t('accessToBasicCourses')}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{t('upcomingConsultations')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{isPaid ? "1" : "0"}</div>
          <p className="text-sm text-muted-foreground">
            {isPaid ? t('nextConsultationTomorrow') : t('consultationsRequirePaidPlan')}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{t('accountType')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <div className="text-xl font-bold mr-2">
              {user?.role === 'admin' 
                ? t('adminAccount') 
                : isPaid 
                  ? t('paidAccount') 
                  : t('freeAccount')
              }
            </div>
            <Badge variant={isPaid ? "default" : "outline"} className={isPaid ? "bg-astral-purple" : ""}>
              {isPaid ? "Premium" : "Free"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {isPaid ? t('fullAccessEnabled') : t('upgradeToPremiumForMoreAccess')}
          </p>
          {!isPaid && (
            <Button 
              className="mt-4 w-full bg-astral-purple hover:bg-astral-purple/90 text-white"
            >
              {t('upgradeToPremium')}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSummary;
