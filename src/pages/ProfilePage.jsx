// src/pages/ProfilePage.jsx
//
// The signed-in person's account page, reached from the header's user menu.
// Read-only: the IdP has no endpoint yet for people to edit their own
// profile. Styles live in pages.css.

import { Link } from 'react-router-dom';
import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import SiteBubbles from '../components/SiteBubbles.jsx';
import WhatsAppFloat from '../components/WhatsAppFloat.jsx';
import { PageHero } from '../components/PageSections/PageSections.jsx';
import { UserAvatar, fullName, shortName } from '../components/Header/UserMenu.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useModal } from '../context/ModalContext.jsx';
import { initiatives } from '../data/siteData.js';
import '../styles/pages.css';

const formatDate = (value) =>
  new Date(value).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

// Line icons, one per detail row
const ICONS = {
  person: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0',
  at: 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm4-4v1.5a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-3.5 7.1',
  mail: 'M3 6h18v12H3V6Zm0 1 9 6 9-6',
  phone: 'M8 3h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm3 15h2',
  pulse: 'M3 12h4l3-7 4 14 3-7h4',
  shield: 'M12 3 5 6v5c0 4.5 3 8.2 7 10 4-1.800 7-5.500 7-10V6l-7-3Z',
  calendar: 'M4 6h16v14H4V6Zm0 5h16M8 3v5m8-5v5',
};

function DetailRow({ icon, label, value, muted, badge }) {
  return (
    <div className="profile-row">
      <span className="profile-row-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d={ICONS[icon]} />
        </svg>
      </span>
      <dt>{label}</dt>
      <dd className={muted ? 'is-muted' : undefined}>
        {value}
        {badge && <span className="profile-badge">{badge}</span>}
      </dd>
    </div>
  );
}

function SignedInProfile({ user }) {
  const { logout } = useAuth();

  return (
    <div className="profile-layout">
      <aside className="profile-side">
        <div className="profile-id">
          <span className="profile-id-ring">
            <UserAvatar user={user} className="user-avatar-xl" />
          </span>
          <h2>{fullName(user)}</h2>
          <p className="profile-id-handle">@{user.username}</p>
          <p className="profile-id-mail">{user.email}</p>
          {user.created_at && <p className="profile-id-since">Member since {formatDate(user.created_at)}</p>}
          <button type="button" className="profile-logout" onClick={() => logout()}>
            Log out
          </button>
        </div>

        <Link to="/launch-registration" className="profile-launch">
          <span className="profile-launch-date">27 – 31 December 2026</span>
          <strong>Śāstra Nidhi launch</strong>
          <span className="profile-launch-go">Register for the event →</span>
        </Link>
      </aside>

      <div className="profile-main">
        <section className="profile-panel" aria-labelledby="profile-personal">
          <h3 id="profile-personal">Personal details</h3>
          <dl>
            <DetailRow icon="person" label="Full name" value={fullName(user)} />
            <DetailRow icon="at" label="Username" value={user.username} />
          </dl>
        </section>

        <section className="profile-panel" aria-labelledby="profile-contact">
          <h3 id="profile-contact">Contact</h3>
          <dl>
            <DetailRow
              icon="mail"
              label="Email address"
              value={user.email}
              badge={user.email_verified_at && '✓ Verified'}
            />
            <DetailRow icon="phone" label="Phone number" value={user.mobile || 'Not added'} muted={!user.mobile} />
          </dl>
        </section>

        <section className="profile-panel" aria-labelledby="profile-account">
          <h3 id="profile-account">Account</h3>
          <dl>
            <DetailRow
              icon="pulse"
              label="Account status"
              value={user.status ? capitalize(user.status) : 'Not available'}
              muted={!user.status}
            />
            <DetailRow icon="shield" label="Two-step sign-in" value={user.mfa_enabled ? 'On' : 'Off'} />
            {user.created_at && <DetailRow icon="calendar" label="Member since" value={formatDate(user.created_at)} />}
          </dl>
        </section>

        <section className="profile-panel" aria-labelledby="profile-platforms">
          <h3 id="profile-platforms">Explore the platforms</h3>
          <div className="profile-platforms">
            {initiatives.map((item) => (
              <a key={item.shortLabel} href={item.href} target="_blank" rel="noopener noreferrer">
                <strong>
                  {item.shortLabel}
                  <span aria-hidden="true"> ↗</span>
                </strong>
                <span>{item.title}</span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const { open } = useModal();

  return (
    <>
      <SiteBubbles />
      <Header />
      <main>
        <PageHero
          title={user ? `Namaste, ${shortName(user)}` : 'My Profile'}
          lede={user ? <span className="profile-hero-lede">Your Śāstra Nidhi account</span> : undefined}
        />

        <section className="detail">
          <div className="wrap">
            {user && <SignedInProfile user={user} />}
            {!user && loading && <p className="profile-note">Loading your profile…</p>}
            {!user && !loading && (
              <div className="profile-note">
                <p>Please log in to see your profile.</p>
                <button type="button" className="profile-login" aria-haspopup="dialog" onClick={() => open('login')}>
                  Login
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
