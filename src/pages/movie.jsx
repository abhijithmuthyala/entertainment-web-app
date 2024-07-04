import Head from "next/head";

import MediaSectionGrid from "@/components/media/MediaSectionGrid";

import { API } from "@/constants";
import { insertMediaTypeField } from "@/helpers";
import { fetchData } from "@/utils";

export default function MoviesPage({ moviesData }) {
  return (
    <>
      <Head>
        <title>Movies | Entertainment Web App</title>
        <meta
          name="description"
          content="Explore movies across different genres, powered by the TMDB API"
        />
      </Head>
      <main>
        <h1 className="sr-only">
          Explore a wide collection of movies across genres
        </h1>
        <MediaSectionGrid heading="movies" mediaData={moviesData} />
      </main>
    </>
  );
}

export async function getStaticProps() {
  try {
    const movies = await fetchData(API.movies);
    insertMediaTypeField(movies.results, "movie");

    return {
      props: {
        moviesData: movies.results,
      },
      revalidate: 60 * 60 * 24,
    };
  } catch (error) {
    console.error(error.message);
    return {
      notFound: true,
    };
  }
}
