"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const STEPS = [
  {
    title: "Design",
    subtitle: "Start with the contract, the guardrails, and the SLOs.",
    tags: ["API-first", "Threat model", "SLOs"],
    points: [
      "Define APIs, auth boundaries, and failure modes early.",
      "Choose the right gateway pattern for governance (Kong/Akana/Apigee).",
      "Design for operability: metrics, logs, tracing, safe rollouts."
    ]
  },
  {
    title: "Build",
    subtitle: "Ship small, reliable services with strong defaults.",
    tags: ["FastAPI", "Microservices", "DX"],
    points: [
      "Build production microservices with clean interfaces and versioning.",
      "Automate scaffolding and remove repetitive platform tasks.",
      "Prefer simplicity + correctness over incidental complexity."
    ]
  },
  {
    title: "Secure",
    subtitle: "Make security the default — and automated.",
    tags: ["DevSecOps", "Policies", "Secrets"],
    points: [
      "Embed security controls into CI/CD + secure SDLC workflows.",
      "Enforce least privilege, secrets hygiene, and policy automation.",
      "Use rate limits, JWT/API keys, secure headers, audit trails."
    ]
  },
  {
    title: "Scale",
    subtitle: "Operate like a platform, not a one-off app.",
    tags: ["Kubernetes", "GitOps", "Observability"],
    points: [
      "Run workloads on Kubernetes with GitOps (ArgoCD) + standard deploy patterns.",
      "Handle traffic governance and multi-environment delivery safely.",
      "Focus on reliability: autoscaling, retries, backpressure, runbooks."
    ]
  },
  {
    title: "AI Enablement",
    subtitle: "Add intelligence to workflows with production discipline.",
    tags: ["RAG", "Agents", "Fine-tuning"],
    points: [
      "Integrate LLM workflows into platform engineering to increase velocity.",
      "Use structured datasets (e.g., MongoDB) for fine-tuning + automation.",
      "Make AI observable, safe, and useful in real systems."
    ]
  }
] as const;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function Scrollytelling() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const floatIndex = useTransform(scrollYProgress, [0, 1], [0, STEPS.length - 1]);

  const [active, setActive] = useState(0);
  useMotionValueEvent(floatIndex, "change", (v) => setActive(clamp(Math.round(v), 0, STEPS.length - 1)));

  const orbY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const orbX = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <div ref={ref} className="relative min-h-[260vh]">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10"
        style={{ opacity: 0.9 }}
      >
        <motion.div
          className="absolute left-0 top-24 h-72 w-72 rounded-full bg-blue-500/12 blur-3xl"
          style={{ y: orbY }}
        />
        <motion.div
          className="absolute right-0 top-10 h-80 w-80 rounded-full bg-violet-500/12 blur-3xl"
          style={{ y: orbY, x: orbX }}
        />
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Card className="relative overflow-hidden p-6">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-emerald-500/10"
            />
            <div className="relative">
              <div className="text-xs text-muted">Scrollytelling</div>
              <div className="mt-2 text-2xl font-semibold leading-tight">
                How I build systems
                <span className="text-brand">.</span>
              </div>
              <div className="mt-3 text-sm text-muted">
                Scroll to move through each phase — the content is linked to scroll progress.
              </div>

              <div className="mt-6">
                <div className="relative h-2 overflow-hidden rounded-full border border-border/70 bg-card/40">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-blue-400 via-violet-400 to-emerald-400"
                    style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
                  />
                </div>
              </div>

              <div className="mt-6 grid gap-2">
                {STEPS.map((s, idx) => {
                  const isActive = idx === active;
                  return (
                    <motion.div
                      key={s.title}
                      animate={{ opacity: isActive ? 1 : 0.42, y: isActive ? 0 : 6 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="rounded-xl border border-border/70 bg-card/40 p-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-sm font-semibold">{s.title}</div>
                        <div className="text-xs text-muted">
                          {String(idx + 1).padStart(2, "0")}
                        </div>
                      </div>
                      <div className="mt-1 text-xs text-muted">{s.subtitle}</div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -14, filter: "blur(10px)" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card className="p-6">
                <div className="flex items-baseline justify-between gap-6">
                  <div className="text-lg font-semibold">{STEPS[active].title}</div>
                  <div className="text-xs text-muted">
                    phase {active + 1}/{STEPS.length}
                  </div>
                </div>
                <div className="mt-2 text-sm text-muted">{STEPS[active].subtitle}</div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {STEPS[active].tags.map((t) => (
                    <Badge key={t} className="text-fg/90">
                      {t}
                    </Badge>
                  ))}
                </div>

                <ul className="mt-5 grid gap-2 text-sm text-muted">
                  {STEPS[active].points.map((p) => (
                    <li key={p}>• {p}</li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="mt-4 text-xs text-muted">
            Pro tip: this section is taller than the viewport so the animation can “play” as you scroll.
          </div>
        </div>
      </div>
    </div>
  );
}
