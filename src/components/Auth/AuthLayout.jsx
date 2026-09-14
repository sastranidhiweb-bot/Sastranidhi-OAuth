// src/components/Auth/AuthLayout.jsx
//
// Shared chrome for every auth page (Login, Signup, Forgot/Reset Password)
// so they visually belong to the Sastranidhi site instead of looking like
// a bolted-on separate app — same brand mark, same color tokens
// (styles/base.css --navy/--gold/etc), same typography as the rest of the
// site, just without the full marketing header/nav.

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <a className="auth-brand" href="/">
          <span className="mark">卐</span>
          <span>
            SASTRANIDHI
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
