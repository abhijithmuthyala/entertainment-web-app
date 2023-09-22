import { useRouter } from "next/router";

import { useState } from "react";

import { SEARCH_LABELS } from "@/constants";

export default function SearchForm() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const label = SEARCH_LABELS[router.pathname];

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleChange(event) {
    setSearchQuery(event.target.value);
  }

  return (
    <div className="py-3 max-lg:px-2">
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
            value={searchQuery}
            onChange={handleChange}
            placeholder={label}
            className="grow px-1 placeholder:opacity-75 focus:outline-none"
          />
          <button
            type="submit"
            aria-label={`Search for ${searchQuery}`}
            className="aspect-square w-6 bg-search bg-contain bg-center bg-no-repeat"
          />
        </div>
      </form>
    </div>
  );
}
