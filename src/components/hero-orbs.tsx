"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function HeroOrbs() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 800], [0, 120]);
  const y2 = useTransform(scrollY, [0, 800], [0, -80]);
  const y3 = useTransform(scrollY, [0, 800], [0, 60]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        style={{ y: y1 }}
        className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute -right-24 top-8 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl"
      />
      <motion.div
        style={{ y: y3 }}
        className="absolute left-1/3 top-[26rem] h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl"
      />
    </div>
  );
}

