"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PROFILE } from "@/data/profile";
import { CompanyIcon } from "@/components/company-icon";

const STEPS = [...PROFILE.experience].reverse();
type ExperienceRole = (typeof PROFILE.experience)[number];

function StepCard({ step, index }: { step: ExperienceRole; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.8, 1, 1, 0.8]);
  const x = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [100, 0, 0, -100]);
  const rotateX = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [8, 0, 0, -8]);
  const rotateY = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [-3, 0, 0, 3]);
  const z = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [-60, 0, 0, -60]);

  return (
    <div
      ref={ref}
      className="min-h-screen flex items-center justify-center py-12 sm:py-20 overflow-hidden"
      style={{ perspective: 1400 }}
    >
      <motion.div
        style={{
          opacity: reduceMotion ? 1 : opacity,
          scale: reduceMotion ? 1 : scale,
          x: reduceMotion ? 0 : x,
          rotateX: reduceMotion ? 0 : rotateX,
          rotateY: reduceMotion ? 0 : rotateY,
          z: reduceMotion ? 0 : z,
          transformStyle: "preserve-3d"
        }}
        className="w-full max-w-5xl px-4"
      >
        <Card className="p-6 md:p-16 bg-card/40 backdrop-blur-2xl border-white/5 relative group">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-brand/5 blur-[120px] group-hover:bg-brand/10 transition-all duration-700" />
          
          <div className="relative z-10 grid lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 lg:items-center">
            <div className="flex flex-col items-center justify-center lg:flex">
              <span className="text-6xl md:text-8xl font-black text-brand/10 tracking-tighter leading-none mb-4">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="h-24 w-px bg-gradient-to-b from-brand/50 to-transparent" />
            </div>

            <div>
              <div className="mb-6 flex flex-wrap items-center gap-4">
                <CompanyIcon company={step.company} />
                <div className="text-xs font-bold uppercase tracking-widest text-muted">
                  <span className="text-brand">{step.company}</span>
                  <span className="mx-2 text-muted/60">·</span>
                  <span>{step.period}</span>
                </div>
              </div>
              <h3 className="mb-4 text-3xl font-bold leading-tight text-fg sm:text-4xl md:mb-6 md:text-7xl">{step.role}</h3>
              <p className="mb-8 max-w-3xl text-lg leading-relaxed text-muted md:mb-10 md:text-2xl">
                {step.story}
              </p>

              <div>
                <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                  Skills in this chapter
                </div>
                <div className="flex flex-wrap gap-2">
                  {step.storySkills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="border-brand/15 bg-brand/10 text-brand">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

export function Scrollytelling() {
  return (
    <div className="relative">
      {STEPS.map((step, index) => (
        <StepCard key={`${step.company}-${step.role}-${step.period}`} step={step} index={index} />
      ))}
    </div>
  );
}
