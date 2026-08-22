// src/utils/pkce.js
//
// PKCE (RFC 7636) helpers for the browser, using window.crypto.subtle —
// no dependency needed. This produces exactly what the backend's
// verifyPkce() expects (src/utils/crypto.js on the IdP): a SHA-256 digest
// of the verifier, Base64URL-encoded with no padding.
//
// WHERE THIS IS ACTUALLY USED IN THIS PROJECT:
// PlatformCard.jsx does NOT use this for the real "Open Platform" links —
// seeThe comment there for why (short version: the code_verifier has to be
// held by whoever calls /oauth/token, which is the CHILD app receiving
// the redirect, not this portal). This utility is used by
// pages/OAuthTestCallback.jsx, a local-only test harness that plays the
// role of a child app so you can verify the IdP's full PKCE round trip
// before a real child app exists. It's also there as the reference
// browser-side implementation for whichever child app ends up being an
// SPA rather than a server-rendered app like the Module 6 Express example.

function toBase64Url(bytes) {
  let binary = '';
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/** Random 32-byte verifier, Base64URL-encoded — same size as the backend's own crypto.randomBytes(32) calls elsewhere in this project. */
function generateCodeVerifier() {
  const bytes = new Uint8Array(32);
  window.crypto.getRandomValues(bytes);
  return toBase64Url(bytes);
}

/** SHA-256(verifier), Base64URL-encoded — the S256 transform PKCE requires. */
async function deriveCodeChallenge(verifier) {
  const encoded = new TextEncoder().encode(verifier);
  const digest = await window.crypto.subtle.digest('SHA-256', encoded);
  return toBase64Url(new Uint8Array(digest));
}

/** Generates a fresh { verifier, challenge } pair in one call. */
export async function generatePkcePair() {
  const verifier = generateCodeVerifier();
  const challenge = await deriveCodeChallenge(verifier);
  return { verifier, challenge };
}

/** Random state / nonce values for the authorize request — same shape, reused for both since neither needs the SHA-256 step. */
export function generateRandomToken(byteLength = 16) {
  const bytes = new Uint8Array(byteLength);
  window.crypto.getRandomValues(bytes);
  return toBase64Url(bytes);
}
