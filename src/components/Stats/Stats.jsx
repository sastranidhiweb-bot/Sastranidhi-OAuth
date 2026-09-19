import { useEffect, useRef, useState } from 'react';
import { stats } from '../../data/siteData.js';

function parseStatValue(value) {
  // Extract the number and suffix from strings like "250,000+" or "3+"
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
      <div className="wrap stats-grid stagger" ref={gridRef}>
        {stats.map((stat) => (
          <div className="stat-item" key={stat.label}>
            <div className="stat-icon">{stat.icon}</div>
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