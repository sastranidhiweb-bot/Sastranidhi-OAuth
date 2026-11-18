// Artwork for the Discover section, picked up automatically from
// src/assets/discover/<kind>/<id>.<jpg|jpeg|png|webp>
//   kind = articles | topics | courses, id = the item's `id` in the data.
// Anything without a matching file keeps its illustrated letter cover, so
// images can be added one at a time. Vite fingerprints and caches them.

const files = import.meta.glob('/src/assets/discover/**/*.{jpg,jpeg,png,webp}', {
  eager: true,
  as: 'url',
});

const byKey = {};
for (const [path, url] of Object.entries(files)) {
  const m = path.match(/\/discover\/([^/]+)\/([^/]+)\.\w+$/);
  if (m) byKey[`${m[1]}/${m[2].toLowerCase()}`] = url;
}

export function imageFor(kind, id) {
  return id ? byKey[`${kind}/${String(id).toLowerCase()}`] : undefined;
}
