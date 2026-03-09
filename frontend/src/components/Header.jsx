import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Acasă' },
    { path: '/despre-noi', label: 'Despre Noi' },
    { path: '/regulament', label: 'Regulament' },
    { path: '/tarife', label: 'Tarife' },
    { path: '/colectie-foto', label: 'Galerie' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="site-header">
      <div className="header-container">
        <Link to="/" className="logo-link">
          <img 
            src="/logo.png" 
            alt="Combat Zone Moisei Logo" 
            className="logo-image"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/rezervari">
            <Button className="btn-primary nav-cta">REZERVĂ</Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-button" onClick={toggleMenu}>
          {isMenuOpen ? <X className="menu-icon" /> : <Menu className="menu-icon" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="mobile-nav">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={toggleMenu}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/rezervari" onClick={toggleMenu}>
            <Button className="btn-primary full-width">REZERVĂ</Button>
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
