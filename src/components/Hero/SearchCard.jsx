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
    <div className="search-panel">
      <h3>Search the Knowledge Network</h3>
      <p>
        Discover scriptures, commentaries, philosophical answers, courses, research
        material and publications.
      </p>
      <form className="search-row" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search texts, topics, courses…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {result && <div className="search-result">{result}</div>}
    </div>
  );
}
