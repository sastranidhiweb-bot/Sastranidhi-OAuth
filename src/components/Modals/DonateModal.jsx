import { useEffect, useState } from 'react';
import { useModal } from '../../context/ModalContext.jsx';
import { PopupDecor, trackSpotlight } from '../LaunchPopup/PopupDecor.jsx';
import '../../styles/donate-modal.css';

// "Support Sastra Nidhi" popup, opened from the header, footer and donate
// band. Same family as the launch and Login / Sign up popups (PopupDecor),
// but warmer and grander — saffron light, a lit diya, a thicker gold border —
// so it stands apart. For now it sends the pledge to FormSubmit, with the
// field names that inbox has always received; payment will move to Razorpay.
// Rendered once, in App.jsx.

const FORM_ENDPOINT = 'https://formsubmit.co/ajax/noreply@sastranidhi.org';

const AREAS = [
  { value: 'Research and Digitisation', label: 'Research & Digitisation', icon: 'scroll' },
  { value: 'Education and Courses', label: 'Education & Courses', icon: 'book' },
  { value: 'Publications', label: 'Publications', icon: 'quill' },
  { value: 'General Support', label: 'General Support', icon: 'lotus' },
];

const AMOUNTS = [1001, 5001, 11001, 25001];

const ICONS = {
  scroll: (
    <>
      <path d="M7 4h11a2 2 0 0 1 2 2v1h-4" />
      <path d="M16 7v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1h10" />
      <path d="M7 4a2 2 0 0 0-2 2v11" />
      <path d="M9 9h4M9 12h4" />
    </>
  ),
  book: (
    <>
      <path d="M12 6.5C10 5 7 4.5 4 5v13c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5V5c-3-.5-6 0-8 1.5z" />
      <path d="M12 6.5v13" />
    </>
  ),
  quill: (
    <>
      <path d="M20 4c-6 1-11 5-13 12l-1 4" />
      <path d="M20 4c0 6-4 10-10 11" />
      <path d="M9 12h5" />
    </>
  ),
  lotus: (
    <>
      <path d="M12 18c-2-2-3-5-3-8 1 1 2.3 1.6 3 3 .7-1.4 2-2 3-3 0 3-1 6-3 8z" />
      <path d="M12 18c-3 0-6-1.5-8-4.5 2 0 3.7.4 5 1.5" />
      <path d="M12 18c3 0 6-1.5 8-4.5-2 0-3.7.4-5 1.5" />
      <path d="M4 20h16" />
    </>
  ),
};

const formatINR = (n) => `₹${n.toLocaleString('en-IN')}`;

// A lit brass diya — the lamp of knowledge — seen from the front and a little
// above, its spout pointing at the viewer and the flame rising from the wick
// at the front of the rim. Layered flame (white-hot core, blue base, orange
// edge, soft glow) flickers; embers drift up; rays turn behind the flame.
// Stands in for the logo emblem of the other popups.
function Diya() {
  return (
    <div className="dm-emblem" aria-hidden="true">
      <span className="dm-rays" />
      <span className="dm-glow" />
      <svg className="dm-diya" viewBox="0 0 120 90">
        <defs>
          <linearGradient id="dmBrass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFF4C8" />
            <stop offset="0.25" stopColor="#F2CF63" />
            <stop offset="0.62" stopColor="#C9952B" />
            <stop offset="1" stopColor="#6E4A10" />
          </linearGradient>
          <radialGradient id="dmSheen" cx="30%" cy="25%" r="55%">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.5" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="dmShade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#3A1C02" stopOpacity="0.15" />
            <stop offset="0.4" stopColor="#3A1C02" stopOpacity="0" />
            <stop offset="1" stopColor="#3A1C02" stopOpacity="0.4" />
          </linearGradient>
          <radialGradient id="dmOil" cx="50%" cy="85%" r="70%">
            <stop offset="0" stopColor="#E09A2A" />
            <stop offset="0.45" stopColor="#8C4A10" />
            <stop offset="1" stopColor="#3E1A03" />
          </radialGradient>
          <linearGradient id="dmLip" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFF0BF" />
            <stop offset="1" stopColor="#D9A93A" />
          </linearGradient>
          <radialGradient id="dmFlameOuter" cx="50%" cy="82%" r="75%">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="0.25" stopColor="#FFF1B0" />
            <stop offset="0.55" stopColor="#FFC23D" />
            <stop offset="0.82" stopColor="#FF7A12" />
            <stop offset="1" stopColor="#E8450C" stopOpacity="0.85" />
          </radialGradient>
          <filter id="dmBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.2" />
          </filter>
          <filter id="dmSoft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.3" />
          </filter>
        </defs>

        {/* shadow on the ground */}
        <ellipse cx="60" cy="85.5" rx="34" ry="2.8" fill="#000" opacity="0.4" filter="url(#dmSoft)" />

        {/* foot */}
        <path d="M47 72 Q 60 75.5 73 72 L 78 82 Q 60 87 42 82 Z" fill="url(#dmBrass)" />
        <path d="M42 82 Q 60 87 78 82" fill="none" stroke="#5A3A0A" strokeWidth="1" />

        {/* bowl */}
        <path d="M20 46 Q 21 71 60 75 Q 99 71 100 46 Z" fill="url(#dmBrass)" />
        <path d="M20 46 Q 21 71 60 75 Q 99 71 100 46 Z" fill="url(#dmShade)" />
        <path d="M20 46 Q 21 71 60 75 Q 99 71 100 46 Z" fill="url(#dmSheen)" />

        {/* engraved band of dots */}
        <path d="M25 58 Q 60 72 95 58" fill="none" stroke="#7A5212" strokeWidth="0.9" opacity="0.65" />
        <path
          d="M27 63 Q 60 77 93 63"
          fill="none"
          stroke="#FFF0BF"
          strokeWidth="1.7"
          strokeDasharray="0 4.6"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* polished highlight on the left of the bowl */}
        <path d="M25 51 Q 28 63 39 69" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" opacity="0.5" />

        {/* warm light from the flame falling on the front of the bowl */}
        <ellipse className="dm-reflect" cx="60" cy="69" rx="11" ry="3.4" fill="#FFE7A3" opacity="0.5" filter="url(#dmSoft)" />

        {/* rim and the oil inside, lit by the flame */}
        <ellipse cx="60" cy="46" rx="40" ry="10" fill="url(#dmLip)" />
        <ellipse cx="60" cy="46.6" rx="36" ry="7.8" fill="url(#dmOil)" />
        <ellipse className="dm-oil-glint" cx="60" cy="45" rx="12" ry="2" fill="#FFD66B" opacity="0.75" />

        {/* spout pinched towards the viewer, with its oil channel */}
        <path d="M46 53.5 Q 60 58.5 74 53.5 Q 67 60.5 60 67 Q 53 60.5 46 53.5 Z" fill="url(#dmLip)" />
        <path d="M46 53.5 Q 53 60.5 60 67 Q 67 60.5 74 53.5" fill="none" stroke="#9C7A1E" strokeWidth="0.8" />
        <path d="M52.5 54.3 Q 60 57.2 67.5 54.3 Q 63.5 58.6 60 62.5 Q 56.5 58.6 52.5 54.3 Z" fill="#5A2A06" />

        {/* wick lying in the channel */}
        <path d="M60 55.5 L 60 63" stroke="#2E1704" strokeWidth="2.4" strokeLinecap="round" />

        {/* flame */}
        <ellipse className="dm-flame-halo" cx="60" cy="43" rx="16" ry="23" fill="#FFB020" opacity="0.55" filter="url(#dmBlur)" />
        <g className="dm-flame">
          <path d="M60 22 C 69.5 35, 71.5 49, 60 63.5 C 48.5 49, 50.5 35, 60 22 Z" fill="url(#dmFlameOuter)" />
          <path className="dm-flame-core" d="M60 37 C 65 45, 65 54.5, 60 61.5 C 55 54.5, 55 45, 60 37 Z" fill="#FFFBEA" />
          <ellipse cx="60" cy="60.6" rx="3" ry="2.4" fill="#7DB8FF" opacity="0.7" />
        </g>
        <circle cx="60" cy="63.2" r="1.4" fill="#FF8A00" />

        {/* embers drifting up */}
        <circle className="dm-ember" cx="60" cy="25" r="0.9" fill="#FFE7A3" />
        <circle className="dm-ember" cx="58" cy="27" r="0.7" fill="#FFC23D" style={{ animationDelay: '1.1s', animationDuration: '3.8s' }} />
        <circle className="dm-ember" cx="62" cy="26" r="0.8" fill="#FFF3C9" style={{ animationDelay: '2.2s', animationDuration: '3.4s' }} />
      </svg>
    </div>
  );
}

function DonateCard({ close }) {
  const [area, setArea] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(event.currentTarget),
      });

      if (!response.ok) throw new Error('Donation form submission failed');
      setSent(true);
    } catch {
      setError('Unable to send right now. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="dm-content">
      <Diya />

      <div className="lp-kicker">Vidyā-dānam · The gift of knowledge</div>
      <h2 id="donate-modal-title" className="dm-heading">
        <span className="lp-title-pre">Become a patron of</span>
        <span className="lp-title-main" data-text="Śāstra Nidhi">Śāstra Nidhi</span>
      </h2>
      <div className="lp-divider" aria-hidden="true">
        <span />
        <i />
        <span />
      </div>

      {sent ? (
        <div className="dm-thanks" role="status">
          <div className="dm-thanks-mark" aria-hidden="true">✓</div>
          <h3>Dhanyavādaḥ — thank you</h3>
          <p>
            Your pledge has reached us. Thank you for supporting Śāstra Nidhi.
          </p>
          <button type="button" className="dm-done" onClick={close}>
            Close
          </button>
        </div>
      ) : (
        <>
          <p className="dm-lede">
            Help us research, digitise, teach and publish the śāstras for generations to come.
          </p>

          <form className="dm-form" onSubmit={handleSubmit}>
            <input type="hidden" name="_subject" value="New Sastra Nidhi Donation / Support Enquiry" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />

            <fieldset className="dm-fieldset">
              <legend className="dm-label">Where should your support go?</legend>
              <div className="dm-areas">
                {AREAS.map(({ value, label, icon }) => (
                  <label key={value} className={`dm-area${area === value ? ' is-selected' : ''}`}>
                    <input
                      type="radio"
                      name="purpose"
                      value={value}
                      required
                      checked={area === value}
                      onChange={() => setArea(value)}
                    />
                    <svg viewBox="0 0 24 24" aria-hidden="true">{ICONS[icon]}</svg>
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="dm-fieldset">
              <legend className="dm-label">Amount you wish to offer</legend>
              <div className="dm-amounts">
                {AMOUNTS.map((value) => (
                  <button
                    key={value}
                    type="button"
                    className={`dm-chip${String(value) === amount ? ' is-selected' : ''}`}
                    aria-pressed={String(value) === amount}
                    onClick={() => setAmount(String(value))}
                  >
                    {formatINR(value)}
                  </button>
                ))}
                <div className="dm-amount-field">
                  <span aria-hidden="true">₹</span>
                  <input
                    type="number"
                    name="amount"
                    min="1"
                    inputMode="numeric"
                    placeholder="Or enter an amount of your own"
                    aria-label="Donation amount in rupees"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
            </fieldset>

            <div className="dm-row">
              <input type="text" name="name" required placeholder="Full name" autoComplete="name" />
              <input
                type="email"
                name="email"
                required
                placeholder="Email address"
                autoComplete="email"
              />
            </div>

            {error && <div className="dm-error" role="alert">{error}</div>}

            <button type="submit" className="dm-submit" disabled={submitting}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
              </svg>
              <span>{submitting ? 'Sending your pledge…' : amount ? `Pledge ${formatINR(Number(amount))}` : 'Pledge your support'}</span>
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default function DonateModal() {
  const { openModal, close } = useModal();
  const isOpen = openModal === 'donate';

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    // Keep the page behind still while the popup is open
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div className="donate-overlay" onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div
        className="donate-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="donate-modal-title"
        onMouseMove={trackSpotlight}
      >
        <div className="dm-inner">
          <PopupDecor flowers />
          <button type="button" className="popup-close" onClick={close} aria-label="Close">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          {/* Mounted only while open, so each opening starts with a fresh form */}
          <DonateCard close={close} />
        </div>
      </div>
    </div>
  );
}
