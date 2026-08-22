// src/components/Auth/PasswordRequirements.jsx
//
// Shows live whether the typed password satisfies the project's ACTUAL
// password rule. Deliberately checks only what the backend actually
// enforces (see POST /auth/register and /auth/reset-password on the IdP:
// `if (password.length < 8) throw ...` — that's the entire rule today).
//
// Do not add extra checks here (uppercase, numbers, symbols, etc.) unless
// the backend is also updated to require them — a frontend checklist that
// shows more/different requirements than the server actually enforces is
// worse than no checklist: it either blocks a password the server would
// have accepted, or gives false confidence in one the server will reject.
// If stricter rules are ever added server-side, mirror them here at the
// same time, not before.

const MIN_LENGTH = 8;

export default function PasswordRequirements({ password }) {
  const meetsLength = password.length >= MIN_LENGTH;

  return (
    <ul className="password-requirements">
      <li className={meetsLength ? 'met' : 'unmet'}>
        <span aria-hidden="true">{meetsLength ? '✓' : '○'}</span> At least {MIN_LENGTH} characters
      </li>
    </ul>
  );
}

export function passwordMeetsRequirements(password) {
  return typeof password === 'string' && password.length >= MIN_LENGTH;
}
