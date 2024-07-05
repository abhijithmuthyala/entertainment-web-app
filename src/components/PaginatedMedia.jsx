import { insertMediaTypeField } from "@/helpers";
import usePagination, {
  nextPageAction,
  previousPageAction,
} from "@/hooks/usePagination";
import useScrollToElement from "@/hooks/useScrollToElement";
import { fetchData } from "@/utils";
import { useMemo, useRef, useState } from "react";
import MediaSectionGrid from "./media/MediaSectionGrid";
import PaginationButtons from "./pagination-buttons";

export default function PaginatedMedia({ initMovies, totalPages, type }) {
  const { page, dispatchPagination } = usePagination(1);
  const [movies, setMovies] = useState(initMovies);

  const containerRef = useRef(null);
  const optionsMemo = useMemo(function cacheOptions() {
    return {};
  }, []);

  useScrollToElement(containerRef, optionsMemo);

  async function handleNext() {
    if (page === totalPages) return;

    dispatchPagination(nextPageAction(1, totalPages));
    const movies = await fetchMedia(type, page + 1);
    setMovies(movies);
  }

  async function handlePrevious() {
    if (page === 1) return;
    dispatchPagination(previousPageAction(1));
    const movies = await fetchMedia(type, page - 1);
    setMovies(movies);
  }

  return (
    <div ref={containerRef}>
      <MediaSectionGrid
        heading={type === "movies" ? "movies" : "tv-series"}
        mediaData={movies}
      />
      <PaginationButtons
        page={page}
        totalPages={totalPages}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </div>
  );
}

async function fetchMedia(type = "movies", page = 1) {
  try {
    const movies = await fetchData(
      `/api/media?page=${page}&media_type=${type}`,
    );
    insertMediaTypeField(movies, "movie");
    return movies;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
