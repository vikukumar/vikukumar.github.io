"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export function CursorGlow() {
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const sx = useSpring(x, { stiffness: 300, damping: 40, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 300, damping: 40, mass: 0.6 });
  const xPx = useTransform(sx, (v) => `${v}px`);
  const yPx = useTransform(sy, (v) => `${v}px`);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReducedMotion) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ "--x": xPx, "--y": yPx } as Record<string, unknown>}
    >
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(320px 320px at var(--x) var(--y), rgba(96,165,250,0.18), transparent 62%), radial-gradient(420px 420px at calc(var(--x) + 160px) calc(var(--y) + 120px), rgba(168,85,247,0.12), transparent 64%)"
        }}
      />
    </motion.div>
  );
}
