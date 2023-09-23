import { useRouter } from "next/router";

import { useContext, useState } from "react";

import { BookmarksContext } from "@/context/bookmarks";

import { fetchData } from "@/utils";

const searchLabels = {
  "/": "Search for movies or TV series",
  "/movies": "Search for movies",
  "/tv": "Search for TV series",
  "/bookmarks": "Search for bookmarked shows",
};

export default function SearchForm({ onFetchSearchResults }) {
  const [searchQuery, setSearchQuery] = useState("");
  const { bookmarksData } = useContext(BookmarksContext);
  const router = useRouter();
  const label = searchLabels[router.pathname];

  function handleSubmit(event) {
    event.preventDefault();
  }

  async function handleChange(event) {
    const query = event.target.value.trim().toLowerCase();
    setSearchQuery(query);

    if (query === "") return onFetchSearchResults(null);

    if (router.pathname === "/bookmarks") {
      const searchResults = bookmarksData.filter((bookmark) => {
        return bookmark.title.toLowerCase().includes(query.toLowerCase());
      });
      onFetchSearchResults(searchResults);
    } else {
      const searchResults = await fetchData(
        `/api/search?query=${query}&media-type=${router.pathname.slice(1)}`,
      );
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
