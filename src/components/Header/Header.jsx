import { useState } from 'react';
import { useModal } from '../../context/ModalContext.jsx';
import { navLinks } from '../../data/siteData.js';
import MobileNav from './MobileNav.jsx';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { open } = useModal();

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const closeMobile = () => setMobileOpen(false);

  const openModalFromMobile = (name) => {
    open(name);
    closeMobile();
  };

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
            {/* Login and Sign Up buttons commented out as requested */}
            {/*
            <button className="btn outline" onClick={() => open('login')}>
              Login
            </button>
            <button className="btn primary" onClick={() => open('signup')}>
              Sign Up
            </button>
            */}
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
        onOpenModal={openModalFromMobile}
      />
    </>
  );
}