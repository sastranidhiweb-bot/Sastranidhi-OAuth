import { Link } from 'react-router-dom';
import { CategoryTag, Cover, Icon, Meta } from '../../components/Content/contentUi.jsx';

export function ArticleCard({ article }) {
  return (
    <Link to={`/articles/${article.slug}`} className="cx-card">
      <Cover article={article} />
      <div className="cx-card-body">
        <CategoryTag category={article.category} />
        <h3>{article.title}</h3>
        {article.excerpt && <p>{article.excerpt}</p>}
        <Meta date={article.publishedAt} minutes={article.readMinutes} />
      </div>
    </Link>
  );
}

export function VideoCard({ video, onPlay }) {
  return (
    <button type="button" className="cx-card cx-video-card" onClick={() => onPlay(video)}>
      <span className="kh-thumb">
        <img src={video.thumbnail} alt="" loading="lazy" />
        <span className="kh-play"><Icon name="play" /></span>
      </span>
      <span className="cx-card-body">
        <h3>{video.title}</h3>
        {video.speaker && <p>{video.speaker}</p>}
        <Meta date={video.publishedAt} extra={video.duration} />
      </span>
    </button>
  );
}

export function LoadingGrid({ count = 6 }) {
  return (
    <div className="cx-grid" aria-busy="true">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="kh-skel" style={{ minHeight: 320 }} />
      ))}
    </div>
  );
}

export function LoadError() {
  return (
    <div className="cx-empty" role="alert">
      <h2>We couldn’t load this right now</h2>
      <p>Please check your connection and try again in a moment.</p>
    </div>
  );
}
