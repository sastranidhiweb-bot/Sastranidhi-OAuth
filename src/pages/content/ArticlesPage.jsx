import { Link, useSearchParams } from 'react-router-dom';
import { getArticles } from '../../services/contentApi.js';
import { useContent } from '../../hooks/useContent.js';
import { CATEGORY_LABELS } from '../../components/Content/contentUi.jsx';
import ContentShell from './ContentShell.jsx';
import { ArticleCard, LoadError, LoadingGrid } from './ContentCards.jsx';

const FILTERS = [
  ['', 'All'],
  ['article', 'Articles'],
  ['story', 'Stories'],
  ['research', 'Research'],
  ['culture', 'Culture'],
  ['saints', 'Saints'],
  ['sanskrit', 'Sanskrit'],
];

// /articles?category=story&page=2
export default function ArticlesPage() {
  const [params] = useSearchParams();
  const category = CATEGORY_LABELS[params.get('category')] ? params.get('category') : '';
  const page = Math.max(parseInt(params.get('page'), 10) || 1, 1);

  const query = { limit: 12, page, ...(category ? { category } : {}) };
  const { data, error, loading } = useContent(`articles:${category}:${page}`, (signal) => getArticles(query, { signal }));

  const link = (c, p = 1) => {
    const q = new URLSearchParams();
    if (c) q.set('category', c);
    if (p > 1) q.set('page', p);
    const s = q.toString();
    return `/articles${s ? `?${s}` : ''}`;
  };

  return (
    <ContentShell title="Articles" hero="Articles & Stories" lede="Insights, narratives and research from the treasury of the śāstras.">
      <nav className="cx-filters" aria-label="Filter by category">
        {FILTERS.map(([value, label]) => (
          <Link key={value || 'all'} to={link(value)} className={value === category ? 'is-active' : undefined}>
            {label}
          </Link>
        ))}
      </nav>

      {loading && !data ? (
        <LoadingGrid />
      ) : error && !data ? (
        <LoadError />
      ) : data.items.length === 0 ? (
        <div className="cx-empty">
          <h2>Nothing here yet</h2>
          <p>New writing in this section will appear here soon.</p>
        </div>
      ) : (
        <>
          <div className="cx-grid">
            {data.items.map((a) => (
              <ArticleCard key={a._id} article={a} />
            ))}
          </div>
          {data.pages > 1 && (
            <div className="cx-pager">
              {page > 1 && <Link to={link(category, page - 1)}>← Newer</Link>}
              <span>Page {page} of {data.pages}</span>
              {page < data.pages && <Link to={link(category, page + 1)}>Older →</Link>}
            </div>
          )}
        </>
      )}
    </ContentShell>
  );
}
