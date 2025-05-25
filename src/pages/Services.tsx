
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import PageLayout from '@/components/layout/PageLayout';
import PageHeader from '@/components/layout/PageHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      title: t('birthChart'),
      description: t('birthChartDesc'),
      duration: '90 min',
      price: 'R$320',
      image: '/placeholder.svg'
    },
    {
      title: t('compatibility'),
      description: t('compatibilityDesc'),
      duration: '120 min',
      price: 'R$450',
      image: '/placeholder.svg'
    },
    {
      title: t('careerReading'),
      description: 'Professional guidance based on your astrological chart to help with career decisions and growth.',
      duration: '60 min',
      price: 'R$280',
      image: '/placeholder.svg'
    },
    {
      title: t('astrologyCourse'),
      description: t('astrologyCourseDesc'),
      duration: '8 weeks',
      price: 'R$1200',
      image: '/placeholder.svg'
    }
  ];

  return (
    <PageLayout>
      <PageHeader 
        badge={t('servicesTitle')}
        title={t('servicesDesc')}
        description="Discover how astrological insights can guide you through life's challenges and opportunities."
      />

      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="overflow-hidden transition-all hover:shadow-lg border-astral-indigo/30 hover:border-astral-purple">
              <div className="aspect-video bg-gradient-to-br from-purple-100 to-astral-indigo/10 dark:from-purple-900/20 dark:to-astral-dark/50 relative">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="object-cover w-full h-full opacity-60" 
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-4xl text-astral-purple dark:text-purple-300">✧</div>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-astral-indigo dark:text-white">{service.title}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>{service.duration} • {service.price}</span>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-foreground/80">{service.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-astral-purple hover:bg-astral-purple/90">
                  {t('bookNow')}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="relative gradient-bg star-field overflow-hidden py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-astral-purple via-white to-astral-gold">
              {t('beginJourney')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-[600px]">
              {t('journeyDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button className="bg-astral-purple hover:bg-astral-purple/90" size="lg" asChild>
                <Link to="/booking">{t('bookConsultation')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Services;
