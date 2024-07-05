import { useEffect } from "react";

const defaultOptions = {
  behavior: "smooth",
  block: "start",
  inline: "nearest",
};

export default function useScrollToElement(ref, options = {}) {
  options = { ...defaultOptions, ...options };

  useEffect(
    function scrollToElement() {
      if (ref.current) {
        ref.current.scrollIntoView(options);
      }
    },
    [ref, options],
  );
}
