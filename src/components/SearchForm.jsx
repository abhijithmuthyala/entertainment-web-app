import { useRouter } from "next/router";

import { useContext, useRef } from "react";

import { SearchContext } from "@/context/search";

import { DEBOUNCE_THRESHOLD } from "@/constants";

export default function SearchForm() {
  const router = useRouter();
  const { updateSearchResults } = useContext(SearchContext);
  const timerRef = useRef(null);

  const searchQuery = router.query.search || "";

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleChange(event) {
    const query = event.target.value;
    const normalizedQuery = query.trim().toLowerCase();
    const url = encodeURI(
      router.pathname + (normalizedQuery && `?search=${normalizedQuery}`),
    );

    router.replace(url, undefined, { shallow: true });

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(function queueSearchResults() {
      updateSearchResults(normalizedQuery);
    }, DEBOUNCE_THRESHOLD);
  }

  return (
    <div className="py-3 max-lg:px-2">
      <form
        action="/"
        onSubmit={handleSubmit}
        className="rounded-md bg-background-muted px-2 py-3 focus-within:outline focus-within:outline-1 focus-within:outline-highlight lg:px-4"
      >
        <label htmlFor="search" className="sr-only">
          Search for movies, TV series and people
        </label>
        <div className="flex flex-row-reverse flex-wrap items-center gap-x-4 ">
          <input
            type="search"
            name="search"
            id="search"
            onChange={handleChange}
            placeholder={label}
            className="grow px-1 placeholder:opacity-75 focus:outline-none md:text-xl"
          />
          <button
            type="submit"
            aria-label={`Search for ${searchQuery}`}
            className="bg-search aspect-square w-6 bg-contain bg-center bg-no-repeat"
          />
        </div>
      </form>
    </div>
  );
}
