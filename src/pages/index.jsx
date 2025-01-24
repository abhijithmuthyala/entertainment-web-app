import Head from "next/head";

import MediaLinksList from "@/components/media/MediaLinksList";
import MediaSection from "@/components/media/MediaSection";
import MediaSectionGrid from "@/components/media/MediaSectionGrid";

import { API, HORIZONTAL_SCROLL_UNITS, PREVIEW_UNITS } from "@/constants";
import { insertMediaTypeField } from "@/helpers";
import { fetchData } from "@/utils";

export default function Home({
  trendingData,
  popularMoviesData,
  popularSeriesData,
}) {
  return (
    <>
      <Head>
        <title>Home | Entertainment Web App</title>
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
        <div className="pb-3 max-lg:px-4">
          <MediaSection heading="trending" tag="all">
            <MediaLinksList
              horizontallyScrollable
              overlayInfo
              data={trendingData}
            />
          </MediaSection>
        </div>
        <MediaSectionGrid
          heading="popular"
          tag="movies"
          mediaData={popularMoviesData}
        />
        <MediaSectionGrid
          heading="popular"
          tag="tv-series"
          mediaData={popularSeriesData}
        />
      </main>
    </>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.KEY}`,
      },
    };
    const [trending, popularMovies, popularSeries] = await Promise.all([
      fetchData(API.trending, options),
      fetchData(API.popular.movies, options),
      fetchData(API.popular.tv, options),
    ]);
    if (
      trending.success === false ||
      popularMovies.success === false ||
      popularSeries.success === false
    ) {
      throw new Error("Failed to fetch data");
    }

    insertMediaTypeField(popularMovies.results, "movie");
    insertMediaTypeField(popularSeries.results, "tv");

    return {
      props: {
        trendingData: trending.results.slice(0, HORIZONTAL_SCROLL_UNITS),
        popularMoviesData: popularMovies.results.slice(0, PREVIEW_UNITS),
        popularSeriesData: popularSeries.results.slice(0, PREVIEW_UNITS),
      },
    };
  } catch (error) {
    console.error(error.message);
  }
}
