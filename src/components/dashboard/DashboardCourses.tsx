
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

interface DashboardCoursesProps {
  isPaid: boolean;
}

const DashboardCourses = ({ isPaid }: DashboardCoursesProps) => {
  const { t } = useLanguage();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{t('yourCourses')}</h2>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>{t('astrology101')}</CardTitle>
            <Badge className="w-max">75% {t('complete')}</Badge>
          </CardHeader>
          <CardContent>
            <div className="h-2 bg-secondary rounded-full mb-2">
              <div className="h-full bg-astral-purple rounded-full" style={{width: '75%'}}></div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-astral-purple hover:bg-astral-purple/90">
              {t('continue')}
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('birthChartBasics')}</CardTitle>
            <Badge className="w-max">100% {t('complete')}</Badge>
          </CardHeader>
          <CardContent>
            <div className="h-2 bg-secondary rounded-full mb-2">
              <div className="h-full bg-astral-purple rounded-full" style={{width: '100%'}}></div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-astral-indigo/80 hover:bg-astral-indigo">
              {t('viewCertificate')}
            </Button>
          </CardFooter>
        </Card>
        
        {isPaid && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>{t('planetaryInfluences')}</CardTitle>
                <Badge className="w-max">40% {t('complete')}</Badge>
              </CardHeader>
              <CardContent>
                <div className="h-2 bg-secondary rounded-full mb-2">
                  <div className="h-full bg-astral-purple rounded-full" style={{width: '40%'}}></div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-astral-purple hover:bg-astral-purple/90">
                  {t('continue')}
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('transitInterpretation')}</CardTitle>
                <Badge className="w-max">10% {t('complete')}</Badge>
              </CardHeader>
              <CardContent>
                <div className="h-2 bg-secondary rounded-full mb-2">
                  <div className="h-full bg-astral-purple rounded-full" style={{width: '10%'}}></div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-astral-purple hover:bg-astral-purple/90">
                  {t('continue')}
                </Button>
              </CardFooter>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardCourses;
