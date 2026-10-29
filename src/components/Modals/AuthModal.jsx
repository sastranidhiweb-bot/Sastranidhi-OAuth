import { useEffect } from 'react';
import { useModal } from '../../context/ModalContext.jsx';
import LoginPage from '../../pages/LoginPage.jsx';
import SignupWizard from '../../pages/SignupWizard.jsx';
import { PopupDecor, trackSpotlight } from '../LaunchPopup/PopupDecor.jsx';
import '../../styles/auth-modal.css';

// Login / Sign up popup opened from the header, drawn in the royal violet +
// gold of the launch popup, with the same ceremonial layers (PopupDecor). The /login and /signup pages still exist for the
// backend's OAuth redirects (?returnTo=...); this shows the same forms on
// top of whatever page the visitor is on. Closes with ×, Esc or the backdrop.
export default function AuthModal() {
  const { openModal, close } = useModal();
  const isOpen = openModal === 'login' || openModal === 'signup';

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
    <div className="auth-modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div
        className="auth-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        onMouseMove={trackSpotlight}
      >
        <div className="am-inner">
          <PopupDecor />
          <button
            type="button"
            className="popup-close"
            onClick={close}
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          {/* key remounts the form, so switching Login <-> Sign up starts fresh */}
          {openModal === 'login' ? <LoginPage key="login" inModal /> : <SignupWizard key="signup" inModal />}
        </div>
      </div>
    </div>
  );
}
