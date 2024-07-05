import { useReducer } from "react";

function paginationReducer(page, action) {
  switch (action.type) {
    case "next":
      if (page === action.totalPages) return page;
      return page + action.step ?? 1;
    case "previous":
      if (page === 1) return page;
      return page - action.step ?? 1;
    default:
      return page;
  }
}

export function nextPageAction(step = 1, totalPages) {
  return {
    type: "next",
    step,
    totalPages,
  };
}

export function previousPageAction(step = 1) {
  return {
    type: "previous",
    step,
  };
}

export default function usePagination(initPage) {
  const [page, dispatchPagination] = useReducer(paginationReducer, initPage);

  return { page, dispatchPagination };
}
