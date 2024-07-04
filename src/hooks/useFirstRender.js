import { useEffect, useRef } from "react";

export default function useFirstRenderRef() {
  const isFirstRenderRef = useRef(true);

  useEffect(function incrementRenderCountEffect() {
    isFirstRenderRef.current = false;
  }, []);

  return isFirstRenderRef;
}
