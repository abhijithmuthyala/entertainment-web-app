import Head from "next/head";

import FeedbackMessage from "@/components/FeedbackMessage";
import MediaSectionGrid from "@/components/media/MediaSectionGrid";

import { useBookmarksContext } from "@/context/bookmarks";

export default function BookmarksPage() {
  const { bookmarks } = useBookmarksContext();

  if (bookmarks.length === 0) {
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
        <MediaSectionGrid heading="bookmarks" mediaData={bookmarks} />
      </main>
    </>
  );
}
