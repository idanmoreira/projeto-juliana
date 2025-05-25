
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SocialMediaBox from '../components/SocialMediaBox';
import WhatsAppButton from '../components/WhatsAppButton';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Heart, Users } from "lucide-react";
import { Link } from 'react-router-dom';

const Index = () => {
  const { t } = useLanguage();

  // Static testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Maria Silva",
      text: "The birth chart reading was incredibly accurate and insightful. It helped me understand myself better.",
      rating: 5
    },
    {
      id: 2,
      name: "João Santos",
      text: "Amazing consultation! Juliana's guidance about my career path was exactly what I needed.",
      rating: 5
    },
    {
      id: 3,
      name: "Ana Costa",
      text: "The relationship compatibility reading helped us understand our dynamics so much better.",
      rating: 5
    }
  ];

  const handleContactClick = () => {
    window.open('https://wa.me/5511999999999', '_blank');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative gradient-bg star-field overflow-hidden py-24 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-astral-purple via-white to-astral-gold">
                    {t('heroTitle')}
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    {t('heroSubtitle')}
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button 
                    className="bg-astral-purple hover:bg-astral-purple/90" 
                    size="lg"
                    onClick={handleContactClick}
                  >
                    {t('bookConsultation')}
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/services">{t('exploreServices')}</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <SocialMediaBox />
              </div>
            </div>
          </div>
        </div>

        {/* Services Preview */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-astral-indigo dark:text-white">
                  {t('services')}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t('servicesDesc')}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Card className="border-astral-indigo/30">
                <CardHeader>
                  <CardTitle className="text-astral-indigo dark:text-white">{t('birthChart')}</CardTitle>
                  <CardDescription>{t('birthChartDesc')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-astral-purple hover:bg-astral-purple/90" asChild>
                    <Link to="/services">{t('learnMore')}</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="border-astral-indigo/30">
                <CardHeader>
                  <CardTitle className="text-astral-indigo dark:text-white">{t('compatibility')}</CardTitle>
                  <CardDescription>{t('compatibilityDesc')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-astral-purple hover:bg-astral-purple/90" asChild>
                    <Link to="/services">{t('learnMore')}</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="gradient-bg star-field py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-astral-purple via-white to-astral-gold">
                  {t('testimonials')}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t('testimonialsDesc')}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="border-astral-indigo/30 bg-background/50 backdrop-blur">
                  <CardHeader>
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-astral-gold text-astral-gold" />
                      ))}
                    </div>
                    <CardTitle className="text-base text-astral-indigo dark:text-white">{testimonial.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">"{testimonial.text}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-astral-indigo dark:text-white">
                  {t('beginJourney')}
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  {t('journeyDesc')}
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button 
                  className="bg-astral-purple hover:bg-astral-purple/90" 
                  size="lg"
                  onClick={handleContactClick}
                >
                  {t('bookConsultation')}
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/blog">{t('readBlog')}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
