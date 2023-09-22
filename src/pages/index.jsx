import Head from "next/head";

import MediaLinksList from "@/components/media/MediaLinksList";
import MediaSection from "@/components/media/MediaSection";

import MediaSectionGrid from "@/components/media/MediaSectionGrid";
import { API, HORIZONTAL_SCROLL_UNITS, fetchData } from "@/constants";
import { insertMediaTypeField } from "@/utils";

export default function Home({
  trendingData,
  popularMoviesData,
  popularSeriesData,
  form,
}) {
  const trendingDataSlice = trendingData.slice(0, HORIZONTAL_SCROLL_UNITS);

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
        {form}
        <div className="px-4 py-3">
          <MediaSection heading="trending" tag="all">
            <MediaLinksList
              horizontallyScrollable
              overlayInfo
              data={trendingDataSlice}
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
    const [trending, popularMovies, popularSeries] = await Promise.all([
      fetchData(API.trending),
      fetchData(API.popular.movies),
      fetchData(API.popular.tv),
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
        trendingData: trending.results,
        popularMoviesData: popularMovies.results,
        popularSeriesData: popularSeries.results,
      },
    };
  } catch (error) {
    console.error(error.message);
  }
}
