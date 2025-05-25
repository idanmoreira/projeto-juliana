
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/context/LanguageContext";

const NewsletterSection = () => {
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

  return (
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
  );
};

export default NewsletterSection;
