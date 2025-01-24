import Head from "next/head";

import PaginatedMedia from "@/components/PaginatedMedia";
import { API, MAX_PAGINATION_PAGES } from "@/constants";
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
        <PaginatedMedia
          type="movies"
          initMovies={moviesData.results}
          totalPages={Math.min(moviesData.total_pages, MAX_PAGINATION_PAGES)}
        />
      </main>
    </>
  );
}

export async function getStaticProps() {
  try {
    const moviesData = await fetchData(API.movies(1), {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.KEY}`,
      },
    });
    insertMediaTypeField(moviesData.results, "movie");
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
