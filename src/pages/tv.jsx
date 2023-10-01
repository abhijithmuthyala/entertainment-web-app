import Head from "next/head";

import { useContext } from "react";

import MediaSectionGrid from "@/components/media/MediaSectionGrid";
import SearchForm from "@/components/SearchForm";
import SearchResults from "@/components/SearchResults";

import { SearchContext } from "@/context/search";

import { API } from "@/constants";
import { fetchData, insertMediaTypeField } from "@/utils";

export default function SeriesPage({ seriesData }) {
  const { searchResults } = useContext(SearchContext);
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
        <SearchForm />
        {searchResults && <SearchResults data={searchResults} />}
        {!searchResults && (
          <MediaSectionGrid heading="TV series" mediaData={seriesData} />
        )}
      </main>
    </>
  );
}

export async function getStaticProps() {
  try {
    const series = await fetchData(API.series);
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
