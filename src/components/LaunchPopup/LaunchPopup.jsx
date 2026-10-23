import { Fragment, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { LAUNCH_DATE, LAUNCH_END } from '../LaunchCountdown/LaunchCountdown.jsx';
import '../../styles/launch-popup.css';

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

// Fixed positions so the sparkles look scattered but render the same each time
const SPARKLES = [
  [8, 14, 0], [22, 72, 1.2], [38, 30, 2.4], [55, 86, 0.6], [70, 18, 1.8],
  [84, 62, 3], [92, 34, 0.9], [14, 48, 2.1], [63, 50, 3.6], [46, 8, 1.5],
];

function getRemaining() {
  const diff = Math.max(LAUNCH_DATE.getTime() - Date.now(), 0);
  return [
    [Math.floor(diff / 86400000), 'Days'],
    [Math.floor((diff / 3600000) % 24), 'Hours'],
    [Math.floor((diff / 60000) % 60), 'Minutes'],
    [Math.floor((diff / 1000) % 60), 'Seconds'],
  ];
}

// Faint rotating lotus mandala drawn behind the content
function Mandala() {
  const petals = Array.from({ length: 16 }, (_, i) => i * 22.5);
  return (
    <svg className="lp-mandala" viewBox="-100 -100 200 200" aria-hidden="true">
      <circle r="96" />
      <circle r="88" strokeDasharray="1 4" />
      {petals.map((deg) => (
        <ellipse key={deg} cx="0" cy="-58" rx="13" ry="30" transform={`rotate(${deg})`} />
      ))}
      {petals.map((deg) => (
        <ellipse key={`i${deg}`} cx="0" cy="-30" rx="7" ry="18" transform={`rotate(${deg + 11.25})`} />
      ))}
      <circle r="24" />
      <circle r="16" strokeDasharray="2 3" />
    </svg>
  );
}

// Falling flower petals (left %, delay s, duration s, size px, colour variant)
const PETALS = [
  [6, 0, 11, 12, 'a'], [18, 4.5, 13, 9, 'b'], [31, 1.8, 12, 11, 'c'], [44, 6.5, 14, 8, 'a'],
  [57, 2.8, 11.5, 12, 'b'], [69, 8, 13, 10, 'c'], [81, 0.9, 12.5, 9, 'a'], [93, 5.2, 14, 11, 'b'],
];

// Eight-petal gold lotus that blooms behind the logo
function Lotus() {
  return (
    <svg className="lp-lotus" viewBox="-60 -60 120 120" aria-hidden="true">
      <defs>
        <linearGradient id="lpPetal" x1="0" y1="-1" x2="0" y2="0">
          <stop offset="0" stopColor="#FFF0BF" stopOpacity="0.55" />
          <stop offset="1" stopColor="#E8C34A" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      {Array.from({ length: 8 }, (_, i) => (
        <g key={i} transform={`rotate(${i * 45})`}>
          <path className="lp-lotus-petal" style={{ animationDelay: `${0.2 + i * 0.06}s` }}
            d="M0 -8 C 12 -22, 12 -44, 0 -57 C -12 -44, -12 -22, 0 -8 Z" />
        </g>
      ))}
    </svg>
  );
}

// Ornamental flourish for one corner of the invitation frame
function Corner({ className }) {
  return (
    <svg className={`lp-corner ${className}`} viewBox="0 0 40 40" aria-hidden="true">
      <path d="M1 26 V9 Q1 1 9 1 H26" />
      <path d="M6 18 V12 Q6 6 12 6 H18" />
      <path d="M1 1 l4 4" />
      <rect x="9" y="9" width="4" height="4" transform="rotate(45 11 11)" />
    </svg>
  );
}

export default function LaunchPopup() {
  const [open, setOpen] = useState(false);
  const [remaining, setRemaining] = useState(getRemaining);
  const cardRef = useRef(null);

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

  // Soft light that follows the cursor across the card
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    card.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  if (!open) return null;

  const isLive = Date.now() >= LAUNCH_DATE.getTime();

  return (
    <div
      className="launch-popup-overlay"
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div
        ref={cardRef}
        className="launch-popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="launch-popup-title"
        onMouseMove={handleMouseMove}
      >
        <div className="lp-inner">
          <div className="lp-aurora" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <Mandala />
          <div className="lp-spotlight" aria-hidden="true" />
          <div className="lp-petals" aria-hidden="true">
            {PETALS.map(([left, delay, duration, size, tone], i) => (
              <span
                key={i}
                className={`lp-petal lp-petal-${tone}`}
                style={{
                  left: `${left}%`,
                  width: size,
                  height: size,
                  animationDelay: `${delay}s`,
                  animationDuration: `${duration}s`,
                }}
              />
            ))}
          </div>
          <div className="lp-sparkles" aria-hidden="true">
            {SPARKLES.map(([x, y, delay], i) => (
              <span
                key={i}
                style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${delay}s` }}
              />
            ))}
          </div>

          <div className="lp-frame" aria-hidden="true">
            <Corner className="lp-tl" />
            <Corner className="lp-tr" />
            <Corner className="lp-bl" />
            <Corner className="lp-br" />
          </div>

          <div className="lp-content">
            <div className="lp-emblem" aria-hidden="true">
              <span className="lp-halo" />
              <Lotus />
              <span className="lp-orbit lp-orbit-a" />
              <span className="lp-orbit lp-orbit-b" />
              <img src="/images/logo.png" alt="" />
            </div>

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
