import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth/SupabaseAuthProvider';
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
              Painel
            </Button>
            {user?.role === 'admin' && (
              <Button 
                variant="outline"
                className="w-full"
                onClick={() => handleNavigation('/admin')}
              >
                Painel Admin
              </Button>
            )}
            <Button 
              variant="destructive"
              className="w-full"
              onClick={handleLogout}
            >
              Sair
            </Button>
          </>
        ) : (
          <Button 
            className="bg-astral-purple hover:bg-astral-purple/90 text-white w-full"
            onClick={handleContactClick}
          >
            Entrar
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
              Painel
            </DropdownMenuItem>
            {user?.role === 'admin' && (
              <DropdownMenuItem onClick={() => navigate('/admin')}>
                Painel Admin
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-red-600">
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button 
          className="bg-astral-purple hover:bg-astral-purple/90 text-white"
          onClick={handleContactClick}
        >
          Entrar
        </Button>
      )}
    </div>
  );
};

export default NavbarUserMenu;
