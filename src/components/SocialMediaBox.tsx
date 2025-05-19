
import React from 'react';
import { cn } from '@/lib/utils';

interface SocialMediaBoxProps {
  platform: string;
  username: string;
  icon: React.ReactNode;
  url: string;
  bgColor: string;
}

const SocialMediaBox = ({ platform, username, icon, url, bgColor }: SocialMediaBoxProps) => {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={cn(
        "block rounded-lg overflow-hidden transition-transform hover:scale-105",
        bgColor
      )}
    >
      <div className="p-6 flex flex-col items-center text-white">
        <div className="mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{platform}</h3>
        <p className="text-white/80">{username}</p>
      </div>
    </a>
  );
};

export default SocialMediaBox;
