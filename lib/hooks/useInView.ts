import { useState, useEffect, useRef } from "react";

export function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const currentElem = ref.current;
    if (!currentElem) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          // Optional: once in view, disconnect observer to avoid re-triggering overhead
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(currentElem);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return { ref, inView };
}
