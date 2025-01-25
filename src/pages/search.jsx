import SearchForm from "@/components/SearchForm";
import SearchResults from "@/components/SearchResults";
import { DEBOUNCE_THRESHOLD } from "@/constants";
import useDebouncedQuery from "@/hooks/useDebounce";
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
  const query = useDebouncedQuery("", DEBOUNCE_THRESHOLD);

  function handleChange(event) {
    const inputQuery = event.target.value;
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
