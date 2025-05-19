
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, FileText, Play } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface DashboardResourcesProps {
  isPaid: boolean;
}

const DashboardResources = ({ isPaid }: DashboardResourcesProps) => {
  const { t } = useLanguage();
  
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{t('learningResources')}</h2>
      
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('basicResources')}</CardTitle>
            <CardDescription>{t('freeContent')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="mr-2 h-4 w-4 text-astral-purple" />
                <span>{t('introToAstrology')}</span>
              </div>
              <Button variant="ghost" size="sm">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Play className="mr-2 h-4 w-4 text-astral-purple" />
                <span>{t('zodiacBasics')}</span>
              </div>
              <Button variant="ghost" size="sm">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="mr-2 h-4 w-4 text-astral-purple" />
                <span>{t('planetaryMeanings')}</span>
              </div>
              <Button variant="ghost" size="sm">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('premiumResources')}</CardTitle>
            <CardDescription>{t('paidContentOnly')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="mr-2 h-4 w-4 text-astral-purple" />
                <span>{t('advancedChartReading')}</span>
              </div>
              {isPaid ? (
                <Button variant="ghost" size="sm">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button variant="ghost" size="sm" disabled>
                  <CheckCircle className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Play className="mr-2 h-4 w-4 text-astral-purple" />
                <span>{t('masterClass')}</span>
              </div>
              {isPaid ? (
                <Button variant="ghost" size="sm">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button variant="ghost" size="sm" disabled>
                  <CheckCircle className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="mr-2 h-4 w-4 text-astral-purple" />
                <span>{t('professionalTechniques')}</span>
              </div>
              {isPaid ? (
                <Button variant="ghost" size="sm">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button variant="ghost" size="sm" disabled>
                  <CheckCircle className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
          {!isPaid && (
            <CardFooter>
              <Button className="w-full bg-astral-gold hover:bg-astral-gold/90 text-astral-dark">
                {t('upgradeToAccess')}
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
};

export default DashboardResources;
