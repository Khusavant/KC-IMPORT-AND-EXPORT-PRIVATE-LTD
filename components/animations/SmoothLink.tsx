"use client";

import React from "react";
import Link, { LinkProps } from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export interface SmoothLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  target?: string;
  rel?: string;
}

export default function SmoothLink({
  children,
  className = "",
  wrapperClassName = "",
  prefetch = true,
  ...props
}: SmoothLinkProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className={`inline-block ${wrapperClassName}`}
    >
      <Link prefetch={prefetch} className={`transition-colors hover:text-amber-500 ${className}`} {...props}>
        {children}
      </Link>
    </motion.div>
  );
}
