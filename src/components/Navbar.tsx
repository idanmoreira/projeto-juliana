
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState('pt-BR'); // Default language

  const toggleLanguage = (lang) => {
    setLanguage(lang);
    // Here you would implement the actual language change logic
    console.log(`Language changed to: ${lang}`);
  };

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
            Home
          </Link>
          <Link to="/services" className="text-sm font-medium hover:text-astral-purple transition-colors">
            Services
          </Link>
          <Link to="/blog" className="text-sm font-medium hover:text-astral-purple transition-colors">
            Blog
          </Link>
          <Link to="/booking" className="text-sm font-medium hover:text-astral-purple transition-colors">
            Booking
          </Link>
        </div>
        
        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Switcher */}
          <div className="flex items-center gap-2 mr-2">
            <button 
              onClick={() => toggleLanguage('pt-BR')}
              className={`w-6 h-6 rounded-full overflow-hidden border-2 transition-all ${language === 'pt-BR' ? 'border-astral-purple scale-110' : 'border-transparent'}`}
              title="Português Brasileiro"
            >
              <img src="https://flagcdn.com/br.svg" alt="Bandeira do Brasil" className="w-full h-full object-cover" />
            </button>
            <button 
              onClick={() => toggleLanguage('en-GB')}
              className={`w-6 h-6 rounded-full overflow-hidden border-2 transition-all ${language === 'en-GB' ? 'border-astral-purple scale-110' : 'border-transparent'}`}
              title="British English"
            >
              <img src="https://flagcdn.com/gb.svg" alt="British Flag" className="w-full h-full object-cover" />
            </button>
          </div>

          <Button variant="outline" size="sm" className="border-astral-indigo text-astral-indigo hover:bg-astral-indigo/10">
            Login
          </Button>
          <Button className="bg-astral-purple hover:bg-astral-purple/90 text-white">
            Sign Up
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
              Home
            </Link>
            <Link 
              to="/services" 
              className="text-sm font-medium py-2 hover:text-astral-purple"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              to="/blog" 
              className="text-sm font-medium py-2 hover:text-astral-purple"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              to="/booking" 
              className="text-sm font-medium py-2 hover:text-astral-purple"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Booking
            </Link>
            
            {/* Language Switcher for Mobile */}
            <div className="flex items-center gap-4 py-2">
              <span className="text-sm font-medium">Language:</span>
              <div className="flex gap-3">
                <button 
                  onClick={() => toggleLanguage('pt-BR')}
                  className={`w-7 h-7 rounded-full overflow-hidden border-2 transition-all ${language === 'pt-BR' ? 'border-astral-purple scale-110' : 'border-transparent'}`}
                >
                  <img src="https://flagcdn.com/br.svg" alt="Bandeira do Brasil" className="w-full h-full object-cover" />
                </button>
                <button 
                  onClick={() => toggleLanguage('en-GB')}
                  className={`w-7 h-7 rounded-full overflow-hidden border-2 transition-all ${language === 'en-GB' ? 'border-astral-purple scale-110' : 'border-transparent'}`}
                >
                  <img src="https://flagcdn.com/gb.svg" alt="British Flag" className="w-full h-full object-cover" />
                </button>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 pt-2">
              <Button variant="outline" className="border-astral-indigo text-astral-indigo hover:bg-astral-indigo/10 w-full">
                Login
              </Button>
              <Button className="bg-astral-purple hover:bg-astral-purple/90 text-white w-full">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
