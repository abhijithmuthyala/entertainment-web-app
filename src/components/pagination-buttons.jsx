export default function PaginationButtons({
  previousButton,
  nextButton,
  children,
}) {
  return (
    <div className="fixed bottom-5 left-1/2 z-50 mx-auto flex -translate-x-1/2 items-center justify-center gap-4 p-2 backdrop-blur-sm">
      {previousButton}
      {children}
      {nextButton}
    </div>
  );
}

export function PaginationButton({ onClick, children, disabled }) {
  return (
    <button
      className="rounded-sm bg-highlight px-3 py-2 font-bold disabled:cursor-not-allowed disabled:opacity-50"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
