const tmdbBaseUrl = "https://api.themoviedb.org/3";
const tmdbImageBaseUrl = "https://image.tmdb.org/t/p/original";
const keyQueryParam = `api_key=${process.env.KEY}`;

export const API = {
  search(query) {
    return `${tmdbBaseUrl}/search/multi?query=${query}&${keyQueryParam}`;
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

export async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export const HORIZONTAL_SCROLL_UNITS = 10;

export const SEARCH_LABELS = {
  "/": "Search for movies or TV series",
  "/movies": "Search for movies",
  "/tv-series": "Search for TV series",
  "/bookmarks": "Search for bookmarked shows",
};
