
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const BlogPreviewSection = () => {
  const { t } = useLanguage();

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

  return (
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
  );
};

export default BlogPreviewSection;
