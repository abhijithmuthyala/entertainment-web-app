import usePagination from "@/hooks/usePagination";
import { fetchData } from "@/utils";
import { useEffect, useState } from "react";
import MediaSectionGrid from "./media/MediaSectionGrid";

function usePaginatedResults(query, type = "multi") {
  const [results, setResults] = useState([]);
  const pagination = usePagination(1);

  function onIntersection() {
    pagination.onNext();
  }

  useEffect(
    function fetchresultsEffect() {
      if (query === "") {
        return setResults([]);
      }

      let ignore = false;

      (async function updateSearchResult() {
        try {
          const data = await fetchData(
            `/api/search?query=${query}&media_type=${type}&page=${pagination.page}`,
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
    [query, pagination.page],
  );

  return { results };
}

export default function SearchResults({ query }) {
  // const {} = useQuery()
  const { results } = usePaginatedResults(query);

  if (!results.length) return null;
  if (query !== "" && results.length === 0) {
    return (
      <p>
        No results found for <span className="font-bold">{query}</span>
      </p>
    );
  }

  return (
    <MediaSectionGrid heading={`Results for ${query}`} mediaData={results} />
  );
}

function SearchSuggestion({ data }) {
  return (
    <div>
      <p>{data.title ?? data.name}</p>
    </div>
  );
}
