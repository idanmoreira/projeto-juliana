import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '@/hooks/useUserData';

/**
 * User menu component for navigation.
 * Part of the layout/navigation molecules in Atomic Design.
 */
const NavigationUserMenu = ({ isMobile = false, onMenuClose }: { isMobile?: boolean, onMenuClose?: () => void }) => {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { profile } = useUserData();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
    onMenuClose?.();
  };

  if (!user) {
    return (
      <div className="flex items-center">
        <a href="/login" className="text-sm font-medium hover:text-astral-purple transition-colors">
          {t('login')}
        </a>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full border border-border h-9 w-9 relative">
          <Avatar className="h-9 w-9">
            <AvatarImage src={profile?.avatar_url || `https://avatar.vercel.sh/${user.email}`} alt={user.email || "Avatar"} />
            <AvatarFallback>{user.email?.charAt(0).toUpperCase() || '?'}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align={isMobile ? "center" : "end"} forceMount>
        <DropdownMenuItem onClick={() => { navigate('/dashboard'); onMenuClose?.(); }}>
          {t('dashboard')}
        </DropdownMenuItem>
        {user.role === 'admin' && (
          <DropdownMenuItem onClick={() => { navigate('/admin'); onMenuClose?.(); }}>
            {t('adminPanel')}
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          {t('logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavigationUserMenu;
