import { useRouter } from "next/router";

import { useContext, useState } from "react";

import { BookmarksContext } from "@/context/bookmarks";
import { SearchContext } from "@/context/search";

import { fetchData } from "@/utils";

const searchLabels = {
  "/": "Search for movies or TV series",
  "/movie": "Search for movies",
  "/tv": "Search for TV series",
  "/bookmarks": "Search for bookmarked shows",
};

export default function SearchForm() {
  const { onFetchSearchResults } = useContext(SearchContext);
  const [searchQuery, setSearchQuery] = useState("");
  const { bookmarksData } = useContext(BookmarksContext);
  const router = useRouter();

  const label = searchLabels[router.pathname];

  function handleSubmit(event) {
    event.preventDefault();
  }

  async function handleChange(event) {
    const query = event.target.value;
    const normalizedQuery = query.trim().toLowerCase();
    setSearchQuery(query);

    const url =
      router.pathname + (normalizedQuery && `/?search=${normalizedQuery}`);
    "url", url;
    "pathname", router.pathname;
    router.replace(url, undefined, { shallow: true });

    if (normalizedQuery === "") return onFetchSearchResults(null);

    const movieType = router.pathname.slice(1);

    if (router.pathname === "/bookmarks") {
      const searchResults = bookmarksData.filter((bookmark) => {
        const title = bookmark.title || bookmark.name;
        return title.toLowerCase().includes(normalizedQuery.toLowerCase());
      });
      onFetchSearchResults(searchResults);
    } else {
      const searchResults = await fetchData(
        `/api/search?query=${normalizedQuery}&mediaType=${movieType}`,
      );
      searchResults.forEach((result) => {
        if (result.media_type) return;
        result.media_type = movieType;
      });

      onFetchSearchResults(searchResults);
    }
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
            value={searchQuery}
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
