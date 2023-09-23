import { createContext, useState } from "react";

export const SearchContext = createContext();

export function SearchProvider({ children }) {
  const { searchQuery, setSearchQuery } = useState("");

  return (
    <SearchContext.Provider value={{ searchQuery }}>
      {children}
    </SearchContext.Provider>
  );
}
