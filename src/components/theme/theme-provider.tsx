"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type ThemePreference = "system" | "dark" | "light";
export type ResolvedTheme = "dark" | "light";

type ThemeContextValue = {
  preference: ThemePreference;
  resolved: ResolvedTheme;
  setPreference: (pref: ThemePreference, origin?: { x: number; y: number }) => void;
  cyclePreference: (origin?: { x: number; y: number }) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ? "dark" : "light";
}

function resolveTheme(pref: ThemePreference): ResolvedTheme {
  return pref === "system" ? getSystemTheme() : pref;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>("system");
  const [resolved, setResolved] = useState<ResolvedTheme>("dark");
  const [flash, setFlash] = useState<{ key: number; theme: ResolvedTheme; origin: { x: number; y: number } } | null>(
    null
  );

  useEffect(() => {
    const pref = (document.documentElement.dataset.themePref as ThemePreference | undefined) ?? "system";
    setPreferenceState(pref);
    setResolved((document.documentElement.dataset.theme as ResolvedTheme | undefined) ?? resolveTheme(pref));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!mql) return;

    const onChange = () => {
      setResolved((current) => {
        const next = preference === "system" ? getSystemTheme() : current;
        document.documentElement.dataset.theme = next;
        return next;
      });
    };

    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, [preference]);

  const apply = useCallback((pref: ThemePreference, origin?: { x: number; y: number }) => {
    const nextResolved = resolveTheme(pref);
    setPreferenceState(pref);
    setResolved(nextResolved);

    document.documentElement.dataset.themePref = pref;
    document.documentElement.dataset.theme = nextResolved;
    try {
      localStorage.setItem("theme", pref);
    } catch {
      // ignore (storage unavailable)
    }

    const fallbackOrigin = origin ?? { x: Math.round(window.innerWidth / 2), y: Math.round(window.innerHeight / 6) };
    setFlash({ key: Date.now(), theme: nextResolved, origin: fallbackOrigin });
  }, []);

  const cyclePreference = useCallback(
    (origin?: { x: number; y: number }) => {
      const next: ThemePreference =
        preference === "system" ? "dark" : preference === "dark" ? "light" : "system";
      apply(next, origin);
    },
    [apply, preference]
  );

  const value = useMemo<ThemeContextValue>(
    () => ({ preference, resolved, setPreference: apply, cyclePreference }),
    [apply, cyclePreference, preference, resolved]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {flash ? (
          <motion.div
            key={flash.key}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[60]"
            initial={{ opacity: 0.9, clipPath: `circle(0% at ${flash.origin.x}px ${flash.origin.y}px)` }}
            animate={{ opacity: 0, clipPath: `circle(160% at ${flash.origin.x}px ${flash.origin.y}px)` }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background:
                flash.theme === "dark"
                  ? "radial-gradient(900px 500px at 30% 20%, rgba(59,130,246,0.25), transparent 60%), radial-gradient(700px 400px at 75% 25%, rgba(168,85,247,0.22), transparent 62%), rgb(7,9,17)"
                  : "radial-gradient(900px 500px at 30% 20%, rgba(59,130,246,0.20), transparent 60%), radial-gradient(700px 400px at 75% 25%, rgba(168,85,247,0.14), transparent 62%), rgb(250,251,255)"
            }}
            onAnimationComplete={() => setFlash(null)}
          />
        ) : null}
      </AnimatePresence>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
