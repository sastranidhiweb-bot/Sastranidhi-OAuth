import { navLinks } from '../../data/siteData.js';
import { useModal } from '../../context/ModalContext.jsx';

export default function MobileNav({ open, onNavigate, isAuthenticated, user, onLogout }) {
  const { open: openModal } = useModal();

  return (
    <div className={`mobile${open ? ' open' : ''}`} id="mobileNav">
      {navLinks.map((link) => (
        <a key={link.href} href={link.href} onClick={onNavigate}>
          {link.label}
        </a>
      ))}
      {!isAuthenticated && (
        <>
          <a href="/login">Login</a>
          <a href="/signup">Sign Up</a>
        </>
      )}
      {isAuthenticated && (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onLogout();
            onNavigate();
          }}
        >
          Logout ({user?.first_name || user?.username})
        </a>
      )}
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
    </div>
  );
}
