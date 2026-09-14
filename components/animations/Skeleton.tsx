"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton({ className = "", style }: SkeletonProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      animate={reduced ? { opacity: 0.8 } : { opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      className={`bg-gray-200 ${className}`}
      style={style}
    />
  );
}

export default Skeleton;
