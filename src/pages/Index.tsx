import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Calendar, Star, ArrowRight, Sparkles, BookOpen, Clock, Shield, Award, Globe, Instagram, Youtube, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "../context/LanguageContext";
import VerticalSocialMediaBox from "@/components/VerticalSocialMediaBox";
import AstrologyTools from "@/components/AstrologyTools";
import WhatsAppButton from "@/components/WhatsAppButton";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from '@tanstack/react-query';

const Index = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const { t } = useLanguage();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Subscribed!",
      description: "Thank you for joining our newsletter.",
    });
    setEmail("");
  };
  
  // Sample testimonials
  const testimonials = [
    {
      name: "Maria Silva",
      text: "Juliana's astrological reading was incredibly insightful. She provided guidance that helped me make important life decisions with confidence.",
      stars: 5,
      position: "Marketing Director",
    },
    {
      name: "Carlos Mendes",
      text: "I was skeptical at first, but after my session with Juliana, I understood myself better. Her therapeutic approach combines modern psychology with astrological wisdom.",
      stars: 5,
      position: "Software Engineer",
    },
    {
      name: "Ana Costa",
      text: "The birth chart analysis was spot on. Juliana has a gift for translating complex astrological concepts into practical advice.",
      stars: 5,
      position: "Yoga Instructor",
    },
  ];

  // Sample services
  const services = [
    {
      titleKey: 'birthChart',
      descriptionKey: 'birthChartDesc',
      price: "R$ 320",
      duration: "90 minutes",
      icon: <Sparkles size={24} className="text-astral-purple" />,
    },
    {
      titleKey: 'compatibility',
      descriptionKey: 'compatibilityDesc',
      price: "R$ 380",
      duration: "120 minutes",
      icon: <Star size={24} className="text-astral-purple" />,
    },
    {
      titleKey: 'astrologyCourse',
      descriptionKey: 'astrologyCourseDesc',
      price: "R$ 950",
      duration: "8 weeks",
      icon: <BookOpen size={24} className="text-astral-purple" />,
    },
  ];

  // Sample blog posts
  const blogPosts = [
    {
      title: "How Jupiter's Transit Affects Your Career",
      excerpt: "Learn how the planet of expansion influences your professional life and career opportunities.",
      date: "May 15, 2023",
      category: "Career Astrology",
      image: "/placeholder.svg",
    },
    {
      title: "The Moon's Phases and Your Emotional Wellbeing",
      excerpt: "Discover the connection between lunar cycles and your emotional states for better self-care.",
      date: "April 23, 2023",
      category: "Wellness",
      image: "/placeholder.svg",
    },
    {
      title: "Venus Retrograde: Navigating Relationship Challenges",
      excerpt: "Practical guidance for handling relationship issues during Venus retrograde periods.",
      date: "March 10, 2023",
      category: "Relationships",
      image: "/placeholder.svg",
    },
  ];

  // Social media channels
  const socialChannels = [
    {
      platform: "Instagram",
      icon: <Instagram size={40} className="text-white" />,
      username: "@julianamanduca",
      url: "https://instagram.com/julianamanduca",
      bgColor: "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500",
    },
    {
      platform: "YouTube",
      icon: <Youtube size={40} className="text-white" />,
      username: "Juliana Manduca Astrology",
      url: "https://youtube.com/julianamanduca",
      bgColor: "bg-red-600",
    },
    {
      platform: "TikTok",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>,
      username: "@julianamanduca",
      url: "https://tiktok.com/@julianamanduca",
      bgColor: "bg-black",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative gradient-bg star-field overflow-hidden py-20 md:py-32">
        <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8">
          <div className="relative w-24 h-24 mb-6">
            <div className="absolute inset-0 rounded-full bg-astral-purple opacity-30 animate-pulse"></div>
            <div className="absolute inset-[15%] rounded-full bg-astral-gold/20 border border-astral-gold"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-astral-gold animate-float">
                <circle cx="12" cy="12" r="10" />
                <path d="m16 12-4-4-4 4" />
                <path d="m8 12 4 4 4-4" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-astral-purple via-white to-astral-gold">
            {t('heroTitle')}
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            {t('heroSubtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-astral-purple hover:bg-astral-purple/90 text-white">
              {t('bookConsultation')}
            </Button>
            <Button size="lg" variant="outline" className="border-astral-gold text-astral-gold hover:bg-astral-gold/10">
              {t('exploreServices')}
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-astral-dark/70">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('whyChoose')}</h2>
            <p className="text-muted-foreground max-w-2xl">
              {t('certifiedDesc')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Feature 1 */}
            <Card className="bg-card/50 border-astral-indigo/30 astro-border">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-astral-purple/10 rounded-full mx-auto flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-astral-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('certifiedPro')}</h3>
                <p className="text-muted-foreground">{t('certifiedProDesc')}</p>
              </CardContent>
            </Card>
            
            {/* Feature 2 */}
            <Card className="bg-card/50 border-astral-indigo/30 astro-border">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-astral-purple/10 rounded-full mx-auto flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-astral-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('approach')}</h3>
                <p className="text-muted-foreground">{t('approachDesc')}</p>
              </CardContent>
            </Card>
            
            {/* Feature 3 */}
            <Card className="bg-card/50 border-astral-indigo/30 astro-border">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-astral-purple/10 rounded-full mx-auto flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-astral-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('tailoredSessions')}</h3>
                <p className="text-muted-foreground">{t('tailoredSessionsDesc')}</p>
              </CardContent>
            </Card>
            
            {/* Feature 4 */}
            <Card className="bg-card/50 border-astral-indigo/30 astro-border">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-astral-purple/10 rounded-full mx-auto flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-astral-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('ongoingSupport')}</h3>
                <p className="text-muted-foreground">{t('ongoingSupportDesc')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Social Media Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-astral-midnight/50 to-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('connectWithJuliana')}</h2>
            <p className="text-muted-foreground max-w-2xl">
              {t('socialMediaDesc')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {socialChannels.map((channel, index) => (
              <VerticalSocialMediaBox 
                key={index}
                platform={channel.platform}
                username={channel.username}
                icon={channel.icon}
                url={channel.url}
                bgColor={channel.bgColor}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-16 md:py-24 bg-astral-midnight/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('servicesTitle')}</h2>
            <p className="text-muted-foreground max-w-2xl">
              {t('servicesDesc')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="overflow-hidden bg-card/50 border-astral-indigo/30 hover:border-astral-purple transition-colors duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-astral-purple/10 rounded-full flex items-center justify-center">
                      {service.icon}
                    </div>
                    <span className="text-xl font-bold text-astral-gold">{service.price}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t(service.titleKey)}</h3>
                  <p className="text-muted-foreground mb-4">{t(service.descriptionKey)}</p>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{service.duration}</span>
                  </div>
                  <Button 
                    className="w-full bg-astral-indigo hover:bg-astral-indigo/90 text-white"
                    variant="default"
                  >
                    {t('bookNow')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Button variant="link" className="text-astral-purple">
              {t('viewAll')} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-astral-dark/70 to-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('testimonials')}</h2>
            <p className="text-muted-foreground max-w-2xl">
              {t('testimonialsDesc')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card/50 border-astral-indigo/30 astro-border">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-astral-gold fill-astral-gold" />
                    ))}
                  </div>
                  <p className="mb-4 italic text-muted-foreground">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-astral-purple/30 flex items-center justify-center text-lg font-semibold">
                      {testimonial.name[0]}
                    </div>
                    <div className="ml-3">
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Blog Preview Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('latestInsights')}</h2>
            <p className="text-muted-foreground max-w-2xl">
              {t('insightsDesc')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className="overflow-hidden bg-card/50 border-astral-indigo/30 hover:shadow-md hover:shadow-astral-purple/10 transition-all">
                <div className="h-48 bg-astral-indigo/20 flex items-center justify-center">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between text-xs text-muted-foreground mb-2">
                    <span>{post.date}</span>
                    <span className="text-astral-purple">{post.category}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <Button variant="link" className="p-0 h-auto text-astral-purple">
                    {t('readMore')} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Button variant="outline" className="border-astral-purple text-astral-purple hover:bg-astral-purple/10">
              {t('viewAllArticles')}
            </Button>
          </div>
        </div>
      </section>
      
      {/* Astrology Tools Section */}
      <section className="py-16 md:py-24 bg-astral-midnight/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('astrologyTools')}</h2>
            <p className="text-muted-foreground max-w-2xl">
              {t('astrologyToolsDesc')}
            </p>
          </div>
          
          <AstrologyTools />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 gradient-bg star-field">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('beginJourney')}</h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t('journeyDesc')}
            </p>
            <Tabs defaultValue="consultation" className="w-full max-w-md mx-auto">
              <TabsList className="grid grid-cols-2 mb-8 bg-card/30 border border-border">
                <TabsTrigger value="consultation">{t('consultation')}</TabsTrigger>
                <TabsTrigger value="membership">{t('membership')}</TabsTrigger>
              </TabsList>
              <TabsContent value="consultation" className="space-y-4">
                <Button className="w-full bg-astral-purple hover:bg-astral-purple/90 text-white py-6 text-lg">
                  {t('bookSession')}
                </Button>
                <p className="text-sm text-muted-foreground">
                  {t('individualConsultations')}
                </p>
              </TabsContent>
              <TabsContent value="membership" className="space-y-4">
                <Button className="w-full bg-astral-gold hover:bg-astral-gold/90 text-astral-dark py-6 text-lg">
                  {t('joinPremium')}
                </Button>
                <p className="text-sm text-muted-foreground">
                  {t('accessAll')}
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-astral-midnight/70">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('stayConnected')}</h2>
            <p className="text-muted-foreground mb-8">
              {t('newsletterDesc')}
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder={t('yourEmail')}
                className="flex-1 bg-card/30 border-astral-indigo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="bg-astral-purple hover:bg-astral-purple/90">
                {t('subscribe')}
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-4">
              {t('privacyConsent')}
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
      
      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
};

export default Index;
