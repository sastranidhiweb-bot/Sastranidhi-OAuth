import { useEffect, useRef, useState } from 'react';
import { stats } from '../../data/siteData.js';
import '../../styles/stats.css';

// Single-colour line icons (stroke = currentColor) for the stat bubbles,
// keyed by `icon` in siteData.js. Paths adapted from Lucide (ISC licence).
const STAT_ICONS = {
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </>
  ),
  users: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  scroll: (
    <>
      <path d="M19 17V5a2 2 0 0 0-2-2H4" />
      <path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3" />
    </>
  ),
  cap: (
    <>
      <path d="M22 10v6" />
      <path d="M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </>
  ),
  books: (
    <>
      <path d="M16 6l4 14" />
      <path d="M12 6v14" />
      <path d="M8 8v12" />
      <path d="M4 4v16" />
    </>
  ),
};

function parseStatValue(value) {
  const match = value.match(/^([\d,]+)(.*)$/);
  if (!match) return { target: 0, suffix: value };
  const target = parseInt(match[1].replace(/,/g, ''), 10);
  const suffix = match[2] || '';
  return { target, suffix };
}

function AnimatedNumber({ value, start }) {
  const { target, suffix } = parseStatValue(value);
  const [current, setCurrent] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!start) return;

    const duration = 1600;
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(target * eased));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [start, target]);

  return (
    <>
      {current.toLocaleString('en-IN')}
      {suffix}
    </>
  );
}

export default function Stats() {
  const gridRef = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setStarted(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStarted(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="stats-band">
      <div className="stats-bubbles" aria-hidden="true">
        <span />
        <span className="gold" />
        <span />
        <span className="gold" />
        <span />
        <span className="gold" />
        <span />
        <span className="gold" />
      </div>
      <div className="wrap stats-grid stagger" ref={gridRef}>
        {stats.map((stat) => (
          <div className="stat-item" key={stat.label}>
            <div className="stat-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">{STAT_ICONS[stat.icon]}</svg>
            </div>
            <div className="num">
              <AnimatedNumber value={stat.value} start={started} />
            </div>
            <div className="lbl">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}