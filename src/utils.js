export function insertMediaTypeField(data, mediaType) {
  data.forEach((mediaData) => (mediaData.media_type = mediaType));
}

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
