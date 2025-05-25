
import React from 'react';
import { Instagram, Youtube } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import VerticalSocialMediaBox from "@/components/VerticalSocialMediaBox";

const SocialMediaSection = () => {
  const { t } = useLanguage();

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
  );
};

export default SocialMediaSection;
