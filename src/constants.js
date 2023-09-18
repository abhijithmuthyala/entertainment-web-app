export const API = {
  base: "https://api.themoviedb.org/3",
  keyQueryParam: `api_key=${process.env.KEY}`,
  search(query) {
    return `${this.base}/search/multi?query=${query}&${this.keyQueryParam}`;
  },
  details(id) {
    return `${this.base}/movie/${id}?${this.keyQueryParam}`;
  },
  get trending() {
    return `${this.base}/trending/movie/day?language=en-US&${this.keyQueryParam}&append_to_response=images`;
  },
  image(path) {
    return `https://image.tmdb.org/t/p/original${path}`;
  },
};

export async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export const HORIZONTAL_SCROLL_UNITS = 5;

export const SEARCH_LABELS = {
  "/": "Search for movies or TV series",
  "/movies": "Search for movies",
  "/tv-series": "Search for TV series",
  "/bookmarks": "Search for bookmarked shows",
};
