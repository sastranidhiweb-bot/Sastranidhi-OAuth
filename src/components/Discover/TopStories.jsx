import { useContext, useEffect, useState } from 'react';
import { CATEGORY_LABEL } from './shared.jsx';
import { Clock, LiveContext, usePause, useRotator } from './rotation.jsx';

const SPOTLIGHT_MS = 4000;
const READS_TICK_MS = 2600;

// Most-read list: the spotlight walks down the list, and read counts tick
// up as if readers were arriving (mock; a real feed would push counts).
export default function TopStories({ items }) {
  const rotator = useRotator(items.length);
  const { running, bind } = usePause();
  const live = useContext(LiveContext);
  const [views, setViews] = useState(() => Object.fromEntries(items.map((i) => [i.id, i.views])));
  const [bumped, setBumped] = useState(null);

  useEffect(() => {
    if (!live) return undefined;
    const t = setInterval(() => {
      const item = items[Math.floor(Math.random() * items.length)];
      const add = 1 + Math.floor(Math.random() * 4);
      setViews((v) => ({ ...v, [item.id]: (v[item.id] ?? item.views) + add }));
      setBumped(item.id);
    }, READS_TICK_MS);
    return () => clearInterval(t);
  }, [live, items]);

  return (
    <ol className="dc-top-list" {...bind}>
      {items.map((item, i) => {
        const current = i === rotator.index;
        return (
          <li
            key={item.id}
            className={`dc-top-item${current ? ' is-current' : ''}`}
            style={{ '--i': i }}
            onMouseEnter={() => rotator.go(i)}
          >
            <span className="dc-rank">{i + 1}</span>
            <div>
              <h4>{item.title}</h4>
              <div className="dc-meta">
                <span>{CATEGORY_LABEL[item.category]}</span>
                <span aria-hidden="true">·</span>
                <span>
                  <span
                    key={views[item.id]}
                    className={bumped === item.id ? 'dc-bump' : undefined}
                  >
                    {views[item.id].toLocaleString('en-IN')}
                  </span>{' '}
                  reads
                </span>
              </div>
            </div>
            {current && (
              <Clock
                key={rotator.index}
                ms={SPOTLIGHT_MS}
                running={running}
                onDone={rotator.next}
                className="dc-clock--line"
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
