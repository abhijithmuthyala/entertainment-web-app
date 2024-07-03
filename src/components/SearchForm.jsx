export default function SearchForm({ query, onChange }) {
  const label = "Search for movies, tv-series and people";

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="max-lg:px-2 max-lg:py-3">
      <form
        action="/"
        onSubmit={handleSubmit}
        className="rounded-md bg-background-muted px-2 py-3 focus-within:outline focus-within:outline-1 focus-within:outline-highlight lg:px-4"
      >
        <label htmlFor="search" className="sr-only">
          {label}
        </label>
        <div className="flex flex-row-reverse flex-wrap items-center gap-x-4 ">
          <input
            type="search"
            name="search"
            id="search"
            value={query}
            onChange={onChange}
            placeholder={label}
            className="grow px-1 placeholder:opacity-75 focus:outline-none md:text-xl"
          />
          <button
            type="submit"
            aria-label={`Search for ${query}`}
            className="aspect-square w-6 bg-search bg-contain bg-center bg-no-repeat invert"
          />
        </div>
      </form>
    </div>
  );
}
