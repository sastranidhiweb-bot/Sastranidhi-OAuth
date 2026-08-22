// src/pages/LoginPage.jsx
//
// The portal's own branded login page. This is now what /oauth/authorize
// redirects unauthenticated users to (see the backend's routes/oauth.js) —
// so this page has to handle a `?returnTo=` query param that, when
// present, is a pending child-app authorization request waiting to be
// completed once login succeeds.

import { useState } from 'react';
import { useAuth, ApiError } from '../context/AuthContext.jsx';
import AuthLayout from '../components/Auth/AuthLayout.jsx';
import PasswordInput from '../components/Auth/PasswordInput.jsx';

export default function LoginPage() {
  const { login, googleLoginUrl } = useAuth();

  const params = new URLSearchParams(window.location.search);
  const returnTo = params.get('returnTo'); // backend-relative path, e.g. /oauth/authorize?... — or null
  const oauthError = params.get('error');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(
    oauthError ? 'That sign-in attempt didn\u2019t complete. Please try again.' : ''
  );
  const [messageType, setMessageType] = useState(oauthError ? 'error' : '');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      const result = await login(email, password, returnTo);

      if (result.mfaRequired) {
        setMessageType('error');
        setMessage(
          'This account has multi-factor authentication enabled. MFA entry isn\u2019t supported on this page yet — please use an account without MFA for now.'
        );
        return;
      }

      window.location.href = result.returnTo || '/';
    } catch (err) {
      setMessageType('error');
      setMessage(err instanceof ApiError ? err.message : 'Login failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to access Sastranidhi and its connected platforms.">
      {message && <div className={messageType === 'error' ? 'auth-error' : 'auth-success'}>{message}</div>}

      <form className="form" onSubmit={handleSubmit} style={{ marginTop: message ? 14 : 0 }}>
        <input
          type="email"
          required
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoComplete="current-password"
          required
        />
        <div style={{ textAlign: 'right' }}>
          <a href={`/forgot-password${returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : ''}`} style={{ fontSize: 13, color: 'var(--muted)' }}>
            Forgot password?
          </a>
        </div>
        <button className="btn primary" type="submit" disabled={submitting}>
          {submitting ? 'Signing in\u2026' : 'Login'}
        </button>
      </form>

      <div className="auth-divider">or</div>

      <a className="btn-google" href={googleLoginUrl(returnTo)}>
        Continue with Google
      </a>

      <p className="auth-links" style={{ justifyContent: 'center' }}>
        Don&apos;t have an account?{' '}
        <a href={`/signup${returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : ''}`}>Sign up</a>
      </p>
    </AuthLayout>
  );
}
