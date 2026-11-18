// Auto-rotation helpers shared by every block in the Discover section.
//
// Timing is driven by a CSS animation (<Clock>), not setTimeout: the clock's
// `animationend` advances the rotator. That keeps the visible progress bar
// and the real timer in step when paused and resumed, and because the
// reduced-motion rule in discover.css switches animations off, auto-rotation
// stops for people who ask for less motion (manual controls still work).

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

// false while the section is off-screen or the tab is hidden
export const LiveContext = createContext(true);

export function useSectionLive(ref) {
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(() => document.visibilityState !== 'hidden');

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.05,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  useEffect(() => {
    const onChange = () => setTabVisible(document.visibilityState !== 'hidden');
    document.addEventListener('visibilitychange', onChange);
    return () => document.removeEventListener('visibilitychange', onChange);
  }, []);

  return inView && tabVisible;
}

// Index state for a rotating set. `last` is the item animating out and
// `dir` (1 / -1) the direction; `prev` / `next` are the step functions.
export function useRotator(count, initial = 0) {
  const [state, setState] = useState({ index: initial, last: null, dir: 1 });

  const go = useCallback(
    (target, dir) =>
      setState((s) => {
        const index = ((target % count) + count) % count;
        if (index === s.index) return s;
        return { index, last: s.index, dir: dir ?? (index > s.index ? 1 : -1) };
      }),
    [count],
  );
  const next = useCallback(
    () => setState((s) => ({ index: (s.index + 1) % count, last: s.index, dir: 1 })),
    [count],
  );
  const prev = useCallback(
    () => setState((s) => ({ index: (s.index - 1 + count) % count, last: s.index, dir: -1 })),
    [count],
  );

  return { ...state, go, next, prev };
}

// Pause while hovered or keyboard-focused, or while the section isn't live
export function usePause() {
  const live = useContext(LiveContext);
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);

  return {
    running: live && !hover && !focus,
    bind: {
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
      onFocus: (e) => {
        if (e.target.matches?.(':focus-visible')) setFocus(true);
      },
      onBlur: (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocus(false);
      },
    },
  };
}

// Progress bar that doubles as the timer. Give it a changing `key` (the
// current index) so every cycle starts from zero.
export function Clock({ ms, running, onDone, className = '' }) {
  return (
    <span
      className={`dc-clock ${className}`}
      style={{ animationDuration: `${ms}ms`, animationPlayState: running ? 'running' : 'paused' }}
      onAnimationEnd={onDone}
      aria-hidden="true"
    />
  );
}

// Stacks every item in one grid cell (so the stage is as tall as the
// tallest item) and lets CSS animate the active / leaving pair.
// Variants: slide, fade, zoom, stack, rise (see .dc-stage--* in discover.css).
export function Stage({ items, rotator, variant = 'slide', className = '', getKey, render }) {
  const { index, last, dir } = rotator;
  return (
    <div className={`dc-stage dc-stage--${variant}${dir < 0 ? ' is-back' : ''} ${className}`}>
      {items.map((item, i) => (
        <div
          key={getKey(item, i)}
          className={`dc-stage-item${i === index ? ' is-active' : ''}${
            i === last && i !== index ? ' is-leaving' : ''
          }`}
          aria-hidden={i !== index}
        >
          {render(item, i, i === index)}
        </div>
      ))}
    </div>
  );
}

// Dots with a filling bar on the current one; the fill is the Clock
export function Dots({ count, rotator, ms, running, label = (i) => `Show item ${i + 1}` }) {
  return (
    <div className="dc-dots">
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          aria-label={label(i)}
          aria-current={i === rotator.index}
          className={`dc-dot${i === rotator.index ? ' is-active' : ''}`}
          onClick={() => rotator.go(i)}
        >
          {i === rotator.index && (
            <Clock
              key={rotator.index}
              ms={ms}
              running={running}
              onDone={rotator.next}
              className="dc-clock--fill"
            />
          )}
        </button>
      ))}
    </div>
  );
}
