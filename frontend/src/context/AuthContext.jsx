// src/context/AuthContext.jsx
//
// Global auth state for the portal, backed by the IdP's session-cookie
// endpoints (NOT the OAuth2/PKCE flow — that's for child apps, see
// PlatformCard.jsx and docs/child-app-integration.md in the backend repo).
// The portal is effectively a first-party client here: it talks to
// /auth/register, /auth/login, /auth/session and /auth/logout directly,
// the same way the IdP's own /auth/login-page demo does.
//
// ONE CORRECTION FROM THE ORIGINAL SPEC WORTH FLAGGING:
// The brief asked for the initial-load check to call GET /auth/me. That
// endpoint requires a Bearer *access token* (see requireAccessToken
// middleware on the backend) — the portal doesn't have one of those
// unless it goes through the full OAuth code flow against itself, which
// isn't the point of a first-party login. The endpoint actually meant
// for "is there a live SSO session right now?" is GET /auth/session,
// which reads the session cookie via Passport (`req.isAuthenticated()`)
// and returns `{ authenticated, user }` — that's what's used below.

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { apiGet, apiPost, ApiError, API_BASE_URL } from '../services/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // Set only when a login attempt comes back with mfa_required: true.
  // There's no MFA-entry UI in this portal yet (out of scope for this
  // pass) — surfaced so the caller can at least show something honest
  // instead of silently failing.
  const [mfaChallenge, setMfaChallenge] = useState(null);

  const refreshSession = useCallback(async () => {
    try {
      const data = await apiGet('/auth/session');
      setUser(data.authenticated ? data.user : null);
    } catch {
      // Network/CORS failure talking to the IdP — treat as logged out
      // rather than throwing during app boot.
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  const login = useCallback(async (email, password, returnTo = null) => {
    const data = await apiPost('/auth/login', { email, password, returnTo });

    if (data.mfa_required) {
      setMfaChallenge({ mfaToken: data.mfa_token });
      return { mfaRequired: true };
    }

    setMfaChallenge(null);
    setUser(data.user);
    // The backend has already validated/sanitized returnTo (see
    // utils/returnTo.js on the IdP) — this is authoritative, not the raw
    // value the caller passed in. A backend-relative path ("/oauth/...")
    // needs the API origin prefixed; an absolute URL (the portal's own
    // origin) is used as-is.
    const resolvedReturnTo = data.returnTo
      ? data.returnTo.startsWith('/')
        ? `${API_BASE_URL}${data.returnTo}`
        : data.returnTo
      : null;
    return { mfaRequired: false, user: data.user, returnTo: resolvedReturnTo };
  }, []);

  /** Builds the "Continue with Google" URL. returnTo follows the same rules as login() above — pass a backend-relative path (e.g. from ?returnTo= on the login page) or omit it to just return to the portal itself. */
  const googleLoginUrl = useCallback((returnTo) => {
    const url = new URL('/auth/google', API_BASE_URL);
    url.searchParams.set('returnTo', returnTo || window.location.origin);
    return url.toString();
  }, []);

  const register = useCallback(async (formData) => {
    // formData: { email, username, password, first_name, last_name, mobile? }
    const data = await apiPost('/auth/register', formData);
    // Registration does not log the user in (matches the backend —
    // POST /auth/register never calls req.login()). Caller decides
    // whether to prompt them to log in next, or call login() itself
    // with the same credentials.
    return data.user;
  }, []);

  const logout = useCallback(async (everywhere = false) => {
    try {
      await apiPost(`/auth/logout${everywhere ? '?everywhere=true' : ''}`);
    } finally {
      // Clear local state regardless of whether the request succeeded —
      // an unreachable IdP shouldn't leave the UI stuck showing a user
      // who may already be logged out.
      setUser(null);
    }
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    mfaChallenge,
    login,
    register,
    logout,
    refreshSession,
    googleLoginUrl,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}

export { ApiError };
