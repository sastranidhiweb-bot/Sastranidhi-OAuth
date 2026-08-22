// src/pages/OAuthTestPage.jsx
//
// LOCAL DEV TEST HARNESS ONLY — not part of the production portal UI, not
// linked from anywhere in the main site. Its only job is to let you verify
// the IdP's full Authorization Code + PKCE round trip today, from this
// portal, before Paripraśna (or any child app) actually exists as a
// running server.
//
// It works by playing the role of a child app for one route:
// http://localhost:5173/oauth-test acts as BOTH the "Open Platform"
// trigger and the redirect_uri callback — the one place in this project
// where the portal is allowed to own a PKCE verifier, precisely because
// it's also the one place receiving the resulting `code` (see the long
// comment in PlatformCard.jsx for why that pairing matters).
//
// ── SECURITY NOTE, READ BEFORE REUSING THIS PATTERN ──────────────────
// This page calls /oauth/token directly from the browser, which means
// the OAuth client_secret below is embedded in frontend JS and visible
// in devtools/network tab. That is NEVER acceptable for a real client —
// it defeats the point of having a secret at all. It's tolerable ONLY
// here, for a throwaway local test client hitting a local backend. A
// real child app must do this exchange server-side, keeping the secret
// off the browser entirely — that's exactly what
// examples/child-app-express/authRoutes.js in the backend repo does.
// Delete this page (or at least this client's registration) before
// shipping anything real.
//
// ── ONE-TIME SETUP ─────────────────────────────────────────────────
// This route needs its own registered OAuth client — the existing
// PARIPRASHNA client's redirect_uri points at :3001, not this portal.
// From the backend project:
//
//   node scripts/create-client.js \
//     --app PARIPRASHNA \
//     --client-id PORTAL_TEST \
//     --redirect-uris "http://localhost:5173/oauth-test" \
//     --scopes "openid,profile,email"
//
// Paste the printed client_secret into TEST_CLIENT_SECRET below.

import { useEffect, useState } from 'react';
import { generatePkcePair, generateRandomToken } from '../utils/pkce.js';
import { apiPost, API_BASE_URL } from '../services/api.js';

const TEST_CLIENT_ID = 'PORTAL_TEST';
// Paste YOUR OWN printed client_secret here after running the
// create-client.js command above against YOUR backend/database — the
// secret is random per registration, so a value baked into this file
// would only ever work against the specific database it was created in.
// (I ran this command against a throwaway sandbox DB to verify the whole
// flow works end-to-end before shipping this file — see the write-up.)
const TEST_CLIENT_SECRET = 'PASTE_THE_PRINTED_client_secret_HERE';
const REDIRECT_URI = `${window.location.origin}/oauth-test`;

export default function OAuthTestPage() {
  const [status, setStatus] = useState('idle'); // idle | starting | exchanging | success | error
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const returnedState = params.get('state');
    const oauthError = params.get('error');

    if (oauthError) {
      setStatus('error');
      setError(`${oauthError}: ${params.get('error_description') || ''}`);
      return;
    }

    if (!code) {
      // No code yet -- this is the "click to start" view.
      return;
    }

    // We're on the callback leg.
    const savedState = sessionStorage.getItem('oauth_test_state');
    const verifier = sessionStorage.getItem('oauth_test_verifier');
    sessionStorage.removeItem('oauth_test_state');
    sessionStorage.removeItem('oauth_test_verifier');

    if (!verifier || returnedState !== savedState) {
      setStatus('error');
      setError('State mismatch or missing verifier -- possible CSRF, or sessionStorage was cleared between redirect legs.');
      return;
    }

    setStatus('exchanging');
    apiPost('/oauth/token', {
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
      client_id: TEST_CLIENT_ID,
      client_secret: TEST_CLIENT_SECRET,
      code_verifier: verifier,
    })
      .then((tokens) => {
        setResult(tokens);
        setStatus('success');
        // Clean the code/state out of the visible URL now that they're spent.
        window.history.replaceState({}, '', '/oauth-test');
      })
      .catch((err) => {
        setStatus('error');
        setError(err.message);
      });
  }, []);

  const startFlow = async () => {
    setStatus('starting');
    const { verifier, challenge } = await generatePkcePair();
    const state = generateRandomToken();

    sessionStorage.setItem('oauth_test_verifier', verifier);
    sessionStorage.setItem('oauth_test_state', state);

    const authorizeUrl = new URL('/oauth/authorize', API_BASE_URL);
    authorizeUrl.searchParams.set('response_type', 'code');
    authorizeUrl.searchParams.set('client_id', TEST_CLIENT_ID);
    authorizeUrl.searchParams.set('redirect_uri', REDIRECT_URI);
    authorizeUrl.searchParams.set('scope', 'openid profile email');
    authorizeUrl.searchParams.set('state', state);
    authorizeUrl.searchParams.set('code_challenge', challenge);
    authorizeUrl.searchParams.set('code_challenge_method', 'S256');

    window.location.href = authorizeUrl.toString();
  };

  return (
    <div style={{ maxWidth: 640, margin: '80px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      <h1>OAuth Test Harness (local dev only)</h1>
      <p style={{ color: '#666' }}>
        Verifies the full Authorization Code + PKCE round trip against your local backend, standing in for a
        real child app. Log in on the main site first (or you'll hit the IdP's login screen next).
      </p>

      {status === 'idle' && (
        <button onClick={startFlow} style={{ padding: '10px 18px', fontWeight: 700 }}>
          Start test login
        </button>
      )}
      {(status === 'starting' || status === 'exchanging') && <p>Working…</p>}
      {status === 'error' && (
        <div style={{ background: '#fee', border: '1px solid #c33', padding: 16, borderRadius: 8 }}>
          <strong>Error:</strong> {error}
        </div>
      )}
      {status === 'success' && (
        <div style={{ background: '#efe', border: '1px solid #3a3', padding: 16, borderRadius: 8 }}>
          <strong>Success — tokens received:</strong>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontSize: 12 }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      <p style={{ marginTop: 40 }}>
        <a href="/">← Back to the portal</a>
      </p>
    </div>
  );
}
