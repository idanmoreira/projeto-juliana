
import { render } from '@testing-library/react';
import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar';
import { LanguageProvider } from '../../context/LanguageContext';
import { AuthProvider } from '../../context/auth/AuthProvider';
import { describe, it, expect } from 'vitest';

const MockProviders = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <AuthProvider>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </AuthProvider>
  </BrowserRouter>
);

describe('Navbar Component', () => {
  it('renders navigation logo', () => {
    render(
      <MockProviders>
        <Navbar />
      </MockProviders>
    );

    expect(screen.getByText('Juliana Manduca')).toBeInTheDocument();
  });

  it('renders navigation menu items on desktop', () => {
    render(
      <MockProviders>
        <Navbar />
      </MockProviders>
    );

    // Check for navigation links (these should be visible on desktop)
    const homeLink = screen.getByRole('link', { name: /home/i });
    const servicesLink = screen.getByRole('link', { name: /services/i });
    const blogLink = screen.getByRole('link', { name: /blog/i });

    expect(homeLink).toBeInTheDocument();
    expect(servicesLink).toBeInTheDocument();
    expect(blogLink).toBeInTheDocument();
  });

  it('has proper navigation structure', () => {
    render(
      <MockProviders>
        <Navbar />
      </MockProviders>
    );

    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveClass('astro-glass');
  });
});
