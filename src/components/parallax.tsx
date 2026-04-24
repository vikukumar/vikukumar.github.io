"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Parallax({
  children,
  offset = 50,
  className
}: {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
