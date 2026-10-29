// src/components/Auth/AuthLayout.jsx
//
// Shared chrome for every auth page (Login, Signup, Forgot/Reset Password)
// so they visually belong to the Sastranidhi site instead of looking like
// a bolted-on separate app — same brand mark, same color tokens
// (styles/base.css --navy/--gold/etc), same typography as the rest of the
// site, just without the full marketing header/nav.
//
// With `inModal`, Login and Signup render inside AuthModal on the current
// page instead: no full-page backdrop, and the brand is the gold emblem of
// the launch popup rather than a link home.

import { PopupEmblem } from '../LaunchPopup/PopupDecor.jsx';

export default function AuthLayout({ title, subtitle, inModal = false, children }) {
  if (inModal) {
    return (
      <div className="am-content">
        <PopupEmblem className="am-emblem" />
        <div className="lp-kicker">Śāstra Nidhi</div>
        <h2 id="auth-modal-title" className="am-title">
          <span className="lp-title-main" data-text={title}>{title}</span>
        </h2>
        <div className="lp-divider" aria-hidden="true">
          <span />
          <i />
          <span />
        </div>
        {subtitle && <p className="auth-subtitle">{subtitle}</p>}
        {children}
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <a className="auth-brand" href="/">
          <span className="mark">卐</span>
          <span>
            SASTRA NIDHI
            <small>THE TREASURY OF ŚĀSTRAS</small>
          </span>
        </a>
        <h1>{title}</h1>
        {subtitle && <p className="auth-subtitle">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}
