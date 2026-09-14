"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

export function useRouteTransition() {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return { isTransitioning };
}
