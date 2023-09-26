import { createContext, useState } from "react";

export const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [searchResults, setSearchResults] = useState(null);

  function onFetchSearchResults(searchResults) {
    setSearchResults(searchResults);
  }

  return (
    <SearchContext.Provider value={{ searchResults, onFetchSearchResults }}>
      {children}
    </SearchContext.Provider>
  );
}
