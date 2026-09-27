import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useModal } from '../../context/ModalContext.jsx';
import '../../styles/header.css';

const BRAND_LOGO_SRC = '/assets/logo-mark.png';

const HOME_HREF = '/#home';

// Internal pages, rendered as <Link>s for client-side routing.
const routeLinks = [
  { to: '/institutes', label: 'Institutes' },
  { to: '/initiatives', label: 'Initiatives' },
  { to: '/courses', label: 'Courses' },
  { to: '/research', label: 'Research' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { open } = useModal();
  const { pathname } = useLocation();

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const closeMobile = () => setMobileOpen(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (to) => pathname === to;

  const handleHashClick = (e, href) => {
    if (href.startsWith('/#') && pathname === '/') {
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
            if (pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <span className="glyph">
            <span className="halo2"></span>
            <span className="halo"></span>
            <span className="spark"></span>
            <img
              src={BRAND_LOGO_SRC}
              alt="Śāstranidhi emblem"
              loading="eager"
              decoding="async"
            />
            <span className="shine"></span>
          </span>
          <span>
            <div className="name">ŚĀSTRANIDHI</div>
            <div className="sub">THE TREASURY OF ŚĀSTRAS</div>
          </span>
        </a>

        <nav className="links">
          <a
            href={HOME_HREF}
            className={isActive('/') ? 'active' : undefined}
            aria-current={isActive('/') ? 'page' : undefined}
            onClick={(e) => handleHashClick(e, HOME_HREF)}
          >
            Home
          </a>
          {routeLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={isActive(link.to) ? 'active' : undefined}
              aria-current={isActive(link.to) ? 'page' : undefined}
            >
              {link.label}
            </Link>
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
          className={`hamburger${mobileOpen ? ' is-open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={toggleMobile}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className="subbar">
        <div className="wrap subbar-inner">
          <div className="sb-social">
            <span className="sb-kicker">Follow us</span>
            <a
              className="sb-icon"
              href="https://www.facebook.com/profile.php?id=61594228293761"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Śāstranidhi on Facebook"
              title="Facebook"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M13.5 21v-8h2.75l.41-3h-3.16V8.08c0-.87.24-1.46 1.5-1.46h1.79V3.94c-.31-.04-1.38-.14-2.63-.14-2.61 0-4.4 1.59-4.4 4.52V10H7v3h2.76v8h3.74Z" />
              </svg>
            </a>
            <a
              className="sb-icon"
              href="https://www.linkedin.com/in/shastra-nidhi-367125436/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Śāstranidhi on LinkedIn"
              title="LinkedIn"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A2.01 2.01 0 1 0 5.25 7a2.01 2.01 0 0 0 0-4ZM20.44 13.42c0-3.47-1.85-5.09-4.32-5.09-1.99 0-2.88 1.09-3.38 1.85V8.5H9.36V20h3.38v-5.7c0-1.5.28-2.95 2.14-2.95 1.84 0 1.87 1.71 1.87 3.05V20h3.39l.3-6.58Z" />
              </svg>
            </a>
            <a
              className="sb-icon"
              href="https://www.instagram.com/media.shastranidhi?stkn=MWtmdDR3am1qNjY4dA=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Śāstranidhi on Instagram"
              title="Instagram"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7.3 2h9.4A5.3 5.3 0 0 1 22 7.3v9.4a5.3 5.3 0 0 1-5.3 5.3H7.3A5.3 5.3 0 0 1 2 16.7V7.3A5.3 5.3 0 0 1 7.3 2Zm0 2A3.3 3.3 0 0 0 4 7.3v9.4A3.3 3.3 0 0 0 7.3 20h9.4a3.3 3.3 0 0 0 3.3-3.3V7.3A3.3 3.3 0 0 0 16.7 4H7.3Zm9.95 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
              </svg>
            </a>
            <a
              className="sb-icon sb-pivotra"
              href="https://www.pivotra.in/portal/pivotra/group/%C5%9B%C4%81stranidhi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Śāstranidhi on Pivotra"
              title="Pivotra"
            >
              <img src="/assets/pivotra-logo.png" alt="" />
            </a>
          </div>
          <div className="sb-auth">
            <Link
              to="/login"
              className={`sb-btn sb-login${isActive('/login') ? ' active' : ''}`}
              aria-current={isActive('/login') ? 'page' : undefined}
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className={`sb-btn sb-signup${isActive('/signup') ? ' active' : ''}`}
              aria-current={isActive('/signup') ? 'page' : undefined}
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>

      <nav className={`mobile-nav${mobileOpen ? ' is-open' : ''}`}>
        <a
          href={HOME_HREF}
          className={isActive('/') ? 'active' : undefined}
          aria-current={isActive('/') ? 'page' : undefined}
          onClick={(e) => {
            closeMobile();
            handleHashClick(e, HOME_HREF);
          }}
        >
          Home
        </a>
        {routeLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={isActive(link.to) ? 'active' : undefined}
            aria-current={isActive(link.to) ? 'page' : undefined}
            onClick={closeMobile}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}