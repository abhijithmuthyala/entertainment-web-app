import usePagination, { nextPageAction } from "@/hooks/usePagination";
import useQuery from "@/hooks/useQuery";
import { fetchData } from "@/utils";
import { useCallback, useMemo, useState } from "react";
import FeedbackMessage from "./FeedbackMessage";
import MediaSectionGrid from "./media/MediaSectionGrid";
import ObserveIntersection from "./ObserveIntersection";

async function fetchSearchResults(query, page) {
  if (query === "") return null;
  try {
    const data = await fetchData(
      `/api/search?query=${query}&media_type=multi&page=${page}`,
    );
    return data.results;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default function SearchResults({ query }) {
  const [results, setResults] = useState(null);
  const { page, dispatchPagination } = usePagination(1);
  const fetcher = useCallback(
    async function fetcher() {
      try {
        return await fetchSearchResults(query.trim(), page);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    [query, page],
  );
  const onSuccess = useCallback(function onSuccess(curr) {
    setResults((prev) => (prev ? [...prev, ...curr] : curr));
  }, []);
  const onError = useCallback(function onError() {
    setResults(null);
  }, []);
  const { error, status } = useQuery(fetcher, onSuccess, onError);

  const onIntersection = useCallback(
    function onIntersection() {
      dispatchPagination(nextPageAction(1));
    },
    [dispatchPagination],
  );
  const options = useMemo(function cacheOptions() {
    return { rootMargin: "128px" };
  }, []);

  if (status === "error") {
    return (
      <FeedbackMessage
        message={error?.message ?? "Error fetching results, please try again."}
      />
    );
  }
  if (status === "pending" && !results) {
    return <FeedbackMessage message="Loading results..." />;
  }
  if (!results) return null;

  if (results.length === 0) {
    return (
      <FeedbackMessage message={`No results found for the query ${query}.`} />
    );
  }

  return (
    <ObserveIntersection options={options} onIntersection={onIntersection}>
      <MediaSectionGrid heading={`Results for ${query}`} mediaData={results} />
    </ObserveIntersection>
  );
}
