import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import { mockData } from '../mock';

// TikTok SVG Icon Component
const TikTokIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-section">
            <div className="footer-logo">
              <img 
                src="/combat_zone_logo.png" 
                alt="Combat Zone Moisei Logo" 
                className="footer-logo-image"
              />
            </div>
            <p className="footer-description">
              Experimentează adrenalina jocului futuristic de laser tag în cea mai modernă arenă exterioară din Maramureș.
            </p>
            <div className="footer-social">
              <a href={mockData.contact.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="social-link">
                <Facebook className="social-icon" />
              </a>
              <a href={mockData.contact.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="social-link">
                <Instagram className="social-icon" />
              </a>
              <a href={mockData.contact.socialMedia.tiktok} target="_blank" rel="noopener noreferrer" className="social-link">
                <TikTokIcon className="social-icon" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Link-uri rapide</h3>
            <nav className="footer-nav">
              <Link to="/" className="footer-link">Acasă</Link>
              <Link to="/despre-noi" className="footer-link">Despre Noi</Link>
              <Link to="/regulament" className="footer-link">Regulament</Link>
              <Link to="/tarife" className="footer-link">Tarife</Link>
              <Link to="/colectie-foto" className="footer-link">Galerie</Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3 className="footer-title">Contact</h3>
            <div className="footer-contact">
              <div className="contact-container-footer">
  {/* Phone Link */}
  <a href={`tel:${mockData.contact.phone}`} className="contact-item-footer">
    <Phone className="contact-icon-footer" />
    <span>{mockData.contact.phone}</span>
  </a>

  {/* Email Link */}
  <a href={`mailto:${mockData.contact.email}`} className="contact-item-footer">
    <Mail className="contact-icon-footer" />
    <span>{mockData.contact.email}</span>
  </a>

  {/* Maps Link */}
  <a 
    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mockData.contact.address)}`}
    target="_blank" 
    rel="noopener noreferrer"
    className="contact-item-footer"
  >
    <MapPin className="contact-icon-footer" />
    <span>{mockData.contact.address}</span>
  </a>
</div>
            </div>
          </div>

          {/* Schedule */}
          <div className="footer-section">
            <h3 className="footer-title">Program</h3>
            <div className="footer-schedule">
              <div className="schedule-item">
                <span className="schedule-day">Luni - Vineri</span>
                <span className="schedule-time">{mockData.contact.schedule.weekdays}</span>
              </div>
              <div className="schedule-item">
                <span className="schedule-day">Sâmbătă - Duminică</span>
                <span className="schedule-time">{mockData.contact.schedule.weekend}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Combat Zone Moisei. Toate drepturile rezervate.
          </p>
          <p className="footer-powered-by">
            powered by{' '}
            <a
              href="https://ench.ro"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-ench-logo"
            >
              ench.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
