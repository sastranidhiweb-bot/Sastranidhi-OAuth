import { useContext } from 'react';
import { LiveContext } from './rotation.jsx';

const SECONDS_PER_ITEM = 5;

// Continuous left-to-right "Trending" strip. The list is rendered twice and
// the track slides by exactly half its width, so the loop has no seam.
export default function TrendingMarquee({ items, onPick }) {
  const live = useContext(LiveContext);
  const row = (copy) =>
    items.map((item) => (
      <button
        key={`${copy}-${item.id}`}
        type="button"
        className="dc-trend"
        onClick={() => onPick(item)}
        tabIndex={copy ? -1 : undefined}
        aria-hidden={copy || undefined}
      >
        <span className={`dc-trend-dot dc-trend-dot--${item.category}`} />
        {item.title}
      </button>
    ));

  return (
    <div className={`dc-marquee${live ? '' : ' is-paused'}`}>
      <span className="dc-marquee-label">Trending</span>
      <div className="dc-marquee-viewport">
        <div
          className="dc-marquee-track"
          style={{ animationDuration: `${items.length * SECONDS_PER_ITEM}s` }}
        >
          {row(0)}
          {row(1)}
        </div>
      </div>
    </div>
  );
}
