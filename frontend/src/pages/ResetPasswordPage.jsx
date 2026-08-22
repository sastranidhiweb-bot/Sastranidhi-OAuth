// src/pages/ResetPasswordPage.jsx
//
// Reached via the link emailService sends (see passwordResetService.js on
// the backend: `${FRONTEND_BASE_URL}/reset-password?token=...`).

import { useState } from 'react';
import { apiPost } from '../services/api.js';
import { ApiError } from '../context/AuthContext.jsx';
import AuthLayout from '../components/Auth/AuthLayout.jsx';
import PasswordInput from '../components/Auth/PasswordInput.jsx';
import PasswordRequirements, { passwordMeetsRequirements } from '../components/Auth/PasswordRequirements.jsx';
import PasswordMatch from '../components/Auth/PasswordMatch.jsx';

export default function ResetPasswordPage() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [done, setDone] = useState(false);
  const [message, setMessage] = useState(token ? '' : 'This reset link is missing its token — please use the link from your email.');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!passwordMeetsRequirements(password)) {
      setMessage('Password does not meet the requirements above.');
      return;
    }
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    try {
      await apiPost('/auth/reset-password', { token, password });
      setDone(true);
    } catch (err) {
      // Covers invalid/expired/already-used tokens — the backend gives one
      // consistent message for all three (see passwordResetModel's
      // findValidByTokenHash) rather than distinguishing them, so an
      // attacker probing tokens can't learn which failure mode occurred.
      setMessage(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <AuthLayout title="Password updated">
        <div className="auth-success">Your password has been changed. Please log in with your new password.</div>
        <a className="btn primary" style={{ marginTop: 16, width: '100%', display: 'block', textAlign: 'center' }} href="/login">
          Go to login
        </a>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Set a new password">
      {message && <div className="auth-error" style={{ marginBottom: 14 }}>{message}</div>}
      <form className="form" onSubmit={handleSubmit}>
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New password"
          autoComplete="new-password"
          required
        />
        <PasswordRequirements password={password} />
        <PasswordInput
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
          autoComplete="new-password"
          required
        />
        <PasswordMatch password={password} confirmPassword={confirmPassword} />
        <button className="btn primary" type="submit" disabled={submitting || !token}>
          {submitting ? 'Updating\u2026' : 'Update Password'}
        </button>
      </form>
    </AuthLayout>
  );
}
