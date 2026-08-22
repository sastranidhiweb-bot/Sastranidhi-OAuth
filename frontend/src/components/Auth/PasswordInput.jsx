// src/components/Auth/PasswordInput.jsx
//
// A plain <input type="password"> with a show/hide toggle button. Used by
// LoginPage, SignupWizard (both the password and confirm-password fields),
// and ResetPasswordPage — one implementation instead of four copies.

import { useState } from 'react';

export default function PasswordInput({ value, onChange, placeholder, autoComplete, required, id }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="password-input">
      <input
        id={id}
        type={visible ? 'text' : 'password'}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
      />
      <button
        type="button"
        className="password-toggle"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? 'Hide password' : 'Show password'}
        aria-pressed={visible}
        tabIndex={0}
      >
        {visible ? 'Hide' : 'Show'}
      </button>
    </div>
  );
}
