
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, changeLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <nav className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 rounded-full bg-astral-purple opacity-70 animate-glow"></div>
            <div className="absolute inset-1 rounded-full bg-astral-dark border border-astral-purple"></div>
            <div className="absolute inset-0 flex items-center justify-center text-astral-gold font-serif text-lg">
              JM
            </div>
          </div>
          <span className="text-lg font-semibold">Juliana Manduca</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-astral-purple transition-colors">
            {t('home')}
          </Link>
          <Link to="/services" className="text-sm font-medium hover:text-astral-purple transition-colors">
            {t('services')}
          </Link>
          <Link to="/blog" className="text-sm font-medium hover:text-astral-purple transition-colors">
            {t('blog')}
          </Link>
          <Link to="/booking" className="text-sm font-medium hover:text-astral-purple transition-colors">
            {t('booking')}
          </Link>
        </div>
        
        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Switcher */}
          <div className="flex items-center gap-2 mr-2">
            <button 
              onClick={() => changeLanguage('pt-BR')}
              className={`text-2xl transition-transform ${language === 'pt-BR' ? 'scale-125' : 'opacity-70'}`}
              title="Português Brasileiro"
              aria-label="Change language to Brazilian Portuguese"
            >
              🇧🇷
            </button>
            <button 
              onClick={() => changeLanguage('en-GB')}
              className={`text-2xl transition-transform ${language === 'en-GB' ? 'scale-125' : 'opacity-70'}`}
              title="British English"
              aria-label="Change language to British English"
            >
              🇬🇧
            </button>
          </div>

          <Button variant="outline" size="sm" className="border-astral-indigo text-astral-indigo hover:bg-astral-indigo/10">
            {t('login')}
          </Button>
          <Button className="bg-astral-purple hover:bg-astral-purple/90 text-white">
            {t('signUp')}
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? 
            <X className="h-6 w-6" /> : 
            <Menu className="h-6 w-6" />
          }
        </button>
      </nav>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden astro-glass py-4 px-6 border-b border-border">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-sm font-medium py-2 hover:text-astral-purple"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('home')}
            </Link>
            <Link 
              to="/services" 
              className="text-sm font-medium py-2 hover:text-astral-purple"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('services')}
            </Link>
            <Link 
              to="/blog" 
              className="text-sm font-medium py-2 hover:text-astral-purple"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('blog')}
            </Link>
            <Link 
              to="/booking" 
              className="text-sm font-medium py-2 hover:text-astral-purple"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('booking')}
            </Link>
            
            {/* Language Switcher for Mobile */}
            <div className="flex items-center gap-4 py-2">
              <span className="text-sm font-medium">{t('language')}</span>
              <div className="flex gap-3">
                <button 
                  onClick={() => changeLanguage('pt-BR')}
                  className={`text-2xl transition-transform ${language === 'pt-BR' ? 'scale-125' : 'opacity-70'}`}
                  aria-label="Change language to Brazilian Portuguese"
                >
                  🇧🇷
                </button>
                <button 
                  onClick={() => changeLanguage('en-GB')}
                  className={`text-2xl transition-transform ${language === 'en-GB' ? 'scale-125' : 'opacity-70'}`}
                  aria-label="Change language to British English"
                >
                  🇬🇧
                </button>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 pt-2">
              <Button variant="outline" className="border-astral-indigo text-astral-indigo hover:bg-astral-indigo/10 w-full">
                {t('login')}
              </Button>
              <Button className="bg-astral-purple hover:bg-astral-purple/90 text-white w-full">
                {t('signUp')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
