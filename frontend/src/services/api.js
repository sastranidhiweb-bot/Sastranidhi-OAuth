// src/services/api.js
//
// Central API client for talking to the Sastranidhi OAuth IdP backend
// (sastranidhi-oauth) from the React portal.
//
// Uses the native fetch API rather than axios — the project's
// package.json has no axios dependency, and nothing here needs more than
// fetch + credentials: 'include' provides. If you'd rather standardize on
// axios across a larger app later, this file is the only place that
// would need to change; every caller goes through apiFetch/apiGet/apiPost.
//
// IMPORTANT — backend CORS requirement:
// The IdP's CORS middleware (src/app.js) only allows origins listed in
// its own ALLOWED_ORIGINS env var, and this app runs on
// http://localhost:5173 (Vite's default). Add that to the backend's
// .env before any of this will work:
//
//   ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,http://localhost:5173
//
// then restart the backend. Without it, every request below will fail
// with a CORS error in the browser console, not a 401/403 from the API.

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

/**
 * Custom error class so callers can distinguish "the API responded with
 * an error" (has .code / .status) from a network failure (backend down,
 * CORS misconfigured, etc.) with no structured body to read.
 */
export class ApiError extends Error {
  constructor(message, { status, code, details } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code; // e.g. 'invalid_credentials', 'user_exists' — matches the IdP's `error` field
    this.details = details;
  }
}

/**
 * Low-level fetch wrapper. Every call:
 *  - points at the IdP by default (override with a full URL if ever needed)
 *  - sends credentials so the HTTP-only SSO session cookie is included
 *    and any Set-Cookie from the response is saved
 *  - parses JSON, and throws ApiError using the IdP's own
 *    { error, error_description } shape (see errorHandler.js on the
 *    backend) so every caller gets a consistent, readable error
 */
export async function apiFetch(path, { method = 'GET', body, headers = {} } = {}) {
  const url = path.startsWith('http') ? path : `${API_BASE_URL}${path}`;

  let response;
  try {
    response = await fetch(url, {
      method,
      credentials: 'include', // send + store the SSO session cookie
      headers: {
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (networkErr) {
    // fetch() throws a plain TypeError for network failures (backend
    // down, CORS rejection, DNS, etc.) — no status code to read here.
    throw new ApiError(
      'Could not reach the authentication server. Is it running, and is this origin in its ALLOWED_ORIGINS?',
      { status: 0, code: 'network_error' }
    );
  }

  // 204 / empty-body responses (rare here, but don't assume JSON exists)
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new ApiError(data?.error_description || data?.error || `Request failed (${response.status})`, {
      status: response.status,
      code: data?.error,
      details: data?.details,
    });
  }

  return data;
}

export const apiGet = (path) => apiFetch(path, { method: 'GET' });
export const apiPost = (path, body) => apiFetch(path, { method: 'POST', body });

export { API_BASE_URL };
