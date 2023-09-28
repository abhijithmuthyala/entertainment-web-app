import { createContext, useContext, useState } from "react";

import { BookmarksContext } from "./bookmarks";

import { fetchData } from "@/utils";

export const SearchContext = createContext();

export function SearchProvider({ children }) {
  const { bookmarksData } = useContext(BookmarksContext);
  const [searchResults, setSearchResults] = useState(null);

  function onFetchSearchResults(searchResults) {
    setSearchResults(searchResults);
  }

  async function updateSearchResults(normalizedQuery, page = 1) {
    if (normalizedQuery === "") return onFetchSearchResults(null);

    const { pathname } = location;
    const movieType = pathname.slice(1);
    const params = new URLSearchParams(location.search);

    if (pathname === "/bookmarks") {
      const searchResults = bookmarksData.filter((bookmark) => {
        const title = bookmark.title || bookmark.name;
        return title.toLowerCase().includes(normalizedQuery.toLowerCase());
      });
      return onFetchSearchResults(searchResults);
    }

    const searchData = await fetchData(
      `/api/search?query=${normalizedQuery}&mediaType=${movieType}&page=${page}`,
    );

    // If the search query has changed since the fetch was initiated, ignore the results
    // Using the useRouter hook was causing a stale closure, so went with URLSearchParams
    if (normalizedQuery !== params.get("search")) return;

    searchData.results.forEach((result) => {
      if (result.media_type) return;
      result.media_type = movieType;
    });
    onFetchSearchResults(searchData);
  }

  return (
    <SearchContext.Provider
      value={{ searchResults, onFetchSearchResults, updateSearchResults }}
    >
      {children}
    </SearchContext.Provider>
  );
}
