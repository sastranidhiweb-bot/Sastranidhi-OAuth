import { useModal } from '../../context/ModalContext.jsx';
import { footerPlatforms, footerInstitution } from '../../data/siteData.js';

export default function Footer() {
  const { open } = useModal();

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand" style={{ color: '#fff' }}>
              <span className="mark">卐</span>
              <span>
                SASTRANIDHI
                <small>THE TREASURY OF ŚĀSTRAS</small>
              </span>
            </div>
            <p style={{ lineHeight: 1.7, color: '#c7dbe7' }}>
              A digital and educational ecosystem for śāstric research, preservation,
              learning and public engagement.
            </p>
          </div>
          <div>
            <h4>Platforms</h4>
            {footerPlatforms.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
          <div>
            <h4>Institution</h4>
            {footerInstitution.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
          <div>
            <h4>Standard Links</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Accessibility</a>
            <a href="#" onClick={(e) => { e.preventDefault(); open('donate'); }}>
              Donate
            </a>
          </div>
        </div>
        <div className="copyright">© 2026 Sastranidhi. Sample responsive homepage.</div>
      </div>
    </footer>
  );
}
