import { initiatives } from '../../data/siteData.js';
import { Dots, Stage, usePause, useRotator } from './rotation.jsx';

const ROTATE_MS = 5500;

// Call-to-action card that slides through the four platforms (real site data)
export default function InitiativeRotator() {
  const rotator = useRotator(initiatives.length);
  const { running, bind } = usePause();

  return (
    <div className="dc-cta" {...bind}>
      <Stage
        items={initiatives}
        rotator={rotator}
        variant="slide"
        getKey={(it) => it.shortLabel}
        render={(it, i, active) => (
          <a
            className="dc-cta-slide"
            href={it.href}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={active ? undefined : -1}
          >
            <span className="dc-cta-kicker">{it.shortLabel}</span>
            <span className="dc-cta-title">{it.title}</span>
            <span className="dc-cta-text">{it.description}</span>
            <span className="dc-cta-go">Open {it.shortLabel} →</span>
          </a>
        )}
      />
      <Dots
        count={initiatives.length}
        rotator={rotator}
        ms={ROTATE_MS}
        running={running}
        label={(i) => `Show ${initiatives[i].shortLabel}`}
      />
    </div>
  );
}
