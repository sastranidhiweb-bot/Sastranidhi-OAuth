import { useEffect, useState } from 'react';
import { useModal } from '../../context/ModalContext.jsx';
import { navLinks } from '../../data/siteData.js';

const BRAND_LOGO_SRC = '/images/logo.png';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { open } = useModal();

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const closeMobile = () => setMobileOpen(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHashClick = (e, href) => {
    if (href.startsWith('/#') && window.location.pathname === '/') {
      e.preventDefault();
      const id = href.replace('/#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', href);
      }
    }
  };

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="wrap nav">
        <a
          href="/#home"
          className="brand"
          onClick={(e) => {
            if (window.location.pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <span className="glyph">
            <img src={BRAND_LOGO_SRC} alt="Śāstranidhi emblem" />
          </span>
          <span>
            <div className="name">ŚĀSTRANIDHI</div>
            <div className="sub">THE TREASURY OF ŚĀSTRAS</div>
          </span>
        </a>
        <nav className="links">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleHashClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#donate"
          className="btn-donate js-donate-trigger"
          onClick={(e) => {
            e.preventDefault();
            open('donate');
          }}
        >
          Donate
        </a>
        <button
          className={`hamburger${mobileOpen ? ' active' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={toggleMobile}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <nav className={`mobile-nav${mobileOpen ? ' open' : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => {
              closeMobile();
              handleHashClick(e, link.href);
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}