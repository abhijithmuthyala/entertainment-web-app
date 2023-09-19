export function formatData(data) {
  const formattedData = {};

  for (const key in data) {
    const formattedKey = key
      .split("_")
      .map((word, index) => {
        if (index === 0) {
          return word.toLowerCase();
        }
        return word.replace(word[0], word[0].toUpperCase());
      })
      .join("");
    formattedData[formattedKey] = data[key];
  }

  return formattedData;
}

export function insertMediaTypeField(data, mediaType) {
  data.forEach((mediaData) => (mediaData.media_type = mediaType));
}
