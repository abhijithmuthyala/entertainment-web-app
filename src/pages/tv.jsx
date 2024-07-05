import Head from "next/head";

import MediaSectionGrid from "@/components/media/MediaSectionGrid";

import { API } from "@/constants";
import { insertMediaTypeField } from "@/helpers";
import { fetchData } from "@/utils";

export default function SeriesPage({ seriesData }) {
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
        <MediaSectionGrid heading="TV series" mediaData={seriesData} />
      </main>
    </>
  );
}

export async function getStaticProps() {
  try {
    const series = await fetchData(API.series(1));
    insertMediaTypeField(series.results, "tv");

    return {
      props: {
        seriesData: series.results,
      },
      revalidate: 60 * 60 * 24,
    };
  } catch (error) {
    console.error(error.message);
  }
}
