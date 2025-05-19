
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Badge } from '@/components/ui/badge';

interface DashboardOverviewProps {
  isPaid: boolean;
}

const DashboardOverview = ({ isPaid }: DashboardOverviewProps) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">{t('recentContent')}</h2>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('introductionToAstrology')}</CardTitle>
            <CardDescription>{t('introductionToAstrologyDesc')}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full bg-astral-purple hover:bg-astral-purple/90">
              <Play className="mr-2 h-4 w-4" /> {t('continue')}
            </Button>
          </CardFooter>
        </Card>
        
        {isPaid ? (
          <Card>
            <CardHeader>
              <CardTitle>{t('advancedPlanetaryTransits')}</CardTitle>
              <CardDescription>{t('advancedPlanetaryTransitsDesc')}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full bg-astral-purple hover:bg-astral-purple/90">
                <Play className="mr-2 h-4 w-4" /> {t('continue')}
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>{t('professionalChartReading')}</CardTitle>
              <CardDescription>{t('professionalChartReadingDesc')}</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge className="bg-astral-gold mb-2">{t('premiumContent')}</Badge>
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled>
                <Play className="mr-2 h-4 w-4" /> {t('premiumOnly')}
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
      
      {!isPaid && (
        <div className="p-4 rounded-lg bg-astral-gold/10 border border-astral-gold/30">
          <h3 className="font-semibold text-lg mb-2">{t('unlockPremiumContent')}</h3>
          <p className="text-muted-foreground mb-3">{t('premiumContentDesc')}</p>
          <Button className="bg-astral-gold hover:bg-astral-gold/90 text-astral-dark">
            {t('upgradeToPremium')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default DashboardOverview;
