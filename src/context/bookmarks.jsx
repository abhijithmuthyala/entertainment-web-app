import { createContext, useContext } from "react";

import useBookmarks from "@/hooks/useBookmarks";

const BookmarksContext = createContext(null);

export function useBookmarksContext() {
  return useContext(BookmarksContext);
}

export function BookmarksProvider({ children }) {
  const { bookmarks, toggleBookmark } = useBookmarks();

  return (
    <BookmarksContext.Provider value={{ bookmarks, toggleBookmark }}>
      {children}
    </BookmarksContext.Provider>
  );
}
