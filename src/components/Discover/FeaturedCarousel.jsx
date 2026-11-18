import { useRef, useState } from 'react';
import { Cover, Meta } from './shared.jsx';
import { imageFor } from './images.js';
import { Dots, Stage, usePause, useRotator } from './rotation.jsx';

const ROTATE_MS = 6500;
const SWIPE_PX = 50;

// Transition styles to compare. The switcher only shows in `npm run dev`;
// once one is chosen, set DEFAULT_VARIANT and the switcher can go.
const VARIANTS = ['slide', 'fade', 'zoom', 'stack'];
const DEFAULT_VARIANT = 'slide';
const VARIANT_KEY = 'dc-featured-variant';

export default function FeaturedCarousel({ items, topicsById }) {
  const rotator = useRotator(items.length);
  const { running, bind } = usePause();
  const [variant, setVariant] = useState(() => {
    const saved = import.meta.env.DEV && localStorage.getItem(VARIANT_KEY);
    return VARIANTS.includes(saved) ? saved : DEFAULT_VARIANT;
  });
  const pointerX = useRef(null);

  const pickVariant = (v) => {
    setVariant(v);
    localStorage.setItem(VARIANT_KEY, v);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') rotator.next();
    if (e.key === 'ArrowLeft') rotator.prev();
  };

  // swipe / drag to change slide
  const onPointerDown = (e) => {
    pointerX.current = e.clientX;
  };
  const onPointerUp = (e) => {
    if (pointerX.current == null) return;
    const dx = e.clientX - pointerX.current;
    pointerX.current = null;
    if (dx <= -SWIPE_PX) rotator.next();
    if (dx >= SWIPE_PX) rotator.prev();
  };

  const upNext = items[(rotator.index + 1) % items.length];
  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div
      className={`dc-featured${running ? '' : ' is-paused'}`}
      {...bind}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => (pointerX.current = null)}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured articles (use left and right arrow keys)"
    >
      <Stage
        items={items}
        rotator={rotator}
        variant={variant}
        className="dc-featured-stage"
        getKey={(item) => item.id}
        render={(item, i) => {
          const topic = topicsById[item.topic];
          return (
            <article className="dc-slide">
              <Cover
                category={item.category}
                glyph={topic?.glyph}
                image={imageFor('articles', item.id)}
                eager={i === 0}
                className="dc-slide-cover"
              />
              <div className="dc-slide-body">
                <span className="dc-tag dc-tag--gold">Featured · {topic?.label}</span>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
                <Meta item={item} />
              </div>
            </article>
          );
        }}
      />

      <div className="dc-featured-top">
        <span className="dc-counter" aria-live="polite">
          <b>{pad(rotator.index + 1)}</b> / {pad(items.length)}
        </span>
        {import.meta.env.DEV && (
          <div className="dc-variants" role="group" aria-label="Preview transition style">
            <span>Style</span>
            {VARIANTS.map((v) => (
              <button
                key={v}
                type="button"
                className={v === variant ? 'is-active' : ''}
                aria-pressed={v === variant}
                onClick={() => pickVariant(v)}
              >
                {v}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="dc-featured-controls">
        <span className="dc-upnext">
          Up next <b>{upNext.title}</b>
        </span>
        <button type="button" className="dc-arrow" onClick={rotator.prev} aria-label="Previous">
          ‹
        </button>
        <Dots
          count={items.length}
          rotator={rotator}
          ms={ROTATE_MS}
          running={running}
          label={(i) => `Show ${items[i].title}`}
        />
        <button type="button" className="dc-arrow" onClick={rotator.next} aria-label="Next">
          ›
        </button>
      </div>
    </div>
  );
}
