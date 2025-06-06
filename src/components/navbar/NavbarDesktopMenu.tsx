
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const NavbarDesktopMenu = () => {
  const { t } = useLanguage();

  return (
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
    </div>
  );
};

export default NavbarDesktopMenu;
