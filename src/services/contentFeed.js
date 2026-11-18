// Content feed for the home page "Discover" section.
//
// Every getter is async so Discover.jsx already handles loading states.
// Today it serves mock data (data/discoverData.js) and the real Pravacana
// courses (data/siteData.js); to go live, replace the bodies below with
// fetch() calls that return the same shapes.

import {
  ARTICLES,
  INCOMING_ARTICLES,
  SLOKAS,
  TOPICS,
  CATEGORIES,
} from '../data/discoverData.js';
import { courses, bhagavatamSeries } from '../data/siteData.js';

const MOCK_LATENCY_MS = 450;
const DAY_MS = 24 * 60 * 60 * 1000;

const delay = (value) =>
  new Promise((resolve) => setTimeout(() => resolve(value), MOCK_LATENCY_MS));

// Turn the mock `daysAgo` into a real date so the feed always looks current
function withDate(item) {
  return { ...item, date: new Date(Date.now() - item.daysAgo * DAY_MS) };
}

export function getFeed() {
  const articles = ARTICLES.map(withDate).sort((a, b) => b.date - a.date);
  return delay({
    articles,
    featured: articles.filter((a) => a.featured),
    topStories: [...articles].sort((a, b) => b.views - a.views).slice(0, 4),
    categories: CATEGORIES,
    topics: TOPICS,
  });
}

// Courses and discourses on Pravacana (real site data)
export function getPravacanaCourses() {
  const items = [...bhagavatamSeries.courses, ...courses].map((c) => ({
    id: c.id,
    title: c.title,
    label: c.topLabel,
    meta: c.lessons,
    href: c.href,
  }));
  return delay(items);
}

// Simulated live feed: calls `onArticle` with a freshly "published" piece
// every `intervalMs` until the mock queue runs out. Returns an unsubscribe
// function. A real backend would poll an endpoint or listen on a socket.
export function subscribeToNewArticles(onArticle, { firstMs = 10000, intervalMs = 15000 } = {}) {
  let i = 0;
  let timer = null;
  const push = () => {
    if (i >= INCOMING_ARTICLES.length) return;
    onArticle({ ...INCOMING_ARTICLES[i++], date: new Date(), isNew: true });
    timer = setTimeout(push, intervalMs);
  };
  timer = setTimeout(push, firstMs);
  return () => clearTimeout(timer);
}

// Same śloka all day for everyone, next one tomorrow
export function getSlokaIndexForToday() {
  const start = new Date(new Date().getFullYear(), 0, 0);
  const dayOfYear = Math.floor((Date.now() - start) / DAY_MS);
  return dayOfYear % SLOKAS.length;
}

export function getSlokas() {
  return SLOKAS;
}
