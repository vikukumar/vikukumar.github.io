"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme/theme-provider";

export function ThemeToggle() {
  const { preference, resolved, cyclePreference } = useTheme();

  const Icon = preference === "system" ? Monitor : resolved === "dark" ? Moon : Sun;

  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-card/50 px-3 py-2 text-xs text-muted transition hover:bg-card hover:text-fg"
      aria-label="Toggle theme"
      onClick={(e) => cyclePreference({ x: e.clientX, y: e.clientY })}
      title={`Theme: ${preference}`}
    >
      <Icon className="h-4 w-4" />
      <span className="hidden sm:inline">{preference}</span>
    </button>
  );
}

