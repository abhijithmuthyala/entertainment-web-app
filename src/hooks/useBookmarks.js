import useLocalStorage from "./useLocalStorage";

export default function useBookmarks() {
  const [bookmarks, setBookmarks] = useLocalStorage("bookmarks");

  function toggleBookmark(targetBookmark) {
    setBookmarks(function reduceBookmarks(bookmarks) {
      // If the bookmark is already present, remove it
      const newBookmarks = bookmarks.filter(function filterBookmarks(bookmark) {
        return !(
          bookmark.id === targetBookmark.id &&
          bookmark.mediaType === targetBookmark.mediaType
        );
      });
      // If the bookmark is not present, add it
      if (newBookmarks.length === bookmarks.length) {
        newBookmarks.push(targetBookmark);
      }

      return newBookmarks;
    });
  }

  return { bookmarks, toggleBookmark };
}
