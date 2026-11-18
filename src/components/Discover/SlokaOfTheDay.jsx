import { getSlokaIndexForToday, getSlokas } from '../../services/contentFeed.js';
import { Clock, Stage, usePause, useRotator } from './rotation.jsx';

const ROTATE_MS = 12000;

// Opens on today's śloka, then cycles through the rest
export default function SlokaOfTheDay() {
  const slokas = getSlokas();
  const rotator = useRotator(slokas.length, getSlokaIndexForToday());
  const { running, bind } = usePause();

  return (
    <div className="dc-sloka" {...bind}>
      <div className="dc-panel-head">
        <h3>Śloka of the Day</h3>
        <div className="dc-mini-nav">
          <button type="button" onClick={rotator.prev} aria-label="Previous śloka">
            ‹
          </button>
          <span>
            {rotator.index + 1}/{slokas.length}
          </span>
          <button type="button" onClick={rotator.next} aria-label="Next śloka">
            ›
          </button>
        </div>
      </div>
      <Stage
        items={slokas}
        rotator={rotator}
        variant="rise"
        getKey={(s) => s.source}
        render={(s) => (
          <>
            <p className="dc-sloka-text" lang="sa">{s.devanagari}</p>
            <div className="dc-sloka-src">{s.source}</div>
            <p className="dc-sloka-tr">{s.translation}</p>
          </>
        )}
      />
      <Clock
        key={rotator.index}
        ms={ROTATE_MS}
        running={running}
        onDone={rotator.next}
        className="dc-clock--edge"
      />
    </div>
  );
}
