import Head from "next/head";

import FeedbackMessage from "@/components/FeedbackMessage";
import MediaSectionGrid from "@/components/media/MediaSectionGrid";

import { useBookmarksContext } from "@/context/bookmarks";

export default function BookmarksPage() {
  const { bookmarks } = useBookmarksContext();
  const bookmarkedMovies = [];
  const bookmarkedSeries = [];

  bookmarks.forEach((bookmark) => {
    if (bookmark.mediaType === "movie") {
      bookmarkedMovies.push(bookmark);
    } else if (bookmark.mediaType === "tv") {
      bookmarkedSeries.push(bookmark);
    }
  });

  if (bookmarkedMovies.length === 0 && bookmarkedSeries.length === 0) {
    return <FeedbackMessage message="No bookmarks found." />;
  }

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
