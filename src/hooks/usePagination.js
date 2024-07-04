import { useReducer } from "react";

function paginationReducer(page, action) {
  switch (action.type) {
    case "next":
      return page + action.step ?? 1;
    case "previous":
      return page - action.step ?? 1;
    default:
      return page;
  }
}

export function nextPageAction(step = 1) {
  return {
    type: "next",
    step,
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
