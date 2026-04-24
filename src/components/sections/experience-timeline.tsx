"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { Card } from "@/components/ui/card";
import { PROFILE } from "@/data/profile";
import { Reveal, RevealItem } from "@/components/reveal";

export function ExperienceTimeline() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <div ref={ref} className="relative">
      <div aria-hidden="true" className="absolute left-3 top-0 h-full w-px bg-border/40" />
      <motion.div
        aria-hidden="true"
        className="absolute left-3 top-0 h-full w-px origin-top bg-brand shadow-[0_0_15px_rgba(var(--brand),0.5)]"
        style={{ scaleY: scrollYProgress }}
      />

      <Reveal staggerChildren={0.15} className="grid gap-12 pl-12">
        {PROFILE.experience.map((e, idx) => (
          <RevealItem key={`${e.company}-${e.role}-${e.period}`} className="relative">
            <div className="absolute -left-[2.75rem] top-7 h-4 w-4 rounded-full border-2 border-brand bg-card shadow-glow" />
            <Card className="p-8 bg-card/40 border-border/50 hover:border-brand/30 transition-all">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-bold text-fg">{e.role}</h3>
                  <p className="text-sm font-medium text-brand">{e.company}</p>
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-muted bg-white/5 px-3 py-1 rounded-full border border-white/5">
                  {e.period}
                </div>
              </div>
              <ul className="mt-6 grid gap-3">
                {e.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm text-muted leading-relaxed">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand/50" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </RevealItem>
        ))}
      </Reveal>
    </div>
  );
}
