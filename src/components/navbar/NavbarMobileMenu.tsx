
import { Link } from 'react-router-dom';
import NavbarUserMenu from './NavbarUserMenu';

interface NavbarMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavbarMobileMenu = ({ isOpen, onClose }: NavbarMobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden astro-glass py-4 px-6 border-b border-border">
      <div className="flex flex-col space-y-4">
        <Link
          to="/"
          className="text-sm font-medium py-2 hover:text-astral-purple"
          onClick={onClose}
        >
          Início
        </Link>
        <Link
          to="/services"
          className="text-sm font-medium py-2 hover:text-astral-purple"
          onClick={onClose}
        >
          Atendimentos
        </Link>
        <Link
          to="/blog"
          className="text-sm font-medium py-2 hover:text-astral-purple"
          onClick={onClose}
        >
          Blog
        </Link>
        <NavbarUserMenu isMobile={true} onMenuClose={onClose} />
      </div>
    </div>
  );
};

export default NavbarMobileMenu;
