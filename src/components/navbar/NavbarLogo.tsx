
import React from 'react';
import { Link } from 'react-router-dom';

const NavbarLogo = () => {
  return (
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
  );
};

export default NavbarLogo;
