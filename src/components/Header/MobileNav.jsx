import { navLinks } from '../../data/siteData.js';

export default function MobileNav({ open, onNavigate, onOpenModal }) {
  return (
    <div className={`mobile${open ? ' open' : ''}`} id="mobileNav">
      {navLinks.map((link) => (
        <a key={link.href} href={link.href} onClick={onNavigate}>
          {link.label}
        </a>
      ))}
      <a href="#" onClick={(e) => { e.preventDefault(); onOpenModal('login'); }}>
        Login
      </a>
      <a href="#" onClick={(e) => { e.preventDefault(); onOpenModal('signup'); }}>
        Sign Up
      </a>
      <a href="#" onClick={(e) => { e.preventDefault(); onOpenModal('donate'); }}>
        Donate
      </a>
    </div>
  );
}
