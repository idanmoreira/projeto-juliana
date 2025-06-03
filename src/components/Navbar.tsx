
import React, { useState } from 'react';
import { Menu, X } from "lucide-react";
import Logo from './navbar/Logo';
import NavigationLinks from './navbar/NavigationLinks';
import LanguageToggle from './navbar/LanguageToggle';
import AuthSection from './navbar/AuthSection';
import MobileMenu from './navbar/MobileMenu';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <nav className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Logo />
        
        {/* Desktop Navigation */}
        <NavigationLinks />
        
        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Switcher */}
          <LanguageToggle />

          {/* Authentication */}
          <AuthSection />
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
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </header>
  );
};

export default Navbar;
