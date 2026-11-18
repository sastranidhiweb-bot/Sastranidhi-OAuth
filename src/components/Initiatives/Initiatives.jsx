import { useCallback, useEffect, useRef, useState } from 'react';
import { getPlatforms } from '../../services/platformsFeed.js';
import PlatformCard from '../PlatformCard.jsx';
import '../../styles/initiatives.css';

const AUTOPLAY_MS = 5000;

// Platform cards as a carousel: 4 / 2 / 1 per view (initiatives.css), moved
// one card at a time by the arrows, dots, swipe (native scroll-snap) or the
// arrow keys. Autoplays and loops; pauses on hover, keyboard focus, while
// off-screen or in a hidden tab, and never runs for reduced-motion users.
export default function Initiatives() {
  const trackRef = useRef(null);
  const sectionRef = useRef(null);
  const [items, setItems] = useState(null);
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(4);
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    let alive = true;
    getPlatforms().then((data) => alive && setItems(data));
    return () => {
      alive = false;
    };
  }, []);

  const count = items?.length ?? 0;
  const maxIndex = Math.max(0, count - perView);

  // distance between the starts of two neighbouring cards
  const step = () => {
    const track = trackRef.current;
    const [a, b] = track?.children ?? [];
    if (!a) return 0;
    return b ? b.offsetLeft - a.offsetLeft : a.offsetWidth;
  };

  const scrollToIndex = useCallback(
    (i) => {
      const track = trackRef.current;
      if (!track) return;
      track.scrollTo({ left: i * step(), behavior: reducedMotion ? 'auto' : 'smooth' });
    },
    [reducedMotion],
  );

  const next = useCallback(
    () => scrollToIndex(index >= maxIndex ? 0 : index + 1),
    [index, maxIndex, scrollToIndex],
  );
  const prev = useCallback(
    () => scrollToIndex(index <= 0 ? maxIndex : index - 1),
    [index, maxIndex, scrollToIndex],
  );

  // which card is first in view, and how many fit (changes with breakpoints)
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !count) return undefined;
    let frame = 0;
    const measure = () => {
      const s = step();
      if (!s) return;
      setIndex(Math.round(track.scrollLeft / s));
      setPerView(Math.max(1, Math.round((track.clientWidth + 1) / s)));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    measure();
    track.addEventListener('scroll', onScroll, { passive: true });
    const ro = new ResizeObserver(onScroll);
    ro.observe(track);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener('scroll', onScroll);
      ro.disconnect();
    };
  }, [count]);

  // pause signals: off-screen, hidden tab, reduced motion
  useEffect(() => {
    const el = sectionRef.current;
    const io =
      el && 'IntersectionObserver' in window
        ? new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 })
        : null;
    io?.observe(el);
    const onVis = () => setTabVisible(document.visibilityState !== 'hidden');
    document.addEventListener('visibilitychange', onVis);
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const onMq = () => setReducedMotion(Boolean(mq?.matches));
    onMq();
    mq?.addEventListener('change', onMq);
    return () => {
      io?.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      mq?.removeEventListener('change', onMq);
    };
  }, []);

  const running =
    count > perView && !hover && !focus && inView && tabVisible && !reducedMotion;

  // autoplay: restarts whenever the position changes, so manual moves reset it
  useEffect(() => {
    if (!running) return undefined;
    const t = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [running, next, index]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    }
  };

  const first = Math.min(index, maxIndex);
  const shown = items ? Math.min(perView, count) : 0;

  return (
    <section id="platforms" aria-label="Explore Śāstra Nidhi" ref={sectionRef}>
      <div className="wrap">
        <div
          className={`pc-carousel${running ? '' : ' is-paused'}`}
          role="region"
          aria-roledescription="carousel"
          aria-label="Śāstra Nidhi platforms"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onFocus={(e) => e.target.matches?.(':focus-visible') && setFocus(true)}
          onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setFocus(false)}
          onKeyDown={onKeyDown}
        >
          <button
            type="button"
            className="pc-arrow pc-arrow--prev"
            onClick={prev}
            aria-label="Previous platforms"
            disabled={!items || count <= perView}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="pc-track" ref={trackRef} tabIndex={-1}>
            {items
              ? items.map((item, i) => (
                  <PlatformCard
                    key={item.shortLabel}
                    icon={item.icon}
                    shortLabel={item.shortLabel}
                    title={item.title}
                    subtitle={item.subtitle}
                    subtitleUnderlined={item.subtitleUnderlined}
                    subtitleHref={item.subtitleHref}
                    description={item.description}
                    moreTo={item.moreTo}
                    tag={item.tag}
                    accent={item.accent}
                    inert={i < first || i >= first + perView}
                    href={import.meta.env.DEV && item.devHref ? item.devHref : item.href}
                  />
                ))
              : [0, 1, 2, 3].map((i) => <div key={i} className="tablet pc-skel" aria-hidden="true" />)}
          </div>

          <button
            type="button"
            className="pc-arrow pc-arrow--next"
            onClick={next}
            aria-label="Next platforms"
            disabled={!items || count <= perView}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {items && count > perView && (
          <div className="pc-footer">
            <span className="pc-count" aria-live="polite">
              {first + 1}–{first + shown} of {count}
            </span>
            <div className="pc-dots">
              {Array.from({ length: maxIndex + 1 }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`pc-dot${i === first ? ' is-active' : ''}`}
                  aria-label={`Show from ${items[i].shortLabel}`}
                  aria-current={i === first}
                  onClick={() => scrollToIndex(i)}
                >
                  {i === first && running && (
                    <span
                      key={first}
                      className="pc-dot-fill"
                      style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
