"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const STEPS = [
  {
    title: "Design",
    subtitle: "Architectural integrity from day zero.",
    tags: ["API-first", "Threat model", "SLOs"],
    description: "Start with the contract, the guardrails, and the service level objectives. I focus on defining clear boundaries and failure modes before writing a single line of code.",
    points: [
      "Define APIs and auth boundaries early.",
      "Select gateway patterns for governance.",
      "Design for operability and metrics."
    ]
  },
  {
    title: "Build",
    subtitle: "Reliability at scale, by default.",
    tags: ["FastAPI", "Microservices", "DX"],
    description: "Shipping small, reliable services with strong defaults. I prioritize simplicity and correctness to ensure long-term maintainability and performance.",
    points: [
      "Production-ready microservices.",
      "Automated scaffolding for speed.",
      "Clean interfaces and versioning."
    ]
  },
  {
    title: "Secure",
    subtitle: "Security is a process, not a product.",
    tags: ["DevSecOps", "Policies", "Secrets"],
    description: "Making security automated and invisible. I embed security controls directly into CI/CD pipelines to enforce policies without slowing down delivery.",
    points: [
      "Embed controls into CI/CD workflows.",
      "Enforce least privilege access.",
      "Automated policy enforcement."
    ]
  },
  {
    title: "Scale",
    subtitle: "Platform-centric operations.",
    tags: ["Kubernetes", "GitOps", "Observability"],
    description: "Running workloads on Kubernetes with GitOps patterns. I focus on traffic governance and reliable multi-environment delivery.",
    points: [
      "GitOps-driven delivery (ArgoCD).",
      "Robust traffic governance.",
      "Observability-first operations."
    ]
  },
  {
    title: "Intelligence",
    subtitle: "AI enablement with production discipline.",
    tags: ["RAG", "Agents", "Fine-tuning"],
    description: "Integrating LLM workflows into platform engineering. I make AI observable, safe, and truly useful in real-world production systems.",
    points: [
      "LLM workflow integration.",
      "Observable and safe AI systems.",
      "Data-driven fine-tuning."
    ]
  }
] as const;

function StepCard({ step, index }: { step: typeof STEPS[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.8, 1, 1, 0.8]);
  const x = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [100, 0, 0, -100]);

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center py-12 sm:py-20 overflow-hidden">
      <motion.div style={{ opacity, scale, x }} className="w-full max-w-5xl px-4">
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
              <div className="flex flex-wrap gap-2 mb-6">
                {step.tags.map(t => (
                  <Badge key={t} variant="secondary" className="bg-brand/10 text-brand border-none text-[10px] tracking-widest uppercase">{t}</Badge>
                ))}
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-7xl font-bold text-fg mb-4 md:mb-6 leading-tight">{step.title}</h3>
              <p className="text-lg md:text-2xl text-muted mb-8 md:mb-10 max-w-3xl leading-relaxed">{step.description}</p>
              
              <ul className="grid sm:grid-cols-2 gap-6">
                {step.points.map(p => (
                  <li key={p} className="flex items-start gap-4 text-sm font-medium text-fg/70">
                    <div className="h-6 w-6 shrink-0 rounded-lg bg-brand/10 flex items-center justify-center text-brand">
                      <div className="h-1.5 w-1.5 rounded-full bg-brand" />
                    </div>
                    {p}
                  </li>
                ))}
              </ul>
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
      {STEPS.map((s, idx) => (
        <StepCard key={s.title} step={s} index={idx} />
      ))}
    </div>
  );
}
