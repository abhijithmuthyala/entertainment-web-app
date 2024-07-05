import Head from "next/head";

import PaginatedMedia from "@/components/PaginatedMedia";
import { API, MAX_PAGINATION_PAGES } from "@/constants";
import { insertMediaTypeField } from "@/helpers";
import { fetchData } from "@/utils";

export default function SeriesPage({ moviesData }) {
  return (
    <>
      <Head>
        <title>TV Series | Entertainment Web App</title>
        <meta
          name="description"
          content="Explore tv series across different genres, powered by the TMDB API"
        />
      </Head>
      <main>
        <h1 className="sr-only">
          Explore a wide collection of tv-series across genres
        </h1>
        <PaginatedMedia
          type="tv"
          initMovies={moviesData.results}
          totalPages={Math.min(moviesData.total_pages, MAX_PAGINATION_PAGES)}
        />
        {/* <MediaSectionGrid heading="TV series" mediaData={seriesData} /> */}
      </main>
    </>
  );
}

export async function getStaticProps() {
  try {
    const moviesData = await fetchData(API.tv(1));
    insertMediaTypeField(moviesData.results, "tv");
    return {
      props: {
        moviesData,
      },
      revalidate: 24 * 60 * 60,
    };
  } catch (error) {
    console.error(error.message);
    return {
      notFound: true,
    };
  }
}
