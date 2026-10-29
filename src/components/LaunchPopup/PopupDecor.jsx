import '../../styles/launch-popup.css';

// Ceremonial layers shared by the launch popup and the Login / Sign up popup
// (AuthModal): aurora glows, rotating mandala, cursor spotlight, flower
// shower, sparkles and the gold invitation frame, plus the logo emblem with
// its blooming lotus. Styled by launch-popup.css (.lp-*); the spotlight
// follows --mx / --my, which the popup card sets on mouse move.

// Fixed positions so the sparkles look scattered but render the same each time
const SPARKLES = [
  [8, 14, 0], [22, 72, 1.2], [38, 30, 2.4], [55, 86, 0.6], [70, 18, 1.8],
  [84, 62, 3], [92, 34, 0.9], [14, 48, 2.1], [63, 50, 3.6], [46, 8, 1.5],
];

// Falling flower petals (left %, delay s, duration s, size px, colour variant)
const PETALS = [
  [6, 0, 11, 12, 'a'], [18, 4.5, 13, 9, 'b'], [31, 1.8, 12, 11, 'c'], [44, 6.5, 14, 8, 'a'],
  [57, 2.8, 11.5, 12, 'b'], [69, 8, 13, 10, 'c'], [81, 0.9, 12.5, 9, 'a'], [93, 5.2, 14, 11, 'b'],
];

// Falling whole flowers for the Support popup
// (left %, delay s, duration s, size px, kind)
const FLOWERS = [
  [5, 0, 12, 20, 'marigold'], [17, 4.8, 13.5, 14, 'jasmine'], [29, 2, 12.5, 16, 'frangipani'],
  [42, 7, 14, 18, 'marigold'], [55, 3, 12, 13, 'jasmine'], [67, 8.4, 13, 17, 'frangipani'],
  [79, 1, 12.8, 19, 'marigold'], [92, 5.6, 14, 14, 'jasmine'],
];

const MARIGOLD_OUTER = Array.from({ length: 12 }, (_, i) => i * 30);
const MARIGOLD_INNER = Array.from({ length: 9 }, (_, i) => i * 40 + 15);
const FIVE = [0, 72, 144, 216, 288];

// Small flower drawings, each on a -10..10 grid
function Flower({ kind }) {
  if (kind === 'marigold') {
    return (
      <svg viewBox="-10 -10 20 20">
        {MARIGOLD_OUTER.map((deg) => (
          <ellipse key={deg} cx="0" cy="-6" rx="3" ry="3.6" fill="#FF8A12" stroke="#E2620A" strokeWidth="0.4" transform={`rotate(${deg})`} />
        ))}
        {MARIGOLD_INNER.map((deg) => (
          <ellipse key={deg} cx="0" cy="-3.4" rx="2.3" ry="2.7" fill="#FFB22E" stroke="#F08A12" strokeWidth="0.35" transform={`rotate(${deg})`} />
        ))}
        <circle r="2.2" fill="#E8700C" />
        <circle r="1" cx="-0.5" cy="-0.5" fill="#FFC85A" />
      </svg>
    );
  }
  if (kind === 'jasmine') {
    return (
      <svg viewBox="-10 -10 20 20">
        {FIVE.map((deg) => (
          <path key={deg} d="M0 -1 C 3 -3, 3 -8, 0 -9.5 C -3 -8, -3 -3, 0 -1 Z" fill="#FFFDF5" stroke="#EDE3C8" strokeWidth="0.4" transform={`rotate(${deg})`} />
        ))}
        <circle r="1.8" fill="#F3D27A" />
      </svg>
    );
  }
  return (
    <svg viewBox="-10 -10 20 20">
      <defs>
        <radialGradient id="lpFrangipani" r="0.6">
          <stop offset="0" stopColor="#FFE38A" />
          <stop offset="0.35" stopColor="#FFF4F7" />
          <stop offset="1" stopColor="#F28AB2" />
        </radialGradient>
      </defs>
      {FIVE.map((deg) => (
        <path key={deg} d="M0 0 C 4.5 -1, 6 -6, 2.5 -9.5 C -1 -9.5, -2.5 -5, 0 0 Z" fill="url(#lpFrangipani)" stroke="#E07AA3" strokeWidth="0.3" transform={`rotate(${deg})`} />
      ))}
      <circle r="1.3" fill="#FFD45A" />
    </svg>
  );
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

/** Soft light that follows the cursor across the card (onMouseMove handler). */
export function trackSpotlight(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  card.style.setProperty('--my', `${e.clientY - rect.top}px`);
}

/**
 * Background layers and frame; render first inside the card's inner panel.
 * `flowers` swaps the falling petals for whole marigolds, jasmine and
 * frangipani (used by the Support popup).
 */
export function PopupDecor({ flowers = false }) {
  return (
    <>
      <div className="lp-aurora" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <Mandala />
      <div className="lp-spotlight" aria-hidden="true" />
      <div className="lp-petals" aria-hidden="true">
        {flowers && FLOWERS.map(([left, delay, duration, size, kind], i) => (
          <span
            key={i}
            className="lp-flower"
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          >
            <Flower kind={kind} />
          </span>
        ))}
        {!flowers && PETALS.map(([left, delay, duration, size, tone], i) => (
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
    </>
  );
}

/** Logo with halo, blooming lotus and two orbit rings. */
export function PopupEmblem({ className = '' }) {
  return (
    <div className={`lp-emblem ${className}`.trim()} aria-hidden="true">
      <span className="lp-halo" />
      <Lotus />
      <span className="lp-orbit lp-orbit-a" />
      <span className="lp-orbit lp-orbit-b" />
      <img src="/images/logo.png" alt="" />
    </div>
  );
}
