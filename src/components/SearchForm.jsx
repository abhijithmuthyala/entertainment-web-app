import { useRouter } from "next/router";

import { useContext, useRef } from "react";

import { SearchContext } from "@/context/search";

import { DEBOUNCE_THRESHOLD } from "@/constants";

const searchLabels = {
  "/": "Search for movies or TV series",
  "/movie": "Search for movies",
  "/tv": "Search for TV series",
  "/bookmarks": "Search for bookmarked shows",
};

export default function SearchForm() {
  const router = useRouter();
  const { updateSearchResults } = useContext(SearchContext);
  const timerRef = useRef(null);

  const label = searchLabels[router.pathname];
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
          {label}
        </label>
        <div className="flex flex-row-reverse flex-wrap items-center gap-x-4 ">
          <input
            type="search"
            name="search"
            id="search"
            onChange={handleChange}
            placeholder={label}
            className="grow px-1 placeholder:opacity-75 focus:outline-none"
          />
          <button
            type="submit"
            aria-label={`Search for ${searchQuery}`}
            className="aspect-square w-6 bg-search bg-contain bg-center bg-no-repeat"
          />
        </div>
      </form>
    </div>
  );
}
