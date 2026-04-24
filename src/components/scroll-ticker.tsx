"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { PROFILE } from "@/data/profile";

export function ScrollTicker() {
  const { scrollY } = useScroll();
  const x = useTransform(scrollY, [0, 1400], [0, -520]);

  const items = [
    ...PROFILE.keywords,
    "Kong Gateway",
    "Akana",
    "Apigee",
    "FastAPI",
    "Kubernetes",
    "ArgoCD",
    "CI/CD",
    "LLM Systems",
    "RAG"
  ];

  const loop = [...items, ...items, ...items];

  return (
    <div className="border-y border-border/70 bg-card/20">
      <div className="container overflow-hidden">
        <motion.div style={{ x }} className="flex whitespace-nowrap py-3 text-xs text-muted">
          {loop.map((t, idx) => (
            <span key={`${t}-${idx}`} className="mr-8 inline-flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-brand/80" />
              <span className="tracking-wide">{t}</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

