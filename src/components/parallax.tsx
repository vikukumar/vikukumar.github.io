"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
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
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [3, -3]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-4, 4]);

  return (
    <div ref={ref} className={className} style={{ perspective: 1200 }}>
      <motion.div
        style={{
          y: reduceMotion ? 0 : y,
          rotateX: reduceMotion ? 0 : rotateX,
          rotateY: reduceMotion ? 0 : rotateY,
          transformStyle: "preserve-3d"
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
