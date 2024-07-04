import { debounce } from "@/utils";
import { useCallback, useState } from "react";

export default function useDebouncedQuery(init, delay = 300) {
  const [query, setQuery] = useState(init);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  const memoisedDebouncedUpdater = useCallback(
    debounce(function updateDebouncedQuery(query) {
      setDebouncedQuery(query);
    }, delay),
    [],
  );

  function onChange(query) {
    const normalisedQuery = query.trim();
    setQuery(normalisedQuery);
    memoisedDebouncedUpdater(normalisedQuery);
  }

  return {
    query,
    debounced: debouncedQuery,
    onChange,
  };
}