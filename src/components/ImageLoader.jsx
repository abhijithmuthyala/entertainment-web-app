"use client";

import { IMAGE_LOAD_TIMEOUT } from "@/constants";
import { useEffect, useRef, useState } from "react";

export default function ImageLoader(props) {
  const [imageState, setImageState] = useState({
    loading: true,
    failed: false,
  });
  const timerRef = useRef(null);

  useEffect(function setLoadingTimeout() {
    setTimeout(function () {
      setImageState((imageState) => {
        return { loading: false, failed: imageState.loading };
      });
    }, IMAGE_LOAD_TIMEOUT);
  }, []);

  function handleError() {
    if (imageState.failed) return;
    setImageState({ loading: false, failed: true });
  }

  function handleLoad() {
    clearTimeout(timerRef.current);
    setImageState((imageState) => {
      return { ...imageState, loading: false };
    });
  }

  return (
    <span
      className={`relative block max-h-max ${
        imageState.failed
          ? `bg-gradient-to-b from-[#000c33] to-[#5e688c] shadow-inner brightness-50`
          : ""
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={props.alt}
        src={props.src}
        width={props.width}
        height={props.height}
        priority={props.priority}
        onLoad={handleLoad}
        onError={handleError}
        className={`${props.className} ${
          imageState.loading ? "animate-pulse" : ""
        } ${
          !imageState.loading && !imageState.failed ? "animate-scale-in" : ""
        }`}
      />
    </span>
  );
}
