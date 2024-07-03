import { useRouter } from "next/router";

import { useContext, useState } from "react";

import FeedbackMessage from "./FeedbackMessage";
import MediaSectionGrid from "./media/MediaSectionGrid";

import { SearchContext } from "@/context/search";

import { MAX_PAGINATION_PAGES } from "@/constants";
import { formatData } from "@/helpers";

export default function SearchResults({ data }) {
  const router = useRouter();
  const { updateSearchResults } = useContext(SearchContext);

  if (data.results.length === 0) {
    return <FeedbackMessage message="No results found." />;
  }

  const formattedData = formatData(data);
  const isBookmarksPage = router.pathname === "/bookmarks";

  function onPageChange(newPage) {
    const normalisedQuery = router.query.search || "";
    updateSearchResults(normalisedQuery, newPage);
    router.replace(
      `${router.pathname}?search=${normalisedQuery}&page=${newPage}`,
      undefined,
      { shallow: true },
    );
  }

  return (
    <>
      <MediaSectionGrid
        heading={"Search results"}
        mediaData={formattedData.results}
      />
      {!isBookmarksPage && (
        <Pagination
          totalPages={formattedData.totalPages}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
}

function Pagination({ totalPages, onPageChange }) {
  const [page, setPage] = useState(1);

  const maxPages = Math.min(totalPages, MAX_PAGINATION_PAGES);

  function handleNextPage() {
    handlePageChange(page + 1);
  }

  function handlePreviousPage() {
    handlePageChange(page - 1);
  }

  function handlePageChange(newPage) {
    setPage(newPage);
    onPageChange(newPage);
  }

  return (
    <div className="flex items-center justify-center gap-4 py-20">
      <PaginationButton onClick={handlePreviousPage} disabled={page === 1}>
        Previous
      </PaginationButton>
      <span className="bg-background-muted px-4 py-2">
        Page {page} of {maxPages}
      </span>
      <PaginationButton onClick={handleNextPage} disabled={page === maxPages}>
        Next
      </PaginationButton>
    </div>
  );
}

function PaginationButton({ children, onClick, disabled }) {
  return (
    <button
      className="rounded-md bg-highlight bg-opacity-50 px-4 py-2 font-bold text-primary"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
