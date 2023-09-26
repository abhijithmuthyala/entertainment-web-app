import Head from "next/head";
import { useRouter } from "next/router";

import { useContext } from "react";

import FeedbackMessage from "@/components/FeedbackMessage";
import SearchForm from "@/components/SearchForm";
import SearchResults from "@/components/SearchResults";
import MediaSectionGrid from "@/components/media/MediaSectionGrid";

import { BookmarksContext } from "@/context/bookmarks";

export default function BookmarksPage() {
  const router = useRouter();
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

  const searchQuery = router.query.search;
  const searchResults =
    searchQuery &&
    bookmarksData.filter((bookmark) => {
      const title = bookmark.title || bookmark.name;
      return title.toLowerCase().includes(searchQuery.toLowerCase());
    });
  router.query, searchQuery, searchResults;

  const searchContent = <SearchResults data={searchResults} />;
  const bookmarksContent = (
    <>
      {bookmarkedMovies.length === 0 && bookmarkedSeries.length === 0 && (
        <FeedbackMessage message="No bookmarks found." />
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
    </>
  );

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
        <SearchForm />
        {searchQuery ? searchContent : bookmarksContent}
      </main>
    </>
  );
}
