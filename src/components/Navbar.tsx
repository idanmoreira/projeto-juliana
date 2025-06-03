
import React, { useState } from 'react';
import { Menu, X } from "lucide-react";
import NavbarLogo from './navbar/NavbarLogo';
import NavbarDesktopMenu from './navbar/NavbarDesktopMenu';
import NavbarLanguageToggle from './navbar/NavbarLanguageToggle';
import NavbarUserMenu from './navbar/NavbarUserMenu';
import NavbarMobileMenu from './navbar/NavbarMobileMenu';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <nav className="container flex items-center justify-between h-16 px-4 md:px-6">
        <NavbarLogo />
        
        <NavbarDesktopMenu />
        
        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <NavbarLanguageToggle />
          <NavbarUserMenu />
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
      
      <NavbarMobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
};

export default Navbar;
