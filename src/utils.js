export function toggleKey(set, key) {
  if (set.has(key)) {
    set.delete(key);
  } else set.add(key);
}

export function titleCase(sentence) {
  return sentence
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
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
