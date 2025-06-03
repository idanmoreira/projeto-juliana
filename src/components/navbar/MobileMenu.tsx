
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import LanguageToggle from './LanguageToggle';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { t } = useLanguage();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleContactClick = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden astro-glass py-4 px-6 border-b border-border">
      <div className="flex flex-col space-y-4">
        <Link 
          to="/" 
          className="text-sm font-medium py-2 hover:text-astral-purple"
          onClick={onClose}
        >
          {t('home')}
        </Link>
        <Link 
          to="/services" 
          className="text-sm font-medium py-2 hover:text-astral-purple"
          onClick={onClose}
        >
          {t('services')}
        </Link>
        <Link 
          to="/blog" 
          className="text-sm font-medium py-2 hover:text-astral-purple"
          onClick={onClose}
        >
          {t('blog')}
        </Link>
        
        {/* Language Switcher for Mobile */}
        <div className="flex items-center py-2 justify-center">
          <LanguageToggle />
        </div>
        
        <div className="flex flex-col gap-3 pt-2">
          {isAuthenticated ? (
            <>
              <Button 
                variant="outline"
                className="w-full"
                onClick={() => {
                  navigate('/dashboard');
                  onClose();
                }}
              >
                {t('dashboard')}
              </Button>
              {user?.role === 'admin' && (
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    navigate('/admin');
                    onClose();
                  }}
                >
                  Admin Panel
                </Button>
              )}
              <Button 
                variant="destructive"
                className="w-full"
                onClick={() => {
                  logout();
                  onClose();
                }}
              >
                {t('logout')}
              </Button>
            </>
          ) : (
            <Button 
              className="bg-astral-purple hover:bg-astral-purple/90 text-white w-full"
              onClick={() => {
                handleContactClick();
                onClose();
              }}
            >
              {t('login')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
