// Cards for the home page platform carousel. Async so the carousel already
// handles loading; today it serves site data with a short mock delay. To go
// live, replace the body with a fetch() that returns the same shape.

import { initiatives } from '../data/siteData.js';
import { extraPlatforms, initiativeTags, platformAccents } from '../data/platformsData.js';

const MOCK_LATENCY_MS = 350;

export function getPlatforms() {
  const items = [
    ...initiatives.map((item) => ({ ...item, tag: initiativeTags[item.shortLabel] })),
    ...extraPlatforms,
  ].map((item) => ({ ...item, accent: platformAccents[item.shortLabel] ?? 'violet' }));
  return new Promise((resolve) => setTimeout(() => resolve(items), MOCK_LATENCY_MS));
}
