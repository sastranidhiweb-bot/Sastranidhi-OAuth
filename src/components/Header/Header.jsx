import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useModal } from '../../context/ModalContext.jsx';
import { headerNav } from './navData.js';
import '../../styles/header.css';

const BRAND_LOGO_SRC = '/assets/logo-mark.png';
const HEADER_PLAYED_KEY = 'snHeaderPlayed';

// sessionStorage can throw when storage is blocked; treat that as "not played".
const headerAlreadyPlayed = () => {
  try {
    return sessionStorage.getItem(HEADER_PLAYED_KEY) === '1';
  } catch {
    return false;
  }
};

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Slide-in plays once per browser session. Read the flag once at mount, and
  // let the ref guard the write so StrictMode's double effect run is harmless.
  const [animateIn] = useState(() => !headerAlreadyPlayed());
  const playedMarked = useRef(false);
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

  useEffect(() => {
    if (!animateIn || playedMarked.current) return;
    playedMarked.current = true;
    try {
      sessionStorage.setItem(HEADER_PLAYED_KEY, '1');
    } catch {
      // Storage unavailable: the animation just plays again next load.
    }
  }, [animateIn]);

  const isActive = (to) => pathname === to;
  const activeProps = (to) => ({
    className: isActive(to) ? 'active' : undefined,
    'aria-current': isActive(to) ? 'page' : undefined,
  });

  // Brand and "Home" always lead to "/"; already there, scroll up smoothly.
  const goHome = (e) => {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // The dropdown stays open while its link keeps focus (focus-within), and a
  // client-side route change doesn't reset focus, so release it on click.
  const releaseFocus = (e) => e.currentTarget.blur();

  return (
    <header
      className={[scrolled && 'scrolled', animateIn && 'header-animate'].filter(Boolean).join(' ')}
    >
      <div className="wrap nav">
        <Link to="/" className="brand" onClick={goHome}>
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
          </span>
        </Link>

        <nav className="links">
          <Link to="/" {...activeProps('/')} onClick={goHome}>
            Home
          </Link>
          {headerNav.map((item) =>
            item.menu ? (
              <span className="nav-dd" key={item.to}>
                <Link to={item.to} {...activeProps(item.to)}>
                  {item.label}
                  <span className="dd-caret" aria-hidden="true"></span>
                </Link>
                <span className="dd-menu">
                  <span className="dd-panel">
                    {item.menu.map((sub) => (
                      <Link key={sub.to} to={sub.to} className="dd-item" onClick={releaseFocus}>
                        {sub.label}
                      </Link>
                    ))}
                    <Link to={item.to} className="dd-item dd-all" onClick={releaseFocus}>
                      View all →
                    </Link>
                  </span>
                </span>
              </span>
            ) : (
              <Link key={item.to} to={item.to} {...activeProps(item.to)}>
                {item.label}
              </Link>
            ),
          )}
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
            <a
              className="sb-icon sb-wa"
              href="https://whatsapp.com/channel/0029VbDKfR53mFY1T0Lfdb1O"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Śāstranidhi on WhatsApp"
              title="WhatsApp"
            >
              <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91A9.84 9.84 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24a8.24 8.24 0 0 1 8.24 8.25c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.230-1.470-1.380-1.720-.140-.250-.010-.380.110-.510.110-.110.250-.290.370-.430.130-.150.170-.250.250-.420.080-.160.040-.310-.020-.430-.060-.130-.560-1.350-.770-1.840-.200-.490-.410-.420-.560-.430h-.48a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.48-.29Z" />
              </svg>
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
        <Link
          to="/"
          {...activeProps('/')}
          onClick={(e) => {
            closeMobile();
            goHome(e);
          }}
        >
          Home
        </Link>
        {/* The static mobile nav is flat: parent routes only, no dropdowns. */}
        {headerNav.map((item) => (
          <Link key={item.to} to={item.to} {...activeProps(item.to)} onClick={closeMobile}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}