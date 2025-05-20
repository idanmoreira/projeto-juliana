
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import WhatsAppButton from '@/components/WhatsAppButton';

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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-purple-50 to-white dark:from-purple-950/20 dark:to-background py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-3 py-1 rounded-full text-sm font-medium mb-2">
                {t('servicesTitle')}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
                {t('servicesDesc')}
              </h1>
              <p className="text-muted-foreground text-lg max-w-[700px]">
                Choose from our range of professional astrological consultations tailored to your specific needs and questions.
              </p>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="container px-4 md:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                <div className="aspect-video bg-purple-100 dark:bg-purple-900/20 relative">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="object-cover w-full h-full opacity-60" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl text-purple-500 dark:text-purple-300">✧</div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{service.title}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>{service.duration} • {service.price}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{service.description}</CardDescription>
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
        
        {/* CTA Section */}
        <div className="bg-purple-50 dark:bg-purple-950/10 py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold">{t('beginJourney')}</h2>
              <p className="text-muted-foreground max-w-[600px]">
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
      </main>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Services;
