import { Link, useParams } from 'react-router-dom';
import { getArticle } from '../../services/contentApi.js';
import { useContent } from '../../hooks/useContent.js';
import { ArticleBody, CategoryTag, Cover, Meta } from '../../components/Content/contentUi.jsx';
import ContentShell from './ContentShell.jsx';
import { ArticleCard, LoadError } from './ContentCards.jsx';

// /articles/:slug
export default function ArticlePage() {
  const { slug } = useParams();
  const { data, error, loading } = useContent(`article:${slug}`, (signal) => getArticle(slug, { signal }));

  if (loading && !data) {
    return (
      <ContentShell>
        <div className="cx-article" aria-busy="true">
          <div className="kh-skel" style={{ height: 60, marginBottom: 16 }} />
          <div className="kh-skel" style={{ height: 380 }} />
        </div>
      </ContentShell>
    );
  }

  if (error && !data) {
    return (
      <ContentShell title="Article not found">
        {error.status === 404 ? (
          <div className="cx-empty">
            <h2>This article isn’t available</h2>
            <p>It may have been moved or unpublished.</p>
            <p><Link to="/articles">Browse all articles →</Link></p>
          </div>
        ) : (
          <LoadError />
        )}
      </ContentShell>
    );
  }

  const { article, related } = data;

  return (
    <ContentShell title={article.title}>
      <article className="cx-article">
        <nav className="cx-crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/articles">Articles</Link>
        </nav>
        <div className="cx-article-head">
          <CategoryTag category={article.category} />
          <h1>{article.title}</h1>
          {article.excerpt && <p className="cx-lede">{article.excerpt}</p>}
          <div className="cx-byline">
            {article.author && <strong>{article.author}</strong>}
            <Meta date={article.publishedAt} minutes={article.readMinutes} />
          </div>
        </div>
        <Cover article={article} className="cx-article-cover" eager />
        <ArticleBody body={article.body} />
        {article.topicList?.length > 0 && (
          <div className="cx-topic-chips">
            {article.topicList.map((t) => (
              <Link key={t.slug} to={`/topics/${t.slug}`}>{t.name}</Link>
            ))}
          </div>
        )}
      </article>

      {related.length > 0 && (
        <section className="cx-related" aria-labelledby="cx-related-title">
          <h2 id="cx-related-title">Continue reading</h2>
          <div className="cx-grid">
            {related.map((a) => (
              <ArticleCard key={a._id} article={a} />
            ))}
          </div>
        </section>
      )}
    </ContentShell>
  );
}
