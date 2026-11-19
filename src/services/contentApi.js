// Client for the Sastranidhi content service (articles, videos, topics,
// śloka of the day). Public reads need no sign-in; the admin calls send
// the content service's own session cookie (credentials: 'include').
//
// Set VITE_CONTENT_API_URL in production (e.g. https://content.sastranidhi.org).

export const CONTENT_API_URL = (import.meta.env.VITE_CONTENT_API_URL || 'http://localhost:4100').replace(/\/$/, '');

export class ContentError extends Error {
  constructor(message, status, code) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

async function request(path, { method = 'GET', body, signal } = {}) {
  let res;
  try {
    res = await fetch(`${CONTENT_API_URL}${path}`, {
      method,
      signal,
      credentials: 'include',
      headers: body !== undefined || method !== 'GET' ? { 'Content-Type': 'application/json' } : undefined,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    throw new ContentError('Could not reach the content service.', 0, 'network');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ContentError(data.error_description || data.error || `Request failed (${res.status})`, res.status, data.error);
  return data;
}

// ---------- Public ----------
export const getHome = (opts) => request('/api/home', opts);
export const getArticles = (params = {}, opts) => request(`/api/articles?${new URLSearchParams(params)}`, opts);
export const getArticle = (slug, opts) => request(`/api/articles/${encodeURIComponent(slug)}`, opts);
export const getVideos = (params = {}, opts) => request(`/api/videos?${new URLSearchParams(params)}`, opts);
export const getTopics = (opts) => request('/api/topics', opts);
export const getTopic = (slug, opts) => request(`/api/topics/${encodeURIComponent(slug)}`, opts);

// ---------- Editors ----------
export const getEditor = () => request('/auth/me');
export const editorLoginUrl = (returnTo = '/admin/content') =>
  `${CONTENT_API_URL}/auth/login?returnTo=${encodeURIComponent(returnTo)}`;
export const editorLogout = () => request('/auth/logout', { method: 'POST' });

export const admin = {
  summary: () => request('/api/admin/summary'),
  list: (type, params = {}) => request(`/api/admin/${type}?${new URLSearchParams(params)}`),
  get: (type, id) => request(`/api/admin/${type}/${id}`),
  create: (type, body) => request(`/api/admin/${type}`, { method: 'POST', body }),
  update: (type, id, body) => request(`/api/admin/${type}/${id}`, { method: 'PUT', body }),
  remove: (type, id) => request(`/api/admin/${type}/${id}`, { method: 'DELETE' }),
  syncYoutube: () => request('/api/admin/youtube/sync', { method: 'POST', body: {} }),
  removeSamples: () => request('/api/admin/sample-articles', { method: 'DELETE' }),
};
