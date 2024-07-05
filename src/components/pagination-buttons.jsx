export default function PaginationButtons({
  page,
  totalPages,
  onNext,
  onPrevious,
}) {
  return (
    <div className="fixed bottom-5 left-1/2 z-50 mx-auto flex -translate-x-1/2 items-center justify-center gap-4 p-2 backdrop-blur-sm">
      <PaginationButton onClick={onPrevious}>Previous</PaginationButton>
      Page {page} of {totalPages}
      <PaginationButton onClick={onNext}>Next</PaginationButton>
    </div>
  );
}

function PaginationButton({ onClick, children }) {
  return (
    <button
      className="rounded-sm bg-highlight px-3 py-2 font-bold"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
