import { insertMediaTypeField } from "./helpers";

export function toggleKey(set, key) {
  if (set.has(key)) {
    set.delete(key);
  } else set.add(key);
}

export function titleCase(sentence) {
  if (!sentence) return sentence;
  return sentence
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export async function fetchData(url, options = {}) {
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
  } catch (error) {
    error;
    throw new Error(error);
  }
}

export async function fetchMedia(type = "movies", page = 1) {
  try {
    const movies = await fetchData(
      `/api/media?page=${page}&media_type=${type}`,
    );
    insertMediaTypeField(movies, "movie");
    return movies;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

// courtesy Github copilot, idk regex
export function toCamelCase(string) {
  return string
    .replace(/([-_][a-z])/gi, ($1) => $1.toUpperCase().replace("_", ""))
    .replace(/^([A-Z])/, (match) => match.toLowerCase());
}

export function debounce(fn, delay) {
  let deferredCallbackId = null;

  return function debounced(...args) {
    if (deferredCallbackId !== null) {
      clearTimeout(deferredCallbackId);
    }
    deferredCallbackId = setTimeout(function executeDeferredFn() {
      fn(...args);
    }, delay);
  };
}
