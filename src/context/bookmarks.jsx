import { createContext } from "react";

import useLocalStorage from "@/hooks/useLocalStorage";

export const BookmarksContext = createContext(null);

export function BookmarksProvider({ children }) {
  const [bookmarksData, setBookmarksData] = useLocalStorage("bookmarks");

  function toggleBookmark(data) {
    // If the bookmark is already present, remove it
    const newBookmarksData = bookmarksData.filter(
      (bookmark) =>
        !(bookmark.id === data.id && bookmark.mediaType === data.mediaType),
    );
    // If the bookmark is not present, add it
    if (newBookmarksData.length === bookmarksData.length) {
      newBookmarksData.push(data);
    }

    setBookmarksData(newBookmarksData);
  }

  return (
    <BookmarksContext.Provider value={{ bookmarksData, toggleBookmark }}>
      {children}
    </BookmarksContext.Provider>
  );
}
