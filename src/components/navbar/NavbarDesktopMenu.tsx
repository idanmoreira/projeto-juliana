import { Link } from 'react-router-dom';

const NavbarDesktopMenu = () => {
  return (
    <div className="hidden md:flex items-center gap-6">
      <Link to="/" className="text-sm font-medium hover:text-astral-purple transition-colors">
        Início
      </Link>
      <Link to="/services" className="text-sm font-medium hover:text-astral-purple transition-colors">
        Atendimentos
      </Link>
      <Link to="/blog" className="text-sm font-medium hover:text-astral-purple transition-colors">
        Blog
      </Link>
    </div>
  );
};

export default NavbarDesktopMenu;
