import { useModal } from '../../context/ModalContext.jsx';
import { footerPlatforms, footerInstitution } from '../../data/siteData.js';

export default function Footer() {
  const { open } = useModal();

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
      </div>
      <div className="wrap footer-bottom">© 2026 Sastranidhi. All rights reserved.</div>
    </footer>
  );
}
