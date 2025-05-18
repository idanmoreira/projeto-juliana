
import React from 'react';
import { Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Create TiktokIcon since it's not in lucide-react
const TiktokLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-astral-dark border-t border-border text-foreground">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Juliana Manduca</h3>
            <p className="text-muted-foreground">Therapeutic consulting with a focus on astrology, helping you understand your path and potential.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-astral-purple transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-astral-purple transition-colors">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-astral-purple transition-colors">
                <TiktokLogo />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-astral-purple transition-colors">Home</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-astral-purple transition-colors">Services</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-astral-purple transition-colors">Blog</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-astral-purple transition-colors">Booking</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-astral-purple transition-colors">Login</a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Newsletter</h3>
            <p className="text-muted-foreground">Subscribe to receive astrological insights and updates.</p>
            <form className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-astral-midnight/50 border-astral-indigo"
              />
              <Button 
                type="submit" 
                className="bg-astral-purple hover:bg-astral-purple/90"
              >
                Subscribe
              </Button>
            </form>
            
            {/* Contact Info */}
            <div className="pt-4 space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Mail size={16} className="text-astral-purple" />
                <span>contact@julianamanduca.com.br</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin size={16} className="text-astral-purple" />
                <span>São Paulo, Brazil</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Juliana Manduca. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-astral-purple transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-astral-purple transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
