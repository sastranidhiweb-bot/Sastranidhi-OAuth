// src/components/Header/UserMenu.jsx
//
// What the header shows in place of Login / Sign up once someone is signed
// in: photo, "Hi, <name>" and a dropdown with their details, a link to the
// profile page and Log out. Styles live in header.css.

import { useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

// "test champa" -> "Test Champa"; the rest of each word is left alone so
// names like "McDonald" survive.
const titleCase = (name) => name.replace(/(^|\s)(\S)/g, (_, gap, letter) => gap + letter.toUpperCase());

/** First name, or whatever else the account has to call the person by. */
export const shortName = (user) =>
  (user.first_name && titleCase(user.first_name)) || user.username || user.email.split('@')[0];

export const fullName = (user) =>
  titleCase([user.first_name, user.last_name].filter(Boolean).join(' ')) || shortName(user);

const ITEM_ICONS = {
  profile: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0',
  launch: 'M4 6h16v14H4V6Zm0 5h16M8 3v5m8-5v5',
  logout: 'M10 4H5v16h5m5-12 4 4-4 4m4-4H9',
};

const HINT_SEEN_KEY = 'snProfileHintSeen';
const HINT_SECONDS = 7;

// sessionStorage can throw when storage is blocked; treat that as "not seen".
const hintAlreadySeen = () => {
  try {
    return sessionStorage.getItem(HINT_SEEN_KEY) === '1';
  } catch {
    return false;
  }
};

const ItemIcon = ({ name }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d={ITEM_ICONS[name]} />
  </svg>
);

const initials = (user) =>
  (user.first_name && user.last_name
    ? `${user.first_name[0]}${user.last_name[0]}`
    : shortName(user)[0]
  ).toUpperCase();

/** The account's photo, or its initials when it has none or the photo won't load. */
export function UserAvatar({ user, className = '' }) {
  const [failedSrc, setFailedSrc] = useState(null);
  const src = user.profile_photo;

  return (
    <span className={`user-avatar ${className}`} aria-hidden="true">
      {src && src !== failedSrc ? (
        // Google profile photos refuse requests that carry a referrer
        <img src={src} alt="" referrerPolicy="no-referrer" onError={() => setFailedSrc(src)} />
      ) : (
        initials(user)
      )}
    </span>
  );
}

export default function UserMenu({ user, onOpen }) {
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);
  // A short "your profile is here" bubble, once per browser session
  const [showHint, setShowHint] = useState(() => !hintAlreadySeen());
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const panelId = useId();

  useEffect(() => {
    if (!showHint) return undefined;
    try {
      sessionStorage.setItem(HINT_SEEN_KEY, '1');
    } catch {
      // Storage unavailable: the hint just shows again next load.
    }
    const timer = setTimeout(() => setShowHint(false), HINT_SECONDS * 1000);
    return () => clearTimeout(timer);
  }, [showHint]);

  useEffect(() => {
    if (!open) return undefined;
    const closeOnOutsideClick = (e) => {
      if (!rootRef.current.contains(e.target)) setOpen(false);
    };
    const closeOnEscape = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current.focus();
      }
    };
    document.addEventListener('mousedown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  const toggle = () => {
    if (!open) onOpen?.();
    setShowHint(false);
    setOpen(!open);
  };

  return (
    <div className="sb-user" ref={rootRef}>
      <button
        type="button"
        className="sb-user-trigger"
        ref={triggerRef}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
      >
        <UserAvatar user={user} />
        <span className="sb-user-text">
          <span className="sb-user-hi">Hi, {shortName(user)}</span>
          <span className="sb-user-welcome">Welcome back · My account</span>
        </span>
        <span className="sb-user-caret" aria-hidden="true"></span>
      </button>

      {showHint && (
        <span className="sb-user-hint" aria-hidden="true">
          ✦ Your profile is here. Click to open!
        </span>
      )}

      <div className={`sb-user-panel${open ? ' is-open' : ''}`} id={panelId}>
        <div className="sb-user-summary">
          <UserAvatar user={user} className="user-avatar-lg" />
          <div className="sb-user-who">
            <strong>{fullName(user)}</strong>
            <span>{user.email}</span>
            {user.mobile && <span>{user.mobile}</span>}
          </div>
        </div>
        <Link to="/profile" className="sb-user-item" onClick={() => setOpen(false)}>
          <ItemIcon name="profile" />
          My Profile
        </Link>
        <Link to="/launch-registration" className="sb-user-item" onClick={() => setOpen(false)}>
          <ItemIcon name="launch" />
          Launch Registration
        </Link>
        <button type="button" className="sb-user-item sb-user-logout" onClick={() => logout()}>
          <ItemIcon name="logout" />
          Log out
        </button>
      </div>
    </div>
  );
}
