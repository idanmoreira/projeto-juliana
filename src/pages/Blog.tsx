import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import PageLayout from '@/components/layout/PageLayout';
import PageHeader from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';

const Blog = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Posts');
  
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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Subscribed!", {
      description: "Thank you for joining our newsletter.",
    });
    setEmail("");
  };
  
  return (
    <PageLayout>
      <PageHeader 
        badge={t('blog')}
        title={t('latestInsights')}
        description={t('insightsDesc')}
      />
      
      <div className="container px-4 md:px-6 py-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={category === activeCategory ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className={category === activeCategory ? "bg-astral-purple hover:bg-astral-purple/90" : ""}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      
      <Separator className="my-2 bg-astral-indigo/20" />
      
      {/* Blog Grid */}
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card key={index} className="overflow-hidden flex flex-col h-full border-astral-indigo/30 hover:border-astral-purple transition-all hover:shadow-lg">
              <div className="aspect-video bg-gradient-to-br from-purple-100 to-astral-indigo/10 dark:from-purple-900/20 dark:to-astral-dark/50 relative">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="object-cover w-full h-full" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-astral-purple dark:text-purple-400 font-medium">{post.category}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>
                <CardTitle className="line-clamp-2 text-astral-indigo dark:text-white">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-3 text-foreground/80">{post.excerpt}</CardDescription>
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
          <Button variant="outline" size="lg" className="border-astral-indigo hover:bg-astral-indigo/10">
            Load More Articles
          </Button>
        </div>
      </div>
      
      {/* Newsletter Section - Updated background to match home page */}
      <div className="relative gradient-bg star-field overflow-hidden py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 max-w-md mx-auto">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-astral-indigo to-astral-purple dark:from-white dark:to-astral-purple/80">
              {t('stayConnected')}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('newsletterDesc')}
            </p>
            <form onSubmit={handleSubscribe} className="flex w-full max-w-sm items-center space-x-2 mt-4">
              <Input
                type="email"
                placeholder={t('yourEmail')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex h-10 w-full rounded-md border border-astral-indigo/30 bg-card/50 px-3 py-2 text-sm"
                required
              />
              <Button type="submit" className="bg-astral-purple hover:bg-astral-purple/90">{t('subscribe')}</Button>
            </form>
            <p className="text-xs text-muted-foreground max-w-[350px]">
              {t('privacyConsent')}
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Blog;
