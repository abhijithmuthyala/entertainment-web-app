import usePagination, {
  nextPageAction,
  previousPageAction,
} from "@/hooks/usePagination";
import useScrollToElement from "@/hooks/useScrollToElement";
import { fetchMedia } from "@/utils";
import { useMemo, useRef, useState } from "react";
import MediaSectionGrid from "./media/MediaSectionGrid";
import PaginationButtons, { PaginationButton } from "./pagination-buttons";

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
        previousButton={
          <PaginationButton disabled={page <= 1} onClick={handlePrevious}>
            Previous
          </PaginationButton>
        }
        nextButton={
          <PaginationButton disabled={page >= totalPages} onClick={handleNext}>
            Next
          </PaginationButton>
        }
      >
        Page {page} of {totalPages}
      </PaginationButtons>
    </div>
  );
}
