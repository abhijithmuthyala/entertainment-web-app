import { useEffect, useState } from "react";

export default function useQuery(fetcher, onSuccess, onError) {
  const [state, setState] = useState("idle"); // idle, pending, error
  const [error, setError] = useState(null); // null, any
  const [data, setData] = useState(null); // null, any

  useEffect(function queryEffect() {
    (async function fetchData() {
      try {
        let ignore = false;
        const data = await fetcher();

        if (ignore) return;

        setData(data);
        setError(null);
        setState("idle");
        onSuccess(data);
      } catch (error) {
        setError(error instanceof Error ? error : new Error(err));
        setState("error");
        setData(null);
        onError(error);
      }
    })();

    return function ignoreStaleData() {
      ignore = true;
    };
  }, []);

  return { state, data, error };
}
