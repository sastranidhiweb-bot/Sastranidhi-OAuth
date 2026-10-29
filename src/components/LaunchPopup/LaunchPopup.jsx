import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LAUNCH_DATE, LAUNCH_END } from '../LaunchCountdown/LaunchCountdown.jsx';
import { PopupDecor, PopupEmblem, trackSpotlight } from './PopupDecor.jsx';

// Home-page popup inviting visitors to register for the platform launch.
// Shows on every load of the home page until the five-day event ends (the
// countdown gives way to a "happening now" badge once it starts); dismissing it
// ("Remind me later", Esc, backdrop) only closes it for the current view.
// Once a visitor registers, this browser never shows it again.
const SHOW_DELAY_MS = 500;
const REGISTERED_KEY = 'launchRegistered';

function hasRegistered() {
  try {
    return localStorage.getItem(REGISTERED_KEY) === '1';
  } catch {
    return false;
  }
}

// Called by LaunchRegistrationPage after a successful registration.
export function markLaunchRegistered() {
  try {
    localStorage.setItem(REGISTERED_KEY, '1');
  } catch {
    // storage unavailable (private mode etc.): popup keeps showing
  }
}

const PLATFORMS = ['Svādhyāya', 'Viśleṣaka', 'Paripraśna', 'Pravacana'];

function getRemaining() {
  const diff = Math.max(LAUNCH_DATE.getTime() - Date.now(), 0);
  return [
    [Math.floor(diff / 86400000), 'Days'],
    [Math.floor((diff / 3600000) % 24), 'Hours'],
    [Math.floor((diff / 60000) % 60), 'Minutes'],
    [Math.floor((diff / 1000) % 60), 'Seconds'],
  ];
}

export default function LaunchPopup() {
  const [open, setOpen] = useState(false);
  const [remaining, setRemaining] = useState(getRemaining);

  useEffect(() => {
    if (hasRegistered() || Date.now() >= LAUNCH_END.getTime()) return;
    const id = setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    const tick = setInterval(() => setRemaining(getRemaining()), 1000);
    return () => {
      document.removeEventListener('keydown', onKey);
      clearInterval(tick);
    };
  }, [open]);

  const close = () => setOpen(false);

  if (!open) return null;

  const isLive = Date.now() >= LAUNCH_DATE.getTime();

  return (
    <div
      className="launch-popup-overlay"
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div
        className="launch-popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="launch-popup-title"
        onMouseMove={trackSpotlight}
      >
        <div className="lp-inner">
          <PopupDecor />

          <div className="lp-content">
            <PopupEmblem />

            <div className="lp-kicker">You are cordially invited</div>

            <h2 id="launch-popup-title">
              <span className="lp-title-pre">to the grand launch of</span>
              <span className="lp-title-main" data-text="Śāstra Nidhi">Śāstra Nidhi</span>
              <span className="lp-title-sub">Digital Platform</span>
            </h2>

            <div className="lp-divider" aria-hidden="true">
              <span />
              <i />
              <span />
            </div>

            <div className="lp-date">27 – 31 · December · 2026</div>

            {isLive ? (
              <div className="lp-live">
                <span className="lp-live-dot" aria-hidden="true" />
                Happening now · Five days of celebration
              </div>
            ) : (
              <div className="lp-countdown" role="timer" aria-label={`${remaining[0][0]} days to go`}>
                {remaining.map(([value, unit], i) => (
                  <Fragment key={unit}>
                    {i > 0 && <span className="lp-sep" aria-hidden="true" />}
                    <div className="lp-unit">
                      <span className="lp-num" key={value}>
                        {String(value).padStart(2, '0')}
                      </span>
                      <span className="lp-label">{unit}</span>
                    </div>
                  </Fragment>
                ))}
              </div>
            )}

            <p className="lp-platforms">
              {PLATFORMS.map((name, i) => (
                <Fragment key={name}>
                  {i > 0 && <span className="lp-dot" aria-hidden="true">✦</span>}
                  <span>{name}</span>
                </Fragment>
              ))}
            </p>

            <div className="lp-actions">
              <Link to="/launch-registration" className="lp-cta" onClick={close}>
                <span>Click here to register</span>
                <span className="lp-cta-arrow" aria-hidden="true">→</span>
              </Link>
              <button type="button" className="lp-later" onClick={close}>
                Remind me later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
