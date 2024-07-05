import Head from "next/head";

import MediaSectionGrid from "@/components/media/MediaSectionGrid";

import { API } from "@/constants";
import { insertMediaTypeField } from "@/helpers";
import usePagination, {
  nextPageAction,
  previousPageAction,
} from "@/hooks/usePagination";
import { fetchData } from "@/utils";
import { useState } from "react";

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
        <PaginatedMovies initMovies={moviesData} />
        {/* <MediaSectionGrid heading="movies" mediaData={moviesData} /> */}
      </main>
    </>
  );
}

function PaginatedMovies({ initMovies }) {
  const { page, dispatchPagination } = usePagination(1);
  const [movies, setMovies] = useState(initMovies);

  async function handleNext() {
    dispatchPagination(nextPageAction(1));
    const movies = await fetchMovies(page + 1);
    setMovies(movies);
  }

  async function handlePrevious() {
    dispatchPagination(previousPageAction(1));
    const movies = await fetchMovies(page - 1);
    setMovies(movies);
  }

  return (
    <>
      <MediaSectionGrid heading="movies" mediaData={movies} />
      <div className="flex items-center gap-4">
        <button onClick={handlePrevious}>Previous</button>
        Page {page} of 10
        <button onClick={handleNext}>Next</button>
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    const movies = await fetchData(API.movies(1));
    insertMediaTypeField(movies.results, "movie");

    return {
      props: {
        moviesData: movies.results,
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

async function fetchMovies(page = 1) {
  try {
    const movies = await fetchData(`/api/movies?page=${page}`);
    insertMediaTypeField(movies, "movie");
    return movies;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
