import { useEffect, useRef, useState } from 'react';
import { useModal } from '../../context/ModalContext.jsx';
import { PopupDecor, PopupEmblem, trackSpotlight } from '../LaunchPopup/PopupDecor.jsx';
import '../../styles/donate-modal.css';

// "Support Sastra Nidhi" popup, opened from the header, footer and donate
// band. Same family as the launch and Login / Sign up popups (PopupDecor),
// but warmer and grander — saffron light, falling flowers, a thicker gold
// border — so it stands apart. Uses the same logo + lotus emblem as Login.
// For now it sends the donation details to FormSubmit, with the field names
// that inbox has always received; payment will move to Razorpay.
// Rendered once, in App.jsx.

const FORM_ENDPOINT = 'https://formsubmit.co/ajax/noreply@sastranidhi.org';

// "Others" lets the donor write their own cause (sent as "Others: <their text>")
const OTHER = 'Others';

const AREAS = [
  { value: 'Research and Digitisation', label: 'Research & Digitisation', note: 'Preserve and digitise rare manuscripts', icon: 'scroll' },
  { value: 'Education and Courses', label: 'Education & Courses', note: 'Bring śāstra learning to every student', icon: 'book' },
  { value: 'Publications', label: 'Publications', note: 'Publish scholarly editions and studies', icon: 'quill' },
  { value: 'General Support', label: 'General Support', note: 'Wherever the need is greatest', icon: 'lotus' },
  { value: OTHER, label: 'Others', note: 'Tell us the cause in your own words', icon: 'pen' },
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
  pen: (
    <>
      <path d="M15.5 4.5l4 4L9 19l-5 1 1-5z" />
      <path d="M13.5 6.5l4 4" />
    </>
  ),
};

const formatINR = (n) => `₹${n.toLocaleString('en-IN')}`;

// Where the support goes: a gold dropdown (listbox) with an icon and a short
// note per cause. The parent posts the chosen cause as "purpose".
function CauseSelect({ value, onChange, invalid }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const listRef = useRef(null);
  const selected = AREAS.find((a) => a.value === value);

  // Close when clicking anywhere outside the dropdown
  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  useEffect(() => {
    if (open) listRef.current?.focus();
  }, [open]);

  const openList = () => {
    setActive(Math.max(AREAS.findIndex((a) => a.value === value), 0));
    setOpen(true);
  };

  const closeList = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  const choose = (i) => {
    onChange(AREAS[i].value);
    closeList();
  };

  const onTriggerKey = (e) => {
    if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
      e.preventDefault();
      openList();
    }
  };

  const onListKey = (e) => {
    const last = AREAS.length - 1;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => (i === last ? 0 : i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (i === 0 ? last : i - 1));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActive(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setActive(last);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      choose(active);
    } else if (e.key === 'Escape') {
      // Close just the dropdown, not the whole popup
      e.preventDefault();
      e.stopPropagation();
      closeList();
    } else if (e.key === 'Tab') {
      setOpen(false);
    }
  };

  const classes = ['dm-select', open && 'is-open', invalid && 'is-invalid'].filter(Boolean).join(' ');

  return (
    <div ref={rootRef} className={classes}>
      <button
        ref={triggerRef}
        type="button"
        className="dm-select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby="dm-cause-label dm-cause-value"
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onTriggerKey}
      >
        <span className="dm-select-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">{ICONS[selected ? selected.icon : 'lotus']}</svg>
        </span>
        <span id="dm-cause-value" className="dm-select-text">
          {selected ? (
            <>
              <strong>{selected.label}</strong>
              <small>{selected.note}</small>
            </>
          ) : (
            <span className="dm-select-placeholder">Choose a cause to support</span>
          )}
        </span>
        <svg className="dm-select-chevron" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul
          ref={listRef}
          className="dm-select-list"
          role="listbox"
          tabIndex={-1}
          aria-labelledby="dm-cause-label"
          aria-activedescendant={`dm-cause-${active}`}
          onKeyDown={onListKey}
        >
          {AREAS.map((a, i) => {
            const optionClasses = [
              'dm-option',
              i === active && 'is-active',
              a.value === value && 'is-selected',
            ].filter(Boolean).join(' ');
            return (
              <li
                key={a.value}
                id={`dm-cause-${i}`}
                role="option"
                aria-selected={a.value === value}
                className={optionClasses}
                onMouseEnter={() => setActive(i)}
                onClick={() => choose(i)}
              >
                <span className="dm-select-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">{ICONS[a.icon]}</svg>
                </span>
                <span className="dm-select-text">
                  <strong>{a.label}</strong>
                  <small>{a.note}</small>
                </span>
                <svg className="dm-option-check" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function DonateCard({ close }) {
  const [area, setArea] = useState('');
  const [otherCause, setOtherCause] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [missingCause, setMissingCause] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const otherRef = useRef(null);

  const isOther = area === OTHER;
  const purpose = isOther ? `${OTHER}: ${otherCause.trim()}` : area;

  const chooseArea = (value) => {
    setArea(value);
    setMissingCause(false);
    setError('');
  };

  // Put the cursor in the write-in field as soon as "Other" is picked
  useEffect(() => {
    if (isOther) otherRef.current?.focus();
  }, [isOther]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!area) {
      setMissingCause(true);
      setError('Please choose a cause for your donation.');
      return;
    }
    if (isOther && !otherCause.trim()) {
      setError('Please tell us the cause you would like to support.');
      otherRef.current?.focus();
      return;
    }
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
      <PopupEmblem className="dm-emblem" />

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
            Your donation details have reached us. Our team will write to you
            shortly to complete your gift to Śāstra Nidhi.
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

            <div className="dm-section">
              <div id="dm-cause-label" className="dm-label">Support a cause</div>
              <CauseSelect value={area} onChange={chooseArea} invalid={missingCause} />
              <input type="hidden" name="purpose" value={purpose} />
              {isOther && (
                <div className="dm-other">
                  <textarea
                    ref={otherRef}
                    rows={2}
                    maxLength={200}
                    placeholder="Write the cause you would like to support…"
                    aria-label="The cause you would like to support"
                    value={otherCause}
                    onChange={(e) => {
                      setOtherCause(e.target.value);
                      if (error) setError('');
                    }}
                  />
                  <span className="dm-other-count" aria-hidden="true">{otherCause.length}/200</span>
                </div>
              )}
            </div>

            <fieldset className="dm-section dm-fieldset">
              <legend className="dm-label">Choose an amount</legend>
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
                    placeholder="Or enter your own amount"
                    aria-label="Donation amount in rupees"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
            </fieldset>

            <div className="dm-section">
              <div className="dm-label">Your details</div>
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
            </div>

            {error && <div className="dm-error" role="alert">{error}</div>}

            <button type="submit" className="dm-submit" disabled={submitting}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
              </svg>
              <span>
                {submitting ? 'Sending…' : amount ? `Donate ${formatINR(Number(amount))}` : 'Donate'}
              </span>
            </button>

            <p className="dm-assure">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              Our team will contact you by email after the donation is successful.
            </p>
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
