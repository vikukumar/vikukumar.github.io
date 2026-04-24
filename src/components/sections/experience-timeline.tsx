 "use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { Card } from "@/components/ui/card";
import { PROFILE } from "@/data/profile";
import { Reveal } from "@/components/reveal";

export function ExperienceTimeline() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <div ref={ref} className="relative">
      <div aria-hidden="true" className="absolute left-3 top-0 h-full w-px bg-border/70" />
      <motion.div
        aria-hidden="true"
        className="absolute left-3 top-0 h-full w-px origin-top bg-gradient-to-b from-blue-400 via-violet-400 to-emerald-400"
        style={{ scaleY: scrollYProgress }}
      />

      <div className="grid gap-6 pl-10">
        {PROFILE.experience.map((e, idx) => (
          <Reveal key={`${e.company}-${e.role}-${e.period}`} delay={Math.min(idx * 0.04, 0.2)}>
            <div className="relative">
              <div className="absolute -left-[2.2rem] top-7 h-3 w-3 rounded-full border border-border/70 bg-card/70 shadow-glow" />
              <Card className="p-6">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div className="text-lg font-semibold">{e.role}</div>
                  <div className="text-sm text-muted">{e.period}</div>
                </div>
                <div className="mt-1 text-sm text-muted">{e.company}</div>
                <ul className="mt-4 grid gap-2 text-sm text-muted">
                  {e.highlights.map((h) => (
                    <li key={h}>• {h}</li>
                  ))}
                </ul>
              </Card>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
