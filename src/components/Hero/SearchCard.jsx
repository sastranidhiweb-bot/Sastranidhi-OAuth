import { useState } from 'react';

export default function SearchCard() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = query.trim() || 'all resources';
    setResult(`Showing sample results for “${q}”.`);
  };

  return (
    <div className="search-card">
      <h2>Search the Knowledge Network</h2>
      <p>
        Discover scriptures, commentaries, philosophical answers, courses, research
        material and publications.
      </p>
      <form className="search" id="searchForm" onSubmit={handleSubmit}>
        <input
          id="searchInput"
          placeholder="Search texts, topics, courses..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn gold">Search</button>
      </form>
      <div className="result" id="result" style={{ display: result ? 'block' : 'none' }}>
        {result}
      </div>
    </div>
  );
}
