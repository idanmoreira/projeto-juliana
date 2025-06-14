
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
// Removed: import { useLanguage } from "@/context/LanguageContext";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  // Removed: const { t } = useLanguage();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Subscribed!", {
      description: "Thank you for joining our newsletter.",
    });
    setEmail("");
  };

  return (
    <section className="py-16 bg-astral-midnight/70">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Stay Connected
          </h2>
          <p className="text-muted-foreground mb-8">
            Get cosmic insights, astrological tips and exclusive updates right in your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your Email"
              className="flex-1 bg-card/30 border-astral-indigo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="bg-astral-purple hover:bg-astral-purple/90">
              Subscribe
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-4">
            By subscribing you agree to receive our newsletter and understand your data will be handled according to our privacy policy.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;

