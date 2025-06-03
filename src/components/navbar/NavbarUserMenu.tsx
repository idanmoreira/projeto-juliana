
import React from 'react';
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarUserMenuProps {
  isMobile?: boolean;
  onMenuClose?: () => void;
}

const NavbarUserMenu = ({ isMobile = false, onMenuClose }: NavbarUserMenuProps) => {
  const { user, logout, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleContactClick = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
    if (onMenuClose) onMenuClose();
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (onMenuClose) onMenuClose();
  };

  const handleLogout = () => {
    logout();
    if (onMenuClose) onMenuClose();
  };

  if (isMobile) {
    return (
      <div className="flex flex-col gap-3 pt-2">
        {isAuthenticated ? (
          <>
            <Button 
              variant="outline"
              className="w-full"
              onClick={() => handleNavigation('/dashboard')}
            >
              {t('dashboard')}
            </Button>
            {user?.role === 'admin' && (
              <Button 
                variant="outline"
                className="w-full"
                onClick={() => handleNavigation('/admin')}
              >
                Admin Panel
              </Button>
            )}
            <Button 
              variant="destructive"
              className="w-full"
              onClick={handleLogout}
            >
              {t('logout')}
            </Button>
          </>
        ) : (
          <Button 
            className="bg-astral-purple hover:bg-astral-purple/90 text-white w-full"
            onClick={handleContactClick}
          >
            {t('login')}
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center gap-4">
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {user?.name}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigate('/dashboard')}>
              {t('dashboard')}
            </DropdownMenuItem>
            {user?.role === 'admin' && (
              <DropdownMenuItem onClick={() => navigate('/admin')}>
                Admin Panel
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-red-600">
              <LogOut className="h-4 w-4 mr-2" />
              {t('logout')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button 
          className="bg-astral-purple hover:bg-astral-purple/90 text-white"
          onClick={handleContactClick}
        >
          {t('login')}
        </Button>
      )}
    </div>
  );
};

export default NavbarUserMenu;
