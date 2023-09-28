const tmdbBaseUrl = "https://api.themoviedb.org/3";
const tmdbImageBaseUrl = "https://image.tmdb.org/t/p/original";
const keyQueryParam = `api_key=${process.env.KEY}`;

export const API = {
  search(type = "multi", query, page = 1) {
    return `${tmdbBaseUrl}/search/${type}?query=${query}&${keyQueryParam}&page=${page}`;
  },
  details(id) {
    return `${tmdbBaseUrl}/movie/${id}?${keyQueryParam}`;
  },
  trending: `${tmdbBaseUrl}/trending/all/day?language=en-US&${keyQueryParam}&append_to_response=images`,
  image(path) {
    return `${tmdbImageBaseUrl}${path}`;
  },
  popular: {
    movies: `${tmdbBaseUrl}/movie/popular?${keyQueryParam}&language=en-US&page=1&append_to_response=images`,
    tv: `${tmdbBaseUrl}/tv/popular?${keyQueryParam}&language=en-US&page=1&append_to_response=images`,
  },
  movies: `${tmdbBaseUrl}/discover/movie?${keyQueryParam}&language=en-US&page=1&append_to_response=images`,
  series: `${tmdbBaseUrl}/discover/tv?${keyQueryParam}&language=en-US&page=1&append_to_response=images`,
};

export const HORIZONTAL_SCROLL_UNITS = 10;
export const DEBOUNCE_THRESHOLD = 400;
export const MAX_PAGINATION_PAGES = 10;
