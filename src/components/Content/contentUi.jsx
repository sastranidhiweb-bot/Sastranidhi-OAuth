// Shared bits for the article / video / topic pages and the home hub.

export const CATEGORY_LABELS = {
  article: 'Article',
  story: 'Story',
  research: 'Research',
  culture: 'Culture',
  saints: 'Saints',
  sanskrit: 'Sanskrit',
  tirtha: 'Tīrtha',
  festival: 'Festival',
};

export function formatDate(value) {
  if (!value) return '';
  return new Date(value).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

/** "18 Nov 2026 · 6 min read" */
export function Meta({ date, minutes, extra }) {
  return (
    <div className="cx-meta">
      {date && <time dateTime={new Date(date).toISOString()}>{formatDate(date)}</time>}
      {minutes ? <span>{minutes} min read</span> : null}
      {extra ? <span>{extra}</span> : null}
    </div>
  );
}

export function CategoryTag({ category }) {
  return <span className={`cx-tag cx-tag-${category}`}>{CATEGORY_LABELS[category] || category}</span>;
}

// Line icons used for categories and the category strip (24×24, stroke)
export const ICONS = {
  article: <><path d="M12 6.5C10 5 7 4.5 4 5v13c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5V5c-3-.5-6 0-8 1.5z" /><path d="M12 6.5v13" /></>,
  story: <><path d="M7 4h11a2 2 0 0 1 2 2v1h-4" /><path d="M16 7v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1h10" /><path d="M7 4a2 2 0 0 0-2 2v11" /><path d="M9 9h4M9 12h4" /></>,
  video: <><circle cx="12" cy="12" r="8.5" /><path d="M10 8.8v6.4l5.2-3.2z" /></>,
  sloka: <><path d="M12 18c-2-2-3-5-3-8 1 1 2.3 1.6 3 3 .7-1.4 2-2 3-3 0 3-1 6-3 8z" /><path d="M12 18c-3 0-6-1.5-8-4.5 2 0 3.7.4 5 1.5" /><path d="M12 18c3 0 6-1.5 8-4.5-2 0-3.7.4-5 1.5" /><path d="M4 20h16" /></>,
  research: <><circle cx="10.5" cy="10.5" r="5.5" /><path d="M15 15l5 5" /></>,
  culture: <><path d="M12 3l2 3h-4z" /><path d="M8.5 6h7l1 4h-9z" /><path d="M6.5 10h11v10h-11z" /><path d="M10.5 20v-4.5h3V20" /><path d="M4 20h16" /></>,
  saints: <><circle cx="12" cy="7" r="3" /><path d="M6 20c.5-4 3-6.5 6-6.5s5.5 2.5 6 6.5" /><path d="M12 2.5v-.5M8.5 3.5l-.4-.4M15.5 3.5l.4-.4" /></>,
  sanskrit: <><path d="M3 9l9-5 9 5-9 5z" /><path d="M7 11.2V16c1.5 1.3 3.2 2 5 2s3.5-.7 5-2v-4.8" /><path d="M21 9v5" /></>,
  // tīrtha: a temple śikhara by water; festival: a diya flame
  tirtha: <><path d="M12 3c1.5 2 3 3.5 3 6H9c0-2.5 1.5-4 3-6z" /><path d="M8 9h8v6H8z" /><path d="M11 15v-3h2v3" /><path d="M3 18c2 1.3 4 1.3 6 0s4-1.3 6 0 4 1.3 6 0" /><path d="M3 21c2 1.3 4 1.3 6 0s4-1.3 6 0 4 1.3 6 0" /></>,
  festival: <><path d="M12 3c2 2.5 3 4.3 3 6a3 3 0 0 1-6 0c0-1.7 1-3.5 3-6z" /><path d="M4 15h16c0 3-3.6 5-8 5s-8-2-8-5z" /><path d="M12 12v3" /></>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  play: <path d="M9 7.5v9l7.5-4.5z" />,
};

export function Icon({ name, className = '' }) {
  return (
    <svg className={`cx-icon ${className}`.trim()} viewBox="0 0 24 24" aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

/**
 * Article cover: the uploaded image, or (until one is added) a generated
 * violet-and-gold panel with the category's emblem, so cards never show
 * a broken or empty box.
 */
export function Cover({ article, className = '', eager = false }) {
  if (article.coverImage) {
    return (
      <div className={`cx-cover ${className}`.trim()}>
        <img src={article.coverImage} alt={article.coverAlt || ''} loading={eager ? 'eager' : 'lazy'} />
      </div>
    );
  }
  const icon = ICONS[article.category] ? article.category : 'article';
  return (
    <div className={`cx-cover cx-cover-art cx-art-${article.category} ${className}`.trim()} aria-hidden="true">
      <svg className="cx-cover-mandala" viewBox="-100 -100 200 200">
        <circle r="92" />
        <circle r="70" strokeDasharray="2 5" />
        {Array.from({ length: 12 }, (_, i) => (
          <ellipse key={i} cx="0" cy="-52" rx="11" ry="28" transform={`rotate(${i * 30})`} />
        ))}
        <circle r="22" />
      </svg>
      <span className="cx-cover-emblem">
        <svg viewBox="0 0 24 24">{ICONS[icon]}</svg>
      </span>
    </div>
  );
}

/**
 * Renders an article body written as plain text: blank lines separate
 * paragraphs, "## " starts a sub-heading and "> " a quotation. Everything
 * is rendered as text (never as HTML), so content can't inject markup.
 */
export function ArticleBody({ body }) {
  const blocks = String(body || '').split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  return (
    <div className="cx-body">
      {blocks.map((block, i) => {
        if (block.startsWith('## ')) return <h2 key={i}>{block.slice(3)}</h2>;
        if (block.startsWith('> ')) {
          return <blockquote key={i}>{block.split('\n').map((l) => l.replace(/^>\s?/, '')).join(' ')}</blockquote>;
        }
        return (
          <p key={i}>
            {block.split('\n').map((line, j, all) => (
              <span key={j}>
                {line}
                {j < all.length - 1 && <br />}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}
