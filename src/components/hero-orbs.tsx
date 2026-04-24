"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function HeroOrbs() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 800], [0, 150]);
  const y2 = useTransform(scrollY, [0, 800], [0, -100]);
  const y3 = useTransform(scrollY, [0, 800], [0, 80]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        style={{ y: y1 }}
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute -left-24 top-24 h-96 w-96 rounded-full bg-blue-500/20 blur-[100px]"
      />
      <motion.div
        style={{ y: y2 }}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -right-24 top-8 h-[30rem] w-[30rem] rounded-full bg-violet-500/20 blur-[100px]"
      />
      <motion.div
        style={{ y: y3 }}
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.05, 0.15, 0.05]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute left-1/3 top-[30rem] h-80 w-80 rounded-full bg-emerald-500/10 blur-[100px]"
      />
    </div>
  );
}
