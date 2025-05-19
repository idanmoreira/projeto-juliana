
import React from 'react';
import { cn } from '@/lib/utils';

interface SocialMediaBoxProps {
  platform: string;
  username: string;
  icon: React.ReactNode;
  url: string;
  bgColor: string;
}

const VerticalSocialMediaBox = ({ platform, username, icon, url, bgColor }: SocialMediaBoxProps) => {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={cn(
        "block rounded-lg overflow-hidden transition-transform hover:scale-105 h-[320px]",
        bgColor
      )}
    >
      <div className="p-6 flex flex-col items-center text-white h-full" style={{ aspectRatio: '9/16' }}>
        <div className="rounded-md border-4 border-white/20 p-2 mb-4 w-12 h-12 flex items-center justify-center">
          {icon}
        </div>
        <div className="flex-1 w-full relative">
          <div className="absolute inset-0 overflow-hidden rounded-md bg-white/10 flex flex-col">
            <div className="h-6 bg-white/10 flex items-center justify-center">
              <div className="w-10 h-1 bg-white/30 rounded-full"></div>
            </div>
            <div className="flex-1 p-3">
              <div className="w-full h-3 bg-white/20 mb-2 rounded-full"></div>
              <div className="w-3/4 h-3 bg-white/20 mb-4 rounded-full"></div>
              <div className="w-full h-12 bg-white/10 rounded-md"></div>
            </div>
          </div>
        </div>
        <h3 className="text-xl font-bold mt-4 mb-2">{platform}</h3>
        <p className="text-white/80">{username}</p>
      </div>
    </a>
  );
};

export default VerticalSocialMediaBox;
