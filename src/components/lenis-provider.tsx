"use client";

import Lenis from "lenis";
import { useEffect, useRef } from "react";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (prefersReducedMotion) return;

    document.documentElement.classList.add("lenis");
    document.documentElement.classList.add("lenis-smooth");

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.85,
      lerp: 0.085,
      autoRaf: true,
      anchors: true
    });
    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      document.documentElement.classList.remove("lenis");
      document.documentElement.classList.remove("lenis-smooth");
    };
  }, []);

  return <>{children}</>;
}
