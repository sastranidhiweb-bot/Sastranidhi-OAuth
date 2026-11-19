import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getHome } from '../../services/contentApi.js';
import { useContent } from '../../hooks/useContent.js';
import { CategoryTag, Cover, Icon, Meta, formatDate } from './contentUi.jsx';
import VideoModal from './VideoModal.jsx';
import '../../styles/content.css';

// The dynamic part of the home page, filled from the content service:
// trending topics, the lead story with three more beside it, top stories,
// śloka of the day, a category strip, then latest articles, featured
// videos and popular topics. If the service can't be reached, `fallback`
// is shown instead (the home page passes the static Discover section).

const CATEGORY_STRIP = [
  { icon: 'article', label: 'Articles', note: 'In-depth insights', to: '/articles?category=article' },
  { icon: 'story', label: 'Stories', note: 'Timeless narratives', to: '/articles?category=story' },
  { icon: 'video', label: 'Videos', note: 'Discourses & talks', to: '/videos' },
  { icon: 'sloka', label: 'Ślokas', note: 'Wisdom for daily life', to: '#sloka-of-the-day' },
  { icon: 'tirtha', label: 'Tīrthas', note: 'Holy places', to: '/articles?category=tirtha' },
  { icon: 'festival', label: 'Festivals', note: 'Sacred days & vows', to: '/articles?category=festival' },
  { icon: 'saints', label: 'Saints', note: 'Lives and teachings', to: '/articles?category=saints' },
  { icon: 'sanskrit', label: 'Sanskrit', note: 'Language & learning', to: '/articles?category=sanskrit' },
];

const YOUTUBE_CHANNEL = 'https://www.youtube.com/@sastranidhi';

function HeadRow({ title, to, label = 'View all', id }) {
  return (
    <div className="kh-head">
      <h2 id={id}>{title}</h2>
      {to && (
        <Link to={to} className="kh-viewall">
          {label} <Icon name="arrow" />
        </Link>
      )}
    </div>
  );
}

function LeadStory({ article }) {
  return (
    <Link to={`/articles/${article.slug}`} className="kh-lead" data-reveal="zoom">
      <Cover article={article} className="kh-lead-cover" eager />
      <div className="kh-lead-shade" />
      <div className="kh-lead-text">
        <span className="kh-badge">Today’s pick</span>
        <h3>{article.title}</h3>
        {article.excerpt && <p>{article.excerpt}</p>}
        <div className="kh-lead-foot">
          <Meta date={article.publishedAt} minutes={article.readMinutes} />
          <span className="kh-lead-cta">
            Read article <Icon name="arrow" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function StoryCard({ article, delay = 0 }) {
  return (
    <Link to={`/articles/${article.slug}`} className="kh-story" data-reveal="right" style={{ '--rd': `${delay}ms` }}>
      <Cover article={article} className="kh-story-cover" />
      <div className="kh-story-text">
        <CategoryTag category={article.category} />
        <h3>{article.title}</h3>
        {article.excerpt && <p>{article.excerpt}</p>}
        <Meta date={article.publishedAt} minutes={article.readMinutes} />
      </div>
    </Link>
  );
}

function CompactItem({ article }) {
  return (
    <li>
      <Link to={`/articles/${article.slug}`} className="kh-compact">
        <Cover article={article} className="kh-compact-cover" />
        <div>
          <h4>{article.title}</h4>
          <Meta date={article.publishedAt} minutes={article.readMinutes} />
        </div>
      </Link>
    </li>
  );
}

function SlokaCard({ sloka }) {
  return (
    <aside className="kh-sloka" id="sloka-of-the-day" aria-labelledby="kh-sloka-title">
      <svg className="kh-sloka-lotus" viewBox="-60 -60 120 120" aria-hidden="true">
        {Array.from({ length: 8 }, (_, i) => (
          <path key={i} transform={`rotate(${i * 45})`} d="M0 -8 C 12 -22, 12 -44, 0 -57 C -12 -44, -12 -22, 0 -8 Z" />
        ))}
      </svg>
      <div className="kh-sloka-top">
        <h2 id="kh-sloka-title">Śloka of the Day</h2>
        <time dateTime={sloka.date}>{formatDate(`${sloka.date}T12:00:00`)}</time>
      </div>
      <p className="kh-sloka-dev" lang="sa">{sloka.devanagari}</p>
      {sloka.transliteration && <p className="kh-sloka-iast">{sloka.transliteration}</p>}
      <p className="kh-sloka-tr">{sloka.translation}</p>
      <div className="kh-sloka-src">— {sloka.source}</div>
    </aside>
  );
}

function FeaturedVideos({ videos, onPlay }) {
  if (!videos.length) {
    return (
      <div className="kh-video-empty">
        <span className="kh-video-empty-icon"><Icon name="video" /></span>
        <h3>Discourses are on their way</h3>
        <p>Talks and lectures will appear here as they are published on our YouTube channel.</p>
        <a href={YOUTUBE_CHANNEL} target="_blank" rel="noopener noreferrer" className="kh-btn-ghost">
          Visit our YouTube channel ↗
        </a>
      </div>
    );
  }
  const [main, ...more] = videos;
  return (
    <div className="kh-videos">
      <button type="button" className="kh-video-main" onClick={() => onPlay(main)}>
        <span className="kh-thumb">
          <img src={main.thumbnail} alt="" loading="lazy" />
          <span className="kh-play"><Icon name="play" /></span>
        </span>
        <span className="kh-video-title">{main.title}</span>
        <Meta date={main.publishedAt} extra={main.duration} />
      </button>
      {more.length > 0 && (
        <ul className="kh-video-list">
          {more.map((v) => (
            <li key={v._id}>
              <button type="button" className="kh-video-row" onClick={() => onPlay(v)}>
                <span className="kh-thumb kh-thumb-sm">
                  <img src={v.thumbnail} alt="" loading="lazy" />
                  <span className="kh-play kh-play-sm"><Icon name="play" /></span>
                </span>
                <span>
                  <span className="kh-video-title">{v.title}</span>
                  <Meta date={v.publishedAt} extra={v.duration} />
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function TopicTile({ topic }) {
  return (
    <Link to={`/topics/${topic.slug}`} className="kh-topic">
      {topic.image ? (
        <img src={topic.image} alt="" loading="lazy" />
      ) : (
        <span className="kh-topic-art" aria-hidden="true">
          <span>{topic.name.charAt(0)}</span>
        </span>
      )}
      <span className="kh-topic-name">{topic.name}</span>
    </Link>
  );
}

function HubSkeleton() {
  return (
    <section className="kh" aria-busy="true" aria-label="Loading latest content">
      <div className="kh-wrap">
        <div className="kh-top">
          <div className="kh-skel kh-skel-lead" />
          <div className="kh-col">
            <div className="kh-skel kh-skel-story" />
            <div className="kh-skel kh-skel-story" />
            <div className="kh-skel kh-skel-story" />
          </div>
          <div className="kh-col">
            <div className="kh-skel kh-skel-side" />
            <div className="kh-skel kh-skel-side" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function KnowledgeHub({ fallback = null }) {
  const { data, error, loading } = useContent('home', (signal) => getHome({ signal }));
  const [playing, setPlaying] = useState(null);

  if (loading) return <HubSkeleton />;
  if (error || !data) return fallback;

  const { today, featured, stories, topStories, latestArticles, videos, topics, trending, sloka } = data;
  if (!featured && !videos.length && !sloka) return fallback;

  return (
    <section className="kh" id="explore" aria-label="Latest from Śāstra Nidhi">
      <div className="kh-wrap">
        {trending.length > 0 && (
          <nav className="kh-trending" aria-label="Trending topics" data-reveal="up">
            <span className="kh-trending-label">Trending</span>
            <ul>
              {trending.map((t) => (
                <li key={t.slug}>
                  <Link to={`/topics/${t.slug}`}>{t.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="kh-today" data-reveal="up">
          <div>
            <p className="kh-today-kicker">Today in the library</p>
            <h2>Readings for {today ? formatDate(`${today}T12:00:00`) : 'today'}</h2>
          </div>
          <p className="kh-today-note">New picks every day, from the śāstras, the ācāryas and the holy places.</p>
        </div>

        <div className="kh-top">
          {featured && <LeadStory article={featured} />}

          {stories.length > 0 && (
            <div className="kh-col kh-stories">
              {stories.map((a, i) => (
                <StoryCard key={a._id} article={a} delay={120 + i * 110} />
              ))}
            </div>
          )}

          <div className="kh-col kh-side" data-reveal="right" style={{ '--rd': '360ms' }}>
            {topStories.length > 0 && (
              <div className="kh-panel">
                <HeadRow title="Top Stories" to="/articles" />
                <ul className="kh-compact-list">
                  {topStories.map((a) => (
                    <CompactItem key={a._id} article={a} />
                  ))}
                </ul>
              </div>
            )}
            {sloka && <SlokaCard sloka={sloka} />}
          </div>
        </div>

        <nav className="kh-strip" aria-label="Browse by category">
          {CATEGORY_STRIP.map((c, i) => {
            const inner = (
              <>
                <Icon name={c.icon} />
                <strong>{c.label}</strong>
                <small>{c.note}</small>
              </>
            );
            return c.to.startsWith('#') ? (
              <a key={c.label} href={c.to} className="kh-strip-item" data-reveal="up" style={{ '--rd': `${i * 60}ms` }}>{inner}</a>
            ) : (
              <Link key={c.label} to={c.to} className="kh-strip-item" data-reveal="up" style={{ '--rd': `${i * 60}ms` }}>{inner}</Link>
            );
          })}
        </nav>

        <div className="kh-bottom">
          <div className="kh-panel" data-reveal="up">
            <HeadRow title="Latest Articles" to="/articles" />
            <ul className="kh-latest">
              {latestArticles.map((a) => (
                <li key={a._id}>
                  <Link to={`/articles/${a.slug}`} className="kh-latest-item">
                    <Cover article={a} className="kh-latest-cover" />
                    <div>
                      <h4>{a.title}</h4>
                      {a.excerpt && <p>{a.excerpt}</p>}
                      <Meta date={a.publishedAt} minutes={a.readMinutes} />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="kh-panel" data-reveal="up" style={{ '--rd': '140ms' }}>
            <HeadRow title="Featured Videos" to={videos.length ? '/videos' : null} />
            <FeaturedVideos videos={videos} onPlay={setPlaying} />
          </div>

          {topics.length > 0 && (
            <div className="kh-panel" data-reveal="up" style={{ '--rd': '280ms' }}>
              <HeadRow title="Popular Topics" to="/topics" />
              <div className="kh-topics">
                {topics.slice(0, 9).map((t) => (
                  <TopicTile key={t._id} topic={t} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <VideoModal video={playing} onClose={() => setPlaying(null)} />
    </section>
  );
}
