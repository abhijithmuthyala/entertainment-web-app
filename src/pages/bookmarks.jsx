import Head from "next/head";
import { useContext } from "react";

import MediaSectionGrid from "@/components/media/MediaSectionGrid";

import { BookmarksContext } from "@/context/bookmarks";

export default function BookmarksPage() {
  const { bookmarksData } = useContext(BookmarksContext);
  const bookmarkedMovies = [];
  const bookmarkedSeries = [];

  bookmarksData.forEach((bookmark) => {
    if (bookmark.mediaType === "movie") {
      bookmarkedMovies.push(bookmark);
    } else if (bookmark.mediaType === "tv") {
      bookmarkedSeries.push(bookmark);
    }
  });

  return (
    <>
      <Head>
        <title>Bookmarks | Entertainment Web App</title>
        <meta
          name="description"
          content="Quickly access your favourite movies and tv-series."
        />
      </Head>
      <main>
        <h1 className="sr-only">Your bookmarks</h1>
        {bookmarkedMovies.length === 0 && bookmarkedSeries.length === 0 && (
          <p className="p-4 text-base font-bold opacity-75">
            No bookmarks found.
          </p>
        )}
        {bookmarkedMovies.length > 0 && (
          <MediaSectionGrid
            heading="bookmarked movies"
            mediaData={bookmarkedMovies}
          />
        )}
        {bookmarkedSeries.length > 0 && (
          <MediaSectionGrid
            heading="bookmarked series"
            mediaData={bookmarkedSeries}
          />
        )}
      </main>
    </>
  );
}
