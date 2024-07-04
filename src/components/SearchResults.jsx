import usePagination, { nextPageAction } from "@/hooks/usePagination";
import { fetchData } from "@/utils";
import { useCallback, useEffect, useMemo, useState } from "react";
import MediaSectionGrid from "./media/MediaSectionGrid";
import ObserveIntersection from "./ObserveIntersection";

function useSearchResults(query, page) {
  const [results, setResults] = useState([]);

  useEffect(
    function fetchresultsEffect() {
      if (query === "") {
        return setResults([]);
      }

      let ignore = false;

      (async function updateSearchResult() {
        try {
          const data = await fetchData(
            `/api/search?query=${query}&media_type=multi&page=${page}`,
          );
          if (ignore) return;
          setResults((results) => [...results, ...data.results]);
        } catch (error) {
          console.error(error);
        }
      })();

      return function ignoreStaleData() {
        ignore = true;
      };
    },
    [query, page],
  );

  return results;
}

export default function SearchResults({ query }) {
  // const {} = useQuery()
  const { page, dispatchPagination } = usePagination(1);
  const results = useSearchResults(query, page);

  const onIntersection = useCallback(
    function onIntersection() {
      dispatchPagination(nextPageAction(1));
    },
    [dispatchPagination],
  );
  const options = useMemo(function cacheOptions() {
    return { rootMargin: "128px" };
  }, []);

  if (!results.length) return null;
  if (query !== "" && results.length === 0) {
    return (
      <p>
        No results found for <span className="font-bold">{query}</span>
      </p>
    );
  }

  return (
    <ObserveIntersection options={options} onIntersection={onIntersection}>
      <MediaSectionGrid heading={`Results for ${query}`} mediaData={results} />
    </ObserveIntersection>
  );
}
