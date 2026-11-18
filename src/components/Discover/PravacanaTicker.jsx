import { useEffect, useState } from 'react';
import { Cover } from './shared.jsx';
import { imageFor } from './images.js';
import { Clock, usePause } from './rotation.jsx';

const STEP_MS = 3800;
const VISIBLE = 4;

// Vertical ticker: rolls up one course at a time and loops seamlessly by
// repeating the first VISIBLE items at the end, then snapping back to 0.
export default function PravacanaTicker({ items }) {
  const { running, bind } = usePause();
  const [offset, setOffset] = useState(0);
  const [animate, setAnimate] = useState(true);
  const n = items.length;
  const loop = n > VISIBLE;
  const list = loop ? [...items, ...items.slice(0, VISIBLE)] : items;

  // after the snap-back, re-enable the transition on the next frame
  useEffect(() => {
    if (animate) return undefined;
    const r = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(r);
  }, [animate]);

  const onTransitionEnd = (e) => {
    if (e.target !== e.currentTarget || offset < n) return;
    setAnimate(false);
    setOffset(0);
  };

  return (
    <div className="dc-ticker" {...bind} style={{ '--visible': Math.min(VISIBLE, n) }}>
      <div
        className={`dc-ticker-track${animate ? '' : ' no-anim'}`}
        style={{ transform: `translateY(calc(${-offset} * var(--row-h)))` }}
        onTransitionEnd={onTransitionEnd}
      >
        {list.map((c, i) => {
          const copy = i >= n;
          const shown = i >= offset && i < offset + VISIBLE;
          return (
            <a
              key={`${c.id}-${i}`}
              className={`dc-video${shown ? '' : ' is-off'}`}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-hidden={copy || undefined}
              tabIndex={copy ? -1 : undefined}
            >
              <Cover
                category="video"
                glyph="प्र"
                image={imageFor('courses', c.id)}
                className="dc-video-cover"
              >
                <span className="dc-play" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </Cover>
              <div>
                <span className="dc-tag dc-tag--video">{c.label}</span>
                <h4>{c.title}</h4>
                <div className="dc-meta">{c.meta}</div>
              </div>
            </a>
          );
        })}
      </div>
      {loop && animate && (
        <Clock
          key={offset}
          ms={STEP_MS}
          running={running}
          onDone={() => setOffset((o) => o + 1)}
          className="dc-clock--hidden"
        />
      )}
    </div>
  );
}
