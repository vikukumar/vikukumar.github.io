"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const links = [
  { href: "#github", label: "GitHub" },
  { href: "#skills", label: "Skills" },
  { href: "#story", label: "Story" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" }
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = useMemo(() => links, []);

  return (
    <div
      className={cn(
        "fixed top-0 z-40 w-full border-b transition",
        scrolled ? "border-border/80 bg-bg/60 backdrop-blur" : "border-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight hover:opacity-80 transition-opacity">
          <img src="/favicon.png" alt="VK" className="h-6 w-6 rounded-md shadow-glow-sm" />
          <span>VK<span className="text-brand">.</span></span>
        </a>
        <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
          {items.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-fg">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-border/70 bg-card/50 p-2 text-fg md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className={cn("md:hidden", open ? "block" : "hidden")}>
        <div className="container pb-4">
          <div className="glass rounded-xl p-4">
            <nav className="grid gap-3 text-sm text-muted">
              {items.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="rounded-lg px-2 py-2 hover:bg-white/5 hover:text-fg"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
