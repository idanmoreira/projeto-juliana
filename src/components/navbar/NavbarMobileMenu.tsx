
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import NavbarLanguageToggle from './NavbarLanguageToggle';
import NavbarUserMenu from './NavbarUserMenu';

interface NavbarMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavbarMobileMenu = ({ isOpen, onClose }: NavbarMobileMenuProps) => {
  const { t } = useLanguage();

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
        
        <NavbarLanguageToggle isMobile={true} />
        <NavbarUserMenu isMobile={true} onMenuClose={onClose} />
      </div>
    </div>
  );
};

export default NavbarMobileMenu;
