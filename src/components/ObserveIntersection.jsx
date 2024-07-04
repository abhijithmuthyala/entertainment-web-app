import { useEffect, useMemo, useRef } from "react";

const defaultOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 1.0,
};

export default function ObserveIntersection({
  onIntersection,
  options = {},
  className = "",
  children,
}) {
  const ref = useRef(null);
  const mergedOptionsMemo = useMemo(
    function memoiseOptions() {
      return Object.assign({ ...defaultOptions }, options);
    },
    [options],
  );
  useIntersectionObserver(ref, mergedOptionsMemo, onIntersection);

  return (
    <div className="relative">
      {children}
      <div
        ref={ref}
        className={`absolute bottom-0 h-8 w-full ${className}`}
      ></div>
    </div>
  );
}

function useIntersectionObserver(nodeRef, options, onIntersection) {
  useEffect(
    function observeIntersectionEffect() {
      const node = nodeRef.current;
      const observer = new IntersectionObserver(observerCallback, options);
      observer.observe(node);

      function observerCallback([entry]) {
        if (!entry.isIntersecting) return;
        onIntersection(entry);
      }

      return function unobserveIntersection() {
        observer.unobserve(node);
      };
    },
    [options, nodeRef, onIntersection],
  );
}
