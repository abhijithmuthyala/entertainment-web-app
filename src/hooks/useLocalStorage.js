import { useEffect, useState } from "react";
import useFirstRenderRef from "./useFirstRender";

export default function useLocalStorage(key) {
  const [data, setData] = useState([]);
  const isFirstRender = useFirstRenderRef().current;

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
      if (isFirstRender) return;
      localStorage.setItem(key, JSON.stringify(data));
    },
    [key, data, isFirstRender],
  );

  return [data, setData];
}
