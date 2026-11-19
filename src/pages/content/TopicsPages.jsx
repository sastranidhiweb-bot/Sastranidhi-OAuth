import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getTopic, getTopics, getVideos } from '../../services/contentApi.js';
import { useContent } from '../../hooks/useContent.js';
import VideoModal from '../../components/Content/VideoModal.jsx';
import ContentShell from './ContentShell.jsx';
import { ArticleCard, LoadError, LoadingGrid, VideoCard } from './ContentCards.jsx';

function TopicArt({ topic }) {
  return topic.image ? (
    <img src={topic.image} alt="" loading="lazy" />
  ) : (
    <span className="kh-topic-art" aria-hidden="true"><span>{topic.name.charAt(0)}</span></span>
  );
}

// /topics
export function TopicsPage() {
  const { data, error, loading } = useContent('topics', (signal) => getTopics({ signal }));
  return (
    <ContentShell title="Topics" hero="Explore by Topic" lede="Scriptures, sciences and traditions of Bhārata.">
      {loading && !data ? (
        <LoadingGrid count={5} />
      ) : error && !data ? (
        <LoadError />
      ) : (
        <div className="cx-topic-grid">
          {data.items.map((t) => (
            <Link key={t._id} to={`/topics/${t.slug}`} className="kh-topic">
              <TopicArt topic={t} />
              <span className="kh-topic-name">{t.name}</span>
              {t.description && <small>{t.description}</small>}
            </Link>
          ))}
        </div>
      )}
    </ContentShell>
  );
}

// /topics/:slug
export function TopicPage() {
  const { slug } = useParams();
  const { data, error, loading } = useContent(`topic:${slug}`, (signal) => getTopic(slug, { signal }));
  const [playing, setPlaying] = useState(null);

  if (loading && !data) return <ContentShell><LoadingGrid /></ContentShell>;
  if (error && !data) {
    return (
      <ContentShell title="Topic not found">
        {error.status === 404 ? (
          <div className="cx-empty">
            <h2>This topic isn’t available</h2>
            <p><Link to="/topics">See all topics →</Link></p>
          </div>
        ) : (
          <LoadError />
        )}
      </ContentShell>
    );
  }

  const { topic, articles, videos } = data;
  return (
    <ContentShell title={topic.name} hero={topic.name} lede={topic.description}>
      {articles.length === 0 && videos.length === 0 && (
        <div className="cx-empty">
          <h2>Coming soon</h2>
          <p>Articles and talks on {topic.name} will appear here.</p>
        </div>
      )}
      {articles.length > 0 && (
        <div className="cx-grid">
          {articles.map((a) => (
            <ArticleCard key={a._id} article={a} />
          ))}
        </div>
      )}
      {videos.length > 0 && (
        <section className="cx-related" aria-labelledby="cx-topic-videos">
          <h2 id="cx-topic-videos">Talks on {topic.name}</h2>
          <div className="cx-grid">
            {videos.map((v) => (
              <VideoCard key={v._id} video={v} onPlay={setPlaying} />
            ))}
          </div>
        </section>
      )}
      <VideoModal video={playing} onClose={() => setPlaying(null)} />
    </ContentShell>
  );
}

// /videos
export function VideosPage() {
  const { data, error, loading } = useContent('videos', (signal) => getVideos({ limit: 24 }, { signal }));
  const [playing, setPlaying] = useState(null);
  return (
    <ContentShell title="Videos" hero="Discourses & Talks" lede="Lectures and conversations on the śāstras.">
      {loading && !data ? (
        <LoadingGrid />
      ) : error && !data ? (
        <LoadError />
      ) : data.items.length === 0 ? (
        <div className="cx-empty">
          <h2>Videos are on their way</h2>
          <p>
            Talks will appear here as they are published on{' '}
            <a href="https://www.youtube.com/@sastranidhi" target="_blank" rel="noopener noreferrer">our YouTube channel</a>.
          </p>
        </div>
      ) : (
        <div className="cx-grid">
          {data.items.map((v) => (
            <VideoCard key={v._id} video={v} onPlay={setPlaying} />
          ))}
        </div>
      )}
      <VideoModal video={playing} onClose={() => setPlaying(null)} />
    </ContentShell>
  );
}
