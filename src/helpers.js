import { toCamelCase } from "./utils";

export function insertMediaTypeField(data, mediaType) {
  data.forEach((mediaData) => (mediaData.media_type = mediaType));
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
