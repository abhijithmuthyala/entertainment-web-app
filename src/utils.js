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

// courtesy Github copilot, idk regex
export function toCamelCase(string) {
  return string
    .replace(/([-_][a-z])/gi, ($1) => $1.toUpperCase().replace("_", ""))
    .replace(/^([A-Z])/, (match) => match.toLowerCase());
}

export function formatData(data, requiredFields = null) {
  const formattedData = {};

  for (const key in data) {
    const formattedKey = toCamelCase(key);
    if (!requiredFields) {
      formattedData[formattedKey] = data[key];
      continue;
    }
    if (requiredFields.has(formattedKey)) {
      formattedData[formattedKey] = data[key];
    }
  }

  return formattedData;
}
