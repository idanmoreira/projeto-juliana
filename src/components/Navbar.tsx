
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
