
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar';
import { AuthProvider } from '../../context/auth/AuthProvider';
import { describe, it, expect } from 'vitest';

const MockProviders = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <AuthProvider>
      {children}
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

    // Check for navigation links (Portuguese UI, per Footer/header logic)
    const homeLink = screen.getByRole('link', { name: /Início/i });
    const servicesLink = screen.getByRole('link', { name: /Atendimentos/i });
    const blogLink = screen.getByRole('link', { name: /Blog/i });

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
