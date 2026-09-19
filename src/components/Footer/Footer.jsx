import { useEffect, useState } from 'react';
import { useModal } from '../../context/ModalContext.jsx';
import { footerPlatforms, footerInstitution } from '../../data/siteData.js';

export default function Footer() {
  const { open } = useModal();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 480);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer>
      <div className="wrap footer-grid">
        <div>
          <div className="footer-brand">Sastranidhi</div>
          <p style={{ fontSize: '14.5px', maxWidth: '280px' }}>
            A digital and educational ecosystem for śāstric research, preservation,
            learning and public engagement.
          </p>
        </div>
        <div>
          <h4>Platforms</h4>
          {footerPlatforms.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <div>
          <h4>Institution</h4>
          {footerInstitution.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <div>
          <h4>Standard Links</h4>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Accessibility</a>
          <a
            href="#"
            className="js-donate-trigger"
            onClick={(e) => {
              e.preventDefault();
              open('donate');
            }}
          >
            Donate
          </a>
        </div>
        <div className="footer-social" aria-label="Śāstranidhi social media links">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a
              className="social-link"
              href="https://www.linkedin.com/in/shastra-nidhi-367125436/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Śāstranidhi on LinkedIn"
              title="LinkedIn"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A2.01 2.01 0 1 0 5.25 7a2.01 2.01 0 0 0 0-4ZM20.44 13.42c0-3.47-1.85-5.09-4.32-5.09-1.99 0-2.88 1.09-3.38 1.85V8.5H9.36V20h3.38v-5.7c0-1.5.28-2.95 2.14-2.95 1.84 0 1.87 1.71 1.87 3.05V20h3.39l.3-6.58Z" />
              </svg>
              <span>LinkedIn</span>
            </a>
            <a
              className="social-link"
              href="https://www.facebook.com/profile.php?id=61594228293761"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Śāstranidhi on Facebook"
              title="Facebook"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M13.5 21v-8h2.75l.41-3h-3.16V8.08c0-.87.24-1.46 1.5-1.46h1.79V3.94c-.31-.04-1.38-.14-2.63-.14-2.61 0-4.4 1.59-4.4 4.52V10H7v3h2.76v8h3.74Z" />
              </svg>
              <span>Facebook</span>
            </a>
            <a
              className="social-link"
              href="https://www.instagram.com/media.shastranidhi?stkn=MWtmdDR3am1qNjY4dA=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Śāstranidhi on Instagram"
              title="Instagram"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7.3 2h9.4A5.3 5.3 0 0 1 22 7.3v9.4a5.3 5.3 0 0 1-5.3 5.3H7.3A5.3 5.3 0 0 1 2 16.7V7.3A5.3 5.3 0 0 1 7.3 2Zm0 2A3.3 3.3 0 0 0 4 7.3v9.4A3.3 3.3 0 0 0 7.3 20h9.4a3.3 3.3 0 0 0 3.3-3.3V7.3A3.3 3.3 0 0 0 16.7 4H7.3Zm9.95 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 1 0-6Z" />
              </svg>
              <span>Instagram</span>
            </a>
            <a
              className="social-link pivotra-social"
              href="https://www.pivotra.in/portal/pivotra/group/%C5%9B%C4%81stranidhi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Śāstranidhi on Pivotra"
              title="Pivotra"
            >
              <span className="pivotra-icon" aria-hidden="true">P</span>
              <span>Pivotra</span>
            </a>
          </div>
        </div>
      </div>
      <div className="wrap footer-bottom">© 2026 Sastranidhi. All rights reserved.</div>
      <button
        id="backToTop"
        className={showBackToTop ? 'show' : ''}
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑
      </button>
    </footer>
  );
}
