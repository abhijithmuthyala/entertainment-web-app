import Head from "next/head";

import { useContext } from "react";

import SearchForm from "@/components/SearchForm";
import SearchResults from "@/components/SearchResults";
import MediaSectionGrid from "@/components/media/MediaSectionGrid";

import { SearchContext } from "@/context/search";

import { API } from "@/constants";
import { fetchData, insertMediaTypeField } from "@/utils";

export default function MoviesPage({ moviesData }) {
  const { searchResults } = useContext(SearchContext);
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
        <SearchForm />
        {searchResults && <SearchResults data={searchResults} />}
        {!searchResults && (
          <MediaSectionGrid heading="movies" mediaData={moviesData} />
        )}
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
  }
}
