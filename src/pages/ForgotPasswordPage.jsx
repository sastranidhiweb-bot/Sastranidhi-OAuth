// src/pages/ForgotPasswordPage.jsx

import { useState } from 'react';
import { apiPost } from '../services/api.js';
import { ApiError } from '../context/AuthContext.jsx';
import AuthLayout from '../components/Auth/AuthLayout.jsx';

export default function ForgotPasswordPage() {
  const params = new URLSearchParams(window.location.search);
  const returnTo = params.get('returnTo');

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    try {
      // The backend always returns the same response whether or not the
      // email exists (see passwordResetService.requestReset) — this page
      // does the same on the frontend, deliberately.
      await apiPost('/auth/forgot-password', { email });
      setSubmitted(true);
    } catch (err) {
      setMessage(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout title="Reset your password" subtitle={submitted ? undefined : 'Enter your email and we\u2019ll send you a reset link.'}>
      {submitted ? (
        <div className="auth-success">
          If an account exists for <strong>{email}</strong>, a password reset link has been sent. Check your inbox.
        </div>
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          {message && <div className="auth-error">{message}</div>}
          <input
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <button className="btn primary" type="submit" disabled={submitting}>
            {submitting ? 'Sending\u2026' : 'Send Reset Link'}
          </button>
        </form>
      )}

      <p className="auth-links" style={{ justifyContent: 'center' }}>
        <a href={`/login${returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : ''}`}>Back to login</a>
      </p>
    </AuthLayout>
  );
}
