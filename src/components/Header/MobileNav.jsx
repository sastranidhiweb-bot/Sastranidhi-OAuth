import { navLinks } from '../../data/siteData.js';
import { useModal } from '../../context/ModalContext.jsx';

export default function MobileNav({ open, onNavigate }) {
  const { open: openModal } = useModal();

  return (
    <nav className={`mobile-nav${open ? ' open' : ''}`} aria-label="Mobile navigation">
      {navLinks.map((link) => (
        <a key={link.href} href={link.href} onClick={onNavigate}>
          {link.label}
        </a>
      ))}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          openModal('donate');
          onNavigate();
        }}
      >
        Donate
      </a>
    </nav>
  );
}