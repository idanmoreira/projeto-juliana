import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import WhatsAppButton from '@/components/WhatsAppButton';

const Blog = () => {
  const { t } = useLanguage();
  
  const blogPosts = [
    {
      title: 'Understanding Mercury Retrograde: Facts vs. Myths',
      excerpt: "Mercury retrograde has become a scapegoat for all manner of mishaps, but what's the real astrological significance of this transit?",
      date: '2025-04-15',
      image: '/placeholder.svg',
      category: 'Planetary Transits',
      author: 'Juliana Manduca'
    },
    {
      title: 'How Your Moon Sign Affects Your Emotional Landscape',
      excerpt: 'While your Sun sign represents your core essence, your Moon sign reveals your emotional needs and instinctive reactions.',
      date: '2025-04-03',
      image: '/placeholder.svg',
      category: 'Birth Chart',
      author: 'Juliana Manduca'
    },
    {
      title: 'Navigating Major Life Changes with Astrology',
      excerpt: 'When big life transitions occur, your birth chart can provide valuable insight into timing and meaning.',
      date: '2025-03-27',
      image: '/placeholder.svg',
      category: 'Life Guidance',
      author: 'Juliana Manduca'
    },
    {
      title: 'The Saturn Return: Understanding Your Cosmic Coming-of-Age',
      excerpt: 'Every 27-30 years, Saturn returns to the position it was in when you were born, bringing important life lessons.',
      date: '2025-03-15',
      image: '/placeholder.svg',
      category: 'Planetary Cycles',
      author: 'Juliana Manduca'
    },
    {
      title: 'Astrology and Relationships: Beyond Sun Sign Compatibility',
      excerpt: 'Discover why Venus, Mars, and the 7th house are crucial for understanding relationship dynamics.',
      date: '2025-03-02',
      image: '/placeholder.svg',
      category: 'Relationships',
      author: 'Juliana Manduca'
    },
    {
      title: "The North Node: Following Your Soul's Purpose",
      excerpt: 'The lunar nodes in your birth chart reveal karmic lessons and your evolutionary path in this lifetime.',
      date: '2025-02-18',
      image: '/placeholder.svg',
      category: 'Spiritual Growth',
      author: 'Juliana Manduca'
    }
  ];
  
  const categories = [
    'All Posts',
    'Birth Chart',
    'Planetary Transits',
    'Relationships',
    'Career',
    'Spiritual Growth',
    'Life Guidance',
    'Beginners Guide'
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
                {t('blog')}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
                {t('latestInsights')}
              </h1>
              <p className="text-muted-foreground text-lg max-w-[700px]">
                {t('insightsDesc')}
              </p>
            </div>
          </div>
        </div>
        
        {/* Category Navigation */}
        <div className="container px-4 md:px-6 py-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={index === 0 ? "default" : "outline"}
                size="sm"
                className={index === 0 ? "bg-astral-purple hover:bg-astral-purple/90" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        <Separator className="my-2" />
        
        {/* Blog Grid */}
        <div className="container px-4 md:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className="overflow-hidden flex flex-col h-full">
                <div className="aspect-video bg-muted relative">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="object-cover w-full h-full" 
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">{post.category}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                </CardContent>
                <CardFooter className="mt-auto pt-4">
                  <Button variant="ghost" className="text-astral-purple hover:text-astral-purple/90 hover:bg-purple-50 dark:hover:bg-purple-950/20 p-0">
                    {t('readMore')} →
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        </div>
        
        {/* Newsletter Section */}
        <div className="bg-purple-50 dark:bg-purple-950/10 py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 max-w-md mx-auto">
              <h2 className="text-2xl font-bold">{t('stayConnected')}</h2>
              <p className="text-muted-foreground">
                {t('newsletterDesc')}
              </p>
              <div className="flex w-full max-w-sm items-center space-x-2 mt-4">
                <input
                  type="email"
                  placeholder={t('yourEmail')}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
                <Button className="bg-astral-purple hover:bg-astral-purple/90">{t('subscribe')}</Button>
              </div>
              <p className="text-xs text-muted-foreground max-w-[350px]">
                {t('privacyConsent')}
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Blog;
