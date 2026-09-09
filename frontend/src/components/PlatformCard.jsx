// src/components/PlatformCard.jsx
//
// Renders one "Open Platform" card and handles the click.
//
// WHY THIS DOESN'T DO PKCE ITSELF (correcting the original spec):
// The brief asked for this component to generate a PKCE verifier/challenge,
// stash the verifier in sessionStorage, and redirect straight to the IdP's
// /oauth/authorize with redirect_uri pointing at the child app's callback
// (e.g. http://localhost:3001/callback for Paripraśna).
//
// That breaks in practice: code_verifier only has to be presented once,
// at the /oauth/token exchange — and only the app whose redirect_uri
// received the `code` can make that call (the backend checks
// stored.redirectUri === redirect_uri, see handleAuthorizationCodeGrant
// in routes/oauth.js). sessionStorage doesn't cross origins/ports, so a
// verifier saved here on :5173 would be unreadable by Paripraśna's own
// code running on :3001 — the exchange would fail with "PKCE verification
// failed" every time.
//
// The correct split (and what the backend's own docs/child-app-integration.md
// + examples/child-app-express/authRoutes.js already assume): each child
// app owns its own /login route, generates its own PKCE pair, and redirects
// to the IdP itself. This portal's job is just to send the browser to that
// child app's /login — the shared Redis-backed SSO session cookie (already
// set when the user logged into this portal) is what makes that a silent,
// instant redirect back with a code, no login screen shown twice.
//
// If a card's platform doesn't have a local login route configured (e.g.
// still pointing at a production URL with no /login handler yet), it just
// falls back to opening the platform's homepage directly — better than
// sending the browser to a route that doesn't exist yet.
//
// EDMINGLE / IKS-LMS EXCEPTION:
// Edmingle is a third-party SaaS LMS with no codebase access — it does
// NOT speak OAuth2/PKCE at all. It uses a direct HS256 JWT redirect
// handled entirely by this backend (GET /auth/edmingle/sso). A card
// carrying `ssoRoute` skips the PKCE/child-app-login logic above
// completely and is sent straight to that backend endpoint instead.

import { API_BASE_URL } from '../services/api.js';

export default function PlatformCard({
  icon,
  title,
  description,
  href,
  linkLabel,
  loginPath = '/login',
  ssoRoute,
}) {
  const handleOpenPlatform = (e) => {
    e.preventDefault();

    // Third-party SaaS child apps using direct-JWT SSO (currently just
    // Edmingle/IKS-LMS) — bypass the PKCE/login-path logic entirely and
    // go straight to this backend's SSO bridge route.
    if (ssoRoute) {
      window.location.href = `${API_BASE_URL}${ssoRoute}`;
      return;
    }

    // Open the link directly in a new tab
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <article className="card">
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <a 
        className="link" 
        href={href} 
        onClick={handleOpenPlatform}
        target="_blank"
        rel="noopener noreferrer"
      >
        {linkLabel}
      </a>
    </article>
  );
}




// // src/components/PlatformCard.jsx
// //
// // Renders one "Open Platform" card and handles the click.
// //
// // WHY THIS DOESN'T DO PKCE ITSELF (correcting the original spec):
// // The brief asked for this component to generate a PKCE verifier/challenge,
// // stash the verifier in sessionStorage, and redirect straight to the IdP's
// // /oauth/authorize with redirect_uri pointing at the child app's callback
// // (e.g. http://localhost:3001/callback for Paripraśna).
// //
// // That breaks in practice: code_verifier only has to be presented once,
// // at the /oauth/token exchange — and only the app whose redirect_uri
// // received the `code` can make that call (the backend checks
// // stored.redirectUri === redirect_uri, see handleAuthorizationCodeGrant
// // in routes/oauth.js). sessionStorage doesn't cross origins/ports, so a
// // verifier saved here on :5173 would be unreadable by Paripraśna's own
// // code running on :3001 — the exchange would fail with "PKCE verification
// // failed" every time.
// //
// // The correct split (and what the backend's own docs/child-app-integration.md
// // + examples/child-app-express/authRoutes.js already assume): each child
// // app owns its own /login route, generates its own PKCE pair, and redirects
// // to the IdP itself. This portal's job is just to send the browser to that
// // child app's /login — the shared Redis-backed SSO session cookie (already
// // set when the user logged into this portal) is what makes that a silent,
// // instant redirect back with a code, no login screen shown twice.
// //
// // If a card's platform doesn't have a local login route configured (e.g.
// // still pointing at a production URL with no /login handler yet), it just
// // falls back to opening the platform's homepage directly — better than
// // sending the browser to a route that doesn't exist yet.

// export default function PlatformCard({ icon, title, description, href, linkLabel, loginPath = '/login' }) {
//   const handleOpenPlatform = (e) => {
//     e.preventDefault();

//     let target;
//     try {
//       target = new URL(loginPath, href).toString();
//     } catch {
//       target = href;
//     }

//     window.location.href = target;
//   };

//   return (
//     <article className="card">
//       <div className="icon">{icon}</div>
//       <h3>{title}</h3>
//       <p>{description}</p>
//       <a className="link" href={href} onClick={handleOpenPlatform}>
//         {linkLabel}
//       </a>
//     </article>
//   );
// }
