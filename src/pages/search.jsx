import SearchForm from "@/components/SearchForm";
import SearchResults from "@/components/SearchResults";
import useDebouncedQuery from "@/hooks/useDebounce";
import { useRouter } from "next/router";
import { memo } from "react";

export default function SearchPage() {
  return (
    <main>
      <h1 className="sr-only">
        Search for your favourite movies, tv shows and celebrities from the vast
        collection of TMDB API
      </h1>
      <SearchFormAndResults />
    </main>
  );
}

function SearchFormAndResults() {
  const router = useRouter();
  const query = useDebouncedQuery(router.query.query ?? "");

  function handleChange(event) {
    const inputQuery = event.target.value;
    const url = encodeURI(router.pathname + `?query=${inputQuery}`);

    router.replace(url, undefined, { shallow: true });
    query.onChange(inputQuery);
  }

  return (
    <div>
      <SearchForm query={query.query} onChange={handleChange} />
      <MemoisedSearchResults query={query.debounced} key={query.debounced} />
    </div>
  );
}

const MemoisedSearchResults = memo(SearchResults);
