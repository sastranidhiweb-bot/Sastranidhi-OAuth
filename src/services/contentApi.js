// The website's articles, topics, videos and ślokas, read from the files
// in src/content/ and bundled with the site, so there is no server to run.
// See src/content/README.md for how to add or change content.
//
// The functions keep the shape of an API (async, same results) so the
// pages don't need to know where the content comes from.

import topicsData from '../content/topics.json';
import slokasData from '../content/slokas.json';
import videosData from '../content/videos.json';

const articleFiles = import.meta.glob('../content/articles/*.md', { as: 'raw', eager: true });

export class ContentError extends Error {
  constructor(message, status, code) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export const CATEGORIES = ['article', 'story', 'research', 'culture', 'saints', 'sanskrit', 'tirtha', 'festival'];

// ---------- Reading the files ----------

// The block between the two "---" lines at the top of an article file
function parseFrontMatter(raw) {
  const text = raw.replace(/^﻿/, '').replace(/\r\n/g, '\n');
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: text.trim() };
  const data = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([A-Za-z]+):\s*(.*)$/);
    if (!kv) continue;
    let value = kv[2].trim();
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map((s) => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
    } else if (value.startsWith('"') && value.endsWith('"')) {
      try {
        value = JSON.parse(value);
      } catch {
        value = value.slice(1, -1);
      }
    } else if (value.startsWith("'") && value.endsWith("'")) {
      value = value.slice(1, -1);
    } else if (value === 'true' || value === 'false') {
      value = value === 'true';
    }
    data[kv[1]] = value;
  }
  return { data, body: m[2].trim() };
}

// Dates in the files are days (YYYY-MM-DD), taken as midday in India
const toDate = (d) => (d ? new Date(`${String(d).slice(0, 10)}T12:00:00+05:30`) : null);

const ARTICLES = Object.entries(articleFiles)
  .map(([file, raw]) => {
    const { data, body } = parseFrontMatter(raw);
    const slug = file.split('/').pop().replace(/\.md$/, '');
    const words = body.split(/\s+/).filter(Boolean).length;
    return {
      _id: slug,
      slug,
      title: data.title || slug,
      excerpt: data.excerpt || '',
      body,
      category: CATEGORIES.includes(data.category) ? data.category : 'article',
      topics: Array.isArray(data.topics) ? data.topics : data.topics ? [data.topics] : [],
      coverImage: data.cover || '',
      coverAlt: data.coverAlt || '',
      author: data.author || 'Sastra Nidhi',
      featured: data.featured === true,
      draft: data.draft === true,
      readMinutes: Math.max(1, Math.round(words / 200)),
      publishedAt: toDate(data.date)?.toISOString() || null,
    };
  })
  .filter((a) => a.publishedAt)
  .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

const TOPICS = topicsData.map((t, i) => ({ _id: t.slug, order: i, popular: true, image: '', ...t }));

function youtubeId(url) {
  const m = String(url || '').match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/);
  return m ? m[1] : /^[\w-]{11}$/.test(url) ? url : null;
}
const VIDEOS = videosData
  .map((v) => {
    const id = youtubeId(v.youtube);
    if (!id) return null;
    return {
      _id: id,
      youtubeId: id,
      title: v.title,
      speaker: v.speaker || '',
      duration: v.duration || '',
      description: v.description || '',
      topics: v.topics || [],
      featured: v.featured === true,
      publishedAt: toDate(v.date)?.toISOString() || null,
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      url: `https://www.youtube.com/watch?v=${id}`,
    };
  })
  .filter(Boolean)
  .sort((a, b) => Number(b.featured) - Number(a.featured) || (a.publishedAt < b.publishedAt ? 1 : -1));

// ---------- Helpers ----------

/** Today's date in India (YYYY-MM-DD): the day turns at midnight IST for everyone. */
export function indiaDate(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(now);
}
const dayNumberOf = (date) => Math.floor(Date.parse(`${date}T00:00:00Z`) / 86400000);

// Published = has a date that has arrived, and isn't marked as a draft
const published = (now = new Date()) => ARTICLES.filter((a) => !a.draft && new Date(a.publishedAt) <= now);
const card = ({ body, ...rest }) => rest;

function gcd(a, b) {
  return b ? gcd(b, a % b) : a;
}
/** The articles in today's order: a new starting point every day. */
export function rotateForDay(items, date) {
  if (!items.length) return [];
  const n = items.length;
  let stride = Math.max(1, Math.round(n / 3));
  while (n > 1 && gcd(stride, n) !== 1) stride += 1;
  const start = (dayNumberOf(date) * stride) % n;
  return [...items.slice(start), ...items.slice(0, start)];
}

/** Today's śloka: one with this exact date if there is one, otherwise they take turns. */
function slokaForDay(date) {
  const pinned = slokasData.find((s) => s.date === date);
  if (pinned) return { ...pinned, date };
  const pool = slokasData.filter((s) => !s.date);
  if (!pool.length) return null;
  return { ...pool[dayNumberOf(date) % pool.length], date };
}

const ok = (value) => Promise.resolve(value);
const notFound = () => Promise.reject(new ContentError('Not found', 404, 'not_found'));
function paging(params, maxLimit = 24) {
  const limit = Math.min(Math.max(parseInt(params.limit, 10) || 12, 1), maxLimit);
  const page = Math.max(parseInt(params.page, 10) || 1, 1);
  return { limit, page, skip: (page - 1) * limit };
}

// ---------- The "API" ----------

const FRESH_FEATURE_MS = 2 * 86400000;

/**
 * Everything the home page's hub shows:
 *   featured        today's lead story (a just-published article marked
 *                   featured leads for its first two days)
 *   stories         three more of today's picks; topStories the next four
 *   latestArticles  the newest four, strictly by date
 */
export function getHome() {
  const now = new Date();
  const today = indiaDate(now);
  const pool = published(now).slice(0, 60);
  const fresh = pool.find((a) => a.featured && now - new Date(a.publishedAt) < FRESH_FEATURE_MS);
  const order = rotateForDay(pool, today);
  const featured = fresh || order.find((a) => a.coverImage) || order[0] || null;
  const notLead = (a) => !featured || a.slug !== featured.slug;
  const picks = order.filter(notLead);
  const topics = TOPICS.filter((t) => t.popular !== false).slice(0, 12);
  return ok({
    today,
    featured: featured && card(featured),
    stories: picks.slice(0, 3).map(card),
    topStories: picks.slice(3, 7).map(card),
    latestArticles: pool.filter(notLead).slice(0, 4).map(card),
    videos: VIDEOS.slice(0, 4),
    topics,
    trending: topics.slice(0, 10).map(({ name, slug }) => ({ name, slug })),
    sloka: slokaForDay(today),
  });
}

export function getArticles(params = {}) {
  const { limit, page, skip } = paging(params);
  let list = published();
  if (CATEGORIES.includes(params.category)) list = list.filter((a) => a.category === params.category);
  if (params.topic) list = list.filter((a) => a.topics.includes(params.topic));
  return ok({ items: list.slice(skip, skip + limit).map(card), page, limit, total: list.length, pages: Math.ceil(list.length / limit) });
}

export function getArticle(slug) {
  const all = published();
  const article = all.find((a) => a.slug === slug);
  if (!article) return notFound();
  const related = all
    .filter((a) => a.slug !== slug && (a.topics.some((t) => article.topics.includes(t)) || a.category === article.category))
    .slice(0, 3)
    .map(card);
  const topicList = TOPICS.filter((t) => article.topics.includes(t.slug)).map(({ name, slug: s }) => ({ name, slug: s }));
  return ok({ article: { ...article, topicList }, related });
}

export function getVideos(params = {}) {
  const { limit, page, skip } = paging(params);
  return ok({ items: VIDEOS.slice(skip, skip + limit), page, limit, total: VIDEOS.length, pages: Math.ceil(VIDEOS.length / limit) });
}

export const getTopics = () => ok({ items: TOPICS });

export function getTopic(slug) {
  const topic = TOPICS.find((t) => t.slug === slug);
  if (!topic) return notFound();
  return ok({
    topic,
    articles: published().filter((a) => a.topics.includes(slug)).slice(0, 24).map(card),
    videos: VIDEOS.filter((v) => v.topics.includes(slug)).slice(0, 8),
  });
}
