import { debounce } from "@/utils";
import { useCallback, useState } from "react";

export default function useDebouncedQuery(init, delay = 300, callback = null) {
  const [query, setQuery] = useState(init);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  const memoisedDebouncedUpdater = useCallback(
    debounce(function updateDebouncedQuery(query) {
      setDebouncedQuery(query);
      if (callback) callback(query);
    }, delay),
    [],
  );

  function onChange(query) {
    setQuery(query);
    memoisedDebouncedUpdater(query.trim());
  }

  return {
    query,
    debounced: debouncedQuery,
    onChange,
  };
}
