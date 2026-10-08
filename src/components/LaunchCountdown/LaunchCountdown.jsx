import { useEffect, useState } from 'react';
import '../../styles/launch-countdown.css';

// Platform launch, 16 December 2026 at midnight IST (see EventsPage.jsx).
const LAUNCH_DATE = new Date('2026-12-16T00:00:00+05:30');

function getRemaining() {
  const diff = Math.max(LAUNCH_DATE.getTime() - Date.now(), 0);
  return {
    total: diff,
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const pad = (n) => String(n).padStart(2, '0');

function TimeChip({ value, unit }) {
  return (
    <span className="lc-chip">
      {/* key restarts the tick animation whenever the value changes */}
      <span className="lc-chip-val" key={value}>{value}</span>
      <span className="lc-chip-unit">{unit}</span>
    </span>
  );
}

function TickerItem({ remaining }) {
  return (
    <span className="lc-item">
      <span className="lc-ornament">✦</span>
      <span className="lc-text">
        The <strong>SASTRANIDHI Digital Platform</strong> launches on
      </span>
      <span className="lc-date">16 · Dec · 2026</span>
      <span className="lc-clock">
        <TimeChip value={remaining.days} unit="Days" />
        <span className="lc-colon">:</span>
        <TimeChip value={pad(remaining.hours)} unit="Hrs" />
        <span className="lc-colon">:</span>
        <TimeChip value={pad(remaining.minutes)} unit="Min" />
        <span className="lc-colon">:</span>
        <TimeChip value={pad(remaining.seconds)} unit="Sec" />
      </span>
      <span className="lc-text lc-togo">to go</span>
    </span>
  );
}

export default function LaunchCountdown() {
  const [remaining, setRemaining] = useState(getRemaining);

  useEffect(() => {
    const id = setInterval(() => setRemaining(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  if (remaining.total <= 0) return null;

  return (
    <div
      className="launch-countdown"
      role="timer"
      aria-label={`${remaining.days} days, ${remaining.hours} hours and ${remaining.minutes} minutes until the SASTRANIDHI Digital Platform launch on 16 December 2026`}
    >
      <div className="lc-shine" aria-hidden="true" />

      <div className="lc-badge" aria-hidden="true">
        <span className="lc-badge-dot" />
        <span className="lc-badge-text">Launching Soon</span>
      </div>

      <div className="lc-viewport" aria-hidden="true">
        {/* Two identical halves so the track can loop seamlessly. */}
        <div className="lc-track">
          {[0, 1].map((half) => (
            <div className="lc-half" key={half}>
              <TickerItem remaining={remaining} />
              <TickerItem remaining={remaining} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
