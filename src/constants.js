export const tmdbBaseUrl = "https://api.themoviedb.org/3";
export const tmdbImageBaseUrl = "https://image.tmdb.org/t/p";

export const API = {
  search(type = "multi", query, page = 1) {
    return `${tmdbBaseUrl}/search/${type}?query=${query}&page=${page}`;
  },
  details(type, id) {
    return `${tmdbBaseUrl}/${type}/${id}`;
  },
  credits(type, id) {
    return `${tmdbBaseUrl}/${type}/${id}/credits`;
  },
  trending: `${tmdbBaseUrl}/trending/all/day?language=en-US&append_to_response=images`,
  image(path, width = "w500") {
    return `${tmdbImageBaseUrl}/${width}/${path}`;
  },
  images(type, id) {
    return `${tmdbBaseUrl}/${type}/${id}/images`;
  },
  popular: {
    movies: `${tmdbBaseUrl}/movie/popular?language=en-US&page=1&append_to_response=images`,
    tv: `${tmdbBaseUrl}/tv/popular?language=en-US&page=1&append_to_response=images`,
  },
  movies(page = 1) {
    return `${tmdbBaseUrl}/discover/movie?language=en-US&page=${page}&append_to_response=images`;
  },
  tv(page = 1) {
    return `${tmdbBaseUrl}/discover/tv?language=en-US&page=${page}&append_to_response=images`;
  },
};

export const HORIZONTAL_SCROLL_UNITS = 10;
export const DEBOUNCE_THRESHOLD = 400;
export const MAX_PAGINATION_PAGES = 10;
export const PREVIEW_UNITS = 20;
export const EAGER_LOAD_UNITS = 4;
