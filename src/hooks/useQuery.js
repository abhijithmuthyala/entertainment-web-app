import { useEffect, useState } from "react";

export default function useQuery(fetcher, onSuccess = null, onError = null) {
  const [status, setStatus] = useState("idle"); // idle, pending, error, success
  const [error, setError] = useState(null); // null, any

  useEffect(
    function queryEffect() {
      let ignore = false;

      (async function fetchData() {
        try {
          setStatus("pending");
          setError(null);
          const data = await fetcher();

          if (ignore) return;

          setStatus("success");

          if (onSuccess) {
            onSuccess(data);
          }
        } catch (error) {
          setError(error instanceof Error ? error : new Error(err));
          setStatus("error");

          if (onError) {
            onError(error);
          }
        }
      })();

      return function ignoreStaleData() {
        ignore = true;
      };
    },
    [onSuccess, onError, fetcher],
  );

  return { status, error };
}
