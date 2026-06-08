"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function CursorGlow() {
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const [angle, setAngle] = useState(0);
  const sx = useSpring(x, { stiffness: 420, damping: 38, mass: 0.45 });
  const sy = useSpring(y, { stiffness: 420, damping: 38, mass: 0.45 });
  const tx = useTransform(sx, (v) => `${v - 18}px`);
  const ty = useTransform(sy, (v) => `${v - 18}px`);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReducedMotion || window.matchMedia?.("(pointer: coarse)")?.matches) return;

    let lastX = -9999;
    let lastY = -9999;

    const onMove = (e: PointerEvent) => {
      if (lastX > -1000) {
        setAngle((Math.atan2(e.clientY - lastY, e.clientX - lastX) * 180) / Math.PI + 90);
      }
      lastX = e.clientX;
      lastY = e.clientY;
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.classList.add("spaceship-cursor");

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.classList.remove("spaceship-cursor");
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-9 w-9 will-change-transform md:block"
      style={{ x: tx, y: ty, rotate: angle }}
    >
      <div className="absolute left-1/2 top-[1.85rem] h-12 w-4 -translate-x-1/2 rounded-full bg-gradient-to-b from-cyan-300/50 via-blue-500/20 to-transparent blur-sm" />
      <div className="absolute inset-0 rounded-full bg-brand/15 blur-xl" />
      <svg viewBox="0 0 40 40" className="relative h-9 w-9 drop-shadow-[0_0_12px_rgb(var(--brand)/0.65)]">
        <path
          d="M20 3 30 31 20 26 10 31 20 3Z"
          fill="rgb(var(--fg))"
          stroke="rgb(var(--brand))"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M20 9 24 25 20 22 16 25 20 9Z" fill="rgb(var(--brand))" opacity="0.75" />
        <circle cx="20" cy="18" r="3.2" fill="#0f172a" stroke="rgb(var(--brand))" strokeWidth="1.2" />
      </svg>
    </motion.div>
  );
}
