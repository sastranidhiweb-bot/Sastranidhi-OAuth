import { useState } from 'react';
import { useModal } from '../../context/ModalContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { navLinks } from '../../data/siteData.js';
import MobileNav from './MobileNav.jsx';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { open } = useModal();
  const { user, isAuthenticated, loading, logout } = useAuth();

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header>
        <div className="container header-row">
          <a className="brand" href="#home">
            <span className="mark">卐</span>
            <span>
              SASTRANIDHI
              <small>THE TREASURY OF ŚĀSTRAS</small>
            </span>
          </a>
          <nav>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <div className="actions">
            {/* While the initial GET /auth/session check is in flight,
                render nothing here rather than flashing "Login" and then
                immediately swapping to the logged-in state. */}
            {!loading && !isAuthenticated && (
              <>
                <a className="btn outline" href="/login">
                  Login
                </a>
                <a className="btn primary" href="/signup">
                  Sign Up
                </a>
              </>
            )}
            {!loading && isAuthenticated && (
              <>
                <span className="welcome-user">{user.first_name || user.username}</span>
                <button className="btn outline" onClick={() => logout()}>
                  Logout
                </button>
              </>
            )}
            <button className="btn gold" onClick={() => open('donate')}>
              Donate
            </button>
          </div>
          <button
            className="menu"
            id="menuBtn"
            aria-label="Open menu"
            onClick={toggleMobile}
          >
            ☰
          </button>
        </div>
      </header>
      <MobileNav
        open={mobileOpen}
        onNavigate={closeMobile}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={logout}
      />
    </>
  );
}
