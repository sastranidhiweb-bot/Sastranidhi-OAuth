import { useEffect, useState } from 'react';

// Small cache so moving between pages doesn't refetch what was just shown
const cache = new Map();

/**
 * Loads content with `loader(signal)`, keyed by `key` (re-runs when it
 * changes). Returns { data, error, loading }.
 */
export function useContent(key, loader) {
  const [state, setState] = useState(() =>
    cache.has(key) ? { data: cache.get(key), error: null, loading: false } : { data: null, error: null, loading: true }
  );

  useEffect(() => {
    const controller = new AbortController();
    if (cache.has(key)) setState({ data: cache.get(key), error: null, loading: false });
    else setState({ data: null, error: null, loading: true });

    loader(controller.signal)
      .then((data) => {
        cache.set(key, data);
        setState({ data, error: null, loading: false });
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setState((s) => ({ data: s.data, error, loading: false }));
      });
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return state;
}

export const clearContentCache = () => cache.clear();
