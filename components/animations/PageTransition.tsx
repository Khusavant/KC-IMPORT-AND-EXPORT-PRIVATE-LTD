"use client";

import React from "react";
import { motion, AnimatePresence, useReducedMotion, Variants } from "framer-motion";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  const variants: Variants = {
    initial: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 16, filter: "blur(4px)" },
    animate: shouldReduceMotion
      ? { opacity: 1, transition: { duration: 0.01 } }
      : {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
        },
    exit: shouldReduceMotion
      ? { opacity: 0, transition: { duration: 0.01 } }
      : {
          opacity: 0,
          y: -8,
          filter: "blur(2px)",
          transition: { duration: 0.2, ease: "easeIn" },
        },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex-1 flex flex-col w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default PageTransition;
