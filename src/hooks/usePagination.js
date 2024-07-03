import { useState } from "react";

export default function usePagination(initPage) {
  const [page, setPage] = useState(initPage);

  function onNext() {
    setPage((page) => page + 1);
  }

  function onPrevious() {
    setPage((page) => page - 1);
  }

  return {
    page,
    onNext,
    onPrevious,
  };
}
