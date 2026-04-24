"use client";

import { PROFILE } from "@/data/profile";
import { motion, useScroll, useTransform } from "framer-motion";

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function Starfield() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1200], [0, 90]);

  const rand = mulberry32(PROFILE.starSeed);
  const stars = Array.from({ length: 120 }, (_, idx) => {
    const left = Math.floor(rand() * 1000) / 10;
    const top = Math.floor(rand() * 1000) / 10;
    const size = 1 + rand() * 2.2;
    const delay = rand() * 4;
    const duration = 3 + rand() * 4;
    const opacity = 0.15 + rand() * 0.85;
    return { idx, left, top, size, delay, duration, opacity };
  });

  return (
    <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ y }}>
      {stars.map((s) => (
        <span
          key={s.idx}
          className="star"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`
          }}
        />
      ))}
    </motion.div>
  );
}
