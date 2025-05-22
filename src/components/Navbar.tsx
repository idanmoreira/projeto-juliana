
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, Globe, LogIn } from "lucide-react";
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Toggle } from '@/components/ui/toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, changeLanguage, t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <nav className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 rounded-full bg-astral-purple opacity-70 animate-glow"></div>
            <div className="absolute inset-[15%] rounded-full bg-astral-dark border border-astral-purple"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-astral-gold animate-float">
                <circle cx="12" cy="12" r="10" />
                <path d="m16 12-4-4-4 4" />
                <path d="m8 12 4 4 4-4" />
              </svg>
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
          {isAuthenticated && (
            <Link to="/dashboard" className="text-sm font-medium hover:text-astral-purple transition-colors">
              {t('dashboard')}
            </Link>
          )}
          {user?.role === 'admin' && (
            <Link to="/admin" className="text-sm font-medium hover:text-astral-purple transition-colors">
              {t('admin')}
            </Link>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Switcher - Minimalist and Centered */}
          <div className="flex items-center justify-center">
            <Toggle 
              pressed={language === 'pt-BR'}
              onPressedChange={() => changeLanguage(language === 'pt-BR' ? 'en-GB' : 'pt-BR')}
              className="w-16 h-8 relative rounded-full border border-border"
            >
              <div className="absolute inset-0 flex items-center justify-between px-2">
                <span className={`z-10 text-xs font-medium ${language === 'pt-BR' ? 'text-white' : 'text-muted-foreground'}`}>
                  PT
                </span>
                <span className={`z-10 text-xs font-medium ${language === 'en-GB' ? 'text-white' : 'text-muted-foreground'}`}>
                  EN
                </span>
              </div>
              <div className={`absolute top-1 bottom-1 w-7 rounded-full transition-all duration-200 ${language === 'pt-BR' ? 'left-1 bg-blue-600' : 'right-1 bg-blue-600'}`} />
            </Toggle>
          </div>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="border-astral-indigo text-astral-indigo hover:bg-astral-indigo/10">
                  {user?.name || t('account')}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">{t('dashboard')}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile">{t('profile')}</Link>
                </DropdownMenuItem>
                {user?.role === 'admin' && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin">{t('adminPanel')}</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  {t('logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="outline" size="sm" className="border-astral-indigo text-astral-indigo hover:bg-astral-indigo/10" asChild>
                <Link to="/login">{t('login')}</Link>
              </Button>
              <Button className="bg-astral-purple hover:bg-astral-purple/90 text-white" asChild>
                <Link to="/signup">{t('signUp')}</Link>
              </Button>
            </>
          )}
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
            {isAuthenticated && (
              <Link 
                to="/dashboard" 
                className="text-sm font-medium py-2 hover:text-astral-purple"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('dashboard')}
              </Link>
            )}
            {user?.role === 'admin' && (
              <Link 
                to="/admin" 
                className="text-sm font-medium py-2 hover:text-astral-purple"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('admin')}
              </Link>
            )}
            
            {/* Language Switcher for Mobile - Minimalist */}
            <div className="flex items-center py-2 justify-center">
              <Toggle 
                pressed={language === 'pt-BR'}
                onPressedChange={() => changeLanguage(language === 'pt-BR' ? 'en-GB' : 'pt-BR')}
                className="w-16 h-8 relative rounded-full border border-border"
              >
                <div className="absolute inset-0 flex items-center justify-between px-2">
                  <span className={`z-10 text-xs font-medium ${language === 'pt-BR' ? 'text-white' : 'text-muted-foreground'}`}>
                    PT
                  </span>
                  <span className={`z-10 text-xs font-medium ${language === 'en-GB' ? 'text-white' : 'text-muted-foreground'}`}>
                    EN
                  </span>
                </div>
                <div className={`absolute top-1 bottom-1 w-7 rounded-full transition-all duration-200 ${language === 'pt-BR' ? 'left-1 bg-blue-600' : 'right-1 bg-blue-600'}`} />
              </Toggle>
            </div>
            
            <div className="flex flex-col gap-3 pt-2">
              {isAuthenticated ? (
                <>
                  <div className="py-2 px-3 bg-muted/50 rounded-md">
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                  <Button 
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="bg-astral-purple hover:bg-astral-purple/90 text-white w-full"
                  >
                    {t('logout')}
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    className="border-astral-indigo text-astral-indigo hover:bg-astral-indigo/10 w-full" 
                    asChild
                  >
                    <Link 
                      to="/login" 
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t('login')}
                    </Link>
                  </Button>
                  <Button 
                    className="bg-astral-purple hover:bg-astral-purple/90 text-white w-full" 
                    asChild
                  >
                    <Link 
                      to="/signup" 
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t('signUp')}
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
