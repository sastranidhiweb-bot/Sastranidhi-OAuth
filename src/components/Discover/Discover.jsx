import { useEffect, useMemo, useRef, useState } from 'react';
import {
  getFeed,
  getPravacanaCourses,
  subscribeToNewArticles,
} from '../../services/contentFeed.js';
import { initiatives } from '../../data/siteData.js';
import { CATEGORY_LABEL, Cover, Meta, Skeleton } from './shared.jsx';
import { Clock, LiveContext, usePause, useRotator, useSectionLive } from './rotation.jsx';
import { imageFor } from './images.js';
import FeaturedCarousel from './FeaturedCarousel.jsx';
import TopStories from './TopStories.jsx';
import SlokaOfTheDay from './SlokaOfTheDay.jsx';
import PravacanaTicker from './PravacanaTicker.jsx';
import InitiativeRotator from './InitiativeRotator.jsx';
import TrendingMarquee from './TrendingMarquee.jsx';
import '../../styles/discover.css';

const LATEST_LIMIT = 4;
const TOPIC_SPOT_MS = 2400;
const PRAVACANA_HREF = initiatives.find((i) => i.shortLabel === 'Pravacana')?.href;

// Topic tiles: a spotlight hops from tile to tile; clicking filters the list
function TopicGrid({ topics, articles, selected, onPick }) {
  const rotator = useRotator(topics.length);
  const { running, bind } = usePause();

  return (
    <div className="dc-topics" {...bind}>
      {topics.map((t, i) => {
        const n = articles.filter((a) => a.topic === t.id).length;
        return (
          <button
            key={t.id}
            type="button"
            className={`dc-topic${selected === t.id ? ' is-active' : ''}${
              i === rotator.index ? ' is-spot' : ''
            }`}
            aria-pressed={selected === t.id}
            onClick={() => onPick(t.id)}
          >
            <Cover
              category="topic"
              glyph={t.glyph}
              image={imageFor('topics', t.id)}
              className="dc-topic-cover"
            />
            <span className="dc-topic-label">{t.short ?? t.label}</span>
            <span className="dc-topic-count">
              <span key={n} className="dc-bump-soft">{n}</span> {n === 1 ? 'piece' : 'pieces'}
            </span>
          </button>
        );
      })}
      <Clock
        key={rotator.index}
        ms={TOPIC_SPOT_MS}
        running={running}
        onDone={rotator.next}
        className="dc-clock--hidden"
      />
    </div>
  );
}

export default function Discover() {
  const sectionRef = useRef(null);
  const listRef = useRef(null);
  const live = useSectionLive(sectionRef);
  const [feed, setFeed] = useState(null);
  const [courses, setCourses] = useState(null);
  const [category, setCategory] = useState('all');
  const [topic, setTopic] = useState(null);

  useEffect(() => {
    let alive = true;
    getFeed().then((data) => alive && setFeed(data));
    getPravacanaCourses().then((data) => alive && setCourses(data));
    return () => {
      alive = false;
    };
  }, []);

  // simulated live feed: new pieces slide in at the top of the list
  const loaded = Boolean(feed);
  useEffect(() => {
    if (!loaded) return undefined;
    return subscribeToNewArticles((article) =>
      setFeed((f) => ({ ...f, articles: [article, ...f.articles] })),
    );
  }, [loaded]);

  // keep relative times ("just now", "2 minutes ago") fresh
  const [, setNow] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setNow((n) => n + 1), 30000);
    return () => clearInterval(t);
  }, []);

  const topicsById = useMemo(
    () => Object.fromEntries((feed?.topics ?? []).map((t) => [t.id, t])),
    [feed?.topics],
  );

  const filtered = useMemo(() => {
    if (!feed) return [];
    return feed.articles.filter(
      (a) => (category === 'all' || a.category === category) && (!topic || a.topic === topic),
    );
  }, [feed, category, topic]);

  // trending strip skips live arrivals so its loop length (and speed) stay put
  const trending = useMemo(
    () => (feed?.articles ?? []).filter((a) => !a.isNew).slice(0, 8),
    [feed?.articles],
  );

  const scrollToList = () =>
    listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  const pickTopic = (id) => {
    setTopic((cur) => (cur === id ? null : id));
    scrollToList();
  };

  const pickTrending = (item) => {
    setCategory('all');
    setTopic(item.topic);
    scrollToList();
  };

  const activeTopic = topic ? topicsById[topic] : null;

  return (
    <LiveContext.Provider value={live}>
      <section id="discover" className="discover" ref={sectionRef} aria-busy={!feed}>
        <div className="wrap">
          <div className="dc-head">
            <div>
              <div className="dc-kicker">Discover</div>
              <h2>Latest from Śāstranidhi</h2>
            </div>
            <p className="dc-sub">Articles, stories and discourses, updated as they are published.</p>
          </div>

          {feed ? (
            <TrendingMarquee items={trending} onPick={pickTrending} />
          ) : (
            <Skeleton className="dc-skel--marquee" />
          )}

          {/* ---------- Row 1: featured carousel + top stories / śloka ---------- */}
          <div className="dc-top">
            {feed ? (
              <FeaturedCarousel items={feed.featured} topicsById={topicsById} />
            ) : (
              <Skeleton className="dc-skel--featured" />
            )}

            <aside className="dc-aside">
              <div className="dc-panel">
                <div className="dc-panel-head">
                  <h3>Top Stories</h3>
                  <span className="dc-live">
                    <span className="dc-live-dot" /> Live reads
                  </span>
                </div>
                {feed ? (
                  <TopStories items={feed.topStories} />
                ) : (
                  [0, 1, 2, 3].map((i) => <Skeleton key={i} className="dc-skel--line" />)
                )}
              </div>
              <SlokaOfTheDay />
            </aside>
          </div>

          {/* ---------- Row 2: latest list / Pravacana / topics ---------- */}
          <div className="dc-bottom">
            <div className="dc-col" ref={listRef}>
              <div className="dc-panel-head">
                <h3>Latest Articles</h3>
                {activeTopic ? (
                  <button type="button" className="dc-filter-pill" onClick={() => setTopic(null)}>
                    {activeTopic.short ?? activeTopic.label} ✕
                  </button>
                ) : (
                  <span className="dc-live">
                    <span className="dc-live-dot" /> Live
                  </span>
                )}
              </div>
              <div className="dc-chips" role="group" aria-label="Filter by type">
                {(feed?.categories ?? []).map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className={`dc-chip${category === c.id ? ' is-active' : ''}`}
                    aria-pressed={category === c.id}
                    onClick={() => setCategory(c.id)}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              <div className="dc-latest" key={`${category}-${topic}`} aria-live="polite">
                {!feed && [0, 1, 2].map((i) => <Skeleton key={i} className="dc-skel--row" />)}
                {feed && filtered.length === 0 && (
                  <p className="dc-empty">Nothing here yet. Try another filter.</p>
                )}
                {filtered.slice(0, LATEST_LIMIT).map((item, i) => (
                  <article
                    key={item.id}
                    className={`dc-row${item.isNew ? ' dc-row--new' : ''}`}
                    style={{ '--i': i }}
                  >
                    <Cover
                      category={item.category}
                      glyph={topicsById[item.topic]?.glyph}
                      image={imageFor('articles', item.id)}
                      className="dc-row-cover"
                    />
                    <div>
                      <span className={`dc-tag dc-tag--${item.category}`}>
                        {CATEGORY_LABEL[item.category]}
                      </span>
                      {item.isNew && <span className="dc-new">New</span>}
                      <h4>{item.title}</h4>
                      <p>{item.excerpt}</p>
                      <Meta item={item} />
                    </div>
                  </article>
                ))}
              </div>
              {feed && filtered.length > LATEST_LIMIT && (
                <div className="dc-count">
                  Showing {LATEST_LIMIT} of {filtered.length}
                </div>
              )}
            </div>

            <div className="dc-col">
              <div className="dc-panel-head">
                <h3>From Pravacana</h3>
                <a
                  className="dc-link-btn"
                  href={PRAVACANA_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Pravacana →
                </a>
              </div>
              {courses ? (
                <PravacanaTicker items={courses} />
              ) : (
                [0, 1, 2].map((i) => <Skeleton key={i} className="dc-skel--row" />)
              )}
            </div>

            <div className="dc-col">
              <div className="dc-panel-head">
                <h3>Popular Topics</h3>
              </div>
              {feed ? (
                <TopicGrid
                  topics={feed.topics}
                  articles={feed.articles}
                  selected={topic}
                  onPick={pickTopic}
                />
              ) : (
                <div className="dc-topics">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="dc-skel--tile" />
                  ))}
                </div>
              )}
              <InitiativeRotator />
            </div>
          </div>
        </div>
      </section>
    </LiveContext.Provider>
  );
}
