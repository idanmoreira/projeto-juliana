import { useState } from 'react';
import { Menu, X } from "lucide-react";
import NavigationLogo from './NavigationLogo';
import NavigationDesktopMenu from './NavigationDesktopMenu';
import NavigationUserMenu from './NavigationUserMenu';
import NavigationMobileMenu from './NavigationMobileMenu';

/**
 * Main navigation component (PT-only).
 */
const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <nav className="container flex items-center justify-between h-16 px-4 md:px-6">
        <NavigationLogo />
        <NavigationDesktopMenu />
        {/* Only display user menu (no language toggle) */}
        <div className="hidden md:flex items-center gap-4">
          <NavigationUserMenu />
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
      <NavigationMobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
};

export default Navigation;
