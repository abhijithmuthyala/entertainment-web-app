import { useEffect, useState } from "react";

export default function useLocalStorage(key) {
  const [data, setData] = useState([]);

  useEffect(
    function getLocalBookmarks() {
      const localData = localStorage.getItem(key);
      if (localData) {
        setData(JSON.parse(localData));
      }
    },
    [key],
  );

  useEffect(
    function setLocalBookmarks() {
      localStorage.setItem(key, JSON.stringify(data));
    },
    [key, data],
  );

  return [data, setData];
}
