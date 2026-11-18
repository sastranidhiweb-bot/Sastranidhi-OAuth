// Small presentational pieces shared by the Discover blocks.

export const CATEGORY_LABEL = {
  article: 'Article',
  story: 'Story',
  research: 'Research',
  culture: 'Culture',
};

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

export function formatDate(date) {
  const mins = Math.round((Date.now() - date) / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return rtf.format(-mins, 'minute');
  const days = Math.round((date - Date.now()) / 86400000);
  if (days > -7) return rtf.format(days, 'day');
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

/* Cover art. With an `image` (see images.js) it shows the picture;
   without one it falls back to the category colour + the topic's
   Devanagari letter, so missing artwork never leaves a hole. */
export function Cover({ category, glyph, image, eager = false, className = '', children }) {
  return (
    <div className={`dc-cover dc-cover--${category}${image ? ' has-image' : ''} ${className}`}>
      {image ? (
        <img
          className="dc-cover-img"
          src={image}
          alt=""
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          draggable="false"
        />
      ) : (
        <>
          <span className="dc-cover-ring" aria-hidden="true" />
          <span className="dc-cover-ring dc-cover-ring--inner" aria-hidden="true" />
          <span className="dc-cover-glyph" aria-hidden="true">{glyph}</span>
        </>
      )}
      {children}
    </div>
  );
}

export function Meta({ item }) {
  return (
    <div className="dc-meta">
      <time dateTime={item.date.toISOString()}>{formatDate(item.date)}</time>
      <span aria-hidden="true">·</span>
      <span>{item.readMins} min read</span>
    </div>
  );
}

export function Skeleton({ className }) {
  return <div className={`dc-skel ${className}`} aria-hidden="true" />;
}
