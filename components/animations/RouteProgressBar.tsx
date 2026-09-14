"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

export default function RouteProgressBar() {
  const pathname = usePathname();
  const [stage, setStage] = useState<"idle" | "running" | "completing">("idle");
  const [progress, setProgress] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // On route start: width 0% → 80% over 400ms
    setOpacity(1);
    setProgress(0);
    setStage("running");

    const t1 = setTimeout(() => {
      setProgress(80);
    }, 20);

    // On route complete: width 80% → 100% over 150ms, then opacity 0
    const t2 = setTimeout(() => {
      setProgress(100);
      setStage("completing");
    }, 420);

    const t3 = setTimeout(() => {
      setOpacity(0);
    }, 570);

    const t4 = setTimeout(() => {
      setProgress(0);
      setStage("idle");
    }, 750);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [pathname]);

  if (stage === "idle" && opacity === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none h-[3px]"
      style={{ opacity, transition: "opacity 150ms ease-out" }}
    >
      <div
        className="h-full bg-amber-500 shadow-[0_0_8px_rgba(245,166,35,0.9)]"
        style={{
          width: `${progress}%`,
          transition:
            stage === "running"
              ? "width 400ms cubic-bezier(0.1, 0.5, 0.3, 1)"
              : "width 150ms ease-out",
        }}
      />
    </div>
  );
}
