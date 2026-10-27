// src/components/VerifyCode/VerifyCode.jsx
//
// "Verify" button + code box + green tick, shared by the email and phone
// fields of LaunchRegistrationPage. Styles live in contact-page.css.
//
// useCodeVerification({ send, confirm }):
//   send()        -> Promise<{ cooldownSeconds? }>, rejects with an Error whose
//                    message is shown to the user (optional err.retryAfterSeconds)
//   confirm(code) -> Promise, rejects the same way

import { useEffect, useRef, useState } from 'react';

const DEFAULT_COOLDOWN = 60;

export function useCodeVerification({ send, confirm, codeLabel }) {
  // status: idle | sending | sent | checking | verified
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [code, setCode] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const statusRef = useRef(status);
  statusRef.current = status;

  useEffect(() => {
    if (cooldown <= 0) return undefined;
    const t = setTimeout(() => setCooldown((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const codeSent = status === 'sent' || status === 'checking';

  const sendCode = async () => {
    // a failed resend keeps the earlier code box open
    const before = statusRef.current === 'idle' ? 'idle' : 'sent';
    setStatus('sending');
    setError('');
    try {
      const res = await send();
      setCooldown(res?.cooldownSeconds || DEFAULT_COOLDOWN);
      setCode('');
      setStatus('sent');
    } catch (err) {
      if (err.retryAfterSeconds) setCooldown(err.retryAfterSeconds);
      setStatus(before);
      setError(err.message);
    }
  };

  const confirmCode = async () => {
    if (!/^\d{6}$/.test(code)) {
      setError(`Please enter the 6-digit code from the ${codeLabel}.`);
      return;
    }
    setStatus('checking');
    setError('');
    try {
      await confirm(code);
      setStatus('verified');
    } catch (err) {
      setStatus('sent');
      setError(err.message);
    }
  };

  const reset = () => {
    setStatus('idle');
    setError('');
    setCode('');
  };

  return {
    status,
    error,
    setError,
    code,
    setCode,
    cooldown,
    codeSent,
    verified: status === 'verified',
    sendCode,
    confirmCode,
    reset,
  };
}

/** The Verify button inside the field, or the green tick once verified. */
export function VerifyButton({ v, onClick = v.sendCode }) {
  if (v.verified) {
    return (
      <span className="verified-tick" title="Verified" aria-hidden="true">
        ✓
      </span>
    );
  }
  return (
    <button type="button" className="verify-btn" onClick={onClick} disabled={v.status === 'sending' || v.codeSent}>
      {v.status === 'sending' ? 'Sending…' : v.codeSent ? 'Code sent' : 'Verify'}
    </button>
  );
}

/** Code entry box (shown after a code is sent), status for screen readers, and errors. */
export function VerifyCodeBox({ v, id, sentTo, via }) {
  return (
    <>
      <span id={`${id}-status`} className="visually-hidden" aria-live="polite">
        {v.verified ? 'Verified.' : v.codeSent ? `A verification code has been sent by ${via}.` : ''}
      </span>

      {v.codeSent && (
        <div className="verify-code">
          <p className="verify-code-note">
            We sent a 6-digit code by {via} to <strong>{sentTo}</strong>.
          </p>
          <div className="verify-code-row">
            <input
              id={`${id}-code`}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              placeholder="6-digit code"
              aria-label="Verification code"
              value={v.code}
              onChange={(e) => v.setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              onKeyDown={(e) => {
                // Enter here confirms the code, not the whole form
                if (e.key === 'Enter') {
                  e.preventDefault();
                  v.confirmCode();
                }
              }}
              autoFocus
            />
            <button type="button" className="verify-code-confirm" onClick={v.confirmCode} disabled={v.status === 'checking'}>
              {v.status === 'checking' ? 'Checking…' : 'Confirm'}
            </button>
          </div>
          <button type="button" className="verify-code-resend" onClick={v.sendCode} disabled={v.cooldown > 0}>
            {v.cooldown > 0 ? `Resend code in ${v.cooldown}s` : 'Resend code'}
          </button>
        </div>
      )}

      {v.error && (
        <p className="contact-form-error" role="alert">
          {v.error}
        </p>
      )}
    </>
  );
}
