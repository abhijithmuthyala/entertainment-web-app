import Head from "next/head";

import MediaLinksList from "@/components/media/MediaLinksList";
import MediaSection from "@/components/media/MediaSection";

import { API, fetchData } from "@/constants";
import { formatData } from "@/utils";

export default function Home({ trendingData }) {
  return (
    <>
      <Head>
        <title>Entertainment Web App | Home</title>
        <meta
          name="description"
          content="Discover a wide range of movies and TV series across the genres. Search for your favourite movie or actor. Bookmark your favourite stuff."
        />
      </Head>
      <main>
        <h1 className="sr-only">
          Discover movies, tv-series and your favourite actors using the most
          trusted TMDB API
        </h1>
        <div className="px-4">
          <MediaSection heading="trending">
            <MediaLinksList
              horizontallyScrollable
              overlayInfo
              data={trendingData}
            />
          </MediaSection>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const data = await fetchData(API.trending);
    if (data.success === false) throw new Error(data.status_message);

    const trendingData = data.results.slice(0, 5);
    console.log(formatData(trendingData[0]));
    return {
      props: {
        trendingData,
      },
    };
  } catch (error) {
    console.error(error.message);
  }
}
