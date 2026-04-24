"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function ScrollScene() {
  const { scrollYProgress } = useScroll();
  const hue = useTransform(scrollYProgress, [0, 1], [0, 36]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 18]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const filter = useTransform(hue, (h) => `hue-rotate(${h}deg)`);
  const y2 = useTransform(y, (v) => v * 0.8);
  const y3 = useTransform(y, (v) => v * 1.15);
  const r2 = useTransform(rotate, (r) => -r);
  const r3 = useTransform(rotate, (r) => r * 1.4);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ filter }}
    >
      <motion.div
        className="absolute -left-40 top-24 h-[32rem] w-[32rem] rounded-full bg-blue-500/10 blur-3xl"
        style={{ y, rotate }}
      />
      <motion.div
        className="absolute -right-44 top-10 h-[36rem] w-[36rem] rounded-full bg-violet-500/10 blur-3xl"
        style={{ y: y2, rotate: r2 }}
      />
      <motion.div
        className="absolute left-1/3 top-[60vh] h-[30rem] w-[30rem] rounded-full bg-emerald-500/8 blur-3xl"
        style={{ y: y3, rotate: r3 }}
      />
    </motion.div>
  );
}
