// src/pages/SignupWizard.jsx
//
// Step 1 — Enter Email → Step 2 — Enter Verification Code →
// Step 3 — Account Details + Password → Step 4 — Account Created.
//
// Each step calls the corresponding backend endpoint directly — there is
// no `emailVerified` flag held in this component's state that the backend
// trusts; the ONLY thing that proves verification to /auth/register is the
// emailVerificationToken returned by /auth/register/verify, which this
// component just carries forward and submits. Tampering with this
// component's React state (e.g. via devtools) doesn't help — the token is
// a signed, server-issued value with a 15-minute expiry checked
// server-side (see verificationService.js on the backend).

import { useState } from 'react';
import { useAuth, ApiError } from '../context/AuthContext.jsx';
import { apiPost } from '../services/api.js';
import AuthLayout from '../components/Auth/AuthLayout.jsx';
import PasswordInput from '../components/Auth/PasswordInput.jsx';
import PasswordRequirements, { passwordMeetsRequirements } from '../components/Auth/PasswordRequirements.jsx';
import PasswordMatch from '../components/Auth/PasswordMatch.jsx';

const STEPS = ['Verify Email', 'Account Details', 'Complete'];

export default function SignupWizard() {
  const { login, register } = useAuth();
  const params = new URLSearchParams(window.location.search);
  const returnTo = params.get('returnTo');

  // step: 1 = email entry, 2 = code entry, 3 = account details, 4 = done
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [emailVerificationToken, setEmailVerificationToken] = useState(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  const [details, setDetails] = useState({ firstName: '', lastName: '', username: '', password: '', confirmPassword: '' });

  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // ---- Step 1: email ----
  const submitEmail = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    try {
      const res = await apiPost('/auth/register/start', { email });
      setResendCooldown(res.resendCooldownSeconds || 60);
      setStep(2);
    } catch (err) {
      setMessage(err instanceof ApiError ? err.message : 'Could not send verification code.');
    } finally {
      setSubmitting(false);
    }
  };

  // ---- Step 2: verification code ----
  const submitCode = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    try {
      const res = await apiPost('/auth/register/verify', { email, code });
      setEmailVerificationToken(res.emailVerificationToken);
      setStep(3);
    } catch (err) {
      setMessage(err instanceof ApiError ? err.message : 'Verification failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const resendCode = async () => {
    setMessage('');
    try {
      const res = await apiPost('/auth/register/resend', { email });
      setResendCooldown(res.resendCooldownSeconds || 60);
      setMessage('A new code has been sent.');
    } catch (err) {
      setMessage(err instanceof ApiError ? err.message : 'Could not resend code.');
    }
  };

  const changeEmail = () => {
    setStep(1);
    setCode('');
    setMessage('');
  };

  // ---- Step 3: account details ----
  const updateDetail = (field) => (e) => setDetails((prev) => ({ ...prev, [field]: e.target.value }));

  const submitDetails = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!passwordMeetsRequirements(details.password)) {
      setMessage('Password does not meet the requirements above.');
      return;
    }
    if (details.password !== details.confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    try {
      await register({
        email,
        username: details.username,
        password: details.password,
        first_name: details.firstName,
        last_name: details.lastName,
        email_verification_token: emailVerificationToken,
      });
      setStep(4);
    } catch (err) {
      setMessage(err instanceof ApiError ? err.message : 'Account creation failed.');
    } finally {
      setSubmitting(false);
    }
  };

  // ---- Step 4: complete -> log in and continue to returnTo ----
  const finishAndContinue = async () => {
    setSubmitting(true);
    try {
      const result = await login(email, details.password, returnTo);
      window.location.href = result.returnTo || '/';
    } catch {
      // Account was created successfully even if this auto-login fails
      // for some reason -- don't strand the user on an error, just send
      // them to log in manually.
      window.location.href = `/login${returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : ''}`;
    }
  };

  const activeIndex = Math.max(0, step - 2); // step 1 & 2 both map to "Verify Email"

  return (
    <AuthLayout title="Create your account" subtitle={step < 4 ? 'Join the Sastranidhi knowledge ecosystem.' : undefined}>
      {step < 4 && (
        <>
          <div className="auth-steps">
            {STEPS.map((_, i) => (
              <div key={i} className={`step ${i < activeIndex ? 'done' : i === activeIndex ? 'active' : ''}`} />
            ))}
          </div>
          <p className="auth-step-label">{STEPS[activeIndex]}</p>
        </>
      )}

      {message && <div className="auth-error" style={{ marginBottom: 14 }}>{message}</div>}

      {step === 1 && (
        <form className="form" onSubmit={submitEmail}>
          <input
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <button className="btn primary" type="submit" disabled={submitting}>
            {submitting ? 'Sending\u2026' : 'Send Verification Code'}
          </button>
        </form>
      )}

      {step === 2 && (
        <>
          <p style={{ fontSize: 14, color: 'var(--muted)', marginTop: -8 }}>
            We sent a code to <strong>{email}</strong>.
          </p>
          <form className="form" onSubmit={submitCode}>
            <input
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              required
              placeholder="6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
            />
            <button className="btn primary" type="submit" disabled={submitting}>
              {submitting ? 'Verifying\u2026' : 'Verify Email'}
            </button>
          </form>
          <div className="auth-links">
            <button type="button" onClick={changeEmail} style={{ background: 'none', border: 'none', color: 'var(--navy)', fontWeight: 700, cursor: 'pointer', padding: 0 }}>
              Change email
            </button>
            <button
              type="button"
              onClick={resendCode}
              disabled={resendCooldown > 0}
              style={{ background: 'none', border: 'none', color: 'var(--navy)', fontWeight: 700, cursor: resendCooldown > 0 ? 'default' : 'pointer', padding: 0, opacity: resendCooldown > 0 ? 0.5 : 1 }}
            >
              Resend code
            </button>
          </div>
        </>
      )}

      {step === 3 && (
        <form className="form" onSubmit={submitDetails}>
          <p style={{ fontSize: 13, color: 'var(--green)', marginTop: -8 }}>✓ {email} verified</p>
          <input required placeholder="First name" value={details.firstName} onChange={updateDetail('firstName')} />
          <input required placeholder="Last name" value={details.lastName} onChange={updateDetail('lastName')} />
          <input required placeholder="Username" value={details.username} onChange={updateDetail('username')} autoComplete="username" />
          <PasswordInput
            value={details.password}
            onChange={updateDetail('password')}
            placeholder="Create password"
            autoComplete="new-password"
            required
          />
          <PasswordRequirements password={details.password} />
          <PasswordInput
            value={details.confirmPassword}
            onChange={updateDetail('confirmPassword')}
            placeholder="Confirm password"
            autoComplete="new-password"
            required
          />
          <PasswordMatch password={details.password} confirmPassword={details.confirmPassword} />
          <button className="btn primary" type="submit" disabled={submitting}>
            {submitting ? 'Creating account\u2026' : 'Create Account'}
          </button>
        </form>
      )}

      {step === 4 && (
        <>
          <div className="auth-success">Account created! You're all set.</div>
          <button className="btn primary" style={{ marginTop: 16, width: '100%' }} onClick={finishAndContinue} disabled={submitting}>
            {submitting ? 'Signing you in\u2026' : 'Continue'}
          </button>
        </>
      )}

      {step < 4 && (
        <p className="auth-links" style={{ justifyContent: 'center' }}>
          Already have an account?{' '}
          <a href={`/login${returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : ''}`}>Log in</a>
        </p>
      )}
    </AuthLayout>
  );
}
