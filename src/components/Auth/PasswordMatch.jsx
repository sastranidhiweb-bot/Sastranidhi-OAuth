// src/components/Auth/PasswordMatch.jsx
//
// Live "does the confirm-password field match the password field" hint.
// Says nothing until the user has actually typed something in the confirm
// field — showing a red "doesn't match" against an empty field is just
// noise, not help.

export default function PasswordMatch({ password, confirmPassword }) {
  if (!confirmPassword) return null;

  const matches = password === confirmPassword;

  return (
    <p className={`password-match ${matches ? 'met' : 'unmet'}`}>
      {matches ? '✓ Passwords match' : '○ Passwords do not match yet'}
    </p>
  );
}
